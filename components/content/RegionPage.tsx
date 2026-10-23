import Link from "next/link";
import { getCondition } from "../../lib/content/conditions";
import type { Region } from "../../lib/content/regions";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { DOCTOR, SITE_URL } from "../../lib/site";
import BookNowMenu from "../site/BookNowMenu";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon, CheckIcon, MapPinIcon, PlusIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  home: { en: "Home", hi: "होम" },
  locations: { en: "Locations", hi: "सेवा क्षेत्र" },
  cities: { en: "Cities we serve online", hi: "जिन शहरों में ऑनलाइन सेवा है" },
  concerns: { en: "Common reasons people consult", hi: "परामर्श के आम कारण" },
  topics: { en: "Helpful guides", hi: "उपयोगी जानकारी" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  online: { en: "Online consultation only — no physical clinic in this region.", hi: "सिर्फ़ ऑनलाइन परामर्श — इस क्षेत्र में कोई क्लिनिक नहीं है।" },
  cta: { en: "Book a private video consultation", hi: "निजी वीडियो परामर्श बुक करें" },
};

export default function RegionPage({ region, lang }: { region: Region; lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const path = `/locations/${region.slug}`;
  const url = `${SITE_URL}${localePath(path, lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "MedicalWebPage", url, name: t(region.title), description: t(region.description), inLanguage: hi ? "hi-IN" : "en-IN", about: { "@id": `${SITE_URL}/#doctor` } },
      { "@type": "FAQPage", mainEntity: region.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t(T.locations), item: `${SITE_URL}${localePath("/locations", lang)}` },
          { "@type": "ListItem", position: 3, name: t(region.name), item: url },
        ],
      },
    ],
  };
  const topics = region.topics.map(getCondition).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={path} />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-8 md:px-6">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <Link href={localePath("/locations", lang)} className="hover:text-white">{t(T.locations)}</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">{t(region.name)}</span>
            </nav>
            <h1 className={`font-semibold ${hi ? "text-3xl md:text-5xl" : "font-display text-4xl md:text-5xl"}`}>{t(region.h1)}</h1>
            {region.intro.map((p) => <p key={p.en} className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-100">{t(p)}</p>)}
            <p className="mt-4 text-sm text-forest-200">{t(DOCTOR.name)} · {DOCTOR.degrees} · {t(T.online)}</p>
            <div className="mt-6"><BookNowMenu lang={lang} align="start" /></div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(T.cities)}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {region.cities.map((c) => (
              <li key={c.name.en} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-forest-100">
                <MapPinIcon size={20} className="mt-0.5 shrink-0 text-saffron-600" />
                <span><strong className="block text-forest-900">{t(c.name)}</strong><span className="text-forest-700">{t(c.note)}</span></span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold text-forest-900">{t(T.concerns)}</h2>
              <ul className="mt-4 grid gap-2">
                {region.concerns.map((c) => <li key={c.en} className="flex gap-2 text-forest-800"><CheckIcon size={18} className="mt-1 shrink-0 text-forest-600" />{t(c)}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-forest-900">{t(T.topics)}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {topics.map((c) => (
                  <li key={c.slug}><Link href={localePath(`/${c.slug}`, lang)} className="inline-flex items-center gap-1 rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800 hover:bg-forest-100">{t(c.name)} <ArrowRightIcon size={13} /></Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-semibold text-forest-900">{t(T.faq)}</h2>
          <div className="mt-6 divide-y divide-forest-100 rounded-2xl bg-white ring-1 ring-forest-100">
            {region.faqs.map((f) => (
              <details key={f.q.en} className="group px-5">
                <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-forest-900">{t(f.q)}<PlusIcon size={18} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" /></summary>
                <p className="pb-4 leading-relaxed text-forest-700">{t(f.a)}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-forest-800 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl font-semibold">{t(T.cta)}</p>
            <BookNowMenu lang={lang} align="start" />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
