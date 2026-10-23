/**
 * Old ("legacy") doctor-dashboard data that the earlier website kept ONLY in the
 * browser (localStorage) — never in Firestore:
 *
 *   nmb_followups      → follow-up notes (the old site never saved these to the cloud)
 *   nmb_prescriptions  → prescriptions whose cloud save had failed (older Firestore bug)
 *   nmb_payments       → local copy of payment clearances (the authoritative record is
 *                        already in Firestore `payments`; these are imported only as an
 *                        archive and NEVER count as a payment clearance)
 *
 * This module is pure (no Firebase) so it can be unit-tested. It reads a backup
 * (from this browser or from an exported .json file), cleans every record and
 * returns what can be uploaded.
 */

export const LEGACY_KEYS = ["nmb_followups", "nmb_prescriptions", "nmb_payments"] as const;
export type LegacyKey = (typeof LEGACY_KEYS)[number];

export type LegacyKind = "followUps" | "prescriptions" | "payments";

export const KIND_OF_KEY: Record<LegacyKey, LegacyKind> = {
  nmb_followups: "followUps",
  nmb_prescriptions: "prescriptions",
  nmb_payments: "payments",
};

/** Firestore collection each kind is written to. */
export const COLLECTION_OF_KIND: Record<LegacyKind, string> = {
  followUps: "followUps",
  prescriptions: "patientRecords",
  payments: "legacyPayments",
};

export type LegacyRecord = { id: string } & Record<string, unknown>;

export type LegacyPlan = Record<LegacyKind, LegacyRecord[]> & {
  /** Entries that could not be used (no id, not an object, …). */
  invalid: number;
};

/** The backup file format written by the "Download backup" button / export snippet. */
export type LegacyBackup = {
  format?: string;
  exportedAt?: string;
  origin?: string;
  data: Partial<Record<LegacyKey, unknown>>;
};

export const BACKUP_FORMAT = "nmb-browser-backup-v1";

const MAX_STRING = 20_000;
const MAX_DEPTH = 6;
const MAX_ARRAY = 200;

/** Firestore document ids: non-empty, ≤ 128 chars, no "/", not "." or "..", not __reserved__. */
export function isValidDocId(id: unknown): id is string {
  if (typeof id !== "string") return false;
  const t = id.trim();
  if (!t || t !== id || t.length > 128) return false;
  if (t.includes("/") || t === "." || t === "..") return false;
  if (/^__.*__$/.test(t)) return false;
  return true;
}

/** Deep-clean a value so Firestore accepts it: drop undefined/functions, bound sizes. */
export function cleanValue(value: unknown, depth = 0): unknown {
  if (value === null) return null;
  if (typeof value === "string") return value.length > MAX_STRING ? value.slice(0, MAX_STRING) : value;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean") return value;
  if (depth >= MAX_DEPTH) return undefined;
  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_ARRAY)
      .map((v) => cleanValue(v, depth + 1))
      .filter((v) => v !== undefined);
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      // Firestore field names may not be empty or look like __reserved__.
      if (!k || /^__.*__$/.test(k)) continue;
      const c = cleanValue(v, depth + 1);
      if (c !== undefined) out[k] = c;
    }
    return out;
  }
  return undefined; // undefined, function, symbol, bigint
}

/** A stored value may be the raw localStorage string or an already-parsed array. */
export function parseList(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Build the upload plan from a backup's data. Duplicate ids keep the first (newest) entry. */
export function buildPlan(data: Partial<Record<LegacyKey, unknown>>): LegacyPlan {
  const plan: LegacyPlan = { followUps: [], prescriptions: [], payments: [], invalid: 0 };
  for (const key of LEGACY_KEYS) {
    const kind = KIND_OF_KEY[key];
    const seen = new Set<string>();
    for (const item of parseList(data[key])) {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        plan.invalid++;
        continue;
      }
      const cleaned = cleanValue(item) as Record<string, unknown>;
      const id = typeof cleaned.id === "number" ? String(cleaned.id) : cleaned.id;
      if (!isValidDocId(id) || seen.has(id)) {
        plan.invalid++;
        continue;
      }
      seen.add(id);
      plan[kind].push({ ...cleaned, id });
    }
  }
  return plan;
}

/** Parse an uploaded backup file (our format, or a plain {nmb_followups: …} object). */
export function parseBackupFile(text: string): LegacyBackup {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("This is not a valid backup file (JSON could not be read).");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("This is not a valid backup file.");
  }
  const obj = parsed as Record<string, unknown>;
  const source = (obj.data && typeof obj.data === "object" ? obj.data : obj) as Record<string, unknown>;
  const data: Partial<Record<LegacyKey, unknown>> = {};
  let found = false;
  for (const key of LEGACY_KEYS) {
    if (key in source) {
      data[key] = source[key];
      found = true;
    }
  }
  if (!found) throw new Error("No Neuro Mind Bloom dashboard data found in this file.");
  return {
    format: typeof obj.format === "string" ? obj.format : undefined,
    exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : undefined,
    origin: typeof obj.origin === "string" ? obj.origin : undefined,
    data,
  };
}

/** Make a backup object from a Storage-like getter (localStorage). */
export function backupFromStorage(get: (key: string) => string | null, origin = ""): LegacyBackup {
  const data: Partial<Record<LegacyKey, unknown>> = {};
  for (const key of LEGACY_KEYS) data[key] = get(key) ?? "[]";
  return { format: BACKUP_FORMAT, exportedAt: new Date().toISOString(), origin, data };
}

/** Fields added to every imported document so it can be recognised later. */
export function importMeta(source: "browser" | "file", importedAt: string) {
  return { importedFrom: source === "browser" ? "browser-localStorage" : "backup-file", importedAt };
}

export function planCounts(plan: LegacyPlan) {
  return {
    followUps: plan.followUps.length,
    prescriptions: plan.prescriptions.length,
    payments: plan.payments.length,
    total: plan.followUps.length + plan.prescriptions.length + plan.payments.length,
    invalid: plan.invalid,
  };
}
