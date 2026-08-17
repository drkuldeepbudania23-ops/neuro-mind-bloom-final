"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Medicine = {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
};

export default function DoctorPage() {
    const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("doctorLoggedIn");

    if (loggedIn !== "true") {
      router.replace("/doctor/login");
    }
  }, [router]);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaints, setComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const [medicines, setMedicines] = useState<Medicine[]>([]);

  function addMedicine() {
    if (!medicine.trim()) return;

    setMedicines([
      ...medicines,
      {
        name: medicine,
        dose,
        frequency,
        duration,
      },
    ]);

    setMedicine("");
    setDose("");
    setFrequency("");
    setDuration("");
  }

  function removeMedicine(index: number) {
    setMedicines(medicines.filter((_, i) => i !== index));
  }

  function clearPatient() {
    setPatientName("");
    setAge("");
    setGender("");
    setMobile("");
    setComplaints("");
    setDiagnosis("");
    setAdvice("");
    setFollowUp("");
    setPaymentStatus("Pending");
    setMedicines([]);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f8f7",
        padding: 24,
        fontFamily: "Arial, sans-serif",
        color: "#17313b",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={card}>
          <h1 style={{ margin: 0 }}>Doctor Dashboard</h1>
          <h2 style={{ margin: "6px 0" }}>Neuro Mind Bloom</h2>
          <p style={{ marginBottom: 0 }}>
            Patient Consultation • e-Prescription • Follow-up • Payment
          </p>
        </div>

        <div style={card}>
          <h2>1. Patient Details</h2>

          <div style={grid}>
            <input
              style={input}
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <input
              style={input}
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <select
              style={input}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              style={input}
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>

        <div style={card}>
          <h2>2. Consultation</h2>

          <textarea
            style={textarea}
            placeholder="Presenting complaints / history"
            value={complaints}
            onChange={(e) => setComplaints(e.target.value)}
          />

          <textarea
            style={textarea}
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>

        <div style={card}>
          <h2>3. e-Prescription</h2>

          <div style={grid}>
            <input
              style={input}
              placeholder="Medicine"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />

            <input
              style={input}
              placeholder="Dose e.g. 10 mg"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />

            <input
              style={input}
              placeholder="Frequency e.g. 1-0-1"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />

            <input
              style={input}
              placeholder="Duration e.g. 14 days"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button style={primaryButton} onClick={addMedicine}>
            + Add Medicine
          </button>

          {medicines.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {medicines.map((m, index) => (
                <div
                  key={index}
                  style={{
                    padding: 12,
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <span>
                    <b>{m.name}</b> — {m.dose} — {m.frequency} — {m.duration}
                  </span>

                  <button
                    style={removeButton}
                    onClick={() => removeMedicine(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={card}>
          <h2>4. Advice & Follow-up</h2>

          <textarea
            style={textarea}
            placeholder="Advice / counselling / precautions"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
          />

          <label>
            <b>Next Follow-up</b>
          </label>

          <input
            type="date"
            style={{ ...input, marginTop: 8 }}
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
          />
        </div>

        <div style={card}>
          <h2>5. Payment</h2>

          <p>
            Consultation Fee: <b>₹500</b>
          </p>

          <select
            style={input}
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Waived</option>
          </select>
        </div>

        <div style={card} className="prescription">
          <h2>Prescription Preview</h2>

          <h3>Neuro Mind Bloom</h3>
          <p>Dr Kuldeep Budania — MD Psychiatry</p>

          <hr />

          <p>
            <b>Patient:</b> {patientName || "—"}
          </p>

          <p>
            <b>Age/Gender:</b> {age || "—"} / {gender || "—"}
          </p>

          <p>
            <b>Mobile:</b> {mobile || "—"}
          </p>

          <p>
            <b>Diagnosis:</b> {diagnosis || "—"}
          </p>

          <h3>Rx</h3>

          {medicines.length === 0 ? (
            <p>No medicine added.</p>
          ) : (
            <ol>
              {medicines.map((m, index) => (
                <li key={index}>
                  {m.name} — {m.dose} — {m.frequency} — {m.duration}
                </li>
              ))}
            </ol>
          )}

          <p>
            <b>Advice:</b> {advice || "—"}
          </p>

          <p>
            <b>Follow-up:</b> {followUp || "—"}
          </p>

          <p>
            <b>Payment:</b> {paymentStatus}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button style={primaryButton} onClick={() => window.print()}>
            Print / Save Prescription PDF
          </button>

          <button style={secondaryButton} onClick={clearPatient}>
            New Patient
          </button>
        </div>
      </div>
    </main>
  );
}

const card = {
  background: "white",
  padding: 22,
  borderRadius: 16,
  marginBottom: 18,
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 12,
};

const input = {
  width: "100%",
  padding: 12,
  border: "1px solid #ccd8d5",
  borderRadius: 9,
  boxSizing: "border-box" as const,
  fontSize: 15,
};

const textarea = {
  ...input,
  minHeight: 100,
  marginBottom: 12,
  resize: "vertical" as const,
};

const primaryButton = {
  marginTop: 14,
  padding: "12px 18px",
  background: "#176b61",
  color: "white",
  border: "none",
  borderRadius: 9,
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryButton = {
  ...primaryButton,
  background: "white",
  color: "#176b61",
  border: "1px solid #176b61",
};

const removeButton = {
  border: "none",
  background: "#f5dddd",
  color: "#8f2d2d",
  borderRadius: 7,
  padding: "6px 10px",
  cursor: "pointer",
};
