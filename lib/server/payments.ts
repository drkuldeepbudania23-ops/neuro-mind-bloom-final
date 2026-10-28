import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebaseAdmin";
import { buildOrderPayload, onlinePaymentRecord } from "../payments/razorpay";
import { notifyPaymentReceived } from "./appointmentNotify";

const RAZORPAY_API = "https://api.razorpay.com/v1";

export function razorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  return { keyId, keySecret, configured: Boolean(keyId && keySecret) };
}

function authHeader(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

/**
 * Create a Razorpay order for a pending appointment.
 * Amount comes from the appointment's serviceCode stored in Firestore.
 */
export async function createOrderForAppointment(appointmentId: string) {
  const { keyId, keySecret, configured } = razorpayKeys();
  if (!configured) return { error: "not-configured" as const };

  const db = adminDb();
  const snap = await db.collection("appointments").doc(appointmentId).get();
  if (!snap.exists) return { error: "not-found" as const };
  const appointment = snap.data() || {};
  if (["Paid", "Discount", "Exempt"].includes(String(appointment.paymentStatus || ""))) {
    return { error: "already-paid" as const };
  }

  const payload = buildOrderPayload(appointmentId, String(appointment.serviceCode || ""));
  if (!payload) return { error: "invalid-service" as const };

  const response = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: { Authorization: authHeader(keyId, keySecret), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) {
    // Log Razorpay's reason (never the keys) so a wrong/mismatched key is easy to spot.
    const detail = (await response.json().catch(() => ({}))) as { error?: { code?: string; description?: string } };
    console.warn("razorpay/order gateway", response.status, detail?.error?.code, detail?.error?.description, `key=${keyId.slice(0, 9)}…`);
    return { error: "gateway" as const };
  }
  const order = (await response.json()) as { id: string; amount: number; currency: string };

  await db.collection("razorpayOrders").doc(order.id).set({
    orderId: order.id,
    appointmentId,
    serviceCode: payload.notes.serviceCode,
    amount: order.amount,
    status: "created",
    createdAt: FieldValue.serverTimestamp(),
  });

  return {
    order: { id: order.id, amount: order.amount, currency: order.currency },
    keyId,
    prefill: {
      name: String(appointment.patientName || ""),
      contact: String(appointment.mobile || ""),
      email: String(appointment.email || ""),
    },
  };
}

/**
 * Mark the appointment paid. Idempotent: safe to call from both the browser
 * verification route and the webhook (whichever arrives first wins).
 */
export async function markOrderPaid(orderId: string, paymentId: string, amountPaise?: number) {
  const db = adminDb();
  const orderRef = db.collection("razorpayOrders").doc(orderId);

  const result = await db.runTransaction(async (tx) => {
    const orderSnap = await tx.get(orderRef);
    if (!orderSnap.exists) return { ok: false as const, reason: "unknown-order" };
    const order = orderSnap.data() as { appointmentId: string; serviceCode: string; amount: number; status: string };
    if (amountPaise !== undefined && amountPaise !== order.amount) {
      return { ok: false as const, reason: "amount-mismatch" };
    }

    const appointmentRef = db.collection("appointments").doc(order.appointmentId);
    const paymentRef = db.collection("payments").doc(order.appointmentId);
    const [appointmentSnap, paymentSnap] = await Promise.all([tx.get(appointmentRef), tx.get(paymentRef)]);

    if (order.status === "paid" || paymentSnap.exists) {
      return { ok: true as const, appointmentId: order.appointmentId, alreadyRecorded: true };
    }

    const record = onlinePaymentRecord({
      appointmentId: order.appointmentId,
      serviceCode: order.serviceCode,
      amountPaise: order.amount,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      patientName: String(appointmentSnap.data()?.patientName || ""),
    });
    const confirmedAt = FieldValue.serverTimestamp();
    const details = { ...record.paymentDetails, confirmedAt };

    tx.set(paymentRef, { ...record, paymentDetails: details, createdAt: confirmedAt });
    if (appointmentSnap.exists) {
      tx.update(appointmentRef, {
        paymentStatus: "Paid",
        paymentDetails: details,
        paymentId: order.appointmentId,
        // Slot confirmation stays a doctor decision; payment does not change `status`.
      });
    }
    tx.update(orderRef, { status: "paid", paymentId, paidAt: confirmedAt });
    return { ok: true as const, appointmentId: order.appointmentId, alreadyRecorded: false, amount: order.amount };
  });

  // Patient receipt on WhatsApp/email — only the first time the payment is recorded.
  if (result.ok && !result.alreadyRecorded && "amount" in result && typeof result.amount === "number") {
    await notifyPaymentReceived(result.appointmentId, result.amount);
  }
  return result;
}
