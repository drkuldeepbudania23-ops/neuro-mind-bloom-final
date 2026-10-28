import QRCode from "qrcode";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { localePath, tr } from "../../lib/i18n";
import { CLINIC, RAZORPAY_ME_URL, UPI, UPI_MERCHANT_QR, formatINR, getService, upiPaymentLink, upiVpaFromLink, whatsappLink } from "../../lib/site";
import Logo from "../site/Logo";
import { WhatsAppIcon } from "../site/icons";
import CopyText from "./CopyText";
import OnlinePayButton from "./OnlinePayButton";
import { getOrCreatePaymentQr, type PaymentQr } from "../../lib/server/qrPayments";

const T = {
  title: { en: "Pay consultation fee", hi: "परामर्श शुल्क का भुगतान" },
  ref: { en: "Appointment reference", hi: "अपॉइंटमेंट रेफ़रेंस" },
  scan: { en: "Scan with any UPI app — Google Pay, PhonePe, Paytm, BHIM", hi: "किसी भी UPI ऐप से स्कैन करें — Google Pay, PhonePe, Paytm, BHIM" },
  openApp: { en: "Pay with UPI app", hi: "UPI ऐप से भुगतान करें" },
  openAppHint: { en: "On a phone, this opens your UPI app with the amount filled in.", hi: "फ़ोन पर यह आपके UPI ऐप को राशि भरकर खोल देगा।" },
  upiId: { en: "UPI ID", hi: "UPI ID" },
  enterAmount: { en: "Enter this amount in your UPI app:", hi: "अपने UPI ऐप में यह राशि डालें:" },
  openAppPlain: { en: "Open UPI app", hi: "UPI ऐप खोलें" },
  rzpMe: { en: "Pay by card, net-banking or UPI (Razorpay)", hi: "कार्ड, नेट-बैंकिंग या UPI से भुगतान (Razorpay)" },
  rzpMeHint: { en: "Opens the clinic's secure Razorpay page — enter the amount shown above.", hi: "क्लिनिक का सुरक्षित Razorpay पेज खुलेगा — ऊपर दिखाई गई राशि डालें।" },
  merchant: { en: "Payee: Neuromindbloom (Dr Kuldeep Budania) · secured by Razorpay", hi: "भुगतान प्राप्तकर्ता: Neuromindbloom (डॉ. कुलदीप बुडानिया) · Razorpay द्वारा सुरक्षित" },
  after: {
    en: "After paying, please send the payment screenshot on WhatsApp so we can confirm it.",
    hi: "भुगतान के बाद, पुष्टि के लिए भुगतान का स्क्रीनशॉट WhatsApp पर भेजें।",
  },
  sendProof: { en: "Send screenshot on WhatsApp", hi: "WhatsApp पर स्क्रीनशॉट भेजें" },
  noUpi: {
    en: "UPI QR is not available right now. Please pay online below or contact the clinic on WhatsApp.",
    hi: "अभी UPI QR उपलब्ध नहीं है। नीचे ऑनलाइन भुगतान करें या WhatsApp पर क्लिनिक से संपर्क करें।",
  },
  invalid: {
    en: "This payment link is incomplete. Please contact the clinic on WhatsApp.",
    hi: "यह भुगतान लिंक अधूरा है। कृपया WhatsApp पर क्लिनिक से संपर्क करें।",
  },
  home: { en: "Go to website", hi: "वेबसाइट पर जाएँ" },
  autoQr: {
    en: "The amount is already filled in. Your payment is recorded automatically — no screenshot needed.",
    hi: "राशि पहले से भरी है। आपका भुगतान अपने आप दर्ज हो जाएगा — स्क्रीनशॉट भेजने की ज़रूरत नहीं।",
  },
  afterAuto: {
    en: "Paid with the QR or online button above? It is recorded automatically. Any problem — message us on WhatsApp.",
    hi: "ऊपर के QR या ऑनलाइन बटन से भुगतान किया? वह अपने आप दर्ज हो जाता है। कोई समस्या हो तो WhatsApp पर बताएँ।",
  },
  alreadyPaid: { en: "This payment has already been received. Thank you!", hi: "यह भुगतान पहले ही मिल चुका है। धन्यवाद!" },
};

