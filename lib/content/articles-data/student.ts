import { batch } from "./_build";

type P = [string, string];
const BOOK: P = ["Students and parents can book an online consultation, including from coaching hostels", "विद्यार्थी और माता-पिता ऑनलाइन परामर्श बुक कर सकते हैं, कोचिंग हॉस्टल से भी"];
const CRISIS: P = ["Any talk of not wanting to live — call Tele-MANAS 14416 or emergency services now", "जीना न चाहने की कोई भी बात — अभी Tele-MANAS 14416 या आपातकालीन सेवा पर कॉल करें"];

export const STUDENT_ARTICLES = batch("student", [
  {
    slug: "realistic-study-timetable",
    title: ["Making a realistic study timetable that you can follow", "ऐसा स्टडी टाइमटेबल बनाएँ जिसे सच में निभा सकें"],
    excerpt: ["Over-ambitious timetables collapse in days. How to plan study blocks, breaks, sleep and revision so the plan survives real life.", "ज़रूरत से ज़्यादा महत्वाकांक्षी टाइमटेबल कुछ दिनों में टूट जाते हैं। पढ़ाई के ब्लॉक, ब्रेक, नींद और रिवीज़न की योजना कैसे बनाएँ कि वह असल ज़िंदगी में टिके।"],
    related: ["student-exam-stress-india", "concentration-problems-students-india", "academic-burnout-students-india"],
    refs: ["who-adolescent", "who-live-life"],
    intro: [
      ["A good timetable protects energy, not just hours.", "अच्छा टाइमटेबल सिर्फ़ घंटे नहीं, ऊर्जा भी बचाता है।"],
      ["Plans that ignore sleep, meals and rest lead to guilt and burnout.", "जो योजना नींद, खाना और आराम को नज़रअंदाज़ करे, वह अपराधबोध और थकान लाती है।"],
    ],
    key: [
      ["Plan 45–50 minute blocks with 10-minute breaks", "45–50 मिनट के ब्लॉक, 10 मिनट के ब्रेक"],
      ["Hardest subject when your energy is highest", "सबसे कठिन विषय तब जब ऊर्जा सबसे ज़्यादा हो"],
      ["Keep one buffer slot daily for spill-over", "बचे काम के लिए रोज़ एक ख़ाली स्लॉट"],
    ],
    sym: [
      ["Constantly falling behind the plan", "लगातार योजना से पीछे रहना"],
      ["Studying late and sleeping less", "देर तक पढ़ना और कम सोना"],
      ["Guilt during any break", "हर ब्रेक में अपराधबोध"],
    ],
    cause: [
      ["Copying toppers' schedules", "टॉपर्स का टाइमटेबल कॉपी करना"],
      ["Underestimating time needed", "ज़रूरी समय का कम अंदाज़ा"],
      ["No time for revision or tests", "रिवीज़न या टेस्ट के लिए समय नहीं"],
    ],
    risk: [
      ["Long coaching hours plus self-study", "लंबे कोचिंग घंटे और सेल्फ़-स्टडी"],
      ["Perfectionism", "परफ़ेक्शनिज़्म"],
      ["Phone distractions", "फ़ोन से ध्यान भटकना"],
    ],
    mgmt: [
      ["Fix wake time and sleep 7–8 hours", "जागने का समय तय, 7–8 घंटे नींद"],
      ["Weekly plan with daily targets, reviewed every Sunday", "रोज़ के लक्ष्य के साथ साप्ताहिक योजना, हर रविवार समीक्षा"],
      ["Mix study with active recall and practice tests", "पढ़ाई में एक्टिव रिकॉल और प्रैक्टिस टेस्ट"],
      ["Include 30 minutes of physical activity", "30 मिनट शारीरिक गतिविधि शामिल करें"],
    ],
    help: [BOOK, ["Unable to concentrate for weeks despite effort", "कोशिश के बावजूद हफ़्तों तक ध्यान न लगना"], ["Low mood, crying or hopelessness", "उदासी, रोना या निराशा"]],
    faq: [
      ["How many hours should I study daily?", "रोज़ कितने घंटे पढ़ना चाहिए?", "Quality matters more than hours. Focused 6–8 hours with breaks beats tired 12 hours.", "घंटों से ज़्यादा गुणवत्ता मायने रखती है। ब्रेक के साथ ध्यान से 6–8 घंटे थके हुए 12 घंटों से बेहतर।"],
      ["Is night study better?", "क्या रात में पढ़ना बेहतर है?", "Only if you still get full sleep. Regular sleep improves memory consolidation.", "सिर्फ़ तब जब पूरी नींद मिले। नियमित नींद याददाश्त मज़बूत करती है।"],
    ],
    tags: ["timetable", "study plan", "padhai"],
    video: ["exam", "study"],
  },
  {
    slug: "coaching-hostel-loneliness",
    title: ["Loneliness in coaching hostels: coping away from home", "कोचिंग हॉस्टल में अकेलापन: घर से दूर कैसे संभलें"],
    excerpt: ["Lakhs of students live alone in coaching cities. Recognising loneliness and homesickness early, and practical steps to stay connected and safe.", "लाखों विद्यार्थी कोचिंग शहरों में अकेले रहते हैं। अकेलेपन और घर की याद को जल्दी पहचानना, और जुड़े व सुरक्षित रहने के व्यावहारिक क़दम।"],
    related: ["neet-exam-stress-india", "jee-exam-stress-india", "teen-depression-india"],
    refs: ["who-adolescent", "telemanas"],
    intro: [
      ["Moving to a coaching city at 15–17 means losing daily family support at a stressful time.", "15–17 साल की उम्र में कोचिंग शहर जाना मतलब तनाव के समय रोज़ के पारिवारिक सहारे से दूर होना।"],
      ["Loneliness is common and is not a weakness, but it can slide into depression if ignored.", "अकेलापन आम है और कमज़ोरी नहीं, पर अनदेखा करने पर डिप्रेशन में बदल सकता है।"],
    ],
    key: [
      ["Regular contact with family helps, but quality matters more than marks talk", "परिवार से नियमित बात मदद करती है, पर नंबरों की बात से ज़्यादा जुड़ाव ज़रूरी"],
      ["One trusted friend or mentor in the city is protective", "शहर में एक भरोसेमंद दोस्त या मेंटर सुरक्षा देता है"],
      ["Changes in eating, sleep or attendance are warning signs", "खाने, नींद या उपस्थिति में बदलाव चेतावनी संकेत हैं"],
    ],
    sym: [
      ["Staying in the room, skipping meals or classes", "कमरे में रहना, खाना या क्लास छोड़ना"],
      ["Crying, homesickness, feeling no one understands", "रोना, घर की याद, लगना कि कोई नहीं समझता"],
      ["Endless phone use late at night", "देर रात तक लगातार फ़ोन"],
    ],
    cause: [
      ["Separation from family and friends", "परिवार और दोस्तों से दूरी"],
      ["Competitive environment and rank comparison", "प्रतिस्पर्धी माहौल और रैंक की तुलना"],
      ["Little time for hobbies or rest", "शौक़ या आराम के लिए कम समय"],
    ],
    risk: [
      ["Falling test scores", "गिरते टेस्ट स्कोर"],
      ["Past anxiety or depression", "पहले चिंता या डिप्रेशन"],
      ["Bullying or conflict with roommates", "रूममेट से झगड़ा या बुलिंग"],
    ],
    mgmt: [
      ["Fixed daily call with family — talk about the day, not only marks", "परिवार से रोज़ तय कॉल — सिर्फ़ नंबर नहीं, दिन के बारे में बात"],
      ["Eat at least one meal with others", "कम से कम एक बार दूसरों के साथ खाएँ"],
      ["Short walk or exercise daily; weekly free time", "रोज़ छोटी सैर या व्यायाम; हफ़्ते में ख़ाली समय"],
      ["Use the coaching counsellor or an online psychiatrist early", "कोचिंग काउंसलर या ऑनलाइन मनोचिकित्सक से जल्दी बात करें"],
    ],
    help: [BOOK, ["Missing classes for days or not eating", "कई दिन क्लास छोड़ना या खाना न खाना"], CRISIS],
    faq: [
      ["Should I go home if I feel lonely?", "अकेलापन लगे तो क्या घर चला जाऊँ?", "A short visit can help. If distress continues, talk to family and a professional before deciding on a longer break.", "छोटी मुलाक़ात मदद कर सकती है। परेशानी बनी रहे तो लंबे ब्रेक से पहले परिवार और विशेषज्ञ से बात करें।"],
      ["How can parents tell if their child is struggling?", "माता-पिता कैसे जानें कि बच्चा परेशान है?", "Watch for short or avoided calls, sleep changes, irritability and statements of hopelessness.", "छोटी या टाली गई कॉल, नींद में बदलाव, चिड़चिड़ापन और निराशा की बातों पर ध्यान दें।"],
    ],
    tags: ["kota", "hostel", "akelapan", "homesick"],
    video: ["student", "exam"],
  },
  {
    slug: "coping-with-exam-failure",
    title: ["Coping with exam failure or a bad result", "परीक्षा में असफलता या ख़राब रिज़ल्ट से कैसे निपटें"],
    excerpt: ["A failed attempt or low rank can feel like the end. How to handle the first days, talk to family, and plan the next step with a clear mind.", "एक असफल प्रयास या कम रैंक अंत जैसा लग सकता है। पहले दिनों को कैसे संभालें, परिवार से बात करें, और साफ़ दिमाग़ से अगला क़दम कैसे तय करें।"],
    related: ["student-exam-stress-india", "neet-exam-stress-india", "adjustment-disorder-india"],
    refs: ["who-suicide", "telemanas"],
    intro: [
      ["Disappointment, shame and anger after a result are normal reactions.", "रिज़ल्ट के बाद निराशा, शर्म और ग़ुस्सा सामान्य प्रतिक्रियाएँ हैं।"],
      ["One exam measures one performance — not your worth or your future.", "एक परीक्षा एक प्रदर्शन मापती है — आपकी क़ीमत या भविष्य नहीं।"],
    ],
    key: [
      ["Don't make big decisions in the first week", "पहले हफ़्ते में बड़े फ़ैसले न लें"],
      ["Many successful careers followed a failed attempt", "कई सफल करियर एक असफल प्रयास के बाद बने"],
      ["Families' first reaction matters a lot", "परिवार की पहली प्रतिक्रिया बहुत मायने रखती है"],
    ],
    sym: [
      ["Feeling numb, ashamed or worthless", "सुन्न, शर्मिंदा या बेकार महसूस करना"],
      ["Avoiding friends and relatives", "दोस्तों और रिश्तेदारों से बचना"],
      ["Sleep and appetite changes", "नींद और भूख में बदलाव"],
    ],
    cause: [
      ["High expectations and years of preparation", "ऊँची उम्मीदें और सालों की तैयारी"],
      ["Comparison with peers", "साथियों से तुलना"],
      ["Financial pressure on the family", "परिवार पर आर्थिक दबाव"],
    ],
    risk: [
      ["Pre-existing depression or anxiety", "पहले से डिप्रेशन या चिंता"],
      ["Harsh criticism at home", "घर में कठोर आलोचना"],
      ["Isolation in a hostel", "हॉस्टल में अकेलापन"],
    ],
    mgmt: [
      ["Let feelings settle — talk to one trusted person", "भावनाओं को शांत होने दें — एक भरोसेमंद व्यक्ति से बात करें"],
      ["Analyse what went wrong only after a few days", "क्या ग़लत हुआ, यह कुछ दिनों बाद देखें"],
      ["List options: re-attempt, alternate courses, related careers", "विकल्प लिखें: दोबारा प्रयास, वैकल्पिक कोर्स, जुड़े करियर"],
      ["Parents: say 'We are with you' before discussing next steps", "माता-पिता: अगले क़दम से पहले 'हम तुम्हारे साथ हैं' कहें"],
    ],
    help: [BOOK, ["Low mood lasting more than two weeks", "दो हफ़्ते से ज़्यादा उदासी"], CRISIS],
    faq: [
      ["Should I drop a year?", "क्या एक साल ड्रॉप करूँ?", "Decide after the emotions settle, considering readiness, finances and alternatives — a counsellor can help.", "भावनाएँ शांत होने के बाद, तैयारी, आर्थिक स्थिति और विकल्प देखकर तय करें — काउंसलर मदद कर सकते हैं।"],
      ["What should parents avoid saying?", "माता-पिता को क्या नहीं कहना चाहिए?", "Avoid comparisons, 'we wasted money' or 'what will people say'. Focus on the child's wellbeing.", "तुलना, 'पैसे बर्बाद हुए' या 'लोग क्या कहेंगे' से बचें। बच्चे की भलाई पर ध्यान दें।"],
    ],
    tags: ["fail", "result", "rank", "asafalta"],
    video: ["student", "exam"],
  },
  {
    slug: "procrastination-in-students",
    title: ["Procrastination: why you delay studying and how to start", "टालमटोल: पढ़ाई क्यों टलती है और शुरुआत कैसे करें"],
    excerpt: ["Procrastination is usually about managing uncomfortable feelings, not laziness. Simple techniques to start tasks and keep momentum.", "टालमटोल आमतौर पर आलस नहीं, असहज भावनाओं से बचना होता है। काम शुरू करने और गति बनाए रखने की आसान तकनीकें।"],
    related: ["concentration-problems-students-india", "adult-adhd-treatment-india", "academic-burnout-students-india"],
    refs: ["who-adolescent", "nice-adhd"],
    intro: [
      ["People delay tasks that feel boring, difficult or threatening to self-esteem.", "लोग उबाऊ, कठिन या आत्म-सम्मान को ख़तरे वाले काम टालते हैं।"],
      ["Short-term relief from avoiding a task leads to long-term stress.", "काम टालने की तात्कालिक राहत लंबे तनाव में बदलती है।"],
    ],
    key: [
      ["Starting is the hardest part — make the first step tiny", "शुरुआत सबसे कठिन — पहला क़दम बहुत छोटा रखें"],
      ["Fear of failure drives much procrastination", "असफलता का डर बहुत टालमटोल की वजह है"],
      ["Severe, lifelong procrastination can be a sign of ADHD", "गंभीर, जीवनभर की टालमटोल ADHD का संकेत हो सकती है"],
    ],
    sym: [
      ["Repeatedly delaying until the last minute", "बार-बार आख़िरी समय तक टालना"],
      ["Scrolling instead of studying, then guilt", "पढ़ने की जगह स्क्रॉल करना, फिर अपराधबोध"],
      ["Starting many tasks, finishing few", "कई काम शुरू, कम पूरे"],
    ],
    cause: [
      ["Perfectionism and fear of judgement", "परफ़ेक्शनिज़्म और आँके जाने का डर"],
      ["Unclear or very large tasks", "अस्पष्ट या बहुत बड़े काम"],
      ["Low mood or anxiety", "उदासी या चिंता"],
    ],
    risk: [
      ["Easy access to phone and games", "फ़ोन और गेम की आसान पहुँच"],
      ["ADHD or learning difficulties", "ADHD या सीखने में कठिनाई"],
      ["Poor sleep", "ख़राब नींद"],
    ],
    mgmt: [
      ["'Two-minute start': commit only to opening the book for two minutes", "'दो मिनट शुरुआत': सिर्फ़ दो मिनट किताब खोलने का वादा"],
      ["Break chapters into specific, small tasks", "अध्यायों को विशिष्ट, छोटे कामों में बाँटें"],
      ["Pomodoro: 25 minutes focus, 5 minutes break", "पोमोडोरो: 25 मिनट ध्यान, 5 मिनट ब्रेक"],
      ["Phone in another room during study blocks", "पढ़ाई के समय फ़ोन दूसरे कमरे में"],
    ],
    help: [BOOK, ["Procrastination since childhood with restlessness and forgetfulness", "बचपन से बेचैनी और भूलने के साथ टालमटोल"], ["Avoidance with sadness or loss of interest", "उदासी या रुचि खोने के साथ टालना"]],
    faq: [
      ["Am I just lazy?", "क्या मैं बस आलसी हूँ?", "Usually not. Procrastination is an emotion-management problem that can be learned out of.", "आमतौर पर नहीं। टालमटोल भावनाओं को संभालने की समस्या है जिसे बदला जा सकता है।"],
      ["Can ADHD be diagnosed in older students?", "क्या बड़े विद्यार्थियों में ADHD का निदान हो सकता है?", "Yes. Adult ADHD is assessed with a detailed history including childhood.", "हाँ। बचपन सहित विस्तृत इतिहास के साथ वयस्क ADHD की जाँच होती है।"],
    ],
    tags: ["procrastination", "talna", "padhai nahi hoti"],
    video: ["study", "adhd"],
  },
  {
    slug: "science-backed-study-techniques",
    title: ["Study techniques that actually work", "पढ़ाई की तकनीकें जो सच में काम करती हैं"],
    excerpt: ["Re-reading and highlighting feel productive but don't stick. Active recall, spaced repetition and practice testing — and how to use them.", "दोबारा पढ़ना और हाइलाइट करना उत्पादक लगता है पर याद नहीं रहता। एक्टिव रिकॉल, स्पेस्ड रिपीटिशन और प्रैक्टिस टेस्ट — और इनका इस्तेमाल कैसे करें।"],
    related: ["concentration-problems-students-india", "exam-anxiety-students-india", "student-exam-stress-india"],
    refs: ["who-adolescent", "who-live-life"],
    intro: [
      ["Memory strengthens when you pull information out of your mind, not when you put it in again.", "याददाश्त तब मज़बूत होती है जब आप जानकारी दिमाग़ से निकालते हैं, न कि दोबारा डालते हैं।"],
      ["Good techniques reduce study hours and exam anxiety.", "अच्छी तकनीकें पढ़ाई के घंटे और परीक्षा की चिंता घटाती हैं।"],
    ],
    key: [
      ["Active recall: test yourself before looking at notes", "एक्टिव रिकॉल: नोट्स देखने से पहले ख़ुद को परखें"],
      ["Spaced repetition: revise at increasing gaps (1, 3, 7, 21 days)", "स्पेस्ड रिपीटिशन: बढ़ते अंतराल पर रिवीज़न (1, 3, 7, 21 दिन)"],
      ["Interleaving: mix topics and question types", "इंटरलीविंग: विषय और सवालों के प्रकार मिलाएँ"],
    ],
    sym: [
      ["Forgetting what was studied last week", "पिछले हफ़्ते पढ़ा भूल जाना"],
      ["Feeling prepared but blanking in tests", "तैयार लगना पर टेस्ट में दिमाग़ ख़ाली"],
      ["Spending hours making notes", "नोट्स बनाने में घंटों लगाना"],
    ],
    cause: [
      ["Passive methods such as re-reading", "दोबारा पढ़ने जैसे निष्क्रिय तरीक़े"],
      ["Cramming before exams", "परीक्षा से पहले रटना"],
      ["Poor sleep affecting memory", "ख़राब नींद से याददाश्त पर असर"],
    ],
    risk: [
      ["Very large syllabus", "बहुत बड़ा सिलेबस"],
      ["Anxiety during tests", "टेस्ट में घबराहट"],
      ["Irregular revision", "अनियमित रिवीज़न"],
    ],
    mgmt: [
      ["Close the book and write or say what you remember", "किताब बंद करके जो याद है वह लिखें या बोलें"],
      ["Use flashcards or question banks with a revision calendar", "रिवीज़न कैलेंडर के साथ फ़्लैशकार्ड या प्रश्न बैंक"],
      ["Explain a topic aloud as if teaching a friend", "विषय को ज़ोर से ऐसे समझाएँ जैसे दोस्त को पढ़ा रहे हों"],
      ["Regular timed mock tests with error analysis", "ग़लतियों के विश्लेषण के साथ नियमित समयबद्ध मॉक टेस्ट"],
    ],
    help: [BOOK, ["Concentration or memory problems despite good methods", "अच्छे तरीक़ों के बावजूद ध्यान या याददाश्त की दिक़्क़त"], ["Severe anxiety in exams", "परीक्षा में गंभीर घबराहट"]],
    faq: [
      ["Are memory tonics useful?", "क्या मेमोरी टॉनिक काम आते हैं?", "There is no good evidence for memory tonics. Sleep, active recall and regular revision work better.", "मेमोरी टॉनिक के लिए अच्छे सबूत नहीं हैं। नींद, एक्टिव रिकॉल और नियमित रिवीज़न बेहतर काम करते हैं।"],
      ["Is group study helpful?", "क्या ग्रुप स्टडी मददगार है?", "Yes, if it involves quizzing and explaining; not if it becomes chatting.", "हाँ, अगर उसमें सवाल-जवाब और समझाना हो; बातचीत बन जाए तो नहीं।"],
    ],
    tags: ["study tips", "memory", "yaad nahi rehta", "active recall"],
    video: ["study", "exam"],
  },
  {
    slug: "parental-pressure-and-students",
    title: ["Parental pressure: talking to parents about stress", "माता-पिता का दबाव: तनाव के बारे में कैसे बात करें"],
    excerpt: ["Most parents want the best but pressure can backfire. Guidance for students to express stress and for parents to support without adding pressure.", "ज़्यादातर माता-पिता अच्छा चाहते हैं पर दबाव उल्टा पड़ सकता है। विद्यार्थियों के लिए तनाव बताने और माता-पिता के लिए बिना दबाव साथ देने की सलाह।"],
    related: ["student-exam-stress-india", "family-therapy-india", "teen-depression-india"],
    refs: ["who-adolescent", "telemanas"],
    intro: [
      ["Pressure often comes from love, sacrifice and worry about the future.", "दबाव अक्सर प्यार, त्याग और भविष्य की चिंता से आता है।"],
      ["When children feel their worth depends on marks, stress and hiding increase.", "जब बच्चों को लगे कि उनकी क़ीमत नंबरों पर टिकी है, तनाव और छुपाना बढ़ता है।"],
    ],
    key: [
      ["Supportive involvement helps; controlling pressure harms", "सहायक भागीदारी मदद करती है; नियंत्रण वाला दबाव नुकसान"],
      ["Children should feel safe sharing bad news", "बच्चों को बुरी ख़बर बताने में सुरक्षित महसूस होना चाहिए"],
      ["Career choices work best when discussed, not imposed", "करियर के फ़ैसले थोपने से नहीं, बातचीत से बेहतर"],
    ],
    sym: [
      ["Hiding test results", "टेस्ट रिज़ल्ट छुपाना"],
      ["Fear or anxiety before calls home", "घर कॉल करने से पहले डर या घबराहट"],
      ["Frequent arguments about studies", "पढ़ाई पर बार-बार बहस"],
    ],
    cause: [
      ["Comparison with relatives or neighbours' children", "रिश्तेदारों या पड़ोसियों के बच्चों से तुलना"],
      ["Family financial investment in coaching", "कोचिंग में परिवार का आर्थिक निवेश"],
      ["Parents' own unfulfilled dreams", "माता-पिता के अपने अधूरे सपने"],
    ],
    risk: [
      ["Pressure to choose a single career path", "एक ही करियर चुनने का दबाव"],
      ["Harsh punishment for low marks", "कम नंबर पर कठोर सज़ा"],
      ["Lack of open communication at home", "घर में खुली बातचीत की कमी"],
    ],
    mgmt: [
      ["Students: choose a calm time, use 'I feel…' statements", "विद्यार्थी: शांत समय चुनें, 'मुझे लगता है…' से बात करें"],
      ["Parents: ask 'How are you?' before 'How much did you score?'", "माता-पिता: 'कितने नंबर आए?' से पहले 'कैसे हो?' पूछें"],
      ["Praise effort and consistency, not only results", "सिर्फ़ नतीजे नहीं, मेहनत और निरंतरता की तारीफ़"],
      ["Family session with a counsellor if talks keep breaking down", "बातचीत बार-बार टूटे तो काउंसलर के साथ पारिवारिक सत्र"],
    ],
    help: [BOOK, ["Child withdrawing, not eating or sleeping", "बच्चा अलग-थलग, न खाए न सोए"], CRISIS],
    faq: [
      ["How do I tell my parents I want a different career?", "माता-पिता को कैसे बताऊँ कि मैं अलग करियर चाहता हूँ?", "Research the option, share a clear plan, and involve a career counsellor if needed.", "विकल्प के बारे में जानकारी जुटाएँ, साफ़ योजना बताएँ, और ज़रूरत हो तो करियर काउंसलर को शामिल करें।"],
      ["As a parent, is any pressure good?", "माता-पिता के रूप में क्या कोई दबाव अच्छा है?", "Clear expectations with warmth and support help; fear-based pressure does not.", "गर्मजोशी और सहारे के साथ साफ़ उम्मीदें मदद करती हैं; डर वाला दबाव नहीं।"],
    ],
    tags: ["parents pressure", "mummy papa", "career pressure"],
    video: ["student", "parenting"],
  },
  {
    slug: "imposter-feelings-medical-students",
    title: ["Imposter feelings in medical students and residents", "मेडिकल विद्यार्थियों और रेज़िडेंट्स में 'इम्पोस्टर' भावना"],
    excerpt: ["Feeling you don't belong or will be 'found out' is common in medicine. Why it happens, how it links to burnout, and ways to cope.", "यह महसूस करना कि आप यहाँ के लायक़ नहीं या 'पकड़े जाएँगे', मेडिकल में आम है। ऐसा क्यों होता है, थकान से कैसे जुड़ा है, और निपटने के तरीक़े।"],
    related: ["medical-student-mental-health-india", "mbbs-student-stress-india", "resident-doctor-burnout-india"],
    refs: ["who-depression", "telemanas"],
    intro: [
      ["Imposter feelings are the persistent belief that your success is due to luck and that others overrate you.", "इम्पोस्टर भावना यह लगातार मान्यता है कि आपकी सफलता क़िस्मत से है और दूसरे आपको ज़्यादा आँकते हैं।"],
      ["They are especially common in high-achieving, competitive fields such as medicine.", "यह ख़ासकर मेडिकल जैसे उच्च-उपलब्धि वाले प्रतिस्पर्धी क्षेत्रों में आम है।"],
    ],
    key: [
      ["It is a pattern of thinking, not a diagnosis", "यह सोच का पैटर्न है, निदान नहीं"],
      ["Talking about it reduces its power — many peers feel the same", "इस पर बात करने से इसकी ताक़त घटती है — कई साथी ऐसा ही महसूस करते हैं"],
      ["Linked with anxiety, depression and burnout", "चिंता, डिप्रेशन और थकान से जुड़ा"],
    ],
    sym: [
      ["Dismissing praise as luck", "तारीफ़ को क़िस्मत मानना"],
      ["Over-preparing out of fear", "डर से ज़रूरत से ज़्यादा तैयारी"],
      ["Avoiding questions in rounds for fear of looking ignorant", "अनजान दिखने के डर से राउंड में सवाल न पूछना"],
    ],
    cause: [
      ["Constant evaluation and hierarchy", "लगातार मूल्यांकन और पदानुक्रम"],
      ["Comparison with high-performing peers", "बेहतर प्रदर्शन वाले साथियों से तुलना"],
      ["Perfectionist personality", "परफ़ेक्शनिस्ट स्वभाव"],
    ],
    risk: [
      ["First-generation professionals", "परिवार की पहली पीढ़ी के पेशेवर"],
      ["Long duty hours and sleep loss", "लंबी ड्यूटी और नींद की कमी"],
      ["Public criticism in the workplace", "कार्यस्थल पर सार्वजनिक आलोचना"],
    ],
    mgmt: [
      ["Keep a record of positive feedback and achievements", "सकारात्मक फ़ीडबैक और उपलब्धियों का रिकॉर्ड रखें"],
      ["Reframe mistakes as part of learning", "ग़लतियों को सीखने का हिस्सा मानें"],
      ["Peer support groups and mentorship", "साथियों का सहायता समूह और मेंटरशिप"],
      ["Confidential professional help when distress grows", "परेशानी बढ़े तो गोपनीय पेशेवर मदद"],
    ],
    help: [BOOK, ["Persistent low mood, exhaustion or thoughts of quitting", "लगातार उदासी, थकावट या छोड़ने के विचार"], CRISIS],
    faq: [
      ["Will seeking help affect my medical career?", "क्या मदद लेने से मेरे मेडिकल करियर पर असर होगा?", "Consultations are confidential under the MHCA 2017. Untreated illness poses more risk than treatment.", "MHCA 2017 के तहत परामर्श गोपनीय है। बिना इलाज की बीमारी इलाज से ज़्यादा जोखिम है।"],
      ["Do senior doctors feel this too?", "क्या वरिष्ठ डॉक्टर भी ऐसा महसूस करते हैं?", "Yes, many do. Sharing such experiences is a powerful part of mentoring.", "हाँ, बहुत से करते हैं। ऐसे अनुभव साझा करना मेंटरिंग का अहम हिस्सा है।"],
    ],
    tags: ["imposter syndrome", "mbbs", "resident", "doctor stress"],
    video: ["doctor", "burnout"],
  },
  {
    slug: "ragging-and-mental-health",
    title: ["Ragging and its mental health effects: what to do", "रैगिंग और मानसिक स्वास्थ्य पर असर: क्या करें"],
    excerpt: ["Ragging is a punishable offence in India. How it affects mental health, how to report through the UGC anti-ragging helpline, and getting support.", "भारत में रैगिंग दंडनीय अपराध है। यह मानसिक स्वास्थ्य पर कैसे असर डालती है, UGC एंटी-रैगिंग हेल्पलाइन पर शिकायत कैसे करें, और सहारा कैसे पाएँ।"],
    related: ["ptsd-trauma-treatment-india", "acute-stress-reaction-india", "medical-student-mental-health-india"],
    refs: ["ugc-ragging", "telemanas"],
    intro: [
      ["Ragging includes any act that causes physical or mental harm, humiliation or fear to a student.", "रैगिंग में कोई भी ऐसा काम शामिल है जिससे विद्यार्थी को शारीरिक या मानसिक नुकसान, अपमान या डर हो।"],
      ["It is prohibited by UGC regulations; colleges must have anti-ragging committees.", "UGC नियमों से यह प्रतिबंधित है; कॉलेजों में एंटी-रैगिंग समिति होना अनिवार्य है।"],
    ],
    key: [
      ["The national anti-ragging helpline is 1800-180-5522 (toll free)", "राष्ट्रीय एंटी-रैगिंग हेल्पलाइन 1800-180-5522 (टोल फ़्री)"],
      ["Complaints can be made anonymously", "शिकायत गुमनाम रूप से की जा सकती है"],
      ["Effects can last long after the ragging stops", "रैगिंग रुकने के बाद भी असर लंबे समय तक रह सकता है"],
    ],
    sym: [
      ["Fear of going to college or hostel", "कॉलेज या हॉस्टल जाने से डर"],
      ["Nightmares, startle, flashbacks", "डरावने सपने, चौंकना, फ़्लैशबैक"],
      ["Shame, low mood, wanting to leave the course", "शर्म, उदासी, कोर्स छोड़ने की इच्छा"],
    ],
    cause: [
      ["Humiliation, threats or physical abuse by seniors", "सीनियर्स द्वारा अपमान, धमकी या शारीरिक दुर्व्यवहार"],
      ["Isolation of new students", "नए विद्यार्थियों का अकेलापन"],
      ["Culture of silence", "चुप रहने का माहौल"],
    ],
    risk: [
      ["Hostel residence in the first year", "पहले साल हॉस्टल में रहना"],
      ["Being from a different region or background", "अलग क्षेत्र या पृष्ठभूमि से होना"],
      ["Past trauma or anxiety", "पहले का आघात या चिंता"],
    ],
    mgmt: [
      ["Report to the college anti-ragging committee or helpline", "कॉलेज की एंटी-रैगिंग समिति या हेल्पलाइन पर शिकायत"],
      ["Tell parents or a trusted faculty member", "माता-पिता या भरोसेमंद शिक्षक को बताएँ"],
      ["Note dates, names and messages as evidence", "तारीख़, नाम और मैसेज सबूत के रूप में नोट करें"],
      ["Psychological support for anxiety or trauma symptoms", "चिंता या आघात के लक्षणों के लिए मनोवैज्ञानिक मदद"],
    ],
    help: [BOOK, ["Flashbacks, panic or avoidance lasting more than a month", "एक महीने से ज़्यादा फ़्लैशबैक, घबराहट या बचना"], CRISIS],
    faq: [
      ["Will reporting make it worse?", "क्या शिकायत करने से हालात बिगड़ेंगे?", "Colleges are legally required to protect complainants; anonymous complaints are possible.", "कॉलेज क़ानूनन शिकायतकर्ता की रक्षा के लिए बाध्य हैं; गुमनाम शिकायत संभव है।"],
      ["Is 'mild' ragging harmless fun?", "क्या 'हल्की' रैगिंग मज़ाक है?", "No. Any act that humiliates or frightens a student is ragging and can harm mental health.", "नहीं। विद्यार्थी को अपमानित या डराने वाला कोई भी काम रैगिंग है और मानसिक नुकसान कर सकता है।"],
    ],
    tags: ["ragging", "anti ragging", "college"],
    video: ["student", "trauma"],
  },
  {
    slug: "career-confusion-after-12th",
    title: ["Career confusion after 12th: reducing the anxiety", "12वीं के बाद करियर को लेकर उलझन: चिंता कैसे घटाएँ"],
    excerpt: ["Feeling lost about career choices is common. A structured way to explore interests and options, and when confusion is actually anxiety or depression.", "करियर चुनने को लेकर उलझन आम है। रुचियों और विकल्पों को परखने का व्यवस्थित तरीक़ा, और कब उलझन असल में चिंता या डिप्रेशन होती है।"],
    related: ["student-exam-stress-india", "generalized-anxiety-disorder-india", "adjustment-disorder-india"],
    refs: ["who-adolescent", "telemanas"],
    intro: [
      ["Choosing a career at 17–18 with limited exposure is genuinely difficult.", "17–18 की उम्र में सीमित अनुभव के साथ करियर चुनना सच में कठिन है।"],
      ["Confusion is normal; prolonged paralysis with distress needs support.", "उलझन सामान्य है; परेशानी के साथ लंबी जड़ता में मदद चाहिए।"],
    ],
    key: [
      ["There are many paths into most careers", "ज़्यादातर करियर में जाने के कई रास्ते हैं"],
      ["Interests and strengths matter as much as marks", "रुचि और क्षमता नंबरों जितनी ही मायने रखती है"],
      ["Decisions can be revisited later", "फ़ैसलों पर बाद में फिर विचार हो सकता है"],
    ],
    sym: [
      ["Constant comparison and second-guessing", "लगातार तुलना और ख़ुद पर शक"],
      ["Avoiding conversations about the future", "भविष्य की बात से बचना"],
      ["Sleep loss and irritability", "नींद की कमी और चिड़चिड़ापन"],
    ],
    cause: [
      ["Limited career guidance", "करियर मार्गदर्शन की कमी"],
      ["Family expectations vs personal interest", "परिवार की उम्मीदें बनाम अपनी रुचि"],
      ["Fear of making the 'wrong' choice", "'ग़लत' चुनाव का डर"],
    ],
    risk: [
      ["Anxiety-prone temperament", "चिंता वाला स्वभाव"],
      ["Poor exam results", "ख़राब परीक्षा परिणाम"],
      ["Peer pressure", "साथियों का दबाव"],
    ],
    mgmt: [
      ["List interests, strengths and values", "रुचियाँ, क्षमताएँ और मूल्य लिखें"],
      ["Talk to people working in 2–3 fields you are considering", "जिन 2–3 क्षेत्रों पर विचार है, वहाँ काम करने वालों से बात करें"],
      ["Use a qualified career counsellor or aptitude assessment", "योग्य करियर काउंसलर या एप्टीट्यूड जाँच"],
      ["Set a decision date to avoid endless worry", "अंतहीन चिंता से बचने के लिए फ़ैसले की तारीख़ तय करें"],
    ],
    help: [BOOK, ["Constant worry, panic or hopelessness about the future", "भविष्य को लेकर लगातार चिंता, घबराहट या निराशा"], CRISIS],
    faq: [
      ["Is it too late to change streams?", "क्या स्ट्रीम बदलने में देर हो गई?", "Often not. Many courses accept students from different streams; explore options with a counsellor.", "अक्सर नहीं। कई कोर्स अलग स्ट्रीम के विद्यार्थियों को लेते हैं; काउंसलर के साथ विकल्प देखें।"],
      ["Can a psychiatrist help with career choice?", "क्या मनोचिकित्सक करियर चुनने में मदद कर सकते हैं?", "A psychiatrist helps when anxiety or low mood are blocking decisions; a career counsellor helps with options.", "जब चिंता या उदासी फ़ैसले में रुकावट बने तब मनोचिकित्सक मदद करते हैं; विकल्पों में करियर काउंसलर।"],
    ],
    tags: ["career", "12th ke baad", "confusion"],
    video: ["student"],
  },
]);
