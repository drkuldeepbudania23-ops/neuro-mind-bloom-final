import { NextResponse } from "next/server";
import { getDoctorUid, verifyPinForUid } from "../pin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";
    const idToken = typeof body?.idToken === "string" ? body.idToken : "";

    if (!/^\d{8}$/.test(pin)) {
      return NextResponse.json({ ok: false, error: "Enter valid 8-digit E-Sign PIN." }, { status: 400 });
    }
    if (!idToken) {
      return NextResponse.json({ ok: false, error: "Doctor login is required." }, { status: 401 });
    }

    const uid = await getDoctorUid(idToken);
    if (!uid) {
      return NextResponse.json({ ok: false, error: "Authorized doctor login is required." }, { status: 403 });
    }

    const valid = await verifyPinForUid(uid, idToken, pin);

    if (!valid) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return NextResponse.json({ ok: false, error: "Incorrect E-Sign PIN." }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "PIN verification failed." }, { status: 400 });
  }
}
