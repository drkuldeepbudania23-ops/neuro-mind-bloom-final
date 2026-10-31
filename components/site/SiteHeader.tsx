"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { nav } from "../../lib/content/home";
import { CLINIC } from "../../lib/site";
import BookNowMenu from "./BookNowMenu";
import FestivalBanner from "./FestivalBanner";
import Logo from "./Logo";
import ShareButton from "./ShareButton";
import { CallNowButton, SocialIcons, WhatsAppBookingButton } from "./Social";
import { CloseIcon, GlobeIcon, MenuIcon, PhoneIcon, SearchIcon } from "./icons";

type Props = {
  lang: Lang;
  /** English path of the current page, used for the language switch link. */
  path?: string;
};

export default function SiteHeader({ lang, path = "/" }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = localePath("/", lang);
  const otherLang: Lang = lang === "en" ? "hi" : "en";

  /** Shown in the desktop bar. */
  const links = [
    { href: localePath("/conditions", lang), label: tr(nav.conditions, lang) },
    { href: localePath("/nasha-mukti", lang), label: tr(nav.nasha, lang) },
    { href: localePath("/gupt-rog-sexual-health", lang), label: tr(nav.sexual, lang) },
    { href: localePath("/student-mental-health", lang), label: tr(nav.students, lang) },
    { href: localePath("/psychotherapy", lang), label: tr(nav.therapies, lang) },
    { href: localePath("/self-assessment", lang), label: tr(nav.selfCheck, lang) },
    { href: localePath("/contact", lang), label: tr(nav.contact, lang) },
  ];
  /** Mobile menu shows everything. */
  const mobileLinks = [
    { href: localePath("/dr-kuldeep-budania", lang), label: tr(nav.doctorProfile, lang) },
    ...links.slice(0, 6),
    { href: `${home}#fees`, label: tr(nav.fees, lang) },
    { href: localePath("/resources", lang), label: tr(nav.resources, lang) },
    { href: localePath("/articles", lang), label: tr(nav.articles, lang) },
    { href: localePath("/videos", lang), label: tr(nav.videos, lang) },
    { href: localePath("/faq", lang), label: tr(nav.faq, lang) },
    { href: localePath("/locations", lang), label: tr(nav.locations, lang) },
    links[6],
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const langSwitch = (
    <Link
      href={localePath(path, otherLang)}
      hrefLang={otherLang === "hi" ? "hi-IN" : "en-IN"}
      className="inline-flex items-center gap-1.5 font-medium hover:text-saffron-400"
    >
      <GlobeIcon size={15} />
      {tr(nav.switchLang, lang)}
    </Link>
  );

  return (
    <>
    <FestivalBanner lang={lang} />
    <header className="sticky top-0 z-40">
      {/* Top bar: call, language, social icons */}
      <div className="bg-forest-900 text-[13px] text-forest-100">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <a href={`tel:${CLINIC.phone}`} className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-saffron-400">
            <PhoneIcon size={15} />
            <span className="hidden sm:inline">{lang === "hi" ? "कॉल करें:" : "Call:"}</span> {CLINIC.phoneDisplay}
          </a>
          <div className="flex items-center gap-3">
            <span className="inline-flex">{langSwitch}</span>
            <SocialIcons lang={lang} tone="dark" size="sm" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-forest-100/70 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[72px] md:px-6">
          <Link href={home} className="min-w-0" aria-label={`${CLINIC.name} – home`}>
            <Logo lang={lang} />
          </Link>

          <nav className="hidden items-center gap-4 text-[15px] font-medium text-forest-800 xl:flex" aria-label="Main">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-saffron-600">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={localePath("/search", lang)}
              aria-label={tr(nav.search, lang)}
              title={tr(nav.search, lang)}
              className="grid h-10 w-10 place-items-center rounded-full text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500"
            >
              <SearchIcon size={18} />
            </Link>
            <BookNowMenu lang={lang} compact />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-forest-800 text-white xl:hidden"
              aria-label={tr(menuOpen ? nav.close : nav.menu, lang)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="h-[calc(100dvh-104px)] overflow-y-auto border-t border-forest-100 bg-white px-4 pb-10 pt-4 xl:hidden"
        >
          <form action={localePath("/search", lang)} method="get" role="search" className="mb-4">
            <label htmlFor="m-search" className="sr-only">{tr(nav.search, lang)}</label>
            <input
              id="m-search"
              name="q"
              type="search"
              placeholder={tr(nav.searchPlaceholder, lang)}
              className="w-full rounded-full bg-cream px-5 py-3 text-forest-900 ring-1 ring-forest-200"
            />
          </form>
          <ul className="grid gap-1">
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-medium text-forest-900 hover:bg-forest-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2.5">
            <WhatsAppBookingButton lang={lang} />
            <CallNowButton lang={lang} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-forest-800">
            <SocialIcons lang={lang} tone="light" />
            <ShareButton lang={lang} />
          </div>
          <div className="mt-6 text-forest-800">{langSwitch}</div>
        </nav>
      )}
    </header>
    </>
  );
}
