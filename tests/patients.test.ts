import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTimeline, firstNameKey, formatUhid, groupPeople, isUhid, mobileVariants, normaliseMobile, pickMatch, samePerson } from "../lib/patients";

test("UHID format", () => {
  assert.equal(formatUhid(1), "NMB-000001");
  assert.equal(formatUhid(123456), "NMB-123456");
  assert.throws(() => formatUhid(0));
  assert.ok(isUhid("NMB-000123"));
  assert.ok(!isUhid("NMB-123"));
  assert.ok(!isUhid("../x"));
});

test("mobile normalisation and variants", () => {
  for (const v of ["9876543210", "+91 98765 43210", "+91-9876543210", "09876543210", "919876543210", "0091 98765 43210"]) {
    assert.equal(normaliseMobile(v), "9876543210", v);
  }
  assert.equal(normaliseMobile("12345"), "");
  assert.equal(normaliseMobile("5876543210"), "");
  assert.equal(normaliseMobile("4419876543210"), ""); // foreign prefix
  const v = mobileVariants("9876543210");
  assert.ok(v.includes("+91 98765 43210") && v.length <= 30);
});

test("same family phone: first name decides", () => {
  assert.equal(firstNameKey("Dr. Ramesh Kumar"), "ramesh");
  assert.equal(firstNameKey("रमेश कुमार"), "रमेश");
  assert.ok(samePerson("Ramesh Kumar", "ramesh"));
  assert.ok(samePerson("Ram", "Ramesh")); // short form typed later
  assert.ok(!samePerson("Ramesh", "Sita"));
  assert.ok(!samePerson("", "Sita"));
  assert.equal(pickMatch([{ name: "Sita Devi" }, { name: "Ramesh" }], "ramesh kumar")?.name, "Ramesh");
});

test("timeline merges and sorts all visit data", () => {
  const t = buildTimeline({
    records: [{ id: "1760000000000", prescriptionId: "NMB-1", signedAt: "x", diagnosis: "F32", rx: [{ brand: "Esc", strength: "10 mg" }] }],
    appointments: [{ id: "a1", createdAt: { seconds: 1760100000 }, status: "confirmed", service: "Psychiatry" }],
    payments: [{ id: "a1", paymentStatus: "Paid", createdAt: new Date(1760100500000), paymentDetails: { finalAmount: 500, paymentMode: "UPI" } }],
    followUps: [{ id: "f1", createdAt: 1760200000000, nextVisitDate: "2026-11-01" }],
  });
  assert.deepEqual(t.map((e) => e.kind), ["followup", "payment", "appointment", "prescription"]);
  assert.match(t[3].detail, /Dx: F32 — Rx: Esc 10 mg/);
  assert.equal(t[1].detail, "Rs. 500 — UPI");
});

test("backfill groups the same person, separates family members", () => {
  const g = groupPeople([
    { id: "r1", name: "Ramesh Kumar", mobile: "+91 98765 43210", at: 3, age: "34" },
    { id: "r2", name: "ramesh", mobile: "9876543210", at: 2 },
    { id: "r3", name: "Sita Devi", mobile: "9876543210", at: 1 },
    { id: "r4", name: "No Phone", mobile: "", at: 1 },
  ]);
  assert.equal(g.length, 2);
  // oldest first: Sita (at 1) before Ramesh (first seen at 2)
  assert.deepEqual(g[0].ids, ["r3"]);
  assert.deepEqual(g[1].ids, ["r1", "r2"]);
  assert.equal(g[1].name, "Ramesh Kumar");
  assert.equal(g[1].age, "34");
});
