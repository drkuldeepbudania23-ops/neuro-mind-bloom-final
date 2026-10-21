import type { L10n } from "../i18n";

/**
 * Homepage copy in English and Hindi.
 * Wording avoids unverifiable claims (patient counts, ratings, cure rates).
 * Add verified achievements here when you want them shown.
 */

export const nav = {
  about: { en: "About", hi: "डॉक्टर के बारे में" },
  conditions: { en: "Conditions", hi: "बीमारियाँ" },
  fees: { en: "Fees", hi: "फीस" },
  therapy: { en: "Psychotherapy", hi: "साइकोथेरेपी" },
  selfCheck: { en: "Self-check", hi: "स्व-जाँच" },
  contact: { en: "Contact", hi: "संपर्क" },
  nasha: { en: "Nasha Mukti", hi: "नशा मुक्ति" },
  sexual: { en: "Sexual Health", hi: "गुप्त रोग" },
  resources: { en: "Resources", hi: "जानकारी केंद्र" },
  articles: { en: "Articles", hi: "लेख" },
  videos: { en: "Videos", hi: "वीडियो" },
  faq: { en: "FAQ", hi: "सवाल-जवाब" },
  students: { en: "Students", hi: "छात्र" },
  therapies: { en: "Therapies", hi: "थेरेपी" },
  search: { en: "Search", hi: "खोजें" },
  searchPlaceholder: { en: "Search conditions, symptoms, tests…", hi: "बीमारी, लक्षण, जाँच खोजें…" },
  doctor: { en: "Dr. Kuldeep Budania", hi: "डॉ. कुलदीप बुडानिया" },
  doctorProfile: { en: "Doctor profile", hi: "डॉक्टर प्रोफ़ाइल" },
  locations: { en: "Locations we serve", hi: "सेवा क्षेत्र" },
  international: { en: "Indians abroad", hi: "विदेश में भारतीय" },
  feedback: { en: "Patient feedback", hi: "मरीज़ों का फ़ीडबैक" },
  recovery: { en: "Recovery stories", hi: "रिकवरी कहानियाँ" },
  bookNow: { en: "Book Now", hi: "बुक करें" },
  websiteBooking: { en: "Website Booking", hi: "वेबसाइट से बुकिंग" },
  websiteBookingHint: { en: "Choose date & time, pay online", hi: "तारीख-समय चुनें, ऑनलाइन भुगतान" },
  whatsappBooking: { en: "WhatsApp Booking", hi: "WhatsApp से बुकिंग" },
  whatsappBookingHint: { en: "Chat with the clinic directly", hi: "क्लिनिक से सीधे बात करें" },
  menu: { en: "Menu", hi: "मेन्यू" },
  close: { en: "Close", hi: "बंद करें" },
  switchLang: { en: "हिंदी", hi: "English" },
} satisfies Record<string, L10n>;

export const hero = {
  eyebrow: { en: "Confidential care · Video consultation across India", hi: "पूरी तरह गोपनीय · पूरे भारत में वीडियो परामर्श" },
  title: { en: "Calm, confidential care for your mind", hi: "मन की सेहत के लिए भरोसेमंद और गोपनीय इलाज" },
  subtitle: {
    en: "Evidence-based treatment for depression, anxiety, addiction, sleep and sexual health concerns — explained in the language you are comfortable with.",
    hi: "डिप्रेशन, घबराहट, नशा, नींद और यौन स्वास्थ्य की समस्याओं का वैज्ञानिक इलाज — आपकी अपनी भाषा में, आसान शब्दों में।",
  },
  ctaPrimary: { en: "Book a consultation", hi: "परामर्श बुक करें" },
  ctaWhatsapp: { en: "WhatsApp the clinic", hi: "WhatsApp पर संपर्क करें" },
  chips: [
    { en: "MBBS, MD Psychiatry", hi: "MBBS, MD मनोचिकित्सा" },
    { en: "Hindi & English", hi: "हिंदी और अंग्रेज़ी" },
    { en: "E-prescription on WhatsApp", hi: "WhatsApp पर ई-प्रिस्क्रिप्शन" },
  ],
} satisfies Record<string, L10n | L10n[]>;

