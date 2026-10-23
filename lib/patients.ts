/**
 * Patient identity (UHID) and consultation-history helpers — pure, unit-tested.
 *
 * UHID format: NMB-000123 (sequential, from a Firestore counter).
 * Old data has no UHID, and mobile numbers were typed in many formats, so we
 * match on the normalised 10-digit mobile + first name.
 */

export type Patient = {
  uhid: string;
  name: string;
  mobile10: string;
  mobile?: string;
  age?: string;
  sex?: string;
  email?: string;
  visitCount?: number;
  lastVisit?: unknown;
  createdAt?: unknown;
};

export function formatUhid(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 999999) throw new Error("UHID counter out of range");
  return `NMB-${String(n).padStart(6, "0")}`;
}

export function isUhid(value: unknown): value is string {
  return typeof value === "string" && /^NMB-\d{6}$/.test(value);
}

/** Any Indian mobile format → "9876543210", or "" if it is not a valid mobile. */
export function normaliseMobile(value: unknown): string {
  const digits = String(value ?? "").replace(/\D/g, "");
  const last10 = digits.length >= 10 ? digits.slice(-10) : "";
  if (!/^[6-9]\d{9}$/.test(last10)) return "";
  const prefix = digits.slice(0, -10);
  return ["", "0", "91", "091", "0091"].includes(prefix) ? last10 : "";
}

/** Spellings of the same number found in old records (for Firestore `in` queries, ≤ 30). */
export function mobileVariants(mobile10: string): string[] {
  if (!/^\d{10}$/.test(mobile10)) return [];
  const a = mobile10.slice(0, 5);
  const b = mobile10.slice(5);
  return [
    mobile10,
    `0${mobile10}`,
    `91${mobile10}`,
    `+91${mobile10}`,
    `+91 ${mobile10}`,
    `+91-${mobile10}`,
    `${a} ${b}`,
    `+91 ${a} ${b}`,
    `91 ${mobile10}`,
  ];
}

/** "Dr. Ramesh  Kumar" → "ramesh"; Hindi names keep their letters. */
export function firstNameKey(name: unknown): string {
  const cleaned = String(name ?? "")
    .toLowerCase()
    .replace(/\b(dr|mr|mrs|ms|shri|smt|kumari|master|baby)\.?\s+/g, "")
    .replace(/[^a-zऀ-ॿ\s]/g, " ")
    .trim();
  return cleaned.split(/\s+/)[0] || "";
}

/** Same family phone is common in India, so the first name must also match. */
export function samePerson(a: unknown, b: unknown): boolean {
  const x = firstNameKey(a);
  const y = firstNameKey(b);
  if (!x || !y) return false;
  return x === y || (x.length >= 3 && y.length >= 3 && (x.startsWith(y) || y.startsWith(x)));
}

export function pickMatch<T extends { name: string }>(candidates: T[], name: string): T | undefined {
  return candidates.find((c) => samePerson(c.name, name));
}

// ---------------------------------------------------------------- timeline

export type TimelineEvent = {
  at: number; // ms since epoch (0 = unknown)
  kind: "prescription" | "appointment" | "payment" | "followup";
  title: string;
  detail: string;
  refId: string;
};

type Doc = Record<string, unknown> & { id: string };

export function toMillis(value: unknown): number {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "object") {
    const v = value as { toMillis?: () => number; seconds?: number };
    if (typeof v.toMillis === "function") return v.toMillis();
    if (typeof v.seconds === "number") return v.seconds * 1000;
  }
  if (typeof value === "string") {
    const iso = Date.parse(value);
    if (!Number.isNaN(iso)) return iso;
  }
  return 0;
}

const str = (v: unknown) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");

function medsSummary(rx: unknown): string {
  if (!Array.isArray(rx) || rx.length === 0) return "No medicines";
  return rx
    .map((m: Record<string, unknown>) => [str(m.brand) || str(m.generic), str(m.strength)].filter(Boolean).join(" "))
    .filter(Boolean)
    .join(", ");
}

