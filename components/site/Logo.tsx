import Image from "next/image";
import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { CLINIC, LOGO_IMAGE } from "../../lib/site";

/**
 * Neuro Mind Bloom logo: the official emblem + wordmark coloured like the
 * clinic's social-media logo (NEURO · MIND in teal · BLOOM in green) and the
 * tagline "Mind Care, Life Care".
 */
export default function Logo({ lang, tone = "light" }: { lang: Lang; tone?: "light" | "dark" }) {
  const neuro = tone === "light" ? "text-[#0b2236]" : "text-white";
  const subColor = tone === "light" ? "text-[#5b6b75]" : "text-forest-200";
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {LOGO_IMAGE ? (
        <Image
          src={LOGO_IMAGE}
          alt=""
          width={88}
          height={88}
          priority
          className="h-11 w-11 shrink-0 rounded-full ring-1 ring-black/5 md:h-12 md:w-12"
        />
      ) : (
        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#000b1d] text-xl font-black text-[#12a6a0]">
          N
        </span>
      )}
      <span className="min-w-0 leading-tight">
        <span className="block text-[15px] font-extrabold uppercase leading-[1.1] tracking-wide sm:truncate sm:text-[17px] md:text-[18px]">
          <span className={neuro}>Neuro </span>
          <span className="text-[#0fa3b1]">Mind </span>
          <span className="text-[#2bb673]">Bloom</span>
          <span className="sr-only"> – {CLINIC.name}</span>
        </span>
        <span className={`hidden truncate text-[11px] sm:block md:text-xs ${subColor}`}>{tr(CLINIC.tagline, lang)}</span>
      </span>
    </span>
  );
}
