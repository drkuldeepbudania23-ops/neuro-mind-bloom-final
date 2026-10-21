import type { ConditionContent, FaqItem } from "../types";
import type { L10n } from "../../i18n";

/**
 * City pages for patients across Rajasthan. Consultation is by video, so each
 * page is honest about that and adds city-specific nearby areas — they are not
 * thin "doorway" pages pretending to be local clinics.
 */
type City = { slug: string; name: L10n; areas: L10n; note: L10n; focus?: string[] };

const CITIES: City[] = [
  { slug: "jaipur", name: { en: "Jaipur", hi: "जयपुर" }, areas: { en: "Jaipur city, Sanganer, Chomu, Bassi, Dudu, Kotputli and Phagi", hi: "जयपुर शहर, सांगानेर, चौमूं, बस्सी, दूदू, कोटपूतली और फागी" }, note: { en: "Busy professionals and students in Jaipur often prefer video consultation to avoid traffic and waiting time.", hi: "जयपुर के व्यस्त लोग और छात्र ट्रैफ़िक और इंतज़ार से बचने के लिए अक्सर वीडियो परामर्श पसंद करते हैं।" }, focus: ["workplace-stress-india", "social-media-overuse-india"] },
  { slug: "jodhpur", name: { en: "Jodhpur", hi: "जोधपुर" }, areas: { en: "Jodhpur city, Phalodi, Bilara, Osian, Pipar and Luni", hi: "जोधपुर शहर, फलोदी, बिलाड़ा, ओसियाँ, पीपाड़ और लूणी" }, note: { en: "Opium and doda post dependence is a common concern in western Rajasthan — supervised treatment is available online.", hi: "पश्चिमी राजस्थान में अफ़ीम और डोडा पोस्त की लत आम चिंता है — निगरानी में इलाज ऑनलाइन उपलब्ध है।" }, focus: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india"] },
  { slug: "kota", name: { en: "Kota", hi: "कोटा" }, areas: { en: "Kota city, coaching hostels, Ramganj Mandi, Sangod, Baran and Jhalawar", hi: "कोटा शहर, कोचिंग हॉस्टल, रामगंज मंडी, सांगोद, बारां और झालावाड़" }, note: { en: "Coaching students in Kota can consult privately from their hostel about exam stress, sleep, low mood or anxiety.", hi: "कोटा के कोचिंग छात्र परीक्षा के तनाव, नींद, उदासी या घबराहट के लिए हॉस्टल से निजी परामर्श ले सकते हैं।" }, focus: ["neet-exam-stress-india", "jee-exam-stress-india", "suicide-prevention-crisis-support-india"] },
  { slug: "udaipur", name: { en: "Udaipur", hi: "उदयपुर" }, areas: { en: "Udaipur city, Rajsamand, Nathdwara, Salumber and Dungarpur", hi: "उदयपुर शहर, राजसमंद, नाथद्वारा, सलूंबर और डूंगरपुर" }, note: { en: "Families in tribal and rural areas around Udaipur can access specialist care without long travel.", hi: "उदयपुर के आसपास के आदिवासी और ग्रामीण इलाकों के परिवार लंबी यात्रा के बिना विशेषज्ञ इलाज पा सकते हैं।" }, focus: ["child-psychiatrist-india", "alcohol-addiction-treatment-india"] },
  { slug: "bhilwara", name: { en: "Bhilwara", hi: "भीलवाड़ा" }, areas: { en: "Bhilwara city, Shahpura, Mandalgarh, Gulabpura and Asind", hi: "भीलवाड़ा शहर, शाहपुरा, मांडलगढ़, गुलाबपुरा और आसींद" }, note: { en: "Textile-industry shift workers often face sleep and stress problems — consultations can fit around shifts.", hi: "कपड़ा उद्योग में शिफ़्ट में काम करने वालों को अक्सर नींद और तनाव की समस्या होती है — परामर्श शिफ़्ट के हिसाब से हो सकता है।" }, focus: ["sleep-problems-students-india", "workplace-stress-india"] },
  { slug: "nagaur", name: { en: "Nagaur", hi: "नागौर" }, areas: { en: "Nagaur city, Merta, Makrana, Ladnun, Didwana and Kuchaman", hi: "नागौर शहर, मेड़ता, मकराना, लाडनूं, डीडवाना और कुचामन" }, note: { en: "Nagaur is close to Ajmer; patients can consult by video and continue follow-ups from home.", hi: "नागौर अजमेर के पास है; मरीज़ वीडियो से परामर्श लेकर घर से ही फॉलो-अप जारी रख सकते हैं।" }, focus: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india"] },
  { slug: "bikaner", name: { en: "Bikaner", hi: "बीकानेर" }, areas: { en: "Bikaner city, Nokha, Lunkaransar, Kolayat and Shri Dungargarh", hi: "बीकानेर शहर, नोखा, लूणकरणसर, कोलायत और श्रीडूंगरगढ़" }, note: { en: "Video consultation saves long journeys across the desert districts.", hi: "वीडियो परामर्श से रेगिस्तानी ज़िलों में लंबी यात्रा बचती है।" }, focus: ["doda-post-poppy-husk-addiction-india", "alzheimers-disease-india"] },
  { slug: "tonk", name: { en: "Tonk", hi: "टोंक" }, areas: { en: "Tonk city, Malpura, Niwai, Deoli, Uniara and Todaraisingh", hi: "टोंक शहर, मालपुरा, निवाई, देवली, उनियारा और टोडारायसिंह" }, note: { en: "Tonk borders Ajmer district; consultations are available in Hindi.", hi: "टोंक अजमेर ज़िले से लगा है; परामर्श हिंदी में उपलब्ध है।" }, focus: ["womens-mental-health-india", "smack-addiction-treatment-india"] },
  { slug: "sikar", name: { en: "Sikar", hi: "सीकर" }, areas: { en: "Sikar city, Fatehpur, Laxmangarh, Neem Ka Thana, Khandela and Danta Ramgarh", hi: "सीकर शहर, फतेहपुर, लक्ष्मणगढ़, नीम का थाना, खंडेला और दांता रामगढ़" }, note: { en: "Shekhawati's coaching students and families of workers abroad can consult from home.", hi: "शेखावाटी के कोचिंग छात्र और विदेश में काम करने वालों के परिवार घर से परामर्श ले सकते हैं।" }, focus: ["neet-exam-stress-india", "jee-exam-stress-india"] },
  { slug: "kishangarh", name: { en: "Kishangarh", hi: "किशनगढ़" }, areas: { en: "Kishangarh city, Madanganj, Roopangarh, Arain and nearby villages", hi: "किशनगढ़ शहर, मदनगंज, रूपनगढ़, अराईं और आसपास के गाँव" }, note: { en: "Kishangarh is in Ajmer district. Marble-industry and transport workers can book early-morning or evening video slots around work.", hi: "किशनगढ़ अजमेर ज़िले में है। मार्बल उद्योग और परिवहन से जुड़े लोग काम के हिसाब से सुबह या शाम के वीडियो स्लॉट ले सकते हैं।" }, focus: ["doda-post-poppy-husk-addiction-india", "workplace-stress-india", "alcohol-addiction-treatment-india"] },
  { slug: "kuchaman-city", name: { en: "Kuchaman City", hi: "कुचामन सिटी" }, areas: { en: "Kuchaman City, Nawa, Makrana, Parbatsar, Didwana and Ladnun", hi: "कुचामन सिटी, नावां, मकराना, परबतसर, डीडवाना और लाडनूं" }, note: { en: "Kuchaman City is a growing coaching and education centre; students and families can consult privately about exam stress, sleep and mood.", hi: "कुचामन सिटी उभरता हुआ कोचिंग और शिक्षा केंद्र है; छात्र और परिवार परीक्षा के तनाव, नींद और मूड पर निजी परामर्श ले सकते हैं।" }, focus: ["neet-exam-stress-india", "exam-anxiety-students-india", "opium-afeem-addiction-india"] },
  { slug: "alwar", name: { en: "Alwar", hi: "अलवर" }, areas: { en: "Alwar city, Bhiwadi, Behror, Neemrana, Tijara and Rajgarh", hi: "अलवर शहर, भिवाड़ी, बहरोड़, नीमराना, तिजारा और राजगढ़" }, note: { en: "Industrial workers in the Bhiwadi–Neemrana belt often work rotating shifts; consultations can be booked before or after a shift.", hi: "भिवाड़ी–नीमराना औद्योगिक क्षेत्र के कर्मचारी अक्सर बदलती शिफ़्ट में काम करते हैं; परामर्श शिफ़्ट से पहले या बाद में बुक किया जा सकता है।" }, focus: ["workplace-stress-india", "alcohol-addiction-treatment-india", "insomnia-treatment-india"] },
  { slug: "bharatpur", name: { en: "Bharatpur", hi: "भरतपुर" }, areas: { en: "Bharatpur city, Deeg, Kumher, Nadbai, Bayana and Kaman", hi: "भरतपुर शहर, डीग, कुम्हेर, नदबई, बयाना और कामां" }, note: { en: "Bharatpur borders Uttar Pradesh and Haryana; families on either side can consult in Hindi without travelling to a big city.", hi: "भरतपुर उत्तर प्रदेश और हरियाणा से लगा है; दोनों ओर के परिवार बड़े शहर गए बिना हिंदी में परामर्श ले सकते हैं।" }, focus: ["depression-treatment-india", "alcohol-addiction-treatment-india"] },
  { slug: "chittorgarh", name: { en: "Chittorgarh", hi: "चित्तौड़गढ़" }, areas: { en: "Chittorgarh city, Nimbahera, Begun, Kapasan, Rawatbhata and Pratapgarh", hi: "चित्तौड़गढ़ शहर, निंबाहेड़ा, बेगूं, कपासन, रावतभाटा और प्रतापगढ़" }, note: { en: "The Chittorgarh–Pratapgarh region is part of India's licensed opium-poppy belt, so afeem and doda post dependence is a familiar concern for many families.", hi: "चित्तौड़गढ़–प्रतापगढ़ क्षेत्र भारत के लाइसेंसशुदा अफ़ीम खेती वाले इलाक़े में आता है, इसलिए अफ़ीम और डोडा पोस्त की लत कई परिवारों की जानी-पहचानी चिंता है।" }, focus: ["opium-afeem-addiction-india", "doda-post-poppy-husk-addiction-india"] },
  { slug: "sri-ganganagar", name: { en: "Sri Ganganagar", hi: "श्रीगंगानगर" }, areas: { en: "Sri Ganganagar city, Suratgarh, Raisinghnagar, Anupgarh, Padampur and Sadulshahar", hi: "श्रीगंगानगर शहर, सूरतगढ़, रायसिंहनगर, अनूपगढ़, पदमपुर और सादुलशहर" }, note: { en: "Families in the Punjab-border belt often ask about 'chitta' (smack/heroin) and painkiller misuse in young people — early, confidential help makes a difference.", hi: "पंजाब सीमा से लगे इलाक़े के परिवार अक्सर युवाओं में 'चिट्टा' (स्मैक/हेरोइन) और दर्द की गोलियों के ग़लत इस्तेमाल के बारे में पूछते हैं — जल्दी, गोपनीय मदद से फ़र्क़ पड़ता है।" }, focus: ["smack-addiction-treatment-india", "heroin-addiction-treatment-india", "prescription-drug-dependence-india"] },
  { slug: "hanumangarh", name: { en: "Hanumangarh", hi: "हनुमानगढ़" }, areas: { en: "Hanumangarh, Nohar, Bhadra, Sangaria, Pilibanga and Rawatsar", hi: "हनुमानगढ़, नोहर, भादरा, संगरिया, पीलीबंगा और रावतसर" }, note: { en: "Farming families can consult after field work hours; doda post and smack concerns can be discussed privately with the whole family if needed.", hi: "किसान परिवार खेत के काम के बाद परामर्श ले सकते हैं; डोडा पोस्त और स्मैक की चिंता पर ज़रूरत हो तो पूरे परिवार के साथ निजी बात हो सकती है।" }, focus: ["doda-post-poppy-husk-addiction-india", "smack-addiction-treatment-india"] },
  { slug: "jhunjhunu", name: { en: "Jhunjhunu", hi: "झुंझुनूं" }, areas: { en: "Jhunjhunu, Pilani, Chirawa, Nawalgarh, Khetri and Udaipurwati", hi: "झुंझुनूं, पिलानी, चिड़ावा, नवलगढ़, खेतड़ी और उदयपुरवाटी" }, note: { en: "Many Jhunjhunu households have members serving in the armed forces or working far away; older parents living alone and students in Pilani can both consult from home.", hi: "झुंझुनूं के कई परिवारों के सदस्य सेना में या दूर नौकरी करते हैं; अकेले रहने वाले बुज़ुर्ग माता-पिता और पिलानी के छात्र दोनों घर से परामर्श ले सकते हैं।" }, focus: ["late-life-depression-india", "exam-anxiety-students-india", "ptsd-trauma-treatment-india"] },
  { slug: "churu", name: { en: "Churu", hi: "चूरू" }, areas: { en: "Churu, Ratangarh, Sardarshahar, Sujangarh, Rajgarh (Sadulpur) and Taranagar", hi: "चूरू, रतनगढ़, सरदारशहर, सुजानगढ़, राजगढ़ (सादुलपुर) और तारानगर" }, note: { en: "Churu's extreme summer heat disturbs sleep for many people, and families of workers in the Gulf often carry long-distance stress — both are common reasons to consult.", hi: "चूरू की तेज़ गर्मी में कई लोगों की नींद ख़राब होती है, और खाड़ी देशों में काम करने वालों के परिवार दूरी का तनाव झेलते हैं — दोनों परामर्श के आम कारण हैं।" }, focus: ["insomnia-treatment-india", "depression-treatment-india", "generalized-anxiety-disorder-india"] },
  { slug: "barmer", name: { en: "Barmer", hi: "बाड़मेर" }, areas: { en: "Barmer, Balotra, Siwana, Chohtan, Gudamalani and Baytu", hi: "बाड़मेर, बालोतरा, सिवाना, चौहटन, गुड़ामालानी और बायतु" }, note: { en: "Distances in Barmer district are long; video consultation saves a full day of travel, especially for follow-ups in afeem or alcohol de-addiction.", hi: "बाड़मेर ज़िले में दूरियाँ लंबी हैं; वीडियो परामर्श से पूरे दिन का सफ़र बचता है, ख़ासकर अफ़ीम या शराब नशा मुक्ति के फॉलो-अप में।" }, focus: ["opium-afeem-addiction-india", "alcohol-addiction-treatment-india"] },
  { slug: "jaisalmer", name: { en: "Jaisalmer", hi: "जैसलमेर" }, areas: { en: "Jaisalmer city, Pokaran, Ramgarh, Fatehgarh and Mohangarh", hi: "जैसलमेर शहर, पोकरण, रामगढ़, फतेहगढ़ और मोहनगढ़" }, note: { en: "Specialist mental health care is far from most of Jaisalmer district; tourism workers with late or seasonal hours can choose a convenient video slot.", hi: "जैसलमेर ज़िले के ज़्यादातर हिस्सों से विशेषज्ञ मानसिक स्वास्थ्य सेवा दूर है; देर रात या मौसमी काम करने वाले पर्यटन कर्मी सुविधाजनक वीडियो स्लॉट चुन सकते हैं।" }, focus: ["alcohol-addiction-treatment-india", "depression-treatment-india", "sleep-disorders-psychiatrist-india"] },
  { slug: "bundi", name: { en: "Bundi", hi: "बूंदी" }, areas: { en: "Bundi city, Hindoli, Nainwa, Keshoraipatan, Lakheri and Talera", hi: "बूंदी शहर, हिंडोली, नैनवा, केशोरायपाटन, लाखेरी और तालेड़ा" }, note: { en: "Bundi is next to the Kota coaching hub; many local students and their parents look for help with exam stress, sleep and concentration.", hi: "बूंदी कोटा के कोचिंग केंद्र के पास है; यहाँ के कई छात्र और माता-पिता परीक्षा के तनाव, नींद और ध्यान के लिए मदद चाहते हैं।" }, focus: ["neet-exam-stress-india", "concentration-problems-students-india"] },
  { slug: "sawai-madhopur", name: { en: "Sawai Madhopur", hi: "सवाई माधोपुर" }, areas: { en: "Sawai Madhopur, Gangapur City, Bamanwas, Khandar, Bonli and Chauth Ka Barwara", hi: "सवाई माधोपुर, गंगापुर सिटी, बामनवास, खंडार, बौंली और चौथ का बरवाड़ा" }, note: { en: "Families from farming villages and tourism-linked work around Ranthambore can consult without a long trip to Jaipur.", hi: "रणथंभौर के आसपास खेती और पर्यटन से जुड़े परिवार जयपुर की लंबी यात्रा के बिना परामर्श ले सकते हैं।" }, focus: ["depression-treatment-india", "alcohol-addiction-treatment-india", "sex-specialist-india"] },
  { slug: "dausa", name: { en: "Dausa", hi: "दौसा" }, areas: { en: "Dausa city, Bandikui, Lalsot, Mahwa, Sikrai and Baswa", hi: "दौसा शहर, बांदीकुई, लालसोट, महवा, सिकराय और बसवा" }, note: { en: "Dausa is close to Jaipur on the highway, but a video consultation still saves travel and waiting time for regular follow-ups.", hi: "दौसा हाईवे पर जयपुर के पास है, फिर भी नियमित फॉलो-अप के लिए वीडियो परामर्श से सफ़र और इंतज़ार बचता है।" }, focus: ["generalized-anxiety-disorder-india", "alcohol-addiction-treatment-india"] },
  { slug: "pali", name: { en: "Pali", hi: "पाली" }, areas: { en: "Pali city, Sojat, Jaitaran, Marwar Junction, Sumerpur and Bali", hi: "पाली शहर, सोजत, जैतारण, मारवाड़ जंक्शन, सुमेरपुर और बाली" }, note: { en: "De-addiction and sexual health concerns can be discussed in complete privacy.", hi: "नशा मुक्ति और यौन स्वास्थ्य की बातें पूरी गोपनीयता के साथ की जा सकती हैं।" }, focus: ["opium-afeem-addiction-india", "psychosexual-counselling-india"] },
];

const FAQS = (city: L10n): FaqItem[] => [
  {
    q: { en: `Do I need to travel from ${city.en}?`, hi: `क्या ${city.hi} से यात्रा करनी होगी?` },
    a: {
      en: "No. Consultation is by private video call on your phone. If an in-person examination or tests are needed, you will be guided.",
      hi: "नहीं। परामर्श आपके फ़ोन पर निजी वीडियो कॉल से होता है। अगर शारीरिक जाँच या टेस्ट ज़रूरी हों, तो आपको बताया जाएगा।",
    },
  },
  {
    q: { en: "Will local chemists accept the e-prescription?", hi: "क्या स्थानीय दवा दुकान ई-प्रिस्क्रिप्शन मानेगी?" },
    a: {
      en: "Yes. You receive a digitally signed prescription as per India's Telemedicine Practice Guidelines.",
      hi: "हाँ। आपको भारत के टेलीमेडिसिन दिशानिर्देशों के अनुसार डिजिटल हस्ताक्षरित पर्चा मिलता है।",
    },
  },
  {
    q: { en: "What are the fees?", hi: "फीस कितनी है?" },
    a: { en: "Psychiatry consultation ₹500; psychotherapy ₹1500 first session, ₹1000 follow-up.", hi: "मनोरोग परामर्श ₹500; साइकोथेरेपी पहला सत्र ₹1500, फॉलो-अप ₹1000।" },
  },
];

export const CITY_PAGES: ConditionContent[] = CITIES.map((c) => ({
  slug: `online-psychiatrist-${c.slug}`,
  category: "service" as const,
  group: "service" as const,
  name: { en: `Psychiatrist for ${c.name.en}`, hi: `${c.name.hi} के लिए मनोचिकित्सक` },
  title: { en: `Online Psychiatrist for ${c.name.en} – Video Consultation`, hi: `${c.name.hi} के लिए ऑनलाइन मनोचिकित्सक – वीडियो परामर्श` },
  h1: { en: `Online psychiatrist for ${c.name.en}`, hi: `${c.name.hi} के मरीज़ों के लिए ऑनलाइन मनोचिकित्सक` },
  description: {
    en: `Online psychiatrist for ${c.name.en}: private video consultation for depression, anxiety, de-addiction, sleep and sexual health. Dr. Kuldeep Budania, MD.`,
    hi: `${c.name.hi} के मरीज़ों के लिए निजी वीडियो परामर्श — डिप्रेशन, घबराहट, नशा मुक्ति, नींद और यौन स्वास्थ्य। डॉ. कुलदीप बुडानिया, MD।`,
  },
  intro: [
    {
      en: `Neuro Mind Bloom is based in Ajmer and offers private video consultations to patients from ${c.areas.en}.`,
      hi: `Neuro Mind Bloom अजमेर में है और ${c.areas.hi} के मरीज़ों को निजी वीडियो परामर्श देता है।`,
    },
    c.note,
  ],
  headings: {
    symptoms: { en: "What we treat", hi: "किन समस्याओं का इलाज होता है" },
    causes: { en: "Why consult online", hi: "ऑनलाइन परामर्श क्यों" },
    treatment: { en: "How it works", hi: "प्रक्रिया" },
    seekHelp: { en: "When to consult", hi: "कब परामर्श लें" },
  },
  symptoms: [
    { en: "Depression, anxiety, panic and OCD", hi: "डिप्रेशन, घबराहट, पैनिक और OCD" },
    { en: "Alcohol, afeem/doda, smack, tobacco and other addictions", hi: "शराब, अफ़ीम/डोडा, स्मैक, तंबाकू और दूसरे नशे" },
    { en: "Sleep problems and stress", hi: "नींद की समस्या और तनाव" },
    { en: "Sexual health concerns", hi: "यौन स्वास्थ्य की समस्याएँ" },
    { en: "Bipolar disorder and psychosis", hi: "बाइपोलर और मनोविकृति" },
    { en: "Child, student and elderly mental health", hi: "बच्चों, छात्रों और बुज़ुर्गों का मानसिक स्वास्थ्य" },
  ],
  causes: [
    { en: "No travel or waiting room — consult from home", hi: "न सफ़र, न इंतज़ार — घर से परामर्श" },
    { en: "Complete privacy for sensitive concerns", hi: "संवेदनशील बातों के लिए पूरी गोपनीयता" },
    { en: "MD Psychiatry, Senior Specialist, 8+ years' experience", hi: "MD मनोचिकित्सा, सीनियर स्पेशलिस्ट, 8+ वर्षों का अनुभव" },
    { en: "Hindi or English, e-prescription on WhatsApp", hi: "हिंदी या अंग्रेज़ी, WhatsApp पर ई-प्रिस्क्रिप्शन" },
  ],
  treatment: [
    { en: "Book on the website or WhatsApp", hi: "वेबसाइट या WhatsApp पर बुक करें" },
    { en: "Get confirmation and pay securely", hi: "पुष्टि पाएँ और सुरक्षित भुगतान करें" },
    { en: "Join the private video link", hi: "निजी वीडियो लिंक पर जुड़ें" },
    { en: "Receive your e-prescription and follow-up plan", hi: "ई-प्रिस्क्रिप्शन और फॉलो-अप योजना पाएँ" },
  ],
  seekHelp: [
    { en: "Symptoms for more than two weeks or affecting daily life", hi: "दो हफ़्ते से ज़्यादा लक्षण या रोज़ की ज़िंदगी पर असर" },
    { en: "Unable to stop alcohol, opium or other substances", hi: "शराब, अफ़ीम या दूसरा नशा छोड़ न पाना" },
    { en: `In an emergency, go to the nearest hospital in ${c.name.en} or call 112`, hi: `इमरजेंसी में ${c.name.hi} के नज़दीकी अस्पताल जाएँ या 112 पर कॉल करें` },
  ],
  faqs: FAQS(c.name),
  related: [...(c.focus ?? []), "online-psychiatrist-india", "deaddiction-psychiatrist-india", "depression-treatment-india", "psychiatrist-ajmer"],
}));

export const CITY_LIST = CITIES.map((c) => ({ slug: `online-psychiatrist-${c.slug}`, name: c.name }));
