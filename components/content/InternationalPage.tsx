import Link from "next/link";
import { INTERNATIONAL as I } from "../../lib/content/international";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { CheckIcon, GlobeIcon, PlusIcon, ShieldIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  home: { en: "Home", hi: "होम" },
  locations: { en: "Locations", hi: "सेवा क्षेत्र" },
  urgent: { en: "Urgent help", hi: "तुरंत मदद" },
  local: { en: "Finding care", hi: "इलाज कैसे खोजें" },
  learn: { en: "Free educational resources", hi: "मुफ़्त जानकारी" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
};

export default function InternationalPage({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath("/international", lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url, name: t(I.title), description: t(I.description), inLanguage: hi ? "hi-IN" : "en-IN" },
      { "@type": "FAQPage", mainEntity: I.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
        { "@type": "ListItem", position: 2, name: t(T.locations), item: `${SITE_URL}${localePath("/locations", lang)}` },
        { "@type": "ListItem", position: 3, name: t(I.h1), item: url },
      ] },
    ],
  };
  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/international" />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-8 md:px-6">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link><span aria-hidden="true" className="mx-2">/</span>
              <Link href={localePath("/locations", lang)} className="hover:text-white">{t(T.locations)}</Link><span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">{hi ? "विदेश" : "International"}</span>
            </nav>
            <GlobeIcon size={32} className="text-saffron-400" />
            <h1 className={`mt-3 font-semibold ${hi ? "text-3xl md:text-5xl" : "font-display text-4xl md:text-5xl"}`}>{t(I.h1)}</h1>
            {I.intro.map((p) => <p key={p.en} className="mt-4 max-w-3xl text-lg text-forest-100">{t(p)}</p>)}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
          <div className="rounded-3xl border-2 border-saffron-400 bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-forest-900"><ShieldIcon size={22} className="text-saffron-600" />{t(I.eligibilityTitle)}</h2>
            <ul className="mt-4 grid gap-2">{I.eligibility.map((e) => <li key={e.en} className="flex gap-2 text-forest-800"><CheckIcon size={18} className="mt-1 shrink-0 text-forest-600" />{t(e)}</li>)}</ul>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-10 md:px-6">
          <h2 className="text-2xl font-semibold text-forest-900">{t(I.concernsTitle)}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{I.concerns.map((c) => <li key={c.en} className="rounded-2xl bg-white p-4 text-forest-800 ring-1 ring-forest-100">{t(c)}</li>)}</ul>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
            <h2 className="text-2xl font-semibold text-forest-900">{t(I.countriesTitle)}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {I.countries.map((c) => (
                <li key={c.name.en} className="rounded-3xl bg-cream p-6 ring-1 ring-forest-100">
                  <h3 className="text-xl font-semibold text-forest-900">{t(c.name)}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-[#8a2c17]">{t(T.urgent)}</p>
                  <p className="text-forest-900">{t(c.urgent)}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-forest-600">{t(T.local)}</p>
                  <p className="text-forest-800">{t(c.local)}</p>
                  <p className="mt-2 text-sm text-forest-700">{t(c.note)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-forest-700">{t(I.disclaimer)}</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-semibold text-forest-900">{t(T.learn)}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[["/articles", { en: "Articles", hi: "लेख" }], ["/self-assessment", { en: "Self-checks", hi: "स्व-जाँच" }], ["/videos", { en: "Videos", hi: "वीडियो" }], ["/conditions", { en: "Conditions library", hi: "बीमारियों की जानकारी" }]].map(([href, label]) => (
              <li key={href as string}><Link href={localePath(href as string, lang)} className="inline-block rounded-full bg-forest-50 px-4 py-2 font-medium text-forest-800 hover:bg-forest-100">{t(label as { en: string; hi: string })}</Link></li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-semibold text-forest-900">{t(T.faq)}</h2>
          <div className="mt-4 divide-y divide-forest-100 rounded-2xl bg-white ring-1 ring-forest-100">
            {I.faqs.map((f) => (
              <details key={f.q.en} className="group px-5">
                <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-forest-900">{t(f.q)}<PlusIcon size={18} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" /></summary>
                <p className="pb-4 leading-relaxed text-forest-700">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
