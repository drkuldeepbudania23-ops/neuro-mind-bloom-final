import { listPublished, verifyUser } from "../../../../lib/server/residents";
import { fail, json, notConfigured, serverError } from "../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET → published items (title, topic, summary only). Shown to any signed-in
 * resident so they can see what the subscription includes; the content itself
 * is served only by /api/residents/content/[id] to active subscribers.
 */
export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    if (!(await verifyUser(request))) return fail("unauthorized", 401);
    return json({ ok: true, items: await listPublished() });
  } catch (error) {
    return serverError("residents/content", error);
  }
}
