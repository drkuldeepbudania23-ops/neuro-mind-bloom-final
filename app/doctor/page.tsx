"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Medicine = {
  generic: string;
  brand?: string;
  strength?: string;
  company?: string;
  category: string;
};

type RxMedicine = {
  medicine: string;
  dose: string;
  frequency: string;
  duration: string;
  instruction: string;
};

const medicineDatabase: Medicine[] = [
  // =========================
  // ANTIDEPRESSANTS
  // =========================
  { generic: "Escitalopram", brand: "Feliz S", strength: "5 / 10 / 20 mg", company: "Torrent Pharma", category: "Antidepressant" },
  { generic: "Escitalopram + Clonazepam", brand: "Feliz S Plus", strength: "Various strengths", company: "Torrent Pharma", category: "Antidepressant / Anxiolytic" },
  { generic: "Escitalopram + Clonazepam", brand: "Clonotril Plus", strength: "Various strengths", company: "Torrent Pharma", category: "Antidepressant / Anxiolytic" },
  { generic: "Escitalopram", brand: "C-Pram S", strength: "Various strengths", company: "Torrent Pharma", category: "Antidepressant" },

  { generic: "Fluoxetine", brand: "Prodep", strength: "10 / 20 / 40 / 60 mg", company: "Sun Pharma", category: "Antidepressant" },
  { generic: "Fluoxetine", strength: "10 / 20 / 40 / 60 mg", category: "Antidepressant" },

  { generic: "Sertraline", strength: "25 / 50 / 100 mg", category: "Antidepressant" },
  { generic: "Paroxetine", strength: "12.5 / 25 / 37.5 mg CR", category: "Antidepressant" },
  { generic: "Paroxetine + Clonazepam", brand: "Clonotril P", company: "Torrent Pharma", category: "Antidepressant / Anxiolytic" },

  { generic: "Fluvoxamine", brand: "Fluvator", strength: "50 / 100 mg", company: "Torrent Pharma", category: "Antidepressant / OCD" },
  { generic: "Fluvoxamine", strength: "50 / 100 mg", category: "Antidepressant / OCD" },

  { generic: "Desvenlafaxine", strength: "25 / 50 / 100 mg", category: "Antidepressant" },
  { generic: "Venlafaxine", strength: "37.5 / 75 / 150 mg", category: "Antidepressant" },
  { generic: "Duloxetine", strength: "20 / 30 / 40 / 60 mg", category: "Antidepressant" },

  { generic: "Vortioxetine", strength: "5 / 10 / 20 mg", category: "Antidepressant" },
  { generic: "Vilazodone", strength: "10 / 20 / 40 mg", category: "Antidepressant" },
  { generic: "Bupropion", strength: "150 / 300 mg", category: "Antidepressant" },

  { generic: "Mirtazapine", strength: "7.5 / 15 / 30 / 45 mg", category: "Antidepressant" },
  { generic: "Agomelatine", strength: "25 mg", category: "Antidepressant" },

  { generic: "Amitriptyline", strength: "10 / 25 / 50 / 75 mg", category: "TCA" },
  { generic: "Nortriptyline", strength: "10 / 25 / 50 mg", category: "TCA" },
  { generic: "Clomipramine", strength: "10 / 25 / 50 / 75 mg", category: "TCA / OCD" },
  { generic: "Imipramine", strength: "25 / 75 mg", category: "TCA" },
  { generic: "Doxepin", strength: "10 / 25 / 75 mg", category: "TCA" },

  // =========================
  // BENZODIAZEPINES / ANXIETY
  // =========================
  { generic: "Clonazepam", brand: "Clonotril", strength: "0.25 / 0.5 / 1 / 2 mg", company: "Torrent Pharma", category: "Benzodiazepine" },
  { generic: "Clonazepam", brand: "Lonazep", strength: "0.25 / 0.5 / 1 / 2 mg", company: "Sun Pharma", category: "Benzodiazepine" },
  { generic: "Clonazepam", strength: "0.25 / 0.5 / 1 / 2 mg", category: "Benzodiazepine" },

  { generic: "Lorazepam", strength: "1 / 2 mg", category: "Benzodiazepine" },
  { generic: "Alprazolam", strength: "0.25 / 0.5 / 1 mg", category: "Benzodiazepine" },
  { generic: "Diazepam", strength: "2 / 5 / 10 mg", category: "Benzodiazepine" },
  { generic: "Etizolam", strength: "0.25 / 0.5 / 1 mg", category: "Anxiolytic" },
  { generic: "Clobazam", brand: "Lobazam", strength: "5 / 10 / 20 mg", company: "Sun Pharma", category: "Benzodiazepine" },

  { generic: "Buspirone", strength: "5 / 10 mg", category: "Anxiolytic" },
  { generic: "Propranolol", strength: "10 / 20 / 40 mg", category: "Anxiety / Tremor" },
  { generic: "Hydroxyzine", strength: "10 / 25 mg", category: "Anxiety / Allergy" },

  // =========================
  // ANTIPSYCHOTICS
  // =========================
  { generic: "Olanzapine", brand: "Oleanz", strength: "2.5 / 5 / 7.5 / 10 / 15 / 20 mg", company: "Sun Pharma", category: "Antipsychotic" },
  { generic: "Olanzapine", strength: "2.5 / 5 / 10 / 15 / 20 mg", category: "Antipsychotic" },

  { generic: "Quetiapine", brand: "Qutipin", strength: "25 / 50 / 100 / 200 / 300 mg", company: "Sun Pharma", category: "Antipsychotic" },
  { generic: "Quetiapine SR", brand: "Qutipin SR", strength: "50 / 100 / 200 / 300 / 400 mg", company: "Sun Pharma", category: "Antipsychotic" },

  { generic: "Risperidone", strength: "0.5 / 1 / 2 / 3 / 4 mg", category: "Antipsychotic" },
  { generic: "Risperidone + Trihexyphenidyl", strength: "Various strengths", category: "Antipsychotic" },

  { generic: "Aripiprazole", strength: "2 / 5 / 10 / 15 / 20 / 30 mg", category: "Antipsychotic" },
  { generic: "Aripiprazole", brand: "ARIP MT", strength: "5 / 10 / 15 / 20 / 30 mg", company: "Torrent Pharma", category: "Antipsychotic" },

  { generic: "Amisulpride", brand: "Amazeo", strength: "50 / 100 / 200 mg", company: "Torrent Pharma", category: "Antipsychotic" },
  { generic: "Amisulpride", strength: "50 / 100 / 200 / 400 mg", category: "Antipsychotic" },

  { generic: "Clozapine", brand: "Lozapin", strength: "25 / 50 / 100 mg", company: "Torrent Pharma", category: "Antipsychotic" },
  { generic: "Clozapine", strength: "25 / 50 / 100 mg", category: "Antipsychotic" },

  { generic: "Lurasidone", strength: "20 / 40 / 80 mg", category: "Antipsychotic" },
  { generic: "Ziprasidone", strength: "20 / 40 / 80 mg", category: "Antipsychotic" },
  { generic: "Paliperidone", strength: "3 / 6 / 9 mg", category: "Antipsychotic" },
  { generic: "Brexpiprazole", strength: "0.5 / 1 / 2 / 3 / 4 mg", category: "Antipsychotic" },
  { generic: "Cariprazine", strength: "1.5 / 3 / 4.5 / 6 mg", category: "Antipsychotic" },
  { generic: "Lumateperone", brand: "Lumavibe", strength: "42 mg", company: "Torrent Pharma", category: "Antipsychotic" },

  { generic: "Haloperidol", strength: "0.25 / 0.5 / 1.5 / 5 / 10 mg", category: "Antipsychotic" },
  { generic: "Trifluoperazine", strength: "1 / 5 / 10 mg", category: "Antipsychotic" },
  { generic: "Chlorpromazine", strength: "25 / 50 / 100 mg", category: "Antipsychotic" },
  { generic: "Flupentixol", strength: "0.5 / 1 / 3 mg", category: "Antipsychotic" },

  // =========================
  // MOOD STABILIZERS
  // =========================
  { generic: "Lithium Carbonate", brand: "Lithosun", strength: "300 / 400 mg", company: "Sun Pharma", category: "Mood Stabilizer" },
  { generic: "Lithium Carbonate", strength: "300 / 400 / 450 mg", category: "Mood Stabilizer" },

  { generic: "Sodium Valproate", strength: "200 / 300 / 500 mg", category: "Mood Stabilizer" },
  { generic: "Divalproex Sodium", strength: "250 / 500 mg", category: "Mood Stabilizer" },

  { generic: "Lamotrigine", brand: "Lamitor DT", strength: "25 / 50 / 100 mg", company: "Torrent Pharma", category: "Mood Stabilizer" },
  { generic: "Lamotrigine", brand: "Lamitor OD", strength: "Various strengths", company: "Torrent Pharma", category: "Mood Stabilizer" },
  { generic: "Lamotrigine", strength: "25 / 50 / 100 / 200 mg", category: "Mood Stabilizer" },

  { generic: "Carbamazepine", strength: "100 / 200 / 400 mg", category: "Mood Stabilizer" },
  { generic: "Oxcarbazepine", strength: "150 / 300 / 450 / 600 mg", category: "Mood Stabilizer" },

  // =========================
  // EPS / ADJUNCTS
  // =========================
  { generic: "Trihexyphenidyl", strength: "1 / 2 / 5 mg", category: "EPS" },
  { generic: "Procyclidine", strength: "5 mg", category: "EPS" },
  { generic: "Promethazine", strength: "10 / 25 mg", category: "Sedative / Allergy" },

  // =========================
  // SLEEP
  // =========================
  { generic: "Zolpidem", strength: "5 / 10 mg", category: "Hypnotic" },
  { generic: "Eszopiclone", strength: "1 / 2 / 3 mg", category: "Hypnotic" },
  { generic: "Melatonin", strength: "3 / 5 / 10 mg", category: "Sleep" },
  { generic: "Ramelteon", strength: "8 mg", category: "Sleep" },

  // =========================
  // ADHD
  // =========================
  { generic: "Atomoxetine", strength: "10 / 18 / 25 / 40 / 60 mg", category: "ADHD" },
  { generic: "Methylphenidate", strength: "5 / 10 / 18 / 20 / 27 / 36 mg", category: "ADHD" },
  { generic: "Methylphenidate", brand: "Addwize", strength: "Various strengths", company: "Sun Pharma", category: "ADHD" },
  { generic: "Clonidine", strength: "0.1 mg", category: "ADHD / BP" },

  // =========================
  // DEMENTIA
  // =========================
  { generic: "Donepezil", strength: "5 / 10 mg", category: "Dementia" },
  { generic: "Memantine", strength: "5 / 10 mg", category: "Dementia" },
  { generic: "Rivastigmine", brand: "Rivamer", strength: "1.5 / 3 / 4.5 / 6 mg", company: "Sun Pharma", category: "Dementia" },
  { generic: "Galantamine", strength: "4 / 8 / 12 mg", category: "Dementia" },

  // =========================
  // DE-ADDICTION
  // =========================
  { generic: "Acamprosate", brand: "Acamprol", strength: "333 mg", company: "Sun Pharma", category: "Alcohol Dependence" },
  { generic: "Acamprosate", strength: "333 mg", category: "Alcohol Dependence" },

  { generic: "Disulfiram", brand: "Esperal", strength: "250 mg", company: "Torrent Pharma", category: "Alcohol Dependence" },
  { generic: "Disulfiram", strength: "250 mg", category: "Alcohol Dependence" },

  { generic: "Naltrexone", strength: "50 mg", category: "Alcohol / Opioid Dependence" },
  { generic: "Baclofen", strength: "5 / 10 / 20 mg", category: "Alcohol Dependence / Muscle Relaxant" },

  { generic: "Buprenorphine + Naloxone", brand: "Qudict", strength: "2/0.5 mg", company: "Sun Pharma", category: "Opioid Dependence" },
  { generic: "Buprenorphine", strength: "0.2 / 2 / 8 mg", category: "Opioid Dependence" },
  { generic: "Buprenorphine + Naloxone", strength: "2/0.5 / 8/2 mg", category: "Opioid Dependence" },

  { generic: "Nicotine Gum", strength: "2 / 4 mg", category: "Tobacco Dependence" },
  { generic: "Varenicline", strength: "0.5 / 1 mg", category: "Tobacco Dependence" },
  { generic: "Bupropion SR", strength: "150 mg", category: "Tobacco Dependence" },

  // =========================
  // NEURO / PAIN ADJUNCTS
  // =========================
  { generic: "Gabapentin", brand: "Gabator", strength: "100 / 300 mg", company: "Torrent Pharma", category: "Neuropathic Pain" },
  { generic: "Gabapentin", strength: "100 / 300 / 400 mg", category: "Neuropathic Pain" },
  { generic: "Pregabalin", strength: "50 / 75 / 150 mg", category: "Neuropathic Pain" },
  { generic: "Pregabalin + Methylcobalamin", strength: "Various strengths", category: "Neuropathic Pain / Vitamin" },

  // =========================
  // PPI / GI
  // =========================
  { generic: "Pantoprazole", strength: "20 / 40 mg", category: "PPI / Acidity" },
  { generic: "Pantoprazole + Domperidone", strength: "40/30 mg SR", category: "PPI / Acidity" },
  { generic: "Rabeprazole", strength: "20 mg", category: "PPI / Acidity" },
  { generic: "Rabeprazole + Domperidone", strength: "20/30 mg SR", category: "PPI / Acidity" },
  { generic: "Omeprazole", strength: "20 / 40 mg", category: "PPI / Acidity" },
  { generic: "Esomeprazole", strength: "20 / 40 mg", category: "PPI / Acidity" },
  { generic: "Vonoprazan", brand: "Kabvie", strength: "10 / 20 mg", company: "Torrent Pharma", category: "Acid Suppression" },

  { generic: "Ondansetron", strength: "4 / 8 mg", category: "Antiemetic" },
  { generic: "Domperidone", strength: "10 mg", category: "Antiemetic / Prokinetic" },
  { generic: "Levosulpiride", brand: "Levazeo", strength: "25 / 75 mg", company: "Torrent Pharma", category: "Prokinetic" },

  // =========================
  // VITAMINS
  // =========================
  { generic: "Methylcobalamin", strength: "500 / 750 / 1500 mcg", category: "Vitamin B12" },
  { generic: "Vitamin B Complex", category: "Vitamin" },
  { generic: "Calcium + Vitamin D3", category: "Vitamin / Mineral" },
  { generic: "Cholecalciferol Vitamin D3", brand: "D360", strength: "60000 IU", company: "Torrent Pharma", category: "Vitamin D" },
  { generic: "Vitamin D3", strength: "60000 IU", category: "Vitamin D" },
  { generic: "Folic Acid", strength: "5 mg", category: "Vitamin" },
  { generic: "Iron + Folic Acid", category: "Vitamin / Mineral" },
  { generic: "Multivitamin + Multimineral", category: "Vitamin" },
  { generic: "Thiamine Vitamin B1", strength: "100 mg", category: "Vitamin / Alcohol Use" },

  // =========================
  // FEVER / PAIN
  // =========================
  { generic: "Paracetamol", strength: "500 / 650 mg", category: "Fever / Pain" },
  { generic: "Ibuprofen", strength: "200 / 400 mg", category: "Pain / Fever" },
  { generic: "Ibuprofen + Paracetamol", category: "Pain / Fever" },
  { generic: "Aceclofenac", strength: "100 mg", category: "Pain" },
  { generic: "Aceclofenac + Paracetamol", category: "Pain" },
  { generic: "Diclofenac", strength: "50 / 75 mg", category: "Pain" },
  { generic: "Etoricoxib", brand: "Etoxib", strength: "60 / 90 / 120 mg", company: "Torrent Pharma", category: "Pain" },
  { generic: "Etoricoxib", strength: "60 / 90 / 120 mg", category: "Pain" },

  // =========================
  // COLD / ALLERGY
  // =========================
  { generic: "Cetirizine", strength: "10 mg", category: "Allergy" },
  { generic: "Levocetirizine", brand: "Lezyncet", strength: "5 mg", company: "Torrent Pharma", category: "Allergy" },
  { generic: "Levocetirizine", strength: "5 mg", category: "Allergy" },
  { generic: "Levocetirizine + Montelukast", brand: "Lezyncet M", company: "Torrent Pharma", category: "Allergy" },
  { generic: "Montelukast", strength: "10 mg", category: "Allergy" },

  // =========================
  // HYPERTENSION
  // =========================
  { generic: "Amlodipine", brand: "Corvadil", strength: "2.5 / 5 / 10 mg", company: "Torrent Pharma", category: "Hypertension" },
  { generic: "Amlodipine", strength: "2.5 / 5 / 10 mg", category: "Hypertension" },

  { generic: "Telmisartan", strength: "20 / 40 / 80 mg", category: "Hypertension" },
  { generic: "Telmisartan + Amlodipine", category: "Hypertension" },
  { generic: "Telmisartan + Hydrochlorothiazide", category: "Hypertension" },

  { generic: "Losartan", brand: "Losar", strength: "25 / 50 mg", company: "Torrent Pharma", category: "Hypertension" },
  { generic: "Losartan", strength: "25 / 50 / 100 mg", category: "Hypertension" },

  { generic: "Lisinopril", brand: "Listril", strength: "2.5 / 5 / 10 mg", company: "Torrent Pharma", category: "Hypertension" },
  { generic: "Ramipril", strength: "1.25 / 2.5 / 5 / 10 mg", category: "Hypertension" },

  { generic: "Bisoprolol", brand: "Corbis", strength: "2.5 / 5 / 10 mg", company: "Torrent Pharma", category: "Hypertension" },
  { generic: "Metoprolol", strength: "25 / 50 / 100 mg", category: "Hypertension" },

  { generic: "Chlorthalidone", strength: "6.25 / 12.5 mg", category: "Hypertension" },
  { generic: "Hydrochlorothiazide", strength: "12.5 / 25 mg", category: "Hypertension" },

  // =========================
  // DIABETES
  // =========================
  { generic: "Metformin", brand: "Dibeta SR", strength: "Various strengths", company: "Torrent Pharma", category: "Diabetes" },
  { generic: "Metformin", strength: "500 / 850 / 1000 mg", category: "Diabetes" },

  { generic: "Glimepiride", strength: "1 / 2 / 3 / 4 mg", category: "Diabetes" },
  { generic: "Glimepiride + Metformin", brand: "Azulix MF", company: "Torrent Pharma", category: "Diabetes" },

  { generic: "Dapagliflozin", brand: "Glucreta", company: "Torrent Pharma", category: "Diabetes" },
  { generic: "Dapagliflozin", strength: "5 / 10 mg", category: "Diabetes" },

  { generic: "Empagliflozin", brand: "Cospiaq", strength: "10 / 25 mg", company: "Torrent Pharma", category: "Diabetes" },
  { generic: "Empagliflozin", strength: "10 / 25 mg", category: "Diabetes" },

  { generic: "Linagliptin", strength: "5 mg", category: "Diabetes" },
  { generic: "Linagliptin + Metformin", brand: "Linaxa M", company: "Torrent Pharma", category: "Diabetes" },

  { generic: "Sitagliptin", strength: "50 / 100 mg", category: "Diabetes" },
  { generic: "Vildagliptin", strength: "50 mg", category: "Diabetes" },

  { generic: "Repaglinide", brand: "Eurepa", strength: "0.5 / 1 / 2 mg", company: "Torrent Pharma", category: "Diabetes" },

  // =========================
  // THYROID
  // =========================
  { generic: "Levothyroxine", strength: "25 / 50 / 75 / 100 mcg", category: "Thyroid" },
];

