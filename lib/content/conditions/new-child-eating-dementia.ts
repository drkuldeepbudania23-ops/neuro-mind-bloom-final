import type { ConditionContent } from "../types";
import { b, faq, topUpFaqs } from "./_h";

const EATING_FAMILY = [
  b("Avoid comments on weight, shape or appearance — including praise for weight loss", "वज़न, शरीर या रूप पर टिप्पणी न करें — वज़न घटने की तारीफ़ भी नहीं"),
  b("Eat regular family meals together where possible; keep mealtimes calm", "जहाँ हो सके साथ बैठकर नियमित खाना खाएँ; खाने का समय शांत रखें"),
  b("Do not argue about food; express concern about health and mood instead", "खाने पर बहस न करें; सेहत और मूड को लेकर चिंता जताएँ"),
  b("Parents are part of the treatment team, especially for teenagers", "माता-पिता इलाज की टीम का हिस्सा होते हैं, ख़ासकर किशोरों के लिए"),
];

const DEMENTIA_FAMILY = [
  b("Keep a simple daily routine, good lighting and familiar objects", "सरल दिनचर्या, अच्छी रोशनी और जानी-पहचानी चीज़ें रखें"),
  b("Speak slowly, one instruction at a time; avoid correcting or arguing", "धीरे बोलें, एक बार में एक बात कहें; टोकने या बहस से बचें"),
  b("Remove hazards: lock away medicines, gas knobs and sharp tools; consider an ID bracelet", "ख़तरे हटाएँ: दवाएँ, गैस और नुकीले औज़ार सुरक्षित रखें; पहचान-पत्र वाला ब्रेसलेट सोचें"),
  b("Caregivers need rest and support too — share duties within the family", "देखभाल करने वालों को भी आराम और सहारा चाहिए — परिवार में ज़िम्मेदारी बाँटें"),
];

