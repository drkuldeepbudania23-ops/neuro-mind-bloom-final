import test from "node:test";
import assert from "node:assert/strict";
import { toWaNumber } from "../lib/whatsapp";

test("Indian numbers in any format get a single 91", () => {
  for (const v of ["9876543210", "98765 43210", "09876543210", "919876543210", "+91 98765 43210", "+91-098765-43210", "0091 9876543210"]) {
    assert.equal(toWaNumber(v), "919876543210", v);
  }
});

test("foreign numbers keep their own country code", () => {
  assert.equal(toWaNumber("+971 50 123 4567"), "971501234567"); // UAE
  assert.equal(toWaNumber("+1 (415) 555-2671"), "14155552671"); // USA
  assert.equal(toWaNumber("+44 7700 900123"), "447700900123"); // UK
  assert.equal(toWaNumber("00971501234567"), "971501234567");
  assert.equal(toWaNumber("971501234567"), "971501234567"); // pasted without +
  assert.equal(toWaNumber("‪+971 50 123 4567‬"), "971501234567"); // hidden marks from WhatsApp copy
});

test("a 10-digit foreign number with + is not mistaken for an Indian mobile", () => {
  assert.equal(toWaNumber("+65 9123 4567"), "6591234567"); // Singapore
  assert.equal(toWaNumber(`+${toWaNumber("+65 9123 4567")}`), "6591234567"); // stable when re-parsed
});

test("unusable numbers are refused rather than guessed", () => {
  for (const v of ["", null, undefined, "12345", "5876543210", "4155552671", "+91 12345 67890", "+12", "+1234567890123456"]) {
    assert.equal(toWaNumber(v), "", String(v));
  }
});
