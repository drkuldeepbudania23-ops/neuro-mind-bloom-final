import type { Sheet, Cell } from "./xlsx";

/**
 * Turns Firestore documents into the rows of the doctor's Excel workbook.
 * Pure — the API route loads the documents with the Admin SDK.
 */

type Doc = Record<string, unknown> & { id: string };

/** Firestore Timestamp / Date / string → "YYYY-MM-DD HH:mm" (IST) or the string itself. */
export function cellDate(value: unknown): string {
  let date: Date | null = null;
  if (value instanceof Date) date = value;
  else if (value && typeof value === "object" && typeof (value as { toDate?: unknown }).toDate === "function") {
    date = (value as { toDate: () => Date }).toDate();
  } else if (typeof value === "string") return value;
  if (!date || Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 16).replace("T", " ");
}

function s(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function n(v: unknown): Cell {
  return typeof v === "number" && Number.isFinite(v) ? v : s(v);
}

type Med = Record<string, unknown>;

export function medicinesText(rx: unknown): string {
  if (!Array.isArray(rx)) return "";
  return rx
    .map((m: Med, i) => {
      const name = [s(m.brand) || s(m.generic), s(m.strength)].filter(Boolean).join(" ");
      const how = [m.dose, m.frequency, m.timing, m.food, m.duration, m.instruction].map(s).filter(Boolean).join(" | ");
      return `${i + 1}. ${name}${how ? ` — ${how}` : ""}`;
    })
    .join("\n");
}

function byNewest(a: Doc, b: Doc, key: string) {
  return cellDate(b[key]).localeCompare(cellDate(a[key]));
}

export function buildDoctorWorkbook(input: {
  records: Doc[];
  appointments: Doc[];
  payments: Doc[];
  followUps: Doc[];
  patients?: Doc[];
}): Sheet[] {
  const records = [...input.records].sort((a, b) => Number(b.id) - Number(a.id) || b.id.localeCompare(a.id));
  const appointments = [...input.appointments].sort((a, b) => byNewest(a, b, "createdAt"));
  const payments = [...input.payments].sort((a, b) => byNewest(a, b, "createdAt"));
  const followUps = [...input.followUps].sort((a, b) => byNewest(a, b, "createdAt"));

  const patients = [...(input.patients ?? [])].sort((a, b) => a.id.localeCompare(b.id));
  return [
    {
      name: "Patients",
      rows: [
        ["UHID", "Name", "Age", "Sex", "Mobile", "Email", "Visits", "Last visit", "Registered"],
        ...patients.map((p) => [p.id, s(p.name), s(p.age), s(p.sex), s(p.mobile) || s(p.mobile10), s(p.email), n(p.visitCount), cellDate(p.lastVisit), cellDate(p.createdAt)]),
      ],
    },
    {
      name: "Patient Records",
      rows: [
        ["Date", "Prescription ID", "UHID", "Patient Name", "Age", "Sex", "Mobile", "Email", "Consultation", "Complaints", "Diagnosis", "History", "Vitals", "Medicines", "Investigations", "Advice", "Follow-up", "E-signed at", "Record ID"],
        ...records.map((r) => [
          s(r.date),
          s(r.prescriptionId),
          s(r.uhid),
          s(r.patientName),
          s(r.age),
          s(r.sex),
          s(r.mobile),
          s(r.email),
          r.consultationType === "teleconsultation" || r.isTeleconsultation === true ? "Teleconsultation" : "In-person",
          s(r.complaints),
          s(r.diagnosis),
          s(r.history),
          s(r.vitals),
          medicinesText(r.rx),
          s(r.investigations),
          s(r.advice),
          s(r.followUp),
          cellDate(r.signedAt),
          r.id,
        ]),
      ],
    },
    {
      name: "Appointments",
      rows: [
        ["Booked at", "Patient Name", "Mobile", "Email", "Service", "Preferred date", "Preferred time", "Mode", "Concern", "Status", "Payment", "Language", "Appointment ID"],
        ...appointments.map((a) => [
          cellDate(a.createdAt),
          s(a.patientName) || s(a.name),
          s(a.mobile),
          s(a.email),
          s(a.service),
          s(a.date) || s(a.preferredDate),
          s(a.time) || s(a.preferredTime),
          s(a.mode),
          s(a.concern),
          s(a.status),
          s(a.paymentStatus) || "Unpaid",
          s(a.language),
          a.id,
        ]),
      ],
    },
    {
      name: "Payments",
      rows: [
        ["Date", "Patient Name", "Status", "Fee (Rs.)", "Discount", "Discount type", "Amount paid (Rs.)", "Mode", "Reason", "Reference", "Appointment ID"],
        ...payments.map((p) => {
          const d = (p.paymentDetails && typeof p.paymentDetails === "object" ? p.paymentDetails : {}) as Record<string, unknown>;
          return [
            cellDate(p.createdAt) || cellDate(d.confirmedAt),
            s(p.patientName),
            s(p.paymentStatus),
            n(d.originalFee),
            n(d.discount),
            s(d.discountType),
            n(d.finalAmount),
            s(d.paymentMode) || s(d.mode),
            s(d.reason),
            s(d.reference) || s(d.transactionId),
            s(p.appointmentId) || p.id,
          ];
        }),
      ],
    },
    {
      name: "Follow-ups",
      rows: [
        ["Created", "Patient", "Mobile", "Email", "Reminder date", "Reminder sent", "Notes", "Follow-up ID"],
        ...followUps.map((f) => {
          const known = new Set(["id", "patient", "mobile", "email", "nextVisitDate", "reminderSent", "createdAt", "reminderSentAt", "reminderResult", "date"]);
          const notes = Object.entries(f)
            .filter(([k, v]) => !known.has(k) && typeof v === "string" && v)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ");
          return [cellDate(f.createdAt) || s(f.date), s(f.patient), s(f.mobile), s(f.email), s(f.nextVisitDate), f.reminderSent === true ? "Yes" : "No", notes, f.id];
        }),
      ],
    },
  ];
}
