import { test } from "node:test";
import assert from "node:assert/strict";
import {
  WHATSAPP_TEMPLATES,
  escapeHtml,
  isEmail,
  istDate,
  prettyDate,
  renderNotification,
  toWhatsAppNumber,
  waParam,
  type NotificationKind,
} from "../lib/notifications/templates";

const KINDS = Object.keys(WHATSAPP_TEMPLATES) as NotificationKind[];

test("every notification renders in Hindi and English with filled params", () => {
  for (const kind of KINDS) {
    for (const lang of ["en", "hi"] as const) {
      const r = renderNotification(
        kind,
        { patientName: "Ramesh", service: "Psychiatry", date: "2026-10-12", time: "10:00", amount: 500, link: "https://www.neuromindbloom.com/api/rx/x.y", mobile: "9876543210" },
        lang
      );
      assert.ok(r.whatsapp.template.startsWith("nmb_"), kind);
      assert.ok(r.whatsapp.params.length > 0);
      for (const p of r.whatsapp.params) {
        assert.ok(p.length > 0 && !/[\n\t]/.test(p) && !/ {4}/.test(p), `${kind} param "${p}"`);
      }
      assert.ok(r.email.subject.includes("Neuro Mind Bloom"));
      assert.ok(r.email.text.includes("Ramesh"));
      assert.ok(!r.email.html.includes("<script"));
    }
  }
});

test("doctor alert is English-only and has no patient sign-off", () => {
  const r = renderNotification("new_booking_alert", { patientName: "A B", mobile: "9876543210", concern: "neend\nnahi" }, "hi");
  assert.equal(r.whatsapp.language, "en");
  assert.equal(r.whatsapp.params[4], "neend nahi");
});

test("prescription notification carries the PDF as a WhatsApp document", () => {
  const r = renderNotification("prescription_ready", { patientName: "X", link: "https://a.b/api/rx/t" }, "en");
  assert.equal(r.whatsapp.documentLink, "https://a.b/api/rx/t");
  assert.equal(r.whatsapp.documentName, "Prescription.pdf");
  assert.match(r.email.html, /Download prescription/);
});

test("user text is escaped in email HTML", () => {
  const r = renderNotification("booking_received", { patientName: "<img src=x onerror=alert(1)>" }, "en");
  assert.ok(!r.email.html.includes("<img"));
  assert.equal(escapeHtml(`a&<>"'`), "a&amp;&lt;&gt;&quot;&#39;");
});

test("waParam, phone and email helpers", () => {
  assert.equal(waParam("a\n\nb     c"), "a b   c");
  assert.equal(waParam(""), "-");
  assert.equal(toWhatsAppNumber("98765 43210"), "919876543210");
  assert.equal(toWhatsAppNumber("+91-98765-43210"), "919876543210");
  assert.equal(toWhatsAppNumber("09876543210"), "919876543210");
  assert.equal(toWhatsAppNumber("12345"), null);
  assert.equal(toWhatsAppNumber("5876543210"), null);
  assert.ok(isEmail("a.b@gmail.com"));
  assert.ok(!isEmail("not an email"));
  assert.ok(!isEmail("a@b"));
});

test("IST dates for follow-up reminders", () => {
  // 2026-10-11 20:00 UTC is already 12 Oct 01:30 in India
  const now = new Date("2026-10-11T20:00:00Z");
  assert.equal(istDate(now), "2026-10-12");
  assert.equal(istDate(now, 1), "2026-10-13");
  assert.equal(prettyDate("2026-10-13"), "13 Oct 2026");
});
