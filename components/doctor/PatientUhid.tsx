"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { findPatientsByMobile } from "../../lib/client/patients";
import { normaliseMobile, samePerson, type Patient } from "../../lib/patients";

type Props = {
  uhid: string;
  name: string;
  mobile: string;
  onSelect: (patient: Patient | null) => void;
};

/**
 * Prescription page helper: shows the patient's UHID, or offers matching
 * patients with the same mobile. If nothing is chosen, a UHID is created
 * automatically when the prescription is saved.
 */
export default function PatientUhid({ uhid, name, mobile, onSelect }: Props) {
  const [matches, setMatches] = useState<Patient[]>([]);
  const [busy, setBusy] = useState(false);
  const mobile10 = normaliseMobile(mobile);

  useEffect(() => {
    if (uhid || !mobile10) {
      setMatches([]);
      return;
    }
    let active = true;
    setBusy(true);
    const timer = setTimeout(() => {
      findPatientsByMobile(mobile10)
        .then((list) => active && setMatches(list))
        .catch(() => active && setMatches([]))
        .finally(() => active && setBusy(false));
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [uhid, mobile10]);

  if (uhid) {
    return (
      <div style={box}>
        <span style={chip}>UHID {uhid}</span>
        <Link href={`/doctor/patients/${uhid}`} style={link} target="_blank">
          View visit history ↗
        </Link>
        <button type="button" onClick={() => onSelect(null)} style={plain}>
          Change
        </button>
      </div>
    );
  }

  if (!mobile10) {
    return <div style={{ ...box, color: "#55606b" }}>Enter a valid mobile number — a UHID is created automatically on save.</div>;
  }

  const likely = matches.find((m) => samePerson(m.name, name));
  return (
    <div style={box}>
      {busy && <span style={{ color: "#55606b" }}>Checking existing patients…</span>}
      {!busy && matches.length === 0 && <span style={{ color: "#55606b" }}>New patient — UHID will be created on save.</span>}
      {!busy &&
        matches.map((m) => (
          <button key={m.uhid} type="button" onClick={() => onSelect(m)} style={m === likely ? { ...pick, ...pickStrong } : pick}>
            Use {m.uhid} · {m.name}
            {m.age || m.sex ? ` (${[m.age, m.sex].filter(Boolean).join("/")})` : ""}
            {m.visitCount ? ` · ${m.visitCount} visits` : ""}
          </button>
        ))}
      {!busy && matches.length > 0 && !likely && <span style={{ color: "#55606b" }}>Different person? A new UHID is created on save.</span>}
    </div>
  );
}

const box = { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", margin: "10px 0 4px", fontSize: 14 } as const;
const chip = { background: "#e6f2ef", color: "#0f5c4d", fontWeight: 800, padding: "6px 12px", borderRadius: 999 } as const;
const link = { color: "#0f5c4d", fontWeight: 700 } as const;
const plain = { border: "1px solid #cbd5e1", background: "white", borderRadius: 8, padding: "5px 10px", cursor: "pointer" } as const;
const pick = { border: "1px solid #cbd5e1", background: "white", borderRadius: 999, padding: "6px 12px", cursor: "pointer" } as const;
const pickStrong = { borderColor: "#0f5c4d", background: "#e6f2ef", fontWeight: 700 } as const;
