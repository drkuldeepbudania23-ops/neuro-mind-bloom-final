import { validPlanPrices } from "../../../../../lib/residents";
import { getPlans, savePlans, verifyDoctor } from "../../../../../lib/server/residents";
import { audit } from "../../../../../lib/server/audit";
import { fail, json, notConfigured, readJson, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    if (!(await verifyDoctor(request))) return fail("unauthorized", 401);
    return json({ ok: true, plans: await getPlans() });
  } catch (error) {
    return serverError("doctor/residents/plans", error);
  }
}

/** PUT { monthly: { price }, yearly: { price } } → change subscription prices (new orders only). */
export async function PUT(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    const doctor = await verifyDoctor(request);
    if (!doctor) return fail("unauthorized", 401);
    const result = validPlanPrices(await readJson(request));
    if (!result.ok) return fail(result.error, 400);
    await savePlans(result.value, doctor);
    await audit(doctor, "residents.plans", { monthly: result.value.monthly.price, yearly: result.value.yearly.price });
    return json({ ok: true, plans: await getPlans() });
  } catch (error) {
    return serverError("doctor/residents/plans put", error);
  }
}
