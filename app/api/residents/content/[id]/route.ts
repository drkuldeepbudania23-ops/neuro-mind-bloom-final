import { getPublished, getResident, listComments, verifyUser } from "../../../../../lib/server/residents";
import { fail, json, notConfigured, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET → full item + visible comments, only for an active subscriber. */
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const state = await getResident(user.uid);
    if (!state.active) return fail("no-access", 403);
    const { id } = await context.params;
    const item = await getPublished(id);
    if (!item) return fail("not-found", 404);
    const comments = item.type === "case" ? await listComments(id) : [];
    return json({
      ok: true,
      item,
      comments: comments.map(({ uid, ...c }) => ({ ...c, mine: uid === user.uid })),
    });
  } catch (error) {
    return serverError("residents/content/id", error);
  }
}
