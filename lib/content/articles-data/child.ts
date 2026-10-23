import { batch } from "./_build";

type P = [string, string];
const PARENT_HELP: P = ["Parents can book a consultation first to discuss concerns before involving the child", "बच्चे को शामिल करने से पहले माता-पिता चिंताओं पर बात करने के लिए पहले परामर्श बुक कर सकते हैं"];

export const CHILD_ARTICLES = batch("child", [
  {
    slug: "adhd-or-just-naughty",
    title: ["ADHD or just naughty? Signs parents should know", "ADHD या बस शरारत? माता-पिता किन संकेतों को जानें"],
    excerpt: ["All children are active, but ADHD causes persistent inattention and impulsivity across home and school. How to tell the difference and what to do.", "सभी बच्चे चंचल होते हैं, पर ADHD में घर और स्कूल दोनों जगह लगातार ध्यान की कमी और जल्दबाज़ी होती है। फ़र्क़ कैसे पहचानें और क्या करें।"],
    related: ["adhd-psychiatrist-india", "child-psychiatrist-india", "specific-learning-disorder-india"],
    refs: ["nice-adhd", "aap-adhd", "icd11"],
    intro: [
      ["ADHD is a neurodevelopmental condition, not the result of bad parenting or a naughty nature.", "ADHD एक न्यूरोडेवलपमेंटल स्थिति है, ख़राब परवरिश या शरारती स्वभाव का नतीजा नहीं।"],
      ["Children with ADHD want to behave well but find it harder to control attention and impulses.", "ADHD वाले बच्चे अच्छा व्यवहार करना चाहते हैं पर ध्यान और आवेग पर नियंत्रण कठिन होता है।"],
    ],
    key: [
      ["Symptoms appear in more than one setting (home and school)", "लक्षण एक से ज़्यादा जगह (घर और स्कूल) दिखते हैं"],
      ["They are present for at least six months and start before age 12", "कम से कम छह महीने से और 12 साल की उम्र से पहले शुरू"],
      ["Parent training is a first step for young children", "छोटे बच्चों में माता-पिता का प्रशिक्षण पहला क़दम है"],
    ],
    sym: [
      ["Careless mistakes, not finishing tasks, losing things", "लापरवाही की ग़लतियाँ, काम पूरा न करना, चीज़ें खोना"],
      ["Constant fidgeting, running or climbing at the wrong times", "लगातार हिलना, ग़लत समय पर दौड़ना या चढ़ना"],
      ["Interrupting, difficulty waiting turn", "बीच में बोलना, बारी का इंतज़ार न कर पाना"],
    ],
    cause: [
      ["Strong genetic influence", "आनुवंशिकता का बड़ा असर"],
      ["Differences in brain networks for attention", "ध्यान वाले दिमाग़ी नेटवर्क में अंतर"],
      ["Prematurity or low birth weight", "समय से पहले जन्म या कम वज़न"],
    ],
    risk: [
      ["Parent or sibling with ADHD", "माता-पिता या भाई-बहन में ADHD"],
      ["Learning difficulties", "सीखने में कठिनाई"],
      ["Exposure to tobacco or alcohol in pregnancy", "गर्भावस्था में तंबाकू या शराब"],
    ],
    mgmt: [
      ["Assessment with information from parents and teachers", "माता-पिता और शिक्षकों की जानकारी के साथ जाँच"],
      ["Parent training: routines, praise, clear consequences", "माता-पिता का प्रशिक्षण: दिनचर्या, तारीफ़, साफ़ नतीजे"],
      ["Classroom support: front seating, short tasks, breaks", "कक्षा में मदद: आगे बैठाना, छोटे काम, ब्रेक"],
      ["Medicines for school-age children when symptoms are significant", "लक्षण ज़्यादा हों तो स्कूल जाने वाले बच्चों में दवाएँ"],
    ],
    help: [
      ["Repeated complaints from school", "स्कूल से बार-बार शिकायत"],
      ["Falling marks despite ability", "क्षमता के बावजूद नंबर गिरना"],
      PARENT_HELP,
    ],
    faq: [
      ["Will my child outgrow ADHD?", "क्या बच्चा बड़ा होकर ADHD से बाहर आ जाएगा?", "Hyperactivity often reduces with age, but attention problems may continue; treatment helps at every age.", "हाइपरएक्टिविटी उम्र के साथ अक्सर कम होती है, पर ध्यान की दिक़्क़त रह सकती है; हर उम्र में इलाज मदद करता है।"],
      ["Does sugar cause ADHD?", "क्या चीनी से ADHD होता है?", "No. Diet does not cause ADHD, though a balanced routine supports behaviour.", "नहीं। खान-पान से ADHD नहीं होता, हालाँकि संतुलित दिनचर्या व्यवहार में मदद करती है।"],
    ],
    tags: ["adhd", "chanchal", "dhyan nahi", "shararat"],
    video: ["adhd"],
  },
  {
    slug: "early-signs-of-autism",
    title: ["Early signs of autism in toddlers", "छोटे बच्चों में ऑटिज़्म के शुरुआती संकेत"],
    excerpt: ["Not responding to name, little eye contact, delayed speech or repetitive play? Early signs of autism and why early support makes a big difference.", "नाम पर प्रतिक्रिया न देना, कम आँख मिलाना, बोलने में देरी या दोहराव वाला खेल? ऑटिज़्म के शुरुआती संकेत और जल्दी मदद से बड़ा फ़र्क़ क्यों पड़ता है।"],
    related: ["autism-psychiatrist-india", "speech-language-delay-india", "child-psychiatrist-india"],
    refs: ["nice-autism", "who-autism", "icd11"],
    intro: [
      ["Autism affects social communication and behaviour. Signs often appear before age 2–3.", "ऑटिज़्म सामाजिक बातचीत और व्यवहार पर असर डालता है। संकेत अक्सर 2–3 साल की उम्र से पहले दिखते हैं।"],
      ["Early assessment and therapy improve communication and independence.", "जल्दी जाँच और थेरेपी से बातचीत और आत्मनिर्भरता सुधरती है।"],
    ],
    key: [
      ["Autism is a spectrum — every child is different", "ऑटिज़्म एक स्पेक्ट्रम है — हर बच्चा अलग है"],
      ["It is not caused by vaccines or parenting", "यह टीकों या परवरिश से नहीं होता"],
      ["Early intervention matters more than a label", "लेबल से ज़्यादा जल्दी मदद मायने रखती है"],
    ],
    sym: [
      ["Not responding to name by about 12 months", "लगभग 12 महीने तक नाम पर प्रतिक्रिया न देना"],
      ["Little pointing, showing or eye contact", "कम इशारा करना, दिखाना या आँख मिलाना"],
      ["Repetitive movements, lining up toys, strong reactions to sounds", "दोहराने वाली हरकतें, खिलौने लाइन में लगाना, आवाज़ों पर तेज़ प्रतिक्रिया"],
    ],
    cause: [
      ["Genetic and early brain development factors", "आनुवंशिक और दिमाग़ के शुरुआती विकास के कारण"],
      ["Not caused by screen time alone or by vaccines", "सिर्फ़ स्क्रीन टाइम या टीकों से नहीं"],
      ["Higher rates in siblings of autistic children", "ऑटिस्टिक बच्चों के भाई-बहनों में ज़्यादा"],
    ],
    risk: [
      ["Sibling with autism", "भाई-बहन में ऑटिज़्म"],
      ["Premature birth", "समय से पहले जन्म"],
      ["Older parental age", "माता-पिता की ज़्यादा उम्र"],
    ],
    mgmt: [
      ["Hearing test and developmental assessment", "सुनने की जाँच और विकास की जाँच"],
      ["Speech, occupational and behavioural therapy", "स्पीच, ऑक्यूपेशनल और बिहेवियरल थेरेपी"],
      ["Parent-led communication strategies at home", "घर पर माता-पिता द्वारा बातचीत की रणनीतियाँ"],
      ["Medicines only for specific problems such as severe irritability or sleep", "दवाएँ सिर्फ़ ख़ास समस्याओं जैसे तेज़ चिड़चिड़ापन या नींद के लिए"],
    ],
    help: [
      ["Loss of words or social skills at any age — urgent assessment", "किसी भी उम्र में शब्द या सामाजिक कौशल खोना — तुरंत जाँच"],
      ["No words by 16–18 months", "16–18 महीने तक कोई शब्द नहीं"],
      PARENT_HELP,
    ],
    faq: [
      ["Can autism be cured?", "क्या ऑटिज़्म ठीक हो सकता है?", "Autism is lifelong, but therapy helps children communicate, learn and live more independently.", "ऑटिज़्म ज़िंदगी भर रहता है, पर थेरेपी से बच्चे बातचीत, सीखने और आत्मनिर्भरता में आगे बढ़ते हैं।"],
      ["Is too much mobile the cause?", "क्या ज़्यादा मोबाइल इसका कारण है?", "Screens do not cause autism, but limiting screens and increasing interaction helps all young children.", "स्क्रीन से ऑटिज़्म नहीं होता, पर स्क्रीन कम करना और बातचीत बढ़ाना सभी छोटे बच्चों के लिए फ़ायदेमंद है।"],
    ],
    tags: ["autism", "bolta nahi", "aankh nahi milata"],
    video: ["autism", "ऑटिज़्म"],
  },
  {
    slug: "screen-time-for-young-children",
    title: ["Screen time for young children: guidelines for parents", "छोटे बच्चों के लिए स्क्रीन टाइम: माता-पिता के लिए दिशानिर्देश"],
    excerpt: ["How much screen time is okay for babies, toddlers and preschoolers? WHO guidance, effects on speech and sleep, and practical alternatives.", "शिशुओं, छोटे बच्चों और प्री-स्कूल बच्चों के लिए कितना स्क्रीन टाइम ठीक है? WHO के दिशानिर्देश, बोलने और नींद पर असर, और व्यावहारिक विकल्प।"],
    related: ["speech-language-delay-india", "child-psychiatrist-india", "social-media-overuse-india"],
    refs: ["who-under5"],
    intro: [
      ["Phones often keep young children quiet during meals or chores. Too much screen time can displace talking, play and sleep — all vital for development.", "खाना खिलाते या काम करते समय फ़ोन अक्सर बच्चों को शांत रखता है। ज़्यादा स्क्रीन बातचीत, खेल और नींद की जगह ले सकती है — जो विकास के लिए ज़रूरी हैं।"],
      ["The WHO recommends no sedentary screen time for children under 2, and no more than one hour a day for ages 2–4.", "WHO 2 साल से कम उम्र के बच्चों के लिए बैठकर स्क्रीन देखना नहीं, और 2–4 साल के लिए दिन में एक घंटे से ज़्यादा नहीं की सलाह देता है।"],
    ],
    key: [
      ["Less is better for under-5s", "5 साल से कम उम्र में जितना कम उतना बेहतर"],
      ["Watching together and talking about it is better than watching alone", "अकेले देखने से बेहतर है साथ देखना और उस पर बात करना"],
      ["No screens during meals or before bed", "खाने के समय या सोने से पहले स्क्रीन नहीं"],
    ],
    sym: [
      ["Tantrums when the phone is taken away", "फ़ोन लेने पर ज़िद और रोना"],
      ["Delayed speech or little interest in people", "बोलने में देरी या लोगों में कम रुचि"],
      ["Difficulty sleeping", "सोने में दिक़्क़त"],
    ],
    cause: [
      ["Busy households and convenience", "व्यस्त घर और सुविधा"],
      ["Using phones to feed or calm children", "खिलाने या शांत करने के लिए फ़ोन"],
      ["Adults' own heavy screen use", "बड़ों का ख़ुद का ज़्यादा स्क्रीन इस्तेमाल"],
    ],
    risk: [
      ["Screens in the bedroom", "बेडरूम में स्क्रीन"],
      ["Background TV all day", "दिन भर पीछे चलता टीवी"],
      ["Few outdoor play opportunities", "बाहर खेलने के कम अवसर"],
    ],
    mgmt: [
      ["Screen-free meals and bedtime routine", "बिना स्क्रीन खाना और सोने की दिनचर्या"],
      ["Replace with talking, reading picture books, songs and play", "बातचीत, चित्र-किताबें, गाने और खेल से बदलें"],
      ["Set family rules adults follow too", "परिवार के नियम जिन्हें बड़े भी मानें"],
      ["Speech assessment if speech is delayed", "बोलने में देरी हो तो स्पीच जाँच"],
    ],
    help: [
      ["Speech delay or poor eye contact", "बोलने में देरी या कम आँख मिलाना"],
      ["Severe tantrums around devices", "डिवाइस को लेकर तेज़ ज़िद"],
      PARENT_HELP,
    ],
    faq: [
      ["Are educational apps okay?", "क्या शैक्षणिक ऐप ठीक हैं?", "For under-5s, real-life interaction teaches language far better than apps.", "5 साल से कम उम्र में असली बातचीत ऐप से कहीं बेहतर भाषा सिखाती है।"],
      ["Are video calls with grandparents counted?", "क्या दादा-दादी से वीडियो कॉल गिनी जाती है?", "Interactive video calls are generally considered different from passive watching.", "बातचीत वाली वीडियो कॉल को आमतौर पर बैठकर देखने से अलग माना जाता है।"],
    ],
    tags: ["mobile bachcha", "screen time", "cartoon"],
  },
  {
    slug: "handling-temper-tantrums",
    title: ["Handling temper tantrums calmly", "बच्चों की ज़िद और गुस्से को शांति से कैसे सँभालें"],
    excerpt: ["Tantrums are a normal part of development in young children. Practical steps to prevent and handle them, and when they may signal a problem.", "छोटे बच्चों में ज़िद और गुस्सा विकास का सामान्य हिस्सा है। इन्हें रोकने और सँभालने के व्यावहारिक क़दम, और कब ये किसी समस्या का संकेत हो सकते हैं।"],
    related: ["odd-conduct-disorder-india", "child-psychiatrist-india", "adhd-psychiatrist-india"],
    refs: ["mhgap"],
    intro: [
      ["Young children have big feelings and limited words. Tantrums are common between ages 1 and 4.", "छोटे बच्चों की भावनाएँ बड़ी और शब्द कम होते हैं। 1 से 4 साल की उम्र में ज़िद आम है।"],
      ["Calm, consistent responses teach children to manage emotions over time.", "शांत और एक जैसी प्रतिक्रिया से बच्चे समय के साथ भावनाएँ सँभालना सीखते हैं।"],
    ],
    key: [
      ["Stay calm — your calm is contagious", "शांत रहें — आपकी शांति बच्चे में आती है"],
      ["Do not reward tantrums by giving in", "हार मानकर ज़िद को इनाम न दें"],
      ["Praise calm behaviour often", "शांत व्यवहार की बार-बार तारीफ़ करें"],
    ],
    sym: [
      ["Crying, screaming, throwing or lying on the floor", "रोना, चीख़ना, फेंकना या ज़मीन पर लेटना"],
      ["Triggered by tiredness, hunger or frustration", "थकान, भूख या झुंझलाहट से शुरू"],
      ["Usually brief, easing by school age", "आमतौर पर छोटे, स्कूल की उम्र तक कम"],
    ],
    cause: [
      ["Developing language and emotional control", "विकसित होती भाषा और भावनात्मक नियंत्रण"],
      ["Tiredness, hunger, change in routine", "थकान, भूख, दिनचर्या में बदलाव"],
      ["Learning that tantrums get results", "यह सीखना कि ज़िद से काम बनता है"],
    ],
    risk: [
      ["Inconsistent rules between adults", "बड़ों के बीच अलग-अलग नियम"],
      ["Speech delay or developmental problems", "बोलने में देरी या विकास की समस्या"],
      ["Family stress", "परिवार का तनाव"],
    ],
    mgmt: [
      ["Prevent: regular meals, naps and warnings before transitions", "रोकें: समय पर खाना, झपकी और बदलाव से पहले चेतावनी"],
      ["During: keep the child safe, stay nearby, speak little", "दौरान: बच्चे को सुरक्षित रखें, पास रहें, कम बोलें"],
      ["After: name the feeling and reconnect", "बाद में: भावना का नाम लें और फिर जुड़ें"],
      ["Never hit or shame — it increases aggression", "कभी मारें या शर्मिंदा न करें — इससे आक्रामकता बढ़ती है"],
    ],
    help: [
      ["Tantrums after age 5 that are frequent or violent", "5 साल के बाद बार-बार या हिंसक ज़िद"],
      ["Self-injury during tantrums", "ज़िद के दौरान ख़ुद को चोट"],
      PARENT_HELP,
    ],
    faq: [
      ["Should I ignore tantrums?", "क्या ज़िद को नज़रअंदाज़ करूँ?", "Ignore the behaviour while keeping the child safe, then give attention once calm.", "बच्चे को सुरक्षित रखते हुए व्यवहार को नज़रअंदाज़ करें, फिर शांत होने पर ध्यान दें।"],
      ["Is time-out okay?", "क्या टाइम-आउट ठीक है?", "Short, calm time-outs (about one minute per year of age) can help older toddlers and preschoolers.", "छोटे, शांत टाइम-आउट (उम्र के हर साल के लिए लगभग एक मिनट) बड़े छोटे बच्चों में मदद कर सकते हैं।"],
    ],
    tags: ["zid", "gussa bachcha", "tantrum"],
  },
  {
    slug: "school-refusal",
    title: ["School refusal: when a child will not go to school", "स्कूल जाने से इनकार: जब बच्चा स्कूल न जाना चाहे"],
    excerpt: ["Stomach aches every morning and crying at the school gate? School refusal is often driven by anxiety. Causes, steps for parents and teachers.", "हर सुबह पेट दर्द और स्कूल गेट पर रोना? स्कूल से इनकार अक्सर घबराहट से होता है। कारण और माता-पिता व शिक्षकों के लिए क़दम।"],
    related: ["separation-anxiety-children-india", "child-psychiatrist-india", "teen-depression-india"],
    refs: ["who-adolescent", "nice-depression-young"],
    intro: [
      ["School refusal is not simple laziness or truancy. Many children feel intense anxiety, physical symptoms or low mood about school.", "स्कूल से इनकार सिर्फ़ आलस या बंक नहीं है। बहुत से बच्चे स्कूल को लेकर तीव्र घबराहट, शारीरिक लक्षण या उदासी महसूस करते हैं।"],
      ["The longer a child stays home, the harder returning becomes.", "बच्चा जितना ज़्यादा घर रहता है, लौटना उतना ही कठिन होता है।"],
    ],
    key: [
      ["Find the reason: anxiety, bullying, learning difficulty or depression", "कारण खोजें: घबराहट, बुलिंग, सीखने की कठिनाई या डिप्रेशन"],
      ["A gradual, planned return works best", "धीरे-धीरे, योजना के साथ वापसी सबसे अच्छी"],
      ["Parents and school must work together", "माता-पिता और स्कूल मिलकर काम करें"],
    ],
    sym: [
      ["Morning stomach aches or headaches that settle on holidays", "सुबह पेट या सिर दर्द जो छुट्टियों में ठीक हो जाता है"],
      ["Crying, pleading or anger before school", "स्कूल से पहले रोना, मिन्नतें या ग़ुस्सा"],
      ["Frequent absences", "बार-बार अनुपस्थिति"],
    ],
    cause: [
      ["Separation or social anxiety", "अलगाव या सामाजिक घबराहट"],
      ["Bullying, teacher conflict, exam fear", "बुलिंग, शिक्षक से टकराव, परीक्षा का डर"],
      ["Learning difficulties or depression", "सीखने की कठिनाई या डिप्रेशन"],
    ],
    risk: [
      ["School change or moving home", "स्कूल या घर बदलना"],
      ["Family illness or conflict", "परिवार में बीमारी या कलह"],
      ["Long absence after illness", "बीमारी के बाद लंबी छुट्टी"],
    ],
    mgmt: [
      ["Medical check to rule out physical illness", "शारीरिक बीमारी अलग करने के लिए जाँच"],
      ["Talk with the teacher and counsellor; check for bullying", "शिक्षक और काउंसलर से बात; बुलिंग की जाँच"],
      ["Graded return: partial days, a trusted adult at school", "धीरे-धीरे वापसी: आधे दिन, स्कूल में भरोसेमंद व्यक्ति"],
      ["CBT for anxiety; treatment of depression or learning disorders", "घबराहट के लिए CBT; डिप्रेशन या सीखने की समस्या का इलाज"],
    ],
    help: [
      ["More than a week of missed school", "एक हफ़्ते से ज़्यादा स्कूल छूटना"],
      ["Talk of self-harm or hopelessness", "ख़ुद को नुकसान या निराशा की बातें"],
      PARENT_HELP,
    ],
    faq: [
      ["Should I force my child to go?", "क्या बच्चे को ज़बरदस्ती भेजूँ?", "Avoid harsh force; instead plan a gradual return with school support and treat any anxiety.", "सख़्ती से बचें; स्कूल की मदद से धीरे-धीरे वापसी की योजना बनाएँ और घबराहट का इलाज कराएँ।"],
      ["Is home-schooling the answer?", "क्या घर पर पढ़ाना हल है?", "Usually not for anxiety-based refusal — avoidance can make anxiety worse.", "घबराहट वाले इनकार में आमतौर पर नहीं — बचने से घबराहट बढ़ सकती है।"],
    ],
    tags: ["school nahi jana", "pet dard subah", "school refusal"],
  },
  {
    slug: "bullying-signs-for-parents",
    title: ["Bullying and cyberbullying: signs for parents", "बुलिंग और साइबर बुलिंग: माता-पिता के लिए संकेत"],
    excerpt: ["Bullying affects mood, sleep and studies. Signs your child may be bullied in school or online, and steps to protect them.", "बुलिंग से मूड, नींद और पढ़ाई पर असर पड़ता है। संकेत कि बच्चे को स्कूल या ऑनलाइन परेशान किया जा रहा है, और उसे बचाने के क़दम।"],
    related: ["teen-depression-india", "child-psychiatrist-india", "social-media-overuse-india"],
    refs: ["who-adolescent"],
    intro: [
      ["Bullying is repeated, intentional harm — physical, verbal, social or online. Children often hide it out of shame or fear.", "बुलिंग बार-बार, जानबूझकर नुकसान है — शारीरिक, शाब्दिक, सामाजिक या ऑनलाइन। बच्चे शर्म या डर से अक्सर इसे छिपाते हैं।"],
      ["Bullying increases the risk of anxiety, depression and self-harm, so early action matters.", "बुलिंग से घबराहट, डिप्रेशन और ख़ुद को नुकसान का ख़तरा बढ़ता है, इसलिए जल्दी क़दम ज़रूरी हैं।"],
    ],
    key: [
      ["It is never the child's fault", "यह कभी बच्चे की ग़लती नहीं"],
      ["Listen, believe and act calmly", "सुनें, भरोसा करें और शांति से क़दम उठाएँ"],
      ["Schools have a duty to respond", "स्कूल की ज़िम्मेदारी है कि वह कार्रवाई करे"],
    ],
    sym: [
      ["Unexplained injuries, damaged belongings", "बिना वजह चोटें, सामान का नुकसान"],
      ["Reluctance to go to school; sudden drop in marks", "स्कूल जाने से हिचक; अचानक नंबर गिरना"],
      ["Upset after using the phone; deleting accounts", "फ़ोन इस्तेमाल के बाद परेशान; अकाउंट डिलीट करना"],
    ],
    cause: [
      ["Peer power imbalance", "साथियों के बीच ताक़त का असंतुलन"],
      ["Differences in appearance, ability, caste, religion or background", "रूप, क्षमता, जाति, धर्म या पृष्ठभूमि में अंतर"],
      ["Anonymous online platforms", "गुमनाम ऑनलाइन प्लेटफ़ॉर्म"],
    ],
    risk: [
      ["Children with disabilities or learning difficulties", "दिव्यांग या सीखने में कठिनाई वाले बच्चे"],
      ["Social isolation", "सामाजिक अकेलापन"],
      ["Unsupervised device use", "बिना निगरानी के डिवाइस"],
    ],
    mgmt: [
      ["Ask open questions; keep a record of incidents and screenshots", "खुले सवाल पूछें; घटनाओं और स्क्रीनशॉट का रिकॉर्ड रखें"],
      ["Meet the school and request a written action plan", "स्कूल से मिलें और लिखित कार्य योजना माँगें"],
      ["Use block and report features; report serious online harassment to cyber police", "ब्लॉक और रिपोर्ट फ़ीचर; गंभीर ऑनलाइन उत्पीड़न की साइबर पुलिस में शिकायत"],
      ["Counselling for emotional effects", "भावनात्मक असर के लिए काउंसलिंग"],
    ],
    help: [
      ["Talk of self-harm or not wanting to live — urgent", "ख़ुद को नुकसान या जीने की इच्छा न होने की बातें — तुरंत"],
      ["Withdrawal and persistent low mood", "अलग-थलग रहना और लगातार उदासी"],
      PARENT_HELP,
    ],
    faq: [
      ["Should I contact the bully's parents?", "क्या बुली करने वाले बच्चे के माता-पिता से संपर्क करूँ?", "It is usually better to go through the school, which can manage it fairly.", "आमतौर पर स्कूल के ज़रिए जाना बेहतर है, जो निष्पक्ष रूप से सँभाल सकता है।"],
      ["Should I take away my child's phone?", "क्या बच्चे का फ़ोन ले लूँ?", "This can feel like punishment; instead, agree safe-use rules and reporting steps together.", "यह सज़ा जैसा लग सकता है; इसके बजाय मिलकर सुरक्षित इस्तेमाल और रिपोर्ट करने के नियम तय करें।"],
    ],
    tags: ["bullying", "ragging", "school me pareshan"],
  },
  {
    slug: "anxiety-in-children",
    title: ["Anxiety in children: signs and how parents can help", "बच्चों में घबराहट: संकेत और माता-पिता कैसे मदद करें"],
    excerpt: ["Excessive worry, clinginess, stomach aches and avoidance can be anxiety in children. How to support your child and when to get help.", "ज़्यादा चिंता, चिपके रहना, पेट दर्द और बचना बच्चों में घबराहट हो सकती है। बच्चे का साथ कैसे दें और कब मदद लें।"],
    related: ["separation-anxiety-children-india", "child-psychiatrist-india", "generalized-anxiety-disorder-india"],
    refs: ["who-adolescent", "nice-social-anxiety"],
    intro: [
      ["Some fear is normal in childhood. Anxiety becomes a concern when it is intense, lasts weeks and stops a child from doing everyday things.", "बचपन में कुछ डर सामान्य है। चिंता तब है जब घबराहट तीव्र हो, हफ़्तों रहे और बच्चे को रोज़ के काम करने से रोके।"],
      ["Anxious children often have anxious thoughts that they cannot explain in words.", "घबराए बच्चों के मन में ऐसे विचार होते हैं जिन्हें वे शब्दों में नहीं बता पाते।"],
    ],
    key: [
      ["Reassurance alone can keep anxiety going", "सिर्फ़ तसल्ली से घबराहट बनी रह सकती है"],
      ["Brave practice in small steps builds confidence", "छोटे क़दमों में हिम्मत का अभ्यास आत्मविश्वास बढ़ाता है"],
      ["CBT adapted for children is effective", "बच्चों के लिए CBT असरदार है"],
    ],
    sym: [
      ["Worrying 'what if' questions", "बार-बार 'क्या होगा अगर' वाले सवाल"],
      ["Stomach aches, headaches, poor sleep", "पेट दर्द, सिरदर्द, ख़राब नींद"],
      ["Avoiding school, parties or speaking in class", "स्कूल, पार्टी या कक्षा में बोलने से बचना"],
    ],
    cause: [
      ["Temperament and family history", "स्वभाव और पारिवारिक इतिहास"],
      ["Stressful events: illness, moving, exams", "तनाव भरी घटनाएँ: बीमारी, घर बदलना, परीक्षा"],
      ["Learning anxious responses from adults", "बड़ों से घबराहट वाली प्रतिक्रिया सीखना"],
    ],
    risk: [
      ["Overprotective parenting", "ज़रूरत से ज़्यादा सुरक्षा"],
      ["Bullying", "बुलिंग"],
      ["Learning difficulties", "सीखने में कठिनाई"],
    ],
    mgmt: [
      ["Acknowledge feelings: 'I can see you are scared'", "भावनाएँ स्वीकारें: 'मुझे दिख रहा है तुम डरे हुए हो'"],
      ["Encourage small brave steps and praise effort", "छोटे हिम्मत वाले क़दमों को प्रोत्साहित करें और कोशिश की तारीफ़ करें"],
      ["Teach slow breathing and problem-solving", "धीमी साँस और समस्या सुलझाना सिखाएँ"],
      ["CBT with parent involvement; medicines rarely needed", "माता-पिता के साथ CBT; दवाओं की ज़रूरत कम"],
    ],
    help: [
      ["Anxiety affecting school or friendships", "घबराहट से स्कूल या दोस्ती पर असर"],
      ["Panic attacks or refusal to leave parents", "पैनिक अटैक या माता-पिता को न छोड़ना"],
      PARENT_HELP,
    ],
    faq: [
      ["Will my child grow out of it?", "क्या बच्चा बड़ा होकर ठीक हो जाएगा?", "Some do, but untreated anxiety often continues into adulthood; early help is better.", "कुछ हो जाते हैं, पर बिना इलाज की घबराहट अक्सर वयस्क होने तक रहती है; जल्दी मदद बेहतर है।"],
      ["Should I let my child avoid what they fear?", "क्या बच्चे को डर वाली चीज़ से बचने दूँ?", "Short-term avoidance brings relief but long-term fear; gentle, supported facing is better.", "थोड़े समय बचने से राहत मिलती है पर लंबे समय डर बढ़ता है; प्यार से, साथ देकर सामना करना बेहतर है।"],
    ],
    tags: ["bachche me darr", "ghabrahat bachcha", "child anxiety"],
  },
  {
    slug: "talking-to-teenagers",
    title: ["Talking with teenagers: how to keep communication open", "किशोरों से बात करना: बातचीत का रास्ता कैसे खुला रखें"],
    excerpt: ["Teenagers often withdraw from parents. Practical ways to listen, set limits and stay connected — and warning signs that need attention.", "किशोर अक्सर माता-पिता से दूर हो जाते हैं। सुनने, सीमाएँ तय करने और जुड़े रहने के व्यावहारिक तरीक़े — और ध्यान देने वाले चेतावनी संकेत।"],
    related: ["teen-depression-india", "child-psychiatrist-india", "social-media-overuse-india"],
    refs: ["who-adolescent"],
    intro: [
      ["Adolescence brings a natural push for independence. Teenagers still need parents — but as listeners and guides more than instructors.", "किशोरावस्था में आज़ादी की स्वाभाविक इच्छा होती है। किशोरों को अब भी माता-पिता चाहिए — पर निर्देश देने वाले से ज़्यादा सुनने और राह दिखाने वाले।"],
      ["Open communication protects against risky behaviour and helps you notice problems early.", "खुली बातचीत जोखिम भरे व्यवहार से बचाती है और समस्याओं को जल्दी पहचानने में मदद करती है।"],
    ],
    key: [
      ["Listen more than you speak", "बोलने से ज़्यादा सुनें"],
      ["Side-by-side conversations (driving, walking) feel easier", "साथ चलते या गाड़ी में बात करना आसान लगता है"],
      ["Clear limits with reasons work better than lectures", "कारण के साथ साफ़ सीमाएँ भाषण से बेहतर"],
    ],
    sym: [
      ["Normal: mood changes, wanting privacy, peer focus", "सामान्य: मूड बदलना, निजता चाहना, दोस्तों पर ध्यान"],
      ["Concerning: persistent withdrawal, falling marks, sleep changes", "चिंताजनक: लगातार अलग-थलग, नंबर गिरना, नींद में बदलाव"],
      ["Red flags: substance use, self-harm, talk of hopelessness", "ख़तरे के संकेत: नशा, ख़ुद को नुकसान, निराशा की बातें"],
    ],
    cause: [
      ["Brain development and hormonal changes", "दिमाग़ का विकास और हार्मोनल बदलाव"],
      ["Academic and peer pressure", "पढ़ाई और साथियों का दबाव"],
      ["Social media comparison", "सोशल मीडिया पर तुलना"],
    ],
    risk: [
      ["Harsh criticism or comparison at home", "घर में कड़ी आलोचना या तुलना"],
      ["Family conflict", "परिवार में कलह"],
      ["Isolation or bullying", "अकेलापन या बुलिंग"],
    ],
    mgmt: [
      ["Make regular low-pressure time together (meals, walks)", "साथ का नियमित, बिना दबाव वाला समय (खाना, टहलना)"],
      ["Ask open questions; avoid immediate judgement", "खुले सवाल पूछें; तुरंत राय देने से बचें"],
      ["Agree rules on phones, curfew and studies together", "फ़ोन, घर आने का समय और पढ़ाई पर मिलकर नियम तय करें"],
      ["Seek counselling if communication has broken down", "बातचीत टूट गई हो तो काउंसलिंग लें"],
    ],
    help: [
      ["Signs of depression, substance use or self-harm", "डिप्रेशन, नशे या ख़ुद को नुकसान के संकेत"],
      ["Aggression or running away", "आक्रामकता या घर से भागना"],
      PARENT_HELP,
    ],
    faq: [
      ["My teenager will not talk to me at all. What can I do?", "मेरा किशोर बिल्कुल बात नहीं करता। क्या करूँ?", "Keep showing interest without pressure; a trusted relative or counsellor can also help bridge the gap.", "बिना दबाव के दिलचस्पी दिखाते रहें; कोई भरोसेमंद रिश्तेदार या काउंसलर भी दूरी कम करने में मदद कर सकता है।"],
      ["Can my teen see a doctor confidentially?", "क्या किशोर गोपनीय रूप से डॉक्टर से मिल सकता है?", "Under-18s usually need a guardian's consent, but doctors will give the teen private time and respect their confidentiality where safe.", "18 से कम उम्र में आमतौर पर अभिभावक की सहमति चाहिए, पर डॉक्टर किशोर को निजी समय देते हैं और सुरक्षित हो तो गोपनीयता रखते हैं।"],
    ],
    tags: ["kishor", "teenager", "baat nahi karta"],
  },
  {
    slug: "dyslexia-signs-in-children",
    title: ["Dyslexia and learning difficulties: early signs in school", "डिस्लेक्सिया और सीखने की कठिनाई: स्कूल में शुरुआती संकेत"],
    excerpt: ["Bright child struggling with reading, spelling or maths? Signs of specific learning disorders, assessment and support including exam accommodations.", "होशियार बच्चा पढ़ने, स्पेलिंग या गणित में संघर्ष कर रहा है? सीखने की ख़ास कठिनाइयों के संकेत, जाँच और परीक्षा में मिलने वाली सुविधाओं सहित मदद।"],
    related: ["specific-learning-disorder-india", "adhd-psychiatrist-india", "child-psychiatrist-india"],
    refs: ["icd11", "rpwd"],
    intro: [
      ["Specific learning disorders affect reading (dyslexia), writing or maths despite normal intelligence and teaching.", "सीखने की ख़ास कठिनाइयाँ सामान्य बुद्धि और पढ़ाई के बावजूद पढ़ने (डिस्लेक्सिया), लिखने या गणित पर असर डालती हैं।"],
      ["They are often mistaken for laziness. Early identification protects self-esteem.", "इन्हें अक्सर आलस समझा जाता है। जल्दी पहचान से आत्मसम्मान बचता है।"],
    ],
    key: [
      ["Intelligence is usually normal", "बुद्धि आमतौर पर सामान्य होती है"],
      ["Specialised teaching helps", "ख़ास तरह से पढ़ाना मदद करता है"],
      ["Certification can allow exam accommodations", "प्रमाणपत्र से परीक्षा में सुविधाएँ मिल सकती हैं"],
    ],
    sym: [
      ["Difficulty linking letters and sounds; slow reading", "अक्षरों और ध्वनियों को जोड़ने में कठिनाई; धीमा पढ़ना"],
      ["Frequent spelling errors, letter reversals beyond age 7–8", "7–8 साल के बाद भी बार-बार स्पेलिंग की ग़लती, अक्षर उलटना"],
      ["Trouble with number facts despite effort", "मेहनत के बावजूद संख्याओं में दिक़्क़त"],
    ],
    cause: [
      ["Differences in how the brain processes language or numbers", "दिमाग़ भाषा या संख्याओं को कैसे समझता है, उसमें अंतर"],
      ["Often runs in families", "अक्सर परिवार में चलता है"],
      ["Not caused by poor teaching or laziness", "ख़राब पढ़ाई या आलस से नहीं"],
    ],
    risk: [
      ["Family history", "पारिवारिक इतिहास"],
      ["ADHD", "ADHD (ध्यान की कमी और अति-सक्रियता)"],
      ["Speech and language delay in early years", "शुरुआती सालों में बोलने और भाषा में देरी"],
    ],
    mgmt: [
      ["Eye and hearing tests; psycho-educational assessment", "आँख और कान की जाँच; साइको-एजुकेशनल जाँच"],
      ["Remedial education with a special educator", "विशेष शिक्षक के साथ उपचारात्मक पढ़ाई"],
      ["School accommodations: extra time, reader or writer as per board rules", "स्कूल में सुविधाएँ: अतिरिक्त समय, बोर्ड नियमों के अनुसार रीडर या राइटर"],
      ["Treat co-existing ADHD or anxiety", "साथ के ADHD या घबराहट का इलाज"],
    ],
    help: [
      ["Reading or writing far behind classmates", "पढ़ने या लिखने में सहपाठियों से बहुत पीछे"],
      ["Child avoiding homework, low confidence", "होमवर्क से बचना, कम आत्मविश्वास"],
      PARENT_HELP,
    ],
    faq: [
      ["Can dyslexia be cured?", "क्या डिस्लेक्सिया ठीक हो सकता है?", "It is lifelong, but with the right teaching most children learn to read and succeed.", "यह ज़िंदगी भर रहता है, पर सही तरीक़े से पढ़ाने पर ज़्यादातर बच्चे पढ़ना सीखते और सफल होते हैं।"],
      ["Which certificate is needed for exam help?", "परीक्षा में मदद के लिए कौन सा प्रमाणपत्र चाहिए?", "Requirements vary by board; an assessment report from an authorised centre is usually needed.", "बोर्ड के अनुसार नियम अलग हैं; आमतौर पर अधिकृत केंद्र से जाँच रिपोर्ट चाहिए।"],
    ],
    tags: ["dyslexia", "padhai kamzor", "spelling", "sld"],
  },
  {
    slug: "healthy-sleep-for-children",
    title: ["Healthy sleep for children: routines that work", "बच्चों के लिए अच्छी नींद: काम करने वाली दिनचर्या"],
    excerpt: ["How much sleep children need by age, bedtime routines that help, and sleep problems such as night terrors and snoring that need attention.", "उम्र के अनुसार बच्चों को कितनी नींद चाहिए, मदद करने वाली सोने की दिनचर्या, और रात के डर व खर्राटे जैसी समस्याएँ जिन पर ध्यान चाहिए।"],
    related: ["child-psychiatrist-india", "sleep-disorders-psychiatrist-india", "adhd-psychiatrist-india"],
    refs: ["who-under5"],
    intro: [
      ["Sleep supports growth, learning, mood and behaviour. Poor sleep in children can look like hyperactivity or irritability.", "नींद विकास, सीखने, मूड और व्यवहार में मदद करती है। बच्चों में ख़राब नींद हाइपरएक्टिविटी या चिड़चिड़ेपन जैसी दिख सकती है।"],
      ["Consistent routines are the most effective tool.", "नियमित दिनचर्या सबसे असरदार साधन है।"],
    ],
    key: [
      ["Same bedtime and wake time daily", "रोज़ सोने और जागने का एक समय"],
      ["Screens off at least an hour before bed", "सोने से कम से कम एक घंटा पहले स्क्रीन बंद"],
      ["Loud snoring may signal enlarged tonsils or adenoids", "तेज़ खर्राटे बढ़े हुए टॉन्सिल या एडेनॉइड का संकेत हो सकते हैं"],
    ],
    sym: [
      ["Difficulty falling asleep, frequent waking", "नींद आने में दिक़्क़त, बार-बार जागना"],
      ["Night terrors, sleepwalking, nightmares", "रात का डर, नींद में चलना, बुरे सपने"],
      ["Daytime tiredness, irritability, poor attention", "दिन में थकान, चिड़चिड़ापन, कम ध्यान"],
    ],
    cause: [
      ["Irregular schedules and late screens", "अनियमित दिनचर्या और देर रात स्क्रीन"],
      ["Anxiety, ADHD or autism", "घबराहट, ADHD या ऑटिज़्म"],
      ["Snoring or breathing problems", "खर्राटे या साँस की समस्या"],
    ],
    risk: [
      ["Caffeine in tea, cola or chocolate", "चाय, कोला या चॉकलेट में कैफ़ीन"],
      ["Shared bedrooms with late activity", "देर तक गतिविधि वाले साझा कमरे"],
      ["Stress at home or school", "घर या स्कूल में तनाव"],
    ],
    mgmt: [
      ["Calm 20–30 minute routine: bath, story, lights low", "शांत 20–30 मिनट की दिनचर्या: नहाना, कहानी, धीमी रोशनी"],
      ["Keep the bedroom dark, quiet and screen-free", "बेडरूम अंधेरा, शांत और बिना स्क्रीन रखें"],
      ["For night terrors: keep the child safe; do not wake them forcefully", "रात के डर में: बच्चे को सुरक्षित रखें; ज़बरदस्ती न जगाएँ"],
      ["ENT check for loud snoring with pauses", "रुक-रुककर तेज़ खर्राटों के लिए ENT जाँच"],
    ],
    help: [
      ["Breathing pauses during sleep", "नींद में साँस रुकना"],
      ["Sleep problems affecting school or behaviour", "नींद की समस्या से स्कूल या व्यवहार पर असर"],
      PARENT_HELP,
    ],
    faq: [
      ["How much sleep does a school-age child need?", "स्कूल जाने वाले बच्चे को कितनी नींद चाहिए?", "Most children aged 6–12 need about 9–12 hours; teenagers about 8–10 hours.", "6–12 साल के ज़्यादातर बच्चों को लगभग 9–12 घंटे और किशोरों को लगभग 8–10 घंटे नींद चाहिए।"],
      ["Should children take sleeping medicines?", "क्या बच्चों को नींद की दवा देनी चाहिए?", "Rarely, and only on specialist advice; routines and treating causes come first.", "बहुत कम, और सिर्फ़ विशेषज्ञ की सलाह पर; पहले दिनचर्या और कारणों का इलाज।"],
    ],
    tags: ["bachche ki neend", "child sleep", "raat ko darr"],
  },
  {
    slug: "stammering-in-children",
    title: ["Stammering in children: what parents can do", "बच्चों में हकलाना: माता-पिता क्या कर सकते हैं"],
    excerpt: ["Repeating sounds or getting stuck on words is common in young children. When it is normal, when to get speech therapy and how to respond at home.", "छोटे बच्चों में आवाज़ें दोहराना या शब्दों पर अटकना आम है। कब यह सामान्य है, कब स्पीच थेरेपी लें, और घर पर कैसे प्रतिक्रिया दें।"],
    related: ["speech-language-delay-india", "social-anxiety-treatment-india", "child-psychiatrist-india"],
    refs: ["icd11"],
    intro: [
      ["Many children go through a phase of stammering between ages 2 and 5 while language develops rapidly. Most recover.", "भाषा तेज़ी से विकसित होने के दौरान 2 से 5 साल की उम्र में बहुत से बच्चे हकलाने के दौर से गुज़रते हैं। ज़्यादातर ठीक हो जाते हैं।"],
      ["Persistent stammering is a developmental speech fluency disorder that responds to therapy.", "लगातार हकलाना बोलने के प्रवाह की विकास संबंधी समस्या है जो थेरेपी से सुधरती है।"],
    ],
    key: [
      ["Stammering is not caused by anxiety or parenting", "हकलाना घबराहट या परवरिश से नहीं होता"],
      ["Anxiety and teasing can make it worse", "घबराहट और चिढ़ाने से यह बढ़ सकता है"],
      ["Early speech therapy improves outcomes", "जल्दी स्पीच थेरेपी से नतीजे बेहतर"],
    ],
    sym: [
      ["Repeating sounds or syllables ('b-b-ball')", "आवाज़ें या अक्षर दोहराना ('ब-ब-बॉल')"],
      ["Stretching sounds or blocks with no sound", "आवाज़ खींचना या बिना आवाज़ अटक जाना"],
      ["Facial tension, avoiding words or speaking", "चेहरे पर तनाव, शब्दों या बोलने से बचना"],
    ],
    cause: [
      ["Differences in speech-motor control", "बोलने के मोटर नियंत्रण में अंतर"],
      ["Strong family tendency", "परिवार में मज़बूत प्रवृत्ति"],
      ["Rapid language development", "तेज़ भाषा विकास"],
    ],
    risk: [
      ["Family history of persistent stammering", "परिवार में लगातार हकलाना"],
      ["Boys are affected more often", "लड़कों में ज़्यादा"],
      ["Stammering lasting more than a year", "एक साल से ज़्यादा हकलाना"],
    ],
    mgmt: [
      ["Speak slowly and calmly yourself", "ख़ुद धीरे और शांति से बोलें"],
      ["Do not finish words for the child or say 'slow down'", "बच्चे के शब्द पूरे न करें या 'धीरे बोलो' न कहें"],
      ["Give full attention and time to talk", "पूरा ध्यान दें और बोलने का समय दें"],
      ["Speech therapy; counselling if anxiety or teasing", "स्पीच थेरेपी; घबराहट या चिढ़ाने पर काउंसलिंग"],
    ],
    help: [
      ["Stammering lasting over 6–12 months or starting after age 5", "6–12 महीने से ज़्यादा या 5 साल के बाद शुरू हुआ हकलाना"],
      ["Child avoiding speaking or upset about it", "बच्चा बोलने से बचे या परेशान हो"],
      PARENT_HELP,
    ],
    faq: [
      ["Will scolding stop the stammer?", "क्या डाँटने से हकलाना रुकेगा?", "No — it increases anxiety and usually makes stammering worse.", "नहीं — इससे घबराहट बढ़ती है और आमतौर पर हकलाना बढ़ता है।"],
      ["Can adults who stammer be helped?", "क्या हकलाने वाले वयस्कों की मदद हो सकती है?", "Yes, therapy improves fluency and reduces anxiety about speaking.", "हाँ, थेरेपी से प्रवाह सुधरता है और बोलने की घबराहट कम होती है।"],
    ],
    tags: ["haklana", "stammering", "totla"],
  },
  {
    slug: "positive-discipline-without-beating",
    title: ["Positive discipline: guiding children without beating", "पॉज़िटिव अनुशासन: बिना मारे बच्चों को सही राह दिखाना"],
    excerpt: ["Physical punishment increases aggression and anxiety. Effective alternatives: praise, clear rules, consequences and connection.", "शारीरिक सज़ा से आक्रामकता और घबराहट बढ़ती है। असरदार विकल्प: तारीफ़, साफ़ नियम, नतीजे और जुड़ाव।"],
    related: ["odd-conduct-disorder-india", "adhd-psychiatrist-india", "child-psychiatrist-india"],
    refs: ["mhgap", "who-adolescent"],
    intro: [
      ["Many parents were raised with beating and see it as normal. Research consistently shows it worsens behaviour over time.", "बहुत से माता-पिता मार खाकर बड़े हुए और इसे सामान्य मानते हैं। शोध लगातार दिखाता है कि इससे समय के साथ व्यवहार बिगड़ता है।"],
      ["Positive discipline teaches self-control while protecting the relationship.", "पॉज़िटिव अनुशासन रिश्ते को बचाते हुए आत्म-नियंत्रण सिखाता है।"],
    ],
    key: [
      ["Catch the child being good — praise specific behaviour", "बच्चे को अच्छा करते पकड़ें — ख़ास व्यवहार की तारीफ़"],
      ["Few clear rules, consistently applied by all adults", "कुछ साफ़ नियम, सभी बड़े एक जैसे लागू करें"],
      ["Logical consequences rather than physical punishment", "शारीरिक सज़ा के बजाय तार्किक नतीजे"],
    ],
    sym: [
      ["Signs discipline is not working: escalating defiance, lying, fear", "अनुशासन काम न करने के संकेत: बढ़ती ज़िद, झूठ, डर"],
      ["Aggression copied from adults", "बड़ों से सीखी आक्रामकता"],
      ["Frequent shouting matches", "बार-बार चिल्लाकर झगड़ा"],
    ],
    cause: [
      ["Stress and exhaustion in parents", "माता-पिता में तनाव और थकान"],
      ["Inconsistent rules between family members", "परिवारजनों के बीच अलग-अलग नियम"],
      ["Child's temperament, ADHD or anxiety", "बच्चे का स्वभाव, ADHD या घबराहट"],
    ],
    risk: [
      ["Harsh punishment increases conduct problems", "कड़ी सज़ा से व्यवहार की समस्याएँ बढ़ती हैं"],
      ["Domestic conflict", "घरेलू कलह"],
      ["Parental depression or substance use", "माता-पिता में डिप्रेशन या नशा"],
    ],
    mgmt: [
      ["Spend 10–15 minutes daily of child-led play", "रोज़ 10–15 मिनट बच्चे की पसंद का खेल"],
      ["Give clear, calm instructions one at a time", "एक बार में एक, साफ़ और शांत निर्देश"],
      ["Use rewards charts for younger children", "छोटे बच्चों के लिए इनाम चार्ट"],
      ["Parent training programmes for ongoing difficulties", "लगातार कठिनाई में पेरेंट ट्रेनिंग"],
    ],
    help: [
      ["Behaviour problems at home and school", "घर और स्कूल दोनों में व्यवहार की समस्या"],
      ["You feel you are losing control or hurting your child", "आपको लगे कि आप नियंत्रण खो रहे हैं या बच्चे को चोट पहुँचा रहे हैं"],
      PARENT_HELP,
    ],
    faq: [
      ["Isn't a slap sometimes necessary?", "क्या कभी-कभी एक थप्पड़ ज़रूरी नहीं?", "It may stop behaviour briefly but teaches that hitting solves problems; alternatives work better over time.", "इससे व्यवहार थोड़ी देर रुक सकता है पर यह सिखाता है कि मारने से समस्या सुलझती है; दूसरे तरीक़े समय के साथ बेहतर काम करते हैं।"],
      ["What if grandparents disagree?", "अगर दादा-दादी असहमत हों तो?", "Agree a few common rules as a family; consistency matters more than perfection.", "परिवार के रूप में कुछ साझा नियम तय करें; परफ़ेक्शन से ज़्यादा एक जैसा रहना मायने रखता है।"],
    ],
    tags: ["anushasan", "maarna", "discipline", "parenting"],
  },
  {
    slug: "self-harm-in-teenagers",
    title: ["Self-harm in teenagers: what parents should do", "किशोरों में ख़ुद को नुकसान पहुँचाना: माता-पिता क्या करें"],
    excerpt: ["Discovering your teen has self-harmed is frightening. How to respond calmly, keep them safe and get help — without anger or blame.", "यह पता चलना कि आपके किशोर ने ख़ुद को नुकसान पहुँचाया है, डरावना होता है। बिना ग़ुस्से या दोष के शांति से कैसे प्रतिक्रिया दें, सुरक्षित रखें और मदद लें।"],
    related: ["teen-depression-india", "suicide-prevention-crisis-support-india", "dbt-skills-india"],
    refs: ["nice-self-harm", "who-adolescent", "telemanas"],
    intro: [
      ["Self-harm is usually a way of coping with overwhelming emotions. It is a sign of distress that needs care, not punishment.", "ख़ुद को नुकसान पहुँचाना आमतौर पर भारी भावनाओं से निपटने का तरीक़ा होता है। यह परेशानी का संकेत है जिसे देखभाल चाहिए, सज़ा नहीं।"],
      ["Every episode should be taken seriously and assessed by a professional.", "हर घटना को गंभीरता से लेना और विशेषज्ञ से जाँच कराना चाहिए।"],
    ],
    key: [
      ["Stay calm; anger increases secrecy", "शांत रहें; ग़ुस्से से छिपाना बढ़ता है"],
      ["Treat physical injuries first", "पहले शारीरिक चोट का इलाज"],
      ["Therapy teaches safer ways to manage emotions", "थेरेपी भावनाएँ सँभालने के सुरक्षित तरीक़े सिखाती है"],
    ],
    sym: [
      ["Unexplained cuts, burns or bruises", "बिना वजह कटने, जलने या चोट के निशान"],
      ["Long sleeves in hot weather, hiding the body", "गर्मी में पूरी बाँह के कपड़े, शरीर छिपाना"],
      ["Withdrawal, low mood, secrecy about the phone", "अलग-थलग रहना, उदासी, फ़ोन को लेकर छिपाव"],
    ],
    cause: [
      ["Depression, anxiety, emotional dysregulation", "डिप्रेशन, घबराहट, भावनात्मक अस्थिरता"],
      ["Bullying, relationship problems, academic pressure", "बुलिंग, रिश्ते की समस्या, पढ़ाई का दबाव"],
      ["Abuse or trauma", "दुर्व्यवहार या आघात"],
    ],
    risk: [
      ["Previous self-harm", "पहले ख़ुद को नुकसान"],
      ["Exposure to self-harm content online", "ऑनलाइन ख़ुद को नुकसान वाला कंटेंट"],
      ["Substance use", "नशा"],
    ],
    mgmt: [
      ["Say: 'I am glad you told me; we will get help together'", "कहें: 'मुझे ख़ुशी है कि तुमने बताया; हम मिलकर मदद लेंगे'"],
      ["Secure medicines and sharp objects at home", "घर में दवाएँ और नुकीली चीज़ें सुरक्षित रखें"],
      ["Arrange a mental health assessment within days", "कुछ दिनों में मानसिक स्वास्थ्य जाँच"],
      ["Therapy (CBT, DBT skills) and family support", "थेरेपी (CBT, DBT स्किल्स) और परिवार का साथ"],
    ],
    help: [
      ["Any overdose or serious injury — emergency now (112)", "कोई भी ओवरडोज़ या गंभीर चोट — अभी इमरजेंसी (112)"],
      ["Talk of suicide or a plan — same day", "आत्महत्या या योजना की बात — उसी दिन"],
      ["Tele-MANAS 14416 is available 24×7", "टेली-मानस 14416 24×7 उपलब्ध"],
    ],
    faq: [
      ["Is self-harm attention-seeking?", "क्या ख़ुद को नुकसान ध्यान खींचने के लिए होता है?", "It is a sign of real distress; even if it is a way of communicating, it needs a caring response.", "यह असली परेशानी का संकेत है; अगर यह बात कहने का तरीक़ा भी हो, तो भी इसे देखभाल वाली प्रतिक्रिया चाहिए।"],
      ["Should I check my teen's body regularly?", "क्या मैं किशोर का शरीर बार-बार जाँचूँ?", "Agree a safety plan with your teen and therapist instead; intrusive checking can damage trust.", "इसके बजाय किशोर और थेरेपिस्ट के साथ सुरक्षा योजना बनाएँ; ज़बरदस्ती जाँच से भरोसा टूट सकता है।"],
    ],
    tags: ["self harm", "haath kaatna", "kishor"],
  },
  {
    slug: "coping-with-exam-results",
    title: ["Coping with disappointing exam results: a guide for families", "निराशाजनक परीक्षा परिणाम से कैसे सँभलें: परिवारों के लिए गाइड"],
    excerpt: ["Board, NEET or JEE results can bring intense disappointment. How students and parents can respond, plan next steps and watch for warning signs.", "बोर्ड, NEET या JEE के नतीजे तीव्र निराशा ला सकते हैं। छात्र और माता-पिता कैसे प्रतिक्रिया दें, अगले क़दम तय करें और चेतावनी संकेतों पर ध्यान दें।"],
    related: ["neet-exam-stress-india", "teen-depression-india", "suicide-prevention-crisis-support-india"],
    refs: ["who-adolescent", "telemanas"],
    intro: [
      ["Result day can be one of the most stressful days in a young person's life. How family members react matters a great deal.", "नतीजों का दिन किसी युवा की ज़िंदगी के सबसे तनाव भरे दिनों में से हो सकता है। परिवार की प्रतिक्रिया बहुत मायने रखती है।"],
      ["A disappointing result is a setback, not the end of a future.", "निराशाजनक नतीजा एक झटका है, भविष्य का अंत नहीं।"],
    ],
    key: [
      ["Separate the result from the child's worth", "नतीजे को बच्चे की क़ीमत से अलग रखें"],
      ["There are many paths to a good career", "अच्छे करियर के कई रास्ते हैं"],
      ["Watch closely in the days after results", "नतीजों के बाद के दिनों में क़रीब से ध्यान दें"],
    ],
    sym: [
      ["Withdrawal, crying, not eating", "अलग-थलग रहना, रोना, खाना न खाना"],
      ["Statements like 'I have let everyone down' or 'there is no point'", "'मैंने सबको निराश किया' या 'कोई मतलब नहीं' जैसी बातें"],
      ["Anger or blame", "ग़ुस्सा या दोष देना"],
    ],
    cause: [
      ["High expectations and comparison", "ऊँची उम्मीदें और तुलना"],
      ["Investment of years of preparation", "सालों की तैयारी का निवेश"],
      ["Social pressure and relatives' questions", "सामाजिक दबाव और रिश्तेदारों के सवाल"],
    ],
    risk: [
      ["Previous depression or self-harm", "पहले डिप्रेशन या ख़ुद को नुकसान"],
      ["Living away from family in coaching hubs", "कोचिंग शहरों में परिवार से दूर रहना"],
      ["Harsh criticism at home", "घर में कड़ी आलोचना"],
    ],
    mgmt: [
      ["Parents: say 'We love you no matter what; we will plan together'", "माता-पिता: कहें 'हम तुमसे हर हाल में प्यार करते हैं; हम मिलकर योजना बनाएँगे'"],
      ["Limit relatives' calls and social media comparisons for a few days", "कुछ दिन रिश्तेदारों के फ़ोन और सोशल मीडिया तुलना सीमित करें"],
      ["Discuss options calmly after a few days: re-attempt, alternate courses", "कुछ दिनों बाद शांति से विकल्पों पर बात: दोबारा प्रयास, दूसरे कोर्स"],
      ["Seek counselling if distress persists", "परेशानी बनी रहे तो काउंसलिंग"],
    ],
    help: [
      ["Any talk of suicide — do not leave them alone; call Tele-MANAS 14416 or 112", "आत्महत्या की कोई भी बात — अकेला न छोड़ें; टेली-मानस 14416 या 112 पर कॉल करें"],
      ["Low mood lasting more than two weeks", "दो हफ़्ते से ज़्यादा उदासी"],
      PARENT_HELP,
    ],
    faq: [
      ["Should my child drop a year?", "क्या बच्चा एक साल ड्रॉप करे?", "It is a personal decision; consider the child's wishes, wellbeing and alternatives with a counsellor.", "यह निजी फ़ैसला है; काउंसलर के साथ बच्चे की इच्छा, सेहत और विकल्पों पर विचार करें।"],
      ["How do we handle relatives' questions?", "रिश्तेदारों के सवालों को कैसे सँभालें?", "Prepare a short reply such as 'We are proud of the effort and planning the next step' and change the topic.", "छोटा जवाब तैयार रखें जैसे 'हमें मेहनत पर गर्व है और अगला क़दम तय कर रहे हैं' और बात बदल दें।"],
    ],
    tags: ["result", "fail", "board", "neet result"],
  },
  {
    slug: "sibling-jealousy-new-baby",
    title: ["Sibling jealousy after a new baby", "नए बच्चे के आने पर भाई-बहन की जलन"],
    excerpt: ["Regression, tantrums or clinginess after a new baby arrives are common. Ways to prepare your older child and help them adjust.", "नए बच्चे के आने के बाद बड़े बच्चे में पीछे लौटना, ज़िद या चिपके रहना आम है। बड़े बच्चे को तैयार करने और तालमेल में मदद के तरीक़े।"],
    related: ["child-psychiatrist-india", "separation-anxiety-children-india"],
    refs: ["mhgap"],
    intro: [
      ["A new baby changes the older child's world. Jealousy, regression (bedwetting, baby talk) and attention-seeking are normal reactions.", "नया बच्चा बड़े बच्चे की दुनिया बदल देता है। जलन, पीछे लौटना (बिस्तर गीला, तोतली बातें) और ध्यान माँगना सामान्य प्रतिक्रियाएँ हैं।"],
      ["With reassurance and one-to-one time, most children adjust within weeks to months.", "तसल्ली और अकेले में साथ के समय से ज़्यादातर बच्चे हफ़्तों से महीनों में तालमेल बिठा लेते हैं।"],
    ],
    key: [
      ["Prepare the child before the birth", "जन्म से पहले बच्चे को तैयार करें"],
      ["Protect special time with the older child", "बड़े बच्चे के साथ ख़ास समय बचाएँ"],
      ["Avoid comparisons and blame", "तुलना और दोष से बचें"],
    ],
    sym: [
      ["Acting younger: bedwetting, baby talk, wanting a bottle", "छोटा बनना: बिस्तर गीला, तोतली बातें, बोतल माँगना"],
      ["Tantrums, aggression towards the baby", "ज़िद, बच्चे के प्रति आक्रामकता"],
      ["Clinginess or withdrawal", "चिपके रहना या अलग-थलग होना"],
    ],
    cause: [
      ["Fear of losing parents' love", "माता-पिता का प्यार खोने का डर"],
      ["Less attention and changed routine", "कम ध्यान और बदली दिनचर्या"],
      ["Visitors focusing on the baby", "मेहमानों का ध्यान बच्चे पर"],
    ],
    risk: [
      ["Small age gap", "उम्र का कम अंतर"],
      ["Sensitive temperament", "संवेदनशील स्वभाव"],
      ["Parental stress or postpartum depression", "माता-पिता का तनाव या प्रसव के बाद डिप्रेशन"],
    ],
    mgmt: [
      ["Involve the older child as a 'helper'", "बड़े बच्चे को 'मददगार' बनाएँ"],
      ["Daily one-to-one time with each parent", "हर माता-पिता के साथ रोज़ अकेले में समय"],
      ["Praise gentle behaviour with the baby", "बच्चे के साथ प्यार भरे व्यवहार की तारीफ़"],
      ["Keep routines (school, bedtime) as stable as possible", "दिनचर्या (स्कूल, सोना) जितना हो सके स्थिर रखें"],
    ],
    help: [
      ["Aggression that puts the baby at risk", "ऐसी आक्रामकता जिससे बच्चे को ख़तरा हो"],
      ["Regression lasting many months", "कई महीनों तक पीछे लौटना"],
      PARENT_HELP,
    ],
    faq: [
      ["Should we punish regression like bedwetting?", "क्या बिस्तर गीला करने जैसे बदलाव पर सज़ा दें?", "No. It is a stress response; reassurance helps it pass.", "नहीं। यह तनाव की प्रतिक्रिया है; तसल्ली से यह दूर होता है।"],
      ["How do we prepare a toddler for a new baby?", "छोटे बच्चे को नए बच्चे के लिए कैसे तैयार करें?", "Read simple stories, involve them in preparations and avoid big changes like moving rooms close to the birth.", "आसान कहानियाँ पढ़ें, तैयारी में शामिल करें और जन्म के आसपास कमरा बदलने जैसे बड़े बदलाव से बचें।"],
    ],
    tags: ["bhai behen", "jalan", "naya baby"],
  },
]);
