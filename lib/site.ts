/**
 * Single source of truth for clinic identity, contacts and fees.
 * Change a fee or phone number HERE and every page, the booking form,
 * the payment screen and the Razorpay server route pick it up.
 */

export const SITE_URL = "https://www.neuromindbloom.com";

export const DOCTOR = {
  name: { en: "Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया" },
  degrees: "MBBS, MD Psychiatry",
  title: {
    en: "Psychiatrist | De-addiction & Sexual Health Specialist",
    hi: "मानसिक रोग, नशा मुक्ति एवं सेक्स रोग विशेषज्ञ",
  },
  /** Used ONLY inside the doctor dashboard / prescription — never shown on public pages. */
  registrationNo: "30526",
  post: { en: "Senior Specialist", hi: "सीनियर स्पेशलिस्ट" },
  photo: "/dr-kuldeep.png",
} as const;

/**
 * Patient rating — displayed as confirmed by Dr. Kuldeep Budania from his patient feedback.
 * When `url` is set (e.g. the Google Business Profile reviews page) the rating card links to it.
 */
export const RATING = {
  value: "4.5/5",
  source: { en: "Google reviews", hi: "Google रिव्यू" },
  url: null as string | null,
} as const;

/** Practice highlights shown on the public site (doctor-confirmed). */
export const STATS: readonly { value: string; valueHi?: string; label: { en: string; hi: string }; href?: string }[] = [
  { value: "8+", label: { en: "Years clinical experience", hi: "वर्षों का क्लिनिकल अनुभव" } },
  { value: "14,000+", label: { en: "Patients treated", hi: "मरीज़ों का इलाज" } },
  RATING.url
    ? { value: `${RATING.value}★`, label: { en: `Patient rating · ${RATING.source.en}`, hi: `मरीज़ों की रेटिंग · ${RATING.source.hi}` }, href: RATING.url }
    : { value: `${RATING.value}★`, label: { en: "Patient rating", hi: "मरीज़ों की रेटिंग" } },
  { value: "Kota", valueHi: "कोटा", label: { en: "Former Doctor, Medical College", hi: "पूर्व चिकित्सक, मेडिकल कॉलेज" } },
];

export const CLINIC = {
  name: "Neuro Mind Bloom",
  tagline: { en: "Mind Care, Life Care", hi: "मन की देखभाल, जीवन की देखभाल" },
  city: { en: "Ajmer, Rajasthan", hi: "अजमेर, राजस्थान" },
  phone: "+918107639481",
  phoneDisplay: "+91 81076 39481",
  whatsapp: "919376315331",
  whatsappDisplay: "+91 93763 15331",
  email: "drkuldeepbudania23@gmail.com",
} as const;

/** Official social profiles (exact URLs supplied by the clinic). */
export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61593653543850",
  instagram: "https://www.instagram.com/neuromindbloom/",
  youtube: "https://www.youtube.com/@NeuroMindBloom",
} as const;

/**
 * YouTube channel ID used for the auto-updating video hub (RSS feed).
 * Verify in YouTube Studio → Settings → Channel → Advanced settings.
 */
export const YOUTUBE_CHANNEL_ID = "UCsa1X9IYdXperZMU9E8ZnQQ";

/** Opens YouTube's own "Subscribe to Neuro Mind Bloom?" confirmation. */
export const YOUTUBE_SUBSCRIBE_URL = `${SOCIAL.youtube}?sub_confirmation=1`;

/** Public website address shown to patients and used for sharing. */
export const WEBSITE = { url: "https://neuromindbloom.com", display: "neuromindbloom.com" } as const;

/**
 * Official Neuro Mind Bloom logo (brain · face · leaf · stethoscope emblem), cropped
 * from the clinic's social-media logo. Full circular badge: /public/logo-badge.png.
 */
export const LOGO_IMAGE: string | null = "/logo-mark.png";

/** Indian national tele-mental-health helpline (Govt. of India, 24x7). */
export const CRISIS_HELPLINE = { name: "Tele-MANAS", number: "14416", alt: "1-800-891-4416" } as const;

export type ServiceCode =
  | "psychiatry-consultation"
  | "psychotherapy-first"
  | "psychotherapy-followup";

export type Service = {
  code: ServiceCode;
  fee: number; // INR, whole rupees
  label: { en: string; hi: string };
  short: { en: string; hi: string };
};

