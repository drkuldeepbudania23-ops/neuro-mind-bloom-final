import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

// Public Firebase identifiers come from environment variables so the same code
// can run against a separate development/staging Firebase project.
const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
const ITERATIONS = 310000;

// Optional one-time fallback for doctors who have never stored a PIN record.
// Previously this hash was hard-coded in source; it now lives only in server env.
// Leave both unset once the doctor has set a PIN via "Recover / Set PIN".
function legacyPin(): PinRecord | null {
  const salt = process.env.ESIGN_LEGACY_PIN_SALT || "";
  const hash = process.env.ESIGN_LEGACY_PIN_HASH || "";
  if (!/^[a-f\d]{48}$/i.test(salt) || !/^[a-f\d]{64}$/i.test(hash)) return null;
  return { salt, hash, iterations: ITERATIONS };
}

function assertConfigured() {
  if (!PROJECT_ID || !API_KEY) {
    throw new Error("Firebase server configuration is missing (see .env.example).");
  }
}

type PinRecord = {
  salt: string;
  hash: string;
  iterations: number;
};

export async function getUid(idToken: string) {
  assertConfigured();
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );
  if (!response.ok) return "";
  const data = await response.json();
  return String(data?.users?.[0]?.localId || "");
}

export async function getDoctorUid(idToken: string) {
  const uid = await getUid(idToken);
  if (!uid) return "";

  try {
    const payload = idToken.split(".")[1];
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (claims.doctor !== true) return "";
    // When 2FA is enrolled, the 2FA session must be valid too.
    if (claims.mfa === true && !(typeof claims.mfa_exp === "number" && claims.mfa_exp > Date.now() / 1000)) return "";
    return uid;
  } catch {
    return "";
  }
}

function pinDocumentUrl(uid: string) {
  return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/esignPins/${encodeURIComponent(uid)}`;
}

async function readPinRecord(uid: string, idToken: string): Promise<PinRecord | null> {
  const response = await fetch(pinDocumentUrl(uid), {
    headers: { Authorization: `Bearer ${idToken}` },
    cache: "no-store",
  });

  if (response.status === 404) return legacyPin();
  if (!response.ok) throw new Error("PIN record could not be read.");

  const fields = (await response.json())?.fields || {};
  const salt = String(fields.salt?.stringValue || "");
  const hash = String(fields.hash?.stringValue || "");
  const iterations = Number(fields.iterations?.integerValue || 0);
  if (!/^[a-f\d]{48}$/i.test(salt) || !/^[a-f\d]{64}$/i.test(hash) || iterations < 100000 || iterations > 1000000) {
    throw new Error("PIN record is invalid.");
  }
  return { salt, hash, iterations };
}

export async function verifyPinForUid(uid: string, idToken: string, pin: string) {
  if (!/^\d{8}$/.test(pin)) return false;
  const record = await readPinRecord(uid, idToken);
  if (!record) return false; // No PIN set yet: doctor must use "Recover / Set PIN".
  const entered = pbkdf2Sync(pin, record.salt, record.iterations, 32, "sha256");
  const saved = Buffer.from(record.hash, "hex");
  return entered.length === saved.length && timingSafeEqual(entered, saved);
}

export async function authorizePinReset(
  idToken: string,
  mode: "change" | "recover",
  currentPin = ""
) {
  const uid = await getDoctorUid(idToken);
  if (!uid) return { uid: "", reason: "doctor" as const };

  if (mode === "recover") {
    return hasRecentAuthentication(idToken)
      ? { uid, reason: null }
      : { uid: "", reason: "reauthentication" as const };
  }

  if (!(await verifyPinForUid(uid, idToken, currentPin))) {
    return { uid: "", reason: "current-pin" as const };
  }
  return { uid, reason: null };
}

export async function savePin(uid: string, idToken: string, pin: string) {
  const salt = randomBytes(24).toString("hex");
  const hash = pbkdf2Sync(pin, salt, ITERATIONS, 32, "sha256").toString("hex");
  const response = await fetch(pinDocumentUrl(uid), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        salt: { stringValue: salt },
        hash: { stringValue: hash },
        iterations: { integerValue: String(ITERATIONS) },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
    cache: "no-store",
  });
  return response.ok;
}

export function hasRecentAuthentication(idToken: string) {
  try {
    const payload = idToken.split(".")[1];
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const ageSeconds = Math.floor(Date.now() / 1000) - Number(claims.auth_time);
    return Number.isFinite(ageSeconds) && ageSeconds >= 0 && ageSeconds <= 300;
  } catch {
    return false;
  }
}