export const trust: { title: L10n; text: L10n }[] = [
  {
    title: { en: "Private by law", hi: "कानूनन गोपनीय" },
    text: {
      en: "Your records are protected under the Mental Healthcare Act, 2017.",
      hi: "मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत आपकी जानकारी सुरक्षित है।",
    },
  },
  {
    title: { en: "From home", hi: "घर बैठे" },
    text: {
      en: "Secure video consultation — no travel, no waiting room.",
      hi: "सुरक्षित वीडियो परामर्श — न सफ़र, न इंतज़ार।",
    },
  },
  {
    title: { en: "Digital prescription", hi: "डिजिटल पर्चा" },
    text: {
      en: "Signed e-prescription sent to your WhatsApp or email.",
      hi: "डिजिटल हस्ताक्षरित पर्चा सीधे WhatsApp या ईमेल पर।",
    },
  },
  {
    title: { en: "Continuity of care", hi: "लगातार देखभाल" },
    text: {
      en: "Planned follow-ups and medicine review.",
      hi: "तय फॉलो-अप और दवाइयों की नियमित समीक्षा।",
    },
  },
];

export const about = {
  label: { en: "About the doctor", hi: "डॉक्टर के बारे में" },
  title: { en: "Psychiatry that listens first", hi: "पहले ध्यान से सुनना, फिर इलाज" },
  body: [
    {
      en: "Dr. Kuldeep Budania (MBBS, MD Psychiatry), Senior Specialist, has over 8 years of experience and has treated more than 14,000 patients for mental health, addiction and sexual health concerns — with a respectful, judgement-free approach.",
      hi: "डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा), सीनियर स्पेशलिस्ट, 8 वर्षों से ज़्यादा के अनुभव के साथ 14,000 से अधिक मरीज़ों का मानसिक रोग, नशा और यौन स्वास्थ्य की समस्याओं में इलाज कर चुके हैं — सम्मान के साथ, बिना किसी जजमेंट के।",
    },
    {
      en: "Every plan combines a careful diagnosis, the lowest effective medicine where needed, and practical counselling for you and your family.",
      hi: "हर इलाज में सही निदान, ज़रूरत हो तो सबसे कम असरदार दवा, और मरीज़ व परिवार के लिए व्यावहारिक काउंसलिंग शामिल होती है।",
    },
  ],
  points: [
    { en: "Clear explanation of diagnosis and medicines", hi: "बीमारी और दवाइयों की साफ़ जानकारी" },
    { en: "Family involvement when you want it", hi: "आप चाहें तो परिवार को भी शामिल किया जाता है" },
    { en: "Medicines reviewed and tapered safely", hi: "दवाइयों की समीक्षा और सुरक्षित तरीके से कम करना" },
    { en: "8+ years' experience · 14,000+ patients", hi: "8+ वर्षों का अनुभव · 14,000+ मरीज़" },
  ],
} satisfies Record<string, L10n | L10n[]>;

export type ConditionCard = { title: L10n; text: L10n; href: string; group: "mind" | "addiction" | "special" };

