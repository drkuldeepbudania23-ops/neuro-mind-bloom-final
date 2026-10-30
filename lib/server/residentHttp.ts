import "server-only";
import { isAdminConfigured } from "./firebaseAdmin";

/** Shared response helpers for /api/residents/** and /api/doctor/residents/** (never cached). */
export const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
};

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: PRIVATE_HEADERS });
}

export const fail = (error: string, status: number) => json({ ok: false, error }, status);

export function notConfigured() {
  return isAdminConfigured() ? null : fail("not-configured", 503);
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => ({}));
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

export function serverError(where: string, error: unknown) {
  console.error(where, error);
  return fail("server", 500);
}
