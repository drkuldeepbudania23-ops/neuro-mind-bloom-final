import type { L10n } from "../i18n";
import type { AssessmentId } from "../assessments";
import type { FaqItem, LibraryGroup } from "./types";

/** Hub pages that gather a library group with audience-specific guidance. */
export type CentreContent = {
  slug: string;
  title: L10n;
  h1: L10n;
  description: L10n;
  intro: L10n[];
  audienceTitle: L10n;
  audiences: { id: string; title: L10n; points: L10n[] }[];
  groups: LibraryGroup[];
  extraPages?: string[];
  guidesTitle?: L10n;
  selfTests: AssessmentId[];
  sections: { title: L10n; points: L10n[] }[];
  faqs: FaqItem[];
};

export const STUDENT_CENTRE: CentreContent = {
  slug: "student-mental-health",
  title: { en: "Student Mental Health Centre – NEET, JEE, MBBS, NEET-PG", hi: "छात्र मानसिक स्वास्थ्य केंद्र – NEET, JEE, MBBS, NEET-PG" },
  h1: { en: "Student Mental Health Centre", hi: "छात्र मानसिक स्वास्थ्य केंद्र" },
  description: {
    en: "Exam stress, sleep, focus, burnout and low mood in NEET/JEE aspirants, MBBS students and resident doctors — with guidance for parents. Confidential help in Hindi or English.",
    hi: "NEET/JEE की तैयारी करने वालों, MBBS छात्रों और रेज़िडेंट डॉक्टरों में परीक्षा का तनाव, नींद, ध्यान, थकान और उदासी — अभिभावकों के लिए मार्गदर्शन सहित। हिंदी या अंग्रेज़ी में गोपनीय मदद।",
  },
  intro: [
    {
      en: "Long study hours, competition, distance from home and uncertainty about results put real pressure on young minds. Stress is normal — but when it starts affecting sleep, mood, health or the ability to study, it deserves care just like any other health problem.",
      hi: "लंबे घंटे की पढ़ाई, प्रतियोगिता, घर से दूरी और रिज़ल्ट की अनिश्चितता युवाओं पर असली दबाव डालते हैं। तनाव सामान्य है — पर जब यह नींद, मूड, सेहत या पढ़ने की क्षमता पर असर डालने लगे, तो इसकी भी किसी दूसरी बीमारी की तरह देखभाल ज़रूरी है।",
    },
    {
      en: "Consultations are confidential and can be done by video from a hostel or PG room. Asking for help early is a sign of good judgement, not weakness.",
      hi: "परामर्श गोपनीय है और हॉस्टल या PG के कमरे से वीडियो पर हो सकता है। समय पर मदद माँगना समझदारी है, कमज़ोरी नहीं।",
    },
  ],
  audienceTitle: { en: "Guidance for each group", hi: "हर समूह के लिए मार्गदर्शन" },
  audiences: [
    {
      id: "for-students",
      title: { en: "For students (school, coaching, college)", hi: "छात्रों के लिए (स्कूल, कोचिंग, कॉलेज)" },
      points: [
        { en: "Protect 7–8 hours of sleep and a fixed wake-up time — memory consolidation happens during sleep.", hi: "7–8 घंटे की नींद और उठने का तय समय बनाए रखें — याद की गई चीज़ें नींद में ही पक्की होती हैं।" },
        { en: "Study in focused blocks (about 45–50 minutes) with short breaks; keep the phone in another room while studying.", hi: "ध्यान से पढ़ने के छोटे हिस्से (लगभग 45–50 मिनट) और बीच में छोटे ब्रेक; पढ़ते समय फ़ोन दूसरे कमरे में रखें।" },
        { en: "Compare yourself with your own last test, not with toppers on social media.", hi: "ख़ुद की तुलना अपने पिछले टेस्ट से करें, सोशल मीडिया के टॉपरों से नहीं।" },
        { en: "Daily movement — even a 20-minute walk — reduces anxiety and improves focus.", hi: "रोज़ थोड़ा चलना-फिरना — 20 मिनट की सैर भी — घबराहट कम करता है और ध्यान बढ़ाता है।" },
        { en: "Talk to someone you trust. If low mood, panic or poor sleep last more than two weeks, consult.", hi: "किसी भरोसेमंद से बात करें। उदासी, घबराहट या ख़राब नींद दो हफ़्ते से ज़्यादा रहे तो परामर्श लें।" },
        { en: "Avoid \"energy\" pills, sleeping pills or substances to cope — they worsen sleep, memory and mood.", hi: "संभलने के लिए \"एनर्जी\" की गोलियाँ, नींद की गोलियाँ या नशे से बचें — इनसे नींद, याददाश्त और मूड और बिगड़ते हैं।" },
      ],
    },
    {
      id: "for-parents",
      title: { en: "For parents", hi: "अभिभावकों के लिए" },
      points: [
        { en: "Ask \"How are you feeling?\" before \"How many marks?\". Children open up when they feel accepted.", hi: "\"कितने नंबर आए?\" से पहले \"कैसा महसूस कर रहे हो?\" पूछें। बच्चे तभी खुलते हैं जब उन्हें अपनापन लगे।" },
        { en: "Watch for changes: withdrawal, irritability, not eating, sleeping all day or all night, falling marks, talk of being a burden.", hi: "बदलाव पर ध्यान दें: अलग-थलग रहना, चिड़चिड़ापन, खाना न खाना, दिन-रात सोना या जागना, गिरते नंबर, बोझ होने की बातें।" },
        { en: "Make it clear that their worth does not depend on one exam; discuss backup options calmly before results.", hi: "साफ़ बताएँ कि उनकी क़ीमत एक परीक्षा से तय नहीं होती; रिज़ल्ट से पहले शांति से दूसरे विकल्पों पर बात करें।" },
        { en: "Regular short calls work better than long lectures. Listen more than you advise.", hi: "लंबे भाषण से ज़्यादा नियमित छोटी बातचीत असर करती है। सलाह से ज़्यादा सुनें।" },
        { en: "Any talk of suicide is an emergency — stay with them, remove dangerous items and call 14416 or 112.", hi: "आत्महत्या की कोई भी बात आपात स्थिति है — उनके साथ रहें, ख़तरनाक चीज़ें हटाएँ और 14416 या 112 पर कॉल करें।" },
      ],
    },
    {
      id: "for-medical-students",
      title: { en: "For MBBS and NEET-PG students", hi: "MBBS और NEET-PG छात्रों के लिए" },
      points: [
        { en: "Medical training brings heavy syllabus, exams, night duties and exposure to suffering. Feeling overwhelmed at times is common.", hi: "मेडिकल पढ़ाई में भारी सिलेबस, परीक्षाएँ, रात की ड्यूटी और पीड़ा का सामना होता है। कभी-कभी बहुत भारी लगना आम है।" },
        { en: "Plan NEET-PG preparation with realistic daily targets and one weekly rest block; long-term consistency beats marathon days.", hi: "NEET-PG की तैयारी व्यावहारिक रोज़ के लक्ष्य और हफ़्ते में एक आराम के समय के साथ करें; लंबे समय की नियमितता लंबे-लंबे दिनों से बेहतर है।" },
        { en: "Never self-prescribe sleeping pills, stimulants or antidepressants. Easy access makes this a real risk for medical students.", hi: "नींद की गोलियाँ, स्टिमुलेंट या एंटीडिप्रेसेंट ख़ुद से कभी न लें। आसानी से मिलने के कारण मेडिकल छात्रों में यह असली जोखिम है।" },
        { en: "Consulting a psychiatrist is confidential and does not affect your registration or career.", hi: "मनोचिकित्सक से परामर्श गोपनीय है और इससे आपके रजिस्ट्रेशन या करियर पर असर नहीं पड़ता।" },
      ],
    },
    {
      id: "for-residents",
      title: { en: "For resident doctors and young professionals", hi: "रेज़िडेंट डॉक्टरों और युवा प्रोफ़ेशनल्स के लिए" },
      points: [
        { en: "Long duty hours, sleep loss and workplace conflict raise the risk of burnout, depression and substance use.", hi: "लंबे ड्यूटी घंटे, नींद की कमी और कार्यस्थल के तनाव से बर्नआउट, डिप्रेशन और नशे का जोखिम बढ़ता है।" },
        { en: "Early signs of burnout: emotional exhaustion, cynicism towards patients, feeling ineffective, dreading work.", hi: "बर्नआउट के शुरुआती लक्षण: भावनात्मक थकान, मरीज़ों के प्रति रूखापन, ख़ुद को बेअसर महसूस करना, काम से डर लगना।" },
        { en: "Protect sleep after night duty, eat proper meals and keep at least one personal connection every week.", hi: "रात की ड्यूटी के बाद नींद बचाएँ, ठीक से खाना खाएँ और हर हफ़्ते कम से कम एक निजी रिश्ते से जुड़ें।" },
        { en: "Video consultation can be scheduled around duty rosters.", hi: "वीडियो परामर्श ड्यूटी रोस्टर के हिसाब से तय किया जा सकता है।" },
      ],
    },
  ],
  groups: ["student"],
  extraPages: ["gaming-disorder-treatment-india", "internet-addiction-treatment-india", "adult-adhd-treatment-india", "insomnia-treatment-india"],
  guidesTitle: { en: "Student topics", hi: "छात्रों से जुड़े विषय" },
  selfTests: ["study-stress", "phq9", "gad7", "sleep", "asrs"],
  sections: [
    {
      title: { en: "Warning signs that need help soon", hi: "चेतावनी के संकेत — जल्द मदद लें" },
      points: [
        { en: "Talking or writing about death, being a burden or \"no way out\"", hi: "मौत, बोझ होने या \"कोई रास्ता नहीं\" की बातें करना या लिखना" },
        { en: "Not sleeping for several nights, or sleeping most of the day", hi: "कई रातें न सोना, या दिन का ज़्यादातर समय सोना" },
        { en: "Stopping meals, classes or calls home", hi: "खाना, क्लास या घर पर फ़ोन बंद कर देना" },
        { en: "New use of alcohol, pills, ganja or other substances", hi: "शराब, गोलियाँ, गांजा या दूसरे नशे की नई शुरुआत" },
        { en: "Panic attacks before or during exams", hi: "परीक्षा से पहले या दौरान घबराहट के दौरे" },
        { en: "Giving away belongings or saying goodbye", hi: "सामान बाँट देना या अलविदा कहना" },
      ],
    },
  ],
  faqs: [
    {
      q: { en: "Will my parents or college be told about my consultation?", hi: "क्या मेरे परामर्श के बारे में घरवालों या कॉलेज को बताया जाएगा?" },
      a: {
        en: "Consultations are confidential. Information is shared only with your consent — except when there is a serious risk to your life, when involving family is necessary for your safety.",
        hi: "परामर्श गोपनीय है। जानकारी आपकी सहमति से ही साझा होती है — सिवाय तब, जब आपकी जान को गंभीर ख़तरा हो और सुरक्षा के लिए परिवार को शामिल करना ज़रूरी हो।",
      },
    },
    {
      q: { en: "Will medicines make me sleepy and affect my studies?", hi: "क्या दवाओं से नींद आएगी और पढ़ाई पर असर पड़ेगा?" },
      a: {
        en: "Many students need only counselling and lifestyle changes. When medicines are needed, they are chosen to suit study schedules and adjusted if they cause drowsiness.",
        hi: "कई छात्रों को सिर्फ़ काउंसलिंग और दिनचर्या में बदलाव की ज़रूरत होती है। दवा ज़रूरी हो तो पढ़ाई के हिसाब से चुनी जाती है और नींद आने पर बदली जाती है।",
      },
    },
    {
      q: { en: "Can I consult from my hostel in Kota or another city?", hi: "क्या कोटा या किसी और शहर के हॉस्टल से परामर्श ले सकते हैं?" },
      a: {
        en: "Yes. Consultation is by private video call. Choose a quiet time when you can talk freely.",
        hi: "हाँ। परामर्श निजी वीडियो कॉल से होता है। ऐसा समय चुनें जब आप खुलकर बात कर सकें।",
      },
    },
  ],
};

