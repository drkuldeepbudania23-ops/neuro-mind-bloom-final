import Image from "next/image";
import Link from "next/link";
import JsonLd from "../content/JsonLd";
import { PROFILE, PROFILE_PATH } from "../../lib/content/profile";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CLINIC, DOCTOR, SITE_URL, SOCIAL, STATS } from "../../lib/site";
import BookNowMenu from "./BookNowMenu";
import FloatingWhatsApp from "./FloatingWhatsApp";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CallNowButton } from "./Social";
import { CheckIcon, FileIcon, ShieldIcon } from "./icons";

const T = {
  home: { en: "Home", hi: "होम" },
  profile: { en: "Doctor profile", hi: "डॉक्टर प्रोफ़ाइल" },
  about: { en: "About Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया के बारे में" },
  experience: { en: "Professional experience", hi: "पेशेवर अनुभव" },
  leadership: { en: "Professional leadership", hi: "पेशेवर नेतृत्व" },
  memberships: { en: "Professional Memberships & Affiliations", hi: "पेशेवर सदस्यता और संबद्धता" },
  certs: { en: "Certifications & Professional Training", hi: "प्रमाणपत्र और पेशेवर प्रशिक्षण" },
  certsNote: {
    en: "Short training courses completed in addition to the MD Psychiatry degree.",
    hi: "MD मनोचिकित्सा डिग्री के अलावा पूरे किए गए प्रशिक्षण कोर्स।",
  },
  view: { en: "View Certificate", hi: "प्रमाणपत्र देखें" },
  expertise: { en: "Areas of clinical work", hi: "इलाज के मुख्य क्षेत्र" },
  languages: { en: "Consultation languages", hi: "परामर्श की भाषाएँ" },
  contact: { en: "Contact", hi: "संपर्क" },
  cta: { en: "Consult Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया से परामर्श लें" },
  ctaText: { en: "Private video consultation across India, in Hindi or English.", hi: "पूरे भारत में निजी वीडियो परामर्श, हिंदी या अंग्रेज़ी में।" },
};

export default function DoctorProfile({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath(PROFILE_PATH, lang)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url,
        inLanguage: hi ? "hi-IN" : "en-IN",
        mainEntity: { "@id": `${SITE_URL}/#doctor` },
      },
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#doctor`,
        name: PROFILE.name.en,
        url,
        image: `${SITE_URL}${DOCTOR.photo}`,
        description: PROFILE.description.en,
        medicalSpecialty: "Psychiatric",
        knowsLanguage: ["hi", "en"],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD Psychiatry" },
          ...PROFILE.certificates.map((c) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: c.title.en,
            recognizedBy: { "@type": "Organization", name: c.institution.en },
          })),
        ],
        memberOf: [
          { "@type": "Organization", name: "Indian Psychiatric Society" },
          { "@type": "Organization", name: "Rajasthan De-addiction Society" },
        ],
        address: { "@type": "PostalAddress", addressLocality: "Ajmer", addressRegion: "Rajasthan", addressCountry: "IN" },
        telephone: CLINIC.phone,
        sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t(PROFILE.name), item: url },
        ],
      },
    ],
  };

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className={`font-semibold text-forest-900 ${hi ? "text-2xl md:text-3xl" : "font-display text-2xl md:text-3xl"}`}>{children}</h2>
  );

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={PROFILE_PATH} />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-8 md:grid-cols-[1fr_320px] md:px-6 md:pb-16">
            <div>
              <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
                <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <span aria-current="page" className="text-white">{t(T.profile)}</span>
              </nav>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-saffron-400">Neuro Mind Bloom</p>
              <h1 className={`mt-2 font-semibold ${hi ? "text-4xl md:text-5xl" : "font-display text-4xl md:text-6xl"}`}>{t(PROFILE.name)}</h1>
              <p className="mt-2 text-lg font-medium text-forest-100">{PROFILE.qualifications}</p>
              <p className="mt-1 text-lg text-saffron-400">{PROFILE.description.en}</p>
              <p className="text-lg text-saffron-400">{PROFILE.description.hi}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <BookNowMenu lang={lang} align="start" />
                <Link href={localePath("/contact", lang)} className="inline-flex items-center rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/25 hover:bg-white/15">
                  {t(T.contact)}
                </Link>
                <CallNowButton lang={lang} variant="ghost" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] bg-sand">
              <Image src={DOCTOR.photo} alt={`${PROFILE.name.en}, ${PROFILE.qualifications}`} width={1122} height={1402} sizes="300px" className="h-auto w-full" priority />
            </div>
          </div>
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 pb-10 md:grid-cols-4 md:px-6">
            {STATS.map((s) => (
              <li key={s.value} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                <p className="text-2xl font-semibold text-saffron-400">{hi ? s.valueHi ?? s.value : s.value}</p>
                <p className="text-sm text-forest-100">{t(s.label)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr] md:px-6">
          <div>
            <H2>{t(T.about)}</H2>
            {PROFILE.summary.map((p) => (
              <p key={p.en} className="mt-4 text-lg leading-relaxed text-forest-800/90">{t(p)}</p>
            ))}
            <h3 className="mt-8 text-xl font-semibold text-forest-900">{t(T.expertise)}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {PROFILE.expertise.map((e) => (
                <li key={e.en} className="flex gap-2 text-forest-900">
                  <CheckIcon size={18} className="mt-1 shrink-0 text-forest-600" /> {t(e)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-forest-800"><strong>{t(T.languages)}:</strong> {t(PROFILE.languages)}</p>
          </div>
          <div className="grid content-start gap-5">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-forest-100">
              <h2 className="text-xl font-semibold text-forest-900">{t(T.experience)}</h2>
              <ul className="mt-3 grid gap-2">
                {PROFILE.experience.map((e) => (
                  <li key={e.en} className="flex gap-2 text-forest-800"><CheckIcon size={18} className="mt-1 shrink-0 text-saffron-600" /> {t(e)}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-forest-100">
              <h2 className="text-xl font-semibold text-forest-900">{t(T.leadership)}</h2>
              <ul className="mt-3 grid gap-2">
                {PROFILE.leadership.map((e) => (
                  <li key={e.en} className="flex gap-2 text-forest-800"><CheckIcon size={18} className="mt-1 shrink-0 text-saffron-600" /> {t(e)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
            <H2>{t(T.memberships)}</H2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {PROFILE.memberships.map((m) => (
                <li key={m.en} className="flex items-center gap-3 rounded-2xl bg-cream p-5 ring-1 ring-forest-100">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-800 text-saffron-400"><ShieldIcon size={22} /></span>
                  <span className="font-medium text-forest-900">{t(m)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="certifications" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 md:px-6">
          <H2>{t(T.certs)}</H2>
          <p className="mt-2 text-forest-700">{t(T.certsNote)}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILE.certificates.map((c) => (
              <li key={c.title.en} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-saffron-100 text-saffron-600"><FileIcon size={22} /></span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-forest-900">{t(c.title)}</h3>
                <p className="mt-2 flex-1 text-forest-700">{t(c.institution)}</p>
                <p className="mt-3 w-fit rounded-full bg-forest-50 px-3 py-1 text-sm font-semibold text-forest-800">{c.year}</p>
                {c.image && (
                  <a href={c.image} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-700">
                    {t(T.view)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <div className="flex flex-col items-start gap-5 rounded-3xl bg-forest-800 p-8 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{t(T.cta)}</h2>
              <p className="mt-2 text-forest-100">{t(T.ctaText)}</p>
            </div>
            <BookNowMenu lang={lang} align="start" />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
