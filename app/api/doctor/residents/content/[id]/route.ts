import { deleteContent, verifyDoctor } from "../../../../../../lib/server/residents";
import { audit } from "../../../../../../lib/server/audit";
import { fail, json, notConfigured, serverError } from "../../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** DELETE → remove an item, its comments and its PDF. */
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const uid = await verifyDoctor(request);
    if (!uid) return fail("unauthorized", 401);
    const { id } = await context.params;
    if (!(await deleteContent(id))) return fail("not-found", 404);
    await audit(uid, "residents.content.delete", { id });
    return json({ ok: true });
  } catch (error) {
    return serverError("doctor/residents/content delete", error);
  }
}
