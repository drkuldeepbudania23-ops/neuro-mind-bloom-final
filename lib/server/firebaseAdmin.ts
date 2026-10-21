import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Firebase Admin SDK for trusted server code (Razorpay verification/webhook,
 * notifications). Bypasses Firestore rules, so it must only run in API routes.
 *
 * Configure ONE of:
 *   FIREBASE_SERVICE_ACCOUNT_BASE64  base64 of the service-account JSON (recommended on Vercel)
 *   FIREBASE_SERVICE_ACCOUNT_JSON    the raw JSON
 */
let app: App | null = null;

function loadServiceAccount() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const raw = b64 ? Buffer.from(b64, "base64").toString("utf8") : process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: String(parsed.private_key || "").replace(/\\n/g, "\n"),
  };
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
}

function adminApp(): App {
  if (app) return app;
  const existing = getApps()[0];
  if (existing) {
    app = existing;
    return app;
  }
  const account = loadServiceAccount();
  if (!account) throw new Error("Firebase Admin is not configured (FIREBASE_SERVICE_ACCOUNT_BASE64).");
  app = initializeApp({ credential: cert(account), projectId: account.projectId });
  return app;
}

export function adminDb(): Firestore {
  return getFirestore(adminApp());
}

export function adminAuth(): Auth {
  return getAuth(adminApp());
}

/** Second-factor state carried in the doctor's ID token (set by lib/server/mfa.ts). */
export function mfaSatisfied(claims: Record<string, unknown>, nowSeconds = Date.now() / 1000): boolean {
  if (claims.mfa !== true) return true; // 2FA not enrolled → nothing extra required
  return typeof claims.mfa_exp === "number" && claims.mfa_exp > nowSeconds;
}

/**
 * Verify a Firebase ID token AND that the user has the `doctor` custom claim.
 * When 2FA is enrolled, the 2FA session must also be valid — except for the
 * 2FA routes themselves (`allowPendingMfa`).
 */
export async function verifyDoctorToken(idToken: string, options: { allowPendingMfa?: boolean } = {}): Promise<string | null> {
  if (!idToken) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    if (decoded.doctor !== true) return null;
    if (!options.allowPendingMfa && !mfaSatisfied(decoded)) return null;
    return decoded.uid;
  } catch {
    return null;
  }
}

/** Merge custom claims (never drop `doctor: true`). */
export async function mergeClaims(uid: string, patch: Record<string, unknown>) {
  const user = await adminAuth().getUser(uid);
  const next: Record<string, unknown> = { ...(user.customClaims || {}), ...patch };
  for (const [k, v] of Object.entries(next)) if (v === undefined || v === null) delete next[k];
  await adminAuth().setCustomUserClaims(uid, next);
}
