import type { ConditionContent, ExtraSection } from "../types";
import type { L10n } from "../../i18n";
import { b, faq, topUpFaqs } from "./_h";

/**
 * Substance-specific de-addiction pages. Each page carries the sections the brief asks for:
 * dependence, withdrawal (warning tone where withdrawal can be dangerous), health consequences
 * and relapse prevention — as `extra` sections — plus symptoms, treatment, family support and
 * when to seek help. No doses or self-detox instructions are given anywhere.
 */

function sections(o: { dependence: L10n[]; withdrawal: L10n[]; withdrawalTitle?: L10n; warn?: boolean; health: L10n[]; relapse?: L10n[] }): ExtraSection[] {
  return [
    { id: "dependence", title: b("Signs of dependence", "निर्भरता (लत) के संकेत"), items: o.dependence },
    {
      id: "withdrawal",
      title: o.withdrawalTitle ?? b("Withdrawal symptoms", "छोड़ने पर होने वाले लक्षण (विड्रॉल)"),
      items: o.withdrawal,
      tone: o.warn ? "warning" : "info",
    },
    { id: "health", title: b("Health consequences", "सेहत पर असर"), items: o.health },
    { id: "relapse", title: b("Relapse prevention", "दोबारा नशा शुरू होने से बचाव"), items: o.relapse ?? RELAPSE },
  ];
}

const RELAPSE: L10n[] = [
  b("Identify triggers — people, places, stress, celebrations, payday — and plan for them", "ट्रिगर पहचानें — लोग, जगहें, तनाव, शादी-समारोह, तनख़्वाह का दिन — और उनके लिए योजना बनाएँ"),
  b("Continue medicines and follow-up even after feeling better", "ठीक महसूस होने पर भी दवा और फॉलो-अप जारी रखें"),
  b("Replace old routines: exercise, work, religious or social activities", "पुरानी आदतों की जगह नई: व्यायाम, काम, धार्मिक या सामाजिक गतिविधियाँ"),
  b("A slip is not failure — contact the doctor early rather than hiding it", "एक बार फिसलना हार नहीं — छिपाने के बजाय जल्दी डॉक्टर से संपर्क करें"),
];

const DEPENDENCE_COMMON: L10n[] = [
  b("Strong craving and difficulty controlling the amount", "तेज़ तलब और मात्रा पर नियंत्रण न रहना"),
  b("Needing more for the same effect (tolerance)", "उसी असर के लिए ज़्यादा मात्रा चाहिए (टॉलरेंस)"),
  b("Continuing despite harm to health, money or family", "सेहत, पैसे या परिवार को नुकसान के बावजूद जारी रखना"),
];

const FAMILY_SUBSTANCE: L10n[] = [
  b("Talk when the person is sober; express concern without insults or threats", "जब व्यक्ति होश में हो तब बात करें; बिना गाली या धमकी के चिंता जताएँ"),
  b("Do not give money that may be used for drugs; avoid covering up consequences", "ऐसे पैसे न दें जो नशे में जा सकते हैं; नतीजों पर पर्दा न डालें"),
  b("Do not try home detox or lock the person in a room — seek medical help", "घर पर अपने आप नशा छुड़ाने या कमरे में बंद करने की कोशिश न करें — डॉक्टरी मदद लें"),
  b("Look after your own health; family counselling helps everyone", "अपनी सेहत का भी ध्यान रखें; फ़ैमिली काउंसलिंग सबकी मदद करती है"),
];

const OPIOID_WITHDRAWAL: L10n[] = [
  b("Body aches, yawning, runny nose, watering eyes, goosebumps", "बदन दर्द, जम्हाई, नाक बहना, आँखों से पानी, रोंगटे खड़े होना"),
  b("Loose motions, vomiting, abdominal cramps, sleeplessness, restlessness", "दस्त, उल्टी, पेट में ऐंठन, नींद न आना, बेचैनी"),
  b("Usually starts within hours to a day of the last use; very distressing though rarely life-threatening in healthy adults", "आमतौर पर आख़िरी डोज़ के कुछ घंटों से एक दिन में शुरू; बहुत तकलीफ़देह पर स्वस्थ वयस्कों में शायद ही जानलेवा"),
  b("Dehydration from vomiting and diarrhoea, pregnancy, heart disease or older age need medical supervision", "उल्टी-दस्त से पानी की कमी, गर्भावस्था, दिल की बीमारी या ज़्यादा उम्र में डॉक्टर की निगरानी ज़रूरी"),
  b("Overdose risk is HIGH after detox or jail because tolerance falls — using the old amount can stop breathing", "नशा छोड़ने या जेल के बाद ओवरडोज़ का ख़तरा बहुत ज़्यादा होता है क्योंकि सहनशक्ति घट जाती है — पुरानी मात्रा से साँस रुक सकती है"),
];

const OPIOID_TREATMENT: L10n[] = [
  b("Medically supervised withdrawal with medicines that ease symptoms", "डॉक्टर की निगरानी में दवाओं के साथ नशा छुड़ाना, जिससे लक्षण कम हों"),
  b("Opioid substitution therapy (OST) with long-acting prescribed medicines — an evidence-based long-term option, also available at government OST centres", "लंबे असर वाली डॉक्टरी दवाओं से ओपिऑइड सब्स्टिट्यूशन थेरेपी (OST) — प्रमाणित लंबा इलाज, सरकारी OST केंद्रों पर भी उपलब्ध"),
  b("Anti-craving (relapse-prevention) medicines after detox, as prescribed", "डॉक्टर की सलाह से, नशा छोड़ने के बाद तलब कम करने (रिलैप्स रोकने) वाली दवाएँ"),
  b("Treatment of depression, anxiety, pain and sleep problems", "डिप्रेशन, एंग्ज़ाइटी, दर्द और नींद की समस्या का इलाज"),
];

const OPIOID_PSYCHO: L10n[] = [
  b("Motivational interviewing and relapse-prevention counselling", "मोटिवेशनल इंटरव्यूइंग और रिलैप्स-प्रिवेंशन काउंसलिंग"),
  b("Family counselling and support groups", "फ़ैमिली काउंसलिंग और सपोर्ट ग्रुप"),
];

const OPIOID_ICD = { icd10: "F11", icd11: "6C43" };

const CANNABIS_WITHDRAWAL: L10n[] = [
  b("Irritability, anger, anxiety and restlessness", "चिड़चिड़ापन, ग़ुस्सा, घबराहट और बेचैनी"),
  b("Poor sleep and vivid dreams, reduced appetite", "ख़राब नींद और अजीब सपने, भूख कम"),
  b("Usually peaks in the first week and settles over 2–4 weeks", "आमतौर पर पहले हफ़्ते में सबसे ज़्यादा और 2–4 हफ़्ते में शांत"),
];

const CANNABIS_HEALTH: L10n[] = [
  b("Psychosis (suspiciousness, hearing voices), especially with heavy use or high-potency forms", "साइकोसिस (शक, आवाज़ें सुनना), ख़ासकर ज़्यादा या तेज़ असर वाले रूपों से"),
  b("Poor memory, concentration and motivation; falling academic or work performance", "कमज़ोर याददाश्त, ध्यान और प्रेरणा; पढ़ाई या काम में गिरावट"),
  b("Anxiety, panic and depression; lung irritation when smoked with tobacco", "एंग्ज़ाइटी, घबराहट और डिप्रेशन; तंबाकू के साथ पीने पर फेफड़ों में जलन"),
  b("Road accidents when driving intoxicated", "नशे में गाड़ी चलाने पर सड़क दुर्घटनाएँ"),
];

const CANNABIS_TREATMENT: L10n[] = [
  b("Motivational counselling and a quit plan", "मोटिवेशनल काउंसलिंग और छोड़ने की योजना"),
  b("Short-term medicines for sleep or anxiety during withdrawal, if needed", "ज़रूरत हो तो छोड़ते समय नींद या घबराहट के लिए थोड़े समय की दवाएँ"),
  b("Treatment of psychosis, depression or anxiety if present", "साइकोसिस, डिप्रेशन या एंग्ज़ाइटी हो तो उसका इलाज"),
];

const SEDATIVE_WARNING: L10n[] = [
  b("Never stop sleeping pills or anti-anxiety tablets (benzodiazepines and similar medicines) suddenly after regular use.", "नियमित इस्तेमाल के बाद नींद की गोलियाँ या घबराहट की गोलियाँ (बेंज़ोडायज़ेपीन और मिलती-जुलती दवाएँ) अचानक कभी बंद न करें।"),
  b("Sudden stopping can cause severe anxiety, tremors, confusion and seizures (fits) that may be life-threatening.", "अचानक बंद करने से तेज़ घबराहट, कंपकंपी, भ्रम और दौरे पड़ सकते हैं जो जानलेवा हो सकते हैं।"),
  b("Reduction must be gradual and medically supervised. Seek emergency care for fits, confusion or seeing things.", "कमी धीरे-धीरे और डॉक्टर की निगरानी में होनी चाहिए। दौरे, भ्रम या चीज़ें दिखने पर तुरंत इमरजेंसी जाएँ।"),
  b("Mixing sedatives with alcohol or opioids can stop breathing.", "नींद की दवाओं को शराब या ओपिऑइड के साथ लेने से साँस रुक सकती है।"),
];

