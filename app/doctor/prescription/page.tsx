"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { medicines } from "../../../data/medicines";
import { psychiatryBrands } from "../../../data/psychiatryBrands";
import { complaintOptions, diagnosisOptions, diagnosisLabel, searchDiagnoses } from "../../data/psychiatrySearch";
import { FREQUENCY_OPTIONS, TIMING_OPTIONS, timingForFrequency } from "../../../lib/rx/frequency";
import { auth, db } from "../../../lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import EpinResetButton from "../EpinResetButton";
import PatientUhid from "../../../components/doctor/PatientUhid";
import { getOrCreatePatient, getPatient, recordVisit } from "../../../lib/client/patients";
import { logAction } from "../../../lib/client/audit";
import { customRows, displayName, searchMedicines } from "../../../lib/rx/medicineCatalogue";
import { deleteCustomMedicine, loadCustomMedicines, saveCustomMedicine, type SavedCustomMedicine } from "../../../lib/client/customMedicines";
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
  email?: string;
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
  consultationType?: "opd" | "teleconsultation";
  paymentClearance?: any;
  appointmentId?: string;
  uhid?: string;
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

function paymentClearanceFromRecord(record: any) {
  const status = String(record?.paymentStatus || "");
  if (!["Paid", "Discount", "Exempt"].includes(status)) return null;
  const details = record?.paymentDetails;
  if (!details?.confirmedBy || typeof details?.confirmedAt?.toMillis !== "function") return null;
  return {
    ...details,
    status,
    finalAmount: Number(record?.paymentDetails?.finalAmount || 0),
  };
}

