import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, expiring links that let a patient download THEIR e-prescription PDF
 * without logging in:  /api/rx/<token>
 *   token = base64url(recordId + "." + expiryUnixSeconds) + "." + hmacSha256
 * The record id alone is useless without the server secret (RX_LINK_SECRET).
 */

const DAY = 24 * 60 * 60;

function b64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createRxToken(recordId: string, secret: string, ttlDays = 30, now: Date = new Date()): string {
  if (!secret || secret.length < 16) throw new Error("RX_LINK_SECRET must be at least 16 characters");
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(recordId)) throw new Error("Invalid record id");
  const exp = Math.floor(now.getTime() / 1000) + Math.round(ttlDays * DAY);
  const payload = b64url(`${recordId}.${exp}`);
  return `${payload}.${sign(payload, secret)}`;
}

/** Returns the record id if the token is genuine and not expired, else null. */
export function verifyRxToken(token: string, secret: string, now: Date = new Date()): string | null {
  if (!secret || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, mac] = parts;
  const expected = sign(payload, secret);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  let decoded = "";
  try {
    decoded = Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const dot = decoded.lastIndexOf(".");
  const recordId = decoded.slice(0, dot);
  const exp = Number(decoded.slice(dot + 1));
  if (!recordId || !Number.isFinite(exp)) return null;
  if (Math.floor(now.getTime() / 1000) > exp) return null;
  return recordId;
}

/**
 * Derive a separate key per purpose ("rx", "verify", "video") from one secret,
 * so a token made for one purpose can never be replayed for another.
 */
export function purposeSecret(secret: string, purpose: string): string {
  if (!secret) return "";
  return createHmac("sha256", secret).update(`nmb:${purpose}`).digest("base64url");
}