export const conditions: ConditionCard[] = [
  { group: "mind", href: "/depression-treatment-india", title: { en: "Depression", hi: "डिप्रेशन / उदासी" }, text: { en: "Low mood, loss of interest, hopelessness", hi: "मन उदास रहना, किसी चीज़ में मन न लगना" } },
  { group: "mind", href: "/anxiety-phobia-treatment-india", title: { en: "Anxiety, Panic & Phobia", hi: "घबराहट, पैनिक और डर" }, text: { en: "GAD, panic attacks, social anxiety, phobias, health anxiety", hi: "लगातार चिंता, पैनिक अटैक, लोगों से घबराहट, फ़ोबिया, बीमारी का डर" } },
  { group: "mind", href: "/dissociative-disorders-treatment-india", title: { en: "Dissociative & Somatoform", hi: "डिसोसिएटिव और सोमैटोफ़ॉर्म" }, text: { en: "Stress fits, 'bhav aana', unexplained body symptoms", hi: "तनाव के दौरे, 'भाव आना', बिना वजह शारीरिक लक्षण" } },
  { group: "mind", href: "/ocd-treatment-india", title: { en: "OCD", hi: "OCD / वहम" }, text: { en: "Repeated thoughts, checking, washing", hi: "बार-बार विचार, बार-बार चेक करना या हाथ धोना" } },
  { group: "mind", href: "/bipolar-disorder-psychiatrist-india", title: { en: "Bipolar Disorder", hi: "बाइपोलर डिसऑर्डर" }, text: { en: "Mood swings between highs and lows", hi: "मूड का बहुत ऊपर-नीचे होना" } },
  { group: "mind", href: "/psychosis-psychiatrist-india", title: { en: "Schizophrenia & Psychosis", hi: "सिज़ोफ्रेनिया / मनोविकृति" }, text: { en: "Hearing voices, suspiciousness", hi: "आवाज़ें सुनाई देना, बेवजह शक" } },
  { group: "mind", href: "/sleep-disorders-psychiatrist-india", title: { en: "Sleep Problems", hi: "नींद की समस्या" }, text: { en: "Insomnia, disturbed or excessive sleep", hi: "नींद न आना या बहुत ज़्यादा नींद" } },
  { group: "addiction", href: "/alcohol-addiction-treatment-india", title: { en: "Alcohol Addiction", hi: "शराब की लत" }, text: { en: "Safe medical detox and relapse prevention", hi: "सुरक्षित डिटॉक्स और दोबारा न पीने की योजना" } },
  { group: "addiction", href: "/opioid-smack-heroin-opium-doda-addiction-india", title: { en: "Opium, Doda & Smack", hi: "अफ़ीम, डोडा पोस्त, स्मैक" }, text: { en: "Withdrawal management and long-term recovery", hi: "विदड्रॉल का इलाज और लंबे समय तक नशा-मुक्ति" } },
  { group: "addiction", href: "/tobacco-nicotine-addiction-treatment-india", title: { en: "Tobacco & Gutka", hi: "तंबाकू और गुटखा" }, text: { en: "Quit with medicines and counselling", hi: "दवा और काउंसलिंग से छोड़ें" } },
  { group: "addiction", href: "/gaming-disorder-treatment-india", title: { en: "Mobile, Gaming & Gambling", hi: "मोबाइल, गेमिंग और जुआ" }, text: { en: "Behavioural addictions in youth and adults", hi: "बच्चों और बड़ों में व्यवहारिक लत" } },
  { group: "special", href: "/sex-specialist-india", title: { en: "Sexual Health", hi: "सेक्स संबंधी समस्याएँ" }, text: { en: "Performance anxiety, ED, PE, low desire — confidential", hi: "परफॉर्मेंस चिंता, ED, शीघ्रपतन, इच्छा में कमी — पूरी गोपनीयता" } },
  { group: "special", href: "/child-psychiatrist-india", title: { en: "Child & Adolescent", hi: "बच्चे और किशोर" }, text: { en: "ADHD, autism, IDD, ODD, tics, learning problems", hi: "ADHD, ऑटिज़्म, बौद्धिक अक्षमता, ज़िद/गुस्सा, टिक्स, सीखने की कठिनाई" } },
  { group: "special", href: "/geriatric-psychiatry-india", title: { en: "Geriatric Psychiatry", hi: "बुज़ुर्गों का मानसिक स्वास्थ्य" }, text: { en: "Dementia, delirium, late-life depression, medicine safety", hi: "भूलने की बीमारी, अचानक भ्रम, बुढ़ापे का डिप्रेशन, दवाओं की सुरक्षा" } },
  { group: "special", href: "/neuropsychiatry-india", title: { en: "Neuropsychiatry", hi: "न्यूरोसाइकियाट्री" }, text: { en: "Epilepsy, post-stroke depression, dementia, headache", hi: "मिर्गी, लकवे के बाद डिप्रेशन, डिमेंशिया, सिरदर्द" } },
  { group: "mind", href: "/ptsd-trauma-treatment-india", title: { en: "Trauma & PTSD", hi: "सदमा और PTSD" }, text: { en: "Flashbacks, nightmares after a shocking event", hi: "किसी सदमे के बाद बुरी यादें और सपने" } },
  { group: "addiction", href: "/cannabis-ganja-charas-hash-addiction-india", title: { en: "Ganja, Charas & Pills", hi: "गांजा, चरस और गोलियाँ" }, text: { en: "Cannabis, cough syrup and tablet dependence", hi: "गांजा, कफ़ सिरप और नशे की गोलियाँ" } },
  { group: "special", href: "/dhat-syndrome-treatment-india", title: { en: "Dhat & Gupt Rog Worries", hi: "धात और गुप्त रोग की चिंता" }, text: { en: "Facts, reassurance and treatment", hi: "सही जानकारी, तसल्ली और इलाज" } },
  { group: "special", href: "/womens-mental-health-india", title: { en: "Women's Mental Health", hi: "महिलाओं का मानसिक स्वास्थ्य" }, text: { en: "Pregnancy, after childbirth, periods, menopause", hi: "गर्भावस्था, डिलीवरी के बाद, पीरियड्स, मेनोपॉज़" } },
  { group: "special", href: "/student-exam-stress-india", title: { en: "Students & Exam Stress", hi: "छात्र और परीक्षा का तनाव" }, text: { en: "NEET/JEE/boards pressure, focus, sleep", hi: "NEET/JEE/बोर्ड का दबाव, ध्यान, नींद" } },
  { group: "special", href: "/personality-disorders-psychiatrist-india", title: { en: "Anger & Personality", hi: "गुस्सा और व्यक्तित्व" }, text: { en: "Emotional instability, relationship difficulties", hi: "भावनाओं पर नियंत्रण न रहना, रिश्तों में दिक्कत" } },
];

