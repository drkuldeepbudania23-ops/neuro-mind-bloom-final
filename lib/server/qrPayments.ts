import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";
import { razorpayKeys } from "./payments";
import { notifyPaymentReceived } from "./appointmentNotify";
import { buildQrPayload, onlinePaymentRecord, qrDocId } from "../payments/razorpay";

const RAZORPAY_API = "https://api.razorpay.com/v1";
const PAID = ["Paid", "Discount", "Exempt"];

type QrDoc = {
  qrId: string;
  reference: string;
  serviceCode: string;
  amount: number; // paise
  imageUrl: string;
  closeBy: number; // unix seconds
  status: "active" | "paid";
};

export type PaymentQr = { kind: "qr"; imageUrl: string; closeBy: number } | { kind: "paid" } | null;

/**
 * Per-patient UPI QR for the /pay page (amount fixed, reference in notes).
 * Reuses the same QR while it is still valid; returns null when it can't be
 * used (not configured, discounted amount, Razorpay error) so the page falls
 * back to the clinic's static QR.
 */
export async function getOrCreatePaymentQr(reference: string, serviceCode: string, amountRupees: number): Promise<PaymentQr> {
  const { keyId, keySecret, configured } = razorpayKeys();
  if (!configured || !isAdminConfigured()) return null;
  const nowSec = Date.now() / 1000;
  const payload = buildQrPayload(reference, serviceCode, amountRupees, nowSec);
  if (!payload) return null;

  const db = adminDb();
  const [paymentSnap, appointmentSnap] = await Promise.all([
    db.collection("payments").doc(reference).get(),
    db.collection("appointments").doc(reference).get(),
  ]);
  if (paymentSnap.exists || PAID.includes(String(appointmentSnap.data()?.paymentStatus || ""))) return { kind: "paid" };

  const ref = db.collection("razorpayQrs").doc(qrDocId(reference, payload.payment_amount));
  const existing = (await ref.get()).data() as QrDoc | undefined;
  if (existing?.status === "paid") return { kind: "paid" };
  // Keep at least 2 hours of validity on a reused QR.
  if (existing?.status === "active" && existing.imageUrl && existing.closeBy > nowSec + 2 * 3600) {
    return { kind: "qr", imageUrl: existing.imageUrl, closeBy: existing.closeBy };
  }

  const response = await fetch(`${RAZORPAY_API}/payments/qr_codes`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = (await response.json().catch(() => ({}))) as { error?: { code?: string; description?: string } };
    console.warn("razorpay/qr create", response.status, detail?.error?.code, detail?.error?.description);
    return null;
  }
  const qr = (await response.json()) as { id: string; image_url: string; close_by?: number };
  if (!qr?.id || !qr.image_url) return null;

  const doc: QrDoc = {
    qrId: qr.id,
    reference,
    serviceCode,
    amount: payload.payment_amount,
    imageUrl: qr.image_url,
    closeBy: qr.close_by || payload.close_by,
    status: "active",
  };
  await ref.set({ ...doc, createdAt: FieldValue.serverTimestamp() });
  return { kind: "qr", imageUrl: doc.imageUrl, closeBy: doc.closeBy };
}

/**
 * `qr_code.credited` webhook → record the payment like an online checkout
 * payment. Idempotent; only for QRs this site created, at the stored amount.
 */
export async function markQrPaid(credit: { qrId: string; paymentId: string; amountPaise: number; reference: string }) {
  const db = adminDb();
  const qrRef = db.collection("razorpayQrs").doc(qrDocId(credit.reference, credit.amountPaise));

  const result = await db.runTransaction(async (tx) => {
    const qrSnap = await tx.get(qrRef);
    if (!qrSnap.exists) return { ok: false as const, reason: "unknown-qr" };
    const qr = qrSnap.data() as QrDoc;
    if (qr.qrId !== credit.qrId) return { ok: false as const, reason: "qr-mismatch" };
    if (qr.amount !== credit.amountPaise) return { ok: false as const, reason: "amount-mismatch" };

    const appointmentRef = db.collection("appointments").doc(qr.reference);
    const paymentRef = db.collection("payments").doc(qr.reference);
    const [appointmentSnap, paymentSnap] = await Promise.all([tx.get(appointmentRef), tx.get(paymentRef)]);
    if (qr.status === "paid" || paymentSnap.exists) {
      return { ok: true as const, reference: qr.reference, alreadyRecorded: true };
    }

    const record = onlinePaymentRecord({
      appointmentId: qr.reference,
      serviceCode: qr.serviceCode,
      amountPaise: qr.amount,
      razorpayQrId: qr.qrId,
      razorpayPaymentId: credit.paymentId,
      patientName: String(appointmentSnap.data()?.patientName || appointmentSnap.data()?.name || ""),
    });
    const confirmedAt = FieldValue.serverTimestamp();
    const details = { ...record.paymentDetails, confirmedAt };

    tx.set(paymentRef, { ...record, paymentDetails: details, createdAt: confirmedAt });
    if (appointmentSnap.exists) {
      tx.update(appointmentRef, { paymentStatus: "Paid", paymentDetails: details, paymentId: qr.reference });
    }
    tx.update(qrRef, { status: "paid", paymentId: credit.paymentId, paidAt: confirmedAt });
    return { ok: true as const, reference: qr.reference, alreadyRecorded: false, amount: qr.amount };
  });

  if (result.ok && !result.alreadyRecorded && "amount" in result && typeof result.amount === "number") {
    await notifyPaymentReceived(result.reference, result.amount);
  }
  return result;
}
