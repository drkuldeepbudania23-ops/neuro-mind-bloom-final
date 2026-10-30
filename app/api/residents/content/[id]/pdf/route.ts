import { getResident, verifyUser, watermarkedPdfUrl } from "../../../../../../lib/server/residents";
import { fail, json, notConfigured, serverError } from "../../../../../../lib/server/residentHttp";
import { rateLimit, tooMany } from "../../../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** POST → 10-minute link to this resident's own watermarked copy of the note PDF. */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const limit = await rateLimit(`resident-pdf:${user.uid}`, 40, 60 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const state = await getResident(user.uid);
    if (!state.active) return fail("no-access", 403);
    const { id } = await context.params;
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return fail("not-found", 404);
    const result = await watermarkedPdfUrl(user.uid, user.email, id);
    if (!result) return fail("not-found", 404);
    return json({ ok: true, ...result });
  } catch (error) {
    return serverError("residents/pdf", error);
  }
}
