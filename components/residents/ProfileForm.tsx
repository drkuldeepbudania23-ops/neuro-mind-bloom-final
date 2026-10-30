"use client";

import { FormEvent, useState } from "react";
import { api } from "../../lib/client/residentApi";
import type { ResidentProfile } from "../../lib/residents";
import { card, field, label, primaryBtn } from "./ui";

const FIELD_ERRORS: Record<string, string> = {
  "invalid-name": "Please enter your full name.",
  "invalid-mobile": "Please enter a valid 10-digit Indian mobile number.",
  "invalid-college": "Please enter your college / institute.",
  "invalid-course": "Please enter your course (e.g. MD Psychiatry).",
};

export default function ProfileForm({ initial, onSaved }: { initial?: Partial<ResidentProfile> | null; onSaved: () => void }) {
  const [form, setForm] = useState<ResidentProfile>({
    name: initial?.name || "",
    mobile: initial?.mobile || "",
    college: initial?.college || "",
    course: initial?.course || "MD Psychiatry",
    year: initial?.year || "",
  });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ResidentProfile) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const { data } = await api("/api/residents/profile", { body: form });
    setBusy(false);
    if (data.ok) return onSaved();
    setMsg(FIELD_ERRORS[data.error || ""] || "Could not save. Please try again.");
  }

  return (
    <form onSubmit={submit} style={card}>
      <h2 style={{ marginTop: 0, color: "#062b31" }}>Your details</h2>
      <p style={{ marginTop: 0, color: "#475569" }}>Used for your account and printed on the notes you download.</p>
      <label style={label} htmlFor="r-name">Full name</label>
      <input id="r-name" required value={form.name} onChange={set("name")} style={field} autoComplete="name" />
      <label style={label} htmlFor="r-mobile">Mobile (WhatsApp)</label>
      <input id="r-mobile" required inputMode="tel" value={form.mobile} onChange={set("mobile")} style={field} autoComplete="tel" />
      <label style={label} htmlFor="r-college">College / institute</label>
      <input id="r-college" required value={form.college} onChange={set("college")} style={field} />
      <label style={label} htmlFor="r-course">Course</label>
      <input id="r-course" required value={form.course} onChange={set("course")} style={field} placeholder="MD Psychiatry / DNB Psychiatry / Intern" />
      <label style={label} htmlFor="r-year">Year</label>
      <input id="r-year" value={form.year} onChange={set("year")} style={field} placeholder="1st / 2nd / 3rd" />
      {msg && <p role="alert" style={{ color: "#b45309" }}>{msg}</p>}
      <button type="submit" disabled={busy} style={{ ...primaryBtn, marginTop: 16 }}>{busy ? "Saving…" : "Save"}</button>
    </form>
  );
}
