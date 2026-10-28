"use client";

import { useState } from "react";
import { feedbackPageUrl, feedbackRequestMessage } from "../../lib/feedback";
import { gmailComposeUrl, mailtoUrl } from "../../lib/emailCompose";

type Props = {
  /** From an appointment, if available. Mobile alone is enough. */
  name?: string;
  mobile?: string;
  email?: string;
  language?: string;
  /** Show editable name/mobile/email fields (for sending without an appointment). */
  editable?: boolean;
  title?: string;
};

/**
 * Doctor dashboard: send the patient a link to the website feedback form,
 * via WhatsApp (works with only a mobile number) or e-mail.
 */
export default function SendFeedbackLink({ name = "", mobile = "", email = "", language, editable = false, title = "Send Feedback Link" }: Props) {
  const [lang, setLang] = useState<"en" | "hi">(language === "en" ? "en" : "hi");
  const [nm, setNm] = useState(name);
  const [mob, setMob] = useState(mobile);
  const [mail, setMail] = useState(email);
  const [copied, setCopied] = useState("");

  const msg = feedbackRequestMessage(nm, lang);
  const link = feedbackPageUrl(lang);
  const digits = mob.replace(/\D/g, "").slice(-10);
  const validMobile = /^[6-9]\d{9}$/.test(digits);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim());
  const whatsappHref = validMobile ? `https://wa.me/91${digits}?text=${encodeURIComponent(msg.text)}` : "";
  const draft = validEmail ? { to: mail, subject: msg.subject, body: msg.text } : null;
  const gmailHref = draft ? gmailComposeUrl(draft) : "";
  const emailHref = draft ? mailtoUrl(draft) : "";

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(`${label} copied`);
    } catch {
      setCopied("Could not copy — select and copy manually");
    }
    setTimeout(() => setCopied(""), 2500);
  }

  return (
    <div style={box}>
      <b>{title}</b>
      {editable && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <input placeholder="Mobile number" value={mob} onChange={(e) => setMob(e.target.value)} inputMode="tel" style={{ ...input, width: 160 }} />
          <input placeholder="Name (optional)" value={nm} onChange={(e) => setNm(e.target.value)} style={{ ...input, width: 160 }} />
          <input placeholder="Email (optional)" value={mail} onChange={(e) => setMail(e.target.value)} inputMode="email" style={{ ...input, width: 200 }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
        <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "hi")} style={input}>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
        </select>
        {whatsappHref ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: "#128C7E" }}>
            Feedback via WhatsApp
          </a>
        ) : (
          <span style={muted}>{editable && mob ? "Enter a valid 10-digit mobile" : "No valid mobile"}</span>
        )}
        {gmailHref ? (
          <>
            <a href={gmailHref} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: "#1f2937" }}>
              Feedback via Email (Gmail)
            </a>
            <a href={emailHref} style={altLink}>
              other mail app
            </a>
          </>
        ) : (
          !editable && <span style={muted}>No email</span>
        )}
        <button type="button" onClick={() => copy(msg.text, "Message")} style={{ ...btn, background: "#e9eef5", color: "#111", border: 0, cursor: "pointer" }}>
          Copy message
        </button>
        <button type="button" onClick={() => copy(link, "Link")} style={{ ...btn, background: "#e9eef5", color: "#111", border: 0, cursor: "pointer" }}>
          Copy link
        </button>
      </div>
      <div style={{ ...muted, marginTop: 6 }}>
        {copied || <>Link: {link} — responses appear in Doctor → Website: Patient Feedback (pending until you approve).</>}
      </div>
    </div>
  );
}

const box = { marginTop: 14, padding: 12, borderRadius: 10, background: "#fff8eb", border: "1px solid #f3dfb5", width: "100%", boxSizing: "border-box" } as const;
const input = { padding: "8px 10px", borderRadius: 8, border: "1px solid #cbd5e1", width: 110 } as const;
const btn = { textDecoration: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 700, color: "white", fontSize: 14 } as const;
const muted = { fontSize: 13, color: "#55606b" } as const;
const altLink = { fontSize: 13, color: "#334155", textDecoration: "underline" } as const;
