import type { ConditionContent, FaqItem } from "../types";
import type { L10n } from "../../i18n";
import { b, faq, topUpFaqs } from "./_h";

/**
 * Psychotherapy pages (category/group "therapy"). They reuse the condition template with
 * therapy-specific headings: Who may benefit / How sessions work / Evidence-based uses / Is it right for me.
 */

const HEADINGS = {
  symptoms: b("Who may benefit", "किसे फ़ायदा हो सकता है"),
  causes: b("How sessions work", "सेशन कैसे होते हैं"),
  treatment: b("Evidence-based uses", "किन समस्याओं में प्रमाणित"),
  seekHelp: b("Is it right for me?", "क्या यह मेरे लिए सही है?"),
  psychotherapy: b("Techniques used", "इस्तेमाल होने वाली तकनीकें"),
  family: b("Involving family", "परिवार की भूमिका"),
};

const FEES: FaqItem = faq(
  "What are the session fees?",
  "सेशन की फ़ीस क्या है?",
  "Psychotherapy: first session ₹1500, follow-up sessions ₹1000, online. Psychiatry consultation (₹500) is separate.",
  "साइकोथेरेपी: पहला सेशन ₹1500, आगे के सेशन ₹1000, ऑनलाइन। मनोचिकित्सा परामर्श (₹500) अलग है।"
);

const WITH_MEDS: FaqItem = faq(
  "Can therapy be combined with medicines?",
  "क्या थेरेपी दवाओं के साथ हो सकती है?",
  "Yes. For many conditions the combination works better than either alone. The psychiatrist reviews whether medicines are needed.",
  "हाँ। कई बीमारियों में दोनों साथ अकेले से बेहतर काम करते हैं। मनोचिकित्सक तय करते हैं कि दवाओं की ज़रूरत है या नहीं।"
);

const ONLINE: L10n = b("Sessions are held by private video; you can choose Hindi or English", "सेशन निजी वीडियो पर होते हैं; हिंदी या अंग्रेज़ी चुन सकते हैं");

type T = Omit<ConditionContent, "category" | "group" | "headings" | "symptoms" | "causes" | "treatment" | "seekHelp"> & {
  whoBenefits: L10n[];
  howItWorks: L10n[];
  evidence: L10n[];
  isItRight: L10n[];
};

function therapy(t: T): ConditionContent {
  const { whoBenefits, howItWorks, evidence, isItRight, ...rest } = t;
  return {
    ...rest,
    category: "therapy",
    group: "therapy",
    headings: HEADINGS,
    symptoms: whoBenefits,
    causes: [...howItWorks, ONLINE],
    treatment: evidence,
    seekHelp: isItRight,
  };
}

