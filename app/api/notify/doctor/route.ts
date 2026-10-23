import { NextResponse } from "next/server";
import { isAdminConfigured, verifyDoctorToken } from "../../../../lib/server/firebaseAdmin";
import { notifyFromDoctor, type DoctorNotifyKind } from "../../../../lib/server/appointmentNotify";
import { audit } from "../../../../lib/server/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KINDS: DoctorNotifyKind[] = ["confirmed", "payment_request", "rescheduled"];

/**
 * Doctor-only automatic WhatsApp + email for an appointment.
 * Body: { idToken, appointmentId, kind: "confirmed" | "payment_request", amount?, lang? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const uid = await verifyDoctorToken(String(body?.idToken || ""));
    if (!uid) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    if (!isAdminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

    const appointmentId = String(body?.appointmentId || "");
    const kind = String(body?.kind || "") as DoctorNotifyKind;
    if (!/^[A-Za-z0-9]{10,40}$/.test(appointmentId) || !KINDS.includes(kind)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const amount = body?.amount === undefined ? undefined : Number(body.amount);
    const lang = body?.lang === "hi" ? "hi" : body?.lang === "en" ? "en" : undefined;

    const result = await notifyFromDoctor(appointmentId, kind, { amount, lang });
    if ("error" in result) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    await audit(uid, `notify.${kind}`, { appointmentId, amount });
    return NextResponse.json({ ok: true, delivery: result });
  } catch (error) {
    console.error("notify/doctor", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
