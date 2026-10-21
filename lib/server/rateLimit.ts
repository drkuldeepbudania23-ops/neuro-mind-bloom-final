import "server-only";
import { createHash } from "node:crypto";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";
import { clientIp, rateDecision, type Window } from "../security/rateLimit";

/**
 * Firestore-backed rate limit (works on Vercel without extra services).
 * Key example: "booking-notify:<ip>". Returns { allowed, retryAfterSec }.
 * Fails OPEN if the database is unreachable, so patients are never locked out
 * by an outage — the limits are a spam brake, not the main security control.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  if (!isAdminConfigured()) return { allowed: true, retryAfterSec: 0 };
  const id = createHash("sha256").update(key).digest("hex").slice(0, 40);
  const ref = adminDb().collection("rateLimits").doc(id);
  try {
    return await adminDb().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const prev = snap.exists ? (snap.data() as Window) : null;
      const now = Date.now();
      const d = rateDecision(prev, now, limit, windowSeconds * 1000);
      tx.set(ref, { ...d.next, expiresAt: new Date(d.next.start + windowSeconds * 1000 * 2) });
      return { allowed: d.allowed, retryAfterSec: d.retryAfterSec };
    });
  } catch (error) {
    console.error("rateLimit", error);
    return { allowed: true, retryAfterSec: 0 };
  }
}

export async function rateLimitByIp(request: Request, bucket: string, limit: number, windowSeconds: number) {
  return rateLimit(`${bucket}:${clientIp(request.headers)}`, limit, windowSeconds);
}

export function tooMany(retryAfterSec: number) {
  return Response.json(
    { ok: false, error: "too-many-requests" },
    { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfterSec)) } }
  );
}
