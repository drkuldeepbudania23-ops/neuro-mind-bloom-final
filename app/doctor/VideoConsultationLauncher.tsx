"use client";

import { usePathname, useRouter } from "next/navigation";

export default function VideoConsultationLauncher() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/doctor/video")) return null;

  function startVideo() {
    const room =
      "NMB-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 8);

    router.push(`/doctor/video/${room}`);
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto 30px",
        padding: "0 20px"
      }}
    >
      <button
        onClick={startVideo}
        style={{
          width: "100%",
          minHeight: "135px",
          borderRadius: "18px",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          cursor: "pointer",
          textAlign: "left",
          padding: "28px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >
        <div
          style={{
            fontSize: "26px",
            fontWeight: 700,
            marginBottom: "10px"
          }}
        >
          🎥 Video Consultation
        </div>

        <div style={{ fontSize: "17px" }}>
          Start Video Consultation →
        </div>
      </button>
    </div>
  );
}
