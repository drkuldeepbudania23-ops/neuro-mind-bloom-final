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
  /** "district" hubs list blocks instead of cities. */
  kind?: "district";
  /** Overrides the default "online only — no clinic in this region" line. */
  online?: L10n;
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


// ───────────── More major cities for each state hub, and more North-India state hubs ─────────────
const c = (en: string, hi: string, noteEn: string, noteHi: string): RegionCity => ({ name: b(en, hi), note: b(noteEn, noteHi) });

const MORE_CITIES: Record<string, RegionCity[]> = {
  "uttar-pradesh": [
    c("Aligarh", "अलीगढ़", "University students can consult confidentially from their hostel.", "विश्वविद्यालय के छात्र हॉस्टल से गोपनीय परामर्श ले सकते हैं।"),
    c("Mathura", "मथुरा", "Close to Rajasthan — the same Hindi-speaking care, from home.", "राजस्थान के पास — वही हिंदी परामर्श, घर से।"),
    c("Firozabad", "फ़िरोज़ाबाद", "Glass-industry shift workers can book around their duty.", "काँच उद्योग के शिफ़्ट कर्मचारी ड्यूटी के हिसाब से बुक कर सकते हैं।"),
    c("Moradabad", "मुरादाबाद", "Traders and artisans can consult outside work hours.", "व्यापारी और कारीगर काम के समय के बाद परामर्श ले सकते हैं।"),
    c("Saharanpur", "सहारनपुर", "Families can discuss youth drug use privately in Hindi.", "परिवार युवाओं के नशे पर हिंदी में निजी बात कर सकते हैं।"),
    c("Muzaffarnagar", "मुज़फ़्फ़रनगर", "Farming families can book an evening slot.", "किसान परिवार शाम का स्लॉट बुक कर सकते हैं।"),
    c("Jhansi", "झाँसी", "Bundelkhand patients save a long journey to a big city.", "बुंदेलखंड के मरीज़ों का बड़े शहर तक का लंबा सफ़र बचता है।"),
    c("Ayodhya", "अयोध्या", "Older adults can be assessed with a family member on the call.", "बुज़ुर्गों की जाँच परिवार के सदस्य के साथ कॉल पर हो सकती है।"),
    c("Shahjahanpur", "शाहजहाँपुर", "Confidential help for alcohol and tablet dependence.", "शराब और गोलियों की लत के लिए गोपनीय मदद।"),
    c("Rampur", "रामपुर", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
    c("Etawah", "इटावा", "Students can consult about exam stress and sleep.", "छात्र परीक्षा के तनाव और नींद पर परामर्श ले सकते हैं।"),
    c("Mirzapur", "मिर्ज़ापुर", "Families in eastern UP can include relatives from other cities.", "पूर्वी UP के परिवार दूसरे शहरों के रिश्तेदारों को जोड़ सकते हैं।"),
    c("Azamgarh", "आज़मगढ़", "Families of workers in the Gulf can consult together by video.", "खाड़ी देशों में काम करने वालों के परिवार साथ वीडियो परामर्श ले सकते हैं।"),
    c("Sultanpur", "सुल्तानपुर", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
  ],
  "madhya-pradesh": [
    c("Mandsaur", "मंदसौर", "Part of the licensed opium belt — confidential help for afeem and doda dependence.", "लाइसेंसशुदा अफ़ीम क्षेत्र का हिस्सा — अफ़ीम और डोडा की लत के लिए गोपनीय मदद।"),
    c("Neemuch", "नीमच", "Close to Chittorgarh — families can discuss doda post use in Hindi.", "चित्तौड़गढ़ के पास — परिवार डोडा पोस्त पर हिंदी में बात कर सकते हैं।"),
    c("Dewas", "देवास", "Industrial workers can book slots around shifts.", "औद्योगिक कर्मचारी शिफ़्ट के हिसाब से स्लॉट बुक कर सकते हैं।"),
    c("Satna", "सतना", "Cement-industry families can consult without long travel.", "सीमेंट उद्योग से जुड़े परिवार बिना लंबे सफ़र के परामर्श ले सकते हैं।"),
    c("Katni", "कटनी", "Railway-junction town — follow-ups from home.", "रेलवे जंक्शन शहर — घर से फॉलो-अप।"),
    c("Chhindwara", "छिंदवाड़ा", "Tribal and rural families can reach a specialist by phone video.", "आदिवासी और ग्रामीण परिवार फ़ोन वीडियो से विशेषज्ञ तक पहुँच सकते हैं।"),
    c("Shivpuri", "शिवपुरी", "Saves a long trip to Gwalior for each visit.", "हर बार ग्वालियर के लंबे सफ़र से बचाव।"),
    c("Morena", "मुरैना", "Near Rajasthan — alcohol de-addiction follow-ups by video.", "राजस्थान के पास — शराब नशा मुक्ति के फॉलो-अप वीडियो पर।"),
    c("Bhind", "भिंड", "Families can discuss youth behaviour and drug use privately.", "परिवार युवाओं के व्यवहार और नशे पर निजी बात कर सकते हैं।"),
    c("Vidisha", "विदिशा", "Close to Bhopal — still saves travel and waiting.", "भोपाल के पास — फिर भी सफ़र और इंतज़ार बचता है।"),
    c("Guna", "गुना", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
    c("Khandwa", "खंडवा", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
    c("Burhanpur", "बुरहानपुर", "Textile workers can consult around shifts.", "कपड़ा कर्मचारी शिफ़्ट के हिसाब से परामर्श ले सकते हैं।"),
    c("Singrauli", "सिंगरौली", "Mining and power-plant workers can get help for sleep and alcohol use.", "खनन और बिजलीघर कर्मचारी नींद और शराब के लिए मदद ले सकते हैं।"),
  ],
  haryana: [
    c("Sirsa", "सिरसा", "Close to Punjab and Rajasthan — families ask about chitta and doda use.", "पंजाब और राजस्थान के पास — परिवार चिट्टा और डोडा के बारे में पूछते हैं।"),
    c("Fatehabad", "फ़तेहाबाद", "Young people can consult confidentially about drug use.", "युवा नशे पर गोपनीय परामर्श ले सकते हैं।"),
    c("Bhiwani", "भिवानी", "Students and sportspeople can consult about stress and sleep.", "छात्र और खिलाड़ी तनाव और नींद पर परामर्श ले सकते हैं।"),
    c("Jind", "जींद", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
    c("Kaithal", "कैथल", "Rural patients save a long trip to a big city.", "ग्रामीण मरीज़ों का बड़े शहर का लंबा सफ़र बचता है।"),
    c("Kurukshetra", "कुरुक्षेत्र", "University students can consult from campus.", "विश्वविद्यालय के छात्र कैंपस से परामर्श ले सकते हैं।"),
    c("Yamunanagar", "यमुनानगर", "Industrial workers can book around shifts.", "औद्योगिक कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
    c("Panchkula", "पंचकूला", "Professionals can consult discreetly after office hours.", "पेशेवर ऑफ़िस के बाद गोपनीय परामर्श ले सकते हैं।"),
    c("Rewari", "रेवाड़ी", "Near the Rajasthan border — the same Hindi care.", "राजस्थान सीमा के पास — वही हिंदी परामर्श।"),
    c("Narnaul (Mahendragarh)", "नारनौल (महेंद्रगढ़)", "Families of servicemen can consult privately.", "फ़ौजी परिवार निजी परामर्श ले सकते हैं।"),
    c("Jhajjar", "झज्जर", "Factory workers in Bahadurgarh can book flexible slots.", "बहादुरगढ़ के फ़ैक्ट्री कर्मचारी सुविधाजनक स्लॉट बुक कर सकते हैं।"),
    c("Palwal", "पलवल", "Families can consult without travelling into Delhi.", "परिवार दिल्ली गए बिना परामर्श ले सकते हैं।"),
  ],
  punjab: [
    c("Firozpur", "फ़िरोज़पुर", "Border-district families can seek confidential help for chitta use.", "सीमावर्ती ज़िले के परिवार चिट्टा के लिए गोपनीय मदद ले सकते हैं।"),
    c("Fazilka", "फ़ाज़िल्का", "Close to Sri Ganganagar — Hindi or Punjabi consultation.", "श्रीगंगानगर के पास — हिंदी या पंजाबी में परामर्श।"),
    c("Abohar", "अबोहर", "Families near the Rajasthan border can consult from home.", "राजस्थान सीमा के पास के परिवार घर से परामर्श ले सकते हैं।"),
    c("Sri Muktsar Sahib", "श्री मुक्तसर साहिब", "Young people can consult confidentially about drug use.", "युवा नशे पर गोपनीय परामर्श ले सकते हैं।"),
    c("Moga", "मोगा", "Families of NRIs can join the same call from abroad.", "NRI परिवार विदेश से उसी कॉल पर जुड़ सकते हैं।"),
    c("Faridkot", "फ़रीदकोट", "Students can consult about stress, sleep and mood.", "छात्र तनाव, नींद और मूड पर परामर्श ले सकते हैं।"),
    c("Tarn Taran", "तरन तारन", "Chitta and tablet misuse can be discussed with the family present.", "चिट्टा और गोलियों के इस्तेमाल पर परिवार की मौजूदगी में बात हो सकती है।"),
    c("Gurdaspur", "गुरदासपुर", "Border-area patients save a long journey.", "सीमा क्षेत्र के मरीज़ों का लंबा सफ़र बचता है।"),
    c("Hoshiarpur", "होशियारपुर", "Older parents of NRIs can consult with children joining from abroad.", "NRI बच्चों को विदेश से जोड़कर बुज़ुर्ग माता-पिता परामर्श ले सकते हैं।"),
    c("Kapurthala", "कपूरथला", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
    c("Sangrur", "संगरूर", "Farming families can book an evening slot.", "किसान परिवार शाम का स्लॉट बुक कर सकते हैं।"),
    c("Barnala", "बरनाला", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    c("Mansa", "मानसा", "Families can seek help for alcohol and opioid use confidentially.", "परिवार शराब और अफ़ीम-स्मैक के लिए गोपनीय मदद ले सकते हैं।"),
    c("Rupnagar (Ropar)", "रूपनगर (रोपड़)", "Industrial workers can book around shifts.", "औद्योगिक कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
  ],
  "delhi-ncr": [
    c("Mukherjee Nagar", "मुखर्जी नगर", "Civil-services aspirants can consult about stress, sleep and low mood.", "सिविल सेवा की तैयारी करने वाले तनाव, नींद और उदासी पर परामर्श ले सकते हैं।"),
    c("Old Rajinder Nagar", "ओल्ड राजिंदर नगर", "Students in PG rooms can consult privately.", "PG में रहने वाले छात्र निजी परामर्श ले सकते हैं।"),
    c("Laxmi Nagar", "लक्ष्मी नगर", "Coaching students and young professionals can book evening slots.", "कोचिंग छात्र और युवा पेशेवर शाम के स्लॉट बुक कर सकते हैं।"),
    c("Rohini", "रोहिणी", "Families in north-west Delhi can consult without the commute.", "उत्तर-पश्चिम दिल्ली के परिवार बिना आने-जाने के परामर्श ले सकते हैं।"),
    c("Dwarka", "द्वारका", "Airport and corporate shift workers can choose late slots.", "एयरपोर्ट और कॉर्पोरेट शिफ़्ट कर्मचारी देर के स्लॉट चुन सकते हैं।"),
    c("Janakpuri", "जनकपुरी", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
    c("Karol Bagh", "करोल बाग़", "Traders can consult outside market hours.", "व्यापारी बाज़ार के समय के बाद परामर्श ले सकते हैं।"),
    c("Saket", "साकेत", "Professionals value discreet consultation from home.", "पेशेवर घर से गोपनीय परामर्श को महत्व देते हैं।"),
    c("Shahdara", "शाहदरा", "Families in east Delhi can consult in Hindi.", "पूर्वी दिल्ली के परिवार हिंदी में परामर्श ले सकते हैं।"),
    c("Sonipat", "सोनीपत", "Students in the education city can consult confidentially.", "एजुकेशन सिटी के छात्र गोपनीय परामर्श ले सकते हैं।"),
    c("Bahadurgarh", "बहादुरगढ़", "Factory workers can consult before or after duty.", "फ़ैक्ट्री कर्मचारी ड्यूटी से पहले या बाद परामर्श ले सकते हैं।"),
    c("Meerut", "मेरठ", "Families can consult in Hindi about de-addiction.", "परिवार नशा मुक्ति पर हिंदी में परामर्श ले सकते हैं।"),
  ],
};

const NORTH_FAQS = [ELIGIBILITY_FAQ, RX_FAQ, EMERGENCY_FAQ];

const MORE_REGIONS: Region[] = [
  {
    slug: "bihar",
    name: b("Bihar", "बिहार"),
    title: b("Online Psychiatrist for Bihar – Patna, Gaya, Muzaffarpur & More", "बिहार के लिए ऑनलाइन मनोचिकित्सक – पटना, गया, मुज़फ़्फ़रपुर आदि"),
    h1: b("Online psychiatry consultation for Bihar", "बिहार के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private Hindi video consultation for Bihar — depression, anxiety, exam stress, de-addiction and sexual health. Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga and more.",
      "बिहार के लिए हिंदी में निजी वीडियो परामर्श — डिप्रेशन, घबराहट, परीक्षा का तनाव, नशा मुक्ति और यौन स्वास्थ्य। पटना, गया, भागलपुर, मुज़फ़्फ़रपुर, दरभंगा आदि।"
    ),
    intro: [
      b("Many families in Bihar have a child preparing for competitive exams or a member working in another state. Alcohol has been prohibited in Bihar since 2016, yet dependence, withdrawal and other substance use still need proper, confidential treatment.", "बिहार के कई परिवारों में कोई बच्चा प्रतियोगी परीक्षा की तैयारी कर रहा होता है या कोई सदस्य दूसरे राज्य में काम करता है। 2016 से बिहार में शराबबंदी है, फिर भी लत, उसे छोड़ते समय की तकलीफ़ और दूसरे नशों का सही और गोपनीय इलाज ज़रूरी है।"),
      b("There is no clinic in Bihar — consultations are by private video from Ajmer, in Hindi.", "बिहार में कोई क्लिनिक नहीं है — परामर्श अजमेर से हिंदी में निजी वीडियो पर होता है।"),
    ],
    cities: [
      c("Patna", "पटना", "Exam aspirants and professionals can consult privately in the evening.", "परीक्षा की तैयारी करने वाले और पेशेवर शाम को निजी परामर्श ले सकते हैं।"),
      c("Gaya", "गया", "Families can include relatives from other states on the same call.", "परिवार दूसरे राज्यों के रिश्तेदारों को उसी कॉल पर जोड़ सकते हैं।"),
      c("Bhagalpur", "भागलपुर", "Students and older adults can both consult from home.", "छात्र और बुज़ुर्ग दोनों घर से परामर्श ले सकते हैं।"),
      c("Muzaffarpur", "मुज़फ़्फ़रपुर", "Traders can consult outside market hours.", "व्यापारी बाज़ार के समय के बाद परामर्श ले सकते हैं।"),
      c("Darbhanga", "दरभंगा", "Mithila families can consult in Hindi without travelling to Patna.", "मिथिला के परिवार पटना गए बिना हिंदी में परामर्श ले सकते हैं।"),
      c("Purnia", "पूर्णिया", "Saves a long journey for regular follow-ups.", "नियमित फॉलो-अप में लंबा सफ़र बचता है।"),
      c("Begusarai", "बेगूसराय", "Industrial workers can book around shifts.", "औद्योगिक कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
      c("Arrah", "आरा", "Families can discuss youth drug and tablet use privately.", "परिवार युवाओं के नशे और गोलियों पर निजी बात कर सकते हैं।"),
      c("Katihar", "कटिहार", "Railway employees can choose slots around duty.", "रेलवे कर्मचारी ड्यूटी के हिसाब से स्लॉट चुन सकते हैं।"),
      c("Munger", "मुंगेर", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      c("Chhapra", "छपरा", "Families of workers in other states can consult together.", "दूसरे राज्यों में काम करने वालों के परिवार साथ परामर्श ले सकते हैं।"),
      c("Sasaram", "सासाराम", "Students can consult about exam stress and sleep.", "छात्र परीक्षा के तनाव और नींद पर परामर्श ले सकते हैं।"),
      c("Hajipur", "हाजीपुर", "Close to Patna — still saves travel and waiting.", "पटना के पास — फिर भी सफ़र और इंतज़ार बचता है।"),
      c("Bihar Sharif", "बिहार शरीफ़", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      c("Siwan", "सीवान", "Families of Gulf workers can consult by video.", "खाड़ी में काम करने वालों के परिवार वीडियो पर परामर्श ले सकते हैं।"),
      c("Motihari", "मोतिहारी", "Rural patients can reach a specialist by phone video.", "ग्रामीण मरीज़ फ़ोन वीडियो से विशेषज्ञ तक पहुँच सकते हैं।"),
      c("Bettiah", "बेतिया", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    ],
    concerns: [
      b("Competitive-exam stress and long preparation years", "प्रतियोगी परीक्षाओं का तनाव और लंबी तैयारी"),
      b("Alcohol dependence and withdrawal despite prohibition, and other substance use", "शराबबंदी के बावजूद शराब की लत और उसे छोड़ने की तकलीफ़, और दूसरे नशे"),
      b("Families of workers living in other states", "दूसरे राज्यों में काम करने वालों के परिवार"),
    ],
    topics: ["student-exam-stress-india", "alcohol-addiction-treatment-india", "depression-treatment-india", "smack-addiction-treatment-india", "sex-specialist-india", "online-psychiatrist-india"],
    faqs: NORTH_FAQS,
  },
  {
    slug: "himachal-pradesh",
    name: b("Himachal Pradesh", "हिमाचल प्रदेश"),
    title: b("Online Psychiatrist for Himachal Pradesh – Shimla, Mandi, Kangra", "हिमाचल प्रदेश के लिए ऑनलाइन मनोचिकित्सक – शिमला, मंडी, कांगड़ा"),
    h1: b("Online psychiatry consultation for Himachal Pradesh", "हिमाचल प्रदेश के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private Hindi video consultation for Himachal Pradesh — chitta and alcohol de-addiction, depression, anxiety and sleep. Shimla, Mandi, Dharamshala, Solan, Kullu, Una and more.",
      "हिमाचल प्रदेश के लिए हिंदी में निजी वीडियो परामर्श — चिट्टा और शराब नशा मुक्ति, डिप्रेशन, घबराहट और नींद। शिमला, मंडी, धर्मशाला, सोलन, कुल्लू, ऊना आदि।"
    ),
    intro: [
      b("Families across Himachal increasingly ask about 'chitta' (heroin) use in young people. Mountain distances and winter roads make regular visits hard — video follow-ups help treatment continue.", "हिमाचल भर के परिवार युवाओं में 'चिट्टा' (हेरोइन) के इस्तेमाल के बारे में ज़्यादा पूछने लगे हैं। पहाड़ों की दूरी और सर्दियों की सड़कों की वजह से नियमित आना-जाना मुश्किल है — वीडियो फॉलो-अप से इलाज जारी रहता है।"),
      b("There is no clinic in Himachal Pradesh — consultations are by private video from Ajmer.", "हिमाचल प्रदेश में कोई क्लिनिक नहीं है — परामर्श अजमेर से निजी वीडियो पर होता है।"),
    ],
    cities: [
      c("Shimla", "शिमला", "Government employees can consult discreetly after office hours.", "सरकारी कर्मचारी ऑफ़िस के बाद गोपनीय परामर्श ले सकते हैं।"),
      c("Mandi", "मंडी", "Families can discuss chitta use with the young person present.", "परिवार युवा की मौजूदगी में चिट्टा पर बात कर सकते हैं।"),
      c("Dharamshala (Kangra)", "धर्मशाला (कांगड़ा)", "Families of servicemen can consult from home.", "फ़ौजी परिवार घर से परामर्श ले सकते हैं।"),
      c("Solan", "सोलन", "Students can consult confidentially from their college.", "छात्र कॉलेज से गोपनीय परामर्श ले सकते हैं।"),
      c("Baddi", "बद्दी", "Pharma-industry shift workers can book around duty.", "फ़ार्मा उद्योग के शिफ़्ट कर्मचारी ड्यूटी के हिसाब से बुक कर सकते हैं।"),
      c("Kullu", "कुल्लू", "Tourism workers can choose off-season or late slots.", "पर्यटन कर्मी ऑफ़-सीज़न या देर के स्लॉट चुन सकते हैं।"),
      c("Hamirpur", "हमीरपुर", "Exam aspirants can consult about stress and sleep.", "परीक्षा की तैयारी करने वाले तनाव और नींद पर परामर्श ले सकते हैं।"),
      c("Una", "ऊना", "Close to Punjab — Hindi or Punjabi-speaking families welcome.", "पंजाब के पास — हिंदी या पंजाबी बोलने वाले परिवारों का स्वागत है।"),
      c("Bilaspur", "बिलासपुर", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      c("Chamba", "चंबा", "Remote valleys can reach a specialist by phone video.", "दूर की घाटियाँ फ़ोन वीडियो से विशेषज्ञ तक पहुँच सकती हैं।"),
    ],
    concerns: [
      b("Chitta (heroin) and alcohol use in young people", "युवाओं में चिट्टा (हेरोइन) और शराब"),
      b("Winter low mood and sleep problems", "सर्दियों में उदासी और नींद की समस्या"),
      b("Depression and anxiety in students and older adults", "छात्रों और बुज़ुर्गों में डिप्रेशन और घबराहट"),
    ],
    topics: ["heroin-addiction-treatment-india", "smack-addiction-treatment-india", "alcohol-addiction-treatment-india", "depression-treatment-india", "online-psychiatrist-india"],
    faqs: NORTH_FAQS,
  },
  {
    slug: "jammu-kashmir",
    name: b("Jammu & Kashmir", "जम्मू-कश्मीर"),
    title: b("Online Psychiatrist for Jammu & Kashmir – Jammu, Srinagar & More", "जम्मू-कश्मीर के लिए ऑनलाइन मनोचिकित्सक – जम्मू, श्रीनगर आदि"),
    h1: b("Online psychiatry consultation for Jammu & Kashmir", "जम्मू-कश्मीर के लिए ऑनलाइन मनोरोग परामर्श"),
    description: b(
      "Private video consultation for Jammu & Kashmir in Hindi or English — depression, anxiety, trauma, de-addiction and sleep. Jammu, Srinagar, Anantnag, Baramulla, Kathua and more.",
      "जम्मू-कश्मीर के लिए हिंदी या अंग्रेज़ी में निजी वीडियो परामर्श — डिप्रेशन, घबराहट, ट्रॉमा, नशा मुक्ति और नींद। जम्मू, श्रीनगर, अनंतनाग, बारामूला, कठुआ आदि।"
    ),
    intro: [
      b("Video consultation can help when travel is difficult because of distance, weather or other disruption. Depression, anxiety, trauma-related symptoms and opioid use are common reasons to seek help.", "जब दूरी, मौसम या दूसरी रुकावटों से सफ़र मुश्किल हो, तब वीडियो परामर्श मदद कर सकता है। डिप्रेशन, घबराहट, ट्रॉमा से जुड़े लक्षण और अफ़ीम-स्मैक जैसे नशे मदद लेने के आम कारण हैं।"),
      b("There is no clinic in Jammu & Kashmir — consultations are by private video from Ajmer, and need a working internet connection.", "जम्मू-कश्मीर में कोई क्लिनिक नहीं है — परामर्श अजमेर से निजी वीडियो पर होता है और इसके लिए चालू इंटरनेट ज़रूरी है।"),
    ],
    cities: [
      c("Jammu", "जम्मू", "Families can consult in Hindi without travelling.", "परिवार बिना सफ़र के हिंदी में परामर्श ले सकते हैं।"),
      c("Srinagar", "श्रीनगर", "Students and professionals can consult privately in English or Hindi.", "छात्र और पेशेवर अंग्रेज़ी या हिंदी में निजी परामर्श ले सकते हैं।"),
      c("Anantnag", "अनंतनाग", "Families can discuss a young person's drug use confidentially.", "परिवार किसी युवा के नशे पर गोपनीय बात कर सकते हैं।"),
      c("Baramulla", "बारामूला", "Saves long travel, especially in winter.", "ख़ासकर सर्दियों में लंबा सफ़र बचता है।"),
      c("Kathua", "कठुआ", "Close to Punjab — the same Hindi care from home.", "पंजाब के पास — घर से वही हिंदी परामर्श।"),
      c("Udhampur", "उधमपुर", "Families of servicemen can consult privately.", "फ़ौजी परिवार निजी परामर्श ले सकते हैं।"),
      c("Rajouri", "राजौरी", "Remote families can reach a specialist by phone video.", "दूर के परिवार फ़ोन वीडियो से विशेषज्ञ तक पहुँच सकते हैं।"),
      c("Sopore", "सोपोर", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    ],
    concerns: [
      b("Trauma-related stress, anxiety and sleep problems", "ट्रॉमा से जुड़ा तनाव, घबराहट और नींद की समस्या"),
      b("Opioid (heroin) use in young people", "युवाओं में हेरोइन जैसे नशे"),
      b("Depression in students and women", "छात्रों और महिलाओं में डिप्रेशन"),
    ],
    topics: ["ptsd-trauma-treatment-india", "heroin-addiction-treatment-india", "depression-treatment-india", "generalized-anxiety-disorder-india", "online-psychiatrist-india"],
    faqs: NORTH_FAQS,
  },
];

// Extra cities for the existing (already indexed) hubs.
MORE_CITIES["delhi-ncr"].push(
  c("Bahadurgarh", "बहादुरगढ़", "Factory workers can consult before or after duty.", "फ़ैक्ट्री कर्मचारी ड्यूटी से पहले या बाद परामर्श ले सकते हैं।"),
  c("Dharuhera", "धारूहेड़ा", "Industrial-belt workers can choose early-morning slots.", "औद्योगिक क्षेत्र के कर्मचारी सुबह जल्दी के स्लॉट चुन सकते हैं।"),
  c("Nuh", "नूंह", "Rural families save a long journey for follow-ups.", "ग्रामीण परिवारों का फॉलो-अप के लिए लंबा सफ़र बचता है।"),
  c("Hapur", "हापुड़", "Traders can book outside market hours.", "व्यापारी बाज़ार के समय के बाद बुक कर सकते हैं।"),
  c("Bulandshahr", "बुलंदशहर", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
  c("Baghpat", "बागपत", "Farming families can book an evening slot.", "किसान परिवार शाम का स्लॉट बुक कर सकते हैं।"),
);
MORE_CITIES.india = [
  c("Haridwar", "हरिद्वार", "Industrial (SIDCUL) workers can book around shifts.", "औद्योगिक (सिडकुल) कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
  c("Rishikesh", "ऋषिकेश", "Tourism workers with irregular hours can choose flexible slots.", "अनियमित समय वाले पर्यटन कर्मी सुविधाजनक स्लॉट चुन सकते हैं।"),
  c("Roorkee", "रुड़की", "Engineering students can consult confidentially from campus.", "इंजीनियरिंग छात्र कैंपस से गोपनीय परामर्श ले सकते हैं।"),
  c("Haldwani", "हल्द्वानी", "Gateway to Kumaon — saves long hill journeys.", "कुमाऊँ का प्रवेश द्वार — पहाड़ों के लंबे सफ़र से बचाव।"),
  c("Rudrapur", "रुद्रपुर", "Factory workers can consult before or after duty.", "फ़ैक्ट्री कर्मचारी ड्यूटी से पहले या बाद परामर्श ले सकते हैं।"),
  c("Nainital", "नैनीताल", "Older parents living alone can consult with children joining by video.", "अकेले रहने वाले माता-पिता बच्चों को वीडियो पर जोड़कर परामर्श ले सकते हैं।"),
  c("Thane", "ठाणे", "Long-commute professionals can consult from home after work.", "लंबा सफ़र करने वाले पेशेवर काम के बाद घर से परामर्श ले सकते हैं।"),
  c("Navi Mumbai", "नवी मुंबई", "IT and port workers can choose late or early slots.", "IT और बंदरगाह कर्मचारी देर या सुबह के स्लॉट चुन सकते हैं।"),
  c("Nagpur", "नागपुर", "Hindi-speaking families in Vidarbha can consult in their language.", "विदर्भ के हिंदी भाषी परिवार अपनी भाषा में परामर्श ले सकते हैं।"),
  c("Nashik", "नासिक", "Students and industrial workers can consult privately.", "छात्र और औद्योगिक कर्मचारी निजी परामर्श ले सकते हैं।"),
  c("Vadodara", "वडोदरा", "Families of Rajasthani traders in Gujarat can consult in Hindi.", "गुजरात में रहने वाले राजस्थानी व्यापारियों के परिवार हिंदी में परामर्श ले सकते हैं।"),
  c("Rajkot", "राजकोट", "Traders and factory owners can book outside business hours.", "व्यापारी और फ़ैक्ट्री मालिक कामकाज के समय के बाद बुक कर सकते हैं।"),
  c("Raipur (Chhattisgarh)", "रायपुर (छत्तीसगढ़)", "Hindi video consultation without travelling to a metro city.", "महानगर गए बिना हिंदी में वीडियो परामर्श।"),
  c("Ranchi", "राँची", "Students and families can consult in Hindi from home.", "छात्र और परिवार घर से हिंदी में परामर्श ले सकते हैं।"),
  c("Jamshedpur", "जमशेदपुर", "Steel-industry shift workers can book around duty.", "स्टील उद्योग के शिफ़्ट कर्मचारी ड्यूटी के हिसाब से बुक कर सकते हैं।"),
  c("Bhubaneswar", "भुवनेश्वर", "Students and professionals can consult in English or Hindi.", "छात्र और पेशेवर अंग्रेज़ी या हिंदी में परामर्श ले सकते हैं।"),
  c("Guwahati", "गुवाहाटी", "Families in the North-East can reach a specialist by video.", "पूर्वोत्तर के परिवार वीडियो से विशेषज्ञ तक पहुँच सकते हैं।"),
  c("Kochi", "कोच्चि", "Hindi- and English-speaking families can consult from home.", "हिंदी और अंग्रेज़ी बोलने वाले परिवार घर से परामर्श ले सकते हैं।"),
  c("Coimbatore", "कोयंबटूर", "Rajasthani business families in the South can consult in Hindi.", "दक्षिण में रहने वाले राजस्थानी व्यापारी परिवार हिंदी में परामर्श ले सकते हैं।"),
  c("Mysuru", "मैसूरु", "Students can consult confidentially from campus.", "छात्र कैंपस से गोपनीय परामर्श ले सकते हैं।"),
  c("Visakhapatnam", "विशाखापट्टनम", "Port and industrial workers can book flexible slots.", "बंदरगाह और औद्योगिक कर्मचारी सुविधाजनक स्लॉट बुक कर सकते हैं।"),
  c("Goa", "गोवा", "Hospitality workers with late shifts can choose evening slots.", "देर की शिफ़्ट वाले होटल कर्मचारी शाम के स्लॉट चुन सकते हैं।"),
];

// Add each new city once only: skip any city already listed on ANY state hub (existing indexed content
// is never removed or moved, so live pages keep exactly what Google has indexed).
const seen = new Set<string>();
for (const r of [...REGIONS, ...MORE_REGIONS]) for (const x of r.cities) seen.add(x.name.en.toLowerCase());
for (const r of REGIONS) {
  for (const x of MORE_CITIES[r.slug] ?? []) {
    const k = x.name.en.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    r.cities.push(x);
  }
}
// New state hubs only where no indexed page covered the state (Bihar, Himachal Pradesh, J&K) — before the all-India hub.
REGIONS.splice(Math.max(0, REGIONS.findIndex((r) => r.slug === "india")), 0, ...MORE_REGIONS);

/** Every /locations/<slug> hub. (Rajasthan blocks live on the existing Rajasthan city pages.) */
export const LOCATION_HUBS: Region[] = REGIONS;

export const REGION_BY_SLUG = new Map(LOCATION_HUBS.map((r) => [r.slug, r]));
