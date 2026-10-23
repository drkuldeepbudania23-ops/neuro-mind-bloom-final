import type { L10n } from "../i18n";
import type { FaqItem } from "./types";
import { b, faq } from "./conditions/_h";

/**
 * State / region hubs for online consultation outside Rajasthan.
 * One page per region (not per city) — each city gets a short, distinct local note inside the hub,
 * so there are no thin near-duplicate city pages. No physical clinic is claimed anywhere outside Ajmer.
 */
export type RegionCity = { name: L10n; note: L10n };
export type Region = {
  slug: string;
  name: L10n;
  title: L10n;
  h1: L10n;
  description: L10n;
  intro: L10n[];
  cities: RegionCity[];
  concerns: L10n[];
  topics: string[]; // condition slugs
  faqs: FaqItem[];
};

const ELIGIBILITY_FAQ = faq(
  "Can a psychiatrist in Rajasthan treat me online in another state?",
  "क्या राजस्थान के मनोचिकित्सक दूसरे राज्य में ऑनलाइन इलाज कर सकते हैं?",
  "Yes. Under India's Telemedicine Practice Guidelines (2020), a registered medical practitioner can consult patients anywhere in India by video. Some situations still need in-person care, and you will be told if that applies.",
  "हाँ। भारत के टेलीमेडिसिन प्रैक्टिस दिशानिर्देश (2020) के तहत पंजीकृत डॉक्टर पूरे भारत में मरीज़ों को वीडियो पर परामर्श दे सकते हैं। कुछ स्थितियों में आमने-सामने इलाज ज़रूरी होता है, ऐसा होने पर आपको बताया जाएगा।"
);
const EMERGENCY_FAQ = faq(
  "What if it is an emergency?",
  "अगर इमरजेंसी हो तो?",
  "Online consultation is not for emergencies. Call 112 or go to the nearest hospital; Tele-MANAS (14416) is available 24×7.",
  "ऑनलाइन परामर्श इमरजेंसी के लिए नहीं है। 112 पर कॉल करें या नज़दीकी अस्पताल जाएँ; टेली-मानस (14416) 24×7 उपलब्ध है।"
);
const RX_FAQ = faq(
  "Will my local chemist accept the e-prescription?",
  "क्या मेरे शहर का केमिस्ट ई-प्रिस्क्रिप्शन मानेगा?",
  "You receive a digitally signed e-prescription with a QR code that a pharmacist can verify. Some controlled medicines cannot be prescribed by teleconsultation; the doctor will explain alternatives.",
  "आपको QR कोड वाला डिजिटल हस्ताक्षरित ई-प्रिस्क्रिप्शन मिलता है जिसे केमिस्ट जाँच सकता है। कुछ नियंत्रित दवाएँ टेलीकंसल्टेशन से नहीं लिखी जा सकतीं; डॉक्टर विकल्प समझाएँगे।"
);

