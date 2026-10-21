import Link from "next/link";
import type { ConditionContent, ExtraSection } from "../../lib/content/types";
import { getCondition } from "../../lib/content/conditions";
import { articlesFor, groupLabel, groupOf, selfTestsFor } from "../../lib/content/library";
import { ASSESSMENTS } from "../../lib/assessments";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CRISIS_HELPLINE, DOCTOR, SITE_URL, SOCIAL, whatsappLink } from "../../lib/site";
import { latestVideos } from "../../lib/youtube/latest";
import { channelSearchUrl, matchVideos } from "../../lib/youtube/match";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { CallNowButton } from "../site/Social";
import { ArrowRightIcon, CheckIcon, PlusIcon, WhatsAppIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const H = {
  overview: { en: "Overview", hi: "परिचय" },
  symptoms: { en: "Common symptoms", hi: "आम लक्षण" },
  causes: { en: "Causes", hi: "कारण" },
  causesAndRisk: { en: "Causes and risk factors", hi: "कारण और जोखिम" },
  riskFactors: { en: "Risk factors", hi: "जोखिम बढ़ाने वाली बातें" },
  diagnosis: { en: "How it is diagnosed", hi: "निदान (डायग्नोसिस) कैसे होता है" },
  treatment: { en: "Treatment options", hi: "इलाज के विकल्प" },
  psychotherapy: { en: "Psychotherapy and counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
  family: { en: "Guidance for family", hi: "परिवार के लिए मार्गदर्शन" },
  seekHelp: { en: "When to see a psychiatrist", hi: "मनोचिकित्सक से कब मिलें" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  related: { en: "Related conditions", hi: "संबंधित विषय" },
  articles: { en: "Related articles", hi: "संबंधित लेख" },
  videos: { en: "Related videos", hi: "संबंधित वीडियो" },
  videosNone: {
    en: "Watch the clinic's videos on this topic on our YouTube channel.",
    hi: "इस विषय पर क्लिनिक के वीडियो हमारे YouTube चैनल पर देखें।",
  },
  videosCta: { en: "Search our YouTube channel", hi: "हमारे YouTube चैनल पर खोजें" },
  onPage: { en: "On this page", hi: "इस पेज पर" },
  classification: { en: "Classification", hi: "वर्गीकरण" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  wa: { en: "WhatsApp Booking", hi: "WhatsApp से बुकिंग" },
  selfTest: { en: "Free self-assessment", hi: "निःशुल्क स्व-जाँच" },
  selfTestText: {
    en: "A short screening in Hindi or English. Private — nothing is saved. Screening does not establish a diagnosis.",
    hi: "हिंदी या अंग्रेज़ी में छोटी जाँच। पूरी तरह निजी — कुछ भी सेव नहीं होता। स्क्रीनिंग से निदान नहीं होता।",
  },
  start: { en: "Start", hi: "शुरू करें" },
  reviewed: { en: "Medically reviewed by", hi: "चिकित्सकीय समीक्षा:" },
  home: { en: "Home", hi: "होम" },
  library: { en: "Conditions", hi: "बीमारियाँ" },
  cta: { en: "Help is available — confidential, in Hindi or English.", hi: "मदद उपलब्ध है — पूरी गोपनीयता के साथ, हिंदी या अंग्रेज़ी में।" },
  ctaText: {
    en: "Private video consultation from anywhere in India with an Ajmer-based psychiatrist. Psychiatry consultation ₹500.",
    hi: "अजमेर स्थित मनोचिकित्सक से भारत में कहीं से भी निजी वीडियो परामर्श। मनोरोग परामर्श ₹500।",
  },
  crisis: {
    en: `Thoughts of self-harm or a medical emergency? Call ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, free) or 112.`,
    hi: `ख़ुद को नुकसान पहुँचाने के विचार या मेडिकल इमरजेंसी? ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, निःशुल्क) या 112 पर कॉल करें।`,
  },
  disclaimer: {
    en: "This page is for education and does not replace a personal consultation. Do not start or stop any medicine without a doctor's advice.",
    hi: "यह पेज केवल जानकारी के लिए है; व्यक्तिगत परामर्श का विकल्प नहीं है। डॉक्टर की सलाह के बिना कोई दवा शुरू या बंद न करें।",
  },
  read: { en: "Read", hi: "पढ़ें" },
};

type L = { en: string; hi: string };

function Section({ id, title, children, tone = "white" }: { id: string; title: string; children: React.ReactNode; tone?: "white" | "cream" }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-28 ${tone === "white" ? "bg-white" : ""}`}>
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <h2 id={`${id}-h`} className="text-2xl font-semibold text-forest-900 md:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Bullets({ items, t, tone = "cream" }: { items: L[]; t: (v: L) => string; tone?: "cream" | "white" }) {
  return (
    <ul className="grid gap-3">
      {items.map((s) => (
        <li key={s.en} className={`flex gap-3 rounded-2xl p-4 ring-1 ring-forest-100 ${tone === "cream" ? "bg-cream" : "bg-white"}`}>
          <CheckIcon size={20} className="mt-0.5 shrink-0 text-forest-600" />
          <span className="leading-relaxed text-forest-900">{t(s)}</span>
        </li>
      ))}
    </ul>
  );
}

function Extra({ section, t, tone }: { section: ExtraSection; t: (v: L) => string; tone: "white" | "cream" }) {
  if (section.tone === "warning") {
    return (
      <Section id={section.id} title={t(section.title)} tone={tone}>
        <ul role="note" className="grid gap-3 rounded-3xl border-2 border-[#e9b4a8] bg-[#fff3ef] p-5 md:p-6">
          {section.items.map((s) => (
            <li key={s.en} className="flex gap-3 leading-relaxed text-[#5c2414]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b23a1f]" />
              {t(s)}
            </li>
          ))}
        </ul>
      </Section>
    );
  }
  return (
    <Section id={section.id} title={t(section.title)} tone={tone}>
      <Bullets items={section.items} t={t} tone={tone === "white" ? "cream" : "white"} />
    </Section>
  );
}

export default async function ConditionPage({ content, lang }: { content: ConditionContent; lang: Lang }) {
  const t = (v: L) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath(`/${content.slug}`, lang)}`;
  const related = content.related.map(getCondition).filter((c): c is ConditionContent => Boolean(c));
  const heading = (key: keyof NonNullable<ConditionContent["headings"]>, fallback: L) => t(content.headings?.[key] ?? fallback);
  const group = groupOf(content);
  const articles = articlesFor(content);
  const tests = selfTestsFor(content).filter((id) => ASSESSMENTS[id as keyof typeof ASSESSMENTS]);
  const videoKeys = content.videoKeywords ?? [content.name.en.split(/[/(]/)[0].trim()];
  const videos = content.category === "service" ? [] : matchVideos(await latestVideos(50), [...videoKeys, content.name.hi.split(/[/(]/)[0].trim()]);
  const showVideos = content.category !== "service";
  const hasRisk = Boolean(content.riskFactors?.length);

  // Table of contents (only sections that exist on this page)
  const toc: { id: string; label: string }[] = [
    { id: "symptoms", label: heading("symptoms", H.symptoms) },
    { id: "causes", label: hasRisk ? heading("causes", H.causes) : heading("causes", H.causesAndRisk) },
    ...(hasRisk ? [{ id: "risk", label: heading("riskFactors", H.riskFactors) }] : []),
    ...(content.extra ?? []).map((x) => ({ id: x.id, label: t(x.title) })),
    ...(content.diagnosis?.length ? [{ id: "diagnosis", label: heading("diagnosis", H.diagnosis) }] : []),
    { id: "treatment", label: heading("treatment", H.treatment) },
    ...(content.psychotherapy?.length ? [{ id: "psychotherapy", label: heading("psychotherapy", H.psychotherapy) }] : []),
    ...(content.family?.length ? [{ id: "family", label: heading("family", H.family) }] : []),
    { id: "when", label: heading("seekHelp", H.seekHelp) },
    ...(tests.length ? [{ id: "self-check", label: t(H.selfTest) }] : []),
    { id: "faq", label: t(H.faq) },
    ...(related.length || articles.length || showVideos ? [{ id: "related", label: t(H.related) }] : []),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: t(content.title),
        description: t(content.description),
        inLanguage: hi ? "hi-IN" : "en-IN",
        reviewedBy: { "@id": `${SITE_URL}/#doctor` },
        about: {
          "@type": content.category === "service" || group === "therapy" ? (group === "therapy" ? "MedicalTherapy" : "MedicalSpecialty") : "MedicalCondition",
          name: content.name.en,
          ...(content.icd
            ? {
                code: [
                  ...(content.icd.icd10 ? [{ "@type": "MedicalCode", codeValue: content.icd.icd10, codingSystem: "ICD-10" }] : []),
                  ...(content.icd.icd11 ? [{ "@type": "MedicalCode", codeValue: content.icd.icd11, codingSystem: "ICD-11" }] : []),
                ],
              }
            : {}),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(H.home), item: `${SITE_URL}${hi ? "/hi" : ""}` },
          { "@type": "ListItem", position: 2, name: t(H.library), item: `${SITE_URL}${localePath("/conditions", lang)}` },
          { "@type": "ListItem", position: 3, name: t(groupLabel(group)), item: `${SITE_URL}${localePath("/conditions", lang)}#${group}` },
          { "@type": "ListItem", position: 4, name: t(content.name), item: url },
        ],
      },
    ],
  };

  let alt = false;
  const tone = (): "white" | "cream" => ((alt = !alt) ? "white" : "cream");

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={`/${content.slug}`} />

      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-12">
            <nav aria-label="Breadcrumb" className="text-sm text-forest-200">
              <ol className="flex flex-wrap items-center gap-y-1">
                <li><Link href={localePath("/", lang)} className="hover:text-white">{t(H.home)}</Link></li>
                <li aria-hidden className="px-2">/</li>
                <li><Link href={localePath("/conditions", lang)} className="hover:text-white">{t(H.library)}</Link></li>
                <li aria-hidden className="px-2">/</li>
                <li><Link href={`${localePath("/conditions", lang)}#${group}`} className="hover:text-white">{t(groupLabel(group))}</Link></li>
                <li aria-hidden className="px-2">/</li>
                <li aria-current="page" className="text-white">{t(content.name)}</li>
              </ol>
            </nav>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{t(content.h1)}</h1>
            {!hi && <p className="mt-2 text-lg text-saffron-400">{content.name.hi}</p>}
            <div id="overview" className="scroll-mt-28">
              {content.intro.map((p) => (
                <p key={p.en} className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-100">{t(p)}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={localePath("/book-appointment", lang)} className="inline-flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900 hover:bg-saffron-400">
                {t(H.book)} <ArrowRightIcon size={16} />
              </Link>
              <a
                href={whatsappLink(hi ? `नमस्ते, मुझे ${content.name.hi} के बारे में परामर्श चाहिए।` : `Hello, I would like a consultation about ${content.name.en}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white"
              >
                <WhatsAppIcon size={20} /> {t(H.wa)}
              </a>
              <CallNowButton lang={lang} variant="ghost" />
            </div>
            <p className="mt-6 text-sm text-forest-200">
              {t(H.reviewed)} {t(DOCTOR.name)}, {DOCTOR.degrees}
            </p>
          </div>
        </section>

        {/* On this page — scrolls sideways on phones */}
        <nav aria-label={t(H.onPage)} className="sticky top-16 z-20 border-b border-forest-100 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-4xl overflow-x-auto px-4 md:px-6">
            <ul className="flex gap-2 whitespace-nowrap py-3 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="inline-block rounded-full bg-cream px-3 py-1.5 font-medium text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Section id="symptoms" title={heading("symptoms", H.symptoms)} tone={tone()}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.symptoms.map((s) => (
              <li key={s.en} className="flex gap-3 rounded-2xl bg-cream p-4 ring-1 ring-forest-100">
                <CheckIcon size={20} className="mt-0.5 shrink-0 text-forest-600" />
                <span className="leading-relaxed text-forest-900">{t(s)}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="causes" title={hasRisk ? heading("causes", H.causes) : heading("causes", H.causesAndRisk)} tone={tone()}>
          <ul className="grid gap-3">
            {content.causes.map((c) => (
              <li key={c.en} className="rounded-2xl bg-white p-4 leading-relaxed text-forest-900 ring-1 ring-forest-100">{t(c)}</li>
            ))}
          </ul>
        </Section>

        {hasRisk && (
          <Section id="risk" title={heading("riskFactors", H.riskFactors)} tone={tone()}>
            <Bullets items={content.riskFactors!} t={t} />
          </Section>
        )}

        {(content.extra ?? []).map((x) => (
          <Extra key={x.id} section={x} t={t} tone={tone()} />
        ))}

        {content.diagnosis?.length ? (
          <Section id="diagnosis" title={heading("diagnosis", H.diagnosis)} tone={tone()}>
            <Bullets items={content.diagnosis} t={t} />
            {content.icd && (content.icd.icd10 || content.icd.icd11) && (
              <p className="mt-5 rounded-2xl bg-forest-50 px-5 py-4 text-sm text-forest-800 ring-1 ring-forest-100">
                <span className="font-semibold">{t(H.classification)}:</span>{" "}
                {content.icd.icd10 && <span>ICD-10 <span className="font-mono">{content.icd.icd10}</span></span>}
                {content.icd.icd10 && content.icd.icd11 && " · "}
                {content.icd.icd11 && <span>ICD-11 <span className="font-mono">{content.icd.icd11}</span></span>}
                {content.icd.note && <span className="block pt-1 text-forest-700">{t(content.icd.note)}</span>}
              </p>
            )}
          </Section>
        ) : null}

        <Section id="treatment" title={heading("treatment", H.treatment)} tone={tone()}>
          <ol className="grid gap-3">
            {content.treatment.map((step, i) => (
              <li key={step.en} className="flex gap-4 rounded-2xl bg-cream p-4 ring-1 ring-forest-100">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-800 text-sm font-semibold text-saffron-400">{i + 1}</span>
                <span className="pt-0.5 leading-relaxed text-forest-900">{t(step)}</span>
              </li>
            ))}
          </ol>
        </Section>

        {content.psychotherapy?.length ? (
          <Section id="psychotherapy" title={heading("psychotherapy", H.psychotherapy)} tone={tone()}>
            <Bullets items={content.psychotherapy} t={t} tone="white" />
          </Section>
        ) : null}

        {content.family?.length ? (
          <Section id="family" title={heading("family", H.family)} tone={tone()}>
            <Bullets items={content.family} t={t} />
          </Section>
        ) : null}

        <Section id="when" title={heading("seekHelp", H.seekHelp)} tone={tone()}>
          <ul className="grid gap-3 rounded-3xl border-2 border-saffron-400/60 bg-saffron-100 p-5 md:p-6">
            {content.seekHelp.map((s) => (
              <li key={s.en} className="flex gap-3 leading-relaxed text-forest-900">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-saffron-600" />
                {t(s)}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-[#fff3ef] px-5 py-4 text-[#6b2a1a]">{t(H.crisis)}</p>
        </Section>

        {tests.length > 0 && (
          <section id="self-check" className="mx-auto max-w-4xl scroll-mt-28 px-4 py-10 md:px-6">
            <div className="rounded-3xl bg-forest-800 p-6 text-white md:p-8">
              <p className="text-xl font-semibold">{t(H.selfTest)}</p>
              <p className="mt-1 text-forest-100">{t(H.selfTestText)}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {tests.map((id) => (
                  <li key={id}>
                    <Link
                      href={localePath(`/self-assessment/${id}`, lang)}
                      className="inline-flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2.5 font-semibold text-forest-900 hover:bg-saffron-400"
                    >
                      {t(ASSESSMENTS[id as keyof typeof ASSESSMENTS].title)} <ArrowRightIcon size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <Section id="faq" title={t(H.faq)} tone="white">
          <div className="divide-y divide-forest-100 rounded-2xl ring-1 ring-forest-100">
            {content.faqs.map((faq, i) => (
              <details key={faq.q.en} className="group px-5" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-forest-900">
                  {t(faq.q)}
                  <PlusIcon size={20} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-5 leading-relaxed text-forest-700">{t(faq.a)}</p>
              </details>
            ))}
          </div>
        </Section>

        <section id="related" className="scroll-mt-28">
          <div className="mx-auto grid max-w-4xl gap-10 px-4 py-10 md:px-6 md:py-14">
            {related.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-forest-900">{t(H.related)}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={localePath(`/${r.slug}`, lang)} className="flex h-full items-center justify-between gap-3 rounded-2xl bg-white p-4 font-semibold text-forest-900 ring-1 ring-forest-100 hover:ring-forest-500">
                        {t(r.name)} <ArrowRightIcon size={16} className="shrink-0 text-saffron-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {articles.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-forest-900">{t(H.articles)}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link href={localePath(`/articles/${a.slug}`, lang)} className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-forest-100 hover:ring-forest-500">
                        <span className="font-semibold text-forest-900">{t(a.title)}</span>
                        <span className="mt-1 text-[15px] text-forest-700/90">{t(a.excerpt)}</span>
                        <span className="mt-2 text-sm font-semibold text-forest-600">{t(H.read)} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showVideos && (
              <div>
                <h2 className="text-2xl font-semibold text-forest-900">{t(H.videos)}</h2>
                {videos.length > 0 ? (
                  <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                    {videos.map((v) => (
                      <li key={v.id}>
                        <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl bg-white ring-1 ring-forest-100 hover:ring-forest-500">
                          <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} loading="lazy" width={320} height={180} className="aspect-video w-full object-cover" />
                          <span className="block p-3 text-sm font-semibold text-forest-900">{v.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-forest-700">{t(H.videosNone)}</p>
                )}
                <a
                  href={channelSearchUrl(SOCIAL.youtube, videoKeys[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500"
                >
                  {t(H.videosCta)} <ArrowRightIcon size={15} />
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-14 md:px-6">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-forest-100 md:p-8">
            <p className="text-xl font-semibold text-forest-900">{t(H.cta)}</p>
            <p className="mt-1 text-forest-700">{t(H.ctaText)}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={localePath("/book-appointment", lang)} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
                {t(H.book)} <ArrowRightIcon size={16} />
              </Link>
              <CallNowButton lang={lang} variant="outline" />
            </div>
            <p className="mt-5 text-sm text-forest-700/80">{t(H.disclaimer)}</p>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
