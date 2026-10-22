"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  backupFromStorage,
  buildPlan,
  parseBackupFile,
  planCounts,
  type LegacyBackup,
  type LegacyPlan,
} from "../../../lib/legacyImport";
import { importLegacyPlan, type ImportResult } from "../../../lib/client/legacyImport";

type Source = "browser" | "file";

/**
 * Doctor → Old Data → Cloud.
 * The old dashboard kept follow-ups (and some prescriptions) only in this
 * browser. This page backs them up to a file and copies them to Firestore,
 * without ever overwriting a record that is already in the cloud.
 */
export default function DataImportPage() {
  const [source, setSource] = useState<Source>("browser");
  const [backup, setBackup] = useState<LegacyBackup | null>(null);
  const [plan, setPlan] = useState<LegacyPlan | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  function readBrowser() {
    try {
      const b = backupFromStorage((k) => localStorage.getItem(k), window.location.origin);
      setBackup(b);
      setPlan(buildPlan(b.data));
      setSource("browser");
      setFileName("");
      setResult(null);
      setError("");
    } catch {
      setError("This browser's storage could not be read.");
    }
  }

  useEffect(() => {
    readBrowser();
  }, []);

  function downloadBackup() {
    if (!backup) return;
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nmb-browser-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setResult(null);
    try {
      const b = parseBackupFile(await file.text());
      setBackup(b);
      setPlan(buildPlan(b.data));
      setSource("file");
      setFileName(file.name);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "File could not be read.");
    }
  }

  async function upload() {
    if (!plan || busy) return;
    const c = planCounts(plan);
    if (c.total === 0) return;
    const ok = window.confirm(
      `Copy ${c.total} old record(s) to the cloud?\n\nRecords already in the cloud are skipped, nothing is overwritten or deleted.`
    );
    if (!ok) return;
    setBusy(true);
    setProgress("Starting…");
    try {
      const r = await importLegacyPlan(plan, source, (done, total) => setProgress(`Uploading… ${done}/${total}`));
      setResult(r);
      setProgress("");
    } catch (e) {
      console.error(e);
      setError("Upload stopped. Check your internet and try again — already uploaded records will be skipped.");
      setProgress("");
    } finally {
      setBusy(false);
    }
  }

  const c = plan ? planCounts(plan) : null;
  const failed = result ? result.prescriptions.failed + result.followUps.failed + result.payments.failed : 0;

  return (
    <main style={s.page}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Old Data → Cloud</h1>
      <p style={s.muted}>
        The old dashboard saved follow-ups (and prescriptions whose cloud save failed) only in this browser.
        Copy them to the cloud once so they are safe and visible on every device.
        Pehle backup file download karein, phir “Upload to cloud” dabayein.
      </p>

      <section style={s.card}>
        <h2 style={s.h2}>1. Data found {source === "browser" ? "in this browser" : `in file: ${fileName}`}</h2>
        {c ? (
          <table style={s.table}>
            <tbody>
              <tr><td>Follow-ups</td><td style={s.num}>{c.followUps}</td></tr>
              <tr><td>Prescriptions (saved on this device)</td><td style={s.num}>{c.prescriptions}</td></tr>
              <tr><td>Payment notes (archive copy)</td><td style={s.num}>{c.payments}</td></tr>
              {c.invalid > 0 && <tr><td>Unreadable entries (ignored)</td><td style={s.num}>{c.invalid}</td></tr>}
            </tbody>
          </table>
        ) : (
          <p>Reading…</p>
        )}
        {source === "browser" && c && c.total === 0 && (
          <p style={s.warn}>
            Nothing found in this browser. Open this page on the same computer and browser where you used the
            old dashboard, or upload a backup file below.
          </p>
        )}
        <div style={s.row}>
          <button type="button" style={s.btnLight} onClick={downloadBackup} disabled={!c || c.total === 0}>
            Download backup file
          </button>
          {source === "file" && (
            <button type="button" style={s.btnLight} onClick={readBrowser}>Use this browser instead</button>
          )}
        </div>
      </section>

      <section style={s.card}>
        <h2 style={s.h2}>2. Or load a backup file</h2>
        <p style={s.muted}>A file downloaded from the old website (see docs/OLD-DATA-IMPORT.md) or from this page.</p>
        <input type="file" accept="application/json,.json" onChange={(e) => onFile(e.target.files?.[0])} />
      </section>

      <section style={s.card}>
        <h2 style={s.h2}>3. Upload to cloud</h2>
        <p style={s.muted}>
          Records already in the cloud are skipped — nothing is overwritten or deleted. Old follow-ups will not
          send any reminder to patients. Payment notes are kept as an archive only and do not change any payment.
        </p>
        <button type="button" style={s.btn} onClick={upload} disabled={busy || !c || c.total === 0}>
          {busy ? "Uploading…" : `Upload ${c?.total ?? 0} record(s) to cloud`}
        </button>
        {progress && <p>{progress}</p>}
        {result && (
          <table style={s.table}>
            <thead>
              <tr><th style={s.th}></th><th style={s.th}>Added</th><th style={s.th}>Already in cloud</th><th style={s.th}>Failed</th></tr>
            </thead>
            <tbody>
              {(["followUps", "prescriptions", "payments"] as const).map((k) => (
                <tr key={k}>
                  <td>{k === "followUps" ? "Follow-ups" : k === "prescriptions" ? "Prescriptions" : "Payment notes"}</td>
                  <td style={s.num}>{result[k].added}</td>
                  <td style={s.num}>{result[k].alreadyInCloud}</td>
                  <td style={s.num}>{result[k].failed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {result && failed === 0 && <p style={s.ok}>Done. Old data is now in the cloud.</p>}
        {result && failed > 0 && <p style={s.warn}>{failed} record(s) failed. Click upload again — the rest will be skipped.</p>}
        {error && <p style={s.warn}>{error}</p>}
      </section>
    </main>
  );
}

const s: Record<string, CSSProperties> = {
  page: { maxWidth: 820, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif", color: "#123" },
  muted: { color: "#475569", lineHeight: 1.5 },
  card: { border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginTop: 18, background: "white" },
  h2: { fontSize: 18, margin: "0 0 10px" },
  table: { borderCollapse: "collapse", width: "100%", margin: "10px 0" },
  th: { textAlign: "right", padding: "4px 8px", fontSize: 13, color: "#475569" },
  num: { textAlign: "right", padding: "4px 8px", fontWeight: 700 },
  row: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  btn: { padding: "12px 16px", border: 0, borderRadius: 8, background: "#176b87", color: "#fff", fontWeight: 700, cursor: "pointer" },
  btnLight: { padding: "10px 14px", border: "1px solid #176b87", borderRadius: 8, background: "#fff", color: "#176b87", fontWeight: 700, cursor: "pointer" },
  warn: { color: "#b45309", fontWeight: 600 },
  ok: { color: "#0f5c4d", fontWeight: 700 },
};
