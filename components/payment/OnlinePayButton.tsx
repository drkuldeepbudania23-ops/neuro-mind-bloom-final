"use client";

import { useState } from "react";
import type { Lang } from "../../lib/i18n";
import { PAYMENTS_ENABLED, startRazorpayPayment } from "../../lib/client/razorpayCheckout";

const T = {
  or: { en: "or pay online (card / UPI / net-banking)", hi: "या ऑनलाइन भुगतान करें (कार्ड / UPI / नेट-बैंकिंग)" },
  first: {
    en: "Fastest: pay online (UPI / card / net-banking) — no screenshot needed",
    hi: "सबसे आसान: ऑनलाइन भुगतान करें (UPI / कार्ड / नेट-बैंकिंग) — स्क्रीनशॉट भेजने की ज़रूरत नहीं",
  },
  qrBelow: { en: "Or scan the QR below", hi: "या नीचे दिया QR स्कैन करें" },
  pay: { en: "Pay online securely", hi: "सुरक्षित ऑनलाइन भुगतान" },
  opening: { en: "Opening…", hi: "खुल रहा है…" },
  paid: { en: "Payment successful. Thank you!", hi: "भुगतान सफल रहा। धन्यवाद!" },
  failed: { en: "Payment was not completed. Please try again or use the QR.", hi: "भुगतान पूरा नहीं हुआ। दोबारा कोशिश करें या QR इस्तेमाल करें।" },
};

/** Razorpay option on the payment page (shown only when Razorpay is enabled). */
export default function OnlinePayButton({
  lang,
  appointmentId,
  description,
  primary = false,
}: {
  lang: Lang;
  appointmentId: string;
  description: string;
  /** Shown first on the payment page: the payment is recorded automatically. */
  primary?: boolean;
}) {
  const [state, setState] = useState<"idle" | "opening" | "paid" | "failed">("idle");
  if (!PAYMENTS_ENABLED) return null;
  const t = (v: { en: string; hi: string }) => v[lang];

  async function pay() {
    setState("opening");
    try {
      const result = await startRazorpayPayment(appointmentId, description);
      setState(result === "dismissed" ? "idle" : result);
    } catch {
      setState("failed");
    }
  }

  if (state === "paid") return <p className="mt-6 rounded-xl bg-[#e3f6ea] px-4 py-3 font-semibold text-[#14713a]">{t(T.paid)}</p>;

  return (
    <div className="mt-6">
      <p className={primary ? "text-sm font-semibold text-forest-900" : "text-sm text-forest-700"}>{t(primary ? T.first : T.or)}</p>
      <button
        type="button"
        onClick={pay}
        disabled={state === "opening"}
        className="mt-2 w-full rounded-full bg-saffron-500 px-6 py-3.5 font-semibold text-forest-900 hover:bg-saffron-400 disabled:opacity-60"
      >
        {state === "opening" ? t(T.opening) : t(T.pay)}
      </button>
      {state === "failed" && <p className="mt-2 text-sm text-[#b23a1f]">{t(T.failed)}</p>}
      {primary && <p className="mt-6 border-t border-forest-100 pt-4 text-sm text-forest-700">{t(T.qrBelow)}</p>}
    </div>
  );
}
