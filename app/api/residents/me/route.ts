import { getPlans, getResident, verifyUser } from "../../../../lib/server/residents";
import { fail, json, notConfigured, serverError } from "../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET → the signed-in resident's profile, access status and current plan prices. */
export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const [state, plans] = await Promise.all([getResident(user.uid), getPlans()]);
    return json({ ok: true, email: user.email, ...state, plans });
  } catch (error) {
    return serverError("residents/me", error);
  }
}
