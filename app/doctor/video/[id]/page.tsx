"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import { PROVIDER_LABELS, type VideoProvider } from "../../../../lib/video/providers";

export default function DoctorVideoRoomPage() {
  const params = useParams();
  const router = useRouter();
  const [patientLink, setPatientLink] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [roomError, setRoomError] = useState("");
  const [provider, setProvider] = useState<VideoProvider | "">("");
  const [providers, setProviders] = useState<VideoProvider[]>([]);
  const [mode, setMode] = useState<"embed" | "external">("embed");
  const [hostUrl, setHostUrl] = useState("");
  const [requested, setRequested] = useState<VideoProvider | "">("");
  const [meetInput, setMeetInput] = useState("");
  const [meetSaving, setMeetSaving] = useState(false);
  const [meetError, setMeetError] = useState("");

  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const safeRoom = String(roomId || "consultation").replace(/[^a-zA-Z0-9_-]/g, "");

  // The server gives the doctor a moderator room (no Jitsi sign-in) and a signed patient link.
  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const response = await fetch("/api/video/doctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: await user.getIdToken(), appointmentId: safeRoom, provider: requested || undefined }),
        });
        const result = await response.json().catch(() => ({}));
        if (!active) return;
        if (response.ok && result.ok) {
          setRoomError("");
          setRoomUrl(result.roomUrl);
          setPatientLink(result.patientLink);
          setProvider(result.provider);
          setProviders(result.providers || []);
          setMode(result.mode === "external" ? "external" : "embed");
          setHostUrl(result.hostUrl || "");
        } else {
          setRoomUrl("");
          setRoomError(
            result.error === "provider"
              ? "This video service did not respond (limit reached or keys wrong). Choose another option above."
              : "Could not open the video room. Please reload."
          );
        }
      } catch {
        if (active) setRoomError("Could not open the video room. Please check internet and reload.");
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [safeRoom, requested]);

  /** Save the Google Meet link the doctor created; the patient's link then opens it. */
  async function saveMeetLink() {
    setMeetError("");
    const user = auth.currentUser;
    if (!user) return;
    setMeetSaving(true);
    try {
      const response = await fetch("/api/video/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await user.getIdToken(), appointmentId: safeRoom, provider: "meet", meetUrl: meetInput }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok && result.roomUrl) {
        setRoomUrl(result.roomUrl);
        setMeetInput("");
      } else {
        setMeetError(result.error === "invalid-meet-link" ? "Paste a Google Meet link like https://meet.google.com/abc-defg-hij" : "Could not save. Please try again.");
      }
    } catch {
      setMeetError("Could not save. Please check internet.");
    } finally {
      setMeetSaving(false);
    }
  }

  function sendWhatsApp() {
    if (!patientLink) return;
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

        {providers.length > 1 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
            <b style={{ fontSize: 14 }}>Video via:</b>
            {providers.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setRoomUrl("");
                  setRequested(p);
                }}
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: p === provider ? "2px solid #0f5c4d" : "1px solid #cbd5e1",
                  background: p === provider ? "#e6f2ef" : "white",
                  fontWeight: p === provider ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {PROVIDER_LABELS[p]}
              </button>
            ))}
            <span style={{ fontSize: 12, color: "#55606b" }}>Patient link stays the same — it opens whichever is selected.</span>
          </div>
        )}

        {roomError && (
          <div style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: "#fef2f2", color: "#7f1d1d" }}>{roomError}</div>
        )}
        {provider === "meet" && (
          <div style={{ padding: 24, borderRadius: 12, background: "white", border: "1px solid #e5e7eb", marginBottom: 12 }}>
            <h2 style={{ marginTop: 0 }}>Google Meet</h2>
            {roomUrl ? (
              <>
                <p style={{ color: "#444" }}>
                  Meet link saved: <b>{roomUrl}</b>. The patient link above now opens this meeting. Admit the patient when they ask to join.
                </p>
                <a
                  href={roomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", padding: "12px 20px", borderRadius: 10, background: "#00897b", color: "white", fontWeight: 700, textDecoration: "none" }}
                >
                  Open Google Meet
                </a>
                <button
                  type="button"
                  onClick={() => setRoomUrl("")}
                  style={{ marginLeft: 10, padding: "11px 16px", borderRadius: 10, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}
                >
                  Change link
                </button>
              </>
            ) : (
              <>
                <p style={{ color: "#444", marginTop: 0 }}>
                  <b>Step 1:</b>{" "}
                  <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" style={{ color: "#00897b", fontWeight: 700 }}>
                    Create a new Google Meet ↗
                  </a>{" "}
                  (signed in with the clinic Gmail), then copy its link.
                </p>
                <p style={{ color: "#444" }}>
                  <b>Step 2:</b> paste it here and save. Then send the patient link.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    value={meetInput}
                    onChange={(e) => setMeetInput(e.target.value)}
                    placeholder="https://meet.google.com/abc-defg-hij"
                    style={{ flex: "1 1 280px", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1" }}
                  />
                  <button
                    type="button"
                    onClick={saveMeetLink}
                    disabled={meetSaving || !meetInput.trim()}
                    style={{ padding: "10px 16px", borderRadius: 8, border: 0, background: "#00897b", color: "white", fontWeight: 700, cursor: "pointer" }}
                  >
                    {meetSaving ? "Saving…" : "Save Meet link"}
                  </button>
                </div>
                {meetError && <p style={{ color: "#b91c1c", marginBottom: 0 }}>{meetError}</p>}
              </>
            )}
            <p style={{ fontSize: 13, color: "#55606b", marginBottom: 0 }}>
              Free Gmail: 1-to-1 calls up to 24 hours; with 3 or more people the call ends at 60 minutes.
            </p>
          </div>
        )}

        {!roomUrl && !roomError && provider !== "meet" && <div style={{ padding: 12 }}>Opening secure room…</div>}
        {roomUrl && mode === "external" && provider === "zoom" && (
          <div style={{ padding: 24, borderRadius: 12, background: "white", border: "1px solid #e5e7eb" }}>
            <h2 style={{ marginTop: 0 }}>Zoom meeting ready</h2>
            <p style={{ color: "#444" }}>
              Start the meeting as host. The patient waits in the waiting room — admit them from Zoom.
              Send the patient link above; it opens this Zoom meeting for them.
            </p>
            <a
              href={hostUrl || roomUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "12px 20px", borderRadius: 10, background: "#0b5cff", color: "white", fontWeight: 700, textDecoration: "none" }}
            >
              Start Zoom meeting (host)
            </a>
            <p style={{ fontSize: 13, color: "#55606b", marginBottom: 0 }}>Free Zoom accounts may end meetings after 40 minutes.</p>
          </div>
        )}
        {roomUrl && mode === "embed" && <iframe
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
        />}
      </div>
    </main>
  );
}
