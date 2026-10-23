import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BACKUP_FORMAT,
  backupFromStorage,
  buildPlan,
  cleanValue,
  isValidDocId,
  parseBackupFile,
  parseList,
  planCounts,
} from "../lib/legacyImport";

test("isValidDocId accepts normal ids and rejects unsafe ones", () => {
  assert.equal(isValidDocId("1760000000000"), true);
  assert.equal(isValidDocId("NMB-RX-12"), true);
  for (const bad of ["", " 12", "a/b", ".", "..", "__x__", 12, null, undefined, "x".repeat(129)]) {
    assert.equal(isValidDocId(bad), false, String(bad));
  }
});

test("cleanValue drops undefined/functions and keeps nested data", () => {
  const out = cleanValue({ a: 1, b: undefined, c: () => 1, d: [1, undefined, { e: "x" }], f: NaN, __g__: 1 }) as Record<string, unknown>;
  assert.deepEqual(out, { a: 1, d: [1, { e: "x" }], f: null });
});

test("parseList handles raw strings, arrays and junk", () => {
  assert.deepEqual(parseList('[{"id":"1"}]'), [{ id: "1" }]);
  assert.deepEqual(parseList([{ id: "1" }]), [{ id: "1" }]);
  assert.deepEqual(parseList("not json"), []);
  assert.deepEqual(parseList('{"id":"1"}'), []);
  assert.deepEqual(parseList(null), []);
});

test("buildPlan maps keys to kinds, converts numeric ids, de-duplicates and counts invalid", () => {
  const plan = buildPlan({
    nmb_followups: JSON.stringify([
      { id: "f1", patient: "Ramesh", improvement: "better" },
      { id: "f1", patient: "dup" },
      { patient: "no id" },
    ]),
    nmb_prescriptions: [{ id: 1760000000000, patientName: "Sita", rx: [{ name: "Tab X", dose: undefined }] }, "junk"],
    nmb_payments: "[]",
  });
  assert.equal(plan.followUps.length, 1);
  assert.equal(plan.followUps[0].patient, "Ramesh");
  assert.equal(plan.prescriptions[0].id, "1760000000000");
  assert.deepEqual(plan.prescriptions[0].rx, [{ name: "Tab X" }]);
  assert.equal(plan.payments.length, 0);
  assert.equal(plan.invalid, 3);
  assert.deepEqual(planCounts(plan), { followUps: 1, prescriptions: 1, payments: 0, total: 2, invalid: 3 });
});

test("backupFromStorage + parseBackupFile round-trip", () => {
  const store: Record<string, string> = { nmb_followups: '[{"id":"f1"}]' };
  const backup = backupFromStorage((k) => store[k] ?? null, "https://www.neuromindbloom.com");
  assert.equal(backup.format, BACKUP_FORMAT);
  assert.equal(backup.data.nmb_prescriptions, "[]");
  const again = parseBackupFile(JSON.stringify(backup));
  assert.equal(again.origin, "https://www.neuromindbloom.com");
  assert.equal(buildPlan(again.data).followUps.length, 1);
});

test("parseBackupFile accepts a plain object and rejects other files", () => {
  assert.equal(buildPlan(parseBackupFile('{"nmb_followups":"[{\\"id\\":\\"a\\"}]"}').data).followUps.length, 1);
  assert.throws(() => parseBackupFile("nope"), /not a valid backup/);
  assert.throws(() => parseBackupFile("[1,2]"), /not a valid backup/);
  assert.throws(() => parseBackupFile('{"other":1}'), /No Neuro Mind Bloom/);
});
