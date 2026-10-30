"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../../lib/client/residentApi";
import { CONTENT_LABEL, type ContentType } from "../../../../lib/residents";
import { formatDate, useResident } from "../../../../components/residents/useResident";
import { card, field, page, primaryBtn } from "../../../../components/residents/ui";

type Item = {
  id: string;
  type: ContentType;
  title: string;
  topic: string;
  summary: string;
  body: string;
  videoId: string;
  hasPdf: boolean;
  pdfName: string;
  commentsOpen: boolean;
  publishedAt: number;
};
type Comment = { id: string; name: string; text: string; byDoctor: boolean; createdAt: number; mine: boolean };

export default function ResidentItemPage() {
  const { id } = useParams<{ id: string }>();
  const { me } = useResident();
  const [item, setItem] = useState<Item | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState("");
  const [pdfMsg, setPdfMsg] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const load = useCallback(async () => {
    const { status, data } = await api<{ item: Item; comments: Comment[] }>(`/api/residents/content/${encodeURIComponent(id)}`);
    // 403 = access not active (no purchase prompts inside the app).
    if (status === 403) return setError("Your access is not active.");
    if (!data.ok) return setError("This item is not available.");
    setItem(data.item);
    setComments(data.comments);
  }, [id]);

  useEffect(() => {
    if (me) load();
  }, [me, load]);

  async function openPdf() {
    setPdfMsg("Preparing your copy…");
    const { data } = await api<{ url: string; name: string }>(`/api/residents/content/${encodeURIComponent(id)}/pdf`, { method: "POST" });
    if (!data.ok) return setPdfMsg("Could not open the notes. Please try again.");
    setPdfUrl(data.url);
    setPdfMsg("");
    window.open(data.url, "_blank", "noopener");
  }

  async function post(e: FormEvent) {
    e.preventDefault();
    if (text.trim().length < 2) return;
    setPosting(true);
    const { data } = await api(`/api/residents/content/${encodeURIComponent(id)}/comments`, { body: { text } });
    setPosting(false);
    if (data.ok) {
      setText("");
      load();
    }
  }

  return (
    <main style={page}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Link href="/residents/app" style={{ color: "#0b746f", fontWeight: 700, textDecoration: "none" }}>← All content</Link>
        {error && <div style={{ ...card, marginTop: 16 }}>{error}</div>}
        {!error && !item && <p>Loading…</p>}
        {item && (
          <article style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "#0b746f", fontWeight: 700 }}>
              {CONTENT_LABEL[item.type].en}{item.topic ? ` · ${item.topic}` : ""}{item.publishedAt ? ` · ${formatDate(item.publishedAt)}` : ""}
            </div>
            <h1 style={{ margin: "4px 0 8px", color: "#062b31", fontSize: 26 }}>{item.title}</h1>
            {item.summary && <p style={{ color: "#475569", marginTop: 0 }}>{item.summary}</p>}

            {item.type === "video" && item.videoId && (
              <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 14, overflow: "hidden", background: "#000" }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0&modestbranding=1`}
                  title={item.title}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              </div>
            )}

            {item.type === "note" && item.hasPdf && (
              <div style={{ ...card, marginTop: 12 }}>
                <button type="button" style={primaryBtn} onClick={openPdf}>📄 Open notes (PDF)</button>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 0 }}>Your copy carries your name and mobile number. Please don’t share it.</p>
                {pdfMsg && <p>{pdfMsg}</p>}
                {pdfUrl && <p style={{ fontSize: 13 }}>If it didn’t open, <a href={pdfUrl} target="_blank" rel="noopener noreferrer">tap here</a> (link works for 10 minutes).</p>}
              </div>
            )}

            {item.body && (
              <div style={{ ...card, marginTop: 12, whiteSpace: "pre-wrap", lineHeight: 1.65, fontSize: 16 }}>{item.body}</div>
            )}

            {item.type === "case" && (
              <section style={{ marginTop: 20 }}>
                <h2 style={{ fontSize: 20, color: "#062b31" }}>Discussion ({comments.length})</h2>
                <div style={{ display: "grid", gap: 10 }}>
                  {comments.map((c) => (
                    <div key={c.id} style={{ ...card, padding: 14, background: c.byDoctor ? "#eef7f6" : "white" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.byDoctor ? "#0b746f" : "#334155" }}>
                        {c.name}{c.byDoctor ? " · Faculty" : ""}{c.mine ? " (you)" : ""} · {formatDate(c.createdAt)}
                      </div>
                      <div style={{ whiteSpace: "pre-wrap", marginTop: 4 }}>{c.text}</div>
                    </div>
                  ))}
                </div>
                {item.commentsOpen ? (
                  <form onSubmit={post} style={{ marginTop: 12 }}>
                    <textarea
                      aria-label="Your comment"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      maxLength={2000}
                      rows={4}
                      placeholder="Your differential, question or approach… (no patient identifiers)"
                      style={{ ...field, resize: "vertical" }}
                    />
                    <button type="submit" disabled={posting} style={{ ...primaryBtn, marginTop: 8 }}>{posting ? "Posting…" : "Post"}</button>
                  </form>
                ) : (
                  <p style={{ color: "#64748b" }}>Comments are closed for this case.</p>
                )}
              </section>
            )}
          </article>
        )}
      </div>
    </main>
  );
}
