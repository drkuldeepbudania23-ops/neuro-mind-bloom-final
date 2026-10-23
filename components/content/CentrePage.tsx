import Link from "next/link";
import type { CentreContent } from "../../lib/content/centres";
import { CONDITIONS } from "../../lib/content/conditions";
import { groupOf } from "../../lib/content/library";
import { ASSESSMENTS } from "../../lib/assessments";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CRISIS_HELPLINE, SITE_URL } from "../../lib/site";
import FloatingWhatsApp from "../site/FloatingWhatsApp";
import SiteFooter from "../site/SiteFooter";
import SiteHeader from "../site/SiteHeader";
import { CallNowButton, WhatsAppBookingButton } from "../site/Social";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "../site/icons";
import JsonLd from "./JsonLd";

const T = {
  home: { en: "Home", hi: "होम" },
  guides: { en: "Topic guides", hi: "विषय-वार जानकारी" },
  selfTest: { en: "Free self-checks", hi: "निःशुल्क स्व-जाँच" },
  faq: { en: "Frequently asked questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  book: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  crisis: {
    en: `If you or someone you know is thinking of suicide, call ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (free, 24×7) or 112 now.`,
    hi: `अगर आप या आपका कोई जानने वाला आत्महत्या के बारे में सोच रहा है, तो अभी ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (निःशुल्क, 24×7) या 112 पर कॉल करें।`,
  },
  read: { en: "Read guide", hi: "पूरी जानकारी" },
};

export default function CentrePage({ centre, lang }: { centre: CentreContent; lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const pages = CONDITIONS.filter((c) => centre.groups.includes(groupOf(c)) || centre.extraPages?.includes(c.slug));
  const url = `${SITE_URL}${localePath(`/${centre.slug}`, lang)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "MedicalWebPage", url, name: t(centre.title), description: t(centre.description), inLanguage: hi ? "hi-IN" : "en-IN" },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t(T.home), item: `${SITE_URL}${hi ? "/hi" : ""}` },
          { "@type": "ListItem", position: 2, name: t(centre.h1), item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: centre.faqs.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })) },
    ],
  };

  return (
    <div className="nmb min-h-screen bg-cream" lang={hi ? "hi" : "en"}>
      <JsonLd data={schema} />
      <SiteHeader lang={lang} path={`/${centre.slug}`} />
      <main id="main">
        <section className="bg-forest-900 text-white">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-8 md:px-6 md:pb-16">
            <nav aria-label="Breadcrumb" className="text-sm text-forest-200">
              <Link href={localePath("/", lang)} className="hover:text-white">{t(T.home)}</Link>
              <span className="px-2" aria-hidden>/</span>
              <span className="text-white" aria-current="page">{t(centre.h1)}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{t(centre.h1)}</h1>
            {centre.intro.map((p) => (
              <p key={p.en} className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-100">{t(p)}</p>
            ))}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={localePath("/book-appointment", lang)} className="inline-flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900 hover:bg-saffron-400">
                {t(T.book)} <ArrowRightIcon size={16} />
              </Link>
              <WhatsAppBookingButton lang={lang} />
            </div>
          </div>
        </section>

        {centre.audiences.length > 0 && (
          <nav aria-label={t(centre.audienceTitle)} className="sticky top-16 z-20 border-b border-forest-100 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-5xl overflow-x-auto px-4 md:px-6">
              <ul className="flex gap-2 whitespace-nowrap py-3 text-sm">
                {centre.audiences.map((a) => (
                  <li key={a.id}>
                    <a href={`#${a.id}`} className="inline-block rounded-full bg-cream px-3 py-1.5 font-medium text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500">{t(a.title)}</a>
                  </li>
                ))}
                <li>
                  <a href="#guides" className="inline-block rounded-full bg-cream px-3 py-1.5 font-medium text-forest-800 ring-1 ring-forest-100 hover:ring-forest-500">{t(T.guides)}</a>
                </li>
              </ul>
            </div>
          </nav>
        )}

        {centre.audiences.length > 0 && (
          <section className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
              <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(centre.audienceTitle)}</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {centre.audiences.map((a) => (
                  <article key={a.id} id={a.id} className="scroll-mt-32 rounded-3xl bg-cream p-6 ring-1 ring-forest-100">
                    <h3 className="text-xl font-semibold text-forest-900">{t(a.title)}</h3>
                    <ul className="mt-4 grid gap-2.5">
                      {a.points.map((p) => (
                        <li key={p.en} className="flex gap-2.5 leading-relaxed text-forest-900">
                          <CheckIcon size={18} className="mt-1 shrink-0 text-forest-600" />
                          {t(p)}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="guides" className="scroll-mt-28">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
            <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(centre.guidesTitle ?? T.guides)}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((c) => (
                <li key={c.slug}>
                  <Link href={localePath(`/${c.slug}`, lang)} className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-forest-100 transition hover:ring-forest-500">
                    <span className="text-lg font-semibold text-forest-900">{t(c.name)}</span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700/90">{t(c.description)}</span>
                    <span className="mt-3 text-sm font-semibold text-forest-600">{t(T.read)} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {centre.selfTests.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 pb-12 md:px-6">
            <div className="rounded-3xl bg-forest-800 p-6 text-white md:p-8">
              <h2 className="text-2xl font-semibold">{t(T.selfTest)}</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {centre.selfTests.map((id) => (
                  <li key={id}>
                    <Link href={localePath(`/self-assessment/${id}`, lang)} className="inline-flex items-center gap-2 rounded-full bg-saffron-500 px-5 py-2.5 font-semibold text-forest-900 hover:bg-saffron-400">
                      {t(ASSESSMENTS[id].title)} <ArrowRightIcon size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {centre.sections.map((s) => (
          <section key={s.title.en} className="bg-white">
            <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
              <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(s.title)}</h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p.en} className="rounded-2xl bg-cream p-4 leading-relaxed text-forest-900 ring-1 ring-forest-100">{t(p)}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(T.faq)}</h2>
          <div className="mt-6 divide-y divide-forest-100 rounded-2xl bg-white ring-1 ring-forest-100">
            {centre.faqs.map((f, i) => (
              <details key={f.q.en} className="group px-5" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-lg font-semibold text-forest-900">
                  {t(f.q)}
                  <PlusIcon size={20} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-5 leading-relaxed text-forest-700">{t(f.a)}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 rounded-2xl bg-[#fff3ef] px-5 py-4 text-[#6b2a1a]">{t(T.crisis)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localePath("/book-appointment", lang)} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
              {t(T.book)} <ArrowRightIcon size={16} />
            </Link>
            <CallNowButton lang={lang} variant="outline" />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
