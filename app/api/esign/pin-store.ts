import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const PROJECT_ID = "neuro-mind-bloom";
const API_KEY = "AIzaSyC2bX4cWgV7sKhKmNflLGJSvAU6CqrTizw";
const ITERATIONS = 310000;
const LEGACY_PIN = {
  salt: "b4f9428a3e2b408a12f809829e5b599f25c1c058ee72e6fb",
  hash: "2fb9ce23ef710c70618dfd126142f8183ba975ff614ccb6c8aeb2a8611765432",
  iterations: ITERATIONS,
};

type PinRecord = {
  salt: string;
  hash: string;
  iterations: number;
};

export async function getUid(idToken: string) {
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
    return claims.doctor === true ? uid : "";
  } catch {
    return "";
  }
}

function pinDocumentUrl(uid: string) {
  return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/esignPins/${encodeURIComponent(uid)}`;
}

async function readPinRecord(uid: string, idToken: string): Promise<PinRecord> {
  const response = await fetch(pinDocumentUrl(uid), {
    headers: { Authorization: `Bearer ${idToken}` },
    cache: "no-store",
  });

  if (response.status === 404) return LEGACY_PIN;
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