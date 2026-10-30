"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { api } from "../../../lib/client/residentApi";
import { CONTENT_LABEL, CONTENT_TYPES, type ContentSummary, type ContentType } from "../../../lib/residents";
import ProfileForm from "../../../components/residents/ProfileForm";
import { formatDate, useResident } from "../../../components/residents/useResident";
import { card, chip, field, ghostBtn, page } from "../../../components/residents/ui";

const ICON: Record<ContentType, string> = { note: "📄", video: "🎬", case: "🩺" };

export default function ResidentHome() {
  const router = useRouter();
  const { user, me, error, refresh } = useResident();
  const [items, setItems] = useState<ContentSummary[] | null>(null);
  const [tab, setTab] = useState<ContentType | "all">("all");
  const [q, setQ] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (!me?.profile) return;
    api<{ items: ContentSummary[] }>("/api/residents/content").then(({ data }) => setItems(data.ok ? data.items : []));
  }, [me?.profile]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (items || []).filter(
      (i) => (tab === "all" || i.type === tab) && (!term || `${i.title} ${i.topic} ${i.summary}`.toLowerCase().includes(term))
    );
  }, [items, tab, q]);

  async function logout() {
    await signOut(auth);
    router.replace("/residents/login");
  }

  if (error) return <main style={page}><div style={card}>{error}</div></main>;
  if (!me || !user) return <main style={page}><p>Loading…</p></main>;

  const daysLeft = me.accessUntil ? Math.ceil((me.accessUntil - Date.now()) / 86400000) : 0;

  return (
    <main style={page}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#0b746f", fontWeight: 700, fontSize: 14 }}>Neuro Mind Bloom · Residents</div>
            <h1 style={{ margin: "2px 0", fontSize: 24, color: "#062b31" }}>{me.profile ? `Hello, ${me.profile.name.split(" ")[0]}` : "Welcome"}</h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {me.profile && <button type="button" style={ghostBtn} onClick={() => setEditProfile(!editProfile)}>Profile</button>}
            <button type="button" style={ghostBtn} onClick={logout}>Sign out</button>
          </div>
        </header>

        {!user.emailVerified && (
          <p style={{ background: "#fdefd6", padding: "10px 14px", borderRadius: 12, fontSize: 14 }}>
            Please verify your email using the link we sent to {user.email}. It helps you recover your account.
          </p>
        )}

        {(!me.profile || editProfile) && (
          <div style={{ marginTop: 16 }}>
            <ProfileForm initial={me.profile} onSaved={() => { setEditProfile(false); refresh(); }} />
          </div>
        )}

        {me.profile && (
          <>
            <div style={{ ...card, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {/* App store rules: no prices, buy buttons or payment links inside the app. */}
              {me.active ? (
                <span>✅ Access active till <strong>{formatDate(me.accessUntil)}</strong>{daysLeft <= 7 ? ` — ${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : ""}</span>
              ) : me.accessUntil ? (
                <span>Your access ended on <strong>{formatDate(me.accessUntil)}</strong>.</span>
              ) : (
                <span>Your account does not have access yet.</span>
              )}
              <button type="button" style={ghostBtn} onClick={refresh}>Refresh</button>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              <button type="button" style={chip(tab === "all")} onClick={() => setTab("all")}>All</button>
              {CONTENT_TYPES.map((t) => (
                <button key={t} type="button" style={chip(tab === t)} onClick={() => setTab(t)}>{CONTENT_LABEL[t].en}</button>
              ))}
            </div>
            <input aria-label="Search" placeholder="Search topics…" value={q} onChange={(e) => setQ(e.target.value)} style={{ ...field, marginTop: 12 }} />

            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {items === null && <p>Loading content…</p>}
              {items !== null && shown.length === 0 && <p style={{ color: "#475569" }}>No content here yet. New material is added regularly.</p>}
              {shown.map((i) =>
                me.active ? (
                  <Link key={i.id} href={`/residents/app/${i.id}`} style={{ ...card, textDecoration: "none", color: "inherit", display: "block" }}>
                    <Row item={i} locked={false} />
                  </Link>
                ) : (
                  <div key={i.id} style={{ ...card, opacity: 0.75 }}>
                    <Row item={i} locked />
                  </div>
                )
              )}
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: "#64748b" }}>
              For learning only — not for treating patients without supervision.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function Row({ item, locked }: { item: ContentSummary; locked: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span aria-hidden style={{ fontSize: 26 }}>{ICON[item.type]}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#0b746f", fontWeight: 700 }}>
          {CONTENT_LABEL[item.type].en}{item.topic ? ` · ${item.topic}` : ""}
        </div>
        <div style={{ fontWeight: 700, fontSize: 17 }}>{item.title} {locked && "🔒"}</div>
        {item.summary && <div style={{ color: "#475569", fontSize: 14, marginTop: 2 }}>{item.summary}</div>}
      </div>
    </div>
  );
}
