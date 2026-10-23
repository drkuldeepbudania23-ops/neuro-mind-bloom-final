import { NextResponse } from "next/server";
import { verifyCheckoutSignature } from "../../../../../lib/payments/razorpay";
import { markOrderPaid, razorpayKeys } from "../../../../../lib/server/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Called by the browser after Razorpay Checkout succeeds.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const orderId = String(body?.razorpay_order_id || "");
    const paymentId = String(body?.razorpay_payment_id || "");
    const signature = String(body?.razorpay_signature || "");
    const { keySecret, configured } = razorpayKeys();
    if (!configured) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

    if (!verifyCheckoutSignature({ orderId, paymentId, signature, keySecret })) {
      return NextResponse.json({ ok: false, error: "invalid-signature" }, { status: 400 });
    }

    const result = await markOrderPaid(orderId, paymentId);
    if (!result.ok) return NextResponse.json({ ok: false, error: result.reason }, { status: 400 });
    return NextResponse.json({ ok: true, appointmentId: result.appointmentId });
  } catch (error) {
    console.error("razorpay/verify", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
