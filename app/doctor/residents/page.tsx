"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api, uploadNotePdf } from "../../../lib/client/residentApi";
import { CONTENT_LABEL, CONTENT_TYPES, type ContentType, type Plan } from "../../../lib/residents";
import { formatINR } from "../../../lib/site";
import { RESIDENT_JOIN_PATH } from "../../../lib/appShell";

/**
 * Doctor → Residents: write notes / videos / case discussions, see subscribers and payments,
 * moderate comments, change plan prices. All reads/writes go through /api/doctor/residents/**
 * (server verifies the doctor claim + 2FA session).
 */

type Item = {
  id: string;
  type: ContentType;
  title: string;
  topic: string;
  summary: string;
  body: string;
  videoId: string;
  pdfPath: string;
  pdfName: string;
  status: "draft" | "published";
  commentsOpen: boolean;
  updatedAt: number;
};
type Resident = {
  uid: string;
  name: string;
  email: string;
  mobile: string;
  college: string;
  course: string;
  year: string;
  plan: string;
  accessUntil: number | null;
  active: boolean;
  blocked: boolean;
  createdAt: number;
};
type Payment = { id: string; uid: string; planId: string; amount: number; mode: string; createdAt: number };
type Comment = { id: string; contentId: string; name: string; text: string; byDoctor: boolean; status: string; createdAt: number };

const box: React.CSSProperties = { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 18, marginTop: 16 };
const input: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, boxSizing: "border-box" };
const btn: React.CSSProperties = { padding: "9px 15px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", cursor: "pointer", fontWeight: 700 };
const primary: React.CSSProperties = { ...btn, background: "#0b4a52", color: "white", border: "none" };
const danger: React.CSSProperties = { ...btn, color: "#b91c1c", borderColor: "#fecaca" };
const label: React.CSSProperties = { display: "block", fontWeight: 700, marginTop: 12 };
const tabBtn = (on: boolean): React.CSSProperties => ({ ...btn, background: on ? "#0b4a52" : "white", color: on ? "white" : "#123", border: on ? "none" : btn.border });
const date = (ms: number | null) => (ms ? new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—");

const EMPTY: Omit<Item, "id" | "updatedAt"> = { type: "note", title: "", topic: "", summary: "", body: "", videoId: "", pdfPath: "", pdfName: "", status: "draft", commentsOpen: true };

const ERRORS: Record<string, string> = {
  "invalid-title": "Title is too short.",
  "invalid-videoId": "Paste a valid YouTube link before publishing a video.",
  "invalid-note-empty": "Upload a PDF or write the note text before publishing.",
  "invalid-case-empty": "Write the case before publishing.",
  "invalid-pdfPath": "The PDF upload is invalid. Please upload again.",
};

export default function DoctorResidentsPage() {
  const [tab, setTab] = useState<"content" | "residents" | "comments" | "plans">("content");
  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <Link href="/doctor">← Dashboard</Link>
      <h1>Residents (learning section)</h1>
      <p style={{ color: "#475569" }}>
        Content opens only inside the Neuro Mind Bloom app, for residents with active access. Residents pay on the website through the
        link below (not shown anywhere on the site or in the app) — send it to them on WhatsApp.
      </p>
      <JoinLink />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={tabBtn(tab === "content")} onClick={() => setTab("content")}>Content</button>
        <button style={tabBtn(tab === "residents")} onClick={() => setTab("residents")}>Subscribers & payments</button>
        <button style={tabBtn(tab === "comments")} onClick={() => setTab("comments")}>Case comments</button>
        <button style={tabBtn(tab === "plans")} onClick={() => setTab("plans")}>Plan prices</button>
      </div>
      {tab === "content" && <ContentTab />}
      {tab === "residents" && <ResidentsTab />}
      {tab === "comments" && <CommentsTab />}
      {tab === "plans" && <PlansTab />}
    </main>
  );
}

