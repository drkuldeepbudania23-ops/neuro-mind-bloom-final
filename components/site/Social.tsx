import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { CLINIC, SOCIAL, YOUTUBE_SUBSCRIBE_URL, whatsappLink } from "../../lib/site";
import { PhoneIcon, SocialIcon, WhatsAppIcon, type SocialName } from "./icons";

const LABELS: Record<SocialName, { en: string; hi: string }> = {
  facebook: { en: "Neuro Mind Bloom on Facebook", hi: "Facebook पर Neuro Mind Bloom" },
  instagram: { en: "Neuro Mind Bloom on Instagram", hi: "Instagram पर Neuro Mind Bloom" },
  youtube: { en: "Neuro Mind Bloom on YouTube", hi: "YouTube पर Neuro Mind Bloom" },
  whatsapp: { en: "WhatsApp Neuro Mind Bloom", hi: "WhatsApp पर संपर्क करें" },
};

const BRAND_BG: Record<SocialName, string> = {
  facebook: "hover:bg-[#1877f2]",
  instagram: "hover:bg-[#d62976]",
  youtube: "hover:bg-[#ff0000]",
  whatsapp: "hover:bg-[#1fa855]",
};

export const SOCIAL_LINKS: { name: SocialName; href: string }[] = [
  { name: "facebook", href: SOCIAL.facebook },
  { name: "instagram", href: SOCIAL.instagram },
  { name: "youtube", href: SOCIAL.youtube },
  { name: "whatsapp", href: `https://wa.me/${CLINIC.whatsapp}` },
];

/** Row of clickable social icons (Facebook, Instagram, YouTube, WhatsApp). */
export function SocialIcons({
  lang,
  tone = "dark",
  size = "md",
}: {
  lang: Lang;
  /** "dark" = icons on a dark background, "light" = icons on a light background */
  tone?: "dark" | "light";
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? 16 : 18;
  const colors = tone === "dark" ? "bg-white/10 text-white" : "bg-forest-50 text-forest-800";
  return (
    <ul className="flex items-center gap-1.5">
      {SOCIAL_LINKS.map(({ name, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tr(LABELS[name], lang)}
            title={tr(LABELS[name], lang)}
            className={`grid ${box} place-items-center rounded-full transition hover:text-white ${colors} ${BRAND_BG[name]}`}
          >
            <SocialIcon name={name} size={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export const INSTAGRAM_GRADIENT = "linear-gradient(45deg, #f58529, #dd2a7b 50%, #8134af)";

const FOLLOW = {
  youtube: { en: "Subscribe on YouTube", hi: "YouTube पर सब्सक्राइब करें" },
  facebook: { en: "Follow on Facebook", hi: "Facebook पर फ़ॉलो करें" },
  instagram: { en: "Follow on Instagram", hi: "Instagram पर फ़ॉलो करें" },
};

/** YouTube Subscribe + Facebook Follow + Instagram Follow buttons. */
export function FollowButtons({ lang, stacked = false }: { lang: Lang; stacked?: boolean }) {
  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white transition hover:opacity-90";
  return (
    <div className={`flex gap-2.5 ${stacked ? "flex-col" : "flex-wrap"}`}>
      <a href={YOUTUBE_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#ff0000]`}>
        <SocialIcon name="youtube" size={18} /> {tr(FOLLOW.youtube, lang)}
      </a>
      <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#1877f2]`}>
        <SocialIcon name="facebook" size={18} /> {tr(FOLLOW.facebook, lang)}
      </a>
      <a
        href={SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        style={{ background: INSTAGRAM_GRADIENT }}
      >
        <SocialIcon name="instagram" size={18} /> {tr(FOLLOW.instagram, lang)}
      </a>
    </div>
  );
}

const ACTIONS = {
  call: { en: "Call Now", hi: "अभी कॉल करें" },
  whatsappBooking: { en: "WhatsApp Booking", hi: "WhatsApp से बुकिंग" },
  whatsappMsg: {
    en: "Hello Dr. Kuldeep Budania, I would like to book a consultation.",
    hi: "नमस्ते डॉ. कुलदीप बुडानिया, मुझे परामर्श के लिए अपॉइंटमेंट चाहिए।",
  },
};

/** "Call Now" (tel:) button. */
export function CallNowButton({
  lang,
  variant = "solid",
}: {
  lang: Lang;
  /** solid = teal, outline = white with border, ghost = translucent (for dark backgrounds) */
  variant?: "solid" | "outline" | "ghost";
}) {
  const look = {
    solid: "bg-forest-800 text-white hover:bg-forest-700",
    outline: "border border-forest-200 bg-white text-forest-800 hover:border-forest-500",
    ghost: "bg-white/10 text-white hover:bg-white/20",
  }[variant];
  return (
    <a
      href={`tel:${CLINIC.phone}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${look}`}
    >
      <PhoneIcon size={18} /> {tr(ACTIONS.call, lang)} · {CLINIC.phoneDisplay}
    </a>
  );
}

/** "WhatsApp Booking" button with a prefilled message. */
export function WhatsAppBookingButton({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <a
      href={whatsappLink(tr(ACTIONS.whatsappMsg, lang))}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      <WhatsAppIcon size={20} /> {tr(ACTIONS.whatsappBooking, lang)}
    </a>
  );
}
