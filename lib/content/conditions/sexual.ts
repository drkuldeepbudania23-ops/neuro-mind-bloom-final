import type { ConditionContent, FaqItem } from "../types";

const PRIVACY: FaqItem = {
  q: { en: "Is the consultation private?", hi: "क्या परामर्श पूरी तरह निजी है?" },
  a: {
    en: "Yes. Consultation is one-to-one by private video, and your details are kept confidential. You can choose Hindi or English.",
    hi: "हाँ। परामर्श निजी वीडियो पर आमने-सामने होता है और आपकी जानकारी गोपनीय रहती है। आप हिंदी या अंग्रेज़ी चुन सकते हैं।",
  },
};

const NO_QUACKS: FaqItem = {
  q: { en: "Should I try 'gupt rog' medicines from advertisements?", hi: "क्या विज्ञापनों वाली 'गुप्त रोग' की दवाएँ लेनी चाहिए?" },
  a: {
    en: "Please avoid them. Many contain hidden steroids or other drugs and can be harmful. Scientific treatment is safer and works better.",
    hi: "कृपया इनसे बचें। कई में छिपे स्टेरॉयड या दूसरी दवाएँ होती हैं जो नुकसान कर सकती हैं। वैज्ञानिक इलाज ज़्यादा सुरक्षित और असरदार है।",
  },
};

