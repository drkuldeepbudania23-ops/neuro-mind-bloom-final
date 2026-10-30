import "server-only";
import { FieldValue, Timestamp, type DocumentData } from "firebase-admin/firestore";
import { adminAuth, adminDb, verifyDoctorToken } from "./firebaseAdmin";
import { razorpayKeys } from "./payments";
import {
  buildResidentOrder,
  extendAccess,
  getPlan,
  hasAccess,
  resolvePlans,
  watermarkText,
  type ContentInput,
  type ContentSummary,
  type ContentType,
  type Plan,
  type ResidentProfile,
} from "../residents";

const RAZORPAY_API = "https://api.razorpay.com/v1";

const col = {
  residents: () => adminDb().collection("residents"),
  orders: () => adminDb().collection("residentOrders"),
  payments: () => adminDb().collection("residentPayments"),
  content: () => adminDb().collection("residentContent"),
  comments: () => adminDb().collection("residentComments"),
  config: () => adminDb().collection("residentConfig").doc("plans"),
};

const ms = (v: unknown): number | null => (v instanceof Timestamp ? v.toMillis() : typeof v === "number" ? v : null);

// ------------------------------------------------------------------ auth

export type SignedInUser = { uid: string; email: string; emailVerified: boolean };

/** Any signed-in Firebase user (residents have no special claim). */
export async function verifyUser(request: Request): Promise<SignedInUser | null> {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(token, true);
    return { uid: decoded.uid, email: String(decoded.email || ""), emailVerified: decoded.email_verified === true };
  } catch {
    return null;
  }
}

export async function verifyDoctor(request: Request): Promise<string | null> {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  return token ? verifyDoctorToken(token) : null;
}

// ------------------------------------------------------------------ plans

export async function getPlans(): Promise<Plan[]> {
  const snap = await col.config().get();
  return resolvePlans(snap.exists ? snap.data() : null);
}

export async function savePlans(value: Record<string, { price: number }>, doctorUid: string) {
  await col.config().set({ ...value, updatedAt: FieldValue.serverTimestamp(), updatedBy: doctorUid });
}

// ------------------------------------------------------------------ resident profile

export type ResidentState = {
  profile: (ResidentProfile & { email: string }) | null;
  accessUntil: number | null;
  active: boolean;
  plan: string;
};

export async function getResident(uid: string, nowMs = Date.now()): Promise<ResidentState> {
  const snap = await col.residents().doc(uid).get();
  if (!snap.exists) return { profile: null, accessUntil: null, active: false, plan: "" };
  const d = snap.data() || {};
  const accessUntil = ms(d.accessUntil);
  return {
    profile: { name: d.name || "", mobile: d.mobile || "", college: d.college || "", course: d.course || "", year: d.year || "", email: d.email || "" },
    accessUntil,
    active: hasAccess(accessUntil, nowMs) && d.blocked !== true,
    plan: String(d.plan || ""),
  };
}

export async function saveProfile(user: SignedInUser, profile: ResidentProfile) {
  const ref = col.residents().doc(user.uid);
  await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    // Never touch accessUntil / plan / blocked here — only payments and the doctor change those.
    if (snap.exists) tx.update(ref, { ...profile, email: user.email, updatedAt: FieldValue.serverTimestamp() });
    else tx.set(ref, { ...profile, email: user.email, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  });
}

// ------------------------------------------------------------------ subscription payments

export type ResidentOrderError = "not-configured" | "no-profile" | "blocked" | "invalid-plan" | "gateway";
export type ResidentOrderResult =
  | { error: ResidentOrderError }
  | {
      order: { id: string; amount: number; currency: string };
      keyId: string;
      description: string;
      prefill: Record<string, string>;
    };