const PAGES: ConditionContent[] = [
  {
    slug: "opium-afeem-addiction-india",
    category: "addiction",
    group: "substance",
    name: b("Opium (afeem) addiction", "अफ़ीम की लत"),
    title: b("Opium (Afeem) Addiction – Withdrawal & Treatment in Rajasthan", "अफ़ीम की लत – छोड़ने के लक्षण और इलाज (राजस्थान)"),
    h1: b("Opium (afeem) addiction: treatment and recovery", "अफ़ीम की लत: इलाज और सुधार"),
    description: b(
      "Daily afeem use, body pain and loose motions when you stop? Opium dependence is treatable with supervised withdrawal, substitution therapy and counselling.",
      "रोज़ अफ़ीम, छोड़ने पर बदन दर्द और दस्त? अफ़ीम की लत का इलाज निगरानी में नशा छुड़ाने, सब्स्टिट्यूशन थेरेपी और काउंसलिंग से संभव है।"
    ),
    intro: [
      b("In parts of Rajasthan, opium has long been offered socially — at weddings, condolence gatherings (\"manuhar\") or to elders for pain. Regular use, even in small amounts, can lead to dependence.", "राजस्थान के कुछ हिस्सों में अफ़ीम लंबे समय से सामाजिक रूप से दी जाती रही है — शादियों, बैठकों (\"मनुहार\") में या बुज़ुर्गों को दर्द के लिए। नियमित इस्तेमाल, कम मात्रा में भी, लत बना सकता है।"),
      b("Opium is an opioid, like doda post, smack and heroin. Dependence is a medical condition, and effective treatments are available without hospital admission for many people.", "अफ़ीम एक ओपिऑइड है, जैसे डोडा पोस्त, स्मैक और हेरोइन। लत एक बीमारी है, और कई लोगों के लिए बिना भर्ती के भी असरदार इलाज उपलब्ध है।"),
    ],
    symptoms: [
      b("Taking afeem daily, often at fixed times", "रोज़ अफ़ीम लेना, अक्सर तय समय पर"),
      b("Feeling unable to work or get up without it", "इसके बिना काम करने या उठने में असमर्थ महसूस करना"),
      b("Constipation, drowsiness, reduced appetite and sexual problems", "क़ब्ज़, सुस्ती, भूख कम और यौन समस्याएँ"),
      b("Body pain, yawning and loose motions when a dose is missed", "डोज़ छूटने पर बदन दर्द, जम्हाई और दस्त"),
    ],
    causes: [
      b("Social and ceremonial use becoming daily use", "सामाजिक और रस्मी इस्तेमाल का रोज़ की आदत बनना"),
      b("Self-treating pain, cough, sleep problems or hard physical work", "दर्द, खाँसी, नींद या कड़ी मेहनत के लिए अपने आप इलाज"),
      b("Opioid effects on the brain's reward and pain systems", "दिमाग़ के इनाम और दर्द तंत्र पर ओपिऑइड का असर"),
    ],
    riskFactors: [
      b("Easy availability in the family or community", "परिवार या समाज में आसानी से मिलना"),
      b("Chronic pain, depression or anxiety", "पुराना दर्द, डिप्रेशन या एंग्ज़ाइटी"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON, b("Spending large amounts of money or selling assets for afeem", "अफ़ीम के लिए बहुत पैसा ख़र्च करना या चीज़ें बेचना")],
      withdrawal: OPIOID_WITHDRAWAL,
      health: [
        b("Severe constipation, poor nutrition, low hormones and sexual problems", "गंभीर क़ब्ज़, कुपोषण, हार्मोन कम होना और यौन समस्याएँ"),
        b("Dangerous drowsiness when combined with alcohol or sleeping pills", "शराब या नींद की गोलियों के साथ ख़तरनाक सुस्ती"),
        b("Risk to babies when used in pregnancy — needs specialist care, not sudden stopping", "गर्भावस्था में बच्चे को ख़तरा — अचानक बंद करना नहीं, विशेषज्ञ इलाज ज़रूरी"),
      ],
    }),
    diagnosis: [
      b("History of amount, duration and previous quit attempts", "मात्रा, अवधि और पहले छोड़ने की कोशिशों की जानकारी"),
      b("Physical examination, liver and other tests as needed", "शारीरिक जाँच, ज़रूरत हो तो लिवर और दूसरी जाँचें"),
      b("Urine drug screen where helpful", "ज़रूरत हो तो पेशाब में नशे की जाँच"),
    ],
    icd: OPIOID_ICD,
    treatment: OPIOID_TREATMENT,
    psychotherapy: OPIOID_PSYCHO,
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Daily use or withdrawal symptoms on missing a dose", "रोज़ का इस्तेमाल या डोज़ छूटने पर लक्षण"),
      b("Older adults or those with heart, lung or kidney disease wanting to stop", "बुज़ुर्ग या दिल, फेफड़े या किडनी की बीमारी वाले जो छोड़ना चाहते हैं"),
      b("Extreme drowsiness, slow breathing or unconsciousness — emergency", "बहुत ज़्यादा सुस्ती, धीमी साँस या बेहोशी — इमरजेंसी"),
    ],
    faqs: [
      faq("My father has taken afeem for 20 years. Can he still quit?", "पिताजी 20 साल से अफ़ीम ले रहे हैं। क्या अब भी छोड़ सकते हैं?", "Yes. Long-term users can recover, usually with gradual, supervised treatment and, for some, substitution therapy.", "हाँ। लंबे समय से लेने वाले भी ठीक होते हैं, आमतौर पर धीरे-धीरे, निगरानी वाले इलाज से और कुछ में सब्स्टिट्यूशन थेरेपी से।"),
      faq("Is afeem safe because it is natural?", "क्या प्राकृतिक होने से अफ़ीम सुरक्षित है?", "No. Natural opium contains morphine and causes the same dependence as other opioids.", "नहीं। प्राकृतिक अफ़ीम में मॉर्फ़ीन होता है और यह दूसरे ओपिऑइड जैसी ही लत लगाता है।"),
    ],
    related: ["doda-post-poppy-husk-addiction-india", "opioid-smack-heroin-opium-doda-addiction-india", "deaddiction-psychiatrist-india", "relapse-prevention-counselling-india"],
    selfTests: ["drugs"],
    articles: ["helping-family-member-with-addiction"],
    videoKeywords: ["afeem", "अफ़ीम", "opium", "nasha"],
    keywords: ["afeem", "afim", "amal", "kali goli", "opium", "manuhar"],
  },
  {
    slug: "doda-post-poppy-husk-addiction-india",
    category: "addiction",
    group: "substance",
    name: b("Doda post (poppy husk) addiction", "डोडा पोस्त की लत"),
    title: b("Doda Post (Poppy Husk) Addiction – Treatment & Withdrawal", "डोडा पोस्त की लत – इलाज और छोड़ने के लक्षण"),
    h1: b("Doda post addiction: help for users and families", "डोडा पोस्त की लत: नशा करने वालों और परिवार के लिए मदद"),
    description: b(
      "Drinking doda post daily to work or drive long hours? Poppy husk dependence causes painful withdrawal but is treatable. Signs, risks and treatment options.",
      "लंबे काम या ड्राइविंग के लिए रोज़ डोडा पोस्त? पोस्त की लत छोड़ने पर तकलीफ़ देती है पर इलाज संभव है। संकेत, ख़तरे और इलाज के विकल्प।"
    ),
    intro: [
      b("Doda post (poppy husk, \"post\" or \"bhukki\") is often soaked or ground and drunk as a liquid. It contains morphine and other opioids, so daily use leads to physical dependence.", "डोडा पोस्त (पोस्त, \"भुक्की\") को भिगोकर या पीसकर पिया जाता है। इसमें मॉर्फ़ीन और दूसरे ओपिऑइड होते हैं, इसलिए रोज़ लेने से शारीरिक लत लग जाती है।"),
      b("Truck drivers, farm workers and labourers sometimes start using it to work longer hours. The strength of each batch varies, which makes the dose unpredictable.", "ट्रक ड्राइवर, खेतिहर मज़दूर और मेहनतकश लोग कभी-कभी ज़्यादा घंटे काम करने के लिए इसे शुरू करते हैं। हर खेप की ताक़त अलग होती है, जिससे मात्रा का अंदाज़ा नहीं रहता।"),
    ],
    symptoms: [
      b("Needing doda before work, driving or sleep", "काम, ड्राइविंग या सोने से पहले डोडा की ज़रूरत"),
      b("Increasing the quantity over months", "महीनों में मात्रा बढ़ते जाना"),
      b("Restlessness, body pain and loose motions when it is not available", "न मिलने पर बेचैनी, बदन दर्द और दस्त"),
      b("Constipation, poor appetite, weight loss", "क़ब्ज़, भूख कम, वज़न घटना"),
    ],
    causes: [
      b("Use for long work hours, fatigue or body pain", "लंबे काम, थकान या बदन दर्द के लिए इस्तेमाल"),
      b("Peer groups at work and easy availability", "काम पर साथियों का असर और आसानी से मिलना"),
    ],
    riskFactors: [
      b("Night driving and heavy manual work", "रात में ड्राइविंग और भारी शारीरिक मेहनत"),
      b("Alcohol or tobacco use; depression", "शराब या तंबाकू; डिप्रेशन"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON, b("Carrying doda on trips because of fear of withdrawal", "छोड़ने के लक्षणों के डर से सफ़र में डोडा साथ रखना")],
      withdrawal: OPIOID_WITHDRAWAL,
      health: [
        b("Drowsiness and road accidents — dangerous for drivers", "सुस्ती और सड़क दुर्घटनाएँ — ड्राइवरों के लिए ख़तरनाक"),
        b("Chronic constipation, weight loss, sexual problems", "पुरानी क़ब्ज़, वज़न घटना, यौन समस्याएँ"),
        b("Overdose risk because batch strength varies", "खेप की ताक़त अलग होने से ओवरडोज़ का ख़तरा"),
        b("Legal problems — possession can attract serious penalties under the NDPS Act", "क़ानूनी समस्याएँ — NDPS क़ानून के तहत रखने पर गंभीर सज़ा हो सकती है"),
      ],
    }),
    diagnosis: [
      b("Assessment of daily quantity and withdrawal pattern", "रोज़ की मात्रा और छोड़ने के लक्षणों के पैटर्न की जाँच"),
      b("Physical health check and screening for alcohol, tobacco and other drugs", "शारीरिक जाँच और शराब, तंबाकू व दूसरे नशे की जाँच"),
    ],
    icd: OPIOID_ICD,
    treatment: OPIOID_TREATMENT,
    psychotherapy: [...OPIOID_PSYCHO, b("Work-related planning: shift changes, rest breaks, safe driving", "काम की योजना: शिफ़्ट बदलना, आराम, सुरक्षित ड्राइविंग")],
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Withdrawal symptoms when doda is not available", "डोडा न मिलने पर लक्षण"),
      b("Driving after use, or accidents and near-misses", "इस्तेमाल के बाद ड्राइविंग, या दुर्घटनाएँ"),
      b("Severe vomiting or diarrhoea with weakness during withdrawal", "छोड़ते समय बहुत उल्टी या दस्त के साथ कमज़ोरी"),
    ],
    faqs: [
      faq("Is doda post less harmful than smack?", "क्या डोडा पोस्त स्मैक से कम नुकसानदायक है?", "Both are opioids and cause dependence. Doda is often used in larger amounts and its strength is unpredictable.", "दोनों ओपिऑइड हैं और लत लगाते हैं। डोडा अक्सर ज़्यादा मात्रा में लिया जाता है और उसकी ताक़त का अंदाज़ा नहीं होता।"),
      faq("Can treatment be taken while continuing work?", "क्या काम जारी रखते हुए इलाज हो सकता है?", "Often yes. Many people are treated as outpatients with regular follow-up.", "अक्सर हाँ। बहुत से लोगों का इलाज नियमित फॉलो-अप के साथ बिना भर्ती के होता है।"),
    ],
    related: ["opium-afeem-addiction-india", "opioid-smack-heroin-opium-doda-addiction-india", "deaddiction-psychiatrist-india"],
    selfTests: ["drugs"],
    articles: ["helping-family-member-with-addiction"],
    videoKeywords: ["doda", "डोडा", "post", "पोस्त"],
    keywords: ["doda", "post", "posta", "bhukki", "poppy husk", "dode"],
  },
  {
    slug: "smack-addiction-treatment-india",
    category: "addiction",
    group: "substance",
    name: b("Smack (brown sugar) addiction", "स्मैक (ब्राउन शुगर) की लत"),
    title: b("Smack (Brown Sugar) Addiction – Signs, Withdrawal & Treatment", "स्मैक (ब्राउन शुगर) की लत – संकेत, छोड़ने के लक्षण और इलाज"),
    h1: b("Smack (brown sugar) addiction in young people", "युवाओं में स्मैक (ब्राउन शुगर) की लत"),
    description: b(
      "Foil, lighters, missing money and mood swings? Smack is impure heroin that causes rapid dependence. Warning signs for parents and how treatment works.",
      "फ़ॉइल, लाइटर, ग़ायब पैसे और मूड बदलना? स्मैक अशुद्ध हेरोइन है जिससे जल्दी लत लगती है। माता-पिता के लिए चेतावनी संकेत और इलाज कैसे होता है।"
    ),
    intro: [
      b("Smack, also called brown sugar, is an impure form of heroin usually smoked by heating it on foil (\"chasing\"). It is often mixed with unknown adulterants.", "स्मैक, जिसे ब्राउन शुगर भी कहते हैं, हेरोइन का अशुद्ध रूप है जिसे अक्सर फ़ॉइल पर गर्म करके धुआँ खींचा जाता है। इसमें अक्सर अनजान मिलावट होती है।"),
      b("Many users are teenagers and young adults. Dependence can develop within weeks, so early recognition by families is important.", "नशा करने वाले बहुत से किशोर और युवा होते हैं। कुछ हफ़्तों में लत लग सकती है, इसलिए परिवार का जल्दी पहचानना ज़रूरी है।"),
    ],
    symptoms: [
      b("Burnt foil, lighters, straws or pen tubes in the room", "कमरे में जली फ़ॉइल, लाइटर, स्ट्रॉ या पेन की नली"),
      b("Missing money or household items; lying", "पैसे या घर का सामान ग़ायब होना; झूठ बोलना"),
      b("Pinpoint pupils, drowsiness, nodding off", "आँख की पुतली छोटी, सुस्ती, बैठे-बैठे ऊँघना"),
      b("Irritability, runny nose and body pain when not using", "नशा न मिलने पर चिड़चिड़ापन, नाक बहना और बदन दर्द"),
      b("New friends, staying out late, dropping out of studies", "नए दोस्त, देर रात तक बाहर रहना, पढ़ाई छोड़ना"),
    ],
    causes: [
      b("Peer pressure and curiosity", "दोस्तों का दबाव और जिज्ञासा"),
      b("Escaping stress, failure, family conflict or depression", "तनाव, असफलता, घर के झगड़े या डिप्रेशन से भागना"),
      b("Availability through local supply networks", "स्थानीय सप्लाई से आसानी से मिलना"),
    ],
    riskFactors: [
      b("Early use of tobacco, alcohol or cannabis", "कम उम्र में तंबाकू, शराब या गांजा"),
      b("ADHD, conduct problems or school failure", "ADHD, व्यवहार की समस्या या पढ़ाई में असफलता"),
      b("Family history of addiction", "परिवार में नशे का इतिहास"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON, b("Using several times a day to avoid feeling sick", "बीमार महसूस न हो इसलिए दिन में कई बार लेना")],
      withdrawal: OPIOID_WITHDRAWAL,
      health: [
        b("Overdose — breathing can stop, especially when mixed with alcohol or tablets", "ओवरडोज़ — ख़ासकर शराब या गोलियों के साथ साँस रुक सकती है"),
        b("Unknown adulterants damaging lungs and other organs", "अनजान मिलावट से फेफड़ों और दूसरे अंगों को नुकसान"),
        b("Shift to injecting, with HIV and hepatitis risk", "इंजेक्शन लगाने की ओर बढ़ना, HIV और हेपेटाइटिस का ख़तरा"),
        b("Crime, debt, legal cases and school dropout", "अपराध, क़र्ज़, क़ानूनी मामले और पढ़ाई छूटना"),
      ],
    }),
    diagnosis: [
      b("Confidential interview with the young person, then with family", "युवा से गोपनीय बातचीत, फिर परिवार से"),
      b("Urine drug screen and blood tests including HIV and hepatitis when appropriate", "पेशाब में नशे की जाँच और ज़रूरत हो तो HIV और हेपेटाइटिस सहित ख़ून की जाँच"),
    ],
    icd: OPIOID_ICD,
    treatment: OPIOID_TREATMENT,
    psychotherapy: [...OPIOID_PSYCHO, b("Help returning to studies, skills training or work", "पढ़ाई, कौशल प्रशिक्षण या काम पर लौटने में मदद")],
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Any suspicion of smack use in a teenager — early help works best", "किशोर में स्मैक के इस्तेमाल का ज़रा भी शक — जल्दी मदद सबसे असरदार"),
      b("Unresponsiveness, blue lips or very slow breathing — call 112", "प्रतिक्रिया न देना, होंठ नीले या बहुत धीमी साँस — 112 पर कॉल करें"),
    ],
    faqs: [
      faq("Is smoking smack safer than injecting?", "क्या स्मैक पीना इंजेक्शन से सुरक्षित है?", "It avoids needle infections but still causes dependence and overdose.", "इससे सुई के संक्रमण से बचाव होता है पर लत और ओवरडोज़ फिर भी होते हैं।"),
      faq("Should we send our son to a rehab centre straight away?", "क्या बेटे को सीधे रिहैब भेज दें?", "Start with a medical assessment. Many young people do well with outpatient treatment; if admission is needed, choose a licensed facility that does not use force or punishment.", "पहले डॉक्टरी जाँच कराएँ। बहुत से युवा बिना भर्ती के इलाज से ठीक होते हैं; भर्ती ज़रूरी हो तो ऐसी लाइसेंसशुदा जगह चुनें जहाँ ज़बरदस्ती या सज़ा न हो।"),
    ],
    related: ["heroin-addiction-treatment-india", "opioid-smack-heroin-opium-doda-addiction-india", "deaddiction-psychiatrist-india", "teen-depression-india"],
    selfTests: ["drugs"],
    articles: ["helping-family-member-with-addiction"],
    videoKeywords: ["smack", "स्मैक", "brown sugar", "chitta"],
    keywords: ["smack", "smaik", "brown sugar", "chitta", "foil", "sulfa"],
  },
  {
    slug: "heroin-addiction-treatment-india",
    category: "addiction",
    group: "substance",
    name: b("Heroin addiction", "हेरोइन की लत"),
    title: b("Heroin Addiction – Overdose Risk, Withdrawal & Treatment", "हेरोइन की लत – ओवरडोज़ का ख़तरा, छोड़ने के लक्षण और इलाज"),
    h1: b("Heroin addiction: treatment that saves lives", "हेरोइन की लत: जान बचाने वाला इलाज"),
    description: b(
      "Heroin use by smoking or injection carries high overdose and infection risk. Learn about withdrawal, substitution therapy, overdose first aid and long-term recovery.",
      "धुएँ या इंजेक्शन से हेरोइन लेने में ओवरडोज़ और संक्रमण का बड़ा ख़तरा है। छोड़ने के लक्षण, सब्स्टिट्यूशन थेरेपी, ओवरडोज़ में प्राथमिक मदद और लंबे समय की रिकवरी के बारे में जानें।"
    ),
    intro: [
      b("Heroin is a powerful opioid made from morphine. It may be smoked, snorted or injected; injection brings additional risks of HIV, hepatitis B and C, and abscesses.", "हेरोइन मॉर्फ़ीन से बना तेज़ ओपिऑइड है। इसे धुएँ से, सूँघकर या इंजेक्शन से लिया जाता है; इंजेक्शन से HIV, हेपेटाइटिस B और C और फोड़ों का अतिरिक्त ख़तरा होता है।"),
      b("Opioid substitution therapy is one of the most effective treatments in medicine for reducing deaths, crime and infections in heroin dependence.", "हेरोइन की लत में मौत, अपराध और संक्रमण घटाने के लिए ओपिऑइड सब्स्टिट्यूशन थेरेपी चिकित्सा के सबसे असरदार इलाजों में से है।"),
    ],
    symptoms: [
      b("Needle marks, long sleeves in hot weather", "सुई के निशान, गर्मी में भी पूरी बाँह के कपड़े"),
      b("Cycles of drowsiness followed by withdrawal and craving", "सुस्ती के बाद छोड़ने के लक्षण और तलब का चक्र"),
      b("Weight loss, poor hygiene, missing work", "वज़न घटना, साफ़-सफ़ाई में कमी, काम से ग़ायब"),
    ],
    causes: [
      b("Progression from smack, prescription opioids or other drugs", "स्मैक, दर्द की दवाओं या दूसरे नशे से आगे बढ़ना"),
      b("Strong effect on the brain's reward system", "दिमाग़ के इनाम तंत्र पर तेज़ असर"),
    ],
    riskFactors: [
      b("Trauma, depression, untreated ADHD", "आघात, डिप्रेशन, बिना इलाज का ADHD"),
      b("Peers who use and easy access", "नशा करने वाले साथी और आसान पहुँच"),
    ],
    extra: [
      ...sections({
        dependence: [...DEPENDENCE_COMMON, b("Injecting or sharing equipment", "इंजेक्शन लगाना या सुई-सिरिंज साझा करना")],
        withdrawal: OPIOID_WITHDRAWAL,
        health: [
          b("Fatal overdose, especially with alcohol, sleeping pills or after a break", "जानलेवा ओवरडोज़, ख़ासकर शराब, नींद की गोलियों के साथ या कुछ समय छोड़ने के बाद"),
          b("HIV, hepatitis B and C, abscesses and blood infections from injecting", "इंजेक्शन से HIV, हेपेटाइटिस B और C, फोड़े और ख़ून का संक्रमण"),
          b("Kidney, lung and heart complications", "किडनी, फेफड़े और दिल की जटिलताएँ"),
        ],
      }),
      {
        id: "overdose",
        tone: "warning",
        title: b("Recognise an opioid overdose", "ओपिऑइड ओवरडोज़ पहचानें"),
        items: [
          b("Not waking up, very slow or no breathing, blue lips, pinpoint pupils", "जाग न पाना, बहुत धीमी या बंद साँस, नीले होंठ, बहुत छोटी पुतली"),
          b("Call 112 immediately and keep the person on their side. An antidote medicine can reverse opioid overdose and is given by trained medical staff.", "तुरंत 112 पर कॉल करें और व्यक्ति को करवट पर लिटाएँ। एक एंटीडोट दवा ओपिऑइड ओवरडोज़ को पलट सकती है, जिसे प्रशिक्षित मेडिकल स्टाफ़ देता है।"),
        ],
      },
    ],
    diagnosis: [
      b("Detailed substance and injecting history", "नशे और इंजेक्शन की पूरी जानकारी"),
      b("Tests for HIV, hepatitis B and C, liver function", "HIV, हेपेटाइटिस B और C, लिवर की जाँच"),
    ],
    icd: OPIOID_ICD,
    treatment: OPIOID_TREATMENT,
    psychotherapy: OPIOID_PSYCHO,
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Any injecting drug use — get tested and treated", "किसी भी तरह का इंजेक्शन से नशा — जाँच और इलाज कराएँ"),
      b("Signs of overdose — emergency", "ओवरडोज़ के संकेत — इमरजेंसी"),
      b("Fever, swelling or pain at injection sites", "इंजेक्शन की जगह बुख़ार, सूजन या दर्द"),
    ],
    faqs: [
      faq("Is substitution therapy just replacing one drug with another?", "क्या सब्स्टिट्यूशन थेरेपी एक नशे को दूसरे से बदलना है?", "No. It is a prescribed, monitored medicine that stabilises the brain, stops withdrawal and allows people to work and live safely.", "नहीं। यह डॉक्टर द्वारा दी जाने वाली, निगरानी वाली दवा है जो दिमाग़ को स्थिर करती है, विड्रॉल रोकती है और व्यक्ति को सुरक्षित रूप से काम करने और जीने देती है।"),
    ],
    related: ["smack-addiction-treatment-india", "opioid-smack-heroin-opium-doda-addiction-india", "deaddiction-psychiatrist-india"],
    selfTests: ["drugs"],
    articles: ["helping-family-member-with-addiction"],
    videoKeywords: ["heroin", "हेरोइन", "opioid"],
    keywords: ["heroin", "injection nasha", "chitta", "opioid"],
  },
  {
    slug: "ganja-addiction-treatment-india",
    category: "addiction",
    group: "substance",
    name: b("Ganja and bhang addiction", "गांजा और भांग की लत"),
    title: b("Ganja & Bhang Addiction – Effects on Mind & Treatment", "गांजा और भांग की लत – दिमाग़ पर असर और इलाज"),
    h1: b("Ganja and bhang: when occasional use becomes addiction", "गांजा और भांग: जब कभी-कभार का इस्तेमाल लत बन जाए"),
    description: b(
      "Smoking ganja daily or using bhang regularly? Cannabis can cause dependence, poor memory and psychosis. Learn signs, withdrawal and how to quit with help.",
      "रोज़ गांजा पीना या नियमित भांग? कैनाबिस से लत, कमज़ोर याददाश्त और साइकोसिस हो सकता है। संकेत, छोड़ने के लक्षण और मदद से छोड़ना जानें।"
    ),
    intro: [
      b("Ganja is the dried flowering top of the cannabis plant, usually smoked in a chillum or joint. Bhang is made from leaves and taken as a drink or in sweets, sometimes during festivals.", "गांजा कैनाबिस पौधे का सूखा फूल वाला हिस्सा है, जिसे अक्सर चिलम या सिगरेट में पिया जाता है। भांग पत्तियों से बनती है और पेय या मिठाई में ली जाती है, कभी-कभी त्योहारों पर।"),
      b("Many people believe cannabis is harmless because it is \"herbal\". Regular use, especially in teenagers, can lead to dependence and mental health problems.", "बहुत लोग मानते हैं कि \"जड़ी-बूटी\" होने से कैनाबिस नुकसान नहीं करता। नियमित इस्तेमाल, ख़ासकर किशोरों में, लत और मानसिक समस्याएँ पैदा कर सकता है।"),
    ],
    symptoms: [
      b("Using daily or most days, often alone", "रोज़ या ज़्यादातर दिन, अक्सर अकेले"),
      b("Red eyes, increased appetite, laziness, slowed reactions", "लाल आँखें, भूख बढ़ना, आलस, धीमी प्रतिक्रिया"),
      b("Loss of interest in studies, work and family", "पढ़ाई, काम और परिवार में रुचि ख़त्म होना"),
      b("Anger and poor sleep when not using", "न मिलने पर ग़ुस्सा और ख़राब नींद"),
    ],
    causes: [
      b("Peer groups, curiosity and stress relief", "दोस्तों का समूह, जिज्ञासा और तनाव से राहत"),
      b("Self-treating anxiety or sleep problems", "घबराहट या नींद की समस्या का अपने आप इलाज"),
    ],
    riskFactors: [
      b("Starting before age 18", "18 साल से पहले शुरू करना"),
      b("Family history of psychosis or addiction", "परिवार में साइकोसिस या नशे का इतिहास"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON, b("Unable to sleep or eat normally without it", "इसके बिना ठीक से सो या खा न पाना")],
      withdrawal: CANNABIS_WITHDRAWAL,
      health: [
        ...CANNABIS_HEALTH,
        b("Edible bhang acts slowly — people take more and can have severe anxiety, vomiting or confusion", "खाने वाली भांग धीरे असर करती है — लोग ज़्यादा ले लेते हैं और तेज़ घबराहट, उल्टी या भ्रम हो सकता है"),
      ],
    }),
    diagnosis: [
      b("Assessment of frequency, amount and effects on functioning", "कितनी बार, कितनी मात्रा और कामकाज पर असर की जाँच"),
      b("Screening for psychosis, depression and anxiety", "साइकोसिस, डिप्रेशन और एंग्ज़ाइटी की जाँच"),
    ],
    icd: { icd10: "F12", icd11: "6C41" },
    treatment: CANNABIS_TREATMENT,
    psychotherapy: [
      b("CBT and motivational enhancement therapy — the main treatments", "CBT और मोटिवेशनल एनहांसमेंट थेरेपी — मुख्य इलाज"),
      b("Family sessions for teenagers", "किशोरों के लिए फ़ैमिली सेशन"),
    ],
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Suspiciousness, hearing voices or strange behaviour — urgent", "शक, आवाज़ें सुनना या अजीब व्यवहार — तुरंत"),
      b("Daily use or failed attempts to cut down", "रोज़ इस्तेमाल या कम करने की असफल कोशिशें"),
    ],
    faqs: [
      faq("Is bhang during Holi harmful?", "क्या होली पर भांग नुकसानदायक है?", "Occasional use may not cause addiction, but edible bhang can trigger panic, vomiting or confusion, and people with psychosis or heart disease should avoid it.", "कभी-कभार से लत नहीं लगती, पर खाने वाली भांग से घबराहट, उल्टी या भ्रम हो सकता है, और साइकोसिस या दिल की बीमारी वालों को इससे बचना चाहिए।"),
      faq("Is cannabis addictive?", "क्या कैनाबिस की लत लगती है?", "Yes. A significant proportion of regular users develop dependence, especially those who start young.", "हाँ। नियमित इस्तेमाल करने वालों में बड़ी संख्या में लत लगती है, ख़ासकर जो कम उम्र में शुरू करते हैं।"),
    ],
    related: ["charas-addiction-treatment-india", "cannabis-ganja-charas-hash-addiction-india", "acute-psychosis-treatment-india", "schizophrenia-treatment-india"],
    selfTests: ["drugs"],
    videoKeywords: ["ganja", "गांजा", "bhang", "cannabis"],
    keywords: ["ganja", "bhang", "chillum", "maal", "weed", "joint", "cannabis"],
  },
  {
    slug: "charas-addiction-treatment-india",
    category: "addiction",
    group: "substance",
    name: b("Charas (hashish) addiction", "चरस (हशीश) की लत"),
    title: b("Charas (Hashish) Addiction – Psychosis Risk & Treatment", "चरस (हशीश) की लत – साइकोसिस का ख़तरा और इलाज"),
    h1: b("Charas addiction: a stronger form of cannabis", "चरस की लत: कैनाबिस का तेज़ रूप"),
    description: b(
      "Charas is concentrated cannabis resin with higher THC. Regular use raises the risk of dependence, paranoia and psychosis. Signs, withdrawal and treatment.",
      "चरस कैनाबिस की गाढ़ी राल है जिसमें THC ज़्यादा होता है। नियमित इस्तेमाल से लत, शक और साइकोसिस का ख़तरा बढ़ता है। संकेत, छोड़ने के लक्षण और इलाज।"
    ),
    intro: [
      b("Charas (hashish, \"hash\") is resin collected from the cannabis plant. It is more concentrated than ganja, so the effects on the mind are stronger.", "चरस (हशीश, \"हैश\") कैनाबिस पौधे से इकट्ठा की गई राल है। यह गांजे से ज़्यादा गाढ़ी होती है, इसलिए दिमाग़ पर असर भी तेज़ होता है।"),
      b("Young people who use high-potency cannabis daily have a clearly higher risk of psychotic illness.", "जो युवा रोज़ तेज़ असर वाला कैनाबिस लेते हैं उनमें साइकोसिस का ख़तरा साफ़ तौर पर ज़्यादा होता है।"),
    ],
    symptoms: [
      b("Daily smoking mixed with tobacco", "तंबाकू मिलाकर रोज़ पीना"),
      b("Feeling paranoid, anxious or detached after use", "इस्तेमाल के बाद शक, घबराहट या अलगाव महसूस होना"),
      b("Memory lapses, poor motivation, social withdrawal", "भूलना, प्रेरणा की कमी, लोगों से दूरी"),
    ],
    causes: [
      b("Peer use, travel and party settings", "साथियों का इस्तेमाल, यात्रा और पार्टी का माहौल"),
      b("Using to cope with stress, boredom or sleep problems", "तनाव, ऊब या नींद की समस्या से निपटने के लिए"),
    ],
    riskFactors: [
      b("Adolescent onset and daily use", "किशोरावस्था में शुरुआत और रोज़ इस्तेमाल"),
      b("Family history of schizophrenia or bipolar disorder", "परिवार में सिज़ोफ्रेनिया या बाइपोलर का इतिहास"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON, b("Needing charas to relax or feel normal", "आराम या सामान्य महसूस करने के लिए चरस की ज़रूरत")],
      withdrawal: CANNABIS_WITHDRAWAL,
      health: [...CANNABIS_HEALTH, b("Nicotine dependence from mixing with tobacco", "तंबाकू मिलाने से निकोटीन की लत")],
    }),
    diagnosis: [
      b("History of use and any psychotic or mood symptoms", "इस्तेमाल और किसी भी साइकोटिक या मूड लक्षण की जानकारी"),
      b("Urine drug screen when useful", "ज़रूरत हो तो पेशाब में नशे की जाँच"),
    ],
    icd: { icd10: "F12", icd11: "6C41" },
    treatment: [...CANNABIS_TREATMENT, b("Help to quit tobacco at the same time when possible", "जहाँ हो सके साथ में तंबाकू छोड़ने में मदद")],
    psychotherapy: [
      b("CBT and motivational enhancement therapy", "CBT और मोटिवेशनल एनहांसमेंट थेरेपी"),
      b("Relapse-prevention counselling", "रिलैप्स-प्रिवेंशन काउंसलिंग"),
    ],
    family: FAMILY_SUBSTANCE,
    seekHelp: [
      b("Paranoia or voices persisting after use stops — urgent", "इस्तेमाल रुकने के बाद भी शक या आवाज़ें — तुरंत"),
      b("Inability to stop despite trying", "कोशिश के बावजूद रुक न पाना"),
    ],
    faqs: [
      faq("Is charas stronger than ganja?", "क्या चरस गांजे से तेज़ है?", "Usually yes — it contains more THC, the chemical linked to dependence and psychosis.", "आमतौर पर हाँ — इसमें THC ज़्यादा होता है, जो लत और साइकोसिस से जुड़ा रसायन है।"),
    ],
    related: ["ganja-addiction-treatment-india", "cannabis-ganja-charas-hash-addiction-india", "acute-psychosis-treatment-india"],
    selfTests: ["drugs"],
    videoKeywords: ["charas", "चरस", "cannabis", "hash"],
    keywords: ["charas", "hash", "hashish", "maal", "cannabis"],
  },
  {
    slug: "nicotine-dependence-treatment-india",
    category: "addiction",
    group: "substance",
    name: b("Nicotine dependence (cigarettes, vapes, pouches)", "निकोटीन की लत (सिगरेट, वेप, पाउच)"),
    title: b("Nicotine Dependence – Quit Smoking, Vaping & Pouches", "निकोटीन की लत – सिगरेट, वेपिंग और पाउच छोड़ें"),
    h1: b("Nicotine dependence: quitting with medical support", "निकोटीन की लत: डॉक्टर की मदद से छोड़ें"),
    description: b(
      "Can't quit cigarettes, bidis or vapes? Nicotine dependence is a medical condition. Nicotine replacement, medicines and counselling double quit rates.",
      "सिगरेट, बीड़ी या वेप नहीं छूट रहा? निकोटीन की लत एक बीमारी है। निकोटीन रिप्लेसमेंट, दवाएँ और काउंसलिंग से छोड़ने की सफलता दोगुनी होती है।"
    ),
    intro: [
      b("Nicotine is the addictive chemical in cigarettes, bidis, hookah, e-cigarettes (vapes) and nicotine pouches. It reaches the brain within seconds, which makes it highly addictive.", "निकोटीन सिगरेट, बीड़ी, हुक्का, ई-सिगरेट (वेप) और निकोटीन पाउच में लत लगाने वाला रसायन है। यह कुछ सेकंड में दिमाग़ तक पहुँचता है, इसलिए इसकी लत बहुत तेज़ लगती है।"),
      b("This page focuses on smoking and vaping. For gutka, khaini and other chewed tobacco, see the tobacco page.", "यह पेज धूम्रपान और वेपिंग पर है। गुटखा, खैनी और दूसरे चबाने वाले तंबाकू के लिए तंबाकू वाला पेज देखें।"),
    ],
    symptoms: [
      b("First cigarette or vape within 30 minutes of waking", "जागने के 30 मिनट के अंदर पहली सिगरेट या वेप"),
      b("Smoking even when ill", "बीमार होने पर भी पीना"),
      b("Irritability and craving after a few hours without nicotine", "कुछ घंटे निकोटीन न मिलने पर चिड़चिड़ापन और तलब"),
    ],
    causes: [
      b("Nicotine's rapid effect on the brain's reward system", "दिमाग़ के इनाम तंत्र पर निकोटीन का तेज़ असर"),
      b("Habits linked to tea, meals, stress or friends", "चाय, खाने, तनाव या दोस्तों से जुड़ी आदतें"),
    ],
    riskFactors: [
      b("Starting in adolescence; flavoured vapes", "किशोरावस्था में शुरुआत; फ़्लेवर वाले वेप"),
      b("Depression, anxiety, ADHD, alcohol use", "डिप्रेशन, एंग्ज़ाइटी, ADHD, शराब"),
    ],
    extra: sections({
      dependence: DEPENDENCE_COMMON,
      withdrawal: [
        b("Craving, irritability, restlessness, poor concentration", "तलब, चिड़चिड़ापन, बेचैनी, ध्यान न लगना"),
        b("Increased appetite and poor sleep", "भूख बढ़ना और ख़राब नींद"),
        b("Peaks in the first week and eases over 2–4 weeks", "पहले हफ़्ते में सबसे ज़्यादा, 2–4 हफ़्ते में कम"),
      ],
      health: [
        b("Heart attack, stroke, lung disease and many cancers", "हार्ट अटैक, स्ट्रोक, फेफड़ों की बीमारी और कई कैंसर"),
        b("Erectile problems and reduced fertility", "इरेक्शन की समस्या और प्रजनन क्षमता में कमी"),
        b("Vapes deliver nicotine and other chemicals; e-cigarettes are banned for sale in India", "वेप निकोटीन और दूसरे रसायन देते हैं; भारत में ई-सिगरेट की बिक्री पर प्रतिबंध है"),
      ],
    }),
    diagnosis: [
      b("Assessment of daily use and nicotine dependence", "रोज़ के इस्तेमाल और निकोटीन निर्भरता की जाँच"),
      b("Screening for depression and other substances", "डिप्रेशन और दूसरे नशे की जाँच"),
    ],
    icd: { icd10: "F17", icd11: "6C4A" },
    treatment: [
      b("Set a quit date and plan for triggers", "छोड़ने की तारीख़ तय करें और ट्रिगर के लिए योजना बनाएँ"),
      b("Nicotine replacement (gum, lozenge, patch) and prescription medicines, as advised", "सलाह के अनुसार निकोटीन रिप्लेसमेंट (गम, लोज़ेंज, पैच) और डॉक्टर की दवाएँ"),
      b("Follow-up in the first weeks when relapse is most likely", "शुरुआती हफ़्तों में फॉलो-अप जब दोबारा शुरू होने का ख़तरा सबसे ज़्यादा"),
    ],
    psychotherapy: [b("Behavioural counselling for habits and stress", "आदतों और तनाव के लिए बिहेवियरल काउंसलिंग")],
    family: [
      b("Keep the home and car smoke-free", "घर और गाड़ी को धुएँ से मुक्त रखें"),
      b("Encourage without nagging; celebrate milestones", "बिना टोके हौसला दें; पड़ावों की ख़ुशी मनाएँ"),
    ],
    seekHelp: [
      b("Several failed quit attempts", "कई बार छोड़ने की असफल कोशिश"),
      b("Heart or lung disease, pregnancy or mental illness", "दिल या फेफड़ों की बीमारी, गर्भावस्था या मानसिक बीमारी"),
    ],
    faqs: [
      faq("Is vaping a safe way to quit?", "क्या वेपिंग छोड़ने का सुरक्षित तरीक़ा है?", "Vapes keep nicotine dependence going and are not approved in India. Licensed nicotine replacement and medicines are safer quit aids.", "वेप से निकोटीन की लत बनी रहती है और भारत में मान्य नहीं हैं। लाइसेंसशुदा निकोटीन रिप्लेसमेंट और दवाएँ छोड़ने के सुरक्षित साधन हैं।"),
    ],
    related: ["tobacco-nicotine-addiction-treatment-india", "deaddiction-psychiatrist-india", "relapse-prevention-counselling-india"],
    selfTests: ["tobacco"],
    videoKeywords: ["smoking", "cigarette", "सिगरेट", "nicotine"],
    keywords: ["cigarette", "sigret", "bidi", "vape", "hookah", "smoking chhodna"],
  },
  {
    slug: "prescription-drug-dependence-india",
    category: "addiction",
    group: "substance",
    name: b("Prescription drug dependence", "डॉक्टरी दवाओं की लत"),
    title: b("Prescription Drug Dependence – Painkillers, Cough Syrups & Tablets", "डॉक्टरी दवाओं की लत – दर्द निवारक, कफ़ सिरप और गोलियाँ"),
    h1: b("Prescription drug dependence: when medicines become a problem", "डॉक्टरी दवाओं की लत: जब दवा ही समस्या बन जाए"),
    description: b(
      "Using strong painkillers, opioid cough syrups or sleeping pills beyond prescription? Learn signs of dependence and how to stop safely with medical help.",
      "तेज़ दर्द निवारक, ओपिऑइड कफ़ सिरप या नींद की गोलियाँ पर्चे से ज़्यादा? लत के संकेत और डॉक्टरी मदद से सुरक्षित रूप से छोड़ना जानें।"
    ),
    intro: [
      b("Some medicines that help when used correctly can cause dependence when taken in higher amounts, for longer or without a prescription — commonly strong opioid painkillers, opioid cough syrups and sedatives.", "कुछ दवाएँ सही इस्तेमाल पर फ़ायदा करती हैं, पर ज़्यादा मात्रा, लंबे समय या बिना पर्चे लेने पर लत लगा सकती हैं — आमतौर पर तेज़ ओपिऑइड दर्द निवारक, ओपिऑइड कफ़ सिरप और नींद की दवाएँ।"),
      b("Never stop these medicines abruptly on your own. A doctor can plan a safe reduction and treat the underlying pain, anxiety or sleep problem.", "ये दवाएँ अपने आप अचानक कभी बंद न करें। डॉक्टर सुरक्षित तरीक़े से कम करने की योजना बना सकते हैं और मूल दर्द, घबराहट या नींद की समस्या का इलाज कर सकते हैं।"),
    ],
    symptoms: [
      b("Taking more than prescribed or for longer than advised", "पर्चे से ज़्यादा या बताए समय से ज़्यादा लेना"),
      b("Buying without prescription or from several chemists", "बिना पर्चे या कई दुकानों से ख़रीदना"),
      b("Running out early; anxiety about supply", "जल्दी ख़त्म हो जाना; दवा न मिलने की चिंता"),
    ],
    causes: [
      b("Starting for genuine pain, cough, anxiety or sleep problems", "असली दर्द, खाँसी, घबराहट या नींद के लिए शुरुआत"),
      b("Discovering a \"high\" or relief from stress", "\"नशा\" या तनाव से राहत मिलना"),
    ],
    riskFactors: [
      b("Past alcohol or drug problems", "पहले शराब या नशे की समस्या"),
      b("Chronic pain, depression or anxiety", "पुराना दर्द, डिप्रेशन या एंग्ज़ाइटी"),
      b("Easy over-the-counter access", "बिना पर्चे आसानी से मिलना"),
    ],
    extra: sections({
      dependence: DEPENDENCE_COMMON,
      warn: true,
      withdrawalTitle: b("Withdrawal can be dangerous — do not stop suddenly", "छोड़ने के लक्षण ख़तरनाक हो सकते हैं — अचानक बंद न करें"),
      withdrawal: [
        b("Opioid painkillers and cough syrups: body aches, diarrhoea, restlessness, craving; some painkillers can also cause seizures", "ओपिऑइड दर्द निवारक और कफ़ सिरप: बदन दर्द, दस्त, बेचैनी, तलब; कुछ दर्द निवारकों से दौरे भी पड़ सकते हैं"),
        ...SEDATIVE_WARNING.slice(0, 3),
      ],
      health: [
        b("Overdose, especially when combined with alcohol or other sedatives", "ओवरडोज़, ख़ासकर शराब या दूसरी नींद की दवाओं के साथ"),
        b("Seizures with high doses of some painkillers", "कुछ दर्द निवारकों की ज़्यादा मात्रा से दौरे"),
        b("Memory problems, falls and accidents", "याददाश्त की समस्या, गिरना और दुर्घटनाएँ"),
      ],
    }),
    diagnosis: [
      b("Review of all medicines, doses and sources", "सभी दवाओं, मात्राओं और कहाँ से मिलती हैं, इसकी समीक्षा"),
      b("Assessment of the original condition (pain, anxiety, insomnia)", "मूल समस्या (दर्द, घबराहट, अनिद्रा) की जाँच"),
    ],
    icd: { note: b("Coded by the substance — e.g. opioids F11 / 6C43; sedatives F13 / 6C44.", "दवा के प्रकार के अनुसार कोड — जैसे ओपिऑइड F11 / 6C43; सेडेटिव F13 / 6C44।") },
    treatment: [
      b("A supervised, gradual taper plan", "निगरानी में धीरे-धीरे कम करने की योजना"),
      b("Substitution therapy for opioid dependence where appropriate", "ज़रूरत हो तो ओपिऑइड लत के लिए सब्स्टिट्यूशन थेरेपी"),
      b("Safer treatments for pain, anxiety and sleep", "दर्द, घबराहट और नींद के सुरक्षित इलाज"),
    ],
    psychotherapy: [
      b("CBT for insomnia and anxiety instead of long-term pills", "लंबे समय की गोलियों की जगह अनिद्रा और घबराहट के लिए CBT"),
      b("Pain coping skills and relapse prevention", "दर्द से निपटने के कौशल और रिलैप्स प्रिवेंशन"),
    ],
    family: [
      ...FAMILY_SUBSTANCE.slice(0, 1),
      b("Keep medicines locked and count tablets when advised by the doctor", "डॉक्टर की सलाह पर दवाएँ ताले में रखें और गोलियाँ गिनें"),
      b("Do not share prescription medicines", "डॉक्टरी दवाएँ आपस में न बाँटें"),
    ],
    seekHelp: [
      b("Seizures, confusion or extreme drowsiness — emergency", "दौरे, भ्रम या बहुत ज़्यादा सुस्ती — इमरजेंसी"),
      b("Unable to reduce medicines on your own", "अपने आप दवाएँ कम न कर पाना"),
    ],
    faqs: [
      faq("My doctor prescribed it. Can it still be addiction?", "डॉक्टर ने दी थी। क्या फिर भी लत हो सकती है?", "Yes. Dependence can develop even with prescribed medicines. That is not your fault — discuss it openly so a safe plan can be made.", "हाँ। डॉक्टर की दी हुई दवाओं से भी लत लग सकती है। यह आपकी ग़लती नहीं — खुलकर बात करें ताकि सुरक्षित योजना बन सके।"),
    ],
    related: ["sedative-sleeping-pill-dependence-india", "opioid-smack-heroin-opium-doda-addiction-india", "insomnia-treatment-india"],
    selfTests: ["drugs"],
    articles: ["sleeping-pills-safe-use"],
    videoKeywords: ["tramadol", "cough syrup", "sleeping pills", "दवा"],
    keywords: ["tramadol", "cough syrup", "painkiller", "goli ki lat", "tablet nasha"],
  },
  {
    slug: "sedative-sleeping-pill-dependence-india",
    category: "addiction",
    group: "substance",
    name: b("Sleeping pill and sedative dependence", "नींद की गोलियों (सेडेटिव) की लत"),
    title: b("Sleeping Pill & Sedative Dependence – Safe Withdrawal", "नींद की गोलियों की लत – सुरक्षित तरीक़े से छोड़ना"),
    h1: b("Dependence on sleeping pills and anti-anxiety tablets", "नींद और घबराहट की गोलियों पर निर्भरता"),
    description: b(
      "Taking sleeping pills or anti-anxiety tablets for months? Sudden stopping can cause seizures. Learn the signs of dependence and how to taper safely.",
      "महीनों से नींद या घबराहट की गोलियाँ ले रहे हैं? अचानक बंद करने से दौरे पड़ सकते हैं। लत के संकेत और सुरक्षित रूप से कम करना जानें।"
    ),
    intro: [
      b("Benzodiazepines and related sleeping pills work well for short periods, but after weeks of regular use the body adapts and dependence can develop.", "बेंज़ोडायज़ेपीन और मिलती-जुलती नींद की गोलियाँ थोड़े समय के लिए अच्छा काम करती हैं, पर हफ़्तों तक नियमित लेने पर शरीर आदी हो जाता है और लत लग सकती है।"),
      b("Many people start with a genuine prescription. Recovery is very possible with a slow, supervised taper and better treatment for sleep and anxiety.", "बहुत लोग असली पर्चे से शुरू करते हैं। धीमे, निगरानी वाले टेपर और नींद व घबराहट के बेहतर इलाज से ठीक होना पूरी तरह संभव है।"),
    ],
    symptoms: [
      b("Unable to sleep without the tablet", "गोली के बिना नींद न आना"),
      b("Needing a higher dose or extra tablets in the day", "ज़्यादा मात्रा या दिन में भी गोली की ज़रूरत"),
      b("Forgetfulness, daytime drowsiness, unsteady walking", "भूलना, दिन में सुस्ती, लड़खड़ाकर चलना"),
    ],
    causes: [
      b("Long-term use beyond a few weeks", "कुछ हफ़्तों से ज़्यादा लंबा इस्तेमाल"),
      b("Untreated anxiety, depression or insomnia", "बिना इलाज की घबराहट, डिप्रेशन या अनिद्रा"),
    ],
    riskFactors: [
      b("Alcohol or opioid use", "शराब या ओपिऑइड का इस्तेमाल"),
      b("Older age — higher risk of falls and confusion", "ज़्यादा उम्र — गिरने और भ्रम का ज़्यादा ख़तरा"),
    ],
    extra: sections({
      dependence: DEPENDENCE_COMMON,
      warn: true,
      withdrawalTitle: b("Sedative withdrawal needs medical supervision", "सेडेटिव छोड़ने में डॉक्टर की निगरानी ज़रूरी"),
      withdrawal: [
        ...SEDATIVE_WARNING,
        b("Other withdrawal symptoms: rebound insomnia, anxiety, tremors, sensitivity to light and sound", "छोड़ने के दूसरे लक्षण: नींद न आना, घबराहट, कंपकंपी, रोशनी और आवाज़ से परेशानी"),
      ],
      health: [
        b("Memory and attention problems", "याददाश्त और ध्यान की समस्या"),
        b("Falls, fractures and road accidents", "गिरना, हड्डी टूटना और सड़क दुर्घटनाएँ"),
        b("Breathing problems when combined with alcohol or opioids", "शराब या ओपिऑइड के साथ साँस की समस्या"),
      ],
    }),
    diagnosis: [
      b("Review of type, dose and duration of each medicine", "हर दवा के प्रकार, मात्रा और अवधि की समीक्षा"),
      b("Assessment of sleep, anxiety, mood and alcohol use", "नींद, घबराहट, मूड और शराब की जाँच"),
    ],
    icd: { icd10: "F13", icd11: "6C44" },
    treatment: [
      b("Slow, individualised tapering over weeks to months", "हफ़्तों से महीनों में धीरे-धीरे, व्यक्ति के अनुसार कम करना"),
      b("Treating the underlying anxiety or depression with non-habit-forming options", "मूल घबराहट या डिप्रेशन का बिना लत वाले विकल्पों से इलाज"),
      b("Admission for high doses, seizure history or alcohol co-use", "ज़्यादा मात्रा, दौरे का इतिहास या साथ में शराब हो तो भर्ती"),
    ],
    psychotherapy: [
      b("CBT for insomnia (CBT-I) — the most effective long-term treatment for sleep", "अनिद्रा के लिए CBT (CBT-I) — नींद का सबसे असरदार लंबा इलाज"),
      b("Relaxation and anxiety-management skills", "रिलैक्सेशन और घबराहट सँभालने के कौशल"),
    ],
    family: [
      b("Support the taper; do not give extra tablets from home stock", "टेपर में साथ दें; घर में रखी गोलियाँ अलग से न दें"),
      b("Watch for confusion or fits and seek urgent help", "भ्रम या दौरे पर नज़र रखें और तुरंत मदद लें"),
    ],
    seekHelp: [
      b("Before reducing any regular sleeping pill", "कोई भी नियमित नींद की गोली कम करने से पहले"),
      b("Fits, confusion or hallucinations — emergency", "दौरे, भ्रम या चीज़ें दिखना — इमरजेंसी"),
    ],
    faqs: [
      faq("Can I stop my sleeping or anxiety tablets if I feel better?", "ठीक महसूस होने पर क्या नींद या घबराहट की गोली बंद कर सकता हूँ?", "Not suddenly after regular use. Ask your doctor for a gradual reduction plan.", "नियमित इस्तेमाल के बाद अचानक नहीं। डॉक्टर से धीरे-धीरे कम करने की योजना बनवाएँ।"),
      faq("Are all sleeping pills addictive?", "क्या सभी नींद की गोलियों की लत लगती है?", "Not all, but benzodiazepines and \"Z-drugs\" can cause dependence with regular use. Other medicines and CBT-I may be options.", "सभी नहीं, पर बेंज़ोडायज़ेपीन और \"Z-ड्रग्स\" से नियमित इस्तेमाल पर लत लग सकती है। दूसरी दवाएँ और CBT-I विकल्प हो सकते हैं।"),
    ],
    related: ["insomnia-treatment-india", "prescription-drug-dependence-india", "generalized-anxiety-disorder-india", "alcohol-addiction-treatment-india"],
    selfTests: ["sleep", "drugs"],
    articles: ["sleeping-pills-safe-use"],
    videoKeywords: ["sleeping pills", "नींद की गोली", "alprazolam"],
    keywords: ["neend ki goli", "alprax", "alprazolam", "clonazepam", "nitrest", "sleeping pill"],
  },
  {
    slug: "inhalant-solvent-whitener-abuse-india",
    category: "addiction",
    group: "substance",
    name: b("Inhalant use (whitener, glue, petrol)", "इनहेलेंट का नशा (व्हाइटनर, गोंद, पेट्रोल)"),
    title: b("Inhalant Abuse – Whitener, Glue & Solvent Sniffing in Children", "इनहेलेंट का नशा – बच्चों में व्हाइटनर, गोंद और सॉल्वेंट सूँघना"),
    h1: b("Inhalant use in children and teenagers", "बच्चों और किशोरों में इनहेलेंट का नशा"),
    description: b(
      "Children sniffing whitener, glue or petrol? Inhalants can cause sudden death and brain damage. Warning signs for parents and teachers, and treatment.",
      "बच्चे व्हाइटनर, गोंद या पेट्रोल सूँघ रहे हैं? इनहेलेंट से अचानक मौत और दिमाग़ी नुकसान हो सकता है। माता-पिता और शिक्षकों के लिए संकेत और इलाज।"
    ),
    intro: [
      b("Inhalants are household and stationery products — correction fluid (whitener), thinner, glue, petrol, aerosols — whose fumes are sniffed for a quick high.", "इनहेलेंट घर और स्टेशनरी के सामान हैं — व्हाइटनर, थिनर, गोंद, पेट्रोल, स्प्रे — जिनका धुआँ जल्दी नशे के लिए सूँघा जाता है।"),
      b("They are cheap and easy to get, so children and street-connected youth are most affected. Even a single use can be fatal.", "ये सस्ते और आसानी से मिलते हैं, इसलिए बच्चे और सड़क पर रहने वाले युवा सबसे ज़्यादा प्रभावित होते हैं। एक बार का इस्तेमाल भी जानलेवा हो सकता है।"),
    ],
    symptoms: [
      b("Chemical smell on breath or clothes; stained hands or face", "साँस या कपड़ों में केमिकल की गंध; हाथ या चेहरे पर दाग़"),
      b("Empty whitener bottles, rags or plastic bags", "ख़ाली व्हाइटनर की बोतलें, कपड़े या प्लास्टिक की थैलियाँ"),
      b("Slurred speech, dizziness, red eyes, sores around the nose and mouth", "लड़खड़ाती बोली, चक्कर, लाल आँखें, नाक और मुँह के आसपास घाव"),
      b("Falling school performance and behaviour change", "पढ़ाई में गिरावट और व्यवहार में बदलाव"),
    ],
    causes: [
      b("Low cost and easy availability", "कम क़ीमत और आसानी से मिलना"),
      b("Peer groups, neglect, hunger or difficult home situations", "साथियों का समूह, उपेक्षा, भूख या घर की कठिन परिस्थितियाँ"),
    ],
    riskFactors: [
      b("Young age, school dropout, child labour or street life", "कम उम्र, पढ़ाई छूटना, बाल मज़दूरी या सड़क पर जीवन"),
      b("Family substance use or violence", "परिवार में नशा या हिंसा"),
    ],
    extra: sections({
      dependence: [...DEPENDENCE_COMMON.slice(0, 1), b("Sniffing daily, often in groups", "रोज़ सूँघना, अक्सर समूह में")],
      warn: true,
      withdrawalTitle: b("Danger signs", "ख़तरे के संकेत"),
      withdrawal: [
        b("Sudden sniffing death — the heart can stop even on first use", "अचानक मौत — पहली बार में भी दिल रुक सकता है"),
        b("Suffocation when using plastic bags", "प्लास्टिक थैली से दम घुटना"),
        b("Unconsciousness, fits or breathing trouble — call 112", "बेहोशी, दौरे या साँस में दिक़्क़त — 112 पर कॉल करें"),
      ],
      health: [
        b("Brain damage affecting memory, learning and coordination", "याददाश्त, सीखने और तालमेल पर असर डालने वाला दिमाग़ी नुकसान"),
        b("Nerve, liver and kidney damage", "नसों, लिवर और किडनी को नुकसान"),
        b("Hearing loss and accidents", "सुनने की क्षमता कम होना और दुर्घटनाएँ"),
      ],
    }),
    diagnosis: [
      b("Non-judgemental interview with the child", "बच्चे से बिना आलोचना के बातचीत"),
      b("Physical examination; liver, kidney and nerve assessment as needed", "शारीरिक जाँच; ज़रूरत हो तो लिवर, किडनी और नसों की जाँच"),
    ],
    icd: { icd10: "F18", icd11: "6C4B" },
    treatment: [
      b("Safe environment, nutrition and medical care", "सुरक्षित माहौल, पोषण और डॉक्टरी देखभाल"),
      b("Return to school or skills training", "स्कूल या कौशल प्रशिक्षण में वापसी"),
      b("Treatment of depression, ADHD or learning problems", "डिप्रेशन, ADHD या सीखने की समस्या का इलाज"),
      b("Linkage with child welfare services when needed", "ज़रूरत हो तो बाल कल्याण सेवाओं से जोड़ना"),
    ],
    psychotherapy: [
      b("Motivational counselling adapted for children", "बच्चों के लिए मोटिवेशनल काउंसलिंग"),
      b("Family therapy and parenting support", "फ़ैमिली थेरेपी और पेरेंटिंग सहायता"),
    ],
    family: [
      b("Stay calm; do not beat or shame the child", "शांत रहें; बच्चे को मारें या शर्मिंदा न करें"),
      b("Supervise access to whitener, thinner and petrol", "व्हाइटनर, थिनर और पेट्रोल तक पहुँच पर नज़र रखें"),
      b("Inform teachers and work together", "शिक्षकों को बताएँ और मिलकर काम करें"),
    ],
    seekHelp: [
      b("Any suspected inhalant use in a child", "बच्चे में इनहेलेंट के इस्तेमाल का कोई भी शक"),
      b("Unconsciousness or breathing problems — emergency", "बेहोशी या साँस की समस्या — इमरजेंसी"),
    ],
    faqs: [
      faq("Can a child get addicted to whitener?", "क्या बच्चे को व्हाइटनर की लत लग सकती है?", "Yes. Regular sniffing leads to dependence and can damage the brain. Early help is important.", "हाँ। नियमित सूँघने से लत लगती है और दिमाग़ को नुकसान हो सकता है। जल्दी मदद ज़रूरी है।"),
    ],
    related: ["child-psychiatrist-india", "substance-use-disorders-treatment-india", "odd-conduct-disorder-india"],
    videoKeywords: ["whitener", "inhalant", "व्हाइटनर"],
    keywords: ["whitener", "solution", "glue sunghna", "petrol", "thinner"],
  },
];

