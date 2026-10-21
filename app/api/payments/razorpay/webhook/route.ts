import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "../../../../../lib/payments/razorpay";
import { markOrderPaid } from "../../../../../lib/server/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay webhook (Dashboard → Webhooks → URL: https://<domain>/api/payments/razorpay/webhook,
 * events: payment.captured, order.paid). Ensures the payment is recorded even if
 * the patient closes the browser before /verify runs.
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";

  if (!verifyWebhookSignature(raw, signature, secret)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const event = JSON.parse(raw);
    const payment = event?.payload?.payment?.entity;
    if ((event?.event === "payment.captured" || event?.event === "order.paid") && payment?.order_id && payment?.id) {
      const result = await markOrderPaid(String(payment.order_id), String(payment.id), Number(payment.amount));
      if (!result.ok) console.warn("razorpay/webhook", result.reason, payment.order_id);
    }
    // Always 200 for valid signatures so Razorpay does not retry endlessly.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("razorpay/webhook", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
