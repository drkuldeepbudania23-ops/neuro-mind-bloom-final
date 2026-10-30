import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_PLANS,
  buildResidentOrder,
  extendAccess,
  getPlan,
  hasAccess,
  resolvePlans,
  validPlanPrices,
  validateComment,
  validateContent,
  validateProfile,
  watermarkText,
  youtubeId,
} from "../lib/residents";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 9, 30, 12, 0, 0);

test("plan prices: defaults, valid overrides only", () => {
  assert.deepEqual(resolvePlans(null).map((p) => p.price), [999, 9999]);
  assert.deepEqual(resolvePlans({ monthly: { price: 1499 }, yearly: { price: 12999 } }).map((p) => p.price), [1499, 12999]);
  // Invalid overrides fall back to the default price.
  assert.deepEqual(resolvePlans({ monthly: { price: -5 }, yearly: { price: 10.5 } }).map((p) => p.price), [999, 9999]);
  assert.deepEqual(resolvePlans({ monthly: { price: "abc" } }).map((p) => p.price), [999, 9999]);
  // Days never come from storage.
  assert.deepEqual(resolvePlans({ monthly: { price: 500, days: 9999 } }).map((p) => p.days), [30, 365]);
  assert.equal(getPlan(DEFAULT_PLANS, "yearly")?.price, 9999);
  assert.equal(getPlan(DEFAULT_PLANS, "lifetime"), undefined);
});

test("doctor price edits are validated", () => {
  assert.equal(validPlanPrices({ monthly: { price: 799 }, yearly: { price: 7999 } }).ok, true);
  assert.equal(validPlanPrices({ monthly: { price: 0 }, yearly: { price: 7999 } }).ok, false);
  assert.equal(validPlanPrices({ monthly: { price: 799 } }).ok, false);
  assert.equal(validPlanPrices({ monthly: { price: 799.5 }, yearly: { price: 7999 } }).ok, false);
});

test("access: new purchase starts now, early renewal stacks on remaining days", () => {
  assert.equal(extendAccess(null, 30, NOW), NOW + 30 * DAY);
  assert.equal(extendAccess(NOW - 5 * DAY, 30, NOW), NOW + 30 * DAY); // expired → from now
  assert.equal(extendAccess(NOW + 10 * DAY, 30, NOW), NOW + 40 * DAY); // active → adds on
  assert.equal(hasAccess(NOW + 1, NOW), true);
  assert.equal(hasAccess(NOW, NOW), false);
  assert.equal(hasAccess(null, NOW), false);
});

test("order amount comes from the plan, in paise, with a short receipt", () => {
  const plan = getPlan(DEFAULT_PLANS, "monthly")!;
  const order = buildResidentOrder("UserUid1234567890abcdef", plan, NOW)!;
  assert.equal(order.amount, 99900);
  assert.equal(order.currency, "INR");
  assert.ok(order.receipt.length <= 40);
  assert.deepEqual(order.notes, { kind: "resident-subscription", uid: "UserUid1234567890abcdef", planId: "monthly" });
  assert.equal(buildResidentOrder("../../x", plan, NOW), null);
});

test("profile validation", () => {
  const ok = validateProfile({ name: "  Dr  Asha ", mobile: "+91 98765 43210", college: "GMC Kota", course: "MD Psychiatry", year: "2nd" });
  assert.equal(ok.ok, true);
  if (ok.ok) {
    assert.equal(ok.value.name, "Dr Asha");
    assert.equal(ok.value.mobile, "9876543210");
  }
  assert.equal(validateProfile({ name: "A", mobile: "9876543210", college: "X", course: "MD" }).ok, false);
  assert.equal(validateProfile({ name: "Asha", mobile: "12345", college: "GMC", course: "MD" }).ok, false);
  assert.equal(validateProfile({ name: "Asha", mobile: "9876543210", college: "", course: "MD" }).ok, false);
});

test("YouTube links and ids", () => {
  assert.equal(youtubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1"), "dQw4w9WgXcQ");
  assert.equal(youtubeId("https://youtu.be/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(youtubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(youtubeId("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(youtubeId("https://evil.com/?v=dQw4w9WgXcQ"), "");
  assert.equal(youtubeId(""), "");
});

test("content validation", () => {
  // Drafts may be incomplete.
  assert.equal(validateContent({ type: "video", title: "Mood stabilisers", status: "draft" }).ok, true);
  // Published video needs a valid YouTube id.
  assert.equal(validateContent({ type: "video", title: "Mood stabilisers", status: "published" }).ok, false);
  const v = validateContent({ type: "video", title: "Mood stabilisers", videoId: "https://youtu.be/dQw4w9WgXcQ", status: "published", pdfPath: "residents/notes/abcdef123.pdf" });
  assert.equal(v.ok, true);
  if (v.ok) {
    assert.equal(v.value.videoId, "dQw4w9WgXcQ");
    assert.equal(v.value.pdfPath, ""); // only notes carry a PDF
  }
  // Notes: a PDF or some text.
  assert.equal(validateContent({ type: "note", title: "Lithium", status: "published" }).ok, false);
  assert.equal(validateContent({ type: "note", title: "Lithium", status: "published", pdfPath: "residents/notes/abcdef123.pdf" }).ok, true);
  // Path traversal / other buckets rejected.
  assert.equal(validateContent({ type: "note", title: "Lithium", status: "draft", pdfPath: "../private/x.pdf" }).ok, false);
  assert.equal(validateContent({ type: "note", title: "Lithium", status: "draft", pdfPath: "residents/licensed/u/x.pdf" }).ok, false);
  // Cases need a write-up before publishing.
  assert.equal(validateContent({ type: "case", title: "Catatonia case", status: "published", body: "short" }).ok, false);
  assert.equal(validateContent({ type: "case", title: "Catatonia case", status: "published", body: "A 24-year-old man presented with mutism and posturing for 5 days." }).ok, true);
  assert.equal(validateContent({ type: "podcast", title: "x", status: "draft" }).ok, false);
  assert.equal(validateContent({ type: "case", title: "ab", status: "draft" }).ok, false);
});

test("comments", () => {
  assert.equal(validateComment("  Good discussion, thanks  "), "Good discussion, thanks");
  assert.equal(validateComment("x"), null);
  assert.equal(validateComment("y".repeat(2001)), null);
  assert.equal(validateComment(42), null);
});

test("watermark names the licensee", () => {
  const text = watermarkText({ name: "Asha Verma", mobile: "9876543210" }, "asha@example.com", new Date(NOW));
  assert.match(text, /Asha Verma/);
  assert.match(text, /\+91 9876543210/);
  assert.match(text, /asha@example\.com/);
  assert.match(text, /2026-10-30/);
});
