import type { Lang } from "../../lib/i18n";
import { whatsappLink } from "../../lib/site";
import { WhatsAppIcon } from "./icons";

const MESSAGE = {
  en: "Hello, I have a question about a consultation with Dr. Kuldeep Budania.",
  hi: "नमस्ते, मुझे डॉ. कुलदीप बुडानिया से परामर्श के बारे में जानकारी चाहिए।",
};

export default function FloatingWhatsApp({ lang }: { lang: Lang }) {
  return (
    <a
      href={whatsappLink(MESSAGE[lang])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "hi" ? "WhatsApp पर संदेश भेजें" : "Message us on WhatsApp"}
      className="fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_28px_rgba(31,168,85,0.45)] transition hover:scale-105 md:bottom-6 md:right-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