export async function createResidentOrder(user: SignedInUser, planId: string): Promise<ResidentOrderResult> {
  const { keyId, keySecret, configured } = razorpayKeys();
  if (!configured) return { error: "not-configured" as const };
  const resident = await col.residents().doc(user.uid).get();
  if (!resident.exists) return { error: "no-profile" as const };
  if (resident.data()?.blocked === true) return { error: "blocked" as const };

  const plan = getPlan(await getPlans(), planId);
  if (!plan) return { error: "invalid-plan" as const };
  const payload = buildResidentOrder(user.uid, plan, Date.now());
  if (!payload) return { error: "invalid-plan" as const };

  const response = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = (await response.json().catch(() => ({}))) as { error?: { code?: string; description?: string } };
    console.warn("residents/order gateway", response.status, detail?.error?.code, detail?.error?.description);
    return { error: "gateway" as const };
  }
  const order = (await response.json()) as { id: string; amount: number; currency: string };
  await col.orders().doc(order.id).set({
    orderId: order.id,
    uid: user.uid,
    planId: plan.id,
    days: plan.days,
    amount: order.amount,
    status: "created",
    createdAt: FieldValue.serverTimestamp(),
  });
  const d = resident.data() || {};
  return {
    order: { id: order.id, amount: order.amount, currency: order.currency },
    keyId,
    description: `Residents ${plan.label.en} plan`,
    prefill: { name: String(d.name || ""), contact: String(d.mobile || ""), email: String(user.email || "") },
  };
}

export async function isResidentOrder(orderId: string): Promise<boolean> {
  if (!/^order_[A-Za-z0-9]{6,40}$/.test(orderId)) return false;
  return (await col.orders().doc(orderId).get()).exists;
}

/**
 * Grant access for a paid order. Idempotent (browser verify + webhook may both
 * call it). `expectUid` is set when the browser calls, so one resident cannot
 * claim another resident's order.
 */
export async function markResidentOrderPaid(orderId: string, paymentId: string, opts: { amountPaise?: number; expectUid?: string } = {}) {
  const db = adminDb();
  const orderRef = col.orders().doc(orderId);
  return db.runTransaction(async (tx) => {
    const orderSnap = await tx.get(orderRef);
    if (!orderSnap.exists) return { ok: false as const, reason: "unknown-order" };
    const order = orderSnap.data() as { uid: string; planId: string; days: number; amount: number; status: string };
    if (opts.expectUid && opts.expectUid !== order.uid) return { ok: false as const, reason: "wrong-user" };
    if (opts.amountPaise !== undefined && opts.amountPaise !== order.amount) return { ok: false as const, reason: "amount-mismatch" };
    if (order.status === "paid") return { ok: true as const, alreadyRecorded: true };

    const residentRef = col.residents().doc(order.uid);
    const residentSnap = await tx.get(residentRef);
    const now = Date.now();
    const until = extendAccess(ms(residentSnap.data()?.accessUntil), order.days, now);
    const paidAt = FieldValue.serverTimestamp();

    tx.set(residentRef, { accessUntil: Timestamp.fromMillis(until), plan: order.planId, lastPaymentAt: paidAt }, { merge: true });
    tx.create(col.payments().doc(paymentId), {
      paymentId,
      orderId,
      uid: order.uid,
      planId: order.planId,
      amount: order.amount / 100,
      days: order.days,
      accessUntil: Timestamp.fromMillis(until),
      mode: "Razorpay",
      createdAt: paidAt,
    });
    tx.update(orderRef, { status: "paid", paymentId, paidAt });
    return { ok: true as const, alreadyRecorded: false, accessUntil: until };
  });
}

// ------------------------------------------------------------------ content

function summaryOf(id: string, d: DocumentData): ContentSummary {
  return {
    id,
    type: d.type as ContentType,
    title: d.title || "",
    topic: d.topic || "",
    summary: d.summary || "",
    hasPdf: Boolean(d.pdfPath),
    publishedAt: ms(d.publishedAt) ?? ms(d.updatedAt) ?? 0,
  };
}

export async function listPublished(): Promise<ContentSummary[]> {
  const snap = await col.content().where("status", "==", "published").get();
  return snap.docs.map((doc) => summaryOf(doc.id, doc.data())).sort((a, b) => b.publishedAt - a.publishedAt);
}

export async function getPublished(id: string) {
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return null;
  const snap = await col.content().doc(id).get();
  const d = snap.data();
  if (!snap.exists || !d || d.status !== "published") return null;
  return {
    ...summaryOf(snap.id, d),
    body: String(d.body || ""),
    videoId: String(d.videoId || ""),
    pdfName: String(d.pdfName || ""),
    commentsOpen: d.commentsOpen !== false,
  };
}

