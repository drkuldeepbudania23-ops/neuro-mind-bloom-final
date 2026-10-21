"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { MFA_ERRORS, mfaCall } from "../../../lib/client/mfa";

type LogEntry = { id: string; action: string; at?: { toDate?: () => Date }; source?: string; details?: Record<string, unknown> };

type Step = "loading" | "off" | "scan" | "codes" | "on";

/** Doctor → Security: turn on two-step verification with an authenticator app. */
export default function SecurityPage() {
  const [step, setStep] = useState<Step>("loading");
  const [qrSvg, setQrSvg] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [recoveryLeft, setRecoveryLeft] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  async function refresh() {
    const r = await mfaCall("status");
    if (!r.ok) return setError(MFA_ERRORS[r.error] || "Could not load 2FA status.");
    setRecoveryLeft(r.recoveryLeft || 0);
    setStep(r.enabled ? "on" : "off");
  }

  useEffect(() => {
    refresh();
    getDocs(query(collection(db, "auditLog"), orderBy("at", "desc"), limit(40)))
      .then((snap: { docs: { id: string; data(): unknown }[] }) => setLog(snap.docs.map((d) => ({ ...(d.data() as LogEntry), id: d.id }))))
      .catch(() => setLog([]));
  }, []);

  async function begin() {
    setBusy(true);
    setError("");
    const r = await mfaCall("setup");
    setBusy(false);
    if (!r.ok) return setError(MFA_ERRORS[r.error] || "Could not start setup.");
    setQrSvg(r.qrSvg);
    setSecret(r.secret);
    setCode("");
    setStep("scan");
  }

  async function confirmEnable() {
    setBusy(true);
    setError("");
    const r = await mfaCall("enable", code);
    setBusy(false);
    if (!r.ok) return setError(MFA_ERRORS[r.error] || "Could not turn on 2FA.");
    setCodes(r.recoveryCodes || []);
    setSecret("");
    setQrSvg("");
    setStep("codes");
  }

  async function turnOff() {
    if (!window.confirm("Turn OFF two-step verification? Your account will be protected by password only.")) return;
    setBusy(true);
    setError("");
    const r = await mfaCall("disable", code);
    setBusy(false);
    if (!r.ok) return setError(MFA_ERRORS[r.error] || "Could not turn off 2FA.");
    setCode("");
    refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f4f7fb", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link href="/doctor" style={{ color: "#0f5c4d", fontWeight: 700 }}>← Dashboard</Link>
        <div style={card}>
          <h1 style={{ marginTop: 0 }}>Security · Two-step verification (2FA)</h1>
          <p style={{ color: "#55606b" }}>
            After your password, the dashboard also asks for a 6-digit code from an authenticator app on your phone
            (Google Authenticator, Microsoft Authenticator or Authy). Even if someone learns your password, they cannot
            open patient records without your phone. You are asked again every 12 hours.
          </p>

          {step === "loading" && <p>Loading…</p>}

          {step === "off" && (
            <>
              <p><b>Status:</b> <span style={{ color: "#b45309" }}>Off</span></p>
              <button type="button" onClick={begin} disabled={busy} style={primary}>Turn on 2FA</button>
            </>
          )}

          {step === "scan" && (
            <>
              <p><b>1.</b> Install Google Authenticator (or similar) on your phone.</p>
              <p><b>2.</b> In the app tap <b>+</b> → <b>Scan a QR code</b>, and scan this:</p>
              <div style={{ width: 220, maxWidth: "100%", padding: 8, border: "1px solid #e5e7eb", borderRadius: 12 }} dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <p style={{ fontSize: 13, color: "#55606b" }}>Can&apos;t scan? Enter this key manually: <code style={{ wordBreak: "break-all" }}>{secret}</code></p>
              <p><b>3.</b> Enter the 6-digit code the app shows:</p>
              <CodeInput value={code} onChange={setCode} />
              <button type="button" onClick={confirmEnable} disabled={busy || code.length !== 6} style={{ ...primary, marginTop: 12, marginLeft: 8 }}>Confirm and turn on</button>
            </>
          )}

          {step === "codes" && (
            <>
              <p style={{ color: "#0f5c4d", fontWeight: 700 }}>2FA is ON.</p>
              <p>
                <b>Save these recovery codes now</b> (print or write them down and keep them safe). Each works once if you
                lose your phone. They will not be shown again.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, fontFamily: "monospace", fontSize: 18, background: "#f8fafc", padding: 14, borderRadius: 10 }}>
                {codes.map((c) => <span key={c}>{c}</span>)}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <button type="button" onClick={() => navigator.clipboard.writeText(codes.join("\n"))} style={light}>Copy</button>
                <button type="button" onClick={() => window.print()} style={light}>Print</button>
                <button type="button" onClick={() => { setCodes([]); refresh(); }} style={primary}>I have saved them</button>
              </div>
            </>
          )}

          {step === "on" && (
            <>
              <p><b>Status:</b> <span style={{ color: "#0f5c4d", fontWeight: 700 }}>On</span> · recovery codes left: {recoveryLeft}</p>
              <p style={{ fontSize: 14, color: "#55606b" }}>New phone, or few recovery codes left? Enter a current code and set up again (new QR + new recovery codes).</p>
              <CodeInput value={code} onChange={setCode} />
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <button type="button" onClick={begin} disabled={busy} style={light}>Set up again (new phone)</button>
                <button type="button" onClick={turnOff} disabled={busy || code.length < 6} style={{ ...light, color: "#b91c1c" }}>Turn off 2FA</button>
              </div>
            </>
          )}

          {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Recent activity</h2>
          <p style={{ color: "#55606b", fontSize: 14 }}>
            Every sign-in check, e-sign, prescription share, export and status change is recorded here. Entries cannot be edited or deleted.
          </p>
          {log.length === 0 && <p style={{ color: "#55606b" }}>No activity recorded yet.</p>}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14 }}>
            {log.map((e) => (
              <li key={e.id} style={{ padding: "8px 0", borderTop: "1px solid #eef2f5", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span style={{ color: "#55606b", minWidth: 150 }}>{e.at?.toDate ? e.at.toDate().toLocaleString("en-IN") : "…"}</span>
                <b style={{ color: e.action.includes("failed") || e.action.includes("wrong") ? "#b91c1c" : "#123" }}>{e.action}</b>
                <span style={{ color: "#55606b", overflowWrap: "anywhere" }}>
                  {Object.entries(e.details || {}).filter(([, v]) => v !== null && v !== "").map(([k, v]) => `${k}: ${String(v)}`).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function CodeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
      inputMode="numeric"
      autoComplete="one-time-code"
      placeholder="123456"
      style={{ fontSize: 24, letterSpacing: 6, padding: 10, width: 180, textAlign: "center", borderRadius: 10, border: "1px solid #cbd5e1" }}
    />
  );
}

const card = { background: "white", borderRadius: 16, padding: 24, marginTop: 12, boxShadow: "0 3px 14px rgba(0,0,0,.06)" } as const;
const primary = { padding: "11px 18px", borderRadius: 10, border: 0, background: "#0f5c4d", color: "white", fontWeight: 700, cursor: "pointer" } as const;
const light = { padding: "10px 16px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" } as const;
