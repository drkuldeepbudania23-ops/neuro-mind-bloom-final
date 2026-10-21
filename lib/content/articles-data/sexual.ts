import { batch } from "./_build";

type P = [string, string];
const PRIVATE_HELP: P = ["A private video consultation is available in Hindi or English; your partner can join if you wish", "हिंदी या अंग्रेज़ी में निजी वीडियो परामर्श उपलब्ध है; आप चाहें तो साथी भी जुड़ सकते हैं"];

export const SEXUAL_ARTICLES = batch("sexual", [
  {
    slug: "premature-ejaculation-stop-start-technique",
    title: ["Premature ejaculation: the stop-start and squeeze techniques", "शीघ्रपतन: स्टॉप-स्टार्ट और स्क्वीज़ तकनीक"],
    excerpt: ["Simple behavioural techniques that help men gain control over ejaculation, how to practise them with a partner, and when medical treatment helps.", "आसान व्यवहारिक तकनीकें जिनसे पुरुष स्खलन पर नियंत्रण पाते हैं, साथी के साथ अभ्यास कैसे करें, और कब डॉक्टरी इलाज मदद करता है।"],
    related: ["premature-ejaculation-treatment-india", "sexual-performance-anxiety-india", "psychosexual-counselling-india"],
    refs: ["issm-pe", "icd11"],
    intro: [
      ["Premature ejaculation is one of the most common male sexual concerns. Anxiety often makes it worse, creating a cycle.", "शीघ्रपतन पुरुषों की सबसे आम यौन चिंताओं में से एक है। घबराहट अक्सर इसे बढ़ाती है और एक चक्र बन जाता है।"],
      ["Behavioural techniques train awareness of arousal and are effective, especially combined with counselling and, when needed, medicines.", "व्यवहारिक तकनीकें उत्तेजना की पहचान सिखाती हैं और असरदार हैं, ख़ासकर काउंसलिंग और ज़रूरत हो तो दवाओं के साथ।"],
    ],
    key: [
      ["Learn to recognise the 'point of no return'", "'वापसी न होने वाले बिंदु' को पहचानना सीखें"],
      ["Practice is gradual and pressure-free", "अभ्यास धीरे-धीरे और बिना दबाव के"],
      ["Partner involvement improves results", "साथी की भागीदारी से नतीजे बेहतर"],
    ],
    sym: [
      ["Ejaculation sooner than desired, most of the time", "ज़्यादातर बार चाहे से जल्दी स्खलन"],
      ["Little sense of control", "नियंत्रण का बहुत कम एहसास"],
      ["Distress, avoidance of intimacy", "परेशानी, नज़दीकी से बचना"],
    ],
    cause: [
      ["Performance anxiety and stress", "परफ़ॉर्मेंस की घबराहट और तनाव"],
      ["Habit of rushing during masturbation", "हस्तमैथुन के दौरान जल्दबाज़ी की आदत"],
      ["Biological sensitivity; sometimes thyroid or prostate issues", "जैविक संवेदनशीलता; कभी-कभी थायरॉइड या प्रोस्टेट की समस्या"],
    ],
    risk: [
      ["New relationship or long gaps between intercourse", "नया रिश्ता या संबंधों के बीच लंबा अंतराल"],
      ["Erectile difficulties", "इरेक्शन की कठिनाई"],
      ["Myths and guilt about sex", "सेक्स को लेकर मिथक और अपराधबोध"],
    ],
    mgmt: [
      ["Stop-start: stimulate until close to climax, stop until the urge settles, repeat 3–4 times", "स्टॉप-स्टार्ट: चरम के क़रीब तक उत्तेजना, इच्छा शांत होने तक रुकें, 3–4 बार दोहराएँ"],
      ["Squeeze: gentle pressure below the head of the penis to reduce the urge", "स्क्वीज़: इच्छा कम करने के लिए लिंग के सिरे के नीचे हल्का दबाव"],
      ["Practise alone first, then with a partner", "पहले अकेले, फिर साथी के साथ अभ्यास"],
      ["Prescription medicines or topical options when advised by a doctor", "डॉक्टर की सलाह पर दवाएँ या लगाने वाले विकल्प"],
    ],
    help: [
      ["Problem persisting for months and causing distress", "महीनों से समस्या और परेशानी"],
      ["Erection problems as well", "साथ में इरेक्शन की समस्या"],
      PRIVATE_HELP,
    ],
    faq: [
      ["How long does normal intercourse last?", "सामान्य संबंध कितनी देर चलता है?", "On average a few minutes; films and advertisements give unrealistic expectations.", "औसतन कुछ मिनट; फ़िल्में और विज्ञापन अवास्तविक उम्मीदें देते हैं।"],
      ["Do desensitising sprays from shops work?", "क्या दुकानों के स्प्रे काम करते हैं?", "Some topical products can help, but use them only after advice — some reduce sensation for the partner too.", "कुछ लगाने वाले उत्पाद मदद कर सकते हैं, पर सलाह के बाद ही — कुछ साथी की संवेदना भी कम करते हैं।"],
    ],
    tags: ["shighrapatan", "jaldi discharge", "pe", "timing"],
    video: ["premature", "शीघ्रपतन"],
  },
  {
    slug: "erectile-problems-in-young-men",
    title: ["Erection problems in young men: causes and solutions", "युवा पुरुषों में इरेक्शन की समस्या: कारण और समाधान"],
    excerpt: ["Erectile difficulty in men under 40 is often linked to anxiety, stress, lifestyle or pornography. How to understand it and get effective help.", "40 से कम उम्र के पुरुषों में इरेक्शन की दिक़्क़त अक्सर घबराहट, तनाव, जीवनशैली या पोर्नोग्राफ़ी से जुड़ी होती है। इसे समझें और असरदार मदद लें।"],
    related: ["erectile-dysfunction-treatment-india", "sexual-performance-anxiety-india", "sexual-health-myths-india"],
    refs: ["aua-ed", "icd11"],
    intro: [
      ["Occasional difficulty is normal. When it happens repeatedly, young men often fear something is seriously wrong.", "कभी-कभार की दिक़्क़त सामान्य है। जब यह बार-बार हो, तो युवा अक्सर डर जाते हैं कि कुछ गंभीर ग़लत है।"],
      ["In younger men, psychological and lifestyle causes are common and very treatable, but a basic medical check is still sensible.", "युवाओं में मानसिक और जीवनशैली से जुड़े कारण आम हैं और अच्छे से ठीक होते हैं, फिर भी बुनियादी शारीरिक जाँच समझदारी है।"],
    ],
    key: [
      ["Normal morning erections suggest the body can function", "सुबह सामान्य इरेक्शन बताता है कि शरीर ठीक काम कर सकता है"],
      ["Worry about failure itself causes failure", "असफल होने की चिंता ही असफलता का कारण बनती है"],
      ["Treatment combines counselling, lifestyle change and, if needed, medicines", "इलाज में काउंसलिंग, जीवनशैली बदलाव और ज़रूरत हो तो दवाएँ"],
    ],
    sym: [
      ["Difficulty getting or keeping an erection with a partner", "साथी के साथ इरेक्शन होने या टिकने में दिक़्क़त"],
      ["Normal erections alone or in the morning (often psychological)", "अकेले या सुबह सामान्य इरेक्शन (अक्सर मानसिक कारण)"],
      ["Avoiding intimacy, low confidence", "नज़दीकी से बचना, कम आत्मविश्वास"],
    ],
    cause: [
      ["Performance anxiety, stress, depression", "परफ़ॉर्मेंस की घबराहट, तनाव, डिप्रेशन"],
      ["Smoking, alcohol, poor sleep, low activity", "धूम्रपान, शराब, ख़राब नींद, कम गतिविधि"],
      ["Diabetes, hormone problems or medicines — less common in the young but possible", "डायबिटीज़, हार्मोन की समस्या या दवाएँ — युवाओं में कम पर संभव"],
    ],
    risk: [
      ["Heavy pornography use and unrealistic expectations", "बहुत ज़्यादा पोर्नोग्राफ़ी और अवास्तविक उम्मीदें"],
      ["Myths about dhat or masturbation", "धात या हस्तमैथुन के मिथक"],
      ["Relationship conflict", "रिश्ते में कलह"],
    ],
    mgmt: [
      ["Medical check: sugar, BP, lipids; hormones if indicated", "शारीरिक जाँच: शुगर, बीपी, लिपिड; ज़रूरत हो तो हार्मोन"],
      ["Psychosexual counselling and sensate focus", "साइकोसेक्सुअल काउंसलिंग और सेंसेट फ़ोकस"],
      ["Quit smoking, reduce alcohol, exercise, sleep", "धूम्रपान छोड़ें, शराब कम करें, व्यायाम, नींद"],
      ["Prescription medicines when appropriate — never unlabelled 'power' products", "उचित हो तो डॉक्टरी दवाएँ — बिना लेबल वाले 'ताक़त' उत्पाद कभी नहीं"],
    ],
    help: [
      ["Problem lasting several weeks or causing distress", "कई हफ़्तों से समस्या या परेशानी"],
      ["Chest pain on exertion or diabetes symptoms", "मेहनत पर सीने में दर्द या डायबिटीज़ के लक्षण"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is it permanent?", "क्या यह स्थायी है?", "Rarely in young men. Most improve with counselling and lifestyle changes.", "युवाओं में शायद ही। ज़्यादातर काउंसलिंग और जीवनशैली बदलाव से सुधरते हैं।"],
      ["Are online 'stamina' capsules safe?", "क्या ऑनलाइन 'स्टैमिना' कैप्सूल सुरक्षित हैं?", "Many contain hidden drugs or steroids. Use only medicines prescribed after assessment.", "कई में छिपी दवाएँ या स्टेरॉयड होते हैं। जाँच के बाद लिखी गई दवाएँ ही लें।"],
    ],
    tags: ["erection", "napunsakta", "kamzori", "ed"],
    video: ["erectile", "इरेक्शन"],
  },
  {
    slug: "erectile-dysfunction-heart-diabetes-warning",
    title: ["Erectile dysfunction as an early warning of heart disease and diabetes", "इरेक्शन की समस्या: दिल की बीमारी और डायबिटीज़ की शुरुआती चेतावनी"],
    excerpt: ["Blood-vessel problems often show up in erections before the heart. Why men with ED should get BP, sugar and cholesterol checked.", "नसों की समस्या अक्सर दिल से पहले इरेक्शन में दिखती है। इरेक्शन की समस्या वाले पुरुषों को बीपी, शुगर और कोलेस्ट्रॉल क्यों जाँचना चाहिए।"],
    related: ["erectile-dysfunction-treatment-india", "sex-specialist-india"],
    refs: ["aua-ed"],
    intro: [
      ["An erection depends on healthy blood vessels. The small vessels of the penis can show damage earlier than larger heart arteries.", "इरेक्शन स्वस्थ नसों पर निर्भर करता है। लिंग की छोटी नसों में नुकसान दिल की बड़ी धमनियों से पहले दिख सकता है।"],
      ["Treating ED is a chance to protect overall health.", "इरेक्शन की समस्या का इलाज पूरी सेहत बचाने का मौक़ा है।"],
    ],
    key: [
      ["ED in men over 40 deserves a cardiovascular check", "40 से ज़्यादा उम्र के पुरुषों में ED पर दिल-नसों की जाँच ज़रूरी"],
      ["Diabetes commonly causes erectile and ejaculatory problems", "डायबिटीज़ अक्सर इरेक्शन और स्खलन की समस्या करती है"],
      ["Lifestyle change improves both heart and sexual health", "जीवनशैली बदलाव दिल और यौन सेहत दोनों सुधारता है"],
    ],
    sym: [
      ["Gradual decline in erection quality over months", "महीनों में इरेक्शन की गुणवत्ता में धीरे-धीरे कमी"],
      ["Reduced morning erections", "सुबह के इरेक्शन कम होना"],
      ["Tiredness, frequent urination, thirst (possible diabetes)", "थकान, बार-बार पेशाब, प्यास (डायबिटीज़ हो सकती है)"],
    ],
    cause: [
      ["Narrowed or stiff blood vessels", "संकरी या सख़्त नसें"],
      ["High sugar damaging nerves and vessels", "ज़्यादा शुगर से नसों को नुकसान"],
      ["Smoking and high cholesterol", "धूम्रपान और ज़्यादा कोलेस्ट्रॉल"],
    ],
    risk: [
      ["Age over 40, obesity, inactivity", "40 से ज़्यादा उम्र, मोटापा, निष्क्रियता"],
      ["Family history of heart disease", "परिवार में दिल की बीमारी"],
      ["Some BP and other medicines", "कुछ बीपी और दूसरी दवाएँ"],
    ],
    mgmt: [
      ["Check BP, fasting sugar/HbA1c, lipids", "बीपी, शुगर/HbA1c, लिपिड जाँचें"],
      ["Treat diabetes, BP and cholesterol with your physician", "फ़िज़िशियन के साथ डायबिटीज़, बीपी और कोलेस्ट्रॉल का इलाज"],
      ["Stop smoking; exercise regularly; lose weight", "धूम्रपान छोड़ें; नियमित व्यायाम; वज़न घटाएँ"],
      ["ED treatment after confirming it is safe for your heart", "दिल के लिए सुरक्षित होने की पुष्टि के बाद ED का इलाज"],
    ],
    help: [
      ["Chest pain, breathlessness on exertion — see a doctor urgently", "मेहनत पर सीने में दर्द, साँस फूलना — तुरंत डॉक्टर को दिखाएँ"],
      ["ED with diabetes symptoms", "डायबिटीज़ के लक्षणों के साथ ED"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Can ED medicines be taken with heart medicines?", "क्या ED की दवाएँ दिल की दवाओं के साथ ले सकते हैं?", "Some combinations are dangerous (for example with certain chest-pain medicines). Always tell your doctor everything you take.", "कुछ मेल ख़तरनाक होते हैं (जैसे सीने के दर्द की कुछ दवाओं के साथ)। जो भी लेते हैं, डॉक्टर को हमेशा बताएँ।"],
      ["Will controlling sugar fix ED?", "क्या शुगर नियंत्रित करने से ED ठीक होगा?", "It often helps, though some men also need specific ED treatment.", "अक्सर मदद मिलती है, हालाँकि कुछ पुरुषों को ED का ख़ास इलाज भी चाहिए।"],
    ],
    tags: ["sugar", "heart", "erection", "napunsakta"],
  },
  {
    slug: "masturbation-facts-and-myths",
    title: ["Masturbation: facts, myths and when to worry", "हस्तमैथुन: तथ्य, मिथक और कब चिंता करें"],
    excerpt: ["Does masturbation cause weakness, hair loss or impotence? Evidence-based answers to common fears, and when it may be a problem.", "क्या हस्तमैथुन से कमज़ोरी, बाल झड़ना या नपुंसकता होती है? आम डरों के प्रमाण-आधारित जवाब, और कब यह समस्या हो सकता है।"],
    related: ["sexual-health-myths-india", "dhat-syndrome-treatment-india", "problematic-pornography-use-treatment-india"],
    refs: ["ips-cpg", "icd11"],
    intro: [
      ["Masturbation is a common and normal sexual behaviour. In India, many young men carry guilt and fear about it because of myths.", "हस्तमैथुन सामान्य और आम यौन व्यवहार है। भारत में बहुत से युवा मिथकों की वजह से इसे लेकर अपराधबोध और डर रखते हैं।"],
      ["It becomes a concern only when it is compulsive or interferes with daily life.", "यह चिंता तभी बनता है जब बाध्यकारी हो या रोज़ की ज़िंदगी में बाधा डाले।"],
    ],
    key: [
      ["It does not cause physical weakness or infertility", "इससे शारीरिक कमज़ोरी या बाँझपन नहीं होता"],
      ["Guilt and worry cause more symptoms than the act itself", "अपराधबोध और चिंता ख़ुद इस काम से ज़्यादा लक्षण पैदा करते हैं"],
      ["Compulsive behaviour can be treated", "बाध्यकारी व्यवहार का इलाज होता है"],
    ],
    sym: [
      ["Worry, guilt or fear after masturbation", "हस्तमैथुन के बाद चिंता, अपराधबोध या डर"],
      ["Tiredness or low mood linked to guilt", "अपराधबोध से जुड़ी थकान या उदासी"],
      ["Feeling unable to control it despite wanting to", "चाहते हुए भी नियंत्रित न कर पाना"],
    ],
    cause: [
      ["Myths from friends, advertisements and quacks", "दोस्तों, विज्ञापनों और झोलाछापों से मिथक"],
      ["Stress, boredom or loneliness", "तनाव, ऊब या अकेलापन"],
      ["Compulsive patterns with pornography", "पोर्नोग्राफ़ी के साथ बाध्यकारी पैटर्न"],
    ],
    risk: [
      ["Anxiety and depression", "घबराहट और डिप्रेशन"],
      ["Lack of accurate sex education", "सही यौन शिक्षा की कमी"],
      ["Heavy late-night phone use", "देर रात बहुत ज़्यादा फ़ोन"],
    ],
    mgmt: [
      ["Accurate information to relieve guilt", "अपराधबोध दूर करने के लिए सही जानकारी"],
      ["If compulsive: identify triggers, limit late-night screens, plan alternatives", "बाध्यकारी हो तो: ट्रिगर पहचानें, देर रात स्क्रीन सीमित करें, विकल्प तय करें"],
      ["CBT for compulsive sexual behaviour", "बाध्यकारी यौन व्यवहार के लिए CBT"],
      ["Treat anxiety or depression", "घबराहट या डिप्रेशन का इलाज"],
    ],
    help: [
      ["Unable to stop despite harm to studies, work or relationships", "पढ़ाई, काम या रिश्तों को नुकसान के बावजूद न रुक पाना"],
      ["Persistent guilt, low mood or anxiety", "लगातार अपराधबोध, उदासी या घबराहट"],
      PRIVATE_HELP,
    ],
    faq: [
      ["How often is 'too much'?", "कितना 'बहुत ज़्यादा' है?", "There is no fixed number; it is a problem when it feels out of control or interferes with life.", "कोई तय संख्या नहीं; समस्या तब है जब यह नियंत्रण से बाहर लगे या ज़िंदगी में बाधा डाले।"],
      ["Will it affect my marriage?", "क्या इससे शादी पर असर होगा?", "No. It does not reduce sexual ability in marriage.", "नहीं। इससे शादी में यौन क्षमता कम नहीं होती।"],
    ],
    tags: ["hastmaithun", "masturbation", "kamzori", "galti"],
  },
  {
    slug: "night-emissions-are-normal",
    title: ["Night emissions (swapndosh) are normal: what young men should know", "स्वप्नदोष सामान्य है: युवाओं को क्या जानना चाहिए"],
    excerpt: ["Night emissions are a natural body process, not a disease. Why they happen, why they do not cause weakness, and when to seek advice.", "स्वप्नदोष शरीर की प्राकृतिक प्रक्रिया है, बीमारी नहीं। यह क्यों होता है, इससे कमज़ोरी क्यों नहीं होती, और कब सलाह लें।"],
    related: ["dhat-syndrome-treatment-india", "sexual-health-myths-india"],
    refs: ["ips-cpg"],
    intro: [
      ["Night emissions (wet dreams) are ejaculation during sleep. They are common in adolescents and young men, especially without regular sexual activity.", "स्वप्नदोष नींद में स्खलन है। यह किशोरों और युवाओं में आम है, ख़ासकर जब नियमित यौन गतिविधि न हो।"],
      ["Roadside clinics often label it a disease to sell treatments. It is not.", "सड़क किनारे के क्लिनिक इलाज बेचने के लिए इसे बीमारी बताते हैं। ऐसा नहीं है।"],
    ],
    key: [
      ["Semen is produced continuously; emissions do not drain strength", "वीर्य लगातार बनता है; स्वप्नदोष से ताक़त ख़त्म नहीं होती"],
      ["Frequency varies naturally", "बारंबारता स्वाभाविक रूप से अलग होती है"],
      ["Anxiety about emissions is the real problem for many", "बहुत लोगों में असली समस्या स्वप्नदोष की चिंता है"],
    ],
    sym: [
      ["Waking with wet underwear, sometimes with a dream", "गीले कपड़ों के साथ जागना, कभी सपने के साथ"],
      ["Worry, guilt, fear of weakness", "चिंता, अपराधबोध, कमज़ोरी का डर"],
      ["Poor concentration due to worry", "चिंता की वजह से ध्यान न लगना"],
    ],
    cause: [
      ["Normal hormonal activity", "सामान्य हार्मोनल गतिविधि"],
      ["Longer periods without ejaculation", "स्खलन के बिना लंबा समय"],
      ["Not caused by illness or sin", "बीमारी या पाप से नहीं होता"],
    ],
    risk: [
      ["Myths heard from peers or advertisements", "साथियों या विज्ञापनों से सुने मिथक"],
      ["Anxious temperament", "चिंतित स्वभाव"],
      ["No access to accurate information", "सही जानकारी तक पहुँच न होना"],
    ],
    mgmt: [
      ["Reassurance and accurate education", "तसल्ली और सही जानकारी"],
      ["Avoid tonics and 'gupt rog' medicines", "टॉनिक और 'गुप्त रोग' की दवाओं से बचें"],
      ["Treat anxiety or depression if present", "घबराहट या डिप्रेशन हो तो उसका इलाज"],
      ["Regular sleep and physical activity", "नियमित नींद और शारीरिक गतिविधि"],
    ],
    help: [
      ["Constant worry affecting studies or sleep", "पढ़ाई या नींद पर असर डालने वाली लगातार चिंता"],
      ["Pain, burning or blood with urine or semen — see a doctor", "पेशाब या वीर्य के साथ दर्द, जलन या ख़ून — डॉक्टर को दिखाएँ"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Do I need medicine to stop it?", "क्या इसे रोकने के लिए दवा चाहिए?", "No. It is normal and usually becomes less frequent with age or regular sexual activity.", "नहीं। यह सामान्य है और आमतौर पर उम्र या नियमित यौन गतिविधि के साथ कम हो जाता है।"],
      ["Does it affect fertility?", "क्या इससे प्रजनन क्षमता पर असर होता है?", "No.", "नहीं।"],
    ],
    tags: ["swapndosh", "night fall", "nightfall", "dhat"],
  },
  {
    slug: "wedding-night-anxiety",
    title: ["Wedding-night anxiety: a guide for couples", "सुहागरात की घबराहट: जोड़ों के लिए गाइड"],
    excerpt: ["Pressure to 'perform' on the first night causes anxiety for many men and women. Realistic expectations, communication and when to seek help.", "पहली रात 'परफ़ॉर्म' करने का दबाव बहुत से पुरुषों और महिलाओं में घबराहट पैदा करता है। वास्तविक उम्मीदें, बातचीत और कब मदद लें।"],
    related: ["sexual-performance-anxiety-india", "vaginismus-sexual-pain-india", "marital-counselling-india"],
    refs: ["ips-cpg"],
    intro: [
      ["Many couples in arranged marriages meet as near-strangers. Expecting perfect intimacy on the first night creates unnecessary pressure.", "तय विवाह में बहुत से जोड़े लगभग अजनबी की तरह मिलते हैं। पहली रात में सब कुछ परफ़ेक्ट होने की उम्मीद बेवजह दबाव बनाती है।"],
      ["Intimacy grows with comfort and trust; there is no deadline.", "नज़दीकी सहजता और भरोसे के साथ बढ़ती है; कोई समय-सीमा नहीं है।"],
    ],
    key: [
      ["It is normal for intercourse not to happen immediately", "तुरंत संबंध न बनना सामान्य है"],
      ["Anxiety can cause erection problems in men and pain or tightness in women", "घबराहट से पुरुषों में इरेक्शन और महिलाओं में दर्द या कसाव हो सकता है"],
      ["Talking openly reduces pressure", "खुलकर बात करने से दबाव कम होता है"],
    ],
    sym: [
      ["Fear, racing thoughts, avoidance", "डर, तेज़ विचार, बचना"],
      ["Erection difficulty or early ejaculation", "इरेक्शन में दिक़्क़त या जल्दी स्खलन"],
      ["Pain or inability to allow penetration", "दर्द या प्रवेश न हो पाना"],
    ],
    cause: [
      ["Unrealistic expectations from films and friends", "फ़िल्मों और दोस्तों से अवास्तविक उम्मीदें"],
      ["Family pressure and lack of privacy", "परिवार का दबाव और निजता की कमी"],
      ["Lack of sex education; myths about pain or 'proof'", "यौन शिक्षा की कमी; दर्द या 'सबूत' के मिथक"],
    ],
    risk: [
      ["Anxious temperament", "चिंतित स्वभाव"],
      ["Strict upbringing with negative messages about sex", "सेक्स पर नकारात्मक बातों वाली सख़्त परवरिश"],
      ["Past traumatic experiences", "पुराने आघात वाले अनुभव"],
    ],
    mgmt: [
      ["Spend time getting comfortable — talk, touch, no goal", "सहज होने में समय दें — बात, स्पर्श, कोई लक्ष्य नहीं"],
      ["Agree to go at a pace both are comfortable with", "दोनों के सहज रफ़्तार पर सहमति"],
      ["Use lubrication; avoid force", "लुब्रिकेशन इस्तेमाल करें; ज़बरदस्ती से बचें"],
      ["Psychosexual counselling if difficulty persists", "दिक़्क़त बनी रहे तो साइकोसेक्सुअल काउंसलिंग"],
    ],
    help: [
      ["Unable to have intercourse after several weeks", "कई हफ़्तों बाद भी संबंध न बन पाना"],
      ["Pain or fear in the woman", "महिला में दर्द या डर"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is bleeding on the first night necessary?", "क्या पहली रात ख़ून आना ज़रूरी है?", "No. Many women do not bleed; it is not a test of anything.", "नहीं। बहुत सी महिलाओं में ख़ून नहीं आता; यह किसी चीज़ का सबूत नहीं है।"],
      ["What if families keep asking about a baby?", "अगर परिवार बार-बार बच्चे के बारे में पूछे तो?", "The couple can set gentle boundaries; counselling can help with family pressure.", "जोड़ा प्यार से सीमाएँ तय कर सकता है; परिवार के दबाव में काउंसलिंग मदद कर सकती है।"],
    ],
    tags: ["suhagraat", "pehli raat", "shaadi", "first night"],
  },
  {
    slug: "penis-size-worries",
    title: ["Penis size worries: facts that bring relief", "लिंग के आकार की चिंता: राहत देने वाले तथ्य"],
    excerpt: ["Most men who worry about size are within the normal range. The facts, why worry persists, and why enlargement products are a waste of money.", "आकार को लेकर चिंतित ज़्यादातर पुरुष सामान्य सीमा में होते हैं। तथ्य, चिंता क्यों बनी रहती है, और बढ़ाने वाले उत्पाद पैसे की बर्बादी क्यों हैं।"],
    related: ["sexual-health-myths-india", "body-dysmorphic-disorder-india", "sexual-performance-anxiety-india"],
    refs: ["ips-cpg"],
    intro: [
      ["Worry about penis size is very common, fuelled by pornography and advertisements. In most men, size is normal.", "लिंग के आकार की चिंता बहुत आम है, जिसे पोर्नोग्राफ़ी और विज्ञापन बढ़ाते हैं। ज़्यादातर पुरुषों में आकार सामान्य होता है।"],
      ["Sexual satisfaction depends far more on communication, closeness and technique than on size.", "यौन संतुष्टि आकार से कहीं ज़्यादा बातचीत, नज़दीकी और तरीक़े पर निर्भर करती है।"],
    ],
    key: [
      ["Looking down makes the penis appear shorter", "ऊपर से देखने पर लिंग छोटा दिखता है"],
      ["Flaccid size varies and does not predict erect size", "ढीली अवस्था का आकार अलग होता है और तने हुए आकार का अनुमान नहीं देता"],
      ["Persistent preoccupation may be body dysmorphic concern", "लगातार इसी में डूबे रहना बॉडी डिस्मॉर्फ़िक चिंता हो सकती है"],
    ],
    sym: [
      ["Repeated measuring and comparing", "बार-बार नापना और तुलना करना"],
      ["Avoiding changing rooms or intimacy", "चेंजिंग रूम या नज़दीकी से बचना"],
      ["Spending money on creams, pumps or pills", "क्रीम, पंप या गोलियों पर पैसे ख़र्च करना"],
    ],
    cause: [
      ["Comparison with pornography", "पोर्नोग्राफ़ी से तुलना"],
      ["Teasing in adolescence", "किशोरावस्था में चिढ़ाया जाना"],
      ["Anxiety and low self-esteem", "घबराहट और कम आत्मविश्वास"],
    ],
    risk: [
      ["Body image concerns", "शरीर की छवि को लेकर चिंता"],
      ["OCD tendencies", "OCD की प्रवृत्ति"],
      ["Misleading advertisements", "भ्रामक विज्ञापन"],
    ],
    mgmt: [
      ["Accurate information and reassurance", "सही जानकारी और तसल्ली"],
      ["Avoid enlargement products — no proven benefit, possible harm", "आकार बढ़ाने वाले उत्पादों से बचें — कोई प्रमाणित फ़ायदा नहीं, नुकसान संभव"],
      ["CBT for persistent preoccupation", "लगातार चिंता के लिए CBT"],
      ["Couples communication about what each partner enjoys", "जोड़े के बीच इस पर बात कि दोनों को क्या अच्छा लगता है"],
    ],
    help: [
      ["Worry taking hours a day or causing avoidance", "दिन में घंटों चिंता या बचना"],
      ["Considering surgery or risky products", "सर्जरी या जोखिम भरे उत्पादों पर विचार"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Do oils or exercises increase size?", "क्या तेल या व्यायाम से आकार बढ़ता है?", "There is no reliable evidence that they do.", "ऐसा होने का कोई भरोसेमंद प्रमाण नहीं है।"],
      ["Does size affect fertility?", "क्या आकार से प्रजनन क्षमता पर असर होता है?", "No.", "नहीं।"],
    ],
    tags: ["size", "ling chhota", "aakar"],
  },
  {
    slug: "intimacy-after-childbirth",
    title: ["Intimacy after childbirth: what couples can expect", "प्रसव के बाद नज़दीकी: जोड़े क्या उम्मीद करें"],
    excerpt: ["Low desire, tiredness and pain are common after a baby. When to resume intimacy, what helps, and when to talk to a doctor.", "बच्चे के बाद कम इच्छा, थकान और दर्द आम हैं। नज़दीकी कब शुरू करें, क्या मदद करता है, और कब डॉक्टर से बात करें।"],
    related: ["female-sexual-interest-arousal-india", "postpartum-depression-india", "couples-therapy-india"],
    refs: ["nice-perinatal"],
    intro: [
      ["After childbirth, the body heals, hormones change and sleep is short. It is normal for sexual interest to take time to return.", "प्रसव के बाद शरीर ठीक होता है, हार्मोन बदलते हैं और नींद कम होती है। यौन रुचि लौटने में समय लगना सामान्य है।"],
      ["Patience and communication help couples reconnect.", "धैर्य और बातचीत जोड़ों को फिर से जोड़ते हैं।"],
    ],
    key: [
      ["There is no fixed 'right' time — readiness matters", "कोई तय 'सही' समय नहीं — तैयारी मायने रखती है"],
      ["Breastfeeding can cause dryness", "स्तनपान से सूखापन हो सकता है"],
      ["Postpartum depression can lower desire", "प्रसव के बाद डिप्रेशन से इच्छा घट सकती है"],
    ],
    sym: [
      ["Low desire, tiredness", "कम इच्छा, थकान"],
      ["Pain or dryness during intercourse", "संबंध के समय दर्द या सूखापन"],
      ["Feeling distant from partner", "साथी से दूरी महसूस होना"],
    ],
    cause: [
      ["Healing of stitches or caesarean wound", "टाँकों या ऑपरेशन के घाव का भरना"],
      ["Hormonal changes and breastfeeding", "हार्मोनल बदलाव और स्तनपान"],
      ["Sleep deprivation and new responsibilities", "नींद की कमी और नई ज़िम्मेदारियाँ"],
    ],
    risk: [
      ["Difficult delivery", "कठिन डिलीवरी"],
      ["Relationship strain", "रिश्ते में तनाव"],
      ["Depression or anxiety", "डिप्रेशन या घबराहट"],
    ],
    mgmt: [
      ["Wait for medical clearance and personal readiness", "डॉक्टरी अनुमति और व्यक्तिगत तैयारी का इंतज़ार"],
      ["Use lubrication; go slowly", "लुब्रिकेशन; धीरे-धीरे"],
      ["Share night care so both partners rest", "रात की देखभाल बाँटें ताकि दोनों आराम कर सकें"],
      ["Discuss contraception with your doctor", "डॉक्टर से गर्भनिरोध पर बात करें"],
    ],
    help: [
      ["Persistent pain during intercourse", "संबंध में लगातार दर्द"],
      ["Low mood or anxiety lasting weeks", "हफ़्तों तक उदासी या घबराहट"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is it normal to have no desire months after delivery?", "क्या डिलीवरी के महीनों बाद इच्छा न होना सामान्य है?", "It is common, especially while breastfeeding and with poor sleep; if it distresses you, help is available.", "यह आम है, ख़ासकर स्तनपान और कम नींद में; अगर परेशानी हो तो मदद उपलब्ध है।"],
      ["Can I get pregnant while breastfeeding?", "क्या स्तनपान के दौरान गर्भ ठहर सकता है?", "Yes, it is possible; discuss contraception with your doctor.", "हाँ, संभव है; डॉक्टर से गर्भनिरोध पर बात करें।"],
    ],
    tags: ["delivery ke baad", "sambandh", "intimacy"],
  },
  {
    slug: "low-libido-in-women",
    title: ["Low sexual desire in women: causes and help", "महिलाओं में यौन इच्छा की कमी: कारण और मदद"],
    excerpt: ["Low desire in women is common and often linked to stress, mood, hormones and relationship factors. What helps and how to talk about it.", "महिलाओं में कम इच्छा आम है और अक्सर तनाव, मूड, हार्मोन और रिश्तों से जुड़ी होती है। क्या मदद करता है और इस पर बात कैसे करें।"],
    related: ["low-sexual-desire-india", "female-sexual-interest-arousal-india", "womens-mental-health-india"],
    refs: ["icd11"],
    intro: [
      ["Women's sexual desire is shaped by emotional closeness, stress, health and life stage. It is often not discussed, even with doctors.", "महिलाओं की यौन इच्छा भावनात्मक नज़दीकी, तनाव, सेहत और ज़िंदगी के दौर से बनती है। अक्सर डॉक्टर से भी इसकी बात नहीं होती।"],
      ["Low desire is a concern only if it causes you distress.", "कम इच्छा तभी चिंता की बात है जब इससे आपको परेशानी हो।"],
    ],
    key: [
      ["Desire often follows arousal and closeness rather than coming first", "इच्छा अक्सर पहले आने के बजाय उत्तेजना और नज़दीकी के बाद आती है"],
      ["Treating depression, pain or fatigue often helps", "डिप्रेशन, दर्द या थकान के इलाज से अक्सर मदद मिलती है"],
      ["Couples approaches are effective", "जोड़ों वाले तरीक़े असरदार हैं"],
    ],
    sym: [
      ["Little interest in sex", "सेक्स में बहुत कम रुचि"],
      ["Avoiding intimacy, feeling guilty", "नज़दीकी से बचना, अपराधबोध"],
      ["Difficulty with arousal or pain", "उत्तेजना में कठिनाई या दर्द"],
    ],
    cause: [
      ["Stress, caregiving and household burden", "तनाव, देखभाल और घर का बोझ"],
      ["Depression, anxiety, some medicines", "डिप्रेशन, घबराहट, कुछ दवाएँ"],
      ["Hormonal changes: childbirth, menopause, thyroid", "हार्मोनल बदलाव: प्रसव, मेनोपॉज़, थायरॉइड"],
    ],
    risk: [
      ["Relationship conflict or lack of emotional closeness", "रिश्ते में कलह या भावनात्मक नज़दीकी की कमी"],
      ["Pain during intercourse", "संबंध में दर्द"],
      ["Past negative or traumatic experiences", "पुराने नकारात्मक या आघात वाले अनुभव"],
    ],
    mgmt: [
      ["Private discussion with a doctor; gynaecology check if pain", "डॉक्टर से निजी बातचीत; दर्द हो तो स्त्री रोग जाँच"],
      ["Treat mood, sleep and medical causes", "मूड, नींद और शारीरिक कारणों का इलाज"],
      ["Sex therapy and sensate focus", "सेक्स थेरेपी और सेंसेट फ़ोकस"],
      ["Couples communication about needs and time together", "ज़रूरतों और साथ के समय पर जोड़े की बातचीत"],
    ],
    help: [
      ["Distress or relationship strain", "परेशानी या रिश्ते में तनाव"],
      ["Pain during sex", "संबंध में दर्द"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is there a pill for female desire?", "क्या महिलाओं की इच्छा के लिए गोली है?", "Not a simple one for most women. Addressing causes and therapy usually help more.", "ज़्यादातर महिलाओं के लिए कोई आसान गोली नहीं है। कारणों का इलाज और थेरेपी आमतौर पर ज़्यादा मदद करते हैं।"],
      ["Can I consult a doctor alone?", "क्या मैं अकेले डॉक्टर से परामर्श ले सकती हूँ?", "Yes. Your consultation is private; partner involvement is your choice.", "हाँ। आपका परामर्श निजी है; साथी को शामिल करना आपकी मर्ज़ी है।"],
    ],
    tags: ["mahila ichha", "libido", "sex me man nahi"],
  },
  {
    slug: "sexual-side-effects-of-medicines",
    title: ["Sexual side-effects of medicines: what to do", "दवाओं के यौन साइड-इफ़ेक्ट: क्या करें"],
    excerpt: ["Some antidepressants, antipsychotics and BP medicines can affect desire, erection or ejaculation. Why you should not stop suddenly and what options exist.", "कुछ एंटीडिप्रेसेंट, एंटीसाइकोटिक और बीपी की दवाएँ इच्छा, इरेक्शन या स्खलन पर असर डाल सकती हैं। अचानक क्यों न छोड़ें और क्या विकल्प हैं।"],
    related: ["delayed-ejaculation-treatment-india", "low-sexual-desire-india", "depression-treatment-india"],
    refs: ["nice-depression", "aua-ed"],
    intro: [
      ["Sexual side-effects are a common reason people stop their medicines without telling the doctor — which can lead to relapse.", "यौन साइड-इफ़ेक्ट एक आम कारण है कि लोग बिना बताए दवा छोड़ देते हैं — जिससे बीमारी लौट सकती है।"],
      ["These effects can usually be managed once discussed openly.", "खुलकर बात करने पर इन्हें आमतौर पर सँभाला जा सकता है।"],
    ],
    key: [
      ["Tell your doctor — it is a routine question", "डॉक्टर को बताएँ — यह सामान्य सवाल है"],
      ["Options include dose change, switching or timing adjustments", "विकल्पों में मात्रा बदलना, दवा बदलना या समय बदलना शामिल"],
      ["The illness itself can also reduce sexual function", "बीमारी ख़ुद भी यौन क्रिया घटा सकती है"],
    ],
    sym: [
      ["Reduced desire", "इच्छा में कमी"],
      ["Erectile difficulty or vaginal dryness", "इरेक्शन में दिक़्क़त या योनि में सूखापन"],
      ["Delayed or absent orgasm/ejaculation", "चरम सुख/स्खलन में देरी या न होना"],
    ],
    cause: [
      ["Medicine effects on brain chemicals and hormones", "दिमाग़ी रसायनों और हार्मोन पर दवा का असर"],
      ["Effects on blood flow (some BP medicines)", "ख़ून के बहाव पर असर (कुछ बीपी की दवाएँ)"],
      ["Underlying depression, diabetes or anxiety", "मूल डिप्रेशन, डायबिटीज़ या घबराहट"],
    ],
    risk: [
      ["Higher doses", "ज़्यादा मात्रा"],
      ["Multiple medicines", "कई दवाएँ"],
      ["Alcohol use", "शराब"],
    ],
    mgmt: [
      ["Do not stop medicines on your own", "अपने आप दवा बंद न करें"],
      ["Doctor may lower the dose or switch to an option with fewer sexual effects", "डॉक्टर मात्रा घटा सकते हैं या कम यौन असर वाली दवा दे सकते हैं"],
      ["Treat co-existing issues (diabetes, low mood)", "साथ की समस्याओं (डायबिटीज़, उदासी) का इलाज"],
      ["Specific treatments for ED or dryness when appropriate", "उचित हो तो ED या सूखेपन का ख़ास इलाज"],
    ],
    help: [
      ["Side-effects making you want to stop treatment", "साइड-इफ़ेक्ट की वजह से इलाज छोड़ने का मन"],
      ["New sexual problems after starting a medicine", "दवा शुरू करने के बाद नई यौन समस्या"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Will the problem go away when I stop the medicine?", "दवा बंद करने पर क्या समस्या चली जाएगी?", "Usually it improves, but stopping without a plan risks the original illness returning.", "आमतौर पर सुधार होता है, पर बिना योजना के छोड़ने से मूल बीमारी लौटने का ख़तरा है।"],
      ["Is it embarrassing to ask?", "क्या पूछने में शर्म की बात है?", "Not at all. Doctors ask about it routinely because it affects treatment success.", "बिल्कुल नहीं। डॉक्टर नियमित रूप से पूछते हैं क्योंकि यह इलाज की सफलता पर असर डालता है।"],
    ],
    tags: ["dawa side effect", "sexual side effect"],
  },
  {
    slug: "dangers-of-roadside-sex-clinics",
    title: ["The dangers of roadside 'gupt rog' clinics", "सड़क किनारे के 'गुप्त रोग' क्लिनिकों के ख़तरे"],
    excerpt: ["Unqualified practitioners sell expensive 'cures' for normal conditions like dhat or night emissions. Risks, red flags and where to get scientific care.", "अयोग्य लोग धात या स्वप्नदोष जैसी सामान्य स्थितियों के महँगे 'इलाज' बेचते हैं। ख़तरे, चेतावनी संकेत और वैज्ञानिक इलाज कहाँ मिलता है।"],
    related: ["sex-specialist-india", "dhat-syndrome-treatment-india", "sexual-health-myths-india"],
    refs: ["ips-cpg"],
    intro: [
      ["Advertisements on walls and buses promise guaranteed cures for 'weakness'. Many such clinics are run by unqualified people.", "दीवारों और बसों पर विज्ञापन 'कमज़ोरी' के पक्के इलाज का वादा करते हैं। ऐसे कई क्लिनिक अयोग्य लोग चलाते हैं।"],
      ["They often create fear about normal body processes and sell costly remedies.", "वे अक्सर शरीर की सामान्य प्रक्रियाओं को लेकर डर पैदा करते हैं और महँगे नुस्ख़े बेचते हैं।"],
    ],
    key: [
      ["Scientific sexual health care is confidential and available", "वैज्ञानिक यौन स्वास्थ्य देखभाल गोपनीय और उपलब्ध है"],
      ["Many 'herbal' products contain hidden steroids or drugs", "कई 'हर्बल' उत्पादों में छिपे स्टेरॉयड या दवाएँ होती हैं"],
      ["Guaranteed cures are a red flag", "पक्के इलाज का वादा ख़तरे का संकेत है"],
    ],
    sym: [
      ["Red flags: no registration displayed, cash-only, 'secret formula'", "ख़तरे के संकेत: पंजीकरण नहीं, सिर्फ़ नक़द, 'गुप्त फ़ॉर्मूला'"],
      ["Labelling dhat or night emissions as disease", "धात या स्वप्नदोष को बीमारी बताना"],
      ["Pressure to buy long expensive courses", "लंबे महँगे कोर्स ख़रीदने का दबाव"],
    ],
    cause: [
      ["Shame and lack of sex education", "शर्म और यौन शिक्षा की कमी"],
      ["Fear of being seen at a hospital", "अस्पताल में दिखने का डर"],
      ["Myths about semen and weakness", "वीर्य और कमज़ोरी के मिथक"],
    ],
    risk: [
      ["Kidney, liver or heart harm from hidden ingredients", "छिपे तत्वों से किडनी, लिवर या दिल को नुकसान"],
      ["Financial loss", "आर्थिक नुकसान"],
      ["Worsening anxiety and delayed real treatment", "घबराहट बढ़ना और असली इलाज में देरी"],
    ],
    mgmt: [
      ["Consult a qualified doctor (psychiatrist, urologist, gynaecologist)", "योग्य डॉक्टर (मनोचिकित्सक, यूरोलॉजिस्ट, स्त्री रोग विशेषज्ञ) से मिलें"],
      ["Ask about registration and qualifications", "पंजीकरण और योग्यता पूछें"],
      ["Get accurate information about normal sexual functioning", "सामान्य यौन क्रिया की सही जानकारी लें"],
      ["Stop unknown products and tell your doctor what you took", "अज्ञात उत्पाद बंद करें और डॉक्टर को बताएँ क्या लिया"],
    ],
    help: [
      ["Side-effects after taking unknown remedies", "अज्ञात नुस्ख़े लेने के बाद साइड-इफ़ेक्ट"],
      ["Ongoing worry about sexual health", "यौन स्वास्थ्य को लेकर लगातार चिंता"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Will a doctor judge me?", "क्या डॉक्टर मुझे आँकेंगे?", "No. Sexual concerns are common and are discussed professionally and confidentially.", "नहीं। यौन चिंताएँ आम हैं और इन पर पेशेवर और गोपनीय तरीक़े से बात होती है।"],
      ["Can I consult online privately?", "क्या ऑनलाइन निजी परामर्श ले सकता हूँ?", "Yes. Video consultation avoids being seen in a waiting room.", "हाँ। वीडियो परामर्श से वेटिंग रूम में दिखने की ज़रूरत नहीं।"],
    ],
    tags: ["gupt rog", "sex clinic", "jhola chhap", "kamzori"],
  },
  {
    slug: "sexual-health-after-40",
    title: ["Sexual health after 40 and 50: what changes and what helps", "40 और 50 के बाद यौन स्वास्थ्य: क्या बदलता है और क्या मदद करता है"],
    excerpt: ["Ageing brings natural changes in sexual response for men and women. Common concerns, health links and ways to maintain a satisfying intimate life.", "उम्र के साथ पुरुषों और महिलाओं की यौन प्रतिक्रिया में स्वाभाविक बदलाव आते हैं। आम चिंताएँ, सेहत से संबंध और संतोषजनक नज़दीकी बनाए रखने के तरीक़े।"],
    related: ["erectile-dysfunction-treatment-india", "low-sexual-desire-india", "female-sexual-interest-arousal-india"],
    refs: ["aua-ed"],
    intro: [
      ["Sexual life can continue to be satisfying with age. Changes are expected — arousal may take longer and erections or lubrication may need more stimulation.", "उम्र के साथ भी यौन जीवन संतोषजनक रह सकता है। बदलाव अपेक्षित हैं — उत्तेजना में ज़्यादा समय लग सकता है और इरेक्शन या चिकनाई के लिए ज़्यादा उत्तेजना चाहिए।"],
      ["Many concerns are linked to treatable health conditions.", "बहुत सी चिंताएँ इलाज योग्य बीमारियों से जुड़ी होती हैं।"],
    ],
    key: [
      ["Changes are normal and do not mean the end of sexual life", "बदलाव सामान्य हैं और यौन जीवन का अंत नहीं"],
      ["Diabetes, BP and medicines affect sexual function", "डायबिटीज़, बीपी और दवाएँ यौन क्रिया पर असर डालती हैं"],
      ["Menopause can cause dryness that is treatable", "मेनोपॉज़ से सूखापन हो सकता है जिसका इलाज होता है"],
    ],
    sym: [
      ["Slower arousal; less firm erections", "धीमी उत्तेजना; कम सख़्त इरेक्शन"],
      ["Vaginal dryness or discomfort", "योनि में सूखापन या असुविधा"],
      ["Lower desire or performance worries", "कम इच्छा या परफ़ॉर्मेंस की चिंता"],
    ],
    cause: [
      ["Hormonal changes", "हार्मोनल बदलाव"],
      ["Vascular and nerve changes", "नसों और रक्त-वाहिकाओं के बदलाव"],
      ["Medicines and chronic illnesses", "दवाएँ और पुरानी बीमारियाँ"],
    ],
    risk: [
      ["Smoking, obesity, inactivity", "धूम्रपान, मोटापा, निष्क्रियता"],
      ["Depression", "डिप्रेशन"],
      ["Relationship routine and lack of communication", "रिश्ते में नीरसता और बातचीत की कमी"],
    ],
    mgmt: [
      ["Check and control BP, sugar and cholesterol", "बीपी, शुगर और कोलेस्ट्रॉल जाँचें और नियंत्रित करें"],
      ["Review medicines with your doctor", "डॉक्टर के साथ दवाओं की समीक्षा"],
      ["Lubricants or local treatments for dryness", "सूखेपन के लिए लुब्रिकेंट या स्थानीय इलाज"],
      ["Open communication and unhurried intimacy", "खुली बातचीत और बिना जल्दबाज़ी की नज़दीकी"],
    ],
    help: [
      ["Sudden change in sexual function", "यौन क्रिया में अचानक बदलाव"],
      ["Pain during intercourse", "संबंध में दर्द"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is it normal to want sex less after 50?", "क्या 50 के बाद कम इच्छा होना सामान्य है?", "Desire varies widely; it is only a problem if it distresses you or your partner.", "इच्छा बहुत अलग-अलग होती है; समस्या तभी है जब इससे आपको या साथी को परेशानी हो।"],
      ["Are ED treatments safe for older men?", "क्या बड़ी उम्र के पुरुषों के लिए ED का इलाज सुरक्षित है?", "Often yes, after checking heart health and current medicines.", "अक्सर हाँ, दिल की सेहत और चल रही दवाओं की जाँच के बाद।"],
    ],
    tags: ["umar", "budhapa", "menopause", "erection"],
  },
  {
    slug: "talking-to-partner-about-sex",
    title: ["How to talk to your partner about sex", "अपने साथी से सेक्स के बारे में कैसे बात करें"],
    excerpt: ["Many couples never discuss sexual needs or problems. Simple, respectful ways to start the conversation and solve problems together.", "बहुत से जोड़े कभी यौन ज़रूरतों या समस्याओं पर बात नहीं करते। बातचीत शुरू करने और मिलकर समस्या सुलझाने के आसान, सम्मानजनक तरीक़े।"],
    related: ["relationship-difficulties-counselling-india", "couples-therapy-india", "psychosexual-counselling-india"],
    refs: ["ips-cpg"],
    intro: [
      ["Silence about sex leads to assumptions, frustration and distance. Talking openly is one of the most effective ways to improve sexual satisfaction.", "सेक्स पर चुप्पी से अनुमान, झुंझलाहट और दूरी बढ़ती है। खुलकर बात करना यौन संतुष्टि सुधारने के सबसे असरदार तरीक़ों में से है।"],
      ["It can feel awkward at first — that is normal.", "शुरुआत में यह अजीब लग सकता है — यह सामान्य है।"],
    ],
    key: [
      ["Choose a calm time outside the bedroom", "बेडरूम के बाहर शांत समय चुनें"],
      ["Use 'I' statements rather than blame", "दोष देने के बजाय 'मैं' वाले वाक्य"],
      ["Treat problems as shared, not one person's fault", "समस्या को साझा मानें, किसी एक की ग़लती नहीं"],
    ],
    sym: [
      ["Avoiding intimacy or the topic", "नज़दीकी या विषय से बचना"],
      ["Resentment or misunderstandings", "नाराज़गी या ग़लतफ़हमी"],
      ["Different expectations about frequency or preferences", "बारंबारता या पसंद को लेकर अलग उम्मीदें"],
    ],
    cause: [
      ["Shame and lack of words for sexual topics", "शर्म और यौन विषयों के लिए शब्दों की कमी"],
      ["Fear of hurting the partner", "साथी को चोट पहुँचाने का डर"],
      ["Cultural taboos", "सांस्कृतिक वर्जनाएँ"],
    ],
    risk: [
      ["Ongoing sexual problems (PE, ED, pain)", "लगातार यौन समस्याएँ (शीघ्रपतन, ED, दर्द)"],
      ["Stress and lack of time together", "तनाव और साथ के समय की कमी"],
      ["Conflict in other areas of the relationship", "रिश्ते के दूसरे पहलुओं में कलह"],
    ],
    mgmt: [
      ["Start with appreciation: what you value in the relationship", "सराहना से शुरू करें: रिश्ते में आपको क्या अच्छा लगता है"],
      ["Say: 'I would like us to feel closer. Can we talk about what we both enjoy?'", "कहें: 'मैं चाहता/चाहती हूँ कि हम और क़रीब महसूस करें। क्या हम बात कर सकते हैं कि हम दोनों को क्या अच्छा लगता है?'"],
      ["Listen without interrupting", "बिना टोके सुनें"],
      ["Seek couples or psychosexual counselling together if stuck", "अटक जाएँ तो साथ मिलकर कपल या साइकोसेक्सुअल काउंसलिंग"],
    ],
    help: [
      ["Conversations turning into fights", "बातचीत झगड़े में बदलना"],
      ["A sexual problem lasting months", "महीनों से चली आ रही यौन समस्या"],
      PRIVATE_HELP,
    ],
    faq: [
      ["What if my partner refuses to talk?", "अगर साथी बात करने से मना करे तो?", "Give time, try again gently, and consider starting counselling alone.", "समय दें, फिर प्यार से कोशिश करें, और अकेले काउंसलिंग शुरू करने पर विचार करें।"],
      ["Is it normal for couples to have different desire levels?", "क्या जोड़ों में अलग इच्छा स्तर होना सामान्य है?", "Yes, very common. Couples can find a balance with communication.", "हाँ, बहुत आम है। बातचीत से जोड़े संतुलन बना सकते हैं।"],
    ],
    tags: ["pati patni", "baat", "sex communication"],
  },
  {
    slug: "pornography-and-sexual-expectations",
    title: ["Pornography and sexual expectations: effects on real relationships", "पोर्नोग्राफ़ी और यौन उम्मीदें: असली रिश्तों पर असर"],
    excerpt: ["Heavy pornography use can create unrealistic expectations, performance anxiety and relationship strain. Signs of a problem and how to cut down.", "बहुत ज़्यादा पोर्नोग्राफ़ी अवास्तविक उम्मीदें, परफ़ॉर्मेंस की घबराहट और रिश्ते में तनाव पैदा कर सकती है। समस्या के संकेत और कैसे कम करें।"],
    related: ["problematic-pornography-use-treatment-india", "sexual-performance-anxiety-india", "erectile-dysfunction-treatment-india"],
    refs: ["icd11"],
    intro: [
      ["Pornography shows performances, not typical sex. Comparing yourself or a partner with it can lead to anxiety and disappointment.", "पोर्नोग्राफ़ी अभिनय दिखाती है, सामान्य सेक्स नहीं। ख़ुद की या साथी की इससे तुलना करने से घबराहट और निराशा होती है।"],
      ["For some people, use becomes compulsive and hard to control.", "कुछ लोगों में इस्तेमाल बाध्यकारी और नियंत्रण से बाहर हो जाता है।"],
    ],
    key: [
      ["Unrealistic expectations about size, duration and behaviour", "आकार, समय और व्यवहार की अवास्तविक उम्मीदें"],
      ["Compulsive use can be treated with CBT", "बाध्यकारी इस्तेमाल का CBT से इलाज होता है"],
      ["Reducing use often improves real-life arousal", "इस्तेमाल घटाने से अक्सर असली ज़िंदगी में उत्तेजना सुधरती है"],
    ],
    sym: [
      ["Needing pornography to become aroused", "उत्तेजना के लिए पोर्नोग्राफ़ी की ज़रूरत"],
      ["Difficulty with arousal or ejaculation with a partner", "साथी के साथ उत्तेजना या स्खलन में कठिनाई"],
      ["Hours spent, secrecy, failed attempts to cut down", "घंटों बिताना, छिपाना, कम करने की असफल कोशिशें"],
    ],
    cause: [
      ["Easy access on phones", "फ़ोन पर आसान पहुँच"],
      ["Using it to cope with stress, loneliness or boredom", "तनाव, अकेलेपन या ऊब से निपटने के लिए"],
      ["Novelty-seeking reward patterns", "नयापन चाहने वाले इनाम पैटर्न"],
    ],
    risk: [
      ["Adolescent onset", "किशोरावस्था में शुरुआत"],
      ["Anxiety, depression, ADHD", "घबराहट, डिप्रेशन, ADHD"],
      ["Late-night phone use", "देर रात फ़ोन"],
    ],
    mgmt: [
      ["Set limits; use blocking tools; keep phone out of the bedroom", "सीमाएँ तय करें; ब्लॉकिंग टूल; फ़ोन बेडरूम से बाहर"],
      ["Identify triggers and plan alternatives", "ट्रिगर पहचानें और विकल्प तय करें"],
      ["CBT for compulsive sexual behaviour", "बाध्यकारी यौन व्यवहार के लिए CBT"],
      ["Couples counselling if the relationship is affected", "रिश्ते पर असर हो तो कपल काउंसलिंग"],
    ],
    help: [
      ["Unable to cut down despite harm", "नुकसान के बावजूद कम न कर पाना"],
      ["Sexual problems with a partner", "साथी के साथ यौन समस्याएँ"],
      PRIVATE_HELP,
    ],
    faq: [
      ["Is watching pornography a disorder?", "क्या पोर्नोग्राफ़ी देखना बीमारी है?", "Not by itself. It becomes a concern when it is compulsive, uncontrollable and causes harm.", "अपने आप में नहीं। चिंता तब है जब यह बाध्यकारी, बेक़ाबू हो और नुकसान करे।"],
      ["Can it cause erection problems?", "क्या इससे इरेक्शन की समस्या हो सकती है?", "Some men notice difficulty with partners after heavy use; reducing use and counselling often help.", "कुछ पुरुष बहुत ज़्यादा इस्तेमाल के बाद साथी के साथ दिक़्क़त देखते हैं; कम करने और काउंसलिंग से अक्सर मदद मिलती है।"],
    ],
    tags: ["porn", "blue film", "lat"],
  },
]);
