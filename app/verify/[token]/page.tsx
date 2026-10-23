import type { Metadata } from "next";
import VerifyPrescription, { type VerifyView } from "../../../components/verify/VerifyPrescription";
import { isAdminConfigured } from "../../../lib/server/firebaseAdmin";
import { DOCTOR_INFO, isSigned, loadPrescription, maskName, recordIdFromVerifyToken } from "../../../lib/server/prescriptions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify prescription",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

async function resolve(token: string): Promise<VerifyView> {
  try {
    const id = recordIdFromVerifyToken(decodeURIComponent(token || ""));
    if (!id || !isAdminConfigured()) return { status: "invalid" };
    const record = await loadPrescription(id);
    if (!record || !isSigned(record)) return { status: "invalid" };
    return {
      status: "valid",
      record,
      maskedName: maskName(record.patientName),
      doctor: { name: DOCTOR_INFO.name, degrees: DOCTOR_INFO.degrees, registrationNo: DOCTOR_INFO.registrationNo },
    };
  } catch (error) {
    console.error("verify", error);
    return { status: "invalid" };
  }
}

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <VerifyPrescription view={await resolve(token)} />;
}
