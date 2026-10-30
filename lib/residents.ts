/**
 * Residents' learning section — pure helpers (no Firebase, no network) so the
 * rules that decide money and access can be unit-tested.
 *
 * Data lives in Firestore but is read and written ONLY by server routes with the
 * Admin SDK (firestore.rules deny all client access to these collections):
 *   residents/{uid}            profile + accessUntil (set only after a verified payment)
 *   residentOrders/{orderId}   Razorpay orders for subscriptions
 *   residentPayments/{payId}   immutable payment records
 *   residentContent/{id}       notes / videos / cases written by the doctor
 *   residentComments/{id}      case-discussion comments
 *   residentConfig/plans       plan prices the doctor can change
 */

export type PlanId = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  label: { en: string; hi: string };
  price: number; // rupees
  days: number;
};

export const DEFAULT_PLANS: readonly Plan[] = [
  { id: "monthly", label: { en: "Monthly", hi: "मासिक" }, price: 999, days: 30 },
  { id: "yearly", label: { en: "Yearly", hi: "वार्षिक" }, price: 9999, days: 365 },
];

export const PLAN_IDS: readonly PlanId[] = ["monthly", "yearly"];

export const MIN_PRICE = 1;
export const MAX_PRICE = 100000;

/** Merge stored price overrides (from the doctor) onto the defaults; ignore anything invalid. */
export function resolvePlans(stored: unknown): Plan[] {
  const overrides = (stored && typeof stored === "object" ? stored : {}) as Record<string, unknown>;
  return DEFAULT_PLANS.map((plan) => {
    const raw = overrides[plan.id] as { price?: unknown; enabled?: unknown } | undefined;
    const price = Number(raw?.price);
    return Number.isInteger(price) && price >= MIN_PRICE && price <= MAX_PRICE ? { ...plan, price } : { ...plan };
  });
}

export function getPlan(plans: readonly Plan[], id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}

