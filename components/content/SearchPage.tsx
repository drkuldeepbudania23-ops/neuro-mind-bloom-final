import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { buildSearchIndex, searchSite, type SearchKind } from "../../lib/content/search";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon } from "../site/icons";

const INDEX = buildSearchIndex();

const T = {
  title: { en: "Search", hi: "खोजें" },
  placeholder: { en: "e.g. depression, neend, daru, panic, NEET stress", hi: "जैसे डिप्रेशन, नींद, शराब, घबराहट, NEET तनाव" },
  button: { en: "Search", hi: "खोजें" },
  results: { en: "results for", hi: "परिणाम:" },
  none: {
    en: "Nothing matched. Try a simpler word (for example \"sleep\", \"alcohol\", \"anxiety\") or browse the condition library.",
    hi: "कुछ नहीं मिला। आसान शब्द आज़माएँ (जैसे \"नींद\", \"शराब\", \"घबराहट\") या बीमारियों की सूची देखें।",
  },
  library: { en: "Browse all conditions", hi: "सभी बीमारियाँ देखें" },
  popular: { en: "Popular searches", hi: "लोकप्रिय खोज" },
};

const KIND: Record<SearchKind, { en: string; hi: string }> = {
  condition: { en: "Condition", hi: "बीमारी" },
  therapy: { en: "Therapy", hi: "थेरेपी" },
  article: { en: "Article", hi: "लेख" },
  test: { en: "Self-check", hi: "स्व-जाँच" },
  page: { en: "Page", hi: "पेज" },
};

const POPULAR = ["depression", "anxiety", "neend", "daru", "smack", "OCD", "NEET", "dhat", "ADHD", "dementia"];

export default function SearchPage({ lang, query }: { lang: Lang; query: string }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const results = query ? searchSite(INDEX, query) : [];
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path="/search" />
      <main id="main" className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold text-forest-900 md:text-4xl">{t(T.title)}</h1>
        <form action={localePath("/search", lang)} method="get" role="search" className="mt-5 flex gap-2">
          <label htmlFor="q" className="sr-only">{t(T.title)}</label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={t(T.placeholder)}
            className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-forest-900 ring-1 ring-forest-200 focus:ring-2 focus:ring-forest-500"
          />
          <button type="submit" className="rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">{t(T.button)}</button>
        </form>

        {!query && (
          <div className="mt-8">
            <p className="font-semibold text-forest-900">{t(T.popular)}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <li key={p}>
                  <Link href={`${localePath("/search", lang)}?q=${encodeURIComponent(p)}`} className="inline-block rounded-full bg-white px-4 py-2 text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query && (
          <p className="mt-6 text-forest-700" aria-live="polite">
            {results.length} {t(T.results)} “{query}”
          </p>
        )}
        {query && results.length === 0 && (
          <p className="mt-4 rounded-2xl bg-white p-5 text-forest-800 ring-1 ring-forest-100">
            {t(T.none)}{" "}
            <Link href={localePath("/conditions", lang)} className="font-semibold underline">{t(T.library)}</Link>
          </p>
        )}
        <ul className="mt-4 grid gap-3">
          {results.map((r) => (
            <li key={r.path}>
              <Link href={localePath(r.path, lang)} className="group flex items-start justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-forest-100 hover:ring-forest-500">
                <span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-saffron-600">
                    {t(KIND[r.kind])}
                    {r.group ? ` · ${t(r.group)}` : ""}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-forest-900">{t(r.title)}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-forest-700">{t(r.text)}</span>
                </span>
                <ArrowRightIcon size={18} className="mt-6 shrink-0 text-forest-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
