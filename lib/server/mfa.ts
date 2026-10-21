import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, mergeClaims } from "./firebaseAdmin";
import { generateRecoveryCodes, generateSecret, hashRecoveryCode, otpauthUri, verifyTotp } from "../security/totp";
import { purposeSecret } from "../rx/link";

/**
 * Doctor 2FA (authenticator app). State lives in mfa/{uid} — readable only by
 * the server (Firestore rules deny clients). The TOTP secret is encrypted.
 * A successful code sets custom claims { mfa: true, mfa_exp } which Firestore
 * rules and every doctor API route check.
 */

export const MFA_SESSION_HOURS = Math.min(24, Math.max(1, Number(process.env.MFA_SESSION_HOURS || 12)));
const MAX_FAILURES = 5;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;

function key(): Buffer {
  const raw = process.env.MFA_ENCRYPTION_KEY || purposeSecret(process.env.RX_LINK_SECRET || "", "mfa-encryption");
  if (!raw || raw.length < 16) throw new Error("Set MFA_ENCRYPTION_KEY (or RX_LINK_SECRET) to use 2FA");
  return createHash("sha256").update(raw).digest();
}

function pepper(): string {
  return createHash("sha256").update(key()).update("recovery").digest("hex");
}

export function encrypt(text: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), data].map((b) => b.toString("base64url")).join(".");
}

export function decrypt(payload: string): string {
  const [iv, tag, data] = payload.split(".").map((p) => Buffer.from(p, "base64url"));
  const d = createDecipheriv("aes-256-gcm", key(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString("utf8");
}

type MfaDoc = {
  enabled?: boolean;
  secret?: string;
  pendingSecret?: string;
  lastCounter?: number;
  recovery?: string[];
  failures?: { count: number; start: number };
};

const ref = (uid: string) => adminDb().collection("mfa").doc(uid);

export async function mfaStatus(uid: string) {
  const snap = await ref(uid).get();
  const d = (snap.exists ? snap.data() : {}) as MfaDoc;
  return { enabled: Boolean(d.enabled), recoveryLeft: d.recovery?.length ?? 0 };
}

export async function startSetup(uid: string, account: string) {
  const secret = generateSecret();
  await ref(uid).set({ pendingSecret: encrypt(secret), pendingAt: FieldValue.serverTimestamp() }, { merge: true });
  return { secret, otpauth: otpauthUri(secret, account) };
}

async function grantSession(uid: string) {
  const exp = Math.floor(Date.now() / 1000) + MFA_SESSION_HOURS * 3600;
  await mergeClaims(uid, { mfa: true, mfa_exp: exp });
  return exp;
}

/** Confirm the first code from the app → 2FA on, recovery codes returned ONCE. */
export async function enable(uid: string, code: string) {
  const snap = await ref(uid).get();
  const d = (snap.exists ? snap.data() : {}) as MfaDoc;
  if (!d.pendingSecret) return { error: "no-setup" as const };
  const secret = decrypt(d.pendingSecret);
  const counter = verifyTotp(secret, code);
  if (counter === null) return { error: "wrong-code" as const };
  const codes = generateRecoveryCodes();
  await ref(uid).set({
    enabled: true,
    secret: d.pendingSecret,
    lastCounter: counter,
    recovery: codes.map((c) => hashRecoveryCode(c, pepper())),
    failures: { count: 0, start: 0 },
    enabledAt: FieldValue.serverTimestamp(),
  });
  const exp = await grantSession(uid);
  return { recoveryCodes: codes, exp };
}

/** Code from the app (or a recovery code) → 2FA session for MFA_SESSION_HOURS. */
export async function verify(uid: string, input: string) {
  const code = input.trim();
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref(uid));
    const d = (snap.exists ? snap.data() : {}) as MfaDoc;
    if (!d.enabled || !d.secret) return { error: "not-enabled" as const };

    const now = Date.now();
    const f = d.failures && now - d.failures.start < FAILURE_WINDOW_MS ? d.failures : { count: 0, start: now };
    if (f.count >= MAX_FAILURES) return { error: "locked" as const, retryAfterSec: Math.ceil((f.start + FAILURE_WINDOW_MS - now) / 1000) };

    const counter = verifyTotp(decrypt(d.secret), code, now, d.lastCounter ?? -1);
    let usedRecovery = false;
    let recovery = d.recovery ?? [];
    if (counter === null) {
      const h = hashRecoveryCode(code, pepper());
      if (/^[A-Za-z2-7]{4}-?[A-Za-z2-7]{4}$/.test(code) && recovery.includes(h)) {
        recovery = recovery.filter((x) => x !== h);
        usedRecovery = true;
      } else {
        tx.set(ref(uid), { failures: { count: f.count + 1, start: f.start } }, { merge: true });
        return { error: "wrong-code" as const };
      }
    }
    tx.set(
      ref(uid),
      { lastCounter: counter ?? d.lastCounter ?? -1, recovery, failures: { count: 0, start: 0 }, lastVerifiedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    return { ok: true as const, usedRecovery, recoveryLeft: recovery.length };
  }).then(async (result) => {
    if ("ok" in result) return { ...result, exp: await grantSession(uid) };
    return result;
  });
}

export async function disable(uid: string, code: string) {
  const result = await verify(uid, code);
  if (!("ok" in result)) return result;
  await ref(uid).set({ enabled: false, secret: FieldValue.delete(), recovery: [], disabledAt: FieldValue.serverTimestamp() }, { merge: true });
  await mergeClaims(uid, { mfa: null, mfa_exp: null });
  return { ok: true as const };
}
