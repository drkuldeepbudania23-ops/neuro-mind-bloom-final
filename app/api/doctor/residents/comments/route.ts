import { validateComment } from "../../../../../lib/residents";
import { addComment, getPublished, recentComments, setCommentStatus, verifyDoctor } from "../../../../../lib/server/residents";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET → latest comments across all cases (including hidden ones). */
export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    if (!(await verifyDoctor(request))) return fail("unauthorized", 401);
    return json({ ok: true, comments: await recentComments(200) });
  } catch (error) {
    return serverError("doctor/residents/comments", error);
  }
}

/**
 * POST { action: "hide" | "show", id }  → moderate a comment
 * POST { action: "reply", contentId, text } → post as the doctor
 */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const doctor = await verifyDoctor(request);
    if (!doctor) return fail("unauthorized", 401);
    const body = await readJson(request);
    if (body.action === "hide" || body.action === "show") {
      const ok = await setCommentStatus(String(body.id || ""), body.action === "hide" ? "hidden" : "visible");
      return ok ? json({ ok: true }) : fail("not-found", 404);
    }
    if (body.action === "reply") {
      const contentId = String(body.contentId || "");
      const item = await getPublished(contentId);
      if (!item || item.type !== "case") return fail("not-found", 404);
      const text = validateComment(body.text);
      if (!text) return fail("invalid-text", 400);
      const id = await addComment(contentId, { uid: doctor, name: "Dr. Kuldeep Budania", byDoctor: true }, text);
      return json({ ok: true, id });
    }
    return fail("invalid-action", 400);
  } catch (error) {
    return serverError("doctor/residents/comments post", error);
  }
}