const PAGES: ConditionContent[] = [
  therapy({
    slug: "cbt-cognitive-behaviour-therapy-india",
    name: b("CBT (Cognitive Behaviour Therapy)", "CBT (कॉग्निटिव बिहेवियर थेरेपी)"),
    title: b("CBT – Cognitive Behaviour Therapy Online", "CBT – कॉग्निटिव बिहेवियर थेरेपी ऑनलाइन"),
    h1: b("Cognitive Behaviour Therapy (CBT): how it works", "कॉग्निटिव बिहेवियर थेरेपी (CBT): यह कैसे काम करती है"),
    description: b(
      "CBT is a structured, evidence-based talking therapy for depression, anxiety, OCD, insomnia and more. Learn what happens in sessions and who it helps.",
      "CBT डिप्रेशन, घबराहट, OCD, अनिद्रा आदि के लिए व्यवस्थित, प्रमाणित बातचीत वाली थेरेपी है। जानें सेशन में क्या होता है और किसे फ़ायदा होता है।"
    ),
    intro: [
      b("CBT is based on the idea that thoughts, feelings and behaviours are connected. Changing unhelpful thinking and behaviour patterns improves how we feel.", "CBT इस विचार पर आधारित है कि विचार, भावनाएँ और व्यवहार जुड़े हुए हैं। बेकार की सोच और व्यवहार के पैटर्न बदलने से हम बेहतर महसूस करते हैं।"),
      b("It is practical, goal-focused and time-limited, with exercises between sessions.", "यह व्यावहारिक, लक्ष्य-केंद्रित और सीमित समय की थेरेपी है, जिसमें सेशन के बीच अभ्यास होते हैं।"),
    ],
    whoBenefits: [
      b("People with depression, anxiety, panic or phobias", "डिप्रेशन, घबराहट, पैनिक या फ़ोबिया वाले लोग"),
      b("Insomnia, health anxiety, OCD (as ERP)", "अनिद्रा, सेहत की चिंता, OCD (ERP के रूप में)"),
      b("Students with exam anxiety and perfectionism", "परीक्षा की घबराहट और परफ़ेक्शनिज़्म वाले विद्यार्थी"),
    ],
    howItWorks: [
      b("Assessment and shared goals in the first session", "पहले सेशन में जाँच और साझा लक्ष्य"),
      b("Weekly or fortnightly sessions, usually 45–50 minutes", "हफ़्ते या पंद्रह दिन में सेशन, आमतौर पर 45–50 मिनट"),
      b("Homework: thought records, behavioural experiments, activity plans", "होमवर्क: विचार रिकॉर्ड, व्यवहारिक प्रयोग, गतिविधि योजनाएँ"),
    ],
    evidence: [
      b("Depression and anxiety disorders — among the most researched therapies", "डिप्रेशन और एंग्ज़ाइटी — सबसे ज़्यादा शोध वाली थेरेपी में से"),
      b("Insomnia (CBT-I), eating disorders (CBT-E), psychosis (CBTp)", "अनिद्रा (CBT-I), ईटिंग डिसऑर्डर (CBT-E), साइकोसिस (CBTp)"),
    ],
    psychotherapy: [
      b("Identifying and challenging unhelpful thoughts", "बेकार के विचार पहचानना और उन्हें चुनौती देना"),
      b("Behavioural activation, exposure, problem-solving", "बिहेवियरल एक्टिवेशन, एक्सपोज़र, प्रॉब्लम-सॉल्विंग"),
    ],
    isItRight: [
      b("You want practical tools and are willing to practise between sessions", "आप व्यावहारिक तरीक़े चाहते हैं और सेशन के बीच अभ्यास को तैयार हैं"),
      b("Severe depression or psychosis may need medicines alongside", "गंभीर डिप्रेशन या साइकोसिस में साथ में दवाओं की ज़रूरत हो सकती है"),
    ],
    faqs: [FEES, WITH_MEDS],
    related: ["depression-treatment-india", "generalized-anxiety-disorder-india", "insomnia-treatment-india", "rebt-therapy-india", "erp-therapy-ocd-india"],
    videoKeywords: ["cbt", "therapy", "थेरेपी"],
    keywords: ["cbt", "counselling", "therapy", "baat cheet ilaj"],
  }),
  therapy({
    slug: "rebt-therapy-india",
    name: b("REBT (Rational Emotive Behaviour Therapy)", "REBT (रैशनल इमोटिव बिहेवियर थेरेपी)"),
    title: b("REBT – Rational Emotive Behaviour Therapy", "REBT – रैशनल इमोटिव बिहेवियर थेरेपी"),
    h1: b("REBT: changing rigid beliefs that cause distress", "REBT: परेशानी पैदा करने वाली कठोर मान्यताओं को बदलना"),
    description: b(
      "REBT helps you identify rigid \"must\" and \"should\" beliefs behind anger, anxiety and guilt, and replace them with flexible thinking. How it works and who it helps.",
      "REBT ग़ुस्से, घबराहट और अपराधबोध के पीछे की कठोर \"ऐसा होना ही चाहिए\" वाली मान्यताओं को पहचानकर लचीली सोच अपनाने में मदद करती है।"
    ),
    intro: [
      b("REBT, developed by Albert Ellis, is a form of cognitive behavioural therapy. It uses the ABC model: an Activating event, the Beliefs about it, and the emotional Consequences.", "अल्बर्ट एलिस द्वारा विकसित REBT, CBT का ही एक रूप है। इसमें ABC मॉडल है: घटना (A), उसके बारे में मान्यताएँ (B), और भावनात्मक नतीजे (C)।"),
      b("It focuses on demanding beliefs such as \"I must succeed\" or \"Others should treat me fairly\" and helps build self-acceptance.", "यह \"मुझे सफल होना ही है\" या \"दूसरों को मेरे साथ ठीक बर्ताव करना ही चाहिए\" जैसी माँग वाली मान्यताओं पर काम करती है और आत्म-स्वीकृति बढ़ाती है।"),
    ],
    whoBenefits: [
      b("Anger, frustration and low tolerance", "ग़ुस्सा, झुंझलाहट और कम सहनशीलता"),
      b("Anxiety, guilt and perfectionism", "घबराहट, अपराधबोध और परफ़ेक्शनिज़्म"),
      b("Students and professionals under performance pressure", "प्रदर्शन के दबाव में विद्यार्थी और पेशेवर"),
    ],
    howItWorks: [
      b("Identifying rigid beliefs behind strong emotions", "तेज़ भावनाओं के पीछे की कठोर मान्यताएँ पहचानना"),
      b("Disputing them and practising flexible alternatives", "उन पर सवाल उठाना और लचीले विकल्पों का अभ्यास"),
    ],
    evidence: [b("Anxiety, depression, anger and stress — as part of the CBT family", "घबराहट, डिप्रेशन, ग़ुस्सा और तनाव — CBT परिवार के हिस्से के रूप में")],
    psychotherapy: [b("ABC analysis, disputation, unconditional self-acceptance exercises", "ABC विश्लेषण, सवाल उठाना, बिना शर्त आत्म-स्वीकृति के अभ्यास")],
    isItRight: [b("You notice \"must/should\" thinking driving anger or anxiety", "आप देखते हैं कि \"ऐसा ही होना चाहिए\" वाली सोच ग़ुस्सा या घबराहट बढ़ाती है")],
    faqs: [faq("How is REBT different from CBT?", "REBT, CBT से कैसे अलग है?", "REBT is one of the original forms of CBT, with a stronger focus on demanding beliefs and self-acceptance.", "REBT, CBT के शुरुआती रूपों में से है, जिसमें माँग वाली मान्यताओं और आत्म-स्वीकृति पर ज़्यादा ज़ोर है।"), FEES],
    related: ["cbt-cognitive-behaviour-therapy-india", "anger-management-india", "stress-management-india"],
    videoKeywords: ["rebt", "therapy", "anger"],
    keywords: ["rebt", "soch badlo", "therapy"],
  }),
  therapy({
    slug: "erp-therapy-ocd-india",
    name: b("ERP (Exposure and Response Prevention) for OCD", "OCD के लिए ERP (एक्सपोज़र एंड रिस्पॉन्स प्रिवेंशन)"),
    title: b("ERP Therapy for OCD – Exposure & Response Prevention", "OCD के लिए ERP थेरेपी – एक्सपोज़र और रिस्पॉन्स प्रिवेंशन"),
    h1: b("ERP: the most effective therapy for OCD", "ERP: OCD की सबसे असरदार थेरेपी"),
    description: b(
      "Exposure and Response Prevention (ERP) helps people with OCD face fears gradually without performing compulsions. How ERP works, what to expect and results.",
      "एक्सपोज़र एंड रिस्पॉन्स प्रिवेंशन (ERP) OCD वाले लोगों को बिना बाध्यकारी काम किए धीरे-धीरे डर का सामना करना सिखाती है। ERP कैसे काम करती है और क्या उम्मीद करें।"
    ),
    intro: [
      b("In OCD, compulsions (washing, checking, praying, seeking reassurance) bring short-term relief but keep the obsessions going.", "OCD में बाध्यकारी काम (धोना, जाँचना, बार-बार प्रार्थना, भरोसा माँगना) थोड़ी राहत देते हैं पर ऑब्सेशन को बनाए रखते हैं।"),
      b("ERP gradually exposes you to triggers while resisting compulsions, so the brain learns that anxiety falls on its own.", "ERP में धीरे-धीरे ट्रिगर का सामना करते हुए बाध्यकारी काम रोके जाते हैं, ताकि दिमाग़ सीखे कि घबराहट अपने आप कम होती है।"),
    ],
    whoBenefits: [
      b("OCD: contamination, checking, symmetry, intrusive thoughts", "OCD: गंदगी, जाँचना, बराबरी, अनचाहे विचार"),
      b("Body dysmorphic disorder, hoarding, health anxiety (adapted)", "बॉडी डिस्मॉर्फ़िक डिसऑर्डर, होर्डिंग, सेहत की चिंता (बदलाव के साथ)"),
    ],
    howItWorks: [
      b("Building a fear ladder from easiest to hardest", "आसान से कठिन तक डर की सीढ़ी बनाना"),
      b("Practising exposures in sessions and at home", "सेशन और घर पर एक्सपोज़र का अभ्यास"),
      b("Gradually reducing rituals and reassurance-seeking", "धीरे-धीरे रिवाज़ और भरोसा माँगना कम करना"),
    ],
    evidence: [b("First-line psychological treatment for OCD, alone or with medicines", "OCD का पहली पसंद वाला मनोवैज्ञानिक इलाज, अकेले या दवाओं के साथ")],
    psychotherapy: [b("Graded exposure, response prevention, cognitive work on responsibility and certainty", "धीरे-धीरे एक्सपोज़र, रिस्पॉन्स प्रिवेंशन, ज़िम्मेदारी और निश्चितता पर संज्ञानात्मक काम")],
    family: [
      b("Family members learn to reduce reassurance and accommodation lovingly", "परिवार प्यार से भरोसा देना और रिवाज़ों में साथ देना कम करना सीखता है"),
    ],
    isItRight: [b("You are ready to tolerate some anxiety in a planned way to get better", "आप ठीक होने के लिए योजना के साथ कुछ घबराहट सहने को तैयार हैं")],
    faqs: [
      faq("Will ERP make my anxiety worse?", "क्या ERP से घबराहट बढ़ेगी?", "Anxiety rises briefly during exposure but falls with practice. Steps are planned together at a pace you agree to.", "एक्सपोज़र के दौरान घबराहट थोड़ी देर बढ़ती है पर अभ्यास से घटती है। क़दम आपकी सहमति की रफ़्तार से साथ तय होते हैं।"),
      FEES,
    ],
    related: ["ocd-treatment-india", "body-dysmorphic-disorder-india", "hoarding-disorder-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["ocd"],
    videoKeywords: ["ocd", "erp", "exposure"],
    keywords: ["erp", "ocd therapy", "vaham ka ilaj", "exposure"],
  }),
  therapy({
    slug: "dbt-skills-india",
    name: b("DBT skills", "DBT स्किल्स"),
    title: b("DBT Skills – Emotion Regulation & Distress Tolerance", "DBT स्किल्स – भावनाएँ सँभालना और संकट सहना"),
    h1: b("DBT skills: managing intense emotions", "DBT स्किल्स: तीव्र भावनाओं को सँभालना"),
    description: b(
      "Dialectical Behaviour Therapy (DBT) skills help with intense emotions, impulsive behaviour, self-harm urges and relationship conflict. The four skill modules explained.",
      "डायलेक्टिकल बिहेवियर थेरेपी (DBT) स्किल्स तीव्र भावनाओं, आवेग वाले व्यवहार, ख़ुद को नुकसान की इच्छा और रिश्तों के झगड़ों में मदद करती हैं।"
    ),
    intro: [
      b("DBT was developed for people who experience emotions very intensely. It balances acceptance with change.", "DBT उन लोगों के लिए बनी जो भावनाओं को बहुत तीव्रता से अनुभव करते हैं। इसमें स्वीकृति और बदलाव का संतुलन है।"),
      b("Skills are taught in four modules and practised in daily life.", "कौशल चार हिस्सों में सिखाए जाते हैं और रोज़ की ज़िंदगी में अभ्यास किए जाते हैं।"),
    ],
    whoBenefits: [
      b("Emotional instability, borderline personality traits", "भावनात्मक अस्थिरता, बॉर्डरलाइन व्यक्तित्व के लक्षण"),
      b("Repeated self-harm urges or impulsive behaviour", "बार-बार ख़ुद को नुकसान की इच्छा या आवेग वाला व्यवहार"),
      b("Anger outbursts, binge eating, substance use linked to emotions", "ग़ुस्से के दौरे, भावनाओं से जुड़ा ज़्यादा खाना या नशा"),
    ],
    howItWorks: [
      b("Mindfulness — noticing emotions without reacting", "माइंडफ़ुलनेस — बिना प्रतिक्रिया के भावनाएँ देखना"),
      b("Distress tolerance — surviving crises without making them worse", "संकट सहना — हालात बिगाड़े बिना संकट से निकलना"),
      b("Emotion regulation — understanding and reducing emotional vulnerability", "भावना नियंत्रण — भावनात्मक कमज़ोरी समझना और घटाना"),
      b("Interpersonal effectiveness — asking for needs and saying no", "रिश्तों में असर — ज़रूरतें माँगना और मना करना"),
    ],
    evidence: [b("Borderline personality disorder and recurrent self-harm; adapted for adolescents and eating disorders", "बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर और बार-बार ख़ुद को नुकसान; किशोरों और ईटिंग डिसऑर्डर के लिए बदलाव के साथ")],
    psychotherapy: [b("Diary cards, chain analysis, skills practice", "डायरी कार्ड, चेन एनालिसिस, कौशल अभ्यास")],
    isItRight: [
      b("Emotions feel overwhelming and lead to actions you regret", "भावनाएँ हावी हो जाती हैं और ऐसे काम होते हैं जिन पर पछतावा हो"),
      b("If you are at immediate risk, seek emergency care first", "अगर तुरंत ख़तरा है तो पहले इमरजेंसी इलाज लें"),
    ],
    faqs: [
      faq("Is this full DBT?", "क्या यह पूरी DBT है?", "Sessions here teach DBT skills individually. Comprehensive DBT programmes include group training and phone coaching, which may be arranged separately.", "यहाँ सेशन में DBT कौशल व्यक्तिगत रूप से सिखाए जाते हैं। पूरी DBT में ग्रुप प्रशिक्षण और फ़ोन कोचिंग भी होती है, जिसकी अलग व्यवस्था करनी पड़ सकती है।"),
      FEES,
    ],
    related: ["borderline-personality-disorder-india", "suicide-prevention-crisis-support-india", "anger-management-india", "binge-eating-disorder-india"],
    videoKeywords: ["dbt", "emotion", "भावना"],
    keywords: ["dbt", "emotion control", "gussa", "self harm help"],
  }),
  therapy({
    slug: "supportive-psychotherapy-india",
    name: b("Supportive psychotherapy", "सपोर्टिव साइकोथेरेपी"),
    title: b("Supportive Psychotherapy – Coping Through Difficult Times", "सपोर्टिव साइकोथेरेपी – कठिन समय में सँभलना"),
    h1: b("Supportive psychotherapy", "सपोर्टिव साइकोथेरेपी"),
    description: b(
      "Supportive psychotherapy offers a steady, empathetic space to cope with illness, loss, crises and long-term mental health conditions. How it helps and who it suits.",
      "सपोर्टिव साइकोथेरेपी बीमारी, नुकसान, संकट और लंबी मानसिक बीमारियों से निपटने के लिए स्थिर, सहानुभूतिपूर्ण जगह देती है।"
    ),
    intro: [
      b("Supportive therapy strengthens coping, self-esteem and problem-solving rather than exploring deep past experiences.", "सपोर्टिव थेरेपी पुराने अनुभवों में गहराई से जाने के बजाय सामना करने की क्षमता, आत्मसम्मान और समस्या सुलझाने को मज़बूत करती है।"),
      b("It is often combined with medicines in long-term conditions.", "लंबी बीमारियों में इसे अक्सर दवाओं के साथ जोड़ा जाता है।"),
    ],
    whoBenefits: [
      b("People facing crises, grief or serious physical illness", "संकट, शोक या गंभीर शारीरिक बीमारी का सामना करने वाले"),
      b("Long-term conditions like schizophrenia or bipolar disorder", "सिज़ोफ्रेनिया या बाइपोलर जैसी लंबी बीमारियाँ"),
      b("Older adults and caregivers", "बुज़ुर्ग और देखभाल करने वाले"),
    ],
    howItWorks: [
      b("Listening, reassurance and guidance", "सुनना, भरोसा देना और मार्गदर्शन"),
      b("Practical problem-solving and strengthening routines", "व्यावहारिक समस्या-समाधान और दिनचर्या मज़बूत करना"),
    ],
    evidence: [b("Adjustment problems, chronic illness, as part of combined care in severe mental illness", "तालमेल की समस्याएँ, पुरानी बीमारी, गंभीर मानसिक बीमारी में संयुक्त देखभाल के हिस्से के रूप में")],
    psychotherapy: [b("Empathic listening, psychoeducation, coping skills", "सहानुभूति से सुनना, जानकारी देना, सामना करने के कौशल")],
    isItRight: [b("You need steady support through a difficult period", "कठिन दौर में आपको लगातार सहारे की ज़रूरत है")],
    faqs: [FEES, WITH_MEDS],
    related: ["adjustment-disorder-india", "prolonged-grief-disorder-india", "schizophrenia-treatment-india", "psychotherapy-counselling"],
    videoKeywords: ["counselling", "therapy", "support"],
    keywords: ["counselling", "sahara", "support therapy"],
  }),
  therapy({
    slug: "family-therapy-india",
    name: b("Family therapy", "फ़ैमिली थेरेपी"),
    title: b("Family Therapy – Working Together for Mental Health", "फ़ैमिली थेरेपी – मानसिक स्वास्थ्य के लिए मिलकर काम"),
    h1: b("Family therapy: healing together", "फ़ैमिली थेरेपी: साथ मिलकर ठीक होना"),
    description: b(
      "Family therapy improves communication and support when a family member has a mental illness, addiction or behaviour problem. What to expect and who should attend.",
      "जब परिवार में किसी को मानसिक बीमारी, नशा या व्यवहार की समस्या हो, तो फ़ैमिली थेरेपी बातचीत और सहारा बेहतर करती है। क्या उम्मीद करें और कौन शामिल हो।"
    ),
    intro: [
      b("In Indian families, decisions and care are often shared. Involving the family can greatly improve recovery.", "भारतीय परिवारों में फ़ैसले और देखभाल अक्सर साझा होते हैं। परिवार को शामिल करने से सुधार बहुत बेहतर हो सकता है।"),
      b("Family therapy looks at patterns of communication rather than blaming one person.", "फ़ैमिली थेरेपी किसी एक को दोष देने के बजाय बातचीत के पैटर्न को देखती है।"),
    ],
    whoBenefits: [
      b("Families of people with psychosis, bipolar disorder or addiction", "साइकोसिस, बाइपोलर या नशे वाले लोगों के परिवार"),
      b("Teenagers with behaviour, eating or mood problems", "व्यवहार, खाने या मूड की समस्या वाले किशोर"),
      b("Families facing conflict, separation or loss", "कलह, अलगाव या नुकसान झेल रहे परिवार"),
    ],
    howItWorks: [
      b("Sessions with relevant family members together, sometimes separately", "संबंधित परिवारजनों के साथ सेशन, कभी-कभी अलग-अलग"),
      b("Psychoeducation about the illness and warning signs", "बीमारी और चेतावनी संकेतों की जानकारी"),
      b("Communication and problem-solving practice", "बातचीत और समस्या-समाधान का अभ्यास"),
    ],
    evidence: [b("Reduces relapse in schizophrenia; first-line in adolescent anorexia; helpful in substance use", "सिज़ोफ्रेनिया में बीमारी लौटना घटाती है; किशोरों के एनोरेक्सिया में पहली पसंद; नशे में मददगार")],
    psychotherapy: [b("Psychoeducation, structural and systemic techniques, communication training", "जानकारी, स्ट्रक्चरल और सिस्टमिक तकनीकें, बातचीत प्रशिक्षण")],
    family: [b("Each member's view is heard; no one is blamed", "हर सदस्य की बात सुनी जाती है; किसी को दोष नहीं दिया जाता")],
    isItRight: [b("The problem affects the whole family, or family support is key to recovery", "समस्या पूरे परिवार पर असर डालती है, या सुधार में परिवार का सहारा अहम है")],
    faqs: [faq("Can family members join from different cities?", "क्या अलग-अलग शहरों से परिवारजन जुड़ सकते हैं?", "Yes. Online sessions allow family members in different places to join together.", "हाँ। ऑनलाइन सेशन में अलग-अलग जगहों के परिवारजन साथ जुड़ सकते हैं।"), FEES],
    related: ["schizophrenia-treatment-india", "anorexia-nervosa-india", "deaddiction-psychiatrist-india", "couples-therapy-india"],
    articles: ["helping-family-member-with-addiction"],
    videoKeywords: ["family", "परिवार", "therapy"],
    keywords: ["family counselling", "parivar", "ghar ke jhagde"],
  }),
  therapy({
    slug: "couples-therapy-india",
    name: b("Couples therapy", "कपल थेरेपी"),
    title: b("Couples Therapy – Communication, Trust & Intimacy", "कपल थेरेपी – बातचीत, भरोसा और नज़दीकी"),
    h1: b("Couples therapy: strengthening your relationship", "कपल थेरेपी: रिश्ते को मज़बूत बनाना"),
    description: b(
      "Couples therapy helps partners improve communication, resolve conflict, rebuild trust and address sexual difficulties. What happens in sessions and when to start.",
      "कपल थेरेपी साथियों को बातचीत सुधारने, झगड़े सुलझाने, भरोसा फिर बनाने और यौन कठिनाइयों पर काम करने में मदद करती है।"
    ),
    intro: [
      b("Couples therapy treats the relationship as the focus, helping both partners understand patterns that cause distress.", "कपल थेरेपी में रिश्ता केंद्र होता है, जिससे दोनों साथी परेशानी पैदा करने वाले पैटर्न समझ पाते हैं।"),
      b("It is useful for unmarried and married couples alike, and for sexual concerns that involve both partners.", "यह अविवाहित और विवाहित दोनों तरह के जोड़ों के लिए, और दोनों से जुड़ी यौन चिंताओं में उपयोगी है।"),
    ],
    whoBenefits: [
      b("Frequent arguments or emotional distance", "बार-बार झगड़े या भावनात्मक दूरी"),
      b("Trust issues after conflict or infidelity", "झगड़े या बेवफ़ाई के बाद भरोसे की कमी"),
      b("Sexual difficulties such as PE, ED, low desire or vaginismus", "शीघ्रपतन, इरेक्शन, कम इच्छा या वैजिनिस्मस जैसी यौन कठिनाइयाँ"),
    ],
    howItWorks: [
      b("Joint sessions with occasional individual sessions", "साथ में सेशन, कभी-कभी अलग-अलग"),
      b("Setting shared goals and practising new ways of communicating", "साझा लक्ष्य तय करना और बातचीत के नए तरीक़ों का अभ्यास"),
    ],
    evidence: [b("Relationship distress; depression linked to relationship problems; sexual dysfunctions", "रिश्ते की परेशानी; रिश्ते से जुड़ा डिप्रेशन; यौन समस्याएँ")],
    psychotherapy: [b("Behavioural couples therapy, emotion-focused techniques, sensate focus", "बिहेवियरल कपल थेरेपी, भावना-केंद्रित तकनीकें, सेंसेट फ़ोकस")],
    isItRight: [
      b("Both partners are willing to work on the relationship", "दोनों साथी रिश्ते पर काम करने को तैयार हैं"),
      b("If there is violence, safety comes first; individual help is advised", "अगर हिंसा है तो सुरक्षा पहले; व्यक्तिगत मदद की सलाह"),
    ],
    faqs: [faq("Will the therapist take sides?", "क्या थेरेपिस्ट किसी का पक्ष लेंगे?", "No. The therapist stays neutral and helps both partners be heard.", "नहीं। थेरेपिस्ट निष्पक्ष रहते हैं और दोनों की बात सुनी जाए, यह देखते हैं।"), FEES],
    related: ["relationship-difficulties-counselling-india", "marital-counselling-india", "psychosexual-counselling-india", "low-sexual-desire-india"],
    videoKeywords: ["couple", "relationship", "रिश्ते"],
    keywords: ["couple counselling", "relationship therapy", "partner"],
  }),
  therapy({
    slug: "marital-counselling-india",
    name: b("Marital counselling", "वैवाहिक (मैरिटल) काउंसलिंग"),
    title: b("Marital Counselling – Help for Married Couples", "मैरिटल काउंसलिंग – विवाहित जोड़ों के लिए मदद"),
    h1: b("Marital counselling: support for married life", "मैरिटल काउंसलिंग: वैवाहिक जीवन में सहारा"),
    description: b(
      "Adjustment after marriage, in-law conflicts, communication gaps or intimacy concerns? Marital counselling helps couples understand each other and find workable solutions.",
      "शादी के बाद तालमेल, ससुराल के झगड़े, बातचीत की कमी या नज़दीकी की चिंता? मैरिटल काउंसलिंग जोड़ों को एक-दूसरे को समझने और हल ढूँढने में मदद करती है।"
    ),
    intro: [
      b("Marriage in India often involves two families, not just two people. Adjustment to new roles, expectations and joint-family living can create stress.", "भारत में शादी अक्सर सिर्फ़ दो लोगों की नहीं, दो परिवारों की होती है। नई भूमिकाओं, उम्मीदों और संयुक्त परिवार में रहने के तालमेल से तनाव हो सकता है।"),
      b("Marital counselling offers a neutral space to talk, understand and plan.", "मैरिटल काउंसलिंग बात करने, समझने और योजना बनाने के लिए निष्पक्ष जगह देती है।"),
    ],
    whoBenefits: [
      b("Newly married couples adjusting to each other and families", "नए जोड़े जो एक-दूसरे और परिवारों से तालमेल बिठा रहे हैं"),
      b("Conflicts over money, in-laws, children or careers", "पैसे, ससुराल, बच्चों या करियर पर झगड़े"),
      b("Unconsummated marriage or sexual concerns", "शादी के बाद संबंध न बन पाना या यौन चिंताएँ"),
      b("When one partner has depression, addiction or another illness", "जब एक साथी को डिप्रेशन, नशा या कोई बीमारी हो"),
    ],
    howItWorks: [
      b("Understanding each partner's expectations", "हर साथी की उम्मीदें समझना"),
      b("Communication, problem-solving and boundary-setting with families", "बातचीत, समस्या-समाधान और परिवारों के साथ सीमाएँ तय करना"),
    ],
    evidence: [b("Marital distress, adjustment problems and associated depression or anxiety", "वैवाहिक परेशानी, तालमेल की समस्याएँ और उनसे जुड़ा डिप्रेशन या घबराहट")],
    psychotherapy: [b("Couples-based CBT, communication training, psychosexual therapy when needed", "जोड़ों पर आधारित CBT, बातचीत प्रशिक्षण, ज़रूरत हो तो साइकोसेक्सुअल थेरेपी")],
    isItRight: [
      b("You want to improve the marriage, or to make decisions calmly", "आप शादी सुधारना चाहते हैं, या शांति से फ़ैसले लेना चाहते हैं"),
      b("Domestic violence is never acceptable — call 112 or the women's helpline 181 in an emergency", "घरेलू हिंसा कभी स्वीकार्य नहीं — इमरजेंसी में 112 या महिला हेल्पलाइन 181 पर कॉल करें"),
    ],
    faqs: [faq("Is counselling only for couples about to separate?", "क्या काउंसलिंग सिर्फ़ अलग होने वाले जोड़ों के लिए है?", "No. Many couples seek counselling early to prevent problems from growing.", "नहीं। बहुत से जोड़े समस्याएँ बढ़ने से रोकने के लिए जल्दी काउंसलिंग लेते हैं।"), FEES],
    related: ["couples-therapy-india", "relationship-difficulties-counselling-india", "vaginismus-sexual-pain-india", "family-therapy-india"],
    videoKeywords: ["marriage", "शादी", "couple"],
    keywords: ["shadi", "pati patni", "marriage counselling", "sasural"],
  }),
  therapy({
    slug: "stress-management-india",
    name: b("Stress management", "तनाव प्रबंधन"),
    title: b("Stress Management – Practical Techniques & Counselling", "तनाव प्रबंधन – व्यावहारिक तकनीकें और काउंसलिंग"),
    h1: b("Stress management: skills for everyday pressure", "तनाव प्रबंधन: रोज़ के दबाव के लिए कौशल"),
    description: b(
      "Stress affecting sleep, mood, BP or relationships? Structured stress-management counselling teaches relaxation, problem-solving and lifestyle skills that last.",
      "तनाव से नींद, मूड, बीपी या रिश्तों पर असर? व्यवस्थित तनाव प्रबंधन काउंसलिंग रिलैक्सेशन, समस्या-समाधान और जीवनशैली के स्थायी कौशल सिखाती है।"
    ),
    intro: [
      b("Stress is the body's response to demands. In the short term it can help, but long-term stress affects sleep, mood, heart health and immunity.", "तनाव माँगों पर शरीर की प्रतिक्रिया है। थोड़े समय में यह मदद कर सकता है, पर लंबा तनाव नींद, मूड, दिल की सेहत और रोग-प्रतिरोधक क्षमता पर असर डालता है।"),
      b("Stress management combines body-based relaxation, thinking skills and practical changes.", "तनाव प्रबंधन में शरीर आधारित रिलैक्सेशन, सोच के कौशल और व्यावहारिक बदलाव शामिल हैं।"),
    ],
    whoBenefits: [
      b("Students, professionals and caregivers under pressure", "दबाव में विद्यार्थी, पेशेवर और देखभाल करने वाले"),
      b("Stress-related headaches, acidity, BP or sleep problems", "तनाव से जुड़े सिरदर्द, एसिडिटी, बीपी या नींद की समस्या"),
    ],
    howItWorks: [
      b("Identifying sources of stress and early warning signs", "तनाव के स्रोत और शुरुआती चेतावनी संकेत पहचानना"),
      b("Learning and practising relaxation daily", "रोज़ रिलैक्सेशन सीखना और अभ्यास"),
      b("Planning changes in workload, sleep and activity", "काम, नींद और गतिविधि में बदलाव की योजना"),
    ],
    evidence: [b("Work and academic stress, adjustment problems, mild anxiety", "काम और पढ़ाई का तनाव, तालमेल की समस्याएँ, हल्की घबराहट")],
    psychotherapy: [
      b("Breathing exercises and progressive muscle relaxation", "साँस के अभ्यास और प्रोग्रेसिव मसल रिलैक्सेशन"),
      b("Problem-solving and time management", "समस्या-समाधान और समय प्रबंधन"),
      b("Mindfulness and cognitive restructuring", "माइंडफ़ुलनेस और सोच का पुनर्गठन"),
    ],
    isItRight: [b("Stress is persistent but you are still functioning; if mood or sleep are badly affected, a psychiatric assessment is advised too", "तनाव लगातार है पर आप काम कर पा रहे हैं; अगर मूड या नींद बहुत प्रभावित है तो मनोरोग जाँच भी सलाह योग्य है")],
    faqs: [FEES, faq("Can yoga and meditation help?", "क्या योग और ध्यान मदद करते हैं?", "Yes, regular practice can reduce stress. They work well alongside therapy and do not replace treatment for illness.", "हाँ, नियमित अभ्यास तनाव घटा सकता है। ये थेरेपी के साथ अच्छा काम करते हैं पर बीमारी के इलाज की जगह नहीं लेते।")],
    related: ["workplace-stress-india", "generalized-anxiety-disorder-india", "academic-burnout-students-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["gad7", "study-stress"],
    videoKeywords: ["stress", "तनाव", "relaxation"],
    keywords: ["tanav", "tension", "stress kaise kam kare", "relax"],
  }),
  therapy({
    slug: "relapse-prevention-counselling-india",
    name: b("Relapse prevention counselling (addiction)", "रिलैप्स प्रिवेंशन काउंसलिंग (नशा)"),
    title: b("Relapse Prevention Counselling – Staying Free From Addiction", "रिलैप्स प्रिवेंशन काउंसलिंग – नशे से दूर रहना"),
    h1: b("Relapse prevention: staying on track after de-addiction", "रिलैप्स प्रिवेंशन: नशा छोड़ने के बाद सही राह पर बने रहना"),
    description: b(
      "Stopped alcohol, tobacco or drugs and want to stay stopped? Relapse prevention counselling helps you manage cravings, triggers and slips. How it works.",
      "शराब, तंबाकू या नशा छोड़ा है और उससे दूर रहना चाहते हैं? रिलैप्स प्रिवेंशन काउंसलिंग तलब, ट्रिगर और फिसलन सँभालने में मदद करती है।"
    ),
    intro: [
      b("Stopping is the first step; staying stopped is the longer journey. Relapse is common and is a signal to adjust the plan, not a failure.", "छोड़ना पहला क़दम है; दूर बने रहना लंबी यात्रा है। दोबारा शुरू होना आम है और यह योजना बदलने का संकेत है, हार नहीं।"),
      b("Relapse prevention teaches skills to recognise early warning signs and respond before a slip becomes a full relapse.", "रिलैप्स प्रिवेंशन शुरुआती चेतावनी संकेत पहचानने और फिसलन को पूरी वापसी बनने से पहले रोकने के कौशल सिखाता है।"),
    ],
    whoBenefits: [
      b("After detox from alcohol, opioids, cannabis or sedatives", "शराब, ओपिऑइड, गांजे या नींद की दवाओं से नशा छुड़ाने के बाद"),
      b("Tobacco and nicotine quitters", "तंबाकू और निकोटीन छोड़ने वाले"),
      b("Gaming or gambling problems", "गेमिंग या जुए की समस्या"),
    ],
    howItWorks: [
      b("Mapping personal high-risk situations", "निजी जोखिम भरी स्थितियों की पहचान"),
      b("Coping plans for cravings, social pressure and celebrations", "तलब, सामाजिक दबाव और समारोहों के लिए योजना"),
      b("Lifestyle balance: sleep, work, family time, exercise", "जीवनशैली का संतुलन: नींद, काम, परिवार का समय, व्यायाम"),
    ],
    evidence: [b("Alcohol and drug use disorders, tobacco cessation, behavioural addictions", "शराब और नशे की बीमारियाँ, तंबाकू छोड़ना, व्यवहारिक लतें")],
    psychotherapy: [
      b("Motivational interviewing and CBT-based relapse prevention", "मोटिवेशनल इंटरव्यूइंग और CBT आधारित रिलैप्स प्रिवेंशन"),
      b("Urge-surfing and refusal skills", "तलब को गुज़रने देना और मना करने के कौशल"),
    ],
    family: [b("Family learns to support without policing, and to spot early warning signs", "परिवार बिना पहरेदारी के साथ देना और शुरुआती संकेत पहचानना सीखता है")],
    isItRight: [b("You have stopped or reduced use and want to maintain the change", "आपने छोड़ा या कम किया है और बदलाव बनाए रखना चाहते हैं")],
    faqs: [faq("Do I still need medicines?", "क्या अब भी दवाओं की ज़रूरत है?", "Some people benefit from anti-craving medicines alongside counselling. Your psychiatrist will advise.", "कुछ लोगों को काउंसलिंग के साथ तलब कम करने वाली दवाओं से फ़ायदा होता है। आपके मनोचिकित्सक सलाह देंगे।"), FEES],
    related: ["deaddiction-psychiatrist-india", "alcohol-addiction-treatment-india", "opium-afeem-addiction-india", "nicotine-dependence-treatment-india"],
    articles: ["stopping-alcohol-safely", "helping-family-member-with-addiction"],
    videoKeywords: ["relapse", "addiction", "नशा"],
    keywords: ["nasha wapas", "relapse", "dobara peena", "craving"],
  }),
  therapy({
    slug: "anger-management-india",
    name: b("Anger management", "ग़ुस्सा नियंत्रण (एंगर मैनेजमेंट)"),
    title: b("Anger Management – Control Anger Before It Controls You", "एंगर मैनेजमेंट – ग़ुस्से पर नियंत्रण"),
    h1: b("Anger management: understanding and controlling anger", "एंगर मैनेजमेंट: ग़ुस्से को समझना और नियंत्रित करना"),
    description: b(
      "Frequent outbursts harming relationships, work or health? Anger management counselling teaches you to recognise triggers and respond calmly. Causes and techniques.",
      "बार-बार ग़ुस्से के दौरे रिश्तों, काम या सेहत को नुकसान पहुँचा रहे हैं? एंगर मैनेजमेंट काउंसलिंग ट्रिगर पहचानना और शांत रहना सिखाती है।"
    ),
    intro: [
      b("Anger is a normal emotion. It becomes a problem when it is frequent, intense, or expressed through shouting, breaking things or hurting others.", "ग़ुस्सा सामान्य भावना है। यह समस्या तब बनता है जब यह बार-बार, बहुत तेज़ हो, या चिल्लाने, चीज़ें तोड़ने या दूसरों को चोट पहुँचाने के रूप में निकले।"),
      b("Anger can also be a sign of depression, anxiety, ADHD, bipolar disorder or substance use, which a psychiatrist can assess.", "ग़ुस्सा डिप्रेशन, घबराहट, ADHD, बाइपोलर या नशे का संकेत भी हो सकता है, जिसकी जाँच मनोचिकित्सक कर सकते हैं।"),
    ],
    whoBenefits: [
      b("Adults and teenagers with frequent outbursts", "बार-बार ग़ुस्से के दौरे वाले वयस्क और किशोर"),
      b("Anger linked to stress, alcohol or relationship conflict", "तनाव, शराब या रिश्तों के झगड़ों से जुड़ा ग़ुस्सा"),
      b("Road rage, workplace conflicts", "सड़क पर ग़ुस्सा, काम पर झगड़े"),
    ],
    howItWorks: [
      b("Recognising body signals and triggers early", "शरीर के संकेत और ट्रिगर जल्दी पहचानना"),
      b("Time-out, calming and communication techniques", "टाइम-आउट, शांत होने और बातचीत की तकनीकें"),
      b("Assessment for underlying conditions", "मूल बीमारियों की जाँच"),
    ],
    evidence: [b("CBT-based anger management reduces outbursts and aggression", "CBT आधारित एंगर मैनेजमेंट से ग़ुस्से के दौरे और आक्रामकता घटती है")],
    psychotherapy: [b("Cognitive restructuring, relaxation, assertiveness training, problem-solving", "सोच का पुनर्गठन, रिलैक्सेशन, अपनी बात सही तरीक़े से रखना, समस्या-समाधान")],
    family: [b("Agree on a time-out signal; discuss issues once everyone is calm", "टाइम-आउट का संकेत तय करें; सब शांत हों तब बात करें")],
    isItRight: [
      b("Your anger has hurt relationships or caused regret", "आपके ग़ुस्से से रिश्तों को चोट पहुँची है या पछतावा हुआ है"),
      b("If anyone is at risk of harm, ensure safety first and call 112 if needed", "अगर किसी को नुकसान का ख़तरा है तो पहले सुरक्षा पक्की करें और ज़रूरत हो तो 112 पर कॉल करें"),
    ],
    faqs: [faq("Are there medicines for anger?", "क्या ग़ुस्से की दवाएँ हैं?", "There is no single anger pill, but treating an underlying condition such as depression, ADHD or bipolar disorder often reduces anger.", "ग़ुस्से की कोई एक गोली नहीं, पर डिप्रेशन, ADHD या बाइपोलर जैसी मूल बीमारी का इलाज अक्सर ग़ुस्सा घटाता है।"), FEES],
    related: ["rebt-therapy-india", "dbt-skills-india", "bipolar-disorder-psychiatrist-india", "adult-adhd-treatment-india"],
    videoKeywords: ["anger", "ग़ुस्सा", "gussa"],
    keywords: ["gussa", "krodh", "anger", "chidchidapan"],
  }),
];

const SHARED_FAQS = [
  faq("How many sessions will I need?", "कितने सेशन लगेंगे?", "It depends on the concern and your goals. Progress is reviewed together every few sessions.", "यह समस्या और आपके लक्ष्यों पर निर्भर करता है। हर कुछ सेशन में मिलकर प्रगति की समीक्षा होती है।"),
  WITH_MEDS,
  FEES,
];

export const NEW_THERAPIES: ConditionContent[] = topUpFaqs(PAGES, SHARED_FAQS);
