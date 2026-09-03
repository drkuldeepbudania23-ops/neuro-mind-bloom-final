"use client";

import { auth, db } from "../../lib/firebase";
import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function BookAppointmentPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("Psychiatric Consultation - â‚¹500");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [concern, setConcern] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const cleanName = name.trim();
    const cleanMobile = mobile.replace(/\D/g, "");

    if (!cleanName) {
      setError("Please enter patient name.");
      return;
    }

    if (cleanMobile.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!date) {
      setError("Please select preferred date.");
      return;
    }

    if (!time) {
      setError("Please select preferred time.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "appointments"), {
        patientName: cleanName,
        name: cleanName,
        mobile: cleanMobile,
        service,
        preferredDate: date,
        date: date,
        preferredTime: time,
        time: time,
        concern: concern.trim(),
        mode: "Online",
        status: "pending",
        source: "Website",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      setName("");
      setMobile("");
      setService("Psychiatric Consultation - â‚¹500");
      setDate("");
      setTime("");
      setConcern("");
    } catch (err) {
      console.error(err);
      setError(
        "Appointment save nahi hua. Firebase Firestore connection/rules check karni hongi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #063b43 0%, #0d5962 45%, #edf7f5 45%, #ffffff 100%)",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: 24,
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 2,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            NEURO MIND BLOOM
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 56px)",
            }}
          >
            Book Appointment
          </h1>

          <p
            style={{
              maxWidth: 600,
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Fill your details below. Your appointment request will be saved
            securely and will appear directly in the doctor dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 760,
            background: "white",
            borderRadius: 22,
            padding: 28,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            <label style={labelStyle}>
              Patient name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter patient name"
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Mobile number
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                style={inputStyle}
              />
            </label>
          </div>

          <label style={labelStyle}>
            Choose service
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={inputStyle}
            >
              <option>Psychiatric Consultation - â‚¹500</option>
              <option>Psychotherapy Session - â‚¹2000</option>
            </select>
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            <label style={labelStyle}>
              Preferred date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              Preferred time
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <label style={labelStyle}>
            Brief concern
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="Write briefly about the concern"
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </label>

          {error && (
            <div
              style={{
                marginTop: 18,
                padding: 14,
                borderRadius: 10,
                background: "#fee2e2",
                color: "#991b1b",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 12,
                background: "#dcfce7",
                color: "#166534",
              }}
            >
              <strong>Appointment request saved successfully.</strong>
              <div style={{ marginTop: 5 }}>
                It is now available in the Doctor Dashboard.
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 22,
              padding: "16px 18px",
              border: 0,
              borderRadius: 12,
              background: loading ? "#64748b" : "#0d6268",
              color: "white",
              fontSize: 17,
              fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

          {success && "919376315331" && (
            <a
              href={`https://wa.me/${"919376315331"}?text=${encodeURIComponent(
                "Hello Doctor, I have submitted an appointment request on the Neuro Mind Bloom website."
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                marginTop: 12,
                padding: "14px 18px",
                borderRadius: 12,
                background: "#25D366",
                color: "white",
                fontWeight: 800,
              }}
            >
              Continue on WhatsApp
            </a>
          )}
        </form>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: 700,
  color: "#263238",
  marginTop: 18,
} as const;

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: 8,
  padding: "13px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "white",
  fontSize: 16,
  outline: "none",
} as const;














