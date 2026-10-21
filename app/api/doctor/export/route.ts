import { adminDb, isAdminConfigured, verifyDoctorToken } from "../../../../lib/server/firebaseAdmin";
import { buildXlsx } from "../../../../lib/export/xlsx";
import { buildDoctorWorkbook } from "../../../../lib/export/doctorExport";
import { istDate } from "../../../../lib/notifications/templates";
import { audit } from "../../../../lib/server/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Doctor-only Excel (.xlsx) export of ALL cloud data:
 * Patients (UHID), Patient Records, Appointments, Payments, Follow-ups (one sheet each).
 * Body: { idToken }. Responds with the file (never cached).
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const uid = await verifyDoctorToken(String(body?.idToken || ""));
  if (!uid) return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  if (!isAdminConfigured()) return Response.json({ ok: false, error: "not-configured" }, { status: 503 });

  try {
    const db = adminDb();
    const load = async (name: string) =>
      (await db.collection(name).limit(20000).get()).docs.map((d) => ({ ...d.data(), id: d.id }));
    const [patients, records, appointments, payments, followUps] = await Promise.all([
      load("patients"),
      load("patientRecords"),
      load("appointments"),
      load("payments"),
      load("followUps"),
    ]);
    await audit(uid, "data.exported", { records: records.length, appointments: appointments.length });
    const file = await buildXlsx(buildDoctorWorkbook({ patients, records, appointments, payments, followUps }));
    return new Response(Buffer.from(file), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="NeuroMindBloom-records-${istDate()}.xlsx"`,
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("doctor/export", error);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}
