import type { ConditionContent } from "../types";
import { b, faq } from "./_h";

/** New library pages: mood, anxiety, OCD-related and bipolar-spectrum conditions. */
export const NEW_MOOD_ANXIETY: ConditionContent[] = [
  {
    slug: "dysthymia-persistent-depressive-disorder-india",
    category: "mental",
    group: "mood",
    name: b("Dysthymia (persistent depressive disorder)", "डिस्थाइमिया (लंबे समय का हल्का डिप्रेशन)"),
    title: b("Dysthymia – Long-lasting Low Mood: Symptoms & Treatment", "डिस्थाइमिया – लंबे समय की उदासी: लक्षण और इलाज"),
    h1: b("Dysthymia: when low mood lasts for years", "डिस्थाइमिया: जब उदासी सालों तक बनी रहे"),
    description: b(
      "Feeling low most days for two years or more, but still managing to function? Learn about dysthymia (persistent depressive disorder) and how it is treated.",
      "दो साल या ज़्यादा से ज़्यादातर दिन उदासी, पर काम चलता रहता है? डिस्थाइमिया (लंबे समय का हल्का डिप्रेशन) और इसके इलाज के बारे में जानें।"
    ),
    intro: [
      b("Dysthymia is a long-lasting, milder form of depression. Many people live with it for years and think \"this is just my nature\". Because it is so constant, it is often missed.", "डिस्थाइमिया डिप्रेशन का लंबे समय तक चलने वाला, हल्का रूप है। कई लोग सालों तक इसके साथ जीते हैं और सोचते हैं \"मेरा स्वभाव ही ऐसा है\"। लगातार रहने के कारण यह अक्सर पहचाना नहीं जाता।"),
      b("It is treatable. Recognising it can change the quality of life considerably — at work, at home and in relationships.", "इसका इलाज संभव है। पहचान होने से काम, घर और रिश्तों में ज़िंदगी की गुणवत्ता काफ़ी बदल सकती है।"),
    ],
    symptoms: [
      b("Low or gloomy mood on most days, for at least two years", "कम से कम दो साल से ज़्यादातर दिनों उदासी या मायूसी"),
      b("Low energy and tiredness", "ऊर्जा की कमी और थकान"),
      b("Low self-confidence and self-criticism", "आत्मविश्वास में कमी और ख़ुद की आलोचना"),
      b("Poor concentration and difficulty taking decisions", "ध्यान न लगना और फ़ैसले लेने में दिक्कत"),
      b("Feeling hopeless about the future", "भविष्य को लेकर निराशा"),
      b("Sleep or appetite changes", "नींद या भूख में बदलाव"),
    ],
    causes: [
      b("A mix of genetic vulnerability, temperament and long-term stress", "आनुवंशिक संवेदनशीलता, स्वभाव और लंबे तनाव का मेल"),
      b("Difficult childhood experiences or long-term relationship problems", "बचपन के कठिन अनुभव या लंबे समय की रिश्तों की समस्या"),
      b("Chronic physical illness or pain", "पुरानी शारीरिक बीमारी या दर्द"),
    ],
    riskFactors: [
      b("Depression in the family", "परिवार में डिप्रेशन"),
      b("Anxiety disorders, substance use or personality difficulties", "घबराहट की बीमारी, नशा या स्वभाव से जुड़ी कठिनाइयाँ"),
      b("Social isolation", "सामाजिक अकेलापन"),
    ],
    diagnosis: [
      b("Depressive symptoms on most days for at least two years (one year in children and teenagers)", "कम से कम दो साल (बच्चों और किशोरों में एक साल) से ज़्यादातर दिनों डिप्रेशन के लक्षण"),
      b("Checking whether a full depressive episode is also present (\"double depression\")", "देखना कि साथ में पूरा डिप्रेसिव एपिसोड तो नहीं (\"डबल डिप्रेशन\")"),
      b("Excluding thyroid problems, anaemia, medicines and substance use", "थायरॉइड, ख़ून की कमी, दवाओं और नशे को अलग करना"),
    ],
    icd: { icd10: "F34.1", icd11: "6A72" },
    treatment: [
      b("Psychotherapy to change long-standing negative patterns", "पुराने नकारात्मक पैटर्न बदलने के लिए साइकोथेरेपी"),
      b("Antidepressant medicines, often helpful when combined with therapy", "एंटीडिप्रेसेंट दवाएँ, थेरेपी के साथ अक्सर उपयोगी"),
      b("Regular exercise, sleep routine and meaningful daily activity", "नियमित व्यायाम, नींद की दिनचर्या और रोज़ की सार्थक गतिविधि"),
      b("Longer follow-up, because dysthymia tends to be chronic", "लंबा फॉलो-अप, क्योंकि डिस्थाइमिया लंबे समय तक चलता है"),
    ],
    psychotherapy: [
      b("CBT and CBASP (a therapy designed for chronic depression)", "CBT और CBASP (लंबे डिप्रेशन के लिए बनी थेरेपी)"),
      b("Interpersonal therapy focusing on relationships and roles", "रिश्तों और भूमिकाओं पर केंद्रित इंटरपर्सनल थेरेपी"),
    ],
    family: [
      b("Do not dismiss it as \"just their personality\"", "इसे \"बस उनका स्वभाव\" कहकर टालें नहीं"),
      b("Encourage steady treatment — improvement is gradual", "लगातार इलाज के लिए प्रोत्साहित करें — सुधार धीरे-धीरे होता है"),
    ],
    seekHelp: [
      b("Low mood has lasted for years and limits your life", "उदासी सालों से है और ज़िंदगी को सीमित कर रही है"),
      b("Mood has become worse recently", "हाल में मूड और बिगड़ गया है"),
      b("Any thoughts of not wanting to live", "जीने की इच्छा न होने का कोई भी विचार"),
    ],
    faqs: [
      faq("Is dysthymia less serious than depression?", "क्या डिस्थाइमिया डिप्रेशन से कम गंभीर है?", "Symptoms are milder, but because they last for years the total impact can be large. It deserves treatment.", "लक्षण हल्के होते हैं, पर सालों तक रहने के कारण कुल असर बड़ा हो सकता है। इसका इलाज ज़रूरी है।"),
      faq("Can it be cured?", "क्या यह ठीक हो सकता है?", "Many people improve substantially with therapy and medicines. Some need longer treatment to stay well.", "थेरेपी और दवाओं से कई लोगों में काफ़ी सुधार होता है। कुछ को ठीक रहने के लिए लंबा इलाज चाहिए।"),
      faq("Will I need medicines lifelong?", "क्या ज़िंदगी भर दवा लेनी होगी?", "Not necessarily. The duration is decided with your doctor based on response and relapse history.", "ज़रूरी नहीं। अवधि आपके सुधार और पिछली बार बीमारी लौटने के इतिहास के आधार पर डॉक्टर के साथ तय होती है।"),
    ],
    related: ["depression-treatment-india", "generalized-anxiety-disorder-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["phq9"],
    videoKeywords: ["depression", "dysthymia", "उदासी"],
    keywords: ["purani udasi", "always sad", "chronic depression"],
  },
  {
    slug: "pmdd-premenstrual-mood-symptoms-india",
    category: "women",
    group: "mood",
    name: b("PMDD (premenstrual dysphoric disorder)", "PMDD (माहवारी से पहले गंभीर मूड बदलाव)"),
    title: b("PMDD – Severe Mood Changes Before Periods: Treatment", "PMDD – माहवारी से पहले गंभीर मूड बदलाव: इलाज"),
    h1: b("PMDD: severe mood symptoms before periods", "PMDD: माहवारी से पहले के गंभीर मूड लक्षण"),
    description: b(
      "Severe irritability, sadness or anxiety in the week before periods that improves after they start? Learn how PMDD differs from PMS and how it is treated.",
      "माहवारी से पहले के हफ़्ते में बहुत चिड़चिड़ापन, उदासी या घबराहट जो माहवारी शुरू होने पर ठीक हो जाए? जानें PMDD, PMS से कैसे अलग है और इलाज कैसे होता है।"
    ),
    intro: [
      b("Many women notice some mood or body changes before periods (PMS). In PMDD, the mood symptoms are severe enough to disrupt work, studies or relationships every month.", "कई महिलाओं को माहवारी से पहले कुछ मूड या शारीरिक बदलाव होते हैं (PMS)। PMDD में मूड के लक्षण इतने गंभीर होते हैं कि हर महीने काम, पढ़ाई या रिश्तों पर असर पड़ता है।"),
      b("It is a recognised medical condition, not a character flaw, and effective treatments exist.", "यह एक मान्यता प्राप्त बीमारी है, स्वभाव की कमी नहीं, और इसका असरदार इलाज उपलब्ध है।"),
    ],
    symptoms: [
      b("Marked irritability, anger or conflicts in the days before periods", "माहवारी से पहले के दिनों में बहुत चिड़चिड़ापन, गुस्सा या झगड़े"),
      b("Sudden sadness, tearfulness or feeling hopeless", "अचानक उदासी, रोना या निराशा"),
      b("Anxiety or feeling on edge", "घबराहट या तनाव"),
      b("Low interest, poor concentration, tiredness", "मन न लगना, ध्यान न लगना, थकान"),
      b("Food cravings, sleep changes, breast tenderness, bloating", "खाने की तीव्र इच्छा, नींद में बदलाव, स्तनों में दर्द, पेट फूलना"),
      b("Symptoms clearly improve within a few days after periods start", "माहवारी शुरू होने के कुछ दिनों में लक्षण साफ़ तौर पर ठीक हो जाते हैं"),
    ],
    causes: [
      b("Increased sensitivity of the brain to normal hormonal changes in the cycle — hormone levels themselves are usually normal", "चक्र के सामान्य हार्मोन बदलावों के प्रति दिमाग़ की बढ़ी हुई संवेदनशीलता — हार्मोन का स्तर आमतौर पर सामान्य रहता है"),
      b("Serotonin-related brain changes", "सेरोटोनिन से जुड़े दिमाग़ी बदलाव"),
    ],
    riskFactors: [
      b("Past depression or anxiety, including after childbirth", "पहले डिप्रेशन या घबराहट, डिलीवरी के बाद सहित"),
      b("Family history of PMDD or mood disorders", "परिवार में PMDD या मूड की बीमारी"),
      b("High stress and past trauma", "ज़्यादा तनाव और पुराना आघात"),
    ],
    diagnosis: [
      b("Daily symptom diary for at least two menstrual cycles", "कम से कम दो माहवारी चक्रों तक रोज़ की लक्षण डायरी"),
      b("Confirming that symptoms appear before periods and clear afterwards", "पुष्टि करना कि लक्षण माहवारी से पहले आते हैं और बाद में चले जाते हैं"),
      b("Ruling out ongoing depression, thyroid disease and anaemia", "लगातार डिप्रेशन, थायरॉइड और ख़ून की कमी को अलग करना"),
    ],
    icd: { icd10: "N94.3", icd11: "GA34.41", note: b("Premenstrual dysphoric disorder (ICD-11, genitourinary chapter, with a cross-reference in depressive disorders).", "प्रीमेंस्ट्रुअल डिस्फ़ोरिक डिसऑर्डर (ICD-11)।") },
    treatment: [
      b("Lifestyle: regular exercise, sleep, less caffeine and salt in the second half of the cycle", "जीवनशैली: नियमित व्यायाम, नींद, चक्र के दूसरे हिस्से में कम कैफ़ीन और नमक"),
      b("Certain antidepressant medicines — sometimes only in the two weeks before periods", "कुछ एंटीडिप्रेसेंट दवाएँ — कभी-कभी सिर्फ़ माहवारी से पहले के दो हफ़्तों में"),
      b("Hormonal treatment in coordination with a gynaecologist when appropriate", "ज़रूरत हो तो स्त्री रोग विशेषज्ञ के साथ हार्मोनल इलाज"),
    ],
    psychotherapy: [
      b("CBT for irritability, mood and coping in the difficult days", "मुश्किल दिनों में चिड़चिड़ापन, मूड और संभलने के लिए CBT"),
      b("Planning demanding tasks around the cycle when possible", "जहाँ संभव हो, भारी काम चक्र के हिसाब से तय करना"),
    ],
    family: [
      b("Understand that the change is medical and temporary each month", "समझें कि यह बदलाव मेडिकल है और हर महीने अस्थायी है"),
      b("Postpone serious discussions to after the difficult days when possible", "जहाँ हो सके, गंभीर बातें मुश्किल दिनों के बाद करें"),
    ],
    seekHelp: [
      b("Symptoms disrupt work, studies or family every month", "हर महीने लक्षण काम, पढ़ाई या परिवार पर असर डालें"),
      b("Thoughts of self-harm before periods — seek help the same day", "माहवारी से पहले ख़ुद को नुकसान के विचार — उसी दिन मदद लें"),
    ],
    faqs: [
      faq("How is PMDD different from PMS?", "PMDD और PMS में क्या फ़र्क़ है?", "PMS is common and mild. PMDD involves severe mood symptoms that clearly interfere with daily life.", "PMS आम और हल्का है। PMDD में मूड के गंभीर लक्षण होते हैं जो रोज़ की ज़िंदगी पर साफ़ असर डालते हैं।"),
      faq("Do I need hormone tests?", "क्या हार्मोन टेस्ट ज़रूरी है?", "Usually not. Diagnosis is based on a symptom diary across cycles; hormone levels are typically normal.", "आमतौर पर नहीं। निदान चक्रों की लक्षण डायरी से होता है; हार्मोन स्तर आमतौर पर सामान्य होते हैं।"),
      faq("Will treatment affect pregnancy plans?", "क्या इलाज से गर्भधारण की योजना पर असर पड़ेगा?", "Tell your doctor about pregnancy plans; treatment can be chosen accordingly.", "डॉक्टर को गर्भधारण की योजना बताएँ; उसी के हिसाब से इलाज चुना जा सकता है।"),
    ],
    related: ["womens-mental-health-india", "depression-treatment-india", "postpartum-depression-india"],
    selfTests: ["phq9", "gad7"],
    videoKeywords: ["pmdd", "periods", "माहवारी"],
    keywords: ["periods se pehle gussa", "pms", "mahvari"],
  },
  {
    slug: "postpartum-depression-india",
    category: "women",
    group: "mood",
    name: b("Depression after childbirth (postpartum depression)", "डिलीवरी के बाद डिप्रेशन (पोस्टपार्टम डिप्रेशन)"),
    title: b("Postpartum Depression – Symptoms & Safe Treatment", "डिलीवरी के बाद डिप्रेशन – लक्षण और सुरक्षित इलाज"),
    h1: b("Depression after childbirth", "डिलीवरी के बाद डिप्रेशन"),
    description: b(
      "Sadness, anxiety or feeling unable to cope weeks after delivery? Postpartum depression is common and treatable, including while breastfeeding.",
      "डिलीवरी के हफ़्तों बाद उदासी, घबराहट या संभाल न पाने का एहसास? पोस्टपार्टम डिप्रेशन आम है और इसका इलाज संभव है, स्तनपान के दौरान भी।"
    ),
    intro: [
      b("Feeling tearful for a few days after delivery (\"baby blues\") is common and settles within about two weeks. When low mood, anxiety or exhaustion last longer or are severe, it may be postpartum depression.", "डिलीवरी के बाद कुछ दिन रोना-धोना (\"बेबी ब्लूज़\") आम है और लगभग दो हफ़्ते में ठीक हो जाता है। उदासी, घबराहट या थकान लंबे समय रहे या गंभीर हो, तो यह पोस्टपार्टम डिप्रेशन हो सकता है।"),
      b("It is not a failure as a mother. With treatment, mothers recover and bonding with the baby improves.", "यह माँ के रूप में असफलता नहीं है। इलाज से माँ ठीक होती है और बच्चे से जुड़ाव भी बेहतर होता है।"),
    ],
    symptoms: [
      b("Persistent sadness, crying, feeling empty", "लगातार उदासी, रोना, खालीपन"),
      b("Anxiety, constant worry about the baby, panic", "घबराहट, बच्चे को लेकर लगातार चिंता, पैनिक"),
      b("Feeling unable to cope, guilt, feeling like a bad mother", "संभाल न पाने का एहसास, अपराध-बोध, ख़ुद को बुरी माँ समझना"),
      b("Not sleeping even when the baby sleeps", "बच्चा सोए तब भी नींद न आना"),
      b("Loss of interest, poor appetite, irritability", "मन न लगना, भूख कम, चिड़चिड़ापन"),
      b("Difficulty bonding with the baby", "बच्चे से जुड़ाव में कठिनाई"),
    ],
    causes: [
      b("Rapid hormonal changes after delivery combined with sleep loss", "डिलीवरी के बाद तेज़ हार्मोनल बदलाव और नींद की कमी"),
      b("Stress of new responsibilities, lack of support, relationship strain", "नई ज़िम्मेदारियों का तनाव, सहारे की कमी, रिश्तों में खिंचाव"),
      b("Complicated delivery or a baby who is unwell", "मुश्किल डिलीवरी या बच्चे की तबीयत ख़राब होना"),
    ],
    riskFactors: [
      b("Depression or anxiety before or during pregnancy", "गर्भावस्था से पहले या दौरान डिप्रेशन या घबराहट"),
      b("Previous postpartum depression; bipolar disorder in self or family", "पहले भी पोस्टपार्टम डिप्रेशन; अपने में या परिवार में बाइपोलर"),
      b("Domestic violence, family pressure about the baby's gender, financial stress", "घरेलू हिंसा, बच्चे के लिंग को लेकर दबाव, पैसों का तनाव"),
    ],
    diagnosis: [
      b("Assessment of mood, anxiety, sleep and thoughts about self and baby, in a non-judgemental setting", "बिना जज किए मूड, घबराहट, नींद और ख़ुद व बच्चे के बारे में विचारों की जाँच"),
      b("Checking thyroid, haemoglobin and other physical causes", "थायरॉइड, हीमोग्लोबिन और दूसरे शारीरिक कारणों की जाँच"),
      b("Urgently identifying postpartum psychosis (confusion, unusual beliefs, hearing voices) — a medical emergency", "पोस्टपार्टम साइकोसिस (भ्रम, अजीब विश्वास, आवाज़ें सुनना) की तुरंत पहचान — यह मेडिकल इमरजेंसी है"),
    ],
    icd: { icd10: "F53.0", icd11: "6E20", note: b("Mental or behavioural disorders associated with pregnancy, childbirth or the puerperium, without psychotic symptoms.", "गर्भावस्था, डिलीवरी या प्रसवोत्तर काल से जुड़े मानसिक विकार, बिना मनोविकृति लक्षणों के।") },
    treatment: [
      b("Counselling and practical support with sleep and baby care", "नींद और बच्चे की देखभाल में व्यावहारिक मदद के साथ काउंसलिंग"),
      b("Antidepressants chosen to be compatible with breastfeeding when needed", "ज़रूरत हो तो स्तनपान के साथ सुरक्षित एंटीडिप्रेसेंट"),
      b("Close follow-up and coordination with the gynaecologist and paediatrician", "स्त्री रोग विशेषज्ञ और बाल रोग विशेषज्ञ से तालमेल के साथ नज़दीकी फॉलो-अप"),
    ],
    psychotherapy: [
      b("CBT and interpersonal therapy adapted for new mothers", "नई माँओं के लिए CBT और इंटरपर्सनल थेरेपी"),
      b("Mother–infant bonding support", "माँ-बच्चे के जुड़ाव में मदद"),
    ],
    family: [
      b("Take over night feeds or baby care at times so that the mother can sleep", "कभी-कभी रात की देखभाल ख़ुद संभालें ताकि माँ सो सके"),
      b("Avoid criticism about feeding, weight or the baby's gender", "दूध पिलाने, वज़न या बच्चे के लिंग पर टिप्पणी न करें"),
      b("If she seems confused, hears voices or talks of harming herself or the baby, seek emergency help immediately", "अगर वह भ्रमित लगे, आवाज़ें सुने या ख़ुद को या बच्चे को नुकसान की बात करे, तो तुरंत इमरजेंसी मदद लें"),
    ],
    seekHelp: [
      b("Low mood or anxiety lasting more than two weeks after delivery", "डिलीवरी के बाद दो हफ़्ते से ज़्यादा उदासी या घबराहट"),
      b("Unable to sleep, eat or care for self and baby", "सो न पाना, खा न पाना या ख़ुद और बच्चे की देखभाल न कर पाना"),
      b("Any thoughts of self-harm or harming the baby — emergency", "ख़ुद को या बच्चे को नुकसान का कोई भी विचार — इमरजेंसी"),
    ],
    faqs: [
      faq("Can I take medicines while breastfeeding?", "क्या स्तनपान के दौरान दवा ले सकती हूँ?", "Several antidepressants are considered compatible with breastfeeding. The choice is made with you, weighing benefits and risks.", "कई एंटीडिप्रेसेंट स्तनपान के साथ सुरक्षित माने जाते हैं। फ़ायदे और जोखिम देखकर आपके साथ मिलकर चुनाव होता है।"),
      faq("Does it mean I am a bad mother?", "क्या इसका मतलब है कि मैं बुरी माँ हूँ?", "No. Postpartum depression is a medical condition and seeking help is a caring decision for you and your baby.", "नहीं। पोस्टपार्टम डिप्रेशन एक बीमारी है और मदद लेना आपके और बच्चे के लिए देखभाल भरा फ़ैसला है।"),
      faq("Can fathers get depressed after a baby is born?", "क्या पिता को भी बच्चे के जन्म के बाद डिप्रेशन हो सकता है?", "Yes, fathers can also develop depression or anxiety after childbirth and can be helped.", "हाँ, पिता को भी डिलीवरी के बाद डिप्रेशन या घबराहट हो सकती है और उनका भी इलाज संभव है।"),
    ],
    related: ["womens-mental-health-india", "depression-treatment-india", "pmdd-premenstrual-mood-symptoms-india"],
    selfTests: ["phq9", "gad7"],
    videoKeywords: ["postpartum", "delivery", "डिलीवरी"],
    keywords: ["delivery ke baad", "baby blues", "prasav", "postnatal depression"],
  },
  {
    slug: "prolonged-grief-disorder-india",
    category: "mental",
    group: "trauma",
    name: b("Prolonged grief", "लंबा शोक (प्रोलॉन्ग्ड ग्रीफ़)"),
    title: b("Prolonged Grief Disorder – When Grief Does Not Ease", "लंबा शोक – जब किसी अपने के जाने का दुःख कम न हो"),
    h1: b("Prolonged grief: when mourning does not ease", "लंबा शोक: जब दुःख कम न हो"),
    description: b(
      "Grief is natural. When intense longing and pain still dominate life many months after a death, it may be prolonged grief — and support helps.",
      "शोक स्वाभाविक है। किसी के जाने के कई महीनों बाद भी तीव्र याद और दर्द ज़िंदगी पर हावी रहे, तो यह लंबा शोक हो सकता है — और सहारा मदद करता है।"
    ),
    intro: [
      b("Grief after losing someone close is a normal human response, and it differs across people and cultures. For most, the pain slowly softens.", "किसी क़रीबी को खोने के बाद शोक सामान्य मानवीय प्रतिक्रिया है, और यह लोगों व संस्कृतियों में अलग-अलग होता है। ज़्यादातर लोगों में दर्द धीरे-धीरे कम होता है।"),
      b("For some, intense grief continues to dominate daily life long after the loss. This is called prolonged grief disorder and responds to specific therapy.", "कुछ लोगों में तीव्र शोक नुकसान के बहुत समय बाद भी रोज़ की ज़िंदगी पर हावी रहता है। इसे प्रोलॉन्ग्ड ग्रीफ़ डिसऑर्डर कहते हैं और इसमें ख़ास थेरेपी से फ़ायदा होता है।"),
    ],
    symptoms: [
      b("Intense longing for, or constant preoccupation with, the person who died", "जाने वाले की तीव्र याद या लगातार उन्हीं के बारे में सोचना"),
      b("Difficulty accepting the death; feeling that part of oneself has died", "मौत को स्वीकार न कर पाना; लगना कि अपना एक हिस्सा मर गया"),
      b("Deep emotional pain, guilt, anger or blame", "गहरा भावनात्मक दर्द, अपराध-बोध, गुस्सा या दोष"),
      b("Avoiding reminders, or being unable to engage in life or plans", "यादों से बचना, या ज़िंदगी और योजनाओं में मन न लगा पाना"),
      b("Feeling life is meaningless without them", "उनके बिना ज़िंदगी बेमानी लगना"),
    ],
    causes: [
      b("A sudden, violent or unexpected death; death of a child or partner", "अचानक, हिंसक या अप्रत्याशित मौत; बच्चे या जीवनसाथी की मौत"),
      b("A very close or dependent relationship with the person", "व्यक्ति से बहुत गहरा या निर्भरता वाला रिश्ता"),
      b("Lack of support and other stresses after the loss", "नुकसान के बाद सहारे की कमी और दूसरे तनाव"),
    ],
    riskFactors: [
      b("Previous depression or anxiety", "पहले डिप्रेशन या घबराहट"),
      b("Multiple losses in a short time", "थोड़े समय में कई लोगों को खोना"),
      b("Being unable to take part in rituals or say goodbye", "अंतिम संस्कार या विदाई में भाग न ले पाना"),
    ],
    diagnosis: [
      b("Grief that persists for an unusually long time (ICD-11: at least six months after the loss) and clearly exceeds cultural and religious norms", "शोक जो असामान्य रूप से लंबे समय तक रहे (ICD-11: नुकसान के कम से कम छह महीने बाद) और सांस्कृतिक-धार्मिक मानकों से साफ़ ज़्यादा हो"),
      b("Significant difficulty in daily functioning", "रोज़ के कामकाज में काफ़ी दिक्कत"),
      b("Checking for depression, PTSD and suicide risk", "डिप्रेशन, PTSD और आत्महत्या के जोखिम की जाँच"),
    ],
    icd: { icd11: "6B42", note: b("Prolonged grief disorder is new in ICD-11; ICD-10 has no specific code.", "प्रोलॉन्ग्ड ग्रीफ़ डिसऑर्डर ICD-11 में नया है; ICD-10 में अलग कोड नहीं।") },
    treatment: [
      b("Grief-focused psychotherapy is the main treatment", "शोक पर केंद्रित साइकोथेरेपी मुख्य इलाज है"),
      b("Treating associated depression, anxiety or sleep problems, with medicines if needed", "साथ में डिप्रेशन, घबराहट या नींद की समस्या का इलाज, ज़रूरत हो तो दवा से"),
      b("Rebuilding routines and social connections", "दिनचर्या और सामाजिक रिश्ते फिर से बनाना"),
    ],
    psychotherapy: [
      b("Prolonged grief therapy: telling the story of the loss, working with memories and planning a meaningful future", "प्रोलॉन्ग्ड ग्रीफ़ थेरेपी: नुकसान की कहानी कहना, यादों के साथ काम करना और सार्थक भविष्य की योजना"),
      b("Gradual re-engagement with avoided places and activities", "बचने वाली जगहों और गतिविधियों में धीरे-धीरे लौटना"),
    ],
    family: [
      b("Keep talking about the person when the bereaved wants to — silence can feel lonely", "जब शोक में डूबा व्यक्ति चाहे, जाने वाले के बारे में बात करते रहें — चुप्पी अकेलापन बढ़ा सकती है"),
      b("Offer practical help, especially in the months after rituals end", "व्यावहारिक मदद दें, ख़ासकर रस्में ख़त्म होने के बाद के महीनों में"),
    ],
    seekHelp: [
      b("Grief still stops you from functioning many months after the loss", "नुकसान के कई महीनों बाद भी शोक के कारण काम न कर पाना"),
      b("Thoughts of wanting to die to be with the person — seek help the same day", "उनके पास जाने के लिए मरने की इच्छा — उसी दिन मदद लें"),
    ],
    faqs: [
      faq("Is there a \"right\" time to stop grieving?", "क्या शोक ख़त्म होने का कोई \"सही\" समय है?", "No. Grief changes but may never fully end. The concern is when it remains so intense that life cannot continue.", "नहीं। शोक बदलता है पर शायद पूरी तरह कभी ख़त्म न हो। चिंता तब है जब यह इतना तीव्र रहे कि ज़िंदगी आगे न बढ़ सके।"),
      faq("Will therapy make me forget them?", "क्या थेरेपी से मैं उन्हें भूल जाऊँगा/जाऊँगी?", "No. Therapy helps you carry their memory with less pain, not forget them.", "नहीं। थेरेपी उन्हें भूलने के लिए नहीं, बल्कि कम दर्द के साथ उनकी याद रखने में मदद करती है।"),
      faq("Are medicines needed?", "क्या दवाएँ ज़रूरी हैं?", "Not for grief itself, but they can help if depression, anxiety or severe sleep problems are present.", "शोक के लिए नहीं, पर साथ में डिप्रेशन, घबराहट या गंभीर नींद की समस्या हो तो मदद कर सकती हैं।"),
    ],
    related: ["depression-treatment-india", "ptsd-trauma-treatment-india", "adjustment-disorder-india"],
    selfTests: ["phq9"],
    videoKeywords: ["grief", "शोक", "loss"],
    keywords: ["shok", "gam", "death of loved one", "bereavement"],
  },
  {
    slug: "agoraphobia-treatment-india",
    category: "mental",
    group: "anxiety",
    name: b("Agoraphobia", "एगोराफ़ोबिया (भीड़/बाहर जाने का डर)"),
    title: b("Agoraphobia – Fear of Crowds, Travel & Leaving Home", "एगोराफ़ोबिया – भीड़, सफ़र और घर से बाहर जाने का डर"),
    h1: b("Agoraphobia: fear of places that feel hard to escape", "एगोराफ़ोबिया: ऐसी जगहों का डर जहाँ से निकलना मुश्किल लगे"),
    description: b(
      "Avoiding buses, markets, crowds or going out alone because of fear of panic? Agoraphobia is treatable with CBT and medicines.",
      "पैनिक के डर से बस, बाज़ार, भीड़ या अकेले बाहर जाने से बचते हैं? एगोराफ़ोबिया का इलाज CBT और दवाओं से संभव है।"
    ),
    intro: [
      b("Agoraphobia is fear and avoidance of situations where escape or help might be difficult if panic-like symptoms occur — crowds, public transport, open or closed spaces, or being outside alone.", "एगोराफ़ोबिया उन स्थितियों का डर और उनसे बचना है जहाँ घबराहट होने पर निकलना या मदद मिलना मुश्किल लगे — भीड़, बस-ट्रेन, खुली या बंद जगहें, या अकेले बाहर होना।"),
      b("Over time the world can shrink to the home. Treatment helps people step by step regain their freedom.", "समय के साथ दुनिया घर तक सिमट सकती है। इलाज से लोग क़दम-दर-क़दम अपनी आज़ादी वापस पाते हैं।"),
    ],
    symptoms: [
      b("Fear of crowds, markets, queues, buses, trains or travelling far", "भीड़, बाज़ार, लाइन, बस, ट्रेन या दूर सफ़र का डर"),
      b("Fear of being outside the home alone", "घर से अकेले बाहर होने का डर"),
      b("Needing a companion to go out", "बाहर जाने के लिए किसी साथी की ज़रूरत"),
      b("Panic-like symptoms in these situations: palpitations, dizziness, fear of fainting or losing control", "इन स्थितियों में घबराहट जैसे लक्षण: धड़कन, चक्कर, बेहोश होने या नियंत्रण खोने का डर"),
      b("Avoiding these places, which restricts work and social life", "इन जगहों से बचना, जिससे काम और सामाजिक जीवन सीमित हो जाए"),
    ],
    causes: [
      b("Often develops after panic attacks, when a person starts avoiding places linked to them", "अक्सर पैनिक अटैक के बाद शुरू होता है, जब व्यक्ति उनसे जुड़ी जगहों से बचने लगता है"),
      b("Anxious temperament and stressful events", "घबराने वाला स्वभाव और तनाव वाली घटनाएँ"),
    ],
    riskFactors: [
      b("Panic disorder", "पैनिक डिसऑर्डर"),
      b("Family history of anxiety disorders", "परिवार में घबराहट की बीमारी"),
      b("Depression", "डिप्रेशन"),
    ],
    diagnosis: [
      b("Fear and avoidance in at least two types of situations for several months", "कई महीनों से कम से कम दो तरह की स्थितियों में डर और बचना"),
      b("Assessing panic disorder and depression, which often accompany it", "पैनिक डिसऑर्डर और डिप्रेशन की जाँच, जो अक्सर साथ होते हैं"),
      b("Excluding heart, balance (vertigo) and thyroid problems when indicated", "ज़रूरत हो तो दिल, संतुलन (वर्टिगो) और थायरॉइड की समस्या को अलग करना"),
    ],
    icd: { icd10: "F40.0", icd11: "6B02" },
    treatment: [
      b("CBT with graded exposure — the core treatment", "धीरे-धीरे सामना (ग्रेडेड एक्सपोज़र) के साथ CBT — मुख्य इलाज"),
      b("Antidepressant medicines that reduce panic and anxiety (not habit-forming)", "पैनिक और घबराहट कम करने वाली एंटीडिप्रेसेंट दवाएँ (लत नहीं लगती)"),
      b("Starting with online consultation is possible for those who cannot travel yet", "जो अभी सफ़र नहीं कर सकते, उनके लिए ऑनलाइन परामर्श से शुरुआत संभव है"),
    ],
    psychotherapy: [
      b("Building a ladder of situations from easiest to hardest and practising each until fear reduces", "आसान से कठिन स्थितियों की सीढ़ी बनाना और हर एक का तब तक अभ्यास जब तक डर कम न हो"),
      b("Reducing safety behaviours like always carrying water or a companion", "हमेशा पानी या साथी रखने जैसे बचाव वाले व्यवहार कम करना"),
    ],
    family: [
      b("Accompany at first, then gradually step back as agreed in therapy", "शुरू में साथ जाएँ, फिर थेरेपी में तय तरीके से धीरे-धीरे पीछे हटें"),
      b("Avoid doing all outside tasks for the person permanently", "बाहर के सारे काम हमेशा के लिए ख़ुद करने से बचें"),
    ],
    seekHelp: [
      b("Fear is stopping you from work, studies or daily needs", "डर से काम, पढ़ाई या रोज़ की ज़रूरतें रुक रही हों"),
      b("You have stopped going out alone", "आपने अकेले बाहर जाना बंद कर दिया हो"),
    ],
    faqs: [
      faq("Can I start treatment without leaving home?", "क्या घर से निकले बिना इलाज शुरू कर सकते हैं?", "Yes. Video consultation is a good first step; exposure practice is then planned gradually.", "हाँ। वीडियो परामर्श अच्छा पहला क़दम है; फिर सामना करने का अभ्यास धीरे-धीरे तय होता है।"),
      faq("Will I have to face my worst fear immediately?", "क्या मुझे तुरंत अपने सबसे बड़े डर का सामना करना होगा?", "No. Exposure starts with easier steps at a pace you agree to.", "नहीं। सामना आसान क़दमों से, आपकी सहमति वाली रफ़्तार से शुरू होता है।"),
      faq("How long does recovery take?", "ठीक होने में कितना समय लगता है?", "Many people notice clear improvement within a few months of regular practice and treatment.", "नियमित अभ्यास और इलाज से कई लोगों को कुछ महीनों में साफ़ सुधार दिखता है।"),
    ],
    related: ["panic-disorder-treatment-india", "anxiety-phobia-treatment-india", "cbt-cognitive-behaviour-therapy-india"],
    selfTests: ["gad7"],
    videoKeywords: ["agoraphobia", "panic", "भीड़"],
    keywords: ["bheed se dar", "bahar jane se dar", "travel fear"],
  },
  {
    slug: "separation-anxiety-children-india",
    category: "child",
    group: "child",
    name: b("Separation anxiety in children", "बच्चों में अलग होने का डर (सेपरेशन एंग्ज़ायटी)"),
    title: b("Separation Anxiety in Children – School Refusal & Clinginess", "बच्चों में अलग होने का डर – स्कूल न जाना और चिपके रहना"),
    h1: b("Separation anxiety in children", "बच्चों में अलग होने का डर"),
    description: b(
      "Child refusing school, crying intensely or complaining of stomach aches when apart from parents? Learn about separation anxiety and how to help.",
      "बच्चा स्कूल जाने से मना करे, बहुत रोए या माता-पिता से अलग होने पर पेट दर्द की शिकायत करे? सेपरेशन एंग्ज़ायटी और मदद के तरीके जानें।"
    ),
    intro: [
      b("Some worry about being apart from parents is normal in young children. Separation anxiety disorder is fear that is much stronger than expected for the child's age and lasts for weeks, affecting school and daily life.", "छोटे बच्चों में माता-पिता से अलग होने की थोड़ी चिंता सामान्य है। सेपरेशन एंग्ज़ायटी डिसऑर्डर में डर उम्र के हिसाब से बहुत ज़्यादा होता है, हफ़्तों तक रहता है और स्कूल व रोज़ की ज़िंदगी पर असर डालता है।"),
      b("With calm, consistent support and short-term therapy, most children improve well.", "शांत, एक जैसे सहारे और कुछ समय की थेरेपी से ज़्यादातर बच्चे अच्छी तरह सुधरते हैं।"),
    ],
    symptoms: [
      b("Excessive distress when leaving home or separating from parents", "घर से निकलते या माता-पिता से अलग होते समय बहुत ज़्यादा परेशानी"),
      b("Worry that something bad will happen to parents", "चिंता कि माता-पिता को कुछ बुरा हो जाएगा"),
      b("Refusing to go to school or sleep alone", "स्कूल जाने या अकेले सोने से मना करना"),
      b("Stomach aches, headaches or vomiting on school days", "स्कूल के दिनों में पेट दर्द, सिरदर्द या उल्टी"),
      b("Nightmares about separation", "अलग होने के बुरे सपने"),
    ],
    causes: [
      b("Anxious temperament, sometimes shared with a parent", "घबराने वाला स्वभाव, कभी-कभी माता-पिता से मिलता-जुलता"),
      b("Stressful changes: new school, moving house, illness or death in the family", "तनाव वाले बदलाव: नया स्कूल, घर बदलना, परिवार में बीमारी या मौत"),
      b("Overprotective patterns that unintentionally keep fear going", "ज़रूरत से ज़्यादा सुरक्षा का तरीका जो अनजाने में डर बनाए रखता है"),
    ],
    riskFactors: [
      b("Anxiety or depression in a parent", "माता-पिता में घबराहट या डिप्रेशन"),
      b("Bullying or a frightening event at school", "स्कूल में धमकाया जाना या कोई डरावनी घटना"),
    ],
    diagnosis: [
      b("Talking with the child and parents, and with the school when possible", "बच्चे, माता-पिता और संभव हो तो स्कूल से बात"),
      b("Checking for bullying, learning difficulties, physical illness and other anxiety", "धमकाने, सीखने की कठिनाई, शारीरिक बीमारी और दूसरी घबराहट की जाँच"),
    ],
    icd: { icd10: "F93.0", icd11: "6B05" },
    treatment: [
      b("CBT for the child with active parent involvement", "माता-पिता की सक्रिय भागीदारी के साथ बच्चे के लिए CBT"),
      b("A gradual, planned return to school with the teacher's support", "शिक्षक की मदद से योजना बनाकर धीरे-धीरे स्कूल लौटना"),
      b("Medicines only rarely, for severe cases", "दवा बहुत कम, सिर्फ़ गंभीर मामलों में"),
    ],
    psychotherapy: [
      b("Teaching the child to name worries and use coping steps", "बच्चे को चिंता पहचानना और संभलने के क़दम सिखाना"),
      b("Gradual practice of short separations with rewards", "इनाम के साथ छोटे-छोटे अलगाव का धीरे-धीरे अभ्यास"),
    ],
    family: [
      b("Keep goodbyes short, warm and predictable; do not sneak away", "विदाई छोटी, प्यार भरी और तय तरीके से करें; चुपके से न जाएँ"),
      b("Avoid keeping the child home on difficult mornings — it strengthens the fear", "मुश्किल सुबह बच्चे को घर पर रखने से बचें — इससे डर बढ़ता है"),
      b("Praise brave behaviour", "हिम्मत वाले व्यवहार की तारीफ़ करें"),
    ],
    seekHelp: [
      b("The child has missed school for days or weeks", "बच्चे का कई दिन या हफ़्ते स्कूल छूटा हो"),
      b("Fear lasts more than a few weeks or keeps getting worse", "डर कुछ हफ़्तों से ज़्यादा रहे या बढ़ता जाए"),
    ],
    faqs: [
      faq("Is my child just being stubborn?", "क्या बच्चा सिर्फ़ ज़िद कर रहा है?", "Usually not. The fear is real for the child; firm, kind support works better than punishment.", "आमतौर पर नहीं। बच्चे के लिए डर असली है; सज़ा से ज़्यादा प्यार भरा पर दृढ़ सहारा काम करता है।"),
      faq("Should I let my child stay home until the fear passes?", "क्या डर जाने तक बच्चे को घर पर रहने दूँ?", "Staying home usually increases fear. A gradual return plan works better.", "घर पर रहने से आमतौर पर डर बढ़ता है। धीरे-धीरे लौटने की योजना बेहतर काम करती है।"),
      faq("Will my child grow out of it?", "क्या बच्चा बड़ा होकर ठीक हो जाएगा?", "Many improve with time and support, but untreated anxiety can continue into other forms. Early help is useful.", "कई बच्चे समय और सहारे से सुधरते हैं, पर बिना इलाज के घबराहट दूसरे रूपों में जारी रह सकती है। जल्दी मदद उपयोगी है।"),
    ],
    related: ["child-psychiatrist-india", "anxiety-phobia-treatment-india", "family-therapy-india"],
    videoKeywords: ["child anxiety", "school refusal", "बच्चे"],
    keywords: ["school nahi jana", "bachcha rota hai", "clingy child"],
  },
  {
    slug: "body-dysmorphic-disorder-india",
    category: "mental",
    group: "ocd",
    name: b("Body dysmorphic disorder", "बॉडी डिस्मॉर्फ़िक डिसऑर्डर (शक्ल-सूरत की चिंता)"),
    title: b("Body Dysmorphic Disorder – Excessive Worry About Appearance", "बॉडी डिस्मॉर्फ़िक डिसऑर्डर – शक्ल-सूरत की ज़रूरत से ज़्यादा चिंता"),
    h1: b("Body dysmorphic disorder (BDD)", "बॉडी डिस्मॉर्फ़िक डिसऑर्डर (BDD)"),
    description: b(
      "Spending hours worrying about a flaw in your appearance that others barely notice? BDD is an OCD-related condition that responds to CBT and medicines.",
      "चेहरे या शरीर की ऐसी कमी की घंटों चिंता जो दूसरों को मुश्किल से दिखे? BDD, OCD से जुड़ी बीमारी है जिसमें CBT और दवाओं से फ़ायदा होता है।"
    ),
    intro: [
      b("In body dysmorphic disorder, a person becomes preoccupied with one or more perceived defects in appearance — skin, nose, hair, body shape — that look minor or invisible to others.", "बॉडी डिस्मॉर्फ़िक डिसऑर्डर में व्यक्ति अपनी शक्ल-सूरत की किसी कमी — त्वचा, नाक, बाल, शरीर का आकार — में उलझ जाता है, जो दूसरों को मामूली या दिखती ही नहीं।"),
      b("Repeated mirror checking, comparing and seeking cosmetic procedures rarely bring lasting relief. Psychological treatment does.", "बार-बार शीशा देखना, तुलना करना और कॉस्मेटिक प्रक्रियाएँ करवाने से शायद ही स्थायी राहत मिलती है। मनोवैज्ञानिक इलाज से मिलती है।"),
    ],
    symptoms: [
      b("Hours spent thinking about a perceived flaw", "किसी कमी के बारे में घंटों सोचना"),
      b("Checking mirrors repeatedly, or avoiding them completely", "बार-बार शीशा देखना, या बिल्कुल न देखना"),
      b("Camouflaging with clothes, make-up or posture", "कपड़ों, मेकअप या मुद्रा से छिपाना"),
      b("Constantly comparing with others or asking for reassurance", "लगातार दूसरों से तुलना या तसल्ली माँगना"),
      b("Repeated skin picking or grooming", "बार-बार त्वचा नोचना या सजना-संवरना"),
      b("Avoiding photos, college, work or social events", "फ़ोटो, कॉलेज, काम या सामाजिक कार्यक्रमों से बचना"),
    ],
    causes: [
      b("Shares brain mechanisms with OCD", "OCD जैसे ही दिमाग़ी तंत्र"),
      b("Teasing about appearance, perfectionism and social media comparison", "शक्ल पर मज़ाक, परफ़ेक्शनिज़्म और सोशल मीडिया से तुलना"),
    ],
    riskFactors: [
      b("OCD or BDD in the family", "परिवार में OCD या BDD"),
      b("Social anxiety and depression", "सामाजिक घबराहट और डिप्रेशन"),
    ],
    diagnosis: [
      b("Assessment of preoccupation, repetitive behaviours and distress", "उलझन, दोहराव वाले व्यवहार और परेशानी की जाँच"),
      b("Gauging how strongly the belief is held and screening for depression and suicide risk", "विश्वास कितना पक्का है, और डिप्रेशन व आत्महत्या के जोखिम की जाँच"),
    ],
    icd: { icd10: "F45.2", icd11: "6B21", note: b("In ICD-10, BDD is included under hypochondriacal disorder; ICD-11 lists it with obsessive-compulsive and related disorders.", "ICD-10 में BDD हाइपोकॉन्ड्रिएकल डिसऑर्डर में है; ICD-11 में OCD से जुड़े विकारों में।") },
    treatment: [
      b("CBT with exposure and response prevention", "एक्सपोज़र और रिस्पॉन्स प्रिवेंशन के साथ CBT"),
      b("Antidepressant medicines, often as used for OCD", "एंटीडिप्रेसेंट दवाएँ, अक्सर OCD के इलाज की तरह"),
      b("Caution about cosmetic surgery — it usually does not relieve BDD", "कॉस्मेटिक सर्जरी में सावधानी — इससे आमतौर पर BDD में राहत नहीं मिलती"),
    ],
    psychotherapy: [
      b("Reducing checking, camouflaging and comparing step by step", "चेक करना, छिपाना और तुलना करना धीरे-धीरे कम करना"),
      b("Perceptual retraining: looking at the whole self rather than one feature", "पर्सेप्चुअल रीट्रेनिंग: एक हिस्से के बजाय पूरे ख़ुद को देखना"),
    ],
    family: [
      b("Avoid repeatedly reassuring about looks; gently redirect", "शक्ल के बारे में बार-बार तसल्ली देने से बचें; नरमी से ध्यान बदलें"),
      b("Take hopelessness seriously", "निराशा को गंभीरता से लें"),
    ],
    seekHelp: [
      b("Appearance worries take more than an hour a day", "शक्ल की चिंता में दिन में एक घंटे से ज़्यादा जाए"),
      b("You are avoiding college, work or people", "आप कॉलेज, काम या लोगों से बच रहे हों"),
      b("Feeling life is not worth living because of appearance — seek help urgently", "शक्ल की वजह से ज़िंदगी बेकार लगे — तुरंत मदद लें"),
    ],
    faqs: [
      faq("Is this just vanity?", "क्या यह सिर्फ़ दिखावे का शौक है?", "No. BDD causes real distress and is a recognised medical condition.", "नहीं। BDD असली परेशानी पैदा करता है और मान्यता प्राप्त बीमारी है।"),
      faq("Will cosmetic treatment help?", "क्या कॉस्मेटिक इलाज मदद करेगा?", "Usually the worry moves to another feature or remains. Psychological treatment is more effective.", "आमतौर पर चिंता दूसरे हिस्से पर चली जाती है या बनी रहती है। मनोवैज्ञानिक इलाज ज़्यादा असरदार है।"),
      faq("Is BDD related to OCD?", "क्या BDD, OCD से जुड़ा है?", "Yes. It is classified with OCD-related disorders and treated with similar methods.", "हाँ। इसे OCD से जुड़े विकारों में रखा गया है और इलाज भी मिलता-जुलता है।"),
    ],
    related: ["ocd-treatment-india", "social-anxiety-treatment-india", "erp-therapy-ocd-india"],
    selfTests: ["ocd"],
    videoKeywords: ["body dysmorphic", "appearance"],
    keywords: ["shakal ki chinta", "nose", "skin", "appearance", "looks"],
  },
  {
    slug: "hoarding-disorder-india",
    category: "mental",
    group: "ocd",
    name: b("Hoarding disorder", "होर्डिंग डिसऑर्डर (चीज़ें जमा करने की बीमारी)"),
    title: b("Hoarding Disorder – Difficulty Discarding Things", "होर्डिंग डिसऑर्डर – चीज़ें फेंक न पाने की परेशानी"),
    h1: b("Hoarding disorder", "होर्डिंग डिसऑर्डर"),
    description: b(
      "Unable to throw things away, with clutter filling the home and causing conflict? Hoarding disorder is a recognised condition that can be treated.",
      "चीज़ें फेंक न पाना, घर सामान से भर जाना और झगड़े होना? होर्डिंग डिसऑर्डर एक मान्यता प्राप्त बीमारी है जिसका इलाज संभव है।"
    ),
    intro: [
      b("Hoarding disorder is persistent difficulty in parting with possessions, regardless of their value, leading to clutter that limits the use of living spaces.", "होर्डिंग डिसऑर्डर में चीज़ों से अलग होने में लगातार कठिनाई होती है, चाहे उनकी क़ीमत कुछ भी हो, जिससे घर इतना भर जाता है कि रहने की जगह का इस्तेमाल मुश्किल हो जाता है।"),
      b("It is different from collecting. It often runs quietly for years and causes family conflict, safety risks and shame.", "यह शौक से चीज़ें इकट्ठा करना नहीं है। यह अक्सर सालों तक चुपचाप चलता है और परिवार में झगड़े, सुरक्षा का ख़तरा और शर्म पैदा करता है।"),
    ],
    symptoms: [
      b("Strong distress at the thought of throwing things away", "चीज़ें फेंकने के ख़याल से तीव्र परेशानी"),
      b("Keeping newspapers, packets, clothes or items \"in case they are needed\"", "अख़बार, पैकेट, कपड़े या सामान \"शायद काम आए\" सोचकर रखना"),
      b("Rooms that cannot be used for their purpose because of clutter", "सामान के कारण कमरों का इस्तेमाल न हो पाना"),
      b("Excessive buying or picking up free items", "ज़रूरत से ज़्यादा ख़रीदारी या मुफ़्त चीज़ें उठाना"),
      b("Conflict with family about the clutter", "सामान को लेकर परिवार से झगड़े"),
    ],
    causes: [
      b("Difficulties with decision-making, organisation and emotional attachment to objects", "फ़ैसले लेने, व्यवस्था बनाने में कठिनाई और चीज़ों से भावनात्मक लगाव"),
      b("Often linked to loss or stressful events", "अक्सर किसी नुकसान या तनाव वाली घटना से जुड़ा"),
    ],
    riskFactors: [
      b("Family history of hoarding", "परिवार में होर्डिंग"),
      b("Depression, anxiety, ADHD or OCD", "डिप्रेशन, घबराहट, ADHD या OCD"),
      b("In older adults, memory problems can also cause accumulation", "बुज़ुर्गों में याददाश्त की समस्या से भी सामान जमा हो सकता है"),
    ],
    diagnosis: [
      b("Understanding beliefs about possessions and the extent of clutter (photos can help)", "चीज़ों से जुड़े विश्वास और सामान की मात्रा को समझना (फ़ोटो मदद कर सकती हैं)"),
      b("Checking safety (fire, falls, hygiene) and associated conditions", "सुरक्षा (आग, गिरना, सफ़ाई) और साथ की बीमारियों की जाँच"),
      b("Memory testing in older adults", "बुज़ुर्गों में याददाश्त की जाँच"),
    ],
    icd: { icd11: "6B24", note: b("Hoarding disorder is a separate diagnosis in ICD-11; ICD-10 has no specific code.", "होर्डिंग डिसऑर्डर ICD-11 में अलग निदान है; ICD-10 में अलग कोड नहीं।") },
    treatment: [
      b("CBT specifically designed for hoarding", "होर्डिंग के लिए ख़ास बनी CBT"),
      b("Treating depression, anxiety or ADHD that may be present", "साथ में डिप्रेशन, घबराहट या ADHD का इलाज"),
      b("Practical help with sorting, at the person's pace", "व्यक्ति की रफ़्तार से छँटाई में व्यावहारिक मदद"),
    ],
    psychotherapy: [
      b("Practising decisions about items, and resisting acquiring new ones", "चीज़ों के बारे में फ़ैसले का अभ्यास, और नई चीज़ें लाने से रुकना"),
      b("Working on the emotional meaning of possessions", "चीज़ों से जुड़े भावनात्मक अर्थ पर काम"),
    ],
    family: [
      b("Avoid forced clean-outs without consent — they cause distress and the clutter usually returns", "बिना सहमति ज़बरदस्ती सफ़ाई से बचें — इससे परेशानी होती है और सामान फिर जमा हो जाता है"),
      b("Focus first on safety: clear exits, gas and electrical areas", "पहले सुरक्षा पर ध्यान दें: रास्ते, गैस और बिजली की जगहें खाली रखें"),
    ],
    seekHelp: [
      b("Clutter blocks rooms, exits or the kitchen", "सामान से कमरे, रास्ते या रसोई भर गए हों"),
      b("There are fire, fall or hygiene risks", "आग, गिरने या गंदगी का ख़तरा हो"),
    ],
    faqs: [
      faq("Is hoarding the same as OCD?", "क्या होर्डिंग और OCD एक ही हैं?", "They are related but different. Hoarding is now classified as a separate disorder in the OCD-related group.", "ये जुड़े हुए हैं पर अलग हैं। होर्डिंग अब OCD से जुड़े समूह में अलग विकार माना जाता है।"),
      faq("Will someone throw my things away?", "क्या कोई मेरी चीज़ें फेंक देगा?", "No. You make the decisions; therapy builds the skills and confidence to do it.", "नहीं। फ़ैसले आप करते हैं; थेरेपी इसके लिए कौशल और आत्मविश्वास देती है।"),
      faq("Can older parents develop hoarding?", "क्या बुज़ुर्ग माता-पिता में होर्डिंग हो सकता है?", "Yes. In older adults, a memory assessment is also important.", "हाँ। बुज़ुर्गों में याददाश्त की जाँच भी ज़रूरी है।"),
    ],
    related: ["ocd-treatment-india", "depression-treatment-india", "dementia-memory-clinic-india"],
    selfTests: ["ocd"],
    videoKeywords: ["hoarding"],
    keywords: ["saman jama karna", "kabad", "clutter"],
  },
  {
    slug: "hair-pulling-skin-picking-india",
    category: "mental",
    group: "ocd",
    name: b("Hair pulling and skin picking", "बाल खींचना और त्वचा नोचना"),
    title: b("Trichotillomania & Skin Picking – Treatment", "ट्राइकोटिलोमेनिया और त्वचा नोचना – इलाज"),
    h1: b("Hair pulling (trichotillomania) and skin picking", "बाल खींचना (ट्राइकोटिलोमेनिया) और त्वचा नोचना"),
    description: b(
      "Repeatedly pulling out hair or picking skin despite trying to stop? These body-focused repetitive behaviours respond to habit reversal therapy.",
      "रोकने की कोशिश के बावजूद बार-बार बाल खींचना या त्वचा नोचना? ऐसे दोहराव वाले व्यवहार में हैबिट रिवर्सल थेरेपी से फ़ायदा होता है।"
    ),
    intro: [
      b("Trichotillomania (hair pulling) and excoriation (skin picking) are body-focused repetitive behaviours. They often happen automatically, during stress or boredom, and cause bald patches, wounds and embarrassment.", "ट्राइकोटिलोमेनिया (बाल खींचना) और एक्सकोरिएशन (त्वचा नोचना) शरीर पर केंद्रित दोहराव वाले व्यवहार हैं। ये अक्सर अपने आप, तनाव या बोरियत में होते हैं, और गंजे धब्बे, घाव और शर्मिंदगी पैदा करते हैं।"),
      b("They are not a bad habit that needs only willpower — specific behavioural therapy works.", "यह सिर्फ़ इच्छाशक्ति से छूटने वाली बुरी आदत नहीं है — ख़ास व्यवहार थेरेपी काम करती है।"),
    ],
    symptoms: [
      b("Repeated pulling of scalp hair, eyebrows or eyelashes", "सिर के बाल, भौंहें या पलकें बार-बार खींचना"),
      b("Repeated picking of skin, acne or nails, causing wounds", "त्वचा, मुहाँसे या नाखून बार-बार नोचना, जिससे घाव"),
      b("Repeated attempts to stop", "रोकने की बार-बार कोशिश"),
      b("Tension before and relief or pleasure after the behaviour", "व्यवहार से पहले तनाव और बाद में राहत या संतोष"),
      b("Hiding the effects with caps, make-up or long sleeves", "टोपी, मेकअप या लंबी बाँहों से असर छिपाना"),
    ],
    causes: [
      b("Brain circuits related to habits and OCD", "आदतों और OCD से जुड़े दिमाग़ी तंत्र"),
      b("Stress, anxiety, boredom and sensory triggers", "तनाव, घबराहट, बोरियत और संवेदी ट्रिगर"),
    ],
    riskFactors: [
      b("Onset in late childhood or adolescence", "बचपन के आख़िर या किशोरावस्था में शुरुआत"),
      b("OCD, anxiety or depression; family history", "OCD, घबराहट या डिप्रेशन; परिवार में इतिहास"),
    ],
    diagnosis: [
      b("History of the behaviour, triggers and attempts to stop", "व्यवहार, ट्रिगर और रोकने की कोशिशों का इतिहास"),
      b("Excluding skin or scalp disease with a dermatologist when needed", "ज़रूरत हो तो त्वचा विशेषज्ञ से त्वचा या सिर की बीमारी को अलग करना"),
      b("Asking about swallowing hair, which can cause stomach problems", "बाल निगलने के बारे में पूछना, जिससे पेट की समस्या हो सकती है"),
    ],
    icd: { icd10: "F63.3", icd11: "6B25.0, 6B25.1", note: b("Trichotillomania / excoriation disorder (body-focused repetitive behaviour disorders).", "ट्राइकोटिलोमेनिया / एक्सकोरिएशन डिसऑर्डर।") },
    treatment: [
      b("Habit reversal training — the first-line treatment", "हैबिट रिवर्सल ट्रेनिंग — पहली पसंद का इलाज"),
      b("Treating associated anxiety or depression; medicines in selected cases", "साथ की घबराहट या डिप्रेशन का इलाज; कुछ मामलों में दवा"),
      b("Skin care for wounds", "घावों के लिए त्वचा की देखभाल"),
    ],
    psychotherapy: [
      b("Awareness training: noticing when and where the behaviour happens", "जागरूकता प्रशिक्षण: व्यवहार कब और कहाँ होता है, यह पहचानना"),
      b("Competing responses (for example, clenching fists) and changing the environment (gloves, fidget toys)", "विरोधी प्रतिक्रिया (जैसे मुट्ठी बंद करना) और माहौल बदलना (दस्ताने, फ़िजेट खिलौने)"),
    ],
    family: [
      b("Do not scold or slap hands away — it increases shame and tension", "डाँटें या हाथ न झटकें — इससे शर्म और तनाव बढ़ता है"),
      b("Agree on gentle cues with the person", "व्यक्ति के साथ नरम इशारे तय करें"),
    ],
    seekHelp: [
      b("Visible hair loss or skin wounds", "साफ़ दिखने वाला बाल झड़ना या त्वचा पर घाव"),
      b("Avoiding people or activities because of it", "इसकी वजह से लोगों या गतिविधियों से बचना"),
    ],
    faqs: [
      faq("Is it a type of OCD?", "क्या यह OCD का प्रकार है?", "It is in the same family of OCD-related disorders, but the treatment focus is habit reversal.", "यह OCD से जुड़े विकारों के परिवार में है, पर इलाज में मुख्य ध्यान हैबिट रिवर्सल पर होता है।"),
      faq("Will the hair grow back?", "क्या बाल वापस उगेंगे?", "In most cases yes, once pulling stops, unless pulling has continued for many years.", "ज़्यादातर मामलों में हाँ, खींचना बंद होने पर, जब तक कि कई सालों से न चल रहा हो।"),
      faq("Can children be treated?", "क्या बच्चों का इलाज हो सकता है?", "Yes. Behavioural therapy is adapted for children with parent involvement.", "हाँ। बच्चों के लिए माता-पिता की भागीदारी के साथ व्यवहार थेरेपी अपनाई जाती है।"),
    ],
    related: ["ocd-treatment-india", "tic-tourette-movement-disorders-india", "generalized-anxiety-disorder-india"],
    selfTests: ["ocd"],
    videoKeywords: ["hair pulling", "trichotillomania", "skin picking"],
    keywords: ["baal kheenchna", "nails biting", "skin picking"],
  },
  {
    slug: "cyclothymia-mood-swings-india",
    category: "mental",
    group: "bipolar",
    name: b("Cyclothymia (frequent mood swings)", "साइक्लोथाइमिया (बार-बार मूड बदलना)"),
    title: b("Cyclothymia – Frequent Ups and Downs in Mood", "साइक्लोथाइमिया – मूड का बार-बार ऊपर-नीचे होना"),
    h1: b("Cyclothymia: frequent mood ups and downs", "साइक्लोथाइमिया: मूड का बार-बार ऊपर-नीचे होना"),
    description: b(
      "Periods of high energy alternating with low mood for years, but milder than bipolar disorder? Learn about cyclothymia and why it needs attention.",
      "सालों से कभी बहुत जोश और कभी उदासी, पर बाइपोलर से हल्का? साइक्लोथाइमिया के बारे में जानें और क्यों इस पर ध्यान ज़रूरी है।"
    ),
    intro: [
      b("Cyclothymia involves many periods of mildly elevated mood and many periods of low mood over at least two years, without meeting the full criteria for mania or major depression.", "साइक्लोथाइमिया में कम से कम दो साल तक कई बार हल्का बढ़ा हुआ मूड और कई बार उदासी के दौर होते हैं, पर मेनिया या बड़े डिप्रेशन के पूरे मानदंड पूरे नहीं होते।"),
      b("It can strain relationships and work, and some people later develop bipolar disorder, so recognising it matters.", "इससे रिश्तों और काम पर असर पड़ सकता है, और कुछ लोगों में आगे चलकर बाइपोलर हो सकता है, इसलिए पहचान ज़रूरी है।"),
    ],
    symptoms: [
      b("Phases of high energy, talkativeness, overconfidence or less need for sleep", "बहुत ऊर्जा, ज़्यादा बोलना, ज़रूरत से ज़्यादा आत्मविश्वास या कम नींद की ज़रूरत के दौर"),
      b("Phases of low mood, low energy and loss of interest", "उदासी, कम ऊर्जा और मन न लगने के दौर"),
      b("Unpredictable irritability", "अचानक चिड़चिड़ापन"),
      b("Frequent changes in plans, spending or relationships", "योजनाओं, ख़र्च या रिश्तों में बार-बार बदलाव"),
    ],
    causes: [
      b("Shares genetic and biological factors with bipolar disorder", "बाइपोलर जैसे ही आनुवंशिक और जैविक कारक"),
      b("Sleep disruption and stress can trigger mood shifts", "नींद में गड़बड़ी और तनाव से मूड बदल सकता है"),
    ],
    riskFactors: [
      b("Bipolar disorder or depression in the family", "परिवार में बाइपोलर या डिप्रेशन"),
      b("Substance use", "नशे का सेवन"),
    ],
    diagnosis: [
      b("Mood chart over weeks to see the pattern", "पैटर्न देखने के लिए हफ़्तों का मूड चार्ट"),
      b("Information from family about high phases", "तेज़ दौर के बारे में परिवार से जानकारी"),
      b("Distinguishing from bipolar disorder, borderline personality patterns and substance effects", "बाइपोलर, बॉर्डरलाइन स्वभाव और नशे के असर से अलग करना"),
    ],
    icd: { icd10: "F34.0", icd11: "6A62" },
    treatment: [
      b("Regular sleep and daily routine — the foundation", "नियमित नींद और दिनचर्या — सबसे ज़रूरी आधार"),
      b("Mood stabilising medicines when mood swings are disruptive", "मूड के बदलाव से परेशानी हो तो मूड स्टेबलाइज़र दवाएँ"),
      b("Caution with antidepressants alone, which can sometimes trigger highs", "सिर्फ़ एंटीडिप्रेसेंट में सावधानी, क्योंकि कभी-कभी इनसे तेज़ दौर आ सकता है"),
    ],
    psychotherapy: [
      b("Psychoeducation and mood monitoring", "बीमारी की जानकारी और मूड पर नज़र"),
      b("CBT and social rhythm therapy", "CBT और सोशल रिदम थेरेपी"),
    ],
    family: [
      b("Notice early signs like reduced sleep or overspending", "कम नींद या ज़्यादा ख़र्च जैसे शुरुआती संकेत पहचानें"),
      b("Support a steady daily routine", "नियमित दिनचर्या में साथ दें"),
    ],
    seekHelp: [
      b("Mood swings affect work, studies or relationships", "मूड बदलने से काम, पढ़ाई या रिश्तों पर असर"),
      b("Highs become severe or you stop sleeping for nights", "तेज़ दौर गंभीर हो जाए या कई रातें नींद न आए"),
    ],
    faqs: [
      faq("Is cyclothymia the same as bipolar disorder?", "क्या साइक्लोथाइमिया और बाइपोलर एक ही हैं?", "It is on the same spectrum but milder. Some people later develop bipolar disorder, so follow-up is important.", "यह उसी स्पेक्ट्रम पर है पर हल्का है। कुछ लोगों में बाद में बाइपोलर हो सकता है, इसलिए फॉलो-अप ज़रूरी है।"),
      faq("Isn't everyone moody sometimes?", "क्या कभी-कभी मूड बदलना सबमें नहीं होता?", "Yes, but in cyclothymia the swings are frequent, last for years and cause problems.", "हाँ, पर साइक्लोथाइमिया में बदलाव बार-बार होते हैं, सालों तक रहते हैं और परेशानी पैदा करते हैं।"),
      faq("Do I need medicines?", "क्या दवा ज़रूरी है?", "Not always. It depends on how much the mood swings affect your life.", "हमेशा नहीं। यह इस पर निर्भर है कि मूड के बदलाव ज़िंदगी पर कितना असर डालते हैं।"),
    ],
    related: ["bipolar-disorder-psychiatrist-india", "dysthymia-persistent-depressive-disorder-india", "borderline-personality-disorder-india"],
    selfTests: ["phq9"],
    videoKeywords: ["mood swings", "bipolar", "मूड"],
    keywords: ["mood swings", "mood badalna", "kabhi khush kabhi udaas"],
  },
];
