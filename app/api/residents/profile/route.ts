import { validateProfile } from "../../../../lib/residents";
import { saveProfile, verifyUser } from "../../../../lib/server/residents";
import { fail, json, notConfigured, readJson, serverError } from "../../../../lib/server/residentHttp";
import { rateLimit, tooMany } from "../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { name, mobile, college, course, year } → create/update the resident profile. */
export async function POST(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const user = await verifyUser(request);
    if (!user) return fail("unauthorized", 401);
    const limit = await rateLimit(`resident-profile:${user.uid}`, 20, 60 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);
    const result = validateProfile(await readJson(request));
    if (!result.ok) return fail(`invalid-${result.error}`, 400);
    await saveProfile(user, result.value);
    return json({ ok: true });
  } catch (error) {
    return serverError("residents/profile", error);
  }
}
