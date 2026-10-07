"use client";

import { useEffect, useMemo, useState } from "react";
import { medicines } from "../../../data/medicines";
import { officialBrandRows } from "../../../data/official-brand-catalogue";
import { consernBrandRows } from "../../../data/consern-brand-catalogue";
import { psychiatryBrands } from "../../../data/psychiatryBrands";
import { complaintOptions, diagnosisOptions, diagnosisLabel } from "../../data/psychiatrySearch";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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

  const [nmbPaymentClearance, setNmbPaymentClearance] =
    useState<any>(null);

  const [nmbEsignPin, setNmbEsignPin] = useState("");
  const [nmbPinVerified, setNmbPinVerified] =
    useState(false);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [mobile, setMobile] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [complaintSearch, setComplaintSearch] = useState("");
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

  const diagnosisResults = useMemo(() => {
    const q = diagnosisSearch.trim().toLowerCase();
    if (!q) return [];
    return diagnosisOptions
      .filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.icd10.toLowerCase().includes(q) ||
        item.icd11.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.includes(q))
      )
      .slice(0, 12);
  }, [diagnosisSearch]);

  const selectedDiagnosis = useMemo(
    () => diagnosisOptions.find((item) => diagnosis.includes(item.name)),
    [diagnosis]
  );

  const complaintResults = useMemo(() => {
    const q = complaintSearch.trim().toLowerCase();
    if (!q) return [];
    const selectedTags = selectedDiagnosis?.tags || [];
    return complaintOptions
      .filter((item) => {
        const textMatch =
          item.en.toLowerCase().includes(q) ||
          item.hi.includes(complaintSearch.trim()) ||
          item.tags.some((tag) => tag.includes(q));
        const diagnosisMatch =
          selectedTags.length === 0 ||
          item.tags.some((tag) => selectedTags.includes(tag));
        return textMatch && diagnosisMatch;
      })
      .slice(0, 14);
  }, [complaintSearch, selectedDiagnosis]);

  function chooseDiagnosis(item: (typeof diagnosisOptions)[number]) {
    setDiagnosis(diagnosisLabel(item));
    setDiagnosisSearch("");
  }

  function addClinicalComplaint(text: string) {
    setComplaints((old) => {
      const clean = old.trim();
      if (!clean) return text;
      if (clean.includes(text)) return old;
      return clean + "; " + text;
    });
    setComplaintSearch("");
  }

  const isESigned =
    signedSnapshot !== "" && signedSnapshot === prescriptionSnapshot;

  useEffect(() => {
    try {
      const p =
        localStorage.getItem("nmb_payment_clearance");

      if (p) {
        setNmbPaymentClearance(JSON.parse(p));
      }
    } catch {}
    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get("appointmentId") || "";
    const type = (params.get("type") || params.get("mode") || params.get("consultation") || "").toLowerCase();
    const tele =
      params.get("teleconsultation") === "1" ||
      type === "video" ||
      type === "teleconsultation" ||
      Boolean(appointmentId);
    setIsTeleconsultation(tele);

    if (!appointmentId) return;

    let active = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "appointments", appointmentId));
        if (!active || !snap.exists()) return;
        const a = snap.data() as any;
        setPatientName(String(a.patientName || a.name || ""));
        setAge(String(a.age || ""));
        setSex(String(a.gender || a.sex || ""));
        setMobile(String(a.mobile || ""));

        // Booking may contain bilingual preset complaints (Hindi / English).
        // E-prescription keeps recognized preset complaints in English only.
        const rawConcern = String(a.concern || "").trim();
        if (rawConcern) {
          const englishConcern = rawConcern
            .split(";")
            .map((part: string) => {
              const bits = part.trim().split(" / ");
              return (bits.length > 1 ? bits[bits.length - 1] : "").trim();
            })
            .filter(Boolean)
            .join("; ");
          if (englishConcern) setComplaints(englishConcern);
        }
      } catch (error) {
        console.error("Unable to prefill appointment", error);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  async function verifyPinAndESign() {
    if (!patientName.trim()) {
      alert("Please enter patient name before e-signing.");
      return;
    }
if (!/^\d{8}$/.test(esignPin.trim())) {
      alert("Please enter your 8-digit E-Sign PIN.");
      return;
    }

    try {
      setPinBusy(true);

      const bytes = new TextEncoder().encode(esignPin.trim());
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const hash = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (
        hash !==
        "a01be0a4bdae6a5d5cce15622b5ba569c927815d5419e4cbd40741b956d6e709"
      ) {
        alert("Incorrect E-Sign PIN.");
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

  function normalizeWhatsAppNumber(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return digits;
    return digits;
  }

  function handleWhatsAppPrescription() {
    if (!isESigned) {
      alert("Please verify E-Sign PIN before sending the prescription.");
      return;
    }

    const phone = normalizeWhatsAppNumber(mobile);
    if (phone.length < 10) {
      alert("Please enter a valid patient mobile number.");
      return;
    }

    // Save the current prescription before opening WhatsApp.
    savePrescription();

    const message = [
      `Hello ${patientName || "Patient"},`,
      "Your e-prescription from Neuro Mind Bloom is ready.",
      prescriptionId ? `Prescription ID: ${prescriptionId}` : "",
      "Please find the prescription PDF attached.",
      "— Neuro Mind Bloom"
    ].filter(Boolean).join("\n");

    // Browsers do not allow silently attaching a local PDF to WhatsApp.
    // This opens the patient's chat with a ready message; use Print / PDF
    // first to save the prescription, then attach that PDF in WhatsApp.
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const psychBrandResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return psychiatryBrands
      .filter((item) =>
        item.brand.toLowerCase().includes(q) ||
        item.generic.toLowerCase().includes(q) ||
        item.strength.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const ab = a.brand.toLowerCase();
        const bb = b.brand.toLowerCase();
        const ag = a.generic.toLowerCase();
        const bg = b.generic.toLowerCase();
        const as = ab === q ? 0 : ab.startsWith(q) ? 1 : ag === q ? 2 : ag.startsWith(q) ? 3 : 4;
        const bs = bb === q ? 0 : bb.startsWith(q) ? 1 : bg === q ? 2 : bg.startsWith(q) ? 3 : 4;
        return as - bs || a.brand.localeCompare(b.brand);
      })
      .slice(0, 80);
  }, [search]);

  function addPsychBrand(item: (typeof psychiatryBrands)[number]) {
    setRx((old) => [
      ...old,
      {
        generic: item.generic,
        brand: item.brand,
        strength: item.strength,
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

  const results = useMemo(() => {
    const officialMedicines: any[] = officialBrandRows.map((r: any) => ({
      generic: r.generic,
      category: r.category || "Other",
      strengths: r.strength ? [r.strength] : [""],
      brands: [r.brand],
      brandDetails: [{
        name: r.brand,
        company: r.company,
        strength: r.strength,
        form: r.form
      }],
      form: r.form || "",
      company: r.company || ""
    }));

    const consernMedicines: any[] = consernBrandRows.map((r: any) => ({
      generic:r.generic, category:r.category || "Other",
      strengths:r.strength ? [r.strength] : [""],
      brands:[r.brand],
      brandDetails:[{name:r.brand,company:r.company,strength:r.strength,form:r.form}],
      form:r.form || "", company:r.company
    }));

    const searchableMedicines: any[] = [...medicines, ...officialMedicines, ...consernMedicines];

    const q = search.trim().toLowerCase();

    if (!q) return [];

    const brandRows: any[] = [];

    searchableMedicines.forEach((m: any) => {

      const details =
        Array.isArray(m.brandDetails) &&
        m.brandDetails.length > 0

          ? m.brandDetails

          : (m.brands || []).map((brand: string) => ({
              name: brand,
              company: "",
              strength: "",
              form: m.form || "",
            }));


      details.forEach((b: any) => {

        const strengths =
          b.strength

            ? [b.strength]

            : Array.isArray(m.strengths) &&
              m.strengths.length > 0

              ? m.strengths

              : [""];


        strengths.forEach((strength: string) => {

          const company = b.company || "";

          const form =
            b.form ||
            m.form ||
            "";

          /*
             IMPORTANT:

             Keep old structure so existing addMedicine()
             continues working unchanged.

             brands[0]    = selected brand
             strengths[0] = selected strength
          */

          const row = {
            ...m,

            brands: [
              b.name || ""
            ],

            strengths: [
              strength || ""
            ],

            selectedBrand:
              b.name || "",

            selectedCompany:
              company,

            selectedStrength:
              strength || "",

            selectedForm:
              form,

            company:
              company,

            form:
              form
          };


          const searchable = [

            m.generic || "",

            m.category || "",

            b.name || "",

            company,

            strength || "",

            form

          ]
            .join(" ")
            .toLowerCase();


          if (searchable.includes(q)) {

            brandRows.push(row);

          }

        });

      });

    });


    const unique = Array.from(

      new Map(

        brandRows.map((m: any) => [

          [

            m.generic,

            m.brands?.[0],

            m.strengths?.[0],

            m.selectedCompany,

            m.selectedForm

          ]

            .join("|")

            .toLowerCase(),

          m

        ])

      ).values()

    );


    return unique

      .sort((a: any,b: any) =>

        `${a.generic} ${a.brands?.[0] || ""} ${a.strengths?.[0] || ""}`

          .localeCompare(

            `${b.generic} ${b.brands?.[0] || ""} ${b.strengths?.[0] || ""}`

          )

      )

      .slice(0,300);

  }, [search]);

  function addMedicine(
    m: (typeof medicines)[number],
    selectedBrand?: string
  ) {
    setRx((old) => [
      ...old,
      {
        generic: m.generic,
        brand: selectedBrand || m.brands?.[0] || m.generic,
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
      {!nmbPaymentClearance && (
        <div
          className="no-print"
          style={{
            padding: 16,
            marginBottom: 16,
            border: "1px solid #f59e0b",
            borderRadius: 12,
            background: "#fffbeb"
          }}
        >
          <b>Payment clearance required before E-Prescription.</b>

          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/doctor/payment?next=/doctor/prescription";
              }}
              style={{
                padding: "10px 16px",
                border: 0,
                borderRadius: 8,
                background: "#176b87",
                color: "#fff",
                fontWeight: 700
              }}
            >
              Payment / Discount / Exempt
            </button>
          </div>
        </div>
      )}

      {nmbPaymentClearance && (
        <div
          className="no-print"
          style={{
            padding: 12,
            marginBottom: 16,
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            background: "#f0fdf4"
          }}
        >
          <b>Payment Clearance:</b>{" "}
          {nmbPaymentClearance.status}
          {" | ₹"}
          {nmbPaymentClearance.finalAmount}

          {nmbPaymentClearance.reason
            ? " | " + nmbPaymentClearance.reason
            : ""}
        </div>
      )}

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
          <button style={s.primary} onClick={handleWhatsAppPrescription}>
            Send on WhatsApp
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

        <div className="no-print" style={{ marginBottom: 12 }}>
          <Field label="Diagnosis Search — ICD-10 / ICD-11 / clinical keywords">
            <input
              style={s.input}
              value={diagnosisSearch}
              onChange={(e) => setDiagnosisSearch(e.target.value)}
              placeholder="e.g. depression, F32, 6A70, panic, OCD..."
            />
          </Field>

          {diagnosisResults.length > 0 && (
            <div style={s.results}>
              {diagnosisResults.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  style={s.med}
                  onClick={() => chooseDiagnosis(item)}
                >
                  <strong>{item.name}</strong>
                  <span>ICD-10: {item.icd10} | ICD-11: {item.icd11}</span>
                  <small>Clinical keywords: {item.keywords}</small>
                </button>
              ))}
            </div>
          )}

          <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>
            Clinical keywords are concise reference summaries, not verbatim textbook criteria.
          </div>
        </div>

        <div style={s.grid2}>
          <Field label="Chief Complaints">
            <div className="no-print" style={{ marginBottom: 8 }}>
              <input
                style={s.input}
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                placeholder={
                  selectedDiagnosis
                    ? "Search complaints related to selected diagnosis..."
                    : "Search complaint: sleep, worry, voices, alcohol, etc."
                }
              />

              {complaintResults.length > 0 && (
                <div style={{ ...s.results, maxHeight: 220 }}>
                  {complaintResults.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      style={s.med}
                      onClick={() => addClinicalComplaint(item.en)}
                    >
                      <strong>{item.en}</strong>
                      <span>{item.hi}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
            placeholder="Search brand or generic; psychiatry results show brand + exact strength..."
          />

          <button style={s.secondary} onClick={addCustomMedicine}>
            + Custom Medicine
          </button>
        </div>

        {search && (
          <div style={s.results}>
            {results.length > 0 ? (
              results.map((m: any, index: number) => {
                const brand = m.selectedBrand || m.brands?.[0] || m.generic;
                const strength = m.selectedStrength || m.strengths?.[0] || "";
                const company = m.selectedCompany || m.company || m.brandDetails?.[0]?.company || "";
                const form = m.selectedForm || m.form || m.brandDetails?.[0]?.form || "";
                return (
                  <button
                    key={`${m.generic}-${brand}-${strength}-${company}-${index}`}
                    style={s.med}
                    onClick={() => addMedicine(m, brand)}
                  >
                    <strong>{brand}{strength ? ` ${strength}` : ""}</strong>
                    <span>{m.generic}</span>
                    <small>{[company, form, m.category].filter(Boolean).join(" · ")}</small>
                  </button>
                );
              })
            ) : psychBrandResults.length > 0 ? (
              psychBrandResults.map((item, index) => (
                <button
                  key={`${item.brand}-${item.strength}-${index}`}
                  style={s.med}
                  onClick={() => addPsychBrand(item)}
                >
                  <strong>{item.brand} {item.strength}</strong>
                  <span>{item.generic}</span>
                  <small>{item.company} · {item.category}</small>
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
              <div className="no-print">
                <Field label="Generic (search/reference only)">
                  <input
                    style={s.input}
                    value={item.generic}
                    onChange={(e) =>
                      updateRx(index, "generic", e.target.value)
                    }
                  />
                </Field>
              </div>

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
    
      <div
        className="no-print"
        style={{
          marginTop: 18,
          padding: 16,
          border: "1px solid #cbd5e1",
          borderRadius: 12
        }}
      >
        <b>E-Sign with 8-digit E-PIN</b>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
            flexWrap: "wrap"
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            maxLength={8}
            placeholder="8-digit E-PIN"
            value={nmbEsignPin}
            onChange={(e) =>
              setNmbEsignPin(
                e.target.value.replace(/\D/g, "").slice(0, 8)
              )
            }
            style={{
              padding: 10,
              border: "1px solid #cbd5e1",
              borderRadius: 8
            }}
          />

          <button
            type="button"
            disabled={!nmbPaymentClearance}
            onClick={async () => {
              if (!/^\d{8}$/.test(nmbEsignPin)) {
                alert("8-digit E-PIN enter karein.");
                return;
              }

              const bytes =
                new TextEncoder().encode(nmbEsignPin);

              const digest =
                await crypto.subtle.digest(
                  "SHA-256",
                  bytes
                );

              const hash =
                Array.from(
                  new Uint8Array(digest)
                )
                .map((b) =>
                  b.toString(16).padStart(2, "0")
                )
                .join("");

              if (
                hash !==
                "a01be0a4bdae6a5d5cce15622b5ba569c927815d5419e4cbd40741b956d6e709"
              ) {
                setNmbPinVerified(false);
                alert("Incorrect E-PIN");
                return;
              }

              setNmbPinVerified(true);
              setNmbEsignPin("");
              alert("E-Sign verified");
            }}
            style={{
              padding: "10px 16px",
              border: 0,
              borderRadius: 8,
              background: "#176b87",
              color: "#fff",
              fontWeight: 700
            }}
          >
            Verify E-PIN
          </button>

          {nmbPinVerified && (
            <strong style={{ color: "#15803d" }}>
              Electronically Signed ✓
            </strong>
          )}
        </div>
      </div>
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









