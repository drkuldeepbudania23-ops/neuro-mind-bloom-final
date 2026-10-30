import { listResidentPayments, listSubscribers, verifyDoctor } from "../../../../../lib/server/residents";
import { fail, json, notConfigured, serverError } from "../../../../../lib/server/residentHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET → residents (with access status) and their payments. */
export async function GET(request: Request) {
  try {
    const nc = notConfigured();
    if (nc) return nc;
    if (!(await verifyDoctor(request))) return fail("unauthorized", 401);
    const [residents, payments] = await Promise.all([listSubscribers(), listResidentPayments()]);
    return json({ ok: true, residents, payments });
  } catch (error) {
    return serverError("doctor/residents/subscribers", error);
  }
}
