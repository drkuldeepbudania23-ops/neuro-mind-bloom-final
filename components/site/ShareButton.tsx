"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { WEBSITE } from "../../lib/site";
import { CheckIcon, CopyIcon, ShareIcon, SocialIcon } from "./icons";

const T = {
  share: { en: "Share website", hi: "वेबसाइट शेयर करें" },
  copy: { en: "Copy link", hi: "लिंक कॉपी करें" },
  copied: { en: "Link copied", hi: "लिंक कॉपी हो गया" },
  text: {
    en: "Neuro Mind Bloom – confidential psychiatry, de-addiction & sexual health care by Dr. Kuldeep Budania (MD Psychiatry).",
    hi: "Neuro Mind Bloom – डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा): मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ।",
  },
};

/**
 * Share the website. Uses the phone's native share sheet when available
 * (Android/iOS), otherwise shows WhatsApp / Facebook / Copy-link options.
 */
export default function ShareButton({
  lang,
  url = WEBSITE.url,
  tone = "light",
}: {
  lang: Lang;
  url?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const text = tr(T.text, lang);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  async function onShare() {
    const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
    if (typeof nav.share === "function") {
      try {
        await nav.share({ title: "Neuro Mind Bloom", text, url });
        return;
      } catch (error) {
        // User cancelled the native sheet — do nothing.
        if ((error as DOMException)?.name === "AbortError") return;
      }
    }
    setOpen((v) => !v);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const item = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-forest-900 hover:bg-forest-50";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={onShare}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold transition ${
          tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500"
        }`}
      >
        <ShareIcon size={18} /> {tr(T.share, lang)}
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-2xl border border-forest-100 bg-white p-2 shadow-[0_18px_48px_rgba(6,43,49,0.18)]">
          <a
            className={item}
            href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-whatsapp"><SocialIcon name="whatsapp" size={20} /></span> WhatsApp
          </a>
          <a
            className={item}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-[#1877f2]"><SocialIcon name="facebook" size={20} /></span> Facebook
          </a>
          <button type="button" className={item} onClick={copy}>
            {copied ? <CheckIcon size={20} className="text-forest-500" /> : <CopyIcon size={20} />}
            {tr(copied ? T.copied : T.copy, lang)}
          </button>
        </div>
      )}
    </div>
  );
}
