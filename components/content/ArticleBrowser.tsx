"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { L10n, Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";

export type ArticleCard = {
  slug: string;
  cat: string;
  title: L10n;
  excerpt: L10n;
  category: L10n;
  updated: string;
  readMinutes: number;
  search: string;
  /** Doctor-published (CMS) articles live under /articles/<slug> too. */
  cms?: boolean;
};

const T = {
  search: { en: "Search articles (English, Hindi or Hinglish)…", hi: "लेख खोजें (हिंदी, अंग्रेज़ी या हिंग्लिश)…" },
  all: { en: "All", hi: "सभी" },
  popular: { en: "Popular topics", hi: "लोकप्रिय विषय" },
  recent: { en: "Recently updated", hi: "हाल ही में अपडेट" },
  results: { en: "articles", hi: "लेख" },
  none: { en: "No articles match. Try another word or category.", hi: "कोई लेख नहीं मिला। दूसरा शब्द या श्रेणी आज़माएँ।" },
  more: { en: "Show more", hi: "और दिखाएँ" },
  min: { en: "min read", hi: "मिनट" },
};

const POPULAR: { label: L10n; q: string }[] = [
  { label: { en: "Depression", hi: "डिप्रेशन" }, q: "depression" },
  { label: { en: "Anxiety & panic", hi: "घबराहट" }, q: "anxiety" },
  { label: { en: "Alcohol", hi: "शराब" }, q: "alcohol" },
  { label: { en: "Sleep", hi: "नींद" }, q: "sleep" },
  { label: { en: "OCD", hi: "OCD" }, q: "ocd" },
  { label: { en: "Premature ejaculation", hi: "शीघ्रपतन" }, q: "ejaculation" },
  { label: { en: "Exam stress", hi: "परीक्षा का तनाव" }, q: "exam" },
  { label: { en: "ADHD", hi: "ADHD" }, q: "adhd" },
  { label: { en: "Memory", hi: "याददाश्त" }, q: "memory" },
];

function fmt(date: string, lang: Lang) {
  return new Date(`${date}T00:00:00+05:30`).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function ArticleBrowser({ lang, cards, cats }: { lang: Lang; cards: ArticleCard[]; cats: Record<string, L10n> }) {
  const t = (v: L10n) => tr(v, lang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");
  const [shown, setShown] = useState(24);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of cards) m[c.cat] = (m[c.cat] ?? 0) + 1;
    return m;
  }, [cards]);

  const list = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return cards
      .filter((c) => (!cat || c.cat === cat) && words.every((w) => c.search.includes(w)))
      .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.en.localeCompare(b.title.en));
  }, [cards, q, cat]);

  const recent = useMemo(() => [...cards].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5), [cards]);
  const filtering = q.trim() !== "" || cat !== "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <label htmlFor="article-search" className="sr-only">{t(T.search)}</label>
          <input
            id="article-search"
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setShown(24); }}
            placeholder={t(T.search)}
            className="w-full rounded-2xl border border-forest-200 bg-white px-5 py-3.5 text-lg text-forest-900 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-200"
          />
          <div role="group" aria-label={lang === "hi" ? "श्रेणियाँ" : "Categories"} className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => { setCat(""); setShown(24); }} aria-pressed={cat === ""} className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${cat === "" ? "bg-forest-800 text-white ring-forest-800" : "bg-white text-forest-800 ring-forest-200"}`}>
              {t(T.all)} ({cards.length})
            </button>
            {Object.entries(cats).filter(([k]) => counts[k]).map(([k, label]) => (
              <button key={k} type="button" onClick={() => { setCat(k); setShown(24); }} aria-pressed={cat === k} className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${cat === k ? "bg-forest-800 text-white ring-forest-800" : "bg-white text-forest-800 ring-forest-200"}`}>
                {t(label)} ({counts[k]})
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-forest-700" aria-live="polite">{list.length} {t(T.results)}</p>
          {list.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-white p-6 text-forest-800 ring-1 ring-forest-100">{t(T.none)}</p>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.slice(0, shown).map((a) => (
                <li key={a.slug}>
                  <Link href={localePath(`/articles/${a.slug}`, lang)} className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-forest-100 transition hover:-translate-y-0.5 hover:ring-forest-500">
                    <span className="w-fit rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-600">{t(a.category)}</span>
                    <span className="mt-3 text-lg font-semibold leading-snug text-forest-900">{t(a.title)}</span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700">{t(a.excerpt)}</span>
                    <span className="mt-3 text-sm text-forest-700/80">{fmt(a.updated, lang)} · {a.readMinutes} {t(T.min)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {list.length > shown && (
            <button type="button" onClick={() => setShown((n) => n + 24)} className="mt-6 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
              {t(T.more)}
            </button>
          )}
        </div>
        <aside className="grid content-start gap-6">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-forest-100">
            <h2 className="font-semibold text-forest-900">{t(T.popular)}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <li key={p.q}>
                  <button type="button" onClick={() => { setQ(p.q); setCat(""); setShown(24); }} className="rounded-full bg-forest-50 px-3 py-1.5 text-sm font-medium text-forest-800 hover:bg-forest-100">{t(p.label)}</button>
                </li>
              ))}
            </ul>
          </div>
          {!filtering && (
            <div className="rounded-3xl bg-white p-5 ring-1 ring-forest-100">
              <h2 className="font-semibold text-forest-900">{t(T.recent)}</h2>
              <ul className="mt-3 grid gap-3">
                {recent.map((a) => (
                  <li key={a.slug}>
                    <Link href={localePath(`/articles/${a.slug}`, lang)} className="block text-[15px] font-medium leading-snug text-forest-800 hover:text-forest-900 hover:underline">{t(a.title)}</Link>
                    <span className="text-xs text-forest-700/80">{fmt(a.updated, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
