import { validateContent } from "../../../../../lib/residents";
import { listAllContent, saveContent, verifyDoctor } from "../../../../../lib/server/residents";
import { audit } from "../../../../../lib/server/audit";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET → all residents' content (drafts too). */
export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    if (!(await verifyDoctor(request))) return fail("unauthorized", 401);
    return json({ ok: true, items: await listAllContent() });
  } catch (error) {
    return serverError("doctor/residents/content", error);
  }
}

/** POST { id?, ...content } → create or update an item. */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const uid = await verifyDoctor(request);
    if (!uid) return fail("unauthorized", 401);
    const body = await readJson(request);
    const result = validateContent(body);
    if (!result.ok) return fail(`invalid-${result.error}`, 400);
    const id = typeof body.id === "string" && body.id ? body.id : null;
    const saved = await saveContent(id, result.value, uid).catch((e: Error) => (e.message === "not-found" ? null : Promise.reject(e)));
    if (!saved) return fail("not-found", 404);
    await audit(uid, `residents.content.${result.value.status}`, { id: saved, type: result.value.type });
    return json({ ok: true, id: saved });
  } catch (error) {
    return serverError("doctor/residents/content save", error);
  }
}
