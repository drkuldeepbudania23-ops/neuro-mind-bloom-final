import type { ConditionContent } from "../types";
import { b, faq, topUpFaqs } from "./_h";

const PRIVATE = faq(
  "Is the consultation private?",
  "क्या परामर्श निजी है?",
  "Yes. It is one-to-one by private video and your details stay confidential. Your partner can join if you wish.",
  "हाँ। यह निजी वीडियो पर आमने-सामने होता है और आपकी जानकारी गोपनीय रहती है। आप चाहें तो साथी भी शामिल हो सकते हैं।"
);

const NO_ADS = faq(
  "Should I try medicines advertised for 'gupt rog'?",
  "क्या 'गुप्त रोग' के विज्ञापन वाली दवाएँ लें?",
  "Please avoid them. Many contain hidden steroids or undeclared drugs. Scientific assessment and treatment are safer.",
  "कृपया इनसे बचें। कई में छिपे स्टेरॉयड या बिना बताई दवाएँ होती हैं। वैज्ञानिक जाँच और इलाज ज़्यादा सुरक्षित है।"
);

const PARTNER = [
  b("Talk openly and without blame; treat it as a shared concern", "खुलकर और बिना दोष दिए बात करें; इसे साझा चिंता मानें"),
  b("Reduce pressure on \"performance\"; focus on closeness and comfort", "\"परफ़ॉर्मेंस\" का दबाव कम करें; नज़दीकी और सहजता पर ध्यान दें"),
  b("Attend a joint session if possible — outcomes are better", "हो सके तो साथ में एक सेशन लें — नतीजे बेहतर होते हैं"),
];

