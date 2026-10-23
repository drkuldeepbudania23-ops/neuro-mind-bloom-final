import type { ConditionContent } from "../types";
import { b } from "./_h";

/** Advanced-library sections for the ORIGINAL child, older-adult, neuro, women, student, addiction and sexual-health pages. */
export const ENRICH_OTHER: Record<string, Partial<ConditionContent>> = {
  "child-psychiatrist-india": {
    group: "child",
    riskFactors: [
      b("Developmental delays, learning difficulties or chronic illness", "विकास में देरी, सीखने में कठिनाई या लंबी बीमारी"),
      b("Family conflict, harsh discipline, bullying or screen overuse", "परिवार में कलह, सख़्त अनुशासन, स्कूल में धमकाना या ज़्यादा स्क्रीन"),
      b("Mental illness or substance use in a parent", "माता-पिता में मानसिक बीमारी या नशा"),
    ],
    diagnosis: [
      b("Meeting the child and parents separately and together", "बच्चे और माता-पिता से अलग-अलग और साथ में बात"),
      b("School reports and teacher observations", "स्कूल की रिपोर्ट और शिक्षकों की राय"),
      b("Developmental history and, when needed, IQ or learning assessment by a psychologist", "विकास का इतिहास और ज़रूरत हो तो साइकोलॉजिस्ट से IQ या सीखने की जाँच"),
    ],
    psychotherapy: [
      b("Parent training in positive discipline and routines", "सकारात्मक अनुशासन और दिनचर्या के लिए अभिभावक प्रशिक्षण"),
      b("Child-friendly CBT, play-based techniques and school coordination", "बच्चों के अनुकूल CBT, खेल-आधारित तरीके और स्कूल से तालमेल"),
    ],
    family: [
      b("Notice and praise good behaviour more often than you correct mistakes", "गलती सुधारने से ज़्यादा बार अच्छे व्यवहार पर ध्यान दें और तारीफ़ करें"),
      b("Keep predictable routines for sleep, study, play and screens", "नींद, पढ़ाई, खेल और स्क्रीन की तय दिनचर्या रखें"),
      b("Both parents should follow the same rules", "दोनों अभिभावक एक जैसे नियम अपनाएँ"),
    ],
    videoKeywords: ["child", "बच्चों", "parenting"],
    keywords: ["bachcha", "baccha", "child behaviour", "parenting"],
  },
  "adhd-psychiatrist-india": {
    group: "adhd-autism",
    icd: { icd10: "F90", icd11: "6A05" },
    riskFactors: [
      b("ADHD in a parent or sibling — it runs strongly in families", "माता-पिता या भाई-बहन में ADHD — यह परिवारों में काफ़ी चलता है"),
      b("Premature birth or low birth weight", "समय से पहले जन्म या कम वज़न"),
      b("Exposure to tobacco or alcohol during pregnancy", "गर्भावस्था में तंबाकू या शराब का असर"),
    ],
    diagnosis: [
      b("Symptoms present before age 12 and seen in more than one setting (home and school)", "12 साल से पहले से लक्षण और एक से ज़्यादा जगह (घर और स्कूल) पर दिखना"),
      b("Rating scales from parents and teachers", "अभिभावकों और शिक्षकों से रेटिंग स्केल"),
      b("Checking vision, hearing, sleep, learning disorders and anxiety, which can look similar", "नज़र, सुनना, नींद, सीखने की समस्या और घबराहट की जाँच — ये भी ऐसे दिख सकते हैं"),
    ],
    psychotherapy: [
      b("Parent behaviour training — first-line for young children", "अभिभावक व्यवहार प्रशिक्षण — छोटे बच्चों के लिए पहली पसंद"),
      b("Classroom strategies: front seating, short tasks, frequent feedback", "क्लास के तरीके: आगे बैठना, छोटे काम, बार-बार फ़ीडबैक"),
      b("Organisation and time-management skills for teenagers and adults", "किशोरों और बड़ों के लिए व्यवस्था और समय-प्रबंधन के कौशल"),
    ],
    family: [
      b("Give one instruction at a time and check it was heard", "एक बार में एक ही निर्देश दें और देखें कि सुना गया"),
      b("Use reward charts for routines; keep consequences calm and immediate", "दिनचर्या के लिए इनाम चार्ट; नतीजे शांत और तुरंत रखें"),
      b("ADHD is not bad parenting or laziness", "ADHD ख़राब परवरिश या आलस नहीं है"),
    ],
    selfTests: ["asrs"],
    videoKeywords: ["adhd", "hyperactive", "ध्यान"],
    keywords: ["chanchal", "dhyan nahi lagta", "hyperactive", "attention"],
  },
  "autism-psychiatrist-india": {
    group: "adhd-autism",
    icd: { icd10: "F84.0", icd11: "6A02" },
    riskFactors: [
      b("Autism in a sibling", "भाई-बहन में ऑटिज़्म"),
      b("Premature birth; older parental age", "समय से पहले जन्म; माता-पिता की ज़्यादा उम्र"),
      b("Some genetic conditions (for example fragile X)", "कुछ आनुवंशिक बीमारियाँ (जैसे फ़्रैजाइल X)"),
    ],
    diagnosis: [
      b("Observation of social communication, play and repetitive behaviours", "सामाजिक संवाद, खेल और दोहराव वाले व्यवहार का निरीक्षण"),
      b("Developmental history from parents; hearing test", "अभिभावकों से विकास का इतिहास; सुनने की जाँच"),
      b("Assessment of language, intellectual level and associated ADHD, sleep or epilepsy", "भाषा, बौद्धिक स्तर और साथ में ADHD, नींद या मिर्गी की जाँच"),
    ],
    psychotherapy: [
      b("Early intervention: speech therapy, occupational therapy and parent-mediated programmes", "जल्दी हस्तक्षेप: स्पीच थेरेपी, ऑक्युपेशनल थेरेपी और अभिभावक-आधारित कार्यक्रम"),
      b("Behavioural approaches for daily living skills and difficult behaviour", "रोज़मर्रा के कौशल और कठिन व्यवहार के लिए व्यवहार-आधारित तरीके"),
    ],
    family: [
      b("Use clear, short language and visual schedules", "साफ़, छोटी भाषा और चित्रों वाली दिनचर्या"),
      b("Prepare the child for changes in routine", "दिनचर्या में बदलाव के लिए बच्चे को पहले से तैयार करें"),
      b("Be cautious of costly \"cures\" without scientific evidence", "बिना वैज्ञानिक प्रमाण के महँगे \"इलाज\" से सावधान रहें"),
    ],
    videoKeywords: ["autism", "ऑटिज़्म"],
    keywords: ["autism", "bolna nahi", "speech delay", "eye contact"],
  },
  "specific-learning-disorder-india": {
    group: "learning",
    icd: { icd10: "F81", icd11: "6A03" },
    riskFactors: [
      b("Learning difficulties in the family", "परिवार में सीखने की कठिनाई"),
      b("Premature birth; ADHD", "समय से पहले जन्म; ADHD"),
    ],
    diagnosis: [
      b("Standardised testing of reading, writing and maths by a trained psychologist", "प्रशिक्षित साइकोलॉजिस्ट से पढ़ने, लिखने और गणित की मानक जाँच"),
      b("Vision and hearing checks; IQ assessment to exclude intellectual disability", "नज़र और सुनने की जाँच; बौद्धिक अक्षमता अलग करने के लिए IQ जाँच"),
      b("Certification for exam accommodations where applicable", "जहाँ लागू हो, परीक्षा में छूट के लिए प्रमाणपत्र"),
    ],
    psychotherapy: [
      b("Remedial teaching tailored to the specific difficulty", "ख़ास कठिनाई के अनुसार रेमेडियल पढ़ाई"),
      b("Support for self-esteem and exam anxiety", "आत्मविश्वास और परीक्षा की घबराहट के लिए सहारा"),
    ],
    family: [
      b("The child is not lazy or careless; praise effort", "बच्चा आलसी या लापरवाह नहीं है; मेहनत की तारीफ़ करें"),
      b("Work with the school for extra time, a reader/writer or oral tests where permitted", "जहाँ अनुमति हो, अतिरिक्त समय, रीडर/राइटर या मौखिक टेस्ट के लिए स्कूल से बात करें"),
    ],
    videoKeywords: ["learning disability", "dyslexia"],
    keywords: ["padhai me kamzor", "dyslexia", "spelling mistakes", "maths"],
  },
  "intellectual-disability-idd-india": {
    group: "learning",
    icd: { icd10: "F70–F79", icd11: "6A00" },
    riskFactors: [
      b("Problems during pregnancy or birth (infections, lack of oxygen)", "गर्भावस्था या जन्म के समय की समस्याएँ (संक्रमण, ऑक्सीजन की कमी)"),
      b("Genetic conditions such as Down syndrome", "डाउन सिंड्रोम जैसी आनुवंशिक स्थितियाँ"),
      b("Untreated thyroid deficiency at birth, severe malnutrition, brain infections", "जन्म के समय थायरॉइड की कमी का इलाज न होना, गंभीर कुपोषण, दिमाग़ी संक्रमण"),
    ],
    diagnosis: [
      b("Standardised IQ and adaptive behaviour assessment", "मानक IQ और रोज़मर्रा के व्यवहार (अडैप्टिव) की जाँच"),
      b("Search for treatable causes and associated epilepsy, hearing or vision problems", "इलाज योग्य कारणों और साथ में मिर्गी, सुनने या देखने की समस्याओं की खोज"),
      b("Disability certification for government benefits", "सरकारी लाभ के लिए दिव्यांगता प्रमाणपत्र"),
    ],
    psychotherapy: [
      b("Special education and skills training", "विशेष शिक्षा और कौशल प्रशिक्षण"),
      b("Behavioural support for aggression or self-injury", "आक्रामकता या ख़ुद को चोट पहुँचाने के व्यवहार के लिए सहारा"),
    ],
    family: [
      b("Focus on independence in daily skills step by step", "रोज़ के कौशलों में धीरे-धीरे आत्मनिर्भरता पर ध्यान दें"),
      b("Connect with special schools and parent support groups", "विशेष स्कूलों और अभिभावक सहायता समूहों से जुड़ें"),
    ],
    videoKeywords: ["intellectual disability", "मंदबुद्धि"],
    keywords: ["mandbuddhi", "slow learner", "IQ"],
  },
  "odd-conduct-disorder-india": {
    group: "child",
    icd: { icd10: "F91.3, F91", icd11: "6C90, 6C91", note: b("Oppositional defiant disorder / conduct-dissocial disorder.", "ऑपोज़िशनल डिफ़ायंट डिसऑर्डर / कंडक्ट-डिससोशल डिसऑर्डर।") },
    riskFactors: [
      b("Harsh or inconsistent discipline; conflict between parents", "सख़्त या असंगत अनुशासन; माता-पिता में कलह"),
      b("ADHD and learning difficulties", "ADHD और सीखने की कठिनाई"),
      b("Exposure to violence or peers involved in substance use", "हिंसा का माहौल या नशा करने वाले दोस्त"),
    ],
    diagnosis: [
      b("Pattern of anger, arguing and defiance (ODD), or rule-breaking, aggression and stealing (conduct disorder) for at least six months", "कम से कम छह महीने से गुस्सा, बहस और ज़िद (ODD), या नियम तोड़ना, आक्रामकता और चोरी (कंडक्ट डिसऑर्डर)"),
      b("Checking for ADHD, depression, learning disorder and substance use", "ADHD, डिप्रेशन, सीखने की समस्या और नशे की जाँच"),
    ],
    psychotherapy: [
      b("Parent management training — the most effective treatment", "पेरेंट मैनेजमेंट ट्रेनिंग — सबसे असरदार इलाज"),
      b("Anger-management and problem-solving skills for the child", "बच्चे के लिए गुस्सा संभालने और समस्या सुलझाने के कौशल"),
    ],
    family: [
      b("Stay calm, give clear choices and follow through consistently", "शांत रहें, साफ़ विकल्प दें और लगातार उन पर अमल करें"),
      b("Avoid physical punishment — it increases aggression", "मारपीट से बचें — इससे आक्रामकता बढ़ती है"),
    ],
    videoKeywords: ["child anger", "behaviour", "ज़िद"],
    keywords: ["zid", "gussa", "badtameezi", "behaviour problem"],
  },
  "tic-tourette-movement-disorders-india": {
    group: "child",
    icd: { icd10: "F95", icd11: "8A05.0", note: b("ICD-11 lists primary tics in the neurology chapter (Tourette syndrome 8A05.00), with a cross-reference in mental disorders.", "ICD-11 में टिक्स न्यूरोलॉजी अध्याय में हैं (टूरेट सिंड्रोम 8A05.00), मानसिक विकारों में संदर्भ के साथ।") },
    riskFactors: [
      b("Tics, OCD or ADHD in the family", "परिवार में टिक्स, OCD या ADHD"),
      b("Stress, excitement and tiredness make tics worse", "तनाव, उत्साह और थकान से टिक्स बढ़ते हैं"),
    ],
    diagnosis: [
      b("Clinical observation and history — no blood test or scan is needed in typical cases", "निरीक्षण और इतिहास — सामान्य मामलों में ख़ून की जाँच या स्कैन ज़रूरी नहीं"),
      b("Checking for associated ADHD, OCD and anxiety", "साथ में ADHD, OCD और घबराहट की जाँच"),
    ],
    psychotherapy: [
      b("Habit reversal training / CBIT — evidence-based behavioural therapy for tics", "हैबिट रिवर्सल ट्रेनिंग / CBIT — टिक्स के लिए प्रमाणित व्यवहार थेरेपी"),
    ],
    family: [
      b("Ignore the tics rather than pointing them out; scolding makes them worse", "टिक्स की ओर इशारा करने के बजाय नज़रअंदाज़ करें; डाँटने से बढ़ते हैं"),
      b("Inform teachers so the child is not punished for tics", "शिक्षकों को बताएँ ताकि टिक्स के लिए बच्चे को सज़ा न मिले"),
    ],
    videoKeywords: ["tics", "tourette"],
    keywords: ["tics", "aankh jhapakna", "jhatke"],
  },
  "geriatric-psychiatry-india": {
    group: "geriatric",
    riskFactors: [
      b("Several medical illnesses and many medicines", "कई शारीरिक बीमारियाँ और बहुत सारी दवाएँ"),
      b("Hearing or vision loss, loneliness, loss of a spouse", "सुनने या देखने में कमी, अकेलापन, जीवनसाथी को खोना"),
      b("Previous depression or alcohol use", "पहले डिप्रेशन या शराब का सेवन"),
    ],
    diagnosis: [
      b("Assessment of mood, memory, sleep and behaviour, with family input", "परिवार की जानकारी के साथ मूड, याददाश्त, नींद और व्यवहार की जाँच"),
      b("Medicine review to stop drugs that worsen confusion or falls", "दवाओं की समीक्षा ताकि भ्रम या गिरने का ख़तरा बढ़ाने वाली दवाएँ हटें"),
      b("Basic blood tests and brain scan when indicated", "ज़रूरत हो तो ख़ून की बुनियादी जाँच और ब्रेन स्कैन"),
    ],
    psychotherapy: [
      b("Supportive and problem-solving therapy adapted for older adults", "बुज़ुर्गों के अनुसार सपोर्टिव और प्रॉब्लम-सॉल्विंग थेरेपी"),
      b("Caregiver guidance and respite planning", "देखभाल करने वालों के लिए मार्गदर्शन और आराम की योजना"),
    ],
    family: [
      b("Keep a single updated list of all medicines and doses", "सभी दवाओं और डोज़ की एक अपडेट सूची रखें"),
      b("Encourage daily activity, social contact and safe walking", "रोज़ की गतिविधि, लोगों से मिलना-जुलना और सुरक्षित सैर को बढ़ावा दें"),
    ],
    selfTests: ["phq9"],
    videoKeywords: ["elderly", "old age", "बुज़ुर्ग"],
    keywords: ["buzurg", "budhapa", "old age", "elderly"],
  },
  "delirium-confusion-elderly-india": {
    group: "geriatric",
    icd: { icd10: "F05", icd11: "6D70" },
    riskFactors: [
      b("Older age, dementia, poor eyesight or hearing", "ज़्यादा उम्र, डिमेंशिया, कमज़ोर नज़र या सुनना"),
      b("Infections (urine, chest), dehydration, surgery, low sodium", "संक्रमण (पेशाब, छाती), पानी की कमी, ऑपरेशन, सोडियम की कमी"),
      b("New medicines, sleeping pills, or alcohol withdrawal", "नई दवाएँ, नींद की गोलियाँ, या शराब छोड़ने के लक्षण"),
    ],
    diagnosis: [
      b("Sudden onset of confusion that fluctuates over the day — a medical emergency", "अचानक भ्रम जो दिन भर घटता-बढ़ता रहे — मेडिकल इमरजेंसी"),
      b("Urgent tests for infection, sugar, salts, kidney and liver function", "संक्रमण, शुगर, नमक, किडनी और लिवर की तुरंत जाँच"),
    ],
    psychotherapy: [
      b("Reorientation: clock, calendar, familiar faces, glasses and hearing aids", "पहचान दिलाना: घड़ी, कैलेंडर, जाने-पहचाने चेहरे, चश्मा और सुनने की मशीन"),
    ],
    family: [
      b("Stay with the person, speak calmly and keep lights on in the evening", "व्यक्ति के साथ रहें, शांति से बोलें और शाम को रोशनी रखें"),
      b("Seek urgent medical care — delirium usually has a treatable physical cause", "तुरंत डॉक्टरी इलाज लें — डेलिरियम की वजह आमतौर पर इलाज योग्य शारीरिक बीमारी होती है"),
    ],
    videoKeywords: ["delirium", "confusion"],
    keywords: ["bhram", "confusion", "bahki baatein"],
  },
  "late-life-depression-india": {
    group: "geriatric",
    icd: { icd10: "F32, F33", icd11: "6A70, 6A71" },
    riskFactors: [
      b("Chronic illness, pain, disability", "पुरानी बीमारी, दर्द, अक्षमता"),
      b("Bereavement, retirement, living alone", "किसी अपने का जाना, रिटायरमेंट, अकेले रहना"),
      b("Stroke and other brain blood-vessel disease", "लकवा और दिमाग़ की दूसरी नसों की बीमारी"),
    ],
    diagnosis: [
      b("Depression in older adults often shows as body complaints, poor sleep or memory problems", "बुज़ुर्गों में डिप्रेशन अक्सर शारीरिक शिकायत, ख़राब नींद या याददाश्त की समस्या के रूप में दिखता है"),
      b("Separating depression from early dementia", "डिप्रेशन को शुरुआती डिमेंशिया से अलग करना"),
      b("Checking medicines, thyroid, B12 and sodium", "दवाएँ, थायरॉइड, B12 और सोडियम की जाँच"),
    ],
    psychotherapy: [
      b("Problem-solving therapy and behavioural activation", "प्रॉब्लम-सॉल्विंग थेरेपी और बिहेवियरल एक्टिवेशन"),
      b("Reminiscence and supportive therapy", "यादों पर आधारित और सपोर्टिव थेरेपी"),
    ],
    family: [
      b("Regular visits or calls reduce loneliness", "नियमित मिलना या फ़ोन करना अकेलापन कम करता है"),
      b("Take hopeless talk seriously — suicide risk is higher in older men", "निराशा की बातों को गंभीरता से लें — बुज़ुर्ग पुरुषों में आत्महत्या का जोखिम ज़्यादा है"),
    ],
    selfTests: ["phq9"],
    videoKeywords: ["depression", "elderly", "डिप्रेशन"],
    keywords: ["budhape me udasi", "elderly depression"],
  },
  "dementia-memory-clinic-india": {
    group: "dementia",
    icd: { icd10: "F00–F03", icd11: "6D80–6D8Z", note: b("Dementia (by cause: Alzheimer disease, vascular, Lewy body, frontotemporal, others).", "डिमेंशिया (कारण के अनुसार: अल्ज़ाइमर, वैस्कुलर, लेवी बॉडी, फ़्रंटोटेम्पोरल, अन्य)।") },
    riskFactors: [
      b("Age over 65", "65 वर्ष से ज़्यादा उम्र"),
      b("High blood pressure, diabetes, smoking, high cholesterol", "हाई ब्लड प्रेशर, डायबिटीज़, धूम्रपान, बढ़ा कोलेस्ट्रॉल"),
      b("Untreated hearing loss, physical inactivity, depression, social isolation", "बिना इलाज के कम सुनना, शारीरिक निष्क्रियता, डिप्रेशन, अकेलापन"),
      b("Head injuries and heavy alcohol use", "सिर की चोट और ज़्यादा शराब"),
    ],
    diagnosis: [
      b("Memory and thinking tests; history from a family member", "याददाश्त और सोचने की जाँच; परिवार के सदस्य से इतिहास"),
      b("Blood tests (B12, thyroid, sugar) and brain imaging to find treatable causes", "इलाज योग्य कारण खोजने के लिए ख़ून की जाँच (B12, थायरॉइड, शुगर) और ब्रेन इमेजिंग"),
      b("Assessment of daily functioning and safety", "रोज़ के कामकाज और सुरक्षा का आकलन"),
    ],
    psychotherapy: [
      b("Cognitive stimulation activities", "कॉग्निटिव स्टिमुलेशन गतिविधियाँ"),
      b("Caregiver education and support", "देखभाल करने वालों को जानकारी और सहारा"),
    ],
    family: [
      b("Keep routines simple and the home safe (lighting, rails, gas)", "दिनचर्या सरल और घर सुरक्षित रखें (रोशनी, रेलिंग, गैस)"),
      b("Plan legal and financial matters early, while the person can take part", "क़ानूनी और आर्थिक मामले जल्दी तय करें, जब तक व्यक्ति भाग ले सकता है"),
    ],
    videoKeywords: ["dementia", "memory", "भूलने", "याददाश्त"],
    keywords: ["bhoolna", "yaad nahi rehta", "memory loss", "alzheimer"],
  },
  "neuropsychiatry-india": {
    group: "neuro",
    riskFactors: [
      b("Epilepsy, stroke, head injury, Parkinson's disease, migraine", "मिर्गी, लकवा, सिर की चोट, पार्किंसन, माइग्रेन"),
      b("Brain infections and autoimmune conditions", "दिमाग़ी संक्रमण और ऑटोइम्यून बीमारियाँ"),
    ],
    diagnosis: [
      b("Joint review of neurological findings, scans and EEG with psychiatric assessment", "न्यूरोलॉजिकल जाँच, स्कैन और EEG की मनोरोग जाँच के साथ समीक्षा"),
      b("Cognitive testing where memory or attention is affected", "याददाश्त या ध्यान प्रभावित हो तो कॉग्निटिव जाँच"),
    ],
    psychotherapy: [
      b("Adjustment counselling and CBT for depression and anxiety after brain illness", "दिमाग़ी बीमारी के बाद डिप्रेशन और घबराहट के लिए काउंसलिंग और CBT"),
    ],
    family: [
      b("Personality or mood change after brain illness can be part of the illness; tell the doctor", "दिमाग़ी बीमारी के बाद स्वभाव या मूड में बदलाव बीमारी का हिस्सा हो सकता है; डॉक्टर को बताएँ"),
    ],
    videoKeywords: ["neuropsychiatry", "brain"],
    keywords: ["dimag", "nervous system", "brain"],
  },
  "post-stroke-depression-india": {
    group: "neuro",
    icd: { icd10: "F06.32", icd11: "6E62", note: b("Mood disorder due to a medical (brain) condition.", "शारीरिक (दिमाग़ी) बीमारी के कारण मूड विकार।") },
    riskFactors: [
      b("Severe disability after stroke", "लकवे के बाद गंभीर अक्षमता"),
      b("Previous depression; little family support", "पहले डिप्रेशन; परिवार का कम सहारा"),
    ],
    diagnosis: [
      b("Screening for depression in the first months after stroke", "लकवे के बाद पहले महीनों में डिप्रेशन की जाँच"),
      b("Distinguishing depression from apathy and emotional lability (sudden crying or laughing)", "डिप्रेशन को उदासीनता और अचानक रोने/हँसने (इमोशनल लेबिलिटी) से अलग करना"),
    ],
    psychotherapy: [
      b("Supportive counselling and goal-setting alongside physiotherapy", "फ़िज़ियोथेरेपी के साथ सपोर्टिव काउंसलिंग और लक्ष्य तय करना"),
    ],
    family: [
      b("Celebrate small gains in rehabilitation", "पुनर्वास में छोटे सुधारों का उत्सव मनाएँ"),
      b("Treating depression improves recovery of movement and independence", "डिप्रेशन के इलाज से चलने-फिरने और आत्मनिर्भरता में सुधार बेहतर होता है"),
    ],
    selfTests: ["phq9"],
    videoKeywords: ["stroke", "लकवा"],
    keywords: ["lakwa", "paralysis", "stroke"],
  },
  "womens-mental-health-india": {
    group: "women",
    riskFactors: [
      b("Hormonal transitions: periods, pregnancy, after childbirth, menopause", "हार्मोनल बदलाव: माहवारी, गर्भावस्था, डिलीवरी के बाद, मेनोपॉज़"),
      b("Domestic violence, caregiving burden, infertility", "घरेलू हिंसा, देखभाल का बोझ, संतान न होना"),
      b("Previous depression or anxiety", "पहले डिप्रेशन या घबराहट"),
    ],
    diagnosis: [
      b("Assessment in a private, safe setting", "निजी और सुरक्षित माहौल में जाँच"),
      b("Choosing treatment that is safe during pregnancy and breastfeeding", "ऐसा इलाज चुनना जो गर्भावस्था और स्तनपान में सुरक्षित हो"),
    ],
    psychotherapy: [
      b("CBT and interpersonal therapy; couple or family sessions when helpful", "CBT और इंटरपर्सनल थेरेपी; ज़रूरत हो तो दंपति या परिवार के साथ सत्र"),
    ],
    family: [
      b("Share household and childcare work", "घर और बच्चे की देखभाल का काम बाँटें"),
      b("Respect her choice of when and how to seek help", "मदद कब और कैसे लेनी है, उसके फ़ैसले का सम्मान करें"),
    ],
    selfTests: ["phq9", "gad7"],
    videoKeywords: ["women", "महिला", "postpartum"],
    keywords: ["mahila", "women", "pregnancy", "menopause"],
  },
  "student-exam-stress-india": {
    group: "student",
    riskFactors: [
      b("High expectations, comparison and fear of failure", "बहुत ज़्यादा उम्मीदें, तुलना और असफलता का डर"),
      b("Living away from home in hostels or PGs", "घर से दूर हॉस्टल या PG में रहना"),
      b("Poor sleep and excessive screen use", "ख़राब नींद और ज़्यादा स्क्रीन"),
    ],
    diagnosis: [
      b("Checking whether stress has become anxiety disorder, depression or burnout", "देखना कि तनाव घबराहट की बीमारी, डिप्रेशन या बर्नआउट तो नहीं बन गया"),
      b("Asking about sleep, appetite, concentration and safety", "नींद, भूख, ध्यान और सुरक्षा के बारे में पूछना"),
    ],
    psychotherapy: [
      b("CBT for test anxiety and perfectionism", "परीक्षा की घबराहट और परफ़ेक्शनिज़्म के लिए CBT"),
      b("Study-planning, sleep and relaxation skills", "पढ़ाई की योजना, नींद और रिलैक्सेशन के कौशल"),
    ],
    family: [
      b("Reduce pressure talk before exams; focus on routine and rest", "परीक्षा से पहले दबाव की बातें कम करें; दिनचर्या और आराम पर ध्यान दें"),
      b("Discuss alternative careers openly so one result does not feel like everything", "दूसरे करियर विकल्पों पर खुलकर बात करें ताकि एक नतीजा ही सब कुछ न लगे"),
    ],
    selfTests: ["study-stress", "gad7"],
    videoKeywords: ["exam stress", "student", "परीक्षा"],
    keywords: ["pariksha", "exam", "padhai", "tanav", "board exam"],
  },
  "deaddiction-psychiatrist-india": {
    group: "substance",
    riskFactors: [
      b("Starting substance use in teenage years", "किशोरावस्था में नशा शुरू करना"),
      b("Addiction in the family; easy availability", "परिवार में नशा; आसानी से उपलब्ध होना"),
      b("Untreated depression, anxiety, ADHD or trauma", "बिना इलाज के डिप्रेशन, घबराहट, ADHD या आघात"),
    ],
    diagnosis: [
      b("Detailed history of each substance: amount, frequency, last use and withdrawal", "हर नशे का पूरा इतिहास: मात्रा, कितनी बार, आख़िरी बार और छोड़ने के लक्षण"),
      b("Physical examination and blood tests (liver, kidney, blood count, infections when relevant)", "शारीरिक जाँच और ख़ून की जाँच (लिवर, किडनी, ब्लड काउंट, ज़रूरत हो तो संक्रमण)"),
      b("Screening for depression, anxiety and suicidal thoughts", "डिप्रेशन, घबराहट और आत्महत्या के विचारों की जाँच"),
    ],
    psychotherapy: [
      b("Motivational interviewing to build readiness to change", "बदलाव के लिए तैयारी बढ़ाने हेतु मोटिवेशनल इंटरव्यूइंग"),
      b("Relapse-prevention counselling: triggers, cravings and refusal skills", "दोबारा नशा न हो इसके लिए काउंसलिंग: ट्रिगर, तलब और मना करने के कौशल"),
      b("Family counselling", "परिवार की काउंसलिंग"),
    ],
    family: [
      b("Avoid shaming, threats or locking the person up; these rarely work", "शर्मिंदा करना, धमकी या बंद करना अक्सर काम नहीं करता"),
      b("Reward sober days and support treatment visits", "बिना नशे के दिनों की सराहना करें और इलाज में साथ दें"),
    ],
    selfTests: ["audit", "drugs", "tobacco"],
    videoKeywords: ["addiction", "नशा", "nasha mukti"],
    keywords: ["nasha", "nasha mukti", "rehab", "de addiction"],
  },
  "alcohol-addiction-treatment-india": {
    group: "substance",
    icd: { icd10: "F10", icd11: "6C40" },
    riskFactors: [
      b("Drinking daily or in binges; starting young", "रोज़ या एक बार में बहुत ज़्यादा पीना; कम उम्र में शुरुआत"),
      b("Alcohol problems in the family", "परिवार में शराब की समस्या"),
      b("Using alcohol for sleep, stress or pain", "नींद, तनाव या दर्द के लिए शराब पीना"),
    ],
    diagnosis: [
      b("AUDIT questionnaire and history of drinking pattern and withdrawal", "AUDIT प्रश्नावली और पीने के तरीके व छोड़ने के लक्षणों का इतिहास"),
      b("Liver function tests and blood count", "लिवर की जाँच (LFT) और ब्लड काउंट"),
      b("Assessing risk of severe withdrawal (fits, delirium) to decide home or supervised detox", "गंभीर लक्षणों (दौरे, डेलिरियम) का जोखिम देखकर घर पर या निगरानी में डिटॉक्स तय करना"),
    ],
    psychotherapy: [
      b("Motivational enhancement and CBT-based relapse prevention", "मोटिवेशनल एन्हांसमेंट और CBT-आधारित रिलैप्स प्रिवेंशन"),
      b("Family involvement and support groups", "परिवार की भागीदारी और सहायता समूह"),
    ],
    family: [
      b("Never stop someone's heavy drinking suddenly at home without medical advice — withdrawal can cause fits", "डॉक्टर की सलाह के बिना घर पर ज़्यादा पीने वाले की शराब अचानक न छुड़वाएँ — इससे दौरे पड़ सकते हैं"),
      b("Do not hide or secretly mix medicines in food", "खाने में चुपके से दवा न मिलाएँ"),
      b("Talk when the person is sober, using \"I\" statements about your worries", "व्यक्ति के होश में होने पर बात करें, अपनी चिंता \"मुझे\" वाले वाक्यों में कहें"),
    ],
    extra: [
      {
        id: "withdrawal-warning",
        tone: "warning",
        title: b("Alcohol withdrawal can be dangerous", "शराब छोड़ने के लक्षण ख़तरनाक हो सकते हैं"),
        items: [
          b("In people who drink daily, stopping suddenly can cause tremors, sweating, sleeplessness and, in some, fits or delirium tremens (severe confusion) within 1–3 days.", "रोज़ पीने वाले अचानक छोड़ें तो 1–3 दिन में हाथ काँपना, पसीना, नींद न आना और कुछ लोगों में दौरे या डेलिरियम ट्रेमेंस (गंभीर भ्रम) हो सकता है।"),
          b("Withdrawal should be managed with medical supervision. Seek emergency care for fits, confusion, seeing things, high fever or severe vomiting.", "छोड़ने के लक्षणों का इलाज डॉक्टर की निगरानी में होना चाहिए। दौरे, भ्रम, चीज़ें दिखना, तेज़ बुख़ार या बहुत उल्टी हो तो तुरंत इमरजेंसी जाएँ।"),
        ],
      },
    ],
    selfTests: ["audit"],
    videoKeywords: ["alcohol", "शराब", "daru"],
    keywords: ["daru", "sharab", "peena", "drinking", "alcoholic"],
  },
  "opioid-smack-heroin-opium-doda-addiction-india": {
    group: "substance",
    icd: { icd10: "F11", icd11: "6C43" },
    riskFactors: [
      b("Easy availability of afeem and doda post in social settings", "सामाजिक मौक़ों पर अफ़ीम और डोडा पोस्त का आसानी से मिलना"),
      b("Using opioids for pain, fatigue or to work long hours", "दर्द, थकान या लंबे घंटे काम के लिए ओपिऑइड लेना"),
      b("Injecting drug use", "इंजेक्शन से नशा"),
    ],
    diagnosis: [
      b("History of the type of opioid, route, daily quantity and withdrawal", "किस तरह का ओपिऑइड, कैसे लेते हैं, रोज़ की मात्रा और छोड़ने के लक्षण"),
      b("Urine drug test when needed; tests for HIV, hepatitis B and C after injecting", "ज़रूरत हो तो पेशाब की जाँच; इंजेक्शन से नशे के बाद HIV, हेपेटाइटिस B व C की जाँच"),
    ],
    psychotherapy: [
      b("Relapse-prevention counselling and lifestyle restructuring", "रिलैप्स प्रिवेंशन काउंसलिंग और जीवनशैली में बदलाव"),
      b("Family counselling and vocational support", "परिवार की काउंसलिंग और रोज़गार में मदद"),
    ],
    family: [
      b("Learn the signs of overdose: very slow breathing, blue lips, cannot be woken — call 112", "ओवरडोज़ के संकेत जानें: बहुत धीमी साँस, नीले होंठ, जगाने पर न जागे — 112 पर कॉल करें"),
      b("After a period of abstinence, tolerance drops and the old dose can be fatal", "कुछ समय नशा छोड़ने के बाद सहनशक्ति घट जाती है और पुरानी मात्रा जानलेवा हो सकती है"),
    ],
    selfTests: ["drugs"],
    videoKeywords: ["afeem", "doda", "smack", "opium", "अफ़ीम"],
    keywords: ["afeem", "afim", "doda", "post", "smack", "chitta", "heroin"],
  },
  "tobacco-nicotine-addiction-treatment-india": {
    group: "substance",
    icd: { icd10: "F17", icd11: "6C4A" },
    riskFactors: [
      b("Starting in school years; family members who use tobacco", "स्कूल के समय शुरुआत; परिवार में तंबाकू सेवन"),
      b("Using tobacco with tea, after meals or during work breaks", "चाय के साथ, खाने के बाद या काम के ब्रेक में तंबाकू"),
    ],
    diagnosis: [
      b("Type and amount of tobacco, time to first use after waking, past quit attempts", "तंबाकू का प्रकार और मात्रा, उठने के बाद पहली बार कब, पहले छोड़ने की कोशिशें"),
      b("Mouth examination for white/red patches; lung check for smokers", "मुँह में सफ़ेद/लाल धब्बों की जाँच; धूम्रपान करने वालों के फेफड़ों की जाँच"),
    ],
    psychotherapy: [
      b("Brief behavioural counselling with a quit date and trigger plan", "छोड़ने की तारीख़ और ट्रिगर योजना के साथ छोटी व्यवहार काउंसलिंग"),
    ],
    family: [
      b("Make the home tobacco-free and support the quit date", "घर को तंबाकू-मुक्त बनाएँ और छोड़ने की तारीख़ में साथ दें"),
    ],
    selfTests: ["tobacco"],
    videoKeywords: ["tobacco", "gutka", "तंबाकू"],
    keywords: ["gutka", "gutkha", "khaini", "bidi", "cigarette", "tambaku"],
  },
  "cannabis-ganja-charas-hash-addiction-india": {
    group: "substance",
    icd: { icd10: "F12", icd11: "6C41" },
    riskFactors: [
      b("Starting in teenage years; daily use", "किशोरावस्था में शुरुआत; रोज़ाना सेवन"),
      b("Family history of psychosis", "परिवार में मनोविकृति"),
    ],
    diagnosis: [
      b("Pattern of use, withdrawal (irritability, poor sleep) and effects on studies or work", "सेवन का तरीका, छोड़ने के लक्षण (चिड़चिड़ापन, ख़राब नींद) और पढ़ाई या काम पर असर"),
      b("Screening for psychosis, depression and anxiety", "मनोविकृति, डिप्रेशन और घबराहट की जाँच"),
    ],
    psychotherapy: [
      b("Motivational interviewing and CBT", "मोटिवेशनल इंटरव्यूइंग और CBT"),
    ],
    family: [
      b("Watch for suspiciousness, hearing voices or aggression — seek help urgently", "शक, आवाज़ें सुनना या आक्रामकता दिखे तो तुरंत मदद लें"),
    ],
    selfTests: ["drugs"],
    videoKeywords: ["ganja", "cannabis", "गांजा"],
    keywords: ["ganja", "charas", "bhang", "weed", "maal"],
  },
  "substance-use-disorders-treatment-india": {
    group: "substance",
    icd: { icd10: "F10–F19", icd11: "6C40–6C4Z", note: b("Disorders due to substance use (group).", "पदार्थ सेवन से होने वाले विकार (समूह)।") },
    riskFactors: [
      b("Using more than one substance together", "एक साथ एक से ज़्यादा नशे"),
      b("Mental illness, trauma or chronic pain", "मानसिक बीमारी, आघात या पुराना दर्द"),
    ],
    diagnosis: [
      b("Complete history of all substances, including prescription pills and cough syrups", "सभी नशों का पूरा इतिहास, पर्चे वाली गोलियों और कफ़ सिरप सहित"),
      b("Medical tests to check organ damage and infections", "अंगों पर असर और संक्रमण की जाँच"),
    ],
    psychotherapy: [
      b("Motivational, CBT and relapse-prevention counselling", "मोटिवेशनल, CBT और रिलैप्स प्रिवेंशन काउंसलिंग"),
    ],
    family: [
      b("Support treatment and set clear, consistent boundaries", "इलाज में साथ दें और साफ़, एक जैसी सीमाएँ तय करें"),
    ],
    selfTests: ["drugs", "audit"],
    videoKeywords: ["addiction", "नशा"],
    keywords: ["nasha", "goli", "cough syrup", "pills", "drugs"],
  },
  "internet-addiction-treatment-india": {
    group: "behavioural",
    icd: { note: b("No separate ICD-10 or ICD-11 diagnosis; gaming disorder (6C51) is classified when gaming is the main problem.", "ICD-10 या ICD-11 में अलग निदान नहीं; जब गेमिंग मुख्य समस्या हो तो गेमिंग डिसऑर्डर (6C51)।") },
    riskFactors: [
      b("Loneliness, social anxiety, depression or ADHD", "अकेलापन, सामाजिक घबराहट, डिप्रेशन या ADHD"),
      b("Unrestricted phone access at night", "रात में बिना रोक-टोक फ़ोन"),
    ],
    diagnosis: [
      b("Time spent, loss of control, and effects on sleep, studies, work and relationships", "लगने वाला समय, नियंत्रण खोना, और नींद, पढ़ाई, काम व रिश्तों पर असर"),
      b("Looking for underlying anxiety, depression or ADHD", "पीछे छिपी घबराहट, डिप्रेशन या ADHD की खोज"),
    ],
    psychotherapy: [
      b("CBT with a step-by-step reduction plan and alternative activities", "क़दम-दर-क़दम कमी की योजना और दूसरी गतिविधियों के साथ CBT"),
    ],
    family: [
      b("Agree on screen-free times (meals, after 10 pm) for the whole family", "पूरे परिवार के लिए बिना स्क्रीन के समय तय करें (खाना, रात 10 बजे के बाद)"),
    ],
    extra: [
      {
        id: "dependence-relapse",
        tone: "info",
        title: b("Dependence, 'withdrawal' and relapse", "निर्भरता, छोड़ने पर बेचैनी और दोबारा शुरू होना"),
        items: [
          b("Dependence shows as needing more screen time to feel satisfied and being unable to cut down despite trying.", "निर्भरता में संतुष्टि के लिए ज़्यादा स्क्रीन टाइम चाहिए होता है और कोशिश के बावजूद कम नहीं हो पाता।"),
          b("There is no dangerous physical withdrawal, but irritability, restlessness, low mood and strong urges are common in the first 1–2 weeks of cutting down.", "शरीर पर ख़तरनाक असर नहीं होता, पर कम करने के पहले 1–2 हफ़्तों में चिड़चिड़ापन, बेचैनी, उदासी और तेज़ तलब आम है।"),
          b("Relapse is common at night, when bored or stressed. Plan for these triggers and treat a slip as a learning point, not failure.", "रात में, ऊब या तनाव में दोबारा शुरू होना आम है। इन कारणों के लिए योजना बनाएँ और फिसलन को असफलता नहीं, सीख मानें।"),
        ],
      },
    ],
    videoKeywords: ["mobile addiction", "internet", "मोबाइल"],
    keywords: ["mobile ki lat", "phone addiction", "reels", "social media"],
  },
  "gaming-disorder-treatment-india": {
    group: "behavioural",
    icd: { icd11: "6C51", note: b("Gaming disorder is recognised in ICD-11 (not in ICD-10).", "गेमिंग डिसऑर्डर ICD-11 में शामिल है (ICD-10 में नहीं)।") },
    riskFactors: [
      b("Online multiplayer games with rewards and in-game purchases", "इनाम और गेम में ख़रीदारी वाले ऑनलाइन मल्टीप्लेयर गेम"),
      b("ADHD, social anxiety, depression or bullying", "ADHD, सामाजिक घबराहट, डिप्रेशन या धमकाया जाना"),
    ],
    diagnosis: [
      b("Impaired control, gaming taking priority over other activities, continuing despite harm — usually for 12 months", "नियंत्रण में कमी, गेमिंग को बाक़ी कामों से ज़्यादा प्राथमिकता, नुकसान के बावजूद जारी — आमतौर पर 12 महीने से"),
    ],
    psychotherapy: [
      b("CBT and family-based plans with gradual limits", "धीरे-धीरे सीमाओं वाली CBT और परिवार-आधारित योजना"),
    ],
    family: [
      b("Avoid sudden total bans or snatching phones — they often cause aggression", "अचानक पूरी रोक या फ़ोन छीनने से बचें — इससे अक्सर आक्रामकता होती है"),
      b("Replace gaming time with sport, hobbies or family activity", "गेमिंग का समय खेल, शौक या परिवार की गतिविधि से बदलें"),
    ],
    selfTests: ["study-stress"],
    extra: [
      {
        id: "dependence-relapse",
        tone: "info",
        title: b("Dependence, 'withdrawal' and relapse", "निर्भरता, छोड़ने पर बेचैनी और दोबारा शुरू होना"),
        items: [
          b("Gaming dependence means gaming has taken priority over sleep, studies, food and family, and control is lost.", "गेमिंग पर निर्भरता का मतलब है कि नींद, पढ़ाई, खाना और परिवार से ज़्यादा गेमिंग प्राथमिक हो गया और नियंत्रण खो गया।"),
          b("On stopping, anger, restlessness, sadness and sleep problems are common for a few weeks; sudden bans make these worse.", "बंद करने पर कुछ हफ़्ते ग़ुस्सा, बेचैनी, उदासी और नींद की दिक़्क़त आम है; अचानक रोक से ये बढ़ते हैं।"),
          b("Relapse often follows exams, holidays or new game releases — agree on a relapse-prevention plan in advance.", "दोबारा शुरुआत अक्सर परीक्षा, छुट्टियों या नए गेम आने पर होती है — पहले से रिलैप्स रोकथाम योजना तय करें।"),
        ],
      },
    ],
    videoKeywords: ["gaming", "pubg", "free fire", "गेम"],
    keywords: ["game", "pubg", "bgmi", "free fire", "gaming"],
  },
  "gambling-disorder-treatment-india": {
    group: "behavioural",
    icd: { icd10: "F63.0", icd11: "6C50" },
    riskFactors: [
      b("Online betting apps, fantasy sports and \"satta\"", "ऑनलाइन बेटिंग ऐप, फ़ैंटेसी स्पोर्ट्स और \"सट्टा\""),
      b("Alcohol use, ADHD, depression or money stress", "शराब, ADHD, डिप्रेशन या पैसों का तनाव"),
    ],
    diagnosis: [
      b("Chasing losses, borrowing or lying to gamble, failed attempts to stop", "हारे पैसे वापस पाने का पीछा, जुए के लिए उधार या झूठ, छोड़ने की नाकाम कोशिशें"),
      b("Assessment of debt, family impact and suicide risk", "कर्ज़, परिवार पर असर और आत्महत्या के जोखिम का आकलन"),
    ],
    psychotherapy: [
      b("CBT for gambling urges and thinking errors", "जुए की इच्छा और सोच की ग़लतियों के लिए CBT"),
      b("Financial counselling and self-exclusion from betting apps", "आर्थिक काउंसलिंग और बेटिंग ऐप से ख़ुद को ब्लॉक करना"),
    ],
    family: [
      b("Do not repay gambling debts without a treatment plan", "इलाज की योजना के बिना जुए का कर्ज़ न चुकाएँ"),
      b("Temporarily control access to money and cards, with agreement", "सहमति से कुछ समय पैसे और कार्ड का नियंत्रण अपने पास रखें"),
    ],
    extra: [
      {
        id: "dependence-relapse",
        tone: "warning",
        title: b("Dependence, 'withdrawal' and relapse", "निर्भरता, छोड़ने पर बेचैनी और दोबारा शुरू होना"),
        items: [
          b("Needing to bet larger amounts for the same excitement is a sign of dependence.", "उसी रोमांच के लिए बड़ी रक़म लगानी पड़े तो यह निर्भरता का संकेत है।"),
          b("When stopping, restlessness, irritability and intense urges to 'win it back' are common; debt can bring hopelessness — suicide risk must be asked about.", "छोड़ने पर बेचैनी, चिड़चिड़ापन और 'पैसा वापस जीतने' की तीव्र इच्छा आम है; कर्ज़ से निराशा आ सकती है — आत्महत्या के जोखिम के बारे में पूछना ज़रूरी है।"),
          b("Relapse risk is highest around salary days, big matches and festivals. Self-exclusion, blocking apps and money controls reduce it.", "वेतन के दिन, बड़े मैच और त्योहारों पर दोबारा शुरू होने का जोखिम सबसे ज़्यादा है। ख़ुद को ब्लॉक करना, ऐप बंद करना और पैसों का नियंत्रण इसे घटाते हैं।"),
        ],
      },
    ],
    videoKeywords: ["gambling", "betting", "सट्टा"],
    keywords: ["satta", "jua", "betting", "online betting", "teen patti"],
  },
  "problematic-pornography-use-treatment-india": {
    group: "behavioural",
    icd: { note: b("Not a separate diagnosis; when strict criteria are met, ICD-11 may use compulsive sexual behaviour disorder (6C72).", "अलग निदान नहीं; सख़्त मानदंड पूरे हों तो ICD-11 में कंपल्सिव सेक्शुअल बिहेवियर डिसऑर्डर (6C72)।") },
    riskFactors: [
      b("Using pornography to cope with stress, loneliness or low mood", "तनाव, अकेलेपन या उदासी से निपटने के लिए पोर्नोग्राफ़ी"),
      b("Late-night phone use", "देर रात फ़ोन चलाना"),
    ],
    diagnosis: [
      b("Understanding the pattern, distress and impact, without judgement", "बिना जज किए पैटर्न, परेशानी और असर को समझना"),
      b("Screening for anxiety, depression and sexual performance concerns", "घबराहट, डिप्रेशन और यौन प्रदर्शन की चिंता की जाँच"),
    ],
    psychotherapy: [
      b("CBT for urges, triggers and healthy routines", "इच्छा, ट्रिगर और स्वस्थ दिनचर्या के लिए CBT"),
    ],
    family: [
      b("Partners: discuss calmly; couples counselling can help rebuild trust", "जीवनसाथी: शांति से बात करें; दंपति काउंसलिंग भरोसा फिर से बनाने में मदद कर सकती है"),
    ],
    videoKeywords: ["porn addiction"],
    keywords: ["porn", "masturbation", "hastmaithun"],
  },
  "erectile-dysfunction-treatment-india": {
    group: "sexual",
    icd: { icd10: "F52.2, N48.4", icd11: "HA01.1", note: b("Male erectile dysfunction (ICD-11 chapter on conditions related to sexual health).", "पुरुष इरेक्टाइल डिसफ़ंक्शन (ICD-11 में यौन स्वास्थ्य वाला अध्याय)।") },
    riskFactors: [
      b("Diabetes, high blood pressure, high cholesterol, smoking", "डायबिटीज़, हाई ब्लड प्रेशर, बढ़ा कोलेस्ट्रॉल, धूम्रपान"),
      b("Performance anxiety, depression, relationship stress", "प्रदर्शन की घबराहट, डिप्रेशन, रिश्तों का तनाव"),
      b("Alcohol and some medicines", "शराब और कुछ दवाएँ"),
    ],
    diagnosis: [
      b("History including morning erections — often present when the cause is psychological", "सुबह के इरेक्शन सहित इतिहास — मानसिक कारण में अक्सर मौजूद रहते हैं"),
      b("Blood sugar, lipids and testosterone when indicated", "ज़रूरत हो तो शुगर, लिपिड और टेस्टोस्टेरोन की जाँच"),
    ],
    psychotherapy: [
      b("Sex therapy: sensate focus exercises and reducing performance pressure", "सेक्स थेरेपी: सेंसेट फ़ोकस अभ्यास और प्रदर्शन का दबाव कम करना"),
      b("Couples sessions when relationship stress is involved", "रिश्तों का तनाव हो तो दंपति सत्र"),
    ],
    family: [
      b("Partners: avoid blame; ED is common and treatable", "जीवनसाथी: दोष न दें; ED आम है और इलाज योग्य है"),
    ],
    videoKeywords: ["erectile dysfunction", "ED", "नपुंसकता"],
    keywords: ["napunsakta", "erection", "ling me tanav", "kamzori"],
  },
  "premature-ejaculation-treatment-india": {
    group: "sexual",
    icd: { icd10: "F52.4", icd11: "HA03.0", note: b("Male early ejaculation.", "पुरुष शीघ्र स्खलन।") },
    riskFactors: [
      b("Anxiety, new relationships, infrequent sex", "घबराहट, नया रिश्ता, कम बार संबंध"),
      b("Erectile difficulty, prostate or thyroid problems in some", "कुछ में इरेक्शन की समस्या, प्रोस्टेट या थायरॉइड"),
    ],
    diagnosis: [
      b("Whether it has been present since the first experience (lifelong) or started later (acquired)", "शुरू से है (लाइफ़लॉन्ग) या बाद में शुरू हुआ (एक्वायर्ड)"),
      b("Checking for erectile problems and anxiety", "इरेक्शन की समस्या और घबराहट की जाँच"),
    ],
    psychotherapy: [
      b("Behavioural techniques (stop-start, squeeze) and anxiety reduction", "व्यवहार तकनीकें (स्टॉप-स्टार्ट, स्क्वीज़) और घबराहट कम करना"),
      b("Couple involvement improves results", "जीवनसाथी की भागीदारी से नतीजे बेहतर होते हैं"),
    ],
    family: [
      b("Partners: practise techniques together without pressure", "जीवनसाथी: बिना दबाव साथ में तकनीकों का अभ्यास करें"),
    ],
    videoKeywords: ["premature ejaculation", "शीघ्रपतन"],
    keywords: ["shighrapatan", "jaldi discharge", "PE", "timing"],
  },
  "dhat-syndrome-treatment-india": {
    group: "sexual",
    icd: { icd10: "F48.8", note: b("Dhat syndrome is listed in ICD-10 under F48.8 (other specified neurotic disorders); ICD-11 has no separate code.", "धात सिंड्रोम ICD-10 में F48.8 के अंतर्गत है; ICD-11 में अलग कोड नहीं।") },
    riskFactors: [
      b("Cultural beliefs that semen loss causes weakness", "यह मान्यता कि वीर्य निकलने से कमज़ोरी होती है"),
      b("Misleading advertisements by unqualified \"specialists\"", "अयोग्य \"विशेषज्ञों\" के भ्रामक विज्ञापन"),
      b("Anxiety and depression", "घबराहट और डिप्रेशन"),
    ],
    diagnosis: [
      b("Understanding the person's beliefs and worries respectfully", "व्यक्ति की मान्यताओं और चिंताओं को सम्मान से समझना"),
      b("Urine test if there is a genuine urinary symptom", "पेशाब में असली लक्षण हो तो पेशाब की जाँच"),
      b("Screening for depression, anxiety and sexual dysfunction", "डिप्रेशन, घबराहट और यौन समस्या की जाँच"),
    ],
    psychotherapy: [
      b("Accurate sex education: night emissions and masturbation are normal and do not cause weakness", "सही यौन शिक्षा: स्वप्नदोष और हस्तमैथुन सामान्य हैं, इनसे कमज़ोरी नहीं होती"),
      b("CBT for anxiety and body-focused worry", "घबराहट और शरीर पर केंद्रित चिंता के लिए CBT"),
    ],
    family: [
      b("Avoid spending on \"tonics\" and \"shakti\" medicines from roadside clinics", "सड़क किनारे के क्लिनिक की \"टॉनिक\" और \"शक्ति\" दवाओं पर पैसा न ख़र्च करें"),
    ],
    videoKeywords: ["dhat", "धात", "swapnadosh"],
    keywords: ["dhat", "swapnadosh", "virya", "night fall", "kamzori"],
  },
  "sex-specialist-india": {
    group: "sexual",
    diagnosis: [
      b("Confidential history of the concern, relationship and health", "समस्या, रिश्ते और सेहत का गोपनीय इतिहास"),
      b("Physical check and tests only when needed", "शारीरिक जाँच और टेस्ट सिर्फ़ ज़रूरत होने पर"),
    ],
    psychotherapy: [
      b("Psychosexual and couples counselling", "साइकोसेक्शुअल और दंपति काउंसलिंग"),
    ],
    family: [
      b("Partners are welcome to join the consultation", "जीवनसाथी परामर्श में शामिल हो सकते हैं"),
    ],
    videoKeywords: ["sexual health", "sexologist", "गुप्त रोग"],
    keywords: ["sexologist", "gupt rog", "sex doctor"],
  },
  "sex-specialist-ajmer": {
    group: "sexual",
    diagnosis: [
      b("Confidential history of the concern, relationship and general health", "समस्या, रिश्ते और सामान्य सेहत का गोपनीय इतिहास"),
      b("Screening for anxiety, depression, diabetes, BP, alcohol and tobacco", "घबराहट, डिप्रेशन, डायबिटीज़, बीपी, शराब और तंबाकू की जाँच"),
      b("Blood tests or physician referral only when needed", "ख़ून की जाँच या फ़िज़िशियन के पास भेजना सिर्फ़ ज़रूरत होने पर"),
    ],
    psychotherapy: [
      b("Psychosexual counselling and sensate-focus exercises", "साइकोसेक्सुअल काउंसलिंग और सेंसेट फ़ोकस अभ्यास"),
      b("Couples sessions when both partners wish", "दोनों साथी चाहें तो कपल सेशन"),
    ],
    family: [
      b("Partners can join the consultation; open, blame-free communication helps recovery", "साथी परामर्श में शामिल हो सकते हैं; खुली, बिना दोष वाली बातचीत से सुधार होता है"),
    ],
    videoKeywords: ["sexual health", "गुप्त रोग"],
    keywords: ["sexologist ajmer", "gupt rog ajmer"],
  },
  "psychotherapy-counselling": { group: "therapy", keywords: ["counselling", "counseling", "therapy", "psychologist"] },
  "online-psychiatrist-india": { group: "service" },
  "online-psychiatry-consultation": { group: "service" },
  "psychiatrist-ajmer": { group: "service", keywords: ["ajmer", "kishangarh", "beawar", "pushkar"] },
  "psychiatrist-rajasthan": { group: "service" },
};
