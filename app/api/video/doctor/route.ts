import { NextResponse } from "next/server";
import { verifyDoctorToken } from "../../../../lib/server/firebaseAdmin";
import { doctorRoom, isValidAppointmentId, patientVideoLink } from "../../../../lib/server/video";
import { audit } from "../../../../lib/server/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Doctor-only. Body: { idToken, appointmentId, provider?, meetUrl? } →
 * { provider, mode: "embed" | "external", roomUrl, hostUrl?, providers, patientLink }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const uid = await verifyDoctorToken(String(body?.idToken || ""));
    if (!uid) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    const appointmentId = String(body?.appointmentId || "");
    if (!isValidAppointmentId(appointmentId)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    const room = await doctorRoom(appointmentId, uid, body?.provider, body?.meetUrl);
    if ("error" in room) return NextResponse.json({ ok: false, error: room.error }, { status: 400 });
    await audit(uid, "video.opened", { appointmentId, provider: room.provider });
    return NextResponse.json(
      { ok: true, ...room, patientLink: patientVideoLink(appointmentId) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("video/doctor", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
