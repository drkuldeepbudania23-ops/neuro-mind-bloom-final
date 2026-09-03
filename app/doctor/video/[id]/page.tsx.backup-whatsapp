"use client";

import { useParams, useRouter } from "next/navigation";

export default function VideoRoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const safeRoom = String(roomId || "consultation").replace(/[^a-zA-Z0-9_-]/g, "");
  const roomUrl = `https://meet.jit.si/NeuroMindBloom-${safeRoom}`;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f7f8fa",
      padding: "16px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "14px"
        }}>
          <div>
            <h1 style={{ margin: 0 }}>Video Consultation</h1>
            <p style={{ margin: "5px 0 0", color: "#555" }}>
              Secure consultation room
            </p>
          </div>

          <div style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => router.push("/doctor")}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #bbb",
                background: "white",
                cursor: "pointer"
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
                cursor: "pointer"
              }}
            >
              End Consultation → E-Prescription
            </button>
          </div>
        </div>

        <iframe
          src={roomUrl}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          style={{
            width: "100%",
            height: "78vh",
            border: "0",
            borderRadius: "12px",
            background: "#000"
          }}
          title="Video Consultation"
        />
      </div>
    </main>
  );
}