export const SEXUAL: ConditionContent[] = [
  {
    slug: "sex-specialist-india",
    category: "sexual",
    name: { en: "Sexual Health (Gupt Rog)", hi: "सेक्स समस्याएँ (गुप्त रोग)" },
    title: { en: "Sex Specialist – Confidential Sexual Health Consultation", hi: "सेक्स रोग विशेषज्ञ – गोपनीय यौन स्वास्थ्य परामर्श" },
    h1: { en: "Sexual health problems — confidential treatment", hi: "यौन (सेक्स) समस्याओं का गोपनीय और वैज्ञानिक इलाज" },
    description: {
      en: "Premature ejaculation, erectile difficulty, low desire, dhat worries or performance anxiety? Confidential, scientific treatment by an MD Psychiatrist.",
      hi: "शीघ्रपतन, इरेक्शन की समस्या, इच्छा में कमी, धात की चिंता या परफॉर्मेंस की घबराहट? MD मनोचिकित्सक द्वारा गोपनीय, वैज्ञानिक इलाज।",
    },
    intro: [
      { en: "Most sexual problems are common, treatable and closely linked to anxiety, stress, relationship issues and lifestyle — areas where a psychiatrist can help directly.", hi: "ज़्यादातर यौन समस्याएँ आम और इलाज योग्य हैं, और घबराहट, तनाव, रिश्तों और जीवनशैली से गहराई से जुड़ी होती हैं — जिनमें मनोचिकित्सक सीधे मदद कर सकते हैं।" },
      { en: "There is no need to feel ashamed or to rely on roadside 'gupt rog' clinics.", hi: "शर्म महसूस करने या सड़क किनारे के 'गुप्त रोग' क्लीनिक पर निर्भर होने की कोई ज़रूरत नहीं।" },
    ],
    headings: {
      symptoms: { en: "Problems we treat", hi: "किन समस्याओं का इलाज होता है" },
      causes: { en: "Common causes", hi: "आम कारण" },
    },
    symptoms: [
      { en: "Premature (early) ejaculation", hi: "शीघ्रपतन (जल्दी डिस्चार्ज)" },
      { en: "Erectile difficulty", hi: "इरेक्शन (तनाव) न होना या न टिकना" },
      { en: "Low sexual desire", hi: "यौन इच्छा में कमी" },
      { en: "Dhat (semen loss) worry and night emissions anxiety", hi: "धात गिरने और स्वप्नदोष की चिंता" },
      { en: "Performance anxiety, fear before marriage", hi: "परफॉर्मेंस की घबराहट, शादी से पहले डर" },
      { en: "Guilt about masturbation", hi: "हस्तमैथुन को लेकर अपराध-बोध" },
      { en: "Painful intercourse or lack of satisfaction (women)", hi: "संबंध के समय दर्द या संतुष्टि न होना (महिलाएँ)" },
      { en: "Sexual side-effects of medicines or addiction", hi: "दवाओं या नशे के यौन दुष्प्रभाव" },
    ],
    causes: [
      { en: "Anxiety, stress and fear of failure", hi: "घबराहट, तनाव और नाकामी का डर" },
      { en: "Myths and wrong information from friends, internet or advertisements", hi: "दोस्तों, इंटरनेट या विज्ञापनों से मिली ग़लत जानकारी और भ्रम" },
      { en: "Diabetes, BP, smoking, alcohol, obesity", hi: "डायबिटीज़, BP, धूम्रपान, शराब, मोटापा" },
      { en: "Depression, relationship conflict", hi: "डिप्रेशन, रिश्तों में तनाव" },
      { en: "Some medicines and substance use", hi: "कुछ दवाएँ और नशा" },
    ],
    treatment: [
      { en: "Private, detailed discussion and relevant blood tests when needed", hi: "निजी, विस्तृत बातचीत और ज़रूरत पर ख़ून की जाँच" },
      { en: "Correct sexual education — removing myths reduces anxiety", hi: "सही यौन जानकारी — भ्रम दूर होने से घबराहट कम होती है" },
      { en: "Proven medicines for PE and erectile difficulty when suitable", hi: "उपयुक्त होने पर शीघ्रपतन और इरेक्शन के लिए प्रमाणित दवाएँ" },
      { en: "Sex therapy techniques and couple counselling", hi: "सेक्स थेरेपी तकनीकें और दंपति काउंसलिंग" },
      { en: "Treating anxiety, depression, addiction and lifestyle factors", hi: "घबराहट, डिप्रेशन, नशा और जीवनशैली का इलाज" },
    ],
    seekHelp: [
      { en: "The problem continues for more than a few weeks", hi: "समस्या कुछ हफ़्तों से ज़्यादा बनी रहे" },
      { en: "It causes stress in marriage or relationship", hi: "शादी या रिश्ते में तनाव हो" },
      { en: "You are taking unknown 'power' medicines", hi: "अनजान 'ताक़त' की दवाएँ ले रहे हों" },
    ],
    faqs: [
      PRIVACY,
      NO_QUACKS,
      { q: { en: "Why see a psychiatrist for sexual problems?", hi: "यौन समस्या के लिए मनोचिकित्सक क्यों?" }, a: { en: "Sexual medicine (psychosexual medicine) is part of psychiatry training, and anxiety and relationships play a large role in most problems.", hi: "सेक्सुअल मेडिसिन (साइकोसेक्सुअल मेडिसिन) मनोचिकित्सा प्रशिक्षण का हिस्सा है, और ज़्यादातर समस्याओं में घबराहट और रिश्तों की बड़ी भूमिका होती है।" } },
    ],
    related: ["premature-ejaculation-treatment-india", "erectile-dysfunction-treatment-india", "dhat-syndrome-treatment-india", "problematic-pornography-use-treatment-india"],
  },
  {
    slug: "sex-specialist-ajmer",
    category: "sexual",
    name: { en: "Sex Specialist in Ajmer", hi: "अजमेर में सेक्स रोग विशेषज्ञ" },
    title: { en: "Sex Specialist in Ajmer – Confidential Consultation", hi: "अजमेर में सेक्स रोग विशेषज्ञ – गोपनीय परामर्श" },
    h1: { en: "Sex specialist in Ajmer — Dr. Kuldeep Budania", hi: "अजमेर में सेक्स रोग विशेषज्ञ — डॉ. कुलदीप बुडानिया" },
    description: {
      en: "Confidential treatment for premature ejaculation, erectile difficulty, dhat and performance anxiety — based in Ajmer, with private video consultation.",
      hi: "शीघ्रपतन, इरेक्शन, धात और परफॉर्मेंस की घबराहट का गोपनीय इलाज — अजमेर से, निजी वीडियो परामर्श के साथ।",
    },
    intro: [
      { en: "Dr. Kuldeep Budania (MBBS, MD Psychiatry) is based in Ajmer and offers private consultations for sexual health concerns in Hindi and English.", hi: "डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) अजमेर में हैं और हिंदी व अंग्रेज़ी में यौन स्वास्थ्य के लिए निजी परामर्श देते हैं।" },
      { en: "Patients from Ajmer, Kishangarh, Beawar, Nasirabad, Pushkar and nearby areas can consult from home by video.", hi: "अजमेर, किशनगढ़, ब्यावर, नसीराबाद, पुष्कर और आसपास के मरीज़ घर बैठे वीडियो से परामर्श ले सकते हैं।" },
    ],
    headings: { symptoms: { en: "Problems we treat", hi: "किन समस्याओं का इलाज होता है" }, causes: { en: "Why choose a qualified specialist", hi: "योग्य विशेषज्ञ ही क्यों चुनें" } },
    symptoms: [
      { en: "Premature ejaculation", hi: "शीघ्रपतन" },
      { en: "Erectile difficulty", hi: "इरेक्शन की समस्या" },
      { en: "Low desire", hi: "यौन इच्छा में कमी" },
      { en: "Dhat syndrome and night emission worries", hi: "धात रोग और स्वप्नदोष की चिंता" },
      { en: "Performance anxiety and pre-marriage fears", hi: "परफॉर्मेंस की घबराहट और शादी से पहले का डर" },
      { en: "Couple and intimacy problems", hi: "दंपति और नज़दीकी से जुड़ी समस्याएँ" },
    ],
    causes: [
      { en: "Diagnosis by an MD doctor — not guesswork or advertisements", hi: "MD डॉक्टर द्वारा निदान — अंदाज़ा या विज्ञापन नहीं" },
      { en: "Safe, evidence-based medicines with clear dosing", hi: "सुरक्षित, प्रमाणित दवाएँ और साफ़ डोज़" },
      { en: "Treatment of the mind (anxiety, stress) along with the body", hi: "शरीर के साथ मन (घबराहट, तनाव) का भी इलाज" },
      { en: "Complete confidentiality", hi: "पूरी गोपनीयता" },
    ],
    treatment: [
      { en: "Private video consultation at a time that suits you", hi: "आपकी सुविधा के समय निजी वीडियो परामर्श" },
      { en: "Assessment of physical, psychological and relationship factors", hi: "शारीरिक, मानसिक और रिश्तों से जुड़े कारणों की जाँच" },
      { en: "Medicines and sex-therapy techniques as needed", hi: "ज़रूरत के हिसाब से दवाएँ और सेक्स थेरेपी तकनीकें" },
      { en: "Digitally signed prescription on WhatsApp", hi: "WhatsApp पर डिजिटल हस्ताक्षरित पर्चा" },
      { en: "Follow-up until the problem settles", hi: "समस्या ठीक होने तक फॉलो-अप" },
    ],
    seekHelp: [
      { en: "The problem affects your confidence or marriage", hi: "समस्या आत्मविश्वास या शादी पर असर डाल रही हो" },
      { en: "Before marriage if you have worries", hi: "शादी से पहले कोई चिंता हो" },
      { en: "If 'power' medicines have caused side-effects", hi: "'ताक़त' की दवाओं से साइड-इफ़ेक्ट हुए हों" },
    ],
    faqs: [PRIVACY, NO_QUACKS, { q: { en: "Can my wife join the consultation?", hi: "क्या पत्नी भी परामर्श में शामिल हो सकती है?" }, a: { en: "Yes, couple sessions are often very helpful.", hi: "हाँ, दंपति सत्र अक्सर बहुत मददगार होते हैं।" } }],
    related: ["sex-specialist-india", "premature-ejaculation-treatment-india", "psychiatrist-ajmer"],
  },
  {
    slug: "dhat-syndrome-treatment-india",
    category: "sexual",
    name: { en: "Dhat Syndrome", hi: "धात रोग" },
    title: { en: "Dhat Syndrome – Semen Loss Worry: Facts & Treatment", hi: "धात रोग – धात गिरने की चिंता: सच और इलाज" },
    h1: { en: "Dhat syndrome: the truth about 'semen loss'", hi: "धात रोग: 'धात गिरने' का सच" },
    description: {
      en: "Worried that semen loss in urine or night emissions causes weakness? Learn the medical facts about dhat and how the anxiety is treated.",
      hi: "पेशाब में धात जाने या स्वप्नदोष से कमज़ोरी की चिंता? धात के बारे में डॉक्टरी सच और इस घबराहट के इलाज के बारे में जानें।",
    },
    intro: [
      { en: "Many young men in India believe that losing semen ('dhat') drains strength. This belief causes weakness, anxiety and sexual worries — but semen loss itself does not cause weakness.", hi: "भारत में बहुत से युवा मानते हैं कि धात (वीर्य) निकलने से ताक़त ख़त्म होती है। यही विश्वास कमज़ोरी, घबराहट और यौन चिंता पैदा करता है — जबकि धात निकलने से ख़ुद कोई कमज़ोरी नहीं आती।" },
      { en: "The body continuously makes semen. Night emissions and masturbation are normal. The symptoms are real, and they improve with the right explanation and treatment.", hi: "शरीर लगातार वीर्य बनाता रहता है। स्वप्नदोष और हस्तमैथुन सामान्य हैं। लक्षण असली होते हैं, और सही समझ व इलाज से ठीक हो जाते हैं।" },
    ],
    symptoms: [
      { en: "Belief that whitish urine contains 'dhat'", hi: "यह मानना कि सफ़ेद/गाढ़े पेशाब में 'धात' जा रही है" },
      { en: "Weakness, tiredness, body ache", hi: "कमज़ोरी, थकान, बदन दर्द" },
      { en: "Poor concentration and memory", hi: "ध्यान और याददाश्त की कमी" },
      { en: "Worry about marriage or sexual performance", hi: "शादी या यौन प्रदर्शन की चिंता" },
      { en: "Guilt about masturbation or night emissions", hi: "हस्तमैथुन या स्वप्नदोष को लेकर अपराध-बोध" },
      { en: "Anxiety, low mood, repeated visits to 'gupt rog' clinics", hi: "घबराहट, उदासी, बार-बार 'गुप्त रोग' क्लीनिक जाना" },
    ],
    causes: [
      { en: "Cultural myths and misleading advertisements", hi: "सांस्कृतिक भ्रम और भ्रामक विज्ञापन" },
      { en: "Underlying anxiety or depression", hi: "पीछे छिपी घबराहट या डिप्रेशन" },
      { en: "Whitish urine is usually phosphates/crystals — not semen", hi: "सफ़ेद पेशाब आमतौर पर फ़ॉस्फ़ेट/क्रिस्टल होता है — वीर्य नहीं" },
    ],
    treatment: [
      { en: "Clear, respectful explanation of how the body works", hi: "शरीर कैसे काम करता है, इसकी साफ़ और सम्मानजनक जानकारी" },
      { en: "Simple urine test if needed to reassure", hi: "ज़रूरत हो तो तसल्ली के लिए पेशाब की साधारण जाँच" },
      { en: "Treatment of anxiety/depression — medicines and counselling", hi: "घबराहट/डिप्रेशन का इलाज — दवाएँ और काउंसलिंग" },
      { en: "Stopping unnecessary 'power' medicines", hi: "बेवजह की 'ताक़त' वाली दवाएँ बंद करना" },
      { en: "Help with any real sexual difficulty", hi: "कोई असली यौन समस्या हो तो उसका इलाज" },
    ],
    seekHelp: [
      { en: "Worry about dhat affects your daily life", hi: "धात की चिंता रोज़ की ज़िंदगी पर असर डाल रही हो" },
      { en: "You feel weak, low or anxious most days", hi: "ज़्यादातर दिन कमज़ोरी, उदासी या घबराहट हो" },
      { en: "You are spending money on unproven treatments", hi: "बिना प्रमाण वाले इलाज पर पैसे ख़र्च हो रहे हों" },
    ],
    faqs: [
      { q: { en: "Does night emission (swapnadosh) cause weakness?", hi: "क्या स्वप्नदोष से कमज़ोरी आती है?" }, a: { en: "No. It is a normal body process, especially in young men.", hi: "नहीं। यह शरीर की सामान्य प्रक्रिया है, ख़ासकर युवाओं में।" } },
      { q: { en: "Is masturbation harmful?", hi: "क्या हस्तमैथुन नुकसानदायक है?" }, a: { en: "No, it does not cause weakness or impotence. Problems arise only if it becomes compulsive or causes distress.", hi: "नहीं, इससे कमज़ोरी या नपुंसकता नहीं होती। समस्या तभी है जब यह मजबूरी बन जाए या परेशानी दे।" } },
      NO_QUACKS,
    ],
    related: ["sex-specialist-india", "anxiety-phobia-treatment-india", "premature-ejaculation-treatment-india"],
  },
  {
    slug: "premature-ejaculation-treatment-india",
    category: "sexual",
    name: { en: "Premature Ejaculation", hi: "शीघ्रपतन" },
    title: { en: "Premature Ejaculation Treatment – Confidential", hi: "शीघ्रपतन का इलाज – गोपनीय" },
    h1: { en: "Premature ejaculation (शीघ्रपतन)", hi: "शीघ्रपतन (जल्दी डिस्चार्ज) का इलाज" },
    description: {
      en: "Ejaculating sooner than you or your partner want? PE is the most common male sexual concern and responds well to treatment.",
      hi: "आपकी या साथी की इच्छा से पहले डिस्चार्ज हो जाता है? शीघ्रपतन पुरुषों की सबसे आम यौन समस्या है और इसका अच्छा इलाज होता है।",
    },
    intro: [
      { en: "Premature ejaculation is common at all ages. Anxiety often makes it worse, which creates a cycle of fear and failure.", hi: "शीघ्रपतन हर उम्र में आम है। घबराहट इसे और बढ़ाती है, जिससे डर और नाकामी का चक्र बन जाता है।" },
    ],
    symptoms: [
      { en: "Ejaculation within a short time of penetration", hi: "संबंध शुरू होते ही थोड़े समय में डिस्चार्ज" },
      { en: "Little control over timing", hi: "समय पर नियंत्रण न होना" },
      { en: "Distress, avoidance of intimacy", hi: "परेशानी, नज़दीकी से बचना" },
      { en: "Worry affecting the relationship", hi: "चिंता से रिश्ते पर असर" },
    ],
    causes: [
      { en: "Performance anxiety and stress", hi: "परफॉर्मेंस की घबराहट और तनाव" },
      { en: "Biological sensitivity", hi: "शारीरिक संवेदनशीलता" },
      { en: "Erectile difficulty, thyroid or prostate issues in some", hi: "कुछ लोगों में इरेक्शन की समस्या, थायरॉइड या प्रोस्टेट" },
    ],
    treatment: [
      { en: "Education and reassurance for both partners", hi: "दोनों साथियों को सही जानकारी और तसल्ली" },
      { en: "Behavioural techniques (stop–start, squeeze)", hi: "व्यवहारिक तकनीकें (स्टॉप-स्टार्ट, स्क्वीज़)" },
      { en: "Proven medicines when suitable", hi: "उपयुक्त होने पर प्रमाणित दवाएँ" },
      { en: "Treating anxiety and any erectile difficulty", hi: "घबराहट और इरेक्शन की समस्या का इलाज" },
    ],
    seekHelp: [
      { en: "It happens most of the time and causes distress", hi: "ज़्यादातर बार हो और परेशानी दे" },
      { en: "It affects your relationship", hi: "रिश्ते पर असर हो" },
      { en: "You are worried before marriage", hi: "शादी से पहले चिंता हो" },
    ],
    faqs: [
      PRIVACY,
      { q: { en: "Is PE permanent?", hi: "क्या शीघ्रपतन हमेशा रहता है?" }, a: { en: "No. Most men improve significantly with treatment.", hi: "नहीं। इलाज से ज़्यादातर पुरुषों में अच्छा सुधार होता है।" } },
      NO_QUACKS,
    ],
    related: ["erectile-dysfunction-treatment-india", "sex-specialist-india", "dhat-syndrome-treatment-india"],
  },
  {
    slug: "erectile-dysfunction-treatment-india",
    category: "sexual",
    name: { en: "Erectile Difficulty", hi: "इरेक्शन की समस्या" },
    title: { en: "Erectile Dysfunction Treatment – Confidential", hi: "इरेक्शन की समस्या (स्तंभन दोष) का इलाज – गोपनीय" },
    h1: { en: "Erectile difficulty (erectile dysfunction)", hi: "इरेक्शन (तनाव) न होना या न टिकना" },
    description: {
      en: "Difficulty getting or keeping an erection? It is common and treatable — and can be an early sign of diabetes or heart problems.",
      hi: "इरेक्शन होने या टिकने में दिक्कत? यह आम और इलाज योग्य है — और डायबिटीज़ या दिल की समस्या का शुरुआती संकेत भी हो सकता है।",
    },
    intro: [
      { en: "In young men, erectile difficulty is most often due to anxiety. In older men, physical factors such as diabetes, BP and smoking are common. Often both play a part.", hi: "युवाओं में इरेक्शन की समस्या ज़्यादातर घबराहट से होती है। उम्रदराज़ लोगों में डायबिटीज़, BP और धूम्रपान जैसे शारीरिक कारण आम हैं। अक्सर दोनों का हाथ होता है।" },
    ],
    symptoms: [
      { en: "Difficulty getting an erection", hi: "इरेक्शन होने में दिक्कत" },
      { en: "Losing the erection during intercourse", hi: "संबंध के दौरान इरेक्शन चले जाना" },
      { en: "Morning erections present but problem with partner (suggests anxiety)", hi: "सुबह इरेक्शन होता है पर साथी के साथ नहीं (घबराहट का संकेत)" },
      { en: "Reduced confidence, avoiding intimacy", hi: "आत्मविश्वास में कमी, नज़दीकी से बचना" },
    ],
    causes: [
      { en: "Performance anxiety, stress, depression", hi: "परफॉर्मेंस की घबराहट, तनाव, डिप्रेशन" },
      { en: "Diabetes, high BP, cholesterol, obesity", hi: "डायबिटीज़, हाई BP, कोलेस्ट्रॉल, मोटापा" },
      { en: "Smoking, alcohol, opioids", hi: "धूम्रपान, शराब, अफ़ीम/ओपिऑइड" },
      { en: "Some medicines; low testosterone in a few", hi: "कुछ दवाएँ; कुछ लोगों में टेस्टोस्टेरोन कम" },
    ],
    treatment: [
      { en: "Check-up for sugar, BP, lipids and hormones when indicated", hi: "ज़रूरत पर शुगर, BP, लिपिड और हार्मोन की जाँच" },
      { en: "Proven, safe medicines prescribed with correct guidance", hi: "सही मार्गदर्शन के साथ प्रमाणित, सुरक्षित दवाएँ" },
      { en: "Anxiety reduction and sex therapy (sensate focus)", hi: "घबराहट कम करना और सेक्स थेरेपी (सेंसेट फ़ोकस)" },
      { en: "Quitting tobacco/alcohol, exercise, weight control", hi: "तंबाकू/शराब छोड़ना, व्यायाम, वज़न नियंत्रण" },
    ],
    seekHelp: [
      { en: "Problem lasts more than a few weeks", hi: "समस्या कुछ हफ़्तों से ज़्यादा रहे" },
      { en: "You have diabetes, BP or heart disease", hi: "आपको डायबिटीज़, BP या दिल की बीमारी हो" },
      { en: "Chest pain with exertion — see a physician first", hi: "मेहनत पर सीने में दर्द — पहले फ़िज़िशियन को दिखाएँ" },
    ],
    faqs: [
      PRIVACY,
      { q: { en: "Are ED medicines safe?", hi: "क्या इरेक्शन की दवाएँ सुरक्षित हैं?" }, a: { en: "Yes, when prescribed after checking your health and other medicines (they must never be combined with nitrate heart medicines).", hi: "हाँ, जब सेहत और दूसरी दवाओं की जाँच के बाद लिखी जाएँ (दिल की नाइट्रेट दवाओं के साथ कभी नहीं)।" } },
      NO_QUACKS,
    ],
    related: ["premature-ejaculation-treatment-india", "sex-specialist-india", "tobacco-nicotine-addiction-treatment-india"],
  },
];
