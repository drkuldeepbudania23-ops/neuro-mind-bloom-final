"use client";

import { useState } from "react";

export default function PrescriptionPage() {
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [advice, setAdvice] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #bbb",
    borderRadius: "8px",
    boxSizing: "border-box" as const
  };

  return (
    <main style={{ maxWidth: 800, margin: "30px auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Neuro Mind Bloom</h1>
      <h2>e-Prescription</h2>
      <p><b>Dr. Kuldeep Budania</b> - MD Psychiatry</p>

      <input
        placeholder="Patient Name"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Age / Sex"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Medicines / Dose / Duration"
        value={medicines}
        onChange={(e) => setMedicines(e.target.value)}
        style={{ ...inputStyle, height: 130 }}
      />

      <textarea
        placeholder="Advice / Investigations"
        value={advice}
        onChange={(e) => setAdvice(e.target.value)}
        style={{ ...inputStyle, height: 100 }}
      />

      <hr />

      <h3>{patient || "Patient Name"} {age ? `(${age})` : ""}</h3>
      <p><b>Diagnosis:</b> {diagnosis}</p>

      <h3>Rx</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{medicines}</p>

      <p><b>Advice:</b></p>
      <p style={{ whiteSpace: "pre-wrap" }}>{advice}</p>

      <button
        onClick={() => window.print()}
        style={{ padding: "12px 20px", marginTop: 20, borderRadius: 8 }}
      >
        Print / Save Prescription
      </button>
    </main>
  );
}