export const SERVICES: readonly Service[] = [
  {
    code: "psychiatry-consultation",
    fee: 500,
    label: { en: "Psychiatry Consultation", hi: "मनोरोग परामर्श" },
    short: {
      en: "Assessment, diagnosis, medicines and follow-up plan",
      hi: "जाँच, निदान, दवाइयाँ और फॉलो-अप योजना",
    },
  },
  {
    code: "psychotherapy-first",
    fee: 1500,
    label: { en: "Psychotherapy – First Session", hi: "साइकोथेरेपी – पहला सत्र" },
    short: {
      en: "Detailed history, goals and therapy plan (CBT / supportive)",
      hi: "विस्तृत इतिहास, लक्ष्य और थेरेपी योजना (CBT / सहायक)",
    },
  },
  {
    code: "psychotherapy-followup",
    fee: 1000,
    label: { en: "Psychotherapy – Follow-up Session", hi: "साइकोथेरेपी – फॉलो-अप सत्र" },
    short: {
      en: "Ongoing structured therapy session",
      hi: "नियमित संरचित थेरेपी सत्र",
    },
  },
] as const;

export function getService(code: string): Service | undefined {
  return SERVICES.find((s) => s.code === code);
}

/**
 * Map a free-text service label (older bookings stored only text such as
 * "Psychotherapy Session - ₹2000") to a service code.
 */
export function serviceCodeFromText(text: string): ServiceCode {
  const value = text.toLowerCase();
  if (/psychotherapy|counsel|therapy|साइकोथेरेपी|काउंसलिंग/.test(value)) {
    return /follow|फॉलो/.test(value) ? "psychotherapy-followup" : "psychotherapy-first";
  }
  return "psychiatry-consultation";
}

/** Fee in paise for Razorpay (server-side only source of truth for amounts). */
export function feeInPaise(code: string): number | null {
  const service = getService(code);
  return service ? service.fee * 100 : null;
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function whatsappLink(message: string, number: string = CLINIC.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * UPI details for the "Payment QR" sent to patients after an appointment is
 * confirmed. Set NEXT_PUBLIC_UPI_ID (e.g. name@okicici) and NEXT_PUBLIC_UPI_NAME.
 */
export const UPI = {
  id: process.env.NEXT_PUBLIC_UPI_ID || "",
  name: process.env.NEXT_PUBLIC_UPI_NAME || "Neuro Mind Bloom",
} as const;

/**
 * The clinic's Razorpay UPI QR (static, "any amount"), exactly as printed on the Razorpay QR
 * standee. Payments to it are recorded in the Razorpay dashboard automatically.
 * The payload is used unchanged (no amount is added) so every UPI app accepts it; the patient
 * types the amount shown on the page. Set to "" to fall back to NEXT_PUBLIC_UPI_ID.
 */
export const UPI_MERCHANT_QR =
  "upi://pay?cu=INR&mc=8050&mode=19&pa=neuromindbloom266340.rzp@rxairtel&tn=Payment%20To%20Neuromindbloom&tr=TnlzgDrmdMu5csqrv2";

/** Clinic Razorpay.me page — patients pay any amount by UPI, card or net-banking. */
export const RAZORPAY_ME_URL = "https://razorpay.me/@neuromindbloom";

/** UPI ID (VPA) inside a upi:// link, or "" if the link is not a valid UPI pay link. */
export function upiVpaFromLink(link: string): string {
  if (!link.startsWith("upi://pay?")) return "";
  const pa = new URLSearchParams(link.slice("upi://pay?".length)).get("pa") ?? "";
  return /^[\w.\-]{2,256}@[a-zA-Z][a-zA-Z0-9.\-]{1,64}$/.test(pa) ? pa : "";
}

/** Build a standard UPI payment link (works in GPay, PhonePe, Paytm, BHIM…). */
export function upiPaymentLink(params: { vpa: string; payeeName: string; amount: number; note: string }): string {
  const { vpa, payeeName, amount, note } = params;
  if (!/^[\w.\-]{2,256}@[a-zA-Z][a-zA-Z0-9.\-]{1,64}$/.test(vpa)) throw new Error("Invalid UPI ID");
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) throw new Error("Invalid amount");
  const query = new URLSearchParams({
    pa: vpa,
    pn: payeeName.slice(0, 50),
    am: amount.toFixed(2),
    cu: "INR",
    tn: note.replace(/[^\w\s\-.,]/g, "").slice(0, 50),
  });
  return `upi://pay?${query.toString().replace(/\+/g, "%20")}`;
}

/** Public link to the payment-QR page for an appointment. */
export function paymentPageUrl(params: { appointmentId: string; amount: number; serviceCode: string; lang?: "en" | "hi" }): string {
  const q = new URLSearchParams({ a: params.appointmentId, amt: String(Math.round(params.amount)), s: params.serviceCode });
  return `${WEBSITE.url}${params.lang === "hi" ? "/hi" : ""}/pay?${q.toString()}`;
}
