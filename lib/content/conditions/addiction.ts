import type { ConditionContent, FaqItem } from "../types";

const CONFIDENTIAL_FAQ: FaqItem = {
  q: { en: "Will anyone else find out about my treatment?", hi: "क्या मेरे इलाज के बारे में किसी को पता चलेगा?" },
  a: {
    en: "No. Treatment is confidential under the Mental Healthcare Act, 2017. Information is not shared with employers, police or anyone else without your consent.",
    hi: "नहीं। मानसिक स्वास्थ्य देखरेख अधिनियम, 2017 के तहत इलाज पूरी तरह गोपनीय है। आपकी अनुमति के बिना जानकारी नौकरी देने वाले, पुलिस या किसी और को नहीं दी जाती।",
  },
};

const FAMILY_FAQ: FaqItem = {
  q: { en: "The person refuses treatment. Can the family consult first?", hi: "मरीज़ इलाज के लिए मना करता है। क्या परिवार पहले परामर्श ले सकता है?" },
  a: {
    en: "Yes. Families can consult to learn how to motivate the person without fights (CRAFT approach) and how to handle withdrawal safely.",
    hi: "हाँ। परिवार परामर्श लेकर सीख सकता है कि बिना झगड़े मरीज़ को कैसे प्रेरित करें (CRAFT तरीका) और विदड्रॉल को सुरक्षित कैसे संभालें।",
  },
};