export const PSYCHOTHERAPY_CENTRE: CentreContent = {
  slug: "psychotherapy",
  title: { en: "Psychotherapy Centre – CBT, REBT, ERP, DBT, Family & Couples Therapy", hi: "साइकोथेरेपी केंद्र – CBT, REBT, ERP, DBT, परिवार व दंपति थेरेपी" },
  h1: { en: "Psychotherapy and counselling", hi: "साइकोथेरेपी और काउंसलिंग" },
  description: {
    en: "What CBT, REBT, ERP, DBT skills, supportive, family, couples and marital therapy are, who they help and how sessions work. Online sessions in Hindi or English.",
    hi: "CBT, REBT, ERP, DBT स्किल्स, सपोर्टिव, परिवार, दंपति और वैवाहिक थेरेपी क्या हैं, किसे मदद करती हैं और सत्र कैसे होते हैं। हिंदी या अंग्रेज़ी में ऑनलाइन सत्र।",
  },
  intro: [
    {
      en: "Psychotherapy is structured, confidential talking treatment. It teaches practical skills to change unhelpful thoughts, behaviours and relationship patterns — and for many conditions it works as well as medicines, or better when combined with them.",
      hi: "साइकोथेरेपी बातचीत के ज़रिए किया जाने वाला व्यवस्थित और गोपनीय इलाज है। इसमें बेकार सोच, व्यवहार और रिश्तों के पैटर्न बदलने के व्यावहारिक तरीके सिखाए जाते हैं — और कई बीमारियों में यह दवाओं जितनी असरदार है, या दवाओं के साथ और बेहतर।",
    },
    {
      en: "Fees: first psychotherapy session ₹1500, follow-up sessions ₹1000. Sessions are available online.",
      hi: "फीस: पहला साइकोथेरेपी सत्र ₹1500, अगले सत्र ₹1000। सत्र ऑनलाइन उपलब्ध हैं।",
    },
  ],
  audienceTitle: { en: "Before you start", hi: "शुरू करने से पहले" },
  audiences: [
    {
      id: "is-it-for-me",
      title: { en: "Is therapy for me?", hi: "क्या थेरेपी मेरे लिए है?" },
      points: [
        { en: "Useful for depression, anxiety, panic, OCD, trauma, sleep problems, addiction recovery, relationship and family difficulties, and stress.", hi: "डिप्रेशन, घबराहट, पैनिक, OCD, ट्रॉमा, नींद, नशा छोड़ने के बाद, रिश्तों व परिवार की परेशानियों और तनाव में उपयोगी।" },
        { en: "You do not need to be \"very ill\" — many people use therapy to cope better with a hard phase of life.", hi: "\"बहुत बीमार\" होना ज़रूरी नहीं — कई लोग ज़िंदगी के कठिन दौर को बेहतर संभालने के लिए थेरेपी लेते हैं।" },
        { en: "Severe depression, psychosis or mania usually need medicines first; therapy is then added.", hi: "गंभीर डिप्रेशन, मनोविकृति या मेनिया में आमतौर पर पहले दवा ज़रूरी होती है; फिर थेरेपी जोड़ी जाती है।" },
      ],
    },
    {
      id: "first-session",
      title: { en: "What happens in the first session", hi: "पहले सत्र में क्या होता है" },
      points: [
        { en: "A detailed conversation about your concerns, background, health and goals.", hi: "आपकी परेशानियों, पृष्ठभूमि, सेहत और लक्ष्यों पर विस्तार से बातचीत।" },
        { en: "Agreement on the type of therapy, number of sessions and what you will practise between sessions.", hi: "थेरेपी का प्रकार, सत्रों की संख्या और सत्रों के बीच क्या अभ्यास करना है — इस पर सहमति।" },
        { en: "Most structured therapies run for about 6–16 sessions, weekly or fortnightly, depending on the problem.", hi: "ज़्यादातर व्यवस्थित थेरेपी समस्या के हिसाब से लगभग 6–16 सत्र चलती हैं, हर हफ़्ते या दो हफ़्ते में।" },
      ],
    },
    {
      id: "online",
      title: { en: "Online therapy", hi: "ऑनलाइन थेरेपी" },
      points: [
        { en: "Research shows video therapy works well for most common problems.", hi: "शोध बताते हैं कि ज़्यादातर आम समस्याओं में वीडियो थेरेपी अच्छा असर करती है।" },
        { en: "Use earphones and a private room; keep a notebook for homework tasks.", hi: "ईयरफ़ोन और एकांत कमरा इस्तेमाल करें; होमवर्क के लिए एक नोटबुक रखें।" },
      ],
    },
    {
      id: "with-medicines",
      title: { en: "Therapy and medicines", hi: "थेरेपी और दवाइयाँ" },
      points: [
        { en: "Therapy and medicines are not either/or. In moderate to severe conditions the combination often works best.", hi: "थेरेपी और दवा में से एक चुनना ज़रूरी नहीं। मध्यम से गंभीर समस्याओं में दोनों साथ अक्सर सबसे अच्छा काम करते हैं।" },
        { en: "Do not stop prescribed medicines when starting therapy without discussing it with your doctor.", hi: "थेरेपी शुरू करते समय डॉक्टर से बात किए बिना चल रही दवाएँ बंद न करें।" },
      ],
    },
  ],
  groups: ["therapy"],
  extraPages: ["psychotherapy-counselling", "psychosexual-counselling-india"],
  guidesTitle: { en: "Types of therapy", hi: "थेरेपी के प्रकार" },
  selfTests: ["phq9", "gad7", "ocd"],
  sections: [],
  faqs: [
    {
      q: { en: "Is a psychotherapist the same as a psychiatrist?", hi: "क्या साइकोथेरेपिस्ट और मनोचिकित्सक एक ही हैं?" },
      a: {
        en: "A psychiatrist is a medical doctor (MBBS, MD Psychiatry) who diagnoses, prescribes medicines and also provides psychotherapy. Psychologists and counsellors provide therapy but do not prescribe.",
        hi: "मनोचिकित्सक (MBBS, MD मनोचिकित्सा) डॉक्टर होते हैं जो निदान करते हैं, दवा लिखते हैं और साइकोथेरेपी भी करते हैं। साइकोलॉजिस्ट और काउंसलर थेरेपी करते हैं पर दवा नहीं लिखते।",
      },
    },
    {
      q: { en: "How many sessions will I need?", hi: "कितने सत्र लगेंगे?" },
      a: {
        en: "It depends on the problem and your goals. Many structured therapies need 6–16 sessions; progress is reviewed together regularly.",
        hi: "यह समस्या और आपके लक्ष्यों पर निर्भर है। कई व्यवस्थित थेरेपी में 6–16 सत्र लगते हैं; प्रगति की नियमित समीक्षा साथ मिलकर होती है।",
      },
    },
    {
      q: { en: "Is what I say kept confidential?", hi: "क्या मेरी बातें गोपनीय रहेंगी?" },
      a: {
        en: "Yes. Sessions are confidential and not recorded. The only exception is a serious risk to your or someone else's safety.",
        hi: "हाँ। सत्र गोपनीय होते हैं और रिकॉर्ड नहीं किए जाते। अपवाद सिर्फ़ तब है जब आपकी या किसी और की सुरक्षा को गंभीर ख़तरा हो।",
      },
    },
  ],
};

export const CENTRES = [STUDENT_CENTRE, PSYCHOTHERAPY_CENTRE];
