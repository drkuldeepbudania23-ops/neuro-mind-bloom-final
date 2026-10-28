import { createHmac, timingSafeEqual } from "node:crypto";
import { feeInPaise, getService } from "../site";

/**
 * Pure Razorpay helpers (no network, no Firebase) so they can be unit-tested.
 * SERVER-SIDE ONLY — never import this file from a client component.
 */

function safeEqualHex(a: string, b: string): boolean {
  if (!/^[a-f0-9]+$/i.test(a) || !/^[a-f0-9]+$/i.test(b) || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

/**
 * Checkout success signature:
 *   HMAC_SHA256(order_id + "|" + razorpay_payment_id, key_secret)
 */
export function verifyCheckoutSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
  keySecret: string;
}): boolean {
  const { orderId, paymentId, signature, keySecret } = params;
  if (!orderId || !paymentId || !signature || !keySecret) return false;
  const expected = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

/** Webhook signature: HMAC_SHA256(raw request body, webhook_secret). */
export function verifyWebhookSignature(rawBody: string, signature: string, webhookSecret: string): boolean {
  if (!rawBody || !signature || !webhookSecret) return false;
  const expected = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}

export type OrderPayload = {
  amount: number; // paise
  currency: "INR";
  receipt: string;
  notes: { appointmentId: string; serviceCode: string };
};

/**
 * The amount is ALWAYS derived on the server from the service code, never from
 * anything the browser sends.
 */
export function buildOrderPayload(appointmentId: string, serviceCode: string): OrderPayload | null {
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(appointmentId)) return null;
  const amount = feeInPaise(serviceCode);
  if (!amount || !getService(serviceCode)) return null;
  return {
    amount,
    currency: "INR",
    // Razorpay receipts are max 40 chars.
    receipt: `nmb_${appointmentId}`.slice(0, 40),
    notes: { appointmentId, serviceCode },
  };
}

export type QrPayload = {
  type: "upi_qr";
  name: string;
  usage: "single_use";
  fixed_amount: true;
  payment_amount: number; // paise
  description: string;
  close_by: number; // unix seconds
  notes: { appointmentId: string; serviceCode: string; source: "nmb-pay-page" };
};

/** Requested QR validity (Razorpay may cap it shorter; the page then makes a fresh QR). */
export const QR_VALID_SECONDS = 3 * 24 * 60 * 60;

/**
 * Per-patient Razorpay UPI QR (amount fixed, reference in notes) so the payment
 * can be recorded automatically. Only for the FULL standard fee of a known
 * service: a link whose amount was edited (discount, or tampering) gets null and
 * falls back to the clinic's static QR + manual entry.
 */
export function buildQrPayload(reference: string, serviceCode: string, amountRupees: number, nowSec: number): QrPayload | null {
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(reference)) return null;
  const service = getService(serviceCode);
  if (!service || amountRupees !== service.fee) return null;
  return {
    type: "upi_qr",
    name: "Neuro Mind Bloom",
    usage: "single_use",
    fixed_amount: true,
    payment_amount: service.fee * 100,
    description: `${service.label.en} · ${reference}`.slice(0, 100),
    close_by: Math.floor(nowSec) + QR_VALID_SECONDS,
    notes: { appointmentId: reference, serviceCode, source: "nmb-pay-page" },
  };
}

/** Firestore id for the QR of one reference + amount (one active QR per link). */
export const qrDocId = (reference: string, amountPaise: number) => `${reference}_${amountPaise}`;

/** Pulls what we need out of a `qr_code.credited` webhook event, or null. */
export function qrCreditFromEvent(event: unknown): { qrId: string; paymentId: string; amountPaise: number; reference: string; serviceCode: string } | null {
  const e = event as {
    event?: string;
    payload?: {
      qr_code?: { entity?: { id?: string; notes?: Record<string, unknown> } };
      payment?: { entity?: { id?: string; amount?: number; status?: string } };
    };
  };
  if (e?.event !== "qr_code.credited") return null;
  const qr = e.payload?.qr_code?.entity;
  const payment = e.payload?.payment?.entity;
  const reference = String(qr?.notes?.appointmentId || "");
  const serviceCode = String(qr?.notes?.serviceCode || "");
  if (!qr?.id || !payment?.id || typeof payment.amount !== "number") return null;
  if (qr.notes?.source !== "nmb-pay-page" || !/^[A-Za-z0-9_-]{6,64}$/.test(reference) || !getService(serviceCode)) return null;
  if (payment.status && payment.status !== "captured") return null;
  return { qrId: String(qr.id), paymentId: String(payment.id), amountPaise: payment.amount, reference, serviceCode };
}

/** Payment record in the same shape the doctor's payment screen writes. */
export function onlinePaymentRecord(params: {
  appointmentId: string;
  serviceCode: string;
  amountPaise: number;
  razorpayOrderId?: string;
  razorpayQrId?: string;
  razorpayPaymentId: string;
  patientName: string;
}) {
  const fee = (getService(params.serviceCode)?.fee ?? params.amountPaise / 100);
  const finalAmount = params.amountPaise / 100;
  return {
    paymentId: params.appointmentId,
    appointmentId: params.appointmentId,
    patientName: params.patientName,
    service: params.serviceCode,
    paymentStatus: "Paid" as const,
    paymentDetails: {
      originalFee: fee,
      finalAmount,
      discount: 0,
      discountType: "",
      reason: "",
      mode: params.razorpayQrId ? "Razorpay UPI QR" : "Razorpay",
      reference: params.razorpayPaymentId,
      ...(params.razorpayOrderId ? { razorpayOrderId: params.razorpayOrderId } : {}),
      ...(params.razorpayQrId ? { razorpayQrId: params.razorpayQrId } : {}),
      confirmedBy: "razorpay",
    },
  };
}
