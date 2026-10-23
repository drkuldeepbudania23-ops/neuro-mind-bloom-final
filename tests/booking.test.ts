import assert from "node:assert/strict";
import test from "node:test";
import { normaliseMobile, todayInIndia, validateBooking, type BookingInput } from "../lib/booking";

const NOW = new Date("2026-10-11T18:00:00Z"); // 11:30 PM IST, 11 Oct
const base: BookingInput = {
  name: "  Ramesh   Kumar ",
  mobile: "+91 98765-43210",
  email: "",
  serviceCode: "psychotherapy-first",
  date: "2026-10-12",
  time: "11:30",
  concern: "नींद नहीं आती",
  consent: true,
  lang: "hi",
};

test("valid booking produces a Firestore-rules-compatible document", () => {
  const r = validateBooking(base, NOW);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.doc.patientName, "Ramesh Kumar");
  assert.equal(r.doc.mobile, "919876543210");
  assert.match(r.doc.mobile, /^[0-9]{10,13}$/);
  assert.equal(r.doc.serviceCode, "psychotherapy-first");
  assert.equal(r.doc.service, "Psychotherapy – First Session - ₹1500");
  assert.equal(r.doc.status, "pending");
  assert.equal(r.doc.language, "hi");
  assert.equal("email" in r.doc, false);
});

test("rejects bad input with specific error keys", () => {
  const r = validateBooking({ ...base, name: "A", mobile: "12345", serviceCode: "free", date: "2026-10-10", time: "", consent: false, email: "x@" }, NOW);
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.deepEqual(new Set(r.errors), new Set(["name", "mobile", "service", "datePast", "time", "consent", "email"]));
});

test("rejects very long concern text", () => {
  const r = validateBooking({ ...base, concern: "x".repeat(2001) }, NOW);
  assert.equal(r.ok, false);
});

test("IST date and mobile normalisation", () => {
  assert.equal(todayInIndia(new Date("2026-10-11T19:00:00Z")), "2026-10-12"); // 00:30 IST next day
  assert.equal(normaliseMobile("09876543210"), "9876543210");
});