export async function listComments(contentId: string, includeHidden = false) {
  const snap = await col.comments().where("contentId", "==", contentId).get();
  return snap.docs
    .map((doc) => {
      const d = doc.data();
      return { id: doc.id, contentId, uid: String(d.uid || ""), name: String(d.name || ""), text: String(d.text || ""), byDoctor: d.byDoctor === true, status: String(d.status || "visible"), createdAt: ms(d.createdAt) ?? 0 };
    })
    .filter((c) => includeHidden || c.status === "visible")
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function addComment(contentId: string, author: { uid: string; name: string; byDoctor: boolean }, text: string) {
  const ref = await col.comments().add({ contentId, uid: author.uid, name: author.name, byDoctor: author.byDoctor, text, status: "visible", createdAt: FieldValue.serverTimestamp() });
  return ref.id;
}

// ------------------------------------------------------------------ notes PDF (watermarked, short-lived link)

function bucket() {
  const name = (process.env.RESIDENT_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "").trim();
  if (!name) throw new Error("Storage bucket not configured (RESIDENT_STORAGE_BUCKET).");
  return import("firebase-admin/storage").then(({ getStorage }) => getStorage().bucket(name));
}

/** pdf-lib's standard font only encodes Latin-1; drop anything else (e.g. a Hindi name). */
const latin = (s: string) => s.replace(/[^\x20-\x7E]/g, "").replace(/\s{2,}/g, " ").trim();

export async function watermarkedPdfUrl(uid: string, email: string, contentId: string): Promise<{ url: string; name: string } | null> {
  const item = await col.content().doc(contentId).get();
  const d = item.data();
  if (!item.exists || !d || d.status !== "published" || !d.pdfPath) return null;

  const b = await bucket();
  const source = b.file(String(d.pdfPath));
  const [meta] = await source.getMetadata();
  const target = b.file(`residents/licensed/${uid}/${contentId}.pdf`);
  const [exists] = await target.exists();
  let fresh = false;
  if (exists) {
    const [tmeta] = await target.getMetadata();
    fresh = tmeta.metadata?.sourceGeneration === String(meta.generation);
  }

  if (!fresh) {
    const [bytes] = await source.download();
    const { PDFDocument, StandardFonts, rgb, degrees } = await import("pdf-lib");
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const resident = (await col.residents().doc(uid).get()).data() || {};
    const text = latin(watermarkText({ name: resident.name, mobile: resident.mobile }, email, new Date()));
    for (const page of pdf.getPages()) {
      const { width, height } = page.getSize();
      const size = Math.max(7, Math.min(10, width / 70));
      page.drawText(text, { x: 24, y: 14, size, font, color: rgb(0.45, 0.45, 0.45), opacity: 0.8 });
      page.drawText(text, {
        x: width * 0.12,
        y: height * 0.3,
        size: size * 1.6,
        font,
        color: rgb(0.6, 0.6, 0.6),
        opacity: 0.18,
        rotate: degrees(35),
      });
    }
    const out = await pdf.save();
    await target.save(Buffer.from(out), {
      resumable: false,
      contentType: "application/pdf",
      metadata: { cacheControl: "private, no-store", metadata: { sourceGeneration: String(meta.generation), uid } },
    });
  }

  const [url] = await target.getSignedUrl({ version: "v4", action: "read", expires: Date.now() + 10 * 60 * 1000 });
  return { url, name: String(d.pdfName || "notes.pdf") };
}

// ------------------------------------------------------------------ doctor tools

export async function listAllContent() {
  const snap = await col.content().get();
  return snap.docs
    .map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        type: d.type,
        title: d.title || "",
        topic: d.topic || "",
        summary: d.summary || "",
        body: d.body || "",
        videoId: d.videoId || "",
        pdfPath: d.pdfPath || "",
        pdfName: d.pdfName || "",
        status: d.status || "draft",
        commentsOpen: d.commentsOpen !== false,
        updatedAt: ms(d.updatedAt) ?? 0,
      };
    })
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function saveContent(id: string | null, value: ContentInput, doctorUid: string) {
  const data: Record<string, unknown> = { ...value, updatedAt: FieldValue.serverTimestamp(), updatedBy: doctorUid };
  if (id) {
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return null;
    const ref = col.content().doc(id);
    await adminDb().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("not-found");
      if (value.status === "published" && !snap.data()?.publishedAt) data.publishedAt = FieldValue.serverTimestamp();
      tx.update(ref, data);
    });
    return id;
  }
  if (value.status === "published") data.publishedAt = FieldValue.serverTimestamp();
  data.createdAt = FieldValue.serverTimestamp();
  return (await col.content().add(data)).id;
}

