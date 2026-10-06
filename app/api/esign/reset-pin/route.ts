import { NextResponse } from "next/server";
import { pbkdf2Sync, randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROJECT_ID = "neuro-mind-bloom";
const API_KEY = "AIzaSyC2bX4cWgV7sKhKmNflLGJSvAU6CqrTizw";
const ITERATIONS = 310000;

async function getUid(idToken: string) {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    cache: "no-store",
  });
  if (!r.ok) return "";
  const data = await r.json();
  return String(data?.users?.[0]?.localId || "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";
    const idToken = typeof body?.idToken === "string" ? body.idToken : "";

    if (!/^\d{8}$/.test(pin)) {
      return NextResponse.json({ ok: false, error: "New E-Sign PIN must be exactly 8 digits." }, { status: 400 });
    }
    if (!idToken) {
      return NextResponse.json({ ok: false, error: "Doctor login is required." }, { status: 401 });
    }

    const uid = await getUid(idToken);
    if (!uid) {
      return NextResponse.json({ ok: false, error: "Doctor session expired. Please login again." }, { status: 401 });
    }

    const salt = randomBytes(24).toString("hex");
    const hash = pbkdf2Sync(pin, salt, ITERATIONS, 32, "sha256").toString("hex");
    const docUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/esignPins/${encodeURIComponent(uid)}`;

    const save = await fetch(docUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          salt: { stringValue: salt },
          hash: { stringValue: hash },
          iterations: { integerValue: String(ITERATIONS) },
          updatedAt: { timestampValue: new Date().toISOString() },
        },
      }),
      cache: "no-store",
    });

    if (!save.ok) {
      return NextResponse.json(
        { ok: false, error: "PIN reset storage is not permitted by current Firestore rules." },
        { status: 403 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to reset E-Sign PIN." }, { status: 400 });
  }
}
