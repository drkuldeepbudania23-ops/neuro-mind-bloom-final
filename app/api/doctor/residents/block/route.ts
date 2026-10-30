import { setBlocked, verifyDoctor } from "../../../../../lib/server/residents";
import { audit } from "../../../../../lib/server/audit";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { uid, blocked } → block/unblock a resident (e.g. for sharing notes). */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const doctor = await verifyDoctor(request);
    if (!doctor) return fail("unauthorized", 401);
    const body = await readJson(request);
    const uid = String(body.uid || "");
    const blocked = body.blocked === true;
    if (!(await setBlocked(uid, blocked))) return fail("not-found", 404);
    await audit(doctor, blocked ? "residents.block" : "residents.unblock", { uid });
    return json({ ok: true });
  } catch (error) {
    return serverError("doctor/residents/block", error);
  }
}