export function buildTimeline(input: { records: Doc[]; appointments: Doc[]; payments: Doc[]; followUps: Doc[] }): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  for (const r of input.records) {
    // Record ids are Date.now() at save time.
    const at = /^\d{12,14}$/.test(r.id) ? Number(r.id) : toMillis(r.date);
    events.push({
      at,
      kind: "prescription",
      title: `Prescription${r.prescriptionId ? ` ${str(r.prescriptionId)}` : ""}${r.signedAt ? " · e-signed" : " · draft"}`,
      detail: [str(r.diagnosis) && `Dx: ${str(r.diagnosis)}`, `Rx: ${medsSummary(r.rx)}`, str(r.followUp) && `Follow-up: ${str(r.followUp)}`]
        .filter(Boolean)
        .join(" — "),
      refId: r.id,
    });
  }
  for (const a of input.appointments) {
    events.push({
      at: toMillis(a.createdAt),
      kind: "appointment",
      title: `Appointment · ${str(a.status) || "pending"}`,
      detail: [str(a.service), [str(a.date) || str(a.preferredDate), str(a.time) || str(a.preferredTime)].filter(Boolean).join(" "), str(a.concern)]
        .filter(Boolean)
        .join(" — "),
      refId: a.id,
    });
  }
  for (const p of input.payments) {
    const d = (p.paymentDetails && typeof p.paymentDetails === "object" ? p.paymentDetails : {}) as Record<string, unknown>;
    events.push({
      at: toMillis(p.createdAt) || toMillis(d.confirmedAt),
      kind: "payment",
      title: `Payment · ${str(p.paymentStatus)}`,
      detail: [d.finalAmount !== undefined ? `Rs. ${str(d.finalAmount)}` : "", str(d.paymentMode) || str(d.mode), str(d.reason)].filter(Boolean).join(" — "),
      refId: p.id,
    });
  }
  for (const f of input.followUps) {
    events.push({
      at: toMillis(f.createdAt),
      kind: "followup",
      title: `Follow-up planned${f.nextVisitDate ? ` for ${str(f.nextVisitDate)}` : ""}`,
      detail: [str(f.notes), str(f.plan), f.reminderSent === true ? "Reminder sent" : ""].filter(Boolean).join(" — "),
      refId: f.id,
    });
  }
  const seen = new Set<string>();
  return events
    .filter((e) => {
      const key = `${e.kind}:${e.refId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.at - a.at);
}

// ---------------------------------------------------------------- backfill

/**
 * Group old records/appointments into people (same mobile + same first name).
 * Uses the fullest spelling of the name, and returns the oldest patient first
 * so long-standing patients get the lower UHIDs.
 */
export function groupPeople(items: { id: string; name: string; mobile: unknown; age?: string; sex?: string; email?: string; at: number }[]) {
  const groups: { key: string; name: string; mobile10: string; age?: string; sex?: string; email?: string; ids: string[]; first: number }[] = [];
  // Newest first, so age/sex/email come from the latest visit.
  for (const item of [...items].sort((a, b) => b.at - a.at)) {
    const mobile10 = normaliseMobile(item.mobile);
    const name = item.name.trim().replace(/\s+/g, " ");
    if (!mobile10 || !firstNameKey(name)) continue;
    const existing = groups.find((g) => g.mobile10 === mobile10 && samePerson(g.name, name));
    if (existing) {
      existing.ids.push(item.id);
      existing.age ||= item.age;
      existing.sex ||= item.sex;
      existing.email ||= item.email;
      if (name.length > existing.name.length) existing.name = name;
      if (item.at && (!existing.first || item.at < existing.first)) existing.first = item.at;
    } else {
      groups.push({ key: `${mobile10}:${firstNameKey(name)}`, name, mobile10, age: item.age, sex: item.sex, email: item.email, ids: [item.id], first: item.at });
    }
  }
  return groups.sort((a, b) => (a.first || Infinity) - (b.first || Infinity));
}
