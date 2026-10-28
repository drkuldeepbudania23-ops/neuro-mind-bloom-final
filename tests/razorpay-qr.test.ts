import assert from "node:assert/strict";
import test from "node:test";
import { QR_VALID_SECONDS, buildQrPayload, onlinePaymentRecord, qrCreditFromEvent, qrDocId } from "../lib/payments/razorpay";

const NOW = 1_800_000_000;

test("per-patient QR only for the full standard fee", () => {
  const p = buildQrPayload("AbCdEf123456", "psychiatry-consultation", 500, NOW);
  assert.ok(p);
  assert.equal(p.payment_amount, 50000);
  assert.equal(p.usage, "single_use");
  assert.equal(p.fixed_amount, true);
  assert.equal(p.close_by, NOW + QR_VALID_SECONDS);
  assert.deepEqual(p.notes, { appointmentId: "AbCdEf123456", serviceCode: "psychiatry-consultation", source: "nmb-pay-page" });

  // Discounted / edited amount → no auto QR (static QR + manual entry instead).
  assert.equal(buildQrPayload("AbCdEf123456", "psychiatry-consultation", 1, NOW), null);
  assert.equal(buildQrPayload("AbCdEf123456", "psychiatry-consultation", 400, NOW), null);
  assert.equal(buildQrPayload("AbCdEf123456", "unknown", 500, NOW), null);
  assert.equal(buildQrPayload("../bad", "psychiatry-consultation", 500, NOW), null);
});

test("qr_code.credited webhook is parsed; other events are ignored", () => {
  const event = {
    event: "qr_code.credited",
    payload: {
      qr_code: { entity: { id: "qr_1", notes: { appointmentId: "AbCdEf123456", serviceCode: "psychotherapy-first", source: "nmb-pay-page" } } },
      payment: { entity: { id: "pay_1", amount: 150000, status: "captured" } },
    },
  };
  assert.deepEqual(qrCreditFromEvent(event), {
    qrId: "qr_1",
    paymentId: "pay_1",
    amountPaise: 150000,
    reference: "AbCdEf123456",
    serviceCode: "psychotherapy-first",
  });
  assert.equal(qrCreditFromEvent({ ...event, event: "payment.captured" }), null);
  // QR not created by this site (e.g. the clinic's static QR) → ignored.
  const foreign = structuredClone(event);
  foreign.payload.qr_code.entity.notes.source = "other";
  assert.equal(qrCreditFromEvent(foreign), null);
  const failed = structuredClone(event);
  failed.payload.payment.entity.status = "failed";
  assert.equal(qrCreditFromEvent(failed), null);
  assert.equal(qrCreditFromEvent(null), null);
});

test("QR payment record is marked as Razorpay UPI QR", () => {
  const r = onlinePaymentRecord({ appointmentId: "AbCdEf123456", serviceCode: "psychiatry-consultation", amountPaise: 50000, razorpayQrId: "qr_1", razorpayPaymentId: "pay_1", patientName: "" });
  assert.equal(r.paymentStatus, "Paid");
  assert.equal(r.paymentDetails.mode, "Razorpay UPI QR");
  assert.equal((r.paymentDetails as Record<string, unknown>).razorpayQrId, "qr_1");
  assert.equal("razorpayOrderId" in r.paymentDetails, false);
  assert.equal(qrDocId("AbCdEf123456", 50000), "AbCdEf123456_50000");
});
