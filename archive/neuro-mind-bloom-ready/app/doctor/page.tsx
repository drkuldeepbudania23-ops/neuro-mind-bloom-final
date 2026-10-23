"use client";

import { useMemo, useState } from "react";

type Section =
  | "dashboard"
  | "patient"
  | "prescription"
  | "followup"
  | "payment"
  | "preview";

export default function DoctorPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [section, setSection] = useState<Section>("dashboard");

  const [appointmentId, setAppointmentId] = useState(
    `NMB-${Date.now().toString().slice(-6)}`
  );

  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [chiefComplaints, setChiefComplaints] = useState("");
  const [history, setHistory] = useState("");
  const [mse, setMse] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [advice, setAdvice] = useState("");

  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpAdvice, setFollowUpAdvice] = useState("");

  const [consultationFee, setConsultationFee] = useState("500");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [transactionId, setTransactionId] = useState("");
  const [paymentNote, setPaymentNote] = useState("");

  const today = useMemo(
    () => new Date().toLocaleDateString("en-IN"),
    []
  );

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (
      doctorEmail.trim().toLowerCase() ===
        "drkuldeepbudania23@gmail.com" &&
      accessCode.trim().length >= 4
    ) {
      setLoggedIn(true);
    } else {
      alert("Doctor email / access code check karein.");
    }
  }

  function newPatient() {
    setAppointmentId(`NMB-${Date.now().toString().slice(-6)}`);
    setPatientName("");
    setMobile("");
    setAge("");
    setGender("");
    setAddress("");
    setChiefComplaints("");
    setHistory("");
    setMse("");
    setDiagnosis("");
    setMedicines("");
    setInvestigations("");
    setAdvice("");
    setFollowUpDate("");
    setFollowUpAdvice("");
    setConsultationFee("500");
    setPaymentMode("UPI");
    setPaymentStatus("Pending");
    setTransactionId("");
    setPaymentNote("");
    setSection("patient");
  }

  function printPrescription() {
    setSection("preview");
    setTimeout(() => window.print(), 200);
  }

  const card: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 8px 28px rgba(15,23,42,0.06)",
  };

  const button: React.CSSProperties = {
    background: "#0f766e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
  };

  const outlineButton: React.CSSProperties = {
    ...button,
    background: "#ffffff",
    color: "#0f766e",
    border: "1px solid #0f766e",
  };

  const input: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px",
    marginTop: "6px",
    marginBottom: "15px",
    background: "#ffffff",
  };

  const textarea: React.CSSProperties = {
    ...input,
    minHeight: "100px",
    resize: "vertical",
  };

  if (!loggedIn) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          background:
            "linear-gradient(135deg,#ecfdf5 0%,#f8fafc 55%,#ecfeff 100%)",
        }}
      >
        <div style={{ ...card, width: "100%", maxWidth: "430px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                width: "62px",
                height: "62px",
                borderRadius: "50%",
                margin: "0 auto 14px",
                background: "#0f766e",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "28px",
              }}
            >
              N
            </div>

            <h1 style={{ marginBottom: "4px", color: "#134e4a" }}>
              Neuro Mind Bloom
            </h1>

            <p style={{ marginTop: 0, color: "#64748b" }}>
              Doctor Portal
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <label>
              <strong>Doctor Email</strong>
            </label>

            <input
              type="email"
              style={input}
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
              placeholder="Doctor email"
              required
            />

            <label>
              <strong>Access Code</strong>
            </label>

            <input
              type="password"
              style={input}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter access code"
              required
            />

            <button type="submit" style={{ ...button, width: "100%" }}>
              Doctor Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Confidential Doctor Access
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          #prescription-print,
          #prescription-print * {
            visibility: visible !important;
          }

          #prescription-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
            border: none !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <header
          className="no-print"
          style={{
            background: "#134e4a",
            color: "#ffffff",
            padding: "18px 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Neuro Mind Bloom</h2>
            <small>Doctor Portal • Dr. Kuldeep Budania</small>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={{
                ...outlineButton,
                background: "transparent",
                color: "#ffffff",
                borderColor: "#ffffff",
              }}
              onClick={newPatient}
            >
              + New Patient
            </button>

            <button
              style={outlineButton}
              onClick={() => setLoggedIn(false)}
            >
              Logout
            </button>
          </div>
        </header>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "25px",
          }}
        >
          <div className="no-print">
            <h1 style={{ color: "#134e4a", marginBottom: "4px" }}>
              Doctor Dashboard
            </h1>

            <p style={{ marginTop: 0, color: "#64748b" }}>
              Dr. Kuldeep Budania • MD Psychiatry
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                margin: "24px 0",
              }}
            >
              <button style={button} onClick={() => setSection("dashboard")}>
                Dashboard
              </button>

              <button style={button} onClick={() => setSection("patient")}>
                Patient
              </button>

              <button
                style={button}
                onClick={() => setSection("prescription")}
              >
                E-Prescription
              </button>

              <button style={button} onClick={() => setSection("followup")}>
                Follow-up
              </button>

              <button style={button} onClick={() => setSection("payment")}>
                Payment
              </button>

              <button
                style={outlineButton}
                onClick={() => setSection("preview")}
              >
                Preview
              </button>
            </div>
          </div>

          {section === "dashboard" && (
            <div
              className="no-print"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "18px",
              }}
            >
              <div style={card}>
                <h3>Patient Registration</h3>
                <p style={{ color: "#64748b" }}>
                  Patient details aur appointment ID.
                </p>
                <button style={button} onClick={() => setSection("patient")}>
                  Open
                </button>
              </div>

              <div style={card}>
                <h3>E-Prescription</h3>
                <p style={{ color: "#64748b" }}>
                  Diagnosis, medicines aur advice.
                </p>
                <button
                  style={button}
                  onClick={() => setSection("prescription")}
                >
                  Create
                </button>
              </div>

              <div style={card}>
                <h3>Follow-up</h3>
                <p style={{ color: "#64748b" }}>
                  Next review schedule karein.
                </p>
                <button
                  style={button}
                  onClick={() => setSection("followup")}
                >
                  Manage
                </button>
              </div>

              <div style={card}>
                <h3>Payment</h3>
                <p>
                  Fee: <strong>₹{consultationFee}</strong>
                </p>
                <p>
                  Status: <strong>{paymentStatus}</strong>
                </p>
                <button
                  style={button}
                  onClick={() => setSection("payment")}
                >
                  Payment
                </button>
              </div>
            </div>
          )}

          {section === "patient" && (
            <section className="no-print" style={card}>
              <h2>Patient & Appointment Details</h2>

              <label>
                <strong>Appointment ID</strong>
              </label>
              <input
                style={input}
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
              />

              <label>
                <strong>Patient Name</strong>
              </label>
              <input
                style={input}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name"
              />

              <label>
                <strong>Mobile Number</strong>
              </label>
              <input
                style={input}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile number"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: "15px",
                }}
              >
                <div>
                  <label>
                    <strong>Age</strong>
                  </label>
                  <input
                    style={input}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label>
                    <strong>Gender</strong>
                  </label>
                  <select
                    style={input}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <label>
                <strong>Address</strong>
              </label>
              <textarea
                style={textarea}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />

              <button
                style={button}
                onClick={() => setSection("prescription")}
              >
                Proceed to Prescription →
              </button>
            </section>
          )}

          {section === "prescription" && (
            <section className="no-print" style={card}>
              <h2>E-Prescription</h2>

              <div
                style={{
                  background: "#f0fdfa",
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "18px",
                }}
              >
                <strong>{patientName || "Patient not entered"}</strong>
                <div>Appointment: {appointmentId}</div>
                <div>Mobile: {mobile || "-"}</div>
              </div>

              <label>
                <strong>Chief Complaints</strong>
              </label>
              <textarea
                style={textarea}
                value={chiefComplaints}
                onChange={(e) => setChiefComplaints(e.target.value)}
                placeholder="Chief complaints"
              />

              <label>
                <strong>Relevant History</strong>
              </label>
              <textarea
                style={textarea}
                value={history}
                onChange={(e) => setHistory(e.target.value)}
                placeholder="History / clinical details"
              />

              <label>
                <strong>Mental Status / Examination</strong>
              </label>
              <textarea
                style={textarea}
                value={mse}
                onChange={(e) => setMse(e.target.value)}
                placeholder="MSE / examination"
              />

              <label>
                <strong>Diagnosis / Clinical Impression</strong>
              </label>
              <textarea
                style={textarea}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
              />

              <label>
                <strong>Rx / Medicines</strong>
              </label>
              <textarea
                style={{ ...textarea, minHeight: "180px" }}
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                placeholder={
                  "Example:\nTab. Medicine 10 mg - 1 tablet at night - 10 days"
                }
              />

              <label>
                <strong>Investigations</strong>
              </label>
              <textarea
                style={textarea}
                value={investigations}
                onChange={(e) => setInvestigations(e.target.value)}
                placeholder="Investigations if required"
              />

              <label>
                <strong>Advice</strong>
              </label>
              <textarea
                style={textarea}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="Advice / precautions / lifestyle"
              />

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  style={button}
                  onClick={() => setSection("followup")}
                >
                  Follow-up →
                </button>

                <button
                  style={outlineButton}
                  onClick={() => setSection("preview")}
                >
                  Preview Prescription
                </button>
              </div>
            </section>
          )}

          {section === "followup" && (
            <section className="no-print" style={card}>
              <h2>Follow-up</h2>

              <label>
                <strong>Follow-up Date</strong>
              </label>
              <input
                type="date"
                style={input}
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
              />

              <label>
                <strong>Follow-up Advice</strong>
              </label>
              <textarea
                style={textarea}
                value={followUpAdvice}
                onChange={(e) => setFollowUpAdvice(e.target.value)}
                placeholder="Review instructions"
              />

              <button
                style={button}
                onClick={() => setSection("payment")}
              >
                Proceed to Payment →
              </button>
            </section>
          )}

          {section === "payment" && (
            <section className="no-print" style={card}>
              <h2>Consultation Payment</h2>

              <label>
                <strong>Consultation Fee ₹</strong>
              </label>
              <input
                style={input}
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
              />

              <label>
                <strong>Payment Mode</strong>
              </label>
              <select
                style={input}
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Card</option>
                <option>Other</option>
              </select>

              <label>
                <strong>Payment Status</strong>
              </label>
              <select
                style={input}
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Paid</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>

              <label>
                <strong>Transaction / UTR / Reference ID</strong>
              </label>
              <input
                style={input}
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Transaction ID"
              />

              <label>
                <strong>Payment Note</strong>
              </label>
              <textarea
                style={textarea}
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Optional note"
              />

              <div
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "18px",
                  background:
                    paymentStatus === "Paid"
                      ? "#dcfce7"
                      : paymentStatus === "Pending"
                      ? "#fef3c7"
                      : "#fee2e2",
                }}
              >
                Payment Status: <strong>{paymentStatus}</strong>
                <br />
                Amount: <strong>₹{consultationFee || "0"}</strong>
              </div>

              <button
                style={button}
                onClick={() => setSection("preview")}
              >
                Final Prescription →
              </button>
            </section>
          )}

          {section === "preview" && (
            <div>
              <section
                id="prescription-print"
                style={{
                  ...card,
                  maxWidth: "850px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    borderBottom: "2px solid #0f766e",
                    paddingBottom: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <h1 style={{ margin: 0, color: "#0f766e" }}>
                    Neuro Mind Bloom
                  </h1>

                  <h2 style={{ margin: "10px 0 4px" }}>
                    Dr. Kuldeep Budania
                  </h2>

                  <strong>MD Psychiatry</strong>

                  <div style={{ color: "#475569", marginTop: "5px" }}>
                    Mental Health • De-addiction • Sexual Disorders
                  </div>

                  <div
                    style={{
                      color: "#0f766e",
                      fontWeight: 700,
                      marginTop: "7px",
                    }}
                  >
                    E-PRESCRIPTION
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "8px",
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <strong>Patient:</strong> {patientName || "-"}
                  </div>
                  <div>
                    <strong>Age:</strong> {age || "-"}
                  </div>
                  <div>
                    <strong>Gender:</strong> {gender || "-"}
                  </div>
                  <div>
                    <strong>Mobile:</strong> {mobile || "-"}
                  </div>
                  <div>
                    <strong>Appointment ID:</strong> {appointmentId}
                  </div>
                  <div>
                    <strong>Date:</strong> {today}
                  </div>
                </div>

                {chiefComplaints && (
                  <PrescriptionBlock
                    title="Chief Complaints"
                    value={chiefComplaints}
                  />
                )}

                {history && (
                  <PrescriptionBlock title="History" value={history} />
                )}

                {mse && (
                  <PrescriptionBlock
                    title="Examination / MSE"
                    value={mse}
                  />
                )}

                <PrescriptionBlock
                  title="Diagnosis / Clinical Impression"
                  value={diagnosis || "-"}
                />

                <PrescriptionBlock
                  title="Rx / Medicines"
                  value={medicines || "-"}
                  large
                />

                {investigations && (
                  <PrescriptionBlock
                    title="Investigations"
                    value={investigations}
                  />
                )}

                <PrescriptionBlock
                  title="Advice"
                  value={advice || "-"}
                />

                <PrescriptionBlock
                  title="Follow-up"
                  value={
                    [
                      followUpDate ? `Date: ${followUpDate}` : "",
                      followUpAdvice,
                    ]
                      .filter(Boolean)
                      .join("\n") || "-"
                  }
                />

                <div
                  style={{
                    marginTop: "24px",
                    padding: "15px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                  }}
                >
                  <strong>Consultation Payment</strong>
                  <div>Fee: ₹{consultationFee}</div>
                  <div>Status: {paymentStatus}</div>
                  <div>Mode: {paymentMode}</div>

                  {transactionId && (
                    <div>Transaction ID: {transactionId}</div>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "40px",
                    textAlign: "right",
                    borderTop: "1px solid #cbd5e1",
                    paddingTop: "20px",
                  }}
                >
                  <strong>Dr. Kuldeep Budania</strong>
                  <br />
                  MD Psychiatry
                </div>
              </section>

              <div
                className="no-print"
                style={{
                  maxWidth: "850px",
                  margin: "20px auto",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button style={button} onClick={printPrescription}>
                  Print / Save PDF
                </button>

                <button
                  style={outlineButton}
                  onClick={() => setSection("prescription")}
                >
                  Edit Prescription
                </button>

                <button style={outlineButton} onClick={newPatient}>
                  New Patient
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function PrescriptionBlock({
  title,
  value,
  large = false,
}: {
  title: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div
        style={{
          fontWeight: 700,
          color: "#134e4a",
          marginBottom: "7px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
          minHeight: large ? "90px" : "auto",
          borderLeft: "3px solid #ccfbf1",
          paddingLeft: "12px",
        }}
      >
        {value}
      </div>
    </div>
  );
}