export const conditionsSection = {
  label: { en: "What we treat", hi: "किन समस्याओं का इलाज" },
  title: { en: "Conditions we help with", hi: "इन समस्याओं में मदद मिलती है" },
  groups: {
    mind: { en: "Mental health", hi: "मानसिक स्वास्थ्य" },
    addiction: { en: "De-addiction · नशा मुक्ति", hi: "नशा मुक्ति" },
    special: { en: "Special care", hi: "विशेष देखभाल" },
  },
  more: { en: "Read more", hi: "और जानें" },
  all: { en: "See all conditions", hi: "सभी बीमारियाँ देखें" },
};

export const feesSection = {
  label: { en: "Consultation fees", hi: "परामर्श शुल्क" },
  title: { en: "Simple, transparent fees", hi: "साफ़ और तय फीस" },
  note: {
    en: "Fee concessions are available for patients facing financial difficulty — please ask the clinic.",
    hi: "आर्थिक कठिनाई होने पर फीस में छूट मिल सकती है — क्लिनिक से पूछें।",
  },
  book: { en: "Book", hi: "बुक करें" },
};

export const steps: { title: L10n; text: L10n }[] = [
  { title: { en: "Book", hi: "बुकिंग" }, text: { en: "Pick a service, date and time on the website or WhatsApp.", hi: "वेबसाइट या WhatsApp पर सेवा, तारीख और समय चुनें।" } },
  { title: { en: "Pay securely", hi: "सुरक्षित भुगतान" }, text: { en: "UPI, card or net-banking via Razorpay.", hi: "Razorpay से UPI, कार्ड या नेट-बैंकिंग।" } },
  { title: { en: "Video consultation", hi: "वीडियो परामर्श" }, text: { en: "You receive a private video link on WhatsApp.", hi: "WhatsApp पर निजी वीडियो लिंक मिलता है।" } },
  { title: { en: "E-prescription", hi: "ई-प्रिस्क्रिप्शन" }, text: { en: "Digitally signed prescription on WhatsApp / email.", hi: "डिजिटल हस्ताक्षरित पर्चा WhatsApp / ईमेल पर।" } },
  { title: { en: "Follow-up", hi: "फॉलो-अप" }, text: { en: "A reminder for your next review.", hi: "अगली जाँच के लिए रिमाइंडर।" } },
];

