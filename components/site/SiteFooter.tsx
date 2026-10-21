import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { footer, nav } from "../../lib/content/home";
import { CLINIC, CRISIS_HELPLINE, DOCTOR, WEBSITE } from "../../lib/site";
import Logo from "./Logo";
import ShareButton from "./ShareButton";
import { CallNowButton, FollowButtons, SocialIcons, WhatsAppBookingButton } from "./Social";
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const T = {
  follow: { en: "Follow us", hi: "हमसे जुड़ें" },
};

export default function SiteFooter({ lang }: { lang: Lang }) {
  const home = localePath("/", lang);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-forest-900 text-forest-100">
      {/* Action strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:flex-wrap sm:items-center md:px-6">
          <WhatsAppBookingButton lang={lang} />
          <CallNowButton lang={lang} variant="ghost" />
          <ShareButton lang={lang} tone="dark" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1.2fr] md:px-6">
        <div>
          <Logo lang={lang} tone="dark" />
          <p className="mt-5 font-semibold text-white">{tr(DOCTOR.name, lang)}</p>
          <p className="text-sm text-forest-200">{DOCTOR.degrees} · {tr(DOCTOR.post, lang)}</p>
          <p className="text-sm text-forest-200">{DOCTOR.title.hi}</p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-saffron-400">{tr(T.follow, lang)}</p>
          <div className="mt-3">
            <SocialIcons lang={lang} tone="dark" />
          </div>
          <div className="mt-4">
            <FollowButtons lang={lang} stacked />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-saffron-400">{tr(footer.quick, lang)}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
            {(
              [
                ["/book-appointment", nav.websiteBooking],
                ["/dr-kuldeep-budania", nav.doctorProfile],
                ["/conditions", nav.conditions],
                ["/nasha-mukti", nav.nasha],
                ["/gupt-rog-sexual-health", nav.sexual],
                ["/psychotherapy-counselling", nav.therapy],
                ["/self-assessment", nav.selfCheck],
                ["/resources", nav.resources],
                ["/articles", nav.articles],
                ["/videos", nav.videos],
                ["/faq", nav.faq],
                ["/student-mental-health", nav.students],
                ["/locations", nav.locations],
                ["/international", nav.international],
                ["/feedback", nav.feedback],
                ["/recovery-stories", nav.recovery],
                ["/contact", nav.contact],
              ] as const
            ).map(([href, label]) => (
              <li key={href}>
                <Link className="hover:text-white" href={localePath(href, lang)}>{tr(label, lang)}</Link>
              </li>
            ))}
            <li><Link className="hover:text-white" href={`${home}#fees`}>{tr(nav.fees, lang)}</Link></li>
            <li><Link className="hover:text-white" href="/login" rel="nofollow">{tr(footer.doctorLogin, lang)}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-saffron-400">{tr(footer.contact, lang)}</p>
          <ul className="mt-4 grid gap-3">
            <li>
              <a className="inline-flex items-center gap-2.5 hover:text-white" href={`tel:${CLINIC.phone}`}>
                <PhoneIcon size={18} /> {CLINIC.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2.5 hover:text-white" href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> {CLINIC.whatsappDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2.5 break-all hover:text-white" href={`mailto:${CLINIC.email}`}>
                <MailIcon size={18} /> {CLINIC.email}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2.5 hover:text-white" href={WEBSITE.url}>
                <GlobeIcon size={18} /> {WEBSITE.display}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-forest-200">
              <MapPinIcon size={18} /> {tr(CLINIC.city, lang)}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-forest-200 md:px-6">
          <p>
            {tr(footer.disclaimer, lang)}{" "}
            {CRISIS_HELPLINE.name}: <a className="font-semibold text-white" href={`tel:${CRISIS_HELPLINE.number}`}>{CRISIS_HELPLINE.number}</a>
          </p>
          <p className="mt-2">© {year} {CLINIC.name}. {tr(footer.rights, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
