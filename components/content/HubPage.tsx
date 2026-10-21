import Link from "next/link";
import type { HubContent } from "../../lib/content/hubs";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CRISIS_HELPLINE, DOCTOR, SITE_URL, STATS, whatsappLink } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { CallNowButton } from "../site/Social";
import { ArrowRightIcon, CheckIcon, PlusIcon, ShieldIcon, WhatsAppIcon } from "../site/icons";
import { getCondition } from "../../lib/content/conditions";
import JsonLd from "./JsonLd";

const T = {
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  wa: { en: "WhatsApp now", hi: "अभी WhatsApp करें" },
  myths: { en: "Myths vs facts", hi: "भ्रम बनाम सच" },
  myth: { en: "Myth", hi: "भ्रम" },
  fact: { en: "Fact", hi: "सच" },
  privacy: { en: "Your privacy is our responsibility", hi: "आपकी गोपनीयता — हमारी ज़िम्मेदारी" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  more: { en: "Read more", hi: "और जानें" },
  home: { en: "Home", hi: "होम" },
  selfTest: { en: "Free self-check", hi: "निःशुल्क स्व-जाँच" },
  crisis: {
    en: `Emergency or suicidal thoughts: call 112 or ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, free).`,
    hi: `इमरजेंसी या आत्महत्या के विचार: 112 या ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, निःशुल्क) पर कॉल करें।`,
  },
};

export default function HubPage({ hub, lang }: { hub: HubContent; lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const url = `${SITE_URL}${localePath(`/${hub.slug}`, lang)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: t(hub.title),
        description: t(hub.description),
        inLanguage: hi ? "hi-IN" : "en-IN",
        reviewedBy: { "@id": `${SITE_URL}/#doctor` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${localePath("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t(hub.title).split("–")[0].trim(), item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })),
      },
    ],
  };

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={`/${hub.slug}`} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-14">
            <nav aria-label={hi ? "ब्रेडक्रंब" : "Breadcrumb"} className="mb-5 text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">{t(hub.title).split("–")[0].trim()}</span>
            </nav>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{t(hub.h1)}</h1>
            <p className="mt-4 text-lg font-medium text-saffron-400">{t(hub.tagline)}</p>
            {hub.intro.map((p) => (
              <p key={p.en} className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-100">{t(p)}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(hi ? `नमस्ते डॉक्टर, मुझे ${t(hub.title).split("–")[0].trim()} के बारे में परामर्श चाहिए।` : `Hello Doctor, I would like a consultation about ${t(hub.title).split("–")[0].trim()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white"
              >
                <WhatsAppIcon size={20} /> {t(T.wa)}
              </a>
              <Link href={localePath("/book-appointment", lang)} className="inline-flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3.5 font-semibold text-forest-900 hover:bg-saffron-400">
                {t(T.book)} <ArrowRightIcon size={16} />
              </Link>
              <CallNowButton lang={lang} variant="ghost" />
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATS.map((s) => (
                <li key={s.value} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <p className="text-2xl font-semibold text-saffron-400">{hi ? s.valueHi ?? s.value : s.value}</p>
                  <p className="text-sm text-forest-100">{t(s.label)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-forest-200">{t(DOCTOR.name)} · {DOCTOR.degrees} · {t(DOCTOR.post)}</p>
          </div>
        </section>

        {/* Cards */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <h2 className="text-3xl font-semibold text-forest-900 md:text-4xl">{t(hub.cardsTitle)}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hub.cards.map((card) => (
              <li key={card.href + card.title.en}>
                <Link href={localePath(card.href, lang)} className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-forest-100 transition hover:ring-forest-500">
                  <span className="text-xl font-semibold text-forest-900">{t(card.title)}</span>
                  <span className="text-sm text-saffron-600">{t(card.sub)}</span>
                  <span className="mt-3 flex-1 leading-relaxed text-forest-700">{t(card.text)}</span>
                  {card.tag && <span className="mt-3 w-fit rounded-full bg-[#fff3ef] px-3 py-1 text-xs font-semibold text-[#8a2c17]">{t(card.tag)}</span>}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                    {t(T.more)} <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {hub.more && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-forest-900">{t(hub.more.title)}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {hub.more.slugs.map((slug) => {
                  const c = getCondition(slug);
                  if (!c) return null;
                  return (
                    <li key={slug}>
                      <Link href={localePath(`/${slug}`, lang)} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500">
                        {t(c.name)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* Phases */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <h2 className="text-3xl font-semibold text-forest-900 md:text-4xl">{t(hub.phasesTitle)}</h2>
            <ol className="mt-8 grid gap-5 lg:grid-cols-3">
              {hub.phases.map((phase, i) => (
                <li key={phase.title.en} className="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-forest-100">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-lg font-semibold text-saffron-400">{i + 1}</span>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-saffron-600">{t(phase.duration)}</p>
                  <h3 className="mt-1 text-xl font-semibold text-forest-900">{t(phase.title)}</h3>
                  <p className="mt-2 leading-relaxed text-forest-700">{t(phase.text)}</p>
                  <ul className="mt-4 grid gap-2">
                    {phase.points.map((pt) => (
                      <li key={pt.en} className="flex gap-2 text-[15px] text-forest-900">
                        <CheckIcon size={18} className="mt-0.5 shrink-0 text-forest-600" /> {t(pt)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Steps / family guide */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <h2 className="text-3xl font-semibold text-forest-900 md:text-4xl">{t(hub.stepsTitle)}</h2>
          <p className="mt-2 text-lg text-forest-700">{t(hub.stepsIntro)}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {hub.steps.map((step, i) => (
              <li key={step.title.en} className="rounded-3xl border-l-4 border-saffron-500 bg-white p-6 ring-1 ring-forest-100">
                <p className="text-sm font-semibold text-saffron-600">{hi ? `कदम ${i + 1}` : `Step ${i + 1}`}</p>
                <h3 className="mt-1 text-lg font-semibold text-forest-900">{t(step.title)}</h3>
                <p className="mt-2 leading-relaxed text-forest-700">{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Danger signs */}
        <section className="bg-[#fff3ef]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
            <h2 className="text-2xl font-semibold text-[#8a2c17] md:text-3xl">{t(hub.dangerTitle)}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hub.danger.map((d) => (
                <li key={d.title.en} className="rounded-2xl border border-[#e9b4a8] bg-white p-5">
                  <p className="font-semibold text-[#8a2c17]">{t(d.title)}</p>
                  <p className="mt-1 text-[15px] text-[#6b2a1a]">{t(d.text)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-medium text-[#6b2a1a]">{t(T.crisis)}</p>
          </div>
        </section>

        {/* Myths */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <h2 className="text-3xl font-semibold text-forest-900 md:text-4xl">{t(T.myths)}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {hub.myths.map((m) => (
              <li key={m.myth.en} className="overflow-hidden rounded-3xl ring-1 ring-forest-100">
                <div className="bg-[#fdecec] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#b23a1f]">{t(T.myth)}</p>
                  <p className="mt-1 font-semibold text-forest-900">{t(m.myth)}</p>
                </div>
                <div className="bg-forest-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">{t(T.fact)}</p>
                  <p className="mt-1 leading-relaxed text-forest-900">{t(m.fact)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Privacy + self-test */}
        <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-14 md:grid-cols-2 md:px-6">
          <div className="rounded-3xl bg-forest-800 p-7 text-white">
            <ShieldIcon size={30} className="text-saffron-400" />
            <h2 className="mt-3 text-2xl font-semibold">{t(T.privacy)}</h2>
            <ul className="mt-4 grid gap-2.5">
              {hub.privacy.map((p) => (
                <li key={p.en} className="flex gap-2.5 text-forest-100">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-saffron-400" /> {t(p)}
                </li>
              ))}
            </ul>
          </div>
          {hub.selfTest && (
            <div className="flex flex-col rounded-3xl bg-saffron-100 p-7">
              <h2 className="text-2xl font-semibold text-forest-900">{t(T.selfTest)}</h2>
              <p className="mt-2 flex-1 text-forest-800">
                {hi ? "2–3 मिनट की निजी जाँच — कुछ भी सेव नहीं होता।" : "A private 2–3 minute check — nothing is saved."}
              </p>
              <Link href={localePath("/self-assessment", lang)} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white">
                {t(T.selfTest)} <ArrowRightIcon size={16} />
              </Link>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <h2 className="text-3xl font-semibold text-forest-900">{t(T.faq)}</h2>
            <div className="mt-8 divide-y divide-forest-100 rounded-2xl ring-1 ring-forest-100">
              {hub.faqs.map((faq, i) => (
                <details key={faq.q.en} className="group px-5" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 py-4 text-left text-lg font-semibold text-forest-900">
                    {t(faq.q)}
                    <PlusIcon size={20} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 leading-relaxed text-forest-700">{t(faq.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="rounded-3xl bg-forest-900 p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-semibold md:text-4xl">{t(hub.final.title)}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-forest-100">{t(hub.final.text)}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink(hi ? "नमस्ते डॉक्टर, मुझे परामर्श चाहिए।" : "Hello Doctor, I need a consultation.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white">
                <WhatsAppIcon size={20} /> {t(T.wa)}
              </a>
              <CallNowButton lang={lang} variant="ghost" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
