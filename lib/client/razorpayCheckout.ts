"use client";

/**
 * Opens Razorpay Checkout for an appointment. The server decides the amount
 * (from the appointment's service) and verifies the signature.
 */

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: string, cb: () => void) => void };
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayInstance;

export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_RAZORPAY_ENABLED === "true";

function loadRazorpay(): Promise<RazorpayCtor | null> {
  return new Promise((resolve) => {
    const w = window as unknown as { Razorpay?: RazorpayCtor };
    if (w.Razorpay) return resolve(w.Razorpay);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve((window as unknown as { Razorpay?: RazorpayCtor }).Razorpay ?? null);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
}

export async function startRazorpayPayment(
  appointmentId: string,
  description: string
): Promise<"paid" | "failed" | "dismissed"> {
  const orderRes = await fetch("/api/payments/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appointmentId }),
  });
  const data = await orderRes.json().catch(() => ({}));
  const Razorpay = await loadRazorpay();
  if (!orderRes.ok || !data.ok || !Razorpay) return "failed";

  return new Promise((resolve) => {
    const checkout = new Razorpay({
      key: data.keyId,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "Neuro Mind Bloom",
      description,
      prefill: data.prefill,
      theme: { color: "#0b746f" },
      handler: async (response: RazorpayResponse) => {
        const verify = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        resolve(verify.ok ? "paid" : "failed");
      },
      modal: { ondismiss: () => resolve("dismissed") },
    });
    checkout.on("payment.failed", () => resolve("failed"));
    checkout.open();
  });
}
