import Link from "next/link";
import { CONDITIONS } from "../../lib/content/conditions";
import { LIBRARY_GROUPS, groupOf } from "../../lib/content/library";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon } from "../site/icons";

const T = {
  title: { en: "Condition library", hi: "बीमारियों की जानकारी" },
  intro: {
    en: "Plain-language guides to common mental health, addiction and sexual health conditions — symptoms, causes, treatment and when to seek help. In Hindi and English.",
    hi: "मानसिक स्वास्थ्य, नशा और यौन स्वास्थ्य की आम समस्याओं की आसान भाषा में जानकारी — लक्षण, कारण, इलाज और कब मदद लें। हिंदी और अंग्रेज़ी में।",
  },
  jump: { en: "Browse by category", hi: "श्रेणी के अनुसार देखें" },
  search: { en: "Search conditions, symptoms, treatments…", hi: "बीमारी, लक्षण या इलाज खोजें…" },
};

export default function ConditionsLibrary({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path="/conditions" />
      <main>
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 max-w-3xl text-lg text-forest-100">{t(T.intro)}</p>
            <form action={localePath("/search", lang)} method="get" role="search" className="mt-6 max-w-xl">
              <label htmlFor="lib-q" className="sr-only">{t(T.search)}</label>
              <input
                id="lib-q"
                name="q"
                type="search"
                placeholder={t(T.search)}
                className="w-full rounded-full border-0 bg-white px-5 py-3 text-forest-900 placeholder:text-forest-700/60"
              />
            </form>
          </div>
        </section>
        <nav aria-label={t(T.jump)} className="border-b border-forest-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
            <p className="text-sm font-semibold text-forest-700">{t(T.jump)}</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm">
              {LIBRARY_GROUPS.filter((g) => CONDITIONS.some((c) => groupOf(c) === g.id)).map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-block rounded-full bg-cream px-3 py-1.5 font-medium text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500">
                    {t(g.label)} <span className="text-forest-700/60">({CONDITIONS.filter((c) => groupOf(c) === g.id).length})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          {LIBRARY_GROUPS.map((g) => {
            const items = CONDITIONS.filter((c) => groupOf(c) === g.id);
            if (!items.length) return null;
            return (
              <section key={g.id} id={g.id} className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-semibold text-forest-900">{t(g.label)}</h2>
                <p className="mt-1 text-forest-700">{t(g.blurb)}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={localePath(`/${c.slug}`, lang)}
                        className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-forest-100 transition hover:ring-forest-500"
                      >
                        <span className="text-lg font-semibold text-forest-900">{t(c.name)}</span>
                        {lang === "en" && <span className="text-sm text-saffron-600">{c.name.hi}</span>}
                        <span className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700/90">{t(c.description)}</span>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                          {lang === "hi" ? "पूरी जानकारी" : "Read guide"} <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
