"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { logAction } from "../../../lib/client/audit";
import { FEEDBACK_LIMITS, PUBLIC_REVIEWS_ENABLED, type FeedbackDoc, type FeedbackStatus } from "../../../lib/feedback";

/**
 * Doctor → Patient feedback moderation: approve, edit, reject, delete.
 * Approving does NOT publish while PUBLIC_REVIEWS_ENABLED is false (lib/feedback.ts).
 */
const box: React.CSSProperties = { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 18, marginTop: 16 };
const btn: React.CSSProperties = { padding: "8px 14px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", cursor: "pointer", fontWeight: 700 };
const input: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, boxSizing: "border-box" };

export default function DoctorFeedbackPage() {
  const [items, setItems] = useState<FeedbackDoc[]>([]);
  const [filter, setFilter] = useState<FeedbackStatus | "all">("pending");
  const [editing, setEditing] = useState<FeedbackDoc | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const snap = await getDocs(collection(db, "feedback"));
      setItems(snap.docs.map((d: { id: string; data(): unknown }) => ({ ...(d.data() as FeedbackDoc), id: d.id })).sort((a: FeedbackDoc, b: FeedbackDoc) => b.reviewDate.localeCompare(a.reviewDate)));
      setMsg("");
    } catch (e) {
      console.error(e);
      setMsg("Could not load feedback. Deploy the Firestore rules for the feedback collection first.");
    }
  }
  useEffect(() => {
    load();
  }, []);

  const shown = useMemo(() => (filter === "all" ? items : items.filter((f) => f.status === filter)), [items, filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { pending: 0, approved: 0, rejected: 0 };
    items.forEach((f) => (c[f.status] = (c[f.status] ?? 0) + 1));
    return c;
  }, [items]);
  const avg = useMemo(() => (items.length ? (items.reduce((s, f) => s + f.rating, 0) / items.length).toFixed(1) : "–"), [items]);

  async function setStatus(f: FeedbackDoc, status: FeedbackStatus) {
    if (!f.id) return;
    await updateDoc(doc(db, "feedback", f.id), { status, moderatedAt: new Date().toISOString().slice(0, 10) });
    logAction(`feedback.${status}`, { id: f.id });
    load();
  }

  async function saveEdit() {
    if (!editing?.id) return;
    const comment = editing.comment.trim();
    const name = editing.name.trim();
    if (comment.length < FEEDBACK_LIMITS.minComment || comment.length > FEEDBACK_LIMITS.comment || name.length > FEEDBACK_LIMITS.name) return setMsg("Comment must be 10–1000 characters and name up to 60.");
    await updateDoc(doc(db, "feedback", editing.id), { comment, name, moderatorNote: (editing.moderatorNote ?? "").slice(0, 300), moderatedAt: new Date().toISOString().slice(0, 10) });
    logAction("feedback.edit", { id: editing.id });
    setEditing(null);
    load();
  }

  async function remove(f: FeedbackDoc) {
    if (!f.id || !window.confirm("Delete this feedback permanently?")) return;
    await deleteDoc(doc(db, "feedback", f.id));
    logAction("feedback.delete", { id: f.id });
    load();
  }

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "auto", fontFamily: "system-ui, sans-serif" }}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Patient Feedback</h1>
      <p style={{ color: "#475569", marginTop: 0 }}>
        Feedback submitted on the website. Edit only to remove identifying or clinical details — never to change meaning.
      </p>
      <p style={{ background: PUBLIC_REVIEWS_ENABLED ? "#ecfdf5" : "#f1f5f9", padding: 10, borderRadius: 10 }}>
        Public display is <strong>{PUBLIC_REVIEWS_ENABLED ? "ON" : "OFF"}</strong>.{" "}
        {PUBLIC_REVIEWS_ENABLED
          ? "Approved feedback whose author consented to display is shown on /feedback."
          : "Approved feedback is kept private. Turn on PUBLIC_REVIEWS_ENABLED in lib/feedback.ts only after legal/ethical review."}
      </p>
      {msg && <p role="status" style={{ background: "#fff7ed", border: "1px solid #fed7aa", padding: 10, borderRadius: 10 }}>{msg}</p>}

      <div style={{ ...box, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {(["pending", "approved", "rejected", "all"] as const).map((s) => (
          <button key={s} style={{ ...btn, background: filter === s ? "#0b4a52" : "white", color: filter === s ? "white" : "#0f172a" }} onClick={() => setFilter(s)}>
            {s[0].toUpperCase() + s.slice(1)} {s !== "all" ? `(${counts[s] ?? 0})` : `(${items.length})`}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#475569" }}>Average of all submissions: <strong>{avg}</strong>/5</span>
      </div>

      <div style={box}>
        {shown.length === 0 && <p>No feedback here.</p>}
        {shown.map((f) => (
          <div key={f.id} style={{ borderTop: "1px solid #f1f5f9", padding: "14px 0" }}>
            {editing?.id === f.id ? (
              <div style={{ display: "grid", gap: 8 }}>
                <input style={input} value={editing?.name ?? ""} maxLength={FEEDBACK_LIMITS.name} onChange={(e) => { const v = e.target.value; setEditing((x) => x && { ...x, name: v }); }} placeholder="Display name" />
                <textarea style={{ ...input, minHeight: 110 }} value={editing?.comment ?? ""} maxLength={FEEDBACK_LIMITS.comment} onChange={(e) => { const v = e.target.value; setEditing((x) => x && { ...x, comment: v }); }} />
                <input style={input} value={editing?.moderatorNote ?? ""} maxLength={300} onChange={(e) => { const v = e.target.value; setEditing((x) => x && { ...x, moderatorNote: v }); }} placeholder="Internal note (why it was edited)" />
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...btn, background: "#0b4a52", color: "white" }} onClick={saveEdit}>Save</button>
                  <button style={btn} onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                  <strong style={{ color: "#b45309" }}>{"★".repeat(f.rating)}<span style={{ color: "#cbd5e1" }}>{"★".repeat(5 - f.rating)}</span></strong>
                  <span style={{ fontSize: 13, color: "#64748b" }}>
                    {f.reviewDate} · {f.status} · {f.consentDisplay ? "may be displayed" : "private only"} · {f.language.toUpperCase()}
                  </span>
                </div>
                <p style={{ whiteSpace: "pre-line", margin: "8px 0" }}>{f.comment}</p>
                <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
                  — {f.name || "Anonymous"}{f.visitDate ? ` · visit ${f.visitDate}` : ""}{f.moderatorNote ? ` · note: ${f.moderatorNote}` : ""}
                </p>
                <details style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                  <summary>Consent record (v{f.consentVersion})</summary>
                  <p>{f.consentText}</p>
                </details>
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  {f.status !== "approved" && <button style={btn} onClick={() => setStatus(f, "approved")}>Approve</button>}
                  {f.status !== "rejected" && <button style={btn} onClick={() => setStatus(f, "rejected")}>Reject</button>}
                  <button style={btn} onClick={() => setEditing(f)}>Edit</button>
                  <button style={{ ...btn, color: "#b91c1c" }} onClick={() => remove(f)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
