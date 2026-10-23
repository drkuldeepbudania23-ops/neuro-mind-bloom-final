import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import JSZip from "jszip";
import { buildXlsx, columnName, sheetName, xmlText } from "../lib/export/xlsx";
import { buildDoctorWorkbook, cellDate, medicinesText } from "../lib/export/doctorExport";

test("column names and sheet names", () => {
  assert.equal(columnName(0), "A");
  assert.equal(columnName(25), "Z");
  assert.equal(columnName(26), "AA");
  assert.equal(columnName(701), "ZZ");
  const used = new Set<string>();
  assert.equal(sheetName("a/b", used), "a b");
  assert.equal(sheetName("A B", used), "A B (2)");
  assert.equal(xmlText("a<b>&\u0001"), "a&lt;b&gt;&amp;");
});

test("workbook has 4 sheets with Hindi text and numbers", async () => {
  const sheets = buildDoctorWorkbook({
    records: [
      { id: "1700000000000", date: "2026-10-01", patientName: "रमेश", mobile: "9876543210", diagnosis: "F32.1", rx: [{ brand: "Escitalopram", strength: "10 mg", dose: "1", frequency: "OD", duration: "30 days" }], isTeleconsultation: true },
    ],
    appointments: [{ id: "abcDEF123456", patientName: "Sita", createdAt: new Date("2026-10-01T04:30:00Z"), status: "confirmed" }],
    payments: [{ id: "abcDEF123456", patientName: "Sita", paymentStatus: "Discount", paymentDetails: { originalFee: 1500, discount: 500, discountType: "amount", finalAmount: 1000, paymentMode: "UPI", reason: "student" } }],
    followUps: [{ id: "f1", patient: "Sita", nextVisitDate: "2026-11-01", reminderSent: false, notes: "review" }],
  });
  assert.deepEqual(sheets.map((s) => s.name), ["Patients", "Patient Records", "Appointments", "Payments", "Follow-ups"]);
  assert.equal(sheets[1].rows[1][8], "Teleconsultation");
  assert.equal(sheets[2].rows[1][0], "2026-10-01 10:00");
  assert.equal(sheets[3].rows[1][6], 1000);

  const bytes = await buildXlsx(sheets);
  const zip = await JSZip.loadAsync(bytes);
  assert.ok(zip.file("xl/workbook.xml"));
  const sheet1 = await zip.file("xl/worksheets/sheet2.xml")!.async("string");
  assert.match(sheet1, /रमेश/);
  assert.match(sheet1, /1\. Escitalopram 10 mg — 1 \| OD \| 30 days/);
  const sheet3 = await zip.file("xl/worksheets/sheet4.xml")!.async("string");
  assert.match(sheet3, /<v>1000<\/v>/);
  if (process.env.XLSX_PREVIEW) writeFileSync(process.env.XLSX_PREVIEW, bytes);
});

test("helpers", () => {
  assert.equal(cellDate({ toDate: () => new Date("2026-01-01T00:00:00Z") }), "2026-01-01 05:30");
  assert.equal(cellDate(undefined), "");
  assert.equal(medicinesText(undefined), "");
});
