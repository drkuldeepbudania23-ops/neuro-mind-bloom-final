import type { L10n } from "../i18n";
import { b, faq } from "./conditions/_h";
import type { BlockGroup } from "./types";

type RegionCity = { name: L10n; note: L10n };

/**
 * Rajasthan blocks and towns, grouped by district, shown on the EXISTING (already indexed) location pages
 * — e.g. Sikar's blocks on /online-psychiatrist-sikar, Beawar's on /psychiatrist-ajmer. No separate district
 * pages are created, so nothing competes with an indexed page, and every block appears on exactly one page.
 * A town that has its own page (Kishangarh, Kuchaman City) is not repeated as a block anywhere.
 * Districts follow the Dec 2024 reorganisation (Kekri → Ajmer, Neem Ka Thana → Sikar, Shahpura → Bhilwara,
 * Sanchore → Jalore, Dudu → Jaipur; Beawar, Didwana-Kuchaman, Balotra, Kotputli-Behror, Khairthal-Tijara retained).
 */

const blk = (en: string, hi: string, noteEn: string, noteHi: string): RegionCity => ({ name: b(en, hi), note: b(noteEn, noteHi) });

export const DEADDICTION_FAQ = faq(
  "Can de-addiction treatment be done online?",
  "क्या नशा मुक्ति का इलाज ऑनलाइन हो सकता है?",
  "Assessment, counselling, family guidance and many medicines can be started by video. Severe withdrawal from alcohol or opioids (afeem, doda, smack/chitta) may need supervised in-person care, and some de-addiction medicines cannot be prescribed by teleconsultation — you will be guided to the right place if so.",
  "जाँच, काउंसलिंग, परिवार को मार्गदर्शन और कई दवाएँ वीडियो पर शुरू हो सकती हैं। शराब या अफ़ीम, डोडा, स्मैक/चिट्टा छोड़ते समय गंभीर लक्षण हों तो निगरानी में भर्ती की ज़रूरत हो सकती है, और नशा मुक्ति की कुछ दवाएँ टेलीकंसल्टेशन से नहीं लिखी जा सकतीं — ऐसे में आपको सही जगह बताई जाएगी।"
);
type DistrictInput = {
  slug: string;
  name: L10n;
  area?: boolean;
  home?: boolean;
  /** Families commonly ask about afeem/doda, smack/chitta or alcohol here — the page gets the de-addiction FAQ. */
  addiction?: boolean;
  intro: L10n;
  blocks: RegionCity[];
  concerns: L10n[];
  topics: string[];
};

function district(o: DistrictInput): DistrictInput {
  return o;
}

const C = {
  alcohol: b("Alcohol dependence and its effect on families", "शराब की लत और परिवार पर उसका असर"),
  opium: b("Afeem and doda post dependence", "अफ़ीम और डोडा पोस्त की लत"),
  chitta: b("Smack / chitta (heroin) and tablet misuse in young people", "युवाओं में स्मैक / चिट्टा (हेरोइन) और नशीली गोलियों का ग़लत इस्तेमाल"),
  tobacco: b("Tobacco, gutkha and smoking", "तंबाकू, गुटखा और धूम्रपान"),
  students: b("Exam stress, sleep and concentration in students", "छात्रों में परीक्षा का तनाव, नींद और ध्यान की समस्या"),
  elderly: b("Depression and memory problems in older parents living alone", "अकेले रहने वाले बुज़ुर्ग माता-पिता में डिप्रेशन और याददाश्त की समस्या"),
  depression: b("Depression, anxiety and panic that families hesitate to discuss", "डिप्रेशन, घबराहट और पैनिक जिन पर परिवार बात करने से हिचकते हैं"),
  sexual: b("Sexual health worries, discussed in complete privacy", "यौन स्वास्थ्य की चिंताएँ, पूरी गोपनीयता के साथ"),
  work: b("Work stress, shift work and sleep problems", "काम का तनाव, शिफ़्ट ड्यूटी और नींद की समस्या"),
  women: b("Women's mental health, including after childbirth", "महिलाओं का मानसिक स्वास्थ्य, प्रसव के बाद सहित"),
  distance: b("Families of workers living far away or abroad", "दूर या विदेश में काम करने वालों के परिवार"),
};

