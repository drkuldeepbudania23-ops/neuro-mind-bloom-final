// Decrypt a Neuro Mind Bloom backup:  BACKUP_ENCRYPTION_KEY=... node scripts/decrypt-backup.mjs backup.nmbbk > backup.json
import { createDecipheriv, createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";

const file = readFileSync(process.argv[2]);
const pass = process.env.BACKUP_ENCRYPTION_KEY || "";
if (!file.subarray(0, 6).equals(Buffer.from("NMBBK1"))) throw new Error("Not a Neuro Mind Bloom backup file");
const d = createDecipheriv("aes-256-gcm", createHash("sha256").update(pass).digest(), file.subarray(6, 18));
d.setAuthTag(file.subarray(18, 34));
process.stdout.write(gunzipSync(Buffer.concat([d.update(file.subarray(34)), d.final()])).toString("utf8"));
