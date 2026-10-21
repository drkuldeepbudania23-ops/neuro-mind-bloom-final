import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { buildOrderPayload, onlinePaymentRecord, verifyCheckoutSignature, verifyWebhookSignature } from "../lib/payments/razorpay";

const SECRET = "test_secret_123";

test("checkout signature verification", () => {
  const signature = createHmac("sha256", SECRET).update("order_ABC|pay_XYZ").digest("hex");
  assert.equal(verifyCheckoutSignature({ orderId: "order_ABC", paymentId: "pay_XYZ", signature, keySecret: SECRET }), true);
  assert.equal(verifyCheckoutSignature({ orderId: "order_ABC", paymentId: "pay_OTHER", signature, keySecret: SECRET }), false);
  assert.equal(verifyCheckoutSignature({ orderId: "order_ABC", paymentId: "pay_XYZ", signature: "zz", keySecret: SECRET }), false);
  assert.equal(verifyCheckoutSignature({ orderId: "order_ABC", paymentId: "pay_XYZ", signature, keySecret: "" }), false);
});

test("webhook signature verification", () => {
  const body = JSON.stringify({ event: "payment.captured" });
  const sig = createHmac("sha256", "whsec").update(body).digest("hex");
  assert.equal(verifyWebhookSignature(body, sig, "whsec"), true);
  assert.equal(verifyWebhookSignature(body + " ", sig, "whsec"), false);
});

test("order amount comes from the service code, never the client", () => {
  assert.deepEqual(buildOrderPayload("AbCdEf123456", "psychotherapy-followup"), {
    amount: 100000,
    currency: "INR",
    receipt: "nmb_AbCdEf123456",
    notes: { appointmentId: "AbCdEf123456", serviceCode: "psychotherapy-followup" },
  });
  assert.equal(buildOrderPayload("AbCdEf123456", "unknown"), null);
  assert.equal(buildOrderPayload("../../etc", "psychiatry-consultation"), null);
});

test("online payment record matches the doctor payment schema", () => {
  const r = onlinePaymentRecord({ appointmentId: "A1b2C3d4", serviceCode: "psychiatry-consultation", amountPaise: 50000, razorpayOrderId: "order_1", razorpayPaymentId: "pay_1", patientName: "X" });
  assert.equal(r.paymentStatus, "Paid");
  assert.equal(r.paymentDetails.originalFee, 500);
  assert.equal(r.paymentDetails.finalAmount, 500);
  assert.equal(r.paymentDetails.discount, 0);
});
