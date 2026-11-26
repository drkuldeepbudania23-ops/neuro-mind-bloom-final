import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalPrescription, hashPrescription, newPrescriptionId, signedAtText, validateForSigning } from "../lib/rx/signing";

test("canonical content drops unknown fields and is order-independent", () => {
  const a = canonicalPrescription({ patientName: " Ramesh ", rx: [{ brand: "Esc", strength: "10 mg", evil: "x" }], hacked: true, paymentClearance: { x: 1 } });
  const b = canonicalPrescription({ rx: [{ strength: "10 mg", brand: "Esc" }], patientName: "Ramesh" });
  assert.equal(hashPrescription(a), hashPrescription(b));
  assert.ok(!("hacked" in a));
  assert.ok(!("evil" in (a.rx![0] as object)));
  assert.equal(a.consultationType, "opd");
  assert.equal(canonicalPrescription({ isTeleconsultation: true }).consultationType, "teleconsultation");
});

test("any clinical change changes the hash", () => {
  const base = { patientName: "Ramesh", rx: [{ brand: "Esc", strength: "10 mg", duration: "30 days" }] };
  const h = hashPrescription(canonicalPrescription(base));
  assert.notEqual(h, hashPrescription(canonicalPrescription({ ...base, rx: [{ brand: "Esc", strength: "20 mg", duration: "30 days" }] })));
  assert.notEqual(h, hashPrescription(canonicalPrescription({ ...base, advice: "x" })));
});

test("limits and validation", () => {
  const c = canonicalPrescription({ patientName: "x".repeat(500), rx: Array.from({ length: 100 }, () => ({ brand: "a" })) });
  assert.equal(c.patientName.length, 80);
  assert.equal(c.rx!.length, 40);
  assert.equal(validateForSigning(canonicalPrescription({ patientName: "R" })), "patient-name");
  assert.equal(validateForSigning(canonicalPrescription({ patientName: "Ramesh" })), "empty");
  assert.equal(validateForSigning(canonicalPrescription({ patientName: "Ramesh", diagnosis: "F32" })), null);
});

test("Rx ID uses India date; signing time in IST", () => {
  // 2026-10-11 20:00 UTC = 12 Oct 01:30 IST
  const now = new Date("2026-10-11T20:00:00Z");
  assert.equal(newPrescriptionId(now, () => 42), "NMB-20261012-00000042");
  assert.match(signedAtText(now), /^12\/10\/2026, 0?1:30\s?am$/i);
});

test("consultation date: only added when set, part of the hash, and range-checked", async () => {
  const { consultationDateProblem } = await import("../lib/rx/signing");
  const base = { patientName: "Ramesh", diagnosis: "Depression" };
  // Old prescriptions (no date) keep exactly the same canonical content → same hash.
  assert.equal("consultationDate" in canonicalPrescription(base), false);
  assert.equal(canonicalPrescription({ ...base, consultationDate: "bad" }).consultationDate, undefined);
  const dated = canonicalPrescription({ ...base, consultationDate: "2026-11-20" });
  assert.equal(dated.consultationDate, "2026-11-20");
  assert.notEqual(hashPrescription(dated), hashPrescription(canonicalPrescription(base)));
  const now = new Date("2026-11-24T06:00:00Z");
  assert.equal(consultationDateProblem(undefined, now), null);
  assert.equal(consultationDateProblem("2026-11-24", now), null);
  assert.equal(consultationDateProblem("2026-11-20", now), null);
  assert.equal(consultationDateProblem("2026-11-25", now), "future");
  assert.equal(consultationDateProblem("2026-10-01", now), "too-old");
});

test("correction: original date may be older than 30 days; date read from Rx ID", async () => {
  const { consultationDateProblem, dateFromPrescriptionId } = await import("../lib/rx/signing");
  const now = new Date("2026-11-24T06:00:00Z");
  assert.equal(dateFromPrescriptionId("NMB-20260915-12345678"), "2026-09-15");
  assert.equal(dateFromPrescriptionId("bad"), "");
  assert.equal(consultationDateProblem("2026-09-15", now), "too-old");
  assert.equal(consultationDateProblem("2026-09-15", now, "2026-09-15"), null);
  assert.equal(consultationDateProblem("2026-09-10", now, "2026-09-15"), "too-old");
});
