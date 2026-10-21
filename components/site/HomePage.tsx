import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import {
  about,
  conditions,
  conditionsSection,
  crisis,
  faqs,
  feesSection,
  finalCta,
  hero,
  privacy,
  selfCheck,
  steps,
  stepsSection,
  therapy,
  trust,
  homeSections,
} from "../../lib/content/home";
import { ASSESSMENTS, ASSESSMENT_ORDER, SCREENING_DISCLAIMER } from "../../lib/assessments";
import { ARTICLES } from "../../lib/content/articles";
import { getCondition } from "../../lib/content/conditions";
import { NASHA_MUKTI, SEXUAL_HEALTH } from "../../lib/content/hubs";
import { PROFILE_PATH } from "../../lib/content/profile";
import type { YouTubeVideo } from "../../lib/youtube/feed";
import LiteYouTube from "../content/LiteYouTube";
import { CLINIC, CRISIS_HELPLINE, DOCTOR, RATING, SERVICES, STATS, formatINR, whatsappLink } from "../../lib/site";
import BookNowMenu from "./BookNowMenu";
import FloatingWhatsApp from "./FloatingWhatsApp";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import ShareButton from "./ShareButton";
import { CallNowButton, FollowButtons } from "./Social";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  FileIcon,
  PhoneIcon,
  PlusIcon,
  RepeatIcon,
  ShieldIcon,
  VideoIcon,
  WhatsAppIcon,
} from "./icons";

const TRUST_ICONS = [ShieldIcon, VideoIcon, FileIcon, RepeatIcon];
const SPECIALITY_ICONS = [ShieldIcon, RepeatIcon, CheckIcon, FileIcon, CalendarIcon, VideoIcon];
const WITHDRAWAL_NOTE = {
  en: "Important: stopping alcohol or sleeping pills suddenly after daily use can be dangerous — withdrawal should be medically supervised.",
  hi: "ज़रूरी: रोज़ शराब या नींद की गोली लेने वाले अचानक छोड़ें तो ख़तरा हो सकता है — इसे डॉक्टर की निगरानी में छोड़ें।",
};

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-saffron-400" : "text-saffron-600"}`}>
      {children}
    </p>
  );
}

