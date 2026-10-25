import { test } from "node:test";
import assert from "node:assert/strict";
import { feedbackPageUrl, feedbackRequestMessage } from "../lib/feedback";

test("feedback link points to the right language page", () => {
  assert.equal(feedbackPageUrl("en"), "https://neuromindbloom.com/feedback");
  assert.equal(feedbackPageUrl("hi"), "https://neuromindbloom.com/hi/feedback");
});

test("feedback message works with or without a name and includes the link", () => {
  const hi = feedbackRequestMessage("Ramesh", "hi");
  assert.match(hi.text, /नमस्ते Ramesh/);
  assert.ok(hi.text.includes("https://neuromindbloom.com/hi/feedback"));
  const en = feedbackRequestMessage("", "en");
  assert.match(en.text, /^Hello,/);
  assert.ok(en.text.includes("https://neuromindbloom.com/feedback"));
});
