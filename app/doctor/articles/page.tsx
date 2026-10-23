"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { logAction } from "../../../lib/client/audit";
import { ARTICLE_CATS } from "../../../lib/content/articles";
import { bodyToBlocks, emptyCmsArticle, validateCms, type CmsArticle, type CmsCategory } from "../../../lib/cms";

/**
 * Doctor → Website articles: add, edit, save draft, preview, publish / unpublish, manage categories.
 * Data lives in Firestore `cmsArticles` / `cmsCategories`; only published articles are public.
 * The built-in 130-article library is part of the code and is not edited here.
 */
const today = () => new Date().toISOString().slice(0, 10);

const box: React.CSSProperties = { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 18, marginTop: 16 };
const input: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, boxSizing: "border-box" };
const btn: React.CSSProperties = { padding: "10px 16px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", cursor: "pointer", fontWeight: 700 };
const primary: React.CSSProperties = { ...btn, background: "#0b4a52", color: "white", border: "none" };

export default function DoctorArticlesPage() {
  const [items, setItems] = useState<CmsArticle[]>([]);
  const [cats, setCats] = useState<CmsCategory[]>([]);
  const [edit, setEdit] = useState<CmsArticle | null>(null);
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [newCat, setNewCat] = useState({ en: "", hi: "" });

  async function load() {
    try {
      const [a, c] = await Promise.all([getDocs(collection(db, "cmsArticles")), getDocs(collection(db, "cmsCategories"))]);
      setItems(a.docs.map((d: { id: string; data(): unknown }) => ({ ...(d.data() as CmsArticle), id: d.id })).sort((x: CmsArticle, y: CmsArticle) => y.updated.localeCompare(x.updated)));
      setCats(c.docs.map((d: { id: string; data(): unknown }) => ({ id: d.id, ...(d.data() as { name: CmsCategory["name"] }) })));
      setMsg("");
    } catch (e) {
      console.error(e);
      setMsg("Could not load articles. Deploy the Firestore rules for cmsArticles / cmsCategories first.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const allCats = useMemo(() => [...Object.entries(ARTICLE_CATS).map(([id, name]) => ({ id, name })), ...cats], [cats]);
  const errors = edit ? validateCms(edit) : [];

  async function save(status: CmsArticle["status"]) {
    if (!edit) return;
    const next: CmsArticle = { ...edit, status, updated: today(), published: edit.status === "published" || status !== "published" ? edit.published : today() };
    const errs = validateCms(next);
    if (errs.length) return setMsg(errs.join(" "));
    if (items.some((x) => x.slug === next.slug && x.id !== next.id)) return setMsg("Another article already uses this URL slug.");
    setBusy(true);
    try {
      const { id, ...data } = next;
      if (id) await setDoc(doc(db, "cmsArticles", id), data);
      else next.id = (await addDoc(collection(db, "cmsArticles"), data)).id;
      logAction(`cms.article.${status}`, { slug: next.slug });
      setEdit(next);
      setMsg(status === "published" ? "Published. It appears on the website within about 10 minutes." : "Draft saved (not public).");
      load();
    } catch (e) {
      console.error(e);
      setMsg("Save failed — check your connection and Firestore rules.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(a: CmsArticle) {
    if (!a.id || !window.confirm(`Delete "${a.title.en}" permanently?`)) return;
    await deleteDoc(doc(db, "cmsArticles", a.id));
    logAction("cms.article.delete", { slug: a.slug });
    if (edit?.id === a.id) setEdit(null);
    load();
  }

  async function addCategory() {
    if (!newCat.en.trim() || !newCat.hi.trim()) return setMsg("Category name needed in English and Hindi.");
    await addDoc(collection(db, "cmsCategories"), { name: { en: newCat.en.trim(), hi: newCat.hi.trim() } });
    setNewCat({ en: "", hi: "" });
    load();
  }

  async function removeCategory(c: CmsCategory) {
    if (items.some((a) => a.cat === c.id)) return setMsg("This category is used by an article — change those articles first.");
    if (!window.confirm(`Delete category "${c.name.en}"?`)) return;
    await deleteDoc(doc(db, "cmsCategories", c.id));
    load();
  }

  const set = (patch: Partial<CmsArticle>) => edit && setEdit({ ...edit, ...patch });
  const setL = (key: "title" | "excerpt" | "body", lang: "en" | "hi", value: string) => edit && setEdit({ ...edit, [key]: { ...edit[key], [lang]: value } });

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "auto", fontFamily: "system-ui, sans-serif" }}>
      <p><Link href="/doctor">← Dashboard</Link></p>
      <h1 style={{ marginBottom: 4 }}>Website Articles</h1>
      <p style={{ color: "#475569", marginTop: 0 }}>Write your own articles in English and Hindi. Drafts stay private; only published articles appear on the website.</p>
      {msg && <p role="status" style={{ background: "#fff7ed", border: "1px solid #fed7aa", padding: 10, borderRadius: 10 }}>{msg}</p>}

      {!edit && (
        <>
          <button style={primary} onClick={() => { setEdit(emptyCmsArticle(today())); setPreview(false); }}>+ Add article</button>
          <div style={box}>
            <h2 style={{ marginTop: 0 }}>Your articles ({items.length})</h2>
            {items.length === 0 && <p>No articles yet.</p>}
            {items.map((a) => (
              <div key={a.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderTop: "1px solid #f1f5f9", flexWrap: "wrap" }}>
                <div>
                  <strong>{a.title.en || "(untitled)"}</strong>
                  <div style={{ fontSize: 13, color: "#64748b" }}>/articles/{a.slug} · {a.status === "published" ? "🟢 Published" : "⚪ Draft"} · updated {a.updated}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={btn} onClick={() => { setEdit(a); setPreview(false); }}>Edit</button>
                  {a.status === "published" && <a style={btn} href={`/articles/${a.slug}`} target="_blank" rel="noreferrer">View</a>}
                  <button style={{ ...btn, color: "#b91c1c" }} onClick={() => remove(a)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div style={box}>
            <h2 style={{ marginTop: 0 }}>Manage categories</h2>
            <p style={{ fontSize: 14, color: "#475569" }}>Built-in: {Object.values(ARTICLE_CATS).map((c) => c.en).join(", ")}.</p>
            {cats.map((c) => (
              <span key={c.id} style={{ display: "inline-block", margin: 4, padding: "4px 10px", border: "1px solid #cbd5e1", borderRadius: 999 }}>
                {c.name.en} / {c.name.hi} <button onClick={() => removeCategory(c)} style={{ border: 0, background: "none", color: "#b91c1c", cursor: "pointer" }} aria-label="Remove">×</button>
              </span>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 10 }}>
              <input style={input} placeholder="Category (English)" value={newCat.en} onChange={(e) => setNewCat({ ...newCat, en: e.target.value })} />
              <input style={input} placeholder="श्रेणी (हिंदी)" value={newCat.hi} onChange={(e) => setNewCat({ ...newCat, hi: e.target.value })} />
              <button style={btn} onClick={addCategory}>Add</button>
            </div>
          </div>
        </>
      )}

      {edit && (
        <div style={box}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>{edit.id ? "Edit article" : "New article"} <small style={{ color: "#64748b" }}>({edit.status})</small></h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={btn} onClick={() => setPreview((v) => !v)}>{preview ? "Back to editor" : "Preview"}</button>
              <button style={btn} disabled={busy} onClick={() => save("draft")}>{edit.status === "published" ? "Unpublish (save as draft)" : "Save draft"}</button>
              <button style={primary} disabled={busy} onClick={() => save("published")}>{edit.status === "published" ? "Update published" : "Publish"}</button>
              <button style={btn} onClick={() => setEdit(null)}>Close</button>
            </div>
          </div>
          {errors.length > 0 && <ul style={{ color: "#b45309", fontSize: 14 }}>{errors.map((e) => <li key={e}>{e}</li>)}</ul>}

          {preview ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginTop: 16 }}>
              {(["en", "hi"] as const).map((l) => (
                <article key={l} lang={l} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
                  <h1 style={{ fontSize: 24 }}>{edit.title[l]}</h1>
                  <p style={{ color: "#475569" }}>{edit.excerpt[l]}</p>
                  {bodyToBlocks(edit.body).map((b, i) =>
                    "h" in b ? <h2 key={i}>{b.h[l]}</h2> : "p" in b ? <p key={i}>{b.p[l]}</p> : <ul key={i}>{b.list.map((li) => <li key={li.en}>{li[l]}</li>)}</ul>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <label>URL slug (/articles/…)<input style={input} value={edit.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="e.g. sleep-tips-for-shift-workers" /></label>
              <label>Category
                <select style={input} value={edit.cat} onChange={(e) => set({ cat: e.target.value })}>
                  {allCats.map((c) => <option key={c.id} value={c.id}>{c.name.en} / {c.name.hi}</option>)}
                </select>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12 }}>
                <label>SEO title (English)<input style={input} value={edit.title.en} onChange={(e) => setL("title", "en", e.target.value)} /></label>
                <label>SEO title (हिंदी)<input style={input} value={edit.title.hi} onChange={(e) => setL("title", "hi", e.target.value)} /></label>
                <label>Meta description (English, ≤200)<textarea style={{ ...input, minHeight: 70 }} value={edit.excerpt.en} onChange={(e) => setL("excerpt", "en", e.target.value)} /><small>{edit.excerpt.en.length}/200</small></label>
                <label>Meta description (हिंदी)<textarea style={{ ...input, minHeight: 70 }} value={edit.excerpt.hi} onChange={(e) => setL("excerpt", "hi", e.target.value)} /></label>
                <label>Article (English)<textarea style={{ ...input, minHeight: 320, fontFamily: "inherit" }} value={edit.body.en} onChange={(e) => setL("body", "en", e.target.value)} placeholder={"Intro paragraph…\n\n## Symptoms\n- First point\n- Second point\n\n## When to seek help\n…"} /></label>
                <label>Article (हिंदी) — same headings, same order<textarea style={{ ...input, minHeight: 320, fontFamily: "inherit" }} value={edit.body.hi} onChange={(e) => setL("body", "hi", e.target.value)} /></label>
              </div>
              <label>Medical references — one per line (only sources you have checked)<textarea style={{ ...input, minHeight: 90 }} value={edit.references} onChange={(e) => set({ references: e.target.value })} /></label>
              <label>Search tags (comma separated, Hinglish welcome)<input style={input} value={edit.tags} onChange={(e) => set({ tags: e.target.value })} /></label>
              <label>Related condition pages (slugs, comma separated)<input style={input} value={edit.related.join(", ")} onChange={(e) => set({ related: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="depression-treatment-india, insomnia-treatment-india" /></label>
              <p style={{ fontSize: 13, color: "#64748b" }}>Format: blank line between paragraphs · “## ” starts a heading · “- ” starts a list item. Do not include patient names or identifiable details.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
