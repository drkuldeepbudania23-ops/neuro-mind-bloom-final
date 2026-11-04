"use client";

import { useEffect, useState } from "react";
import { FEE_HELP, feeHelpVisible } from "../../lib/feeHelp";
import type { Lang } from "../../lib/i18n";
import { tr } from "../../lib/i18n";
import { whatsappLink } from "../../lib/site";

/** Decided on the client so a statically built page turns it off on the right day. */
export default function FeeHelpNote({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(feeHelpVisible());
  }, []);

  if (!visible) return null;

  return (
    <p className="rounded-xl bg-forest-50 px-4 py-3 text-sm text-forest-800">
      {tr(FEE_HELP.text, lang)}{" "}
      <a
        href={whatsappLink(tr(FEE_HELP.whatsappMessage, lang))}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2"
      >
        {tr(FEE_HELP.cta, lang)}
      </a>
    </p>
  );
}
