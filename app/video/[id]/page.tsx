"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type State = { kind: "loading" } | { kind: "ready"; url: string; external: boolean } | { kind: "error"; code: string };

export default function PatientVideoRoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const appointmentId = String(roomId || "").replace(/[^a-zA-Z0-9_-]/g, "");
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let active = true;
    const key = new URLSearchParams(window.location.search).get("k") || "";
    fetch("/api/video/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId, k: key }),
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!active) return;
        if (response.ok && result.ok && result.roomUrl) {
          const external = result.mode === "external";
          setState({ kind: "ready", url: result.roomUrl, external });
          if (external) window.location.href = result.roomUrl; // opens Google Meet / Zoom
        }
        else setState({ kind: "error", code: result.error || "invalid-link" });
      })
      .catch(() => active && setState({ kind: "error", code: "network" }));
    return () => {
      active = false;
    };
  }, [appointmentId]);

  return (
    <main style={{ minHeight: "100vh", background: "#f7f8fa", padding: "16px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "14px" }}>
          <h1 style={{ margin: 0 }}>Join Video Consultation · वीडियो परामर्श</h1>
          <p style={{ margin: "5px 0 0", color: "#555" }}>
            Neuro Mind Bloom private consultation room. Allow camera and microphone when asked. · कैमरा और माइक की अनुमति दें।
          </p>
        </div>

        {state.kind === "loading" && <div style={box}>Connecting… · जुड़ रहे हैं…</div>}

        {state.kind === "error" && (
          <div style={{ ...box, color: "#7f1d1d", background: "#fef2f2" }}>
            {state.code === "not-started"
              ? "The doctor has not started the consultation yet. Please wait and reload this page in a minute. · डॉक्टर ने अभी परामर्श शुरू नहीं किया है, एक मिनट बाद पेज फिर से खोलें।"
              : state.code === "cancelled"
              ? "This appointment has been cancelled. · यह अपॉइंटमेंट रद्द हो गया है।"
              : state.code === "network"
                ? "Could not connect. Please check your internet and reload. · इंटरनेट जाँचें और पेज फिर से खोलें।"
                : "This video link is not valid or has expired. Please ask the clinic for a new link. · यह लिंक मान्य नहीं है, क्लिनिक से नया लिंक माँगें।"}
            <div style={{ marginTop: 10 }}>
              <a href="https://wa.me/919376315331" style={{ color: "#065f46", fontWeight: 700 }}>
                WhatsApp +91 93763 15331
              </a>
            </div>
          </div>
        )}

        {state.kind === "ready" && state.external && (
          <div style={box}>
            {state.url.includes("meet.google.com") ? (
              <>
                <p style={{ marginTop: 0 }}>
                  This consultation is on Google Meet. Tap the button, then "Ask to join" — the doctor will admit you. · यह परामर्श Google Meet पर है। बटन दबाएँ, फिर “Ask to join” — डॉक्टर आपको जोड़ लेंगे।
                </p>
                <a href={state.url} style={{ display: "inline-block", padding: "12px 20px", borderRadius: 10, background: "#00897b", color: "white", fontWeight: 700, textDecoration: "none" }}>
                  Open Google Meet · Google Meet खोलें
                </a>
              </>
            ) : (
              <>
                <p style={{ marginTop: 0 }}>This consultation is on Zoom. If Zoom did not open, tap the button. · यह परामर्श Zoom पर है।</p>
                <a href={state.url} style={{ display: "inline-block", padding: "12px 20px", borderRadius: 10, background: "#0b5cff", color: "white", fontWeight: 700, textDecoration: "none" }}>
                  Open Zoom · Zoom खोलें
                </a>
              </>
            )}
          </div>
        )}
        {state.kind === "ready" && !state.external && (
          <iframe
            src={state.url}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            style={{ width: "100%", height: "82vh", border: "0", borderRadius: "12px", background: "#000" }}
            title="Patient Video Consultation"
          />
        )}
      </div>
    </main>
  );
}

const box = { padding: 18, borderRadius: 12, background: "white", border: "1px solid #e5e7eb" } as const;
