"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";

type Props = { recordId: string; name?: string; mobile?: string; email?: string };

/**
 * Patient history: get a FRESH 3-day download link for an already e-signed
 * prescription (e.g. on the patient's request or after payment) and send it.
 */
export default function ResendRxLink({ recordId, name = "", mobile = "", email = "" }: Props) {
  const [link, setLink] = useState("");
  const [state, setState] = useState("");
  const [lang, setLang] = useState<"hi" | "en">("hi");

  async function makeLink() {
    setState("Creating new link…");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("login");
      const response = await fetch("/api/prescriptions/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await user.getIdToken(), recordId }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || !result.link) {
        setState(
          result.error === "not-signed"
            ? "This prescription is not e-signed yet."
            : result.error === "not-configured"
              ? "Secure links are not set up on the server."
              : "Could not create a new link. Please try again."
        );
        return;
      }
      setLink(String(result.link));
      setState("");
    } catch {
      setState("Could not create a new link. Please sign in again and retry.");
    }
  }

  const who = name.trim();
  const text =
    lang === "hi"
      ? `नमस्ते${who ? ` ${who}` : ""},\nआपका ई-प्रिस्क्रिप्शन डाउनलोड करने का नया सुरक्षित लिंक (3 दिन तक मान्य):\n${link}\n\nदवाइयाँ डॉक्टर की सलाह अनुसार ही लें।\n— डॉ. कुलदीप बुडानिया`
      : `Hello${who ? ` ${who}` : ""},\nHere is a new secure link to download your e-prescription (valid for 3 days):\n${link}\n\nTake medicines exactly as advised.\n— Dr. Kuldeep Budania`;
  const digits = mobile.replace(/\D/g, "").slice(-10);
  const whatsappHref = link && /^[6-9]\d{9}$/.test(digits) ? `https://wa.me/91${digits}?text=${encodeURIComponent(text)}` : "";
  const emailHref =
    link && email
      ? `mailto:${email}?subject=${encodeURIComponent(lang === "hi" ? "आपका ई-प्रिस्क्रिप्शन" : "Your e-prescription")}&body=${encodeURIComponent(text)}`
      : "";

  return (
    <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      {!link ? (
        <button type="button" onClick={makeLink} style={{ ...btn, background: "#0f5c4d", border: 0, cursor: "pointer" }}>
          Resend Rx link (new, 3 days)
        </button>
      ) : (
        <>
          <select value={lang} onChange={(e) => setLang(e.target.value as "hi" | "en")} style={select}>
            <option value="hi">Hindi</option>
            <option value="en">English</option>
          </select>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: "#128C7E" }}>
              Send via WhatsApp
            </a>
          ) : (
            <span style={muted}>No valid mobile</span>
          )}
          {emailHref && (
            <a href={emailHref} style={{ ...btn, background: "#1f2937" }}>
              Send via Email
            </a>
          )}
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(text).then(() => setState("Message copied"), () => setState("Copy failed"))}
            style={{ ...btn, background: "#e9eef5", color: "#111", border: 0, cursor: "pointer" }}
          >
            Copy message
          </button>
        </>
      )}
      {state && <span style={muted}>{state}</span>}
    </div>
  );
}

const btn = { textDecoration: "none", borderRadius: 8, padding: "7px 12px", fontWeight: 700, color: "white", fontSize: 13 } as const;
const select = { padding: "6px 8px", borderRadius: 8, border: "1px solid #cbd5e1" } as const;
const muted = { fontSize: 13, color: "#55606b" } as const;
