"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
  createdAt?: any;
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = collection(db, "appointments");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const rows: Appointment[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Appointment, "id">),
        }));

        rows.sort((a, b) => {
          const aTime =
            a.createdAt?.seconds ??
            a.createdAt?.toMillis?.() ??
            new Date(`${a.date || ""} ${a.time || ""}`).getTime() ??
            0;

          const bTime =
            b.createdAt?.seconds ??
            b.createdAt?.toMillis?.() ??
            new Date(`${b.date || ""} ${b.time || ""}`).getTime() ??
            0;

          return Number(bTime || 0) - Number(aTime || 0);
        });

        setAppointments(rows);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error(err);
        setError("Appointments load nahi ho pa rahe. Firestore permissions check karein.");
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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            padding: 24,
            borderRadius: 16,
            marginBottom: 20,
            boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 28 }}>Patient Appointments</h1>
          <p style={{ marginBottom: 0, color: "#555" }}>
            Neuro Mind Bloom Doctor Dashboard
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
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

        {loading && (
          <div style={messageStyle}>Appointments loading...</div>
        )}

        {error && (
          <div
            style={{
              ...messageStyle,
              color: "#b00020",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div style={messageStyle}>Abhi koi appointment nahi hai.</div>
        )}

        <div style={{ display: "grid", gap: 16 }}>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                background: "white",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2 style={{ marginTop: 0, marginBottom: 8 }}>
                    {appointment.name || "Patient"}
                  </h2>

                  <div>
                    <b>Mobile:</b> {appointment.mobile || "-"}
                  </div>

                  <div>
                    <b>Email:</b> {appointment.email || "-"}
                  </div>

                  <div>
                    <b>Age/Gender:</b>{" "}
                    {appointment.age || "-"} / {appointment.gender || "-"}
                  </div>
                </div>

                <div>
                  <div>
                    <b>Date:</b> {appointment.date || "-"}
                  </div>

                  <div>
                    <b>Time:</b> {appointment.time || "-"}
                  </div>

                  <div>
                    <b>Mode:</b> {appointment.mode || "-"}
                  </div>

                  <div>
                    <b>Status:</b>{" "}
                    <span
                      style={{
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {appointment.status || "pending"}
                    </span>
                  </div>
                </div>
              </div>

              {appointment.concern && (
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: "1px solid #eee",
                  }}
                >
                  <b>Concern:</b> {appointment.concern}
                </div>
              )}

              {appointment.mobile && (
                <div style={{ marginTop: 16 }}>
                  <a
                    href={`https://wa.me/91${appointment.mobile
                      .replace(/\D/g, "")
                      .slice(-10)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "10px 16px",
                      borderRadius: 8,
                      background: "#111",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    WhatsApp Patient
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

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
