import assert from "node:assert/strict";
import test from "node:test";
import { PUBLIC_REVIEWS_ENABLED, publicFeedback, validateFeedback, type FeedbackDoc, type FeedbackInput } from "../lib/feedback";
import { canPublishStory, emptyStory, publicStory, validateStory } from "../lib/stories";

const base: FeedbackInput = { rating: 5, name: " Ravi  K ", comment: "Clear explanation and kind approach.", consentStore: true, consentDisplay: false, visitDate: "", language: "en" };

test("feedback: valid submission is normalised, pending and carries a consent record", () => {
  const r = validateFeedback(base, "2026-10-12");
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.doc.status, "pending");
  assert.equal(r.doc.name, "Ravi K");
  assert.equal(r.doc.reviewDate, "2026-10-12");
  assert.match(r.doc.consentText, /store this feedback/);
  assert.ok(!r.doc.consentText.includes("publicly"));
  const withDisplay = validateFeedback({ ...base, consentDisplay: true, language: "hi" }, "2026-10-12");
  assert.ok(withDisplay.ok && /सार्वजनिक/.test(withDisplay.doc.consentText));
});

test("feedback: rejects bad rating, missing consent, contact details, future dates", () => {
  const bad = (p: Partial<FeedbackInput>) => {
    const r = validateFeedback({ ...base, ...p }, "2026-10-12");
    return r.ok ? [] : r.errors;
  };
  assert.deepEqual(bad({ rating: 0 }), ["rating"]);
  assert.deepEqual(bad({ rating: 4.5 }), ["rating"]);
  assert.deepEqual(bad({ consentStore: false }), ["consent"]);
  assert.deepEqual(bad({ comment: "ok" }), ["commentShort"]);
  assert.deepEqual(bad({ comment: "x".repeat(1001) }), ["comment"]);
  assert.deepEqual(bad({ comment: "Call me on 98765 43210 please" }), ["contact"]);
  assert.deepEqual(bad({ comment: "Write to me at a@b.co thanks" }), ["contact"]);
  assert.deepEqual(bad({ visitDate: "2026-12-01" }), ["date"]);
});

test("feedback: nothing is public while the flag is off; only approved + consented when on", () => {
  assert.equal(PUBLIC_REVIEWS_ENABLED, false);
  const mk = (status: FeedbackDoc["status"], consentDisplay: boolean) => ({ ...base, status, consentDisplay, consentText: "", consentVersion: "", reviewDate: "2026-10-12" }) as FeedbackDoc;
  const all = [mk("approved", true), mk("approved", false), mk("pending", true), mk("rejected", true)];
  assert.deepEqual(publicFeedback(all), []);
  assert.equal(publicFeedback(all, true).length, 1);
});

test("stories: publishing needs review, consent for real stories, and no guarantees", () => {
  const long = { en: "Recovery took time. ".repeat(15), hi: "रिकवरी में समय लगा। ".repeat(12) };
  const s = { ...emptyStory("2026-10-12"), title: { en: "Learning to sleep again", hi: "फिर से सोना सीखना" }, narrative: long };
  assert.ok(validateStory(s, false).length === 0, "draft is fine");
  assert.ok(!canPublishStory(s), "unreviewed cannot publish");
  assert.ok(canPublishStory({ ...s, doctorReviewed: true }), "reviewed fictional example can publish");
  const real = { ...s, fictional: false, doctorReviewed: true };
  assert.ok(!canPublishStory(real), "real story without consent cannot publish");
  assert.ok(canPublishStory({ ...real, consent: { documented: true, note: "signed form, clinic file", date: "2026-10-01" } }));
  const guaranteed = { ...s, doctorReviewed: true, narrative: { ...long, en: long.en + " He was cured forever." } };
  assert.ok(validateStory(guaranteed, false).some((e) => /guaranteed/.test(e)));
  assert.ok(validateStory({ ...s, narrative: { ...long, hi: long.hi + " पक्का इलाज" } }, false).some((e) => /guaranteed/.test(e)));
  assert.ok(!("consent" in publicStory(real)), "consent record never leaves the server");
});