const SHARED_FAQS = [
  faq("Can de-addiction treatment be done online?", "क्या नशा मुक्ति का इलाज ऑनलाइन हो सकता है?", "Assessment, medicines, counselling and follow-up can often be done by video. People with severe withdrawal, other serious illness or no support at home may need admission at a local hospital — you will be guided.", "जाँच, दवाएँ, काउंसलिंग और फॉलो-अप अक्सर वीडियो से हो सकते हैं। गंभीर विड्रॉल, दूसरी गंभीर बीमारी या घर पर सहारा न होने पर नज़दीकी अस्पताल में भर्ती की ज़रूरत हो सकती है — आपको बताया जाएगा।"),
  faq("Will my treatment be kept confidential?", "क्या मेरा इलाज गोपनीय रहेगा?", "Yes. Your consultation and records are confidential. Seeking treatment for addiction is a health decision.", "हाँ। आपका परामर्श और रिकॉर्ड गोपनीय हैं। नशे का इलाज लेना सेहत से जुड़ा फ़ैसला है।"),
  faq("Can the family book on behalf of the person?", "क्या परिवार व्यक्ति की ओर से बुकिंग कर सकता है?", "Yes. Families can book a consultation to get guidance even if the person is not yet ready.", "हाँ। अगर व्यक्ति अभी तैयार नहीं है तब भी परिवार मार्गदर्शन के लिए परामर्श बुक कर सकता है।"),
];

export const NEW_SUBSTANCES: ConditionContent[] = topUpFaqs(PAGES, SHARED_FAQS);