export const REGIONS: Region[] = [
  {
    slug: "uttar-pradesh",
    name: b("Uttar Pradesh", "उत्तर प्रदेश"),
    title: b("Online Psychiatrist for Uttar Pradesh – Hindi Video Consultation", "उत्तर प्रदेश के लिए ऑनलाइन मनोचिकित्सक – हिंदी में वीडियो परामर्श"),
    h1: b("Online psychiatry consultation for Uttar Pradesh", "उत्तर प्रदेश के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private Hindi video consultation for patients across Uttar Pradesh — depression, anxiety, de-addiction, sexual health and student stress. Lucknow, Kanpur, Prayagraj and more.",
      "पूरे उत्तर प्रदेश के मरीज़ों के लिए हिंदी में निजी वीडियो परामर्श — डिप्रेशन, घबराहट, नशा मुक्ति, यौन स्वास्थ्य और छात्रों का तनाव। लखनऊ, कानपुर, प्रयागराज आदि।"
    ),
    intro: [
      b("Uttar Pradesh is India's most populous state, and specialist psychiatric care is still concentrated in a few cities. A private video consultation in Hindi lets patients and families from smaller towns get an assessment without long travel.", "उत्तर प्रदेश भारत का सबसे ज़्यादा आबादी वाला राज्य है, और विशेषज्ञ मनोरोग सेवाएँ अभी भी कुछ ही शहरों में हैं। हिंदी में निजी वीडियो परामर्श से छोटे शहरों के मरीज़ और परिवार लंबी यात्रा के बिना जाँच करा सकते हैं।"),
      b("Dr. Kuldeep Budania practises from Ajmer, Rajasthan; there is no clinic in Uttar Pradesh. All consultations for UP are online.", "डॉ. कुलदीप बुडानिया अजमेर, राजस्थान से प्रैक्टिस करते हैं; उत्तर प्रदेश में कोई क्लिनिक नहीं है। UP के लिए सभी परामर्श ऑनलाइन हैं।"),
    ],
    cities: [
      { name: b("Lucknow", "लखनऊ"), note: b("Government and corporate employees often prefer early-morning or evening video slots.", "सरकारी और कॉर्पोरेट कर्मचारी अक्सर सुबह या शाम के वीडियो स्लॉट पसंद करते हैं।") },
      { name: b("Kanpur", "कानपुर"), note: b("Industrial and trading families can book follow-ups without closing the shop for a day.", "औद्योगिक और व्यापारी परिवार दुकान बंद किए बिना फॉलो-अप ले सकते हैं।") },
      { name: b("Agra", "आगरा"), note: b("Close to the Rajasthan border — the same Hindi-speaking care, from home.", "राजस्थान सीमा के पास — वही हिंदी भाषी देखभाल, घर से।") },
      { name: b("Varanasi", "वाराणसी"), note: b("University students and older adults in joint families are common consultation groups.", "विश्वविद्यालय के छात्र और संयुक्त परिवारों के बुज़ुर्ग अक्सर परामर्श लेते हैं।") },
      { name: b("Prayagraj", "प्रयागराज"), note: b("A major centre for government-job exam preparation; long preparation years bring stress, sleep and mood problems.", "सरकारी नौकरी की परीक्षाओं की तैयारी का बड़ा केंद्र; लंबी तैयारी से तनाव, नींद और मूड की समस्याएँ होती हैं।") },
      { name: b("Meerut", "मेरठ"), note: b("Families in western UP can consult in Hindi about de-addiction and youth behaviour.", "पश्चिमी UP के परिवार नशा मुक्ति और युवाओं के व्यवहार पर हिंदी में परामर्श ले सकते हैं।") },
      { name: b("Noida", "नोएडा"), note: b("IT and media professionals with long hours often seek help for burnout, anxiety and sleep.", "लंबे घंटे काम करने वाले IT और मीडिया पेशेवर अक्सर बर्नआउट, घबराहट और नींद के लिए मदद लेते हैं।") },
      { name: b("Ghaziabad", "ग़ाज़ियाबाद"), note: b("Commuters to Delhi save a day's leave by consulting online.", "दिल्ली आने-जाने वाले ऑनलाइन परामर्श से छुट्टी बचाते हैं।") },
      { name: b("Gorakhpur", "गोरखपुर"), note: b("Families of workers living in other states can join the same video call.", "दूसरे राज्यों में काम करने वालों के परिवार एक ही वीडियो कॉल पर जुड़ सकते हैं।") },
      { name: b("Bareilly", "बरेली"), note: b("Confidential care for sexual health worries without visiting a local clinic.", "स्थानीय क्लिनिक गए बिना यौन स्वास्थ्य की चिंताओं का गोपनीय इलाज।") },
    ],
    concerns: [
      b("Competitive-exam stress and long preparation years", "प्रतियोगी परीक्षाओं का तनाव और लंबी तैयारी"),
      b("Alcohol, smack and tablet misuse in young people", "युवाओं में शराब, स्मैक और गोलियों का ग़लत इस्तेमाल"),
      b("Depression and anxiety that families hesitate to discuss", "डिप्रेशन और घबराहट जिन पर परिवार बात करने से हिचकते हैं"),
    ],
    topics: ["depression-treatment-india", "neet-exam-stress-india", "alcohol-addiction-treatment-india", "smack-addiction-treatment-india", "sex-specialist-india", "online-psychiatrist-india"],
    faqs: [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ],
  },
  {
    slug: "madhya-pradesh",
    name: b("Madhya Pradesh", "मध्य प्रदेश"),
    title: b("Online Psychiatrist for Madhya Pradesh – Indore, Bhopal & More", "मध्य प्रदेश के लिए ऑनलाइन मनोचिकित्सक – इंदौर, भोपाल आदि"),
    h1: b("Online psychiatry consultation for Madhya Pradesh", "मध्य प्रदेश के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Confidential Hindi video consultation for Madhya Pradesh: depression, anxiety, OCD, addiction, sexual health and student stress. Indore, Bhopal, Gwalior, Jabalpur and more.",
      "मध्य प्रदेश के लिए गोपनीय हिंदी वीडियो परामर्श: डिप्रेशन, घबराहट, OCD, नशा, यौन स्वास्थ्य और छात्रों का तनाव। इंदौर, भोपाल, ग्वालियर, जबलपुर आदि।"
    ),
    intro: [
      b("Madhya Pradesh borders Rajasthan, and many families share the same language and concerns. Online consultation brings specialist assessment to towns where a psychiatrist may be a day's travel away.", "मध्य प्रदेश राजस्थान से लगा है और कई परिवारों की भाषा और चिंताएँ एक जैसी हैं। ऑनलाइन परामर्श उन शहरों तक विशेषज्ञ जाँच पहुँचाता है जहाँ मनोचिकित्सक तक पहुँचने में पूरा दिन लग सकता है।"),
      b("There is no clinic in Madhya Pradesh — consultations are by private video from Ajmer.", "मध्य प्रदेश में कोई क्लिनिक नहीं है — परामर्श अजमेर से निजी वीडियो पर होता है।"),
    ],
    cities: [
      { name: b("Indore", "इंदौर"), note: b("A growing coaching and IT city; students and young professionals form a large share of consultations.", "बढ़ता कोचिंग और IT शहर; छात्र और युवा पेशेवर बड़ी संख्या में परामर्श लेते हैं।") },
      { name: b("Bhopal", "भोपाल"), note: b("Government employees and their families can consult privately without being seen at a clinic.", "सरकारी कर्मचारी और उनके परिवार क्लिनिक में दिखे बिना निजी परामर्श ले सकते हैं।") },
      { name: b("Gwalior", "ग्वालियर"), note: b("Near the Rajasthan border — alcohol and opioid de-addiction follow-ups by video.", "राजस्थान सीमा के पास — शराब और अफ़ीम नशा मुक्ति के फॉलो-अप वीडियो पर।") },
      { name: b("Jabalpur", "जबलपुर"), note: b("Families in eastern MP can include relatives from other cities in the same call.", "पूर्वी MP के परिवार दूसरे शहरों के रिश्तेदारों को उसी कॉल में जोड़ सकते हैं।") },
      { name: b("Ujjain", "उज्जैन"), note: b("Older adults with memory or sleep problems can be assessed with a family member present.", "याददाश्त या नींद की समस्या वाले बुज़ुर्गों की जाँच परिवार के सदस्य के साथ हो सकती है।") },
      { name: b("Sagar", "सागर"), note: b("University students can consult confidentially about exam stress and mood.", "विश्वविद्यालय के छात्र परीक्षा के तनाव और मूड पर गोपनीय परामर्श ले सकते हैं।") },
      { name: b("Ratlam", "रतलाम"), note: b("Part of the Malwa region where afeem and doda post use is a familiar concern.", "मालवा क्षेत्र का हिस्सा जहाँ अफ़ीम और डोडा पोस्त का इस्तेमाल जानी-पहचानी चिंता है।") },
      { name: b("Rewa", "रीवा"), note: b("Video consultation avoids long travel for regular follow-ups.", "वीडियो परामर्श से नियमित फॉलो-अप के लिए लंबी यात्रा नहीं करनी पड़ती।") },
    ],
    concerns: [
      b("Afeem and doda post dependence in the Malwa belt", "मालवा क्षेत्र में अफ़ीम और डोडा पोस्त की लत"),
      b("Student stress in coaching cities", "कोचिंग शहरों में छात्रों का तनाव"),
      b("Memory problems and depression in older adults", "बुज़ुर्गों में याददाश्त की समस्या और डिप्रेशन"),
    ],
    topics: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "exam-anxiety-students-india", "alzheimers-disease-india", "depression-treatment-india", "online-psychiatrist-india"],
    faqs: [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ],
  },
  {
    slug: "haryana",
    name: b("Haryana", "हरियाणा"),
    title: b("Online Psychiatrist for Haryana – Gurugram, Faridabad, Rohtak", "हरियाणा के लिए ऑनलाइन मनोचिकित्सक – गुरुग्राम, फ़रीदाबाद, रोहतक"),
    h1: b("Online psychiatry consultation for Haryana", "हरियाणा के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private video consultation for Haryana in Hindi or English — workplace stress, anxiety, depression, de-addiction and sexual health. Gurugram, Faridabad, Rohtak, Hisar and more.",
      "हरियाणा के लिए हिंदी या अंग्रेज़ी में निजी वीडियो परामर्श — काम का तनाव, घबराहट, डिप्रेशन, नशा मुक्ति और यौन स्वास्थ्य। गुरुग्राम, फ़रीदाबाद, रोहतक, हिसार आदि।"
    ),
    intro: [
      b("Haryana combines fast-paced corporate cities with farming districts. Both groups often put off seeking help — online consultation removes travel and waiting time.", "हरियाणा में तेज़ रफ़्तार कॉर्पोरेट शहर और खेती वाले ज़िले दोनों हैं। दोनों तरह के लोग अक्सर मदद लेने में देर करते हैं — ऑनलाइन परामर्श से सफ़र और इंतज़ार ख़त्म होता है।"),
      b("No clinic is claimed in Haryana; all consultations are by video.", "हरियाणा में किसी क्लिनिक का दावा नहीं है; सभी परामर्श वीडियो पर हैं।"),
    ],
    cities: [
      { name: b("Gurugram", "गुरुग्राम"), note: b("Corporate professionals commonly seek help for burnout, panic, insomnia and alcohol use.", "कॉर्पोरेट पेशेवर अक्सर बर्नआउट, पैनिक, अनिद्रा और शराब के लिए मदद लेते हैं।") },
      { name: b("Faridabad", "फ़रीदाबाद"), note: b("Industrial shift workers can book slots around changing shifts.", "औद्योगिक शिफ़्ट कर्मचारी बदलती शिफ़्ट के हिसाब से स्लॉट बुक कर सकते हैं।") },
      { name: b("Rohtak", "रोहतक"), note: b("Medical and university students can consult confidentially, away from their campus.", "मेडिकल और विश्वविद्यालय के छात्र अपने कैंपस से दूर गोपनीय परामर्श ले सकते हैं।") },
      { name: b("Hisar", "हिसार"), note: b("Close to Rajasthan's Hanumangarh–Churu belt; similar concerns about doda post and smack.", "राजस्थान के हनुमानगढ़–चूरू क्षेत्र के पास; डोडा पोस्त और स्मैक की मिलती-जुलती चिंताएँ।") },
      { name: b("Karnal", "करनाल"), note: b("Farming families can include several relatives in one family session.", "किसान परिवार एक फ़ैमिली सेशन में कई रिश्तेदारों को जोड़ सकते हैं।") },
      { name: b("Panipat", "पानीपत"), note: b("Textile-industry workers and traders can consult after working hours.", "कपड़ा उद्योग के कर्मचारी और व्यापारी काम के बाद परामर्श ले सकते हैं।") },
      { name: b("Sonipat", "सोनीपत"), note: b("Students in the Sonipat education hub can get help for exam anxiety and homesickness.", "सोनीपत शिक्षा केंद्र के छात्र परीक्षा की घबराहट और घर की याद के लिए मदद ले सकते हैं।") },
      { name: b("Ambala", "अंबाला"), note: b("Defence families and older adults can consult with family support on the call.", "रक्षा सेवाओं से जुड़े परिवार और बुज़ुर्ग परिवार के साथ कॉल पर परामर्श ले सकते हैं।") },
    ],
    concerns: [
      b("Workplace stress and burnout in the NCR corporate belt", "NCR कॉर्पोरेट क्षेत्र में काम का तनाव और बर्नआउट"),
      b("Substance use in young people", "युवाओं में नशे का इस्तेमाल"),
      b("Anxiety, panic and sleep problems", "घबराहट, पैनिक और नींद की समस्या"),
    ],
    topics: ["workplace-stress-india", "panic-disorder-treatment-india", "insomnia-treatment-india", "smack-addiction-treatment-india", "alcohol-addiction-treatment-india", "online-psychiatrist-india"],
    faqs: [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ],
  },
  {
    slug: "punjab",
    name: b("Punjab", "पंजाब"),
    title: b("Online Psychiatrist & De-addiction Consultation for Punjab", "पंजाब के लिए ऑनलाइन मनोचिकित्सक और नशा मुक्ति परामर्श"),
    h1: b("Online psychiatry and de-addiction consultation for Punjab", "पंजाब के लिए ऑनलाइन मनोरोग और नशा मुक्ति परामर्श"),
    description: b(
      "Confidential video consultation for Punjab: de-addiction (chitta, opioids, alcohol), depression, anxiety and family support, in Hindi or English. Ludhiana, Amritsar, Jalandhar and more.",
      "पंजाब के लिए गोपनीय वीडियो परामर्श: नशा मुक्ति (चिट्टा, ओपिऑइड, शराब), डिप्रेशन, घबराहट और परिवार का साथ, हिंदी या अंग्रेज़ी में। लुधियाना, अमृतसर, जालंधर आदि।"
    ),
    intro: [
      b("Substance use — especially opioids such as heroin ('chitta') — is a widely discussed concern in Punjab. Many families want discreet, medical help rather than force or unregulated centres.", "नशा — ख़ासकर हेरोइन ('चिट्टा') जैसे ओपिऑइड — पंजाब में व्यापक रूप से चर्चित चिंता है। कई परिवार ज़बरदस्ती या बिना नियमन वाले केंद्रों के बजाय गोपनीय, डॉक्टरी मदद चाहते हैं।"),
      b("Consultations are in Hindi or English (not Punjabi), by video from Ajmer. Opioid substitution therapy itself is provided at licensed local centres; we help with assessment, planning and follow-up.", "परामर्श हिंदी या अंग्रेज़ी में (पंजाबी में नहीं) अजमेर से वीडियो पर होता है। ओपिऑइड सब्स्टिट्यूशन थेरेपी लाइसेंसशुदा स्थानीय केंद्रों पर मिलती है; हम जाँच, योजना और फॉलो-अप में मदद करते हैं।"),
    ],
    cities: [
      { name: b("Ludhiana", "लुधियाना"), note: b("Industrial and business families can consult discreetly after work hours.", "औद्योगिक और व्यापारी परिवार काम के बाद गोपनीय परामर्श ले सकते हैं।") },
      { name: b("Amritsar", "अमृतसर"), note: b("Families in the border belt often ask about chitta and how to support a relative through treatment.", "सीमा क्षेत्र के परिवार अक्सर चिट्टा और इलाज में रिश्तेदार का साथ कैसे दें, इसके बारे में पूछते हैं।") },
      { name: b("Jalandhar", "जालंधर"), note: b("Many households have family members abroad who can join the same video call.", "कई परिवारों के सदस्य विदेश में हैं जो उसी वीडियो कॉल में जुड़ सकते हैं।") },
      { name: b("Patiala", "पटियाला"), note: b("Students and young adults can get confidential help for anxiety, mood and substance use.", "छात्र और युवा घबराहट, मूड और नशे के लिए गोपनीय मदद ले सकते हैं।") },
      { name: b("Bathinda", "बठिंडा"), note: b("Close to Rajasthan's Sri Ganganagar belt; farming families can consult together.", "राजस्थान के श्रीगंगानगर क्षेत्र के पास; किसान परिवार साथ मिलकर परामर्श ले सकते हैं।") },
      { name: b("Mohali", "मोहाली"), note: b("IT and service-sector professionals often seek help for stress and sleep.", "IT और सर्विस सेक्टर के पेशेवर अक्सर तनाव और नींद के लिए मदद लेते हैं।") },
      { name: b("Pathankot", "पठानकोट"), note: b("Defence families and older adults can consult without travelling to a larger city.", "रक्षा सेवाओं से जुड़े परिवार और बुज़ुर्ग बड़े शहर गए बिना परामर्श ले सकते हैं।") },
    ],
    concerns: [
      b("Opioid (chitta) and prescription drug misuse", "ओपिऑइड (चिट्टा) और डॉक्टरी दवाओं का ग़लत इस्तेमाल"),
      b("Alcohol dependence", "शराब की लत"),
      b("Families separated by migration abroad", "विदेश जाने से बिखरे परिवार"),
    ],
    topics: ["heroin-addiction-treatment-india", "smack-addiction-treatment-india", "alcohol-addiction-treatment-india", "relapse-prevention-counselling-india", "family-therapy-india", "online-psychiatrist-india"],
    faqs: [
      faq("Do you run a rehab centre in Punjab?", "क्या पंजाब में आपका रिहैब सेंटर है?", "No. We offer online psychiatric consultation only. If admission is needed, we advise choosing a licensed facility that does not use force or punishment.", "नहीं। हम सिर्फ़ ऑनलाइन मनोरोग परामर्श देते हैं। भर्ती ज़रूरी हो तो ऐसी लाइसेंसशुदा जगह चुनने की सलाह देते हैं जहाँ ज़बरदस्ती या सज़ा न हो।"),
      ELIGIBILITY_FAQ,
      EMERGENCY_FAQ,
    ],
  },
  {
    slug: "delhi-ncr",
    name: b("Delhi-NCR", "दिल्ली-NCR"),
    title: b("Online Psychiatrist for Delhi-NCR – Private Video Consultation", "दिल्ली-NCR के लिए ऑनलाइन मनोचिकित्सक – निजी वीडियो परामर्श"),
    h1: b("Online psychiatry consultation for Delhi and the NCR", "दिल्ली और NCR के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private video consultation for Delhi, New Delhi, Noida, Greater Noida, Gurugram, Ghaziabad and Faridabad — anxiety, depression, burnout, addiction and sexual health.",
      "दिल्ली, नई दिल्ली, नोएडा, ग्रेटर नोएडा, गुरुग्राम, ग़ाज़ियाबाद और फ़रीदाबाद के लिए निजी वीडियो परामर्श — घबराहट, डिप्रेशन, बर्नआउट, नशा और यौन स्वास्थ्य।"
    ),
    intro: [
      b("In Delhi-NCR, traffic and long working hours are often the biggest barriers to seeing a psychiatrist. A video consultation fits into a lunch break or an evening at home.", "दिल्ली-NCR में ट्रैफ़िक और लंबे काम के घंटे अक्सर मनोचिकित्सक से मिलने की सबसे बड़ी रुकावट होते हैं। वीडियो परामर्श लंच ब्रेक या घर पर शाम में हो सकता है।"),
      b("There is no clinic in Delhi-NCR; all consultations are online, with e-prescriptions sent on WhatsApp or email.", "दिल्ली-NCR में कोई क्लिनिक नहीं है; सभी परामर्श ऑनलाइन हैं और ई-प्रिस्क्रिप्शन WhatsApp या ईमेल पर भेजा जाता है।"),
    ],
    cities: [
      { name: b("Delhi", "दिल्ली"), note: b("Students preparing for civil services and other exams often seek help for stress, sleep and low mood.", "सिविल सेवा और दूसरी परीक्षाओं की तैयारी करने वाले छात्र अक्सर तनाव, नींद और उदासी के लिए मदद लेते हैं।") },
      { name: b("New Delhi", "नई दिल्ली"), note: b("Senior professionals value discreet consultation outside office hours.", "वरिष्ठ पेशेवर ऑफ़िस समय के बाद गोपनीय परामर्श को महत्व देते हैं।") },
      { name: b("Noida", "नोएडा"), note: b("Tech and media workers with night shifts can choose late slots.", "नाइट शिफ़्ट वाले टेक और मीडिया कर्मचारी देर के स्लॉट चुन सकते हैं।") },
      { name: b("Greater Noida", "ग्रेटर नोएडा"), note: b("Students in university campuses can consult privately from their hostel.", "विश्वविद्यालय कैंपस के छात्र हॉस्टल से निजी परामर्श ले सकते हैं।") },
      { name: b("Gurugram", "गुरुग्राम"), note: b("Burnout, panic attacks and alcohol use are common reasons to consult.", "बर्नआउट, पैनिक अटैक और शराब परामर्श के आम कारण हैं।") },
      { name: b("Ghaziabad", "ग़ाज़ियाबाद"), note: b("Families can join from different parts of the NCR in one call.", "परिवार NCR के अलग-अलग हिस्सों से एक कॉल में जुड़ सकते हैं।") },
      { name: b("Faridabad", "फ़रीदाबाद"), note: b("Shift workers and small-business owners can book around their work.", "शिफ़्ट कर्मचारी और छोटे व्यापारी अपने काम के हिसाब से बुक कर सकते हैं।") },
    ],
    concerns: [
      b("Burnout, anxiety and panic attacks", "बर्नआउट, घबराहट और पैनिक अटैक"),
      b("Insomnia and screen overuse", "अनिद्रा और स्क्रीन का ज़्यादा इस्तेमाल"),
      b("Alcohol and relationship stress", "शराब और रिश्तों का तनाव"),
    ],
    topics: ["workplace-stress-india", "panic-disorder-treatment-india", "insomnia-treatment-india", "social-media-overuse-india", "couples-therapy-india", "online-psychiatrist-india"],
    faqs: [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ],
  },
  {
    slug: "india",
    name: b("All India", "पूरा भारत"),
    title: b("Online Psychiatrist India – Mental Health Consultation Across India", "ऑनलाइन मनोचिकित्सक भारत – पूरे भारत में मानसिक स्वास्थ्य परामर्श"),
    h1: b("Online psychiatry consultation across India", "पूरे भारत में ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private online psychiatrist consultation anywhere in India: depression, anxiety, OCD, bipolar, ADHD, de-addiction, sexual health and psychotherapy — in Hindi or English.",
      "भारत में कहीं से भी निजी ऑनलाइन मनोरोग परामर्श: डिप्रेशन, घबराहट, OCD, बाइपोलर, ADHD, नशा मुक्ति, यौन स्वास्थ्य और साइकोथेरेपी — हिंदी या अंग्रेज़ी में।"
    ),
    intro: [
      b("Wherever you live in India, you can consult Dr. Kuldeep Budania (MBBS, MD Psychiatry) by private video in Hindi or English, and receive a verified e-prescription.", "आप भारत में कहीं भी रहें, डॉ. कुलदीप बुडानिया (MBBS, MD मनोचिकित्सा) से हिंदी या अंग्रेज़ी में निजी वीडियो परामर्श ले सकते हैं और जाँचने योग्य ई-प्रिस्क्रिप्शन पा सकते हैं।"),
      b("Consultations happen online from Ajmer, Rajasthan. Patients in metro cities often choose online care for privacy and convenience.", "परामर्श अजमेर, राजस्थान से ऑनलाइन होता है। मेट्रो शहरों के मरीज़ अक्सर गोपनीयता और सुविधा के लिए ऑनलाइन इलाज चुनते हैं।"),
    ],
    cities: [
      { name: b("Mumbai", "मुंबई"), note: b("Long commutes make a video consultation at home or office far easier.", "लंबे सफ़र की वजह से घर या ऑफ़िस से वीडियो परामर्श कहीं आसान है।") },
      { name: b("Pune", "पुणे"), note: b("Students and IT professionals from North India often prefer a Hindi-speaking psychiatrist.", "उत्तर भारत के छात्र और IT पेशेवर अक्सर हिंदी बोलने वाले मनोचिकित्सक को पसंद करते हैं।") },
      { name: b("Ahmedabad", "अहमदाबाद"), note: b("Business families can consult discreetly after working hours.", "व्यापारी परिवार काम के बाद गोपनीय परामर्श ले सकते हैं।") },
      { name: b("Surat", "सूरत"), note: b("Many Rajasthani families live in Surat and like consulting in familiar language.", "सूरत में कई राजस्थानी परिवार रहते हैं जो जानी-पहचानी भाषा में परामर्श पसंद करते हैं।") },
      { name: b("Bengaluru", "बेंगलुरु"), note: b("Tech professionals commonly seek help for burnout, anxiety and sleep.", "टेक पेशेवर अक्सर बर्नआउट, घबराहट और नींद के लिए मदद लेते हैं।") },
      { name: b("Hyderabad", "हैदराबाद"), note: b("Hindi-speaking professionals and students can consult in Hindi.", "हिंदी भाषी पेशेवर और छात्र हिंदी में परामर्श ले सकते हैं।") },
      { name: b("Chennai", "चेन्नई"), note: b("Consultations are in Hindi or English; families elsewhere can join the call.", "परामर्श हिंदी या अंग्रेज़ी में; दूसरी जगह रहने वाले परिवारजन कॉल में जुड़ सकते हैं।") },
      { name: b("Kolkata", "कोलकाता"), note: b("Marwari and other Hindi-speaking families often prefer consulting in Hindi.", "मारवाड़ी और दूसरे हिंदी भाषी परिवार अक्सर हिंदी में परामर्श पसंद करते हैं।") },
      { name: b("Chandigarh", "चंडीगढ़"), note: b("Families from Punjab and Haryana can consult together by video.", "पंजाब और हरियाणा के परिवार साथ मिलकर वीडियो पर परामर्श ले सकते हैं।") },
      { name: b("Dehradun", "देहरादून"), note: b("Students in boarding schools and colleges can consult with parents joining remotely.", "बोर्डिंग स्कूल और कॉलेज के छात्र माता-पिता को दूर से जोड़कर परामर्श ले सकते हैं।") },
    ],
    concerns: [
      b("Depression and anxiety", "डिप्रेशन और घबराहट"),
      b("OCD and bipolar disorder", "OCD और बाइपोलर"),
      b("ADHD and child psychiatry", "ADHD और बच्चों की मनोचिकित्सा"),
      b("De-addiction and sexual health", "नशा मुक्ति और यौन स्वास्थ्य"),
      b("Psychotherapy and counselling", "साइकोथेरेपी और काउंसलिंग"),
    ],
    topics: ["online-psychiatrist-india", "online-psychiatry-consultation", "depression-treatment-india", "generalized-anxiety-disorder-india", "ocd-treatment-india", "bipolar-disorder-psychiatrist-india", "adhd-psychiatrist-india", "child-psychiatrist-india", "deaddiction-psychiatrist-india", "sex-specialist-india", "psychotherapy-counselling"],
    faqs: [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ],
  },
];

export const REGION_BY_SLUG = new Map(REGIONS.map((r) => [r.slug, r]));
