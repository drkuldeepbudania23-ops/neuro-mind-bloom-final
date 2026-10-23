"use client";

import { useState } from "react";
import type { Lang } from "../../lib/i18n";
import { PAYMENTS_ENABLED, startRazorpayPayment } from "../../lib/client/razorpayCheckout";

const T = {
  or: { en: "or pay online (card / UPI / net-banking)", hi: "या ऑनलाइन भुगतान करें (कार्ड / UPI / नेट-बैंकिंग)" },
  pay: { en: "Pay online securely", hi: "सुरक्षित ऑनलाइन भुगतान" },
  opening: { en: "Opening…", hi: "खुल रहा है…" },
  paid: { en: "Payment successful. Thank you!", hi: "भुगतान सफल रहा। धन्यवाद!" },
  failed: { en: "Payment was not completed. Please try again or use the QR.", hi: "भुगतान पूरा नहीं हुआ। दोबारा कोशिश करें या QR इस्तेमाल करें।" },
};

/** Razorpay option on the payment page (shown only when Razorpay is enabled). */
export default function OnlinePayButton({ lang, appointmentId, description }: { lang: Lang; appointmentId: string; description: string }) {
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
      <p className="text-sm text-forest-700">{t(T.or)}</p>
      <button
        type="button"
        onClick={pay}
        disabled={state === "opening"}
        className="mt-2 w-full rounded-full bg-saffron-500 px-6 py-3.5 font-semibold text-forest-900 hover:bg-saffron-400 disabled:opacity-60"
      >
        {state === "opening" ? t(T.opening) : t(T.pay)}
      </button>
      {state === "failed" && <p className="mt-2 text-sm text-[#b23a1f]">{t(T.failed)}</p>}
    </div>
  );
}
