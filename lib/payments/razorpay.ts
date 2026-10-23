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

/** Payment record in the same shape the doctor's payment screen writes. */
export function onlinePaymentRecord(params: {
  appointmentId: string;
  serviceCode: string;
  amountPaise: number;
  razorpayOrderId: string;
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
      mode: "Razorpay",
      reference: params.razorpayPaymentId,
      razorpayOrderId: params.razorpayOrderId,
      confirmedBy: "razorpay",
    },
  };
}
