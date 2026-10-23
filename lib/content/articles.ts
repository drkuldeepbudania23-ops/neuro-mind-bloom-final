import type { L10n } from "../i18n";
import type { FaqItem } from "./types";
import { ARTICLE_BATCHES } from "./articles-data";
import { faq } from "./conditions/_h";

export type ArticleBlock = { h: L10n } | { p: L10n } | { list: L10n[] };

/** Library categories (filters) — order is the display order. */
export const ARTICLE_CATS = {
  depression: { en: "Depression & mood", hi: "डिप्रेशन और मूड" },
  anxiety: { en: "Anxiety, panic & OCD", hi: "घबराहट, पैनिक और OCD" },
  addiction: { en: "De-addiction", hi: "नशा मुक्ति" },
  sexual: { en: "Sexual health", hi: "यौन स्वास्थ्य" },
  child: { en: "Child & adolescent", hi: "बच्चे और किशोर" },
  sleep: { en: "Sleep", hi: "नींद" },
  therapy: { en: "Psychotherapy", hi: "साइकोथेरेपी" },
  student: { en: "Students", hi: "छात्र" },
  geriatric: { en: "Older adults", hi: "बुज़ुर्ग" },
  awareness: { en: "Mental health awareness", hi: "मानसिक स्वास्थ्य जागरूकता" },
} satisfies Record<string, L10n>;
export type ArticleCat = keyof typeof ARTICLE_CATS;

export type Article = {
  slug: string;
  title: L10n;
  /** Also used as the meta description (≤ 200 characters). */
  excerpt: L10n;
  category: L10n;
  cat: ArticleCat;
  published: string; // yyyy-mm-dd
  /** Last medical review date (yyyy-mm-dd). */
  updated: string;
  readMinutes: number;
  related: string[]; // condition slugs
  /** Free-form article body (older articles). New articles use the structured sections below. */
  body: ArticleBlock[];
  intro?: L10n[];
  keyConcepts?: L10n[];
  symptoms?: L10n[];
  causes?: L10n[];
  riskFactors?: L10n[];
  management?: L10n[];
  whenHelp?: L10n[];
  /** Optional custom headings for the structured sections (e.g. "Signs therapy may help"). */
  headings?: Partial<Record<"keyConcepts" | "symptoms" | "causes" | "riskFactors" | "management" | "whenHelp", L10n>>;
  faqs?: FaqItem[];
  refs?: string[];
  /** Free-text references (doctor-written CMS articles). */
  customRefs?: string[];
  videoKeywords?: string[];
  /** Search words, including Hinglish. */
  tags?: string[];
};

/** Input for structured articles: category label and reading time are derived. */
export type ArticleInput = Omit<Article, "category" | "readMinutes" | "body" | "updated"> & { updated?: string; body?: ArticleBlock[] };