/** New library pages: child/teen, adult ADHD, eating disorders, dementia sub-types and crisis support. */
const PAGES: ConditionContent[] = [
  {
    slug: "teen-depression-india",
    category: "child",
    group: "child",
    name: b("Depression in teenagers", "किशोरों में डिप्रेशन"),
    title: b("Teen Depression – Signs, Treatment & Guidance for Parents", "किशोरों में डिप्रेशन – संकेत, इलाज और माता-पिता के लिए मार्गदर्शन"),
    h1: b("Depression in teenagers: signs parents should not miss", "किशोरों में डिप्रेशन: वे संकेत जिन्हें माता-पिता नज़रअंदाज़ न करें"),
    description: b(
      "Irritability, falling marks, isolation or sleep changes in a teenager? Teen depression is common and treatable. Signs, causes and how parents can help.",
      "किशोर में चिड़चिड़ापन, नंबर गिरना, अकेलापन या नींद में बदलाव? किशोरों में डिप्रेशन आम है और इसका इलाज संभव है। संकेत, कारण और माता-पिता की भूमिका।"
    ),
    intro: [
      b("In teenagers, depression often shows as irritability, anger or withdrawal rather than obvious sadness, so it is easily mistaken for \"attitude\" or laziness.", "किशोरों में डिप्रेशन अक्सर साफ़ उदासी के बजाय चिड़चिड़ेपन, ग़ुस्से या अलग-थलग रहने के रूप में दिखता है, इसलिए इसे \"एटिट्यूड\" या आलस समझ लिया जाता है।"),
      b("Early help protects studies, friendships and safety. Most teenagers improve with counselling, family support and, when needed, medicines.", "जल्दी मदद से पढ़ाई, दोस्ती और सुरक्षा बची रहती है। ज़्यादातर किशोर काउंसलिंग, परिवार के सहारे और ज़रूरत हो तो दवाओं से ठीक होते हैं।"),
    ],
    symptoms: [
      b("Irritability, anger outbursts or constant sadness", "चिड़चिड़ापन, ग़ुस्से के दौरे या लगातार उदासी"),
      b("Loss of interest in friends, hobbies or games", "दोस्तों, शौक़ या खेल में रुचि ख़त्म होना"),
      b("Falling marks, skipping school or coaching", "नंबर गिरना, स्कूल या कोचिंग छोड़ना"),
      b("Sleeping too much or too little; staying on the phone late at night", "बहुत ज़्यादा या बहुत कम सोना; देर रात तक फ़ोन पर रहना"),
      b("Talk of hopelessness, self-harm or death", "निराशा, ख़ुद को नुकसान या मौत की बातें"),
    ],
    causes: [
      b("Family history of depression and changes in brain chemistry during adolescence", "परिवार में डिप्रेशन का इतिहास और किशोरावस्था में दिमाग़ी रसायनों में बदलाव"),
      b("Academic pressure, bullying (including online), relationship breakups", "पढ़ाई का दबाव, बुलिंग (ऑनलाइन भी), रिश्ते टूटना"),
      b("Family conflict, loss or major life changes", "परिवार में कलह, किसी अपने को खोना या बड़े बदलाव"),
    ],
    riskFactors: [
      b("Anxiety, ADHD or learning difficulties", "एंग्ज़ाइटी, ADHD या सीखने में कठिनाई"),
      b("Substance use, excessive gaming or social media", "नशा, बहुत ज़्यादा गेमिंग या सोशल मीडिया"),
      b("Previous self-harm or a family member who died by suicide", "पहले ख़ुद को नुकसान पहुँचाना या परिवार में किसी की आत्महत्या"),
    ],
    diagnosis: [
      b("Separate interviews with the teenager and the parents", "किशोर और माता-पिता से अलग-अलग बातचीत"),
      b("Screening for safety, substance use and bullying", "सुरक्षा, नशे और बुलिंग की जाँच"),
      b("Checking thyroid, anaemia and other medical causes when indicated", "ज़रूरत हो तो थायरॉइड, ख़ून की कमी और दूसरे शारीरिक कारणों की जाँच"),
    ],
    icd: { icd10: "F32", icd11: "6A70", note: b("Same diagnostic category as adult depressive episode.", "वयस्क डिप्रेसिव एपिसोड वाली ही श्रेणी।") },
    treatment: [
      b("Counselling is the first step for mild to moderate depression", "हल्के से मध्यम डिप्रेशन में काउंसलिंग पहला क़दम है"),
      b("Medicines for moderate to severe depression, with close monitoring in the first weeks", "मध्यम से गंभीर डिप्रेशन में दवाएँ, शुरुआती हफ़्तों में क़रीबी निगरानी के साथ"),
      b("Coordination with school for workload and attendance when needed", "ज़रूरत हो तो पढ़ाई के बोझ और हाज़िरी के लिए स्कूल से तालमेल"),
    ],
    psychotherapy: [
      b("CBT adapted for adolescents", "किशोरों के लिए CBT"),
      b("Interpersonal therapy for relationship and peer problems", "रिश्तों और दोस्तों की समस्याओं के लिए इंटरपर्सनल थेरेपी"),
      b("Family sessions to improve communication", "बातचीत सुधारने के लिए फ़ैमिली सेशन"),
    ],
    family: [
      b("Listen without lecturing; ask \"How are you really feeling?\"", "भाषण दिए बिना सुनें; पूछें \"तुम असल में कैसा महसूस कर रहे हो?\""),
      b("Avoid comparing with siblings or other children", "भाई-बहनों या दूसरे बच्चों से तुलना न करें"),
      b("Keep medicines and sharp objects safely stored during a crisis", "संकट के समय दवाएँ और नुकीली चीज़ें सुरक्षित रखें"),
      b("Take any talk of suicide seriously", "आत्महत्या की किसी भी बात को गंभीरता से लें"),
    ],
    seekHelp: [
      b("Mood or behaviour changes lasting more than two weeks", "दो हफ़्ते से ज़्यादा चलने वाले मूड या व्यवहार के बदलाव"),
      b("Refusing school or a sharp fall in performance", "स्कूल जाने से इनकार या प्रदर्शन में तेज़ गिरावट"),
      b("Any self-harm or talk of dying — seek help the same day", "ख़ुद को नुकसान या मरने की बात — उसी दिन मदद लें"),
    ],
    faqs: [
      faq("Is it just a phase?", "क्या यह बस एक दौर है?", "Mood swings are normal in adolescence, but persistent irritability, withdrawal and falling function for weeks need an assessment.", "किशोरावस्था में मूड बदलना सामान्य है, पर हफ़्तों तक चिड़चिड़ापन, अलग-थलग रहना और कामकाज गिरना जाँच माँगते हैं।"),
      faq("Are antidepressants safe for teenagers?", "क्या किशोरों के लिए एंटीडिप्रेसेंट सुरक्षित हैं?", "Some are used safely under supervision. Doctors monitor closely in the first weeks, and families should report any worsening or new suicidal thoughts.", "कुछ दवाएँ निगरानी में सुरक्षित रूप से दी जाती हैं। शुरुआती हफ़्तों में डॉक्टर क़रीब से देखते हैं, और परिवार को बिगड़ने या आत्महत्या के नए विचारों की तुरंत सूचना देनी चाहिए।"),
    ],
    related: ["depression-treatment-india", "child-psychiatrist-india", "suicide-prevention-crisis-support-india", "exam-anxiety-students-india"],
    selfTests: ["phq9"],
    articles: ["depression-or-sadness-when-to-seek-help"],
    videoKeywords: ["teen", "teenager", "adolescent", "किशोर", "depression"],
    keywords: ["bachcha udas", "teenager gussa", "kishor", "teen depression"],
  },
  {
    slug: "bedwetting-enuresis-children-india",
    category: "child",
    group: "child",
    name: b("Bedwetting (enuresis) in children", "बच्चों का बिस्तर गीला करना (एन्यूरेसिस)"),
    title: b("Bedwetting in Children – Causes, Treatment & Parent Tips", "बच्चों का बिस्तर गीला करना – कारण, इलाज और माता-पिता के लिए सुझाव"),
    h1: b("Bedwetting (enuresis): a common, treatable problem", "बिस्तर गीला करना (एन्यूरेसिस): आम और इलाज योग्य समस्या"),
    description: b(
      "Child still wetting the bed after age 5? Bedwetting is common, not the child's fault, and treatable with simple steps, alarms and sometimes medicines.",
      "5 साल के बाद भी बच्चा बिस्तर गीला करता है? यह आम है, बच्चे की ग़लती नहीं, और आसान उपायों, अलार्म और कभी-कभी दवाओं से ठीक होता है।"
    ),
    intro: [
      b("Enuresis means repeated wetting of bed or clothes in a child aged 5 years or older. Night-time wetting is the most common form.", "एन्यूरेसिस का मतलब है 5 साल या उससे बड़े बच्चे का बार-बार बिस्तर या कपड़े गीला करना। रात में गीला करना सबसे आम रूप है।"),
      b("Most children outgrow it, but treatment speeds recovery and protects the child's confidence.", "ज़्यादातर बच्चे बड़े होकर ठीक हो जाते हैं, पर इलाज से जल्दी सुधार होता है और बच्चे का आत्मविश्वास बचा रहता है।"),
    ],
    symptoms: [
      b("Wetting the bed at least twice a week for three months or more", "तीन महीने या ज़्यादा से हफ़्ते में कम से कम दो बार बिस्तर गीला करना"),
      b("Day-time wetting or urgency in some children", "कुछ बच्चों में दिन में भी गीला करना या अचानक तेज़ पेशाब लगना"),
      b("Embarrassment, avoiding sleepovers or school trips", "शर्मिंदगी, दोस्तों के घर रुकने या स्कूल ट्रिप से बचना"),
    ],
    causes: [
      b("Delayed bladder maturation and deep sleep — often runs in families", "मूत्राशय का देर से परिपक्व होना और गहरी नींद — अक्सर परिवार में चलता है"),
      b("Producing more urine at night", "रात में ज़्यादा पेशाब बनना"),
      b("Constipation, urinary infection, or stress such as a new sibling or school change (especially when wetting restarts)", "क़ब्ज़, पेशाब का संक्रमण, या तनाव जैसे नया भाई-बहन या स्कूल बदलना (ख़ासकर जब दोबारा शुरू हो)"),
    ],
    riskFactors: [
      b("A parent who wet the bed as a child", "माता या पिता जिन्होंने बचपन में बिस्तर गीला किया हो"),
      b("ADHD or developmental delays", "ADHD या विकास में देरी"),
      b("Snoring or sleep apnoea", "खर्राटे या स्लीप एपनिया"),
    ],
    diagnosis: [
      b("Detailed history and a bladder diary (fluid intake and wet nights)", "पूरी जानकारी और ब्लैडर डायरी (कितना पानी पिया, कितनी रातें गीली)"),
      b("Urine test to rule out infection or diabetes", "संक्रमण या डायबिटीज़ को अलग करने के लिए पेशाब की जाँच"),
      b("Paediatric or urology referral if there is day-time wetting, pain or poor stream", "दिन में गीला करने, दर्द या कमज़ोर धार पर बाल रोग या यूरोलॉजी जाँच"),
    ],
    icd: { icd10: "F98.0", icd11: "6C00" },
    treatment: [
      b("Reassurance and a reward chart for dry nights — never punishment", "हौसला और सूखी रातों के लिए इनाम-चार्ट — सज़ा कभी नहीं"),
      b("More fluids in the day, fewer in the 1–2 hours before bed; toilet before sleep", "दिन में ज़्यादा पानी, सोने से 1–2 घंटे पहले कम; सोने से पहले टॉयलेट"),
      b("Enuresis alarm — the most effective long-term treatment", "एन्यूरेसिस अलार्म — लंबे समय के लिए सबसे असरदार इलाज"),
      b("Medicines for selected children, for example before travel or camps, as prescribed", "चुने हुए बच्चों के लिए डॉक्टर की सलाह से दवाएँ, जैसे यात्रा या कैंप से पहले"),
    ],
    psychotherapy: [
      b("Behavioural training with parents", "माता-पिता के साथ व्यवहार प्रशिक्षण"),
      b("Support for stress, teasing or low self-esteem", "तनाव, चिढ़ाए जाने या कम आत्मविश्वास में सहारा"),
    ],
    family: [
      b("Do not scold, shame or tell others about the wetting", "डाँटें नहीं, शर्मिंदा न करें, दूसरों को न बताएँ"),
      b("Use a waterproof sheet and let the child help change the bed without fuss", "वाटरप्रूफ़ चादर लगाएँ और बच्चे को बिना हंगामे के बिस्तर बदलने में मदद करने दें"),
      b("Praise effort (toilet before bed), not just dry nights", "सिर्फ़ सूखी रातों की नहीं, कोशिश (सोने से पहले टॉयलेट) की भी तारीफ़ करें"),
    ],
    seekHelp: [
      b("Wetting after age 5–6 that bothers the child or family", "5–6 साल के बाद गीला करना जो बच्चे या परिवार को परेशान करे"),
      b("Wetting that restarts after six months of being dry", "छह महीने सूखे रहने के बाद फिर से शुरू होना"),
      b("Pain, burning, excessive thirst or day-time leaks", "दर्द, जलन, बहुत प्यास या दिन में रिसाव"),
    ],
    faqs: [
      faq("Is my child doing it on purpose?", "क्या बच्चा जानबूझकर करता है?", "No. Bedwetting happens during sleep and is not under the child's control.", "नहीं। बिस्तर गीला नींद में होता है और बच्चे के बस में नहीं होता।"),
      faq("Should I wake my child at night to pass urine?", "क्या रात में जगाकर पेशाब कराना चाहिए?", "It can keep the bed dry occasionally but does not cure enuresis. An alarm trains the child to wake by themselves.", "इससे कभी-कभी बिस्तर सूखा रह सकता है पर बीमारी ठीक नहीं होती। अलार्म बच्चे को ख़ुद जागना सिखाता है।"),
    ],
    related: ["child-psychiatrist-india", "adhd-psychiatrist-india", "separation-anxiety-children-india"],
    videoKeywords: ["bedwetting", "enuresis", "बिस्तर गीला"],
    keywords: ["bistar gila", "bed wetting", "susu", "peshab raat"],
  },
  {
    slug: "adult-adhd-treatment-india",
    category: "mental",
    group: "adhd-autism",
    name: b("Adult ADHD", "वयस्कों में ADHD"),
    title: b("Adult ADHD – Symptoms, Assessment & Treatment", "वयस्कों में ADHD – लक्षण, जाँच और इलाज"),
    h1: b("Adult ADHD: when focus, time and restlessness hold you back", "वयस्कों में ADHD: जब ध्यान, समय और बेचैनी आगे बढ़ने से रोकें"),
    description: b(
      "Chronic distraction, missed deadlines, impulsivity and restlessness since childhood? Adult ADHD can be assessed and treated. Take the ASRS screener.",
      "बचपन से ध्यान भटकना, समय-सीमा चूकना, जल्दबाज़ी और बेचैनी? वयस्क ADHD की जाँच और इलाज संभव है। ASRS स्क्रीनर करें।"
    ),
    intro: [
      b("ADHD begins in childhood, but many people are first recognised as adults — often after years of being called careless or lazy.", "ADHD बचपन में शुरू होता है, पर बहुत से लोगों में यह पहली बार वयस्क होने पर पहचाना जाता है — अक्सर सालों तक लापरवाह या आलसी कहे जाने के बाद।"),
      b("In adults, hyperactivity often turns into inner restlessness, while problems with attention, planning and time management continue.", "वयस्कों में हाइपरएक्टिविटी अक्सर अंदरूनी बेचैनी बन जाती है, जबकि ध्यान, योजना और समय-प्रबंधन की दिक़्क़तें बनी रहती हैं।"),
    ],
    symptoms: [
      b("Difficulty sustaining attention, careless mistakes, losing things", "लगातार ध्यान न टिक पाना, लापरवाही की ग़लतियाँ, चीज़ें खो देना"),
      b("Procrastination and trouble finishing tasks", "टालमटोल और काम पूरे न कर पाना"),
      b("Poor time management, chronic lateness", "समय का ख़राब प्रबंधन, हमेशा देर होना"),
      b("Restlessness, interrupting, impulsive decisions or spending", "बेचैनी, बीच में टोकना, जल्दबाज़ी में फ़ैसले या ख़र्च"),
      b("Mood swings, frustration and low self-esteem", "मूड बदलना, झुंझलाहट और कम आत्मविश्वास"),
    ],
    causes: [
      b("A neurodevelopmental condition with strong genetic contribution", "एक न्यूरोडेवलपमेंटल स्थिति जिसमें आनुवंशिकता की बड़ी भूमिका है"),
      b("Differences in brain networks for attention and self-control", "ध्यान और आत्म-नियंत्रण वाले दिमाग़ी नेटवर्क में अंतर"),
    ],
    riskFactors: [
      b("ADHD in a parent or sibling", "माता-पिता या भाई-बहन में ADHD"),
      b("Premature birth or low birth weight", "समय से पहले जन्म या कम वज़न"),
      b("Commonly co-occurs with anxiety, depression and substance use", "अक्सर एंग्ज़ाइटी, डिप्रेशन और नशे के साथ"),
    ],
    diagnosis: [
      b("Clinical interview covering childhood and current symptoms", "बचपन और वर्तमान लक्षणों पर क्लिनिकल बातचीत"),
      b("Information from family, old school reports when available", "परिवार से जानकारी, उपलब्ध हो तो पुराने स्कूल रिपोर्ट"),
      b("Screening for anxiety, depression, bipolar disorder, sleep problems and substance use", "एंग्ज़ाइटी, डिप्रेशन, बाइपोलर, नींद और नशे की जाँच"),
    ],
    icd: { icd10: "F90", icd11: "6A05" },
    treatment: [
      b("Medicines that improve attention, chosen after a medical check (heart, blood pressure)", "ध्यान सुधारने वाली दवाएँ, शारीरिक जाँच (दिल, बीपी) के बाद"),
      b("Treatment of co-existing anxiety, depression or substance use", "साथ की एंग्ज़ाइटी, डिप्रेशन या नशे का इलाज"),
      b("Practical tools: planners, reminders, breaking work into small steps", "व्यावहारिक तरीक़े: प्लानर, रिमाइंडर, काम को छोटे हिस्सों में बाँटना"),
    ],
    psychotherapy: [
      b("CBT for adult ADHD — organisation, planning and procrastination", "वयस्क ADHD के लिए CBT — व्यवस्था, योजना और टालमटोल"),
      b("Coaching on routines, sleep and screen use", "दिनचर्या, नींद और स्क्रीन पर कोचिंग"),
      b("Couples sessions when ADHD affects the relationship", "जब ADHD रिश्ते पर असर डाले तो कपल सेशन"),
    ],
    family: [
      b("Understand that it is not laziness; focus on systems rather than blame", "समझें कि यह आलस नहीं है; दोष देने के बजाय व्यवस्था पर ध्यान दें"),
      b("Use shared calendars and written reminders", "साझा कैलेंडर और लिखे हुए रिमाइंडर इस्तेमाल करें"),
    ],
    seekHelp: [
      b("Long-standing problems with focus affecting work, studies or relationships", "पुरानी ध्यान की दिक़्क़तें जो काम, पढ़ाई या रिश्तों पर असर डालें"),
      b("Repeated job changes, accidents or financial impulsivity", "बार-बार नौकरी बदलना, दुर्घटनाएँ या पैसों में जल्दबाज़ी"),
    ],
    faqs: [
      faq("Can ADHD start in adulthood?", "क्या ADHD वयस्क होने पर शुरू हो सकता है?", "Symptoms begin in childhood, though they may only become a problem when adult demands increase.", "लक्षण बचपन में शुरू होते हैं, पर वयस्क जीवन की ज़िम्मेदारियाँ बढ़ने पर ही समस्या बन सकते हैं।"),
      faq("Does a positive ASRS screen mean I have ADHD?", "क्या ASRS में पॉज़िटिव आने का मतलब ADHD है?", "No. It only suggests that a full clinical assessment is worthwhile.", "नहीं। इसका मतलब बस इतना है कि पूरी क्लिनिकल जाँच करवाना ठीक रहेगा।"),
    ],
    related: ["adhd-psychiatrist-india", "concentration-problems-students-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["asrs"],
    videoKeywords: ["adhd", "attention", "ध्यान"],
    keywords: ["dhyan nahi lagta", "focus", "adult adhd", "bhulna"],
  },
  {
    slug: "speech-language-delay-india",
    category: "child",
    group: "learning",
    name: b("Speech and language delay", "बोलने और भाषा में देरी"),
    title: b("Speech & Language Delay in Children – When to Worry", "बच्चों में बोलने और भाषा की देरी – कब चिंता करें"),
    h1: b("Speech and language delay: milestones and help", "बोलने और भाषा में देरी: पड़ाव और मदद"),
    description: b(
      "Child not speaking words by 18 months or sentences by 3 years? Learn milestones, causes like hearing loss or autism, and how assessment and therapy help.",
      "18 महीने तक शब्द या 3 साल तक वाक्य नहीं बोलता? जानें पड़ाव, सुनने की कमी या ऑटिज़्म जैसे कारण, और जाँच व थेरेपी कैसे मदद करती है।"
    ),
    intro: [
      b("Children learn to speak at different speeds, but some delays need early assessment because therapy works best in the early years.", "बच्चे अलग-अलग रफ़्तार से बोलना सीखते हैं, पर कुछ देरी की जल्दी जाँच ज़रूरी है क्योंकि शुरुआती सालों में थेरेपी सबसे ज़्यादा असर करती है।"),
      b("A psychiatric assessment checks for autism, intellectual disability, ADHD and emotional causes, alongside hearing and speech evaluation.", "मनोरोग जाँच में सुनने और बोलने की जाँच के साथ ऑटिज़्म, बौद्धिक अक्षमता, ADHD और भावनात्मक कारण देखे जाते हैं।"),
    ],
    symptoms: [
      b("No babbling by 12 months, no single words by 16–18 months", "12 महीने तक बड़बड़ाना नहीं, 16–18 महीने तक एक भी शब्द नहीं"),
      b("No two-word phrases by 2 years; speech hard to understand at 3", "2 साल तक दो शब्द नहीं जोड़ता; 3 साल पर बोली समझ नहीं आती"),
      b("Not responding to name, poor eye contact or loss of words already learned", "नाम पर प्रतिक्रिया नहीं, आँख न मिलाना या सीखे हुए शब्द भूल जाना"),
    ],
    causes: [
      b("Hearing loss, including from repeated ear infections", "सुनने की कमी, बार-बार कान के संक्रमण से भी"),
      b("Developmental language disorder, autism or intellectual disability", "डेवलपमेंटल लैंग्वेज डिसऑर्डर, ऑटिज़्म या बौद्धिक अक्षमता"),
      b("Limited interaction and heavy screen exposure in early years", "शुरुआती सालों में कम बातचीत और ज़्यादा स्क्रीन"),
    ],
    riskFactors: [
      b("Family history of late talking", "परिवार में देर से बोलने का इतिहास"),
      b("Premature birth, birth complications", "समय से पहले जन्म, जन्म के समय की जटिलताएँ"),
    ],
    diagnosis: [
      b("Hearing test (audiometry/BERA)", "सुनने की जाँच (ऑडियोमेट्री/BERA)"),
      b("Developmental and autism assessment", "विकास और ऑटिज़्म की जाँच"),
      b("Speech-language pathologist evaluation", "स्पीच-लैंग्वेज विशेषज्ञ से जाँच"),
    ],
    icd: { icd10: "F80", icd11: "6A01", note: b("Code depends on the underlying cause.", "कोड मूल कारण पर निर्भर करता है।") },
    treatment: [
      b("Speech and language therapy with daily home practice", "रोज़ घर पर अभ्यास के साथ स्पीच और लैंग्वेज थेरेपी"),
      b("Treating hearing problems; managing autism or ADHD if present", "सुनने की समस्या का इलाज; ऑटिज़्म या ADHD हो तो उसका प्रबंधन"),
      b("Limiting screens and increasing face-to-face talk and play", "स्क्रीन कम करना और आमने-सामने बातचीत और खेल बढ़ाना"),
    ],
    psychotherapy: [b("Parent training to encourage communication through play", "खेल के ज़रिए बातचीत बढ़ाने के लिए माता-पिता का प्रशिक्षण")],
    family: [
      b("Talk, sing and read with the child daily; name objects and actions", "रोज़ बच्चे से बात करें, गाएँ, पढ़कर सुनाएँ; चीज़ों और कामों के नाम लें"),
      b("Use the home language comfortably — bilingual homes do not cause delay", "घर की भाषा आराम से बोलें — दो भाषाएँ बोलने से देरी नहीं होती"),
    ],
    seekHelp: [
      b("Any loss of speech or social skills at any age", "किसी भी उम्र में बोली या सामाजिक कौशल खोना"),
      b("Missed milestones listed above", "ऊपर बताए पड़ाव पूरे न होना"),
    ],
    faqs: [
      faq("Should we wait and see?", "क्या इंतज़ार करना चाहिए?", "Waiting is not advised if milestones are clearly missed; early assessment does no harm and helps.", "अगर पड़ाव साफ़ तौर पर छूट रहे हैं तो इंतज़ार ठीक नहीं; जल्दी जाँच से नुकसान नहीं, फ़ायदा होता है।"),
    ],
    related: ["autism-psychiatrist-india", "specific-learning-disorder-india", "intellectual-disability-idd-india", "child-psychiatrist-india"],
    videoKeywords: ["speech delay", "बोलने में देरी", "late talking"],
    keywords: ["bolna nahi", "der se bolna", "speech delay", "totla"],
  },
  {
    slug: "anorexia-nervosa-india",
    category: "mental",
    group: "eating",
    name: b("Anorexia nervosa", "एनोरेक्सिया नर्वोसा"),
    title: b("Anorexia Nervosa – Warning Signs & Treatment", "एनोरेक्सिया नर्वोसा – चेतावनी संकेत और इलाज"),
    h1: b("Anorexia nervosa: a serious but treatable illness", "एनोरेक्सिया नर्वोसा: गंभीर लेकिन इलाज योग्य बीमारी"),
    description: b(
      "Severe food restriction, fear of weight gain and very low weight? Anorexia nervosa needs early medical and psychiatric care. Signs and treatment.",
      "खाना बहुत कम करना, वज़न बढ़ने का डर और बहुत कम वज़न? एनोरेक्सिया नर्वोसा में जल्दी शारीरिक और मानसिक इलाज ज़रूरी है। संकेत और इलाज।"
    ),
    intro: [
      b("Anorexia nervosa involves restricting food so much that weight becomes dangerously low, driven by an intense fear of gaining weight.", "एनोरेक्सिया नर्वोसा में वज़न बढ़ने के तीव्र डर से इतना कम खाया जाता है कि वज़न ख़तरनाक रूप से कम हो जाता है।"),
      b("It affects both girls and boys, and adults too. It can harm the heart, bones and hormones, so early treatment matters.", "यह लड़कियों, लड़कों और वयस्कों सभी में हो सकता है। यह दिल, हड्डियों और हार्मोन को नुकसान पहुँचा सकता है, इसलिए जल्दी इलाज ज़रूरी है।"),
    ],
    symptoms: [
      b("Marked weight loss or failure to gain weight in a growing child", "बहुत वज़न घटना या बढ़ते बच्चे का वज़न न बढ़ना"),
      b("Fear of weight gain; seeing oneself as fat despite being thin", "वज़न बढ़ने का डर; पतले होने पर भी ख़ुद को मोटा समझना"),
      b("Skipping meals, rigid food rules, excessive exercise", "खाना छोड़ना, खाने के सख़्त नियम, बहुत ज़्यादा व्यायाम"),
      b("Missed periods, dizziness, feeling cold, hair loss", "माहवारी रुकना, चक्कर, ठंड लगना, बाल झड़ना"),
    ],
    causes: [
      b("Genetic vulnerability and perfectionistic, anxious temperament", "आनुवंशिक संवेदनशीलता और परफ़ेक्शनिस्ट, चिंतित स्वभाव"),
      b("Dieting, body-image pressure and social media ideals", "डाइटिंग, शरीर को लेकर दबाव और सोशल मीडिया के आदर्श"),
    ],
    riskFactors: [
      b("Adolescence, sports or careers focused on weight", "किशोरावस्था, वज़न पर केंद्रित खेल या करियर"),
      b("Anxiety, OCD or depression", "एंग्ज़ाइटी, OCD या डिप्रेशन"),
    ],
    diagnosis: [
      b("Weight, height, BMI and growth charts", "वज़न, लंबाई, BMI और ग्रोथ चार्ट"),
      b("Medical tests: heart rate, blood pressure, ECG, electrolytes, blood counts", "शारीरिक जाँच: नाड़ी, बीपी, ECG, इलेक्ट्रोलाइट, ख़ून की जाँच"),
      b("Assessment of mood, anxiety and safety", "मूड, एंग्ज़ाइटी और सुरक्षा की जाँच"),
    ],
    icd: { icd10: "F50.0", icd11: "6B80" },
    treatment: [
      b("Medical stabilisation; hospital care if weight or vital signs are dangerously low", "शारीरिक स्थिरता; वज़न या नाड़ी-बीपी ख़तरनाक रूप से कम हो तो अस्पताल"),
      b("Supervised nutritional rehabilitation with a dietitian", "डाइटीशियन की निगरानी में पोषण सुधार"),
      b("Treating co-existing depression, anxiety or OCD", "साथ के डिप्रेशन, एंग्ज़ाइटी या OCD का इलाज"),
    ],
    psychotherapy: [
      b("Family-based treatment for teenagers", "किशोरों के लिए फ़ैमिली-बेस्ड ट्रीटमेंट"),
      b("CBT for eating disorders (CBT-E) for adults", "वयस्कों के लिए ईटिंग डिसऑर्डर की CBT (CBT-E)"),
    ],
    family: EATING_FAMILY,
    seekHelp: [
      b("Fainting, chest pain, very slow pulse — emergency", "बेहोशी, सीने में दर्द, बहुत धीमी नाड़ी — इमरजेंसी"),
      b("Rapid weight loss or stopping periods", "तेज़ी से वज़न घटना या माहवारी रुकना"),
    ],
    faqs: [
      faq("Is it just dieting?", "क्या यह बस डाइटिंग है?", "No. Anorexia is a mental illness with serious physical effects; willpower alone does not fix it.", "नहीं। एनोरेक्सिया गंभीर शारीरिक असर वाली मानसिक बीमारी है; सिर्फ़ इच्छाशक्ति से ठीक नहीं होती।"),
      faq("Can boys get anorexia?", "क्या लड़कों को एनोरेक्सिया हो सकता है?", "Yes, though it is often missed in boys and men.", "हाँ, हालाँकि लड़कों और पुरुषों में यह अक्सर पहचाना नहीं जाता।"),
    ],
    related: ["bulimia-nervosa-india", "binge-eating-disorder-india", "body-dysmorphic-disorder-india", "ocd-treatment-india"],
    videoKeywords: ["anorexia", "eating disorder", "खाने"],
    keywords: ["khana nahi khana", "patla", "weight loss", "anorexia"],
  },
  {
    slug: "bulimia-nervosa-india",
    category: "mental",
    group: "eating",
    name: b("Bulimia nervosa", "बुलिमिया नर्वोसा"),
    title: b("Bulimia Nervosa – Binge-Purge Cycle & Treatment", "बुलिमिया नर्वोसा – ज़्यादा खाना और उल्टी का चक्र, इलाज"),
    h1: b("Bulimia nervosa: breaking the binge–purge cycle", "बुलिमिया नर्वोसा: ज़्यादा खाने और उल्टी के चक्र को तोड़ना"),
    description: b(
      "Episodes of overeating followed by vomiting, laxatives or fasting? Bulimia nervosa is treatable with CBT and medical care. Signs, risks and help.",
      "बहुत ज़्यादा खाने के बाद उल्टी, जुलाब या उपवास? बुलिमिया नर्वोसा का CBT और शारीरिक देखभाल से इलाज संभव है। संकेत, ख़तरे और मदद।"
    ),
    intro: [
      b("Bulimia involves repeated binge eating with a loss of control, followed by efforts to compensate such as vomiting, laxatives, fasting or excessive exercise.", "बुलिमिया में बार-बार नियंत्रण खोकर बहुत ज़्यादा खाना और फिर उसकी भरपाई के लिए उल्टी, जुलाब, उपवास या बहुत व्यायाम किया जाता है।"),
      b("Weight is often normal, so it can stay hidden for years. Shame keeps many people from seeking help.", "वज़न अक्सर सामान्य रहता है, इसलिए यह सालों तक छिपा रह सकता है। शर्म की वजह से बहुत लोग मदद नहीं लेते।"),
    ],
    symptoms: [
      b("Eating large amounts quickly, feeling unable to stop", "जल्दी-जल्दी बहुत ज़्यादा खाना, रुक न पाना"),
      b("Self-induced vomiting, laxative or diuretic misuse", "जानबूझकर उल्टी, जुलाब या पेशाब की दवाओं का ग़लत इस्तेमाल"),
      b("Strong focus on weight and shape; guilt after eating", "वज़न और शरीर पर बहुत ध्यान; खाने के बाद अपराधबोध"),
      b("Swollen cheeks, dental erosion, sore throat", "सूजे गाल, दाँतों का घिसना, गले में ख़राश"),
    ],
    causes: [
      b("Strict dieting that triggers binges", "सख़्त डाइटिंग जो ज़्यादा खाने को भड़काती है"),
      b("Using food to cope with stress, sadness or loneliness", "तनाव, उदासी या अकेलेपन से निपटने के लिए खाना"),
    ],
    riskFactors: [
      b("Depression, anxiety, impulsivity", "डिप्रेशन, एंग्ज़ाइटी, जल्दबाज़ी"),
      b("Past teasing about weight", "पहले वज़न को लेकर चिढ़ाया जाना"),
    ],
    diagnosis: [
      b("Interview about eating patterns and compensatory behaviours", "खाने के पैटर्न और भरपाई वाले व्यवहार पर बातचीत"),
      b("Electrolyte tests — vomiting can lower potassium dangerously", "इलेक्ट्रोलाइट जाँच — उल्टी से पोटैशियम ख़तरनाक रूप से गिर सकता है"),
    ],
    icd: { icd10: "F50.2", icd11: "6B81" },
    treatment: [
      b("Regular eating pattern: three meals and planned snacks", "नियमित खाना: तीन बार भोजन और तय नाश्ता"),
      b("Medicines can reduce binge–purge urges in some people", "कुछ लोगों में दवाएँ ज़्यादा खाने और उल्टी की इच्छा कम करती हैं"),
      b("Medical and dental follow-up", "शारीरिक और दाँतों की जाँच जारी रखना"),
    ],
    psychotherapy: [
      b("CBT for eating disorders (first-line)", "ईटिंग डिसऑर्डर के लिए CBT (पहली पसंद)"),
      b("Skills for handling emotions without food", "खाने के बिना भावनाएँ सँभालने के कौशल"),
    ],
    family: EATING_FAMILY,
    seekHelp: [
      b("Palpitations, weakness or fainting — urgent", "धड़कन तेज़, कमज़ोरी या बेहोशी — तुरंत"),
      b("Vomiting or laxative use more than occasionally", "कभी-कभार से ज़्यादा उल्टी या जुलाब"),
    ],
    faqs: [
      faq("Does vomiting get rid of the calories?", "क्या उल्टी से कैलोरी निकल जाती है?", "Much less than people think, and it harms the body. It also keeps the binge cycle going.", "लोग जितना सोचते हैं उससे बहुत कम, और इससे शरीर को नुकसान होता है। यह चक्र को भी चलाए रखता है।"),
    ],
    related: ["anorexia-nervosa-india", "binge-eating-disorder-india", "depression-treatment-india"],
    videoKeywords: ["bulimia", "eating disorder"],
    keywords: ["ulti", "binge", "bulimia", "khana"],
  },
  {
    slug: "binge-eating-disorder-india",
    category: "mental",
    group: "eating",
    name: b("Binge eating disorder", "बिंज ईटिंग डिसऑर्डर"),
    title: b("Binge Eating Disorder – Signs & Treatment", "बिंज ईटिंग डिसऑर्डर – संकेत और इलाज"),
    h1: b("Binge eating disorder: more than overeating", "बिंज ईटिंग डिसऑर्डर: सिर्फ़ ज़्यादा खाना नहीं"),
    description: b(
      "Repeated episodes of eating large amounts with loss of control and distress? Binge eating disorder is treatable. Learn signs, causes and therapy options.",
      "बार-बार नियंत्रण खोकर बहुत ज़्यादा खाना और फिर परेशानी? बिंज ईटिंग डिसऑर्डर का इलाज संभव है। संकेत, कारण और थेरेपी जानें।"
    ),
    intro: [
      b("Binge eating disorder means regular episodes of eating much more than usual with a sense of loss of control, without regular vomiting or fasting afterwards.", "बिंज ईटिंग डिसऑर्डर में नियमित रूप से नियंत्रण खोकर सामान्य से बहुत ज़्यादा खाया जाता है, बिना बाद में नियमित उल्टी या उपवास के।"),
      b("It is linked with weight gain, diabetes and low mood, but it is a mental health condition, not a lack of willpower.", "इसका संबंध वज़न बढ़ने, डायबिटीज़ और उदासी से है, पर यह एक मानसिक स्वास्थ्य स्थिति है, इच्छाशक्ति की कमी नहीं।"),
    ],
    symptoms: [
      b("Eating rapidly, until uncomfortably full, or when not hungry", "तेज़ी से खाना, पेट बहुत भरने तक, या भूख न होने पर भी"),
      b("Eating alone due to embarrassment", "शर्म की वजह से अकेले खाना"),
      b("Disgust, guilt or low mood afterwards", "बाद में घृणा, अपराधबोध या उदासी"),
    ],
    causes: [
      b("Emotional eating under stress", "तनाव में भावनात्मक खाना"),
      b("Cycles of strict dieting and overeating", "सख़्त डाइटिंग और ज़्यादा खाने का चक्र"),
    ],
    riskFactors: [
      b("Depression, ADHD, trauma", "डिप्रेशन, ADHD, आघात"),
      b("Irregular meals and poor sleep", "अनियमित खाना और ख़राब नींद"),
    ],
    diagnosis: [
      b("Food and mood diary", "खाने और मूड की डायरी"),
      b("Checks for diabetes, thyroid, blood pressure and sleep apnoea", "डायबिटीज़, थायरॉइड, बीपी और स्लीप एपनिया की जाँच"),
    ],
    icd: { icd11: "6B82", note: b("A specific category in ICD-11; ICD-10 has no separate code.", "ICD-11 में अलग श्रेणी; ICD-10 में अलग कोड नहीं।") },
    treatment: [
      b("Regular meals and identifying triggers", "नियमित खाना और ट्रिगर पहचानना"),
      b("Medicines in selected cases, as prescribed", "डॉक्टर की सलाह से चुने हुए मामलों में दवाएँ"),
      b("Treating depression, ADHD or sleep problems", "डिप्रेशन, ADHD या नींद की समस्या का इलाज"),
    ],
    psychotherapy: [
      b("CBT for binge eating (first-line)", "बिंज ईटिंग के लिए CBT (पहली पसंद)"),
      b("Mindful eating and emotion-regulation skills", "ध्यानपूर्वक खाना और भावनाएँ सँभालने के कौशल"),
    ],
    family: EATING_FAMILY,
    seekHelp: [
      b("Binges at least weekly for three months", "तीन महीने से हफ़्ते में कम से कम एक बार"),
      b("Low mood, hopelessness or rapid weight change", "उदासी, निराशा या तेज़ी से वज़न बदलना"),
    ],
    faqs: [
      faq("Will a strict diet fix it?", "क्या सख़्त डाइट से ठीक होगा?", "Usually not — strict diets often trigger more binges. Regular, balanced meals work better.", "आमतौर पर नहीं — सख़्त डाइट से अक्सर ज़्यादा बिंज होता है। नियमित, संतुलित खाना बेहतर है।"),
    ],
    related: ["bulimia-nervosa-india", "depression-treatment-india", "adult-adhd-treatment-india"],
    videoKeywords: ["binge eating", "emotional eating"],
    keywords: ["zyada khana", "overeating", "binge", "bhookh"],
  },
  {
    slug: "dementia-behaviour-problems-bpsd-india",
    category: "elderly",
    group: "dementia",
    name: b("Behaviour changes in dementia (BPSD)", "डिमेंशिया में व्यवहार बदलाव (BPSD)"),
    title: b("Dementia Behaviour Problems – Agitation, Aggression & Sleep", "डिमेंशिया में व्यवहार की समस्याएँ – बेचैनी, आक्रामकता और नींद"),
    h1: b("Agitation, aggression and sleep problems in dementia", "डिमेंशिया में बेचैनी, आक्रामकता और नींद की समस्या"),
    description: b(
      "Agitation, suspicion, wandering or night-time restlessness in a loved one with dementia? Practical caregiver guidance and safe psychiatric treatment.",
      "डिमेंशिया वाले अपने में बेचैनी, शक, भटकना या रात की बेचैनी? देखभाल करने वालों के लिए व्यावहारिक मार्गदर्शन और सुरक्षित इलाज।"
    ),
    intro: [
      b("Most people with dementia develop behavioural or psychological symptoms at some stage. These are often the hardest part of caregiving.", "डिमेंशिया वाले ज़्यादातर लोगों में किसी न किसी दौर में व्यवहार या मानसिक लक्षण आते हैं। देखभाल का यह अक्सर सबसे कठिन हिस्सा होता है।"),
      b("Many causes are treatable — pain, infection, constipation, medicines or a noisy environment — so a careful review comes before any sedative.", "कई कारण ठीक हो सकते हैं — दर्द, संक्रमण, क़ब्ज़, दवाएँ या शोर — इसलिए नींद की दवा से पहले ध्यान से जाँच ज़रूरी है।"),
    ],
    symptoms: [
      b("Agitation, shouting, aggression", "बेचैनी, चिल्लाना, आक्रामकता"),
      b("Suspicion — believing things are stolen", "शक — लगना कि चीज़ें चोरी हो गईं"),
      b("Wandering, night-time restlessness, day–night reversal", "भटकना, रात में बेचैनी, दिन-रात उलटना"),
      b("Apathy, low mood, seeing things that are not there", "उदासीनता, उदासी, ऐसी चीज़ें दिखना जो नहीं हैं"),
    ],
    causes: [
      b("Brain changes of dementia", "डिमेंशिया से दिमाग़ में बदलाव"),
      b("Unmet needs: pain, hunger, toilet, boredom, fear", "अधूरी ज़रूरतें: दर्द, भूख, टॉयलेट, ऊब, डर"),
      b("Infections, dehydration, constipation or medicine side-effects", "संक्रमण, पानी की कमी, क़ब्ज़ या दवाओं के साइड-इफ़ेक्ट"),
    ],
    riskFactors: [
      b("Moderate to severe dementia", "मध्यम से गंभीर डिमेंशिया"),
      b("Poor hearing or vision, changes in surroundings", "कमज़ोर सुनना या दिखना, माहौल में बदलाव"),
    ],
    diagnosis: [
      b("Review of physical health and all medicines", "शारीरिक सेहत और सभी दवाओं की समीक्षा"),
      b("Ruling out delirium (sudden confusion) which needs urgent care", "डिलीरियम (अचानक भ्रम) को अलग करना जिसमें तुरंत इलाज चाहिए"),
      b("Behaviour diary: what happens before and after episodes", "व्यवहार डायरी: घटना से पहले और बाद क्या होता है"),
    ],
    icd: { note: b("Coded with the underlying dementia (e.g. ICD-11 6D86 for behavioural or psychological disturbances in dementia).", "मूल डिमेंशिया के साथ कोड किया जाता है (जैसे ICD-11 6D86)।") },
    treatment: [
      b("Non-drug approaches first: routine, activity, music, reassurance", "पहले बिना दवा के तरीक़े: दिनचर्या, गतिविधि, संगीत, भरोसा"),
      b("Treating pain, infection, constipation and sleep problems", "दर्द, संक्रमण, क़ब्ज़ और नींद की समस्या का इलाज"),
      b("Medicines only when needed, at the lowest dose, with regular review — some carry risks in older adults", "दवाएँ सिर्फ़ ज़रूरत पर, सबसे कम मात्रा में, नियमित समीक्षा के साथ — बुज़ुर्गों में कुछ दवाओं के ख़तरे होते हैं"),
    ],
    psychotherapy: [b("Caregiver training and support", "देखभाल करने वालों का प्रशिक्षण और सहारा")],
    family: DEMENTIA_FAMILY,
    seekHelp: [
      b("Sudden worsening of confusion — possible delirium, urgent", "अचानक भ्रम बढ़ना — डिलीरियम हो सकता है, तुरंत"),
      b("Aggression that puts anyone at risk", "आक्रामकता जिससे किसी को ख़तरा हो"),
      b("Caregiver exhaustion", "देखभाल करने वाले की थकान"),
    ],
    faqs: [
      faq("Should we give sleeping pills?", "क्या नींद की गोली देनी चाहिए?", "Not without a doctor's review. Some sleeping pills increase falls and confusion in older adults.", "डॉक्टर की समीक्षा के बिना नहीं। कुछ नींद की गोलियाँ बुज़ुर्गों में गिरने और भ्रम का ख़तरा बढ़ाती हैं।"),
    ],
    related: ["dementia-memory-clinic-india", "alzheimers-disease-india", "delirium-confusion-elderly-india", "geriatric-psychiatry-india"],
    videoKeywords: ["dementia", "डिमेंशिया", "elderly"],
    keywords: ["bhoolna", "budhape", "gussa buzurg", "dementia behaviour"],
  },
  {
    slug: "alzheimers-disease-india",
    category: "elderly",
    group: "dementia",
    name: b("Alzheimer's disease", "अल्ज़ाइमर रोग"),
    title: b("Alzheimer's Disease – Early Signs, Diagnosis & Care", "अल्ज़ाइमर रोग – शुरुआती संकेत, जाँच और देखभाल"),
    h1: b("Alzheimer's disease: early signs and care", "अल्ज़ाइमर रोग: शुरुआती संकेत और देखभाल"),
    description: b(
      "Forgetting recent events, repeating questions, getting lost? Alzheimer's is the most common cause of dementia. Learn early signs, tests and care options.",
      "हाल की बातें भूलना, एक ही सवाल दोहराना, रास्ता भटकना? अल्ज़ाइमर डिमेंशिया का सबसे आम कारण है। शुरुआती संकेत, जाँच और देखभाल जानें।"
    ),
    intro: [
      b("Alzheimer's disease slowly damages brain cells involved in memory and thinking. Recent memory is usually affected first.", "अल्ज़ाइमर रोग धीरे-धीरे याददाश्त और सोच वाली दिमाग़ी कोशिकाओं को नुकसान पहुँचाता है। आमतौर पर पहले हाल की याददाश्त प्रभावित होती है।"),
      b("There is no cure yet, but early diagnosis allows treatment of symptoms, planning and support for the family.", "अभी इलाज से पूरी तरह ठीक नहीं होता, पर जल्दी पहचान से लक्षणों का इलाज, योजना और परिवार को सहारा मिलता है।"),
    ],
    symptoms: [
      b("Forgetting recent conversations and events", "हाल की बातचीत और घटनाएँ भूलना"),
      b("Repeating questions; misplacing things", "सवाल दोहराना; चीज़ें इधर-उधर रख देना"),
      b("Difficulty with money, cooking or familiar tasks", "पैसे, खाना बनाने या जाने-पहचाने कामों में दिक़्क़त"),
      b("Getting lost in familiar places; word-finding problems", "जानी-पहचानी जगह पर भटकना; शब्द ढूँढने में दिक़्क़त"),
    ],
    causes: [
      b("Build-up of abnormal proteins (amyloid and tau) in the brain", "दिमाग़ में असामान्य प्रोटीन (एमिलॉइड और टाउ) का जमना"),
      b("Age is the biggest risk; genes play a role", "उम्र सबसे बड़ा जोखिम; जीन की भी भूमिका"),
    ],
    riskFactors: [
      b("High blood pressure, diabetes, smoking, inactivity", "हाई बीपी, डायबिटीज़, धूम्रपान, निष्क्रियता"),
      b("Untreated hearing loss, depression and social isolation", "बिना इलाज की सुनने की कमी, डिप्रेशन और अकेलापन"),
    ],
    diagnosis: [
      b("Memory tests and history from family", "याददाश्त की जाँच और परिवार से जानकारी"),
      b("Blood tests for B12, thyroid and other reversible causes", "B12, थायरॉइड और दूसरे ठीक होने वाले कारणों के लिए ख़ून की जाँच"),
      b("Brain MRI/CT", "ब्रेन MRI/CT"),
    ],
    icd: { icd10: "F00 / G30", icd11: "6D80" },
    treatment: [
      b("Medicines that may help memory symptoms for a period", "दवाएँ जो कुछ समय तक याददाश्त के लक्षणों में मदद कर सकती हैं"),
      b("Controlling BP, sugar, hearing and vision", "बीपी, शुगर, सुनने और देखने पर नियंत्रण"),
      b("Treating depression, anxiety and sleep problems", "डिप्रेशन, एंग्ज़ाइटी और नींद की समस्या का इलाज"),
      b("Legal and financial planning while the person can participate", "जब तक व्यक्ति शामिल हो सके, क़ानूनी और आर्थिक योजना"),
    ],
    psychotherapy: [
      b("Cognitive stimulation activities", "कॉग्निटिव स्टिमुलेशन गतिविधियाँ"),
      b("Caregiver education and support", "देखभाल करने वालों को जानकारी और सहारा"),
    ],
    family: DEMENTIA_FAMILY,
    seekHelp: [
      b("Memory problems that affect daily life", "याददाश्त की दिक़्क़त जो रोज़मर्रा पर असर डाले"),
      b("Sudden confusion — possible delirium, urgent", "अचानक भ्रम — डिलीरियम हो सकता है, तुरंत"),
    ],
    faqs: [
      faq("Is forgetfulness normal in old age?", "क्या बुढ़ापे में भूलना सामान्य है?", "Mild slowing is normal; forgetting recent events repeatedly and struggling with daily tasks is not.", "थोड़ा धीमापन सामान्य है; बार-बार हाल की बातें भूलना और रोज़ के कामों में दिक़्क़त सामान्य नहीं।"),
    ],
    related: ["dementia-memory-clinic-india", "mild-cognitive-impairment-india", "vascular-dementia-india", "dementia-behaviour-problems-bpsd-india"],
    videoKeywords: ["alzheimer", "अल्ज़ाइमर", "memory", "dementia"],
    keywords: ["bhoolne ki bimari", "yaaddasht", "alzheimer", "memory loss"],
  },
  {
    slug: "vascular-dementia-india",
    category: "elderly",
    group: "dementia",
    name: b("Vascular dementia", "वैस्कुलर डिमेंशिया"),
    title: b("Vascular Dementia – After Stroke or Small-Vessel Disease", "वैस्कुलर डिमेंशिया – स्ट्रोक या छोटी नसों की बीमारी के बाद"),
    h1: b("Vascular dementia: memory problems from blood-vessel disease", "वैस्कुलर डिमेंशिया: नसों की बीमारी से याददाश्त की समस्या"),
    description: b(
      "Slowed thinking, step-wise decline or memory problems after a stroke? Vascular dementia can be slowed by controlling BP, sugar and cholesterol.",
      "स्ट्रोक के बाद सोच धीमी होना, सीढ़ी-नुमा गिरावट या याददाश्त की दिक़्क़त? बीपी, शुगर और कोलेस्ट्रॉल नियंत्रित करके वैस्कुलर डिमेंशिया को धीमा किया जा सकता है।"
    ),
    intro: [
      b("Vascular dementia results from reduced blood flow to the brain — after strokes or from long-standing damage to small blood vessels.", "वैस्कुलर डिमेंशिया दिमाग़ तक ख़ून का बहाव कम होने से होता है — स्ट्रोक के बाद या छोटी नसों को लंबे समय के नुकसान से।"),
      b("It is the second most common type of dementia and often co-exists with Alzheimer's disease.", "यह डिमेंशिया का दूसरा सबसे आम प्रकार है और अक्सर अल्ज़ाइमर के साथ होता है।"),
    ],
    symptoms: [
      b("Slowed thinking and difficulty planning", "सोच धीमी होना और योजना बनाने में दिक़्क़त"),
      b("Sudden or step-wise worsening", "अचानक या सीढ़ी-नुमा बिगड़ना"),
      b("Walking problems, mood changes, emotional outbursts", "चलने में दिक़्क़त, मूड बदलना, भावनाओं का उफान"),
    ],
    causes: [b("Strokes and small-vessel disease of the brain", "स्ट्रोक और दिमाग़ की छोटी नसों की बीमारी")],
    riskFactors: [
      b("High BP, diabetes, high cholesterol, smoking", "हाई बीपी, डायबिटीज़, हाई कोलेस्ट्रॉल, धूम्रपान"),
      b("Heart disease and atrial fibrillation", "दिल की बीमारी और अनियमित धड़कन"),
    ],
    diagnosis: [
      b("Memory and thinking tests", "याददाश्त और सोच की जाँच"),
      b("Brain MRI showing vascular changes", "ब्रेन MRI में नसों से जुड़े बदलाव"),
      b("Cardiovascular risk assessment", "दिल और नसों के जोखिम की जाँच"),
    ],
    icd: { icd10: "F01", icd11: "6D81" },
    treatment: [
      b("Strict control of BP, sugar and cholesterol; stopping smoking", "बीपी, शुगर और कोलेस्ट्रॉल पर सख़्त नियंत्रण; धूम्रपान छोड़ना"),
      b("Stroke prevention medicines as advised by the physician", "फ़िज़िशियन की सलाह से स्ट्रोक रोकने वाली दवाएँ"),
      b("Treating depression and apathy, which are common", "डिप्रेशन और उदासीनता का इलाज, जो आम हैं"),
    ],
    psychotherapy: [b("Rehabilitation, physiotherapy and caregiver support", "पुनर्वास, फ़िज़ियोथेरेपी और देखभाल करने वालों को सहारा")],
    family: DEMENTIA_FAMILY,
    seekHelp: [
      b("New weakness, speech difficulty or facial droop — stroke emergency", "नई कमज़ोरी, बोलने में दिक़्क़त या चेहरा टेढ़ा — स्ट्रोक इमरजेंसी"),
      b("Gradual decline in thinking after a stroke", "स्ट्रोक के बाद सोच में धीरे-धीरे गिरावट"),
    ],
    faqs: [
      faq("Can vascular dementia be prevented?", "क्या वैस्कुलर डिमेंशिया से बचाव संभव है?", "Controlling vascular risk factors lowers the risk and can slow progression.", "नसों के जोखिम कारकों पर नियंत्रण से ख़तरा घटता है और बढ़ना धीमा हो सकता है।"),
    ],
    related: ["post-stroke-depression-india", "alzheimers-disease-india", "dementia-memory-clinic-india"],
    videoKeywords: ["dementia", "stroke", "memory"],
    keywords: ["stroke ke baad bhoolna", "lakwa", "vascular dementia"],
  },
  {
    slug: "mild-cognitive-impairment-india",
    category: "elderly",
    group: "dementia",
    name: b("Mild cognitive impairment (MCI)", "माइल्ड कॉग्निटिव इम्पेयरमेंट (MCI)"),
    title: b("Mild Cognitive Impairment – Is It Early Dementia?", "माइल्ड कॉग्निटिव इम्पेयरमेंट – क्या यह शुरुआती डिमेंशिया है?"),
    h1: b("Mild cognitive impairment: memory changes beyond normal ageing", "माइल्ड कॉग्निटिव इम्पेयरमेंट: सामान्य उम्र से ज़्यादा याददाश्त में बदलाव"),
    description: b(
      "Noticeable memory lapses but still managing daily life? MCI may stay stable, improve or progress. Learn about assessment, reversible causes and brain health.",
      "याददाश्त में ध्यान देने लायक़ कमी पर रोज़ के काम ठीक? MCI स्थिर रह सकता है, सुधर सकता है या बढ़ सकता है। जाँच, ठीक होने वाले कारण और दिमाग़ी सेहत जानें।"
    ),
    intro: [
      b("MCI means memory or thinking has declined more than expected for age, but the person remains independent in daily activities.", "MCI का मतलब है याददाश्त या सोच उम्र के हिसाब से ज़्यादा घटी है, पर व्यक्ति रोज़ के कामों में आत्मनिर्भर है।"),
      b("Some people progress to dementia, but many stay stable or improve — especially when causes like depression, B12 deficiency or poor sleep are treated.", "कुछ लोगों में डिमेंशिया हो जाता है, पर बहुत से स्थिर रहते हैं या सुधरते हैं — ख़ासकर जब डिप्रेशन, B12 की कमी या ख़राब नींद जैसे कारणों का इलाज हो।"),
    ],
    symptoms: [
      b("Forgetting appointments or recent conversations more often", "अपॉइंटमेंट या हाल की बातचीत ज़्यादा भूलना"),
      b("Losing track of thoughts or conversations", "बात या विचार का सिरा खो देना"),
      b("Family notices the change, but daily life is largely managed", "परिवार बदलाव देखता है, पर रोज़ के काम ज़्यादातर ठीक"),
    ],
    causes: [
      b("Early neurodegenerative or vascular changes", "शुरुआती न्यूरोडीजेनेरेटिव या नसों के बदलाव"),
      b("Reversible causes: depression, sleep apnoea, B12 or thyroid problems, medicines", "ठीक होने वाले कारण: डिप्रेशन, स्लीप एपनिया, B12 या थायरॉइड, दवाएँ"),
    ],
    riskFactors: [
      b("Diabetes, BP, inactivity, hearing loss", "डायबिटीज़, बीपी, निष्क्रियता, सुनने की कमी"),
      b("Alcohol use and long-term sedative use", "शराब और लंबे समय तक नींद की दवाएँ"),
    ],
    diagnosis: [
      b("Cognitive screening and follow-up testing over time", "कॉग्निटिव स्क्रीनिंग और समय-समय पर दोबारा जाँच"),
      b("Blood tests and brain imaging when indicated", "ज़रूरत हो तो ख़ून की जाँच और ब्रेन इमेजिंग"),
    ],
    icd: { icd10: "F06.7", icd11: "6D71" },
    treatment: [
      b("Treating reversible causes", "ठीक होने वाले कारणों का इलाज"),
      b("Physical exercise, social activity and learning new skills", "व्यायाम, सामाजिक गतिविधि और नई चीज़ें सीखना"),
      b("Reviewing medicines that affect memory", "याददाश्त पर असर डालने वाली दवाओं की समीक्षा"),
    ],
    psychotherapy: [b("Memory strategies: diaries, phone reminders, routines", "याददाश्त के तरीक़े: डायरी, फ़ोन रिमाइंडर, दिनचर्या")],
    family: [
      b("Encourage activity and social contact", "गतिविधि और लोगों से मिलना-जुलना बढ़ाएँ"),
      b("Keep a record of changes for follow-up visits", "फॉलो-अप के लिए बदलावों का रिकॉर्ड रखें"),
    ],
    seekHelp: [
      b("Memory changes noticed by you or family", "आप या परिवार द्वारा देखे गए याददाश्त के बदलाव"),
      b("Difficulty with money, medicines or driving", "पैसे, दवाओं या गाड़ी चलाने में दिक़्क़त"),
    ],
    faqs: [
      faq("Does MCI always become dementia?", "क्या MCI हमेशा डिमेंशिया बन जाता है?", "No. Many people remain stable or improve. Regular follow-up helps track changes.", "नहीं। बहुत से लोग स्थिर रहते हैं या सुधरते हैं। नियमित फॉलो-अप से बदलाव पर नज़र रहती है।"),
    ],
    related: ["alzheimers-disease-india", "late-life-depression-india", "dementia-memory-clinic-india"],
    videoKeywords: ["memory", "याददाश्त", "dementia"],
    keywords: ["yaaddasht kam", "bhoolna", "memory weak", "mci"],
  },
  {
    slug: "suicide-prevention-crisis-support-india",
    category: "mental",
    group: "crisis",
    name: b("Suicidal thoughts & crisis support", "आत्महत्या के विचार और संकट में सहायता"),
    title: b("Suicidal Thoughts – Where to Get Help Now", "आत्महत्या के विचार – अभी मदद कहाँ लें"),
    h1: b("If you are thinking about suicide, help is available", "अगर आपके मन में आत्महत्या के विचार हैं, तो मदद उपलब्ध है"),
    description: b(
      "Having thoughts of ending your life? You are not alone. In an emergency call 112, or Tele-MANAS 14416. How families can help and how treatment works.",
      "जीवन ख़त्म करने के विचार आ रहे हैं? आप अकेले नहीं हैं। इमरजेंसी में 112 या टेली-मानस 14416 पर कॉल करें। परिवार कैसे मदद करे और इलाज कैसे होता है।"
    ),
    intro: [
      b("If you are in immediate danger, call 112 or go to the nearest hospital emergency now. Tele-MANAS (14416 or 1-800-891-4416) is a free 24×7 government mental health helpline.", "अगर आप तुरंत ख़तरे में हैं, तो अभी 112 पर कॉल करें या नज़दीकी अस्पताल की इमरजेंसी जाएँ। टेली-मानस (14416 या 1-800-891-4416) सरकार की मुफ़्त 24×7 मानसिक स्वास्थ्य हेल्पलाइन है।"),
      b("Suicidal thoughts are usually a sign of treatable distress such as depression, not a weakness. Talking to someone you trust is a strong first step.", "आत्महत्या के विचार अक्सर डिप्रेशन जैसी इलाज योग्य परेशानी का संकेत होते हैं, कमज़ोरी नहीं। किसी भरोसेमंद से बात करना एक मज़बूत पहला क़दम है।"),
    ],
    headings: {
      symptoms: b("Warning signs", "चेतावनी संकेत"),
      causes: b("What can increase risk", "ख़तरा किन बातों से बढ़ता है"),
      treatment: b("How help and treatment work", "मदद और इलाज कैसे होता है"),
      seekHelp: b("Get help immediately if", "तुरंत मदद लें अगर"),
    },
    symptoms: [
      b("Talking about wanting to die or being a burden", "मरने की इच्छा या बोझ होने की बातें करना"),
      b("Searching for ways to end life, collecting pills", "जान लेने के तरीक़े खोजना, गोलियाँ इकट्ठा करना"),
      b("Withdrawing, giving away belongings, saying goodbyes", "अलग-थलग होना, चीज़ें बाँट देना, अलविदा कहना"),
      b("Sudden calm after a period of deep distress", "बहुत परेशानी के बाद अचानक शांत हो जाना"),
    ],
    causes: [
      b("Depression, bipolar disorder, psychosis, substance use", "डिप्रेशन, बाइपोलर, साइकोसिस, नशा"),
      b("Major loss, exam or job failure, debt, relationship crisis", "बड़ा नुकसान, परीक्षा या नौकरी में असफलता, क़र्ज़, रिश्ते का संकट"),
      b("Chronic pain or illness, isolation", "लंबा दर्द या बीमारी, अकेलापन"),
    ],
    riskFactors: [
      b("Previous suicide attempt", "पहले आत्महत्या की कोशिश"),
      b("Easy access to pesticides, medicines or other means", "कीटनाशक, दवाओं या दूसरे साधनों की आसान पहुँच"),
      b("Alcohol or drug intoxication", "शराब या नशे की हालत"),
    ],
    diagnosis: [
      b("A calm, private conversation about thoughts, plans and safety", "विचारों, योजनाओं और सुरक्षा पर शांत, निजी बातचीत"),
      b("Identifying and treating the underlying condition", "मूल बीमारी की पहचान और इलाज"),
    ],
    treatment: [
      b("Immediate safety: emergency care or hospital admission when risk is high", "तुरंत सुरक्षा: ख़तरा ज़्यादा हो तो इमरजेंसी या अस्पताल में भर्ती"),
      b("A written safety plan: warning signs, coping steps, people to call", "लिखित सुरक्षा योजना: चेतावनी संकेत, सँभलने के क़दम, किसे कॉल करें"),
      b("Treatment of depression, substance use or other conditions", "डिप्रेशन, नशे या दूसरी बीमारियों का इलाज"),
      b("Close follow-up in the weeks after a crisis", "संकट के बाद के हफ़्तों में क़रीबी फॉलो-अप"),
    ],
    psychotherapy: [
      b("CBT and problem-solving therapy", "CBT और प्रॉब्लम-सॉल्विंग थेरेपी"),
      b("DBT skills for intense emotions and repeated self-harm", "तीव्र भावनाओं और बार-बार ख़ुद को नुकसान के लिए DBT स्किल्स"),
    ],
    family: [
      b("Ask directly: \"Are you thinking of suicide?\" — asking does not put the idea in their mind", "सीधे पूछें: \"क्या तुम आत्महत्या के बारे में सोच रहे हो?\" — पूछने से यह विचार नहीं आता"),
      b("Listen without judging; do not promise to keep it secret", "बिना आलोचना के सुनें; राज़ रखने का वादा न करें"),
      b("Remove or lock away pesticides, medicines, ropes and weapons", "कीटनाशक, दवाएँ, रस्सी और हथियार हटाएँ या ताले में रखें"),
      b("Stay with the person and get professional help", "व्यक्ति के साथ रहें और विशेषज्ञ की मदद लें"),
    ],
    seekHelp: [
      b("A plan or means to end life — call 112 or go to emergency now", "जान लेने की योजना या साधन — अभी 112 पर कॉल करें या इमरजेंसी जाएँ"),
      b("After any self-harm, even if it seems minor", "ख़ुद को कोई भी नुकसान पहुँचाने के बाद, भले छोटा लगे"),
      b("Thoughts of death that keep returning — Tele-MANAS 14416 (24×7)", "बार-बार लौटने वाले मौत के विचार — टेली-मानस 14416 (24×7)"),
    ],
    faqs: [
      faq("Is an online consultation suitable in a crisis?", "क्या संकट में ऑनलाइन परामर्श ठीक है?", "No. If you are in immediate danger, go to the nearest emergency or call 112. Online consultation is for ongoing care once you are safe.", "नहीं। अगर तुरंत ख़तरा है तो नज़दीकी इमरजेंसी जाएँ या 112 पर कॉल करें। ऑनलाइन परामर्श सुरक्षित होने के बाद लगातार इलाज के लिए है।"),
      faq("Do suicidal thoughts go away?", "क्या आत्महत्या के विचार चले जाते हैं?", "With support and treatment, most people find that these thoughts reduce and life feels manageable again.", "सहारे और इलाज से ज़्यादातर लोगों में ये विचार कम हो जाते हैं और ज़िंदगी फिर सँभलने लायक़ लगती है।"),
    ],
    related: ["depression-treatment-india", "teen-depression-india", "borderline-personality-disorder-india", "dbt-skills-india"],
    selfTests: ["phq9"],
    videoKeywords: ["suicide", "आत्महत्या", "crisis"],
    keywords: ["marne ka man", "suicide", "khudkushi", "jeena nahi", "helpline"],
  },
];

const SHARED_FAQS = [
  faq("Should the family join the consultation?", "क्या परिवार को परामर्श में शामिल होना चाहिए?", "Yes, family input is very helpful — especially for children, teenagers, eating disorders and memory problems. Part of the session can also be private.", "हाँ, परिवार की जानकारी बहुत मददगार होती है — ख़ासकर बच्चों, किशोरों, खाने की बीमारियों और याददाश्त की समस्याओं में। सेशन का कुछ हिस्सा निजी भी रखा जा सकता है।"),
  faq("Can this be treated by online consultation?", "क्या इसका इलाज ऑनलाइन परामर्श से हो सकता है?", "Many people can be assessed and followed up by private video. If a physical examination, tests or admission are needed, you will be guided to the right local service.", "बहुत से लोगों की जाँच और फॉलो-अप निजी वीडियो से हो सकता है। अगर शारीरिक जाँच, टेस्ट या भर्ती ज़रूरी हो, तो आपको सही स्थानीय सेवा के बारे में बताया जाएगा।"),
  faq("Will my information be kept confidential?", "क्या मेरी जानकारी गोपनीय रहेगी?", "Yes. Consultations are private and records are kept confidential.", "हाँ। परामर्श निजी होते हैं और रिकॉर्ड गोपनीय रखे जाते हैं।"),
];

export const NEW_CHILD_EATING_DEMENTIA: ConditionContent[] = topUpFaqs(PAGES, SHARED_FAQS);
