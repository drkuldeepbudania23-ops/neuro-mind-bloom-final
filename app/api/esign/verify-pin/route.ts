import { NextResponse } from "next/server";
import { pbkdf2Sync, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SALT = "b4f9428a3e2b408a12f809829e5b599f25c1c058ee72e6fb";
const HASH = "2fb9ce23ef710c70618dfd126142f8183ba975ff614ccb6c8aeb2a8611765432";
const ITERATIONS = 310000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";

    if (!/^\d{8}$/.test(pin)) {
      return NextResponse.json(
        { ok: false, error: "Enter valid 8-digit E-Sign PIN." },
        { status: 400 }
      );
    }

    const entered = pbkdf2Sync(pin, SALT, ITERATIONS, 32, "sha256");
    const saved = Buffer.from(HASH, "hex");
    const valid =
      entered.length === saved.length &&
      timingSafeEqual(entered, saved);

    if (!valid) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return NextResponse.json(
        { ok: false, error: "Incorrect E-Sign PIN." },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "PIN verification failed." },
      { status: 400 }
    );
  }
}