export default function HomePage({ lang, videos = [] }: { lang: Lang; videos?: YouTubeVideo[] }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const hi = lang === "hi";
  const groups = ["mind", "special"] as const;
  const latestArticles = [...ARTICLES].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 3);

  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        {hi ? "मुख्य सामग्री पर जाएँ" : "Skip to content"}
      </a>
      <SiteHeader lang={lang} path="/" />

      <main id="main">
        {/* ---------- 1. Hero ---------- */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-forest-100/60 blur-3xl" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:pb-20 md:pt-16">
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-forest-700 shadow-sm ring-1 ring-forest-100">
                <span className="h-2 w-2 rounded-full bg-whatsapp" />
                {t(hero.eyebrow)}
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-saffron-600">{t(homeSections.brand)}</p>
              <h1
                className={`mt-2 font-semibold text-forest-900 ${
                  hi ? "text-[34px] leading-[1.25] md:text-[52px]" : "font-display text-[40px] leading-[1.08] md:text-[60px]"
                }`}
              >
                {t(DOCTOR.name)}
              </h1>
              <p className="mt-2 text-lg font-semibold text-forest-700">{DOCTOR.degrees}</p>
              <p className="mt-1 text-lg font-medium text-forest-800">{DOCTOR.title.en}</p>
              <p className="text-lg font-medium text-saffron-600">{DOCTOR.title.hi}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/85">{t(hero.title)}. {t(hero.subtitle)}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <BookNowMenu lang={lang} align="start" />
                <Link
                  href={localePath("/contact", lang)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-forest-800 ring-1 ring-forest-200 transition hover:ring-forest-500"
                >
                  {t(homeSections.contact)}
                </Link>
                <a
                  href={whatsappLink(hi ? "नमस्ते डॉ. कुलदीप बुडानिया, मुझे परामर्श के लिए अपॉइंटमेंट चाहिए।" : "Hello Dr. Kuldeep Budania, I would like to book a consultation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
                >
                  <WhatsAppIcon size={20} /> WhatsApp
                </a>
                <CallNowButton lang={lang} variant="outline" />
              </div>

              <ul className="mt-7 flex flex-wrap gap-2">
                {hero.chips.map((chip) => (
                  <li key={chip.en} className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1.5 text-sm text-forest-800">
                    <CheckIcon size={15} className="text-forest-500" /> {t(chip)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="absolute inset-x-6 -bottom-4 top-10 rounded-[2rem] bg-saffron-400/25" />
              <div className="relative overflow-hidden rounded-[2rem] bg-sand shadow-[0_24px_60px_rgba(6,43,49,0.18)]">
                <Image
                  src={DOCTOR.photo}
                  alt={`${DOCTOR.name.en}, ${DOCTOR.degrees}`}
                  width={1122}
                  height={1402}
                  priority
                  sizes="(min-width: 768px) 420px, 90vw"
                  className="h-auto w-full"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-4 backdrop-blur">
                  <p className="font-display text-lg font-semibold text-forest-900">{t(DOCTOR.name)}</p>
                  <p className="text-sm text-forest-700">{DOCTOR.degrees} · {t(DOCTOR.post)}</p>
                  <p className="text-sm text-forest-700/80">{t(CLINIC.city)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 2. Doctor introduction ---------- */}
        <section id="about" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
            <div>
              <SectionLabel>{t(about.label)}</SectionLabel>
              <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl leading-snug md:text-4xl" : "font-display text-3xl md:text-[44px] md:leading-[1.1]"}`}>
                {t(about.title)}
              </h2>
              <p className="mt-3 font-semibold text-forest-700">
                {t(DOCTOR.name)} · {DOCTOR.degrees} · {t(DOCTOR.post)}
              </p>
              {about.body.map((para) => (
                <p key={para.en} className="mt-4 text-lg leading-relaxed text-forest-800/85">{t(para)}</p>
              ))}
              <Link
                href={localePath(PROFILE_PATH, lang)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white transition hover:bg-forest-700"
              >
                {t(homeSections.viewProfile)} <ArrowRightIcon size={16} />
              </Link>
            </div>
            <ul className="grid content-center gap-3">
              {about.points.map((point) => (
                <li key={point.en} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-saffron-100 text-saffron-600">
                    <CheckIcon size={18} />
                  </span>
                  <span className="pt-1 font-medium text-forest-900">{t(point)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- 3. Professional experience highlights ---------- */}
        <section aria-label={t(homeSections.highlights)} className="bg-forest-800 text-white">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 md:grid-cols-4 md:px-6">
            {STATS.map((stat) => (
              <li key={stat.value} className="px-2 py-7 text-center transition-transform duration-300 hover:-translate-y-0.5 md:py-9">
                <p className="font-display text-3xl font-semibold text-saffron-400 md:text-[44px]">{hi ? stat.valueHi ?? stat.value : stat.value}</p>
                <p className="mt-1 text-sm text-forest-100 md:text-base">{t(stat.label)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- 4. Our specialities ---------- */}
        <section id="specialities" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <SectionLabel>{t(homeSections.specialities.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.specialities.title)}</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {homeSections.specialityCards.map((c, i) => {
                const Icon = SPECIALITY_ICONS[i % SPECIALITY_ICONS.length];
                return (
                  <li key={c.href}>
                    <Link href={localePath(c.href, lang)} className="group flex h-full gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-forest-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-forest-400">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition group-hover:bg-forest-800 group-hover:text-saffron-400"><Icon size={24} /></span>
                      <span>
                        <span className="block text-lg font-semibold text-forest-900">{t(c.title)}</span>
                        <span className="mt-1 block leading-relaxed text-forest-700/85">{t(c.text)}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---------- Trust strip (part of specialities) ---------- */}
        <section aria-label={hi ? "मुख्य विशेषताएँ" : "Highlights"} className="border-y border-forest-100 bg-white">
          <ul className="mx-auto grid max-w-6xl gap-px bg-forest-100 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <li key={item.title.en} className="flex gap-3 bg-white px-5 py-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-600">
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block font-semibold text-forest-900">{t(item.title)}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-forest-700/85">{t(item.text)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------- 5. Explore mental health conditions ---------- */}
        <section id="conditions" className="scroll-mt-20 bg-forest-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel light>{t(conditionsSection.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>
              {t(conditionsSection.title)}
            </h2>

            {groups.map((group) => (
              <div key={group} className="mt-10">
                <h3 className="text-lg font-semibold text-saffron-400">{t(conditionsSection.groups[group])}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {conditions
                    .filter((c) => c.group === group && !["/sex-specialist-india", "/dhat-syndrome-treatment-india"].includes(c.href))
                    .map((c) => (
                      <li key={c.href + c.title.en}>
                        <Link
                          href={localePath(c.href, lang)}
                          className="group flex h-full flex-col rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.11] hover:ring-saffron-400/50"
                        >
                          <span className="text-lg font-semibold">{t(c.title)}</span>
                          {!hi && <span className="text-sm text-saffron-400">{c.title.hi}</span>}
                          <span className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-100/85">{t(c.text)}</span>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron-400">
                            {t(conditionsSection.more)}
                            <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link
              href={localePath("/conditions", lang)}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-saffron-500 px-6 py-3 font-semibold text-forest-900 hover:bg-saffron-400"
            >
              {t(conditionsSection.all)} <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>

        {/* ---------- 6. De-addiction services ---------- */}
        <section id="nasha-mukti" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
              <div>
                <SectionLabel>{t(homeSections.deaddiction.label)}</SectionLabel>
                <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.deaddiction.title)}</h2>
                <p className="mt-4 text-lg leading-relaxed text-forest-800/85">{t(homeSections.deaddiction.text)}</p>
                <p className="mt-4 rounded-2xl bg-[#fff3ef] p-4 text-[15px] text-[#7a2a17]">{t(WITHDRAWAL_NOTE)}</p>
                <Link href={localePath("/nasha-mukti", lang)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
                  {t(homeSections.deaddiction.cta)} <ArrowRightIcon size={16} />
                </Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {conditions.filter((c) => c.group === "addiction").map((c) => (
                  <li key={c.href}>
                    <Link href={localePath(c.href, lang)} className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-forest-100 transition hover:ring-forest-500">
                      <span className="font-semibold text-forest-900">{t(c.title)}</span>
                      <span className="mt-1 text-[15px] text-forest-700/85">{t(c.text)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {(NASHA_MUKTI.more?.slugs ?? []).map((slug) => {
                const c = getCondition(slug);
                return c ? (
                  <li key={slug}>
                    <Link href={localePath(`/${slug}`, lang)} className="inline-block rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800 hover:bg-forest-100">{t(c.name)}</Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </section>

        {/* ---------- 7. Sexual health services ---------- */}
        <section id="sexual-health" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <SectionLabel>{t(homeSections.sexual.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.sexual.title)}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-forest-800/85">{t(homeSections.sexual.text)}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(SEXUAL_HEALTH.more?.slugs ?? []).map((slug) => {
                const c = getCondition(slug);
                return c ? (
                  <li key={slug}>
                    <Link href={localePath(`/${slug}`, lang)} className="flex h-full items-center justify-between gap-2 rounded-2xl bg-cream px-4 py-3.5 font-medium text-forest-900 ring-1 ring-forest-100 transition hover:ring-forest-500">
                      {t(c.name)} <ArrowRightIcon size={15} className="shrink-0 text-saffron-600" />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <Link href={localePath("/gupt-rog-sexual-health", lang)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
              {t(homeSections.sexual.cta)} <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>

        {/* ---------- 8. Self-assessment centre ---------- */}
        <section id="self-assessment" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-[1fr_1.2fr] md:px-6 md:py-20">
            <div className="flex flex-col rounded-3xl bg-saffron-100 p-8">
              <SectionLabel>{t(homeSections.tests.label)}</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold text-forest-900 md:text-3xl">{t(selfCheck.title)}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-forest-800/90">{t(selfCheck.text)}</p>
              <p className="mt-4 text-sm text-forest-800/80">{t(SCREENING_DISCLAIMER)}</p>
              <Link href={localePath("/self-assessment", lang)} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white transition hover:bg-forest-700">
                {t(homeSections.tests.all)} <ArrowRightIcon size={16} />
              </Link>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {ASSESSMENT_ORDER.map((id) => (
                <li key={id}>
                  <Link href={localePath(`/self-assessment/${id}`, lang)} className="flex h-full items-center justify-between gap-2 rounded-2xl bg-white px-4 py-3.5 font-medium text-forest-900 ring-1 ring-forest-100 transition hover:ring-forest-500">
                    {t(ASSESSMENTS[id].title)} <ArrowRightIcon size={15} className="shrink-0 text-saffron-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- 9. Patient experience ---------- */}
        <section id="experience" className="scroll-mt-20 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
            <div>
              <SectionLabel>{t(homeSections.experience.label)}</SectionLabel>
              <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.experience.title)}</h2>
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-saffron-100 p-5 ring-1 ring-saffron-400">
                <span className="text-4xl font-semibold text-forest-900">{RATING.value}</span>
                <span>
                  <span aria-hidden="true" className="block text-2xl leading-none text-saffron-500">★★★★<span className="text-saffron-400/60">★</span></span>
                  <span className="block font-semibold text-forest-900">{hi ? "मरीज़ों की रेटिंग" : "Patient rating"}</span>
                  {RATING.url && <a href={RATING.url} target="_blank" rel="noopener noreferrer" className="text-sm text-forest-700 underline">{t(RATING.source)}</a>}
                </span>
              </div>
              <ul className="mt-6 grid gap-3">
                {homeSections.experience.points.map((p) => (
                  <li key={p.en} className="flex gap-3 rounded-2xl bg-cream p-4 text-forest-900 ring-1 ring-forest-100">
                    <CheckIcon size={20} className="mt-0.5 shrink-0 text-forest-600" /> {t(p)}
                  </li>
                ))}
              </ul>
              <Link href={localePath("/feedback", lang)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500">
                {t(homeSections.experience.feedback)} <ArrowRightIcon size={16} />
              </Link>
            </div>
          <div className="rounded-3xl bg-forest-800 p-8 text-white">
            <ShieldIcon size={32} className="text-saffron-400" />
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{t(privacy.title)}</h2>
            <ul className="mt-5 grid gap-3">
              {privacy.points.map((point) => (
                <li key={point.en} className="flex gap-3 leading-relaxed text-forest-100">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-saffron-400" /> {t(point)}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </section>

        {/* ---------- 10. Recovery & wellness education ---------- */}
        <section id="therapy" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <div className="max-w-2xl">
              <SectionLabel>{t(therapy.label)}</SectionLabel>
              <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>
                {t(therapy.title)}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/85">{t(therapy.intro)}</p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {therapy.types.map((type) => (
                <li key={type.title.en} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
                  <p className="text-lg font-semibold text-forest-900">{t(type.title)}</p>
                  <p className="mt-2 leading-relaxed text-forest-700/85">{t(type.text)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath("/psychotherapy", lang)} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
                {t(homeSections.recovery.title)} <ArrowRightIcon size={16} />
              </Link>
              <Link href={localePath("/recovery-stories", lang)} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500">
                {t(homeSections.recovery.stories)}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- 11. Latest mental health articles ---------- */}
        <section id="articles" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <SectionLabel>{t(homeSections.articles.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.articles.title)}</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {latestArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={localePath(`/articles/${a.slug}`, lang)} className="group flex h-full flex-col rounded-3xl bg-cream p-6 ring-1 ring-forest-100 transition hover:-translate-y-0.5 hover:ring-forest-500">
                    <span className="text-sm font-semibold text-saffron-600">{t(a.category)} · {a.readMinutes} {t(homeSections.articles.read)}</span>
                    <span className="mt-2 text-lg font-semibold leading-snug text-forest-900">{t(a.title)}</span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700/85">{t(a.excerpt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={localePath("/articles", lang)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
              {t(homeSections.articles.all)} <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>

        {/* ---------- 12. Educational videos ---------- */}
        {videos.length > 0 && (
          <section id="videos" className="scroll-mt-20">
            <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
              <SectionLabel>{t(homeSections.videos.label)}</SectionLabel>
              <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>{t(homeSections.videos.title)}</h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {videos.slice(0, 3).map((v) => (
                  <li key={v.id}>
                    <LiteYouTube id={v.id} title={v.title} playLabel={t(homeSections.videos.play)} />
                    <p className="mt-3 font-medium leading-snug text-forest-900">{v.title}</p>
                  </li>
                ))}
              </ul>
              <Link href={localePath("/videos", lang)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-white hover:bg-forest-700">
                {t(homeSections.videos.all)} <ArrowRightIcon size={16} />
              </Link>
            </div>
          </section>
        )}

        {/* ---------- Social / YouTube ---------- */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:px-6 md:py-20">
            <div>
              <SectionLabel>{hi ? "सोशल मीडिया" : "Social media"}</SectionLabel>
              <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[40px]"}`}>
                {hi ? "डॉ. कुलदीप से सीखें — YouTube और Instagram पर" : "Learn with Dr. Kuldeep on YouTube & Instagram"}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-forest-800/85">
                {hi
                  ? "डिप्रेशन, घबराहट, नशा मुक्ति और यौन स्वास्थ्य पर आसान हिंदी में वीडियो। सब्सक्राइब और फ़ॉलो करें, और ज़रूरतमंद के साथ शेयर करें।"
                  : "Simple videos on depression, anxiety, de-addiction and sexual health. Subscribe, follow, and share with someone who needs it."}
              </p>
            </div>
            <div className="grid gap-4">
              <FollowButtons lang={lang} stacked />
              <ShareButton lang={lang} />
            </div>
          </div>
        </section>

        {/* ---------- 13. Online consultation process (+ fees) ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel>{t(stepsSection.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>
              {t(stepsSection.title)}
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-5">
              {steps.map((step, i) => (
                <li key={step.title.en} className="relative rounded-2xl bg-cream p-5 ring-1 ring-forest-100">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-800 font-semibold text-saffron-400">{i + 1}</span>
                  <p className="mt-4 font-semibold text-forest-900">{t(step.title)}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-forest-700/85">{t(step.text)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Fees ---------- */}
        <section id="fees" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel>{t(feesSection.label)}</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>
              {t(feesSection.title)}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {SERVICES.map((service, i) => (
                <li
                  key={service.code}
                  className={`flex flex-col rounded-3xl p-7 ring-1 ${
                    i === 0 ? "bg-forest-800 text-white ring-forest-800" : "bg-white text-forest-900 ring-forest-100"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{t(service.label)}</h3>
                  <p className={`mt-2 flex-1 ${i === 0 ? "text-forest-100" : "text-forest-700/85"}`}>{t(service.short)}</p>
                  <p className={`mt-6 font-display text-5xl font-semibold ${i === 0 ? "text-saffron-400" : "text-forest-800"}`}>
                    {formatINR(service.fee)}
                  </p>
                  <Link
                    href={`${localePath("/book-appointment", lang)}?service=${service.code}`}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
                      i === 0 ? "bg-saffron-500 text-forest-900 hover:bg-saffron-400" : "bg-forest-800 text-white hover:bg-forest-700"
                    }`}
                  >
                    {t(feesSection.book)} <ArrowRightIcon size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-forest-700/85">{t(feesSection.note)}</p>
          </div>
        </section>

        {/* ---------- 14. Frequently asked questions ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className={`mt-3 font-semibold text-forest-900 ${hi ? "text-3xl md:text-4xl" : "font-display text-3xl md:text-[44px]"}`}>
              {hi ? "अक्सर पूछे जाने वाले सवाल" : "Common questions"}
            </h2>
            <div className="mt-8 divide-y divide-forest-100 rounded-2xl ring-1 ring-forest-100">
              {faqs.map((faq, i) => (
                <details key={faq.q.en} className="group px-5" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-forest-900">
                    {t(faq.q)}
                    <PlusIcon size={20} className="shrink-0 text-saffron-600 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 leading-relaxed text-forest-700/90">{t(faq.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Crisis ---------- */}
        <section aria-labelledby="crisis-title" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex flex-col gap-4 rounded-3xl border-2 border-[#e9b4a8] bg-[#fff3ef] p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="crisis-title" className="text-xl font-semibold text-[#8a2c17]">{t(crisis.title)}</h2>
              <p className="mt-1 text-[#6b2a1a]">{t(crisis.text)}</p>
            </div>
            <a
              href={`tel:${CRISIS_HELPLINE.number}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#b23a1f] px-6 py-3 font-semibold text-white"
            >
              <PhoneIcon size={18} /> {CRISIS_HELPLINE.name} {CRISIS_HELPLINE.number}
            </a>
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-forest-800 p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className={`font-semibold ${hi ? "text-3xl" : "font-display text-3xl md:text-4xl"}`}>{t(finalCta.title)}</h2>
              <p className="mt-2 text-lg text-forest-100">{t(finalCta.text)}</p>
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