const DISTRICT_DATA: DistrictInput[] = [
  // ───────────────────────── Ajmer belt ─────────────────────────
  district({
    slug: "ajmer-district",
    name: b("Ajmer", "अजमेर"),
    home: true,
    addiction: true,
    intro: b(
      "Ajmer district now again includes the Kekri area (the former Kekri district merged back in December 2024).",
      "दिसंबर 2024 से केकड़ी क्षेत्र (पूर्व केकड़ी ज़िला) फिर से अजमेर ज़िले में है।"
    ),
    blocks: [
      blk("Ajmer city", "अजमेर शहर", "Home city of Neuro Mind Bloom — video consultation without a waiting room.", "Neuro Mind Bloom का मुख्य शहर — बिना वेटिंग रूम के वीडियो परामर्श।"),
      blk("Pushkar", "पुष्कर", "Hotel and tourism workers with late hours can choose evening video slots.", "देर तक काम करने वाले होटल और पर्यटन कर्मी शाम के वीडियो स्लॉट चुन सकते हैं।"),
      blk("Kishangarh", "किशनगढ़", "Marble-industry and transport workers can consult around their work hours.", "मार्बल उद्योग और परिवहन से जुड़े लोग काम के समय के हिसाब से परामर्श ले सकते हैं।"),
      blk("Nasirabad", "नसीराबाद", "Defence families in the cantonment town can consult privately from home.", "छावनी क़स्बे के फ़ौजी परिवार घर से निजी परामर्श ले सकते हैं।"),
      blk("Arain", "अराईं", "Farming families can book after field work without a trip to the city.", "किसान परिवार शहर गए बिना खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Roopangarh", "रूपनगढ़", "Follow-ups for alcohol and doda de-addiction can continue from home.", "शराब और डोडा नशा मुक्ति के फॉलो-अप घर से जारी रह सकते हैं।"),
      blk("Srinagar (Ajmer)", "श्रीनगर (अजमेर)", "Close to Ajmer city — still saves travel for regular follow-ups.", "अजमेर शहर के पास — फिर भी नियमित फॉलो-अप में सफ़र बचता है।"),
      blk("Pisangan", "पीसांगन", "Older adults with sleep or memory problems can consult with a family member on the call.", "नींद या याददाश्त की समस्या वाले बुज़ुर्ग परिवार के सदस्य के साथ कॉल पर परामर्श ले सकते हैं।"),
      blk("Kekri", "केकड़ी", "Former district headquarters; students and traders can consult privately by video.", "पूर्व ज़िला मुख्यालय; छात्र और व्यापारी वीडियो पर निजी परामर्श ले सकते हैं।"),
      blk("Sarwar", "सरवाड़", "Families can discuss addiction or mood concerns without being seen at a clinic.", "परिवार क्लिनिक में दिखे बिना नशे या मूड की चिंता पर बात कर सकते हैं।"),
      blk("Sawar", "सावर", "Rural patients save a full day's travel to Ajmer.", "ग्रामीण मरीज़ों का अजमेर तक का पूरा दिन का सफ़र बचता है।"),
      blk("Bhinai", "भिनाय", "Women can consult from home about anxiety, low mood or post-delivery problems.", "महिलाएँ घर से घबराहट, उदासी या प्रसव के बाद की समस्याओं पर परामर्श ले सकती हैं।"),
      blk("Tantoti", "टांटोटी", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
    ],
    concerns: [C.alcohol, C.opium, C.students, C.women],
    topics: ["psychiatrist-ajmer", "online-psychiatrist-kishangarh", "alcohol-addiction-treatment-india", "doda-post-poppy-husk-addiction-india", "depression-treatment-india"],
  }),
  district({
    slug: "beawar-district",
    name: b("Beawar", "ब्यावर"),
    addiction: true,
    intro: b(
      "Beawar district (formed in 2023 and retained) borders Ajmer. Textile, cement and mining work is common here, and long shifts often affect sleep and mood.",
      "ब्यावर ज़िला (2023 में बना और बरक़रार) अजमेर से लगा है। यहाँ कपड़ा, सीमेंट और खनन का काम आम है, और लंबी शिफ़्ट का असर अक्सर नींद और मूड पर पड़ता है।"
    ),
    blocks: [
      blk("Beawar city", "ब्यावर शहर", "Traders and mill workers can consult early morning or late evening.", "व्यापारी और मिल कर्मचारी सुबह जल्दी या देर शाम परामर्श ले सकते हैं।"),
      blk("Masuda", "मसूदा", "Rural families can join the same video call from different places.", "ग्रामीण परिवार अलग-अलग जगह से एक ही वीडियो कॉल पर जुड़ सकते हैं।"),
      blk("Bijainagar", "बिजयनगर", "Students and young adults can consult privately about stress and sleep.", "छात्र और युवा तनाव और नींद पर निजी परामर्श ले सकते हैं।"),
      blk("Jawaja", "जवाजा", "Saves the journey to a city hospital for regular follow-ups.", "नियमित फॉलो-अप के लिए शहर के अस्पताल का सफ़र बचता है।"),
      blk("Raipur (Beawar)", "रायपुर (ब्यावर)", "Families can discuss alcohol or afeem use confidentially.", "परिवार शराब या अफ़ीम के इस्तेमाल पर गोपनीय बात कर सकते हैं।"),
      blk("Jaitaran", "जैतारण", "Hindi video consultation with a clear follow-up plan.", "हिंदी में वीडियो परामर्श और साफ़ फॉलो-अप योजना।"),
      blk("Badnor", "बदनोर", "Older adults can be assessed with a family member present.", "बुज़ुर्गों की जाँच परिवार के सदस्य की मौजूदगी में हो सकती है।"),
    ],
    concerns: [C.work, C.alcohol, C.opium, C.tobacco],
    topics: ["workplace-stress-india", "alcohol-addiction-treatment-india", "opium-afeem-addiction-india", "insomnia-treatment-india"],
  }),
  district({
    slug: "didwana-kuchaman-district",
    name: b("Didwana-Kuchaman", "डीडवाना-कुचामन"),
    addiction: true,
    intro: b(
      "Didwana-Kuchaman district has eight tehsils: Didwana, Kuchaman City, Ladnun, Nawa, Makrana, Parbatsar, Maulasar and Chhoti Khatu. Kuchaman is a growing coaching town, and Makrana's marble work involves long, physical shifts.",
      "डीडवाना-कुचामन ज़िले में आठ तहसीलें हैं: डीडवाना, कुचामन सिटी, लाडनूं, नावां, मकराना, परबतसर, मौलासर और छोटी खाटू। कुचामन उभरता कोचिंग क़स्बा है, और मकराना में मार्बल का काम लंबी और मेहनत वाली शिफ़्ट का होता है।"
    ),
    blocks: [
      blk("Didwana", "डीडवाना", "District headquarters — consult without travelling to Ajmer or Jaipur.", "ज़िला मुख्यालय — अजमेर या जयपुर गए बिना परामर्श।"),
      blk("Kuchaman City", "कुचामन सिटी", "Coaching students and parents can consult about exam stress, sleep and mood.", "कोचिंग छात्र और माता-पिता परीक्षा के तनाव, नींद और मूड पर परामर्श ले सकते हैं।"),
      blk("Ladnun", "लाडनूं", "University students and older adults can both consult from home.", "विश्वविद्यालय के छात्र और बुज़ुर्ग दोनों घर से परामर्श ले सकते हैं।"),
      blk("Nawa", "नावां", "Salt-works and farm families can book after work hours.", "नमक के काम और खेती से जुड़े परिवार काम के बाद बुक कर सकते हैं।"),
      blk("Makrana", "मकराना", "Marble workers can get help for sleep, body-pain-linked stress and alcohol use.", "मार्बल कर्मचारी नींद, दर्द से जुड़े तनाव और शराब के लिए मदद ले सकते हैं।"),
      blk("Parbatsar", "परबतसर", "Afeem and doda follow-ups can continue by video.", "अफ़ीम और डोडा के फॉलो-अप वीडियो पर जारी रह सकते हैं।"),
      blk("Maulasar (Molasar)", "मौलासर", "Rural patients save a long trip for each visit.", "ग्रामीण मरीज़ों को हर बार लंबा सफ़र नहीं करना पड़ता।"),
      blk("Chhoti Khatu", "छोटी खाटू", "Families can discuss sensitive concerns in Hindi, in privacy.", "परिवार संवेदनशील बातें हिंदी में, गोपनीयता के साथ कर सकते हैं।"),
    ],
    concerns: [C.opium, C.students, C.alcohol, C.work],
    topics: ["online-psychiatrist-kuchaman-city", "opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "neet-exam-stress-india", "exam-anxiety-students-india"],
  }),
  district({
    slug: "nagaur-district",
    name: b("Nagaur", "नागौर"),
    addiction: true,
    intro: b(
      "Nagaur district (after Didwana-Kuchaman was carved out) includes Nagaur, Merta, Degana, Jayal, Khinvsar, Mundwa, Riyan Badi and nearby areas. Afeem and doda post use is a long-standing concern for many families here.",
      "नागौर ज़िले (डीडवाना-कुचामन अलग होने के बाद) में नागौर, मेड़ता, डेगाना, जायल, खींवसर, मूंडवा, रियाँ बड़ी और आसपास के क्षेत्र हैं। यहाँ कई परिवारों के लिए अफ़ीम और डोडा पोस्त का इस्तेमाल पुरानी चिंता है।"
    ),
    blocks: [
      blk("Nagaur city", "नागौर शहर", "Video consultation with follow-ups from home.", "वीडियो परामर्श, फॉलो-अप घर से।"),
      blk("Merta City", "मेड़ता सिटी", "Traders and farmers can book outside market hours.", "व्यापारी और किसान बाज़ार के समय के बाद बुक कर सकते हैं।"),
      blk("Degana", "डेगाना", "Railway-junction town — no need to travel for every follow-up.", "रेलवे जंक्शन क़स्बा — हर फॉलो-अप के लिए सफ़र की ज़रूरत नहीं।"),
      blk("Jayal", "जायल", "Families can seek help for afeem or doda dependence confidentially.", "परिवार अफ़ीम या डोडा की लत के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Khinvsar", "खींवसर", "Rural patients save a long journey to the city.", "ग्रामीण मरीज़ों का शहर तक का लंबा सफ़र बचता है।"),
      blk("Panchodi", "पांचौड़ी", "Hindi consultation with the whole family on one call if needed.", "ज़रूरत हो तो पूरे परिवार के साथ एक कॉल पर हिंदी में परामर्श।"),
      blk("Mundwa", "मूंडवा", "Workers can consult early morning before a shift.", "कर्मचारी शिफ़्ट से पहले सुबह जल्दी परामर्श ले सकते हैं।"),
      blk("Riyan Badi", "रियाँ बड़ी", "Women can consult privately about anxiety or low mood.", "महिलाएँ घबराहट या उदासी पर निजी परामर्श ले सकती हैं।"),
      blk("Bherunda", "भैरूंदा", "Older adults can be assessed with a family member present.", "बुज़ुर्गों की जाँच परिवार के सदस्य के साथ हो सकती है।"),
      blk("Kuchera", "कुचेरा", "e-Prescription arrives on WhatsApp after the call.", "कॉल के बाद ई-प्रिस्क्रिप्शन WhatsApp पर आता है।"),
    ],
    concerns: [C.opium, C.alcohol, C.tobacco, C.depression],
    topics: ["online-psychiatrist-nagaur", "opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "alcohol-addiction-treatment-india"],
  }),
  // ───────────────────────── Shekhawati ─────────────────────────
  district({
    slug: "sikar-district",
    name: b("Sikar", "सीकर"),
    addiction: true,
    intro: b(
      "Sikar district, which again includes Neem Ka Thana, Patan and Shrimadhopur since December 2024, is a major coaching centre of Shekhawati. Many families also have members working in the Gulf or the armed forces.",
      "सीकर ज़िला, जिसमें दिसंबर 2024 से फिर नीम का थाना, पाटन और श्रीमाधोपुर शामिल हैं, शेखावाटी का बड़ा कोचिंग केंद्र है। कई परिवारों के सदस्य खाड़ी देशों में या सेना में भी काम करते हैं।"
    ),
    blocks: [
      blk("Sikar city", "सीकर शहर", "Coaching students can consult privately from their hostel or room.", "कोचिंग छात्र हॉस्टल या कमरे से निजी परामर्श ले सकते हैं।"),
      blk("Fatehpur", "फतेहपुर", "Families of workers abroad can consult together by video.", "विदेश में काम करने वालों के परिवार साथ मिलकर वीडियो परामर्श ले सकते हैं।"),
      blk("Laxmangarh", "लक्ष्मणगढ़", "Students and older parents can both consult from home.", "छात्र और बुज़ुर्ग माता-पिता दोनों घर से परामर्श ले सकते हैं।"),
      blk("Danta Ramgarh", "दांता रामगढ़", "Rural patients save the trip to Sikar or Jaipur.", "ग्रामीण मरीज़ों का सीकर या जयपुर का सफ़र बचता है।"),
      blk("Khatushyamji", "खाटूश्यामजी", "Shopkeepers and pilgrimage-town workers can book around busy days.", "दुकानदार और तीर्थ क़स्बे के कर्मचारी भीड़ वाले दिनों के हिसाब से बुक कर सकते हैं।"),
      blk("Reengus", "रींगस", "Railway and highway town — consult without travelling.", "रेलवे और हाईवे क़स्बा — बिना सफ़र के परामर्श।"),
      blk("Khandela", "खंडेला", "Families can discuss alcohol or tablet misuse privately.", "परिवार शराब या नशीली गोलियों के इस्तेमाल पर निजी बात कर सकते हैं।"),
      blk("Shrimadhopur", "श्रीमाधोपुर", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Neem Ka Thana", "नीम का थाना", "Mining-area workers can get help for sleep, stress and alcohol use.", "खनन क्षेत्र के कर्मचारी नींद, तनाव और शराब के लिए मदद ले सकते हैं।"),
      blk("Patan", "पाटन", "Follow-ups continue from home after the first assessment.", "पहली जाँच के बाद फॉलो-अप घर से जारी रहते हैं।"),
      blk("Ajeetgarh", "अजीतगढ़", "Women can consult from home about anxiety and low mood.", "महिलाएँ घर से घबराहट और उदासी पर परामर्श ले सकती हैं।"),
      blk("Losal", "लोसल", "Young people can seek help for exam pressure and phone overuse.", "युवा परीक्षा के दबाव और मोबाइल की लत के लिए मदद ले सकते हैं।"),
      blk("Palsana", "पलसाना", "Older adults with memory problems can be seen with family on the call.", "याददाश्त की समस्या वाले बुज़ुर्गों को परिवार के साथ कॉल पर देखा जा सकता है।"),
      blk("Dhod", "धोद", "Farming families can book an evening slot.", "किसान परिवार शाम का स्लॉट बुक कर सकते हैं।"),
      blk("Piprali", "पिपराली", "Close to Sikar — still saves waiting time for follow-ups.", "सीकर के पास — फिर भी फॉलो-अप में इंतज़ार बचता है।"),
    ],
    concerns: [C.students, C.distance, C.alcohol, C.elderly],
    topics: ["online-psychiatrist-sikar", "neet-exam-stress-india", "jee-exam-stress-india", "exam-anxiety-students-india", "alcohol-addiction-treatment-india"],
  }),
  district({
    slug: "jhunjhunu-district",
    name: b("Jhunjhunu", "झुंझुनूं"),
    intro: b(
      "Jhunjhunu district sends a large number of young people to the armed forces, and many older parents live alone while children work elsewhere. Pilani is also a well-known education town.",
      "झुंझुनूं ज़िले से बड़ी संख्या में युवा सेना में जाते हैं, और बच्चों के बाहर काम करने से कई बुज़ुर्ग माता-पिता अकेले रहते हैं। पिलानी एक जाना-माना शिक्षा केंद्र भी है।"
    ),
    blocks: [
      blk("Jhunjhunu city", "झुंझुनूं शहर", "Private video consultation in Hindi or English.", "हिंदी या अंग्रेज़ी में निजी वीडियो परामर्श।"),
      blk("Chirawa", "चिड़ावा", "Coaching students can consult about stress and sleep.", "कोचिंग छात्र तनाव और नींद पर परामर्श ले सकते हैं।"),
      blk("Pilani", "पिलानी", "College students can consult confidentially from campus.", "कॉलेज के छात्र कैंपस से गोपनीय परामर्श ले सकते हैं।"),
      blk("Nawalgarh", "नवलगढ़", "Older adults can be assessed with children joining from other cities.", "दूसरे शहरों से बच्चों को जोड़कर बुज़ुर्गों की जाँच हो सकती है।"),
      blk("Udaipurwati", "उदयपुरवाटी", "Rural families save a long trip to the district town.", "ग्रामीण परिवारों का ज़िला मुख्यालय तक का लंबा सफ़र बचता है।"),
      blk("Gudha Gorji", "गुढ़ा गौड़जी", "Ex-servicemen and their families can consult privately.", "पूर्व सैनिक और उनके परिवार निजी परामर्श ले सकते हैं।"),
      blk("Khetri", "खेतड़ी", "Mining-area workers can get help for sleep, stress and alcohol use.", "खनन क्षेत्र के कर्मचारी नींद, तनाव और शराब के लिए मदद ले सकते हैं।"),
      blk("Buhana", "बुहाना", "Close to the Haryana border — the same Hindi care from home.", "हरियाणा सीमा के पास — घर से वही हिंदी परामर्श।"),
      blk("Surajgarh", "सूरजगढ़", "Families can discuss youth addiction concerns confidentially.", "परिवार युवाओं के नशे की चिंता पर गोपनीय बात कर सकते हैं।"),
      blk("Mandawa", "मंडावा", "Tourism workers with irregular hours can book flexible slots.", "अनियमित समय वाले पर्यटन कर्मी सुविधाजनक स्लॉट बुक कर सकते हैं।"),
      blk("Malsisar", "मलसीसर", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Singhana", "सिंघाना", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
      blk("Alsisar", "अलसीसर", "e-Prescription arrives on WhatsApp after the call.", "कॉल के बाद ई-प्रिस्क्रिप्शन WhatsApp पर आता है।"),
    ],
    concerns: [C.elderly, C.students, b("Stress and trauma in serving and ex-servicemen", "सेवारत और पूर्व सैनिकों में तनाव और ट्रॉमा"), C.alcohol],
    topics: ["online-psychiatrist-jhunjhunu", "late-life-depression-india", "exam-anxiety-students-india", "ptsd-trauma-treatment-india"],
  }),
  district({
    slug: "churu-district",
    name: b("Churu", "चूरू"),
    addiction: true,
    intro: b(
      "Churu district has some of Rajasthan's hottest summers, which disturb sleep for many people. Many families also have members working in the Gulf.",
      "चूरू ज़िले में राजस्थान की सबसे तेज़ गर्मी पड़ती है, जिससे कई लोगों की नींद ख़राब होती है। कई परिवारों के सदस्य खाड़ी देशों में भी काम करते हैं।"
    ),
    blocks: [
      blk("Churu city", "चूरू शहर", "Video consultation without the summer journey.", "गर्मी में सफ़र किए बिना वीडियो परामर्श।"),
      blk("Ratangarh", "रतनगढ़", "Traders can consult outside shop hours.", "व्यापारी दुकान के समय के बाद परामर्श ले सकते हैं।"),
      blk("Sardarshahar", "सरदारशहर", "Students and older adults can both consult from home.", "छात्र और बुज़ुर्ग दोनों घर से परामर्श ले सकते हैं।"),
      blk("Sujangarh", "सुजानगढ़", "Families can discuss afeem or alcohol use privately.", "परिवार अफ़ीम या शराब पर निजी बात कर सकते हैं।"),
      blk("Salasar", "सालासर", "Pilgrimage-town workers can book around busy days.", "तीर्थ क़स्बे के कर्मचारी भीड़ वाले दिनों के हिसाब से बुक कर सकते हैं।"),
      blk("Rajgarh (Sadulpur)", "राजगढ़ (सादुलपुर)", "Near the Haryana border — Hindi care from home.", "हरियाणा सीमा के पास — घर से हिंदी परामर्श।"),
      blk("Taranagar", "तारानगर", "Rural patients save a long trip for each follow-up.", "ग्रामीण मरीज़ों का हर फॉलो-अप का लंबा सफ़र बचता है।"),
      blk("Bidasar", "बीदासर", "Women can consult privately about anxiety or low mood.", "महिलाएँ घबराहट या उदासी पर निजी परामर्श ले सकती हैं।"),
      blk("Chhapar", "छापर", "e-Prescription on WhatsApp after the call.", "कॉल के बाद WhatsApp पर ई-प्रिस्क्रिप्शन।"),
    ],
    concerns: [C.distance, C.opium, b("Sleep problems in extreme heat", "तेज़ गर्मी में नींद की समस्या"), C.depression],
    topics: ["online-psychiatrist-churu", "insomnia-treatment-india", "opium-afeem-addiction-india", "depression-treatment-india"],
  }),
  // ───────────────────────── Jaipur / Alwar / NCR ─────────────────────────
  district({
    slug: "jaipur-district",
    name: b("Jaipur", "जयपुर"),
    intro: b(
      "Jaipur district again includes the former Jaipur Rural and Dudu areas (December 2024). Busy professionals in the city and farming families in rural blocks both use video consultation to avoid traffic and travel.",
      "जयपुर ज़िले में दिसंबर 2024 से फिर पूर्व जयपुर ग्रामीण और दूदू क्षेत्र शामिल हैं। शहर के व्यस्त पेशेवर और ग्रामीण ब्लॉक के किसान परिवार, दोनों ट्रैफ़िक और सफ़र से बचने के लिए वीडियो परामर्श लेते हैं।"
    ),
    blocks: [
      blk("Jaipur city", "जयपुर शहर", "Professionals can consult before or after office without traffic.", "पेशेवर बिना ट्रैफ़िक के ऑफ़िस से पहले या बाद परामर्श ले सकते हैं।"),
      blk("Sanganer", "सांगानेर", "Printing and garment workers can book around shifts.", "छपाई और कपड़ा कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
      blk("Amer", "आमेर", "Tourism workers with late hours can choose evening slots.", "देर तक काम करने वाले पर्यटन कर्मी शाम के स्लॉट चुन सकते हैं।"),
      blk("Chomu", "चौमूं", "Students and young adults can consult privately about stress.", "छात्र और युवा तनाव पर निजी परामर्श ले सकते हैं।"),
      blk("Jamwa Ramgarh", "जमवा रामगढ़", "Rural families save the trip into the city.", "ग्रामीण परिवारों का शहर तक का सफ़र बचता है।"),
      blk("Bassi", "बस्सी", "Families can discuss alcohol use confidentially.", "परिवार शराब के इस्तेमाल पर गोपनीय बात कर सकते हैं।"),
      blk("Chaksu", "चाकसू", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Phagi", "फागी", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Dudu", "दूदू", "Highway town between Jaipur and Ajmer — video follow-ups from home.", "जयपुर-अजमेर के बीच हाईवे क़स्बा — घर से वीडियो फॉलो-अप।"),
      blk("Mauzamabad", "मौजमाबाद", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Phulera", "फुलेरा", "Railway employees with shift duty can choose convenient slots.", "शिफ़्ट ड्यूटी वाले रेलवे कर्मचारी सुविधाजनक स्लॉट चुन सकते हैं।"),
      blk("Sambhar", "सांभर", "Salt-works families can consult without travelling.", "नमक के काम से जुड़े परिवार बिना सफ़र के परामर्श ले सकते हैं।"),
      blk("Kishangarh Renwal", "किशनगढ़ रेनवाल", "Traders can consult outside market hours.", "व्यापारी बाज़ार के समय के बाद परामर्श ले सकते हैं।"),
      blk("Jobner", "जोबनेर", "College students can consult confidentially.", "कॉलेज छात्र गोपनीय परामर्श ले सकते हैं।"),
      blk("Shahpura (Jaipur)", "शाहपुरा (जयपुर)", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Govindgarh", "गोविंदगढ़", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    ],
    concerns: [C.work, C.students, C.alcohol, C.depression],
    topics: ["online-psychiatrist-jaipur", "workplace-stress-india", "social-media-overuse-india", "alcohol-addiction-treatment-india", "generalized-anxiety-disorder-india"],
  }),
  district({
    slug: "kotputli-behror-district",
    name: b("Kotputli-Behror", "कोटपूतली-बहरोड़"),
    intro: b(
      "Kotputli-Behror district lies on the Delhi–Jaipur highway, with the Neemrana industrial belt. Factory shift work, long commutes and alcohol use are common reasons people consult.",
      "कोटपूतली-बहरोड़ ज़िला दिल्ली–जयपुर हाईवे पर है, जहाँ नीमराना औद्योगिक क्षेत्र भी है। फ़ैक्ट्री की शिफ़्ट, लंबा आना-जाना और शराब परामर्श के आम कारण हैं।"
    ),
    blocks: [
      blk("Kotputli", "कोटपूतली", "Highway town — consult without a trip to Jaipur.", "हाईवे क़स्बा — जयपुर गए बिना परामर्श।"),
      blk("Behror", "बहरोड़", "Traders and transporters can book flexible slots.", "व्यापारी और ट्रांसपोर्टर सुविधाजनक स्लॉट बुक कर सकते हैं।"),
      blk("Neemrana", "नीमराना", "Factory workers on rotating shifts can consult before or after duty.", "बदलती शिफ़्ट वाले फ़ैक्ट्री कर्मचारी ड्यूटी से पहले या बाद परामर्श ले सकते हैं।"),
      blk("Bansur", "बानसूर", "Rural families save a long journey for follow-ups.", "ग्रामीण परिवारों का फॉलो-अप के लिए लंबा सफ़र बचता है।"),
      blk("Viratnagar", "विराटनगर", "Families can discuss alcohol or tablet misuse privately.", "परिवार शराब या गोलियों के इस्तेमाल पर निजी बात कर सकते हैं।"),
      blk("Paota", "पावटा", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
    ],
    concerns: [C.work, C.alcohol, C.tobacco, C.depression],
    topics: ["workplace-stress-india", "alcohol-addiction-treatment-india", "insomnia-treatment-india"],
  }),
  district({
    slug: "alwar-district",
    name: b("Alwar", "अलवर"),
    intro: b(
      "Alwar district (after Khairthal-Tijara and Kotputli-Behror were formed) covers Alwar city, Rajgarh, Laxmangarh, Thanagazi, Malakhera, Ramgarh, Kathumar and Reni. It is part of the National Capital Region.",
      "अलवर ज़िला (खैरथल-तिजारा और कोटपूतली-बहरोड़ बनने के बाद) में अलवर शहर, राजगढ़, लक्ष्मणगढ़, थानागाज़ी, मालाखेड़ा, रामगढ़, कठूमर और रैणी हैं। यह राष्ट्रीय राजधानी क्षेत्र (NCR) का हिस्सा है।"
    ),
    blocks: [
      blk("Alwar city", "अलवर शहर", "Students and professionals can consult privately in the evening.", "छात्र और पेशेवर शाम को निजी परामर्श ले सकते हैं।"),
      blk("Rajgarh", "राजगढ़", "Rural families save the trip to Alwar city.", "ग्रामीण परिवारों का अलवर शहर का सफ़र बचता है।"),
      blk("Laxmangarh (Alwar)", "लक्ष्मणगढ़ (अलवर)", "Families can discuss alcohol use confidentially.", "परिवार शराब के इस्तेमाल पर गोपनीय बात कर सकते हैं।"),
      blk("Thanagazi", "थानागाज़ी", "Near Sariska — tourism workers can choose flexible slots.", "सरिस्का के पास — पर्यटन कर्मी सुविधाजनक स्लॉट चुन सकते हैं।"),
      blk("Malakhera", "मालाखेड़ा", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Ramgarh", "रामगढ़", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Kathumar", "कठूमर", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Reni", "रैणी", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    ],
    concerns: [C.work, C.alcohol, C.students, C.depression],
    topics: ["online-psychiatrist-alwar", "alcohol-addiction-treatment-india", "workplace-stress-india", "depression-treatment-india"],
  }),
  district({
    slug: "khairthal-tijara-district",
    name: b("Khairthal-Tijara", "खैरथल-तिजारा"),
    intro: b(
      "Khairthal-Tijara district includes the Bhiwadi industrial area on the Haryana border. Long factory shifts and commuting to Gurugram and Delhi often affect sleep, mood and alcohol use.",
      "खैरथल-तिजारा ज़िले में हरियाणा सीमा पर भिवाड़ी औद्योगिक क्षेत्र है। फ़ैक्ट्री की लंबी शिफ़्ट और गुरुग्राम-दिल्ली आना-जाना अक्सर नींद, मूड और शराब पर असर डालते हैं।"
    ),
    blocks: [
      blk("Bhiwadi", "भिवाड़ी", "Industrial workers can book slots before or after a shift.", "औद्योगिक कर्मचारी शिफ़्ट से पहले या बाद स्लॉट बुक कर सकते हैं।"),
      blk("Tijara", "तिजारा", "Families can discuss alcohol or smack concerns privately.", "परिवार शराब या स्मैक की चिंता पर निजी बात कर सकते हैं।"),
      blk("Khairthal", "खैरथल", "Grain-market traders can consult outside market hours.", "अनाज मंडी के व्यापारी मंडी के समय के बाद परामर्श ले सकते हैं।"),
      blk("Kishangarh Bas", "किशनगढ़ बास", "Rural patients save the trip to Alwar.", "ग्रामीण मरीज़ों का अलवर का सफ़र बचता है।"),
      blk("Kotkasim", "कोटकासिम", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Mundawar", "मुंडावर", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
    ],
    concerns: [C.work, C.alcohol, C.chitta, b("Insomnia from night and rotating shifts", "रात और बदलती शिफ़्ट से अनिद्रा")],
    topics: ["workplace-stress-india", "alcohol-addiction-treatment-india", "smack-addiction-treatment-india", "insomnia-treatment-india"],
  }),
  // ───────────────────────── Mewar / Hadoti edge ─────────────────────────
  district({
    slug: "chittorgarh-district",
    name: b("Chittorgarh", "चित्तौड़गढ़"),
    addiction: true,
    intro: b(
      "Chittorgarh is part of India's licensed opium-poppy belt, so afeem and doda post dependence is a familiar concern for many families. Cement plants and the Rawatbhata power station also mean many shift workers.",
      "चित्तौड़गढ़ भारत के लाइसेंसशुदा अफ़ीम खेती वाले इलाक़े में आता है, इसलिए अफ़ीम और डोडा पोस्त की लत कई परिवारों की जानी-पहचानी चिंता है। सीमेंट प्लांट और रावतभाटा बिजलीघर की वजह से यहाँ शिफ़्ट में काम करने वाले भी बहुत हैं।"
    ),
    blocks: [
      blk("Chittorgarh city", "चित्तौड़गढ़ शहर", "Private video consultation in Hindi.", "हिंदी में निजी वीडियो परामर्श।"),
      blk("Nimbahera", "निंबाहेड़ा", "Cement-plant workers can book around shifts.", "सीमेंट प्लांट के कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
      blk("Begun", "बेगूं", "Families can seek help for afeem or doda use confidentially.", "परिवार अफ़ीम या डोडा के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Kapasan", "कपासन", "Rural patients save the trip to the district town.", "ग्रामीण मरीज़ों का ज़िला मुख्यालय का सफ़र बचता है।"),
      blk("Rawatbhata", "रावतभाटा", "Power-station employees with shift duty can choose convenient slots.", "शिफ़्ट ड्यूटी वाले बिजलीघर कर्मचारी सुविधाजनक स्लॉट चुन सकते हैं।"),
      blk("Bari Sadri", "बड़ी सादड़ी", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Bhadesar", "भदेसर", "Follow-ups for opioid withdrawal can continue by video where safe.", "जहाँ सुरक्षित हो, अफ़ीम छोड़ने के फॉलो-अप वीडियो पर जारी रह सकते हैं।"),
      blk("Dungla", "डूंगला", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Gangrar", "गंगरार", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Rashmi", "राशमी", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Bhopalsagar", "भूपालसागर", "Saves a full day's travel for regular follow-ups.", "नियमित फॉलो-अप में पूरे दिन का सफ़र बचता है।"),
    ],
    concerns: [C.opium, C.alcohol, C.work, C.tobacco],
    topics: ["online-psychiatrist-chittorgarh", "opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "opioid-smack-heroin-opium-doda-addiction-india"],
  }),
  district({
    slug: "pratapgarh-district",
    name: b("Pratapgarh", "प्रतापगढ़"),
    addiction: true,
    intro: b(
      "Pratapgarh district, next to Chittorgarh and the Madhya Pradesh border, is also in the opium-poppy belt. Distances to specialist care are long for many tribal and rural families.",
      "प्रतापगढ़ ज़िला चित्तौड़गढ़ और मध्य प्रदेश सीमा के पास है और यह भी अफ़ीम खेती वाले इलाक़े में आता है। कई आदिवासी और ग्रामीण परिवारों के लिए विशेषज्ञ इलाज बहुत दूर है।"
    ),
    blocks: [
      blk("Pratapgarh town", "प्रतापगढ़ क़स्बा", "Video consultation saves long travel to Udaipur or Chittorgarh.", "वीडियो परामर्श से उदयपुर या चित्तौड़गढ़ का लंबा सफ़र बचता है।"),
      blk("Chhoti Sadri", "छोटी सादड़ी", "Families can seek help for afeem dependence confidentially.", "परिवार अफ़ीम की लत के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Arnod", "अरनोद", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Dhariawad", "धरियावद", "Tribal-area families can consult in Hindi from home.", "आदिवासी क्षेत्र के परिवार घर से हिंदी में परामर्श ले सकते हैं।"),
      blk("Peepalkhoont", "पीपलखूंट", "Women can consult privately about anxiety or low mood.", "महिलाएँ घबराहट या उदासी पर निजी परामर्श ले सकती हैं।"),
    ],
    concerns: [C.opium, C.alcohol, C.women, C.depression],
    topics: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "alcohol-addiction-treatment-india"],
  }),
  district({
    slug: "bhilwara-district",
    name: b("Bhilwara", "भीलवाड़ा"),
    addiction: true,
    intro: b(
      "Bhilwara district, which again includes Shahpura since December 2024, is known for its textile industry. Shift work, long hours and alcohol or doda use are common reasons to consult.",
      "भीलवाड़ा ज़िला, जिसमें दिसंबर 2024 से फिर शाहपुरा शामिल है, कपड़ा उद्योग के लिए जाना जाता है। शिफ़्ट ड्यूटी, लंबे घंटे और शराब या डोडा परामर्श के आम कारण हैं।"
    ),
    blocks: [
      blk("Bhilwara city", "भीलवाड़ा शहर", "Textile workers can consult before or after a shift.", "कपड़ा कर्मचारी शिफ़्ट से पहले या बाद परामर्श ले सकते हैं।"),
      blk("Shahpura", "शाहपुरा", "Former district headquarters — consult without travelling.", "पूर्व ज़िला मुख्यालय — बिना सफ़र के परामर्श।"),
      blk("Mandalgarh", "मांडलगढ़", "Families can discuss doda or alcohol use privately.", "परिवार डोडा या शराब पर निजी बात कर सकते हैं।"),
      blk("Gulabpura", "गुलाबपुरा", "Mill and mining workers can get help for sleep and stress.", "मिल और खनन कर्मचारी नींद और तनाव के लिए मदद ले सकते हैं।"),
      blk("Asind", "आसींद", "Rural patients save the trip to Bhilwara city.", "ग्रामीण मरीज़ों का भीलवाड़ा शहर का सफ़र बचता है।"),
      blk("Mandal", "मांडल", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Kotri", "कोटड़ी", "Farming families can book an evening slot.", "किसान परिवार शाम का स्लॉट बुक कर सकते हैं।"),
      blk("Jahazpur", "जहाज़पुर", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Banera", "बनेड़ा", "Students can consult privately about exam stress.", "छात्र परीक्षा के तनाव पर निजी परामर्श ले सकते हैं।"),
      blk("Bijoliya", "बिजौलिया", "Stone-quarry workers can consult about sleep and alcohol use.", "पत्थर खदान के कर्मचारी नींद और शराब पर परामर्श ले सकते हैं।"),
      blk("Hurda", "हुरड़ा", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Sahara", "सहाड़ा", "Follow-ups continue by video after the first assessment.", "पहली जाँच के बाद फॉलो-अप वीडियो पर।"),
      blk("Phuliya Kalan", "फूलिया कलां", "Saves a long journey for regular follow-ups.", "नियमित फॉलो-अप में लंबा सफ़र बचता है।"),
    ],
    concerns: [C.work, C.opium, C.alcohol, C.tobacco],
    topics: ["online-psychiatrist-bhilwara", "workplace-stress-india", "doda-post-poppy-husk-addiction-india", "alcohol-addiction-treatment-india", "insomnia-treatment-india"],
  }),
  // ───────────────────────── Marwar ─────────────────────────
  district({
    slug: "pali-district",
    name: b("Pali", "पाली"),
    addiction: true,
    intro: b(
      "Pali district has a strong textile-dyeing industry, and many families have members doing business in other states. Afeem and doda use is a familiar concern in parts of Marwar.",
      "पाली ज़िले में कपड़ा रंगाई उद्योग बड़ा है, और कई परिवारों के सदस्य दूसरे राज्यों में व्यापार करते हैं। मारवाड़ के कुछ हिस्सों में अफ़ीम और डोडा का इस्तेमाल जानी-पहचानी चिंता है।"
    ),
    blocks: [
      blk("Pali city", "पाली शहर", "Textile workers and traders can consult around work hours.", "कपड़ा कर्मचारी और व्यापारी काम के समय के हिसाब से परामर्श ले सकते हैं।"),
      blk("Sojat", "सोजत", "Mehndi-trade families can book outside busy hours.", "मेहंदी व्यापार से जुड़े परिवार व्यस्त समय के बाद बुक कर सकते हैं।"),
      blk("Marwar Junction", "मारवाड़ जंक्शन", "Railway employees can choose slots around shift duty.", "रेलवे कर्मचारी शिफ़्ट ड्यूटी के हिसाब से स्लॉट चुन सकते हैं।"),
      blk("Sumerpur", "सुमेरपुर", "Families of migrant traders can join the same call from other states.", "दूसरे राज्यों में रहने वाले व्यापारियों के परिवार एक ही कॉल पर जुड़ सकते हैं।"),
      blk("Bali", "बाली", "Rural patients save the trip to Pali or Jodhpur.", "ग्रामीण मरीज़ों का पाली या जोधपुर का सफ़र बचता है।"),
      blk("Falna", "फालना", "Students can consult confidentially about stress and sleep.", "छात्र तनाव और नींद पर गोपनीय परामर्श ले सकते हैं।"),
      blk("Desuri", "देसूरी", "Tourism workers near Ranakpur can choose flexible slots.", "रणकपुर के पास के पर्यटन कर्मी सुविधाजनक स्लॉट चुन सकते हैं।"),
      blk("Rani", "रानी", "Families can discuss afeem or doda use privately.", "परिवार अफ़ीम या डोडा पर निजी बात कर सकते हैं।"),
      blk("Rohat", "रोहट", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Sadri", "सादड़ी", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
    ],
    concerns: [C.opium, C.distance, C.sexual, C.alcohol],
    topics: ["online-psychiatrist-pali", "opium-afeem-addiction-india", "psychosexual-counselling-india", "doda-post-poppy-husk-addiction-india"],
  }),
  district({
    slug: "jalore-district",
    name: b("Jalore", "जालोर"),
    addiction: true,
    intro: b(
      "Jalore district, which again includes Sanchore since December 2024, borders Gujarat. Afeem and doda post use is a long-standing concern in many villages, and many men work away in Gujarat or South India.",
      "जालोर ज़िला, जिसमें दिसंबर 2024 से फिर सांचौर शामिल है, गुजरात से लगा है। कई गाँवों में अफ़ीम और डोडा पोस्त का इस्तेमाल पुरानी चिंता है, और कई पुरुष गुजरात या दक्षिण भारत में काम करते हैं।"
    ),
    blocks: [
      blk("Jalore city", "जालोर शहर", "Granite-industry workers can consult around shifts.", "ग्रेनाइट उद्योग के कर्मचारी शिफ़्ट के हिसाब से परामर्श ले सकते हैं।"),
      blk("Bhinmal", "भीनमाल", "Traders and their families can consult privately in Hindi.", "व्यापारी और उनके परिवार हिंदी में निजी परामर्श ले सकते हैं।"),
      blk("Sanchore", "सांचौर", "Families can seek help for doda or afeem dependence confidentially.", "परिवार डोडा या अफ़ीम की लत के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Raniwara", "रानीवाड़ा", "Near the Gujarat border — Hindi care from home.", "गुजरात सीमा के पास — घर से हिंदी परामर्श।"),
      blk("Ahore", "आहोर", "Rural patients save the trip to Jodhpur.", "ग्रामीण मरीज़ों का जोधपुर का सफ़र बचता है।"),
      blk("Sayla", "सायला", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Jaswantpura", "जसवंतपुरा", "Families of men working in other states can consult together.", "दूसरे राज्यों में काम करने वाले पुरुषों के परिवार साथ परामर्श ले सकते हैं।"),
      blk("Chitalwana", "चितलवाना", "Follow-ups for opioid withdrawal can continue by video where safe.", "जहाँ सुरक्षित हो, अफ़ीम छोड़ने के फॉलो-अप वीडियो पर जारी रह सकते हैं।"),
      blk("Bagoda", "बागोड़ा", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Sarnau", "सरनाऊ", "Saves a long journey for regular follow-ups.", "नियमित फॉलो-अप में लंबा सफ़र बचता है।"),
    ],
    concerns: [C.opium, C.distance, C.alcohol, C.tobacco],
    topics: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "opioid-smack-heroin-opium-doda-addiction-india", "alcohol-addiction-treatment-india"],
  }),
  district({
    slug: "jodhpur-district",
    name: b("Jodhpur", "जोधपुर"),
    addiction: true,
    intro: b(
      "Jodhpur district, which again includes the former Jodhpur Rural area since December 2024, combines a large city with long-distance rural blocks. Afeem and doda post dependence is a common concern in western Rajasthan.",
      "जोधपुर ज़िले में दिसंबर 2024 से फिर पूर्व जोधपुर ग्रामीण क्षेत्र शामिल है; यहाँ बड़ा शहर भी है और दूर-दराज़ के ग्रामीण ब्लॉक भी। पश्चिमी राजस्थान में अफ़ीम और डोडा पोस्त की लत आम चिंता है।"
    ),
    blocks: [
      blk("Jodhpur city", "जोधपुर शहर", "Students and professionals can consult privately in the evening.", "छात्र और पेशेवर शाम को निजी परामर्श ले सकते हैं।"),
      blk("Mandore", "मंडोर", "Close to the city — saves waiting time for follow-ups.", "शहर के पास — फॉलो-अप में इंतज़ार बचता है।"),
      blk("Bilara", "बिलाड़ा", "Families can discuss afeem or doda use confidentially.", "परिवार अफ़ीम या डोडा पर गोपनीय बात कर सकते हैं।"),
      blk("Pipar City", "पीपाड़ सिटी", "Traders can consult outside market hours.", "व्यापारी बाज़ार के समय के बाद परामर्श ले सकते हैं।"),
      blk("Osian", "ओसियाँ", "Rural patients save a long trip to Jodhpur.", "ग्रामीण मरीज़ों का जोधपुर का लंबा सफ़र बचता है।"),
      blk("Luni", "लूणी", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Bhopalgarh", "भोपालगढ़", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Shergarh", "शेरगढ़", "Ex-servicemen and their families can consult privately.", "पूर्व सैनिक और उनके परिवार निजी परामर्श ले सकते हैं।"),
      blk("Balesar", "बालेसर", "Follow-ups for opioid withdrawal can continue by video where safe.", "जहाँ सुरक्षित हो, अफ़ीम छोड़ने के फॉलो-अप वीडियो पर जारी रह सकते हैं।"),
      blk("Tinwari", "तिंवरी", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
      blk("Baori", "बावड़ी", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
    ],
    concerns: [C.opium, C.alcohol, C.students, C.depression],
    topics: ["online-psychiatrist-jodhpur", "opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "alcohol-addiction-treatment-india"],
  }),
  district({
    slug: "barmer-district",
    name: b("Barmer", "बाड़मेर"),
    addiction: true,
    intro: b(
      "Barmer district (after Balotra was formed) covers long desert distances. A video consultation can save a full day of travel, especially for regular de-addiction follow-ups.",
      "बाड़मेर ज़िले (बालोतरा बनने के बाद) में रेगिस्तान की लंबी दूरियाँ हैं। वीडियो परामर्श से पूरे दिन का सफ़र बच सकता है, ख़ासकर नशा मुक्ति के नियमित फॉलो-अप में।"
    ),
    blocks: [
      blk("Barmer city", "बाड़मेर शहर", "Private video consultation in Hindi.", "हिंदी में निजी वीडियो परामर्श।"),
      blk("Chohtan", "चौहटन", "Border-area families save a long journey.", "सीमा क्षेत्र के परिवारों का लंबा सफ़र बचता है।"),
      blk("Gudamalani", "गुड़ामालानी", "Families can seek help for afeem or doda use confidentially.", "परिवार अफ़ीम या डोडा के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Baytu", "बायतु", "Oil-field and transport workers can book around shifts.", "तेल क्षेत्र और परिवहन कर्मचारी शिफ़्ट के हिसाब से बुक कर सकते हैं।"),
      blk("Sheo", "शिव", "Remote villages can reach a specialist by phone video.", "दूर के गाँव फ़ोन वीडियो से विशेषज्ञ तक पहुँच सकते हैं।"),
      blk("Ramsar", "रामसर", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Dhorimanna", "धोरीमन्ना", "Follow-ups for opioid withdrawal can continue by video where safe.", "जहाँ सुरक्षित हो, अफ़ीम छोड़ने के फॉलो-अप वीडियो पर जारी रह सकते हैं।"),
      blk("Gadra Road", "गडरा रोड", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
      blk("Sedwa", "सेड़वा", "Older adults can be assessed with family on the call.", "बुज़ुर्गों की जाँच परिवार के साथ कॉल पर हो सकती है।"),
    ],
    concerns: [C.opium, C.alcohol, C.tobacco, C.depression],
    topics: ["online-psychiatrist-barmer", "opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india", "alcohol-addiction-treatment-india"],
  }),
  district({
    slug: "balotra-district",
    name: b("Balotra", "बालोतरा"),
    addiction: true,
    intro: b(
      "Balotra district (formed in 2023 and retained) is known for textile dyeing and printing, and the Pachpadra refinery project. Shift work and afeem or alcohol use are common reasons to consult.",
      "बालोतरा ज़िला (2023 में बना और बरक़रार) कपड़ा रंगाई-छपाई और पचपदरा रिफ़ाइनरी परियोजना के लिए जाना जाता है। शिफ़्ट ड्यूटी और अफ़ीम या शराब परामर्श के आम कारण हैं।"
    ),
    blocks: [
      blk("Balotra town", "बालोतरा क़स्बा", "Textile workers can consult before or after a shift.", "कपड़ा कर्मचारी शिफ़्ट से पहले या बाद परामर्श ले सकते हैं।"),
      blk("Pachpadra", "पचपदरा", "Refinery and construction workers can book flexible slots.", "रिफ़ाइनरी और निर्माण कर्मचारी सुविधाजनक स्लॉट बुक कर सकते हैं।"),
      blk("Siwana", "सिवाना", "Families can seek help for afeem dependence confidentially.", "परिवार अफ़ीम की लत के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Samdari", "समदड़ी", "Railway-junction town — no travel for every follow-up.", "रेलवे जंक्शन क़स्बा — हर फॉलो-अप के लिए सफ़र नहीं।"),
      blk("Kalyanpur", "कल्याणपुर", "Rural patients save a long trip.", "ग्रामीण मरीज़ों का लंबा सफ़र बचता है।"),
      blk("Sindhari", "सिंधरी", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Jasol", "जसोल", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
    ],
    concerns: [C.opium, C.work, C.alcohol, C.tobacco],
    topics: ["opium-afeem-addiction-india", "workplace-stress-india", "alcohol-addiction-treatment-india"],
  }),
  // ───────────────────────── Punjab-border belt ─────────────────────────
  district({
    slug: "sri-ganganagar-district",
    name: b("Sri Ganganagar", "श्रीगंगानगर"),
    addiction: true,
    intro: b(
      "Sri Ganganagar district borders Punjab and Pakistan. Families here often ask about 'chitta' (smack/heroin) and painkiller misuse in young people — early, confidential help makes a real difference.",
      "श्रीगंगानगर ज़िला पंजाब और पाकिस्तान सीमा से लगा है। यहाँ के परिवार अक्सर युवाओं में 'चिट्टा' (स्मैक/हेरोइन) और दर्द की गोलियों के ग़लत इस्तेमाल के बारे में पूछते हैं — जल्दी और गोपनीय मदद से सच में फ़र्क़ पड़ता है।"
    ),
    blocks: [
      blk("Sri Ganganagar city", "श्रीगंगानगर शहर", "Families can consult privately about a young person's drug use.", "परिवार किसी युवा के नशे पर निजी परामर्श ले सकते हैं।"),
      blk("Suratgarh", "सूरतगढ़", "Army and power-plant families can consult from home.", "सेना और बिजलीघर से जुड़े परिवार घर से परामर्श ले सकते हैं।"),
      blk("Raisinghnagar", "रायसिंहनगर", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Anupgarh", "अनूपगढ़", "Border-area patients save a long journey.", "सीमा क्षेत्र के मरीज़ों का लंबा सफ़र बचता है।"),
      blk("Padampur", "पदमपुर", "Chitta and tablet misuse can be discussed with the family present.", "चिट्टा और गोलियों के इस्तेमाल पर परिवार की मौजूदगी में बात हो सकती है।"),
      blk("Sadulshahar", "सादुलशहर", "Close to Punjab — Hindi or Punjabi-speaking families welcome.", "पंजाब के पास — हिंदी या पंजाबी बोलने वाले परिवारों का स्वागत है।"),
      blk("Karanpur", "करणपुर", "Young people can consult confidentially.", "युवा गोपनीय परामर्श ले सकते हैं।"),
      blk("Gharsana", "घड़साना", "Rural patients can continue follow-ups by video.", "ग्रामीण मरीज़ वीडियो पर फॉलो-अप जारी रख सकते हैं।"),
      blk("Srivijaynagar", "श्रीविजयनगर", "Women can consult from home about anxiety or low mood.", "महिलाएँ घर से घबराहट या उदासी पर परामर्श ले सकती हैं।"),
      blk("Rawla Mandi", "रावला मंडी", "Hindi consultation with e-prescription on WhatsApp.", "हिंदी में परामर्श, WhatsApp पर ई-प्रिस्क्रिप्शन।"),
    ],
    concerns: [C.chitta, C.alcohol, b("Painkiller and sleeping-pill dependence", "दर्द और नींद की गोलियों की लत"), C.depression],
    topics: ["online-psychiatrist-sri-ganganagar", "smack-addiction-treatment-india", "heroin-addiction-treatment-india", "prescription-drug-dependence-india"],
  }),
  district({
    slug: "hanumangarh-district",
    name: b("Hanumangarh", "हनुमानगढ़"),
    addiction: true,
    intro: b(
      "Hanumangarh district borders Punjab and Haryana. Smack/chitta use in young people and doda post use in older adults are common concerns that families raise.",
      "हनुमानगढ़ ज़िला पंजाब और हरियाणा से लगा है। युवाओं में स्मैक/चिट्टा और बड़ों में डोडा पोस्त का इस्तेमाल ऐसी आम चिंताएँ हैं जिनके बारे में परिवार पूछते हैं।"
    ),
    blocks: [
      blk("Hanumangarh town", "हनुमानगढ़ क़स्बा", "Families can consult privately about a young person's drug use.", "परिवार किसी युवा के नशे पर निजी परामर्श ले सकते हैं।"),
      blk("Nohar", "नोहर", "Farming families can book after field work.", "किसान परिवार खेत के काम के बाद बुक कर सकते हैं।"),
      blk("Bhadra", "भादरा", "Near the Haryana border — Hindi care from home.", "हरियाणा सीमा के पास — घर से हिंदी परामर्श।"),
      blk("Sangaria", "संगरिया", "Students can consult confidentially about stress and sleep.", "छात्र तनाव और नींद पर गोपनीय परामर्श ले सकते हैं।"),
      blk("Pilibanga", "पीलीबंगा", "Doda and smack concerns can be discussed with the whole family.", "डोडा और स्मैक की चिंता पर पूरे परिवार के साथ बात हो सकती है।"),
      blk("Rawatsar", "रावतसर", "Rural patients save a long journey.", "ग्रामीण मरीज़ों का लंबा सफ़र बचता है।"),
      blk("Pallu", "पल्लू", "Families can seek help for doda or alcohol use confidentially.", "परिवार डोडा या शराब के लिए गोपनीय मदद ले सकते हैं।"),
      blk("Tibbi", "टिब्बी", "Close to Punjab — young people can consult privately.", "पंजाब के पास — युवा निजी परामर्श ले सकते हैं।"),
    ],
    concerns: [C.chitta, C.opium, C.alcohol, C.depression],
    topics: ["online-psychiatrist-hanumangarh", "smack-addiction-treatment-india", "doda-post-poppy-husk-addiction-india", "heroin-addiction-treatment-india"],
  }),
];

/** Which existing page each district's blocks are shown on. */
const PAGE_FOR: Record<string, string> = {
  "ajmer-district": "psychiatrist-ajmer",
  "beawar-district": "psychiatrist-ajmer",
  "didwana-kuchaman-district": "online-psychiatrist-kuchaman-city",
  "nagaur-district": "online-psychiatrist-nagaur",
  "sikar-district": "online-psychiatrist-sikar",
  "jhunjhunu-district": "online-psychiatrist-jhunjhunu",
  "churu-district": "online-psychiatrist-churu",
  "jaipur-district": "online-psychiatrist-jaipur",
  "kotputli-behror-district": "online-psychiatrist-alwar",
  "alwar-district": "online-psychiatrist-alwar",
  "khairthal-tijara-district": "online-psychiatrist-alwar",
  "chittorgarh-district": "online-psychiatrist-chittorgarh",
  "pratapgarh-district": "online-psychiatrist-chittorgarh",
  "bhilwara-district": "online-psychiatrist-bhilwara",
  "pali-district": "online-psychiatrist-pali",
  "jalore-district": "online-psychiatrist-jalore",
  "jodhpur-district": "online-psychiatrist-jodhpur",
  "barmer-district": "online-psychiatrist-barmer",
  "balotra-district": "online-psychiatrist-barmer",
  "sri-ganganagar-district": "online-psychiatrist-sri-ganganagar",
  "hanumangarh-district": "online-psychiatrist-hanumangarh",
};

/** Towns with their own page — never repeated as a block. Roopangarh and Arain go on the Kishangarh page. */
const HAS_OWN_PAGE = new Set(["Kishangarh", "Kuchaman City"]);
const TO_KISHANGARH = new Set(["Roopangarh", "Arain"]);
/** "Sikar city" on the Sikar page is the page itself, and Jaitaran is already covered on the Pali page. */
const isSelf = (n: string) => / (city|town)$/i.test(n) || n === "Jaitaran";

export const RAJASTHAN_BLOCKS: Record<string, BlockGroup[]> = {};
export const DEADDICTION_PAGES = new Set<string>();

for (const d of DISTRICT_DATA) {
  const page = PAGE_FOR[d.slug];
  if (!page) throw new Error(`no page for ${d.slug}`);
  const label = b(`${d.name.en} district`, `${d.name.hi} ज़िला`);
  const items = d.blocks.filter((x) => !HAS_OWN_PAGE.has(x.name.en) && !TO_KISHANGARH.has(x.name.en) && !isSelf(x.name.en));
  const moved = d.blocks.filter((x) => TO_KISHANGARH.has(x.name.en));
  (RAJASTHAN_BLOCKS[page] ??= []).push({ district: label, intro: d.intro, items });
  if (moved.length) (RAJASTHAN_BLOCKS["online-psychiatrist-kishangarh"] ??= []).push({ district: label, items: moved });
  if (d.addiction) DEADDICTION_PAGES.add(page);
}

// The page's own district first (e.g. Alwar before Kotputli-Behror and Khairthal-Tijara on the Alwar page).
for (const [slug, groups] of Object.entries(RAJASTHAN_BLOCKS)) {
  const own = (g: BlockGroup) => (slug.includes(g.district.en.replace(/ district$/, "").toLowerCase().replace(/\s+/g, "-")) ? 0 : 1);
  groups.sort((x, y) => own(x) - own(y));
}
