"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import SendPaymentQR from "../../../components/doctor/SendPaymentQR";
import { SERVICES } from "../../../lib/site";

/** Short reference for a payment that is not tied to a website booking (walk-in / phone patient). */
function newReference(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `W${ymd}${rnd}`;
}

/**
 * Doctor → Send Payment QR to any patient (walk-in, phone or old patient) —
 * no website booking needed. Builds the same payment page link (clinic UPI QR + amount).
 */
export default function PaymentQrPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [serviceCode, setServiceCode] = useState<string>(SERVICES[0].code);
  const [reference, setReference] = useState(newReference);

  const digits = mobile.replace(/\D/g, "").slice(-10);
  const ready = name.trim().length >= 2 && digits.length === 10;

  const appointment = useMemo(
    () => ({ id: reference, name: name.trim(), mobile: digits, email: email.trim(), serviceCode }),
    [reference, name, digits, email, serviceCode]
  );

  return (
    <main style={s.page}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Send Payment QR</h1>
      <p style={s.muted}>
        Kisi bhi patient ko payment QR bhejein — walk-in, phone ya purane patient, website booking ki zaroorat nahi.
        Website se aayi bookings ke liye Appointments page par bhi yeh option hai.
      </p>

      <section style={s.card}>
        <label style={s.label}>Patient name
          <input style={s.input} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        </label>
        <label style={s.label}>Mobile (WhatsApp)
          <input style={s.input} value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" placeholder="98XXXXXXXX" />
        </label>
        <label style={s.label}>Email (optional)
          <input style={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label style={s.label}>Service
          <select style={s.input} value={serviceCode} onChange={(e) => setServiceCode(e.target.value)}>
            {SERVICES.map((sv) => (
              <option key={sv.code} value={sv.code}>{sv.label.en} – ₹{sv.fee}</option>
            ))}
          </select>
        </label>
        <p style={s.muted}>
          Reference: <b style={{ fontFamily: "monospace" }}>{reference}</b>{" "}
          <button type="button" style={s.linkBtn} onClick={() => setReference(newReference())}>New reference</button>
        </p>

        {ready ? (
          <SendPaymentQR key={`${reference}-${serviceCode}`} appointment={appointment} confirmed={false} allowAuto={false} />
        ) : (
          <p style={s.warn}>Naam aur 10-digit mobile number daalein — phir WhatsApp / Email / QR page buttons dikhenge.</p>
        )}
      </section>

      <p style={s.muted}>
        Payment aane ke baad <Link href="/doctor/payment">Payment</Link> page par record karein (reference: {reference}).
      </p>
    </main>
  );
}

const s: Record<string, CSSProperties> = {
  page: { maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif", color: "#123" },
  muted: { color: "#475569", lineHeight: 1.5 },
  card: { display: "grid", gap: 12, border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginTop: 16, background: "white" },
  label: { display: "grid", gap: 4, fontWeight: 700 },
  input: { padding: 11, border: "1px solid #cbd5e1", borderRadius: 8, fontWeight: 400 },
  linkBtn: { border: 0, background: "none", color: "#176b87", cursor: "pointer", textDecoration: "underline", padding: 0 },
  warn: { color: "#b45309", fontWeight: 600 },
};
