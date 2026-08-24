"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

type Appointment = {
  id: string;
  name?: string;
  mobile?: string;
  email?: string;
  age?: string | number;
  gender?: string;
  date?: string;
  time?: string;
  mode?: string;
  status?: string;
  concern?: string;
  paymentStatus?: string;
  createdAt?: any;
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    const ref = collection(db, "appointments");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const rows: Appointment[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Appointment, "id">),
        }));

        rows.sort((a, b) => {
          const aTime =
            a.createdAt?.toMillis?.() ??
            (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);

          const bTime =
            b.createdAt?.toMillis?.() ??
            (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);

          return bTime - aTime;
        });

        setAppointments(rows);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error(err);
        setError("Appointments load nahi ho pa rahe.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const total = appointments.length;

  const pending = useMemo(
    () =>
      appointments.filter(
        (item) => (item.status || "pending").toLowerCase() === "pending"
      ).length,
    [appointments]
  );

  async function changeStatus(id: string, status: string) {
    try {
      setUpdating(id);
      await updateDoc(doc(db, "appointments", id), { status });
    } catch (err) {
      console.error(err);
      alert("Status update nahi ho paya.");
    } finally {
      setUpdating("");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={headerCard}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Patient Appointments</h1>
          <p style={{ color: "#555" }}>Neuro Mind Bloom Doctor Dashboard</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={statStyle}>
              <b>Total Appointments</b>
              <div style={numberStyle}>{total}</div>
            </div>

            <div style={statStyle}>
              <b>Pending</b>
              <div style={numberStyle}>{pending}</div>
            </div>
          </div>
        </div>

        {loading && <div style={messageStyle}>Appointments loading...</div>}
        {error && <div style={{ ...messageStyle, color: "red" }}>{error}</div>}

        <div style={{ display: "grid", gap: 16 }}>
          {appointments.map((appointment) => {
            const status = appointment.status || "pending";

            return (
              <div key={appointment.id} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ marginTop: 0 }}>
                      {appointment.name || "Patient"}
                    </h2>

                    <div><b>Mobile:</b> {appointment.mobile || "-"}</div>
                    <div><b>Email:</b> {appointment.email || "-"}</div>
                    <div>
                      <b>Age/Gender:</b> {appointment.age || "-"} /{" "}
                      {appointment.gender || "-"}
                    </div>

                    {appointment.concern && (
                      <div style={{ marginTop: 10 }}>
                        <b>Concern:</b> {appointment.concern}
                      </div>
                    )}
                  </div>

                  <div>
                    <div><b>Date:</b> {appointment.date || "-"}</div>
                    <div><b>Time:</b> {appointment.time || "-"}</div>
                    <div><b>Mode:</b> {appointment.mode || "-"}</div>

                    <div style={{ marginTop: 8 }}>
                      <b>Status:</b>{" "}
                      <span style={{ fontWeight: 800, textTransform: "capitalize" }}>
                        {status}
                      </span>
                    </div>

                    <div>
                      <b>Payment:</b>{" "}
                      {appointment.paymentStatus || "Pending"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 16,
                    borderTop: "1px solid #eee",
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {status.toLowerCase() !== "confirmed" && (
                    <button
                      onClick={() => changeStatus(appointment.id, "confirmed")}
                      disabled={updating === appointment.id}
                      style={buttonStyle}
                    >
                      {updating === appointment.id
                        ? "Updating..."
                        : "Confirm Appointment"}
                    </button>
                  )}

                  <Link
                    href={`/doctor/prescription?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    E-Prescription
                  </Link>

                  <Link
                    href={`/doctor/follow-up?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    Follow-up
                  </Link>

                  <Link
                    href={`/doctor/payment?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    Payment
                  </Link>

                  {appointment.mobile && (
                    <a
                      href={`https://wa.me/91${appointment.mobile
                        .replace(/\D/g, "")
                        .slice(-10)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={whatsappButton}
                    >
                      WhatsApp Patient
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

const headerCard = {
  background: "white",
  padding: 24,
  borderRadius: 16,
  marginBottom: 20,
  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
};

const statStyle = {
  background: "#f1f3f5",
  padding: "14px 18px",
  borderRadius: 12,
  minWidth: 170,
};

const numberStyle = {
  fontSize: 26,
  fontWeight: 800,
  marginTop: 5,
};

const messageStyle = {
  background: "white",
  padding: 20,
  borderRadius: 14,
  marginBottom: 16,
};

const cardStyle = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
};

const buttonStyle = {
  border: 0,
  borderRadius: 8,
  padding: "10px 15px",
  cursor: "pointer",
  fontWeight: 700,
  background: "#111827",
  color: "white",
};

const linkButton = {
  textDecoration: "none",
  borderRadius: 8,
  padding: "10px 15px",
  fontWeight: 700,
  background: "#e9eef5",
  color: "#111",
};

const whatsappButton = {
  textDecoration: "none",
  borderRadius: 8,
  padding: "10px 15px",
  fontWeight: 700,
  background: "#128C7E",
  color: "white",
};
