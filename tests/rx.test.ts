import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import test from "node:test";
import { PDFDocument } from "pdf-lib";
import { createRxToken, verifyRxToken } from "../lib/rx/link";
import { buildPrescriptionPdf, pdfSafe, type PrescriptionRecord } from "../lib/rx/pdf";

const SECRET = "a-long-test-secret-value-123";
const DOCTOR = {
  name: "Dr. Kuldeep Budania",
  degrees: "MBBS, MD Psychiatry",
  post: "Senior Specialist",
  registrationNo: "30526",
  specialities: "Mental Health, De-addiction, Sexual Medicine",
  website: "www.neuromindbloom.com",
  phone: "+91 81076 39481",
};

const base: PrescriptionRecord = {
  id: "1760190000000",
  date: "11/10/2026, 11:30:00 am",
  patientName: "Ramesh Kumar",
  age: "34",
  sex: "M",
  mobile: "9876543210",
  complaints: "नींद कम या खराब आना / Poor sleep; बहुत ज्यादा चिंता करना / Excessive worry",
  diagnosis: "Generalized anxiety disorder | ICD-10 F41.1 | ICD-11 6B00",
  rx: [
    { brand: "Escitalopram", strength: "10 mg", dose: "1 tablet", frequency: "OD", timing: "Morning", food: "After food", duration: "30 days" },
    { generic: "Clonazepam", strength: "0.25 mg", dose: "1 tablet", frequency: "HS", timing: "Night", food: "After food", duration: "14 days", instruction: "Reduce as advised" },
  ],
  advice: "Sleep hygiene, reduce tea/coffee — walk 30 min daily",
  followUp: "After 2 weeks",
  signedAt: "11/10/2026, 11:42:10 am",
  prescriptionId: "NMB-RX-12345678",
  isTeleconsultation: true,
};

test("signed links verify, expire and resist tampering", () => {
  const now = new Date("2026-10-11T10:00:00Z");
  const token = createRxToken("1760190000000", SECRET, 30, now);
  assert.equal(verifyRxToken(token, SECRET, now), "1760190000000");
  assert.equal(verifyRxToken(token, SECRET, new Date("2026-11-11T10:00:00Z")), null); // expired
  assert.equal(verifyRxToken(token, "another-secret-value-xyz", now), null);
  const [p, mac] = token.split(".");
  const forged = Buffer.from("9999999999999.9999999999").toString("base64url");
  assert.equal(verifyRxToken(`${forged}.${mac}`, SECRET, now), null);
  assert.equal(verifyRxToken(`${p}x.${mac}`, SECRET, now), null);
  assert.throws(() => createRxToken("../etc", SECRET));
  assert.throws(() => createRxToken("123", "short"));
});

test("Hindi/English complaint pairs keep the English part in the PDF", () => {
  assert.equal(pdfSafe(base.complaints), "Poor sleep; Excessive worry");
  assert.equal(pdfSafe("Fee ₹500 — paid"), "Fee Rs.500 - paid");
});

test("short prescription fits on one page; long one continues on more pages", async () => {
  const logo = new Uint8Array(readFileSync("public/logo-mark.png"));
  const sig = new Uint8Array(readFileSync("private/doctor-signature.png"));
  const one = await buildPrescriptionPdf(base, DOCTOR, { logoPng: logo, signaturePng: sig });
  assert.equal((await PDFDocument.load(one)).getPageCount(), 1);
  writeFileSync(process.env.RX_PREVIEW_DIR ? `${process.env.RX_PREVIEW_DIR}/rx-one.pdf` : "/dev/null", one);

  const many = { ...base, rx: Array.from({ length: 30 }, (_, i) => ({ ...base.rx![0], brand: `Medicine number ${i + 1}`, instruction: "Take exactly as advised by the doctor" })) };
  const multi = await buildPrescriptionPdf(many, DOCTOR, { logoPng: logo, signaturePng: sig });
  assert.ok((await PDFDocument.load(multi)).getPageCount() >= 2);
  writeFileSync(process.env.RX_PREVIEW_DIR ? `${process.env.RX_PREVIEW_DIR}/rx-multi.pdf` : "/dev/null", multi);
});
