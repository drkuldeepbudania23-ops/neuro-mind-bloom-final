import { createResidentOrder, verifyUser } from "../../../../lib/server/residents";
import { fail, json, notConfigured, readJson, serverError } from "../../../../lib/server/residentHttp";
import { rateLimit, tooMany } from "../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { planId } → Razorpay order; the amount comes from the server-side plan. */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const limit = await rateLimit(`resident-order:${user.uid}`, 10, 10 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const body = await readJson(request);
    const result = await createResidentOrder(user, String(body.planId || ""));
    if ("error" in result) {
      const status = result.error === "not-configured" ? 503 : result.error === "gateway" ? 502 : result.error === "blocked" ? 403 : 400;
      return fail(result.error, status);
    }
    return json({ ok: true, ...result });
  } catch (error) {
    return serverError("residents/order", error);
  }
}
