"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPatient, loadPatientHistory } from "../../../../lib/client/patients";
import { buildTimeline, isUhid, type Patient, type TimelineEvent } from "../../../../lib/patients";

const KIND: Record<TimelineEvent["kind"], { label: string; color: string }> = {
  prescription: { label: "Rx", color: "#0f5c4d" },
  appointment: { label: "Appt", color: "#176b87" },
  payment: { label: "₹", color: "#b45309" },
  followup: { label: "F/U", color: "#6d28d9" },
};

/** One patient: details + consultation history timeline (newest first). */
export default function PatientHistoryPage() {
  const params = useParams();
  const uhid = String(Array.isArray(params?.uhid) ? params.uhid[0] : params?.uhid || "");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">("loading");

  useEffect(() => {
    if (!isUhid(uhid)) {
      setState("missing");
      return;
    }
    let active = true;
    (async () => {
      try {
        const p = await getPatient(uhid);
        if (!active) return;
        if (!p) return setState("missing");
        setPatient(p);
        const history = await loadPatientHistory(p);
        if (!active) return;
        setEvents(buildTimeline(history));
        setState("ready");
      } catch (e) {
        console.error(e);
        if (active) setState("error");
      }
    })();
    return () => {
      active = false;
    };
  }, [uhid]);

  const fmt = (ms: number) =>
    ms ? new Date(ms).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Date not recorded";

  return (
    <main style={{ minHeight: "100vh", background: "#f4f7fb", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Link href="/doctor/patients" style={{ color: "#0f5c4d", fontWeight: 700 }}>← All patients</Link>

        {state === "loading" && <div style={card}>Loading…</div>}
        {state === "missing" && <div style={card}>Patient {uhid} not found.</div>}
        {state === "error" && <div style={{ ...card, color: "#b91c1c" }}>History could not be loaded. Please reload.</div>}

        {patient && (
          <div style={{ ...card, marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h1 style={{ margin: 0 }}>{patient.name}</h1>
                <div style={{ color: "#55606b", marginTop: 6 }}>
                  {[patient.age, patient.sex].filter(Boolean).join(" / ")} · {patient.mobile || patient.mobile10}
                  {patient.email ? ` · ${patient.email}` : ""}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={chip}>{patient.uhid}</span>
                <div style={{ marginTop: 12 }}>
                  <Link href={`/doctor/prescription?uhid=${patient.uhid}`} style={btn}>+ New prescription</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === "ready" && (
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Consultation history ({events.length})</h2>
            {events.length === 0 && <p style={{ color: "#55606b" }}>No visits recorded yet.</p>}
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {events.map((e) => (
                <li key={`${e.kind}:${e.refId}`} style={{ display: "flex", gap: 12, padding: "12px 0", borderTop: "1px solid #eef2f5" }}>
                  <span style={{ flex: "0 0 44px", height: 44, borderRadius: 999, background: KIND[e.kind].color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>
                    {KIND[e.kind].label}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: "#55606b" }}>{fmt(e.at)}</div>
                    <div style={{ fontWeight: 700 }}>{e.title}</div>
                    {e.detail && <div style={{ color: "#334155", fontSize: 14, overflowWrap: "anywhere" }}>{e.detail}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}

const card = { background: "white", borderRadius: 14, padding: 18, marginBottom: 14, boxShadow: "0 3px 14px rgba(0,0,0,.06)" } as const;
const chip = { background: "#e6f2ef", color: "#0f5c4d", fontWeight: 800, padding: "6px 12px", borderRadius: 999 } as const;
const btn = { background: "#0f5c4d", color: "white", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 700 } as const;
