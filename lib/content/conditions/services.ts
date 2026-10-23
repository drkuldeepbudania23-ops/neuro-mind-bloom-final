import { CITY_LIST } from "./cities";
import type { ConditionContent, FaqItem } from "../types";

const HOW_ONLINE: FaqItem = {
  q: { en: "How does an online consultation work?", hi: "ऑनलाइन परामर्श कैसे होता है?" },
  a: {
    en: "Book on the website or WhatsApp, pay securely, receive a private video link on WhatsApp, consult from your phone, and get a digitally signed e-prescription.",
    hi: "वेबसाइट या WhatsApp पर बुक करें, सुरक्षित भुगतान करें, WhatsApp पर निजी वीडियो लिंक पाएँ, फ़ोन से परामर्श लें और डिजिटल हस्ताक्षरित ई-प्रिस्क्रिप्शन पाएँ।",
  },
};

const FEES: FaqItem = {
  q: { en: "What are the fees?", hi: "फीस कितनी है?" },
  a: {
    en: "Psychiatry consultation ₹500; psychotherapy first session ₹1500 and follow-up sessions ₹1000.",
    hi: "मनोरोग परामर्श ₹500; साइकोथेरेपी पहला सत्र ₹1500 और फॉलो-अप सत्र ₹1000।",
  },
};

const WHAT_WE_TREAT = [
  { en: "Depression, anxiety, panic and OCD", hi: "डिप्रेशन, घबराहट, पैनिक और OCD" },
  { en: "Sleep problems and stress", hi: "नींद की समस्या और तनाव" },
  { en: "Bipolar disorder, schizophrenia and psychosis", hi: "बाइपोलर, सिज़ोफ्रेनिया और मनोविकृति" },
  { en: "Alcohol, opium/doda, smack, tobacco and other addictions", hi: "शराब, अफ़ीम/डोडा, स्मैक, तंबाकू और दूसरे नशे" },
  { en: "Sexual health concerns (PE, ED, dhat)", hi: "यौन समस्याएँ (शीघ्रपतन, इरेक्शन, धात)" },
  { en: "Child, adolescent and student mental health", hi: "बच्चों, किशोरों और छात्रों का मानसिक स्वास्थ्य" },
  { en: "Memory problems and old-age mental health", hi: "याददाश्त की समस्या और बुज़ुर्गों का मानसिक स्वास्थ्य" },
  { en: "Psychotherapy and family counselling", hi: "साइकोथेरेपी और परिवार काउंसलिंग" },
];

const WHY = [
  { en: "MD Psychiatry, Senior Specialist with 8+ years' experience", hi: "MD मनोचिकित्सा, सीनियर स्पेशलिस्ट, 8+ वर्षों का अनुभव" },
  { en: "14,000+ patients treated", hi: "14,000+ मरीज़ों का इलाज" },
  { en: "Consultation in Hindi or English", hi: "हिंदी या अंग्रेज़ी में परामर्श" },
  { en: "Confidential care under the Mental Healthcare Act, 2017", hi: "मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत गोपनीय इलाज" },
];

const PROCESS = [
  { en: "Book on the website or WhatsApp — choose a date and time", hi: "वेबसाइट या WhatsApp पर बुक करें — तारीख़ और समय चुनें" },
  { en: "Receive confirmation and payment details", hi: "पुष्टि और भुगतान की जानकारी पाएँ" },
  { en: "Join the private video link from your phone", hi: "फ़ोन से निजी वीडियो लिंक पर जुड़ें" },
  { en: "Get a digitally signed e-prescription on WhatsApp / email", hi: "WhatsApp / ईमेल पर डिजिटल हस्ताक्षरित ई-प्रिस्क्रिप्शन पाएँ" },
  { en: "Follow-up as advised", hi: "सलाह के अनुसार फॉलो-अप" },
];