export type PaymentQrProps = {
  lang: Lang;
  appointmentId: string;
  amount: number | null;
  serviceCode: string;
};

/** Parse and validate the query string of /pay. */
export function parsePaymentParams(params: Record<string, string | string[] | undefined>) {
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]?.[0] : params[k]) || "";
  const appointmentId = /^[A-Za-z0-9_-]{6,64}$/.test(one("a")) ? one("a") : "";
  const serviceCode = getService(one("s")) ? one("s") : "";
  const raw = Number(one("amt"));
  const amount = Number.isInteger(raw) && raw > 0 && raw <= 100000 ? raw : serviceCode ? getService(serviceCode)!.fee : null;
  return { appointmentId, serviceCode, amount };
}

export default async function PaymentQrPage({ lang, appointmentId, amount, serviceCode }: PaymentQrProps) {
  const t = (v: { en: string; hi: string }) => tr(v, lang);
  const service = getService(serviceCode);
  const valid = Boolean(appointmentId && amount);

  let upiLink = "";
  let qrSvg = "";
  // Clinic's Razorpay merchant QR first (amount typed by the patient); otherwise a personal UPI ID with the amount pre-filled.
  const merchantVpa = upiVpaFromLink(UPI_MERCHANT_QR);
  const merchant = Boolean(valid && merchantVpa);
  const shownVpa = merchant ? merchantVpa : UPI.id;
  if (merchant) {
    upiLink = UPI_MERCHANT_QR;
    qrSvg = await QRCode.toString(upiLink, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#062b31", light: "#ffffff" } });
  } else if (valid && UPI.id) {
    upiLink = upiPaymentLink({ vpa: UPI.id, payeeName: UPI.name, amount: amount!, note: `NMB ${appointmentId.slice(0, 10)}` });
    // SVG generated on the server from our own UPI string — no third-party QR service.
    qrSvg = await QRCode.toString(upiLink, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#062b31", light: "#ffffff" } });
  }

  // Per-patient Razorpay QR (amount fixed, recorded automatically) for the full fee;
  // any problem → null and the clinic's static QR above is used as before.
  let autoQr: PaymentQr = null;
  if (valid && service && amount === service.fee) {
    autoQr = await getOrCreatePaymentQr(appointmentId, serviceCode, amount).catch((error) => {
      console.error("pay/qr", error);
      return null;
    });
  }

  if (autoQr?.kind === "paid") {
    return (
      <PayShell lang={lang}>
        <h1 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(T.title)}</h1>
        <p className="mt-4 rounded-xl bg-[#e3f6ea] px-4 py-3 font-semibold text-[#14713a]">{t(T.alreadyPaid)}</p>
        <p className="mt-2 text-sm text-forest-700/80">
          {t(T.ref)}: <span className="font-mono">{appointmentId}</span>
        </p>
      </PayShell>
    );
  }

  const proofMessage =
    lang === "hi"
      ? `नमस्ते, मैंने ${formatINR(amount ?? 0)} का भुगतान कर दिया है।\nरेफ़रेंस: ${appointmentId}\n(स्क्रीनशॉट संलग्न)`
      : `Hello, I have paid ${formatINR(amount ?? 0)}.\nReference: ${appointmentId}\n(screenshot attached)`;

  return (
    <PayShell lang={lang}>
          <h1 className="text-2xl font-semibold text-forest-900 md:text-3xl">{t(T.title)}</h1>

          {!valid ? (
            <p className="mt-4 text-forest-700">{t(T.invalid)}</p>
          ) : (
            <>
              {service && <p className="mt-2 text-forest-700">{t(service.label)}</p>}
              <p className="mt-3 font-display text-5xl font-semibold text-forest-800">{formatINR(amount!)}</p>
              <p className="mt-2 text-sm text-forest-700/80">
                {t(T.ref)}: <span className="font-mono">{appointmentId}</span>
              </p>

              {/* Online payment first: it is recorded in the doctor dashboard automatically.
                  Razorpay charges the standard fee, so it is offered only when no discount was applied. */}
              {service && amount === service.fee && (
                <OnlinePayButton lang={lang} appointmentId={appointmentId} description={service.label.en} primary />
              )}

              {autoQr?.kind === "qr" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Razorpay-hosted QR image */}
                  <img
                    src={autoQr.imageUrl}
                    alt={t(T.scan)}
                    className="mx-auto mt-6 w-64 max-w-full rounded-2xl ring-1 ring-forest-100"
                  />
                  <p className="mt-3 text-sm text-forest-800">{t(T.scan)}</p>
                  <p className="mt-4 rounded-xl bg-[#e3f6ea] px-4 py-3 text-forest-900">{t(T.autoQr)}</p>
                  <p className="mt-2 text-xs text-forest-700/80">{t(T.merchant)}</p>
                </>
              ) : qrSvg ? (
                <>
                  <div
                    className="mx-auto mt-6 w-64 max-w-full rounded-2xl p-3 ring-1 ring-forest-100 [&>svg]:h-auto [&>svg]:w-full"
                    role="img"
                    aria-label={t(T.scan)}
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                  <p className="mt-3 text-sm text-forest-800">{t(T.scan)}</p>
                  {merchant && (
                    <p className="mt-4 rounded-xl bg-saffron-100 px-4 py-3 text-forest-900">
                      {t(T.enterAmount)} <strong className="whitespace-nowrap text-lg">{formatINR(amount!)}</strong>
                    </p>
                  )}
                  <a
                    href={upiLink}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-forest-800 px-6 py-3.5 font-semibold text-white hover:bg-forest-700"
                  >
                    {merchant ? t(T.openAppPlain) : `${t(T.openApp)} · ${formatINR(amount!)}`}
                  </a>
                  {!merchant && <p className="mt-2 text-xs text-forest-700/80">{t(T.openAppHint)}</p>}
                  <div className="mt-4 text-sm text-forest-800">
                    {t(T.upiId)}: <CopyText text={shownVpa} lang={lang} />
                  </div>
                  {merchant && <p className="mt-2 text-xs text-forest-700/80">{t(T.merchant)}</p>}
                </>
              ) : (
                <p className="mt-6 rounded-xl bg-saffron-100 px-4 py-3 text-forest-900">{t(T.noUpi)}</p>
              )}

              {RAZORPAY_ME_URL && autoQr?.kind !== "qr" && (
                <>
                  <a
                    href={RAZORPAY_ME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-semibold text-forest-800 ring-1 ring-forest-200 hover:ring-forest-500"
                  >
                    {t(T.rzpMe)} · {formatINR(amount!)}
                  </a>
                  <p className="mt-2 text-xs text-forest-700/80">{t(T.rzpMeHint)}</p>
                </>
              )}

              <div className="mt-6 rounded-2xl bg-forest-50 p-4 text-left">
                <p className="text-forest-900">{t(autoQr?.kind === "qr" ? T.afterAuto : T.after)}</p>
                <a
                  href={whatsappLink(proofMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white"
                >
                  <WhatsAppIcon size={20} /> {t(T.sendProof)}
                </a>
              </div>
            </>
          )}
    </PayShell>
  );
}

/** Page frame shared by the payment and "already paid" views. */
function PayShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <div className="nmb min-h-screen bg-cream" lang={lang === "hi" ? "hi" : "en"}>
      <header className="border-b border-forest-100 bg-white">
        <div className="mx-auto flex h-16 max-w-xl items-center px-4">
          <Link href={localePath("/", lang)}>
            <Logo lang={lang} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8">
        <div className="rounded-3xl bg-white p-6 text-center shadow-[0_20px_60px_rgba(6,43,49,0.12)] md:p-8">{children}</div>
        <p className="mt-6 text-center text-sm text-forest-700">
          {CLINIC.name} · {CLINIC.phoneDisplay} ·{" "}
          <Link className="underline" href={localePath("/", lang)}>
            {tr(T.home, lang)}
          </Link>
        </p>
      </main>
    </div>
  );
}
