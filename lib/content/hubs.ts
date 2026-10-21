import type { L10n } from "../i18n";
import type { FaqItem } from "./types";

export type HubContent = {
  slug: string;
  title: L10n;
  h1: L10n;
  tagline: L10n;
  description: L10n;
  intro: L10n[];
  cardsTitle: L10n;
  cards: { title: L10n; sub: L10n; text: L10n; href: string; tag?: L10n }[];
  /** Detailed library pages linked as chips below the cards (condition slugs). */
  more?: { title: L10n; slugs: string[] };
  phasesTitle: L10n;
  phases: { title: L10n; duration: L10n; text: L10n; points: L10n[] }[];
  stepsTitle: L10n;
  stepsIntro: L10n;
  steps: { title: L10n; text: L10n }[];
  dangerTitle: L10n;
  danger: { title: L10n; text: L10n }[];
  myths: { myth: L10n; fact: L10n }[];
  privacy: L10n[];
  faqs: FaqItem[];
  selfTest?: "audit" | "tobacco";
  final: { title: L10n; text: L10n };
};

export const NASHA_MUKTI: HubContent = {
  slug: "nasha-mukti",
  title: { en: "Nasha Mukti – Medical De-addiction Treatment", hi: "नशा मुक्ति – डॉक्टरी इलाज से नशा छुड़ाएँ" },
  h1: { en: "Nasha Mukti — freedom from addiction is possible", hi: "नशा मुक्ति — अब छुटकारा संभव है" },
  tagline: {
    en: "Alcohol · Afeem · Doda post · Smack · Heroin · Ganja · Tobacco · Pills · Mobile & betting",
    hi: "शराब · अफ़ीम · डोडा पोस्त · स्मैक · हेरोइन · गांजा · तंबाकू · नशे की गोलियाँ · मोबाइल और सट्टा",
  },
  description: {
    en: "Scientific nasha mukti by Dr. Kuldeep Budania (MD Psychiatry): safe detox, anti-craving medicines, counselling and family guidance — confidential, in Hindi.",
    hi: "डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा) द्वारा वैज्ञानिक नशा मुक्ति: सुरक्षित डिटॉक्स, तलब कम करने की दवाएँ, काउंसलिंग और परिवार का मार्गदर्शन — पूरी गोपनीयता के साथ।",
  },
  intro: [
    {
      en: "Addiction is a disease of the brain. Just as diabetes is treated with medicine, addiction is treated with medicines, counselling and support — not with shame, force or unproven remedies.",
      hi: "नशा दिमाग़ की बीमारी है। जैसे डायबिटीज़ का इलाज दवा से होता है, वैसे ही नशे का इलाज दवाओं, काउंसलिंग और सहारे से होता है — शर्म, ज़बरदस्ती या बिना प्रमाण के नुस्ख़ों से नहीं।",
    },
    {
      en: "Most patients are treated without admission, many by video consultation from home.",
      hi: "ज़्यादातर मरीज़ों का इलाज बिना भर्ती के होता है, कई का घर बैठे वीडियो परामर्श से।",
    },
  ],
  cardsTitle: { en: "Which addictions are treated?", hi: "किन-किन नशों का इलाज होता है?" },
  cards: [
    { title: { en: "Alcohol", hi: "शराब" }, sub: { en: "Sharab / daru", hi: "दारू" }, text: { en: "Daily drinking, morning drink, tremors. Safe medical detox.", hi: "रोज़ पीना, सुबह की तलब, हाथ काँपना। सुरक्षित डॉक्टरी डिटॉक्स।" }, href: "/alcohol-addiction-treatment-india", tag: { en: "High risk if stopped suddenly", hi: "अचानक छोड़ना ख़तरनाक" } },
    { title: { en: "Afeem / Doda / Smack", hi: "अफ़ीम / डोडा / स्मैक" }, sub: { en: "Opium, poppy husk, heroin", hi: "ओपिऑइड" }, text: { en: "Body ache, loose motions on stopping. Comfortable detox and long-term medicines.", hi: "छोड़ने पर बदन दर्द, दस्त। आरामदायक डिटॉक्स और लंबे समय की दवाएँ।" }, href: "/opioid-smack-heroin-opium-doda-addiction-india" },
    { title: { en: "Tobacco / Gutka", hi: "तंबाकू / गुटखा" }, sub: { en: "Bidi, cigarette, khaini", hi: "बीड़ी, सिगरेट, खैनी" }, text: { en: "Nicotine replacement and medicines double quit success.", hi: "निकोटिन रिप्लेसमेंट और दवाओं से छोड़ने की सफलता दोगुनी।" }, href: "/tobacco-nicotine-addiction-treatment-india" },
    { title: { en: "Ganja / Charas / Bhang", hi: "गांजा / चरस / भांग" }, sub: { en: "Cannabis", hi: "कैनबिस" }, text: { en: "Can trigger psychosis in youth. Counselling and treatment.", hi: "युवाओं में मनोविकृति शुरू कर सकता है। काउंसलिंग और इलाज।" }, href: "/cannabis-ganja-charas-hash-addiction-india" },
    { title: { en: "Pills & Cough Syrup", hi: "नशे की गोलियाँ / कफ़ सिरप" }, sub: { en: "Sleeping pills, painkillers, cough syrups", hi: "नींद की गोली, दर्द निवारक, कफ़ सिरप" }, text: { en: "Supervised tapering — never stop suddenly.", hi: "निगरानी में धीरे-धीरे कमी — अचानक कभी न छोड़ें।" }, href: "/substance-use-disorders-treatment-india" },
    { title: { en: "Mobile, Gaming & Betting", hi: "मोबाइल, गेमिंग और सट्टा" }, sub: { en: "Behavioural addictions", hi: "व्यवहारिक लत" }, text: { en: "Same brain reward pathway as drugs. CBT and family plan.", hi: "नशे जैसा ही दिमाग़ी असर। CBT और परिवार की योजना।" }, href: "/gaming-disorder-treatment-india" },
  ],
  more: {
    title: { en: "Detailed guides by substance", hi: "हर नशे पर विस्तृत जानकारी" },
    slugs: [
      "alcohol-addiction-treatment-india",
      "opium-afeem-addiction-india",
      "doda-post-poppy-husk-addiction-india",
      "smack-addiction-treatment-india",
      "heroin-addiction-treatment-india",
      "ganja-addiction-treatment-india",
      "charas-addiction-treatment-india",
      "tobacco-nicotine-addiction-treatment-india",
      "nicotine-dependence-treatment-india",
      "prescription-drug-dependence-india",
      "sedative-sleeping-pill-dependence-india",
      "inhalant-solvent-whitener-abuse-india",
      "gaming-disorder-treatment-india",
      "gambling-disorder-treatment-india",
      "internet-addiction-treatment-india",
      "relapse-prevention-counselling-india",
    ],
  },
  phasesTitle: { en: "Treatment in 3 phases", hi: "3 चरणों में इलाज" },
  phases: [
    {
      title: { en: "Assessment & Detox", hi: "जाँच और डिटॉक्स (विषहरण)" },
      duration: { en: "Phase 1 · first days to 2 weeks", hi: "चरण 1 · शुरुआती दिन से 2 हफ़्ते" },
      text: { en: "Complete addiction history, physical check-up and blood tests, then medicines that keep withdrawal safe and comfortable.", hi: "नशे का पूरा इतिहास, शारीरिक जाँच और ख़ून की जाँच, फिर ऐसी दवाएँ जिनसे विदड्रॉल सुरक्षित और आरामदायक रहे।" },
      points: [
        { en: "Withdrawal scoring and monitoring", hi: "विदड्रॉल की स्कोरिंग और निगरानी" },
        { en: "Vitamin supplements (B1) for alcohol", hi: "शराब के लिए विटामिन B1" },
        { en: "Liver, HIV/hepatitis screening when needed", hi: "ज़रूरत पर लिवर, HIV/हेपेटाइटिस जाँच" },
      ],
    },
    {
      title: { en: "Anti-craving treatment", hi: "तलब (क्रेविंग) पर नियंत्रण" },
      duration: { en: "Phase 2 · 1–6 months", hi: "चरण 2 · 1–6 महीने" },
      text: { en: "After detox, the biggest challenge is craving. Medicines act on the brain's reward pathway to reduce craving, together with counselling.", hi: "डिटॉक्स के बाद सबसे बड़ी चुनौती तलब है। दवाएँ दिमाग़ के इनाम-तंत्र पर काम करके तलब कम करती हैं, साथ में काउंसलिंग।" },
      points: [
        { en: "Anti-craving medicines (alcohol) when suitable", hi: "उपयुक्त होने पर तलब कम करने वाली दवाएँ (शराब)" },
        { en: "Opioid substitution or anti-craving medicines (opioids) when suitable", hi: "उपयुक्त होने पर सब्स्टिट्यूशन थेरेपी या तलब कम करने वाली दवाएँ (अफ़ीम/स्मैक)" },
        { en: "Nicotine replacement and medicines (tobacco)", hi: "निकोटिन रिप्लेसमेंट और दवाएँ (तंबाकू)" },
        { en: "Motivational counselling and CBT", hi: "प्रेरक काउंसलिंग और CBT" },
      ],
    },
    {
      title: { en: "Relapse prevention", hi: "दोबारा नशा न हो" },
      duration: { en: "Phase 3 · 6–12 months and beyond", hi: "चरण 3 · 6–12 महीने और आगे" },
      text: { en: "Recovery means a new routine. We identify triggers — people, places, emotions — and build skills to handle them.", hi: "ठीक होने का मतलब है नई दिनचर्या। हम ट्रिगर — लोग, जगहें, भावनाएँ — पहचानते हैं और उनसे निपटने के कौशल बनाते हैं।" },
      points: [
        { en: "HALT: avoid being Hungry, Angry, Lonely, Tired", hi: "HALT: भूखे, गुस्से में, अकेले या थके न रहें" },
        { en: "Saying no to offers — practised in sessions", hi: "नशे की पेशकश पर 'ना' कहना — सत्रों में अभ्यास" },
        { en: "Family therapy and regular follow-up", hi: "परिवार थेरेपी और नियमित फॉलो-अप" },
        { en: "Treating depression, anxiety and sleep problems", hi: "डिप्रेशन, घबराहट और नींद की समस्या का इलाज" },
      ],
    },
  ],
  stepsTitle: { en: "A guide for families", hi: "परिवार के लिए मार्गदर्शन" },
  stepsIntro: { en: "\"Someone in my home is addicted — what should we do?\"", hi: "\"घर में कोई नशे का आदी है — क्या करें?\"" },
  steps: [
    { title: { en: "Talk when they are sober", hi: "होश में हों तब बात करें" }, text: { en: "Avoid arguments when the person is intoxicated. Speak calmly, with concern rather than blame.", hi: "नशे में बहस न करें। शांति से, दोष देने के बजाय फ़िक्र के साथ बात करें।" } },
    { title: { en: "Consult the doctor yourself first", hi: "पहले ख़ुद डॉक्टर से बात करें" }, text: { en: "Family members can consult without the patient to plan the approach.", hi: "परिवार मरीज़ के बिना भी परामर्श लेकर तरीका तय कर सकता है।" } },
    { title: { en: "Use the CRAFT approach", hi: "CRAFT तरीका अपनाएँ" }, text: { en: "Community Reinforcement and Family Training — reward sober behaviour, allow natural consequences. Many families succeed in bringing the person to treatment this way.", hi: "कम्युनिटी रीइन्फ़ोर्समेंट एंड फ़ैमिली ट्रेनिंग — होश वाले व्यवहार की तारीफ़ करें, नशे के नतीजे उसे ख़ुद झेलने दें। कई परिवार इसी तरह मरीज़ को इलाज तक ले आते हैं।" } },
    { title: { en: "Don't be an enabler", hi: "नशे में मदद न करें" }, text: { en: "Giving money for the substance or covering up consequences is not love — it keeps the addiction going. Set healthy boundaries.", hi: "नशे के लिए पैसे देना या उसके नतीजों पर पर्दा डालना प्यार नहीं — इससे लत बनी रहती है। सही सीमाएँ तय करें।" } },
    { title: { en: "Never give medicines secretly", hi: "चोरी-छिपे दवा कभी न दें" }, text: { en: "Hidden 'nasha chhudane ki dawa' in food can be dangerous. Treatment needs the doctor and, ideally, the patient's consent.", hi: "खाने में छिपाकर 'नशा छुड़ाने की दवा' देना ख़तरनाक हो सकता है। इलाज डॉक्टर की देखरेख और यथासंभव मरीज़ की सहमति से हो।" } },
  ],
  dangerTitle: { en: "Emergency signs — get medical help immediately (112)", hi: "ख़तरे के संकेत — तुरंत मेडिकल मदद लें (112)" },
  danger: [
    { title: { en: "Fits after stopping alcohol", hi: "शराब छोड़ने के बाद दौरे" }, text: { en: "Usually 6–48 hours after the last drink.", hi: "आमतौर पर आख़िरी पैग के 6–48 घंटे बाद।" } },
    { title: { en: "Confusion, seeing things, shaking (DTs)", hi: "भ्रम, चीज़ें दिखना, तेज़ काँपना (DTs)" }, text: { en: "Delirium tremens can be life-threatening if untreated.", hi: "डिलीरियम ट्रेमेंस का इलाज न हो तो जान को ख़तरा हो सकता है।" } },
    { title: { en: "Opioid overdose", hi: "अफ़ीम/स्मैक का ओवरडोज़" }, text: { en: "Unconscious, very slow breathing, blue lips — call 112.", hi: "बेहोशी, बहुत धीमी साँस, नीले होंठ — 112 पर कॉल करें।" } },
    { title: { en: "Suicidal thoughts", hi: "आत्महत्या के विचार" }, text: { en: "Call Tele-MANAS 14416 (24×7, free) or 112.", hi: "Tele-MANAS 14416 (24×7, निःशुल्क) या 112 पर कॉल करें।" } },
  ],
  myths: [
    { myth: { en: "\"Just use willpower — why see a doctor?\"", hi: "\"बस इच्छाशक्ति से छोड़ दो — डॉक्टर की क्या ज़रूरत?\"" }, fact: { en: "Addiction changes brain chemistry. Willpower alone usually fails; medical treatment greatly improves success.", hi: "नशा दिमाग़ के रसायन बदल देता है। अकेली इच्छाशक्ति अक्सर नाकाम रहती है; डॉक्टरी इलाज से सफलता बहुत बढ़ती है।" } },
    { myth: { en: "\"If I tell the doctor, there will be a police case.\"", hi: "\"डॉक्टर को बताया तो पुलिस केस बन जाएगा।\"" }, fact: { en: "Treatment is confidential under the Mental Healthcare Act, 2017. Doctors do not report patients seeking treatment.", hi: "मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत इलाज गोपनीय है। इलाज लेने वाले मरीज़ की जानकारी डॉक्टर पुलिस को नहीं देते।" } },
    { myth: { en: "\"Treatment medicines are just another addiction.\"", hi: "\"दवाओं से नशा छुड़ाना मतलब एक नशे की जगह दूसरा।\"" }, fact: { en: "Opioid substitution and anti-craving medicines are on the WHO essential medicines list, given in controlled doses under supervision.", hi: "सब्स्टिट्यूशन और तलब कम करने वाली दवाएँ WHO की आवश्यक दवाओं की सूची में हैं और निगरानी में नियंत्रित डोज़ में दी जाती हैं।" } },
    { myth: { en: "\"Elders took afeem too — what's the problem?\"", hi: "\"अफ़ीम तो बड़े-बुज़ुर्ग भी खाते थे — क्या समस्या है?\"" }, fact: { en: "Daily dependence, withdrawal and harm to health and family make it a disease — and it is treatable.", hi: "रोज़ की निर्भरता, विदड्रॉल और सेहत व परिवार को नुकसान — यह बीमारी है, और इसका इलाज संभव है।" } },
    { myth: { en: "\"Jhaad-phoonk or a taveez will cure it.\"", hi: "\"झाड़-फूँक या ताबीज़ से छूट जाएगी।\"" }, fact: { en: "Addiction is a neurobiological condition. Scientific treatment works; delays make it harder.", hi: "नशा एक न्यूरो-बायोलॉजिकल बीमारी है। वैज्ञानिक इलाज काम करता है; देर करने से मुश्किल बढ़ती है।" } },
    { myth: { en: "\"Once an addict, always an addict.\"", hi: "\"एक बार नशेड़ी, हमेशा नशेड़ी।\"" }, fact: { en: "Many people achieve long-term recovery with proper treatment and support.", hi: "सही इलाज और सहारे से बहुत से लोग लंबे समय तक नशा-मुक्त रहते हैं।" } },
  ],
  privacy: [
    { en: "Protected under the Mental Healthcare Act, 2017", hi: "मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत सुरक्षित" },
    { en: "Nothing is shared with family, employer or anyone without your consent", hi: "आपकी अनुमति के बिना परिवार, नौकरी या किसी को कुछ नहीं बताया जाता" },
    { en: "Private video consultation — no one needs to know you visited", hi: "निजी वीडियो परामर्श — किसी को पता चलने की ज़रूरत नहीं" },
  ],
  faqs: [
    { q: { en: "How long does nasha mukti take?", hi: "नशा मुक्ति में कितना समय लगता है?" }, a: { en: "Detox takes days to two weeks; anti-craving and relapse-prevention usually continue for 6–12 months.", hi: "डिटॉक्स कुछ दिन से दो हफ़्ते; तलब नियंत्रण और दोबारा नशा न होने का इलाज आमतौर पर 6–12 महीने।" } },
    { q: { en: "Is admission required?", hi: "क्या भर्ती होना ज़रूरी है?" }, a: { en: "Usually not. Admission is advised only for severe withdrawal, fits, delirium or other medical risk.", hi: "आमतौर पर नहीं। भर्ती की सलाह सिर्फ़ गंभीर विदड्रॉल, दौरे, भ्रम या दूसरे मेडिकल ख़तरे में।" } },
    { q: { en: "What does treatment cost?", hi: "इलाज का ख़र्च कितना है?" }, a: { en: "Consultation is ₹500; medicines and tests depend on the individual plan. Concessions are available for financial difficulty.", hi: "परामर्श ₹500; दवाओं और जाँच का ख़र्च व्यक्तिगत योजना पर निर्भर। आर्थिक कठिनाई में छूट उपलब्ध।" } },
    { q: { en: "Can depression be treated along with addiction?", hi: "क्या नशे के साथ डिप्रेशन का भी इलाज होता है?" }, a: { en: "Yes — treating both together improves recovery.", hi: "हाँ — दोनों का साथ इलाज करने से सुधार बेहतर होता है।" } },
  ],
  selfTest: "audit",
  final: {
    title: { en: "A new life can start with one call.", hi: "नई ज़िंदगी की शुरुआत एक कॉल से हो सकती है।" },
    text: {
      en: "Whatever the substance and however long it has been — treatment works. The first step is yours.",
      hi: "नशा कोई भी हो, कितना भी पुराना हो — इलाज काम करता है। पहला कदम आपका है।",
    },
  },
};

