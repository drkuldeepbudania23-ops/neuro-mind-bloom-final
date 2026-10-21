"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { backfillUhids } from "../../../lib/client/patients";
import { normaliseMobile, toMillis, type Patient } from "../../../lib/patients";

/** Doctor → Patients: search by UHID, name or mobile; open a patient's full visit history. */
export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [backfill, setBackfill] = useState("");

  async function load() {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "patients"), limit(5000)));
      const rows = snap.docs.map((d: { id: string; data(): unknown }) => ({ ...(d.data() as Patient), uhid: d.id }));
      rows.sort((a: Patient, b: Patient) => toMillis(b.lastVisit || b.createdAt) - toMillis(a.lastVisit || a.createdAt));
      setPatients(rows);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Patients could not be loaded. (Firestore rules for 'patients' deployed?)");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return patients;
    const m10 = normaliseMobile(term);
    const digits = term.replace(/\D/g, "");
    return patients.filter(
      (p) =>
        p.uhid.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term) ||
        (m10 && p.mobile10 === m10) ||
        (digits.length >= 4 && p.mobile10.includes(digits))
    );
  }, [patients, q]);

  async function runBackfill() {
    if (!confirm("Create UHIDs for patients in old prescriptions and appointments? (Safe to run again — existing patients are reused.)")) return;
    setBackfill("Starting…");
    try {
      const result = await backfillUhids((done, total) => setBackfill(`Linking old records… ${done}/${total}`));
      setBackfill(`Done: ${result.people} patients linked.`);
      load();
    } catch (e) {
      console.error(e);
      setBackfill("Could not finish. Please try again.");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f4f7fb", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <h1 style={{ margin: 0 }}>Patients</h1>
              <p style={{ color: "#555", margin: "6px 0 0" }}>Every patient has one UHID; all visits, prescriptions, payments and follow-ups in one place.</p>
            </div>
            <Link href="/doctor" style={btnLight}>← Dashboard</Link>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search UHID (NMB-000123), name or mobile"
            style={{ marginTop: 16, width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #cbd5e1", fontSize: 16, boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12, fontSize: 14 }}>
            <button type="button" onClick={runBackfill} style={btnLight}>Create UHIDs for old records</button>
            {backfill && <span style={{ color: "#0f5c4d" }}>{backfill}</span>}
          </div>
        </div>

        {loading && <div style={card}>Loading…</div>}
        {error && <div style={{ ...card, color: "#b91c1c" }}>{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div style={card}>{patients.length ? "No patient matches." : "No patients yet. UHIDs are created when a prescription is saved."}</div>
        )}

        <div style={{ display: "grid", gap: 10 }}>
          {filtered.slice(0, 200).map((p) => (
            <Link key={p.uhid} href={`/doctor/patients/${p.uhid}`} style={{ ...card, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", textDecoration: "none", color: "#123", marginBottom: 0 }}>
              <div>
                <b style={{ fontSize: 17 }}>{p.name}</b>{" "}
                <span style={{ color: "#55606b" }}>{[p.age, p.sex].filter(Boolean).join(" / ")}</span>
                <div style={{ color: "#55606b", fontSize: 14 }}>{p.mobile || p.mobile10}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={chip}>{p.uhid}</span>
                <div style={{ color: "#55606b", fontSize: 13, marginTop: 6 }}>{p.visitCount ? `${p.visitCount} visits` : ""}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const card = { background: "white", borderRadius: 14, padding: 18, marginBottom: 14, boxShadow: "0 3px 14px rgba(0,0,0,.06)" } as const;
const chip = { background: "#e6f2ef", color: "#0f5c4d", fontWeight: 800, padding: "5px 11px", borderRadius: 999, fontSize: 14 } as const;
const btnLight = { border: "1px solid #cbd5e1", background: "white", borderRadius: 10, padding: "9px 14px", cursor: "pointer", textDecoration: "none", color: "#123", fontWeight: 700 } as const;
