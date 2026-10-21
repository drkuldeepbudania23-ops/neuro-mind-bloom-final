"use client";

import { useState, type FormEvent } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { MFA_ERRORS, mfaCall } from "../../lib/client/mfa";

/** Shown by the doctor layout when 2FA is on and the 2FA session has expired. */
export default function MfaPrompt({ onDone }: { onDone: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [useRecovery, setUseRecovery] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await mfaCall("verify", code.trim());
    setBusy(false);
    if (result.ok) {
      if (typeof result.recoveryLeft === "number" && result.recoveryLeft <= 3) {
        alert(`Only ${result.recoveryLeft} recovery codes left. Create new ones in Security (2FA).`);
      }
      onDone();
    } else {
      setError(MFA_ERRORS[result.error] || "Could not verify. Please try again.");
      setCode("");
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f7fb", fontFamily: "Arial, sans-serif", padding: 16 }}>
      <form onSubmit={submit} style={{ background: "white", padding: 28, borderRadius: 16, maxWidth: 380, width: "100%", boxShadow: "0 8px 30px rgba(0,0,0,.08)" }}>
        <h1 style={{ marginTop: 0, fontSize: 22 }}>Two-step verification</h1>
        <p style={{ color: "#55606b" }}>
          {useRecovery ? "Enter one of your recovery codes (e.g. 7KQ2-M9XD)." : "Open your authenticator app and enter the 6-digit code for Neuro Mind Bloom."}
        </p>
        <input
          autoFocus
          value={code}
          onChange={(e) => setCode(useRecovery ? e.target.value.toUpperCase() : e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode={useRecovery ? "text" : "numeric"}
          autoComplete="one-time-code"
          placeholder={useRecovery ? "XXXX-XXXX" : "123456"}
          style={{ width: "100%", boxSizing: "border-box", fontSize: 26, letterSpacing: 6, textAlign: "center", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1" }}
        />
        {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
        <button
          type="submit"
          disabled={busy || (useRecovery ? code.length < 8 : code.length !== 6)}
          style={{ marginTop: 14, width: "100%", padding: 12, borderRadius: 10, border: 0, background: "#0f5c4d", color: "white", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
        >
          {busy ? "Checking…" : "Verify"}
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 14 }}>
          <button type="button" onClick={() => { setUseRecovery(!useRecovery); setCode(""); setError(""); }} style={link}>
            {useRecovery ? "Use authenticator code" : "Lost phone? Use recovery code"}
          </button>
          <button type="button" onClick={() => signOut(auth).then(() => (window.location.href = "/login"))} style={link}>
            Sign out
          </button>
        </div>
      </form>
    </main>
  );
}

const link = { background: "none", border: 0, color: "#0f5c4d", cursor: "pointer", padding: 0, textDecoration: "underline" } as const;
