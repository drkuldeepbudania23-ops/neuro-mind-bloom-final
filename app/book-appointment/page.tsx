"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

const services = {
  consultation: {
    label: "Video Consultation",
    fee: 500,
  },
  psychotherapy: {
    label: "Psychotherapy",
    fee: 2000,
  },
};

export default function BookAppointmentPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [service, setService] =
    useState<keyof typeof services>("consultation");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !mobile.trim() || !date || !time) {
      alert("Name, mobile, date and time are required.");
      return;
    }

    try {
      setLoading(true);

      const selected = services[service];

      const ref = await addDoc(collection(db, "appointments"), {
        patientName: name.trim(),
        mobile: mobile.trim(),
        age: age.trim(),
        sex,
        service: selected.label,
        serviceCode: service,
        fee: selected.fee,
        appointmentDate: date,
        appointmentTime: time,
        problem: problem.trim(),
        status: "New",
        source: "Website",
        createdAt: serverTimestamp(),
        whatsappNotified: false,
      });

      setSuccess(
        `Appointment booked successfully. Booking ID: ${ref.id.slice(0, 8)}`
      );

      setName("");
      setMobile("");
      setAge("");
      setSex("");
      setDate("");
      setTime("");
      setProblem("");
    } catch (error: any) {
      console.error(error);
      alert(
        error?.message ||
          "Appointment could not be booked. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <h1 style={{ margin: 0 }}>Book Appointment</h1>
          <p style={s.muted}>
            Neuro Mind Bloom · Online Appointment
          </p>
        </div>

        {success && <div style={s.success}>{success}</div>}

        <form onSubmit={submit} style={s.form}>
          <label style={s.label}>
            Patient Name *
            <input
              style={s.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </label>

          <label style={s.label}>
            Mobile Number *
            <input
              style={s.input}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
            />
          </label>

          <div style={s.grid2}>
            <label style={s.label}>
              Age
              <input
                style={s.input}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label style={s.label}>
              Sex
              <select
                style={s.input}
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <div style={s.services}>
            <button
              type="button"
              onClick={() => setService("consultation")}
              style={{
                ...s.service,
                border:
                  service === "consultation"
                    ? "2px solid #176b87"
                    : "1px solid #dbe3ea",
              }}
            >
              <strong>Video Consultation</strong>
              <span style={s.fee}>₹500</span>
            </button>

            <button
              type="button"
              onClick={() => setService("psychotherapy")}
              style={{
                ...s.service,
                border:
                  service === "psychotherapy"
                    ? "2px solid #176b87"
                    : "1px solid #dbe3ea",
              }}
            >
              <strong>Psychotherapy</strong>
              <span style={s.fee}>₹2000</span>
              <small>30–45 minutes</small>
            </button>
          </div>

          <div style={s.grid2}>
            <label style={s.label}>
              Appointment Date *
              <input
                type="date"
                style={s.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label style={s.label}>
              Preferred Time *
              <input
                type="time"
                style={s.input}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <label style={s.label}>
            Main Problem / Reason for Consultation
            <textarea
              style={s.textarea}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Briefly describe the problem"
            />
          </label>

          <div style={s.summary}>
            <span>{services[service].label}</span>
            <strong>₹{services[service].fee}</strong>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={s.primary}
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 720,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 22,
    background: "#fff",
  },
  header: { textAlign: "center", marginBottom: 20 },
  muted: { color: "#64748b" },
  success: {
    background: "#dcfce7",
    border: "1px solid #86efac",
    borderRadius: 9,
    padding: 12,
    marginBottom: 15,
  },
  form: { display: "grid", gap: 14 },
  label: { display: "grid", gap: 6, fontWeight: 700 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    boxSizing: "border-box",
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 12,
  },
  services: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 12,
  },
  service: {
    display: "grid",
    gap: 6,
    padding: 17,
    borderRadius: 12,
    background: "#fff",
    textAlign: "left",
    cursor: "pointer",
  },
  fee: {
    fontSize: 25,
    fontWeight: 800,
    color: "#176b87",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 9,
    background: "#f1f5f9",
    fontSize: 18,
  },
  primary: {
    padding: 13,
    border: 0,
    borderRadius: 9,
    background: "#176b87",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
