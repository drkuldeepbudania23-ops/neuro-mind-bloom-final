"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorVideoRoomPage() {
  const params = useParams();
  const router = useRouter();
  const [patientLink, setPatientLink] = useState("");

  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const safeRoom = String(roomId || "consultation").replace(/[^a-zA-Z0-9_-]/g, "");
  const roomUrl = `https://meet.jit.si/NeuroMindBloom-${safeRoom}`;

  useEffect(() => {
    if (typeof window !== "undefined" && safeRoom) {
      setPatientLink(`${window.location.origin}/video/${safeRoom}`);
    }
  }, [safeRoom]);

  function sendWhatsApp() {
    const message =
      `Your Neuro Mind Bloom video consultation is ready.\n\n` +
      `Join here:\n${patientLink}\n\n` +
      `Please open this link at your confirmed appointment time.`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  async function copyLink() {
    if (!patientLink) return;
    await navigator.clipboard.writeText(patientLink);
    alert("Patient video link copied");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Video Consultation</h1>
            <p style={{ margin: "5px 0 0", color: "#555" }}>
              Secure consultation room
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={sendWhatsApp}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Send Patient Link on WhatsApp
            </button>

            <button
              onClick={copyLink}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #bbb",
                background: "white",
                cursor: "pointer",
              }}
            >
              Copy Patient Link
            </button>

            <button
              onClick={() => router.push("/doctor")}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #bbb",
                background: "white",
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>

            <button
              onClick={() =>
                router.push(
                  `/doctor/prescription?appointmentId=${encodeURIComponent(
                    String(roomId || "")
                  )}`
                )
              }
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#111827",
                color: "white",
                cursor: "pointer",
              }}
            >
              End Consultation → E-Prescription
            </button>
          </div>
        </div>

        {patientLink && (
          <div
            style={{
              marginBottom: "12px",
              padding: "10px 12px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              wordBreak: "break-all",
            }}
          >
            <b>Patient Join Link:</b> {patientLink}
          </div>
        )}

        <iframe
          src={roomUrl}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          style={{
            width: "100%",
            height: "76vh",
            border: "0",
            borderRadius: "12px",
            background: "#000",
          }}
          title="Doctor Video Consultation"
        />
      </div>
    </main>
  );
}
