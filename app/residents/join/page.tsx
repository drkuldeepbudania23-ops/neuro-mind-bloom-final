"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { isInApp, RESIDENT_APP_PATH } from "../../../lib/appShell";
import ProfileForm from "../../../components/residents/ProfileForm";
import Plans from "../../../components/residents/Plans";
import { formatDate, useResident } from "../../../components/residents/useResident";
import { card, ghostBtn, page } from "../../../components/residents/ui";

/**
 * Website-only purchase page for the residents' programme. Not linked from the
 * site or the app and not indexed: the doctor shares this link with residents
 * directly (e.g. WhatsApp). Inside the app it forwards to the app home, so the
 * app never shows prices or payment.
 */
export default function ResidentJoinPage() {
  const router = useRouter();
  const [inApp, setInApp] = useState<boolean | null>(null);

  useEffect(() => {
    const app = isInApp();
    setInApp(app);
    if (app) router.replace(RESIDENT_APP_PATH);
  }, [router]);

  if (inApp !== false) return <main style={page}><p>Loading…</p></main>;
  return <Join />;
}

function Join() {
  const router = useRouter();
  const { user, me, error, refresh } = useResident("/residents/join");
  const [editProfile, setEditProfile] = useState(false);

  async function logout() {
    await signOut(auth);
    router.replace("/residents/login?next=/residents/join");
  }

  if (error) return <main style={page}><div style={card}>{error}</div></main>;
  if (!me || !user) return <main style={page}><p>Loading…</p></main>;

  const daysLeft = me.accessUntil ? Math.ceil((me.accessUntil - Date.now()) / 86400000) : 0;

  return (
    <main style={page}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#0b746f", fontWeight: 700, fontSize: 14 }}>Neuro Mind Bloom · Residents</div>
            <h1 style={{ margin: "2px 0", fontSize: 24, color: "#062b31" }}>Residents&apos; subscription</h1>
            <div style={{ color: "#475569", fontSize: 14 }}>Signed in as {user.email}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {me.profile && <button type="button" style={ghostBtn} onClick={() => setEditProfile(!editProfile)}>Profile</button>}
            <button type="button" style={ghostBtn} onClick={logout}>Sign out</button>
          </div>
        </header>

        {(!me.profile || editProfile) && (
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "#475569" }}>Your name and mobile are printed on your notes, so please enter them correctly.</p>
            <ProfileForm initial={me.profile} onSaved={() => { setEditProfile(false); refresh(); }} />
          </div>
        )}

        {me.profile && (
          <>
            <div style={{ ...card, marginTop: 16 }}>
              {me.active ? (
                <span>✅ Access active till <strong>{formatDate(me.accessUntil)}</strong>{daysLeft <= 7 ? ` — ${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : ""}</span>
              ) : me.accessUntil ? (
                <span>Your access ended on <strong>{formatDate(me.accessUntil)}</strong>. Renew below to continue.</span>
              ) : (
                <span>Choose a plan to unlock all notes, lectures and case discussions.</span>
              )}
            </div>

            <div style={{ marginTop: 16 }}>
              <Plans plans={me.plans} renew={me.active} onPaid={refresh} />
            </div>

            <div style={{ ...card, marginTop: 16, background: "#eef7f6" }}>
              <h2 style={{ marginTop: 0, fontSize: 18, color: "#062b31" }}>Where do I study?</h2>
              <p style={{ marginBottom: 0 }}>
                Notes, lectures and case discussions open in the <strong>Neuro Mind Bloom app</strong>. Install it and sign in with{" "}
                <strong>{user.email}</strong> and the same password.
              </p>
            </div>

            <p style={{ marginTop: 20, fontSize: 13, color: "#64748b" }}>
              Access is for your personal use only; notes carry your name and sharing them can lead to your account being closed. For
              learning only — not for treating patients without supervision.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
