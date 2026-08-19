"use client";

import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  patient: string;
  mobile: string;
  service: string;
  fee: number;
  date: string;
  time: string;
  status: string;
};

const services = {
  consultation: {
    label: "Video Consultation",
    fee: 500,
    description: "Psychiatry consultation",
  },
  psychotherapy: {
    label: "Psychotherapy",
    fee: 2000,
    description: "30–45 minute psychotherapy / counselling session",
  },
};

export default function AppointmentsPage() {
  const [patient, setPatient] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] =
    useState<keyof typeof services>("consultation");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(
      JSON.parse(localStorage.getItem("nmb_appointments") || "[]")
    );
  }, []);

  function save() {
    if (!patient || !date || !time) {
      alert("Patient name, date and time are required.");
      return;
    }

    const item: Appointment = {
      id: Date.now().toString(),
      patient,
      mobile,
      service: services[service].label,
      fee: services[service].fee,
      date,
      time,
      status: "Booked",
    };

    const updated = [item, ...appointments];

    setAppointments(updated);
    localStorage.setItem(
      "nmb_appointments",
      JSON.stringify(updated)
    );

    setPatient("");
    setMobile("");
    setDate("");
    setTime("");
  }

  return (
    <main style={s.page}>
      <h1>Appointments</h1>

      <section style={s.cards}>
        {Object.entries(services).map(([key, value]) => (
          <button
            key={key}
            onClick={() =>
              setService(key as keyof typeof services)
            }
            style={{
              ...s.serviceCard,
              border:
                service === key
                  ? "2px solid #176b87"
                  : "1px solid #dbe3ea",
            }}
          >
            <strong>{value.label}</strong>
            <span style={s.fee}>₹{value.fee}</span>
            <small>{value.description}</small>
          </button>
        ))}
      </section>

      <section style={s.card}>
        <h2>New Appointment</h2>

        <div style={s.grid}>
          <input
            style={s.input}
            placeholder="Patient name"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />

          <input
            style={s.input}
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            style={s.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            style={s.input}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div style={s.summary}>
          <strong>{services[service].label}</strong>
          <strong>₹{services[service].fee}</strong>
        </div>

        <button style={s.primary} onClick={save}>
          Save Appointment
        </button>
      </section>

      <section style={s.card}>
        <h2>Saved Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments saved yet.</p>
        ) : (
          appointments.map((a) => (
            <div key={a.id} style={s.row}>
              <div>
                <strong>{a.patient}</strong>
                <br />
                <small>{a.mobile}</small>
              </div>

              <div>
                {a.date}
                <br />
                {a.time}
              </div>

              <div>
                {a.service}
                <br />
                ₹{a.fee}
              </div>

              <strong>{a.status}</strong>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 14,
    marginBottom: 18,
  },

  serviceCard: {
    padding: 20,
    borderRadius: 14,
    background: "#fff",
    textAlign: "left",
    display: "grid",
    gap: 8,
    cursor: "pointer",
  },

  fee: {
    fontSize: 28,
    fontWeight: 800,
    color: "#176b87",
  },

  card: {
    padding: 20,
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    marginBottom: 18,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 10,
  },

  input: {
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  },

  summary: {
    display: "flex",
    justifyContent: "space-between",
    padding: 14,
    background: "#f1f5f9",
    borderRadius: 8,
    margin: "14px 0",
  },

  primary: {
    padding: 12,
    border: 0,
    borderRadius: 8,
    background: "#176b87",
    color: "white",
    fontWeight: 700,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 2fr 1fr",
    gap: 12,
    borderTop: "1px solid #eee",
    padding: "12px 0",
  },
};
