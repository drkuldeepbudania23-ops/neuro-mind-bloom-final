import "server-only";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./firebaseAdmin";
import { doctorAlertRecipient, notify, type NotifyResult } from "./notify";
import { getService, paymentPageUrl, serviceCodeFromText } from "../site";
import type { Lang } from "../notifications/templates";

type Appointment = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export function appointmentSummary(a: Appointment) {
  const code = getService(str(a.serviceCode)) ? str(a.serviceCode) : serviceCodeFromText(str(a.service));
  const service = getService(code)!;
  const lang: Lang = a.language === "hi" ? "hi" : "en";
  return {
    code,
    service,
    lang,
    data: {
      patientName: str(a.patientName) || str(a.name),
      service: lang === "hi" ? service.label.hi : service.label.en,
      date: str(a.date) || str(a.preferredDate),
      time: str(a.time) || str(a.preferredTime),
      mode: str(a.mode),
      mobile: str(a.mobile),
      concern: str(a.concern).slice(0, 300),
    },
    recipient: { mobile: str(a.mobile), email: str(a.email) },
  };
}

/**
 * Atomically claim a notification slot on the appointment so the same message
 * is never sent twice (double clicks, retries, webhook + browser both firing).
 */
async function claim(appointmentId: string, key: string, guard?: (a: Appointment) => boolean) {
  const ref = adminDb().collection("appointments").doc(appointmentId);
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const a = snap.data() || {};
    const sent = (a.notifications as Record<string, unknown> | undefined)?.[key];
    if (sent) return null;
    if (guard && !guard(a)) return null;
    tx.set(ref, { notifications: { [key]: FieldValue.serverTimestamp() } }, { merge: true });
    return a;
  });
}

const BOOKING_WINDOW_MS = 30 * 60 * 1000;

/** Public trigger right after a booking is saved: patient acknowledgement + doctor alert. */
export async function notifyNewBooking(appointmentId: string) {
  const a = await claim(appointmentId, "bookingReceived", (doc) => {
    const created = doc.createdAt instanceof Timestamp ? doc.createdAt.toMillis() : 0;
    return created > 0 && Date.now() - created < BOOKING_WINDOW_MS && str(doc.status) === "pending";
  });
  if (!a) return null;
  const s = appointmentSummary(a);
  const [patient, doctor] = await Promise.all([
    notify("booking_received", s.data, s.recipient, s.lang),
    notify("new_booking_alert", { ...s.data, service: s.service.label.en }, doctorAlertRecipient(), "en"),
  ]);
  return { patient, doctor };
}

export type DoctorNotifyKind = "confirmed" | "payment_request" | "rescheduled";

export async function notifyFromDoctor(
  appointmentId: string,
  kind: DoctorNotifyKind,
  options: { amount?: number; lang?: Lang; resend?: boolean } = {}
): Promise<NotifyResult | { error: string }> {
  const ref = adminDb().collection("appointments").doc(appointmentId);
  const snap = await ref.get();
  if (!snap.exists) return { error: "not-found" };
  const a = snap.data() || {};
  const s = appointmentSummary(a);
  const lang = options.lang || s.lang;

  if (kind === "confirmed") {
    if (str(a.status).toLowerCase() !== "confirmed") return { error: "not-confirmed" };
    const result = await notify("appointment_confirmed", s.data, s.recipient, lang);
    await ref.set({ notifications: { confirmed: FieldValue.serverTimestamp() } }, { merge: true });
    return result;
  }

  if (kind === "rescheduled") {
    const result = await notify("appointment_rescheduled", s.data, s.recipient, lang);
    await ref.set({ notifications: { rescheduled: FieldValue.serverTimestamp() } }, { merge: true });
    return result;
  }

  const amount = options.amount ?? s.service.fee;
  if (!Number.isInteger(amount) || amount <= 0 || amount > 100000) return { error: "invalid-amount" };
  if (["Paid", "Discount", "Exempt"].includes(str(a.paymentStatus))) return { error: "already-paid" };
  const link = paymentPageUrl({ appointmentId, amount, serviceCode: s.code, lang });
  const result = await notify("payment_request", { ...s.data, amount, link }, s.recipient, lang);
  await ref.set({ notifications: { paymentRequest: FieldValue.serverTimestamp() } }, { merge: true });
  return result;
}

/** After an online (Razorpay) payment is recorded. Never throws. */
export async function notifyPaymentReceived(appointmentId: string, amountPaise: number) {
  try {
    const a = await claim(appointmentId, "paymentReceived");
    if (!a) return;
    const s = appointmentSummary(a);
    await notify("payment_received", { ...s.data, amount: amountPaise / 100 }, s.recipient, s.lang);
  } catch (error) {
    console.error("notifyPaymentReceived", error);
  }
}
