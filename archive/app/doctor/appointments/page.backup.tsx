"use client";

import { auth, db } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

type Appointment = {
  id: string;
  patientName?: string;
  mobile?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  concern?: string;
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
        const rows = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })) as Appointment[];

        setAppointments(rows);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(
          "Appointments load nahi hui. Firestore connection/rules check karein."
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status,
      });
    } catch (err) {
      console.error(err);
      alert("Status update nahi hua.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7f8",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: 6,
            color: "#12343b",
          }}
        >
          Patient Appointments
        </h1>

        <p
          style={{
            marginTop: 0,
            color: "#64748b",
          }}
        >
          Website appointment requests appear here automatically.
        </p>

        {loading && <p>Loading appointments...</p>}

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: 14,
              borderRadius: 10,
              marginBottom: 18,
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div
            style={{
              background: "white",
              padding: 24,
              borderRadius: 14,
            }}
          >
            Abhi koi appointment nahi hai.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          {appointments.map((appointment) => {
            const cleanMobile = (appointment.mobile || "").replace(/\D/g, "");

            const whatsappNumber =
              cleanMobile.length === 10
                ? `91${cleanMobile}`
                : cleanMobile;

            const whatsappText = encodeURIComponent(
              `Hello ${appointment.patientName || ""}, this is Neuro Mind Bloom regarding your appointment request for ${
                appointment.service || "consultation"
              } on ${appointment.preferredDate || ""} at ${
                appointment.preferredTime || ""
              }.`
            );

            return (
              <div
                key={appointment.id}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: "#153f46",
                      }}
                    >
                      {appointment.patientName || "Patient"}
                    </h2>

                    <div
                      style={{
                        marginTop: 8,
                        lineHeight: 1.8,
                        color: "#334155",
                      }}
                    >
                      <div>
                        <strong>Mobile:</strong>{" "}
                        {appointment.mobile || "-"}
                      </div>

                      <div>
                        <strong>Service:</strong>{" "}
                        {appointment.service || "-"}
                      </div>

                      <div>
                        <strong>Date:</strong>{" "}
                        {appointment.preferredDate || "-"}
                      </div>

                      <div>
                        <strong>Time:</strong>{" "}
                        {appointment.preferredTime || "-"}
                      </div>

                      <div>
                        <strong>Source:</strong>{" "}
                        {appointment.source || "Website"}
                      </div>

                      <div>
                        <strong>Concern:</strong>{" "}
                        {appointment.concern || "-"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      minWidth: 180,
                    }}
                  >
                    <label
                      style={{
                        fontWeight: 700,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Status
                    </label>

                    <select
                      value={appointment.status || "New"}
                      onChange={(e) =>
                        updateStatus(appointment.id, e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                      }}
                    >
                      <option>New</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>

                    {whatsappNumber && (
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "block",
                          marginTop: 12,
                          padding: "11px 14px",
                          textAlign: "center",
                          textDecoration: "none",
                          borderRadius: 9,
                          background: "#25D366",
                          color: "white",
                          fontWeight: 800,
                        }}
                      >
                        WhatsApp Patient
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}









