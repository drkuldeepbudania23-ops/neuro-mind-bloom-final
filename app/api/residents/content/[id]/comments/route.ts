import { validateComment } from "../../../../../../lib/residents";
import { addComment, getPublished, getResident, verifyUser } from "../../../../../../lib/server/residents";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../../lib/server/residentHttp";
import { rateLimit, tooMany } from "../../../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { text } → add a comment to a case discussion (active subscribers only). */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const limit = await rateLimit(`resident-comment:${user.uid}`, 20, 60 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const state = await getResident(user.uid);
    if (!state.active || !state.profile) return fail("no-access", 403);
    const { id } = await context.params;
    const item = await getPublished(id);
    if (!item || item.type !== "case") return fail("not-found", 404);
    if (!item.commentsOpen) return fail("comments-closed", 403);
    const text = validateComment((await readJson(request)).text);
    if (!text) return fail("invalid-text", 400);
    const commentId = await addComment(id, { uid: user.uid, name: state.profile.name, byDoctor: false }, text);
    return json({ ok: true, id: commentId });
  } catch (error) {
    return serverError("residents/comments", error);
  }
}