export default function PrescriptionPage() {

  const [nmbPaymentClearance, setNmbPaymentClearance] =
    useState<any>(null);

  const [nmbEsignPin, setNmbEsignPin] = useState("");
  const [nmbPinVerified, setNmbPinVerified] =
    useState(false);

  const [patientName, setPatientName] = useState("");
  const [uhid, setUhid] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [complaintSearch, setComplaintSearch] = useState("");
  const [complaints, setComplaints] = useState("");
  const [history, setHistory] = useState("");
  const [vitals, setVitals] = useState("");
  const [search, setSearch] = useState("");
  const [customMeds, setCustomMeds] = useState<SavedCustomMedicine[]>([]);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newMed, setNewMed] = useState({ generic: "", brand: "", strength: "", form: "Tablet", company: "" });
  const [savingMed, setSavingMed] = useState(false);
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
  const [appointmentId, setAppointmentId] = useState("");
  const [savedPatients, setSavedPatients] = useState<SavedPrescription[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [recordsBusy, setRecordsBusy] = useState(false);

  const prescriptionSnapshot = useMemo(
    () =>
      JSON.stringify({
        patientName,
        age,
        sex,
        mobile,
        email,
        diagnosis,
        complaints,
        history,
        vitals,
        rx,
        investigations,
        advice,
        followUp,
        isTeleconsultation,
      }),
    [
      patientName, age, sex, mobile, email, diagnosis, complaints, history, vitals,
      rx, investigations, advice, followUp, isTeleconsultation,
    ]
  );

  const diagnosisResults = useMemo(() => searchDiagnoses(diagnosisSearch), [diagnosisSearch]);

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
  const lastSavedRef = useRef<{ id: string; prescriptionId: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apptId = params.get("appointmentId") || "";
    const paymentId = params.get("paymentId") || "";
    setAppointmentId(apptId);

    // Opened from a patient's history page: prefill from the UHID record.
    const uhidParam = params.get("uhid") || "";
    if (uhidParam) {
      getPatient(uhidParam)
        .then((p) => {
          if (!p) return;
          setUhid(p.uhid);
          setPatientName((v) => v || p.name || "");
          setMobile((v) => v || p.mobile || p.mobile10 || "");
          setAge((v) => v || p.age || "");
          setSex((v) => v || p.sex || "");
          setEmail((v) => v || p.email || "");
        })
        .catch(() => {});
    }

    const type = (params.get("type") || params.get("mode") || params.get("consultation") || "").toLowerCase();
    const tele =
      params.get("teleconsultation") === "1" ||
      type === "video" ||
      type === "teleconsultation";
    setIsTeleconsultation(tele);

    if (!apptId) {
      if (!paymentId) return;
      let active = true;
      getDoc(doc(db, "payments", paymentId))
        .then((snap) => {
          if (!active || !snap.exists()) return;
          const payment = snap.data() as any;
          setNmbPaymentClearance(paymentClearanceFromRecord(payment));
          setPatientName((current) => current || String(payment.patientName || ""));
        })
        .catch(() => {
          if (active) setNmbPaymentClearance(null);
        });
      return () => {
        active = false;
      };
    }

    let active = true;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "appointments", apptId));
        if (!active || !snap.exists()) return;
        const a = snap.data() as any;
        setNmbPaymentClearance(paymentClearanceFromRecord(a));
        setPatientName(String(a.patientName || a.name || ""));
        setAge(String(a.age || ""));
        setSex(String(a.gender || a.sex || ""));
        setMobile(String(a.mobile || ""));
        setEmail(String(a.email || ""));
        // Online/video bookings are teleconsultations unless the link says otherwise.
        const apptMode = String(a.mode || a.consultationMode || "").toLowerCase();
        if (!type && /online|video|tele/.test(apptMode)) setIsTeleconsultation(true);

        const rawConcern = String(a.concern || "").trim();
        if (rawConcern) {
          const englishConcern = rawConcern
            .split(";")
            .map((part: string) => {
              const bits = part.trim().split(" / ");
              return (bits.length > 1 ? bits[bits.length - 1] : part).trim();
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

  async function refreshSavedPatients() {
    setRecordsBusy(true);
    let local: SavedPrescription[] = [];
    try {
      local = JSON.parse(localStorage.getItem("nmb_prescriptions") || "[]");
    } catch {}

    try {
      const snap = await getDocs(collection(db, "patientRecords"));
      const cloud = snap.docs.map((d) => d.data() as SavedPrescription);
      const merged = [...cloud, ...local].filter(
        (item, index, arr) => arr.findIndex((x) => x.id === item.id) === index
      );
      merged.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
      setSavedPatients(merged);
    } catch {
      setSavedPatients(local);
    } finally {
      setRecordsBusy(false);
    }
  }

  function loadSavedPatient(record: SavedPrescription) {
    setPatientName(record.patientName || "");
    setUhid(record.uhid || "");
    setAge(record.age || "");
    setSex(record.sex || "");
    setMobile(record.mobile || "");
    setEmail(record.email || "");
    setDiagnosis(record.diagnosis || "");
    setComplaints(record.complaints || "");
    setHistory(record.history || "");
    setVitals(record.vitals || "");
    setRx(record.rx || []);
    setInvestigations(record.investigations || "");
    setAdvice(record.advice || "");
    setFollowUp(record.followUp || "");
    setIsTeleconsultation(
      record.consultationType
        ? record.consultationType === "teleconsultation"
        : Boolean(record.isTeleconsultation)
    );
    setNmbPaymentClearance(null);
    setAppointmentId("");
    setSignedAt("");
    setPrescriptionId("");
    setSignedSnapshot("");
    setNmbPinVerified(false);
    setSavedMessage("Patient loaded for a new follow-up visit. Payment clearance is fresh.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Real Excel (.xlsx) of ALL cloud data (records, appointments, payments, follow-ups). Falls back to CSV of this device. */
  async function exportPatientRecordsExcel() {
    try {
      const user = auth.currentUser;
      if (user) {
        const response = await fetch("/api/doctor/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: await user.getIdToken() }),
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `NeuroMindBloom-records-${new Date().toISOString().slice(0, 10)}.xlsx`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          return;
        }
      }
    } catch (error) {
      console.error("Excel export failed, using CSV of this device", error);
    }
    exportPatientRecordsCsv();
  }

  function exportPatientRecordsCsv() {
    let records: SavedPrescription[] = [];
    try {
      records = JSON.parse(localStorage.getItem("nmb_prescriptions") || "[]");
    } catch {}
    if (!records.length) {
      alert("No saved patient records found.");
      return;
    }

    const rows = records.map((r) => ({
      Date: r.date,
      "Prescription ID": r.prescriptionId || "",
      "Patient Name": r.patientName,
      Age: r.age,
      Sex: r.sex,
      Mobile: r.mobile,
      Email: r.email || "",
      Complaints: r.complaints,
      Diagnosis: r.diagnosis,
      History: r.history,
      Vitals: r.vitals,
      Medicines: (r.rx || []).map((m, i) =>
        `${i + 1}. ${m.brand || m.generic} ${m.strength} | ${m.dose} | ${m.frequency} | ${m.timing} | ${m.food} | ${m.duration}${m.instruction ? " | " + m.instruction : ""}`
      ).join(" ; "),
      Investigations: r.investigations,
      Advice: r.advice,
      "Follow-up": r.followUp,
      Consultation: r.consultationType === "teleconsultation" || r.isTeleconsultation
        ? "Teleconsultation"
        : "OPD",
      "Payment Status": r.paymentClearance?.status || "",
      "Payment Amount": r.paymentClearance?.finalAmount ?? "",
      "Appointment ID": r.appointmentId || "",
    }));

    const headers = Object.keys(rows[0]);
    const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = "\ufeff" + [
      headers.map(esc).join(","),
      ...rows.map((row: any) => headers.map((h) => esc(row[h])).join(","))
    ].join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NeuroMindBloom-Patient-Records-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }


  async function verifyPinAndESign() {
    if (!patientName.trim()) {
      alert("Please enter patient name before e-signing.");
      return;
    }
    if (!nmbPaymentClearance) {
      alert("Payment clearance is required before e-signing.");
      return;
    }
    if (!/^\d{8}$/.test(esignPin.trim())) {
      alert("Please enter your 8-digit E-Sign PIN.");
      return;
    }

    try {
      setPinBusy(true);
      const user = auth.currentUser;
      if (!user) {
        alert("Doctor login is required to verify the E-Sign PIN.");
        return;
      }
      // Give the patient a UHID first, so it is part of the signed content.
      let patientUhid = uhid;
      if (!patientUhid) {
        try {
          patientUhid = (await getOrCreatePatient({ name: patientName, mobile, age, sex, email })).uhid;
          setUhid(patientUhid);
        } catch {}
      }

      // Preferred: the server verifies the PIN, freezes the content and issues the Rx ID + time.
      const signResponse = await fetch("/api/esign/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: esignPin.trim(),
          idToken: await user.getIdToken(),
          prescription: {
            patientName, age, sex, mobile, email, diagnosis, complaints, history, vitals, rx,
            investigations, advice, followUp, isTeleconsultation, uhid: patientUhid, appointmentId,
          },
        }),
      });
      const signed = await signResponse.json().catch(() => ({}));
      if (signResponse.ok && signed.ok) {
        setSignedAt(signed.signedAt);
        setPrescriptionId(signed.prescriptionId);
        setSignedSnapshot(prescriptionSnapshot);
        setEsignPin("");
        setNmbPinVerified(true);
        alert("Prescription electronically signed successfully.");
        return;
      }
      if (signed.error !== "not-configured") {
        alert(signed.error || "Unable to e-sign.");
        return;
      }

      // Fallback while the server database key is not configured (older flow).
      const response = await fetch("/api/esign/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: esignPin.trim(),
          idToken: await user.getIdToken(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        alert(result.error || "Unable to verify E-Sign PIN.");
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
      setNmbPinVerified(true);
      alert("Prescription electronically signed successfully.");
    } catch {
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

  /** Secure 3-day PDF link from the server (null if the server is not configured yet). */
  async function getSecurePrescriptionLink(recordId: string, sendChannel?: "email" | "whatsapp") {
    try {
      const user = auth.currentUser;
      if (!user || !recordId) return null;
      const response = await fetch("/api/prescriptions/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await user.getIdToken(), recordId, send: Boolean(sendChannel), channel: sendChannel }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) return null;
      return result as { link: string; delivery?: { whatsapp: { status: string }; email: { status: string } } };
    } catch {
      return null;
    }
  }

  async function handleWhatsAppPrescription() {
    if (!isESigned) {
      alert("Please verify E-Sign PIN before sending the prescription.");
      return;
    }

    const phone = normalizeWhatsAppNumber(mobile);
    if (phone.length < 10) {
      alert("Please enter a valid patient mobile number.");
      return;
    }

    // Open the tab first (pop-up blockers), then save and fetch the secure link.
    const win = window.open("", "_blank");
    const saved = await savePrescription();
    const share = saved?.cloud ? await getSecurePrescriptionLink(saved.id) : null;

    const message = [
      `Hello ${patientName || "Patient"},`,
      "Your e-prescription from Neuro Mind Bloom is ready.",
      prescriptionId ? `Prescription ID: ${prescriptionId}` : "",
      `Consultation: ${isTeleconsultation ? "Teleconsultation" : "OPD"}`,
      share ? `Download PDF (secure link, valid 3 days):\n${share.link}` : "Please attach the PDF saved using Print / PDF.",
      "— Dr. Kuldeep Budania, Neuro Mind Bloom"
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    if (win) {
      win.opener = null;
      win.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  async function handleEmailPrescription() {
    if (!isESigned) {
      alert("Please verify E-Sign PIN before sending the prescription.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert("Please enter a valid patient email address.");
      return;
    }

    const saved = await savePrescription();
    // Preferred: the server emails the patient with the PDF attached.
    const share = saved?.cloud ? await getSecurePrescriptionLink(saved.id, "email") : null;
    if (share?.delivery?.email.status === "sent") {
      setSavedMessage(`Prescription PDF emailed to ${email.trim()}.`);
      setTimeout(() => setSavedMessage(""), 5000);
      return;
    }

    const subject = `E-prescription from Neuro Mind Bloom${prescriptionId ? ` - ${prescriptionId}` : ""}`;
    const body = [
      `Hello ${patientName || "Patient"},`,
      "",
      "Your e-prescription from Neuro Mind Bloom is ready.",
      prescriptionId ? `Prescription ID: ${prescriptionId}` : "",
      `Consultation: ${isTeleconsultation ? "Teleconsultation" : "OPD"}`,
      "",
      share ? `Download PDF (secure link, valid 3 days): ${share.link}` : "Please attach the PDF saved using Print / PDF before sending this email.",
      "",
      "Regards,",
      "Dr. Kuldeep Budania",
      "Neuro Mind Bloom",
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:${email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  useEffect(() => {
    loadCustomMedicines().then(setCustomMeds).catch(() => undefined);
  }, []);

  // Ranked search over: psychiatry pack list, core A–Z list, extra brands, official catalogues
  // and brands added by the doctor. Row shape kept compatible with addMedicine().
  const results = useMemo(() => {
    if (!search.trim()) return [];
    return searchMedicines(search, customRows(customMeds)).map((r) => ({
      generic: r.generic,
      category: r.category,
      brands: [r.brand || r.generic],
      strengths: [r.strength],
      selectedBrand: r.brand || r.generic,
      selectedStrength: r.strength,
      selectedCompany: r.company,
      selectedForm: r.form,
      company: r.company,
      form: r.form,
      label: displayName(r),
      source: r.source,
      verify: r.verify,
    }));
  }, [search, customMeds]);

  async function addBrandToList() {
    if (!newMed.generic.trim() && !newMed.brand.trim()) {
      alert("Enter at least a generic or brand name.");
      return;
    }
    setSavingMed(true);
    try {
      const saved = await saveCustomMedicine(newMed);
      setCustomMeds((old) => [saved, ...old]);
      logAction("medicine.brand.add", { brand: saved.brand, generic: saved.generic });
      setNewMed({ generic: "", brand: "", strength: "", form: "Tablet", company: "" });
    } catch (error: any) {
      alert(error?.message || "Could not save the brand.");
    } finally {
      setSavingMed(false);
    }
  }

  async function removeBrandFromList(id: string) {
    if (!window.confirm("Remove this brand from your medicine list?")) return;
    try {
      await deleteCustomMedicine(id);
      setCustomMeds((old) => old.filter((m) => m.id !== id));
    } catch {
      alert("Could not remove the brand.");
    }
  }

  function addMedicine(
    m: (typeof medicines)[number],
    selectedBrand?: string
  ) {
    const brand = selectedBrand || m.brands?.[0] || m.generic;
    const key = (r: { generic?: string; brand?: string }) =>
      `${(r.generic || "").trim().toLowerCase()}|${(r.brand || "").trim().toLowerCase()}`;
    const newKey = key({ generic: m.generic, brand });
    if (rx.some((r) => key(r) === newKey)) {
      alert(`${brand} is already in this prescription.`);
      setSearch("");
      return;
    }
    const row = {
      generic: m.generic,
      brand,
      strength: m.strengths?.[0] || "",
      dose: "1 tablet",
      frequency: "OD",
      timing: "Night",
      food: "After food",
      duration: "30 days",
      instruction: "",
    };
    setRx((old) => {
      // Fill the empty starter row instead of leaving a blank line above the medicine.
      const isBlank = (r: RxItem) => !(r.generic || "").trim() && !(r.brand || "").trim();
      const kept = old.length > 0 && isBlank(old[old.length - 1]) ? old.slice(0, -1) : old;
      return [...kept, row];
    });
    setSearch("");
  }

  function addCustomMedicine() {
    setRx((old) => [...old, blankRx()]);
    setSearch("");
  }

  function updateRx(index: number, key: keyof RxItem, value: string) {
    setRx((old) =>
      old.map((item, i) => {
        if (i !== index) return item;
        const next = { ...item, [key]: value };
        // Changing the frequency (TDS, 8 hourly, BD…) also sets a matching timing.
        if (key === "frequency") {
          const t = timingForFrequency(value);
          if (t) next.timing = t;
        }
        return next;
      })
    );
  }

  function removeRx(index: number) {
    setRx((old) => old.filter((_, i) => i !== index));
  }

  async function savePrescription(): Promise<{ id: string; cloud: boolean } | undefined> {
    if (!patientName.trim()) {
      alert("Please enter patient name.");
      return;
    }

    // Saving the same signed prescription again (e.g. WhatsApp then Email)
    // updates one record instead of creating duplicates.
    const reuse =
      isESigned && lastSavedRef.current && lastSavedRef.current.prescriptionId === prescriptionId
        ? lastSavedRef.current.id
        : null;

    // Link to the patient's permanent UHID (existing match by mobile + name, or a new one).
    let patientUhid = uhid;
    if (!patientUhid) {
      try {
        const patient = await getOrCreatePatient({ name: patientName, mobile, age, sex, email });
        patientUhid = patient.uhid;
        setUhid(patient.uhid);
      } catch (error) {
        console.warn("UHID not assigned", error);
      }
    }

    const record: SavedPrescription = {
      uhid: patientUhid || undefined,
      id: reuse || Date.now().toString(),
      date: new Date().toLocaleString(),
      patientName,
      age,
      sex,
      mobile,
      email,
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
      consultationType: isTeleconsultation ? "teleconsultation" : "opd",
      paymentClearance: nmbPaymentClearance || undefined,
      appointmentId: appointmentId || undefined,
    };

    let old: SavedPrescription[] = [];
    try {
      old = JSON.parse(localStorage.getItem("nmb_prescriptions") || "[]");
    } catch {}
    localStorage.setItem("nmb_prescriptions", JSON.stringify([record, ...old.filter((x) => x.id !== record.id)]));

    let cloud = false;
    try {
      await setDoc(doc(db, "patientRecords", record.id), record);
      cloud = true;
      if (patientUhid && !reuse) recordVisit(patientUhid, { age, sex, email }).catch(() => {});
      logAction(reuse ? "prescription.updated" : "prescription.saved", { recordId: record.id, uhid: patientUhid || null, signed: Boolean(record.signedAt) });
      setSavedMessage("Patient record saved on this device and cloud.");
    } catch (error) {
      console.error("Cloud patient record save failed", error);
      setSavedMessage("Patient record saved on this device. Cloud sync needs Firebase permission.");
    }

    if (isESigned && prescriptionId) lastSavedRef.current = { id: record.id, prescriptionId };
    setSavedPatients((prev) => [record, ...prev.filter((x) => x.id !== record.id)]);
    setTimeout(() => setSavedMessage(""), 4000);
    return { id: record.id, cloud };
  }

  function clearForm() {
    if (!confirm("Clear current prescription?")) return;

    setPatientName("");
    setUhid("");
    setAge("");
    setSex("");
    setMobile("");
    setEmail("");
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
    setNmbPinVerified(false);
    setNmbPaymentClearance(null);
    setIsTeleconsultation(false);
    setAppointmentId("");
    window.history.replaceState({}, "", "/doctor/prescription");
  }

  const filteredPatients = savedPatients.filter((r) => {
    const q = patientSearch.trim().toLowerCase();
    if (!q) return true;
    return [r.patientName, r.mobile, r.prescriptionId, r.diagnosis]
      .some((v) => String(v || "").toLowerCase().includes(q));
  });

  return (
    <main style={s.page}>
      <section className="no-print" style={{ ...s.card, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Doctor Workflow</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={s.secondary} onClick={() => window.location.href="/doctor/appointments"}>1. Appointment</button>
          <button style={s.secondary} onClick={() => {
            const key = appointmentId || "walkin";
            const next = `/doctor/prescription${appointmentId ? `?appointmentId=${encodeURIComponent(appointmentId)}` : ""}`;
            window.location.href=`/doctor/payment?paymentKey=${encodeURIComponent(key)}&next=${encodeURIComponent(next)}`;
          }}>2. Payment</button>
          <button style={s.secondary} onClick={() => setIsTeleconsultation(true)}>3. Video Consultation</button>
          <button style={s.primary}>4. E-Prescription</button>
          <button style={s.secondary} onClick={refreshSavedPatients}>5. Saved Patients / Follow-up</button>
          <button style={s.secondary} onClick={handlePrint}>6. Print / PDF</button>
          <button style={s.secondary} onClick={handleWhatsAppPrescription}>7. WhatsApp</button>
          <button style={s.secondary} onClick={handleEmailPrescription}>8. Email</button>
          <button style={s.secondary} onClick={exportPatientRecordsExcel}>9. Excel Export</button>
        </div>
      </section>

      <section className="no-print" style={s.card}>
        <h2 style={{ marginTop: 0 }}>Saved Patients / Follow-up</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            style={{ ...s.input, flex: 1, minWidth: 240 }}
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            placeholder="Search by patient name, mobile, diagnosis or Prescription ID"
          />
          <button style={s.secondary} onClick={refreshSavedPatients}>
            {recordsBusy ? "Loading..." : "Load Saved Patients"}
          </button>
          <button style={s.secondary} onClick={exportPatientRecordsExcel}>Export Patient Records (Excel)</button>
        </div>
        {savedPatients.length > 0 && (
          <div style={{ ...s.results, maxHeight: 280 }}>
            {filteredPatients.slice(0, 50).map((r) => (
              <button key={r.id} type="button" style={s.med} onClick={() => loadSavedPatient(r)}>
                <strong>{r.patientName} {r.age ? `· ${r.age}` : ""} {r.sex ? `· ${r.sex}` : ""}</strong>
                <span>{r.mobile || "No mobile"} · {r.date}</span>
                <small>{r.diagnosis || "No diagnosis"}{r.prescriptionId ? ` · ${r.prescriptionId}` : ""}</small>
              </button>
            ))}
          </div>
        )}
      </section>
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
                const key = appointmentId || "walkin";
                const next = `/doctor/prescription${appointmentId ? `?appointmentId=${encodeURIComponent(appointmentId)}` : ""}`;
                window.location.href =
                  `/doctor/payment?paymentKey=${encodeURIComponent(key)}&next=${encodeURIComponent(next)}`;
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
          <button style={s.primary} onClick={handleEmailPrescription}>
            Send by Email
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

          <EpinResetButton style={s.secondary} />

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
        <PrescriptionBrandHeader isTeleconsultation={isTeleconsultation} />
        <strong>Dr. Kuldeep Budania · MD Psychiatry</strong>
        <div>Mental Health · De-addiction · Sexual Disorders</div>
      </section>

      <section style={s.card}>
        <label className="no-print" style={s.consultationToggle}>
          <input
            type="checkbox"
            checked={isTeleconsultation}
            onChange={(event) => setIsTeleconsultation(event.target.checked)}
          />
          <span>Teleconsultation</span>
        </label>
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

          <Field label="Email">
            <input
              style={s.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
        <div className="no-print">
          <PatientUhid
            uhid={uhid}
            name={patientName}
            mobile={mobile}
            onSelect={(p) => {
              setUhid(p?.uhid || "");
              if (p) {
                setAge((v) => v || p.age || "");
                setSex((v) => v || p.sex || "");
                setEmail((v) => v || p.email || "");
              }
            }}
          />
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
                  key={`${item.icd10}|${item.icd11}|${item.name}`}
                  type="button"
                  style={s.med}
                  onClick={() => chooseDiagnosis(item)}
                >
                  <strong>{item.name}</strong>
                  <span>ICD-10: {item.icd10 || "—"} | ICD-11: {item.icd11 || "—"}</span>
                  {item.keywords && <small>Clinical keywords: {item.keywords}</small>}
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
          <button style={s.secondary} onClick={() => setShowAddBrand((v) => !v)}>
            {showAddBrand ? "Close" : `+ Add brand to list${customMeds.length ? ` (${customMeds.length})` : ""}`}
          </button>
        </div>

        {showAddBrand && (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, marginTop: 10, background: "#f8fafc" }}>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8 }}>
              Save a brand you prescribe — it will appear in Medicine Search on all your devices.
            </div>
            <div style={s.grid4}>
              <Field label="Generic"><input style={s.input} value={newMed.generic} onChange={(e) => setNewMed({ ...newMed, generic: e.target.value })} placeholder="e.g. Escitalopram" /></Field>
              <Field label="Brand"><input style={s.input} value={newMed.brand} onChange={(e) => setNewMed({ ...newMed, brand: e.target.value })} placeholder="e.g. Nexito" /></Field>
              <Field label="Strength"><input style={s.input} value={newMed.strength} onChange={(e) => setNewMed({ ...newMed, strength: e.target.value })} placeholder="e.g. 10 mg" /></Field>
              <Field label="Form"><input style={s.input} value={newMed.form} onChange={(e) => setNewMed({ ...newMed, form: e.target.value })} placeholder="Tablet / Capsule / Syrup" /></Field>
              <Field label="Company (optional)"><input style={s.input} value={newMed.company} onChange={(e) => setNewMed({ ...newMed, company: e.target.value })} /></Field>
            </div>
            <button style={{ ...s.secondary, marginTop: 8 }} disabled={savingMed} onClick={addBrandToList}>
              {savingMed ? "Saving…" : "Save brand"}
            </button>
            {customMeds.length > 0 && (
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {customMeds.map((m) => (
                  <span key={m.id} style={{ fontSize: 12, background: "#fff", border: "1px solid #cbd5e1", borderRadius: 999, padding: "4px 10px" }}>
                    {[m.brand || m.generic, m.strength].filter(Boolean).join(" ")}
                    <button type="button" aria-label="Remove" onClick={() => removeBrandFromList(m.id)} style={{ marginLeft: 6, border: 0, background: "none", color: "#b91c1c", cursor: "pointer" }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

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
                    <strong>{m.label || `${brand}${strength ? ` ${strength}` : ""}`}</strong>
                    <span>{m.generic}</span>
                    <small>{[company, form, m.category, m.source === "custom" ? "added by you" : "", m.verify ? "verify strength on pack" : ""].filter(Boolean).join(" · ")}</small>
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
                  {!(FREQUENCY_OPTIONS as readonly string[]).includes(item.frequency) && item.frequency && (
                    <option>{item.frequency}</option>
                  )}
                  {FREQUENCY_OPTIONS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
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
                  {!(TIMING_OPTIONS as readonly string[]).includes(item.timing) && item.timing && (
                    <option>{item.timing}</option>
                  )}
                  {TIMING_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
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

      <div className="no-print" style={s.warning}>
        Verify indication, dose, interactions, allergies, pregnancy status,
        renal/hepatic function and current prescribing information before
        issuing the prescription.
      </div>

      <section className="formal-print">
        <div className="prescription-document-header">
          <PrescriptionBrandHeader isTeleconsultation={isTeleconsultation} />
          <strong>Dr. Kuldeep Budania · MD Psychiatry</strong>
          <div>Mental Health · De-addiction · Sexual Disorders</div>
          <div>Registration No. 30526 · www.neuromindbloom.com</div>
        </div>

        <div className="prescription-patient-details">
          <div><b>Patient:</b> {patientName}</div>
          <div><b>Age/Sex:</b> {age || "-"} / {sex || "-"}</div>
          <div><b>Date:</b> {new Date().toLocaleDateString()}</div>
          <div><b>Mobile:</b> {mobile || "-"}</div>
          {email && <div><b>Email:</b> {email}</div>}
          <div><b>Prescription ID:</b> {prescriptionId || "-"}</div>
          {uhid && <div><b>UHID:</b> {uhid}</div>}
        </div>

        {(complaints || diagnosis) && (
          <div className="prescription-clinical-details">
            {complaints && <div><b>Complaints:</b> {complaints}</div>}
            {diagnosis && <div><b>Diagnosis:</b> {diagnosis}</div>}
          </div>
        )}

        {(history || vitals) && (
          <div className="prescription-clinical-details">
            {history && <div><b>Relevant History / Examination:</b> {history}</div>}
            {vitals && <div><b>Vitals / Clinical Notes:</b> {vitals}</div>}
          </div>
        )}

        <div className="prescription-rx-title">Rx</div>
        <table className="prescription-rx-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #555", padding: 4 }}>#</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #555", padding: 4 }}>Medicine</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #555", padding: 4 }}>Dose / Frequency</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #555", padding: 4 }}>Timing / Food</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #555", padding: 4 }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {rx.map((m, i) => (
              <tr key={i}>
                <td>{i + 1}.</td>
                <td>
                  <b>{m.brand || m.generic} {m.strength}</b>
                  {m.instruction && <div style={{ fontSize: 10 }}>{m.instruction}</div>}
                </td>
                <td>{m.dose} · {m.frequency}</td>
                <td>{m.timing} · {m.food}</td>
                <td>{m.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(investigations || advice || followUp) && (
          <div className="prescription-clinical-details">
            {investigations && <div><b>Investigations:</b> {investigations}</div>}
            {advice && <div><b>Advice:</b> {advice}</div>}
            {followUp && <div><b>Follow-up:</b> {followUp}</div>}
          </div>
        )}

        <div className="prescription-signature">
          <div>Date: {new Date().toLocaleDateString()}</div>
          <div>
            <b>Electronically Signed</b><br />
            <b>Dr. Kuldeep Budania</b><br />
            MD Psychiatry · Reg. No. 30526<br />
            {signedAt}<br />
            Prescription ID: {prescriptionId}
          </div>
        </div>

        <div className="prescription-disclaimer">Not valid for medicolegal purpose.</div>
      </section>

      <style jsx global>{`
        .formal-print { display: none; }
        .prescription-teleconsultation-label {
          font-size: 10px;
          letter-spacing: 0.3px;
          margin-top: 3px;
        }
        @media print {
          main > :not(.formal-print):not(style) { display: none !important; }
          main { max-width: none !important; margin: 0 !important; padding: 0 !important; }
          .formal-print { display: block !important; }
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { size: A4; margin: 10mm; }
          .prescription-document-header {
            text-align: center;
            border-bottom: 1.5px solid #176b87;
            padding-bottom: 7px;
            margin-bottom: 8px;
            font-size: 10pt;
            line-height: 1.25;
            break-inside: avoid;
          }
          .prescription-document-header .brand {
            margin-bottom: 4px;
          }
          .prescription-document-header .brandMark {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            font-size: 18px;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .prescription-document-header .brand strong {
            font-size: 18px;
          }
          .prescription-document-header .brand small {
            font-size: 9px;
          }
          .prescription-patient-details {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 3px 8px;
            font-size: 9.5pt;
            margin-bottom: 7px;
          }
          .prescription-clinical-details {
            font-size: 9.5pt;
            margin: 5px 0;
            line-height: 1.25;
          }
          .prescription-rx-title {
            font-size: 14pt;
            font-weight: 800;
            margin: 5px 0 2px;
          }
          .prescription-rx-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
          }
          .prescription-rx-table th {
            text-align: left;
            border-bottom: 1px solid #555;
            padding: 3px;
          }
          .prescription-rx-table td {
            padding: 3px;
            vertical-align: top;
          }
          .prescription-rx-table tr {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .prescription-signature {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 16px;
            margin-top: 12px;
            font-size: 9pt;
            break-inside: avoid;
          }
          .prescription-signature > div:last-child {
            text-align: right;
          }
          .prescription-disclaimer {
            margin-top: 8px;
            font-size: 8.5pt;
            line-height: 1.2;
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    

</main>
  );
}

function PrescriptionBrandHeader({
  isTeleconsultation,
}: {
  isTeleconsultation: boolean;
}) {
  return (
    <div>
      {/* Inline styles: this header must not depend on global CSS (it is printed). */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="Neuro Mind Bloom" width={44} height={44} style={{ borderRadius: "50%", display: "block" }} />
        <span style={{ textAlign: "left", lineHeight: 1.15 }}>
          <strong style={{ display: "block", fontSize: 18, letterSpacing: 0.5 }}>NEURO MIND BLOOM</strong>
          <small style={{ display: "block", fontSize: 11, color: "#555" }}>Mind Care, Life Care</small>
        </span>
      </div>
      {isTeleconsultation && (
        <div className="prescription-teleconsultation-label">Teleconsultation</div>
      )}
    </div>
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

  consultationToggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    color: "#334155",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
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

};
