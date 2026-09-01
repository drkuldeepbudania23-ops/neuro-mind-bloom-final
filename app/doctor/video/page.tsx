"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

type Appointment = {
  id: string;
  name?: string;
  patientName?: string;
  mobile?: string;
  email?: string;
  age?: string | number;
  gender?: string;
  date?: string;
  preferredDate?: string;
  time?: string;
  preferredTime?: string;
  service?: string;
  status?: string;
  concern?: string;
  createdAt?: any;
};

export default function VideoConsultationsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setAppointments(
          rows.filter(
            (item) =>
              (item.status || "").toLowerCase() === "confirmed"
          )
        );

        setLoading(false);
        setError("");
      },
      (err) => {
        console.error(err);
        setError("Video appointments load nahi ho pa rahe.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            boxShadow: "0 4px 18px rgba(0,0,0,.08)",
          }}
        >
          <h1 style={{ marginTop: 0 }}>Video Consultations</h1>

          <p style={{ color: "#555", marginBottom: 0 }}>
            Confirmed appointments ready for online consultation.
          </p>
        </div>

        {loading && (
          <div style={messageStyle}>Appointments loading...</div>
        )}

        {error && (
          <div style={{ ...messageStyle, color: "#b91c1c" }}>
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div style={messageStyle}>
            Abhi koi confirmed video appointment nahi hai.
          </div>
        )}

        <div style={{ display: "grid", gap: 16 }}>
          {appointments.map((appointment) => {
            const patientName =
              appointment.name ||
              appointment.patientName ||
              "Patient";

            const date =
              appointment.date ||
              appointment.preferredDate ||
              "-";

            const time =
              appointment.time ||
              appointment.preferredTime ||
              "-";

            const cleanMobile = (appointment.mobile || "")
              .replace(/\D/g, "")
              .slice(-10);

            const videoLink =
              `https://neuromindbloom.com/video/${appointment.id}`;

            const whatsappText = encodeURIComponent(
              `Namaste ${patientName}, your Neuro Mind Bloom video consultation is confirmed for ${date} at ${time}.\n\nJoin Video Consultation:\n${videoLink}\n\nPlease open the link at your appointment time and allow camera and microphone access.`
            );

            return (
              <section key={appointment.id} style={cardStyle}>
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
                      {patientName}
                    </h2>

                    <div>
                      <b>Mobile:</b>{" "}
                      {appointment.mobile || "-"}
                    </div>

                    <div>
                      <b>Date:</b> {date}
                    </div>

                    <div>
                      <b>Time:</b> {time}
                    </div>

                    <div>
                      <b>Service:</b>{" "}
                      {appointment.service || "Video Consultation"}
                    </div>

                    {appointment.concern && (
                      <div style={{ marginTop: 8 }}>
                        <b>Concern:</b> {appointment.concern}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                    }}
                  >
                    <Link
                      href={`/doctor/video/${appointment.id}`}
                      style={startButton}
                    >
                      🎥 Start Video
                    </Link>

                    {cleanMobile && (
                      <a
                        href={`https://wa.me/91${cleanMobile}?text=${whatsappText}`}
                        target="_blank"
                        rel="noreferrer"
                        style={whatsappButton}
                      >
                        Send Join Link
                      </a>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

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
  boxShadow: "0 3px 14px rgba(0,0,0,.07)",
};

const startButton = {
  textDecoration: "none",
  borderRadius: 9,
  padding: "12px 18px",
  fontWeight: 800,
  background: "#176b87",
  color: "white",
};

const whatsappButton = {
  textDecoration: "none",
  borderRadius: 9,
  padding: "12px 18px",
  fontWeight: 800,
  background: "#128C7E",
  color: "white",
};
