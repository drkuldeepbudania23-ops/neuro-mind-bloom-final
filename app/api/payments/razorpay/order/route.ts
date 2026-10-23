import { NextResponse } from "next/server";
import { createOrderForAppointment } from "../../../../../lib/server/payments";
import { isAdminConfigured } from "../../../../../lib/server/firebaseAdmin";
import { rateLimitByIp, tooMany } from "../../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { appointmentId } → Razorpay order for that appointment's fee. */
export async function POST(request: Request) {
  try {
    const limit = await rateLimitByIp(request, "razorpay-order", 20, 10 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const body = await request.json().catch(() => ({}));
    const appointmentId = typeof body?.appointmentId === "string" ? body.appointmentId.trim() : "";
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(appointmentId)) {
      return NextResponse.json({ ok: false, error: "invalid-appointment" }, { status: 400 });
    }
    if (!isAdminConfigured()) {
      return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
    }

    const result = await createOrderForAppointment(appointmentId);
    if ("error" in result) {
      const status = result.error === "not-found" ? 404 : result.error === "already-paid" ? 409 : result.error === "not-configured" ? 503 : 400;
      return NextResponse.json({ ok: false, error: result.error }, { status });
    }
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("razorpay/order", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