export const stepsSection = {
  label: { en: "How it works", hi: "प्रक्रिया" },
  title: { en: "From booking to follow-up", hi: "बुकिंग से फॉलो-अप तक" },
};

export const therapy = {
  label: { en: "Psychotherapy & counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
  title: { en: "Talking treatments that work", hi: "बातचीत से इलाज — जो सच में काम करता है" },
  intro: {
    en: "Psychotherapy is structured, goal-focused conversation. It can be used alone or together with medicines.",
    hi: "साइकोथेरेपी एक तय ढाँचे वाली, लक्ष्य-आधारित बातचीत है। इसे अकेले या दवाइयों के साथ लिया जा सकता है।",
  },
  types: [
    { title: { en: "CBT", hi: "CBT" }, text: { en: "Change unhelpful thought patterns — for depression, anxiety, OCD.", hi: "नकारात्मक सोच के पैटर्न बदलना — डिप्रेशन, घबराहट, OCD में।" } },
    { title: { en: "REBT", hi: "REBT" }, text: { en: "Handle anger, guilt and stress with rational thinking.", hi: "गुस्सा, अपराध-बोध और तनाव को तार्किक सोच से संभालना।" } },
    { title: { en: "Supportive therapy", hi: "सहायक थेरेपी" }, text: { en: "A safe space during difficult life phases.", hi: "मुश्किल दौर में एक सुरक्षित सहारा।" } },
    { title: { en: "Couple & family", hi: "दंपति और परिवार" }, text: { en: "Improve communication; support families of patients.", hi: "आपसी बातचीत सुधारना; मरीज़ के परिवार को मार्गदर्शन।" } },
    { title: { en: "De-addiction counselling", hi: "नशा-मुक्ति काउंसलिंग" }, text: { en: "Motivation, craving control and relapse prevention.", hi: "प्रेरणा, तलब पर नियंत्रण और दोबारा नशा न करने की तैयारी।" } },
    { title: { en: "Sex therapy", hi: "सेक्स थेरेपी" }, text: { en: "For performance anxiety and relationship intimacy.", hi: "परफॉर्मेंस चिंता और रिश्तों में नज़दीकी के लिए।" } },
  ],
} satisfies Record<string, L10n | { title: L10n; text: L10n }[]>;

export const selfCheck = {
  label: { en: "Free self-assessment", hi: "निःशुल्क स्व-जाँच" },
  title: { en: "Not sure if you need help?", hi: "समझ नहीं आ रहा कि मदद चाहिए या नहीं?" },
  text: {
    en: "Free 2–3 minute screenings for depression, anxiety, alcohol use and adult ADHD — in Hindi or English. Not a diagnosis; it helps you decide the next step.",
    hi: "डिप्रेशन, घबराहट, शराब की आदत और वयस्क ADHD की 2–3 मिनट की निःशुल्क जाँच — हिंदी या अंग्रेज़ी में। यह निदान नहीं है; इससे अगला कदम तय करने में मदद मिलती है।",
  },
  cta: { en: "Start self-check", hi: "स्व-जाँच शुरू करें" },
};

export const privacy = {
  title: { en: "Your privacy is our responsibility", hi: "आपकी गोपनीयता — हमारी ज़िम्मेदारी" },
  points: [
    { en: "Information is shared with no one without your consent (Mental Healthcare Act, 2017).", hi: "आपकी अनुमति के बिना जानकारी किसी को नहीं दी जाती (मानसिक स्वास्थ्य देखरेख अधिनियम, 2017)।" },
    { en: "Records are stored in an access-controlled system — only the doctor can open them.", hi: "रिकॉर्ड सुरक्षित सिस्टम में रहते हैं — केवल डॉक्टर ही इन्हें देख सकते हैं।" },
    { en: "Payments are processed by Razorpay; we never see your card details.", hi: "भुगतान Razorpay से होता है; आपके कार्ड की जानकारी हमारे पास नहीं आती।" },
  ],
} satisfies Record<string, L10n | L10n[]>;

export const faqs: { q: L10n; a: L10n }[] = [
  { q: { en: "Is online consultation as good as visiting in person?", hi: "क्या ऑनलाइन परामर्श क्लिनिक जाने जितना ही अच्छा है?" }, a: { en: "For most psychiatric conditions, yes — diagnosis is based on conversation and history. If a physical examination or tests are needed, you will be told clearly.", hi: "ज़्यादातर मानसिक बीमारियों में हाँ — निदान बातचीत और इतिहास से होता है। अगर शारीरिक जाँच या टेस्ट ज़रूरी हों तो साफ़ बताया जाएगा।" } },
  { q: { en: "What are the fees?", hi: "फीस कितनी है?" }, a: { en: "Psychiatry consultation ₹500. Psychotherapy first session ₹1500, follow-up sessions ₹1000.", hi: "मनोरोग परामर्श ₹500। साइकोथेरेपी पहला सत्र ₹1500, फॉलो-अप सत्र ₹1000।" } },
  { q: { en: "How will I get the video link?", hi: "वीडियो लिंक कैसे मिलेगा?" }, a: { en: "After your slot is confirmed, a private link is sent on WhatsApp. It opens in your phone browser — no app needed.", hi: "समय तय होने के बाद WhatsApp पर निजी लिंक भेजा जाता है। यह फ़ोन के ब्राउज़र में खुलता है — कोई ऐप नहीं चाहिए।" } },
  { q: { en: "Will I get a prescription?", hi: "क्या पर्चा (प्रिस्क्रिप्शन) मिलेगा?" }, a: { en: "Yes, when clinically appropriate you receive a digitally signed e-prescription on WhatsApp or email.", hi: "हाँ, ज़रूरत होने पर डिजिटल हस्ताक्षरित ई-प्रिस्क्रिप्शन WhatsApp या ईमेल पर मिलता है।" } },
  { q: { en: "Can a family member talk to the doctor first?", hi: "क्या परिवार का सदस्य पहले डॉक्टर से बात कर सकता है?" }, a: { en: "Yes. Families of people with addiction or severe illness can book a consultation to get guidance.", hi: "हाँ। नशे या गंभीर बीमारी वाले मरीज़ों के परिजन मार्गदर्शन के लिए परामर्श बुक कर सकते हैं।" } },
  { q: { en: "Is my information confidential?", hi: "क्या मेरी जानकारी गोपनीय रहेगी?" }, a: { en: "Yes. Your details are protected under the Mental Healthcare Act, 2017 and stored securely.", hi: "हाँ। आपकी जानकारी मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत सुरक्षित रहती है।" } },
];

export const crisis = {
  title: { en: "In crisis or thinking of self-harm?", hi: "संकट में हैं या ख़ुद को नुकसान पहुँचाने के विचार आ रहे हैं?" },
  text: {
    en: "Please don't wait for an appointment. Call Tele-MANAS 14416 (free, 24×7) or 112, or go to the nearest hospital emergency.",
    hi: "अपॉइंटमेंट का इंतज़ार न करें। Tele-MANAS 14416 (निःशुल्क, 24×7) या 112 पर कॉल करें, या नज़दीकी अस्पताल की इमरजेंसी में जाएँ।",
  },
};

export const finalCta = {
  title: { en: "Taking the first step is the hardest part", hi: "पहला कदम उठाना ही सबसे मुश्किल होता है" },
  text: { en: "We are here when you are ready.", hi: "जब आप तैयार हों, हम यहाँ हैं।" },
};

export const footer = {
  quick: { en: "Quick links", hi: "ज़रूरी लिंक" },
  contact: { en: "Contact", hi: "संपर्क" },
  nasha: { en: "Nasha Mukti", hi: "नशा मुक्ति" },
  sexual: { en: "Sexual Health", hi: "गुप्त रोग" },
  resources: { en: "Resources", hi: "जानकारी केंद्र" },
  articles: { en: "Articles", hi: "लेख" },
  videos: { en: "Videos", hi: "वीडियो" },
  faq: { en: "FAQ", hi: "सवाल-जवाब" },
  disclaimer: {
    en: "Information on this website is for education and does not replace a personal medical consultation.",
    hi: "इस वेबसाइट की जानकारी केवल शिक्षा के लिए है; यह व्यक्तिगत चिकित्सा परामर्श का विकल्प नहीं है।",
  },
  doctorLogin: { en: "Doctor login", hi: "डॉक्टर लॉगिन" },
  rights: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
};

/** Homepage sections added for the master-prompt layout (order 1–15). */
export const homeSections = {
  brand: { en: "Neuro Mind Bloom", hi: "Neuro Mind Bloom" },
  contact: { en: "Contact", hi: "संपर्क करें" },
  viewProfile: { en: "View Full Doctor Profile", hi: "पूरी डॉक्टर प्रोफ़ाइल देखें" },
  highlights: { en: "Professional experience", hi: "पेशेवर अनुभव" },
  specialities: { label: { en: "Our specialities", hi: "हमारी विशेषज्ञता" }, title: { en: "Care for every stage of mental health", hi: "मानसिक स्वास्थ्य के हर पड़ाव के लिए देखभाल" } },
  specialityCards: [
    { href: "/conditions", title: { en: "Psychiatry", hi: "मनोरोग चिकित्सा" }, text: { en: "Depression, anxiety, OCD, bipolar, psychosis, sleep", hi: "डिप्रेशन, घबराहट, OCD, बाइपोलर, साइकोसिस, नींद" } },
    { href: "/nasha-mukti", title: { en: "De-addiction", hi: "नशा मुक्ति" }, text: { en: "Alcohol, afeem, doda, smack, ganja, tobacco, pills", hi: "शराब, अफ़ीम, डोडा, स्मैक, गांजा, तंबाकू, गोलियाँ" } },
    { href: "/gupt-rog-sexual-health", title: { en: "Sexual health", hi: "यौन स्वास्थ्य" }, text: { en: "PE, ED, Dhat, low desire — confidential", hi: "शीघ्रपतन, इरेक्शन, धात, कम इच्छा — गोपनीय" } },
    { href: "/child-psychiatrist-india", title: { en: "Child & adolescent", hi: "बच्चे और किशोर" }, text: { en: "ADHD, autism, learning, behaviour, teen mood", hi: "ADHD, ऑटिज़्म, पढ़ाई, व्यवहार, किशोरों का मूड" } },
    { href: "/student-mental-health", title: { en: "Students & young doctors", hi: "छात्र और युवा डॉक्टर" }, text: { en: "NEET, JEE, MBBS, NEET-PG, residency stress", hi: "NEET, JEE, MBBS, NEET-PG, रेज़िडेंसी का तनाव" } },
    { href: "/psychotherapy", title: { en: "Psychotherapy", hi: "साइकोथेरेपी" }, text: { en: "CBT, ERP, DBT skills, family and couples therapy", hi: "CBT, ERP, DBT स्किल्स, फ़ैमिली और कपल थेरेपी" } },
  ],
  deaddiction: { label: { en: "De-addiction services", hi: "नशा मुक्ति सेवाएँ" }, title: { en: "Scientific, confidential nasha mukti", hi: "वैज्ञानिक और गोपनीय नशा मुक्ति" }, text: { en: "Safe withdrawal management, anti-craving treatment, counselling and family guidance — most people are treated without admission.", hi: "सुरक्षित विड्रॉल प्रबंधन, तलब कम करने का इलाज, काउंसलिंग और परिवार का मार्गदर्शन — ज़्यादातर लोगों का इलाज बिना भर्ती के।" }, cta: { en: "Explore the Nasha Mukti centre", hi: "नशा मुक्ति केंद्र देखें" } },
  sexual: { label: { en: "Sexual health services", hi: "यौन स्वास्थ्य सेवाएँ" }, title: { en: "Respectful, scientific sexual health care", hi: "सम्मानजनक और वैज्ञानिक यौन स्वास्थ्य देखभाल" }, text: { en: "Private video consultation for men, women and couples — no judgement, no 'gupt rog' quackery.", hi: "पुरुषों, महिलाओं और जोड़ों के लिए निजी वीडियो परामर्श — बिना किसी झिझक, बिना झोलाछाप इलाज।" }, cta: { en: "Explore sexual health", hi: "यौन स्वास्थ्य देखें" } },
  tests: { label: { en: "Self-assessment centre", hi: "स्व-जाँच केंद्र" }, title: { en: "Free, private screening tests", hi: "निःशुल्क, निजी स्क्रीनिंग जाँच" }, all: { en: "All self-checks", hi: "सभी स्व-जाँच" } },
  experience: {
    label: { en: "Patient experience", hi: "मरीज़ों का अनुभव" },
    title: { en: "What you can expect", hi: "आपको क्या मिलेगा" },
    points: [
      { en: "Unhurried consultation — time to explain your concern fully", hi: "बिना जल्दबाज़ी परामर्श — अपनी बात पूरी तरह बताने का समय" },
      { en: "Clear explanation of the diagnosis and every option", hi: "बीमारी और हर विकल्प की साफ़ जानकारी" },
      { en: "Family involved only with your consent", hi: "परिवार को सिर्फ़ आपकी सहमति से शामिल किया जाता है" },
      { en: "Follow-up plan and WhatsApp e-prescription", hi: "फॉलो-अप योजना और WhatsApp पर ई-प्रिस्क्रिप्शन" },
    ],
    feedback: { en: "Share your feedback", hi: "अपना अनुभव बताएँ" },
  },
  recovery: { label: { en: "Recovery & wellness", hi: "रिकवरी और वेलनेस" }, title: { en: "Recovery is a journey — learn the skills", hi: "रिकवरी एक सफ़र है — ज़रूरी कौशल सीखें" }, stories: { en: "Recovery education", hi: "रिकवरी से जुड़ी जानकारी" } },
  articles: { label: { en: "Latest articles", hi: "नए लेख" }, title: { en: "Mental health, explained simply", hi: "मानसिक स्वास्थ्य, आसान भाषा में" }, all: { en: "All articles", hi: "सभी लेख" }, read: { en: "min read", hi: "मिनट पढ़ें" } },
  videos: { label: { en: "Educational videos", hi: "जानकारी वाले वीडियो" }, title: { en: "Learn from Dr. Kuldeep Budania on YouTube", hi: "YouTube पर डॉ. कुलदीप बुडानिया से सीखें" }, all: { en: "All videos", hi: "सभी वीडियो" }, play: { en: "Play video", hi: "वीडियो चलाएँ" } },
} as const;