export const SEXUAL_HEALTH: HubContent = {
  slug: "gupt-rog-sexual-health",
  title: { en: "Gupt Rog & Sexual Health – Confidential Treatment", hi: "गुप्त रोग और यौन स्वास्थ्य – गोपनीय इलाज" },
  h1: { en: "Gupt rog? Get scientific, confidential treatment", hi: "गुप्त रोग? वैज्ञानिक और गोपनीय इलाज पाएँ" },
  tagline: {
    en: "Early ejaculation · Erection problems · Dhat · Swapnadosh · Low desire · Performance anxiety",
    hi: "शीघ्रपतन · इरेक्शन की समस्या · धात · स्वप्नदोष · इच्छा की कमी · परफॉर्मेंस की घबराहट",
  },
  description: {
    en: "Confidential, scientific treatment for sexual problems by Dr. Kuldeep Budania (MD Psychiatry) — no fake 'power' medicines, no judgement.",
    hi: "डॉ. कुलदीप बुडानिया (MD मनोचिकित्सा) द्वारा यौन समस्याओं का गोपनीय, वैज्ञानिक इलाज — न नक़ली 'ताक़त' की दवाएँ, न कोई जजमेंट।",
  },
  intro: [
    { en: "Sexual problems are among the most common reasons people suffer silently. Most are linked to anxiety, myths, lifestyle or relationship stress — and almost all are treatable.", hi: "यौन समस्याएँ उन आम वजहों में से हैं जिनसे लोग चुपचाप परेशान रहते हैं। ज़्यादातर घबराहट, भ्रम, जीवनशैली या रिश्तों के तनाव से जुड़ी होती हैं — और लगभग सबका इलाज संभव है।" },
    { en: "Roadside 'gupt rog' clinics and advertisements often sell mixtures with hidden steroids. A qualified doctor's treatment is safer and more effective.", hi: "सड़क किनारे के 'गुप्त रोग' क्लीनिक और विज्ञापन अक्सर छिपे स्टेरॉयड वाली दवाएँ बेचते हैं। योग्य डॉक्टर का इलाज ज़्यादा सुरक्षित और असरदार है।" },
  ],
  cardsTitle: { en: "Problems we treat", hi: "किन समस्याओं का इलाज होता है" },
  cards: [
    { title: { en: "Premature ejaculation", hi: "शीघ्रपतन" }, sub: { en: "Early discharge", hi: "जल्दी डिस्चार्ज" }, text: { en: "Behavioural techniques and proven medicines.", hi: "व्यवहारिक तकनीकें और प्रमाणित दवाएँ।" }, href: "/premature-ejaculation-treatment-india" },
    { title: { en: "Erection problems", hi: "इरेक्शन की समस्या" }, sub: { en: "Erectile dysfunction", hi: "स्तंभन दोष" }, text: { en: "Check for sugar/BP, safe medicines, anxiety treatment.", hi: "शुगर/BP की जाँच, सुरक्षित दवाएँ, घबराहट का इलाज।" }, href: "/erectile-dysfunction-treatment-india" },
    { title: { en: "Dhat & swapnadosh worry", hi: "धात और स्वप्नदोष की चिंता" }, sub: { en: "Dhat syndrome", hi: "धात रोग" }, text: { en: "Facts that remove fear; treatment of anxiety and weakness.", hi: "डर दूर करने वाली सही जानकारी; घबराहट और कमज़ोरी का इलाज।" }, href: "/dhat-syndrome-treatment-india" },
    { title: { en: "Porn & masturbation concerns", hi: "पोर्न और हस्तमैथुन की चिंता" }, sub: { en: "Compulsive use, guilt", hi: "बेकाबू आदत, अपराध-बोध" }, text: { en: "Non-judgemental help to regain control.", hi: "बिना जजमेंट के नियंत्रण वापस पाने में मदद।" }, href: "/problematic-pornography-use-treatment-india" },
    { title: { en: "Low desire & couple issues", hi: "इच्छा में कमी और दंपति की समस्या" }, sub: { en: "Men and women", hi: "पुरुष और महिलाएँ" }, text: { en: "Assessment of mood, hormones and relationship; couple therapy.", hi: "मूड, हार्मोन और रिश्ते की जाँच; दंपति थेरेपी।" }, href: "/sex-specialist-india" },
    { title: { en: "Pre-marriage fears", hi: "शादी से पहले की चिंता" }, sub: { en: "Performance anxiety", hi: "परफॉर्मेंस की घबराहट" }, text: { en: "Correct information and confidence-building.", hi: "सही जानकारी और आत्मविश्वास बढ़ाना।" }, href: "/sex-specialist-india" },
  ],
  more: {
    title: { en: "Detailed guides", hi: "विस्तृत जानकारी" },
    slugs: [
      "premature-ejaculation-treatment-india",
      "erectile-dysfunction-treatment-india",
      "delayed-ejaculation-treatment-india",
      "low-sexual-desire-india",
      "dhat-syndrome-treatment-india",
      "sexual-performance-anxiety-india",
      "vaginismus-sexual-pain-india",
      "female-sexual-interest-arousal-india",
      "relationship-difficulties-counselling-india",
      "sexual-health-myths-india",
      "psychosexual-counselling-india",
      "couples-therapy-india",
    ],
  },
  phasesTitle: { en: "How treatment works", hi: "इलाज कैसे होता है" },
  phases: [
    { title: { en: "Private assessment", hi: "निजी जाँच" }, duration: { en: "Step 1", hi: "चरण 1" }, text: { en: "A one-to-one video consultation in Hindi or English. You can speak openly.", hi: "हिंदी या अंग्रेज़ी में आमने-सामने वीडियो परामर्श। आप खुलकर बात कर सकते हैं।" }, points: [{ en: "Medical, psychological and relationship history", hi: "शारीरिक, मानसिक और रिश्तों का इतिहास" }, { en: "Blood tests only if needed", hi: "ज़रूरत हो तभी ख़ून की जाँच" }] },
    { title: { en: "Correct information", hi: "सही जानकारी" }, duration: { en: "Step 2", hi: "चरण 2" }, text: { en: "Removing myths about dhat, masturbation and 'weakness' often reduces anxiety immediately.", hi: "धात, हस्तमैथुन और 'कमज़ोरी' के भ्रम दूर होने से अक्सर तुरंत घबराहट कम होती है।" }, points: [{ en: "Partner can join if you wish", hi: "चाहें तो साथी भी शामिल हो सकते हैं" }] },
    { title: { en: "Treatment & follow-up", hi: "इलाज और फॉलो-अप" }, duration: { en: "Step 3", hi: "चरण 3" }, text: { en: "Proven medicines when suitable, sex-therapy techniques, and treatment of anxiety, depression or addiction.", hi: "उपयुक्त होने पर प्रमाणित दवाएँ, सेक्स थेरेपी तकनीकें, और घबराहट, डिप्रेशन या नशे का इलाज।" }, points: [{ en: "E-prescription on WhatsApp", hi: "WhatsApp पर ई-प्रिस्क्रिप्शन" }, { en: "Follow-up until improvement", hi: "सुधार तक फॉलो-अप" }] },
  ],
  stepsTitle: { en: "Simple steps that help", hi: "आसान कदम जो मदद करते हैं" },
  stepsIntro: { en: "Alongside treatment:", hi: "इलाज के साथ:" },
  steps: [
    { title: { en: "Quit tobacco and limit alcohol", hi: "तंबाकू छोड़ें, शराब कम करें" }, text: { en: "Both damage blood flow and sexual function.", hi: "दोनों ख़ून के बहाव और यौन क्षमता को नुकसान पहुँचाते हैं।" } },
    { title: { en: "Exercise and sleep well", hi: "व्यायाम करें, अच्छी नींद लें" }, text: { en: "Fitness improves stamina, mood and confidence.", hi: "फ़िटनेस से स्टैमिना, मूड और आत्मविश्वास बढ़ता है।" } },
    { title: { en: "Talk with your partner", hi: "साथी से बात करें" }, text: { en: "Pressure and silence worsen performance anxiety.", hi: "दबाव और चुप्पी परफॉर्मेंस की घबराहट बढ़ाते हैं।" } },
    { title: { en: "Avoid unknown 'power' medicines", hi: "अनजान 'ताक़त' की दवाओं से बचें" }, text: { en: "Hidden steroids and heavy metals can harm the liver and kidneys.", hi: "छिपे स्टेरॉयड और भारी धातुएँ लिवर और किडनी को नुकसान पहुँचा सकते हैं।" } },
  ],
  dangerTitle: { en: "See a doctor promptly if", hi: "तुरंत डॉक्टर को दिखाएँ अगर" },
  danger: [
    { title: { en: "Painful erection lasting over 4 hours", hi: "4 घंटे से ज़्यादा दर्दनाक इरेक्शन" }, text: { en: "Medical emergency (priapism).", hi: "मेडिकल इमरजेंसी (प्रायपिज़्म)।" } },
    { title: { en: "Chest pain during sex", hi: "संबंध के दौरान सीने में दर्द" }, text: { en: "Stop and seek urgent care.", hi: "रुकें और तुरंत इलाज लें।" } },
    { title: { en: "Sores, discharge or burning urine", hi: "घाव, स्राव या पेशाब में जलन" }, text: { en: "May be an infection — see a skin/STD or urology specialist.", hi: "संक्रमण हो सकता है — त्वचा/STD या यूरोलॉजी विशेषज्ञ को दिखाएँ।" } },
  ],
  myths: [
    { myth: { en: "\"Losing dhat makes the body weak.\"", hi: "\"धात गिरने से शरीर कमज़ोर हो जाता है।\"" }, fact: { en: "Semen is continuously produced; its loss does not cause weakness. The worry itself causes symptoms.", hi: "वीर्य लगातार बनता रहता है; उसके निकलने से कमज़ोरी नहीं आती। चिंता ही लक्षण पैदा करती है।" } },
    { myth: { en: "\"Masturbation causes impotence.\"", hi: "\"हस्तमैथुन से नपुंसकता होती है।\"" }, fact: { en: "It does not. It is a normal behaviour unless it becomes compulsive.", hi: "ऐसा नहीं होता। यह सामान्य व्यवहार है, जब तक मजबूरी न बन जाए।" } },
    { myth: { en: "\"Sexual problems mean something is permanently wrong.\"", hi: "\"यौन समस्या का मतलब हमेशा की ख़राबी।\"" }, fact: { en: "Most problems are temporary and respond well to treatment.", hi: "ज़्यादातर समस्याएँ अस्थायी होती हैं और इलाज से ठीक होती हैं।" } },
    { myth: { en: "\"Herbal power capsules are harmless.\"", hi: "\"हर्बल ताक़त कैप्सूल नुकसान नहीं करते।\"" }, fact: { en: "Many unregulated products contain undeclared drugs. Use only prescribed treatment.", hi: "कई अनियमित उत्पादों में बिना बताए दवाएँ होती हैं। सिर्फ़ डॉक्टर की लिखी दवा लें।" } },
  ],
  privacy: [
    { en: "One-to-one private video consultation", hi: "आमने-सामने निजी वीडियो परामर्श" },
    { en: "Details never shared without your consent", hi: "आपकी अनुमति के बिना कोई जानकारी साझा नहीं" },
    { en: "Discreet prescription on your WhatsApp", hi: "आपके WhatsApp पर गोपनीय पर्चा" },
  ],
  faqs: [
    { q: { en: "Why does a psychiatrist treat sexual problems?", hi: "मनोचिकित्सक यौन समस्याओं का इलाज क्यों करते हैं?" }, a: { en: "Psychosexual medicine is part of psychiatry, and anxiety, mood and relationships are central to most sexual problems.", hi: "साइकोसेक्सुअल मेडिसिन मनोचिकित्सा का हिस्सा है, और ज़्यादातर यौन समस्याओं में घबराहट, मूड और रिश्ते केंद्र में होते हैं।" } },
    { q: { en: "Do women consult too?", hi: "क्या महिलाएँ भी परामर्श लेती हैं?" }, a: { en: "Yes — for low desire, pain, lack of satisfaction or relationship concerns.", hi: "हाँ — इच्छा की कमी, दर्द, संतुष्टि न होना या रिश्तों की चिंता के लिए।" } },
    { q: { en: "What is the fee?", hi: "फीस कितनी है?" }, a: { en: "Consultation ₹500. Sex/couple therapy sessions: ₹1500 first session, ₹1000 follow-up.", hi: "परामर्श ₹500। सेक्स/दंपति थेरेपी: पहला सत्र ₹1500, फॉलो-अप ₹1000।" } },
  ],
  final: {
    title: { en: "Don't suffer in silence.", hi: "चुपचाप परेशान न रहें।" },
    text: {
      en: "Talk privately to a qualified specialist — most problems improve quickly with the right treatment.",
      hi: "योग्य विशेषज्ञ से निजी तौर पर बात करें — सही इलाज से ज़्यादातर समस्याएँ जल्दी सुधरती हैं।",
    },
  },
};

export const HUBS = [NASHA_MUKTI, SEXUAL_HEALTH];
