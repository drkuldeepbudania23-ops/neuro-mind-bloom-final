import { NextResponse } from "next/server";
import { isAdminConfigured, verifyDoctorToken } from "../../../../lib/server/firebaseAdmin";
import {
  isRxLinkConfigured,
  isSigned,
  isValidRecordId,
  loadPrescription,
  pdfFileName,
  prescriptionLink,
  prescriptionPdf,
} from "../../../../lib/server/prescriptions";
import { notify } from "../../../../lib/server/notify";
import { audit } from "../../../../lib/server/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Doctor-only. Body: { idToken, recordId, send?: boolean, channel?: "email" | "whatsapp", lang?: "en" | "hi" }
 * Returns a secure 30-day download link for an e-signed prescription.
 * With send=true it also sends it automatically:
 *   WhatsApp (template with the PDF as a document) + email (PDF attached),
 * for whichever channels are configured (or only `channel`). Unconfigured channels are "skipped".
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const uid = await verifyDoctorToken(String(body?.idToken || ""));
    if (!uid) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    if (!isAdminConfigured() || !isRxLinkConfigured()) {
      return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
    }

    const recordId = String(body?.recordId || "");
    if (!isValidRecordId(recordId)) return NextResponse.json({ ok: false, error: "invalid-record" }, { status: 400 });

    const record = await loadPrescription(recordId);
    if (!record) return NextResponse.json({ ok: false, error: "not-found" }, { status: 404 });
    if (!isSigned(record)) return NextResponse.json({ ok: false, error: "not-signed" }, { status: 409 });

    const link = prescriptionLink(recordId);
    await audit(uid, body?.send ? "prescription.sent" : "prescription.link", { recordId, prescriptionId: record.prescriptionId, channel: body?.channel });
    if (!body?.send) return NextResponse.json({ ok: true, link });

    const pdf = await prescriptionPdf(record);
    const lang = body?.lang === "hi" ? "hi" : "en";
    const result = await notify(
      "prescription_ready",
      { patientName: record.patientName, link },
      {
        mobile: body?.channel === "email" ? undefined : record.mobile,
        email: body?.channel === "whatsapp" ? undefined : record.email,
      },
      lang,
      [{ filename: pdfFileName(record), content: pdf }]
    );
    return NextResponse.json({ ok: true, link, delivery: result });
  } catch (error) {
    console.error("prescriptions/share", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
