"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [patient, setPatient] = useState("");
  const [service, setService] = useState("consultation");
  const [mode, setMode] = useState("UPI");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("Paid");

  const fee = service === "psychotherapy" ? 2000 : 500;

  function savePayment() {
    if (!patient) {
      alert("Patient name is required.");
      return;
    }

    const payment = {
      id: Date.now().toString(),
      patient,
      service:
        service === "psychotherapy"
          ? "Psychotherapy 30–45 min"
          : "Video Consultation",
      fee,
      mode,
      reference,
      status,
      date: new Date().toLocaleString(),
    };

    const old = JSON.parse(
      localStorage.getItem("nmb_payments") || "[]"
    );

    localStorage.setItem(
      "nmb_payments",
      JSON.stringify([payment, ...old])
    );

    alert("Payment saved.");
  }

  return (
    <main style={s.page}>
      <div className="no-print">
        <h1>Payment & Receipt</h1>
      </div>

      <section style={s.receipt}>
        <div style={s.heading}>
          <h2>NEURO MIND BLOOM</h2>
          <strong>Consultation Receipt</strong>
        </div>

        <label style={s.label}>Patient Name</label>
        <input
          style={s.input}
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        />

        <label style={s.label}>Service</label>
        <select
          style={s.input}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="consultation">
            Video Consultation — ₹500
          </option>
          <option value="psychotherapy">
            Psychotherapy 30–45 min — ₹2000
          </option>
        </select>

        <div style={s.total}>
          <span>Amount</span>
          <strong>₹{fee}</strong>
        </div>

        <label style={s.label}>Payment Mode</label>
        <select
          style={s.input}
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>UPI</option>
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>Card</option>
          <option>Other</option>
        </select>

        <label style={s.label}>Transaction / Reference No.</label>
        <input
          style={s.input}
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />

        <label style={s.label}>Status</label>
        <select
          style={s.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Paid</option>
          <option>Pending</option>
        </select>

        <div style={s.date}>
          Date: {new Date().toLocaleString()}
        </div>

        <div className="no-print" style={s.buttons}>
          <button style={s.button} onClick={savePayment}>
            Save Payment
          </button>

          <button
            style={s.button}
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 720,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial",
  },

  receipt: {
    display: "grid",
    gap: 10,
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 24,
  },

  heading: {
    textAlign: "center",
    borderBottom: "2px solid #176b87",
    paddingBottom: 12,
    marginBottom: 8,
  },

  label: {
    fontWeight: 700,
  },

  input: {
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 26,
    background: "#f1f5f9",
    padding: 15,
    borderRadius: 9,
    margin: "8px 0",
  },

  date: {
    marginTop: 10,
  },

  buttons: {
    display: "flex",
    gap: 10,
    marginTop: 12,
  },

  button: {
    flex: 1,
    padding: 12,
    border: 0,
    borderRadius: 8,
    background: "#176b87",
    color: "#fff",
    fontWeight: 700,
  },
};




