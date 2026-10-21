import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDoctorUid, verifyPinForUid } from "../pin-store";
import { adminDb, isAdminConfigured } from "../../../../lib/server/firebaseAdmin";
import { canonicalPrescription, hashPrescription, newPrescriptionId, signedAtText, validateForSigning } from "../../../../lib/rx/signing";
import { audit } from "../../../../lib/server/audit";
import { rateLimitByIp, tooMany } from "../../../../lib/server/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * E-sign on the server. Body: { idToken, pin, prescription }
 * PIN verified → content frozen in signedPrescriptions/{prescriptionId} with a
 * SHA-256 hash; the server issues the Prescription ID and signing time.
 * Returns { prescriptionId, signedAt, hash }.
 */
export async function POST(request: Request) {
  try {
    const limit = await rateLimitByIp(request, "esign", 20, 10 * 60);
    if (!limit.allowed) return tooMany(limit.retryAfterSec);

    const raw = await request.text();
    if (raw.length > 100_000) return NextResponse.json({ ok: false, error: "Prescription is too large." }, { status: 413 });
    const body = JSON.parse(raw || "{}");
    const pin = typeof body?.pin === "string" ? body.pin.trim() : "";
    const idToken = typeof body?.idToken === "string" ? body.idToken : "";
    if (!/^\d{8}$/.test(pin)) return NextResponse.json({ ok: false, error: "Enter valid 8-digit E-Sign PIN." }, { status: 400 });

    const uid = await getDoctorUid(idToken);
    if (!uid) return NextResponse.json({ ok: false, error: "Authorized doctor login is required." }, { status: 403 });
    if (!isAdminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

    const content = canonicalPrescription(body?.prescription || {});
    const problem = validateForSigning(content);
    if (problem) {
      return NextResponse.json(
        { ok: false, error: problem === "patient-name" ? "Please enter patient name before e-signing." : "Add a diagnosis, medicine or advice before e-signing." },
        { status: 400 }
      );
    }

    if (!(await verifyPinForUid(uid, idToken, pin))) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      await audit(uid, "esign.wrong-pin");
      return NextResponse.json({ ok: false, error: "Incorrect E-Sign PIN." }, { status: 401 });
    }

    const now = new Date();
    const prescriptionId = newPrescriptionId(now);
    const signedAt = signedAtText(now);
    const hash = hashPrescription(content);
    // create() fails if the id already exists, so a signed copy can never be overwritten.
    await adminDb().collection("signedPrescriptions").doc(prescriptionId).create({
      prescriptionId,
      content,
      hash,
      signedAt,
      signedAtTs: FieldValue.serverTimestamp(),
      uid,
    });
    await audit(uid, "esign.signed", { prescriptionId, patient: content.patientName, uhid: content.uhid });
    return NextResponse.json({ ok: true, prescriptionId, signedAt, hash }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("esign/sign", error);
    return NextResponse.json({ ok: false, error: "E-sign failed. Please try again." }, { status: 500 });
  }
}
