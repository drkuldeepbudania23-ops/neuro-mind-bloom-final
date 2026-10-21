/**
 * Fixed-window rate limiting decision — pure (the Firestore read/write lives in
 * lib/server/rateLimit.ts). Returns the new window state and whether to allow.
 */
export type Window = { count: number; start: number };

export function rateDecision(previous: Window | null, now: number, limit: number, windowMs: number) {
  const fresh = !previous || now - previous.start >= windowMs;
  const next: Window = fresh ? { count: 1, start: now } : { count: previous!.count + 1, start: previous!.start };
  const allowed = next.count <= limit;
  const retryAfterSec = allowed ? 0 : Math.ceil((next.start + windowMs - now) / 1000);
  return { allowed, next, retryAfterSec };
}

/** Client IP from Vercel/proxy headers (first hop). */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for") || "";
  const ip = fwd.split(",")[0].trim() || headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 64);
}
