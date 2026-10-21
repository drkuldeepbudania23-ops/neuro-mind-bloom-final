"use client";

import { useEffect } from "react";

/** Sets <html lang> for a subtree (the root layout renders lang="en-IN"). */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);
  return null;
}