const SEEK = [
  { en: "Symptoms lasting more than two weeks or affecting daily life", hi: "दो हफ़्ते से ज़्यादा लक्षण या रोज़ की ज़िंदगी पर असर" },
  { en: "Inability to stop alcohol or drugs", hi: "शराब या नशा छोड़ न पाना" },
  { en: "In an emergency or with thoughts of self-harm, call 112 or Tele-MANAS 14416 first", hi: "इमरजेंसी या ख़ुद को नुकसान के विचार में पहले 112 या Tele-MANAS 14416 पर कॉल करें" },
];

const HEADINGS = {
  symptoms: { en: "What we treat", hi: "किन समस्याओं का इलाज होता है" },
  causes: { en: "Why patients choose Neuro Mind Bloom", hi: "मरीज़ Neuro Mind Bloom क्यों चुनते हैं" },
  treatment: { en: "How it works", hi: "प्रक्रिया" },
  seekHelp: { en: "When to consult", hi: "कब परामर्श लें" },
};

const RELATED = ["depression-treatment-india", "anxiety-phobia-treatment-india", "deaddiction-psychiatrist-india", "sex-specialist-india"];

export const SERVICES_PAGES: ConditionContent[] = [
  {
    slug: "online-psychiatrist-india",
    category: "service",
    name: { en: "Online Psychiatrist", hi: "ऑनलाइन मनोचिकित्सक" },
    title: { en: "Online Psychiatrist in India – Video Consultation", hi: "ऑनलाइन मनोचिकित्सक – पूरे भारत में वीडियो परामर्श" },
    h1: { en: "Online psychiatrist — consult from anywhere in India", hi: "ऑनलाइन मनोचिकित्सक — भारत में कहीं से भी परामर्श" },
    description: {
      en: "Confidential video consultation with Dr. Kuldeep Budania (MD Psychiatry) for depression, anxiety, addiction, sleep and sexual health. Hindi & English.",
      hi: "डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा) से डिप्रेशन, घबराहट, नशा, नींद और यौन स्वास्थ्य के लिए गोपनीय वीडियो परामर्श। हिंदी व अंग्रेज़ी।",
    },
    intro: [
      { en: "Get expert psychiatric care without travel or waiting rooms. Online consultation is private, convenient and as effective as in-person care for most mental health conditions.", hi: "बिना सफ़र और इंतज़ार के विशेषज्ञ मनोचिकित्सा पाएँ। ज़्यादातर मानसिक समस्याओं में ऑनलाइन परामर्श निजी, सुविधाजनक और क्लिनिक जितना ही असरदार है।" },
    ],
    headings: HEADINGS,
    symptoms: WHAT_WE_TREAT,
    causes: WHY,
    treatment: PROCESS,
    seekHelp: SEEK,
    faqs: [HOW_ONLINE, FEES, { q: { en: "Is online prescription valid?", hi: "क्या ऑनलाइन पर्चा मान्य है?" }, a: { en: "Yes, as per India's Telemedicine Practice Guidelines, for medicines permitted in teleconsultation.", hi: "हाँ, भारत के टेलीमेडिसिन दिशानिर्देशों के अनुसार, टेलीकंसल्टेशन में अनुमत दवाओं के लिए।" } }],
    related: RELATED,
  },
  {
    slug: "online-psychiatry-consultation",
    category: "service",
    name: { en: "Online Psychiatry Consultation", hi: "ऑनलाइन मनोरोग परामर्श" },
    title: { en: "Online Psychiatry Consultation – ₹500", hi: "ऑनलाइन मनोरोग परामर्श – ₹500" },
    h1: { en: "Online psychiatry consultation", hi: "ऑनलाइन मनोरोग परामर्श" },
    description: {
      en: "Book a private online psychiatry consultation for ₹500. Video call on your phone, e-prescription on WhatsApp, follow-up support.",
      hi: "₹500 में निजी ऑनलाइन मनोरोग परामर्श बुक करें। फ़ोन पर वीडियो कॉल, WhatsApp पर ई-प्रिस्क्रिप्शन, फॉलो-अप सहयोग।",
    },
    intro: [
      { en: "A psychiatry consultation includes a detailed discussion of your concerns, diagnosis, a clear treatment plan and medicines when needed.", hi: "मनोरोग परामर्श में आपकी परेशानी पर विस्तार से बातचीत, निदान, साफ़ इलाज योजना और ज़रूरत पर दवाएँ शामिल हैं।" },
    ],
    headings: HEADINGS,
    symptoms: WHAT_WE_TREAT,
    causes: WHY,
    treatment: PROCESS,
    seekHelp: SEEK,
    faqs: [HOW_ONLINE, FEES, { q: { en: "What do I need for the call?", hi: "कॉल के लिए क्या चाहिए?" }, a: { en: "A smartphone with internet, a quiet private place, and your previous prescriptions or reports if any.", hi: "इंटरनेट वाला स्मार्टफ़ोन, शांत निजी जगह, और पुराने पर्चे या रिपोर्ट हों तो वे।" } }],
    related: RELATED,
  },
  {
    slug: "psychiatrist-ajmer",
    category: "service",
    name: { en: "Psychiatrist in Ajmer", hi: "अजमेर में मनोचिकित्सक" },
    title: { en: "Psychiatrist in Ajmer – Dr. Kuldeep Budania", hi: "अजमेर में मनोचिकित्सक – डॉ. कुलदीप बुडानिया" },
    h1: { en: "Psychiatrist in Ajmer — Dr. Kuldeep Budania", hi: "अजमेर में मनोचिकित्सक — डॉ. कुलदीप बुडानिया" },
    description: {
      en: "Ajmer-based psychiatrist (MD Psychiatry, Senior Specialist) for depression, anxiety, de-addiction and sexual health. Confidential video consultation.",
      hi: "अजमेर के मनोचिकित्सक (MD मनोचिकित्सा, सीनियर स्पेशलिस्ट) — डिप्रेशन, घबराहट, नशा मुक्ति और यौन स्वास्थ्य। गोपनीय वीडियो परामर्श।",
    },
    intro: [
      { en: "Neuro Mind Bloom is based in Ajmer, Rajasthan. Patients from Ajmer city, Kishangarh, Beawar, Nasirabad, Pushkar, Kekri and nearby areas can consult privately by video.", hi: "Neuro Mind Bloom अजमेर, राजस्थान में है। अजमेर शहर, किशनगढ़, ब्यावर, नसीराबाद, पुष्कर, केकड़ी और आसपास के मरीज़ वीडियो से निजी परामर्श ले सकते हैं।" },
    ],
    headings: HEADINGS,
    symptoms: WHAT_WE_TREAT,
    causes: WHY,
    treatment: PROCESS,
    seekHelp: SEEK,
    faqs: [HOW_ONLINE, FEES, { q: { en: "Can I consult in Hindi?", hi: "क्या हिंदी में परामर्श ले सकते हैं?" }, a: { en: "Yes, Hindi, English or a mix — whatever you are comfortable with.", hi: "हाँ, हिंदी, अंग्रेज़ी या दोनों — जिसमें आप सहज हों।" } }],
    related: ["sex-specialist-ajmer", ...RELATED],
  },
  {
    slug: "psychiatrist-rajasthan",
    category: "service",
    name: { en: "Psychiatrist in Rajasthan", hi: "राजस्थान में मनोचिकित्सक" },
    title: { en: "Psychiatrist in Rajasthan – Online Consultation", hi: "राजस्थान में मनोचिकित्सक – ऑनलाइन परामर्श" },
    h1: { en: "Psychiatrist for all of Rajasthan", hi: "पूरे राजस्थान के लिए मनोचिकित्सक" },
    description: {
      en: "Online psychiatry, de-addiction and sexual health consultation for patients across Rajasthan — Jaipur, Jodhpur, Kota, Udaipur, Bikaner, Nagaur, Bhilwara and more.",
      hi: "पूरे राजस्थान के मरीज़ों के लिए ऑनलाइन मनोरोग, नशा मुक्ति और यौन स्वास्थ्य परामर्श — जयपुर, जोधपुर, कोटा, उदयपुर, बीकानेर, नागौर, भीलवाड़ा और अन्य।",
    },
    intro: [
      { en: "Specialist mental-health care is still hard to reach in many districts. Video consultation brings it to your home in your own language.", hi: "कई ज़िलों में विशेषज्ञ मानसिक स्वास्थ्य सेवा तक पहुँचना अब भी मुश्किल है। वीडियो परामर्श इसे आपकी अपनी भाषा में घर तक लाता है।" },
    ],
    headings: HEADINGS,
    symptoms: WHAT_WE_TREAT,
    causes: WHY,
    treatment: PROCESS,
    seekHelp: SEEK,
    faqs: [HOW_ONLINE, FEES, { q: { en: "Which districts do you cover?", hi: "किन ज़िलों के मरीज़ परामर्श ले सकते हैं?" }, a: { en: "All of Rajasthan and the rest of India, by video consultation.", hi: "पूरे राजस्थान और बाकी भारत से, वीडियो परामर्श द्वारा।" } }],
    related: ["psychiatrist-ajmer", ...CITY_LIST.map((c) => c.slug), ...RELATED],
  },
  {
    slug: "psychotherapy-counselling",
    category: "service",
    name: { en: "Psychotherapy & Counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
    title: { en: "Psychotherapy & Counselling Online – CBT, REBT, Couple Therapy", hi: "ऑनलाइन साइकोथेरेपी और काउंसलिंग – CBT, REBT, दंपति थेरेपी" },
    h1: { en: "Psychotherapy and counselling", hi: "साइकोथेरेपी (बातचीत से इलाज) और काउंसलिंग" },
    description: {
      en: "Structured talking therapy — CBT, REBT, DBT skills, ERP, couple, family and de-addiction counselling. First session ₹1500, follow-up ₹1000. Online, in Hindi or English.",
      hi: "संरचित बातचीत से इलाज — CBT, REBT, DBT कौशल, ERP, दंपति, परिवार और नशा-मुक्ति काउंसलिंग। पहला सत्र ₹1500, फॉलो-अप ₹1000। ऑनलाइन, हिंदी या अंग्रेज़ी में।",
    },
    intro: [
      {
        en: "Psychotherapy is a planned, goal-focused conversation that helps you understand and change patterns of thinking, feeling and behaving. It can be used alone or along with medicines.",
        hi: "साइकोथेरेपी एक योजनाबद्ध, लक्ष्य-आधारित बातचीत है जो सोचने, महसूस करने और व्यवहार के पैटर्न को समझने और बदलने में मदद करती है। इसे अकेले या दवाओं के साथ लिया जा सकता है।",
      },
      {
        en: "Sessions are private and held by video. The first session covers your history and goals; follow-up sessions build skills step by step.",
        hi: "सत्र निजी होते हैं और वीडियो पर होते हैं। पहले सत्र में आपका इतिहास और लक्ष्य समझे जाते हैं; फॉलो-अप सत्रों में धीरे-धीरे कौशल सिखाए जाते हैं।",
      },
    ],
    headings: {
      symptoms: { en: "Therapies offered", hi: "कौन-सी थेरेपी उपलब्ध हैं" },
      causes: { en: "Who can benefit", hi: "किसे फ़ायदा हो सकता है" },
      treatment: { en: "How sessions work", hi: "सत्र कैसे होते हैं" },
      seekHelp: { en: "Is therapy right for me?", hi: "क्या थेरेपी मेरे लिए सही है?" },
    },
    symptoms: [
      { en: "CBT — Cognitive Behaviour Therapy for depression, anxiety, panic, insomnia", hi: "CBT — डिप्रेशन, घबराहट, पैनिक, अनिद्रा के लिए" },
      { en: "ERP — Exposure and Response Prevention for OCD", hi: "ERP — OCD के लिए" },
      { en: "REBT — for anger, guilt, stress and perfectionism", hi: "REBT — गुस्सा, अपराध-बोध, तनाव और परफ़ेक्शनिज़्म के लिए" },
      { en: "DBT skills — emotion regulation and distress tolerance", hi: "DBT कौशल — भावनाओं पर नियंत्रण और तनाव सहन करना" },
      { en: "Motivational counselling and relapse prevention for addiction", hi: "नशे के लिए प्रेरक काउंसलिंग और दोबारा नशा न करने की तैयारी" },
      { en: "Couple and family therapy", hi: "दंपति और परिवार थेरेपी" },
      { en: "Sex therapy for performance anxiety and intimacy", hi: "परफॉर्मेंस की घबराहट और नज़दीकी के लिए सेक्स थेरेपी" },
      { en: "Grief, trauma and supportive therapy", hi: "शोक, सदमा और सहायक थेरेपी" },
    ],
    causes: [
      { en: "People with depression, anxiety, OCD, stress or sleep problems", hi: "डिप्रेशन, घबराहट, OCD, तनाव या नींद की समस्या वाले लोग" },
      { en: "Those recovering from addiction and their families", hi: "नशे से उबर रहे लोग और उनके परिवार" },
      { en: "Couples facing conflict or intimacy problems", hi: "झगड़े या नज़दीकी की समस्या झेल रहे दंपति" },
      { en: "Students under pressure; adults facing life transitions", hi: "दबाव में छात्र; ज़िंदगी के बदलाव से गुज़र रहे लोग" },
    ],
    treatment: [
      { en: "First session (₹1500): history, assessment and an agreed therapy plan", hi: "पहला सत्र (₹1500): इतिहास, जाँच और मिलकर तय की गई थेरेपी योजना" },
      { en: "Follow-up sessions (₹1000): usually weekly or fortnightly", hi: "फॉलो-अप सत्र (₹1000): आमतौर पर हर हफ़्ते या पंद्रह दिन में" },
      { en: "Practical exercises between sessions", hi: "सत्रों के बीच व्यावहारिक अभ्यास" },
      { en: "Most short-term therapies take 6–12 sessions", hi: "ज़्यादातर अल्पकालिक थेरेपी में 6–12 सत्र लगते हैं" },
      { en: "Progress reviewed regularly; medicines added only if needed", hi: "प्रगति की नियमित समीक्षा; दवा सिर्फ़ ज़रूरत पर" },
    ],
    seekHelp: [
      { en: "You want to understand and change a pattern that keeps repeating", hi: "आप बार-बार दोहराए जाने वाले किसी पैटर्न को समझना और बदलना चाहते हैं" },
      { en: "You prefer to try non-medicine treatment first (for mild to moderate problems)", hi: "आप पहले बिना दवा का इलाज आज़माना चाहते हैं (हल्की से मध्यम समस्या में)" },
      { en: "Severe symptoms usually need psychiatric assessment first — book a consultation", hi: "गंभीर लक्षणों में आमतौर पर पहले मनोरोग जाँच ज़रूरी है — परामर्श बुक करें" },
    ],
    faqs: [
      { q: { en: "Is therapy just talking? How does it help?", hi: "क्या थेरेपी सिर्फ़ बातें हैं? इससे कैसे फ़ायदा होता है?" }, a: { en: "It is structured: you learn specific, proven skills and practise them. Research shows therapy is as effective as medicines for many conditions.", hi: "यह संरचित होती है: आप ख़ास, प्रमाणित कौशल सीखते और अभ्यास करते हैं। शोध दिखाते हैं कि कई समस्याओं में थेरेपी दवाओं जितनी ही असरदार है।" } },
      FEES,
      { q: { en: "Is therapy confidential?", hi: "क्या थेरेपी गोपनीय है?" }, a: { en: "Yes. What you share stays private, under the Mental Healthcare Act, 2017.", hi: "हाँ। आप जो बताते हैं वह मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत निजी रहता है।" } },
    ],
    related: ["depression-treatment-india", "anxiety-phobia-treatment-india", "ocd-treatment-india", "personality-disorders-psychiatrist-india"],
  },
];
