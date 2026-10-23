"use client";

import { auth } from "../firebase";

/** Call the 2FA API with the current doctor's ID token. */
export async function mfaCall(action: "status" | "setup" | "enable" | "verify" | "disable", code?: string) {
  const user = auth.currentUser;
  if (!user) return { ok: false, error: "login" } as Record<string, any>;
  const response = await fetch("/api/mfa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: await user.getIdToken(), action, code }),
  });
  const result = (await response.json().catch(() => ({}))) as Record<string, any>;
  // Claims changed on the server → refresh the token so Firestore sees the new 2FA session.
  if (result.ok && ["enable", "verify", "disable"].includes(action)) await user.getIdToken(true);
  return result;
}

export const MFA_ERRORS: Record<string, string> = {
  "wrong-code": "That code is not correct. Check the time on your phone and try the newest code.",
  locked: "Too many wrong codes. Please wait 15 minutes and try again.",
  "no-setup": "Start the setup again.",
  "mfa-required": "Verify your current 2FA code first.",
  "not-configured": "2FA is not configured on the server yet.",
  "too-many-requests": "Too many attempts. Please wait a few minutes.",
};