export const ADDICTION: ConditionContent[] = [
  {
    slug: "deaddiction-psychiatrist-india",
    category: "addiction",
    name: { en: "De-addiction (Nasha Mukti)", hi: "नशा मुक्ति" },
    title: { en: "De-addiction Psychiatrist – Nasha Mukti Treatment", hi: "नशा मुक्ति विशेषज्ञ – शराब, अफ़ीम, स्मैक, तंबाकू का इलाज" },
    h1: { en: "De-addiction treatment (नशा मुक्ति)", hi: "नशा मुक्ति का वैज्ञानिक इलाज" },
    description: {
      en: "Medical de-addiction for alcohol, opium/doda, smack/heroin, ganja, tobacco, pills and behavioural addictions — safe detox, anti-craving medicines and counselling.",
      hi: "शराब, अफ़ीम/डोडा, स्मैक/हेरोइन, गांजा, तंबाकू, गोलियों और मोबाइल/जुए की लत का डॉक्टरी इलाज — सुरक्षित डिटॉक्स, तलब कम करने की दवाएँ और काउंसलिंग।",
    },
    intro: [
      { en: "Addiction is a brain disease, not a moral failure. Willpower alone rarely works because the brain's reward system has changed.", hi: "नशा दिमाग़ की बीमारी है, चरित्र की कमज़ोरी नहीं। सिर्फ़ इच्छाशक्ति से अक्सर काम नहीं चलता, क्योंकि दिमाग़ का इनाम-तंत्र बदल चुका होता है।" },
      { en: "Medical treatment makes withdrawal safe, reduces craving and prevents relapse — often without needing admission.", hi: "डॉक्टरी इलाज से विदड्रॉल सुरक्षित होता है, तलब कम होती है और दोबारा नशा शुरू होने से बचाव होता है — अक्सर भर्ती की ज़रूरत भी नहीं।" },
    ],
    headings: {
      symptoms: { en: "Signs that use has become addiction", hi: "नशा लत बन गया है — इसके संकेत" },
      causes: { en: "Addictions we treat", hi: "किन नशों का इलाज होता है" },
      treatment: { en: "Our 3-phase treatment", hi: "हमारा 3-चरणीय इलाज" },
    },
    symptoms: [
      { en: "Needing it first thing in the morning", hi: "सुबह उठते ही नशे की ज़रूरत" },
      { en: "Needing more to get the same effect (tolerance)", hi: "पहले जितना असर पाने के लिए ज़्यादा मात्रा" },
      { en: "Shaking, sweating, body ache or restlessness on stopping", hi: "छोड़ने पर काँपना, पसीना, बदन दर्द या बेचैनी" },
      { en: "Failed attempts to quit", hi: "छोड़ने की कोशिशें नाकाम" },
      { en: "Money problems, lying, stealing for the substance", hi: "पैसों की तंगी, झूठ, नशे के लिए चोरी" },
      { en: "Family conflict, job loss, health problems", hi: "घर में झगड़े, नौकरी छूटना, सेहत की समस्याएँ" },
    ],
    causes: [
      { en: "Alcohol (sharab/daru)", hi: "शराब (दारू)" },
      { en: "Opium, doda post, smack, heroin, chura", hi: "अफ़ीम, डोडा पोस्त, स्मैक, हेरोइन, चूरा" },
      { en: "Tobacco — bidi, cigarette, gutka, khaini", hi: "तंबाकू — बीड़ी, सिगरेट, गुटखा, खैनी" },
      { en: "Ganja, charas, bhang", hi: "गांजा, चरस, भांग" },
      { en: "Cough syrups, sleeping pills, painkiller tablets", hi: "कफ़ सिरप, नींद की गोलियाँ, दर्द की गोलियाँ" },
      { en: "Mobile, gaming, online betting and pornography", hi: "मोबाइल, गेमिंग, ऑनलाइन सट्टा और पोर्न" },
    ],
    treatment: [
      { en: "Phase 1 – Assessment and safe detox (days to 2 weeks): medicines to control withdrawal, check-up for liver and other complications", hi: "चरण 1 – जाँच और सुरक्षित डिटॉक्स (कुछ दिन से 2 हफ़्ते): विदड्रॉल नियंत्रित करने की दवाएँ, लिवर और दूसरी जटिलताओं की जाँच" },
      { en: "Phase 2 – Anti-craving treatment (months): anti-craving medicines or opioid substitution therapy where suitable, plus counselling", hi: "चरण 2 – तलब कम करने का इलाज (कुछ महीने): उपयुक्त होने पर तलब कम करने वाली दवाएँ या ओपिऑइड सब्स्टिट्यूशन थेरेपी, और काउंसलिंग" },
      { en: "Phase 3 – Relapse prevention: identifying triggers, refusal skills, family therapy, regular follow-up", hi: "चरण 3 – दोबारा नशा न हो: ट्रिगर पहचानना, मना करने के कौशल, परिवार थेरेपी, नियमित फॉलो-अप" },
      { en: "Treating depression, anxiety or sleep problems that drive use", hi: "नशे की वजह बनने वाले डिप्रेशन, घबराहट या नींद की समस्या का इलाज" },
      { en: "Admission is advised only when withdrawal is severe or unsafe at home", hi: "भर्ती की सलाह सिर्फ़ तब, जब विदड्रॉल गंभीर हो या घर पर असुरक्षित हो" },
    ],
    seekHelp: [
      { en: "Daily use or inability to stop", hi: "रोज़ नशा या छोड़ न पाना" },
      { en: "Withdrawal symptoms on stopping — do not stop suddenly on your own", hi: "छोड़ने पर विदड्रॉल लक्षण — अपने आप अचानक बंद न करें" },
      { en: "Fits, confusion, or seeing things after stopping alcohol — emergency", hi: "शराब छोड़ने के बाद दौरे, भ्रम या चीज़ें दिखना — इमरजेंसी" },
    ],
    faqs: [
      CONFIDENTIAL_FAQ,
      FAMILY_FAQ,
      { q: { en: "Is admission necessary?", hi: "क्या भर्ती होना ज़रूरी है?" }, a: { en: "Most people are treated as outpatients or online. Admission is needed only for severe withdrawal or medical complications.", hi: "ज़्यादातर लोगों का इलाज OPD या ऑनलाइन होता है। भर्ती सिर्फ़ गंभीर विदड्रॉल या शारीरिक जटिलता में ज़रूरी है।" } },
    ],
    related: ["alcohol-addiction-treatment-india", "opioid-smack-heroin-opium-doda-addiction-india", "tobacco-nicotine-addiction-treatment-india", "cannabis-ganja-charas-hash-addiction-india"],
    selfTest: "audit",
  },
  {
    slug: "alcohol-addiction-treatment-india",
    category: "addiction",
    name: { en: "Alcohol Addiction", hi: "शराब की लत" },
    title: { en: "Alcohol Addiction Treatment – Safe Detox", hi: "शराब छुड़ाने का इलाज – सुरक्षित डिटॉक्स" },
    h1: { en: "Alcohol addiction: safe detox and recovery", hi: "शराब की लत: सुरक्षित डिटॉक्स और छुटकारा" },
    description: {
      en: "Daily drinking, morning drink, tremors or failed attempts to quit? Medical detox and anti-craving medicines make quitting alcohol safe and achievable.",
      hi: "रोज़ शराब, सुबह पीने की ज़रूरत, हाथ काँपना या छोड़ने में नाकामी? डॉक्टरी डिटॉक्स और तलब कम करने की दवाओं से शराब छोड़ना सुरक्षित और संभव है।",
    },
    intro: [
      { en: "Stopping alcohol suddenly after heavy daily use can be dangerous — it can cause fits and delirium. Detox should be medically supervised.", hi: "रोज़ ज़्यादा पीने के बाद अचानक शराब बंद करना ख़तरनाक हो सकता है — इससे दौरे और बेहोशी/भ्रम (DTs) हो सकते हैं। डिटॉक्स डॉक्टर की निगरानी में होना चाहिए।" },
      { en: "Medicines can reduce craving, and counselling helps rebuild life without alcohol.", hi: "दवाएँ तलब कम कर सकती हैं, और काउंसलिंग शराब के बिना ज़िंदगी फिर से बनाने में मदद करती है।" },
    ],
    symptoms: [
      { en: "Drinking daily or in binges", hi: "रोज़ या एक साथ बहुत ज़्यादा पीना" },
      { en: "Needing a drink in the morning", hi: "सुबह शराब की ज़रूरत" },
      { en: "Tremors, sweating, anxiety or poor sleep when not drinking", hi: "न पीने पर हाथ काँपना, पसीना, घबराहट या नींद न आना" },
      { en: "Blackouts — not remembering events", hi: "ब्लैकआउट — बातें याद न रहना" },
      { en: "Acidity, liver problems, high BP", hi: "एसिडिटी, लिवर की समस्या, हाई BP" },
      { en: "Anger, violence or family conflict when drunk", hi: "नशे में गुस्सा, हिंसा या घर में झगड़े" },
    ],
    causes: [
      { en: "Social and peer pressure, easy availability", hi: "सामाजिक दबाव, दोस्तों का असर, आसानी से मिलना" },
      { en: "Using alcohol for stress, sleep or pain", hi: "तनाव, नींद या दर्द के लिए शराब का सहारा" },
      { en: "Family history of alcohol problems", hi: "परिवार में शराब की समस्या का इतिहास" },
      { en: "Untreated depression or anxiety", hi: "बिना इलाज का डिप्रेशन या घबराहट" },
    ],
    treatment: [
      { en: "Medically supervised detox with withdrawal-control medicines and vitamin B1 supplements", hi: "डॉक्टर की निगरानी में डिटॉक्स — विदड्रॉल रोकने की दवाएँ और विटामिन B1" },
      { en: "Liver and other blood tests", hi: "लिवर और दूसरी ख़ून की जाँच" },
      { en: "Anti-craving medicines chosen for your health", hi: "आपकी सेहत के हिसाब से तलब कम करने की दवाएँ" },
      { en: "Motivational counselling and relapse-prevention therapy", hi: "प्रेरक काउंसलिंग और दोबारा न पीने की थेरेपी" },
      { en: "Family guidance and regular follow-up", hi: "परिवार का मार्गदर्शन और नियमित फॉलो-अप" },
    ],
    seekHelp: [
      { en: "You drink daily or cannot stop", hi: "रोज़ पीते हैं या छोड़ नहीं पाते" },
      { en: "Tremors or sweating on stopping", hi: "छोड़ने पर काँपना या पसीना" },
      { en: "Fits, confusion or hallucinations after stopping — emergency (112)", hi: "छोड़ने के बाद दौरे, भ्रम या चीज़ें दिखना — इमरजेंसी (112)" },
    ],
    faqs: [
      { q: { en: "Can I stop alcohol on my own at home?", hi: "क्या मैं घर पर अपने आप शराब छोड़ सकता हूँ?" }, a: { en: "If you drink heavily every day, stopping suddenly can cause fits. Please consult first for a safe detox plan.", hi: "अगर रोज़ ज़्यादा पीते हैं तो अचानक छोड़ने से दौरे पड़ सकते हैं। सुरक्षित डिटॉक्स योजना के लिए पहले परामर्श लें।" } },
      { q: { en: "Is there a medicine that makes you hate alcohol?", hi: "क्या कोई दवा है जिससे शराब से नफ़रत हो जाए?" }, a: { en: "Some medicines reduce craving; one type causes reactions with alcohol and is used only with consent and supervision. Never give medicines secretly.", hi: "कुछ दवाएँ तलब कम करती हैं; एक तरह की दवा शराब के साथ रिएक्शन करती है, जो सिर्फ़ सहमति और निगरानी में दी जाती है। चोरी-छिपे कभी दवा न दें।" } },
      CONFIDENTIAL_FAQ,
    ],
    related: ["deaddiction-psychiatrist-india", "depression-treatment-india", "sleep-disorders-psychiatrist-india"],
    selfTest: "audit",
  },
  {
    slug: "opioid-smack-heroin-opium-doda-addiction-india",
    category: "addiction",
    name: { en: "Opium, Doda, Smack & Heroin", hi: "अफ़ीम, डोडा पोस्त, स्मैक, हेरोइन" },
    title: { en: "Opium, Doda Post, Smack & Heroin Addiction Treatment", hi: "अफ़ीम, डोडा पोस्त, स्मैक और हेरोइन छुड़ाने का इलाज" },
    h1: { en: "Opioid addiction: afeem, doda, smack, heroin", hi: "अफ़ीम, डोडा पोस्त, स्मैक और हेरोइन की लत का इलाज" },
    description: {
      en: "Body ache, loose motions and restlessness on stopping afeem, doda or smack? Painless, supervised opioid detox and long-term treatment are available.",
      hi: "अफ़ीम, डोडा या स्मैक छोड़ने पर बदन दर्द, दस्त और बेचैनी? बिना तकलीफ़ के डॉक्टरी डिटॉक्स और लंबे समय का इलाज उपलब्ध है।",
    },
    intro: [
      { en: "Opioid addiction is common in Rajasthan — from traditional afeem and doda post to smack and heroin. Withdrawal is very uncomfortable, which is why people keep using.", hi: "राजस्थान में अफ़ीम और डोडा पोस्त से लेकर स्मैक-हेरोइन तक, ओपिऑइड की लत आम है। विदड्रॉल बहुत तकलीफ़देह होता है, इसीलिए लोग नशा जारी रखते हैं।" },
      { en: "Modern medicines make withdrawal comfortable and can keep a person stable for the long term.", hi: "आधुनिक दवाओं से विदड्रॉल आरामदायक बनता है और व्यक्ति लंबे समय तक स्थिर रह सकता है।" },
    ],
    symptoms: [
      { en: "Body ache, yawning, runny nose, goose bumps on stopping", hi: "छोड़ने पर बदन दर्द, जम्हाई, नाक बहना, रोंगटे खड़े होना" },
      { en: "Loose motions, sleeplessness, restlessness", hi: "दस्त, नींद न आना, बेचैनी" },
      { en: "Needing it daily to 'work normally'", hi: "'सामान्य' काम के लिए रोज़ की ज़रूरत" },
      { en: "Increasing dose and spending", hi: "बढ़ती मात्रा और ख़र्च" },
      { en: "Injecting drugs (high risk of HIV/hepatitis)", hi: "इंजेक्शन से नशा (HIV/हेपेटाइटिस का बड़ा ख़तरा)" },
      { en: "Constipation, weight loss, low sexual desire", hi: "कब्ज़, वज़न कम होना, यौन इच्छा में कमी" },
    ],
    causes: [
      { en: "Traditional/social use of afeem and doda at functions", hi: "समारोहों में अफ़ीम/डोडा का पारंपरिक या सामाजिक सेवन" },
      { en: "Use for pain, hard labour or long-distance driving", hi: "दर्द, मेहनत वाले काम या लंबी ड्राइविंग के लिए सेवन" },
      { en: "Peer influence among youth (smack/heroin)", hi: "युवाओं में दोस्तों का असर (स्मैक/हेरोइन)" },
    ],
    treatment: [
      { en: "Comfortable detox with medicines that control withdrawal", hi: "विदड्रॉल नियंत्रित करने वाली दवाओं से आरामदायक डिटॉक्स" },
      { en: "Opioid substitution therapy for long-term stability when suitable", hi: "उपयुक्त होने पर लंबे समय की स्थिरता के लिए ओपिऑइड सब्स्टिट्यूशन थेरेपी" },
      { en: "Anti-craving medicines to prevent relapse after detox", hi: "डिटॉक्स के बाद दोबारा नशा रोकने के लिए तलब कम करने वाली दवाएँ" },
      { en: "HIV, hepatitis B/C screening for injecting users", hi: "इंजेक्शन लेने वालों के लिए HIV, हेपेटाइटिस B/C जाँच" },
      { en: "Counselling, family support and regular follow-up", hi: "काउंसलिंग, परिवार का सहयोग और नियमित फॉलो-अप" },
    ],
    seekHelp: [
      { en: "Daily use or withdrawal on stopping", hi: "रोज़ सेवन या छोड़ने पर विदड्रॉल" },
      { en: "Any injecting drug use", hi: "इंजेक्शन से किसी भी तरह का नशा" },
      { en: "Overdose signs: unconscious, slow breathing, blue lips — call 112", hi: "ओवरडोज़ के संकेत: बेहोशी, धीमी साँस, नीले होंठ — 112 पर कॉल करें" },
    ],
    faqs: [
      { q: { en: "Is substitution therapy just replacing one addiction with another?", hi: "क्या सब्स्टिट्यूशन थेरेपी एक नशे की जगह दूसरा नशा है?" }, a: { en: "No. It is a prescribed, controlled medicine that stops craving and withdrawal without the 'high', allowing a normal life. It is recommended by WHO.", hi: "नहीं। यह डॉक्टर की देखरेख वाली नियंत्रित दवा है जो बिना 'नशे' के तलब और विदड्रॉल रोकती है, जिससे सामान्य ज़िंदगी संभव होती है। WHO इसकी सलाह देता है।" } },
      { q: { en: "Can elderly people who take afeem for years be treated?", hi: "क्या सालों से अफ़ीम लेने वाले बुज़ुर्गों का इलाज हो सकता है?" }, a: { en: "Yes — with slower, gentle tapering and attention to other illnesses.", hi: "हाँ — धीरे-धीरे, नरमी से कमी और दूसरी बीमारियों का ध्यान रखते हुए।" } },
      CONFIDENTIAL_FAQ,
    ],
    related: ["deaddiction-psychiatrist-india", "substance-use-disorders-treatment-india", "alcohol-addiction-treatment-india"],
  },
  {
    slug: "tobacco-nicotine-addiction-treatment-india",
    category: "addiction",
    name: { en: "Tobacco & Gutka", hi: "तंबाकू और गुटखा" },
    title: { en: "Quit Tobacco, Gutka, Bidi & Smoking", hi: "तंबाकू, गुटखा, बीड़ी और सिगरेट छुड़ाने का इलाज" },
    h1: { en: "Quit tobacco: smoking, bidi, gutka, khaini", hi: "तंबाकू छोड़ें: सिगरेट, बीड़ी, गुटखा, खैनी" },
    description: {
      en: "Quitting tobacco is much easier with nicotine replacement, other medicines and counselling. Reduce cancer, heart and lung risk.",
      hi: "निकोटिन रिप्लेसमेंट, दूसरी दवाओं और काउंसलिंग से तंबाकू छोड़ना बहुत आसान हो जाता है। कैंसर, दिल और फेफड़ों का ख़तरा घटाएँ।",
    },
    intro: [
      { en: "Nicotine is highly addictive. Most people need several attempts — medicines double or triple the chance of success.", hi: "निकोटिन की लत बहुत गहरी होती है। ज़्यादातर लोगों को कई कोशिशें करनी पड़ती हैं — दवाओं से सफलता की संभावना दो-तीन गुना बढ़ जाती है।" },
    ],
    symptoms: [
      { en: "Using tobacco soon after waking", hi: "उठते ही तंबाकू लेना" },
      { en: "Strong craving, irritability when without it", hi: "तेज़ तलब, न मिलने पर चिड़चिड़ापन" },
      { en: "Failed attempts to quit", hi: "छोड़ने की नाकाम कोशिशें" },
      { en: "Mouth ulcers, white patches, reduced mouth opening (see a doctor)", hi: "मुँह में छाले, सफ़ेद धब्बे, मुँह कम खुलना (डॉक्टर को दिखाएँ)" },
      { en: "Cough, breathlessness", hi: "खाँसी, साँस फूलना" },
    ],
    causes: [
      { en: "Early start in teenage years", hi: "किशोरावस्था में शुरुआत" },
      { en: "Habit linked to tea, meals, toilet or stress", hi: "चाय, खाने, शौच या तनाव से जुड़ी आदत" },
      { en: "Peer and workplace use", hi: "दोस्तों और कार्यस्थल पर सेवन" },
    ],
    treatment: [
      { en: "Choosing a quit date and a personal plan", hi: "छोड़ने की तारीख़ और व्यक्तिगत योजना तय करना" },
      { en: "Nicotine replacement (gum, lozenges, patches) used correctly", hi: "निकोटिन रिप्लेसमेंट (गम, लॉज़ेंज, पैच) का सही इस्तेमाल" },
      { en: "Prescription medicines when suitable", hi: "उपयुक्त होने पर डॉक्टर की पर्ची वाली दवाएँ" },
      { en: "Counselling for triggers and craving", hi: "ट्रिगर और तलब के लिए काउंसलिंग" },
      { en: "Follow-up to prevent relapse", hi: "दोबारा शुरू न हो, इसके लिए फॉलो-अप" },
    ],
    seekHelp: [
      { en: "You have tried to quit and failed", hi: "छोड़ने की कोशिश नाकाम रही" },
      { en: "Mouth changes or persistent cough — get checked", hi: "मुँह में बदलाव या लगातार खाँसी — जाँच कराएँ" },
      { en: "You want to quit before surgery, pregnancy or for heart health", hi: "ऑपरेशन, गर्भावस्था या दिल की सेहत के लिए छोड़ना चाहते हैं" },
    ],
    faqs: [
      { q: { en: "Is gutka less harmful than cigarettes?", hi: "क्या गुटखा सिगरेट से कम नुकसानदायक है?" }, a: { en: "No. Smokeless tobacco is a major cause of mouth cancer in India.", hi: "नहीं। भारत में मुँह के कैंसर की बड़ी वजह धुआँ-रहित तंबाकू है।" } },
      { q: { en: "Will I gain weight after quitting?", hi: "छोड़ने के बाद वज़न बढ़ेगा?" }, a: { en: "Some people gain a little; diet and activity advice helps. The health benefit is far greater.", hi: "कुछ लोगों का थोड़ा बढ़ता है; खान-पान और व्यायाम की सलाह से मदद मिलती है। सेहत का फ़ायदा कहीं ज़्यादा है।" } },
      { q: { en: "Is there a tobacco self-check?", hi: "क्या तंबाकू की स्व-जाँच है?" }, a: { en: "Yes, our free tobacco/gutka checklist is available in Hindi and English.", hi: "हाँ, हमारी निःशुल्क तंबाकू/गुटखा लक्षण-सूची हिंदी और अंग्रेज़ी में उपलब्ध है।" } },
    ],
    related: ["deaddiction-psychiatrist-india", "alcohol-addiction-treatment-india", "cannabis-ganja-charas-hash-addiction-india"],
    selfTest: "tobacco",
  },
  {
    slug: "cannabis-ganja-charas-hash-addiction-india",
    category: "addiction",
    name: { en: "Ganja, Charas & Bhang", hi: "गांजा, चरस और भांग" },
    title: { en: "Cannabis (Ganja, Charas, Bhang) Addiction Treatment", hi: "गांजा, चरस और भांग की लत का इलाज" },
    h1: { en: "Cannabis addiction: ganja, charas, bhang", hi: "गांजा, चरस और भांग की लत" },
    description: {
      en: "Daily ganja or charas use, poor motivation, anger or suspiciousness? Cannabis can trigger psychosis in young people — treatment helps.",
      hi: "रोज़ गांजा या चरस, मन न लगना, गुस्सा या शक? गांजा युवाओं में मनोविकृति शुरू कर सकता है — इलाज से मदद मिलती है।",
    },
    intro: [
      { en: "Cannabis is not 'harmless'. Regular use can cause dependence, poor memory and motivation, and can trigger psychosis in vulnerable people.", hi: "गांजा 'बेकार की चिंता' नहीं है। नियमित सेवन से लत, याददाश्त और प्रेरणा में कमी, और संवेदनशील लोगों में मनोविकृति हो सकती है।" },
    ],
    symptoms: [
      { en: "Daily or near-daily use", hi: "रोज़ या लगभग रोज़ सेवन" },
      { en: "Irritability, anger, poor sleep when stopping", hi: "छोड़ने पर चिड़चिड़ापन, गुस्सा, नींद न आना" },
      { en: "Loss of motivation, falling grades or work performance", hi: "प्रेरणा की कमी, पढ़ाई या काम में गिरावट" },
      { en: "Suspiciousness, hearing voices (urgent)", hi: "शक, आवाज़ें सुनाई देना (तुरंत इलाज ज़रूरी)" },
      { en: "Red eyes, increased appetite, withdrawal from family", hi: "लाल आँखें, भूख बढ़ना, परिवार से दूरी" },
    ],
    causes: [
      { en: "Early start, peer use, easy availability", hi: "कम उम्र में शुरुआत, दोस्तों का असर, आसानी से मिलना" },
      { en: "Using it for stress, sleep or boredom", hi: "तनाव, नींद या बोरियत के लिए सेवन" },
    ],
    treatment: [
      { en: "Motivational counselling and CBT", hi: "प्रेरक काउंसलिंग और CBT" },
      { en: "Medicines for withdrawal irritability and sleep", hi: "विदड्रॉल की चिड़चिड़ाहट और नींद के लिए दवाएँ" },
      { en: "Early treatment of any psychotic symptoms", hi: "मनोविकृति के लक्षणों का जल्दी इलाज" },
      { en: "Family guidance and relapse prevention", hi: "परिवार का मार्गदर्शन और दोबारा शुरू न होने की तैयारी" },
    ],
    seekHelp: [
      { en: "Use affects studies, work or behaviour", hi: "सेवन से पढ़ाई, काम या व्यवहार पर असर" },
      { en: "Any suspiciousness or hallucinations — urgent", hi: "कोई शक या भ्रम — तुरंत" },
      { en: "Aggression at home", hi: "घर पर आक्रामकता" },
    ],
    faqs: [
      { q: { en: "Is bhang/ganja natural and therefore safe?", hi: "क्या भांग/गांजा प्राकृतिक है, इसलिए सुरक्षित है?" }, a: { en: "Natural does not mean safe. Regular use causes dependence and can trigger serious mental illness.", hi: "प्राकृतिक का मतलब सुरक्षित नहीं। नियमित सेवन से लत लगती है और गंभीर मानसिक बीमारी शुरू हो सकती है।" } },
      FAMILY_FAQ,
      CONFIDENTIAL_FAQ,
    ],
    related: ["psychosis-psychiatrist-india", "deaddiction-psychiatrist-india", "substance-use-disorders-treatment-india"],
  },
  {
    slug: "substance-use-disorders-treatment-india",
    category: "addiction",
    name: { en: "Pills, Cough Syrup & Other Drugs", hi: "गोलियाँ, कफ़ सिरप और दूसरे नशे" },
    title: { en: "Prescription Pill, Cough Syrup & Drug Addiction Treatment", hi: "नशे की गोलियों, कफ़ सिरप और दूसरे ड्रग्स का इलाज" },
    h1: { en: "Addiction to pills, cough syrup and other drugs", hi: "नींद/दर्द की गोलियों, कफ़ सिरप और दूसरे ड्रग्स की लत" },
    description: {
      en: "Dependence on sleeping pills, painkillers, cough syrup or other drugs? Safe tapering and treatment are available, in confidence.",
      hi: "नींद की गोलियों, दर्द की दवाओं, कफ़ सिरप या दूसरे ड्रग्स पर निर्भरता? गोपनीय तरीके से सुरक्षित कमी और इलाज उपलब्ध है।",
    },
    intro: [
      { en: "Some medicines — sleeping pills (benzodiazepines), opioid cough syrups and strong painkillers — can cause addiction when overused.", hi: "कुछ दवाएँ — नींद की गोलियाँ (बेंज़ोडायज़ेपिन), ओपिऑइड वाले कफ़ सिरप और तेज़ दर्द निवारक — ज़्यादा इस्तेमाल से लत बन जाती हैं।" },
      { en: "Stopping some of them suddenly can be dangerous; a supervised taper is needed.", hi: "इनमें से कुछ को अचानक बंद करना ख़तरनाक हो सकता है; निगरानी में धीरे-धीरे कमी ज़रूरी है।" },
    ],
    symptoms: [
      { en: "Taking more than prescribed or from many chemists", hi: "पर्ची से ज़्यादा लेना या कई दुकानों से ख़रीदना" },
      { en: "Anxiety, sleeplessness or tremors when doses are missed", hi: "डोज़ छूटने पर घबराहट, नींद न आना या काँपना" },
      { en: "Drowsiness, slurred speech, memory problems", hi: "सुस्ती, अटक कर बोलना, याददाश्त की कमी" },
      { en: "Spending large amounts on tablets or syrup", hi: "गोलियों या सिरप पर बहुत ख़र्च" },
    ],
    causes: [
      { en: "Long-term use started for sleep, anxiety or pain", hi: "नींद, घबराहट या दर्द के लिए शुरू हुआ लंबा इस्तेमाल" },
      { en: "Easy over-the-counter availability", hi: "बिना पर्ची आसानी से मिल जाना" },
      { en: "Peer use among youth (cough syrup, tablets)", hi: "युवाओं में दोस्तों के साथ सेवन (कफ़ सिरप, गोलियाँ)" },
    ],
    treatment: [
      { en: "Safe, gradual tapering plan", hi: "सुरक्षित, धीरे-धीरे कमी की योजना" },
      { en: "Treating the original problem (sleep, anxiety, pain) in better ways", hi: "असली समस्या (नींद, घबराहट, दर्द) का बेहतर इलाज" },
      { en: "Counselling and relapse prevention", hi: "काउंसलिंग और दोबारा शुरू न होने की तैयारी" },
    ],
    seekHelp: [
      { en: "You cannot reduce the dose on your own", hi: "अपने आप डोज़ कम नहीं कर पा रहे" },
      { en: "Fits or confusion on stopping — emergency", hi: "बंद करने पर दौरे या भ्रम — इमरजेंसी" },
      { en: "Mixing pills with alcohol", hi: "गोलियों के साथ शराब" },
    ],
    faqs: [
      { q: { en: "My doctor prescribed these pills. Can they still be addictive?", hi: "ये गोलियाँ डॉक्टर ने लिखी थीं, क्या फिर भी लत लग सकती है?" }, a: { en: "Yes, some medicines cause dependence if used for months. It is not your fault — it is treatable.", hi: "हाँ, कुछ दवाएँ महीनों तक लेने से निर्भरता बना देती हैं। यह आपकी ग़लती नहीं — इसका इलाज है।" } },
      CONFIDENTIAL_FAQ,
      FAMILY_FAQ,
    ],
    related: ["deaddiction-psychiatrist-india", "sleep-disorders-psychiatrist-india", "opioid-smack-heroin-opium-doda-addiction-india"],
  },
  {
    slug: "internet-addiction-treatment-india",
    category: "addiction",
    name: { en: "Mobile & Internet Addiction", hi: "मोबाइल और इंटरनेट की लत" },
    title: { en: "Mobile Phone, Social Media & Internet Addiction", hi: "मोबाइल, सोशल मीडिया और इंटरनेट की लत" },
    h1: { en: "Mobile, social media and internet overuse", hi: "मोबाइल, सोशल मीडिया और इंटरनेट की लत" },
    description: {
      en: "Hours on reels and social media, poor sleep, falling grades or family fights over the phone? Structured treatment helps teenagers and adults.",
      hi: "घंटों रील्स और सोशल मीडिया, नींद ख़राब, पढ़ाई में गिरावट या फ़ोन पर घर में झगड़े? बच्चों और बड़ों के लिए संरचित इलाज से मदद मिलती है।",
    },
    intro: [
      { en: "Apps are designed to keep us scrolling. When use is out of control and harms sleep, studies, work or relationships, it needs attention.", hi: "ऐप्स इस तरह बनाए जाते हैं कि हम स्क्रॉल करते रहें। जब इस्तेमाल काबू से बाहर हो और नींद, पढ़ाई, काम या रिश्तों को नुकसान पहुँचाए, तो ध्यान देना ज़रूरी है।" },
    ],
    symptoms: [
      { en: "Using the phone late into the night", hi: "देर रात तक फ़ोन चलाना" },
      { en: "Anger or anxiety when the phone is taken away", hi: "फ़ोन लेने पर गुस्सा या घबराहट" },
      { en: "Falling grades, missed work", hi: "पढ़ाई में गिरावट, काम छूटना" },
      { en: "Less interest in family, outdoor activities", hi: "परिवार, बाहर के खेल में रुचि कम" },
      { en: "Eye strain, headaches, poor posture", hi: "आँखों में तनाव, सिरदर्द, ग़लत मुद्रा" },
    ],
    causes: [
      { en: "Loneliness, stress, boredom", hi: "अकेलापन, तनाव, बोरियत" },
      { en: "ADHD, anxiety or depression", hi: "ADHD, घबराहट या डिप्रेशन" },
      { en: "No family screen rules", hi: "परिवार में स्क्रीन के नियम न होना" },
    ],
    treatment: [
      { en: "Assessment for underlying ADHD, anxiety or depression", hi: "पीछे छिपे ADHD, घबराहट या डिप्रेशन की जाँच" },
      { en: "CBT and a gradual digital-use plan (not a sudden ban)", hi: "CBT और धीरे-धीरे डिजिटल इस्तेमाल की योजना (अचानक पाबंदी नहीं)" },
      { en: "Family rules: phone-free meals and bedtime", hi: "परिवार के नियम: खाने और सोने के समय फ़ोन नहीं" },
      { en: "Building offline activities and sleep routine", hi: "बिना स्क्रीन की गतिविधियाँ और नींद की दिनचर्या" },
    ],
    seekHelp: [
      { en: "Use causes fights, aggression or school refusal", hi: "इस्तेमाल से झगड़े, आक्रामकता या स्कूल जाने से इनकार" },
      { en: "Sleep is badly affected", hi: "नींद पर बहुत असर" },
      { en: "Mood is low or there is self-harm talk", hi: "मूड बहुत ख़राब या ख़ुद को नुकसान की बात" },
    ],
    faqs: [
      { q: { en: "Should we just take the phone away?", hi: "क्या फ़ोन छीन लेना चाहिए?" }, a: { en: "Sudden bans often cause conflict. A planned, agreed reduction works better.", hi: "अचानक पाबंदी से अक्सर झगड़ा होता है। तय, आपसी सहमति वाली कमी बेहतर काम करती है।" } },
      { q: { en: "Is this only a child problem?", hi: "क्या यह सिर्फ़ बच्चों की समस्या है?" }, a: { en: "No, adults are commonly affected too.", hi: "नहीं, बड़ों में भी आम है।" } },
      { q: { en: "Can it be treated online?", hi: "क्या इसका ऑनलाइन इलाज हो सकता है?" }, a: { en: "Yes, with parent sessions as needed.", hi: "हाँ, ज़रूरत पर माता-पिता के सत्रों के साथ।" } },
    ],
    related: ["gaming-disorder-treatment-india", "adhd-psychiatrist-india", "student-exam-stress-india"],
  },
  {
    slug: "gaming-disorder-treatment-india",
    category: "addiction",
    name: { en: "Gaming Addiction", hi: "गेमिंग की लत" },
    title: { en: "Gaming Disorder Treatment (PUBG/BGMI, Free Fire)", hi: "गेमिंग की लत का इलाज (BGMI, Free Fire आदि)" },
    h1: { en: "Gaming addiction", hi: "ऑनलाइन/मोबाइल गेम की लत" },
    description: {
      en: "Gaming for hours, skipping school or work, anger when stopped? Gaming disorder is recognised by WHO and is treatable.",
      hi: "घंटों गेम खेलना, स्कूल या काम छोड़ना, रोकने पर गुस्सा? गेमिंग डिसऑर्डर को WHO ने बीमारी माना है और इसका इलाज संभव है।",
    },
    intro: [
      { en: "Gaming disorder means loss of control over gaming, giving it priority over other activities and continuing despite harm, usually for 12 months or more.", hi: "गेमिंग डिसऑर्डर का मतलब है गेमिंग पर नियंत्रण खोना, उसे बाकी कामों से ऊपर रखना और नुकसान के बावजूद जारी रखना — आमतौर पर 12 महीने या ज़्यादा।" },
    ],
    symptoms: [
      { en: "Gaming for many hours daily, late nights", hi: "रोज़ कई घंटे, देर रात तक गेम" },
      { en: "Skipping school, college or work", hi: "स्कूल, कॉलेज या काम छोड़ना" },
      { en: "Aggression when asked to stop", hi: "रोकने पर आक्रामकता" },
      { en: "Spending money on in-game purchases", hi: "गेम के अंदर ख़रीदारी पर पैसा ख़र्च" },
      { en: "Social withdrawal", hi: "लोगों से दूरी" },
    ],
    causes: [
      { en: "Game design rewards, peer competition", hi: "गेम के इनाम, दोस्तों से मुकाबला" },
      { en: "ADHD, social anxiety, loneliness", hi: "ADHD, सामाजिक घबराहट, अकेलापन" },
    ],
    treatment: [
      { en: "CBT and motivational interviewing", hi: "CBT और प्रेरक बातचीत" },
      { en: "Family-based plan with agreed limits", hi: "परिवार के साथ तय सीमाओं वाली योजना" },
      { en: "Treating ADHD/anxiety/depression if present", hi: "ADHD/घबराहट/डिप्रेशन हो तो उसका इलाज" },
      { en: "Restoring sleep, study and physical activity", hi: "नींद, पढ़ाई और शारीरिक गतिविधि फिर से शुरू करना" },
    ],
    seekHelp: [
      { en: "Gaming causes violence or stealing", hi: "गेमिंग से हिंसा या चोरी" },
      { en: "School refusal or failing exams", hi: "स्कूल जाने से इनकार या परीक्षा में फ़ेल" },
      { en: "Sleep reversed (awake all night)", hi: "नींद उलट गई (रात भर जागना)" },
    ],
    faqs: [
      { q: { en: "Is every gamer addicted?", hi: "क्या हर गेम खेलने वाला लती है?" }, a: { en: "No. It is a problem only when control is lost and life is harmed.", hi: "नहीं। समस्या तब है जब नियंत्रण खो जाए और ज़िंदगी पर नुकसान हो।" } },
      { q: { en: "How long does treatment take?", hi: "इलाज में कितना समय लगता है?" }, a: { en: "Usually a few months of regular sessions with family involvement.", hi: "आमतौर पर परिवार के साथ कुछ महीने नियमित सत्र।" } },
      FAMILY_FAQ,
    ],
    related: ["internet-addiction-treatment-india", "gambling-disorder-treatment-india", "adhd-psychiatrist-india"],
  },
  {
    slug: "gambling-disorder-treatment-india",
    category: "addiction",
    name: { en: "Betting & Gambling", hi: "सट्टा और जुआ" },
    title: { en: "Online Betting & Gambling Addiction Treatment", hi: "ऑनलाइन सट्टा और जुए की लत का इलाज" },
    h1: { en: "Online betting and gambling addiction", hi: "ऑनलाइन सट्टा और जुए की लत" },
    description: {
      en: "Losing money on betting apps, chasing losses, borrowing or hiding debts? Gambling disorder is treatable — act early.",
      hi: "सट्टे के ऐप्स पर पैसा हारना, हार की भरपाई के लिए और खेलना, उधार लेना या कर्ज़ छिपाना? जुए की लत का इलाज संभव है — जल्दी कदम उठाएँ।",
    },
    intro: [
      { en: "Gambling changes the brain's reward system much like drugs. The urge to 'win back' losses keeps people trapped.", hi: "जुआ दिमाग़ के इनाम-तंत्र को नशे की तरह बदल देता है। हारा हुआ पैसा 'वापस जीतने' की चाह लोगों को फँसाए रखती है।" },
    ],
    symptoms: [
      { en: "Chasing losses with bigger bets", hi: "हार की भरपाई के लिए बड़े दाँव" },
      { en: "Borrowing, selling valuables, hiding debts", hi: "उधार, क़ीमती सामान बेचना, कर्ज़ छिपाना" },
      { en: "Lying to family about money", hi: "पैसों के बारे में परिवार से झूठ" },
      { en: "Restlessness when trying to stop", hi: "छोड़ने की कोशिश पर बेचैनी" },
      { en: "Low mood, hopelessness after losses", hi: "हार के बाद उदासी, नाउम्मीदी" },
    ],
    causes: [
      { en: "Easy access to betting apps and fantasy games", hi: "सट्टे के ऐप्स और फ़ैंटेसी गेम्स तक आसान पहुँच" },
      { en: "Early wins, financial stress, impulsivity", hi: "शुरुआती जीत, पैसों का तनाव, आवेग" },
    ],
    treatment: [
      { en: "CBT focused on gambling thoughts and urges", hi: "जुए के विचारों और तलब पर केंद्रित CBT" },
      { en: "Financial safeguards with family (limits, blocking apps)", hi: "परिवार के साथ पैसों की सुरक्षा (सीमाएँ, ऐप्स ब्लॉक करना)" },
      { en: "Treating depression and suicide risk", hi: "डिप्रेशन और आत्महत्या के जोखिम का इलाज" },
      { en: "Medicines to reduce urges in some cases", hi: "कुछ मामलों में तलब कम करने की दवाएँ" },
    ],
    seekHelp: [
      { en: "Debts are growing", hi: "कर्ज़ बढ़ रहा है" },
      { en: "Thoughts of self-harm due to losses — seek help today", hi: "हार की वजह से ख़ुद को नुकसान के विचार — आज ही मदद लें" },
      { en: "Family conflict over money", hi: "पैसों को लेकर घर में झगड़े" },
    ],
    faqs: [
      { q: { en: "Is online betting addiction real?", hi: "क्या ऑनलाइन सट्टे की लत असली बीमारी है?" }, a: { en: "Yes. Gambling disorder is a recognised mental health condition.", hi: "हाँ। जुए की लत एक मान्यता प्राप्त मानसिक स्वास्थ्य समस्या है।" } },
      CONFIDENTIAL_FAQ,
      FAMILY_FAQ,
    ],
    related: ["gaming-disorder-treatment-india", "depression-treatment-india", "internet-addiction-treatment-india"],
  },
  {
    slug: "problematic-pornography-use-treatment-india",
    category: "addiction",
    name: { en: "Pornography Overuse", hi: "पोर्न देखने की आदत" },
    title: { en: "Problematic Pornography Use – Confidential Help", hi: "पोर्न देखने की आदत – गोपनीय मदद" },
    h1: { en: "Problematic pornography use", hi: "पोर्न देखने की बेकाबू आदत" },
    description: {
      en: "Unable to control porn use, guilt, or effects on relationships and sexual performance? Confidential, non-judgemental treatment is available.",
      hi: "पोर्न देखने पर काबू नहीं, अपराध-बोध, या रिश्तों और यौन प्रदर्शन पर असर? गोपनीय और बिना जजमेंट के इलाज उपलब्ध है।",
    },
    intro: [
      { en: "For some people, pornography use becomes compulsive and causes distress. Treatment focuses on control, not shame.", hi: "कुछ लोगों में पोर्न देखना मजबूरी बन जाता है और परेशानी देता है। इलाज का ध्यान शर्म पर नहीं, नियंत्रण पर होता है।" },
    ],
    symptoms: [
      { en: "Spending much more time than intended", hi: "सोचे से कहीं ज़्यादा समय" },
      { en: "Repeated failed attempts to cut down", hi: "कम करने की बार-बार नाकाम कोशिशें" },
      { en: "Guilt, low mood, effect on sleep or study", hi: "अपराध-बोध, उदासी, नींद या पढ़ाई पर असर" },
      { en: "Reduced interest in a real partner or performance worries", hi: "साथी में रुचि कम होना या प्रदर्शन की चिंता" },
    ],
    causes: [
      { en: "Stress, loneliness, boredom", hi: "तनाव, अकेलापन, बोरियत" },
      { en: "Anxiety, depression or ADHD", hi: "घबराहट, डिप्रेशन या ADHD" },
      { en: "Easy 24×7 access", hi: "24×7 आसान पहुँच" },
    ],
    treatment: [
      { en: "Non-judgemental assessment", hi: "बिना जजमेंट के जाँच" },
      { en: "CBT for urges and triggers", hi: "तलब और ट्रिगर के लिए CBT" },
      { en: "Treating anxiety, depression or sexual concerns", hi: "घबराहट, डिप्रेशन या यौन चिंताओं का इलाज" },
      { en: "Couple counselling when needed", hi: "ज़रूरत पर दंपति काउंसलिंग" },
    ],
    seekHelp: [
      { en: "Use feels out of control", hi: "इस्तेमाल काबू से बाहर लगे" },
      { en: "It affects your relationship or work", hi: "रिश्ते या काम पर असर" },
      { en: "Severe guilt or low mood", hi: "बहुत ज़्यादा अपराध-बोध या उदासी" },
    ],
    faqs: [
      CONFIDENTIAL_FAQ,
      { q: { en: "Does this cause weakness or 'dhat' loss?", hi: "क्या इससे कमज़ोरी या 'धात' की कमी होती है?" }, a: { en: "No. Semen loss does not cause weakness. Worry about it is common and treatable.", hi: "नहीं। वीर्य निकलने से कमज़ोरी नहीं आती। इसकी चिंता आम है और इसका इलाज होता है।" } },
      { q: { en: "Is consultation online available?", hi: "क्या ऑनलाइन परामर्श मिल सकता है?" }, a: { en: "Yes, fully private video consultation.", hi: "हाँ, पूरी तरह निजी वीडियो परामर्श।" } },
    ],
    related: ["sex-specialist-india", "dhat-syndrome-treatment-india", "internet-addiction-treatment-india"],
  },
];
