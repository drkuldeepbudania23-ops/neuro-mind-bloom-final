import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { isAdminConfigured } from "../../../../lib/server/firebaseAdmin";
import { runBackup } from "../../../../lib/server/backup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Weekly encrypted backup (Vercel Cron, see vercel.json). Requires CRON_SECRET. */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET || "";
  const given = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (secret.length < 16 || given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isAdminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  try {
    const result = await runBackup();
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (error) {
    console.error("cron/backup", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
