"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

type Appointment = {
  id: string;
  patientName?: string;
  mobile?: string;
  age?: string;
  sex?: string;
  service?: string;
  fee?: number;
  appointmentDate?: string;
  appointmentTime?: string;
  problem?: string;
  status?: string;
  source?: string;
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setAppointments(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Appointment, "id">),
          }))
        );
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function changeStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status,
      });
    } catch (err: any) {
      alert(err?.message || "Status update failed.");
    }
  }

  function doctorWhatsApp(a: Appointment) {
    const text = [
      "New Appointment - Neuro Mind Bloom",
      "",
      `Patient: ${a.patientName || ""}`,
      `Mobile: ${a.mobile || ""}`,
      `Service: ${a.service || ""}`,
      `Fee: ₹${a.fee || ""}`,
      `Date: ${a.appointmentDate || ""}`,
      `Time: ${a.appointmentTime || ""}`,
      `Problem: ${a.problem || ""}`,
      `Status: ${a.status || "New"}`,
    ].join("\n");

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <main style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={{ margin: 0 }}>Appointments</h1>
          <p style={s.muted}>
            Website bookings appear here automatically.
          </p>
        </div>

        <div style={s.badge}>
          {appointments.length} appointment(s)
        </div>
      </div>

      {loading && <div style={s.card}>Loading appointments...</div>}

      {error && (
        <div style={s.error}>
          Firestore error: {error}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div style={s.card}>
          No website appointments yet.
        </div>
      )}

      <div style={s.list}>
        {appointments.map((a) => (
          <article key={a.id} style={s.card}>
            <div style={s.top}>
              <div>
                <h2 style={{ margin: 0 }}>
                  {a.patientName || "Patient"}
                </h2>
                <div style={s.muted}>
                  {a.mobile || "No mobile"}
                </div>
              </div>

              <span style={s.status}>
                {a.status || "New"}
              </span>
            </div>

            <div style={s.details}>
              <div>
                <strong>Service</strong>
                <br />
                {a.service || "-"}
              </div>

              <div>
                <strong>Fee</strong>
                <br />
                ₹{a.fee || 0}
              </div>

              <div>
                <strong>Date</strong>
                <br />
                {a.appointmentDate || "-"}
              </div>

              <div>
                <strong>Time</strong>
                <br />
                {a.appointmentTime || "-"}
              </div>
            </div>

            {a.problem && (
              <div style={s.problem}>
                <strong>Problem:</strong> {a.problem}
              </div>
            )}

            <div style={s.actions}>
              <button
                style={s.confirm}
                onClick={() =>
                  changeStatus(a.id, "Confirmed")
                }
              >
                Confirm
              </button>

              <button
                style={s.complete}
                onClick={() =>
                  changeStatus(a.id, "Completed")
                }
              >
                Complete
              </button>

              <button
                style={s.cancel}
                onClick={() =>
                  changeStatus(a.id, "Cancelled")
                }
              >
                Cancel
              </button>

              <button
                style={s.whatsapp}
                onClick={() => doctorWhatsApp(a)}
              >
                WhatsApp
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  muted: { color: "#64748b" },
  badge: {
    padding: "8px 12px",
    borderRadius: 20,
    background: "#e0f2fe",
    fontWeight: 700,
  },
  list: { display: "grid", gap: 14 },
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 18,
    background: "#fff",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  status: {
    padding: "6px 10px",
    borderRadius: 15,
    background: "#f1f5f9",
    height: "fit-content",
    fontWeight: 700,
  },
  details: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
    gap: 12,
    marginTop: 16,
    paddingTop: 14,
    borderTop: "1px solid #eee",
  },
  problem: {
    marginTop: 14,
    background: "#f8fafc",
    padding: 10,
    borderRadius: 8,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  confirm: {
    border: 0,
    borderRadius: 8,
    padding: "9px 12px",
    cursor: "pointer",
  },
  complete: {
    border: 0,
    borderRadius: 8,
    padding: "9px 12px",
    cursor: "pointer",
  },
  cancel: {
    border: 0,
    borderRadius: 8,
    padding: "9px 12px",
    cursor: "pointer",
  },
  whatsapp: {
    border: 0,
    borderRadius: 8,
    padding: "9px 12px",
    cursor: "pointer",
  },
  error: {
    padding: 14,
    borderRadius: 9,
    background: "#fee2e2",
    marginBottom: 15,
  },
};
