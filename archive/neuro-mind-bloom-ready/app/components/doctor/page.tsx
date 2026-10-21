"use client";

import { useMemo, useState } from "react";

type Medicine = {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
};

export default function DoctorPage() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaints, setComplaints] = useState("");
  const [history, setHistory] = useState("");
  const [mse, setMse] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-IN");
  }, []);

  function addMedicine() {
    if (!medicineName.trim()) return;

    setMedicines((prev) => [
      ...prev,
      {
        name: medicineName,
        dose,
        frequency,
        duration,
        instructions,
      },
    ]);

    setMedicineName("");
    setDose("");
    setFrequency("");
    setDuration("");
    setInstructions("");
  }

  function removeMedicine(index: number) {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }

  function printPrescription() {
    window.print();
  }

  function clearForm() {
    setPatientName("");
    setAge("");
    setGender("");
    setMobile("");
    setComplaints("");
    setHistory("");
    setMse("");
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
        background: "#f3f7f6",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#17313b",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1f8a78",
                  marginBottom: "6px",
                }}
              >
                Neuro Mind Bloom
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                }}
              >
                Doctor Dashboard
              </h1>

              <p
                style={{
                  marginTop: "8px",
                  marginBottom: 0,
                  color: "#5f7278",
                }}
              >
                Consultation, e-Prescription, Follow-up and Payment
              </p>
            </div>

            <div
              style={{
                textAlign: "right",
                lineHeight: 1.6,
              }}
            >
              <strong>Dr Kuldeep Budania</strong>
              <div>MD Psychiatry</div>
              <div>{today}</div>
            </div>
          </div>
        </header>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>1. Patient Details</h2>

          <div style={gridStyle}>
            <Field
              label="Patient Name"
              value={patientName}
              onChange={setPatientName}
              placeholder="Enter patient name"
            />

            <Field
              label="Age"
              value={age}
              onChange={setAge}
              placeholder="Age"
            />

            <div>
              <label style={labelStyle}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <Field
              label="Mobile Number"
              value={mobile}
              onChange={setMobile}
              placeholder="Mobile number"
            />
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>2. Consultation Notes</h2>

          <TextAreaField
            label="Presenting Complaints"
            value={complaints}
            onChange={setComplaints}
            placeholder="Symptoms, duration and main complaints"
          />

          <TextAreaField
            label="Relevant History"
            value={history}
            onChange={setHistory}
            placeholder="Past history, treatment history, substance use, family history etc."
          />

          <TextAreaField
            label="Mental Status Examination"
            value={mse}
            onChange={setMse}
            placeholder="Appearance, behaviour, speech, mood, thought, perception, cognition, insight"
          />

          <TextAreaField
            label="Provisional / Final Diagnosis"
            value={diagnosis}
            onChange={setDiagnosis}
            placeholder="Enter diagnosis"
          />
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>3. e-Prescription</h2>

          <div style={gridStyle}>
            <Field
              label="Medicine"
              value={medicineName}
              onChange={setMedicineName}
              placeholder="Medicine name"
            />

            <Field
              label="Dose"
              value={dose}
              onChange={setDose}
              placeholder="e.g. 10 mg"
            />

            <Field
              label="Frequency"
              value={frequency}
              onChange={setFrequency}
              placeholder="e.g. 1-0-1"
            />

            <Field
              label="Duration"
              value={duration}
              onChange={setDuration}
              placeholder="e.g. 14 days"
            />
          </div>

          <div style={{ marginTop: "14px" }}>
            <Field
              label="Instructions"
              value={instructions}
              onChange={setInstructions}
              placeholder="e.g. after food / at bedtime"
            />
          </div>

          <button onClick={addMedicine} style={primaryButton}>
            + Add Medicine
          </button>

          {medicines.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    {[
                      "Medicine",
                      "Dose",
                      "Frequency",
                      "Duration",
                      "Instructions",
                      "",
                    ].map((item) => (
                      <th key={item} style={tableHeaderStyle}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {medicines.map((med, index) => (
                    <tr key={`${med.name}-${index}`}>
                      <td style={tableCellStyle}>{med.name}</td>
                      <td style={tableCellStyle}>{med.dose}</td>
                      <td style={tableCellStyle}>{med.frequency}</td>
                      <td style={tableCellStyle}>{med.duration}</td>
                      <td style={tableCellStyle}>{med.instructions}</td>
                      <td style={tableCellStyle}>
                        <button
                          onClick={() => removeMedicine(index)}
                          style={dangerButton}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>4. Advice & Follow-up</h2>

          <TextAreaField
            label="Advice"
            value={advice}
            onChange={setAdvice}
            placeholder="Counselling, sleep hygiene, investigations, precautions etc."
          />

          <div style={{ marginTop: "14px" }}>
            <label style={labelStyle}>Next Follow-up</label>
            <input
              type="date"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              style={inputStyle}
            />
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>5. Payment</h2>

          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>Consultation Fee</label>
              <input
                value="₹500"
                readOnly
                style={{
                  ...inputStyle,
                  background: "#eef4f2",
                  fontWeight: 700,
                }}
              />
            </div>

            <div>
              <label style={labelStyle}>Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                style={inputStyle}
              >
                <option>Pending</option>
                <option>Paid</option>
                <option>Waived</option>
              </select>
            </div>
          </div>
        </section>

        <section style={sectionStyle} className="prescription-print">
          <h2 style={headingStyle}>Prescription Preview</h2>

          <div
            style={{
              border: "1px solid #d6e2df",
              borderRadius: "14px",
              padding: "22px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                borderBottom: "1px solid #dfe7e5",
                paddingBottom: "14px",
                marginBottom: "16px",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>Neuro Mind Bloom</h2>
                <div>Dr Kuldeep Budania, MD Psychiatry</div>
              </div>

              <div>
                <strong>Date:</strong> {today}
              </div>
            </div>

            <p>
              <strong>Patient:</strong> {patientName || "—"}
            </p>

            <p>
              <strong>Age / Gender:</strong> {age || "—"} / {gender || "—"}
            </p>

            <p>
              <strong>Mobile:</strong> {mobile || "—"}
            </p>

            <p>
              <strong>Diagnosis:</strong> {diagnosis || "—"}
            </p>

            <h3>Rx</h3>

            {medicines.length === 0 ? (
              <p>No medicines added.</p>
            ) : (
              <ol>
                {medicines.map((med, index) => (
                  <li key={`${med.name}-preview-${index}`} style={{ marginBottom: "10px" }}>
                    <strong>{med.name}</strong>
                    {med.dose ? ` — ${med.dose}` : ""}
                    {med.frequency ? ` — ${med.frequency}` : ""}
                    {med.duration ? ` — ${med.duration}` : ""}
                    {med.instructions ? ` — ${med.instructions}` : ""}
                  </li>
                ))}
              </ol>
            )}

            <p>
              <strong>Advice:</strong> {advice || "—"}
            </p>

            <p>
              <strong>Follow-up:</strong> {followUp || "—"}
            </p>

            <p>
              <strong>Payment:</strong> {paymentStatus}
            </p>

            <div
              style={{
                marginTop: "40px",
                textAlign: "right",
              }}
            >
              <strong>Dr Kuldeep Budania</strong>
              <div>MD Psychiatry</div>
            </div>
          </div>
        </section>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <button onClick={printPrescription} style={primaryButton}>
            Print / Save Prescription PDF
          </button>

          <button onClick={clearForm} style={secondaryButton}>
            New Patient / Clear Form
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          .prescription-print,
          .prescription-print * {
            visibility: visible !important;
          }

          .prescription-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
      />
    </div>
  );
}

const sectionStyle = {
  background: "white",
  borderRadius: "18px",
  padding: "22px",
  marginBottom: "18px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const headingStyle = {
  marginTop: 0,
  marginBottom: "18px",
  fontSize: "22px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  marginBottom: "7px",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccd8d5",
  fontSize: "15px",
  outline: "none",
};

const primaryButton = {
  border: "none",
  background: "#176b61",
  color: "white",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
  marginTop: "16px",
};

const secondaryButton = {
  border: "1px solid #176b61",
  background: "white",
  color: "#176b61",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
  marginTop: "16px",
};

const dangerButton = {
  border: "none",
  background: "#f5dddd",
  color: "#8f2d2d",
  padding: "7px 10px",
  borderRadius: "8px",
  cursor: "pointer",
};

const tableHeaderStyle = {
  textAlign: "left" as const,
  padding: "11px",
  borderBottom: "1px solid #dbe4e2",
  background: "#edf4f2",
};

const tableCellStyle = {
  padding: "11px",
  borderBottom: "1px solid #e6ecea",
};