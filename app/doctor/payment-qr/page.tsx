"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import SendPaymentQR from "../../../components/doctor/SendPaymentQR";
import { SERVICES, getService, serviceCodeFromText } from "../../../lib/site";
import { apptDate, statusOf } from "../../../lib/appointments";

type Appt = {
  id: string; patientName?: string; name?: string; mobile?: string; email?: string;
  service?: string; serviceCode?: string; preferredDate?: string; date?: string;
  preferredTime?: string; time?: string; status?: string; paymentStatus?: string; language?: string;
};
type Pat = { uhid: string; name?: string; mobile?: string; mobile10?: string; email?: string };
type Pick =
  | { kind: "appt"; a: Appt }
  | { kind: "patient"; p: Pat };

const PAID = ["Paid", "Discount", "Exempt"];

/** Short reference for a payment that is not tied to a website booking (walk-in / phone patient). */
function newReference(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `W${ymd}${rnd}`;
}

/**
 * Doctor → Send Payment QR to any patient (walk-in, phone or old patient) —
 * no website booking needed. Builds the same payment page link (clinic UPI QR + amount).
 */
export default function PaymentQrPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [serviceCode, setServiceCode] = useState<string>(SERVICES[0].code);
  const [reference, setReference] = useState(newReference);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [patients, setPatients] = useState<Pat[]>([]);
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<Appt | null>(null);
  const [loadMsg, setLoadMsg] = useState("Loading appointments…");

  // Appointments + UHID patients, so the doctor can pick instead of typing.
  useEffect(() => {
    (async () => {
      try {
        const [aSnap, pSnap] = await Promise.all([
          getDocs(query(collection(db, "appointments"), limit(2000))),
          getDocs(query(collection(db, "patients"), limit(5000))).catch(() => null),
        ]);
        const a = aSnap.docs.map((d) => ({ ...(d.data() as Appt), id: d.id }));
        a.sort((x, y) => (apptDate(y) || "").localeCompare(apptDate(x) || ""));
        setAppts(a);
        if (pSnap) setPatients(pSnap.docs.map((d) => ({ ...(d.data() as Pat), uhid: d.id })));
        setLoadMsg("");
        // Opened as /doctor/payment-qr?appointmentId=… → preselect it.
        const id = new URLSearchParams(window.location.search).get("appointmentId");
        const hit = id && a.find((x) => x.id === id);
        if (hit) choose({ kind: "appt", a: hit });
      } catch (e) {
        console.error(e);
        setLoadMsg("Appointments load nahi ho paaye — naam/mobile khud bhar sakte hain.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matches = useMemo((): Pick[] => {
    const t = search.trim().toLowerCase();
    // Nothing typed yet: show recent unpaid bookings so one click is enough.
    if (t.length < 2) {
      if (picked) return [];
      return appts
        .filter((a) => statusOf(a) !== "cancelled" && !PAID.includes(a.paymentStatus || ""))
        .slice(0, 6)
        .map((a) => ({ kind: "appt" as const, a }));
    }
    const dig = t.replace(/\D/g, "");
    const hit = (n?: string, m?: string) =>
      (n || "").toLowerCase().includes(t) || (dig.length >= 4 && (m || "").replace(/\D/g, "").includes(dig));
    const fromAppts: Pick[] = appts.filter((a) => hit(a.patientName || a.name, a.mobile)).slice(0, 8).map((a) => ({ kind: "appt", a }));
    const fromPatients: Pick[] = patients.filter((p) => hit(p.name, p.mobile10 || p.mobile)).slice(0, 5).map((p) => ({ kind: "patient", p }));
    return [...fromAppts, ...fromPatients];
  }, [search, appts, patients, picked]);

  function choose(item: Pick) {
    if (item.kind === "appt") {
      const a = item.a;
      setName(a.patientName || a.name || "");
      setMobile(a.mobile || "");
      setEmail(a.email || "");
      const code = a.serviceCode && getService(a.serviceCode) ? a.serviceCode : serviceCodeFromText(a.service || "");
      setServiceCode(code);
      setReference(a.id);
      setPicked(a);
    } else {
      const p = item.p;
      setName(p.name || "");
      setMobile(p.mobile10 || p.mobile || "");
      setEmail(p.email || "");
      setReference(newReference());
      setPicked(null);
    }
    setSearch("");
  }

  function clearPick() {
    setPicked(null);
    setName(""); setMobile(""); setEmail("");
    setServiceCode(SERVICES[0].code);
    setReference(newReference());
  }

  const digits = mobile.replace(/\D/g, "").slice(-10);
  const ready = name.trim().length >= 2 && digits.length === 10;

  const appointment = useMemo(
    () => ({
      id: reference, name: name.trim(), mobile: digits, email: email.trim(), serviceCode,
      date: picked ? apptDate(picked) : undefined,
      time: picked ? picked.time || picked.preferredTime : undefined,
      language: picked?.language,
    }),
    [reference, name, digits, email, serviceCode, picked]
  );
  const pickedPaid = Boolean(picked && PAID.includes(picked.paymentStatus || ""));

  return (
    <main style={s.page}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Send Payment QR</h1>
      <p style={s.muted}>
        Kisi bhi patient ko payment QR bhejein — walk-in, phone ya purane patient, website booking ki zaroorat nahi.
        Website se aayi bookings ke liye Appointments page par bhi yeh option hai.
      </p>

      <section style={s.card}>
        <label style={s.label}>Appointment / patient search karein (naam ya mobile)
          <input style={s.input} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g. Ramesh / 98765" />
        </label>
        {loadMsg && <p style={s.muted}>{loadMsg}</p>}
        {matches.length > 0 && (
          <div style={s.list}>
            {matches.map((m) =>
              m.kind === "appt" ? (
                <button key={`a-${m.a.id}`} type="button" style={s.item} onClick={() => choose(m)}>
                  <b>{m.a.patientName || m.a.name || "—"}</b>{" "}
                  <span style={s.muted}>
                    · {m.a.mobile || "no mobile"} · {apptDate(m.a) || "no date"} · {statusOf(m.a)} ·{" "}
                    {PAID.includes(m.a.paymentStatus || "") ? "Paid" : "Unpaid"}
                  </span>
                </button>
              ) : (
                <button key={`p-${m.p.uhid}`} type="button" style={s.item} onClick={() => choose(m)}>
                  <b>{m.p.name || "—"}</b> <span style={s.muted}>· {m.p.mobile10 || m.p.mobile || ""} · {m.p.uhid} (patient)</span>
                </button>
              )
            )}
          </div>
        )}
        {picked && (
          <p style={s.picked}>
            Appointment selected: {apptDate(picked) || "—"} {picked.time || picked.preferredTime || ""} · {statusOf(picked)}{" "}
            <button type="button" style={s.linkBtn} onClick={clearPick}>Clear</button>
          </p>
        )}
        {pickedPaid && <p style={s.warn}>Is appointment ka payment pehle se record hai.</p>}

        <label style={s.label}>Patient name
          <input style={s.input} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        </label>
        <label style={s.label}>Mobile (WhatsApp)
          <input style={s.input} value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" placeholder="98XXXXXXXX" />
        </label>
        <label style={s.label}>Email (optional)
          <input style={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label style={s.label}>Service
          <select style={s.input} value={serviceCode} onChange={(e) => setServiceCode(e.target.value)}>
            {SERVICES.map((sv) => (
              <option key={sv.code} value={sv.code}>{sv.label.en} – ₹{sv.fee}</option>
            ))}
          </select>
        </label>
        <p style={s.muted}>
          Reference: <b style={{ fontFamily: "monospace" }}>{reference}</b>{" "}
          <button type="button" style={s.linkBtn} onClick={() => setReference(newReference())}>New reference</button>
        </p>

        {ready ? (
          <SendPaymentQR
            key={`${reference}-${serviceCode}`}
            appointment={appointment}
            confirmed={Boolean(picked && statusOf(picked) === "confirmed")}
            allowAuto={Boolean(picked)}
          />
        ) : (
          <p style={s.warn}>Naam aur 10-digit mobile number daalein — phir WhatsApp / Email / QR page buttons dikhenge.</p>
        )}
      </section>

      <p style={s.muted}>
        Payment aane ke baad <Link href="/doctor/payment">Payment</Link> page par record karein (reference: {reference}).
      </p>
    </main>
  );
}

const s: Record<string, CSSProperties> = {
  page: { maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif", color: "#123" },
  muted: { color: "#475569", lineHeight: 1.5 },
  card: { display: "grid", gap: 12, border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginTop: 16, background: "white" },
  label: { display: "grid", gap: 4, fontWeight: 700 },
  input: { padding: 11, border: "1px solid #cbd5e1", borderRadius: 8, fontWeight: 400 },
  linkBtn: { border: 0, background: "none", color: "#176b87", cursor: "pointer", textDecoration: "underline", padding: 0 },
  warn: { color: "#b45309", fontWeight: 600 },
  list: { display: "grid", gap: 6, border: "1px solid #e2e8f0", borderRadius: 10, padding: 6, background: "#f8fafc" },
  item: { textAlign: "left", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", background: "white", cursor: "pointer", fontSize: 14 },
  picked: { margin: 0, padding: "8px 10px", background: "#ecfdf5", borderRadius: 8, color: "#065f46" },
};
