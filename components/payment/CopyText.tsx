"use client";

import { useState } from "react";
import type { Lang } from "../../lib/i18n";

/** Shows a value with a tap-to-copy button. */
export default function CopyText({ text, lang }: { text: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the value is still visible to copy manually */
    }
  }
  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-2">
      <span className="break-all font-mono font-semibold">{text}</span>
      <button type="button" onClick={copy} className="shrink-0 whitespace-nowrap rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800 ring-1 ring-forest-200">
        {copied ? (lang === "hi" ? "कॉपी हो गया" : "Copied") : lang === "hi" ? "कॉपी करें" : "Copy"}
      </button>
    </span>
  );
}
