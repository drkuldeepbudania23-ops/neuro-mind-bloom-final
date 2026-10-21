import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { adminAuth, isAdminConfigured, mfaSatisfied } from "../../../lib/server/firebaseAdmin";
import { disable, enable, mfaStatus, startSetup, verify } from "../../../lib/server/mfa";
import { audit } from "../../../lib/server/audit";
import { rateLimitByIp, tooMany } from "../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Doctor 2FA. Body: { idToken, action: "status" | "setup" | "enable" | "verify" | "disable", code? }
 * After enable/verify/disable the browser must refresh its ID token (getIdToken(true)).
 */
export async function POST(request: Request) {
  try {
    const limit = await rateLimitByIp(request, "mfa", 30, 15 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    if (!isAdminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

    const body = await request.json().catch(() => ({}));
    let decoded: Record<string, unknown> & { uid: string; email?: string };
    try {
      decoded = await adminAuth().verifyIdToken(String(body?.idToken || ""), true);
    } catch {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    }
    if (decoded.doctor !== true) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    const uid = decoded.uid;
    const sessionOk = mfaSatisfied(decoded);
    const code = String(body?.code || "").slice(0, 20);
    const action = String(body?.action || "");
    const headers = { "Cache-Control": "no-store" };

    if (action === "status") {
      return NextResponse.json({ ok: true, ...(await mfaStatus(uid)), sessionOk }, { headers });
    }

    if (action === "setup") {
      const status = await mfaStatus(uid);
      // Re-enrolling an enabled 2FA needs a valid 2FA session first.
      if (status.enabled && !sessionOk) return NextResponse.json({ ok: false, error: "mfa-required" }, { status: 403 });
      const { secret, otpauth } = await startSetup(uid, String(decoded.email || "doctor"));
      const qrSvg = await QRCode.toString(otpauth, { type: "svg", margin: 1, errorCorrectionLevel: "M" });
      return NextResponse.json({ ok: true, secret, qrSvg }, { headers });
    }

    if (action === "enable") {
      const status = await mfaStatus(uid);
      if (status.enabled && !sessionOk) return NextResponse.json({ ok: false, error: "mfa-required" }, { status: 403 });
      const result = await enable(uid, code);
      if ("error" in result) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
      await audit(uid, "2fa.enabled");
      return NextResponse.json({ ok: true, recoveryCodes: result.recoveryCodes }, { headers });
    }

    if (action === "verify") {
      const result = await verify(uid, code);
      if ("error" in result) {
        if (result.error === "wrong-code") await audit(uid, "2fa.failed");
        return NextResponse.json({ ok: false, ...result }, { status: result.error === "locked" ? 429 : 400 });
      }
      await audit(uid, result.usedRecovery ? "2fa.verified.recovery-code" : "2fa.verified");
      return NextResponse.json({ ok: true, recoveryLeft: result.recoveryLeft }, { headers });
    }

    if (action === "disable") {
      if (!sessionOk) return NextResponse.json({ ok: false, error: "mfa-required" }, { status: 403 });
      const result = await disable(uid, code);
      if ("error" in result) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
      await audit(uid, "2fa.disabled");
      return NextResponse.json({ ok: true }, { headers });
    }

    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  } catch (error) {
    console.error("mfa", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
