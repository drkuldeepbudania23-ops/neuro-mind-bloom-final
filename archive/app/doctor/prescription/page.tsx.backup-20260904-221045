"use client";

import { useEffect, useMemo, useState } from "react";
import { medicines } from "../../../data/medicines";
import { auth } from "../../../lib/firebase";
type RxItem = {
  generic: string;
  brand: string;
  strength: string;
  dose: string;
  frequency: string;
  timing: string;
  food: string;
  duration: string;
  instruction: string;
};

type SavedPrescription = {
  id: string;
  date: string;
  patientName: string;
  age: string;
  sex: string;
  mobile: string;
  diagnosis: string;
  complaints: string;
  history: string;
  vitals: string;
  rx: RxItem[];
  investigations: string;
  advice: string;
  followUp: string;
  signedAt?: string;
  prescriptionId?: string;
  isTeleconsultation?: boolean;
};

const blankRx = (): RxItem => ({
  generic: "",
  brand: "",
  strength: "",
  dose: "1 tablet",
  frequency: "OD",
  timing: "Night",
  food: "After food",
  duration: "30 days",
  instruction: "",
});

export default function PrescriptionPage() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [mobile, setMobile] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [complaints, setComplaints] = useState("");
  const [history, setHistory] = useState("");
  const [vitals, setVitals] = useState("");
  const [search, setSearch] = useState("");
  const [rx, setRx] = useState<RxItem[]>([]);
  const [investigations, setInvestigations] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [esignPin, setEsignPin] = useState("");
  const [pinBusy, setPinBusy] = useState(false);
  const [signedAt, setSignedAt] = useState("");
  const [prescriptionId, setPrescriptionId] = useState("");
  const [signedSnapshot, setSignedSnapshot] = useState("");
  const [isTeleconsultation, setIsTeleconsultation] = useState(false);

  const prescriptionSnapshot = useMemo(
    () =>
      JSON.stringify({
        patientName,
        age,
        sex,
        mobile,
        diagnosis,
        complaints,
        history,
        vitals,
        rx,
        investigations,
        advice,
        followUp,
      }),
    [
      patientName, age, sex, mobile, diagnosis, complaints, history, vitals,
      rx, investigations, advice, followUp,
    ]
  );

  const isESigned =
    signedSnapshot !== "" && signedSnapshot === prescriptionSnapshot;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = (params.get("type") || params.get("mode") || params.get("consultation") || "").toLowerCase();
    const tele =
      params.get("teleconsultation") === "1" ||
      type === "video" ||
      type === "teleconsultation" ||
      Boolean(params.get("appointmentId"));
    setIsTeleconsultation(tele);
  }, []);

  async function verifyPinAndESign() {
    if (!patientName.trim()) {
      alert("Please enter patient name before e-signing.");
      return;
    }

    if (!auth.currentUser) {
      alert("Doctor login is required before e-signing.");
      return;
    }

    if (!/^\d{8}$/.test(esignPin.trim())) {
      alert("Please enter your 8-digit E-Sign PIN.");
      return;
    }

    try {
      setPinBusy(true);

      const response = await fetch("/api/esign/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: esignPin.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        alert(data?.error || "Incorrect E-Sign PIN.");
        return;
      }

      const now = new Date();
      const pid =
        "NMB-" +
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        String(now.getTime()).slice(-8);

      setSignedAt(now.toLocaleString());
      setPrescriptionId(pid);
      setSignedSnapshot(prescriptionSnapshot);
      setEsignPin("");

      alert("Prescription electronically signed successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to verify E-Sign PIN.");
    } finally {
      setPinBusy(false);
    }
  }

  function handlePrint() {
    if (!isESigned) {
      alert("Please verify E-Sign PIN before Print / PDF.");
      return;
    }
    window.print();
  }

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    const found: Array<{
      medicine: (typeof medicines)[number];
      matchedBrand?: string;
      score: number;
    }> = [];

    for (const medicine of medicines) {
      const generic = medicine.generic.toLowerCase();
      const category = medicine.category.toLowerCase();
      const strengths = (medicine.strengths || []).join(" ").toLowerCase();

      if (generic.includes(q) || category.includes(q) || strengths.includes(q)) {
        const score = generic === q ? 0 : generic.startsWith(q) ? 1 : 4;
        found.push({ medicine, score });
      }

      for (const brand of medicine.brands || []) {
        const b = brand.toLowerCase();
        if (b.includes(q)) {
          const score = b === q ? 0 : b.startsWith(q) ? 1 : 3;
          found.push({ medicine, matchedBrand: brand, score });
        }
      }
    }

    return found
      .sort((a, b) => a.score - b.score || a.medicine.generic.localeCompare(b.medicine.generic))
      .slice(0, 60);
  }, [search]);

  function addMedicine(
    m: (typeof medicines)[number],
    selectedBrand?: string
  ) {
    setRx((old) => [
      ...old,
      {
        generic: m.generic,
        brand: selectedBrand || m.brands?.[0] || "",
        strength: m.strengths?.[0] || "",
        dose: "1 tablet",
        frequency: "OD",
        timing: "Night",
        food: "After food",
        duration: "30 days",
        instruction: "",
      },
    ]);
    setSearch("");
  }

  function addCustomMedicine() {
    setRx((old) => [...old, blankRx()]);
    setSearch("");
  }

  function updateRx(index: number, key: keyof RxItem, value: string) {
    setRx((old) =>
      old.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  }

  function removeRx(index: number) {
    setRx((old) => old.filter((_, i) => i !== index));
  }

  function savePrescription() {
    if (!patientName.trim()) {
      alert("Please enter patient name.");
      return;
    }

    const record: SavedPrescription = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      patientName,
      age,
      sex,
      mobile,
      diagnosis,
      complaints,
      history,
      vitals,
      rx,
      investigations,
      advice,
      followUp,
      signedAt: isESigned ? signedAt : undefined,
      prescriptionId: isESigned ? prescriptionId : undefined,
      isTeleconsultation,
    };

    const old = JSON.parse(
      localStorage.getItem("nmb_prescriptions") || "[]"
    );

    localStorage.setItem(
      "nmb_prescriptions",
      JSON.stringify([record, ...old])
    );

    setSavedMessage("Prescription saved successfully.");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function clearForm() {
    if (!confirm("Clear current prescription?")) return;

    setPatientName("");
    setAge("");
    setSex("");
    setMobile("");
    setDiagnosis("");
    setComplaints("");
    setHistory("");
    setVitals("");
    setSearch("");
    setRx([]);
    setInvestigations("");
    setAdvice("");
    setFollowUp("");
    setSavedMessage("");
    setEsignPin("");
    setSignedAt("");
    setPrescriptionId("");
    setSignedSnapshot("");
  }

  return (
    <main style={s.page}>
      <div className="no-print" style={s.topbar}>
        <div>
          <h1 style={{ margin: 0 }}>E-Prescription</h1>
          <div style={s.sub}>
            Neuro Mind Bloom · Doctor Prescription Module
          </div>
        </div>

        <div style={s.actions}>
          <button style={s.secondary} onClick={clearForm}>
            New Prescription
          </button>
          <button style={s.primary} onClick={savePrescription}>
            Save
          </button>
          <button style={s.primary} onClick={handlePrint}>
            Print / PDF
          </button>
        </div>
      </div>

      {savedMessage && (
        <div className="no-print" style={s.success}>
          {savedMessage}
        </div>
      )}
      <section className="no-print" style={s.card}>
        <h2 style={{ marginTop: 0 }}>E-Sign Prescription</h2>
        <div style={{ color: "#475569", marginBottom: 12 }}>
          Secure doctor PIN verification — no SMS required
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            style={{ ...s.input, maxWidth: 210 }}
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={esignPin}
            placeholder="8-digit E-Sign PIN"
            onChange={(e) =>
              setEsignPin(e.target.value.replace(/\D/g, "").slice(0, 8))
            }
          />

          <button
            style={s.primary}
            onClick={verifyPinAndESign}
            disabled={pinBusy}
          >
            {pinBusy ? "Verifying..." : "Verify PIN & E-Sign"}
          </button>

          {isESigned && (
            <strong style={{ color: "#15803d" }}>Electronically Signed ✓</strong>
          )}

          {!isESigned && signedSnapshot && (
            <strong style={{ color: "#b45309" }}>
              Prescription edited — re-sign required
            </strong>
          )}
        </div>
      </section>

      <section style={s.printHeader}>
        <h2 style={{ marginBottom: 4 }}>NEURO MIND BLOOM</h2>
        <strong>Dr. Kuldeep Budania · MD Psychiatry</strong>
        <div>Mental Health · De-addiction · Sexual Disorders</div>
        {isTeleconsultation && (
          <div style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.5px" }}>
            Teleconsultation
          </div>
        )}
      </section>

      <section style={s.card}>
        <h2>Patient Details</h2>

        <div style={s.grid4}>
          <Field label="Patient Name">
            <input
              style={s.input}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </Field>

          <Field label="Age">
            <input
              style={s.input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Field>

          <Field label="Sex">
            <select
              style={s.input}
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Mobile">
            <input
              style={s.input}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Diagnosis">
          <input
            style={s.input}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Diagnosis / provisional diagnosis"
          />
        </Field>

        <div style={s.grid2}>
          <Field label="Chief Complaints">
            <textarea
              style={s.textarea}
              value={complaints}
              onChange={(e) => setComplaints(e.target.value)}
            />
          </Field>

          <Field label="Relevant History / Examination">
            <textarea
              style={s.textarea}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Vitals / Clinical Notes">
          <input
            style={s.input}
            value={vitals}
            onChange={(e) => setVitals(e.target.value)}
            placeholder="BP, pulse, weight, relevant examination..."
          />
        </Field>
      </section>

      <section className="no-print" style={s.card}>
        <h2>Medicine Search</h2>

        <div style={s.searchRow}>
          <input
            style={s.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search generic, brand, strength or category..."
          />

          <button style={s.secondary} onClick={addCustomMedicine}>
            + Custom Medicine
          </button>
        </div>

        {search && (
          <div style={s.results}>
            {results.length > 0 ? (
              results.map(({ medicine: m, matchedBrand }, index) => (
                <button
                  key={`${m.generic}-${matchedBrand || "generic"}-${index}`}
                  style={s.med}
                  onClick={() => addMedicine(m, matchedBrand)}
                >
                  <strong>{matchedBrand || m.generic}</strong>
                  {matchedBrand && <span>Salt: {m.generic}</span>}
                  <span>{m.category}</span>

                  {!matchedBrand && !!m.brands?.length && (
                    <small>Brands: {m.brands.join(", ")}</small>
                  )}

                  {!!m.strengths?.length && (
                    <small>
                      Strengths: {m.strengths.join(", ")}
                    </small>
                  )}
                </button>
              ))
            ) : (
              <div style={s.empty}>
                No exact medicine found. Use “Custom Medicine”.
              </div>
            )}
          </div>
        )}
      </section>

      <section style={s.card}>
        <h2>Rx</h2>

        {rx.length === 0 && (
          <div style={s.empty}>No medicine added yet.</div>
        )}

        {rx.map((item, index) => (
          <div key={index} style={s.rxCard}>
            <div style={s.rxTop}>
              <strong>Rx {index + 1}</strong>

              <button
                className="no-print"
                style={s.remove}
                onClick={() => removeRx(index)}
              >
                Remove
              </button>
            </div>

            <div style={s.grid4}>
              <Field label="Generic">
                <input
                  style={s.input}
                  value={item.generic}
                  onChange={(e) =>
                    updateRx(index, "generic", e.target.value)
                  }
                />
              </Field>

              <Field label="Brand">
                <input
                  style={s.input}
                  value={item.brand}
                  onChange={(e) =>
                    updateRx(index, "brand", e.target.value)
                  }
                />
              </Field>

              <Field label="Strength">
                <input
                  style={s.input}
                  value={item.strength}
                  onChange={(e) =>
                    updateRx(index, "strength", e.target.value)
                  }
                />
              </Field>

              <Field label="Dose">
                <input
                  style={s.input}
                  value={item.dose}
                  onChange={(e) =>
                    updateRx(index, "dose", e.target.value)
                  }
                />
              </Field>

              <Field label="Frequency">
                <select
                  style={s.input}
                  value={item.frequency}
                  onChange={(e) =>
                    updateRx(index, "frequency", e.target.value)
                  }
                >
                  <option>OD</option>
                  <option>BD</option>
                  <option>TDS</option>
                  <option>QID</option>
                  <option>HS</option>
                  <option>SOS</option>
                  <option>STAT</option>
                  <option>1-0-0</option>
                  <option>0-1-0</option>
                  <option>0-0-1</option>
                  <option>1-0-1</option>
                  <option>1-1-1</option>
                  <option>1/2-0-1/2</option>
                </select>
              </Field>

              <Field label="Timing">
                <select
                  style={s.input}
                  value={item.timing}
                  onChange={(e) =>
                    updateRx(index, "timing", e.target.value)
                  }
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                  <option>Morning & Night</option>
                  <option>As required</option>
                </select>
              </Field>

              <Field label="Food">
                <select
                  style={s.input}
                  value={item.food}
                  onChange={(e) =>
                    updateRx(index, "food", e.target.value)
                  }
                >
                  <option>After food</option>
                  <option>Before food</option>
                  <option>With food</option>
                  <option>Irrespective of food</option>
                </select>
              </Field>

              <Field label="Duration">
                <input
                  style={s.input}
                  value={item.duration}
                  onChange={(e) =>
                    updateRx(index, "duration", e.target.value)
                  }
                />
              </Field>
            </div>

            <Field label="Special Instructions">
              <input
                style={s.input}
                value={item.instruction}
                onChange={(e) =>
                  updateRx(index, "instruction", e.target.value)
                }
                placeholder="Tapering / titration / monitoring / PRN instructions..."
              />
            </Field>
          </div>
        ))}
      </section>

      <section style={s.card}>
        <div style={s.grid2}>
          <Field label="Investigations">
            <textarea
              style={s.textarea}
              value={investigations}
              onChange={(e) => setInvestigations(e.target.value)}
              placeholder="CBC, LFT, RFT, TFT, HbA1c, ECG, lithium level..."
            />
          </Field>

          <Field label="Advice">
            <textarea
              style={s.textarea}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Sleep hygiene, abstinence, psychotherapy, exercise..."
            />
          </Field>
        </div>

        <Field label="Follow-up">
          <input
            style={s.input}
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="e.g. After 2 weeks / 15-09-2026"
          />
        </Field>
      </section>

      <section style={s.signature}>
        <div>Date: {new Date().toLocaleDateString()}</div>
        <div style={{ textAlign: "right", minWidth: 290 }}>
          {isESigned ? (
            <>
              <strong>Electronically Signed</strong><br />
              <strong>Dr. Kuldeep Budania</strong><br />
              MD Psychiatry<br />
              Registration No. 30526<br />
              <span style={{ fontSize: 11 }}>Date/Time: {signedAt}</span><br />
              <span style={{ fontSize: 11 }}>Prescription ID: {prescriptionId}</span>
            </>
          ) : (
            <span className="no-print" style={{ color: "#b45309", fontWeight: 700 }}>
              Not electronically signed
            </span>
          )}
        </div>
      </section>

      <div style={s.medicoLegalWarning}>
        NOT VALID FOR MEDICOLEGAL PURPOSE
      </div>

      <div className="no-print" style={s.warning}>
        Verify indication, dose, interactions, allergies, pregnancy status,
        renal/hepatic function and current prescribing information before
        issuing the prescription.
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: white !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={s.field}>
      <span style={s.label}>{label}</span>
      {children}
    </label>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1150,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },

  sub: {
    color: "#64748b",
    marginTop: 4,
  },

  actions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  printHeader: {
    textAlign: "center",
    marginBottom: 18,
    borderBottom: "2px solid #176b87",
    paddingBottom: 12,
  },

  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    background: "#fff",
  },

  field: {
    display: "grid",
    gap: 5,
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: 700,
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "10px 11px",
    background: "#fff",
  },

  textarea: {
    width: "100%",
    minHeight: 90,
    resize: "vertical",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: 10,
  },

  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 10,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 12,
  },

  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 10,
  },

  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: 8,
    maxHeight: 420,
    overflowY: "auto",
    marginTop: 12,
  },

  med: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    border: "1px solid #dbe3ea",
    borderRadius: 9,
    padding: 10,
    background: "#f8fafc",
    cursor: "pointer",
  },

  rxCard: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: 14,
    marginTop: 14,
  },

  rxTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  primary: {
    border: 0,
    borderRadius: 9,
    background: "#176b87",
    color: "#fff",
    padding: "10px 15px",
    fontWeight: 700,
    cursor: "pointer",
  },

  secondary: {
    border: "1px solid #176b87",
    borderRadius: 9,
    background: "#fff",
    color: "#176b87",
    padding: "10px 15px",
    fontWeight: 700,
    cursor: "pointer",
  },

  remove: {
    border: 0,
    background: "transparent",
    color: "#b91c1c",
    cursor: "pointer",
  },

  success: {
    padding: 12,
    background: "#dcfce7",
    borderRadius: 8,
    marginBottom: 12,
  },

  empty: {
    color: "#64748b",
    padding: 12,
  },

  signature: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 20,
    padding: "24px 10px",
  },


  warning: {
    fontSize: 12,
    color: "#64748b",
    borderTop: "1px solid #ddd",
    paddingTop: 10,
  },

  medicoLegalWarning: {
    marginTop: 4,
    paddingTop: 10,
    borderTop: "1px solid #cbd5e1",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.5px",
    color: "#991b1b",
  },
};