function JoinLink() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(`${window.location.origin}${RESIDENT_JOIN_PATH}`), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  if (!url) return null;
  return (
    <div style={{ ...box, marginTop: 8, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <strong>Payment link:</strong>
      <code style={{ background: "#f1f5f9", padding: "6px 10px", borderRadius: 8, wordBreak: "break-all" }}>{url}</code>
      <button type="button" style={btn} onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      <a style={btn} href={`https://wa.me/?text=${encodeURIComponent(`Neuro Mind Bloom residents' programme — subscribe here: ${url}`)}`} target="_blank" rel="noopener noreferrer">
        Share on WhatsApp
      </a>
    </div>
  );
}

// ------------------------------------------------------------------ content

function ContentTab() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [edit, setEdit] = useState<(Omit<Item, "id" | "updatedAt"> & { id?: string }) | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [upload, setUpload] = useState("");

  const load = useCallback(async () => {
    const { data } = await api<{ items: Item[] }>("/api/doctor/residents/content");
    if (!data.ok) return setMsg(data.error === "not-configured" ? "Server not configured (Firebase Admin)." : "Could not load content.");
    setItems(data.items);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function save(status: "draft" | "published") {
    if (!edit) return;
    setBusy(true);
    setMsg("");
    const { data } = await api<{ id: string }>("/api/doctor/residents/content", { body: { ...edit, status } });
    setBusy(false);
    if (!data.ok) return setMsg(ERRORS[data.error || ""] || "Could not save.");
    setEdit({ ...edit, id: data.id, status });
    setMsg(status === "published" ? "Published — residents can see it now." : "Saved as draft (residents can't see it).");
    load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item, its PDF and all its comments? This cannot be undone.")) return;
    const { data } = await api(`/api/doctor/residents/content/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!data.ok) return setMsg("Could not delete.");
    setEdit(null);
    load();
  }

  async function pickPdf(file: File | undefined) {
    if (!file || !edit) return;
    if (file.type !== "application/pdf") return setMsg("Please choose a PDF file.");
    if (file.size > 50 * 1024 * 1024) return setMsg("PDF must be under 50 MB.");
    setMsg("");
    try {
      const path = await uploadNotePdf(file, (p) => setUpload(`Uploading… ${p}%`));
      setEdit({ ...edit, pdfPath: path, pdfName: file.name });
      setUpload("Uploaded. Click Save or Publish to attach it.");
    } catch (e) {
      console.error(e);
      setUpload("");
      setMsg("Upload failed. Check that Firebase Storage is enabled and storage.rules are deployed.");
    }
  }

  if (edit) {
    return (
      <div style={box}>
        <button style={btn} onClick={() => { setEdit(null); setMsg(""); setUpload(""); }}>← Back to list</button>
        <label style={label}>Type</label>
        <select value={edit.type} onChange={(e) => setEdit({ ...edit, type: e.target.value as ContentType })} style={input} disabled={Boolean(edit.id)}>
          {CONTENT_TYPES.map((t) => <option key={t} value={t}>{CONTENT_LABEL[t].en}</option>)}
        </select>
        <label style={label}>Title</label>
        <input style={input} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} maxLength={160} />
        <label style={label}>Topic (for grouping/search, e.g. “Mood disorders”)</label>
        <input style={input} value={edit.topic} onChange={(e) => setEdit({ ...edit, topic: e.target.value })} maxLength={80} />
        <label style={label}>Short summary (shown in the list, also to non-subscribers)</label>
        <input style={input} value={edit.summary} onChange={(e) => setEdit({ ...edit, summary: e.target.value })} maxLength={400} />

        {edit.type === "video" && (
          <>
            <label style={label}>YouTube link (upload as “Unlisted” on YouTube, then paste the link)</label>
            <input style={input} value={edit.videoId} onChange={(e) => setEdit({ ...edit, videoId: e.target.value })} placeholder="https://youtu.be/…" />
          </>
        )}

        {edit.type === "note" && (
          <>
            <label style={label}>Notes PDF (max 50 MB)</label>
            <input type="file" accept="application/pdf" onChange={(e) => pickPdf(e.target.files?.[0])} />
            {edit.pdfName && <p style={{ margin: "6px 0" }}>Attached: <strong>{edit.pdfName}</strong></p>}
            {upload && <p style={{ margin: "6px 0" }}>{upload}</p>}
          </>
        )}

        <label style={label}>
          {edit.type === "case" ? "Case + discussion (history, MSE, differentials, management, learning points)" : edit.type === "video" ? "Description / key points (optional)" : "Note text (optional if a PDF is attached)"}
        </label>
        <textarea style={{ ...input, minHeight: 260, fontFamily: "inherit" }} value={edit.body} onChange={(e) => setEdit({ ...edit, body: e.target.value })} />
        <p style={{ fontSize: 13, color: "#b45309" }}>Do not include patient names, photos or any detail that could identify a patient.</p>

        {edit.type === "case" && (
          <label style={{ ...label, fontWeight: 400 }}>
            <input type="checkbox" checked={edit.commentsOpen} onChange={(e) => setEdit({ ...edit, commentsOpen: e.target.checked })} /> Allow residents to comment
          </label>
        )}

        {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <button style={btn} disabled={busy} onClick={() => save("draft")}>Save draft</button>
          <button style={primary} disabled={busy} onClick={() => save("published")}>{edit.status === "published" ? "Update (published)" : "Publish"}</button>
          {edit.id && edit.status === "published" && <button style={btn} disabled={busy} onClick={() => save("draft")}>Unpublish</button>}
          {edit.id && <button style={danger} disabled={busy} onClick={() => remove(edit.id!)}>Delete</button>}
        </div>
      </div>
    );
  }

  return (
    <div style={box}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {CONTENT_TYPES.map((t) => (
          <button key={t} style={primary} onClick={() => setEdit({ ...EMPTY, type: t })}>+ New {CONTENT_LABEL[t].en.replace(/s$/, "").toLowerCase()}</button>
        ))}
      </div>
      {msg && <p>{msg}</p>}
      {items === null ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p>No content yet. Start with a note, video or case.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
              <th>Title</th><th>Type</th><th>Status</th><th>Updated</th><th />
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "8px 4px" }}>{i.title}<div style={{ fontSize: 12, color: "#64748b" }}>{i.topic}</div></td>
                <td>{CONTENT_LABEL[i.type]?.en}</td>
                <td>{i.status === "published" ? "✅ Published" : "Draft"}</td>
                <td>{date(i.updatedAt)}</td>
                <td><button style={btn} onClick={() => setEdit(i)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ subscribers

function ResidentsTab() {
  const [residents, setResidents] = useState<Resident[] | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const { data } = await api<{ residents: Resident[]; payments: Payment[] }>("/api/doctor/residents/subscribers");
    if (!data.ok) return setMsg("Could not load residents.");
    setResidents(data.residents);
    setPayments(data.payments);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function grant(r: Resident) {
    const days = Number(window.prompt(`Free access days for ${r.name} (1–730):`, "30"));
    if (!Number.isInteger(days) || days < 1) return;
    const note = window.prompt("Note (optional, e.g. 'faculty', 'payment by cash'):", "") || "";
    const { data } = await api("/api/doctor/residents/grant", { body: { uid: r.uid, days, note } });
    setMsg(data.ok ? `Added ${days} days for ${r.name}.` : "Could not add access.");
    load();
  }

  async function block(r: Resident) {
    if (!window.confirm(`${r.blocked ? "Unblock" : "Block"} ${r.name}?`)) return;
    const { data } = await api("/api/doctor/residents/block", { body: { uid: r.uid, blocked: !r.blocked } });
    setMsg(data.ok ? "Updated." : "Could not update.");
    load();
  }

  const active = residents?.filter((r) => r.active).length ?? 0;
  const revenue = payments.reduce((s, p) => s + p.amount, 0);
  const byUid = new Map((residents || []).map((r) => [r.uid, r.name]));

  return (
    <div style={box}>
      {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
      {residents === null ? (
        <p>Loading…</p>
      ) : (
        <>
          <p><strong>{active}</strong> active of {residents.length} registered · total received {formatINR(revenue)}</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                  <th>Name</th><th>Contact</th><th>College / course</th><th>Access till</th><th />
                </tr>
              </thead>
              <tbody>
                {residents.map((r) => (
                  <tr key={r.uid} style={{ borderBottom: "1px solid #f1f5f9", opacity: r.blocked ? 0.5 : 1 }}>
                    <td style={{ padding: "8px 4px" }}>{r.name || "(no profile)"}{r.blocked && " · blocked"}</td>
                    <td style={{ fontSize: 13 }}>{r.mobile}<br />{r.email}</td>
                    <td style={{ fontSize: 13 }}>{r.college}<br />{r.course} {r.year}</td>
                    <td>{r.active ? "✅ " : ""}{date(r.accessUntil)}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button style={btn} onClick={() => grant(r)}>+ Days</button>{" "}
                      <button style={r.blocked ? btn : danger} onClick={() => block(r)}>{r.blocked ? "Unblock" : "Block"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 style={{ marginTop: 24 }}>Payments</h3>
          {payments.length === 0 ? <p>No payments yet.</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}><th>Date</th><th>Resident</th><th>Plan</th><th>Amount</th><th>Mode / ref</th></tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "6px 4px" }}>{date(p.createdAt)}</td>
                    <td>{byUid.get(p.uid) || p.uid.slice(0, 8)}</td>
                    <td>{p.planId}</td>
                    <td>{formatINR(p.amount)}</td>
                    <td style={{ fontSize: 12 }}>{p.mode}<br />{p.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ comments

function CommentsTab() {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [titles, setTitles] = useState<Map<string, string>>(new Map());
  const [reply, setReply] = useState<{ contentId: string; text: string } | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const [c, i] = await Promise.all([
      api<{ comments: Comment[] }>("/api/doctor/residents/comments"),
      api<{ items: Item[] }>("/api/doctor/residents/content"),
    ]);
    if (!c.data.ok) return setMsg("Could not load comments.");
    setComments(c.data.comments);
    if (i.data.ok) setTitles(new Map(i.data.items.map((x) => [x.id, x.title])));
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function toggle(c: Comment) {
    const { data } = await api("/api/doctor/residents/comments", { body: { action: c.status === "hidden" ? "show" : "hide", id: c.id } });
    if (data.ok) load();
  }

  async function sendReply() {
    if (!reply) return;
    const { data } = await api("/api/doctor/residents/comments", { body: { action: "reply", ...reply } });
    setMsg(data.ok ? "Reply posted." : "Could not post (is the case published?).");
    if (data.ok) {
      setReply(null);
      load();
    }
  }

  return (
    <div style={box}>
      {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
      {comments === null ? <p>Loading…</p> : comments.length === 0 ? <p>No comments yet.</p> : (
        <div style={{ display: "grid", gap: 10 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, opacity: c.status === "hidden" ? 0.5 : 1, background: c.byDoctor ? "#eef7f6" : "white" }}>
              <div style={{ fontSize: 13, color: "#475569" }}>
                <strong>{c.name}</strong> on “{titles.get(c.contentId) || c.contentId}” · {date(c.createdAt)} {c.status === "hidden" && "· hidden"}
              </div>
              <div style={{ whiteSpace: "pre-wrap", margin: "6px 0" }}>{c.text}</div>
              <button style={btn} onClick={() => toggle(c)}>{c.status === "hidden" ? "Show" : "Hide"}</button>{" "}
              <button style={btn} onClick={() => setReply({ contentId: c.contentId, text: "" })}>Reply on this case</button>
            </div>
          ))}
        </div>
      )}
      {reply && (
        <div style={{ marginTop: 14 }}>
          <label style={label}>Reply on “{titles.get(reply.contentId) || reply.contentId}”</label>
          <textarea style={{ ...input, minHeight: 120 }} value={reply.text} onChange={(e) => setReply({ ...reply, text: e.target.value })} maxLength={2000} />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button style={primary} onClick={sendReply}>Post reply</button>
            <button style={btn} onClick={() => setReply(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ plans

function PlansTab() {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api<{ plans: Plan[] }>("/api/doctor/residents/plans").then(({ data }) => (data.ok ? setPlans(data.plans) : setMsg("Could not load plans.")));
  }, []);

  async function save() {
    if (!plans) return;
    const body = Object.fromEntries(plans.map((p) => [p.id, { price: p.price }]));
    const { data } = await api<{ plans: Plan[] }>("/api/doctor/residents/plans", { method: "PUT", body });
    if (!data.ok) return setMsg(data.error || "Could not save.");
    setPlans(data.plans);
    setMsg("Saved. New prices apply to new payments; current subscribers keep their access.");
  }

  return (
    <div style={box}>
      {plans === null ? <p>Loading…</p> : (
        <>
          {plans.map((p, idx) => (
            <div key={p.id}>
              <label style={label}>{p.label.en} price (₹) — {p.days} days</label>
              <input
                type="number"
                min={1}
                max={100000}
                step={1}
                style={{ ...input, maxWidth: 220 }}
                value={p.price}
                onChange={(e) => setPlans(plans.map((x, j) => (j === idx ? { ...x, price: Number(e.target.value) } : x)))}
              />
            </div>
          ))}
          <button style={{ ...primary, marginTop: 14 }} onClick={save}>Save prices</button>
          {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
