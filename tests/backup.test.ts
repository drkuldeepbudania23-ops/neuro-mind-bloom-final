import { test } from "node:test";
import assert from "node:assert/strict";
import { decryptBackup, encryptBackup, toPlain } from "../lib/security/backupCrypto";

test("backup round trip with Hindi text; wrong key and tampering fail", () => {
  const data = { patients: { "NMB-000001": { name: "रमेश कुमार", visits: 3 } } };
  const file = encryptBackup(data, "a-very-long-backup-passphrase");
  assert.equal(file.subarray(0, 6).toString(), "NMBBK1");
  assert.ok(!file.includes(Buffer.from("रमेश")), "encrypted, not plain text");
  assert.deepEqual(decryptBackup(file, "a-very-long-backup-passphrase"), data);
  assert.throws(() => decryptBackup(file, "another-long-passphrase!!"));
  const tampered = Buffer.from(file);
  tampered[tampered.length - 1] ^= 1;
  assert.throws(() => decryptBackup(tampered, "a-very-long-backup-passphrase"));
  assert.throws(() => encryptBackup(data, "short"));
});

test("Firestore values become plain JSON", () => {
  const ts = { toDate: () => new Date("2026-10-12T05:00:00Z") };
  assert.deepEqual(toPlain({ a: ts, b: [ts, 1], c: { d: null } }), { a: "2026-10-12T05:00:00.000Z", b: ["2026-10-12T05:00:00.000Z", 1], c: { d: null } });
});
