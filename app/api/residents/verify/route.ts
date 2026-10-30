import { verifyCheckoutSignature } from "../../../../lib/payments/razorpay";
import { razorpayKeys } from "../../../../lib/server/payments";
import { markResidentOrderPaid, verifyUser } from "../../../../lib/server/residents";
import { fail, json, notConfigured, readJson, serverError } from "../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Browser callback after Razorpay Checkout succeeds (the webhook records it too). */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const body = await readJson(request);
    const orderId = String(body.razorpay_order_id || "");
    const paymentId = String(body.razorpay_payment_id || "");
    const signature = String(body.razorpay_signature || "");
    const { keySecret, configured } = razorpayKeys();
    if (!configured) return fail("not-configured", 503);
    if (!/^pay_[A-Za-z0-9]{6,40}$/.test(paymentId) || !verifyCheckoutSignature({ orderId, paymentId, signature, keySecret })) {
      return fail("invalid-signature", 400);
    }
    const result = await markResidentOrderPaid(orderId, paymentId, { expectUid: user.uid });
    if (!result.ok) return fail(result.reason, 400);
    return json({ ok: true });
  } catch (error) {
    return serverError("residents/verify", error);
  }
}
