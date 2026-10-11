import { NextResponse } from "next/server";
import { authorizePinReset, savePin } from "../pin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";
    const currentPin = typeof body?.currentPin === "string" ? body.currentPin.trim() : "";
    const mode = body?.mode === "recover" ? "recover" : "change";
    const idToken = typeof body?.idToken === "string" ? body.idToken : "";

    if (!/^\d{8}$/.test(pin)) {
      return NextResponse.json({ ok: false, error: "New E-Sign PIN must be exactly 8 digits." }, { status: 400 });
    }
    if (!idToken) {
      return NextResponse.json({ ok: false, error: "Doctor login is required." }, { status: 401 });
    }
    if (mode === "change" && !/^\d{8}$/.test(currentPin)) {
      return NextResponse.json({ ok: false, error: "Enter your current 8-digit E-Sign PIN." }, { status: 400 });
    }

    const authorization = await authorizePinReset(idToken, mode, currentPin);
    if (authorization.reason === "doctor") {
      return NextResponse.json({ ok: false, error: "Authorized doctor login is required." }, { status: 403 });
    }

    if (authorization.reason === "reauthentication") {
      return NextResponse.json(
        { ok: false, error: "Reauthenticate with your doctor account before PIN recovery." },
        { status: 401 }
      );
    }
    if (authorization.reason === "current-pin") {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return NextResponse.json({ ok: false, error: "Current E-Sign PIN is incorrect." }, { status: 401 });
    }

    if (!(await savePin(authorization.uid, idToken, pin))) {
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
