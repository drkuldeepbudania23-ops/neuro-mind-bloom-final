import { grantAccess, verifyDoctor } from "../../../../../lib/server/residents";
import { audit } from "../../../../../lib/server/audit";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { uid, days, note } → add free access days (recorded as a ₹0 entry). */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const doctor = await verifyDoctor(request);
    if (!doctor) return fail("unauthorized", 401);
    const body = await readJson(request);
    const uid = String(body.uid || "");
    const days = Number(body.days);
    const ok = await grantAccess(uid, days, String(body.note || ""), doctor);
    if (!ok) return fail("invalid", 400);
    await audit(doctor, "residents.grant", { uid, days });
    return json({ ok: true });
  } catch (error) {
    return serverError("doctor/residents/grant", error);
  }
}