export function validPlanPrices(input: unknown): { ok: true; value: Record<PlanId, { price: number }> } | { ok: false; error: string } {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const value = {} as Record<PlanId, { price: number }>;
  for (const id of PLAN_IDS) {
    const price = Number((data[id] as { price?: unknown } | undefined)?.price);
    if (!Number.isInteger(price) || price < MIN_PRICE || price > MAX_PRICE) {
      return { ok: false, error: `${id} price must be a whole number between ${MIN_PRICE} and ${MAX_PRICE}` };
    }
    value[id] = { price };
  }
  return { ok: true, value };
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * New access end after a purchase. Renewing early adds the days on top of the
 * remaining access instead of wasting it.
 */
export function extendAccess(currentUntilMs: number | null | undefined, days: number, nowMs: number): number {
  const base = currentUntilMs && currentUntilMs > nowMs ? currentUntilMs : nowMs;
  return base + days * DAY_MS;
}

export function hasAccess(accessUntilMs: number | null | undefined, nowMs: number): boolean {
  return typeof accessUntilMs === "number" && accessUntilMs > nowMs;
}

export type OrderPayload = {
  amount: number; // paise
  currency: "INR";
  receipt: string;
  notes: { kind: "resident-subscription"; uid: string; planId: PlanId };
};

/** Amount always comes from the server-side plan, never from the browser. */
export function buildResidentOrder(uid: string, plan: Plan, nowMs: number): OrderPayload | null {
  if (!/^[A-Za-z0-9_-]{6,128}$/.test(uid)) return null;
  if (!Number.isInteger(plan.price) || plan.price < MIN_PRICE) return null;
  return {
    amount: plan.price * 100,
    currency: "INR",
    receipt: `res_${uid.slice(0, 20)}_${Math.floor(nowMs / 1000).toString(36)}`.slice(0, 40),
    notes: { kind: "resident-subscription", uid, planId: plan.id },
  };
}

// ---------------------------------------------------------------- profile

export type ResidentProfile = {
  name: string;
  mobile: string;
  college: string;
  course: string; // e.g. "MD Psychiatry", "DNB Psychiatry", "MBBS intern"
  year: string;
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export function validateProfile(input: unknown): { ok: true; value: ResidentProfile } | { ok: false; error: string } {
  const d = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const value: ResidentProfile = {
    name: clean(d.name, 80),
    mobile: (typeof d.mobile === "string" ? d.mobile : "").replace(/\D/g, "").slice(0, 13),
    college: clean(d.college, 120),
    course: clean(d.course, 60),
    year: clean(d.year, 20),
  };
  if (value.name.length < 2) return { ok: false, error: "name" };
  if (!/^[6-9][0-9]{9}$/.test(value.mobile.slice(-10)) || value.mobile.length < 10) return { ok: false, error: "mobile" };
  value.mobile = value.mobile.slice(-10);
  if (value.college.length < 2) return { ok: false, error: "college" };
  if (value.course.length < 2) return { ok: false, error: "course" };
  return { ok: true, value };
}

// ---------------------------------------------------------------- content

export type ContentType = "note" | "video" | "case";
export const CONTENT_TYPES: readonly ContentType[] = ["note", "video", "case"];

export const CONTENT_LABEL: Record<ContentType, { en: string; hi: string }> = {
  note: { en: "Notes", hi: "नोट्स" },
  video: { en: "Video lectures", hi: "वीडियो लेक्चर" },
  case: { en: "Case discussions", hi: "केस डिस्कशन" },
};

export type ContentInput = {
  type: ContentType;
  title: string;
  topic: string;
  summary: string;
  body: string; // markdown-ish plain text: case history / discussion / note text
  videoId: string; // YouTube id (videos)
  pdfPath: string; // Cloud Storage object path (notes), set by the upload flow
  pdfName: string;
  status: "draft" | "published";
  commentsOpen: boolean;
};

/** Accepts a YouTube URL or bare id; returns the 11-character id or "". */
export function youtubeId(input: string): string {
  const s = (input || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

export const PDF_PATH_RE = /^residents\/notes\/[A-Za-z0-9_-]{6,64}\.pdf$/;

export function validateContent(input: unknown): { ok: true; value: ContentInput } | { ok: false; error: string } {
  const d = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const type = d.type as ContentType;
  if (!CONTENT_TYPES.includes(type)) return { ok: false, error: "type" };
  const value: ContentInput = {
    type,
    title: clean(d.title, 160),
    topic: clean(d.topic, 80),
    summary: clean(d.summary, 400),
    body: typeof d.body === "string" ? d.body.replace(/\r\n/g, "\n").trim().slice(0, 50000) : "",
    videoId: youtubeId(String(d.videoId || "")),
    pdfPath: typeof d.pdfPath === "string" ? d.pdfPath.trim() : "",
    pdfName: clean(d.pdfName, 120),
    status: d.status === "published" ? "published" : "draft",
    commentsOpen: d.commentsOpen !== false,
  };
  if (value.title.length < 3) return { ok: false, error: "title" };
  if (value.pdfPath && !PDF_PATH_RE.test(value.pdfPath)) return { ok: false, error: "pdfPath" };
  if (value.status === "published") {
    if (type === "video" && !value.videoId) return { ok: false, error: "videoId" };
    if (type === "note" && !value.pdfPath && value.body.length < 20) return { ok: false, error: "note-empty" };
    if (type === "case" && value.body.length < 20) return { ok: false, error: "case-empty" };
  }
  if (type !== "video") value.videoId = "";
  if (type !== "note") {
    value.pdfPath = "";
    value.pdfName = "";
  }
  return { ok: true, value };
}

export function validateComment(text: unknown): string | null {
  const t = typeof text === "string" ? text.replace(/\r\n/g, "\n").trim() : "";
  if (t.length < 2 || t.length > 2000) return null;
  return t;
}

/** Text stamped on every page of a downloaded note (deters sharing). */
export function watermarkText(profile: { name?: string; mobile?: string }, email: string, now: Date): string {
  const who = [clean(profile.name, 60), profile.mobile ? `+91 ${String(profile.mobile).slice(-10)}` : "", email].filter(Boolean).join(" · ");
  const when = now.toISOString().slice(0, 10);
  return `Licensed to ${who} · ${when} · Neuro Mind Bloom — do not share`;
}

/** List row shown to everyone signed in (locked items show title only). */
export type ContentSummary = {
  id: string;
  type: ContentType;
  title: string;
  topic: string;
  summary: string;
  hasPdf: boolean;
  publishedAt: number;
};
