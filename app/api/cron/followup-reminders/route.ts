import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { timingSafeEqual } from "node:crypto";
import { adminDb, isAdminConfigured } from "../../../../lib/server/firebaseAdmin";
import { notify } from "../../../../lib/server/notify";
import { istDate, prettyDate } from "../../../../lib/notifications/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET || "";
  if (secret.length < 16) return false;
  const given = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/**
 * Daily (Vercel Cron, see vercel.json): remind patients whose follow-up
 * "Reminder date" is TOMORROW (India time). Each follow-up is reminded once.
 */
export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!isAdminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

  const target = istDate(new Date(), 1);
  const db = adminDb();
  const snap = await db
    .collection("followUps")
    .where("nextVisitDate", "==", target)
    .where("reminderSent", "==", false)
    .limit(200)
    .get();

  let sent = 0;
  let skipped = 0;
  for (const docSnap of snap.docs) {
    const f = docSnap.data() || {};
    const claimed = await db.runTransaction(async (tx) => {
      const fresh = await tx.get(docSnap.ref);
      if (!fresh.exists || fresh.data()?.reminderSent) return false;
      tx.update(docSnap.ref, { reminderSent: true, reminderSentAt: FieldValue.serverTimestamp() });
      return true;
    });
    if (!claimed) continue;
    const result = await notify(
      "followup_reminder",
      { patientName: String(f.patient || ""), date: prettyDate(target) },
      { mobile: String(f.mobile || ""), email: String(f.email || "") },
      f.language === "en" ? "en" : "hi"
    );
    if (result.whatsapp.status === "sent" || result.email.status === "sent") sent += 1;
    else skipped += 1;
    await docSnap.ref.update({ reminderResult: { whatsapp: result.whatsapp.status, email: result.email.status } });
  }

  return NextResponse.json({ ok: true, date: target, due: snap.size, sent, skipped });
}
