"use client";

import { useMemo, useState } from "react";
import { medicines } from "../../../data/medicines";

type RxItem = {
  generic: string;
  brand: string;
  strength: string;
  dose: string;
  frequency: string;
  duration: string;
  instruction: string;
};

export default function PrescriptionPage() {
  const [search, setSearch] = useState("");
  const [rx, setRx] = useState<RxItem[]>([]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicines.slice(0, 30);

    return medicines
      .filter((m) =>
        [
          m.generic,
          m.category,
          ...(m.brands || []),
          ...(m.strengths || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 50);
  }, [search]);

  function addMedicine(m: (typeof medicines)[number]) {
    setRx((old) => [
      ...old,
      {
        generic: m.generic,
        brand: m.brands?.[0] || "",
        strength: m.strengths?.[0] || "",
        dose: "1 tablet",
        frequency: "OD",
        duration: "30 days",
        instruction: "After food",
      },
    ]);
    setSearch("");
  }

  function update(index: number, key: keyof RxItem, value: string) {
    setRx((old) =>
      old.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }

  function remove(index: number) {
    setRx((old) => old.filter((_, i) => i !== index));
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>E-Prescription</h1>
          <p style={styles.muted}>
            Search generic name, common brand, strength or category.
          </p>
        </div>
      </div>

      <section style={styles.card}>
        <h2>Medicine Search</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. escitalopram, Nexito, lithium, BP, diabetes..."
          style={styles.input}
        />

        <div style={styles.results}>
          {results.map((m, i) => (
            <button
              key={`${m.generic}-${i}`}
              onClick={() => addMedicine(m)}
              style={styles.medButton}
            >
              <strong>{m.generic}</strong>
              <span>{m.category}</span>
              {m.brands.length > 0 && (
                <small>Brands: {m.brands.join(", ")}</small>
              )}
              {m.strengths?.length ? (
                <small>Strengths: {m.strengths.join(", ")}</small>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.card}>
        <h2>Prescription</h2>

        {rx.length === 0 ? (
          <p style={styles.muted}>No medicine selected yet.</p>
        ) : (
          rx.map((item, index) => (
            <div key={index} style={styles.rxRow}>
              <div style={styles.rxTitle}>
                <strong>{index + 1}. {item.generic}</strong>
                <button onClick={() => remove(index)} style={styles.remove}>
                  Remove
                </button>
              </div>

              <div style={styles.grid}>
                <input
                  value={item.brand}
                  onChange={(e) => update(index, "brand", e.target.value)}
                  placeholder="Brand"
                  style={styles.input}
                />
                <input
                  value={item.strength}
                  onChange={(e) => update(index, "strength", e.target.value)}
                  placeholder="Strength"
                  style={styles.input}
                />
                <input
                  value={item.dose}
                  onChange={(e) => update(index, "dose", e.target.value)}
                  placeholder="Dose"
                  style={styles.input}
                />

                <select
                  value={item.frequency}
                  onChange={(e) => update(index, "frequency", e.target.value)}
                  style={styles.input}
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
                </select>

                <input
                  value={item.duration}
                  onChange={(e) => update(index, "duration", e.target.value)}
                  placeholder="Duration"
                  style={styles.input}
                />

                <select
                  value={item.instruction}
                  onChange={(e) => update(index, "instruction", e.target.value)}
                  style={styles.input}
                >
                  <option>After food</option>
                  <option>Before food</option>
                  <option>With food</option>
                  <option>At bedtime</option>
                  <option>Morning</option>
                  <option>As required</option>
                </select>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: 20 }}>
          <button onClick={() => window.print()} style={styles.primary}>
            Print / Save Prescription
          </button>
        </div>
      </section>

      <div style={styles.note}>
        Clinical prescribing tool: verify indication, contraindications,
        interactions, pregnancy status, renal/hepatic function and current
        prescribing information before issuing a prescription.
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  muted: { color: "#666" },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 9,
    background: "#fff",
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
    gap: 10,
    marginTop: 14,
    maxHeight: 430,
    overflowY: "auto",
  },
  medButton: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gap: 4,
    padding: 12,
    border: "1px solid #dbe3ea",
    borderRadius: 10,
    background: "#f8fafc",
    cursor: "pointer",
  },
  rxRow: {
    borderTop: "1px solid #eee",
    paddingTop: 16,
    marginTop: 16,
  },
  rxTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
    gap: 10,
  },
  remove: {
    border: 0,
    background: "transparent",
    cursor: "pointer",
    color: "#b91c1c",
  },
  primary: {
    border: 0,
    borderRadius: 10,
    padding: "12px 18px",
    background: "#176b87",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  note: {
    fontSize: 12,
    color: "#666",
    padding: 8,
  },
};
