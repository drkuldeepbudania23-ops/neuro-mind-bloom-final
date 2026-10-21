import type { ConditionContent, ExtraSection } from "../types";
import type { L10n } from "../../i18n";
import { b, faq, topUpFaqs } from "./_h";

/** Student & young-professional pages (group "student"), with separate guidance per audience. */

const forStudents = (items: L10n[]): ExtraSection => ({ id: "for-students", title: b("For students", "छात्रों के लिए"), items, tone: "info" });
const forMedics = (items: L10n[]): ExtraSection => ({ id: "for-medical", title: b("For medical students and residents", "मेडिकल छात्रों और रेज़िडेंट्स के लिए"), items, tone: "info" });

const PARENTS: L10n[] = [
  b("Ask about feelings, not only marks and test ranks", "सिर्फ़ नंबर और रैंक नहीं, भावनाओं के बारे में भी पूछें"),
  b("Avoid comparison with cousins or toppers", "रिश्तेदारों के बच्चों या टॉपर्स से तुलना न करें"),
  b("Make it clear that your love does not depend on the result", "साफ़ बताएँ कि आपका प्यार नतीजे पर निर्भर नहीं"),
  b("Watch for withdrawal, sleep change or talk of hopelessness, and act early", "अलग-थलग रहना, नींद में बदलाव या निराशा की बातों पर नज़र रखें, और जल्दी क़दम उठाएँ"),
];

const STUDY_SEEK: L10n[] = [
  b("Stress, sleep or mood problems lasting more than two weeks", "दो हफ़्ते से ज़्यादा तनाव, नींद या मूड की समस्या"),
  b("Panic attacks, inability to study, or skipping classes", "पैनिक अटैक, पढ़ न पाना, या क्लास छोड़ना"),
  b("Any thought of self-harm or ending life — seek help the same day (Tele-MANAS 14416, emergency 112)", "ख़ुद को नुकसान या जान देने का कोई भी विचार — उसी दिन मदद लें (टेली-मानस 14416, इमरजेंसी 112)"),
];

const STUDY_CBT: L10n[] = [
  b("CBT for exam anxiety, perfectionism and negative thinking", "परीक्षा की घबराहट, परफ़ेक्शनिज़्म और नकारात्मक सोच के लिए CBT"),
  b("Stress-management and relaxation training", "तनाव प्रबंधन और रिलैक्सेशन प्रशिक्षण"),
  b("Study-planning and time-management coaching", "पढ़ाई की योजना और समय प्रबंधन की कोचिंग"),
];

const NO_SCREEN_DX: L10n = b(
  "Screening tools here help you reflect; they do not replace a clinical assessment.",
  "यहाँ के स्क्रीनिंग टूल सोचने में मदद करते हैं; वे क्लिनिकल जाँच की जगह नहीं लेते।"
);

const common = { category: "student" as const, group: "student" as const, selfTests: ["study-stress", "gad7", "phq9"] as ConditionContent["selfTests"] };

