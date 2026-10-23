import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * TOTP (RFC 6238) for the doctor's second factor — works with Google
 * Authenticator, Microsoft Authenticator, Authy, etc. Pure + unit-tested.
 */

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(buf: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(text: string): Buffer {
  const clean = text.toUpperCase().replace(/[\s=-]/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx < 0) throw new Error("Invalid base32");
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

export function generateSecret(): string {
  return base32Encode(randomBytes(20)); // 160-bit, as recommended by RFC 4226
}

export function hotp(secret: string, counter: number, digits = 6): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const mac = createHmac("sha1", base32Decode(secret)).update(buf).digest();
  const offset = mac[mac.length - 1] & 0xf;
  const code = ((mac[offset] & 0x7f) << 24) | (mac[offset + 1] << 16) | (mac[offset + 2] << 8) | mac[offset + 3];
  return String(code % 10 ** digits).padStart(digits, "0");
}

export function totp(secret: string, now: number = Date.now(), step = 30): string {
  return hotp(secret, Math.floor(now / 1000 / step));
}

/**
 * Returns the matched time-step counter (so the caller can refuse re-use of the
 * same code), or null. Accepts ±1 step for phone clock drift.
 */
export function verifyTotp(secret: string, code: string, now: number = Date.now(), lastUsedCounter = -1, step = 30): number | null {
  if (!/^\d{6}$/.test(code)) return null;
  const current = Math.floor(now / 1000 / step);
  for (const c of [current - 1, current, current + 1]) {
    if (c <= lastUsedCounter) continue;
    const expected = Buffer.from(hotp(secret, c));
    const given = Buffer.from(code);
    if (expected.length === given.length && timingSafeEqual(expected, given)) return c;
  }
  return null;
}

export function otpauthUri(secret: string, account: string, issuer = "Neuro Mind Bloom"): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  const q = new URLSearchParams({ secret, issuer, algorithm: "SHA1", digits: "6", period: "30" });
  return `otpauth://totp/${label}?${q.toString()}`;
}

/** 10 one-time recovery codes like "7KQ2-M9XD" (shown once; only hashes are stored). */
export function generateRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => {
    const raw = base32Encode(randomBytes(5)).slice(0, 8);
    return `${raw.slice(0, 4)}-${raw.slice(4)}`;
  });
}

export function hashRecoveryCode(code: string, pepper: string): string {
  const normal = code.toUpperCase().replace(/[^A-Z2-7]/g, "");
  return createHash("sha256").update(`${pepper}:${normal}`).digest("hex");
}