const frequencyOptions = [
  "OD",
  "BD",
  "TDS",
  "QID",
  "HS",
  "SOS",
  "Morning",
  "Afternoon",
  "Night",
  "Morning + Night",
  "1-0-0",
  "0-1-0",
  "0-0-1",
  "1-0-1",
  "1-1-1",
  "1/2-0-1",
  "1-0-1/2",
];

const durationOptions = [
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "14 days",
  "21 days",
  "1 month",
  "6 weeks",
  "2 months",
  "3 months",
  "Continue",
];

export default function DoctorPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [mobile, setMobile] = useState("");
  const [weight, setWeight] = useState("");
  const [bp, setBp] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [complaints, setComplaints] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");

  const [medicineSearch, setMedicineSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instruction, setInstruction] = useState("");

  const [prescription, setPrescription] = useState<RxMedicine[]>([]);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("doctorLoggedIn");

    if (loggedIn !== "true") {
      router.replace("/doctor/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  const searchResults = useMemo(() => {
    const q = medicineSearch.trim().toLowerCase();

    if (!q) return [];

    return medicineDatabase
      .filter((m) => {
        const combined = [
          m.generic,
          m.brand || "",
          m.strength || "",
          m.company || "",
          m.category,
        ]
          .join(" ")
          .toLowerCase();

        return combined.includes(q);
      })
      .slice(0, 12);
  }, [medicineSearch]);

  const medicineLabel = (m: Medicine) => {
    let text = "";

    if (m.brand) {
      text += `${m.brand} (${m.generic})`;
    } else {
      text += m.generic;
    }

    if (m.strength) {
      text += ` - ${m.strength}`;
    }

    if (m.company) {
      text += ` - ${m.company}`;
    }

    return text;
  };

  const selectMedicine = (m: Medicine) => {
    const label = medicineLabel(m);
    setSelectedMedicine(label);
    setMedicineSearch(label);
  };

  const addMedicine = () => {
    const finalMedicine = selectedMedicine || medicineSearch.trim();

    if (!finalMedicine) {
      alert("Please select or enter medicine.");
      return;
    }

    setPrescription((prev) => [
      ...prev,
      {
        medicine: finalMedicine,
        dose,
        frequency,
        duration,
        instruction,
      },
    ]);

    setMedicineSearch("");
    setSelectedMedicine("");
    setDose("");
    setFrequency("");
    setDuration("");
    setInstruction("");
  };

  const removeMedicine = (index: number) => {
    setPrescription((prev) => prev.filter((_, i) => i !== index));
  };

  const clearPrescription = () => {
    if (!confirm("Clear complete prescription?")) return;

    setPatientName("");
    setAge("");
    setSex("");
    setMobile("");
    setWeight("");
    setBp("");
    setDiagnosis("");
    setComplaints("");
    setAdvice("");
    setFollowUp("");
    setPrescription([]);
  };

  const logout = () => {
    sessionStorage.removeItem("doctorLoggedIn");
    router.replace("/doctor/login");
  };

  const printPrescription = () => {
    window.print();
  };

  if (!authorized) {
    return (
      <main className="loading">
        <p>Checking doctor login...</p>

        <style jsx>{`
          .loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="toolbar no-print">
        <div>
          <h1>Neuro Mind Bloom</h1>
          <p>Doctor Prescription Panel</p>
        </div>

        <div className="toolbarButtons">
          <button className="secondary" onClick={clearPrescription}>
            New Prescription
          </button>

          <button className="primary" onClick={printPrescription}>
            Print / Save PDF
          </button>

          <button className="danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <section className="prescriptionSheet">
        <header className="rxHeader">
          <div>
            <h2>Dr. Kuldeep Budania</h2>
            <div className="degree">MD Psychiatry</div>
            <div className="speciality">
              मानसिक रोग • नशा मुक्ति • सेक्स रोग विशेषज्ञ
            </div>
          </div>

          <div className="clinic">
            <strong>Neuro Mind Bloom</strong>
            <div>Psychiatry & Mental Health Clinic</div>
          </div>
        </header>

        <div className="divider" />

        <section className="patientSection">
          <h3>Patient Details</h3>

          <div className="grid4">
            <label>
              Patient Name
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name"
              />
            </label>

            <label>
              Age
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </label>

            <label>
              Sex
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Mobile
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
              />
            </label>

            <label>
              Weight
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
              />
            </label>

            <label>
              BP
              <input
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                placeholder="120/80"
              />
            </label>

            <label className="span2">
              Diagnosis
              <input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Diagnosis"
              />
            </label>
          </div>

          <label>
            Complaints / History
            <textarea
              value={complaints}
              onChange={(e) => setComplaints(e.target.value)}
              placeholder="Chief complaints, duration, relevant history..."
              rows={3}
            />
          </label>
        </section>

        <section className="medicineSection no-print">
          <h3>Add Medicine</h3>

          <div className="medicineSearchWrap">
            <label>
              Search Medicine / Brand / Generic / Company
              <input
                value={medicineSearch}
                onChange={(e) => {
                  setMedicineSearch(e.target.value);
                  setSelectedMedicine("");
                }}
                placeholder="Example: escitalopram, Feliz, olanzapine, Qutipin, pantoprazole..."
                autoComplete="off"
              />
            </label>

            {medicineSearch && searchResults.length > 0 && !selectedMedicine && (
              <div className="suggestions">
                {searchResults.map((m, index) => (
                  <button
                    type="button"
                    key={`${m.generic}-${m.brand}-${index}`}
                    className="suggestion"
                    onClick={() => selectMedicine(m)}
                  >
                    <strong>
                      {m.brand ? `${m.brand} (${m.generic})` : m.generic}
                    </strong>

                    <span>
                      {m.strength ? `${m.strength} • ` : ""}
                      {m.category}
                      {m.company ? ` • ${m.company}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid5">
            <label>
              Dose
              <input
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                placeholder="e.g. 10 mg / 1 tab"
              />
            </label>

            <label>
              Frequency
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="">Select</option>
                {frequencyOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </label>

            <label>
              Duration
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Select</option>
                {durationOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>

            <label className="span2">
              Instruction
              <input
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="After food / before food / bedtime / SOS..."
              />
            </label>
          </div>

          <button className="addButton" onClick={addMedicine}>
            + Add Medicine
          </button>
        </section>

        <section className="rxSection">
          <div className="rxTitle">℞ Prescription</div>

          {prescription.length === 0 ? (
            <div className="emptyRx">No medicine added yet.</div>
          ) : (
            <div className="rxTableWrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Medicine</th>
                    <th>Dose</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Instruction</th>
                    <th className="no-print">Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {prescription.map((item, index) => (
                    <tr key={`${item.medicine}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.medicine}</td>
                      <td>{item.dose || "-"}</td>
                      <td>{item.frequency || "-"}</td>
                      <td>{item.duration || "-"}</td>
                      <td>{item.instruction || "-"}</td>
                      <td className="no-print">
                        <button
                          className="removeButton"
                          onClick={() => removeMedicine(index)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="adviceSection">
          <label>
            Advice / Investigations
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              rows={4}
              placeholder="Advice, investigations, psychotherapy, lifestyle instructions..."
            />
          </label>

          <label>
            Follow-up
            <input
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="e.g. After 2 weeks / 1 month"
            />
          </label>
        </section>

        <footer className="footer">
          <div>
            <strong>Note:</strong> Prescription generated by treating doctor.
          </div>

          <div className="signature">
            <div className="signatureSpace" />
            <strong>Dr. Kuldeep Budania</strong>
            <div>MD Psychiatry</div>
          </div>
        </footer>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f3f6fa;
          padding: 22px;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          color: #172033;
        }

        .toolbar {
          max-width: 1200px;
          margin: 0 auto 18px;
          background: white;
          padding: 16px 20px;
          border-radius: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .toolbar h1 {
          margin: 0;
          font-size: 24px;
        }

        .toolbar p {
          margin: 4px 0 0;
          color: #64748b;
        }

        .toolbarButtons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        button {
          cursor: pointer;
          border: none;
          font-weight: 600;
        }

        .primary,
        .secondary,
        .danger {
          padding: 10px 14px;
          border-radius: 9px;
        }

        .primary {
          background: #1d4ed8;
          color: white;
        }

        .secondary {
          background: #e2e8f0;
          color: #172033;
        }

        .danger {
          background: #fee2e2;
          color: #b91c1c;
        }

        .prescriptionSheet {
          max-width: 1200px;
          margin: auto;
          background: white;
          padding: 26px;
          border-radius: 16px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.07);
        }

        .rxHeader {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
        }

        .rxHeader h2 {
          margin: 0;
          font-size: 26px;
        }

        .degree {
          margin-top: 4px;
          font-weight: 700;
        }

        .speciality {
          margin-top: 5px;
          color: #475569;
        }

        .clinic {
          text-align: right;
          line-height: 1.6;
        }

        .clinic strong {
          font-size: 21px;
        }

        .divider {
          height: 2px;
          background: #dbe4ee;
          margin: 18px 0;
        }

        h3 {
          margin: 0 0 14px;
          font-size: 18px;
        }

        .patientSection,
        .medicineSection,
        .rxSection,
        .adviceSection {
          margin-top: 24px;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-weight: 600;
          font-size: 14px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 11px;
          background: white;
          color: #172033;
          font-size: 14px;
          outline: none;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #2563eb;
        }

        textarea {
          resize: vertical;
        }

        .grid4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }

        .grid5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .span2 {
          grid-column: span 2;
        }

        .medicineSearchWrap {
          position: relative;
        }

        .suggestions {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% + 4px);
          background: white;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          max-height: 360px;
          overflow-y: auto;
          z-index: 50;
        }

        .suggestion {
          width: 100%;
          background: white;
          padding: 11px 12px;
          text-align: left;
          border-bottom: 1px solid #eef2f7;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .suggestion:hover {
          background: #eff6ff;
        }

        .suggestion span {
          font-size: 12px;
          color: #64748b;
          font-weight: 400;
        }

        .addButton {
          margin-top: 14px;
          padding: 10px 16px;
          border-radius: 8px;
          background: #0f766e;
          color: white;
        }

        .rxTitle {
          font-size: 25px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .emptyRx {
          padding: 20px;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          color: #64748b;
          text-align: center;
        }

        .rxTableWrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          border: 1px solid #dbe4ee;
          padding: 9px;
          text-align: left;
          vertical-align: top;
          font-size: 13px;
        }

        th {
          background: #f8fafc;
        }

        .removeButton {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 18px;
        }

        .adviceSection {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .footer {
          margin-top: 38px;
          padding-top: 18px;
          border-top: 1px solid #dbe4ee;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .signature {
          text-align: center;
          min-width: 220px;
        }

        .signatureSpace {
          height: 45px;
        }

        @media (max-width: 850px) {
          .page {
            padding: 10px;
          }

          .prescriptionSheet {
            padding: 16px;
          }

          .toolbar,
          .rxHeader,
          .footer {
            flex-direction: column;
          }

          .clinic {
            text-align: left;
          }

          .grid4,
          .grid5,
          .adviceSection {
            grid-template-columns: 1fr;
          }

          .span2 {
            grid-column: span 1;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            background: white !important;
          }

          .page {
            padding: 0;
            background: white;
          }

          .prescriptionSheet {
            max-width: none;
            box-shadow: none;
            border-radius: 0;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          input,
          select,
          textarea {
            border: none;
            padding-left: 0;
            padding-right: 0;
            appearance: none;
          }

          textarea {
            resize: none;
          }

          .rxSection {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
