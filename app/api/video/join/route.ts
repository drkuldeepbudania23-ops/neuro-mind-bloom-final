import { NextResponse } from "next/server";
import { isValidAppointmentId, patientRoom } from "../../../../lib/server/video";
import { rateLimitByIp, tooMany } from "../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Patient. Body: { appointmentId, k } (k = signed key from the join link) → { roomUrl } */
export async function POST(request: Request) {
  try {
    const limit = await rateLimitByIp(request, "video-join", 60, 10 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const body = await request.json().catch(() => ({}));
    const appointmentId = String(body?.appointmentId || "");
    const key = String(body?.k || "").slice(0, 300);
    if (!isValidAppointmentId(appointmentId)) return NextResponse.json({ ok: false, error: "invalid-link" }, { status: 400 });
    const room = await patientRoom(appointmentId, key);
    if ("error" in room) return NextResponse.json({ ok: false, error: room.error }, { status: 403 });
    return NextResponse.json({ ok: true, ...room }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("video/join", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
