import Link from "next/link";
import { CITY_LIST } from "../../lib/content/conditions/cities";
import { REGIONS } from "../../lib/content/regions";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { ArrowRightIcon, GlobeIcon, MapPinIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  home: { en: "Home", hi: "होम" },
  h1: { en: "Locations we serve", hi: "हमारे सेवा क्षेत्र" },
  intro: {
    en: "Neuro Mind Bloom is based in Ajmer, Rajasthan. Patients anywhere in India can consult Dr. Kuldeep Budania by private video. No clinic is claimed outside Ajmer.",
    hi: "Neuro Mind Bloom अजमेर, राजस्थान में है। भारत में कहीं के भी मरीज़ डॉ. कुलदीप बुडानिया से निजी वीडियो परामर्श ले सकते हैं। अजमेर के बाहर किसी क्लिनिक का दावा नहीं है।",
  },
  rajasthan: { en: "Rajasthan — 25 cities", hi: "राजस्थान — 25 शहर" },
  rajasthanHub: { en: "Psychiatrist in Rajasthan", hi: "राजस्थान में मनोचिकित्सक" },
  ajmer: { en: "Ajmer (home city)", hi: "अजमेर (मुख्य शहर)" },
  north: { en: "North India & all India", hi: "उत्तर भारत और पूरा भारत" },
  intl: { en: "Indians living abroad", hi: "विदेश में रहने वाले भारतीय" },
  intlText: { en: "Educational information and local helplines; consultations are for patients in India.", hi: "जानकारी और स्थानीय हेल्पलाइन; परामर्श भारत में मौजूद मरीज़ों के लिए है।" },
};

export default function LocationsIndex({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath("/locations", lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", url, name: t(T.h1), inLanguage: hi ? "hi-IN" : "en-IN" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
        { "@type": "ListItem", position: 2, name: t(T.h1), item: url },
      ] },
    ],
  };
  const cities = [...CITY_LIST].sort((a, b) => a.name.en.localeCompare(b.name.en));
  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path="/locations" />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6">
        <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-4 text-sm text-forest-600">
          <Link href={localePath("/", lang)} className="hover:text-forest-900">{t(T.home)}</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">{t(T.h1)}</span>
        </nav>
        <h1 className={`font-semibold text-forest-900 ${hi ? "text-3xl md:text-5xl" : "font-display text-4xl md:text-5xl"}`}>{t(T.h1)}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-800">{t(T.intro)}</p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-forest-900">{t(T.rajasthan)}</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <li><Link href={localePath("/psychiatrist-ajmer", lang)} className="flex items-center gap-2 rounded-xl bg-forest-800 px-4 py-3 font-semibold text-white"><MapPinIcon size={16} />{t(T.ajmer)}</Link></li>
            {cities.map((c) => (
              <li key={c.slug}><Link href={localePath(`/${c.slug}`, lang)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-forest-900 ring-1 ring-forest-100 hover:ring-forest-500"><MapPinIcon size={16} className="text-saffron-600" />{t(c.name)}</Link></li>
            ))}
          </ul>
          <Link href={localePath("/psychiatrist-rajasthan", lang)} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-forest-700 hover:text-forest-900">{t(T.rajasthanHub)} <ArrowRightIcon size={15} /></Link>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-forest-900">{t(T.north)}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r) => (
              <li key={r.slug}>
                <Link href={localePath(`/locations/${r.slug}`, lang)} className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-forest-100 hover:ring-forest-500">
                  <span className="text-lg font-semibold text-forest-900">{t(r.name)}</span>
                  <span className="mt-1 text-sm text-forest-700">{r.cities.map((c) => t(c.name)).join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <Link href={localePath("/international", lang)} className="flex items-start gap-4 rounded-3xl bg-forest-800 p-6 text-white">
            <GlobeIcon size={28} className="shrink-0 text-saffron-400" />
            <span><span className="block text-xl font-semibold">{t(T.intl)}</span><span className="text-forest-100">{t(T.intlText)}</span></span>
          </Link>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