const PAGES: ConditionContent[] = [
  {
    ...common,
    slug: "neet-exam-stress-india",
    name: b("NEET preparation stress", "NEET की तैयारी का तनाव"),
    title: b("NEET Exam Stress – Coping Guide for Aspirants & Parents", "NEET परीक्षा का तनाव – विद्यार्थियों और माता-पिता के लिए गाइड"),
    h1: b("NEET preparation stress: staying well while aiming high", "NEET की तैयारी का तनाव: ऊँचे लक्ष्य के साथ ख़ुद को स्वस्थ रखना"),
    description: b(
      "Preparing for NEET and feeling burnt out, anxious or hopeless after mock tests? Practical coping strategies, warning signs and when to get professional help.",
      "NEET की तैयारी में थकान, घबराहट या मॉक टेस्ट के बाद निराशा? व्यावहारिक तरीक़े, चेतावनी संकेत और कब विशेषज्ञ मदद लें।"
    ),
    intro: [
      b("NEET aspirants often study long hours for one or more years, frequently away from home in coaching hubs. Pressure from rank lists, repeated attempts and family expectations can affect sleep, mood and confidence.", "NEET की तैयारी करने वाले अक्सर एक या ज़्यादा साल लंबे घंटे पढ़ते हैं, कई बार घर से दूर कोचिंग शहरों में। रैंक लिस्ट, दोबारा प्रयास और परिवार की उम्मीदों का दबाव नींद, मूड और आत्मविश्वास पर असर डालता है।"),
      b("Stress is expected, but persistent anxiety, low mood or hopelessness are signs to seek help — getting help early also protects performance.", "तनाव स्वाभाविक है, पर लगातार घबराहट, उदासी या निराशा मदद लेने के संकेत हैं — जल्दी मदद से प्रदर्शन भी बचा रहता है।"),
    ],
    symptoms: [
      b("Constant worry about rank, cut-offs and \"wasting a year\"", "रैंक, कट-ऑफ़ और \"साल बर्बाद होने\" की लगातार चिंता"),
      b("Mock-test scores dominating mood", "मॉक टेस्ट के नंबरों से मूड तय होना"),
      b("Poor sleep, headaches, loss of appetite", "ख़राब नींद, सिरदर्द, भूख न लगना"),
      b("Reading the same page repeatedly without absorbing it", "एक ही पेज बार-बार पढ़ना पर कुछ समझ न आना"),
      b("Isolation in hostel or PG; homesickness", "हॉस्टल या पीजी में अकेलापन; घर की याद"),
    ],
    causes: [
      b("High stakes and limited seats", "बड़ा दाँव और सीमित सीटें"),
      b("Long study hours without breaks, sleep or exercise", "बिना ब्रेक, नींद या व्यायाम के लंबे घंटे पढ़ाई"),
      b("Repeated attempts and comparison with peers", "बार-बार प्रयास और साथियों से तुलना"),
    ],
    riskFactors: [
      b("Living away from family for the first time", "पहली बार परिवार से दूर रहना"),
      b("Prior anxiety, depression or ADHD", "पहले से एंग्ज़ाइटी, डिप्रेशन या ADHD"),
      b("Financial pressure on the family", "परिवार पर आर्थिक दबाव"),
    ],
    extra: [
      forStudents([
        b("Sleep 7–8 hours — memory consolidation happens during sleep", "7–8 घंटे सोएँ — याददाश्त नींद में पक्की होती है"),
        b("Use timed study blocks with short breaks; one rest half-day each week", "छोटे ब्रेक के साथ तय समय की पढ़ाई; हर हफ़्ते आधा दिन आराम"),
        b("Analyse mock tests for learning, not for self-judgement", "मॉक टेस्ट से सीखें, ख़ुद को परखने के लिए नहीं"),
        b("Stay connected: a daily call home, one friend you can talk to", "जुड़े रहें: रोज़ घर पर एक कॉल, एक दोस्त जिससे बात कर सकें"),
        b("Have a plan B — knowing other paths reduces pressure", "प्लान B रखें — दूसरे रास्ते जानने से दबाव घटता है"),
      ]),
      { id: "screening-note", title: b("About self-checks", "सेल्फ़-चेक के बारे में"), items: [NO_SCREEN_DX] },
    ],
    diagnosis: [
      b("Assessment of stress, anxiety, mood and sleep", "तनाव, घबराहट, मूड और नींद की जाँच"),
      b("Safety check for hopelessness or self-harm thoughts", "निराशा या ख़ुद को नुकसान के विचारों की सुरक्षा जाँच"),
    ],
    treatment: [
      b("Counselling and practical study-life planning", "काउंसलिंग और पढ़ाई-जीवन की व्यावहारिक योजना"),
      b("Treatment for anxiety, depression or insomnia when present", "एंग्ज़ाइटी, डिप्रेशन या अनिद्रा हो तो इलाज"),
      b("Online sessions that fit around coaching timetables", "कोचिंग के समय के हिसाब से ऑनलाइन सेशन"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [
      faq("Will medicines make me sleepy and affect studies?", "क्या दवाओं से नींद आएगी और पढ़ाई पर असर होगा?", "Medicines are not always needed. When they are, doctors choose options that support concentration and adjust timing to your schedule.", "दवाएँ हमेशा ज़रूरी नहीं। ज़रूरत हो तो डॉक्टर ऐसी दवाएँ चुनते हैं जो ध्यान में मदद करें और समय आपकी दिनचर्या के हिसाब से तय करते हैं।"),
      faq("I have failed once. Should I drop another year?", "एक बार असफल हो गया। क्या एक और साल ड्रॉप करूँ?", "It is a personal decision. Counselling can help you weigh options calmly, including alternative careers.", "यह निजी फ़ैसला है। काउंसलिंग शांत मन से विकल्पों पर सोचने में मदद कर सकती है, दूसरे करियर सहित।"),
    ],
    related: ["exam-anxiety-students-india", "academic-burnout-students-india", "jee-exam-stress-india", "student-exam-stress-india"],
    articles: ["exam-stress-guide"],
    videoKeywords: ["neet", "exam", "परीक्षा", "student"],
    keywords: ["neet", "neet stress", "dropper", "kota coaching", "medical entrance"],
  },
  {
    ...common,
    slug: "jee-exam-stress-india",
    name: b("JEE preparation stress", "JEE की तैयारी का तनाव"),
    title: b("JEE Exam Stress – Managing Pressure, Sleep & Focus", "JEE परीक्षा का तनाव – दबाव, नींद और ध्यान सँभालें"),
    h1: b("JEE preparation stress: practical help for aspirants", "JEE की तैयारी का तनाव: विद्यार्थियों के लिए व्यावहारिक मदद"),
    description: b(
      "JEE Main and Advanced preparation affecting your sleep, focus or mood? Learn healthy study habits, warning signs and how counselling can help.",
      "JEE मेन और एडवांस्ड की तैयारी से नींद, ध्यान या मूड पर असर? स्वस्थ पढ़ाई की आदतें, चेतावनी संकेत और काउंसलिंग कैसे मदद करती है।"
    ),
    intro: [
      b("JEE aspirants juggle school board exams, coaching and multiple test series. Problem-solving under time pressure can make anxiety especially disruptive.", "JEE की तैयारी करने वाले बोर्ड परीक्षा, कोचिंग और कई टेस्ट सीरीज़ एक साथ सँभालते हैं। समय के दबाव में सवाल हल करते हुए घबराहट ख़ास तौर पर रुकावट बनती है।"),
      b("Learning to manage stress is a skill that improves both wellbeing and results.", "तनाव सँभालना एक कौशल है जो सेहत और नतीजे दोनों सुधारता है।"),
    ],
    symptoms: [
      b("Blanking out during tests despite knowing concepts", "कॉन्सेप्ट आने के बावजूद टेस्ट में दिमाग़ ख़ाली हो जाना"),
      b("Late-night studying and irregular sleep", "देर रात पढ़ाई और अनियमित नींद"),
      b("Irritability, low mood, frequent headaches", "चिड़चिड़ापन, उदासी, बार-बार सिरदर्द"),
      b("Escaping into gaming or phone use", "गेमिंग या फ़ोन में भागना"),
    ],
    causes: [
      b("Balancing boards, coaching and tests", "बोर्ड, कोचिंग और टेस्ट का संतुलन"),
      b("Perfectionism and fear of disappointing parents", "परफ़ेक्शनिज़्म और माता-पिता को निराश करने का डर"),
    ],
    riskFactors: [
      b("Previous anxiety or ADHD", "पहले से एंग्ज़ाइटी या ADHD"),
      b("Living in coaching hostels away from family", "परिवार से दूर कोचिंग हॉस्टल में रहना"),
    ],
    extra: [
      forStudents([
        b("Practise timed papers with breathing breaks to train calm under pressure", "दबाव में शांत रहने के लिए साँस के ब्रेक के साथ समयबद्ध पेपर का अभ्यास"),
        b("Keep phones out of the study room; use set times for social media", "पढ़ाई के कमरे में फ़ोन न रखें; सोशल मीडिया का तय समय"),
        b("Exercise 20–30 minutes daily — it improves focus", "रोज़ 20–30 मिनट व्यायाम — इससे ध्यान सुधरता है"),
      ]),
    ],
    diagnosis: [b("Assessment of anxiety, mood, attention and sleep", "घबराहट, मूड, ध्यान और नींद की जाँच")],
    treatment: [
      b("Counselling for exam anxiety", "परीक्षा की घबराहट के लिए काउंसलिंग"),
      b("Treatment of anxiety, depression, ADHD or insomnia when present", "एंग्ज़ाइटी, डिप्रेशन, ADHD या अनिद्रा हो तो इलाज"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Is it normal to feel anxious before JEE?", "क्या JEE से पहले घबराहट सामान्य है?", "Some anxiety is normal and can help focus. When it blocks studying or sleep, it needs attention.", "थोड़ी घबराहट सामान्य है और ध्यान में मदद कर सकती है। जब यह पढ़ाई या नींद रोके, तब ध्यान देने की ज़रूरत है।")],
    related: ["neet-exam-stress-india", "exam-anxiety-students-india", "concentration-problems-students-india"],
    articles: ["exam-stress-guide"],
    videoKeywords: ["jee", "exam", "परीक्षा", "student"],
    keywords: ["jee", "iit", "jee stress", "engineering entrance", "kota"],
  },
  {
    ...common,
    slug: "exam-anxiety-students-india",
    name: b("Exam anxiety", "परीक्षा की घबराहट"),
    title: b("Exam Anxiety – Symptoms, Tips & Treatment for Students", "परीक्षा की घबराहट – लक्षण, सुझाव और इलाज"),
    h1: b("Exam anxiety: calm strategies that work", "परीक्षा की घबराहट: असरदार शांत तरीक़े"),
    description: b(
      "Racing heart, blank mind or stomach upset before exams? Exam anxiety is common and treatable. Techniques for before and during the exam, and when to get help.",
      "परीक्षा से पहले दिल तेज़, दिमाग़ ख़ाली या पेट ख़राब? परीक्षा की घबराहट आम है और ठीक होती है। परीक्षा से पहले और दौरान के तरीक़े, और कब मदद लें।"
    ),
    intro: [
      b("Exam anxiety is intense worry and physical tension around tests that interferes with preparation or performance.", "परीक्षा की घबराहट टेस्ट को लेकर तीव्र चिंता और शारीरिक तनाव है जो तैयारी या प्रदर्शन में रुकावट डालता है।"),
      b("It affects school, college and competitive-exam students alike, and responds well to CBT and simple techniques.", "यह स्कूल, कॉलेज और प्रतियोगी परीक्षा के सभी विद्यार्थियों को प्रभावित करती है, और CBT व आसान तरीक़ों से अच्छी तरह ठीक होती है।"),
    ],
    symptoms: [
      b("Palpitations, sweating, nausea, frequent urination before exams", "परीक्षा से पहले धड़कन तेज़, पसीना, जी मिचलाना, बार-बार पेशाब"),
      b("Mind going blank in the exam hall", "परीक्षा हॉल में दिमाग़ ख़ाली हो जाना"),
      b("Catastrophic thoughts: \"I will fail, my life is over\"", "बहुत बुरे विचार: \"मैं फ़ेल हो जाऊँगा, ज़िंदगी ख़त्म\""),
      b("Avoiding study or exams", "पढ़ाई या परीक्षा से बचना"),
    ],
    causes: [
      b("Fear of failure and high expectations", "असफलता का डर और ऊँची उम्मीदें"),
      b("Past bad exam experiences", "परीक्षा के पुराने बुरे अनुभव"),
      b("Inadequate preparation or poor sleep", "अधूरी तैयारी या ख़राब नींद"),
    ],
    riskFactors: [b("Generalised anxiety, panic attacks, perfectionism", "सामान्य घबराहट, पैनिक अटैक, परफ़ेक्शनिज़्म")],
    extra: [
      forStudents([
        b("Slow breathing: in for 4, out for 6, for two minutes before starting", "धीमी साँस: शुरू करने से पहले दो मिनट 4 तक अंदर, 6 तक बाहर"),
        b("Start with an easy question to build momentum", "रफ़्तार के लिए आसान सवाल से शुरू करें"),
        b("Replace \"I must be perfect\" with \"I will do my best on each question\"", "\"मुझे परफ़ेक्ट होना है\" की जगह \"मैं हर सवाल पर अपना सबसे अच्छा करूँगा\""),
        b("Avoid last-minute group discussions in the exam hall corridor", "परीक्षा हॉल के बाहर आख़िरी समय की चर्चा से बचें"),
      ]),
    ],
    diagnosis: [b("Assessment of anxiety level and any panic or mood disorder", "घबराहट के स्तर और किसी पैनिक या मूड डिसऑर्डर की जाँच")],
    treatment: [
      b("CBT and relaxation training", "CBT और रिलैक्सेशन प्रशिक्षण"),
      b("Short-term medicines in selected severe cases, as prescribed", "डॉक्टर की सलाह से चुने हुए गंभीर मामलों में थोड़े समय की दवाएँ"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Should I take a calming tablet before the exam?", "क्या परीक्षा से पहले शांत करने वाली गोली लूँ?", "Do not take sedatives without a prescription — they can impair memory and alertness. Discuss options with a doctor well before the exam.", "बिना पर्चे नींद/शांत करने वाली गोली न लें — इससे याददाश्त और सतर्कता घट सकती है। परीक्षा से काफ़ी पहले डॉक्टर से विकल्पों पर बात करें।")],
    related: ["generalized-anxiety-disorder-india", "panic-disorder-treatment-india", "neet-exam-stress-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["gad7", "study-stress"],
    articles: ["exam-stress-guide"],
    videoKeywords: ["exam", "परीक्षा", "anxiety", "student"],
    keywords: ["pariksha ka darr", "exam fear", "exam ghabrahat", "board exam"],
  },
  {
    ...common,
    slug: "academic-burnout-students-india",
    name: b("Academic burnout", "पढ़ाई से बर्नआउट (थकान)"),
    title: b("Academic Burnout in Students – Signs & Recovery", "विद्यार्थियों में पढ़ाई का बर्नआउट – संकेत और रिकवरी"),
    h1: b("Academic burnout: when studying leaves you empty", "पढ़ाई का बर्नआउट: जब पढ़ाई आपको ख़ाली कर दे"),
    description: b(
      "Exhausted, cynical about studies and achieving less despite effort? Academic burnout is a stress response. Learn signs, how it differs from depression, and recovery steps.",
      "थकान, पढ़ाई से मोहभंग और मेहनत के बावजूद कम हासिल? पढ़ाई का बर्नआउट तनाव की प्रतिक्रिया है। संकेत, डिप्रेशन से अंतर और ठीक होने के क़दम जानें।"
    ),
    intro: [
      b("Burnout results from prolonged stress without enough recovery. It shows as exhaustion, detachment from studies and a sense of not achieving anything.", "बर्नआउट लंबे तनाव और पर्याप्त आराम न मिलने से होता है। इसमें थकान, पढ़ाई से दूरी और कुछ हासिल न होने का एहसास होता है।"),
      b("Burnout can overlap with depression, so a proper assessment helps decide the right support.", "बर्नआउट डिप्रेशन से मिलता-जुलता हो सकता है, इसलिए सही जाँच से सही मदद तय होती है।"),
    ],
    symptoms: [
      b("Physical and emotional exhaustion that rest does not fix", "शारीरिक और भावनात्मक थकान जो आराम से नहीं जाती"),
      b("Cynicism or not caring about studies anymore", "पढ़ाई से मोहभंग या परवाह न रहना"),
      b("Falling efficiency despite long hours", "लंबे घंटों के बावजूद कम काम हो पाना"),
      b("Frequent illness, headaches, sleep problems", "बार-बार बीमार होना, सिरदर्द, नींद की समस्या"),
    ],
    causes: [
      b("Long-term overload without breaks", "बिना ब्रेक लंबे समय तक ज़्यादा बोझ"),
      b("Lack of control over schedule; unclear goals", "समय पर नियंत्रण न होना; अस्पष्ट लक्ष्य"),
    ],
    riskFactors: [b("Perfectionism, poor sleep, lack of social support", "परफ़ेक्शनिज़्म, ख़राब नींद, सामाजिक सहारे की कमी")],
    extra: [
      forStudents([
        b("Schedule recovery as seriously as study: sleep, movement, one hobby", "पढ़ाई जितनी गंभीरता से आराम भी तय करें: नींद, व्यायाम, एक शौक़"),
        b("Set smaller daily goals you can actually complete", "रोज़ के छोटे लक्ष्य जो सच में पूरे हो सकें"),
        b("Talk to a mentor about workload", "काम के बोझ के बारे में मेंटर से बात करें"),
      ]),
    ],
    diagnosis: [b("Separating burnout from depression, anxiety, anaemia or thyroid problems", "बर्नआउट को डिप्रेशन, एंग्ज़ाइटी, ख़ून की कमी या थायरॉइड से अलग करना")],
    icd: { icd11: "QD85", note: b("ICD-11 lists burn-out as an occupational phenomenon, not a medical condition; academic burnout is described by analogy.", "ICD-11 बर्नआउट को काम से जुड़ी घटना मानता है, बीमारी नहीं; पढ़ाई के बर्नआउट को इसी तरह समझा जाता है।") },
    treatment: [
      b("Restructuring routine and workload", "दिनचर्या और काम के बोझ को फिर से व्यवस्थित करना"),
      b("Treating co-existing depression, anxiety or insomnia", "साथ के डिप्रेशन, एंग्ज़ाइटी या अनिद्रा का इलाज"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Is burnout the same as depression?", "क्या बर्नआउट और डिप्रेशन एक ही हैं?", "Not exactly. Burnout is linked to study or work stress; depression affects all areas of life. They often overlap, so an assessment helps.", "बिल्कुल नहीं। बर्नआउट पढ़ाई या काम के तनाव से जुड़ा है; डिप्रेशन ज़िंदगी के हर हिस्से पर असर डालता है। दोनों अक्सर साथ होते हैं, इसलिए जाँच मदद करती है।")],
    related: ["depression-treatment-india", "medical-student-mental-health-india", "resident-doctor-burnout-india", "stress-management-india"],
    videoKeywords: ["burnout", "student", "थकान"],
    keywords: ["burnout", "thakan", "padhai me man nahi", "exhausted"],
  },
  {
    ...common,
    slug: "sleep-problems-students-india",
    name: b("Sleep problems in students", "विद्यार्थियों में नींद की समस्या"),
    title: b("Student Sleep Problems – Late Nights, Insomnia & Exam Performance", "विद्यार्थियों में नींद की समस्या – देर रात, अनिद्रा और परीक्षा प्रदर्शन"),
    h1: b("Sleep problems in students: why sleep is part of studying", "विद्यार्थियों की नींद की समस्या: नींद भी पढ़ाई का हिस्सा क्यों है"),
    description: b(
      "Studying late, scrolling at night or unable to fall asleep before exams? Poor sleep harms memory and mood. Practical sleep routines for students and when to see a doctor.",
      "देर रात पढ़ाई, रात में स्क्रॉलिंग या परीक्षा से पहले नींद न आना? ख़राब नींद याददाश्त और मूड बिगाड़ती है। विद्यार्थियों के लिए नींद की दिनचर्या और कब डॉक्टर से मिलें।"
    ),
    intro: [
      b("Many students cut sleep to study more, but sleep is when the brain consolidates what was learned. Chronic sleep loss lowers memory, focus and mood.", "बहुत से विद्यार्थी ज़्यादा पढ़ने के लिए नींद कम करते हैं, पर नींद में ही दिमाग़ सीखी हुई चीज़ें पक्की करता है। लगातार कम नींद से याददाश्त, ध्यान और मूड घटता है।"),
      b("Teenagers also have a natural shift towards later sleep, which clashes with early classes.", "किशोरों में स्वाभाविक रूप से देर से सोने की प्रवृत्ति होती है, जो सुबह की क्लास से टकराती है।"),
    ],
    symptoms: [
      b("Difficulty falling asleep or waking too early", "नींद आने में दिक़्क़त या बहुत जल्दी जाग जाना"),
      b("Daytime sleepiness, dozing in class", "दिन में नींद, क्लास में ऊँघना"),
      b("Irregular sleep times; late-night phone use", "सोने का अनियमित समय; देर रात फ़ोन"),
    ],
    causes: [
      b("Screens and caffeine late in the evening", "शाम को देर तक स्क्रीन और कैफ़ीन"),
      b("Anxiety and racing thoughts", "घबराहट और तेज़ विचार"),
      b("Irregular schedules in hostels", "हॉस्टल में अनियमित दिनचर्या"),
    ],
    riskFactors: [b("Anxiety, depression, ADHD, energy drinks", "एंग्ज़ाइटी, डिप्रेशन, ADHD, एनर्जी ड्रिंक")],
    extra: [
      forStudents([
        b("Fixed wake-up time every day, including Sundays", "हर दिन, रविवार को भी, जागने का तय समय"),
        b("No screens for 30–60 minutes before bed; keep the phone outside reach", "सोने से 30–60 मिनट पहले स्क्रीन नहीं; फ़ोन पहुँच से दूर"),
        b("No tea, coffee or energy drinks after mid-afternoon", "दोपहर बाद चाय, कॉफ़ी या एनर्जी ड्रिंक नहीं"),
        b("If awake for 20 minutes, get up and do something calm, then return", "20 मिनट तक नींद न आए तो उठकर कुछ शांत करें, फिर लौटें"),
      ]),
    ],
    diagnosis: [b("Sleep diary for two weeks; screening for anxiety and depression", "दो हफ़्ते की नींद डायरी; घबराहट और डिप्रेशन की जाँच")],
    treatment: [
      b("Sleep routine and CBT for insomnia", "नींद की दिनचर्या और अनिद्रा के लिए CBT"),
      b("Avoiding over-the-counter sleeping pills", "बिना पर्चे नींद की गोलियों से बचना"),
    ],
    psychotherapy: [b("CBT for insomnia (CBT-I)", "अनिद्रा के लिए CBT (CBT-I)")],
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Is studying all night before an exam a good idea?", "क्या परीक्षा से पहले पूरी रात पढ़ना ठीक है?", "Usually not. Sleep before an exam improves recall more than extra hours of revision.", "आमतौर पर नहीं। परीक्षा से पहले की नींद ज़्यादा घंटे दोहराने से बेहतर याददाश्त देती है।")],
    related: ["insomnia-treatment-india", "sleep-disorders-psychiatrist-india", "social-media-overuse-india"],
    selfTests: ["sleep", "study-stress"],
    articles: ["sleeping-pills-safe-use"],
    videoKeywords: ["sleep", "नींद", "student"],
    keywords: ["neend nahi aati", "raat ko padhai", "student sleep"],
  },
  {
    ...common,
    slug: "concentration-problems-students-india",
    name: b("Poor concentration in students", "विद्यार्थियों में ध्यान न लगना"),
    title: b("Can't Concentrate While Studying? Causes & Solutions", "पढ़ाई में ध्यान नहीं लगता? कारण और समाधान"),
    h1: b("Poor concentration while studying: causes and help", "पढ़ाई में ध्यान न लगना: कारण और मदद"),
    description: b(
      "Mind wandering, re-reading pages or constantly checking your phone? Learn the common causes of poor concentration — from sleep and stress to ADHD — and what helps.",
      "मन भटकना, पेज बार-बार पढ़ना या बार-बार फ़ोन देखना? ध्यान न लगने के आम कारण — नींद और तनाव से ADHD तक — और क्या मदद करता है।"
    ),
    intro: [
      b("Poor concentration is a symptom, not a diagnosis. The most common causes are poor sleep, phone distraction, stress, anxiety and low mood.", "ध्यान न लगना एक लक्षण है, बीमारी नहीं। सबसे आम कारण हैं ख़राब नींद, फ़ोन से ध्यान भटकना, तनाव, घबराहट और उदासी।"),
      b("When problems with attention go back to childhood and affect many areas of life, ADHD should be considered.", "जब ध्यान की दिक़्क़त बचपन से हो और ज़िंदगी के कई हिस्सों पर असर डाले, तो ADHD पर विचार करना चाहिए।"),
    ],
    symptoms: [
      b("Reading without remembering", "पढ़ना पर याद न रहना"),
      b("Frequent switching to phone or other tasks", "बार-बार फ़ोन या दूसरे काम पर जाना"),
      b("Mental fatigue after short periods", "थोड़ी देर में ही दिमाग़ी थकान"),
    ],
    causes: [
      b("Insufficient sleep and irregular routine", "कम नींद और अनियमित दिनचर्या"),
      b("Phone notifications and multitasking", "फ़ोन नोटिफ़िकेशन और एक साथ कई काम"),
      b("Anxiety, depression, ADHD, anaemia or thyroid problems", "एंग्ज़ाइटी, डिप्रेशन, ADHD, ख़ून की कमी या थायरॉइड"),
    ],
    riskFactors: [b("Heavy gaming or social media use; substance use", "ज़्यादा गेमिंग या सोशल मीडिया; नशा")],
    extra: [
      forStudents([
        b("Study in 25–45 minute blocks with 5–10 minute breaks", "25–45 मिनट के हिस्सों में पढ़ें, 5–10 मिनट के ब्रेक के साथ"),
        b("Phone in another room during study blocks", "पढ़ाई के समय फ़ोन दूसरे कमरे में"),
        b("Active recall: close the book and write what you remember", "एक्टिव रिकॉल: किताब बंद करें और जो याद है लिखें"),
      ]),
    ],
    diagnosis: [
      b("Assessment for sleep, mood, anxiety and ADHD", "नींद, मूड, एंग्ज़ाइटी और ADHD की जाँच"),
      b("Blood tests for anaemia, thyroid or B12 when indicated", "ज़रूरत हो तो ख़ून की कमी, थायरॉइड या B12 की जाँच"),
    ],
    treatment: [
      b("Treating the underlying cause", "मूल कारण का इलाज"),
      b("Study-skill coaching and digital habits", "पढ़ाई के कौशल और डिजिटल आदतों की कोचिंग"),
      b("ADHD treatment if diagnosed", "ADHD निकले तो उसका इलाज"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Are there tablets to improve concentration?", "क्या ध्यान बढ़ाने की गोलियाँ हैं?", "Not for everyone. \"Memory boosters\" sold online are unproven. Medicines are used only when a condition like ADHD is diagnosed.", "सबके लिए नहीं। ऑनलाइन बिकने वाले \"मेमोरी बूस्टर\" प्रमाणित नहीं हैं। दवाएँ सिर्फ़ ADHD जैसी बीमारी की पुष्टि होने पर दी जाती हैं।")],
    related: ["adult-adhd-treatment-india", "adhd-psychiatrist-india", "sleep-problems-students-india", "social-media-overuse-india"],
    selfTests: ["asrs", "study-stress"],
    videoKeywords: ["concentration", "focus", "ध्यान"],
    keywords: ["dhyan nahi lagta", "padhai me man nahi lagta", "focus", "yaad nahi rehta"],
  },
  {
    ...common,
    slug: "medical-student-mental-health-india",
    name: b("Medical student mental health", "मेडिकल छात्रों का मानसिक स्वास्थ्य"),
    title: b("Medical Student Mental Health – Stress, Depression & Support", "मेडिकल छात्रों का मानसिक स्वास्थ्य – तनाव, डिप्रेशन और सहायता"),
    h1: b("Mental health in medical students", "मेडिकल छात्रों में मानसिक स्वास्थ्य"),
    description: b(
      "Medical students face high rates of stress, depression and anxiety. Confidential, stigma-free support from a psychiatrist who understands medical training.",
      "मेडिकल छात्रों में तनाव, डिप्रेशन और घबराहट की दर ऊँची है। मेडिकल प्रशिक्षण को समझने वाले मनोचिकित्सक से गोपनीय, बिना कलंक के सहायता।"
    ),
    intro: [
      b("Medical training brings heavy workloads, frequent exams, exposure to suffering and death, and the pressure of high expectations.", "मेडिकल प्रशिक्षण में भारी काम, बार-बार परीक्षाएँ, पीड़ा और मौत का सामना, और ऊँची उम्मीदों का दबाव होता है।"),
      b("Many medical students hesitate to seek help because of stigma or fear of affecting their career. Confidential care is available, and seeking help is a professional strength.", "बहुत से मेडिकल छात्र कलंक या करियर पर असर के डर से मदद लेने से हिचकते हैं। गोपनीय देखभाल उपलब्ध है, और मदद लेना पेशेवर मज़बूती है।"),
    ],
    symptoms: [
      b("Persistent low mood, irritability or numbness", "लगातार उदासी, चिड़चिड़ापन या सुन्नता"),
      b("Exam-related panic, sleep problems", "परीक्षा से जुड़ा पैनिक, नींद की समस्या"),
      b("Self-medication with sleeping pills or stimulants", "नींद की गोलियों या उत्तेजक दवाओं से अपना इलाज"),
      b("Thoughts of quitting medicine or of self-harm", "मेडिसिन छोड़ने या ख़ुद को नुकसान के विचार"),
    ],
    causes: [
      b("Workload, frequent assessments and competition", "काम का बोझ, बार-बार परीक्षाएँ और प्रतिस्पर्धा"),
      b("Ragging or harassment in some settings", "कुछ जगहों पर रैगिंग या उत्पीड़न"),
      b("Financial stress and distance from family", "आर्थिक तनाव और परिवार से दूरी"),
    ],
    riskFactors: [b("Perfectionism, prior mental health problems, easy access to medicines", "परफ़ेक्शनिज़्म, पहले की मानसिक समस्याएँ, दवाओं तक आसान पहुँच")],
    extra: [
      forMedics([
        b("Do not self-prescribe — consult a psychiatrist outside your institution if you prefer privacy", "अपने आप दवा न लिखें — गोपनीयता चाहें तो अपने संस्थान से बाहर के मनोचिकित्सक से मिलें"),
        b("Protect sleep around exams and postings", "परीक्षाओं और पोस्टिंग के दौरान नींद बचाएँ"),
        b("Report ragging through the anti-ragging helpline or committee", "रैगिंग की शिकायत एंटी-रैगिंग हेल्पलाइन या कमेटी में करें"),
        b("Peer support groups and mentors help normalise struggles", "साथियों के सपोर्ट ग्रुप और मेंटर संघर्षों को सामान्य बनाने में मदद करते हैं"),
      ]),
    ],
    diagnosis: [b("Confidential assessment of mood, anxiety, sleep, substance use and safety", "मूड, घबराहट, नींद, नशे और सुरक्षा की गोपनीय जाँच")],
    treatment: [
      b("Counselling and, when needed, medicines", "काउंसलिंग और ज़रूरत हो तो दवाएँ"),
      b("Flexible online sessions around duty and lecture hours", "ड्यूटी और लेक्चर के हिसाब से लचीले ऑनलाइन सेशन"),
    ],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Will seeking treatment affect my medical career?", "क्या इलाज लेने से मेडिकल करियर पर असर होगा?", "Consultations are confidential. Getting timely treatment protects your health and your ability to practise.", "परामर्श गोपनीय होते हैं। समय पर इलाज आपकी सेहत और प्रैक्टिस करने की क्षमता दोनों को बचाता है।")],
    related: ["mbbs-student-stress-india", "neet-pg-preparation-stress-india", "resident-doctor-burnout-india", "depression-treatment-india"],
    videoKeywords: ["medical student", "doctor", "mbbs"],
    keywords: ["medical student", "mbbs depression", "medico stress"],
  },
  {
    ...common,
    slug: "mbbs-student-stress-india",
    name: b("MBBS student stress", "MBBS छात्रों का तनाव"),
    title: b("MBBS Student Stress – First Year to Final Year", "MBBS छात्रों का तनाव – पहले साल से आख़िरी साल तक"),
    h1: b("MBBS stress: year-by-year challenges and coping", "MBBS का तनाव: हर साल की चुनौतियाँ और सामना"),
    description: b(
      "Struggling with the MBBS syllabus, professional exams, hostel life or clinical postings? Year-wise stressors and practical coping strategies for MBBS students.",
      "MBBS के सिलेबस, प्रोफ़ेशनल परीक्षाओं, हॉस्टल जीवन या क्लिनिकल पोस्टिंग से जूझ रहे हैं? साल-दर-साल तनाव और MBBS छात्रों के लिए व्यावहारिक तरीक़े।"
    ),
    intro: [
      b("Each phase of MBBS brings different pressures — adjusting to the volume in first year, clinical exposure later, and university exams throughout.", "MBBS के हर दौर का अलग दबाव है — पहले साल में पढ़ाई की मात्रा से तालमेल, बाद में क्लिनिकल अनुभव, और पूरे समय यूनिवर्सिटी परीक्षाएँ।"),
      b("Recognising which stressors affect you helps you plan support early.", "कौन से तनाव आप पर असर डालते हैं, यह पहचानने से जल्दी सहारे की योजना बनती है।"),
    ],
    symptoms: [
      b("First year: feeling lost, homesick, overwhelmed by anatomy and physiology", "पहला साल: खोया हुआ महसूस करना, घर की याद, एनाटॉमी-फ़िज़ियोलॉजी से घबराहट"),
      b("Clinical years: distress after seeing serious illness or death", "क्लिनिकल साल: गंभीर बीमारी या मौत देखकर परेशानी"),
      b("Before professional exams: panic, sleep loss, fear of supplementary exams", "प्रोफ़ेशनल परीक्षाओं से पहले: पैनिक, नींद न आना, सप्लीमेंट्री का डर"),
    ],
    causes: [
      b("Volume of syllabus and frequent internal assessments", "सिलेबस की मात्रा और बार-बार इंटरनल असेसमेंट"),
      b("Language transition for students from Hindi-medium backgrounds", "हिंदी माध्यम से आए छात्रों के लिए भाषा का बदलाव"),
      b("Hostel adjustment and ragging", "हॉस्टल में तालमेल और रैगिंग"),
    ],
    riskFactors: [b("Repeated failures, financial strain, isolation", "बार-बार असफलता, आर्थिक तंगी, अकेलापन")],
    extra: [
      forMedics([
        b("Form small study groups for difficult subjects", "कठिन विषयों के लिए छोटे स्टडी ग्रुप बनाएँ"),
        b("Learn medical terms in English while thinking in your own language — this is normal", "अपनी भाषा में सोचते हुए अंग्रेज़ी में मेडिकल शब्द सीखें — यह सामान्य है"),
        b("Debrief with seniors or faculty after distressing clinical events", "परेशान करने वाली क्लिनिकल घटनाओं के बाद सीनियर्स या फ़ैकल्टी से बात करें"),
      ]),
    ],
    diagnosis: [b("Confidential assessment; screening for depression and anxiety", "गोपनीय जाँच; डिप्रेशन और एंग्ज़ाइटी की स्क्रीनिंग")],
    treatment: [b("Counselling, study planning and treatment of any disorder", "काउंसलिंग, पढ़ाई की योजना और किसी भी बीमारी का इलाज")],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("I feel I chose the wrong career. Is that common?", "मुझे लगता है ग़लत करियर चुन लिया। क्या यह आम है?", "Many students feel this during difficult phases. Discussing it with a counsellor helps separate temporary stress from a real career question.", "कठिन दौर में बहुत से छात्र ऐसा महसूस करते हैं। काउंसलर से बात करने से अस्थायी तनाव और असली करियर के सवाल में फ़र्क़ समझ आता है।")],
    related: ["medical-student-mental-health-india", "academic-burnout-students-india", "exam-anxiety-students-india"],
    videoKeywords: ["mbbs", "medical student"],
    keywords: ["mbbs", "first year mbbs", "medical college stress", "prof exam"],
  },
  {
    ...common,
    slug: "neet-pg-preparation-stress-india",
    name: b("NEET-PG / NExT preparation stress", "NEET-PG / NExT की तैयारी का तनाव"),
    title: b("NEET-PG Preparation Stress – Coping During Internship & Drop Years", "NEET-PG तैयारी का तनाव – इंटर्नशिप और ड्रॉप साल में सामना"),
    h1: b("NEET-PG preparation stress: support for young doctors", "NEET-PG तैयारी का तनाव: युवा डॉक्टरों के लिए सहायता"),
    description: b(
      "Preparing for NEET-PG alongside internship or during a drop year? Manage anxiety, isolation and uncertainty with practical strategies and confidential support.",
      "इंटर्नशिप के साथ या ड्रॉप साल में NEET-PG की तैयारी? व्यावहारिक तरीक़ों और गोपनीय सहायता से घबराहट, अकेलापन और अनिश्चितता सँभालें।"
    ),
    intro: [
      b("Post-graduate entrance preparation often happens during internship duties or in isolated drop years, with frequent uncertainty about exam dates and patterns.", "पीजी प्रवेश की तैयारी अक्सर इंटर्नशिप ड्यूटी के साथ या अकेले ड्रॉप साल में होती है, और परीक्षा की तारीख़ों और पैटर्न को लेकर अनिश्चितता बनी रहती है।"),
      b("Young doctors are expected to cope alone, but stress, low mood and anxiety at this stage are common and treatable.", "युवा डॉक्टरों से अकेले सँभालने की उम्मीद की जाती है, पर इस दौर में तनाव, उदासी और घबराहट आम हैं और ठीक होते हैं।"),
    ],
    symptoms: [
      b("Guilt when not studying; inability to rest", "न पढ़ने पर अपराधबोध; आराम न कर पाना"),
      b("Comparing grand-test ranks on social media", "सोशल मीडिया पर ग्रैंड टेस्ट रैंक की तुलना"),
      b("Isolation, low mood, poor sleep", "अकेलापन, उदासी, ख़राब नींद"),
    ],
    causes: [
      b("Uncertainty about exam schedule and seat matrix", "परीक्षा के समय और सीटों को लेकर अनिश्चितता"),
      b("Balancing duties with preparation; financial dependence", "ड्यूटी और तैयारी का संतुलन; आर्थिक निर्भरता"),
    ],
    riskFactors: [b("Multiple attempts, isolation, previous depression", "कई प्रयास, अकेलापन, पहले डिप्रेशन")],
    extra: [
      forMedics([
        b("Plan revision in cycles with built-in rest days", "आराम के दिनों के साथ चक्रों में रिवीज़न की योजना"),
        b("Limit rank-comparison groups; mute when needed", "रैंक-तुलना वाले ग्रुप सीमित करें; ज़रूरत हो तो म्यूट करें"),
        b("Keep one non-medical activity or friendship going", "एक ग़ैर-मेडिकल गतिविधि या दोस्ती बनाए रखें"),
      ]),
    ],
    diagnosis: [b("Confidential assessment of mood, anxiety, sleep and safety", "मूड, घबराहट, नींद और सुरक्षा की गोपनीय जाँच")],
    treatment: [b("Counselling and evidence-based treatment when needed", "काउंसलिंग और ज़रूरत हो तो प्रमाणित इलाज")],
    psychotherapy: STUDY_CBT,
    family: PARENTS,
    seekHelp: STUDY_SEEK,
    faqs: [faq("Is a drop year bad for mental health?", "क्या ड्रॉप साल मानसिक स्वास्थ्य के लिए बुरा है?", "Not necessarily, but isolation and lack of routine increase risk. Structure, social contact and early help make a difference.", "ज़रूरी नहीं, पर अकेलापन और दिनचर्या की कमी से ख़तरा बढ़ता है। व्यवस्था, लोगों से संपर्क और जल्दी मदद से फ़र्क़ पड़ता है।")],
    related: ["medical-student-mental-health-india", "resident-doctor-burnout-india", "neet-exam-stress-india"],
    videoKeywords: ["neet pg", "medical", "doctor"],
    keywords: ["neet pg", "next exam", "pg entrance", "internship stress"],
  },
  {
    ...common,
    category: "mental",
    slug: "resident-doctor-burnout-india",
    name: b("Resident doctor burnout", "रेज़िडेंट डॉक्टरों का बर्नआउट"),
    title: b("Resident Doctor Burnout – Long Duties, Sleep Loss & Support", "रेज़िडेंट डॉक्टरों का बर्नआउट – लंबी ड्यूटी, नींद की कमी और सहायता"),
    h1: b("Burnout in resident doctors", "रेज़िडेंट डॉक्टरों में बर्नआउट"),
    description: b(
      "Long duty hours, sleep deprivation and emotional exhaustion during residency? Recognise burnout and depression early and get confidential psychiatric support.",
      "रेज़िडेंसी में लंबी ड्यूटी, नींद की कमी और भावनात्मक थकान? बर्नआउट और डिप्रेशन को जल्दी पहचानें और गोपनीय मनोरोग सहायता लें।"
    ),
    intro: [
      b("Residents work long shifts with heavy patient loads, night duties, academic requirements and sometimes workplace violence or harassment.", "रेज़िडेंट्स लंबी शिफ़्ट, भारी मरीज़ संख्या, नाइट ड्यूटी, अकादमिक ज़िम्मेदारियों और कभी-कभी कार्यस्थल पर हिंसा या उत्पीड़न के साथ काम करते हैं।"),
      b("Burnout, depression and substance misuse are common in this group. Doctors deserve the same care they provide.", "इस समूह में बर्नआउट, डिप्रेशन और नशे का ग़लत इस्तेमाल आम है। डॉक्टरों को भी वही देखभाल मिलनी चाहिए जो वे देते हैं।"),
    ],
    symptoms: [
      b("Emotional exhaustion and dreading duty", "भावनात्मक थकान और ड्यूटी से डर"),
      b("Feeling detached or cynical towards patients", "मरीज़ों से अलगाव या कटुता महसूस करना"),
      b("Irritability, poor sleep even when off duty", "चिड़चिड़ापन, छुट्टी में भी ख़राब नींद"),
      b("Relying on sedatives, alcohol or stimulants", "नींद की दवाओं, शराब या उत्तेजक पदार्थों पर निर्भर होना"),
    ],
    causes: [
      b("Extended shifts and sleep deprivation", "लंबी शिफ़्ट और नींद की कमी"),
      b("High responsibility with limited control", "ज़्यादा ज़िम्मेदारी, कम नियंत्रण"),
      b("Workplace violence, harassment, hostel conditions", "कार्यस्थल पर हिंसा, उत्पीड़न, हॉस्टल की स्थितियाँ"),
    ],
    riskFactors: [b("Surgical and emergency specialties, first-year residency, isolation", "सर्जिकल और इमरजेंसी विशेषज्ञताएँ, रेज़िडेंसी का पहला साल, अकेलापन")],
    extra: [
      forMedics([
        b("Protect post-duty sleep; use blackout curtains and earplugs", "ड्यूटी के बाद की नींद बचाएँ; अंधेरे पर्दे और ईयरप्लग इस्तेमाल करें"),
        b("Avoid self-prescribing sedatives or stimulants", "नींद या उत्तेजक दवाएँ अपने आप न लिखें"),
        b("Use institutional grievance and wellness mechanisms; report harassment", "संस्थान की शिकायत और वेलनेस व्यवस्थाएँ इस्तेमाल करें; उत्पीड़न की शिकायत करें"),
        b("Seek confidential help outside your department if you prefer", "चाहें तो अपने विभाग से बाहर गोपनीय मदद लें"),
      ]),
    ],
    diagnosis: [b("Separating burnout from depression, anxiety and substance use", "बर्नआउट को डिप्रेशन, घबराहट और नशे से अलग करना")],
    icd: { icd11: "QD85", note: b("Burn-out is classified in ICD-11 as an occupational phenomenon, not a medical condition.", "ICD-11 में बर्नआउट को काम से जुड़ी घटना माना गया है, बीमारी नहीं।") },
    treatment: [
      b("Counselling and stress management", "काउंसलिंग और तनाव प्रबंधन"),
      b("Treating depression, anxiety, insomnia or substance use", "डिप्रेशन, घबराहट, अनिद्रा या नशे का इलाज"),
      b("Online sessions scheduled around duty rosters", "ड्यूटी रोस्टर के हिसाब से ऑनलाइन सेशन"),
    ],
    psychotherapy: [
      b("CBT and acceptance-based approaches", "CBT और स्वीकृति आधारित तरीक़े"),
      b("Peer support and debriefing after critical incidents", "गंभीर घटनाओं के बाद साथियों का सहारा और बातचीत"),
    ],
    family: [
      b("Understand irregular schedules; plan time together around duties", "अनियमित समय को समझें; ड्यूटी के हिसाब से साथ का समय तय करें"),
      b("Notice withdrawal, drinking or hopelessness and encourage help", "अलग-थलग होने, शराब या निराशा पर ध्यान दें और मदद के लिए प्रोत्साहित करें"),
    ],
    seekHelp: STUDY_SEEK,
    faqs: [faq("Is it confidential if I am a doctor?", "अगर मैं डॉक्टर हूँ तो क्या गोपनीयता रहेगी?", "Yes. Your consultation is private and not shared with your institution.", "हाँ। आपका परामर्श निजी है और आपके संस्थान के साथ साझा नहीं किया जाता।")],
    related: ["workplace-stress-india", "academic-burnout-students-india", "depression-treatment-india", "insomnia-treatment-india"],
    selfTests: ["phq9", "gad7", "sleep"],
    videoKeywords: ["doctor burnout", "resident", "burnout"],
    keywords: ["resident burnout", "doctor stress", "pg resident", "duty hours"],
  },
  {
    ...common,
    category: "mental",
    slug: "workplace-stress-india",
    name: b("Workplace stress", "काम (ऑफ़िस) का तनाव"),
    title: b("Workplace Stress – Signs, Burnout & Coping Strategies", "काम का तनाव – संकेत, बर्नआउट और सामना करने के तरीक़े"),
    h1: b("Workplace stress: when work affects your health", "काम का तनाव: जब काम सेहत पर असर डाले"),
    description: b(
      "Deadlines, targets, long hours or a difficult boss affecting your sleep and mood? Learn the signs of harmful work stress, burnout and practical ways to cope.",
      "डेडलाइन, टारगेट, लंबे घंटे या मुश्किल बॉस से नींद और मूड पर असर? हानिकारक काम के तनाव, बर्नआउट के संकेत और सामना करने के व्यावहारिक तरीक़े।"
    ),
    intro: [
      b("Some pressure at work is normal. Stress becomes harmful when demands consistently exceed resources and recovery time.", "काम पर कुछ दबाव सामान्य है। तनाव तब नुकसानदायक बनता है जब माँगें लगातार साधनों और आराम के समय से ज़्यादा हों।"),
      b("Untreated work stress can lead to anxiety, depression, insomnia, alcohol misuse and physical illness.", "बिना इलाज का काम का तनाव एंग्ज़ाइटी, डिप्रेशन, अनिद्रा, शराब और शारीरिक बीमारियों का कारण बन सकता है।"),
    ],
    symptoms: [
      b("Constant worry about work, even on holidays", "छुट्टी में भी काम की लगातार चिंता"),
      b("Sunday-evening dread; frequent sick leave", "रविवार शाम से डर; बार-बार बीमारी की छुट्टी"),
      b("Irritability at home, poor sleep, headaches, acidity", "घर पर चिड़चिड़ापन, ख़राब नींद, सिरदर्द, एसिडिटी"),
    ],
    causes: [
      b("Excessive workload and unclear roles", "ज़्यादा काम और अस्पष्ट भूमिका"),
      b("Lack of control, recognition or support", "नियंत्रण, पहचान या सहारे की कमी"),
      b("Conflict, harassment or job insecurity", "झगड़े, उत्पीड़न या नौकरी की असुरक्षा"),
    ],
    riskFactors: [b("Shift work, long commutes, perfectionism", "शिफ़्ट में काम, लंबा सफ़र, परफ़ेक्शनिज़्म")],
    extra: [
      {
        id: "for-workers",
        tone: "info",
        title: b("Practical steps", "व्यावहारिक क़दम"),
        items: [
          b("Set boundaries for messages after work hours", "काम के बाद संदेशों की सीमा तय करें"),
          b("Break big tasks into smaller steps; discuss priorities with your manager", "बड़े काम छोटे हिस्सों में बाँटें; मैनेजर से प्राथमिकताओं पर बात करें"),
          b("Use leave to rest; exercise and sleep regularly", "आराम के लिए छुट्टी लें; नियमित व्यायाम और नींद"),
          b("Report harassment through your organisation's committee", "उत्पीड़न की शिकायत संगठन की कमेटी में करें"),
        ],
      },
    ],
    diagnosis: [b("Assessment for anxiety, depression, insomnia and substance use", "एंग्ज़ाइटी, डिप्रेशन, अनिद्रा और नशे की जाँच")],
    icd: { icd11: "QD85", note: b("Burn-out is classified in ICD-11 as an occupational phenomenon.", "ICD-11 में बर्नआउट काम से जुड़ी घटना के रूप में दर्ज है।") },
    treatment: [
      b("Stress-management counselling", "तनाव प्रबंधन काउंसलिंग"),
      b("Treatment of any mental health condition", "किसी भी मानसिक बीमारी का इलाज"),
    ],
    psychotherapy: [
      b("CBT and problem-solving therapy", "CBT और प्रॉब्लम-सॉल्विंग थेरेपी"),
      b("Assertiveness and boundary-setting skills", "अपनी बात रखने और सीमाएँ तय करने के कौशल"),
    ],
    family: [b("Encourage rest and time together; notice increased drinking or withdrawal", "आराम और साथ के समय को बढ़ावा दें; ज़्यादा शराब या अलग-थलग होने पर ध्यान दें")],
    seekHelp: STUDY_SEEK,
    faqs: [faq("Should I quit my job?", "क्या नौकरी छोड़ दूँ?", "Avoid major decisions while very distressed. Counselling can help you think through options clearly.", "बहुत परेशानी में बड़े फ़ैसले न लें। काउंसलिंग विकल्पों पर साफ़ सोचने में मदद कर सकती है।")],
    related: ["stress-management-india", "resident-doctor-burnout-india", "generalized-anxiety-disorder-india", "insomnia-treatment-india"],
    selfTests: ["gad7", "phq9"],
    videoKeywords: ["stress", "work", "तनाव"],
    keywords: ["office tension", "kaam ka tanav", "job stress", "work pressure"],
  },
  {
    ...common,
    slug: "social-media-overuse-india",
    name: b("Social media overuse", "सोशल मीडिया का ज़्यादा इस्तेमाल"),
    title: b("Social Media Overuse – Effects on Mood, Sleep & Studies", "सोशल मीडिया का ज़्यादा इस्तेमाल – मूड, नींद और पढ़ाई पर असर"),
    h1: b("Social media overuse: taking back control", "सोशल मीडिया का ज़्यादा इस्तेमाल: नियंत्रण वापस पाएँ"),
    description: b(
      "Hours lost to reels and scrolling, comparison, and late-night phone use? Learn how social media affects mood and sleep, and practical steps for young people and parents.",
      "रील्स और स्क्रॉलिंग में घंटे, तुलना और देर रात फ़ोन? जानें सोशल मीडिया मूड और नींद पर कैसे असर डालता है, और युवाओं व माता-पिता के लिए व्यावहारिक क़दम।"
    ),
    intro: [
      b("Social media apps are designed to keep people scrolling. For many students, this crowds out sleep, study and real-world friendships.", "सोशल मीडिया ऐप लोगों को स्क्रॉल करते रहने के लिए बने हैं। बहुत से विद्यार्थियों में इससे नींद, पढ़ाई और असली दोस्ती की जगह छिन जाती है।"),
      b("Problematic use is linked with anxiety, low mood, body-image concerns and cyberbullying.", "समस्या वाले इस्तेमाल का संबंध घबराहट, उदासी, शरीर की छवि की चिंता और साइबर बुलिंग से है।"),
    ],
    symptoms: [
      b("Checking the phone first thing in the morning and last at night", "सुबह सबसे पहले और रात को सबसे आख़िर में फ़ोन देखना"),
      b("Losing track of time while scrolling", "स्क्रॉल करते हुए समय का पता न चलना"),
      b("Feeling worse after comparing with others online", "ऑनलाइन दूसरों से तुलना के बाद बुरा महसूस करना"),
      b("Irritability when unable to use the phone", "फ़ोन न मिलने पर चिड़चिड़ापन"),
    ],
    causes: [
      b("Endless feeds and notifications", "अंतहीन फ़ीड और नोटिफ़िकेशन"),
      b("Boredom, loneliness or escape from stress", "ऊब, अकेलापन या तनाव से भागना"),
    ],
    riskFactors: [b("Anxiety, depression, ADHD, poor sleep", "एंग्ज़ाइटी, डिप्रेशन, ADHD, ख़राब नींद")],
    extra: [
      forStudents([
        b("Turn off non-essential notifications; use app timers", "ग़ैर-ज़रूरी नोटिफ़िकेशन बंद करें; ऐप टाइमर लगाएँ"),
        b("Keep the phone outside the bedroom at night", "रात को फ़ोन बेडरूम से बाहर रखें"),
        b("Unfollow accounts that make you feel worse", "जो अकाउंट आपको बुरा महसूस कराएँ उन्हें अनफ़ॉलो करें"),
      ]),
    ],
    diagnosis: [b("Assessment of use pattern and associated anxiety, mood or sleep problems", "इस्तेमाल के पैटर्न और उससे जुड़ी घबराहट, मूड या नींद की जाँच")],
    treatment: [
      b("Behavioural plan with gradual reduction", "धीरे-धीरे कम करने की व्यवहारिक योजना"),
      b("Treating underlying anxiety or depression", "मूल घबराहट या डिप्रेशन का इलाज"),
    ],
    psychotherapy: [b("CBT for problematic internet use", "समस्या वाले इंटरनेट इस्तेमाल के लिए CBT"), b("Family sessions to agree on screen rules", "स्क्रीन नियम तय करने के लिए फ़ैमिली सेशन")],
    family: [
      b("Agree on family screen rules that adults follow too", "परिवार के स्क्रीन नियम तय करें जिन्हें बड़े भी मानें"),
      b("Avoid snatching phones; negotiate and offer alternatives", "फ़ोन छीनें नहीं; बात करें और विकल्प दें"),
      b("Watch for cyberbullying and changes in mood", "साइबर बुलिंग और मूड में बदलाव पर नज़र रखें"),
    ],
    seekHelp: STUDY_SEEK,
    faqs: [faq("How much screen time is too much?", "कितना स्क्रीन टाइम ज़्यादा है?", "It depends on the effect: if it harms sleep, study, mood or relationships, it is too much for you.", "यह असर पर निर्भर करता है: अगर नींद, पढ़ाई, मूड या रिश्तों को नुकसान हो रहा है, तो आपके लिए ज़्यादा है।")],
    related: ["internet-addiction-treatment-india", "gaming-disorder-treatment-india", "sleep-problems-students-india", "concentration-problems-students-india"],
    selfTests: ["study-stress", "phq9"],
    videoKeywords: ["social media", "mobile", "फ़ोन", "reels"],
    keywords: ["mobile addiction", "reels", "instagram", "phone ki lat", "scrolling"],
  },
];

const SHARED_FAQS = [
  faq("Can I consult from my hostel or PG?", "क्या हॉस्टल या पीजी से परामर्श ले सकता हूँ?", "Yes, by private video at a time that suits your schedule. Students under 18 need a parent or guardian to be present, as per telemedicine guidelines.", "हाँ, अपने समय के हिसाब से निजी वीडियो पर। 18 साल से कम उम्र के छात्रों के लिए, टेलीमेडिसिन दिशानिर्देशों के अनुसार, माता-पिता या अभिभावक का साथ होना ज़रूरी है।"),
  faq("Is it confidential?", "क्या यह गोपनीय है?", "Yes. Nothing is shared with your school, coaching institute, college or employer.", "हाँ। आपके स्कूल, कोचिंग, कॉलेज या नियोक्ता के साथ कुछ भी साझा नहीं किया जाता।"),
  faq("Is a self-check score enough to know if I need help?", "क्या सेल्फ़-चेक का स्कोर यह जानने के लिए काफ़ी है कि मदद चाहिए?", "No. Screening results do not establish a diagnosis. If you are struggling, a consultation is worthwhile whatever the score.", "नहीं। स्क्रीनिंग नतीजे निदान नहीं करते। अगर आप परेशान हैं, तो स्कोर चाहे जो हो, परामर्श लेना ठीक है।"),
];

export const NEW_STUDENTS: ConditionContent[] = topUpFaqs(PAGES, SHARED_FAQS);
