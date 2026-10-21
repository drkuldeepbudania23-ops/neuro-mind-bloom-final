import type { ConditionContent } from "../types";
import { b } from "./_h";

/**
 * Advanced-library sections for the ORIGINAL adult mental-health pages
 * (risk factors, diagnosis, psychotherapy, family guidance, ICD codes, links).
 * Merged into the pages in ./index.ts — the original text is unchanged.
 */
export const ENRICH_MENTAL: Record<string, Partial<ConditionContent>> = {
  "depression-treatment-india": {
    group: "mood",
    icd: { icd10: "F32, F33", icd11: "6A70, 6A71", note: b("Single depressive episode / recurrent depressive disorder.", "एकल डिप्रेसिव एपिसोड / बार-बार होने वाला डिप्रेसिव डिसऑर्डर।") },
    riskFactors: [
      b("A previous episode of depression, or depression in a parent or sibling", "पहले कभी डिप्रेशन होना, या माता-पिता/भाई-बहन में डिप्रेशन"),
      b("Long-term illness, chronic pain, thyroid problems or after a stroke or heart attack", "लंबी बीमारी, पुराना दर्द, थायरॉइड, या लकवा/हार्ट अटैक के बाद"),
      b("Alcohol or drug use", "शराब या नशे का सेवन"),
      b("Loneliness, conflict at home, money problems, unemployment", "अकेलापन, घर में कलह, पैसों की तंगी, बेरोज़गारी"),
      b("Pregnancy and the months after childbirth", "गर्भावस्था और डिलीवरी के बाद के महीने"),
    ],
    diagnosis: [
      b("A detailed interview about mood, sleep, appetite, energy, interest and thoughts over the past weeks", "पिछले हफ़्तों के मूड, नींद, भूख, ऊर्जा, रुचि और विचारों पर विस्तार से बातचीत"),
      b("Asking about past high-energy phases, so that bipolar disorder is not missed", "पहले कभी बहुत ज़्यादा जोश वाले दौर के बारे में पूछना, ताकि बाइपोलर छूट न जाए"),
      b("Screening questionnaires such as the PHQ-9 to measure severity and track progress", "गंभीरता मापने और सुधार देखने के लिए PHQ-9 जैसी प्रश्नावली"),
      b("Blood tests (thyroid, haemoglobin, vitamin B12, sugar) when the history suggests a physical cause", "ज़रूरत हो तो ख़ून की जाँच (थायरॉइड, हीमोग्लोबिन, विटामिन B12, शुगर)"),
    ],
    psychotherapy: [
      b("Cognitive behaviour therapy (CBT): noticing and changing hopeless thinking patterns", "कॉग्निटिव बिहेवियर थेरेपी (CBT): निराशा वाली सोच को पहचानना और बदलना"),
      b("Behavioural activation: planning small, rewarding activities to restart the day", "बिहेवियरल एक्टिवेशन: दिन फिर से शुरू करने के लिए छोटे, अच्छे लगने वाले काम तय करना"),
      b("Interpersonal and problem-solving therapy for grief, conflict or life changes", "शोक, कलह या बदलावों के लिए इंटरपर्सनल और प्रॉब्लम-सॉल्विंग थेरेपी"),
    ],
    family: [
      b("Depression is an illness, not laziness. Avoid saying \"just think positive\" or \"pull yourself together\".", "डिप्रेशन बीमारी है, आलस नहीं। \"बस पॉज़िटिव सोचो\" या \"ख़ुद को संभालो\" जैसी बातें न कहें।"),
      b("Help with small routines — a walk together, regular meals, reminders for medicines.", "छोटी दिनचर्या में मदद करें — साथ में सैर, समय पर खाना, दवा की याद।"),
      b("Take any talk of death seriously. Ask directly and gently; asking does not put the idea in their mind.", "मौत की कोई भी बात गंभीरता से लें। सीधे और नरमी से पूछें; पूछने से यह विचार नहीं आता।"),
      b("Look after yourself too — caring for someone with depression is tiring.", "अपना भी ध्यान रखें — डिप्रेशन वाले व्यक्ति की देखभाल थकाने वाली होती है।"),
    ],
    selfTests: ["phq9"],
    videoKeywords: ["depression", "डिप्रेशन", "अवसाद", "udasi"],
    keywords: ["udasi", "udaas", "low mood", "sad", "hopeless", "depressed"],
  },
  "anxiety-phobia-treatment-india": {
    group: "anxiety",
    icd: { icd10: "F40–F41", icd11: "6B00–6B0Z", note: b("Anxiety or fear-related disorders (group).", "घबराहट या डर से जुड़ी बीमारियाँ (समूह)।") },
    riskFactors: [
      b("Anxious temperament since childhood, or anxiety in the family", "बचपन से घबराने वाला स्वभाव, या परिवार में घबराहट की बीमारी"),
      b("Ongoing stress: exams, job, debts, health worries", "लगातार तनाव: परीक्षा, नौकरी, कर्ज़, सेहत की चिंता"),
      b("Too much tea, coffee, energy drinks, or withdrawal from alcohol or pills", "ज़्यादा चाय, कॉफ़ी, एनर्जी ड्रिंक, या शराब/गोलियाँ छोड़ने के लक्षण"),
      b("Thyroid over-activity and some medicines", "थायरॉइड का बढ़ना और कुछ दवाएँ"),
    ],
    diagnosis: [
      b("Identifying the type: general worry, panic attacks, social fear or a specific phobia", "प्रकार पहचानना: आम चिंता, घबराहट के दौरे, लोगों के सामने डर या किसी ख़ास चीज़ का फ़ोबिया"),
      b("Checking heart, thyroid and sugar when physical symptoms are prominent", "शारीरिक लक्षण ज़्यादा हों तो दिल, थायरॉइड और शुगर की जाँच"),
      b("The GAD-7 questionnaire to measure severity", "गंभीरता मापने के लिए GAD-7 प्रश्नावली"),
    ],
    psychotherapy: [
      b("CBT teaches how worry and avoidance keep anxiety going, and how to break the cycle", "CBT सिखाती है कि चिंता और बचना घबराहट को कैसे बनाए रखते हैं, और यह चक्र कैसे तोड़ें"),
      b("Gradual exposure to feared situations, at your own pace", "डर वाली स्थितियों का धीरे-धीरे, अपनी रफ़्तार से सामना"),
      b("Breathing and relaxation skills for the body symptoms", "शारीरिक लक्षणों के लिए साँस और रिलैक्सेशन के तरीके"),
    ],
    family: [
      b("Reassure, but do not do everything for the person — avoidance makes fear stronger", "हौसला दें, पर हर काम ख़ुद न करें — बचने से डर और बढ़ता है"),
      b("Encourage small steps and praise effort", "छोटे क़दमों को बढ़ावा दें और कोशिश की तारीफ़ करें"),
      b("Avoid repeated reassurance about the same worry; it brings only short relief", "एक ही चिंता पर बार-बार तसल्ली देने से बचें; इससे राहत थोड़ी देर ही रहती है"),
    ],
    selfTests: ["gad7"],
    videoKeywords: ["anxiety", "घबराहट", "चिंता", "phobia"],
    keywords: ["ghabrahat", "chinta", "dar", "tension", "worry", "fear"],
  },
  "generalized-anxiety-disorder-india": {
    group: "anxiety",
    icd: { icd10: "F41.1", icd11: "6B00" },
    riskFactors: [
      b("Anxious or perfectionist personality", "चिंताग्रस्त या हर काम परफ़ेक्ट करने वाला स्वभाव"),
      b("Family history of anxiety or depression", "परिवार में घबराहट या डिप्रेशन"),
      b("Long periods of stress or uncertainty", "लंबे समय का तनाव या अनिश्चितता"),
      b("Caffeine, nicotine and alcohol use", "कैफ़ीन, निकोटिन और शराब का सेवन"),
    ],
    diagnosis: [
      b("Excessive worry on most days for at least several months, hard to control", "कम से कम कई महीनों से ज़्यादातर दिनों पर बहुत ज़्यादा चिंता, जो काबू में न आए"),
      b("Body symptoms such as restlessness, tiredness, muscle tension and poor sleep", "बेचैनी, थकान, मांसपेशियों में खिंचाव और ख़राब नींद जैसे शारीरिक लक्षण"),
      b("Ruling out thyroid problems, heart rhythm problems and substance withdrawal", "थायरॉइड, दिल की धड़कन की समस्या और नशा छोड़ने के लक्षणों को अलग करना"),
    ],
    psychotherapy: [
      b("CBT for worry: scheduling a daily \"worry time\" and testing worried predictions", "चिंता के लिए CBT: रोज़ का तय \"चिंता समय\" और डर वाली भविष्यवाणियों को परखना"),
      b("Learning to tolerate uncertainty instead of seeking constant reassurance", "बार-बार तसल्ली ढूँढने के बजाय अनिश्चितता को सहना सीखना"),
      b("Relaxation, breathing and mindfulness practice", "रिलैक्सेशन, साँस और माइंडफ़ुलनेस का अभ्यास"),
    ],
    family: [
      b("Listen without arguing about whether the worry is \"real\"", "चिंता \"सच्ची\" है या नहीं, इस पर बहस किए बिना सुनें"),
      b("Support regular sleep, exercise and less tea/coffee in the house", "घर में नियमित नींद, व्यायाम और कम चाय-कॉफ़ी को बढ़ावा दें"),
      b("Encourage completing treatment even after feeling better", "बेहतर लगने के बाद भी इलाज पूरा करने को प्रोत्साहित करें"),
    ],
    selfTests: ["gad7"],
    videoKeywords: ["anxiety", "worry", "चिंता", "घबराहट"],
    keywords: ["chinta", "tension", "overthinking", "worry"],
  },
  "panic-disorder-treatment-india": {
    group: "anxiety",
    icd: { icd10: "F41.0", icd11: "6B01" },
    riskFactors: [
      b("Stressful life events in the months before the first attack", "पहले दौरे से पहले के महीनों में तनाव वाली घटनाएँ"),
      b("Family history of panic or anxiety", "परिवार में पैनिक या घबराहट"),
      b("Smoking, heavy caffeine use, or stopping alcohol or sedatives suddenly", "धूम्रपान, बहुत ज़्यादा कैफ़ीन, या शराब/नींद की गोलियाँ अचानक छोड़ना"),
    ],
    diagnosis: [
      b("Repeated sudden attacks of intense fear with palpitations, breathlessness, sweating or fear of dying", "बार-बार अचानक तीव्र डर के दौरे — धड़कन, साँस फूलना, पसीना या मरने का डर"),
      b("Worry about the next attack, and avoiding places where attacks happened", "अगले दौरे की चिंता, और जहाँ दौरा पड़ा उन जगहों से बचना"),
      b("A one-time heart check (ECG) and thyroid test when advised, to be sure the body is healthy", "सलाह हो तो एक बार दिल की जाँच (ECG) और थायरॉइड टेस्ट, ताकि शरीर ठीक होने की पुष्टि हो"),
    ],
    psychotherapy: [
      b("Panic-focused CBT: understanding that the symptoms are harmless and not a heart attack", "पैनिक के लिए CBT: समझना कि ये लक्षण नुकसानदायक नहीं हैं और हार्ट अटैक नहीं है"),
      b("Interoceptive exposure: safely bringing on mild symptoms so that fear of them reduces", "इंटरोसेप्टिव एक्सपोज़र: हल्के लक्षण सुरक्षित तरीके से लाकर उनका डर कम करना"),
      b("Gradually returning to avoided places like markets, buses or crowds", "बचने वाली जगहों जैसे बाज़ार, बस या भीड़ में धीरे-धीरे लौटना"),
    ],
    family: [
      b("During an attack, stay calm, speak slowly and help with slow breathing", "दौरे के दौरान शांत रहें, धीरे बोलें और धीमी साँस में मदद करें"),
      b("Avoid repeated emergency visits once the heart has been checked — this keeps the fear going", "दिल की जाँच हो जाने के बाद बार-बार इमरजेंसी जाने से बचें — इससे डर बना रहता है"),
      b("Encourage, but do not force, going back to avoided places", "बचने वाली जगहों पर लौटने के लिए हौसला दें, ज़बरदस्ती न करें"),
    ],
    selfTests: ["gad7"],
    videoKeywords: ["panic", "पैनिक", "घबराहट"],
    keywords: ["ghabrahat", "dil ki dhadkan", "palpitation", "panic attack"],
  },
  "social-anxiety-treatment-india": {
    group: "anxiety",
    icd: { icd10: "F40.1", icd11: "6B04" },
    riskFactors: [
      b("Shy or inhibited temperament from childhood", "बचपन से शर्मीला या झिझकने वाला स्वभाव"),
      b("Being teased, bullied or harshly criticised", "मज़ाक उड़ाया जाना, धमकाया जाना या कड़ी आलोचना"),
      b("Family history of anxiety", "परिवार में घबराहट"),
    ],
    diagnosis: [
      b("Strong fear of being judged or embarrassed in social or performance situations", "लोगों के बीच या बोलने/परफ़ॉर्म करने में जज होने या शर्मिंदा होने का तीव्र डर"),
      b("Avoiding classes, interviews, phone calls or eating in front of others", "क्लास, इंटरव्यू, फ़ोन कॉल या दूसरों के सामने खाने से बचना"),
      b("Lasting for months and affecting studies, work or relationships", "महीनों से रहना और पढ़ाई, काम या रिश्तों पर असर"),
    ],
    psychotherapy: [
      b("CBT focusing on self-focused attention and \"safety behaviours\"", "ख़ुद पर ध्यान और \"बचाव वाले व्यवहार\" पर केंद्रित CBT"),
      b("Step-by-step practice of feared situations", "डर वाली स्थितियों का क़दम-दर-क़दम अभ्यास"),
      b("Social skills and assertiveness practice when helpful", "ज़रूरत हो तो सामाजिक कौशल और अपनी बात कहने का अभ्यास"),
    ],
    family: [
      b("Do not label the person as \"arrogant\" or \"too shy\" — this is an anxiety condition", "व्यक्ति को \"घमंडी\" या \"बहुत शर्मीला\" न कहें — यह घबराहट की बीमारी है"),
      b("Praise small social steps rather than pushing big ones", "बड़े क़दमों के लिए धकेलने के बजाय छोटे सामाजिक क़दमों की तारीफ़ करें"),
      b("Help them practise at home, for example a phone call or ordering food", "घर पर अभ्यास में मदद करें, जैसे फ़ोन करना या खाना ऑर्डर करना"),
    ],
    selfTests: ["gad7"],
    videoKeywords: ["social anxiety", "stage fear", "शर्म"],
    keywords: ["sharm", "stage fear", "public speaking", "shy"],
  },
  "phobia-treatment-india": {
    group: "anxiety",
    icd: { icd10: "F40.2", icd11: "6B03" },
    riskFactors: [
      b("A frightening experience with the object or situation", "उस चीज़ या स्थिति से जुड़ा कोई डरावना अनुभव"),
      b("Seeing a parent or sibling with the same fear", "माता-पिता या भाई-बहन में वही डर देखना"),
      b("Anxious temperament", "घबराने वाला स्वभाव"),
    ],
    diagnosis: [
      b("Marked fear of a specific thing (heights, animals, injections, blood, flying, closed spaces)", "किसी ख़ास चीज़ का तीव्र डर (ऊँचाई, जानवर, इंजेक्शन, ख़ून, हवाई जहाज़, बंद जगह)"),
      b("The fear is out of proportion and leads to avoidance", "डर ज़रूरत से बहुत ज़्यादा है और व्यक्ति उससे बचता है"),
      b("Checking whether the phobia is stopping needed medical care, travel or work", "देखना कि फ़ोबिया ज़रूरी इलाज, यात्रा या काम में रुकावट तो नहीं डाल रहा"),
    ],
    psychotherapy: [
      b("Graded exposure therapy — the most effective treatment for specific phobias", "ग्रेडेड एक्सपोज़र थेरेपी — ख़ास फ़ोबिया का सबसे असरदार इलाज"),
      b("Applied tension technique for people who faint at the sight of blood or injections", "ख़ून या इंजेक्शन देखकर बेहोश होने वालों के लिए अप्लाइड टेंशन तकनीक"),
    ],
    family: [
      b("Do not mock the fear or force sudden exposure", "डर का मज़ाक न उड़ाएँ और अचानक सामना करने को मजबूर न करें"),
      b("Support planned, step-by-step practice", "योजना से, क़दम-दर-क़दम अभ्यास में साथ दें"),
    ],
    selfTests: ["gad7"],
    videoKeywords: ["phobia", "फ़ोबिया", "डर"],
    keywords: ["dar", "fear", "darr"],
  },
  "health-anxiety-treatment-india": {
    group: "somatic",
    icd: { icd10: "F45.2", icd11: "6B23", note: b("Hypochondriasis / health anxiety disorder.", "हाइपोकॉन्ड्रिएसिस / स्वास्थ्य की चिंता का विकार।") },
    riskFactors: [
      b("Serious illness in yourself or a close family member in the past", "पहले अपनी या किसी क़रीबी की गंभीर बीमारी"),
      b("Frequent searching of symptoms online", "बार-बार इंटरनेट पर लक्षण खोजना"),
      b("General anxiety or depression", "आम घबराहट या डिप्रेशन"),
    ],
    diagnosis: [
      b("Persistent fear of having a serious disease despite normal tests and medical reassurance", "जाँच सामान्य होने और डॉक्टर के समझाने के बाद भी गंभीर बीमारी होने का लगातार डर"),
      b("Repeated checking of the body, tests or doctor visits — or avoiding doctors completely", "बार-बार शरीर जाँचना, टेस्ट या डॉक्टर के पास जाना — या डॉक्टर से बिल्कुल बचना"),
      b("Coordinating with your physician so that genuine physical problems are not missed", "आपके फ़िज़िशियन से तालमेल, ताकि असली शारीरिक समस्या न छूटे"),
    ],
    psychotherapy: [
      b("CBT for health anxiety: reducing checking, reassurance-seeking and online searching", "स्वास्थ्य चिंता के लिए CBT: बार-बार जाँचना, तसल्ली माँगना और ऑनलाइन खोज कम करना"),
      b("Understanding normal body sensations and how attention amplifies them", "शरीर की सामान्य संवेदनाओं को समझना और ध्यान से वे कैसे बढ़ जाती हैं"),
    ],
    family: [
      b("Gently limit repeated reassurance; agree on a plan with the doctor instead", "बार-बार तसल्ली देना नरमी से सीमित करें; इसके बजाय डॉक्टर के साथ योजना तय करें"),
      b("Avoid joining in internet searches for symptoms", "लक्षणों की इंटरनेट खोज में साथ न दें"),
    ],
    selfTests: ["gad7", "phq15"],
    videoKeywords: ["health anxiety", "hypochondria", "बीमारी का डर"],
    keywords: ["bimari ka dar", "cancer ka dar", "hypochondria"],
  },
  "dissociative-disorders-treatment-india": {
    group: "somatic",
    icd: { icd10: "F44", icd11: "6B60–6B6Z", note: b("Dissociative disorders (ICD-11 also includes dissociative neurological symptom disorder, 6B60).", "डिसोसिएटिव विकार (ICD-11 में डिसोसिएटिव न्यूरोलॉजिकल सिम्पटम डिसऑर्डर 6B60 भी शामिल है)।") },
    riskFactors: [
      b("Severe stress, conflict or trauma, especially when it is hard to talk about", "गंभीर तनाव, कलह या आघात, ख़ासकर जब उसके बारे में बात करना मुश्किल हो"),
      b("Past episodes of similar \"attacks\"", "पहले भी ऐसे \"दौरे\" पड़ना"),
      b("Depression or anxiety", "डिप्रेशन या घबराहट"),
    ],
    diagnosis: [
      b("Careful history from the patient and a family member who saw the episodes", "मरीज़ और दौरे देखने वाले परिवार के सदस्य से ध्यान से पूरा इतिहास"),
      b("Neurological examination and, when needed, EEG or brain imaging to rule out epilepsy and other causes", "न्यूरोलॉजिकल जाँच और ज़रूरत हो तो EEG या ब्रेन इमेजिंग, ताकि मिर्गी व दूसरी वजहें अलग हों"),
      b("Understanding stresses around the time of onset, without blaming the patient", "शुरुआत के समय के तनावों को समझना, मरीज़ को दोष दिए बिना"),
    ],
    psychotherapy: [
      b("Psychoeducation: the symptoms are real and not \"put on\", and they can improve", "समझाना: लक्षण असली हैं, \"नाटक\" नहीं, और ठीक हो सकते हैं"),
      b("CBT and stress-management skills; trauma-focused therapy when relevant", "CBT और तनाव संभालने के तरीके; ज़रूरत हो तो ट्रॉमा-केंद्रित थेरेपी"),
      b("Family sessions to reduce conflict and avoid reinforcing the episodes", "कलह कम करने और दौरों को बढ़ावा न देने के लिए परिवार के साथ सत्र"),
    ],
    family: [
      b("During an episode, keep the person safe, stay calm and avoid crowding", "दौरे के समय व्यक्ति को सुरक्षित रखें, शांत रहें और भीड़ न लगाएँ"),
      b("Avoid both scolding and excessive attention; respond in a calm, matter-of-fact way", "न डाँटें, न ज़रूरत से ज़्यादा ध्यान दें; शांत और सामान्य तरीके से प्रतिक्रिया दें"),
      b("Do not take the person to faith healers instead of medical care; this delays recovery", "डॉक्टरी इलाज के बजाय झाड़-फूँक के पास न ले जाएँ; इससे ठीक होने में देर होती है"),
    ],
    videoKeywords: ["dissociative", "conversion", "दौरे"],
    keywords: ["daura", "behoshi", "hysteria", "bhoot pret", "conversion"],
  },
  "ocd-treatment-india": {
    group: "ocd",
    icd: { icd10: "F42", icd11: "6B20" },
    riskFactors: [
      b("OCD or tics in the family", "परिवार में OCD या टिक्स"),
      b("Onset in childhood or teenage years is common", "बचपन या किशोरावस्था में शुरुआत आम है"),
      b("Stressful events, pregnancy or after childbirth can trigger or worsen symptoms", "तनाव वाली घटनाएँ, गर्भावस्था या डिलीवरी के बाद लक्षण शुरू या बढ़ सकते हैं"),
    ],
    diagnosis: [
      b("Identifying obsessions (unwanted repeated thoughts) and compulsions (repeated acts to reduce anxiety)", "ऑब्सेशन (अनचाहे बार-बार विचार) और कंपल्शन (घबराहट कम करने के लिए बार-बार किए काम) पहचानना"),
      b("Measuring time taken, distress and impact on daily life", "लगने वाला समय, परेशानी और रोज़ की ज़िंदगी पर असर मापना"),
      b("Checking for depression, tics and related problems like body dysmorphic disorder", "डिप्रेशन, टिक्स और बॉडी डिस्मॉर्फ़िक डिसऑर्डर जैसी संबंधित समस्याओं की जाँच"),
    ],
    psychotherapy: [
      b("Exposure and response prevention (ERP): facing the trigger without doing the compulsion — the most effective therapy for OCD", "एक्सपोज़र एंड रिस्पॉन्स प्रिवेंशन (ERP): ट्रिगर का सामना बिना कंपल्शन किए — OCD की सबसे असरदार थेरेपी"),
      b("Cognitive therapy for exaggerated responsibility and doubt", "बढ़ी हुई ज़िम्मेदारी और शक के लिए कॉग्निटिव थेरेपी"),
    ],
    family: [
      b("Do not take part in rituals (extra washing, checking for them, repeated reassurance)", "रिवाज़ों में साथ न दें (ज़्यादा धुलाई, उनके लिए चेक करना, बार-बार तसल्ली)"),
      b("Reduce your involvement gradually and agree on it with the therapist, not suddenly", "अपनी भागीदारी धीरे-धीरे और थेरेपिस्ट से तय करके कम करें, अचानक नहीं"),
      b("Separate the person from the illness — the thoughts are not their wishes", "व्यक्ति और बीमारी को अलग समझें — ये विचार उनकी इच्छा नहीं हैं"),
    ],
    selfTests: ["ocd"],
    videoKeywords: ["ocd", "वहम", "obsessive"],
    keywords: ["vaham", "vahem", "wahem", "bar bar haath dhona", "checking", "shak"],
  },
  "bipolar-disorder-psychiatrist-india": {
    group: "bipolar",
    icd: { icd10: "F31", icd11: "6A60, 6A61", note: b("Bipolar type I / bipolar type II disorder.", "बाइपोलर टाइप I / टाइप II।") },
    riskFactors: [
      b("Bipolar disorder in a parent or sibling — the strongest risk factor", "माता-पिता या भाई-बहन में बाइपोलर — सबसे बड़ा जोखिम"),
      b("Sleep loss, which can trigger mania", "नींद की कमी, जिससे मेनिया शुरू हो सकता है"),
      b("Cannabis, alcohol or stimulant use", "गांजा, शराब या स्टिमुलेंट का सेवन"),
      b("Childbirth (risk of postpartum mood episodes)", "डिलीवरी (डिलीवरी के बाद मूड एपिसोड का जोखिम)"),
    ],
    diagnosis: [
      b("Clear history of at least one manic or hypomanic episode — often best described by family", "कम से कम एक मेनिया या हाइपोमेनिया के दौर का साफ़ इतिहास — अक्सर परिवार बेहतर बताता है"),
      b("Mood charting of sleep, energy and mood over weeks", "हफ़्तों तक नींद, ऊर्जा और मूड का चार्ट"),
      b("Baseline blood tests (kidney, thyroid, liver, sugar) before mood stabilisers", "मूड स्टेबलाइज़र से पहले ख़ून की बुनियादी जाँच (किडनी, थायरॉइड, लिवर, शुगर)"),
    ],
    psychotherapy: [
      b("Psychoeducation about early warning signs and relapse plans", "शुरुआती चेतावनी संकेत और दोबारा होने से बचाव की योजना की जानकारी"),
      b("Regular routine for sleep and activity (interpersonal and social rhythm therapy)", "नींद और गतिविधि की नियमित दिनचर्या (इंटरपर्सनल व सोशल रिदम थेरेपी)"),
      b("Family-focused therapy to reduce conflict and improve support", "कलह कम करने और सहारा बढ़ाने के लिए परिवार-केंद्रित थेरेपी"),
    ],
    family: [
      b("Learn the person's early signs — less sleep, fast talk, overspending, irritability", "व्यक्ति के शुरुआती संकेत पहचानें — कम नींद, तेज़ बोलना, ज़्यादा ख़र्च, चिड़चिड़ापन"),
      b("Keep money and vehicle keys safe during high phases if agreed in advance", "पहले से तय हो तो तेज़ दौर में पैसे और गाड़ी की चाबी सुरक्षित रखें"),
      b("Mood stabilisers are long-term; stopping them suddenly often causes relapse", "मूड स्टेबलाइज़र लंबे समय की दवा है; अचानक बंद करने से अक्सर बीमारी लौट आती है"),
    ],
    selfTests: ["phq9"],
    videoKeywords: ["bipolar", "mania", "बाइपोलर"],
    keywords: ["mania", "mood swings", "bipolar", "zyada josh"],
  },
  "psychosis-psychiatrist-india": {
    group: "psychosis",
    icd: { icd10: "F20–F29", icd11: "6A20–6A2Z", note: b("Schizophrenia or other primary psychotic disorders (group).", "सिज़ोफ्रेनिया या दूसरे प्राथमिक मनोविकृति विकार (समूह)।") },
    riskFactors: [
      b("Psychosis or schizophrenia in the family", "परिवार में मनोविकृति या सिज़ोफ्रेनिया"),
      b("Cannabis (ganja, charas, bhang) use, especially in teenagers", "गांजा, चरस, भांग का सेवन, ख़ासकर किशोरों में"),
      b("Severe stress or sleep loss", "गंभीर तनाव या नींद की कमी"),
      b("Some medical conditions and medicines", "कुछ शारीरिक बीमारियाँ और दवाएँ"),
    ],
    diagnosis: [
      b("Interview with the patient and family about voices, suspicion, unusual beliefs and behaviour change", "आवाज़ों, शक, अजीब विश्वास और व्यवहार में बदलाव के बारे में मरीज़ और परिवार से बातचीत"),
      b("Physical examination and blood tests; brain scan or EEG when indicated", "शारीरिक जाँच और ख़ून की जाँच; ज़रूरत हो तो ब्रेन स्कैन या EEG"),
      b("Screening for substance use, which can cause or worsen psychosis", "नशे की जाँच, क्योंकि इससे मनोविकृति हो या बढ़ सकती है"),
    ],
    psychotherapy: [
      b("CBT for psychosis to cope with voices and distressing beliefs", "आवाज़ों और परेशान करने वाले विश्वासों से निपटने के लिए CBT"),
      b("Psychoeducation and relapse-prevention planning", "बीमारी की जानकारी और दोबारा होने से बचाव की योजना"),
      b("Social skills training and rehabilitation for work or studies", "काम या पढ़ाई के लिए सामाजिक कौशल और पुनर्वास"),
    ],
    family: [
      b("Stay calm and avoid arguing about the beliefs; focus on how the person feels", "शांत रहें और विश्वासों पर बहस न करें; व्यक्ति कैसा महसूस कर रहा है उस पर ध्यान दें"),
      b("Help with regular medicines; injections given monthly are an option if tablets are missed", "दवा नियमित रखने में मदद करें; गोलियाँ छूटती हों तो महीने में एक बार के इंजेक्शन का विकल्प है"),
      b("Early treatment gives the best recovery — avoid delays with unproven remedies", "जल्दी इलाज से सबसे अच्छा सुधार होता है — बिना प्रमाण के उपायों में देर न करें"),
    ],
    videoKeywords: ["psychosis", "schizophrenia", "मनोविकृति", "सिज़ोफ्रेनिया"],
    keywords: ["awaz", "awaaz", "shak", "pagalpan", "voices"],
  },
  "personality-disorders-psychiatrist-india": {
    group: "personality",
    icd: { icd10: "F60", icd11: "6D10, 6D11", note: b("ICD-11 describes personality disorder by severity, with trait domains such as negative affectivity or a borderline pattern.", "ICD-11 पर्सनैलिटी डिसऑर्डर को गंभीरता के आधार पर बताता है, साथ में नकारात्मक भावनात्मकता या बॉर्डरलाइन पैटर्न जैसे लक्षण-क्षेत्र।") },
    riskFactors: [
      b("Difficult childhood experiences — neglect, abuse, unstable care", "बचपन के कठिन अनुभव — उपेक्षा, शोषण, अस्थिर देखभाल"),
      b("Temperament inherited from parents", "माता-पिता से मिला स्वभाव"),
      b("Ongoing substance use", "लगातार नशे का सेवन"),
    ],
    diagnosis: [
      b("Patterns of emotions, relationships and behaviour that have lasted since adolescence or early adulthood", "भावनाओं, रिश्तों और व्यवहार के पैटर्न जो किशोरावस्था या शुरुआती जवानी से चले आ रहे हैं"),
      b("Several sessions and information from family to understand the pattern fairly", "पैटर्न को निष्पक्ष रूप से समझने के लिए कई सत्र और परिवार से जानकारी"),
      b("Treating depression, anxiety or addiction that often occur alongside", "साथ में अक्सर होने वाले डिप्रेशन, घबराहट या नशे का इलाज"),
    ],
    psychotherapy: [
      b("Structured psychotherapies such as DBT skills, schema-focused or mentalisation-based therapy", "DBT स्किल्स, स्कीमा-केंद्रित या मेंटलाइज़ेशन-आधारित थेरेपी जैसी व्यवस्थित थेरेपी"),
      b("Skills for emotion regulation, distress tolerance and relationships", "भावनाएँ संभालने, परेशानी सहने और रिश्तों के कौशल"),
    ],
    family: [
      b("Set calm, consistent limits and avoid getting drawn into repeated conflicts", "शांत और एक जैसी सीमाएँ तय करें और बार-बार की लड़ाई में न उलझें"),
      b("Learn validation — acknowledging feelings without agreeing with harmful actions", "वैलिडेशन सीखें — भावनाओं को स्वीकार करना, नुकसानदायक काम से सहमत हुए बिना"),
    ],
    videoKeywords: ["personality disorder", "borderline"],
    keywords: ["gussa", "anger", "mood swings", "relationship"],
  },
  "sleep-disorders-psychiatrist-india": {
    group: "sleep",
    icd: { icd10: "F51, G47", icd11: "7A00–7B2Z", note: b("ICD-11 places sleep-wake disorders in a separate chapter (chapter 7).", "ICD-11 में नींद-जागने के विकार अलग अध्याय (अध्याय 7) में हैं।") },
    riskFactors: [
      b("Stress, anxiety and depression", "तनाव, घबराहट और डिप्रेशन"),
      b("Irregular shifts, night duty or late-night screen use", "अनियमित शिफ़्ट, रात की ड्यूटी या देर रात तक स्क्रीन"),
      b("Alcohol, nicotine, caffeine and some medicines", "शराब, निकोटिन, कैफ़ीन और कुछ दवाएँ"),
      b("Pain, breathing problems, frequent urination at night", "दर्द, साँस की परेशानी, रात में बार-बार पेशाब"),
    ],
    diagnosis: [
      b("A sleep history and a 1–2 week sleep diary", "नींद का इतिहास और 1–2 हफ़्ते की स्लीप डायरी"),
      b("Asking about snoring with breathing pauses (sleep apnoea) and restless legs", "साँस रुकने वाले खर्राटों (स्लीप एपनिया) और बेचैन पैरों के बारे में पूछना"),
      b("Referral for a sleep study when sleep apnoea or narcolepsy is suspected", "स्लीप एपनिया या नार्कोलेप्सी का शक हो तो स्लीप स्टडी के लिए भेजना"),
    ],
    psychotherapy: [
      b("CBT for insomnia (CBT-I): fixed wake time, sleep scheduling and changing worry about sleep", "अनिद्रा के लिए CBT (CBT-I): तय समय पर उठना, नींद का शेड्यूल और नींद की चिंता बदलना"),
      b("Relaxation training and stimulus control (bed only for sleep)", "रिलैक्सेशन और स्टिमुलस कंट्रोल (बिस्तर सिर्फ़ सोने के लिए)"),
    ],
    family: [
      b("Keep the bedroom dark, quiet and free of TV and phones at night", "रात में कमरा अँधेरा, शांत और टीवी-फ़ोन से मुक्त रखें"),
      b("Do not share or buy sleeping pills without a prescription", "बिना पर्चे नींद की गोलियाँ न दें, न ख़रीदें"),
    ],
    selfTests: ["sleep"],
    videoKeywords: ["sleep", "insomnia", "नींद"],
    keywords: ["neend", "neend nahi aati", "anidra", "insomnia"],
  },
  "somatic-symptom-pain-disorders-india": {
    group: "somatic",
    icd: { icd10: "F45", icd11: "6C20", note: b("ICD-11 uses the term \"bodily distress disorder\".", "ICD-11 में इसे \"बॉडिली डिस्ट्रेस डिसऑर्डर\" कहा गया है।") },
    riskFactors: [
      b("Ongoing stress, anxiety or depression", "लगातार तनाव, घबराहट या डिप्रेशन"),
      b("Past serious illness or many medical investigations", "पहले गंभीर बीमारी या बहुत सारी मेडिकल जाँचें"),
      b("Difficulty putting feelings into words", "भावनाओं को शब्दों में कहने में मुश्किल"),
    ],
    diagnosis: [
      b("Reviewing previous reports so that physical illness is properly excluded", "पुरानी रिपोर्ट देखना ताकि शारीरिक बीमारी को ठीक से अलग किया जा सके"),
      b("Understanding how much time, worry and disability the symptoms cause", "समझना कि लक्षणों से कितना समय, चिंता और काम में रुकावट होती है"),
      b("The PHQ-15 questionnaire to measure body-symptom burden", "शारीरिक लक्षणों का बोझ मापने के लिए PHQ-15 प्रश्नावली"),
    ],
    psychotherapy: [
      b("CBT to reduce symptom focus, checking and avoidance of activity", "लक्षणों पर ध्यान, बार-बार जाँच और गतिविधि से बचना कम करने के लिए CBT"),
      b("Graded return to activity and stress-management skills", "धीरे-धीरे गतिविधि बढ़ाना और तनाव संभालने के तरीके"),
    ],
    family: [
      b("Believe that the symptoms are real; avoid saying \"it's all in your head\"", "मानें कि लक्षण असली हैं; \"सब दिमाग़ में है\" न कहें"),
      b("Support one consistent doctor instead of many different hospitals", "बहुत सारे अस्पतालों के बजाय एक नियमित डॉक्टर के साथ रहने में मदद करें"),
    ],
    selfTests: ["phq15", "phq9"],
    videoKeywords: ["somatic", "body pain", "शारीरिक लक्षण"],
    keywords: ["dard", "body pain", "kamzori", "gas", "chakkar"],
  },
  "ptsd-trauma-treatment-india": {
    group: "trauma",
    icd: { icd10: "F43.1", icd11: "6B40, 6B41", note: b("PTSD / complex PTSD.", "PTSD / कॉम्प्लेक्स PTSD।") },
    riskFactors: [
      b("Severe or repeated trauma — accidents, assault, abuse, violence, disasters", "गंभीर या बार-बार आघात — दुर्घटना, हमला, शोषण, हिंसा, आपदा"),
      b("Little support after the event", "घटना के बाद कम सहारा"),
      b("Previous anxiety or depression", "पहले से घबराहट या डिप्रेशन"),
    ],
    diagnosis: [
      b("Re-experiencing (flashbacks, nightmares), avoidance and a constant sense of threat", "दोबारा अनुभव (फ़्लैशबैक, बुरे सपने), बचना और हमेशा ख़तरे का एहसास"),
      b("Symptoms lasting for several weeks and affecting daily life", "कई हफ़्तों तक रहने वाले लक्षण जो रोज़ की ज़िंदगी पर असर डालें"),
      b("Gentle assessment — you do not need to describe the trauma in detail at the first visit", "नरमी से जाँच — पहली मुलाक़ात में आघात का पूरा विवरण देना ज़रूरी नहीं"),
    ],
    psychotherapy: [
      b("Trauma-focused CBT and EMDR — recommended first-line therapies", "ट्रॉमा-केंद्रित CBT और EMDR — पहली पसंद की थेरेपी"),
      b("Grounding and stabilisation skills before trauma processing", "ट्रॉमा पर काम से पहले ग्राउंडिंग और स्थिरता के तरीके"),
    ],
    family: [
      b("Do not push the person to talk about the event; let them choose when", "घटना के बारे में बात करने के लिए दबाव न डालें; उन्हें समय चुनने दें"),
      b("Offer safety, routine and patience; startle and anger are symptoms, not personal", "सुरक्षा, दिनचर्या और धैर्य दें; चौंकना और गुस्सा लक्षण हैं, आप पर निशाना नहीं"),
    ],
    selfTests: ["phq9", "gad7"],
    videoKeywords: ["trauma", "ptsd", "आघात"],
    keywords: ["trauma", "accident", "flashback", "sadma"],
  },
  "headache-psychiatric-care-india": {
    group: "neuro",
    icd: { icd10: "G43, G44.2", icd11: "8A80, 8A81", note: b("Migraine / tension-type headache.", "माइग्रेन / टेंशन-टाइप सिरदर्द।") },
    riskFactors: [
      b("Stress, poor sleep and skipped meals", "तनाव, ख़राब नींद और खाना छोड़ना"),
      b("Depression and anxiety", "डिप्रेशन और घबराहट"),
      b("Taking painkillers on many days of the month (medication-overuse headache)", "महीने में कई दिन पेनकिलर लेना (दवा के ज़्यादा इस्तेमाल से सिरदर्द)"),
    ],
    diagnosis: [
      b("A headache diary of frequency, triggers and painkiller use", "सिरदर्द की डायरी — कितनी बार, ट्रिगर और पेनकिलर का इस्तेमाल"),
      b("Neurological examination; scans only when warning signs are present", "न्यूरोलॉजिकल जाँच; स्कैन सिर्फ़ चेतावनी संकेत होने पर"),
    ],
    psychotherapy: [
      b("CBT, relaxation and biofeedback-style techniques reduce headache days", "CBT, रिलैक्सेशन और बायोफ़ीडबैक जैसी तकनीकें सिरदर्द के दिन कम करती हैं"),
      b("Sleep and stress routines", "नींद और तनाव की दिनचर्या"),
    ],
    family: [
      b("Help keep regular sleep and meal times", "नियमित नींद और खाने का समय रखने में मदद करें"),
      b("Discourage daily painkillers bought over the counter", "रोज़ बिना पर्चे के पेनकिलर लेने से रोकें"),
    ],
    videoKeywords: ["headache", "migraine", "सिरदर्द"],
    keywords: ["sir dard", "sirdard", "migraine", "headache"],
  },
  "seizure-disorders-psychiatry-india": {
    group: "neuro",
    icd: { icd10: "G40", icd11: "8A60", note: b("Epilepsy; mental health care is given alongside neurological treatment.", "मिर्गी; मानसिक स्वास्थ्य का इलाज न्यूरोलॉजिकल इलाज के साथ होता है।") },
    riskFactors: [
      b("Frequent or uncontrolled seizures", "बार-बार या अनियंत्रित दौरे"),
      b("Stigma, restrictions on driving or work, side-effects of anti-seizure medicines", "सामाजिक कलंक, गाड़ी चलाने या काम पर रोक, मिर्गी की दवाओं के साइड-इफ़ेक्ट"),
    ],
    diagnosis: [
      b("Screening for depression, anxiety and memory problems that commonly accompany epilepsy", "मिर्गी के साथ आम तौर पर होने वाले डिप्रेशन, घबराहट और याददाश्त की समस्याओं की जाँच"),
      b("Distinguishing epileptic seizures from dissociative (non-epileptic) attacks with video-EEG when needed", "ज़रूरत हो तो वीडियो-EEG से मिर्गी के दौरों और डिसोसिएटिव (बिना मिर्गी) दौरों में फ़र्क़"),
      b("Choosing psychiatric medicines that are safe with anti-seizure medicines", "ऐसी मनोरोग दवाएँ चुनना जो मिर्गी की दवाओं के साथ सुरक्षित हों"),
    ],
    psychotherapy: [
      b("Counselling about living with epilepsy, stigma and safety", "मिर्गी के साथ जीने, सामाजिक कलंक और सुरक्षा पर काउंसलिंग"),
      b("CBT for anxiety and depression", "घबराहट और डिप्रेशन के लिए CBT"),
    ],
    family: [
      b("First aid: turn the person on their side, do not put anything in the mouth, time the seizure", "प्राथमिक उपचार: करवट दिलाएँ, मुँह में कुछ न डालें, दौरे का समय देखें"),
      b("Call 112 if a seizure lasts more than 5 minutes or repeats without recovery", "दौरा 5 मिनट से ज़्यादा चले या बिना होश आए दोबारा हो तो 112 पर कॉल करें"),
    ],
    videoKeywords: ["epilepsy", "seizure", "मिर्गी"],
    keywords: ["mirgi", "daura", "epilepsy", "fits"],
  },
};
