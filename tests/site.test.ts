import assert from "node:assert/strict";
import test from "node:test";
import { SERVICES, feeInPaise, formatINR, getService, serviceCodeFromText, whatsappLink } from "../lib/site";

test("fees match the clinic's published fee schedule", () => {
  assert.equal(getService("psychiatry-consultation")?.fee, 500);
  assert.equal(getService("psychotherapy-first")?.fee, 1500);
  assert.equal(getService("psychotherapy-followup")?.fee, 1000);
  assert.equal(SERVICES.length, 3);
});

test("fee in paise is derived only from known service codes", () => {
  assert.equal(feeInPaise("psychiatry-consultation"), 50000);
  assert.equal(feeInPaise("psychotherapy-first"), 150000);
  assert.equal(feeInPaise("hacker-1-rupee"), null);
});

test("legacy free-text services map to codes", () => {
  assert.equal(serviceCodeFromText("Psychiatric Consultation - ₹500"), "psychiatry-consultation");
  assert.equal(serviceCodeFromText("Psychotherapy Session - ₹2000"), "psychotherapy-first");
  assert.equal(serviceCodeFromText("Psychotherapy – Follow-up Session - ₹1000"), "psychotherapy-followup");
});

test("formatting helpers", () => {
  assert.equal(formatINR(1500), "₹1,500");
  assert.match(whatsappLink("नमस्ते & hi"), /^https:\/\/wa\.me\/919376315331\?text=%E0/);
});

test("official contact and social URLs", async () => {
  const { CLINIC, SOCIAL, YOUTUBE_SUBSCRIBE_URL, WEBSITE } = await import("../lib/site");
  assert.equal(SOCIAL.facebook, "https://www.facebook.com/profile.php?id=61593653543850");
  assert.equal(SOCIAL.instagram, "https://www.instagram.com/neuromindbloom/");
  assert.equal(SOCIAL.youtube, "https://www.youtube.com/@NeuroMindBloom");
  assert.equal(YOUTUBE_SUBSCRIBE_URL, "https://www.youtube.com/@NeuroMindBloom?sub_confirmation=1");
  assert.equal(CLINIC.whatsapp, "919376315331");
  assert.equal(CLINIC.phone, "+918107639481");
  assert.equal(CLINIC.email, "drkuldeepbudania23@gmail.com");
  assert.equal(WEBSITE.url, "https://neuromindbloom.com");
});

test("UPI payment link and payment page URL", async () => {
  const { upiPaymentLink, paymentPageUrl } = await import("../lib/site");
  const link = upiPaymentLink({ vpa: "drkuldeep@okicici", payeeName: "Neuro Mind Bloom", amount: 500, note: "NMB AbC123" });
  assert.equal(link, "upi://pay?pa=drkuldeep%40okicici&pn=Neuro%20Mind%20Bloom&am=500.00&cu=INR&tn=NMB%20AbC123");
  assert.throws(() => upiPaymentLink({ vpa: "not-a-vpa", payeeName: "x", amount: 500, note: "" }));
  assert.throws(() => upiPaymentLink({ vpa: "a@okaxis", payeeName: "x", amount: 0, note: "" }));
  assert.equal(
    paymentPageUrl({ appointmentId: "AbC123xyz", amount: 1500, serviceCode: "psychotherapy-first", lang: "hi" }),
    "https://www.neuromindbloom.com/hi/pay?a=AbC123xyz&amt=1500&s=psychotherapy-first"
  );
});

test("clinic Razorpay UPI QR is a valid UPI link", async () => {
  const { UPI_MERCHANT_QR, upiVpaFromLink } = await import("../lib/site");
  assert.equal(upiVpaFromLink(UPI_MERCHANT_QR), "neuromindbloom266340.rzp@rxairtel");
  assert.match(UPI_MERCHANT_QR, /tr=TnlzgDrmdMu5csqrv2/);
  assert.equal(upiVpaFromLink("https://example.com"), "");
  const { RAZORPAY_ME_URL } = await import("../lib/site");
  assert.equal(RAZORPAY_ME_URL, "https://razorpay.me/@neuromindbloom");
  assert.equal(upiVpaFromLink("upi://pay?pa=bad"), "");
});

test("registration number is not rendered by public components", async () => {
  const fs = await import("node:fs");
  for (const f of ["components/site/HomePage.tsx", "components/site/SiteFooter.tsx", "components/site/ContactPage.tsx", "lib/content/home.ts"]) {
    const src = fs.readFileSync(f, "utf8");
    assert.equal(/registrationNo|30526/.test(src), false, f);
  }
});
