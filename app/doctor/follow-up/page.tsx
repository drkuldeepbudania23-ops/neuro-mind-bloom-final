"use client";

import { useState } from "react";

export default function FollowUpPage() {
  const [message, setMessage] = useState("");

  function saveFollowUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Follow-up details saved.");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #bbb",
    borderRadius: "8px",
    boxSizing: "border-box" as const
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Patient Follow-up</h1>

      <form onSubmit={saveFollowUp}>
        <input required placeholder="Patient Name" style={inputStyle} />
        <input required type="date" style={inputStyle} />

        <textarea
          required
          placeholder="Current symptoms / improvement"
          style={{ ...inputStyle, height: 100 }}
        />

        <textarea
          placeholder="Medication changes / advice"
          style={{ ...inputStyle, height: 100 }}
        />

        <input type="date" style={inputStyle} />

        <button type="submit" style={{ padding: "12px 20px", marginTop: 15 }}>
          Save Follow-up
        </button>
      </form>

      {message && <p><b>{message}</b></p>}
    </main>
  );
}