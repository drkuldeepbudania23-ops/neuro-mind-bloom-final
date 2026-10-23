"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, doc, getDocs, limit, query, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

type FollowUp = {
  id: string;
  patient: string;
  mobile: string;
  date: string;
  improvement: string;
  sideEffects: string;
  mse: string;
  medicationPlan: string;
  advice: string;
  nextVisit: string;
  /** yyyy-mm-dd — used for the automatic reminder on WhatsApp/email the day before. */
  nextVisitDate?: string;
};

export default function FollowUpPage() {
  const [patient, setPatient] = useState("");
  const [mobile, setMobile] = useState("");
  const [improvement, setImprovement] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [mse, setMse] = useState("");
  const [medicationPlan, setMedicationPlan] = useState("");
  const [advice, setAdvice] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [nextVisitDate, setNextVisitDate] = useState("");
  const [email, setEmail] = useState("");
  const [records, setRecords] = useState<FollowUp[]>([]);
  const [listState, setListState] = useState("Loading…");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState("");

  // Show ALL follow-ups: cloud (every device + imported old data) merged with
  // anything still only on this device. Newest first.
  async function loadRecords() {
    let local: FollowUp[] = [];
    try {
      local = JSON.parse(localStorage.getItem("nmb_followups") || "[]");
    } catch {}
    try {
      const snap = await getDocs(query(collection(db, "followUps"), limit(5000)));
      const cloud = snap.docs.map((d) => ({ ...(d.data() as FollowUp), id: d.id }));
      const seen = new Set(cloud.map((c) => c.id));
      const merged = [...cloud, ...local.filter((l) => l && l.id && !seen.has(l.id))];
      merged.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
      setRecords(merged);
      setListState("");
    } catch (error) {
      console.error("Follow-ups could not be loaded", error);
      setRecords(local);
      setListState("Cloud list could not be loaded — showing this device only.");
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    const digits = t.replace(/\D/g, "");
    if (!t) return records;
    return records.filter(
      (r) =>
        (r.patient || "").toLowerCase().includes(t) ||
        (digits.length >= 4 && (r.mobile || "").replace(/\D/g, "").includes(digits))
    );
  }, [records, search]);

  function resetForm() {
    setPatient("");
    setMobile("");
    setImprovement("");
    setSideEffects("");
    setMse("");
    setMedicationPlan("");
    setAdvice("");
    setNextVisit("");
    setNextVisitDate("");
    setEmail("");
  }

  async function save() {
    if (!patient) {
      alert("Patient name is required.");
      return;
    }

    const item: FollowUp = {
      id: Date.now().toString(),
      patient,
      mobile,
      date: new Date().toLocaleDateString(),
      improvement,
      sideEffects,
      mse,
      medicationPlan,
      advice,
      nextVisit,
      nextVisitDate: nextVisitDate || undefined,
    };

    setRecords([item, ...records]);
    // Device copy keeps only device-saved items (cloud items are not duplicated here).
    try {
      const local = JSON.parse(localStorage.getItem("nmb_followups") || "[]");
      localStorage.setItem("nmb_followups", JSON.stringify([item, ...local]));
    } catch {}

    // Also save to the cloud so follow-ups are not limited to this device and
    // reminders can be sent automatically.
    try {
      await setDoc(doc(db, "followUps", item.id), {
        ...item,
        email: email.trim() || undefined,
        reminderSent: false,
        createdAt: new Date().toISOString(),
      });
      alert("Follow-up saved (device + cloud).");
      resetForm();
    } catch (error) {
      console.error("Cloud follow-up save failed", error);
      alert("Follow-up saved on this device. Cloud save failed — check login / Firestore rules.");
    }
  }

  return (
    <main style={s.page}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1>Patient Follow-up</h1>

      <section style={s.card}>
        <div style={s.grid2}>
          <input
            style={s.input}
            placeholder="Patient name"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />

          <input
            style={s.input}
            placeholder="Mobile / Patient ID"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <label style={s.label}>Clinical Improvement</label>
        <textarea
          style={s.textarea}
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />

        <label style={s.label}>Side Effects / New Complaints</label>
        <textarea
          style={s.textarea}
          value={sideEffects}
          onChange={(e) => setSideEffects(e.target.value)}
        />

        <label style={s.label}>MSE / Clinical Notes</label>
        <textarea
          style={s.textarea}
          value={mse}
          onChange={(e) => setMse(e.target.value)}
        />

        <label style={s.label}>Medication / Treatment Plan</label>
        <textarea
          style={s.textarea}
          value={medicationPlan}
          onChange={(e) => setMedicationPlan(e.target.value)}
        />

        <label style={s.label}>Advice</label>
        <textarea
          style={s.textarea}
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        />

        <label style={s.label}>Next Visit</label>
        <input
          style={s.input}
          value={nextVisit}
          onChange={(e) => setNextVisit(e.target.value)}
          placeholder="e.g. 2 weeks"
        />

        <label style={s.label}>Reminder date (patient gets WhatsApp/email reminder 1 day before)</label>
        <input
          style={s.input}
          type="date"
          value={nextVisitDate}
          onChange={(e) => setNextVisitDate(e.target.value)}
        />

        <label style={s.label}>Patient email (optional, for reminder)</label>
        <input
          style={s.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="patient@example.com"
        />

        <button style={s.button} onClick={save}>
          Save Follow-up
        </button>
      </section>

      <section style={{ ...s.card, marginTop: 20 }}>
        <h2 style={{ margin: 0 }}>Previous follow-ups ({records.length})</h2>
        <input
          style={s.input}
          placeholder="Search by patient name or mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {listState && <p style={{ color: "#b45309", margin: 0 }}>{listState}</p>}
        {!listState && filtered.length === 0 && <p style={{ margin: 0 }}>No follow-ups found.</p>}
        {filtered.slice(0, 200).map((r) => (
          <div key={r.id} style={s.item}>
            <button type="button" style={s.itemHead} onClick={() => setOpenId(openId === r.id ? "" : r.id)}>
              <strong>{r.patient || "—"}</strong>
              <span style={s.muted}>{[r.mobile, r.date, r.nextVisit && `Next: ${r.nextVisit}`].filter(Boolean).join(" · ")}</span>
            </button>
            {openId === r.id && (
              <div style={s.details}>
                {([
                  ["Clinical Improvement", r.improvement],
                  ["Side Effects / New Complaints", r.sideEffects],
                  ["MSE / Clinical Notes", r.mse],
                  ["Medication / Treatment Plan", r.medicationPlan],
                  ["Advice", r.advice],
                  ["Next Visit", [r.nextVisit, r.nextVisitDate].filter(Boolean).join(" — ")],
                ] as const)
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <p key={k} style={{ margin: "4px 0" }}><b>{k}:</b> {v}</p>
                  ))}
              </div>
            )}
          </div>
        ))}
        {filtered.length > 200 && <p style={s.muted}>Showing 200 of {filtered.length}. Search to narrow down.</p>}
      </section>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial",
  },

  card: {
    display: "grid",
    gap: 10,
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 20,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 10,
  },

  label: {
    fontWeight: 700,
    marginTop: 5,
  },

  input: {
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },

  textarea: {
    minHeight: 85,
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },

  item: { border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff" },

  itemHead: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    padding: "10px 12px",
    border: 0,
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    fontSize: 15,
  },

  details: { padding: "0 12px 10px", whiteSpace: "pre-wrap" },

  muted: { color: "#64748b", fontSize: 13 },

  button: {
    padding: 12,
    border: 0,
    borderRadius: 8,
    background: "#176b87",
    color: "#fff",
    fontWeight: 700,
  },
};




