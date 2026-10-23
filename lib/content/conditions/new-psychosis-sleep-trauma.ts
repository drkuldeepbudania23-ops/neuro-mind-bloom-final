import type { ConditionContent } from "../types";
import { b, faq } from "./_h";

const PSYCHOSIS_FAMILY = [
  b("Stay calm and avoid arguing about the beliefs; acknowledge the person's fear or distress", "शांत रहें और विश्वासों पर बहस न करें; व्यक्ति के डर या परेशानी को स्वीकारें"),
  b("Help with regular medicines and follow-up visits", "नियमित दवा और फॉलो-अप में मदद करें"),
  b("Keep the home low in conflict and criticism — this reduces relapse", "घर में कलह और आलोचना कम रखें — इससे बीमारी लौटने का ख़तरा घटता है"),
  b("Seek urgent help for aggression, refusing food, or talk of self-harm", "आक्रामकता, खाना छोड़ने या ख़ुद को नुकसान की बात पर तुरंत मदद लें"),
];

/** New library pages: psychosis spectrum, sleep, personality, trauma/stress and functional disorders. */
export const NEW_PSYCHOSIS_SLEEP_TRAUMA: ConditionContent[] = [
  {
    slug: "schizophrenia-treatment-india",
    category: "mental",
    group: "psychosis",
    name: b("Schizophrenia", "सिज़ोफ्रेनिया"),
    title: b("Schizophrenia – Symptoms, Treatment & Family Guide", "सिज़ोफ्रेनिया – लक्षण, इलाज और परिवार के लिए मार्गदर्शन"),
    h1: b("Schizophrenia: symptoms, treatment and recovery", "सिज़ोफ्रेनिया: लक्षण, इलाज और सुधार"),
    description: b(
      "Hearing voices, suspiciousness, withdrawal or disorganised speech? Schizophrenia is treatable; early, regular treatment gives the best recovery.",
      "आवाज़ें सुनना, शक, अलग-थलग रहना या बेतरतीब बातें? सिज़ोफ्रेनिया का इलाज संभव है; जल्दी और नियमित इलाज से सबसे अच्छा सुधार होता है।"
    ),
    intro: [
      b("Schizophrenia is a brain disorder that affects thinking, perception, emotions and behaviour. It usually begins in late teens or the twenties.", "सिज़ोफ्रेनिया दिमाग़ की बीमारी है जो सोच, अनुभव, भावनाओं और व्यवहार पर असर डालती है। यह आमतौर पर किशोरावस्था के आख़िर या बीस-पच्चीस की उम्र में शुरू होती है।"),
      b("It is not caused by black magic, spirits or bad parenting. With medicines, therapy and family support, many people study, work and live independently.", "यह जादू-टोने, भूत-प्रेत या ख़राब परवरिश से नहीं होता। दवाओं, थेरेपी और परिवार के सहारे से कई लोग पढ़ते, काम करते और आत्मनिर्भर रहते हैं।"),
    ],
    symptoms: [
      b("Hearing voices others do not hear (hallucinations)", "ऐसी आवाज़ें सुनना जो दूसरों को नहीं सुनतीं (हैलुसिनेशन)"),
      b("Fixed false beliefs — being followed, poisoned or controlled (delusions)", "पक्के ग़लत विश्वास — पीछा किया जाना, ज़हर दिया जाना या नियंत्रित किया जाना (डिल्यूज़न)"),
      b("Disorganised speech or behaviour", "बेतरतीब बातें या व्यवहार"),
      b("Withdrawal, reduced speech, poor self-care, lack of motivation (negative symptoms)", "अलग-थलग रहना, कम बोलना, अपनी देखभाल न करना, प्रेरणा की कमी (नेगेटिव लक्षण)"),
      b("Decline in studies or work", "पढ़ाई या काम में गिरावट"),
    ],
    causes: [
      b("A combination of genetic vulnerability and changes in brain chemistry (dopamine and other systems)", "आनुवंशिक संवेदनशीलता और दिमाग़ी रसायनों (डोपामिन आदि) में बदलाव का मेल"),
      b("Factors during pregnancy and birth, and stress in adolescence", "गर्भावस्था और जन्म के समय के कारक, और किशोरावस्था का तनाव"),
    ],
    riskFactors: [
      b("Schizophrenia in a close relative", "क़रीबी रिश्तेदार में सिज़ोफ्रेनिया"),
      b("Heavy cannabis use in teenage years", "किशोरावस्था में ज़्यादा गांजा/भांग"),
      b("Migration, social adversity and childhood trauma", "पलायन, सामाजिक कठिनाइयाँ और बचपन का आघात"),
    ],
    diagnosis: [
      b("Symptoms present for about a month or more (ICD-11), based on interview with patient and family", "लगभग एक महीने या ज़्यादा से लक्षण (ICD-11), मरीज़ और परिवार से बातचीत के आधार पर"),
      b("Excluding medical causes: thyroid, infections, epilepsy, drugs; brain scan when indicated", "शारीरिक कारणों को अलग करना: थायरॉइड, संक्रमण, मिर्गी, नशा; ज़रूरत हो तो ब्रेन स्कैन"),
      b("Baseline weight, sugar and lipid tests before starting antipsychotics", "एंटीसाइकोटिक शुरू करने से पहले वज़न, शुगर और लिपिड की जाँच"),
    ],
    icd: { icd10: "F20", icd11: "6A20" },
    treatment: [
      b("Antipsychotic medicines — the foundation of treatment; long-acting monthly injections are an option", "एंटीसाइकोटिक दवाएँ — इलाज की नींव; महीने में एक बार के लंबे असर वाले इंजेक्शन का भी विकल्प"),
      b("Regular follow-up and monitoring for side-effects", "नियमित फॉलो-अप और साइड-इफ़ेक्ट पर नज़र"),
      b("Rehabilitation: daily routine, skills, return to studies or work", "पुनर्वास: दिनचर्या, कौशल, पढ़ाई या काम पर लौटना"),
      b("Hospital care when there is risk to self or others", "ख़ुद को या दूसरों को ख़तरा हो तो अस्पताल में इलाज"),
    ],
    psychotherapy: [
      b("CBT for psychosis to cope with voices and beliefs", "आवाज़ों और विश्वासों से निपटने के लिए CBT"),
      b("Family psychoeducation — proven to reduce relapse", "परिवार को बीमारी की जानकारी — बीमारी लौटने का ख़तरा कम करने में प्रमाणित"),
      b("Social skills and vocational training", "सामाजिक कौशल और रोज़गार प्रशिक्षण"),
    ],
    family: PSYCHOSIS_FAMILY,
    seekHelp: [
      b("New suspiciousness, hearing voices or strange behaviour", "नया शक, आवाज़ें सुनना या अजीब व्यवहार"),
      b("Stopping medicines and early signs of relapse (poor sleep, withdrawal)", "दवा बंद करना और बीमारी लौटने के शुरुआती संकेत (ख़राब नींद, अलग-थलग होना)"),
      b("Any risk of harm — emergency care", "नुकसान का कोई भी ख़तरा — इमरजेंसी इलाज"),
    ],
    faqs: [
      faq("Is schizophrenia the same as split personality?", "क्या सिज़ोफ्रेनिया का मतलब दोहरा व्यक्तित्व है?", "No. Schizophrenia affects perception and thinking; it is not \"multiple personalities\".", "नहीं। सिज़ोफ्रेनिया अनुभव और सोच पर असर डालता है; यह \"कई व्यक्तित्व\" नहीं है।"),
      faq("Will medicines be needed lifelong?", "क्या ज़िंदगी भर दवा लेनी होगी?", "Many people need long-term treatment to prevent relapse. The duration is reviewed regularly with the doctor.", "बीमारी लौटने से बचाने के लिए कई लोगों को लंबे इलाज की ज़रूरत होती है। अवधि की डॉक्टर के साथ नियमित समीक्षा होती है।"),
      faq("Can a person with schizophrenia marry and work?", "क्या सिज़ोफ्रेनिया वाला व्यक्ति शादी और काम कर सकता है?", "Many do, especially when the illness is stable. Decisions should be open and well-informed.", "कई लोग करते हैं, ख़ासकर जब बीमारी स्थिर हो। फ़ैसले खुलकर और पूरी जानकारी के साथ होने चाहिए।"),
    ],
    related: ["psychosis-psychiatrist-india", "schizoaffective-disorder-india", "cannabis-ganja-charas-hash-addiction-india"],
    videoKeywords: ["schizophrenia", "सिज़ोफ्रेनिया", "psychosis"],
    keywords: ["awaz", "shak", "pagalpan", "voices", "schizophrenia"],
  },
  {
    slug: "delusional-disorder-india",
    category: "mental",
    group: "psychosis",
    name: b("Delusional disorder (fixed false beliefs)", "डिल्यूज़नल डिसऑर्डर (पक्का ग़लत शक)"),
    title: b("Delusional Disorder – Suspicion of Spouse, Persecution", "डिल्यूज़नल डिसऑर्डर – जीवनसाथी पर शक, साज़िश का डर"),
    h1: b("Delusional disorder: when a false belief takes over", "डिल्यूज़नल डिसऑर्डर: जब एक ग़लत विश्वास हावी हो जाए"),
    description: b(
      "Fixed, unshakeable suspicion — of a spouse's infidelity, of being harmed or of illness — while otherwise functioning well? This may be delusional disorder.",
      "पक्का, न हटने वाला शक — जीवनसाथी की बेवफ़ाई, नुकसान पहुँचाए जाने या बीमारी का — जबकि बाक़ी सब सामान्य? यह डिल्यूज़नल डिसऑर्डर हो सकता है।"
    ),
    intro: [
      b("In delusional disorder, a person holds one or more firm false beliefs for months, while speech and much of daily life remain fairly normal. Common themes are a spouse's infidelity, being persecuted, or having a disease.", "डिल्यूज़नल डिसऑर्डर में व्यक्ति महीनों तक एक या ज़्यादा पक्के ग़लत विश्वास रखता है, जबकि बातचीत और रोज़ की ज़िंदगी काफ़ी हद तक सामान्य रहती है। आम विषय हैं जीवनसाथी की बेवफ़ाई, साज़िश या कोई बीमारी होना।"),
      b("Because the person does not see the belief as an illness, families usually seek help first. Treatment can reduce distress and conflict.", "क्योंकि व्यक्ति इसे बीमारी नहीं मानता, अक्सर परिवार पहले मदद माँगता है। इलाज से परेशानी और झगड़े कम हो सकते हैं।"),
    ],
    symptoms: [
      b("Unshakeable belief despite clear evidence against it", "साफ़ सबूत के बावजूद न बदलने वाला विश्वास"),
      b("Constant checking of the spouse's phone, movements or contacts (jealous type)", "जीवनसाथी के फ़ोन, आने-जाने या संपर्कों की लगातार जाँच (शक वाला प्रकार)"),
      b("Complaints to police or authorities about being harassed (persecutory type)", "परेशान किए जाने की पुलिस या अधिकारियों से शिकायत (साज़िश वाला प्रकार)"),
      b("Conviction of having an infection or parasite despite normal tests (somatic type)", "जाँच सामान्य होने पर भी किसी संक्रमण या कीड़े होने का पक्का विश्वास (शारीरिक प्रकार)"),
      b("Anger, conflict or violence linked to the belief", "विश्वास से जुड़ा गुस्सा, झगड़ा या हिंसा"),
    ],
    causes: [
      b("Exact causes are not known; genetic and brain factors play a role", "सही कारण ज्ञात नहीं; आनुवंशिक और दिमाग़ी कारक भूमिका निभाते हैं"),
      b("Social isolation, hearing loss and stress may contribute", "अकेलापन, कम सुनना और तनाव योगदान दे सकते हैं"),
    ],
    riskFactors: [
      b("Middle or older age at onset", "मध्यम या ज़्यादा उम्र में शुरुआत"),
      b("Alcohol use (especially in jealous delusions)", "शराब (ख़ासकर शक वाले भ्रम में)"),
      b("Family history of psychosis", "परिवार में मनोविकृति"),
    ],
    diagnosis: [
      b("Interviews with the person and family, handled with tact and respect", "व्यक्ति और परिवार से समझदारी और सम्मान के साथ बातचीत"),
      b("Excluding dementia, substance use and other psychotic disorders", "डिमेंशिया, नशे और दूसरी मनोविकृति को अलग करना"),
      b("Assessing risk of violence to the spouse or others", "जीवनसाथी या दूसरों के प्रति हिंसा के जोखिम का आकलन"),
    ],
    icd: { icd10: "F22", icd11: "6A24" },
    treatment: [
      b("Building trust first, focusing on the distress, sleep and conflict the person feels", "पहले भरोसा बनाना, व्यक्ति की परेशानी, नींद और झगड़ों पर ध्यान"),
      b("Antipsychotic medicines, which help many people", "एंटीसाइकोटिक दवाएँ, जो कई लोगों में मदद करती हैं"),
      b("Safety planning when there is risk to others", "दूसरों को ख़तरा हो तो सुरक्षा की योजना"),
    ],
    psychotherapy: [
      b("CBT to examine the belief gently and reduce its impact", "विश्वास को नरमी से परखने और उसका असर कम करने के लिए CBT"),
      b("Couple or family sessions to reduce conflict", "झगड़े कम करने के लिए दंपति या परिवार सत्र"),
    ],
    family: [
      b("Do not argue repeatedly or try to \"prove\" innocence — it rarely works", "बार-बार बहस या बेगुनाही \"साबित\" करने की कोशिश न करें — इससे शायद ही फ़र्क़ पड़ता है"),
      b("Ensure your own safety; seek help if threats or violence occur", "अपनी सुरक्षा पक्की करें; धमकी या हिंसा हो तो मदद लें"),
      b("Encourage consultation for sleep or stress, which the person may accept more easily", "नींद या तनाव के लिए परामर्श पर ज़ोर दें, जिसे व्यक्ति आसानी से मान सकता है"),
    ],
    seekHelp: [
      b("Suspicion is causing constant conflict at home", "शक से घर में लगातार झगड़े"),
      b("Any threat or violence — urgent help", "कोई भी धमकी या हिंसा — तुरंत मदद"),
    ],
    faqs: [
      faq("My husband/wife suspects me constantly. Is it an illness?", "मेरे पति/पत्नी मुझ पर लगातार शक करते हैं। क्या यह बीमारी है?", "Persistent, unshakeable suspicion without evidence can be a delusional disorder. An assessment can clarify this.", "बिना सबूत के लगातार, न हटने वाला शक डिल्यूज़नल डिसऑर्डर हो सकता है। जाँच से स्पष्ट हो सकता है।"),
      faq("How do I bring them for treatment?", "उन्हें इलाज के लिए कैसे लाएँ?", "Focus on problems they agree with — poor sleep, stress, anger. The consultation can start there.", "उन समस्याओं पर बात करें जो वे मानते हैं — ख़राब नींद, तनाव, गुस्सा। परामर्श वहीं से शुरू हो सकता है।"),
      faq("Do medicines help?", "क्या दवाएँ मदद करती हैं?", "Yes, many people show reduced preoccupation and distress with antipsychotics.", "हाँ, कई लोगों में एंटीसाइकोटिक से उलझन और परेशानी कम होती है।"),
    ],
    related: ["psychosis-psychiatrist-india", "schizophrenia-treatment-india", "relationship-difficulties-counselling-india"],
    videoKeywords: ["suspicion", "शक", "delusion"],
    keywords: ["shak", "patni par shak", "pati par shak", "jealousy", "suspicious"],
  },
  {
    slug: "schizoaffective-disorder-india",
    category: "mental",
    group: "psychosis",
    name: b("Schizoaffective disorder", "स्किज़ोअफ़ेक्टिव डिसऑर्डर"),
    title: b("Schizoaffective Disorder – Psychosis with Mood Episodes", "स्किज़ोअफ़ेक्टिव डिसऑर्डर – मूड के दौर के साथ मनोविकृति"),
    h1: b("Schizoaffective disorder", "स्किज़ोअफ़ेक्टिव डिसऑर्डर"),
    description: b(
      "Psychotic symptoms such as voices or delusions occurring together with depression or mania. Learn how schizoaffective disorder is diagnosed and treated.",
      "आवाज़ें या भ्रम जैसे मनोविकृति के लक्षण, डिप्रेशन या मेनिया के साथ। जानें स्किज़ोअफ़ेक्टिव डिसऑर्डर का निदान और इलाज कैसे होता है।"
    ),
    intro: [
      b("Schizoaffective disorder combines symptoms of schizophrenia (hallucinations, delusions) with a major mood episode (depression or mania) during the same period of illness.", "स्किज़ोअफ़ेक्टिव डिसऑर्डर में बीमारी के एक ही दौर में सिज़ोफ्रेनिया के लक्षण (हैलुसिनेशन, भ्रम) और बड़ा मूड एपिसोड (डिप्रेशन या मेनिया) साथ होते हैं।"),
      b("Treatment addresses both the psychosis and the mood symptoms.", "इलाज मनोविकृति और मूड, दोनों के लक्षणों पर काम करता है।"),
    ],
    symptoms: [
      b("Hearing voices or holding fixed false beliefs", "आवाज़ें सुनना या पक्के ग़लत विश्वास"),
      b("At the same time, severe depression or mania (very high energy, little sleep)", "साथ में गंभीर डिप्रेशन या मेनिया (बहुत ज़्यादा ऊर्जा, कम नींद)"),
      b("Disorganised thinking", "बेतरतीब सोच"),
      b("Decline in self-care, work or studies", "अपनी देखभाल, काम या पढ़ाई में गिरावट"),
    ],
    causes: [
      b("Overlapping genetic and brain factors with schizophrenia and bipolar disorder", "सिज़ोफ्रेनिया और बाइपोलर जैसे ही आनुवंशिक और दिमाग़ी कारक"),
    ],
    riskFactors: [
      b("Family history of schizophrenia or bipolar disorder", "परिवार में सिज़ोफ्रेनिया या बाइपोलर"),
      b("Cannabis and other substance use", "गांजा और दूसरे नशे"),
    ],
    diagnosis: [
      b("Careful timeline of psychotic and mood symptoms, often with family input", "मनोविकृति और मूड के लक्षणों की समय-रेखा, अक्सर परिवार की मदद से"),
      b("Excluding substance-induced and medical causes", "नशे और शारीरिक कारणों को अलग करना"),
    ],
    icd: { icd10: "F25", icd11: "6A21" },
    treatment: [
      b("Antipsychotic medicines, often with a mood stabiliser or antidepressant", "एंटीसाइकोटिक दवाएँ, अक्सर मूड स्टेबलाइज़र या एंटीडिप्रेसेंट के साथ"),
      b("Regular monitoring and relapse prevention", "नियमित निगरानी और बीमारी लौटने से बचाव"),
    ],
    psychotherapy: [
      b("Psychoeducation for patient and family", "मरीज़ और परिवार को बीमारी की जानकारी"),
      b("CBT and rehabilitation", "CBT और पुनर्वास"),
    ],
    family: PSYCHOSIS_FAMILY,
    seekHelp: [
      b("Psychotic symptoms with severe low mood or very high energy", "गंभीर उदासी या बहुत ज़्यादा जोश के साथ मनोविकृति के लक्षण"),
      b("Any talk of suicide — urgent help", "आत्महत्या की कोई भी बात — तुरंत मदद"),
    ],
    faqs: [
      faq("Is it schizophrenia or bipolar disorder?", "यह सिज़ोफ्रेनिया है या बाइपोलर?", "It shares features of both, and diagnosis may become clearer over time with follow-up.", "इसमें दोनों की विशेषताएँ हैं, और फॉलो-अप के साथ समय पर निदान और स्पष्ट हो सकता है।"),
      faq("Is it treatable?", "क्या इसका इलाज है?", "Yes. Many people become stable with the right combination of medicines and support.", "हाँ। सही दवाओं और सहारे से कई लोग स्थिर हो जाते हैं।"),
      faq("Can medicines be stopped once better?", "बेहतर होने पर क्या दवा बंद कर सकते हैं?", "Stopping suddenly often causes relapse. Any change should be planned with the doctor.", "अचानक बंद करने से अक्सर बीमारी लौट आती है। कोई भी बदलाव डॉक्टर के साथ योजना से हो।"),
    ],
    related: ["schizophrenia-treatment-india", "bipolar-disorder-psychiatrist-india", "psychosis-psychiatrist-india"],
    videoKeywords: ["schizoaffective", "psychosis"],
    keywords: ["schizoaffective", "mood psychosis"],
  },
  {
    slug: "acute-psychosis-treatment-india",
    category: "mental",
    group: "psychosis",
    name: b("Acute and brief psychosis", "अचानक शुरू होने वाली मनोविकृति (एक्यूट साइकोसिस)"),
    title: b("Acute Psychosis – Sudden Confusion, Fear or Strange Behaviour", "एक्यूट साइकोसिस – अचानक डर, उलझन या अजीब व्यवहार"),
    h1: b("Acute and transient psychosis", "अचानक और कुछ समय की मनोविकृति"),
    description: b(
      "Sudden onset of fear, strange beliefs, hearing voices or confused behaviour over days? Acute psychosis needs urgent assessment and usually recovers well.",
      "कुछ दिनों में अचानक डर, अजीब विश्वास, आवाज़ें सुनना या उलझा हुआ व्यवहार? एक्यूट साइकोसिस में तुरंत जाँच ज़रूरी है और आमतौर पर अच्छा सुधार होता है।"
    ),
    intro: [
      b("Acute and transient psychotic disorder begins suddenly — often within two weeks — sometimes after severe stress. Symptoms can change rapidly from day to day.", "एक्यूट और ट्रांज़िएंट साइकोटिक डिसऑर्डर अचानक शुरू होता है — अक्सर दो हफ़्ते के अंदर — कभी-कभी गंभीर तनाव के बाद। लक्षण दिन-ब-दिन तेज़ी से बदल सकते हैं।"),
      b("Many people recover fully within weeks to a few months with treatment. Medical causes must be excluded quickly.", "इलाज से कई लोग हफ़्तों से कुछ महीनों में पूरी तरह ठीक हो जाते हैं। शारीरिक कारणों को जल्दी अलग करना ज़रूरी है।"),
    ],
    symptoms: [
      b("Sudden fearfulness, suspicion or strange beliefs", "अचानक डर, शक या अजीब विश्वास"),
      b("Hearing voices or seeing things", "आवाज़ें सुनना या चीज़ें दिखना"),
      b("Confused or agitated behaviour, not sleeping", "उलझा हुआ या बेचैन व्यवहार, नींद न आना"),
      b("Rapidly changing emotions", "तेज़ी से बदलती भावनाएँ"),
    ],
    causes: [
      b("Severe stress — bereavement, exams, marriage, migration", "गंभीर तनाव — किसी अपने की मौत, परीक्षा, शादी, पलायन"),
      b("After childbirth (postpartum psychosis, an emergency)", "डिलीवरी के बाद (पोस्टपार्टम साइकोसिस, इमरजेंसी)"),
      b("Sometimes no clear trigger", "कभी-कभी कोई साफ़ कारण नहीं"),
    ],
    riskFactors: [
      b("Sleep deprivation", "नींद की कमी"),
      b("Cannabis, alcohol withdrawal or other substances", "गांजा, शराब छोड़ने के लक्षण या दूसरे नशे"),
      b("Family history of psychosis or bipolar disorder", "परिवार में मनोविकृति या बाइपोलर"),
    ],
    diagnosis: [
      b("Urgent medical evaluation: infection, fever, head injury, thyroid, blood sugar, drugs", "तुरंत शारीरिक जाँच: संक्रमण, बुख़ार, सिर की चोट, थायरॉइड, शुगर, नशा"),
      b("Distinguishing from delirium (fluctuating confusion due to medical illness)", "डेलिरियम (शारीरिक बीमारी से घटता-बढ़ता भ्रम) से अलग करना"),
      b("Follow-up to see whether symptoms resolve or develop into another disorder", "फॉलो-अप ताकि पता चले कि लक्षण ठीक होते हैं या कोई दूसरी बीमारी बनती है"),
    ],
    icd: { icd10: "F23", icd11: "6A23" },
    treatment: [
      b("Antipsychotic medicines for a period, then gradual tapering under supervision", "कुछ समय एंटीसाइकोटिक दवाएँ, फिर निगरानी में धीरे-धीरे कम करना"),
      b("Safe environment; hospital care when needed", "सुरक्षित माहौल; ज़रूरत हो तो अस्पताल में इलाज"),
      b("Restoring sleep", "नींद वापस लाना"),
    ],
    psychotherapy: [
      b("Supportive therapy and stress management after recovery", "ठीक होने के बाद सपोर्टिव थेरेपी और तनाव प्रबंधन"),
      b("Relapse-warning-sign plan for patient and family", "मरीज़ और परिवार के लिए बीमारी लौटने के संकेतों की योजना"),
    ],
    family: PSYCHOSIS_FAMILY,
    seekHelp: [
      b("Sudden strange behaviour, fear or confusion — same-day assessment", "अचानक अजीब व्यवहार, डर या उलझन — उसी दिन जाँच"),
      b("Fever, head injury or fits with confusion — emergency department", "बुख़ार, सिर की चोट या दौरे के साथ भ्रम — इमरजेंसी विभाग"),
    ],
    faqs: [
      faq("Will it happen again?", "क्या यह दोबारा होगा?", "Some people never have another episode; others may. Follow-up helps catch early signs.", "कुछ लोगों में दोबारा नहीं होता; कुछ में हो सकता है। फॉलो-अप से शुरुआती संकेत पकड़ में आते हैं।"),
      faq("Is it caused by spirits or evil eye?", "क्या यह भूत-प्रेत या नज़र से होता है?", "No. It is a medical condition and responds to treatment. Delaying care can be risky.", "नहीं। यह बीमारी है और इलाज से ठीक होती है। इलाज में देरी ख़तरनाक हो सकती है।"),
      faq("How long are medicines needed?", "दवा कितने समय चाहिए?", "Usually for some months after recovery, then reduced gradually under supervision.", "आमतौर पर ठीक होने के बाद कुछ महीने, फिर निगरानी में धीरे-धीरे कम।"),
    ],
    related: ["psychosis-psychiatrist-india", "schizophrenia-treatment-india", "postpartum-depression-india"],
    videoKeywords: ["psychosis", "मनोविकृति"],
    keywords: ["achanak pagalpan", "bhoot pret", "upri hawa", "sudden strange behaviour"],
  },
  {
    slug: "insomnia-treatment-india",
    category: "mental",
    group: "sleep",
    name: b("Insomnia", "अनिद्रा (नींद न आना)"),
    title: b("Insomnia Treatment – CBT-I & Safe Sleep Help", "अनिद्रा का इलाज – CBT-I और सुरक्षित नींद"),
    h1: b("Insomnia: trouble falling or staying asleep", "अनिद्रा: नींद न आना या बार-बार टूटना"),
    description: b(
      "Trouble falling asleep, waking at night or too early, and feeling tired by day? Learn how insomnia is treated — CBT-I first, without dependence on sleeping pills.",
      "नींद आने में दिक्कत, रात में या बहुत जल्दी नींद खुलना और दिन में थकान? जानें अनिद्रा का इलाज — पहले CBT-I, नींद की गोलियों पर निर्भरता के बिना।"
    ),
    intro: [
      b("Insomnia is difficulty getting or staying asleep despite having the opportunity, with daytime tiredness, irritability or poor concentration.", "अनिद्रा में मौक़ा होने के बावजूद नींद आने या बनी रहने में दिक्कत होती है, साथ में दिन में थकान, चिड़चिड़ापन या ध्यान न लगना।"),
      b("Short-term insomnia is common during stress. When it continues for three months or more, CBT for insomnia (CBT-I) is the most effective long-term treatment.", "तनाव में कुछ समय की अनिद्रा आम है। तीन महीने या ज़्यादा रहे तो अनिद्रा के लिए CBT (CBT-I) सबसे असरदार लंबे समय का इलाज है।"),
    ],
    symptoms: [
      b("Taking a long time to fall asleep", "नींद आने में बहुत समय लगना"),
      b("Waking up often at night or too early", "रात में बार-बार या बहुत जल्दी नींद खुलना"),
      b("Feeling unrefreshed, tired or irritable in the day", "दिन में थकान, ताज़गी की कमी या चिड़चिड़ापन"),
      b("Worry about sleep and dreading bedtime", "नींद की चिंता और सोने के समय से डर"),
      b("Poor concentration and memory", "ध्यान और याददाश्त कमज़ोर"),
    ],
    causes: [
      b("Stress, anxiety and depression", "तनाव, घबराहट और डिप्रेशन"),
      b("Irregular sleep timing, daytime naps, late-night screens", "सोने का अनियमित समय, दिन में झपकी, देर रात स्क्रीन"),
      b("Pain, frequent urination, breathing problems, hot flushes", "दर्द, बार-बार पेशाब, साँस की तकलीफ़, गर्मी के झटके"),
      b("Caffeine, nicotine, alcohol and some medicines", "कैफ़ीन, निकोटिन, शराब और कुछ दवाएँ"),
    ],
    riskFactors: [
      b("Shift work and night duty", "शिफ़्ट और रात की ड्यूटी"),
      b("Older age and menopause", "ज़्यादा उम्र और मेनोपॉज़"),
      b("Long-term use of sleeping pills (rebound insomnia on stopping)", "नींद की गोलियों का लंबा इस्तेमाल (छोड़ने पर नींद और बिगड़ना)"),
    ],
    diagnosis: [
      b("Sleep history and a two-week sleep diary", "नींद का इतिहास और दो हफ़्ते की स्लीप डायरी"),
      b("Screening for depression, anxiety, sleep apnoea, restless legs and substance use", "डिप्रेशन, घबराहट, स्लीप एपनिया, बेचैन पैर और नशे की जाँच"),
      b("Review of all medicines", "सभी दवाओं की समीक्षा"),
    ],
    icd: { icd10: "F51.0, G47.0", icd11: "7A00", note: b("Chronic insomnia (ICD-11 sleep-wake disorders chapter).", "क्रॉनिक अनिद्रा (ICD-11 नींद-जागने के विकार अध्याय)।") },
    treatment: [
      b("CBT-I: fixed wake-up time, bed only for sleep, restricting time in bed, managing night-time worry", "CBT-I: तय समय पर उठना, बिस्तर सिर्फ़ सोने के लिए, बिस्तर पर समय सीमित करना, रात की चिंता संभालना"),
      b("Treating underlying depression, anxiety or pain", "पीछे छिपे डिप्रेशन, घबराहट या दर्द का इलाज"),
      b("Medicines only for short periods or specific situations, avoiding habit-forming sleeping pills where possible", "दवा सिर्फ़ थोड़े समय या ख़ास स्थितियों में, जहाँ तक हो सके लत वाली नींद की गोलियों से बचकर"),
      b("Supervised, gradual tapering for people already dependent on sleeping pills", "जो पहले से नींद की गोलियों पर निर्भर हैं, उनके लिए निगरानी में धीरे-धीरे कमी"),
    ],
    psychotherapy: [
      b("CBT-I delivered over about 4–8 sessions, effective online", "लगभग 4–8 सत्रों में CBT-I, ऑनलाइन भी असरदार"),
      b("Relaxation and worry-postponement techniques", "रिलैक्सेशन और चिंता टालने की तकनीकें"),
    ],
    family: [
      b("Keep evening routines calm; limit TV and phones in the bedroom", "शाम की दिनचर्या शांत रखें; बेडरूम में टीवी और फ़ोन कम करें"),
      b("Do not give your own sleeping pills to others", "अपनी नींद की गोलियाँ दूसरों को न दें"),
    ],
    seekHelp: [
      b("Sleep problems on three or more nights a week for over a month", "महीने भर से हफ़्ते में तीन या ज़्यादा रात नींद की समस्या"),
      b("Daytime sleepiness affecting driving or work", "दिन की नींद से गाड़ी चलाने या काम पर असर"),
      b("Loud snoring with pauses in breathing", "साँस रुकने वाले ज़ोर के खर्राटे"),
    ],
    faqs: [
      faq("Are sleeping pills safe?", "क्या नींद की गोलियाँ सुरक्षित हैं?", "Some are habit-forming and lose effect over time. They should be used only under medical advice and for limited periods.", "कुछ की लत लगती है और समय के साथ असर कम होता है। इन्हें सिर्फ़ डॉक्टर की सलाह से और सीमित समय के लिए लेना चाहिए।"),
      faq("What is CBT-I?", "CBT-I क्या है?", "A structured therapy that resets sleep habits and the worry around sleep. It works as well as medicines in the short term and better in the long term.", "एक व्यवस्थित थेरेपी जो नींद की आदतें और नींद से जुड़ी चिंता ठीक करती है। थोड़े समय में दवा जितनी और लंबे समय में ज़्यादा असरदार।"),
      faq("Should I sleep in the afternoon to catch up?", "क्या कमी पूरी करने के लिए दोपहर में सोऊँ?", "Long daytime naps usually worsen night sleep. Keep a fixed wake-up time instead.", "दिन की लंबी झपकी से अक्सर रात की नींद और बिगड़ती है। इसके बजाय उठने का समय तय रखें।"),
    ],
    related: ["sleep-disorders-psychiatrist-india", "depression-treatment-india", "sedative-sleeping-pill-dependence-india"],
    selfTests: ["sleep"],
    videoKeywords: ["insomnia", "sleep", "नींद"],
    keywords: ["neend nahi aati", "neend", "anidra", "sleeplessness"],
    articles: ["sleeping-pills-safe-use"],
  },
  {
    slug: "borderline-personality-disorder-india",
    category: "mental",
    group: "personality",
    name: b("Borderline personality disorder (emotionally unstable)", "बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर (भावनात्मक अस्थिरता)"),
    title: b("Borderline Personality Disorder – DBT & Treatment", "बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर – DBT और इलाज"),
    h1: b("Borderline personality disorder", "बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर"),
    description: b(
      "Intense emotions, fear of abandonment, unstable relationships and impulsive or self-harming behaviour? Borderline personality disorder improves with therapy.",
      "तीव्र भावनाएँ, छोड़ दिए जाने का डर, अस्थिर रिश्ते और आवेग या ख़ुद को नुकसान वाला व्यवहार? बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर थेरेपी से सुधरता है।"
    ),
    intro: [
      b("Borderline personality disorder (BPD) involves intense, rapidly changing emotions, difficulty in relationships, an unstable sense of self and impulsive actions.", "बॉर्डरलाइन पर्सनैलिटी डिसऑर्डर (BPD) में तीव्र, तेज़ी से बदलती भावनाएँ, रिश्तों में कठिनाई, ख़ुद की अस्थिर पहचान और आवेग वाले काम होते हैं।"),
      b("Contrary to old beliefs, BPD has a good outlook — many people improve substantially over a few years, especially with structured therapy.", "पुरानी धारणाओं के उलट, BPD में सुधार की अच्छी संभावना है — कई लोग कुछ सालों में काफ़ी बेहतर होते हैं, ख़ासकर व्यवस्थित थेरेपी से।"),
    ],
    symptoms: [
      b("Strong fear of being abandoned", "छोड़ दिए जाने का तीव्र डर"),
      b("Intense, unstable relationships that swing between idealising and devaluing", "तीव्र, अस्थिर रिश्ते जो बहुत अच्छे से बहुत बुरे के बीच झूलते हैं"),
      b("Rapid mood changes, intense anger, chronic emptiness", "तेज़ मूड बदलना, तीव्र गुस्सा, लगातार खालीपन"),
      b("Impulsive spending, substance use or risky behaviour", "आवेग में ख़र्च, नशा या जोखिम भरा व्यवहार"),
      b("Self-harm or suicidal behaviour during distress", "परेशानी में ख़ुद को नुकसान या आत्महत्या जैसा व्यवहार"),
    ],
    causes: [
      b("Emotional sensitivity from birth combined with an invalidating or traumatic environment", "जन्म से भावनात्मक संवेदनशीलता और अस्वीकार करने वाला या आघात भरा माहौल"),
      b("Childhood trauma, neglect or loss in many (not all) cases", "कई (सभी नहीं) मामलों में बचपन का आघात, उपेक्षा या नुकसान"),
    ],
    riskFactors: [
      b("Family history of mood or personality disorders", "परिवार में मूड या पर्सनैलिटी डिसऑर्डर"),
      b("Substance use", "नशे का सेवन"),
    ],
    diagnosis: [
      b("Patterns lasting since adolescence or early adulthood, assessed over more than one session", "किशोरावस्था या शुरुआती जवानी से चले आ रहे पैटर्न, एक से ज़्यादा सत्रों में आकलन"),
      b("Screening for depression, bipolar disorder, PTSD, ADHD and substance use", "डिप्रेशन, बाइपोलर, PTSD, ADHD और नशे की जाँच"),
      b("Regular suicide risk assessment", "आत्महत्या के जोखिम का नियमित आकलन"),
    ],
    icd: { icd10: "F60.3", icd11: "6D10 with 6D11.5", note: b("ICD-11: personality disorder (rated by severity) with borderline pattern specifier.", "ICD-11: पर्सनैलिटी डिसऑर्डर (गंभीरता के अनुसार) बॉर्डरलाइन पैटर्न के साथ।") },
    treatment: [
      b("Structured psychotherapy is the main treatment", "व्यवस्थित साइकोथेरेपी मुख्य इलाज है"),
      b("Medicines for specific symptoms (depression, severe anxiety, sleep), not for BPD itself", "ख़ास लक्षणों (डिप्रेशन, तीव्र घबराहट, नींद) के लिए दवा, BPD के लिए ख़ुद नहीं"),
      b("A crisis plan for periods of high distress", "बहुत ज़्यादा परेशानी के समय के लिए संकट योजना"),
    ],
    psychotherapy: [
      b("Dialectical behaviour therapy (DBT) skills: emotion regulation, distress tolerance, mindfulness, interpersonal effectiveness", "डायलेक्टिकल बिहेवियर थेरेपी (DBT) स्किल्स: भावनाएँ संभालना, परेशानी सहना, माइंडफ़ुलनेस, रिश्तों में असर"),
      b("Mentalisation-based or schema-focused therapy", "मेंटलाइज़ेशन-आधारित या स्कीमा-केंद्रित थेरेपी"),
    ],
    family: [
      b("Validate feelings while holding calm, consistent limits", "शांत, एक जैसी सीमाओं के साथ भावनाओं को स्वीकारें"),
      b("Learn the DBT skills alongside, if possible", "हो सके तो साथ में DBT स्किल्स सीखें"),
      b("Take self-harm seriously every time; seek help", "ख़ुद को नुकसान को हर बार गंभीरता से लें; मदद लें"),
    ],
    seekHelp: [
      b("Self-harm or suicidal thoughts — seek help the same day", "ख़ुद को नुकसान या आत्महत्या के विचार — उसी दिन मदद लें"),
      b("Relationships, studies or work repeatedly break down", "रिश्ते, पढ़ाई या काम बार-बार टूटें"),
    ],
    faqs: [
      faq("Is BPD untreatable?", "क्या BPD का इलाज नहीं हो सकता?", "No. With therapy, many people no longer meet criteria for BPD after a few years.", "नहीं। थेरेपी से कुछ सालों में कई लोगों में BPD के मानदंड पूरे नहीं रहते।"),
      faq("Is it bipolar disorder?", "क्या यह बाइपोलर है?", "No. Mood changes in BPD are usually rapid and linked to relationships; bipolar episodes last days to weeks.", "नहीं। BPD में मूड आमतौर पर तेज़ी से और रिश्तों से जुड़कर बदलता है; बाइपोलर के दौर दिनों से हफ़्तों तक चलते हैं।"),
      faq("Can therapy be online?", "क्या थेरेपी ऑनलाइन हो सकती है?", "Yes, skills-based therapy can be done online with a clear crisis plan.", "हाँ, साफ़ संकट योजना के साथ स्किल्स-आधारित थेरेपी ऑनलाइन हो सकती है।"),
    ],
    related: ["personality-disorders-psychiatrist-india", "dbt-skills-india", "suicide-prevention-crisis-support-india"],
    videoKeywords: ["borderline", "personality", "emotions"],
    keywords: ["emotional instability", "gussa", "self harm", "mood swings"],
  },
  {
    slug: "adjustment-disorder-india",
    category: "mental",
    group: "trauma",
    name: b("Adjustment disorder (stress after life changes)", "एडजस्टमेंट डिसऑर्डर (बदलाव के बाद का तनाव)"),
    title: b("Adjustment Disorder – Struggling After a Life Change", "एडजस्टमेंट डिसऑर्डर – ज़िंदगी में बदलाव के बाद परेशानी"),
    h1: b("Adjustment disorder", "एडजस्टमेंट डिसऑर्डर"),
    description: b(
      "Struggling to cope after a job loss, breakup, move, illness or failure? Adjustment disorder is common, usually short-lived and responds well to counselling.",
      "नौकरी जाने, रिश्ता टूटने, घर बदलने, बीमारी या असफलता के बाद संभल नहीं पा रहे? एडजस्टमेंट डिसऑर्डर आम है, आमतौर पर कम समय का होता है और काउंसलिंग से अच्छा सुधार होता है।"
    ),
    intro: [
      b("Adjustment disorder is a stronger-than-expected emotional reaction to a stressful life change, usually starting within a month of the event.", "एडजस्टमेंट डिसऑर्डर तनाव भरे बदलाव पर उम्मीद से ज़्यादा भावनात्मक प्रतिक्रिया है, जो आमतौर पर घटना के एक महीने के अंदर शुरू होती है।"),
      b("Symptoms generally settle within six months as the person adapts — counselling speeds this up.", "व्यक्ति के ढलने के साथ लक्षण आमतौर पर छह महीने में ठीक हो जाते हैं — काउंसलिंग इसे तेज़ करती है।"),
    ],
    symptoms: [
      b("Constant preoccupation with the stressful event", "तनाव वाली घटना के बारे में लगातार सोचना"),
      b("Sadness, worry, irritability or crying spells", "उदासी, चिंता, चिड़चिड़ापन या रोना"),
      b("Poor sleep and concentration", "ख़राब नींद और ध्यान"),
      b("Difficulty managing work, studies or home", "काम, पढ़ाई या घर संभालने में मुश्किल"),
    ],
    causes: [
      b("Job loss, financial setback, breakup, divorce, moving, retirement, illness, exam failure", "नौकरी जाना, आर्थिक नुकसान, रिश्ता टूटना, तलाक़, घर बदलना, रिटायरमेंट, बीमारी, परीक्षा में असफलता"),
    ],
    riskFactors: [
      b("Several stresses at once", "एक साथ कई तनाव"),
      b("Limited support", "कम सहारा"),
      b("Past mental health problems", "पहले मानसिक स्वास्थ्य की समस्याएँ"),
    ],
    diagnosis: [
      b("Linking symptoms to an identifiable stressor", "लक्षणों को किसी पहचाने जा सकने वाले तनाव से जोड़ना"),
      b("Checking that criteria for depression, PTSD or anxiety disorder are not met", "देखना कि डिप्रेशन, PTSD या घबराहट की बीमारी के मानदंड पूरे न हों"),
      b("Assessing suicide risk, especially after major losses", "आत्महत्या के जोखिम का आकलन, ख़ासकर बड़े नुकसान के बाद"),
    ],
    icd: { icd10: "F43.2", icd11: "6B43" },
    treatment: [
      b("Brief counselling and problem-solving", "कम समय की काउंसलिंग और समस्या सुलझाना"),
      b("Short-term help for sleep or anxiety if needed", "ज़रूरत हो तो नींद या घबराहट के लिए कम समय की मदद"),
      b("Practical support: finances, career, legal or family advice", "व्यावहारिक मदद: पैसा, करियर, क़ानूनी या पारिवारिक सलाह"),
    ],
    psychotherapy: [
      b("Problem-solving therapy and CBT", "प्रॉब्लम-सॉल्विंग थेरेपी और CBT"),
      b("Supportive therapy to process the change", "बदलाव को स्वीकारने के लिए सपोर्टिव थेरेपी"),
    ],
    family: [
      b("Offer practical help and time, not just advice", "सिर्फ़ सलाह नहीं, व्यावहारिक मदद और समय दें"),
      b("Avoid blaming the person for the event", "घटना के लिए व्यक्ति को दोष न दें"),
    ],
    seekHelp: [
      b("Distress is not easing after several weeks", "कई हफ़्तों बाद भी परेशानी कम न हो"),
      b("Drinking more or thoughts of self-harm", "ज़्यादा पीना या ख़ुद को नुकसान के विचार"),
    ],
    faqs: [
      faq("Is it a real illness or just stress?", "क्या यह असली बीमारी है या सिर्फ़ तनाव?", "It is a recognised condition where stress reactions are stronger than expected and affect functioning.", "यह मान्यता प्राप्त स्थिति है जिसमें तनाव की प्रतिक्रिया उम्मीद से ज़्यादा होती है और कामकाज पर असर डालती है।"),
      faq("Will I need long-term medicines?", "क्या लंबे समय दवा लेनी होगी?", "Usually not. Counselling is the main treatment.", "आमतौर पर नहीं। काउंसलिंग मुख्य इलाज है।"),
      faq("How long does it last?", "यह कितने समय रहता है?", "Usually less than six months after the stress has settled.", "आमतौर पर तनाव कम होने के बाद छह महीने से कम।"),
    ],
    related: ["depression-treatment-india", "acute-stress-reaction-india", "stress-management-india"],
    selfTests: ["phq9", "gad7"],
    videoKeywords: ["stress", "तनाव", "coping"],
    keywords: ["tanav", "naukri gayi", "breakup", "divorce", "failure"],
  },
  {
    slug: "acute-stress-reaction-india",
    category: "mental",
    group: "trauma",
    name: b("Acute stress reaction", "एक्यूट स्ट्रेस रिएक्शन (सदमे के तुरंत बाद की प्रतिक्रिया)"),
    title: b("Acute Stress Reaction – After an Accident, Assault or Disaster", "एक्यूट स्ट्रेस रिएक्शन – दुर्घटना, हमले या आपदा के बाद"),
    h1: b("Acute stress reaction: the first days after a shock", "एक्यूट स्ट्रेस रिएक्शन: सदमे के बाद के पहले दिन"),
    description: b(
      "Feeling dazed, shaky, unable to sleep or reliving events in the days after an accident or attack? Learn what is normal and when to seek help.",
      "दुर्घटना या हमले के बाद के दिनों में सुन्नपन, काँपना, नींद न आना या घटना बार-बार याद आना? जानें क्या सामान्य है और कब मदद लें।"
    ),
    intro: [
      b("After a frightening event, most people have strong reactions for hours to days: shock, fear, tearfulness, poor sleep. This is a normal response to an abnormal event.", "डरावनी घटना के बाद ज़्यादातर लोगों में घंटों से दिनों तक तीव्र प्रतिक्रिया होती है: सदमा, डर, रोना, ख़राब नींद। यह असामान्य घटना पर सामान्य प्रतिक्रिया है।"),
      b("Support, safety and rest help most people recover naturally. If symptoms persist beyond a few weeks, PTSD should be considered.", "सहारा, सुरक्षा और आराम से ज़्यादातर लोग अपने आप ठीक हो जाते हैं। कुछ हफ़्तों से ज़्यादा लक्षण रहें तो PTSD पर विचार करना चाहिए।"),
    ],
    symptoms: [
      b("Feeling dazed, numb or detached", "सुन्नपन, अलग-थलग या कुछ समझ न आने का एहसास"),
      b("Intrusive memories, nightmares", "बार-बार यादें आना, बुरे सपने"),
      b("Shaking, palpitations, startling easily", "काँपना, धड़कन, आसानी से चौंकना"),
      b("Trouble sleeping and concentrating", "सोने और ध्यान लगाने में दिक्कत"),
    ],
    causes: [
      b("Road accidents, assault, violence, disasters, sudden death of a loved one, medical emergencies", "सड़क दुर्घटना, हमला, हिंसा, आपदा, किसी अपने की अचानक मौत, मेडिकल इमरजेंसी"),
    ],
    riskFactors: [
      b("Physical injury, threat to life, previous trauma", "शारीरिक चोट, जान का ख़तरा, पहले का आघात"),
      b("Lack of support afterwards", "बाद में सहारे की कमी"),
    ],
    diagnosis: [
      b("Clinical assessment of symptoms in relation to the event and their course over days to weeks", "घटना से जुड़े लक्षणों और दिनों-हफ़्तों में उनके बदलाव का आकलन"),
      b("Medical check of injuries, head injury or substance use", "चोट, सिर की चोट या नशे की शारीरिक जाँच"),
    ],
    icd: { icd10: "F43.0", icd11: "QE84", note: b("ICD-11 treats acute stress reaction as a normal response (in the chapter on factors influencing health), not a mental disorder.", "ICD-11 इसे सामान्य प्रतिक्रिया मानता है (स्वास्थ्य को प्रभावित करने वाले कारकों के अध्याय में), मानसिक विकार नहीं।") },
    treatment: [
      b("Psychological first aid: safety, calm, connection with loved ones and practical help", "मनोवैज्ञानिक प्राथमिक उपचार: सुरक्षा, शांति, अपनों से जुड़ाव और व्यावहारिक मदद"),
      b("Short-term help with sleep if severe", "गंभीर हो तो नींद के लिए थोड़े समय की मदद"),
      b("Monitoring for PTSD, depression or substance use", "PTSD, डिप्रेशन या नशे पर नज़र"),
    ],
    psychotherapy: [
      b("Brief trauma-focused CBT if symptoms persist beyond a few weeks", "लक्षण कुछ हफ़्तों से ज़्यादा रहें तो छोटी ट्रॉमा-केंद्रित CBT"),
      b("Forced, detailed \"debriefing\" soon after the event is not recommended", "घटना के तुरंत बाद ज़बरदस्ती विस्तार से \"डीब्रीफ़िंग\" की सलाह नहीं दी जाती"),
    ],
    family: [
      b("Be present; let the person talk if and when they want", "साथ रहें; व्यक्ति चाहे तो और जब चाहे, बात करने दें"),
      b("Help with practical tasks and routine", "व्यावहारिक कामों और दिनचर्या में मदद करें"),
    ],
    seekHelp: [
      b("Symptoms continue beyond about a month", "लक्षण लगभग एक महीने से ज़्यादा रहें"),
      b("Unable to function, using alcohol to cope, or thoughts of self-harm", "काम न कर पाना, संभलने के लिए शराब, या ख़ुद को नुकसान के विचार"),
    ],
    faqs: [
      faq("Is it normal to feel this way after an accident?", "क्या दुर्घटना के बाद ऐसा महसूस होना सामान्य है?", "Yes. Strong reactions in the first days are common and usually settle.", "हाँ। पहले कुछ दिनों में तीव्र प्रतिक्रिया आम है और आमतौर पर ठीक हो जाती है।"),
      faq("Should I talk about every detail immediately?", "क्या तुरंत हर बात विस्तार से बतानी चाहिए?", "Only if you want to. Rest, safety and support come first.", "सिर्फ़ अगर आप चाहें। पहले आराम, सुरक्षा और सहारा।"),
      faq("When does it become PTSD?", "यह PTSD कब बनता है?", "If symptoms like flashbacks, avoidance and hyperarousal continue for several weeks and affect life.", "जब फ़्लैशबैक, बचना और हमेशा सतर्क रहने जैसे लक्षण कई हफ़्ते रहें और ज़िंदगी पर असर डालें।"),
    ],
    related: ["ptsd-trauma-treatment-india", "adjustment-disorder-india", "prolonged-grief-disorder-india"],
    videoKeywords: ["trauma", "accident", "सदमा"],
    keywords: ["sadma", "shock", "accident", "hadsa"],
  },
  {
    slug: "functional-neurological-disorder-india",
    category: "mental",
    group: "somatic",
    name: b("Functional neurological disorder (conversion / non-epileptic attacks)", "फ़ंक्शनल न्यूरोलॉजिकल डिसऑर्डर (बिना मिर्गी के दौरे / कमज़ोरी)"),
    title: b("Functional Neurological Disorder – Non-epileptic Fits, Weakness", "फ़ंक्शनल न्यूरोलॉजिकल डिसऑर्डर – बिना मिर्गी के दौरे, कमज़ोरी"),
    h1: b("Functional neurological disorder (FND)", "फ़ंक्शनल न्यूरोलॉजिकल डिसऑर्डर (FND)"),
    description: b(
      "Fits, fainting, weakness or loss of voice without epilepsy or nerve damage on tests? FND is real, common and treatable with the right explanation and therapy.",
      "दौरे, बेहोशी, कमज़ोरी या आवाज़ जाना पर जाँच में मिर्गी या नस की ख़राबी नहीं? FND असली और आम है, सही समझ और थेरेपी से इलाज संभव है।"
    ),
    intro: [
      b("In functional neurological disorder, the nervous system is structurally healthy but is not working properly — like a software problem rather than a hardware fault.", "फ़ंक्शनल न्यूरोलॉजिकल डिसऑर्डर में नर्वस सिस्टम की बनावट ठीक होती है पर वह सही से काम नहीं करता — जैसे हार्डवेयर नहीं, सॉफ़्टवेयर की समस्या।"),
      b("Symptoms are genuine and not \"put on\". In India these attacks are often misunderstood as possession or attention-seeking; correct diagnosis prevents years of unnecessary tests and treatments.", "लक्षण असली होते हैं, \"नाटक\" नहीं। भारत में इन दौरों को अक्सर ऊपरी हवा या ध्यान खींचना समझा जाता है; सही निदान से सालों की बेवजह जाँचों और इलाज से बचाव होता है।"),
    ],
    symptoms: [
      b("Attacks resembling fits, often with eyes closed and longer duration (non-epileptic attacks)", "मिर्गी जैसे दौरे, अक्सर आँखें बंद और ज़्यादा देर तक (बिना मिर्गी के दौरे)"),
      b("Weakness or paralysis of a limb", "हाथ-पैर में कमज़ोरी या लकवा जैसा"),
      b("Tremor, jerks or walking difficulty", "काँपना, झटके या चलने में दिक्कत"),
      b("Loss of voice, vision or sensation", "आवाज़, नज़र या संवेदना जाना"),
    ],
    causes: [
      b("Changes in how the brain controls movement and attention, often triggered by stress, injury or illness", "दिमाग़ के हरकत और ध्यान नियंत्रित करने के तरीके में बदलाव, अक्सर तनाव, चोट या बीमारी से शुरू"),
      b("Past trauma or ongoing conflict in some (not all) people", "कुछ (सभी नहीं) लोगों में पुराना आघात या लगातार कलह"),
    ],
    riskFactors: [
      b("Anxiety, depression or PTSD", "घबराहट, डिप्रेशन या PTSD"),
      b("A recent physical injury or illness", "हाल की शारीरिक चोट या बीमारी"),
      b("Epilepsy can coexist in some patients", "कुछ मरीज़ों में साथ में मिर्गी भी हो सकती है"),
    ],
    diagnosis: [
      b("Positive clinical signs on neurological examination (for example Hoover's sign), not just normal tests", "न्यूरोलॉजिकल जाँच में साफ़ संकेत (जैसे हूवर साइन), सिर्फ़ सामान्य टेस्ट नहीं"),
      b("Video-EEG of a typical attack when possible", "संभव हो तो किसी आम दौरे का वीडियो-EEG"),
      b("Joint care with a neurologist", "न्यूरोलॉजिस्ट के साथ मिलकर इलाज"),
    ],
    icd: { icd10: "F44.4–F44.7", icd11: "6B60", note: b("Dissociative (conversion) disorders of movement and sensation / dissociative neurological symptom disorder.", "हरकत और संवेदना के डिसोसिएटिव (कन्वर्ज़न) विकार / डिसोसिएटिव न्यूरोलॉजिकल सिम्पटम डिसऑर्डर।") },
    treatment: [
      b("A clear explanation of the diagnosis — itself an important part of treatment", "निदान की साफ़ जानकारी — यह भी इलाज का अहम हिस्सा है"),
      b("Specialised physiotherapy for movement symptoms", "हरकत वाले लक्षणों के लिए ख़ास फ़िज़ियोथेरेपी"),
      b("Treating anxiety and depression; reducing unnecessary anti-seizure medicines under supervision when epilepsy is excluded", "घबराहट और डिप्रेशन का इलाज; मिर्गी अलग होने पर निगरानी में बेवजह की मिर्गी की दवाएँ कम करना"),
    ],
    psychotherapy: [
      b("CBT for FND: recognising warning signs and using distraction or grounding to abort attacks", "FND के लिए CBT: चेतावनी संकेत पहचानना और ध्यान बदलकर या ग्राउंडिंग से दौरा रोकना"),
      b("Addressing stress, trauma and family responses", "तनाव, आघात और परिवार की प्रतिक्रियाओं पर काम"),
    ],
    family: [
      b("Respond to attacks calmly; keep the person safe without crowding or fuss", "दौरों पर शांति से प्रतिक्रिया दें; बिना भीड़ या हल्ले के व्यक्ति को सुरक्षित रखें"),
      b("Avoid both blame (\"faking\") and excessive attention", "न दोष दें (\"नाटक\"), न ज़रूरत से ज़्यादा ध्यान"),
      b("Avoid faith-healing rituals that can be harmful", "नुकसानदायक झाड़-फूँक से बचें"),
    ],
    seekHelp: [
      b("First-ever fit or sudden weakness — emergency medical care first", "पहली बार दौरा या अचानक कमज़ोरी — पहले इमरजेंसी इलाज"),
      b("Repeated attacks despite normal tests", "सामान्य जाँच के बावजूद बार-बार दौरे"),
    ],
    faqs: [
      faq("Does a normal EEG or MRI mean nothing is wrong?", "क्या सामान्य EEG या MRI का मतलब है कुछ ग़लत नहीं?", "It means there is no structural damage. FND is diagnosed by specific positive signs, and the symptoms are real.", "इसका मतलब है कोई बनावटी ख़राबी नहीं। FND ख़ास संकेतों से पहचाना जाता है, और लक्षण असली हैं।"),
      faq("Is the person pretending?", "क्या व्यक्ति नाटक कर रहा है?", "No. Symptoms are not under voluntary control.", "नहीं। लक्षण अपनी मर्ज़ी से नहीं होते।"),
      faq("Can FND get better?", "क्या FND ठीक हो सकता है?", "Yes. Many people improve with explanation, physiotherapy and therapy, especially when treated early.", "हाँ। सही जानकारी, फ़िज़ियोथेरेपी और थेरेपी से कई लोग सुधरते हैं, ख़ासकर जल्दी इलाज से।"),
    ],
    related: ["dissociative-disorders-treatment-india", "seizure-disorders-psychiatry-india", "somatic-symptom-pain-disorders-india"],
    selfTests: ["phq15"],
    videoKeywords: ["dissociative", "conversion", "दौरे"],
    keywords: ["daura", "behoshi", "jhatke", "hysteria", "non epileptic"],
  },
];
