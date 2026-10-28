import assert from "node:assert/strict";
import test from "node:test";
import { gmailComposeUrl, isValidEmail, mailtoUrl } from "../lib/emailCompose";

const draft = {
  to: " patient@example.com ",
  subject: "Neuro Mind Bloom – भुगतान QR कोड",
  body: "Hello,\nAmount: ₹500 & pay here:\nhttps://www.neuromindbloom.com/pay?a=1&amt=500",
};

test("Gmail compose link carries recipient, subject and body intact", () => {
  const url = new URL(gmailComposeUrl(draft));
  assert.equal(url.origin + url.pathname, "https://mail.google.com/mail/");
  assert.equal(url.searchParams.get("view"), "cm");
  assert.equal(url.searchParams.get("to"), "patient@example.com");
  assert.equal(url.searchParams.get("su"), draft.subject);
  assert.equal(url.searchParams.get("body"), draft.body);
  assert.equal(url.searchParams.get("authuser"), "drkuldeepbudania23@gmail.com");
});

test("mailto fallback encodes the payment link so '&' doesn't cut the body", () => {
  const url = mailtoUrl(draft);
  assert.ok(url.startsWith("mailto:patient@example.com?subject="));
  const body = decodeURIComponent(url.split("&body=")[1]);
  assert.equal(body, draft.body);
});

test("email validation", () => {
  assert.equal(isValidEmail("a@b.co"), true);
  assert.equal(isValidEmail(" a@b.co "), true);
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail(""), false);
});
