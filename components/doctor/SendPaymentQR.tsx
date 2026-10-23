"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { CLINIC, getService, paymentPageUrl, serviceCodeFromText } from "../../lib/site";

type Props = {
  appointment: {
    id: string;
    name?: string;
    patientName?: string;
    mobile?: string;
    email?: string;
    service?: string;
    serviceCode?: string;
    date?: string;
    preferredDate?: string;
    time?: string;
    preferredTime?: string;
    language?: string;
  };
  /** Appointment already confirmed? (changes the message wording) */
  confirmed?: boolean;
  /** Server auto-send needs a real appointment record; off for walk-in links. */
  allowAuto?: boolean;
};

/**
 * Doctor dashboard: after an appointment is confirmed, send the patient a
 * payment link that shows the clinic UPI QR and the amount to pay — via WhatsApp or email.
 * Amount can be edited before sending (e.g. after a discount).
 */
export default function SendPaymentQR({ appointment, confirmed = true, allowAuto = true }: Props) {
  const code =
    appointment.serviceCode && getService(appointment.serviceCode)
      ? appointment.serviceCode
      : serviceCodeFromText(appointment.service || "");
  const service = getService(code)!;
  const [amount, setAmount] = useState(String(service.fee));
  const [lang, setLang] = useState<"en" | "hi">(appointment.language === "hi" ? "hi" : "en");
  const [autoState, setAutoState] = useState("");

  const amt = Number(amount);
  const valid = Number.isInteger(amt) && amt > 0 && amt <= 100000;
  const link = valid ? paymentPageUrl({ appointmentId: appointment.id, amount: amt, serviceCode: code, lang }) : "";
  const name = (appointment.name || appointment.patientName || "").trim();
  const when = [appointment.date || appointment.preferredDate, appointment.time || appointment.preferredTime].filter(Boolean).join(" ");

  const message =
    lang === "hi"
      ? `नमस्ते${name ? ` ${name}` : ""},\n${confirmed ? `Neuro Mind Bloom में आपका अपॉइंटमेंट कन्फर्म हो गया है${when ? ` (${when})` : ""}।` : `Neuro Mind Bloom में परामर्श के लिए भुगतान विवरण${when ? ` (${when})` : ""}।`}\n${service.label.hi}: ₹${amt}\n\nभुगतान के लिए इस लिंक पर QR कोड स्कैन करें:\n${link}\n\nभुगतान के बाद स्क्रीनशॉट इसी WhatsApp पर भेजें।\n— डॉ. कुलदीप बुडानिया`
      : `Hello${name ? ` ${name}` : ""},\n${confirmed ? `Your Neuro Mind Bloom appointment is confirmed${when ? ` (${when})` : ""}.` : `Payment details for your Neuro Mind Bloom consultation${when ? ` (${when})` : ""}.`}\n${service.label.en}: ₹${amt}\n\nPlease scan the payment QR code at this link:\n${link}\n\nAfter paying, kindly send the screenshot on this WhatsApp.\n— Dr. Kuldeep Budania`;

  /** Server sends the payment link automatically (WhatsApp Cloud API + email), if configured. */
  async function sendAutomatically() {
    setAutoState("Sending…");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("login");
      const response = await fetch("/api/notify/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await user.getIdToken(), appointmentId: appointment.id, kind: "payment_request", amount: amt, lang }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setAutoState(result.error === "already-paid" ? "Already paid." : "Automatic sending is not set up — use the buttons above.");
        return;
      }
      const d = result.delivery as { whatsapp: { status: string }; email: { status: string } };
      setAutoState(`WhatsApp: ${d.whatsapp.status} · Email: ${d.email.status}`);
    } catch {
      setAutoState("Could not send automatically — use the buttons above.");
    }
  }

  const digits = (appointment.mobile || "").replace(/\D/g, "").slice(-10);
  const whatsappHref = digits.length === 10 ? `https://wa.me/91${digits}?text=${encodeURIComponent(message)}` : "";
  const emailHref = appointment.email
    ? `mailto:${appointment.email}?subject=${encodeURIComponent(
        lang === "hi" ? "Neuro Mind Bloom – भुगतान QR कोड" : "Neuro Mind Bloom – Payment QR code"
      )}&body=${encodeURIComponent(message)}`
    : "";

  return (
    <div style={box}>
      <b>Send Payment QR</b>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
        <label>
          Amount ₹{" "}
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" style={input} />
        </label>
        <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "hi")} style={input}>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
        </select>
        {whatsappHref && valid ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: "#128C7E" }}>
            QR via WhatsApp
          </a>
        ) : (
          <span style={muted}>No valid mobile</span>
        )}
        {emailHref && valid ? (
          <a href={emailHref} style={{ ...btn, background: "#1f2937" }}>
            QR via Email
          </a>
        ) : (
          <span style={muted}>No email</span>
        )}
        {valid && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: "#e9eef5", color: "#111" }}>
            Open QR page
          </a>
        )}
        {valid && allowAuto && (
          <button type="button" onClick={sendAutomatically} style={{ ...btn, background: "#0f5c4d", border: 0, cursor: "pointer" }}>
            Auto-send (WhatsApp + Email)
          </button>
        )}
      </div>
      {autoState && <div style={{ ...muted, marginTop: 6 }}>{autoState}</div>}
      <div style={{ ...muted, marginTop: 6 }}>
        Patient sees the clinic Razorpay UPI QR and is asked to pay ₹{valid ? amt : "—"}. After payment, record it in Payment. Clinic WhatsApp: {CLINIC.whatsappDisplay}
      </div>
    </div>
  );
}

const box = { marginTop: 14, padding: 12, borderRadius: 10, background: "#f0f9f8", border: "1px solid #cfe7e4", width: "100%" } as const;
const input = { padding: "8px 10px", borderRadius: 8, border: "1px solid #cbd5e1", width: 110 } as const;
const btn = { textDecoration: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 700, color: "white" } as const;
const muted = { fontSize: 13, color: "#55606b" } as const;
