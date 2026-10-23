"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { logAction } from "../../../lib/client/audit";
import { FICTIONAL_LABEL, REAL_LABEL, STORY_CATEGORIES, STORY_DISCLAIMER, emptyStory, validateStory, type Story, type StoryCategory } from "../../../lib/stories";

/**
 * Doctor → Recovery stories: draft, review, document consent, publish / unpublish.
 * A real patient story cannot be published until doctor review and written consent are recorded
 * (enforced here and in firestore.rules).
 */
const today = () => new Date().toISOString().slice(0, 10);
const box: React.CSSProperties = { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 18, marginTop: 16 };
const input: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, boxSizing: "border-box" };
const btn: React.CSSProperties = { padding: "10px 16px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", cursor: "pointer", fontWeight: 700 };
const primary: React.CSSProperties = { ...btn, background: "#0b4a52", color: "white", border: "none" };
const label: React.CSSProperties = { display: "block", fontWeight: 700, marginTop: 12 };

export default function DoctorStoriesPage() {
  const [items, setItems] = useState<Story[]>([]);
  const [edit, setEdit] = useState<Story | null>(null);
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const snap = await getDocs(collection(db, "recoveryStories"));
      setItems(snap.docs.map((d: { id: string; data(): unknown }) => ({ ...(d.data() as Story), id: d.id })).sort((a: Story, b: Story) => b.updated.localeCompare(a.updated)));
      setMsg("");
    } catch (e) {
      console.error(e);
      setMsg("Could not load stories. Deploy the Firestore rules for recoveryStories first.");
    }
  }
  useEffect(() => {
    load();
  }, []);

  const publishErrors = edit ? validateStory(edit, true) : [];

  async function save(status: Story["status"]) {
    if (!edit) return;
    const next: Story = { ...edit, status, updated: today() };
    const errs = validateStory(next, status === "published");
    if (errs.length) return setMsg(errs.join(" "));
    setBusy(true);
    try {
      const { id, ...data } = next;
      if (id) await setDoc(doc(db, "recoveryStories", id), data);
      else next.id = (await addDoc(collection(db, "recoveryStories"), data)).id;
      logAction(`story.${status}`, { id: next.id ?? "", fictional: next.fictional });
      setEdit(next);
      setMsg(status === "published" ? "Published. It appears on /recovery-stories within about 10 minutes." : "Saved as draft (not public).");
      load();
    } catch (e) {
      console.error(e);
      setMsg("Save failed — check your connection and Firestore rules.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(s: Story) {
    if (!s.id || !window.confirm(`Delete "${s.title.en}" permanently?`)) return;
    await deleteDoc(doc(db, "recoveryStories", s.id));
    logAction("story.delete", { id: s.id });
    if (edit?.id === s.id) setEdit(null);
    load();
  }

  const set = (patch: Partial<Story>) => edit && setEdit({ ...edit, ...patch });
  const setL = (key: "title" | "narrative" | "imageAlt", lang: "en" | "hi", value: string) => edit && setEdit({ ...edit, [key]: { ...edit[key], [lang]: value } });

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "auto", fontFamily: "system-ui, sans-serif" }}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Recovery Stories</h1>
      <p style={{ color: "#475569", marginTop: 0 }}>
        Fictional educational examples can be published after your review. Real patient stories stay unpublished until written consent is documented and the story is de-identified.
        Never promise or imply a guaranteed result.
      </p>
      {msg && <p role="status" style={{ background: "#fff7ed", border: "1px solid #fed7aa", padding: 10, borderRadius: 10 }}>{msg}</p>}

      {!edit && (
        <>
          <button style={primary} onClick={() => { setEdit(emptyStory(today())); setPreview(false); }}>+ Add story</button>
          <div style={box}>
            <h2 style={{ marginTop: 0 }}>Stories ({items.length})</h2>
            {items.length === 0 && <p>No stories yet.</p>}
            {items.map((s) => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderTop: "1px solid #f1f5f9", flexWrap: "wrap" }}>
                <div>
                  <strong>{s.title.en || "(untitled)"}</strong>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {STORY_CATEGORIES[s.category]?.en} · {s.fictional ? "Fictional example" : "Real story"} · {s.status === "published" ? "🟢 Published" : "⚪ Draft"} · {s.doctorReviewed ? "reviewed" : "not reviewed"}
                    {!s.fictional && ` · consent ${s.consent.documented ? "documented" : "MISSING"}`} · updated {s.updated}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={btn} onClick={() => { setEdit(s); setPreview(false); }}>Edit</button>
                  <button style={{ ...btn, color: "#b91c1c" }} onClick={() => remove(s)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {edit && (
        <div style={box}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button style={btn} onClick={() => setEdit(null)}>← Back to list</button>
            <button style={btn} onClick={() => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</button>
          </div>

          {preview ? (
            <div style={{ marginTop: 16 }}>
              <p style={{ background: "#fff7ed", padding: 10, borderRadius: 10 }}>{STORY_DISCLAIMER.en}</p>
              {(["en", "hi"] as const).map((l) => (
                <article key={l} lang={l} style={{ borderTop: "1px solid #e2e8f0", paddingTop: 12, marginTop: 12 }}>
                  <small style={{ textTransform: "uppercase", color: "#475569" }}>{STORY_CATEGORIES[edit.category][l]}</small>
                  <h2 style={{ margin: "4px 0" }}>{edit.title[l] || "(no title)"}</h2>
                  <span style={{ fontSize: 12, background: edit.fictional ? "#fef3c7" : "#ecfdf5", padding: "3px 10px", borderRadius: 999 }}>{(edit.fictional ? FICTIONAL_LABEL : REAL_LABEL)[l]}</span>
                  {edit.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={edit.imageUrl} alt={edit.imageAlt[l]} style={{ display: "block", maxWidth: "100%", maxHeight: 240, marginTop: 10, borderRadius: 12 }} />
                  )}
                  {edit.narrative[l].split(/\n\s*\n/).filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
                </article>
              ))}
            </div>
          ) : (
            <div>
              <label style={label}>Type</label>
              <label style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <input type="radio" checked={edit.fictional} onChange={() => set({ fictional: true })} /> Fictional educational example (not a real patient)
              </label>
              <label style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <input type="radio" checked={!edit.fictional} onChange={() => set({ fictional: false })} /> Real patient story (needs written consent and de-identification)
              </label>

              <label style={label}>Category</label>
              <select style={input} value={edit.category} onChange={(e) => set({ category: e.target.value as StoryCategory })}>
                {Object.entries(STORY_CATEGORIES).map(([id, n]) => <option key={id} value={id}>{n.en} / {n.hi}</option>)}
              </select>

              <label style={label}>Title (English)</label>
              <input style={input} value={edit.title.en} maxLength={140} onChange={(e) => setL("title", "en", e.target.value)} />
              <label style={label}>Title (Hindi)</label>
              <input style={input} value={edit.title.hi} maxLength={140} onChange={(e) => setL("title", "hi", e.target.value)} />

              <label style={label}>Narrative (English) — blank line between paragraphs</label>
              <textarea style={{ ...input, minHeight: 200 }} value={edit.narrative.en} maxLength={8000} onChange={(e) => setL("narrative", "en", e.target.value)} />
              <label style={label}>Narrative (Hindi)</label>
              <textarea style={{ ...input, minHeight: 200 }} value={edit.narrative.hi} maxLength={8000} onChange={(e) => setL("narrative", "hi", e.target.value)} />

              <label style={label}>Image link (optional, https — must not identify a real patient)</label>
              <input style={input} value={edit.imageUrl} onChange={(e) => set({ imageUrl: e.target.value.trim() })} placeholder="https://…" />
              {edit.imageUrl && (
                <>
                  <label style={label}>Image description (English / Hindi)</label>
                  <input style={input} value={edit.imageAlt.en} maxLength={200} onChange={(e) => setL("imageAlt", "en", e.target.value)} />
                  <input style={{ ...input, marginTop: 6 }} value={edit.imageAlt.hi} maxLength={200} onChange={(e) => setL("imageAlt", "hi", e.target.value)} />
                </>
              )}

              <fieldset style={{ marginTop: 16, border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
                <legend style={{ fontWeight: 700 }}>Review &amp; consent</legend>
                <label style={{ display: "flex", gap: 8 }}>
                  <input type="checkbox" checked={edit.doctorReviewed} onChange={(e) => set({ doctorReviewed: e.target.checked })} />
                  I have reviewed this story for accuracy, de-identification and the absence of outcome guarantees.
                </label>
                {!edit.fictional && (
                  <>
                    <label style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <input type="checkbox" checked={edit.consent.documented} onChange={(e) => set({ consent: { ...edit.consent, documented: e.target.checked } })} />
                      Written, informed consent for publication is signed and on file.
                    </label>
                    <label style={label}>Consent date</label>
                    <input type="date" style={input} value={edit.consent.date} max={today()} onChange={(e) => set({ consent: { ...edit.consent, date: e.target.value } })} />
                    <label style={label}>Where the consent is kept (internal, never public)</label>
                    <input style={input} value={edit.consent.note} maxLength={300} onChange={(e) => set({ consent: { ...edit.consent, note: e.target.value } })} />
                  </>
                )}
              </fieldset>
            </div>
          )}

          {publishErrors.length > 0 && (
            <ul style={{ background: "#f8fafc", padding: "10px 28px", borderRadius: 10, color: "#475569", fontSize: 14 }}>
              <li style={{ listStyle: "none", marginLeft: -16, fontWeight: 700 }}>Before publishing:</li>
              {publishErrors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <button style={btn} disabled={busy} onClick={() => save("draft")}>{edit.status === "published" ? "Unpublish (save as draft)" : "Save draft"}</button>
            <button style={{ ...primary, opacity: publishErrors.length ? 0.5 : 1 }} disabled={busy || publishErrors.length > 0} onClick={() => save("published")}>Publish</button>
          </div>
        </div>
      )}
    </main>
  );
}
