import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";

/**
 * Server-generated e-prescription PDF (A4).
 * - Single page when it fits; continues on extra pages only when needed.
 * - Numbered medicines, doctor registration details, optional Teleconsultation label,
 *   electronic signature block and the small footer "Not valid for medicolegal purpose."
 * Pure function: no Firebase / network, so it is unit-testable.
 */

export type RxMedicine = {
  generic?: string;
  brand?: string;
  strength?: string;
  dose?: string;
  frequency?: string;
  timing?: string;
  food?: string;
  duration?: string;
  instruction?: string;
};

export type PrescriptionRecord = {
  id: string;
  date?: string;
  patientName: string;
  age?: string;
  sex?: string;
  mobile?: string;
  email?: string;
  diagnosis?: string;
  complaints?: string;
  history?: string;
  vitals?: string;
  rx?: RxMedicine[];
  investigations?: string;
  advice?: string;
  followUp?: string;
  signedAt?: string;
  prescriptionId?: string;
  isTeleconsultation?: boolean;
  consultationType?: string;
  /** Unique Health ID of the patient, e.g. NMB-000123 */
  uhid?: string;
  appointmentId?: string;
};

export type DoctorInfo = {
  name: string;
  degrees: string;
  post: string;
  registrationNo: string;
  specialities: string;
  website: string;
  phone: string;
};

/** QR module grid, e.g. from `QRCode.create(text).modules` (npm "qrcode"). */
export type QrMatrix = { size: number; get(row: number, col: number): unknown };

export type PdfAssets = {
  logoPng?: Uint8Array;
  signaturePng?: Uint8Array;
  /** Verification QR printed next to the signature (pharmacist scans → authenticity page). */
  verify?: { url: string; matrix: QrMatrix };
};

const A4: [number, number] = [595.28, 841.89];
const M = 40; // margin
const INK = rgb(0.07, 0.12, 0.16);
const MUTED = rgb(0.35, 0.4, 0.45);
const TEAL = rgb(0.03, 0.45, 0.43);
const LINE = rgb(0.8, 0.84, 0.86);

/**
 * Standard PDF fonts only cover Latin (WinAnsi). The prescription is written in
 * English; for "हिंदी / English" pairs (from the booking form) we keep the
 * English part, and drop any remaining unsupported characters.
 */
export function pdfSafe(text: string | undefined): string {
  if (!text) return "";
  const englishParts = text
    .split(";")
    .map((part) => {
      const bits = part.split(" / ");
      const hindiFirst = bits.length > 1 && /[\u0900-\u097F]/.test(bits[0]);
      return (hindiFirst ? bits.slice(1).join(" / ") : part).trim();
    })
    .join("; ");
  return englishParts
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/[•·]/g, "-")
    .replace(/₹/g, "Rs.")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        // Break very long words.
        let rest = word;
        while (font.widthOfTextAtSize(rest, size) > maxWidth && rest.length > 1) {
          let cut = rest.length;
          while (cut > 1 && font.widthOfTextAtSize(rest.slice(0, cut), size) > maxWidth) cut--;
          lines.push(rest.slice(0, cut));
          rest = rest.slice(cut);
        }
        line = rest;
      }
    }
    lines.push(line);
  }
  return lines;
}

