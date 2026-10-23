import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CLINIC, CRISIS_HELPLINE, DOCTOR, SOCIAL, WEBSITE, YOUTUBE_SUBSCRIBE_URL, whatsappLink } from "../../lib/site";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ShareButton from "./ShareButton";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CallNowButton, FollowButtons, INSTAGRAM_GRADIENT, WhatsAppBookingButton } from "./Social";
import { ArrowRightIcon, GlobeIcon, MailIcon, MapPinIcon, PhoneIcon, SocialIcon, WhatsAppIcon } from "./icons";

const T = {
  title: { en: "Contact Neuro Mind Bloom", hi: "Neuro Mind Bloom से संपर्क करें" },
  intro: {
    en: "Call, WhatsApp or email — or book online. Video consultation is available across India.",
    hi: "कॉल, WhatsApp या ईमेल करें — या ऑनलाइन बुक करें। पूरे भारत में वीडियो परामर्श उपलब्ध है।",
  },
  call: { en: "Call", hi: "कॉल" },
  whatsapp: { en: "WhatsApp", hi: "WhatsApp" },
  email: { en: "Email", hi: "ईमेल" },
  website: { en: "Website", hi: "वेबसाइट" },
  location: { en: "Location", hi: "स्थान" },
  social: { en: "Follow Neuro Mind Bloom", hi: "Neuro Mind Bloom से जुड़ें" },
  socialText: {
    en: "Mental-health videos and updates in Hindi and English.",
    hi: "हिंदी और अंग्रेज़ी में मानसिक स्वास्थ्य से जुड़े वीडियो और जानकारी।",
  },
  share: { en: "Know someone who needs help? Share this website.", hi: "किसी को मदद की ज़रूरत है? यह वेबसाइट शेयर करें।" },
  book: { en: "Book online", hi: "ऑनलाइन बुक करें" },
  waMsg: { en: "Hello, I have a question for Neuro Mind Bloom.", hi: "नमस्ते, मुझे Neuro Mind Bloom से जानकारी चाहिए।" },
  crisis: {
    en: `In an emergency, call ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, free) or 112.`,
    hi: `इमरजेंसी में ${CRISIS_HELPLINE.name} ${CRISIS_HELPLINE.number} (24×7, निःशुल्क) या 112 पर कॉल करें।`,
  },
};

export default function ContactPage({ lang }: { lang: Lang }) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);

  const cards = [
    { icon: <PhoneIcon size={22} />, label: t(T.call), value: CLINIC.phoneDisplay, href: `tel:${CLINIC.phone}`, external: false },
    { icon: <WhatsAppIcon size={22} />, label: t(T.whatsapp), value: CLINIC.whatsappDisplay, href: whatsappLink(t(T.waMsg)), external: true },
    { icon: <MailIcon size={22} />, label: t(T.email), value: CLINIC.email, href: `mailto:${CLINIC.email}`, external: false },
    { icon: <GlobeIcon size={22} />, label: t(T.website), value: WEBSITE.display, href: WEBSITE.url, external: false },
  ];

  const socials = [
    { name: "facebook" as const, label: "Facebook", href: SOCIAL.facebook, color: "bg-[#1877f2]" },
    { name: "instagram" as const, label: "Instagram", href: SOCIAL.instagram, color: "" },
    { name: "youtube" as const, label: "YouTube", href: YOUTUBE_SUBSCRIBE_URL, color: "bg-[#ff0000]" },
    { name: "whatsapp" as const, label: "WhatsApp", href: `https://wa.me/${CLINIC.whatsapp}`, color: "bg-whatsapp" },
  ];

  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <SiteHeader lang={lang} path="/contact" />
      <main>
        <section className="bg-forest-900 pb-24 pt-12 text-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h1 className="text-3xl font-semibold md:text-5xl">{t(T.title)}</h1>
            <p className="mt-3 max-w-2xl text-lg text-forest-100">{t(T.intro)}</p>
            <p className="mt-4 text-forest-200">
              {tr(DOCTOR.name, lang)} · {DOCTOR.degrees} · {DOCTOR.title.hi}
            </p>
          </div>
        </section>

        <section className="mx-auto -mt-16 max-w-6xl px-4 md:px-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <li key={card.label}>
                <a
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(6,43,49,0.12)] transition hover:-translate-y-0.5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-50 text-forest-600">{card.icon}</span>
                  <span className="mt-4 text-sm font-semibold uppercase tracking-wider text-saffron-600">{card.label}</span>
                  <span className="mt-1 break-all text-lg font-semibold text-forest-900">{card.value}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppBookingButton lang={lang} />
            <CallNowButton lang={lang} />
            <Link
              href={localePath("/book-appointment", lang)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron-500 px-5 py-3 font-semibold text-forest-900 hover:bg-saffron-400"
            >
              {t(T.book)} <ArrowRightIcon size={16} />
            </Link>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-forest-700">
            <MapPinIcon size={18} /> {t(T.location)}: {tr(CLINIC.city, lang)}
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-forest-100 md:grid-cols-2 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(T.social)}</h2>
              <p className="mt-2 text-forest-700">{t(T.socialText)}</p>
              <div className="mt-6">
                <FollowButtons lang={lang} />
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={s.name === "instagram" ? { background: INSTAGRAM_GRADIENT } : undefined}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-4 font-semibold text-white transition hover:opacity-90 ${s.color}`}
                  >
                    <SocialIcon name={s.name} size={24} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-saffron-100 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-lg font-semibold text-forest-900">{t(T.share)}</p>
            <ShareButton lang={lang} />
          </div>

          <p className="mt-6 rounded-2xl bg-[#fff3ef] px-5 py-4 text-[#6b2a1a]">{t(T.crisis)}</p>
        </section>
      </main>
      <SiteFooter lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
