"use client";

import { useParams } from "next/navigation";

export default function PatientVideoRoomPage() {
  const params = useParams();

  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const safeRoom = String(roomId || "consultation").replace(/[^a-zA-Z0-9_-]/g, "");
  const roomUrl = `https://meet.jit.si/NeuroMindBloom-${safeRoom}`;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "14px" }}>
          <h1 style={{ margin: 0 }}>Join Video Consultation</h1>
          <p style={{ margin: "5px 0 0", color: "#555" }}>
            Neuro Mind Bloom secure consultation room
          </p>
        </div>

        <iframe
          src={roomUrl}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          style={{
            width: "100%",
            height: "82vh",
            border: "0",
            borderRadius: "12px",
            background: "#000",
          }}
          title="Patient Video Consultation"
        />
      </div>
    </main>
  );
}
