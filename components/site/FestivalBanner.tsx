"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { currentGreeting, type FestivalGreeting } from "../../lib/festival";
import { CloseIcon } from "./icons";

/**
 * Shows a festival greeting (no offers) only during its date window.
 * Decided on the client so a statically built page still turns the banner
 * on and off on the right days.
 */
export default function FestivalBanner({ lang }: { lang: Lang }) {
  const [greeting, setGreeting] = useState<FestivalGreeting | null>(null);

  useEffect(() => {
    const g = currentGreeting();
    if (!g) return;
    try {
      if (sessionStorage.getItem(`nmb-greeting-${g.id}`) === "closed") return;
    } catch {
      /* storage unavailable — just show it */
    }
    setGreeting(g);
  }, []);

  if (!greeting) return null;

  const close = () => {
    try {
      sessionStorage.setItem(`nmb-greeting-${greeting.id}`, "closed");
    } catch {
      /* ignore */
    }
    setGreeting(null);
  };

  return (
    <div
      role="region"
      aria-label={tr(greeting.title, lang)}
      className="relative bg-gradient-to-r from-saffron-600 via-saffron-500 to-saffron-600 text-white"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 md:items-center md:px-6">
        <span aria-hidden="true" className="text-xl leading-none md:text-2xl">🪔</span>
        <p className="min-w-0 flex-1 text-sm leading-snug md:text-[15px]">
          <strong className="font-semibold">{tr(greeting.title, lang)}</strong>{" "}
          <span className="text-white/95">{tr(greeting.message, lang)}</span>
        </p>
        <button
          type="button"
          onClick={close}
          aria-label={lang === "hi" ? "बंद करें" : "Close"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-white/15"
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
