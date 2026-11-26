import { createHash, randomInt } from "node:crypto";
import type { PrescriptionRecord, RxMedicine } from "./pdf";
import { istDaysAgo, istToday } from "./dates";

/**
 * Server-side e-signing helpers — pure, unit-tested.
 * At signing, the server freezes the prescription content, stores it with a
 * SHA-256 hash, and issues the Prescription ID + time (the browser's clock and
 * later edits can no longer change what was signed).
 */

const TEXT_FIELDS = ["patientName", "age", "sex", "mobile", "email", "diagnosis", "complaints", "history", "vitals", "investigations", "advice", "followUp", "uhid", "appointmentId"] as const;
const MED_FIELDS = ["generic", "brand", "strength", "dose", "frequency", "timing", "food", "duration", "instruction"] as const;
const LIMITS: Record<string, number> = { patientName: 80, age: 10, sex: 10, mobile: 20, email: 120, uhid: 12, appointmentId: 64 };

export type SignedContent = Omit<PrescriptionRecord, "id" | "signedAt" | "prescriptionId">;

function text(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : typeof v === "number" ? String(v).slice(0, max) : "";
}

/** Keep only known fields, cap sizes, fixed key order → same input always gives the same hash. */
export function canonicalPrescription(input: Record<string, unknown>): SignedContent {
  const out: Record<string, unknown> = {};
  for (const f of TEXT_FIELDS) out[f] = text(input[f], LIMITS[f] ?? 4000);
  const rx = Array.isArray(input.rx) ? input.rx.slice(0, 40) : [];
  out.rx = rx.map((m) => {
    const med: Record<string, string> = {};
    for (const f of MED_FIELDS) med[f] = text((m as Record<string, unknown>)?.[f], 300);
    return med as RxMedicine;
  });
  const tele = input.consultationType === "teleconsultation" || input.isTeleconsultation === true;
  out.isTeleconsultation = tele;
  out.consultationType = tele ? "teleconsultation" : "opd";
  // Added only when present, so prescriptions signed before this field existed keep the same hash.
  const cd = text(input.consultationDate, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(cd)) out.consultationDate = cd;
  return out as SignedContent;
}

export function hashPrescription(content: SignedContent): string {
  return createHash("sha256").update(JSON.stringify(content)).digest("hex");
}

export function validateForSigning(c: SignedContent): string | null {
  if (!c.patientName || c.patientName.length < 2) return "patient-name";
  if (!(c.rx?.length || c.diagnosis || c.advice)) return "empty";
  return null;
}

/** How far back a missed prescription may be dated. */
export const MAX_BACKDATE_DAYS = 30;

/**
 * A consultation date may be today or a past day (missed prescriptions),
 * never in the future and not more than MAX_BACKDATE_DAYS old.
 */
export function consultationDateProblem(
  date: string | undefined,
  now: Date = new Date(),
  /** For a correction: the original prescription's date may be older than the normal limit. */
  originalDate?: string
): "future" | "too-old" | null {
  if (!date) return null;
  if (date > istToday(now)) return "future";
  let oldest = istDaysAgo(MAX_BACKDATE_DAYS, now);
  if (originalDate && /^\d{4}-\d{2}-\d{2}$/.test(originalDate) && originalDate < oldest) oldest = originalDate;
  if (date < oldest) return "too-old";
  return null;
}

/** "NMB-20261012-48213907" → "2026-10-12" (the day it was signed). */
export function dateFromPrescriptionId(id: string | undefined): string {
  const m = /^NMB-(\d{4})(\d{2})(\d{2})-\d{8}$/.exec(id || "");
  return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
}

/** "NMB-20261012-48213907" with the date in India time. */
export function newPrescriptionId(now: Date = new Date(), random = () => randomInt(0, 100_000_000)): string {
  const ist = new Date(now.getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
  return `NMB-${ist}-${String(random()).padStart(8, "0")}`;
}

/** "12/10/2026, 11:40 am" in India time (shown on the prescription). */
export function signedAtText(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}