export async function deleteContent(id: string) {
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return false;
  const ref = col.content().doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  const pdfPath = String(snap.data()?.pdfPath || "");
  await ref.delete();
  const comments = await col.comments().where("contentId", "==", id).get();
  const batch = adminDb().batch();
  comments.docs.forEach((c) => batch.delete(c.ref));
  await batch.commit();
  if (pdfPath) {
    try {
      await (await bucket()).file(pdfPath).delete({ ignoreNotFound: true });
    } catch (e) {
      console.warn("residents delete pdf", e);
    }
  }
  return true;
}

export async function listSubscribers(nowMs = Date.now()) {
  const snap = await col.residents().get();
  return snap.docs
    .map((doc) => {
      const d = doc.data();
      const accessUntil = ms(d.accessUntil);
      return {
        uid: doc.id,
        name: String(d.name || ""),
        email: String(d.email || ""),
        mobile: String(d.mobile || ""),
        college: String(d.college || ""),
        course: String(d.course || ""),
        year: String(d.year || ""),
        plan: String(d.plan || ""),
        accessUntil,
        active: hasAccess(accessUntil, nowMs) && d.blocked !== true,
        blocked: d.blocked === true,
        createdAt: ms(d.createdAt) ?? 0,
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function listResidentPayments() {
  const snap = await col.payments().get();
  return snap.docs
    .map((doc) => {
      const d = doc.data();
      return { id: doc.id, uid: String(d.uid || ""), planId: String(d.planId || ""), amount: Number(d.amount || 0), mode: String(d.mode || ""), createdAt: ms(d.createdAt) ?? 0 };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

/** Complimentary access or correction by the doctor (recorded as a ₹0 payment). */
export async function grantAccess(uid: string, days: number, note: string, doctorUid: string) {
  if (!/^[A-Za-z0-9_-]{6,128}$/.test(uid) || !Number.isInteger(days) || days < 1 || days > 730) return false;
  const ref = col.residents().doc(uid);
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return false;
    const until = extendAccess(ms(snap.data()?.accessUntil), days, Date.now());
    tx.update(ref, { accessUntil: Timestamp.fromMillis(until), plan: snap.data()?.plan || "complimentary" });
    tx.create(col.payments().doc(`grant_${uid.slice(0, 20)}_${Date.now()}`), {
      uid,
      planId: "complimentary",
      amount: 0,
      days,
      accessUntil: Timestamp.fromMillis(until),
      mode: "Granted by doctor",
      note: note.slice(0, 200),
      grantedBy: doctorUid,
      createdAt: FieldValue.serverTimestamp(),
    });
    return true;
  });
}

export async function setBlocked(uid: string, blocked: boolean) {
  if (!/^[A-Za-z0-9_-]{6,128}$/.test(uid)) return false;
  const ref = col.residents().doc(uid);
  if (!(await ref.get()).exists) return false;
  await ref.update({ blocked });
  return true;
}

export async function setCommentStatus(id: string, status: "visible" | "hidden") {
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return false;
  const ref = col.comments().doc(id);
  if (!(await ref.get()).exists) return false;
  await ref.update({ status });
  return true;
}

export async function recentComments(limit = 100) {
  const snap = await col.comments().orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((doc) => {
    const d = doc.data();
    return { id: doc.id, contentId: String(d.contentId || ""), name: String(d.name || ""), text: String(d.text || ""), byDoctor: d.byDoctor === true, status: String(d.status || "visible"), createdAt: ms(d.createdAt) ?? 0 };
  });
}
