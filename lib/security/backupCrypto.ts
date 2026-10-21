import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { gunzipSync, gzipSync } from "node:zlib";

/**
 * Encrypted backup format (pure, unit-tested):
 *   "NMBBK1" | 12-byte IV | 16-byte GCM tag | AES-256-GCM( gzip(JSON) )
 * Key = SHA-256(BACKUP_ENCRYPTION_KEY). Decrypt with scripts/decrypt-backup.mjs.
 */
const MAGIC = Buffer.from("NMBBK1");

function key(passphrase: string): Buffer {
  if (!passphrase || passphrase.length < 16) throw new Error("BACKUP_ENCRYPTION_KEY must be at least 16 characters");
  return createHash("sha256").update(passphrase).digest();
}

export function encryptBackup(data: unknown, passphrase: string): Buffer {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(passphrase), iv);
  const body = Buffer.concat([c.update(gzipSync(Buffer.from(JSON.stringify(data)))), c.final()]);
  return Buffer.concat([MAGIC, iv, c.getAuthTag(), body]);
}

export function decryptBackup(file: Buffer, passphrase: string): unknown {
  if (!file.subarray(0, 6).equals(MAGIC)) throw new Error("Not a Neuro Mind Bloom backup file");
  const iv = file.subarray(6, 18);
  const tag = file.subarray(18, 34);
  const d = createDecipheriv("aes-256-gcm", key(passphrase), iv);
  d.setAuthTag(tag);
  const zipped = Buffer.concat([d.update(file.subarray(34)), d.final()]);
  return JSON.parse(gunzipSync(zipped).toString("utf8"));
}

/** Firestore values → plain JSON (Timestamps become ISO strings). */
export function toPlain(value: unknown): unknown {
  if (value === null || value === undefined) return value ?? null;
  if (Array.isArray(value)) return value.map(toPlain);
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    const v = value as { toDate?: () => Date };
    if (typeof v.toDate === "function") return v.toDate().toISOString();
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, x]) => [k, toPlain(x)]));
  }
  return value;
}