function words(a: Omit<Article, "readMinutes">): number {
  const parts: L10n[] = [
    ...(a.intro ?? []), ...(a.keyConcepts ?? []), ...(a.symptoms ?? []), ...(a.causes ?? []), ...(a.riskFactors ?? []),
    ...(a.management ?? []), ...(a.whenHelp ?? []), ...(a.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ];
  return parts.reduce((n, p) => n + p.en.split(/\s+/).length, 0);
}

/** Build a structured article (category label, reading time ≈ 200 words/min, minimum 3). */
export function makeArticle(input: ArticleInput): Article {
  const base = { ...input, category: ARTICLE_CATS[input.cat], body: input.body ?? [], updated: input.updated ?? input.published };
  return { ...base, readMinutes: Math.max(3, Math.round(words(base) / 200) + 1) };
}

const LEGACY: Article[] = [
  {
    slug: "depression-or-sadness-when-to-seek-help",
    title: { en: "Depression or just sadness? When to seek help", hi: "डिप्रेशन या बस उदासी? कब मदद लें" },
    excerpt: {
      en: "Everyone feels low sometimes. Here is how to tell ordinary sadness from depression — and what to do next.",
      hi: "कभी-कभी सब उदास होते हैं। जानिए सामान्य उदासी और डिप्रेशन में फ़र्क कैसे पहचानें — और आगे क्या करें।",
    },
    category: { en: "Depression", hi: "डिप्रेशन" },
    published: "2026-10-11",
    readMinutes: 4,
    related: ["depression-treatment-india", "sleep-disorders-psychiatrist-india", "teen-depression-india", "postpartum-depression-india", "suicide-prevention-crisis-support-india"],
    cat: "depression",
    updated: "2026-10-12",
    refs: ["who-depression", "nice-depression", "mhgap"],
    tags: ["udasi", "sadness", "man nahi lagta"],
    faqs: [
      faq("How long does depression treatment take?", "डिप्रेशन का इलाज कितना समय लेता है?", "Many people start feeling better within 4–8 weeks of starting treatment. Treatment usually continues for some months after recovery to prevent relapse.", "इलाज शुरू करने के 4–8 हफ़्तों में बहुत लोग बेहतर महसूस करने लगते हैं। दोबारा न हो, इसलिए ठीक होने के बाद भी कुछ महीने इलाज जारी रहता है।"),
      faq("Is depression a sign of weakness?", "क्या डिप्रेशन कमज़ोरी की निशानी है?", "No. It is a medical condition linked to brain chemistry, stress and life events — not a character flaw.", "नहीं। यह दिमाग़ी रसायनों, तनाव और ज़िंदगी की घटनाओं से जुड़ी बीमारी है — चरित्र की कमी नहीं।"),
    ],
    body: [
      { p: { en: "Sadness is a normal reaction to loss, disappointment or stress. It usually eases within days and does not stop you from functioning. Depression is different: it lasts, it spreads into every part of life, and it does not lift just because something good happens.", hi: "उदासी किसी नुकसान, निराशा या तनाव पर सामान्य प्रतिक्रिया है। यह आमतौर पर कुछ दिनों में कम हो जाती है और रोज़ के काम नहीं रोकती। डिप्रेशन अलग है: यह लंबा चलता है, ज़िंदगी के हर हिस्से में फैल जाता है, और कुछ अच्छा होने पर भी कम नहीं होता।" } },
      { h: { en: "The two-week rule", hi: "दो हफ़्ते का नियम" } },
      { p: { en: "Doctors look for low mood or loss of interest on most days for at least two weeks, along with several of the following:", hi: "डॉक्टर देखते हैं कि कम से कम दो हफ़्ते, ज़्यादातर दिन उदासी या रुचि की कमी हो, और साथ में इनमें से कई बातें हों:" } },
      { list: [
        { en: "Sleep problems — too little or too much", hi: "नींद की समस्या — बहुत कम या बहुत ज़्यादा" },
        { en: "Tiredness, slowed thinking, poor concentration", hi: "थकान, सोच धीमी होना, ध्यान न लगना" },
        { en: "Appetite or weight change", hi: "भूख या वज़न में बदलाव" },
        { en: "Guilt, feeling worthless or hopeless", hi: "अपराध-बोध, बेकार या नाउम्मीद महसूस करना" },
        { en: "Thoughts that life is not worth living", hi: "जीने का कोई मतलब न लगना" },
      ] },
      { h: { en: "Why people delay", hi: "लोग देर क्यों करते हैं" } },
      { p: { en: "Many people think they should 'be strong' or that medicines are addictive. In reality, depression is a medical condition, and antidepressants are not habit-forming. Early treatment shortens suffering and protects work, studies and relationships.", hi: "बहुत लोग सोचते हैं कि उन्हें 'मज़बूत' रहना चाहिए या दवाओं की लत लग जाएगी। असल में डिप्रेशन एक बीमारी है और एंटीडिप्रेसेंट की लत नहीं लगती। जल्दी इलाज से तकलीफ़ कम समय रहती है और काम, पढ़ाई व रिश्ते बचते हैं।" } },
      { h: { en: "What you can do today", hi: "आज आप क्या कर सकते हैं" } },
      { list: [
        { en: "Take our free PHQ-9 self-check (2 minutes, private)", hi: "हमारी निःशुल्क PHQ-9 स्व-जाँच करें (2 मिनट, निजी)" },
        { en: "Talk to someone you trust", hi: "किसी भरोसेमंद व्यक्ति से बात करें" },
        { en: "Keep a simple routine: wake time, a short walk, regular meals", hi: "आसान दिनचर्या रखें: उठने का समय, थोड़ी सैर, समय पर खाना" },
        { en: "If you have thoughts of self-harm, call Tele-MANAS 14416 today", hi: "ख़ुद को नुकसान के विचार हों तो आज ही Tele-MANAS 14416 पर कॉल करें" },
      ] },
    ],
  },
  {
    slug: "stopping-alcohol-safely",
    title: { en: "Stopping alcohol safely: why sudden quitting can be dangerous", hi: "शराब सुरक्षित तरीके से कैसे छोड़ें: अचानक छोड़ना ख़तरनाक क्यों" },
    excerpt: {
      en: "After months of daily drinking, the brain adapts. Stopping suddenly can cause fits and delirium. Here is the safe way.",
      hi: "महीनों तक रोज़ पीने के बाद दिमाग़ उसका आदी हो जाता है। अचानक छोड़ने से दौरे और भ्रम हो सकते हैं। जानिए सुरक्षित तरीका।",
    },
    category: { en: "De-addiction", hi: "नशा मुक्ति" },
    published: "2026-10-11",
    readMinutes: 5,
    related: ["alcohol-addiction-treatment-india", "deaddiction-psychiatrist-india", "relapse-prevention-counselling-india"],
    cat: "addiction",
    updated: "2026-10-12",
    refs: ["nice-alcohol", "who-alcohol", "mhgap"],
    tags: ["daru", "sharab chhodna", "withdrawal"],
    faqs: [
      faq("Can I stop drinking at home?", "क्या घर पर शराब छोड़ सकता हूँ?", "Many people can, but only with a doctor's plan and medicines for withdrawal. People with past fits, delirium or other illness may need admission.", "बहुत लोग छोड़ सकते हैं, पर सिर्फ़ डॉक्टर की योजना और विड्रॉल की दवाओं के साथ। पहले दौरे, भ्रम या दूसरी बीमारी वालों को भर्ती की ज़रूरत हो सकती है।"),
      faq("How long does withdrawal last?", "विड्रॉल कितने दिन रहता है?", "Physical withdrawal usually settles within about a week with treatment; sleep and cravings can take longer.", "इलाज के साथ शारीरिक विड्रॉल आमतौर पर लगभग एक हफ़्ते में शांत हो जाता है; नींद और तलब में ज़्यादा समय लग सकता है।"),
    ],
    body: [
      { p: { en: "Alcohol slows the brain. When someone drinks heavily every day, the brain speeds itself up to compensate. If alcohol is suddenly removed, the brain stays in 'overdrive' — this is withdrawal.", hi: "शराब दिमाग़ को धीमा करती है। जब कोई रोज़ ज़्यादा पीता है, तो दिमाग़ इसकी भरपाई के लिए ख़ुद को तेज़ कर लेता है। अचानक शराब बंद होने पर दिमाग़ 'ओवरड्राइव' में रहता है — यही विदड्रॉल है।" } },
      { h: { en: "Signs of withdrawal", hi: "विदड्रॉल के संकेत" } },
      { list: [
        { en: "Tremors, sweating, fast heartbeat, anxiety — within hours", hi: "कुछ घंटों में हाथ काँपना, पसीना, धड़कन तेज़, घबराहट" },
        { en: "Poor sleep, nausea, irritability", hi: "नींद न आना, जी मिचलाना, चिड़चिड़ापन" },
        { en: "Fits — usually 6–48 hours after the last drink", hi: "दौरे — आमतौर पर आख़िरी पैग के 6–48 घंटे बाद" },
        { en: "Confusion, seeing things, severe shaking (delirium tremens) — an emergency", hi: "भ्रम, चीज़ें दिखना, तेज़ काँपना (डिलीरियम ट्रेमेंस) — इमरजेंसी" },
      ] },
      { h: { en: "The safe way", hi: "सुरक्षित तरीका" } },
      { p: { en: "A doctor assesses how much and how long you have been drinking, then prescribes medicines for a few days that keep withdrawal calm, plus vitamin B1 to protect the brain. Most people can do this at home with family support; admission is needed only for high-risk cases.", hi: "डॉक्टर देखते हैं कि आप कितना और कब से पी रहे हैं, फिर कुछ दिनों के लिए ऐसी दवाएँ देते हैं जिनसे विदड्रॉल शांत रहे, और दिमाग़ की सुरक्षा के लिए विटामिन B1। ज़्यादातर लोग परिवार के साथ घर पर ही यह कर सकते हैं; भर्ती सिर्फ़ ज़्यादा जोखिम में ज़रूरी है।" } },
      { h: { en: "After detox", hi: "डिटॉक्स के बाद" } },
      { p: { en: "Detox is only the first step. Anti-craving medicines and counselling over the next months are what prevent relapse. Never give any 'nasha chhudane ki dawa' secretly in food — it can be dangerous.", hi: "डिटॉक्स सिर्फ़ पहला कदम है। अगले महीनों में तलब कम करने की दवाएँ और काउंसलिंग ही दोबारा पीने से बचाती हैं। खाने में चोरी-छिपे कोई 'नशा छुड़ाने की दवा' कभी न दें — यह ख़तरनाक हो सकता है।" } },
    ],
  },
  {
    slug: "dhat-syndrome-facts",
    title: { en: "Dhat syndrome: facts every young man should know", hi: "धात रोग: हर युवा को ये सच जानने चाहिए" },
    excerpt: {
      en: "Does losing semen make you weak? The medical answer — and why the worry itself causes the symptoms.",
      hi: "क्या धात गिरने से कमज़ोरी आती है? डॉक्टरी जवाब — और क्यों चिंता ही लक्षणों की वजह बनती है।",
    },
    category: { en: "Sexual health", hi: "यौन स्वास्थ्य" },
    published: "2026-10-11",
    readMinutes: 4,
    related: ["dhat-syndrome-treatment-india", "sex-specialist-india", "sexual-health-myths-india", "sexual-performance-anxiety-india"],
    cat: "sexual",
    updated: "2026-10-12",
    refs: ["icd11", "ips-cpg"],
    tags: ["dhat", "swapandosh", "kamzori"],
    faqs: [
      faq("Is semen in urine harmful?", "क्या पेशाब में वीर्य आना नुकसानदायक है?", "Whitish urine is usually due to phosphates or normal secretions and does not cause weakness. A simple urine test can reassure you.", "सफ़ेद पेशाब आमतौर पर फ़ॉस्फ़ेट या सामान्य स्राव से होता है और इससे कमज़ोरी नहीं होती। पेशाब की साधारण जाँच से तसल्ली हो सकती है।"),
      faq("Why do I feel weak and tired?", "मुझे कमज़ोरी और थकान क्यों लगती है?", "Worry, poor sleep, anxiety or depression commonly cause tiredness. Treating these usually relieves the symptoms.", "चिंता, ख़राब नींद, घबराहट या डिप्रेशन से अक्सर थकान होती है। इनका इलाज करने से आमतौर पर लक्षण ठीक हो जाते हैं।"),
    ],
    body: [
      { p: { en: "A common belief in India is that semen ('dhat') is made from many drops of blood and that losing it causes weakness. This belief has been passed down for generations and is repeated in advertisements — but it is not medically true.", hi: "भारत में आम मान्यता है कि वीर्य ('धात') ख़ून की कई बूँदों से बनता है और इसके निकलने से कमज़ोरी आती है। यह मान्यता पीढ़ियों से चली आ रही है और विज्ञापनों में दोहराई जाती है — पर यह डॉक्टरी रूप से सच नहीं है।" } },
      { h: { en: "The facts", hi: "सच क्या है" } },
      { list: [
        { en: "The body produces semen continuously; it is replaced naturally", hi: "शरीर लगातार वीर्य बनाता है; यह अपने आप फिर बन जाता है" },
        { en: "Night emissions and masturbation are normal and do not cause weakness", hi: "स्वप्नदोष और हस्तमैथुन सामान्य हैं और इनसे कमज़ोरी नहीं आती" },
        { en: "Whitish or cloudy urine is usually due to phosphate crystals, not semen", hi: "सफ़ेद या धुँधला पेशाब आमतौर पर फ़ॉस्फ़ेट क्रिस्टल की वजह से होता है, वीर्य से नहीं" },
      ] },
      { h: { en: "Then why do I feel weak?", hi: "फिर कमज़ोरी क्यों लगती है?" } },
      { p: { en: "Constant worry causes real symptoms — tiredness, poor sleep, low concentration, body aches and sexual anxiety. These improve with correct information and, when needed, treatment for anxiety or depression.", hi: "लगातार चिंता असली लक्षण पैदा करती है — थकान, ख़राब नींद, ध्यान की कमी, बदन दर्द और यौन घबराहट। सही जानकारी और ज़रूरत हो तो घबराहट या डिप्रेशन के इलाज से ये ठीक हो जाते हैं।" } },
      { h: { en: "Avoid 'power' medicines", hi: "'ताक़त' की दवाओं से बचें" } },
      { p: { en: "Many unregulated products contain hidden steroids or other drugs. A confidential consultation with a qualified doctor is safer and more effective.", hi: "कई अनियमित उत्पादों में छिपे स्टेरॉयड या दूसरी दवाएँ होती हैं। योग्य डॉक्टर से गोपनीय परामर्श ज़्यादा सुरक्षित और असरदार है।" } },
    ],
  },
  {
    slug: "exam-stress-guide",
    title: { en: "Exam stress: a practical guide for students and parents", hi: "परीक्षा का तनाव: छात्रों और माता-पिता के लिए व्यावहारिक गाइड" },
    excerpt: {
      en: "Some stress helps you study; too much blocks memory. Simple, proven steps for better focus, sleep and calm.",
      hi: "थोड़ा तनाव पढ़ाई में मदद करता है; ज़्यादा तनाव याददाश्त रोक देता है। बेहतर ध्यान, नींद और शांति के आसान, प्रमाणित तरीके।",
    },
    category: { en: "Students", hi: "छात्र" },
    published: "2026-10-11",
    readMinutes: 5,
    related: ["student-exam-stress-india", "anxiety-phobia-treatment-india", "neet-exam-stress-india", "jee-exam-stress-india", "exam-anxiety-students-india", "sleep-problems-students-india"],
    cat: "student",
    updated: "2026-10-12",
    refs: ["who-adolescent", "telemanas"],
    tags: ["pariksha", "exam", "board", "neet", "jee"],
    faqs: [
      faq("How much sleep do students need before exams?", "परीक्षा से पहले छात्रों को कितनी नींद चाहिए?", "Most teenagers need about 8–10 hours and young adults 7–9 hours. Sleep improves memory more than late-night revision.", "ज़्यादातर किशोरों को लगभग 8–10 घंटे और युवाओं को 7–9 घंटे नींद चाहिए। नींद देर रात दोहराने से ज़्यादा याददाश्त सुधारती है।"),
      faq("When should parents worry?", "माता-पिता को कब चिंता करनी चाहिए?", "When a child stops eating or sleeping, withdraws, talks of hopelessness or self-harm, or cannot study at all — seek help early.", "जब बच्चा खाना या सोना छोड़ दे, अलग-थलग हो जाए, निराशा या ख़ुद को नुकसान की बात करे, या बिल्कुल पढ़ न पाए — जल्दी मदद लें।"),
    ],
    body: [
      { h: { en: "For students", hi: "छात्रों के लिए" } },
      { list: [
        { en: "Sleep 7–8 hours — memory is consolidated during sleep", hi: "7–8 घंटे सोएँ — याददाश्त नींद में ही पक्की होती है" },
        { en: "Study in 45–50 minute blocks with short breaks", hi: "45–50 मिनट पढ़ें, फिर छोटा ब्रेक लें" },
        { en: "Test yourself instead of only re-reading", hi: "सिर्फ़ दोबारा पढ़ने के बजाय ख़ुद को टेस्ट करें" },
        { en: "Keep the phone in another room while studying", hi: "पढ़ते समय फ़ोन दूसरे कमरे में रखें" },
        { en: "Use slow breathing (in for 4, out for 6) when anxious", hi: "घबराहट हो तो धीमी साँस लें (4 तक अंदर, 6 तक बाहर)" },
      ] },
      { h: { en: "For parents", hi: "माता-पिता के लिए" } },
      { list: [
        { en: "Ask about effort and wellbeing, not only marks", hi: "सिर्फ़ नंबर नहीं, मेहनत और सेहत के बारे में पूछें" },
        { en: "Avoid comparing with other children", hi: "दूसरे बच्चों से तुलना न करें" },
        { en: "Notice changes in sleep, appetite, mood or withdrawal", hi: "नींद, भूख, मूड में बदलाव या अकेलेपन पर ध्यान दें" },
        { en: "Make it clear that their worth does not depend on one exam", hi: "साफ़ बताएँ कि उनकी क़ीमत एक परीक्षा पर निर्भर नहीं" },
      ] },
      { h: { en: "When stress becomes a problem", hi: "जब तनाव समस्या बन जाए" } },
      { p: { en: "If anxiety, low mood or sleeplessness lasts for weeks, grades drop despite effort, or there is any talk of self-harm, consult a professional. Tele-MANAS 14416 is available 24×7.", hi: "अगर घबराहट, उदासी या नींद न आना हफ़्तों तक रहे, मेहनत के बावजूद नंबर गिरें, या ख़ुद को नुकसान की कोई बात हो, तो विशेषज्ञ से मिलें। Tele-MANAS 14416 24×7 उपलब्ध है।" } },
    ],
  },
  {
    slug: "sleeping-pills-safe-use",
    title: { en: "Sleeping pills: safe use and how to stop", hi: "नींद की गोलियाँ: सुरक्षित इस्तेमाल और कैसे छोड़ें" },
    excerpt: {
      en: "Sleeping pills can help for a short time, but long-term use causes dependence. What works better for insomnia.",
      hi: "नींद की गोलियाँ थोड़े समय मदद कर सकती हैं, पर लंबे समय तक लेने से लत लगती है। अनिद्रा में इससे बेहतर क्या है।",
    },
    category: { en: "Sleep", hi: "नींद" },
    published: "2026-10-11",
    readMinutes: 4,
    related: ["sleep-disorders-psychiatrist-india", "substance-use-disorders-treatment-india", "insomnia-treatment-india", "sedative-sleeping-pill-dependence-india", "prescription-drug-dependence-india"],
    cat: "sleep",
    updated: "2026-10-12",
    refs: ["aasm-insomnia", "mhgap"],
    tags: ["neend ki goli", "sleeping pills", "neend"],
    faqs: [
      faq("Is it safe to take a sleeping pill every night?", "क्या रोज़ रात नींद की गोली लेना सुरक्षित है?", "Many sleeping pills are meant for short-term use only. Long-term nightly use can cause dependence; discuss a plan with your doctor.", "कई नींद की गोलियाँ सिर्फ़ थोड़े समय के लिए होती हैं। लंबे समय तक रोज़ लेने से लत लग सकती है; डॉक्टर से योजना बनाएँ।"),
      faq("What works better than pills for long-term insomnia?", "लंबी अनिद्रा में गोलियों से बेहतर क्या है?", "CBT for insomnia (CBT-I) is the recommended first treatment for chronic insomnia and its benefits last after therapy ends.", "पुरानी अनिद्रा का पहला सुझाया गया इलाज CBT-I है और इसका फ़ायदा थेरेपी ख़त्म होने के बाद भी रहता है।"),
    ],
    body: [
      { p: { en: "Many people start sleeping pills during a stressful period and continue for years. Some common sleeping pills (benzodiazepines and related drugs) lose effect over time and cause dependence.", hi: "बहुत लोग तनाव के दौर में नींद की गोली शुरू करते हैं और सालों तक लेते रहते हैं। कुछ आम नींद की गोलियाँ (बेंज़ोडायज़ेपिन और मिलती-जुलती दवाएँ) समय के साथ असर खो देती हैं और लत बना देती हैं।" } },
      { h: { en: "Risks of long-term use", hi: "लंबे इस्तेमाल के ख़तरे" } },
      { list: [
        { en: "Needing higher doses for the same effect", hi: "उसी असर के लिए ज़्यादा डोज़" },
        { en: "Memory problems and daytime drowsiness", hi: "याददाश्त की कमी और दिन में सुस्ती" },
        { en: "Falls and fractures in older adults", hi: "बुज़ुर्गों में गिरना और हड्डी टूटना" },
        { en: "Dangerous when mixed with alcohol", hi: "शराब के साथ लेना ख़तरनाक" },
      ] },
      { h: { en: "How to stop", hi: "कैसे छोड़ें" } },
      { p: { en: "Do not stop suddenly after long use — it can cause rebound insomnia, anxiety and even fits. A doctor will plan a gradual reduction over weeks while treating the cause of poor sleep.", hi: "लंबे इस्तेमाल के बाद अचानक बंद न करें — इससे नींद और बिगड़ सकती है, घबराहट और दौरे भी पड़ सकते हैं। डॉक्टर हफ़्तों में धीरे-धीरे कमी की योजना बनाएँगे और नींद ख़राब होने की असली वजह का इलाज करेंगे।" } },
      { h: { en: "What works better", hi: "इससे बेहतर क्या है" } },
      { p: { en: "CBT for Insomnia — a structured program of sleep scheduling and habits — is the first-line treatment and gives lasting results.", hi: "अनिद्रा के लिए CBT — नींद के समय और आदतों का संरचित कार्यक्रम — पहला इलाज है और इसका असर लंबे समय तक रहता है।" } },
    ],
  },
  {
    slug: "helping-family-member-with-addiction",
    title: { en: "How to help a family member with addiction", hi: "नशे के आदी परिवार के सदस्य की मदद कैसे करें" },
    excerpt: {
      en: "Fights, threats and secret medicines rarely work. A practical, evidence-based approach for families.",
      hi: "झगड़े, धमकी और चोरी-छिपे दवा देना अक्सर काम नहीं करता। परिवारों के लिए व्यावहारिक, प्रमाणित तरीका।",
    },
    category: { en: "De-addiction", hi: "नशा मुक्ति" },
    published: "2026-10-11",
    readMinutes: 5,
    related: ["deaddiction-psychiatrist-india", "alcohol-addiction-treatment-india", "opioid-smack-heroin-opium-doda-addiction-india", "opium-afeem-addiction-india", "smack-addiction-treatment-india", "family-therapy-india"],
    cat: "addiction",
    updated: "2026-10-12",
    refs: ["unodc-standards", "mhgap", "magnitude-substance"],
    tags: ["nasha", "parivar", "family"],
    faqs: [
      faq("Should we force our relative into a rehab centre?", "क्या रिश्तेदार को ज़बरदस्ती रिहैब भेजें?", "Force and locking people up are unsafe and often illegal. Start with a medical consultation; if admission is needed, choose a licensed facility.", "ज़बरदस्ती या बंद करना असुरक्षित और अक्सर ग़ैर-क़ानूनी है। डॉक्टरी परामर्श से शुरू करें; भर्ती ज़रूरी हो तो लाइसेंसशुदा जगह चुनें।"),
      faq("Can the family consult without the patient?", "क्या मरीज़ के बिना परिवार परामर्श ले सकता है?", "Yes. Families can get guidance on how to talk, what to avoid and how to plan treatment.", "हाँ। परिवार बात कैसे करें, क्या न करें और इलाज की योजना कैसे बनाएँ, इस पर मार्गदर्शन ले सकता है।"),
    ],
    body: [
      { p: { en: "Families often feel angry, ashamed and helpless. The good news is that families have real influence — and a method called CRAFT (Community Reinforcement and Family Training) helps many families bring a loved one into treatment.", hi: "परिवार अक्सर गुस्सा, शर्म और बेबसी महसूस करते हैं। अच्छी बात यह है कि परिवार का असली असर होता है — और CRAFT (कम्युनिटी रीइन्फ़ोर्समेंट एंड फ़ैमिली ट्रेनिंग) नाम का तरीका बहुत से परिवारों को अपने व्यक्ति को इलाज तक लाने में मदद करता है।" } },
      { h: { en: "What helps", hi: "क्या मदद करता है" } },
      { list: [
        { en: "Talk when the person is sober, calmly and briefly", hi: "जब व्यक्ति होश में हो, तब शांति से और कम शब्दों में बात करें" },
        { en: "Notice and appreciate sober days", hi: "बिना नशे वाले दिनों पर ध्यान दें और सराहें" },
        { en: "Let natural consequences happen instead of covering up", hi: "नतीजों पर पर्दा डालने के बजाय उन्हें होने दें" },
        { en: "Suggest treatment at a calm moment, with a ready plan", hi: "शांत समय में, पहले से तैयार योजना के साथ इलाज का सुझाव दें" },
        { en: "Look after your own health — consult for yourself if needed", hi: "अपनी सेहत का भी ध्यान रखें — ज़रूरत हो तो ख़ुद भी परामर्श लें" },
      ] },
      { h: { en: "What usually backfires", hi: "क्या अक्सर उल्टा पड़ता है" } },
      { list: [
        { en: "Arguing while the person is intoxicated", hi: "नशे की हालत में बहस करना" },
        { en: "Giving money that ends up buying the substance", hi: "पैसे देना जो नशे पर ख़र्च हों" },
        { en: "Secretly mixing medicines in food", hi: "खाने में चोरी-छिपे दवा मिलाना" },
        { en: "Labelling and public shaming", hi: "ठप्पा लगाना और सबके सामने शर्मिंदा करना" },
      ] },
      { p: { en: "Families can book a consultation even if the patient is not ready. Together we can plan the next step safely.", hi: "मरीज़ तैयार न हो, तब भी परिवार परामर्श बुक कर सकता है। मिलकर हम सुरक्षित अगला कदम तय कर सकते हैं।" } },
    ],
  },
];

/** All articles: the original six plus the structured library batches. */
export const ARTICLES: Article[] = [...LEGACY, ...ARTICLE_BATCHES.flat().map(makeArticle)];

const BY_SLUG = new Map(ARTICLES.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return BY_SLUG.get(slug);
}

/** Related articles: same category first, then shared condition links. */
export function relatedArticles(a: Article, limit = 3): Article[] {
  const score = (b: Article) => (b.cat === a.cat ? 2 : 0) + b.related.filter((r) => a.related.includes(r)).length;
  return ARTICLES.filter((b) => b.slug !== a.slug)
    .map((b) => ({ b, s: score(b) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s || y.b.updated.localeCompare(x.b.updated))
    .slice(0, limit)
    .map((x) => x.b);
}
