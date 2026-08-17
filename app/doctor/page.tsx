"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Medicine = {
  generic: string;
  brands: string[];
  strengths: string[];
  form: string;
  category: string;
};

type RxItem = {
  id: number;
  generic: string;
  brand: string;
  strength: string;
  form: string;
  dose: string;
  frequency: string;
  duration: string;
  instruction: string;
};

const medicines: Medicine[] = [
  // ANTIDEPRESSANTS
  {
    generic: "Escitalopram",
    brands: ["Nexito", "Feliz-S", "Cipralex"],
    strengths: ["5 mg", "10 mg", "20 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Sertraline",
    brands: ["Daxid", "Serta", "Serlift"],
    strengths: ["25 mg", "50 mg", "100 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Fluoxetine",
    brands: ["Fludac", "Prodep"],
    strengths: ["10 mg", "20 mg", "40 mg", "60 mg"],
    form: "Capsule/Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Paroxetine",
    brands: ["Pexep", "Pari"],
    strengths: ["12.5 mg CR", "25 mg CR", "37.5 mg CR"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Fluvoxamine",
    brands: ["Fluvoxin", "Faverin"],
    strengths: ["50 mg", "100 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Venlafaxine",
    brands: ["Veniz XR", "Ventab"],
    strengths: ["37.5 mg", "75 mg", "150 mg"],
    form: "Tablet/Capsule",
    category: "Antidepressant",
  },
  {
    generic: "Desvenlafaxine",
    brands: ["Desveniz", "D-Veniz"],
    strengths: ["25 mg", "50 mg", "100 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Duloxetine",
    brands: ["Duzela", "Dulane"],
    strengths: ["20 mg", "30 mg", "40 mg", "60 mg"],
    form: "Capsule",
    category: "Antidepressant",
  },
  {
    generic: "Mirtazapine",
    brands: ["Mirtaz", "Mirnite"],
    strengths: ["7.5 mg", "15 mg", "30 mg", "45 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Bupropion",
    brands: ["Bupron", "Zupion"],
    strengths: ["150 mg", "300 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Vortioxetine",
    brands: ["Brintellix", "Vortidift"],
    strengths: ["5 mg", "10 mg", "20 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Amitriptyline",
    brands: ["Tryptomer", "Amitone"],
    strengths: ["10 mg", "25 mg", "50 mg", "75 mg"],
    form: "Tablet",
    category: "Antidepressant",
  },
  {
    generic: "Clomipramine",
    brands: ["Anafranil", "Clonil"],
    strengths: ["10 mg", "25 mg", "50 mg", "75 mg SR"],
    form: "Tablet",
    category: "Antidepressant",
  },

  // ANTIPSYCHOTICS
  {
    generic: "Olanzapine",
    brands: ["Oleanz", "Olanex"],
    strengths: ["2.5 mg", "5 mg", "7.5 mg", "10 mg", "15 mg", "20 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Risperidone",
    brands: ["Risperdal", "Sizodon", "Risdone"],
    strengths: ["0.5 mg", "1 mg", "2 mg", "3 mg", "4 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Quetiapine",
    brands: ["Qutan", "Seroquel"],
    strengths: ["25 mg", "50 mg", "100 mg", "200 mg", "300 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Aripiprazole",
    brands: ["Arip MT", "Abilify"],
    strengths: ["2 mg", "5 mg", "10 mg", "15 mg", "20 mg", "30 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Amisulpride",
    brands: ["Solian", "Sulpitac"],
    strengths: ["50 mg", "100 mg", "200 mg", "400 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Lurasidone",
    brands: ["Luramax", "Lurasid"],
    strengths: ["20 mg", "40 mg", "80 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Haloperidol",
    brands: ["Serenace"],
    strengths: ["0.25 mg", "1.5 mg", "5 mg", "10 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },
  {
    generic: "Clozapine",
    brands: ["Clozaril", "Sizopin"],
    strengths: ["25 mg", "50 mg", "100 mg", "200 mg"],
    form: "Tablet",
    category: "Antipsychotic",
  },

  // MOOD STABILIZERS / ANTICONVULSANTS
  {
    generic: "Lithium Carbonate",
    brands: ["Lithosun", "Licab"],
    strengths: ["300 mg", "400 mg CR", "450 mg CR"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },
  {
    generic: "Sodium Valproate",
    brands: ["Valparin", "Encorate"],
    strengths: ["200 mg", "300 mg", "500 mg"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },
  {
    generic: "Divalproex Sodium",
    brands: ["Dicorate ER", "Depakote"],
    strengths: ["250 mg", "500 mg", "750 mg", "1000 mg"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },
  {
    generic: "Lamotrigine",
    brands: ["Lamitor", "Lametec"],
    strengths: ["25 mg", "50 mg", "100 mg", "200 mg"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },
  {
    generic: "Carbamazepine",
    brands: ["Tegretol", "Zeptol"],
    strengths: ["100 mg", "200 mg", "400 mg"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },
  {
    generic: "Oxcarbazepine",
    brands: ["Oxetol", "Trileptal"],
    strengths: ["150 mg", "300 mg", "450 mg", "600 mg"],
    form: "Tablet",
    category: "Mood Stabilizer",
  },

  // ANXIETY / SLEEP
  {
    generic: "Clonazepam",
    brands: ["Clonotril", "Rivotril"],
    strengths: ["0.25 mg", "0.5 mg", "1 mg", "2 mg"],
    form: "Tablet",
    category: "Anxiolytic",
  },
  {
    generic: "Lorazepam",
    brands: ["Ativan", "Larpose"],
    strengths: ["1 mg", "2 mg"],
    form: "Tablet",
    category: "Anxiolytic",
  },
  {
    generic: "Alprazolam",
    brands: ["Alprax", "Restyl"],
    strengths: ["0.25 mg", "0.5 mg", "1 mg"],
    form: "Tablet",
    category: "Anxiolytic",
  },
  {
    generic: "Etizolam",
    brands: ["Etizola", "Etilaam"],
    strengths: ["0.25 mg", "0.5 mg", "1 mg"],
    form: "Tablet",
    category: "Anxiolytic",
  },
  {
    generic: "Zolpidem",
    brands: ["Zolfresh", "Stilnoct"],
    strengths: ["5 mg", "10 mg"],
    form: "Tablet",
    category: "Sleep",
  },
  {
    generic: "Buspirone",
    brands: ["Buspin"],
    strengths: ["5 mg", "10 mg"],
    form: "Tablet",
    category: "Anxiolytic",
  },
  {
    generic: "Pregabalin",
    brands: ["Maxgal", "Pregaba"],
    strengths: ["25 mg", "50 mg", "75 mg", "150 mg"],
    form: "Capsule",
    category: "Anxiety/Neuropathic Pain",
  },

  // ADHD
  {
    generic: "Atomoxetine",
    brands: ["Attera", "Axepta"],
    strengths: ["10 mg", "18 mg", "25 mg", "40 mg", "60 mg"],
    form: "Capsule",
    category: "ADHD",
  },

  // DE-ADDICTION
  {
    generic: "Naltrexone",
    brands: ["Nodict", "Naltima"],
    strengths: ["50 mg"],
    form: "Tablet",
    category: "De-addiction",
  },
  {
    generic: "Acamprosate",
    brands: ["Acamptas"],
    strengths: ["333 mg"],
    form: "Tablet",
    category: "De-addiction",
  },
  {
    generic: "Disulfiram",
    brands: ["Esperal"],
    strengths: ["250 mg"],
    form: "Tablet",
    category: "De-addiction",
  },
  {
    generic: "Baclofen",
    brands: ["Baclof", "Liofen"],
    strengths: ["5 mg", "10 mg", "20 mg"],
    form: "Tablet",
    category: "De-addiction/Muscle Relaxant",
  },

  // PPI / GASTRIC
  {
    generic: "Pantoprazole",
    brands: ["Pantocid", "Pan"],
    strengths: ["20 mg", "40 mg"],
    form: "Tablet",
    category: "Gastric/PPI",
  },
  {
    generic: "Rabeprazole",
    brands: ["Razo", "Rablet"],
    strengths: ["20 mg"],
    form: "Tablet",
    category: "Gastric/PPI",
  },
  {
    generic: "Esomeprazole",
    brands: ["Nexpro"],
    strengths: ["20 mg", "40 mg"],
    form: "Tablet",
    category: "Gastric/PPI",
  },

  // FEVER / PAIN
  {
    generic: "Paracetamol",
    brands: ["Dolo", "Calpol"],
    strengths: ["500 mg", "650 mg"],
    form: "Tablet",
    category: "Pain/Fever",
  },
  {
    generic: "Ibuprofen",
    brands: ["Brufen"],
    strengths: ["200 mg", "400 mg", "600 mg"],
    form: "Tablet",
    category: "Pain/Fever",
  },

  // VITAMINS
  {
    generic: "Methylcobalamin",
    brands: ["Methycobal", "Nurokind"],
    strengths: ["500 mcg", "1500 mcg"],
    form: "Tablet",
    category: "Vitamin",
  },
  {
    generic: "Vitamin D3 (Cholecalciferol)",
    brands: ["Uprise-D3", "D-Rise"],
    strengths: ["1000 IU", "2000 IU", "60000 IU"],
    form: "Tablet/Capsule/Sachet",
    category: "Vitamin",
  },
  {
    generic: "Calcium + Vitamin D3",
    brands: ["Shelcal", "Cipcal"],
    strengths: ["500 mg + D3"],
    form: "Tablet",
    category: "Supplement",
  },

  // DIABETES
  {
    generic: "Metformin",
    brands: ["Glycomet", "Obimet"],
    strengths: ["500 mg", "850 mg", "1000 mg"],
    form: "Tablet",
    category: "Diabetes",
  },
  {
    generic: "Glimepiride",
    brands: ["Amaryl", "Glimisave"],
    strengths: ["1 mg", "2 mg", "3 mg", "4 mg"],
    form: "Tablet",
    category: "Diabetes",
  },
  {
    generic: "Teneligliptin",
    brands: ["Tenepure", "Teneza"],
    strengths: ["20 mg"],
    form: "Tablet",
    category: "Diabetes",
  },

  // BLOOD PRESSURE
  {
    generic: "Telmisartan",
    brands: ["Telma", "Telmikind"],
    strengths: ["20 mg", "40 mg", "80 mg"],
    form: "Tablet",
    category: "Hypertension",
  },
  {
    generic: "Amlodipine",
    brands: ["Amlong", "Stamlo"],
    strengths: ["2.5 mg", "5 mg", "10 mg"],
    form: "Tablet",
    category: "Hypertension",
  },
  {
    generic: "Losartan",
    brands: ["Losar", "Repace"],
    strengths: ["25 mg", "50 mg", "100 mg"],
    form: "Tablet",
    category: "Hypertension",
  },
  {
    generic: "Propranolol",
    brands: ["Inderal", "Ciplar"],
    strengths: ["10 mg", "20 mg", "40 mg", "80 mg"],
    form: "Tablet",
    category: "Hypertension/Anxiety",
  },
];

export default function DoctorPage() {
  const router = useRouter();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaints, setComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [brand, setBrand] = useState("");
  const [strength, setStrength] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instruction, setInstruction] = useState("");

  const [rx, setRx] = useState<RxItem[]>([]);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("doctorLoggedIn");
    if (loggedIn !== "true") {
      router.replace("/doctor/login");
    }
  }, [router]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (q.length < 2) return [];

    return medicines
      .filter((m) => {
        const text = [
          m.generic,
          m.category,
          m.form,
          ...m.brands,
          ...m.strengths,
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(q);
      })
      .slice(0, 12);
  }, [search]);

  function chooseMedicine(m: Medicine) {
    setSelected(m);
    setSearch(m.generic);
    setBrand(m.brands[0] || "");
    setStrength(m.strengths[0] || "");
  }

  function addMedicine() {
    if (!selected) {
      alert("Please select a medicine from search results.");
      return;
    }

    setRx((old) => [
      ...old,
      {
        id: Date.now(),
        generic: selected.generic,
        brand,
        strength,
        form: selected.form,
        dose,
        frequency,
        duration,
        instruction,
      },
    ]);

    setSearch("");
    setSelected(null);
    setBrand("");
    setStrength("");
    setDose("");
    setFrequency("");
    setDuration("");
    setInstruction("");
  }

  function removeMedicine(id: number) {
    setRx((old) => old.filter((item) => item.id !== id));
  }

  function logout() {
    sessionStorage.removeItem("doctorLoggedIn");
    router.replace("/doctor/login");
  }

  return (
    <main className="page">
      <div className="topbar">
        <div>
          <h1>Neuro Mind Bloom</h1>
          <p>Doctor Dashboard • e-Prescription</p>
        </div>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>

      <section className="card">
        <h2>1. Patient Details</h2>

        <div className="grid">
          <input
            placeholder="Patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </section>

      <section className="card">
        <h2>2. Consultation</h2>

        <textarea
          placeholder="Presenting complaints / history"
          value={complaints}
          onChange={(e) => setComplaints(e.target.value)}
        />

        <textarea
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </section>

      <section className="card">
        <h2>3. e-Prescription</h2>

        <label className="label">
          Search Medicine / Brand / Generic
        </label>

        <div className="searchWrap">
          <input
            className="search"
            placeholder="Type e.g. Escitalopram, Nexito, Olanzapine, Pantoprazole..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected(null);
            }}
          />

          {search.trim().length >= 2 && !selected && (
            <div className="dropdown">
              {results.length > 0 ? (
                results.map((m, index) => (
                  <button
                    type="button"
                    className="result"
                    key={`${m.generic}-${index}`}
                    onClick={() => chooseMedicine(m)}
                  >
                    <strong>{m.generic}</strong>

                    <span>
                      {m.brands.join(" • ")}
                    </span>

                    <small>
                      {m.category} | {m.form} | {m.strengths.join(", ")}
                    </small>
                  </button>
                ))
              ) : (
                <div className="noResult">No matching medicine found</div>
              )}
            </div>
          )}
        </div>

        {selected && (
          <div className="selectedBox">
            <div className="selectedTitle">
              {selected.generic}
              <span>{selected.category}</span>
            </div>

            <div className="rxGrid">
              <div>
                <label>Brand</label>
                <input
                  list="brandList"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand"
                />

                <datalist id="brandList">
                  {selected.brands.map((b) => (
                    <option value={b} key={b} />
                  ))}
                </datalist>
              </div>

              <div>
                <label>Strength</label>
                <select
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                >
                  {selected.strengths.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Dose</label>
                <input
                  placeholder="e.g. 1 tablet"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                />
              </div>

              <div>
                <label>Frequency</label>
                <input
                  list="frequencyList"
                  placeholder="e.g. 1-0-1"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />

                <datalist id="frequencyList">
                  <option value="1-0-0" />
                  <option value="0-1-0" />
                  <option value="0-0-1" />
                  <option value="1-0-1" />
                  <option value="1-1-1" />
                  <option value="SOS" />
                  <option value="HS" />
                </datalist>
              </div>

              <div>
                <label>Duration</label>
                <input
                  placeholder="e.g. 14 days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div>
                <label>Instruction</label>
                <input
                  placeholder="e.g. after food"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                />
              </div>
            </div>

            <button className="primary" onClick={addMedicine}>
              + Add Medicine
            </button>
          </div>
        )}

        {rx.length > 0 && (
          <div className="rxList">
            <h3>Rx</h3>

            {rx.map((item, index) => (
              <div className="rxItem" key={item.id}>
                <div>
                  <strong>
                    {index + 1}. {item.brand || item.generic}
                  </strong>

                  <div className="generic">
                    {item.generic}
                    {item.strength ? ` • ${item.strength}` : ""}
                    {item.form ? ` • ${item.form}` : ""}
                  </div>

                  <div>
                    {[item.dose, item.frequency, item.duration]
                      .filter(Boolean)
                      .join(" • ")}
                  </div>

                  {item.instruction && (
                    <small>{item.instruction}</small>
                  )}
                </div>

                <button
                  className="remove"
                  onClick={() => removeMedicine(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card preview">
        <h2>Prescription Preview</h2>

        <div className="prescription">
          <div className="doctor">
            <h2>Dr. Kuldeep Budania</h2>
            <strong>MD Psychiatry</strong>
            <p>Neuro Mind Bloom</p>
          </div>

          <hr />

          <p>
            <b>Patient:</b> {patientName || "—"}
          </p>

          <p>
            <b>Age/Gender:</b> {age || "—"} {gender ? `/ ${gender}` : ""}
          </p>

          <p>
            <b>Mobile:</b> {mobile || "—"}
          </p>

          <p>
            <b>Complaints:</b> {complaints || "—"}
          </p>

          <p>
            <b>Diagnosis:</b> {diagnosis || "—"}
          </p>

          <h3>Rx</h3>

          {rx.length === 0 ? (
            <p>No medicines added.</p>
          ) : (
            rx.map((item, index) => (
              <div className="printRx" key={item.id}>
                <b>
                  {index + 1}. {item.brand || item.generic}
                  {item.strength ? ` ${item.strength}` : ""}
                </b>

                {item.brand && item.brand !== item.generic && (
                  <span> ({item.generic})</span>
                )}

                <div>
                  {[item.dose, item.frequency, item.duration]
                    .filter(Boolean)
                    .join(" • ")}
                </div>

                {item.instruction && <small>{item.instruction}</small>}
              </div>
            ))
          )}

          <div className="signature">
            <p>Dr. Kuldeep Budania</p>
            <p>MD Psychiatry</p>
          </div>
        </div>

        <button className="print" onClick={() => window.print()}>
          Print Prescription
        </button>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f4f7f7;
          padding: 28px;
          color: #18343b;
          font-family: Arial, sans-serif;
        }

        .topbar {
          max-width: 1100px;
          margin: 0 auto 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .topbar h1 {
          margin: 0;
          font-size: 30px;
        }

        .topbar p {
          margin: 6px 0 0;
          color: #63777b;
        }

        .card {
          max-width: 1100px;
          margin: 18px auto;
          background: white;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }

        h2 {
          margin-top: 0;
        }

        .grid,
        .rxGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid #ccd7d9;
          border-radius: 10px;
          padding: 13px;
          font-size: 15px;
          background: white;
        }

        textarea {
          min-height: 110px;
          resize: vertical;
          margin-bottom: 12px;
        }

        .label,
        .rxGrid label {
          display: block;
          font-weight: 700;
          margin-bottom: 7px;
        }

        .searchWrap {
          position: relative;
        }

        .search {
          font-size: 17px;
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ccd7d9;
          border-radius: 12px;
          max-height: 390px;
          overflow-y: auto;
          z-index: 50;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.16);
        }

        .result {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 13px;
          border: 0;
          border-bottom: 1px solid #edf1f2;
          background: white;
          cursor: pointer;
          text-align: left;
        }

        .result:hover {
          background: #f0f8f7;
        }

        .result strong {
          font-size: 16px;
        }

        .result span {
          color: #245c63;
        }

        .result small {
          color: #6e7e82;
        }

        .noResult {
          padding: 18px;
          color: #777;
        }

        .selectedBox {
          margin-top: 18px;
          padding: 18px;
          border-radius: 14px;
          background: #f5faf9;
          border: 1px solid #dce8e6;
        }

        .selectedTitle {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .selectedTitle span {
          margin-left: 10px;
          font-size: 13px;
          font-weight: 500;
          background: #dcefed;
          padding: 5px 8px;
          border-radius: 20px;
        }

        .primary,
        .print,
        .logout {
          border: 0;
          border-radius: 10px;
          padding: 12px 18px;
          font-weight: 700;
          cursor: pointer;
        }

        .primary,
        .print {
          margin-top: 16px;
          background: #245d63;
          color: white;
        }

        .logout {
          background: #e7eeee;
          color: #23464b;
        }

        .rxList {
          margin-top: 25px;
        }

        .rxItem {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid #e3e8e9;
        }

        .generic {
          color: #587176;
          margin: 5px 0;
        }

        .remove {
          border: 0;
          background: #fff0f0;
          color: #b22929;
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          height: fit-content;
        }

        .prescription {
          border: 1px solid #d8e0e1;
          padding: 28px;
          border-radius: 12px;
          background: white;
        }

        .doctor {
          text-align: center;
        }

        .doctor h2 {
          margin-bottom: 5px;
        }

        .doctor p {
          margin-top: 5px;
        }

        .printRx {
          margin: 15px 0;
          line-height: 1.6;
        }

        .signature {
          text-align: right;
          margin-top: 50px;
          line-height: 1.2;
        }

        .signature p {
          margin: 3px;
        }

        @media (max-width: 700px) {
          .page {
            padding: 12px;
          }

          .grid,
          .rxGrid {
            grid-template-columns: 1fr;
          }

          .topbar h1 {
            font-size: 23px;
          }

          .card {
            padding: 17px;
          }
        }

        @media print {
          .topbar,
          .page > .card:not(.preview),
          .preview > h2,
          .print {
            display: none !important;
          }

          .page {
            padding: 0;
            background: white;
          }

          .preview {
            box-shadow: none;
            margin: 0;
            padding: 0;
          }

          .prescription {
            border: 0;
          }
        }
      `}</style>
    </main>
  );
}