/** New sexual-health library pages (all group "sexual"). Clinical, non-explicit language only. */
const PAGES: ConditionContent[] = [
  {
    slug: "delayed-ejaculation-treatment-india",
    category: "sexual",
    group: "sexual",
    name: b("Delayed ejaculation", "देर से स्खलन (डिलेड इजैक्युलेशन)"),
    title: b("Delayed Ejaculation – Causes & Treatment", "देर से स्खलन – कारण और इलाज"),
    h1: b("Delayed ejaculation: causes and treatment", "देर से स्खलन: कारण और इलाज"),
    description: b(
      "Difficulty or inability to ejaculate despite adequate stimulation? Delayed ejaculation is often linked to medicines, anxiety or health conditions and is treatable.",
      "पर्याप्त उत्तेजना के बावजूद स्खलन में कठिनाई या न होना? यह अक्सर दवाओं, घबराहट या शारीरिक बीमारी से जुड़ा होता है और इसका इलाज संभव है।"
    ),
    intro: [
      b("Delayed ejaculation means a persistent, distressing delay or absence of ejaculation during sexual activity.", "देर से स्खलन का मतलब है यौन संबंध के दौरान स्खलन में लगातार, परेशान करने वाली देरी या स्खलन न होना।"),
      b("It is less talked about than premature ejaculation, but common causes such as antidepressants, diabetes or anxiety can be addressed.", "इसकी चर्चा शीघ्रपतन से कम होती है, पर एंटीडिप्रेसेंट, डायबिटीज़ या घबराहट जैसे आम कारणों का इलाज हो सकता है।"),
    ],
    symptoms: [
      b("Taking much longer than desired to ejaculate, or not at all", "चाहे से बहुत ज़्यादा समय लगना, या स्खलन न होना"),
      b("Able to ejaculate alone but not with a partner (in some)", "कुछ लोगों में अकेले हो जाना पर साथी के साथ नहीं"),
      b("Frustration, avoidance of intimacy, fertility concerns", "झुंझलाहट, नज़दीकी से बचना, संतान की चिंता"),
    ],
    causes: [
      b("Medicines — especially some antidepressants and antipsychotics", "दवाएँ — ख़ासकर कुछ एंटीडिप्रेसेंट और एंटीसाइकोटिक"),
      b("Diabetes, nerve problems, low testosterone, alcohol", "डायबिटीज़, नसों की समस्या, टेस्टोस्टेरोन कम, शराब"),
      b("Performance anxiety, relationship stress, habitual patterns of self-stimulation", "परफ़ॉर्मेंस की घबराहट, रिश्ते का तनाव, हस्तमैथुन की ख़ास आदतें"),
    ],
    riskFactors: [b("Older age, chronic illness, multiple medicines", "ज़्यादा उम्र, पुरानी बीमारी, कई दवाएँ")],
    diagnosis: [
      b("Detailed sexual and medicine history", "यौन और दवाओं की पूरी जानकारी"),
      b("Blood sugar, hormones and physical examination by a physician when indicated", "ज़रूरत हो तो शुगर, हार्मोन और फ़िज़िशियन द्वारा शारीरिक जाँच"),
    ],
    icd: { icd10: "F52.3", icd11: "HA03.1" },
    treatment: [
      b("Adjusting or changing medicines that delay ejaculation", "स्खलन में देरी करने वाली दवाओं में बदलाव"),
      b("Treating diabetes, hormone problems or alcohol use", "डायबिटीज़, हार्मोन की समस्या या शराब का इलाज"),
      b("Sex therapy techniques with the partner", "साथी के साथ सेक्स थेरेपी की तकनीकें"),
    ],
    psychotherapy: [
      b("Psychosexual therapy to reduce anxiety and pressure", "घबराहट और दबाव कम करने के लिए साइकोसेक्सुअल थेरेपी"),
      b("Couples sessions to improve communication", "बातचीत सुधारने के लिए कपल सेशन"),
    ],
    family: PARTNER,
    seekHelp: [
      b("Problem persisting for several months and causing distress", "कई महीनों से समस्या और परेशानी"),
      b("New problem after starting a medicine — do not stop it on your own; ask your doctor", "दवा शुरू करने के बाद नई समस्या — अपने आप बंद न करें; डॉक्टर से पूछें"),
    ],
    faqs: [PRIVATE, NO_ADS],
    related: ["premature-ejaculation-treatment-india", "sexual-performance-anxiety-india", "psychosexual-counselling-india"],
    videoKeywords: ["ejaculation", "sexual health", "स्खलन"],
    keywords: ["der se discharge", "discharge nahi", "delayed ejaculation"],
  },
  {
    slug: "low-sexual-desire-india",
    category: "sexual",
    group: "sexual",
    name: b("Low sexual desire", "यौन इच्छा में कमी"),
    title: b("Low Sexual Desire – Causes & Treatment for Men and Women", "यौन इच्छा में कमी – पुरुषों और महिलाओं में कारण और इलाज"),
    h1: b("Low sexual desire: understanding and treating it", "यौन इच्छा में कमी: समझें और इलाज कराएँ"),
    description: b(
      "Lost interest in sex causing distress? Low desire is common and often linked to stress, depression, medicines, hormones or relationship issues. It is treatable.",
      "सेक्स में रुचि ख़त्म होने से परेशानी? इच्छा में कमी आम है और अक्सर तनाव, डिप्रेशन, दवाओं, हार्मोन या रिश्तों से जुड़ी होती है। इलाज संभव है।"
    ),
    intro: [
      b("Desire naturally varies between people and over life. It becomes a concern when the lack of interest persists and causes personal or relationship distress.", "इच्छा हर व्यक्ति में और ज़िंदगी के अलग दौर में अलग होती है। चिंता तब होती है जब रुचि की कमी बनी रहे और व्यक्ति या रिश्ते में परेशानी हो।"),
      b("Both men and women can experience low desire. Treatment looks at the body, the mind and the relationship together.", "पुरुष और महिला दोनों में इच्छा कम हो सकती है। इलाज में शरीर, मन और रिश्ते को साथ देखा जाता है।"),
    ],
    symptoms: [
      b("Few or no sexual thoughts or interest", "यौन विचार या रुचि बहुत कम या नहीं"),
      b("Avoiding intimacy; feeling guilty or pressured", "नज़दीकी से बचना; अपराधबोध या दबाव महसूस करना"),
      b("Mismatch in desire causing conflict", "इच्छा में अंतर से झगड़े"),
    ],
    causes: [
      b("Depression, anxiety, stress and fatigue", "डिप्रेशन, घबराहट, तनाव और थकान"),
      b("Medicines (some antidepressants, BP medicines), alcohol", "दवाएँ (कुछ एंटीडिप्रेसेंट, बीपी की दवाएँ), शराब"),
      b("Hormonal changes: thyroid, low testosterone, pregnancy, menopause", "हार्मोनल बदलाव: थायरॉइड, टेस्टोस्टेरोन कम, गर्भावस्था, मेनोपॉज़"),
      b("Relationship conflict, past negative experiences, body-image concerns", "रिश्ते में कलह, पुराने बुरे अनुभव, शरीर को लेकर चिंता"),
    ],
    riskFactors: [b("Chronic illness, sleep problems, pain during sex", "पुरानी बीमारी, नींद की समस्या, सेक्स के दौरान दर्द")],
    diagnosis: [
      b("Individual and, if possible, couple interview", "अलग से और हो सके तो साथ में बातचीत"),
      b("Screening for depression and medicine side-effects", "डिप्रेशन और दवाओं के साइड-इफ़ेक्ट की जाँच"),
      b("Hormone and thyroid tests when indicated", "ज़रूरत हो तो हार्मोन और थायरॉइड की जाँच"),
    ],
    icd: { icd10: "F52.0", icd11: "HA00" },
    treatment: [
      b("Treating depression, anxiety and sleep problems", "डिप्रेशन, घबराहट और नींद की समस्या का इलाज"),
      b("Reviewing medicines; treating hormonal problems with the right specialist", "दवाओं की समीक्षा; सही विशेषज्ञ से हार्मोन की समस्या का इलाज"),
      b("Lifestyle: rest, exercise, reducing alcohol", "जीवनशैली: आराम, व्यायाम, शराब कम करना"),
    ],
    psychotherapy: [
      b("Sex therapy with sensate focus exercises", "सेंसेट फ़ोकस अभ्यास के साथ सेक्स थेरेपी"),
      b("Couples therapy for communication and conflict", "बातचीत और झगड़ों के लिए कपल थेरेपी"),
    ],
    family: PARTNER,
    seekHelp: [
      b("Low desire lasting months and causing distress", "महीनों से कम इच्छा और परेशानी"),
      b("Low mood, hopelessness or relationship crisis", "उदासी, निराशा या रिश्ते का संकट"),
    ],
    faqs: [
      faq("Is there a pill to increase desire?", "क्या इच्छा बढ़ाने की कोई गोली है?", "There is no simple pill for most people. Treating the underlying causes and therapy work better.", "ज़्यादातर लोगों के लिए कोई आसान गोली नहीं है। मूल कारणों का इलाज और थेरेपी बेहतर काम करते हैं।"),
      PRIVATE,
    ],
    related: ["female-sexual-interest-arousal-india", "depression-treatment-india", "couples-therapy-india", "psychosexual-counselling-india"],
    videoKeywords: ["sexual desire", "libido", "इच्छा"],
    keywords: ["ichha nahi", "sex me man nahi", "libido kam", "low desire"],
  },
  {
    slug: "sexual-performance-anxiety-india",
    category: "sexual",
    group: "sexual",
    name: b("Sexual performance anxiety", "सेक्स के समय परफ़ॉर्मेंस की घबराहट"),
    title: b("Sexual Performance Anxiety – Break the Fear Cycle", "सेक्स परफ़ॉर्मेंस की घबराहट – डर का चक्र तोड़ें"),
    h1: b("Sexual performance anxiety: when worry gets in the way", "परफ़ॉर्मेंस की घबराहट: जब चिंता रुकावट बन जाए"),
    description: b(
      "Worry about performing sexually causing erection problems or early ejaculation? Performance anxiety is very common, especially in new couples, and responds to therapy.",
      "सेक्स में अच्छा न कर पाने की चिंता से इरेक्शन या शीघ्रपतन? परफ़ॉर्मेंस की घबराहट बहुत आम है, ख़ासकर नए जोड़ों में, और थेरेपी से ठीक होती है।"
    ),
    intro: [
      b("Performance anxiety is fear of not satisfying the partner or of \"failing\". The stress response itself can block arousal, creating a cycle of worry and difficulty.", "परफ़ॉर्मेंस की घबराहट साथी को संतुष्ट न कर पाने या \"फ़ेल\" होने का डर है। तनाव ख़ुद उत्तेजना को रोक सकता है, जिससे चिंता और दिक़्क़त का चक्र बनता है।"),
      b("It is common after marriage, after one difficult experience, or after reading myths online. The body is usually healthy.", "यह शादी के बाद, एक कठिन अनुभव के बाद, या ऑनलाइन मिथक पढ़ने के बाद आम है। शरीर आमतौर पर स्वस्थ होता है।"),
    ],
    symptoms: [
      b("Racing thoughts and watching oneself during intimacy", "नज़दीकी के दौरान तेज़ विचार और ख़ुद पर नज़र रखना"),
      b("Erection difficulty or early ejaculation with a partner, but normal morning erections", "साथी के साथ इरेक्शन में दिक़्क़त या जल्दी स्खलन, पर सुबह सामान्य इरेक्शन"),
      b("Avoiding intimacy because of fear", "डर से नज़दीकी से बचना"),
    ],
    causes: [
      b("Unrealistic expectations, often from pornography", "अवास्तविक उम्मीदें, अक्सर पोर्नोग्राफ़ी से"),
      b("Myths about size, duration or dhat", "आकार, समय या धात के बारे में मिथक"),
      b("General anxiety, stress, relationship pressure", "सामान्य घबराहट, तनाव, रिश्ते का दबाव"),
    ],
    riskFactors: [b("Anxiety disorders, low self-esteem, previous embarrassing experience", "एंग्ज़ाइटी, कम आत्मविश्वास, पहले शर्मिंदगी का अनुभव")],
    diagnosis: [
      b("History showing situational difficulties with normal function at other times", "जानकारी जिसमें ख़ास स्थिति में ही दिक़्क़त और बाक़ी समय सामान्य"),
      b("Basic medical check to rule out physical causes", "शारीरिक कारणों को अलग करने के लिए बुनियादी जाँच"),
    ],
    icd: { note: b("Usually coded under the resulting dysfunction (e.g. erectile or ejaculatory).", "आमतौर पर इससे होने वाली समस्या (जैसे इरेक्शन या स्खलन) के तहत कोड।") },
    treatment: [
      b("Accurate sex education to correct myths", "मिथक दूर करने के लिए सही यौन जानकारी"),
      b("Short-term medicines in selected cases to rebuild confidence, as prescribed", "डॉक्टर की सलाह से चुने हुए मामलों में आत्मविश्वास लौटाने के लिए थोड़े समय की दवाएँ"),
      b("Treating underlying anxiety", "मूल घबराहट का इलाज"),
    ],
    psychotherapy: [
      b("CBT for anxious thoughts", "घबराहट वाले विचारों के लिए CBT"),
      b("Sensate focus with the partner — removing pressure step by step", "साथी के साथ सेंसेट फ़ोकस — क़दम-दर-क़दम दबाव हटाना"),
      b("Mindfulness to stay present", "वर्तमान में रहने के लिए माइंडफ़ुलनेस"),
    ],
    family: PARTNER,
    seekHelp: [
      b("Difficulty lasting more than a few weeks", "कुछ हफ़्तों से ज़्यादा दिक़्क़त"),
      b("Avoiding marriage or relationships due to fear", "डर से शादी या रिश्तों से बचना"),
    ],
    faqs: [
      faq("Does it mean I am weak?", "क्या इसका मतलब मैं कमज़ोर हूँ?", "No. Anxiety affects the body's natural response. With the right help, confidence returns.", "नहीं। घबराहट शरीर की स्वाभाविक प्रतिक्रिया पर असर डालती है। सही मदद से आत्मविश्वास लौट आता है।"),
      NO_ADS,
    ],
    related: ["erectile-dysfunction-treatment-india", "premature-ejaculation-treatment-india", "sexual-health-myths-india", "generalized-anxiety-disorder-india"],
    videoKeywords: ["performance anxiety", "sexual anxiety", "घबराहट"],
    keywords: ["darr", "ghabrahat sex", "pehli raat", "performance anxiety", "suhagraat"],
  },
  {
    slug: "vaginismus-sexual-pain-india",
    category: "sexual",
    group: "sexual",
    name: b("Vaginismus and pain during intercourse", "वैजिनिस्मस और संबंध के समय दर्द"),
    title: b("Vaginismus & Genito-Pelvic Pain – Gentle, Effective Treatment", "वैजिनिस्मस और जननांग-पेल्विक दर्द – सहज और असरदार इलाज"),
    h1: b("Vaginismus and pain with intercourse: you can be helped", "वैजिनिस्मस और संबंध में दर्द: मदद संभव है"),
    description: b(
      "Pain, fear or inability to have intercourse, or an unconsummated marriage? Vaginismus and genito-pelvic pain are common and very treatable with gentle therapy.",
      "संबंध बनाने में दर्द, डर या असमर्थता, या शादी के बाद संबंध न बन पाना? वैजिनिस्मस और जननांग-पेल्विक दर्द आम हैं और सहज थेरेपी से अच्छी तरह ठीक होते हैं।"
    ),
    intro: [
      b("Vaginismus is an involuntary tightening of the pelvic muscles that makes penetration painful or impossible. It often comes with fear of pain.", "वैजिनिस्मस में पेल्विक मांसपेशियाँ अपने आप सिकुड़ जाती हैं जिससे संबंध दर्दनाक या असंभव हो जाता है। इसके साथ अक्सर दर्द का डर होता है।"),
      b("It is a common reason for unconsummated marriage in India. It is not the woman's fault and has a high success rate with treatment.", "भारत में शादी के बाद संबंध न बन पाने का यह आम कारण है। यह महिला की ग़लती नहीं है और इलाज से सफलता की दर बहुत अच्छी है।"),
    ],
    symptoms: [
      b("Inability to have intercourse despite wanting to", "चाहने के बावजूद संबंध न बन पाना"),
      b("Pain, burning or tightness with penetration", "प्रवेश पर दर्द, जलन या कसाव"),
      b("Fear, anxiety or panic before intimacy", "नज़दीकी से पहले डर, घबराहट या पैनिक"),
      b("Difficulty with gynaecological examination or tampon use", "स्त्री रोग जाँच या टैम्पोन में दिक़्क़त"),
    ],
    causes: [
      b("Fear of pain, often from myths about the first night", "दर्द का डर, अक्सर पहली रात के मिथकों से"),
      b("Strict upbringing with negative messages about sex", "सेक्स को लेकर नकारात्मक बातों वाली सख़्त परवरिश"),
      b("Infections, dryness, or painful medical conditions", "संक्रमण, सूखापन या दर्द वाली शारीरिक बीमारियाँ"),
      b("Past traumatic experiences in some women", "कुछ महिलाओं में पुराने आघात वाले अनुभव"),
    ],
    riskFactors: [b("Anxiety disorders and lack of sex education", "एंग्ज़ाइटी और यौन जानकारी की कमी")],
    diagnosis: [
      b("Sensitive, unhurried history-taking — examination only with consent", "संवेदनशील, बिना जल्दबाज़ी की बातचीत — जाँच सिर्फ़ सहमति से"),
      b("Gynaecology review to rule out infections or other causes", "संक्रमण या दूसरे कारणों को अलग करने के लिए स्त्री रोग जाँच"),
    ],
    icd: { icd10: "F52.5", icd11: "HA20" },
    treatment: [
      b("Education about anatomy and the pain–fear cycle", "शरीर की बनावट और दर्द-डर के चक्र की जानकारी"),
      b("Graded, self-paced exercises (with dilators when appropriate), guided by the therapist", "थेरेपिस्ट के मार्गदर्शन में धीरे-धीरे, अपनी रफ़्तार से अभ्यास (ज़रूरत हो तो डाइलेटर से)"),
      b("Pelvic floor physiotherapy; treatment of infection or dryness", "पेल्विक फ़्लोर फ़िज़ियोथेरेपी; संक्रमण या सूखेपन का इलाज"),
      b("Medicines for anxiety when needed", "ज़रूरत हो तो घबराहट की दवाएँ"),
    ],
    psychotherapy: [
      b("CBT and relaxation for fear and anxiety", "डर और घबराहट के लिए CBT और रिलैक्सेशन"),
      b("Couples sessions — the partner's patience and understanding are key", "कपल सेशन — साथी का धैर्य और समझ बहुत अहम"),
    ],
    family: [
      b("Partners: avoid force or pressure; progress at her pace", "साथी: ज़बरदस्ती या दबाव न करें; उसकी रफ़्तार से आगे बढ़ें"),
      b("Families: avoid pressuring the couple about pregnancy", "परिवार: बच्चे के लिए जोड़े पर दबाव न डालें"),
    ],
    seekHelp: [
      b("Unable to have intercourse after marriage", "शादी के बाद संबंध न बन पाना"),
      b("Persistent pain during intercourse", "संबंध में लगातार दर्द"),
    ],
    faqs: [
      faq("Is surgery needed?", "क्या ऑपरेशन की ज़रूरत है?", "Usually not. Most women improve with therapy and graded exercises.", "आमतौर पर नहीं। ज़्यादातर महिलाएँ थेरेपी और धीरे-धीरे अभ्यास से ठीक होती हैं।"),
      PRIVATE,
    ],
    related: ["female-sexual-interest-arousal-india", "couples-therapy-india", "psychosexual-counselling-india", "womens-mental-health-india"],
    videoKeywords: ["vaginismus", "painful intercourse", "दर्द"],
    keywords: ["sambandh me dard", "shadi ke baad sambandh nahi", "vaginismus", "dard"],
  },
  {
    slug: "female-sexual-interest-arousal-india",
    category: "sexual",
    group: "sexual",
    name: b("Female sexual interest and arousal difficulties", "महिलाओं में यौन रुचि और उत्तेजना की समस्या"),
    title: b("Female Sexual Interest & Arousal Problems – Treatment", "महिलाओं में यौन रुचि और उत्तेजना की समस्या – इलाज"),
    h1: b("Sexual interest and arousal difficulties in women", "महिलाओं में यौन रुचि और उत्तेजना की कठिनाइयाँ"),
    description: b(
      "Little interest in sex, difficulty becoming aroused or reaching orgasm? These concerns are common in women and can be helped with confidential, respectful care.",
      "सेक्स में कम रुचि, उत्तेजना या चरम सुख में कठिनाई? ये चिंताएँ महिलाओं में आम हैं और गोपनीय, सम्मानजनक देखभाल से इनमें मदद हो सकती है।"
    ),
    intro: [
      b("Women's sexual concerns are often ignored or not discussed. Interest and arousal are affected by mood, stress, health, hormones and the relationship.", "महिलाओं की यौन चिंताओं को अक्सर नज़रअंदाज़ किया जाता है। रुचि और उत्तेजना पर मूड, तनाव, सेहत, हार्मोन और रिश्ते का असर होता है।"),
      b("Treatment is respectful and private, and focuses on what matters to you.", "इलाज सम्मानजनक और निजी है, और उस पर ध्यान देता है जो आपके लिए मायने रखता है।"),
    ],
    symptoms: [
      b("Reduced interest or few sexual thoughts", "कम रुचि या कम यौन विचार"),
      b("Difficulty becoming aroused, dryness", "उत्तेजना में कठिनाई, सूखापन"),
      b("Difficulty reaching orgasm", "चरम सुख तक पहुँचने में कठिनाई"),
      b("Distress or relationship strain", "परेशानी या रिश्ते में तनाव"),
    ],
    causes: [
      b("Depression, anxiety, fatigue and caregiving burden", "डिप्रेशन, घबराहट, थकान और देखभाल का बोझ"),
      b("After childbirth, breastfeeding or menopause", "प्रसव, स्तनपान या मेनोपॉज़ के बाद"),
      b("Medicines, thyroid problems, diabetes", "दवाएँ, थायरॉइड, डायबिटीज़"),
      b("Lack of emotional closeness or conflict", "भावनात्मक नज़दीकी की कमी या कलह"),
    ],
    riskFactors: [b("Pain during sex, body-image concerns, past trauma", "संबंध में दर्द, शरीर को लेकर चिंता, पुराना आघात")],
    diagnosis: [
      b("Private conversation about concerns and goals", "चिंताओं और लक्ष्यों पर निजी बातचीत"),
      b("Gynaecology and hormone review when needed", "ज़रूरत हो तो स्त्री रोग और हार्मोन की जाँच"),
    ],
    icd: { icd10: "F52.0 / F52.2", icd11: "HA00 / HA01" },
    treatment: [
      b("Treating mood, anxiety and medical causes", "मूड, घबराहट और शारीरिक कारणों का इलाज"),
      b("Reviewing medicines that affect arousal", "उत्तेजना पर असर डालने वाली दवाओं की समीक्षा"),
      b("Lubricants or local treatments for dryness as advised by a gynaecologist", "स्त्री रोग विशेषज्ञ की सलाह से सूखेपन के लिए लुब्रिकेंट या स्थानीय इलाज"),
    ],
    psychotherapy: [
      b("Sex therapy and mindfulness-based approaches", "सेक्स थेरेपी और माइंडफ़ुलनेस आधारित तरीक़े"),
      b("Couples therapy for communication", "बातचीत के लिए कपल थेरेपी"),
    ],
    family: PARTNER,
    seekHelp: [b("Concerns lasting months and causing distress", "महीनों से चिंता और परेशानी"), b("Pain during intercourse", "संबंध में दर्द")],
    faqs: [
      faq("Is it normal for desire to change after childbirth?", "क्या प्रसव के बाद इच्छा बदलना सामान्य है?", "Yes, it is common. If it persists or causes distress, help is available.", "हाँ, यह आम है। अगर बनी रहे या परेशानी हो तो मदद उपलब्ध है।"),
      PRIVATE,
    ],
    related: ["low-sexual-desire-india", "vaginismus-sexual-pain-india", "postpartum-depression-india", "womens-mental-health-india"],
    videoKeywords: ["women sexual health", "female", "महिला"],
    keywords: ["mahila sex samasya", "female arousal", "orgasm", "ichha"],
  },
  {
    slug: "relationship-difficulties-counselling-india",
    category: "sexual",
    group: "sexual",
    name: b("Relationship difficulties", "रिश्तों की कठिनाइयाँ"),
    title: b("Relationship Difficulties – Counselling for Couples", "रिश्तों की कठिनाइयाँ – जोड़ों के लिए काउंसलिंग"),
    h1: b("Relationship difficulties: when to get help", "रिश्तों की कठिनाइयाँ: कब मदद लें"),
    description: b(
      "Frequent arguments, emotional distance, trust issues or intimacy problems? Learn common causes, warning signs and how counselling can help couples.",
      "बार-बार झगड़े, भावनात्मक दूरी, भरोसे की कमी या नज़दीकी की समस्या? आम कारण, चेतावनी संकेत और काउंसलिंग कैसे मदद करती है, जानें।"
    ),
    intro: [
      b("All relationships have difficult phases. Persistent conflict or distance affects mental health, sexual life and children.", "हर रिश्ते में कठिन दौर आते हैं। लगातार झगड़े या दूरी मानसिक स्वास्थ्य, यौन जीवन और बच्चों पर असर डालती है।"),
      b("A psychiatrist can also identify depression, anxiety, addiction or personality factors that strain a relationship.", "मनोचिकित्सक उन डिप्रेशन, घबराहट, नशे या व्यक्तित्व से जुड़े कारणों को भी पहचान सकते हैं जो रिश्ते पर दबाव डालते हैं।"),
    ],
    headings: { symptoms: b("Common signs", "आम संकेत") },
    symptoms: [
      b("Repeated arguments that never get resolved", "बार-बार झगड़े जो कभी सुलझते नहीं"),
      b("Emotional distance, little communication", "भावनात्मक दूरी, कम बातचीत"),
      b("Trust issues, jealousy or suspicion", "भरोसे की कमी, जलन या शक"),
      b("Reduced intimacy or mismatched expectations", "नज़दीकी कम होना या उम्मीदों में अंतर"),
    ],
    causes: [
      b("Communication problems and unmet expectations", "बातचीत की समस्या और अधूरी उम्मीदें"),
      b("Stress: work, money, in-laws, children", "तनाव: काम, पैसा, ससुराल, बच्चे"),
      b("Addiction, depression or anxiety in a partner", "साथी में नशा, डिप्रेशन या घबराहट"),
    ],
    riskFactors: [b("Major life changes: marriage, a new baby, relocation, job loss", "बड़े बदलाव: शादी, बच्चा, जगह बदलना, नौकरी जाना")],
    diagnosis: [b("Individual and joint sessions to understand both perspectives", "दोनों का नज़रिया समझने के लिए अलग और साथ में सेशन")],
    treatment: [
      b("Couples counselling with clear goals", "साफ़ लक्ष्यों के साथ कपल काउंसलिंग"),
      b("Treating individual mental health or addiction problems", "व्यक्तिगत मानसिक स्वास्थ्य या नशे की समस्या का इलाज"),
    ],
    psychotherapy: [
      b("Communication and conflict-resolution skills", "बातचीत और झगड़े सुलझाने के कौशल"),
      b("Rebuilding trust and intimacy", "भरोसा और नज़दीकी फिर से बनाना"),
    ],
    family: [
      b("Avoid taking sides publicly; encourage the couple to seek help together", "खुले में पक्ष न लें; जोड़े को साथ मदद लेने को प्रोत्साहित करें"),
    ],
    seekHelp: [
      b("Conflict affecting sleep, work or children", "झगड़े जो नींद, काम या बच्चों पर असर डालें"),
      b("Any violence or threats — safety comes first; call 112 in an emergency", "कोई भी हिंसा या धमकी — सुरक्षा पहले; इमरजेंसी में 112 पर कॉल करें"),
    ],
    faqs: [
      faq("What if my partner won't come?", "अगर साथी न आए तो?", "You can start alone. Individual sessions still help, and many partners join later.", "आप अकेले शुरू कर सकते हैं। अकेले सेशन भी मदद करते हैं, और बहुत से साथी बाद में जुड़ जाते हैं।"),
      PRIVATE,
    ],
    related: ["couples-therapy-india", "marital-counselling-india", "low-sexual-desire-india", "family-therapy-india"],
    videoKeywords: ["relationship", "couple", "रिश्ते"],
    keywords: ["pati patni jhagda", "rishta", "relationship problem", "shak"],
  },
  {
    slug: "sexual-health-myths-india",
    category: "sexual",
    group: "sexual",
    name: b("Sexual health myths", "यौन स्वास्थ्य से जुड़े मिथक"),
    title: b("Sexual Health Myths – Facts About Dhat, Masturbation & Size", "यौन स्वास्थ्य के मिथक – धात, हस्तमैथुन और आकार के तथ्य"),
    h1: b("Common sexual health myths — and the facts", "यौन स्वास्थ्य के आम मिथक — और सच्चाई"),
    description: b(
      "Does masturbation cause weakness? Is semen loss harmful? Does size matter? Evidence-based answers to common sexual health myths in India.",
      "क्या हस्तमैथुन से कमज़ोरी होती है? क्या वीर्य निकलना नुकसानदायक है? क्या आकार मायने रखता है? भारत के आम यौन मिथकों के वैज्ञानिक जवाब।"
    ),
    intro: [
      b("Many young people learn about sex from friends, roadside advertisements or the internet. Myths cause needless anxiety, guilt and spending on unproven remedies.", "बहुत से युवा सेक्स के बारे में दोस्तों, सड़क किनारे के विज्ञापनों या इंटरनेट से सीखते हैं। मिथकों से बेवजह घबराहट, अपराधबोध और बेकार इलाजों पर ख़र्च होता है।"),
      b("Here are evidence-based facts. If a worry persists, a confidential consultation can help.", "यहाँ वैज्ञानिक तथ्य हैं। अगर चिंता बनी रहे तो गोपनीय परामर्श मदद कर सकता है।"),
    ],
    headings: {
      symptoms: b("Common myths", "आम मिथक"),
      causes: b("Facts", "तथ्य"),
      treatment: b("How a consultation helps", "परामर्श कैसे मदद करता है"),
    },
    symptoms: [
      b("\"Masturbation causes weakness, impotence or memory loss\"", "\"हस्तमैथुन से कमज़ोरी, नपुंसकता या याददाश्त कम होती है\""),
      b("\"Losing semen (dhat) drains vital energy\"", "\"वीर्य (धात) निकलने से ताक़त ख़त्म होती है\""),
      b("\"Night emissions are a disease\"", "\"स्वप्नदोष एक बीमारी है\""),
      b("\"Penis size decides satisfaction\"", "\"लिंग का आकार संतुष्टि तय करता है\""),
      b("\"Sex should last 30 minutes\"", "\"सेक्स 30 मिनट चलना चाहिए\""),
    ],
    causes: [
      b("Masturbation is a normal behaviour and does not cause physical weakness", "हस्तमैथुन सामान्य व्यवहार है और इससे शारीरिक कमज़ोरी नहीं होती"),
      b("Semen is continuously produced; its loss does not harm health", "वीर्य लगातार बनता रहता है; इसके निकलने से सेहत को नुकसान नहीं"),
      b("Night emissions are a normal body process", "स्वप्नदोष शरीर की सामान्य प्रक्रिया है"),
      b("Most men have normal size; satisfaction depends on closeness and communication", "ज़्यादातर पुरुषों का आकार सामान्य होता है; संतुष्टि नज़दीकी और बातचीत पर निर्भर"),
      b("Average intercourse lasts a few minutes; films are not reality", "औसत संबंध कुछ मिनट का होता है; फ़िल्में वास्तविकता नहीं हैं"),
    ],
    treatment: [
      b("Accurate information that relieves anxiety", "सही जानकारी जिससे घबराहट कम हो"),
      b("Treatment for genuine problems like PE or ED when present", "शीघ्रपतन या इरेक्शन जैसी असली समस्या हो तो इलाज"),
      b("Help for anxiety or depression linked to these worries", "इन चिंताओं से जुड़ी घबराहट या डिप्रेशन में मदद"),
    ],
    psychotherapy: [b("Psychoeducation and CBT for persistent worry", "लगातार चिंता के लिए जानकारी और CBT")],
    seekHelp: [
      b("Worry about sex affecting sleep, studies or marriage plans", "सेक्स की चिंता जो नींद, पढ़ाई या शादी की योजना पर असर डाले"),
      b("Spending money on repeated \"gupt rog\" treatments", "बार-बार \"गुप्त रोग\" के इलाज पर पैसा ख़र्च करना"),
    ],
    faqs: [NO_ADS, PRIVATE],
    related: ["dhat-syndrome-treatment-india", "sexual-performance-anxiety-india", "premature-ejaculation-treatment-india", "erectile-dysfunction-treatment-india"],
    articles: ["dhat-syndrome-facts"],
    videoKeywords: ["myth", "dhat", "धात", "masturbation"],
    keywords: ["hastmaithun", "swapandosh", "dhat", "size", "myth", "kamzori"],
  },
  {
    slug: "psychosexual-counselling-india",
    category: "sexual",
    group: "sexual",
    name: b("Psychosexual counselling", "साइकोसेक्सुअल काउंसलिंग"),
    title: b("Psychosexual Counselling – Confidential Online Sessions", "साइकोसेक्सुअल काउंसलिंग – गोपनीय ऑनलाइन सेशन"),
    h1: b("Psychosexual counselling: what it is and how it helps", "साइकोसेक्सुअल काउंसलिंग: क्या है और कैसे मदद करती है"),
    description: b(
      "Psychosexual counselling helps with sexual problems linked to anxiety, beliefs and relationships. What happens in sessions, who it helps, and how to begin.",
      "साइकोसेक्सुअल काउंसलिंग घबराहट, मान्यताओं और रिश्तों से जुड़ी यौन समस्याओं में मदद करती है। सेशन में क्या होता है, किसे फ़ायदा होता है, कैसे शुरू करें।"
    ),
    intro: [
      b("Psychosexual counselling is talking therapy for sexual concerns. It combines accurate information, anxiety management and practical exercises, alone or with a partner.", "साइकोसेक्सुअल काउंसलिंग यौन चिंताओं के लिए बातचीत वाली थेरेपी है। इसमें सही जानकारी, घबराहट सँभालना और व्यावहारिक अभ्यास शामिल हैं, अकेले या साथी के साथ।"),
      b("Sessions are respectful and non-explicit. You decide what you are comfortable discussing.", "सेशन सम्मानजनक होते हैं। आप तय करते हैं कि किस बारे में बात करने में सहज हैं।"),
    ],
    headings: {
      symptoms: b("Who may benefit", "किसे फ़ायदा हो सकता है"),
      causes: b("How sessions work", "सेशन कैसे होते हैं"),
      treatment: b("What it can include", "इसमें क्या शामिल हो सकता है"),
      seekHelp: b("Is it right for me?", "क्या यह मेरे लिए सही है?"),
    },
    symptoms: [
      b("Premature ejaculation, erectile or performance anxiety", "शीघ्रपतन, इरेक्शन या परफ़ॉर्मेंस की घबराहट"),
      b("Vaginismus, pain or unconsummated marriage", "वैजिनिस्मस, दर्द या शादी के बाद संबंध न बन पाना"),
      b("Low desire or desire mismatch in a couple", "कम इच्छा या जोड़े में इच्छा का अंतर"),
      b("Dhat-related anxiety and guilt about sexuality", "धात से जुड़ी घबराहट और सेक्स को लेकर अपराधबोध"),
    ],
    causes: [
      b("First session: understanding the problem, medical screening, goals", "पहला सेशन: समस्या समझना, शारीरिक जाँच की ज़रूरत, लक्ष्य"),
      b("Follow-up sessions: education, CBT and graded exercises", "आगे के सेशन: जानकारी, CBT और धीरे-धीरे अभ्यास"),
      b("By private video; the number of sessions depends on the concern", "निजी वीडियो पर; सेशन की संख्या समस्या पर निर्भर"),
    ],
    treatment: [
      b("Sex education and correcting myths", "यौन शिक्षा और मिथक दूर करना"),
      b("Sensate focus and anxiety-reduction techniques", "सेंसेट फ़ोकस और घबराहट कम करने की तकनीकें"),
      b("Communication skills for couples", "जोड़ों के लिए बातचीत के कौशल"),
      b("Combination with medicines when a psychiatrist advises", "मनोचिकित्सक की सलाह पर दवाओं के साथ"),
    ],
    psychotherapy: [b("CBT, mindfulness and couples-based approaches", "CBT, माइंडफ़ुलनेस और जोड़ों पर आधारित तरीक़े")],
    seekHelp: [
      b("A sexual concern that has lasted for months", "महीनों से चली आ रही यौन चिंता"),
      b("Anxiety or relationship strain around sex", "सेक्स को लेकर घबराहट या रिश्ते में तनाव"),
    ],
    faqs: [
      faq("What is the fee for therapy sessions?", "थेरेपी सेशन की फ़ीस क्या है?", "Please see the fees on the booking page; therapy sessions are listed separately from psychiatry consultation.", "कृपया बुकिंग पेज पर फ़ीस देखें; थेरेपी सेशन मनोचिकित्सा परामर्श से अलग दिए गए हैं।"),
      PRIVATE,
    ],
    related: ["sex-specialist-india", "couples-therapy-india", "sexual-performance-anxiety-india", "vaginismus-sexual-pain-india"],
    videoKeywords: ["sexual health", "counselling", "सेक्स"],
    keywords: ["sex counselling", "sex therapy", "gupt rog counselling"],
  },
];

const SHARED_FAQS = [
  faq("Can this be assessed by video?", "क्या इसकी जाँच वीडियो पर हो सकती है?", "Most concerns can be discussed and treated by private video. If a physical examination or tests are needed, you will be guided to a physician or gynaecologist.", "ज़्यादातर समस्याओं पर निजी वीडियो में बात और इलाज हो सकता है। अगर शारीरिक जाँच या टेस्ट ज़रूरी हों, तो आपको फ़िज़िशियन या स्त्री रोग विशेषज्ञ के पास भेजा जाएगा।"),
  PRIVATE,
  NO_ADS,
];

export const NEW_SEXUAL: ConditionContent[] = topUpFaqs(PAGES, SHARED_FAQS);