export async function buildPrescriptionPdf(record: PrescriptionRecord, doctor: DoctorInfo, assets: PdfAssets = {}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Prescription ${pdfSafe(record.prescriptionId) || record.id}`);
  pdf.setAuthor(doctor.name);
  pdf.setCreator("Neuro Mind Bloom");
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let logo: PDFImage | undefined;
  let signature: PDFImage | undefined;
  if (assets.logoPng) logo = await pdf.embedPng(assets.logoPng);
  if (assets.signaturePng) signature = await pdf.embedPng(assets.signaturePng);

  const width = A4[0] - 2 * M;
  const pages: PDFPage[] = [];
  let page!: PDFPage;
  let y = 0;
  const FOOTER_SPACE = 34;

  const newPage = () => {
    page = pdf.addPage(A4);
    pages.push(page);
    y = A4[1] - M;
  };
  const ensure = (h: number) => {
    if (y - h < M + FOOTER_SPACE) {
      newPage();
      // Repeat a compact header on continuation pages.
      page.drawText(`${pdfSafe(record.patientName)} - Prescription ${pdfSafe(record.prescriptionId)} (continued)`, { x: M, y, size: 9, font, color: MUTED });
      y -= 18;
    }
  };
  const text = (t: string, opts: { x?: number; size?: number; f?: PDFFont; color?: ReturnType<typeof rgb> } = {}) => {
    const size = opts.size ?? 10;
    page.drawText(t, { x: opts.x ?? M, y: y - size, size, font: opts.f ?? font, color: opts.color ?? INK });
  };
  const hr = (color = LINE) => {
    page.drawLine({ start: { x: M, y }, end: { x: A4[0] - M, y }, thickness: 0.7, color });
  };
  const labelled = (label: string, value: string | undefined) => {
    const v = pdfSafe(value);
    if (!v) return;
    const size = 10;
    const labelW = bold.widthOfTextAtSize(`${label}: `, size);
    const lines = wrap(v, font, size, width - labelW);
    ensure(lines.length * 13 + 4);
    page.drawText(`${label}:`, { x: M, y: y - size, size, font: bold, color: INK });
    lines.forEach((ln, i) => page.drawText(ln, { x: M + labelW, y: y - size - i * 13, size, font, color: INK }));
    y -= lines.length * 13 + 5;
  };

  // ---------- Header ----------
  newPage();
  const headerTop = y;
  if (logo) page.drawImage(logo, { x: M, y: headerTop - 52, width: 52, height: 52 });
  const hx = logo ? M + 62 : M;
  page.drawText("NEURO MIND BLOOM", { x: hx, y: headerTop - 18, size: 17, font: bold, color: TEAL });
  page.drawText("Mind Care, Life Care", { x: hx, y: headerTop - 31, size: 9, font, color: MUTED });
  page.drawText(`${doctor.name}, ${doctor.degrees}`, { x: hx, y: headerTop - 46, size: 11, font: bold, color: INK });
  page.drawText(`${doctor.post} - ${doctor.specialities}`, { x: hx, y: headerTop - 58, size: 8.5, font, color: MUTED });
  page.drawText(`Reg. No. ${doctor.registrationNo}  |  ${doctor.website}  |  ${doctor.phone}`, { x: hx, y: headerTop - 70, size: 8.5, font, color: MUTED });

  const tele = record.isTeleconsultation || record.consultationType === "teleconsultation";
  if (tele) {
    const label = "TELECONSULTATION";
    const w = bold.widthOfTextAtSize(label, 8) + 12;
    page.drawRectangle({ x: A4[0] - M - w, y: headerTop - 20, width: w, height: 16, borderColor: TEAL, borderWidth: 0.8 });
    page.drawText(label, { x: A4[0] - M - w + 6, y: headerTop - 15, size: 8, font: bold, color: TEAL });
  }
  y = headerTop - 80;
  hr(TEAL);
  y -= 10;

  // ---------- Patient ----------
  const col = width / 3;
  const cell = (label: string, value: string, i: number, row: number) => {
    const x = M + (i % 3) * col;
    const yy = y - row * 15;
    page.drawText(`${label}: `, { x, y: yy - 10, size: 9, font: bold, color: INK });
    const lw = bold.widthOfTextAtSize(`${label}: `, 9);
    const v = wrap(pdfSafe(value) || "-", font, 9, col - lw - 6)[0];
    page.drawText(v, { x: x + lw, y: yy - 10, size: 9, font, color: INK });
  };
  cell("Patient", record.patientName, 0, 0);
  cell("Age/Sex", `${record.age || "-"} / ${record.sex || "-"}`, 1, 0);
  cell("Date", record.date || "", 2, 0);
  cell("Mobile", record.mobile || "", 0, 1);
  cell("Rx ID", record.prescriptionId || "", 1, 1);
  if (record.uhid) cell("UHID", record.uhid, 2, 1);
  else if (record.email) cell("Email", record.email, 2, 1);
  const extraRow = Boolean(record.uhid && record.email);
  if (extraRow) cell("Email", record.email!, 0, 2);
  y -= extraRow ? 51 : 36;
  hr();
  y -= 10;

  // ---------- Clinical ----------
  labelled("Complaints", record.complaints);
  labelled("Diagnosis", record.diagnosis);
  labelled("History / Examination", record.history);
  labelled("Vitals / Notes", record.vitals);
  y -= 4;

  // ---------- Rx table ----------
  ensure(40);
  text("Rx", { size: 18, f: bold, color: TEAL });
  y -= 24;
  const cols = [
    { title: "#", w: 22 },
    { title: "Medicine", w: width * 0.38 },
    { title: "Dose / Frequency", w: width * 0.22 },
    { title: "Timing / Food", w: width * 0.2 },
    { title: "Duration", w: 0 },
  ];
  cols[4].w = width - cols.slice(0, 4).reduce((s, c) => s + c.w, 0);
  const drawRow = (cells: string[][], f: PDFFont[], size = 9) => {
    const height = Math.max(...cells.map((c) => c.length)) * 12 + 6;
    ensure(height);
    let x = M;
    cells.forEach((lines, i) => {
      lines.forEach((ln, j) => page.drawText(ln, { x: x + 3, y: y - 11 - j * 12, size, font: f[i] ?? font, color: INK }));
      x += cols[i].w;
    });
    y -= height;
    page.drawLine({ start: { x: M, y: y + 2 }, end: { x: A4[0] - M, y: y + 2 }, thickness: 0.4, color: LINE });
  };
  drawRow(cols.map((c) => [c.title]), cols.map(() => bold));
  (record.rx ?? []).forEach((m, i) => {
    const name = pdfSafe(`${m.brand || m.generic || ""} ${m.strength || ""}`.trim());
    const med = [...wrap(name, bold, 9, cols[1].w - 6)];
    // Brand prescribed → also show the generic (salt) name underneath.
    const generic = m.brand && m.generic && m.brand.trim().toLowerCase() !== m.generic.trim().toLowerCase() ? pdfSafe(`(${m.generic})`) : "";
    const instr = pdfSafe(m.instruction);
    const instrLines = [
      ...(generic ? wrap(generic, font, 8, cols[1].w - 6) : []),
      ...(instr ? wrap(instr, font, 8, cols[1].w - 6) : []),
    ];
    const cells = [
      [`${i + 1}.`],
      [...med, ...instrLines],
      wrap(pdfSafe([m.dose, m.frequency].filter(Boolean).join(" - ")), font, 9, cols[2].w - 6),
      wrap(pdfSafe([m.timing, m.food].filter(Boolean).join(" - ")), font, 9, cols[3].w - 6),
      wrap(pdfSafe(m.duration), font, 9, cols[4].w - 6),
    ];
    const height = Math.max(...cells.map((c) => c.length)) * 12 + 6;
    ensure(height);
    let x = M;
    cells.forEach((lines, ci) => {
      lines.forEach((ln, j) => {
        const isInstr = ci === 1 && j >= med.length;
        page.drawText(ln, { x: x + 3, y: y - 11 - j * 12, size: isInstr ? 8 : 9, font: ci === 1 && !isInstr ? bold : font, color: isInstr ? MUTED : INK });
      });
      x += cols[ci].w;
    });
    y -= height;
    page.drawLine({ start: { x: M, y: y + 2 }, end: { x: A4[0] - M, y: y + 2 }, thickness: 0.4, color: LINE });
  });
  y -= 10;

  // ---------- Advice ----------
  labelled("Investigations", record.investigations);
  labelled("Advice", record.advice);
  labelled("Follow-up", record.followUp);

  // ---------- Signature ----------
  const sigH = signature ? 70 : 0;
  ensure(sigH + 70);
  y -= 8;
  const sx = A4[0] - M - 190;
  if (assets.verify && assets.verify.matrix.size > 0) {
    const { matrix } = assets.verify;
    const QR = 78;
    const quiet = 2; // modules of white border (white page already)
    const cell = QR / (matrix.size + quiet * 2);
    const qx = M;
    const qTop = y;
    for (let r = 0; r < matrix.size; r++) {
      for (let c = 0; c < matrix.size; c++) {
        if (!matrix.get(r, c)) continue;
        page.drawRectangle({
          x: qx + (c + quiet) * cell,
          y: qTop - (r + quiet + 1) * cell,
          width: cell + 0.05,
          height: cell + 0.05,
          color: rgb(0, 0, 0),
        });
      }
    }
    page.drawText("Scan to verify this prescription", { x: qx + QR + 6, y: qTop - 30, size: 8, font: bold, color: INK });
    page.drawText("Pharmacist: scan the QR code to confirm", { x: qx + QR + 6, y: qTop - 42, size: 7.5, font, color: MUTED });
    page.drawText("it was issued by Neuro Mind Bloom.", { x: qx + QR + 6, y: qTop - 52, size: 7.5, font, color: MUTED });
  }
  if (signature) {
    const scale = Math.min(sigH / signature.height, 120 / signature.width);
    page.drawImage(signature, { x: sx, y: y - sigH, width: signature.width * scale, height: signature.height * scale });
    y -= sigH + 2;
  }
  const sigLines: [string, PDFFont, number][] = [
    ["Electronically signed", bold, 9],
    [doctor.name, bold, 10],
    [`${doctor.degrees} - Reg. No. ${doctor.registrationNo}`, font, 8.5],
    [pdfSafe(record.signedAt), font, 8.5],
    [`Prescription ID: ${pdfSafe(record.prescriptionId)}`, font, 8.5],
  ];
  sigLines.forEach(([t, f, s], i) => page.drawText(t, { x: sx, y: y - 10 - i * 12, size: s, font: f, color: INK }));
  y -= sigLines.length * 12 + 6;

  // ---------- Footer on every page ----------
  pages.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: M + 16 }, end: { x: A4[0] - M, y: M + 16 }, thickness: 0.4, color: LINE });
    p.drawText("Not valid for medicolegal purpose.", { x: M, y: M + 4, size: 7.5, font, color: MUTED });
    const pn = `Page ${i + 1} of ${pages.length}`;
    p.drawText(pn, { x: A4[0] - M - font.widthOfTextAtSize(pn, 7.5), y: M + 4, size: 7.5, font, color: MUTED });
  });

  return pdf.save();
}
