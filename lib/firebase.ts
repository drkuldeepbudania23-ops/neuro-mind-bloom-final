import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, type Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

/**
 * Firebase web configuration.
 *
 * These values identify the Firebase project to the browser; they are not
 * secrets (access is enforced by Firebase Auth + firestore.rules), but they are
 * kept in environment variables so that development/staging can point at a
 * SEPARATE Firebase project and never touch live patient data.
 *
 * Set them in `.env.local` (local) or in Vercel → Project → Environment Variables.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Firebase is not configured. Copy .env.example to .env.local and fill the NEXT_PUBLIC_FIREBASE_* values."
  );
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);

/**
 * Firebase App Check (optional): proves requests come from OUR website, which
 * blocks scripts that abuse the public booking form. Set
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY (reCAPTCHA v3), then turn on "Enforce" for
 * Firestore in Firebase console → App Check once metrics look healthy.
 */
const appCheckKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
if (typeof window !== "undefined" && appCheckKey) {
  try {
    initializeAppCheck(app, { provider: new ReCaptchaV3Provider(appCheckKey), isTokenAutoRefreshEnabled: true });
  } catch {
    // already initialised (hot reload)
  }
}

/**
 * `ignoreUndefinedProperties` matters: the e-prescription record contains
 * optional fields (appointmentId, paymentClearance, signedAt…) that are often
 * `undefined`. With the default settings Firestore REJECTS such writes, so
 * prescriptions were silently saved only in the browser, not in the cloud.
 */
function createDb(): Firestore {
  try {
    return initializeFirestore(app, { ignoreUndefinedProperties: true });
  } catch {
    // Already initialised (hot reload) — reuse the existing instance.
    return getFirestore(app);
  }
}

export const db = createDb();

export default app;
