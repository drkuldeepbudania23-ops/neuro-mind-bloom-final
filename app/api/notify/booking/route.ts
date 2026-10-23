import { NextResponse } from "next/server";
import { isAdminConfigured } from "../../../../lib/server/firebaseAdmin";
import { notifyNewBooking } from "../../../../lib/server/appointmentNotify";
import { rateLimitByIp, tooMany } from "../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Called by the booking form right after the appointment is saved.
 * Body: { appointmentId }
 * Safe to expose publicly: it only acts on a PENDING appointment created in the
 * last 30 minutes, sends to the contact details stored in that appointment, and
 * each appointment can trigger it only once (claimed in a transaction).
 */
export async function POST(request: Request) {
  try {
    const limit = await rateLimitByIp(request, "booking-notify", 10, 60 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const body = await request.json().catch(() => ({}));
    const appointmentId = String(body?.appointmentId || "");
    if (!/^[A-Za-z0-9]{10,40}$/.test(appointmentId)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    if (!isAdminConfigured()) return NextResponse.json({ ok: true, skipped: true });
    const result = await notifyNewBooking(appointmentId);
    // Do not reveal whether the id exists.
    return NextResponse.json({ ok: true, sent: Boolean(result) });
  } catch (error) {
    console.error("notify/booking", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
