"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { nav } from "../../lib/content/home";
import { whatsappLink } from "../../lib/site";
import { CalendarIcon, ChevronDownIcon, WhatsAppIcon } from "./icons";

const WHATSAPP_MESSAGE = {
  en: "Hello Dr. Kuldeep Budania, I would like to book a consultation.",
  hi: "नमस्ते डॉ. कुलदीप बुडानिया, मुझे परामर्श के लिए अपॉइंटमेंट चाहिए।",
};

/**
 * "Book Now" button with a two-option dropdown:
 *   1. Website Booking  → booking form (pay online)
 *   2. WhatsApp Booking → opens WhatsApp chat with a prefilled message
 * Keyboard accessible (Enter/Space opens, Escape closes, focus returns to button).
 */
export default function BookNowMenu({
  lang,
  compact = false,
  align = "right",
}: {
  lang: Lang;
  compact?: boolean;
  /** Which edge the dropdown aligns to. "start" = left on mobile, right on desktop. */
  align?: "right" | "start";
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const itemClass =
    "flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-forest-50 focus-visible:bg-forest-50";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-saffron-500 font-semibold text-forest-900 shadow-[0_6px_18px_rgba(232,147,28,0.35)] transition hover:bg-saffron-400 ${
          compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-[15px]"
        }`}
      >
        <CalendarIcon size={18} />
        <span>{tr(nav.bookNow, lang)}</span>
        <ChevronDownIcon size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id={menuId}
          className={`absolute z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] ${align === "right" ? "right-0" : "left-0 md:left-auto md:right-0"} rounded-2xl border border-forest-100 bg-white p-2 shadow-[0_18px_48px_rgba(6,43,49,0.18)]`}
        >
          <Link href={localePath("/book-appointment", lang)} className={itemClass} onClick={() => setOpen(false)}>
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-700">
              <CalendarIcon size={18} />
            </span>
            <span>
              <span className="block font-semibold text-forest-900">{tr(nav.websiteBooking, lang)}</span>
              <span className="block text-sm text-forest-700/80">{tr(nav.websiteBookingHint, lang)}</span>
            </span>
          </Link>
          <a
            href={whatsappLink(WHATSAPP_MESSAGE[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e3f6ea] text-whatsapp">
              <WhatsAppIcon size={18} />
            </span>
            <span>
              <span className="block font-semibold text-forest-900">{tr(nav.whatsappBooking, lang)}</span>
              <span className="block text-sm text-forest-700/80">{tr(nav.whatsappBookingHint, lang)}</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
