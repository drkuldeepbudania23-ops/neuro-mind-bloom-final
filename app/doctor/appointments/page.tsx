"use client";

import { useState } from "react";

const services = [
  {
    id: "video",
    title: "Video Consultation",
    fee: 500,
    detail: "Psychiatry consultation",
  },
  {
    id: "psychotherapy",
    title: "Psychotherapy",
    fee: 2000,
    detail: "30–45 minute psychotherapy / counselling session",
  },
];

export default function AppointmentsPage() {
  const [selected, setSelected] = useState("video");

  const current = services.find((s) => s.id === selected)!;

  return (
    <main style={styles.page}>
      <h1>Appointments</h1>
      <p style={styles.muted}>Select consultation type and create appointment.</p>

      <div style={styles.cards}>
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelected(service.id)}
            style={{
              ...styles.service,
              border:
                selected === service.id
                  ? "2px solid #176b87"
                  : "1px solid #d7dee5",
            }}
          >
            <h2>{service.title}</h2>
            <div style={styles.price}>₹{service.fee}</div>
            <p>{service.detail}</p>
          </button>
        ))}
      </div>

      <section style={styles.form}>
        <h2>New Appointment</h2>

        <input placeholder="Patient name" style={styles.input} />
        <input placeholder="Mobile number" style={styles.input} />
        <input type="date" style={styles.input} />
        <input type="time" style={styles.input} />

        <div style={styles.summary}>
          <strong>{current.title}</strong>
          <span>Fee: ₹{current.fee}</span>
        </div>

        <button style={styles.primary}>Save Appointment</button>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 950,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },
  muted: { color: "#666" },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 16,
    margin: "20px 0",
  },
  service: {
    borderRadius: 16,
    padding: 22,
    background: "#fff",
    textAlign: "left",
    cursor: "pointer",
  },
  price: {
    fontSize: 30,
    fontWeight: 800,
    color: "#176b87",
  },
  form: {
    display: "grid",
    gap: 12,
    padding: 22,
    border: "1px solid #e5e7eb",
    borderRadius: 16,
  },
  input: {
    padding: 12,
    borderRadius: 9,
    border: "1px solid #cbd5e1",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f4f8fa",
    padding: 14,
    borderRadius: 10,
  },
  primary: {
    padding: 13,
    border: 0,
    borderRadius: 9,
    color: "#fff",
    background: "#176b87",
    fontWeight: 700,
  },
};
