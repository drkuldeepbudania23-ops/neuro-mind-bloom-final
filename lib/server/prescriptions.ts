import "server-only";
import { adminDb } from "./firebaseAdmin";
import { LOGO_PNG_BASE64, SIGNATURE_PNG_BASE64 } from "./rxAssets";
import { buildPrescriptionPdf, type DoctorInfo, type PrescriptionRecord } from "../rx/pdf";
import QRCode from "qrcode";
import { createRxToken, purposeSecret, verifyRxToken } from "../rx/link";
import { canonicalPrescription, hashPrescription, type SignedContent } from "../rx/signing";
import { CLINIC, DOCTOR, SITE_URL } from "../site";

export const RX_LINK_TTL_DAYS = 30;

export const DOCTOR_INFO: DoctorInfo = {
  name: DOCTOR.name.en,
  degrees: DOCTOR.degrees,
  post: DOCTOR.post.en,
  registrationNo: DOCTOR.registrationNo,
  specialities: "Mental Health, De-addiction, Sexual Medicine",
  website: "www.neuromindbloom.com",
  phone: CLINIC.phoneDisplay,
};

export function rxSecret(): string {
  return process.env.RX_LINK_SECRET || "";
}

export function isRxLinkConfigured(): boolean {
  return rxSecret().length >= 16;
}

export function isValidRecordId(id: string): boolean {
  return /^[A-Za-z0-9_-]{1,64}$/.test(id);
}

export type LoadedPrescription = PrescriptionRecord & {
  /** true = content comes from the server-frozen signed copy (signedPrescriptions). */
  sealed?: boolean;
  /** The editable record no longer matches what was signed (the signed version is used). */
  changedAfterSigning?: boolean;
};

/**
 * Load a saved prescription (patientRecords/{id}). If it was e-signed on the
 * server, the frozen signed copy is used, so later edits cannot alter the PDF
 * or the verification page.
 */
export async function loadPrescription(recordId: string): Promise<LoadedPrescription | null> {
  if (!isValidRecordId(recordId)) return null;
  const snap = await adminDb().collection("patientRecords").doc(recordId).get();
  if (!snap.exists) return null;
  const data = snap.data() || {};
  const record: LoadedPrescription = { ...(data as PrescriptionRecord), id: recordId, patientName: String(data.patientName || "") };

  const pid = typeof data.prescriptionId === "string" ? data.prescriptionId : "";
  if (/^NMB-\d{8}-\d{8}$/.test(pid)) {
    const signed = await adminDb().collection("signedPrescriptions").doc(pid).get();
    if (signed.exists) {
      const s = signed.data() || {};
      const content = s.content as SignedContent;
      return {
        ...content,
        id: recordId,
        uhid: content.uhid || record.uhid,
        date: record.date,
        prescriptionId: pid,
        signedAt: String(s.signedAt || record.signedAt || ""),
        sealed: true,
        // UHID / appointment link may be attached after signing — not clinical content.
        changedAfterSigning:
          hashPrescription(canonicalPrescription({ ...data, uhid: content.uhid, appointmentId: content.appointmentId })) !== s.hash,
      };
    }
  }
  return record;
}

/** Only e-signed prescriptions may leave the clinic as a PDF. */
export function isSigned(record: PrescriptionRecord): boolean {
  return Boolean(record.signedAt && record.prescriptionId);
}

/** Verification QR links stay valid for 2 years (prescriptions are re-checked at refills). */
export const VERIFY_TTL_DAYS = 730;

function baseUrl(): string {
  return (process.env.PUBLIC_BASE_URL || SITE_URL).replace(/\/$/, "");
}

export function verificationUrl(recordId: string): string {
  const token = createRxToken(recordId, purposeSecret(rxSecret(), "verify"), VERIFY_TTL_DAYS);
  return `${baseUrl()}/verify/${token}`;
}

/** Record id from a verification token, or null if forged/expired. */
export function recordIdFromVerifyToken(token: string): string | null {
  if (!isRxLinkConfigured()) return null;
  return verifyRxToken(token, purposeSecret(rxSecret(), "verify"));
}

export async function prescriptionPdf(record: PrescriptionRecord): Promise<Uint8Array> {
  let verify: { url: string; matrix: { size: number; get(r: number, c: number): unknown } } | undefined;
  if (isRxLinkConfigured() && isValidRecordId(record.id)) {
    const url = verificationUrl(record.id);
    verify = { url, matrix: QRCode.create(url, { errorCorrectionLevel: "M" }).modules };
  }
  return buildPrescriptionPdf(record, DOCTOR_INFO, {
    logoPng: Buffer.from(LOGO_PNG_BASE64, "base64"),
    signaturePng: Buffer.from(SIGNATURE_PNG_BASE64, "base64"),
    verify,
  });
}

export function prescriptionLink(recordId: string): string {
  const token = createRxToken(recordId, rxSecret(), RX_LINK_TTL_DAYS);
  return `${baseUrl()}/api/rx/${token}`;
}

export function pdfFileName(record: PrescriptionRecord): string {
  const safe = (record.patientName || "patient").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "patient";
  return `Prescription-${safe}-${(record.date || "").replace(/[^0-9-]/g, "") || record.id}.pdf`;
}

/** "Ramesh Kumar" → "R***** K****" (enough for a pharmacist to match, not a full disclosure). */
export function maskName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w.length <= 1 ? w : w[0] + "*".repeat(Math.min(w.length - 1, 6))))
    .join(" ");
}
