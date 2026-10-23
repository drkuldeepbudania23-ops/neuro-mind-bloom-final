import { batch } from "./_build";

type P = [string, string];
const PERSIST: P = ["Sleep problems lasting more than three months despite good habits", "अच्छी आदतों के बावजूद तीन महीने से ज़्यादा नींद की दिक़्क़त"];
const DAYTIME: P = ["Daytime sleepiness affecting work, study or driving", "दिन की नींद से काम, पढ़ाई या गाड़ी चलाने पर असर"];

export const SLEEP_ARTICLES = batch("sleep", [
  {
    slug: "sleep-hygiene-basics",
    title: ["Sleep hygiene: 10 habits for better sleep", "स्लीप हाइजीन: अच्छी नींद की 10 आदतें"],
    excerpt: ["Simple daily habits — fixed wake time, light, caffeine timing and a wind-down routine — that improve sleep without medicines.", "रोज़ की आसान आदतें — तय जागने का समय, रोशनी, चाय-कॉफ़ी का समय और सोने से पहले की दिनचर्या — जो बिना दवा नींद सुधारती हैं।"],
    related: ["insomnia-treatment-india", "sleep-disorders-psychiatrist-india", "sleep-problems-students-india"],
    refs: ["aasm-insomnia", "who-live-life"],
    intro: [
      ["Sleep hygiene means the daily habits and bedroom conditions that make good sleep more likely.", "स्लीप हाइजीन का मतलब है रोज़ की आदतें और कमरे का माहौल जो अच्छी नींद की संभावना बढ़ाते हैं।"],
      ["It is the foundation of every sleep treatment, though on its own it may not cure long-standing insomnia.", "यह हर नींद-उपचार की नींव है, हालाँकि पुरानी अनिद्रा अकेले इससे पूरी तरह ठीक न भी हो।"],
    ],
    key: [
      ["A fixed wake-up time matters more than a fixed bedtime", "तय सोने के समय से ज़्यादा तय जागने का समय मायने रखता है"],
      ["Morning daylight sets the body clock", "सुबह की धूप शरीर की घड़ी सेट करती है"],
      ["The bed should be linked with sleep, not with screens or worry", "बिस्तर को नींद से जोड़ें, स्क्रीन या चिंता से नहीं"],
    ],
    sym: [
      ["Taking more than 30 minutes to fall asleep", "सोने में 30 मिनट से ज़्यादा लगना"],
      ["Waking repeatedly or too early", "बार-बार या बहुत जल्दी नींद खुलना"],
      ["Feeling unrefreshed in the morning", "सुबह ताज़गी महसूस न होना"],
    ],
    cause: [
      ["Irregular sleep and wake times", "सोने-जागने का अनियमित समय"],
      ["Tea, coffee or energy drinks late in the day", "दिन में देर से चाय, कॉफ़ी या एनर्जी ड्रिंक"],
      ["Bright screens and stimulating content at night", "रात में तेज़ स्क्रीन और उत्तेजक कंटेंट"],
    ],
    risk: [
      ["Shift work or late-night study", "शिफ़्ट ड्यूटी या देर रात पढ़ाई"],
      ["Stress, anxiety or low mood", "तनाव, चिंता या उदासी"],
      ["Alcohol or tobacco use", "शराब या तंबाकू का सेवन"],
    ],
    mgmt: [
      ["Wake at the same time daily, including weekends", "रोज़, छुट्टी के दिन भी, एक ही समय पर उठें"],
      ["No caffeine after 2 pm; light dinner 2–3 hours before bed", "दोपहर 2 बजे के बाद कैफ़ीन नहीं; सोने से 2–3 घंटे पहले हल्का खाना"],
      ["30–60 minutes of screen-free wind-down: reading, warm bath, prayer", "30–60 मिनट बिना स्क्रीन: पढ़ना, गुनगुना स्नान, प्रार्थना"],
      ["If awake for about 20 minutes, get up and return when sleepy", "लगभग 20 मिनट जागते रहें तो उठ जाएँ, नींद आने पर लौटें"],
    ],
    help: [PERSIST, DAYTIME, ["Loud snoring or breathing pauses noticed by family", "परिवार को तेज़ खर्राटे या साँस रुकती दिखे"]],
    faq: [
      ["How many hours of sleep do adults need?", "वयस्कों को कितने घंटे नींद चाहिए?", "Most adults need about 7–9 hours, but feeling refreshed matters more than an exact number.", "ज़्यादातर वयस्कों को लगभग 7–9 घंटे चाहिए, पर सटीक संख्या से ज़्यादा ताज़गी महसूस होना मायने रखता है।"],
      ["Is a daytime nap bad?", "क्या दिन में झपकी लेना बुरा है?", "A short nap of 20–30 minutes before 3 pm is fine for most people; long or late naps can disturb night sleep.", "दोपहर 3 बजे से पहले 20–30 मिनट की झपकी ज़्यादातर लोगों के लिए ठीक है; लंबी या देर की झपकी रात की नींद बिगाड़ सकती है।"],
    ],
    tags: ["neend", "sleep tips", "insomnia", "neend nahi aati"],
    video: ["sleep", "insomnia"],
  },
  {
    slug: "cbt-i-insomnia-therapy-explained",
    title: ["CBT-I: the first-line treatment for insomnia", "CBT-I: अनिद्रा का पहला और सबसे असरदार इलाज"],
    excerpt: ["Cognitive behavioural therapy for insomnia (CBT-I) retrains sleep without long-term medicines. What happens in sessions and how long it takes.", "अनिद्रा के लिए कॉग्निटिव बिहेवियरल थेरेपी (CBT-I) लंबी दवा के बिना नींद को फिर से सिखाती है। सत्रों में क्या होता है और कितना समय लगता है।"],
    related: ["insomnia-treatment-india", "cbt-cognitive-behaviour-therapy-india", "sleep-disorders-psychiatrist-india"],
    refs: ["aasm-insomnia", "icd11"],
    intro: [
      ["CBT-I is a structured, short-term therapy recommended by sleep guidelines as the first treatment for chronic insomnia.", "CBT-I एक संरचित, छोटी अवधि की थेरेपी है जिसे नींद संबंधी दिशानिर्देश पुरानी अनिद्रा का पहला इलाज मानते हैं।"],
      ["It targets the habits and worries that keep insomnia going, and its benefits usually last after therapy ends.", "यह उन आदतों और चिंताओं पर काम करती है जो अनिद्रा को बनाए रखती हैं, और इसका फ़ायदा अक्सर थेरेपी के बाद भी बना रहता है।"],
    ],
    key: [
      ["Usually 4–8 weekly sessions, online or in person", "आमतौर पर 4–8 साप्ताहिक सत्र, ऑनलाइन या आमने-सामने"],
      ["A sleep diary guides every step", "हर क़दम स्लीप डायरी के आधार पर"],
      ["Sleep often gets slightly worse in week one before improving", "पहले हफ़्ते नींद थोड़ी बिगड़ सकती है, फिर सुधरती है"],
    ],
    sym: [
      ["Difficulty falling or staying asleep at least three nights a week", "हफ़्ते में कम से कम तीन रात सोने या नींद बनाए रखने में दिक़्क़त"],
      ["Racing thoughts and clock-watching at night", "रात में दौड़ते विचार और बार-बार घड़ी देखना"],
      ["Fear of not sleeping that builds through the evening", "शाम होते-होते न सो पाने का डर बढ़ना"],
    ],
    cause: [
      ["Spending long hours awake in bed", "बिस्तर पर लंबे समय तक जागते रहना"],
      ["Unhelpful beliefs such as 'I must get eight hours or I will fall ill'", "ग़लत धारणाएँ जैसे 'आठ घंटे नहीं सोया तो बीमार पड़ जाऊँगा'"],
      ["Stress that started the problem and habits that kept it going", "तनाव जिससे शुरुआत हुई और आदतें जिनसे यह बना रहा"],
    ],
    risk: [
      ["Anxiety or depression", "चिंता या डिप्रेशन"],
      ["Long-term use of sleeping pills", "लंबे समय तक नींद की गोलियाँ"],
      ["Chronic pain or medical illness", "पुराना दर्द या शारीरिक बीमारी"],
    ],
    mgmt: [
      ["Stimulus control: bed only for sleep, get up if awake", "स्टिमुलस कंट्रोल: बिस्तर सिर्फ़ सोने के लिए, जागते रहें तो उठ जाएँ"],
      ["Sleep restriction: time in bed matched to actual sleep, then widened", "स्लीप रिस्ट्रिक्शन: बिस्तर का समय असली नींद के बराबर, फिर धीरे-धीरे बढ़ाना"],
      ["Cognitive work on sleep worries", "नींद की चिंताओं पर कॉग्निटिव काम"],
      ["Relaxation and wind-down skills", "रिलैक्सेशन और सोने से पहले शांत होने के तरीक़े"],
    ],
    help: [PERSIST, ["Dependence on sleeping pills you want to reduce", "नींद की गोलियों पर निर्भरता जिसे कम करना चाहते हैं"], ["Insomnia along with low mood or anxiety", "उदासी या चिंता के साथ अनिद्रा"]],
    faq: [
      ["Can CBT-I be done online?", "क्या CBT-I ऑनलाइन हो सकती है?", "Yes. Online CBT-I with a sleep diary works well for most people.", "हाँ। स्लीप डायरी के साथ ऑनलाइन CBT-I ज़्यादातर लोगों में अच्छा काम करती है।"],
      ["Do I have to stop my sleeping pills first?", "क्या पहले नींद की गोलियाँ बंद करनी होंगी?", "No. Medicines can be reduced gradually during CBT-I under your doctor's guidance; never stop suddenly.", "नहीं। डॉक्टर की देखरेख में CBT-I के दौरान दवा धीरे-धीरे कम की जा सकती है; अचानक बंद न करें।"],
    ],
    tags: ["cbt-i", "insomnia therapy", "neend ka ilaj"],
    video: ["insomnia", "sleep"],
  },
  {
    slug: "shift-work-sleep-problems",
    title: ["Night shifts and sleep: protecting your body clock", "नाइट शिफ़्ट और नींद: शरीर की घड़ी को कैसे बचाएँ"],
    excerpt: ["Nurses, doctors, drivers and factory workers on rotating shifts often sleep poorly. Practical ways to sleep better and when it becomes a disorder.", "नर्स, डॉक्टर, ड्राइवर और फ़ैक्टरी कर्मचारी जो बदलती शिफ़्ट में काम करते हैं अक्सर ठीक से नहीं सो पाते। बेहतर नींद के व्यावहारिक तरीक़े और कब यह विकार बनता है।"],
    related: ["sleep-disorders-psychiatrist-india", "resident-doctor-burnout-india", "workplace-stress-india"],
    refs: ["aasm-insomnia", "icd11"],
    intro: [
      ["Our body clock is set by light and expects sleep at night; shift work pushes against it.", "हमारी शरीर की घड़ी रोशनी से सेट होती है और रात में नींद चाहती है; शिफ़्ट ड्यूटी इसके ख़िलाफ़ जाती है।"],
      ["When insomnia or sleepiness persists because of the work schedule, it is called shift work disorder.", "जब काम के समय की वजह से अनिद्रा या नींद लगातार बनी रहे, उसे शिफ़्ट वर्क डिसऑर्डर कहते हैं।"],
    ],
    key: [
      ["Light timing is the strongest tool for shifting the clock", "शरीर की घड़ी बदलने का सबसे मज़बूत तरीक़ा रोशनी का समय है"],
      ["An anchor sleep block on both work and off days helps", "काम और छुट्टी दोनों दिनों में एक तय 'एंकर' नींद मदद करती है"],
      ["Drowsy driving after night shifts is a real danger", "नाइट शिफ़्ट के बाद नींद में गाड़ी चलाना असली ख़तरा है"],
    ],
    sym: [
      ["Short, broken daytime sleep", "दिन में कम और टूटी नींद"],
      ["Severe sleepiness during the shift", "शिफ़्ट के दौरान बहुत नींद आना"],
      ["Irritability, poor concentration, acidity", "चिड़चिड़ापन, ध्यान की कमी, एसिडिटी"],
    ],
    cause: [
      ["Working against the natural body clock", "प्राकृतिक शरीर-घड़ी के उल्टे काम करना"],
      ["Daylight and household noise during daytime sleep", "दिन की नींद में धूप और घर का शोर"],
      ["Rapidly rotating schedules", "तेज़ी से बदलती शिफ़्ट"],
    ],
    risk: [
      ["Permanent night shifts or backward rotation", "स्थायी नाइट शिफ़्ट या उल्टी दिशा में बदलती शिफ़्ट"],
      ["Long commutes", "लंबा आना-जाना"],
      ["Caring for small children during the day", "दिन में छोटे बच्चों की देखभाल"],
    ],
    mgmt: [
      ["Dark, cool room with eye mask and earplugs for day sleep", "दिन की नींद के लिए अँधेरा, ठंडा कमरा, आई-मास्क और ईयरप्लग"],
      ["Wear dark glasses on the way home after a night shift", "नाइट शिफ़्ट के बाद घर जाते समय काला चश्मा"],
      ["Short planned nap before the shift; caffeine only early in the shift", "शिफ़्ट से पहले छोटी झपकी; कैफ़ीन सिर्फ़ शिफ़्ट की शुरुआत में"],
      ["Rotate shifts forward (morning → evening → night) when possible", "संभव हो तो शिफ़्ट आगे की दिशा में बदलें (सुबह → शाम → रात)"],
    ],
    help: [DAYTIME, ["Near-misses or dozing while driving", "गाड़ी चलाते समय झपकी या बाल-बाल बचना"], ["Low mood or anxiety building up", "उदासी या चिंता बढ़ना"]],
    faq: [
      ["Can I ever fully adapt to night shifts?", "क्या नाइट शिफ़्ट की पूरी आदत पड़ सकती है?", "Most people adapt only partly. Good light control and a fixed routine reduce the strain.", "ज़्यादातर लोग आंशिक रूप से ही ढल पाते हैं। रोशनी पर नियंत्रण और तय दिनचर्या से दबाव कम होता है।"],
      ["Are sleeping pills a good solution?", "क्या नींद की गोलियाँ अच्छा हल हैं?", "Only short-term and under medical advice; behavioural steps are safer and longer lasting.", "सिर्फ़ थोड़े समय के लिए और डॉक्टर की सलाह से; व्यवहारिक उपाय ज़्यादा सुरक्षित और लंबे असर वाले हैं।"],
    ],
    tags: ["night shift", "shift work", "nurse sleep", "driver sleep"],
    video: ["sleep"],
  },
  {
    slug: "snoring-and-sleep-apnoea",
    title: ["Loud snoring: could it be sleep apnoea?", "तेज़ खर्राटे: कहीं स्लीप एपनिया तो नहीं?"],
    excerpt: ["Snoring with breathing pauses, gasping and daytime sleepiness may mean obstructive sleep apnoea, which affects mood, memory and heart health.", "साँस रुकने, हाँफ़ने और दिन में नींद के साथ खर्राटे ऑब्सट्रक्टिव स्लीप एपनिया हो सकते हैं, जो मूड, याददाश्त और दिल पर असर डालता है।"],
    related: ["sleep-disorders-psychiatrist-india", "depression-treatment-india", "mild-cognitive-impairment-india"],
    refs: ["aasm-insomnia", "icd11"],
    intro: [
      ["In obstructive sleep apnoea the airway repeatedly narrows or closes during sleep, cutting oxygen and breaking sleep.", "ऑब्सट्रक्टिव स्लीप एपनिया में नींद के दौरान साँस की नली बार-बार संकरी या बंद होती है, जिससे ऑक्सीजन घटती है और नींद टूटती है।"],
      ["It is common, under-diagnosed, and can look like depression, poor memory or irritability.", "यह आम है, अक्सर पकड़ में नहीं आता, और डिप्रेशन, कमज़ोर याददाश्त या चिड़चिड़ेपन जैसा दिख सकता है।"],
    ],
    key: [
      ["Not all snoring is apnoea, but loud snoring with pauses needs checking", "हर खर्राटा एपनिया नहीं, पर रुकावट के साथ तेज़ खर्राटों की जाँच ज़रूरी"],
      ["Diagnosis needs a sleep study", "निदान के लिए स्लीप स्टडी ज़रूरी"],
      ["Sleeping pills and alcohol can make apnoea worse", "नींद की गोलियाँ और शराब एपनिया को बिगाड़ सकती हैं"],
    ],
    sym: [
      ["Loud snoring with pauses, choking or gasping", "रुकावट, घुटन या हाँफ़ने के साथ तेज़ खर्राटे"],
      ["Morning headache and dry mouth", "सुबह सिरदर्द और मुँह सूखना"],
      ["Dozing off while reading, watching TV or driving", "पढ़ते, टीवी देखते या गाड़ी चलाते समय झपकी"],
    ],
    cause: [
      ["Narrow airway or relaxed throat muscles in sleep", "संकरी साँस-नली या नींद में गले की ढीली मांसपेशियाँ"],
      ["Excess weight around the neck", "गर्दन के आसपास अतिरिक्त वज़न"],
      ["Large tonsils, nasal blockage or jaw shape", "बड़े टॉन्सिल, नाक की रुकावट या जबड़े की बनावट"],
    ],
    risk: [
      ["Obesity, high blood pressure, diabetes", "मोटापा, हाई बीपी, डायबिटीज़"],
      ["Alcohol and smoking", "शराब और धूम्रपान"],
      ["Older age and male sex; women after menopause", "बढ़ती उम्र और पुरुष; रजोनिवृत्ति के बाद महिलाएँ"],
    ],
    mgmt: [
      ["Sleep study and ENT or sleep-specialist assessment", "स्लीप स्टडी और ENT या स्लीप विशेषज्ञ से जाँच"],
      ["CPAP (positive airway pressure) machine for moderate–severe apnoea", "मध्यम–गंभीर एपनिया में CPAP मशीन"],
      ["Weight loss, side sleeping, avoiding alcohol at night", "वज़न घटाना, करवट लेकर सोना, रात में शराब से बचना"],
    ],
    help: [DAYTIME, ["Breathing pauses noticed by a partner", "साथी को साँस रुकती दिखे"], ["Low mood or memory complaints with loud snoring", "तेज़ खर्राटों के साथ उदासी या याददाश्त की शिकायत"]],
    faq: [
      ["Can sleep apnoea cause depression?", "क्या स्लीप एपनिया से डिप्रेशन हो सकता है?", "It can cause fatigue, low mood and poor focus that look like depression; treating apnoea often improves mood.", "इससे थकान, उदासी और ध्यान की कमी हो सकती है जो डिप्रेशन जैसी लगती है; एपनिया के इलाज से मूड अक्सर सुधरता है।"],
      ["Does a psychiatrist treat apnoea?", "क्या मनोचिकित्सक एपनिया का इलाज करते हैं?", "A psychiatrist can screen and refer for a sleep study; apnoea is usually managed with sleep, ENT or chest specialists.", "मनोचिकित्सक स्क्रीनिंग करके स्लीप स्टडी के लिए भेज सकते हैं; एपनिया का इलाज आमतौर पर स्लीप, ENT या छाती विशेषज्ञ करते हैं।"],
    ],
    tags: ["kharrate", "snoring", "sleep apnea", "osa"],
    video: ["sleep"],
  },
  {
    slug: "phone-use-before-bed",
    title: ["Phone before bed: how screens steal your sleep", "सोने से पहले फ़ोन: स्क्रीन कैसे नींद चुराती है"],
    excerpt: ["Late-night scrolling delays sleep through light, stimulation and lost time. Realistic steps to cut bedtime screen use for teens and adults.", "देर रात स्क्रॉलिंग रोशनी, उत्तेजना और समय की बर्बादी से नींद टालती है। किशोरों और वयस्कों के लिए सोने से पहले स्क्रीन कम करने के व्यावहारिक क़दम।"],
    related: ["social-media-overuse-india", "internet-addiction-treatment-india", "sleep-problems-students-india"],
    refs: ["aasm-insomnia", "who-adolescent"],
    intro: [
      ["Phones keep the brain alert with bright light, endless content and notifications.", "फ़ोन तेज़ रोशनी, अनंत कंटेंट और नोटिफ़िकेशन से दिमाग़ को सतर्क रखते हैं।"],
      ["The bigger problem is often 'revenge bedtime procrastination' — staying up to get personal time.", "बड़ी समस्या अक्सर 'रिवेंज बेडटाइम प्रोक्रैस्टिनेशन' होती है — अपना समय पाने के लिए देर तक जागना।"],
    ],
    key: [
      ["Content is more stimulating than light alone", "सिर्फ़ रोशनी से ज़्यादा कंटेंट उत्तेजित करता है"],
      ["Charging the phone outside the bedroom is the single best step", "फ़ोन बेडरूम के बाहर चार्ज करना सबसे असरदार क़दम है"],
      ["Night mode helps a little but does not solve the problem", "नाइट मोड थोड़ा मदद करता है पर समस्या हल नहीं करता"],
    ],
    sym: [
      ["Going to bed late without meaning to", "न चाहते हुए भी देर से सोना"],
      ["Checking the phone on waking at night", "रात में नींद खुलने पर फ़ोन देखना"],
      ["Tired, irritable mornings", "थकी, चिड़चिड़ी सुबह"],
    ],
    cause: [
      ["Infinite scroll and autoplay design", "अनंत स्क्रॉल और ऑटोप्ले डिज़ाइन"],
      ["Fear of missing out", "कुछ छूट जाने का डर"],
      ["Using the phone to cope with stress or loneliness", "तनाव या अकेलेपन से निपटने के लिए फ़ोन"],
    ],
    risk: [
      ["Teenagers and students", "किशोर और विद्यार्थी"],
      ["Long work hours leaving little free time", "लंबे काम के घंटे, कम ख़ाली समय"],
      ["Anxiety, ADHD or low mood", "चिंता, ADHD या उदासी"],
    ],
    mgmt: [
      ["Set a 'digital sunset' 45–60 minutes before bed", "सोने से 45–60 मिनट पहले 'डिजिटल सनसेट'"],
      ["Use a basic alarm clock instead of the phone", "फ़ोन की जगह साधारण अलार्म घड़ी"],
      ["Turn off non-essential notifications and use app limits", "ग़ैर-ज़रूरी नोटिफ़िकेशन बंद, ऐप लिमिट लगाएँ"],
      ["Plan screen-free 'me time' earlier in the evening", "शाम को पहले ही बिना स्क्रीन 'अपना समय' तय करें"],
    ],
    help: [["Unable to cut down despite repeated attempts", "बार-बार कोशिश के बावजूद कम न कर पाना"], ["Phone use harming studies, work or relationships", "फ़ोन से पढ़ाई, काम या रिश्तों पर असर"], DAYTIME],
    faq: [
      ["Is blue-light filter enough?", "क्या ब्लू-लाइट फ़िल्टर काफ़ी है?", "It helps slightly, but what you watch and how long you stay up matter more.", "थोड़ा मदद करता है, पर आप क्या देखते हैं और कितनी देर जागते हैं वह ज़्यादा मायने रखता है।"],
      ["How do I get my teenager off the phone at night?", "किशोर बच्चे को रात में फ़ोन से कैसे दूर करें?", "Agree on family rules together, keep all phones (including parents') outside bedrooms, and offer alternatives.", "मिलकर परिवार के नियम बनाएँ, सबके फ़ोन (माता-पिता के भी) बेडरूम से बाहर रखें और विकल्प दें।"],
    ],
    tags: ["mobile", "phone addiction", "screen time", "raat ko phone"],
    video: ["sleep", "mobile"],
  },
  {
    slug: "nightmares-and-bad-dreams",
    title: ["Frequent nightmares: causes and treatment", "बार-बार डरावने सपने: कारण और इलाज"],
    excerpt: ["Occasional bad dreams are normal. Repeated nightmares after stress or trauma can be treated with simple therapy techniques.", "कभी-कभार बुरे सपने सामान्य हैं। तनाव या आघात के बाद बार-बार आने वाले डरावने सपनों का इलाज आसान थेरेपी तकनीकों से हो सकता है।"],
    related: ["ptsd-trauma-treatment-india", "sleep-disorders-psychiatrist-india", "anxiety-phobia-treatment-india"],
    refs: ["nice-ptsd", "icd11"],
    intro: [
      ["Nightmares are vivid, upsetting dreams that wake a person and are clearly remembered.", "डरावने सपने स्पष्ट, परेशान करने वाले सपने होते हैं जिनसे व्यक्ति जाग जाता है और जो साफ़ याद रहते हैं।"],
      ["When they are frequent and cause fear of sleeping, they need attention.", "जब ये बार-बार आएँ और सोने से डर लगने लगे, तब ध्यान देना ज़रूरी है।"],
    ],
    key: [
      ["Nightmares are common after traumatic events", "आघात वाली घटनाओं के बाद डरावने सपने आम हैं"],
      ["Imagery rehearsal therapy can rewrite recurring dreams", "इमेजरी रिहर्सल थेरेपी बार-बार आने वाले सपनों को बदल सकती है"],
      ["Some medicines and alcohol withdrawal can trigger them", "कुछ दवाएँ और शराब छोड़ने के लक्षण इन्हें बढ़ा सकते हैं"],
    ],
    sym: [
      ["Waking with fear, sweating or a racing heart", "डर, पसीने या तेज़ धड़कन के साथ जागना"],
      ["Same or similar dream repeating", "एक जैसा सपना दोहराना"],
      ["Avoiding sleep or dreading bedtime", "नींद से बचना या सोने के समय से डर"],
    ],
    cause: [
      ["Trauma, accidents, violence or loss", "आघात, दुर्घटना, हिंसा या किसी को खोना"],
      ["Stress and anxiety", "तनाव और चिंता"],
      ["Irregular sleep and alcohol use", "अनियमित नींद और शराब"],
    ],
    risk: [
      ["PTSD or anxiety disorders", "PTSD या चिंता विकार"],
      ["Depression", "डिप्रेशन"],
      ["Withdrawal from alcohol or sedatives", "शराब या नींद की दवाओं को छोड़ने के लक्षण"],
    ],
    mgmt: [
      ["Imagery rehearsal: write a new, safer ending and rehearse it daily", "इमेजरी रिहर्सल: नया, सुरक्षित अंत लिखें और रोज़ दोहराएँ"],
      ["Trauma-focused psychotherapy when linked to trauma", "आघात से जुड़े हों तो ट्रॉमा-फ़ोकस्ड साइकोथेरेपी"],
      ["Grounding after waking: name what you see, slow breathing", "जागने के बाद ग्राउंडिंग: जो दिखे उसका नाम लें, धीमी साँस"],
      ["Medicines in selected cases, as advised by a psychiatrist", "चुने हुए मामलों में मनोचिकित्सक की सलाह से दवाएँ"],
    ],
    help: [["Nightmares most weeks for over a month", "एक महीने से ज़्यादा, ज़्यादातर हफ़्तों में डरावने सपने"], ["Flashbacks or fear during the day too", "दिन में भी फ़्लैशबैक या डर"], ["Using alcohol to sleep", "सोने के लिए शराब का सहारा"]],
    faq: [
      ["Do nightmares mean something supernatural?", "क्या डरावने सपनों का कोई अलौकिक मतलब है?", "No. They reflect stress, memory and emotion processing in the brain, and they respond to treatment.", "नहीं। ये दिमाग़ में तनाव, यादों और भावनाओं की प्रक्रिया को दिखाते हैं, और इलाज से ठीक होते हैं।"],
      ["Are nightmares in children worrying?", "क्या बच्चों के डरावने सपने चिंता की बात हैं?", "Occasional nightmares are normal; frequent ones with daytime fear or after a frightening event should be discussed.", "कभी-कभार सामान्य हैं; दिन में डर के साथ या किसी डरावनी घटना के बाद बार-बार हों तो बात करें।"],
    ],
    tags: ["bure sapne", "darawne sapne", "nightmare"],
    video: ["sleep", "trauma"],
  },
  {
    slug: "restless-legs-at-night",
    title: ["Restless legs at night: why legs won't stay still", "रात में पैरों में बेचैनी: पैर स्थिर क्यों नहीं रहते"],
    excerpt: ["An urge to move the legs, worse in the evening and relieved by walking, can be restless legs syndrome — often linked to low iron.", "पैर हिलाने की तीव्र इच्छा, जो शाम को बढ़े और चलने से कम हो, रेस्टलेस लेग्स सिंड्रोम हो सकता है — अक्सर आयरन की कमी से जुड़ा।"],
    related: ["sleep-disorders-psychiatrist-india", "insomnia-treatment-india", "neuropsychiatry-india"],
    refs: ["icd11", "aasm-insomnia"],
    intro: [
      ["Restless legs syndrome (RLS) is a sleep-related movement disorder that makes it hard to fall asleep.", "रेस्टलेस लेग्स सिंड्रोम (RLS) नींद से जुड़ा मूवमेंट डिसऑर्डर है जिससे सोना कठिन होता है।"],
      ["People describe crawling, pulling or aching feelings deep in the legs.", "लोग पैरों के अंदर रेंगने, खिंचने या दर्द जैसी अनुभूति बताते हैं।"],
    ],
    key: [
      ["Symptoms worsen at rest and in the evening", "आराम करते समय और शाम को लक्षण बढ़ते हैं"],
      ["Moving or walking gives relief", "हिलने या चलने से राहत"],
      ["Iron levels should be checked", "आयरन का स्तर जाँचना चाहिए"],
    ],
    sym: [
      ["Strong urge to move the legs when lying down", "लेटने पर पैर हिलाने की तीव्र इच्छा"],
      ["Uncomfortable sensations relieved by stretching", "असहज अनुभूति जो खिंचाव से कम हो"],
      ["Leg jerks during sleep noticed by family", "नींद में पैरों के झटके जो परिवार को दिखें"],
    ],
    cause: [
      ["Low iron stores", "आयरन की कमी"],
      ["Family tendency", "पारिवारिक प्रवृत्ति"],
      ["Kidney disease or nerve problems", "किडनी रोग या नसों की समस्या"],
    ],
    risk: [
      ["Pregnancy", "गर्भावस्था"],
      ["Some antidepressants, antihistamines and antipsychotics", "कुछ एंटीडिप्रेसेंट, एंटीहिस्टामिन और एंटीसाइकोटिक"],
      ["Caffeine, alcohol and smoking", "कैफ़ीन, शराब और धूम्रपान"],
    ],
    mgmt: [
      ["Blood tests for iron and other causes", "आयरन और अन्य कारणों के लिए ख़ून की जाँच"],
      ["Review of current medicines with your doctor", "डॉक्टर के साथ चल रही दवाओं की समीक्षा"],
      ["Leg stretches, walking and warm baths in the evening", "शाम को पैरों का खिंचाव, टहलना और गुनगुना स्नान"],
      ["Specific medicines when symptoms are frequent and severe", "लक्षण बार-बार और गंभीर हों तो विशेष दवाएँ"],
    ],
    help: [["Symptoms several nights a week", "हफ़्ते में कई रातें लक्षण"], ["Started after a new medicine", "नई दवा शुरू करने के बाद शुरुआत"], DAYTIME],
    faq: [
      ["Is restless legs a psychological problem?", "क्या रेस्टलेस लेग्स मानसिक समस्या है?", "No, it is a neurological sleep disorder, but it often causes insomnia, anxiety and low mood.", "नहीं, यह न्यूरोलॉजिकल नींद विकार है, पर अक्सर इससे अनिद्रा, चिंता और उदासी होती है।"],
      ["Can my antidepressant cause it?", "क्या मेरा एंटीडिप्रेसेंट इसका कारण हो सकता है?", "Some can. Discuss with your psychiatrist rather than stopping on your own.", "कुछ हो सकते हैं। ख़ुद बंद करने की जगह अपने मनोचिकित्सक से बात करें।"],
    ],
    tags: ["rls", "pair me bechaini", "restless legs"],
    video: ["sleep"],
  },
  {
    slug: "daytime-napping-guide",
    title: ["Daytime naps: when they help and when they hurt", "दिन की झपकी: कब फ़ायदेमंद, कब नुकसानदेह"],
    excerpt: ["A short afternoon nap can boost alertness, but long or late naps can worsen insomnia. How to nap smartly and when sleepiness signals a problem.", "दोपहर की छोटी झपकी सतर्कता बढ़ा सकती है, पर लंबी या देर की झपकी अनिद्रा बढ़ा सकती है। समझदारी से झपकी कैसे लें और कब नींद किसी समस्या का संकेत है।"],
    related: ["insomnia-treatment-india", "sleep-disorders-psychiatrist-india", "late-life-depression-india"],
    refs: ["aasm-insomnia", "who-live-life"],
    intro: [
      ["Naps are part of many cultures and can be healthy when timed well.", "झपकी कई संस्कृतियों का हिस्सा है और सही समय पर ली जाए तो स्वस्थ हो सकती है।"],
      ["Needing long naps every day, however, may point to poor night sleep or a medical issue.", "पर रोज़ लंबी झपकी की ज़रूरत रात की ख़राब नींद या किसी शारीरिक समस्या की ओर इशारा कर सकती है।"],
    ],
    key: [
      ["Best nap: 20–30 minutes, before 3 pm", "सबसे अच्छी झपकी: 20–30 मिनट, दोपहर 3 बजे से पहले"],
      ["People with insomnia should usually avoid naps", "अनिद्रा वाले लोगों को आमतौर पर झपकी से बचना चाहिए"],
      ["Excessive sleepiness is a symptom, not laziness", "ज़्यादा नींद आना लक्षण है, आलस नहीं"],
    ],
    sym: [
      ["Grogginess after long naps", "लंबी झपकी के बाद सुस्ती"],
      ["Difficulty sleeping at night after evening naps", "शाम की झपकी के बाद रात को सोने में दिक़्क़त"],
      ["Falling asleep unintentionally during the day", "दिन में अनजाने में सो जाना"],
    ],
    cause: [
      ["Short or broken night sleep", "रात की कम या टूटी नींद"],
      ["Boredom and inactivity", "ऊब और निष्क्रियता"],
      ["Depression, sleep apnoea or thyroid problems", "डिप्रेशन, स्लीप एपनिया या थायरॉइड"],
    ],
    risk: [
      ["Older age and retirement", "बढ़ती उम्र और रिटायरमेंट"],
      ["Shift work", "शिफ़्ट ड्यूटी"],
      ["Sedating medicines", "नींद लाने वाली दवाएँ"],
    ],
    mgmt: [
      ["Keep naps short and early; set an alarm", "झपकी छोटी और जल्दी; अलार्म लगाएँ"],
      ["Replace evening naps with a short walk or light activity", "शाम की झपकी की जगह छोटी सैर या हल्की गतिविधि"],
      ["Improve night sleep first if naps are long", "झपकी लंबी हो तो पहले रात की नींद सुधारें"],
    ],
    help: [DAYTIME, ["Sleeping much more than before along with low mood", "उदासी के साथ पहले से बहुत ज़्यादा सोना"], ["Sudden sleep attacks or collapse with emotion", "अचानक नींद के दौरे या भावना के साथ गिर पड़ना"]],
    faq: [
      ["Is sleeping a lot a sign of depression?", "क्या ज़्यादा सोना डिप्रेशन का संकेत है?", "It can be. Oversleeping with low mood and loss of interest needs assessment.", "हो सकता है। उदासी और रुचि की कमी के साथ ज़्यादा सोने की जाँच ज़रूरी है।"],
      ["Are naps good for elderly people?", "क्या बुज़ुर्गों के लिए झपकी अच्छी है?", "A short nap is fine; long daytime sleep can disturb night sleep and should be discussed.", "छोटी झपकी ठीक है; दिन में लंबी नींद रात की नींद बिगाड़ सकती है, इस पर बात करें।"],
    ],
    tags: ["nap", "jhapki", "din me neend"],
    video: ["sleep"],
  },
  {
    slug: "sleep-and-mental-health",
    title: ["Sleep and mental health: a two-way link", "नींद और मानसिक स्वास्थ्य: दोतरफ़ा रिश्ता"],
    excerpt: ["Poor sleep raises the risk of depression, anxiety and relapse, and mental illness disturbs sleep. Why treating sleep is part of mental health care.", "ख़राब नींद डिप्रेशन, चिंता और दोबारा बीमारी का ख़तरा बढ़ाती है, और मानसिक बीमारी नींद बिगाड़ती है। नींद का इलाज मानसिक देखभाल का हिस्सा क्यों है।"],
    related: ["insomnia-treatment-india", "depression-treatment-india", "bipolar-disorder-psychiatrist-india"],
    refs: ["aasm-insomnia", "who-depression", "nice-bipolar"],
    intro: [
      ["Sleep problems are present in most mental health conditions and are often the first sign of trouble.", "ज़्यादातर मानसिक स्थितियों में नींद की समस्या होती है और अक्सर यह पहला संकेत होती है।"],
      ["Improving sleep improves mood, concentration and recovery.", "नींद सुधारने से मूड, ध्यान और रिकवरी बेहतर होती है।"],
    ],
    key: [
      ["Insomnia is a risk factor for future depression", "अनिद्रा भविष्य के डिप्रेशन का जोखिम है"],
      ["Reduced need for sleep can signal mania", "नींद की कम ज़रूरत मेनिया का संकेत हो सकती है"],
      ["Sleep changes are an early warning for relapse", "नींद में बदलाव दोबारा बीमारी की शुरुआती चेतावनी है"],
    ],
    sym: [
      ["Early-morning waking with low mood", "उदासी के साथ सुबह बहुत जल्दी जागना"],
      ["Worry keeping the mind busy at night", "रात में चिंता से दिमाग़ व्यस्त रहना"],
      ["Sleeping very little yet feeling full of energy", "बहुत कम सोकर भी ऊर्जा से भरा महसूस करना"],
    ],
    cause: [
      ["Stress hormones and hyperarousal", "तनाव हार्मोन और अति-सतर्कता"],
      ["Changes in brain chemistry in mood disorders", "मूड विकारों में दिमाग़ी रसायनों में बदलाव"],
      ["Substance use and withdrawal", "नशे का सेवन और छोड़ने के लक्षण"],
    ],
    risk: [
      ["Family history of mood disorders", "मूड विकारों का पारिवारिक इतिहास"],
      ["Long-term stress, shift work", "लंबा तनाव, शिफ़्ट ड्यूटी"],
      ["Alcohol, cannabis or stimulant use", "शराब, गांजा या उत्तेजक नशे का सेवन"],
    ],
    mgmt: [
      ["Treat the underlying condition and the insomnia together", "मूल बीमारी और अनिद्रा दोनों का साथ इलाज"],
      ["CBT-I alongside psychotherapy", "साइकोथेरेपी के साथ CBT-I"],
      ["Regular routine to stabilise mood, especially in bipolar disorder", "मूड स्थिर रखने के लिए नियमित दिनचर्या, ख़ासकर बाइपोलर में"],
      ["Track sleep as an early-warning sign", "नींद को शुरुआती चेतावनी के रूप में ट्रैक करें"],
    ],
    help: [["Sleep change with low mood, anxiety or unusual behaviour", "उदासी, चिंता या असामान्य व्यवहार के साथ नींद में बदलाव"], ["Several nights with very little sleep and high energy", "कई रातें बहुत कम नींद और बहुत ऊर्जा"], ["Thoughts of self-harm — seek urgent help", "ख़ुद को नुकसान के विचार — तुरंत मदद लें"]],
    faq: [
      ["Should I treat sleep or depression first?", "पहले नींद का इलाज करूँ या डिप्रेशन का?", "Both together. Treating insomnia also speeds recovery from depression.", "दोनों साथ में। अनिद्रा का इलाज डिप्रेशन से रिकवरी भी तेज़ करता है।"],
      ["Can lack of sleep trigger psychosis?", "क्या नींद की कमी से साइकोसिस हो सकता है?", "Severe sleep loss can trigger mania or psychosis in vulnerable people, so protect sleep routines.", "गंभीर नींद की कमी संवेदनशील लोगों में मेनिया या साइकोसिस ला सकती है, इसलिए नींद की दिनचर्या बचाएँ।"],
    ],
    tags: ["neend aur dimag", "sleep mental health"],
    video: ["sleep", "depression"],
  },
]);
