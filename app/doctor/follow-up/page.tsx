"use client";

import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
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

  useEffect(() => {
    setRecords(
      JSON.parse(localStorage.getItem("nmb_followups") || "[]")
    );
  }, []);

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

    const updated = [item, ...records];

    setRecords(updated);
    localStorage.setItem("nmb_followups", JSON.stringify(updated));

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
    } catch (error) {
      console.error("Cloud follow-up save failed", error);
      alert("Follow-up saved on this device. Cloud save failed — check login / Firestore rules.");
    }
  }

  return (
    <main style={s.page}>
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

  button: {
    padding: 12,
    border: 0,
    borderRadius: 8,
    background: "#176b87",
    color: "#fff",
    fontWeight: 700,
  },
};




