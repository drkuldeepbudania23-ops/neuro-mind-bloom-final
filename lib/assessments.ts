import type { L10n } from "./i18n";

/**
 * Validated, freely usable screening questionnaires.
 *  - PHQ-9  (Kroenke, Spitzer & Williams, 2001) — depression
 *  - GAD-7  (Spitzer et al., 2006) — anxiety          (PHQ/GAD: Pfizer, free to use)
 *  - AUDIT  (WHO, Babor et al., 2001) — alcohol
 *  - ASRS v1.1 Part A (WHO / Kessler et al., 2005) — adult ADHD
 *
 * Hindi wording below is a faithful translation for screening. If you prefer the
 * official Pfizer Hindi version (phqscreeners.com), paste it into `hi` fields.
 *
 * Results are NOT saved anywhere — scoring happens only in the visitor's browser.
 */

export type AssessmentId = "phq9" | "gad7" | "audit" | "asrs" | "ocd" | "tobacco" | "phq15" | "drugs" | "sleep" | "study-stress";

export type ResponseOption = { value: number; label: L10n };

export type Band = {
  min: number;
  max: number;
  level: "minimal" | "mild" | "moderate" | "moderately-severe" | "severe" | "low-risk" | "hazardous" | "harmful" | "dependence" | "unlikely" | "likely";
  label: L10n;
  advice: L10n;
};

export type Assessment = {
  id: AssessmentId;
  title: L10n;
  about: L10n;
  stem: L10n;
  questions: L10n[];
  bands: Band[];
  /** Index of an item where any score > 0 must trigger safety guidance. */
  safetyItem?: number;
  /** Answer choices per question (defaults to RESPONSE_OPTIONS for every question). */
  options?: ResponseOption[][];
  /** Custom score from raw answers (defaults to the sum). */
  scorer?: (answers: number[]) => number;
  maxScore?: number;
  /** Short note shown above the questions (e.g. what "1 drink" means). */
  note?: L10n;
  /** Original clinic checklist (not a published, validated scale). */
  checklist?: boolean;
  /** Longer introduction shown before the questions (what it measures, who it is for). */
  intro?: L10n;
  /** Source / copyright / licence notice shown with the test. */
  source?: L10n;
  /** Related condition page slugs. */
  conditions?: string[];
};

export const RESPONSE_OPTIONS: ResponseOption[] = [
  { value: 0, label: { en: "Not at all", hi: "बिल्कुल नहीं" } },
  { value: 1, label: { en: "Several days", hi: "कुछ दिन" } },
  { value: 2, label: { en: "More than half the days", hi: "आधे से ज़्यादा दिन" } },
  { value: 3, label: { en: "Nearly every day", hi: "लगभग हर दिन" } },
];

const SEEK_HELP: L10n = {
  en: "A consultation is recommended to understand this better and discuss treatment options.",
  hi: "इसे बेहतर समझने और इलाज के विकल्पों पर बात करने के लिए परामर्श लेने की सलाह दी जाती है।",
};


const FREQ5: ResponseOption[] = [
  { value: 0, label: { en: "Never", hi: "कभी नहीं" } },
  { value: 1, label: { en: "Less than monthly", hi: "महीने में एक बार से कम" } },
  { value: 2, label: { en: "Monthly", hi: "महीने में एक बार" } },
  { value: 3, label: { en: "Weekly", hi: "हफ़्ते में एक बार" } },
  { value: 4, label: { en: "Daily or almost daily", hi: "रोज़ या लगभग रोज़" } },
];

const INJURY: ResponseOption[] = [
  { value: 0, label: { en: "No", hi: "नहीं" } },
  { value: 2, label: { en: "Yes, but not in the last year", hi: "हाँ, पर पिछले एक साल में नहीं" } },
  { value: 4, label: { en: "Yes, during the last year", hi: "हाँ, पिछले एक साल में" } },
];

const ASRS_OPTIONS: ResponseOption[] = [
  { value: 0, label: { en: "Never", hi: "कभी नहीं" } },
  { value: 1, label: { en: "Rarely", hi: "बहुत कम" } },
  { value: 2, label: { en: "Sometimes", hi: "कभी-कभी" } },
  { value: 3, label: { en: "Often", hi: "अक्सर" } },
  { value: 4, label: { en: "Very often", hi: "बहुत बार" } },
];

/** AUDIT — WHO Alcohol Use Disorders Identification Test (Babor et al., WHO 2001). */
const AUDIT: Assessment = {
  id: "audit",
  title: { en: "Alcohol check (AUDIT)", hi: "शराब की आदत जाँच (AUDIT)" },
  about: { en: "10 questions · about 3 minutes", hi: "10 सवाल · लगभग 3 मिनट" },
  stem: { en: "Think about your drinking during the past year.", hi: "पिछले एक साल में अपने शराब पीने के बारे में सोचें।" },
  note: {
    en: "1 drink = 1 peg (30 ml) of whisky/rum/vodka, or about half a bottle (330 ml) of regular beer, or 1 glass of wine.",
    hi: "1 ड्रिंक = 1 पैग (30 ml) व्हिस्की/रम/वोडका, या लगभग आधी बोतल (330 ml) सामान्य बीयर, या 1 गिलास वाइन।",
  },
  questions: [
    { en: "How often do you have a drink containing alcohol?", hi: "आप कितनी बार शराब पीते हैं?" },
    { en: "How many drinks containing alcohol do you have on a typical day when you are drinking?", hi: "जिस दिन पीते हैं, उस दिन आमतौर पर कितने ड्रिंक लेते हैं?" },
    { en: "How often do you have six or more drinks on one occasion?", hi: "कितनी बार एक ही बार में 6 या उससे ज़्यादा ड्रिंक लेते हैं?" },
    { en: "How often during the last year have you found that you were not able to stop drinking once you had started?", hi: "पिछले साल कितनी बार ऐसा हुआ कि शुरू करने के बाद आप पीना रोक नहीं पाए?" },
    { en: "How often during the last year have you failed to do what was normally expected from you because of drinking?", hi: "पिछले साल कितनी बार शराब की वजह से आप अपना ज़रूरी काम नहीं कर पाए?" },
    { en: "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?", hi: "पिछले साल कितनी बार ज़्यादा पीने के बाद सुबह उठते ही शराब की ज़रूरत पड़ी?" },
    { en: "How often during the last year have you had a feeling of guilt or remorse after drinking?", hi: "पिछले साल कितनी बार पीने के बाद पछतावा या अपराध-बोध हुआ?" },
    { en: "How often during the last year have you been unable to remember what happened the night before because you had been drinking?", hi: "पिछले साल कितनी बार पीने की वजह से पिछली रात की बातें याद नहीं रहीं?" },
    { en: "Have you or someone else been injured as a result of your drinking?", hi: "क्या आपके पीने की वजह से आपको या किसी और को चोट लगी है?" },
    { en: "Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?", hi: "क्या किसी रिश्तेदार, दोस्त, डॉक्टर या स्वास्थ्यकर्मी ने आपके पीने पर चिंता जताई या कम करने को कहा?" },
  ],
  options: [
    [
      { value: 0, label: { en: "Never", hi: "कभी नहीं" } },
      { value: 1, label: { en: "Monthly or less", hi: "महीने में एक बार या कम" } },
      { value: 2, label: { en: "2–4 times a month", hi: "महीने में 2–4 बार" } },
      { value: 3, label: { en: "2–3 times a week", hi: "हफ़्ते में 2–3 बार" } },
      { value: 4, label: { en: "4 or more times a week", hi: "हफ़्ते में 4 या ज़्यादा बार" } },
    ],
    [
      { value: 0, label: { en: "1 or 2", hi: "1 या 2" } },
      { value: 1, label: { en: "3 or 4", hi: "3 या 4" } },
      { value: 2, label: { en: "5 or 6", hi: "5 या 6" } },
      { value: 3, label: { en: "7 to 9", hi: "7 से 9" } },
      { value: 4, label: { en: "10 or more", hi: "10 या ज़्यादा" } },
    ],
    FREQ5, FREQ5, FREQ5, FREQ5, FREQ5, FREQ5, INJURY, INJURY,
  ],
  maxScore: 40,
  bands: [
    { min: 0, max: 7, level: "low-risk", label: { en: "Low risk", hi: "कम जोखिम" }, advice: { en: "Low-risk drinking. Staying within safe limits — or not drinking — is best for health.", hi: "कम जोखिम। सुरक्षित सीमा में रहना — या न पीना — सेहत के लिए सबसे अच्छा है।" } },
    { min: 8, max: 15, level: "hazardous", label: { en: "Risky drinking", hi: "जोखिम भरा पीना" }, advice: { en: "Your drinking is at a risky level. Advice from a doctor now can prevent bigger problems later.", hi: "आपका पीना जोखिम के स्तर पर है। अभी डॉक्टर की सलाह आगे की बड़ी परेशानियों से बचा सकती है।" } },
    { min: 16, max: 19, level: "harmful", label: { en: "Harmful drinking", hi: "नुकसानदायक पीना" }, advice: { en: "Drinking is already harming you. Please book a consultation — treatment with counselling and medicines works.", hi: "शराब पहले से नुकसान कर रही है। कृपया परामर्श बुक करें — काउंसलिंग और दवाओं से इलाज असरदार है।" } },
    { min: 20, max: 40, level: "dependence", label: { en: "Possible dependence", hi: "लत (निर्भरता) की संभावना" }, advice: { en: "This suggests alcohol dependence. Do NOT stop suddenly on your own — withdrawal can cause fits. Please see a doctor for safe, supervised detox.", hi: "यह शराब की लत की ओर इशारा करता है। अपने आप अचानक बंद न करें — इससे दौरे पड़ सकते हैं। सुरक्षित डिटॉक्स के लिए डॉक्टर से मिलें।" } },
  ],
};

/** ASRS v1.1 Part A — WHO Adult ADHD Self-Report Scale screener (Kessler et al., 2005). */
const ASRS: Assessment = {
  id: "asrs",
  title: { en: "Adult ADHD check (ASRS)", hi: "वयस्क ADHD जाँच (ASRS)" },
  about: { en: "6 questions · for age 18+", hi: "6 सवाल · 18+ उम्र के लिए" },
  stem: {
    en: "Select the answer that best describes how you have felt and conducted yourself over the past 6 months.",
    hi: "पिछले 6 महीनों में आपने ख़ुद को जैसा महसूस किया और जैसा व्यवहार किया, उसके हिसाब से सबसे सही जवाब चुनें।",
  },
  questions: [
    { en: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?", hi: "किसी काम का मुश्किल हिस्सा पूरा होने के बाद, आख़िरी बारीक काम पूरे करने में आपको कितनी बार दिक्कत होती है?" },
    { en: "How often do you have difficulty getting things in order when you have to do a task that requires organization?", hi: "जिस काम में व्यवस्था/योजना चाहिए, उसमें चीज़ें सही क्रम में रखने में आपको कितनी बार दिक्कत होती है?" },
    { en: "How often do you have problems remembering appointments or obligations?", hi: "अपॉइंटमेंट या ज़रूरी ज़िम्मेदारियाँ याद रखने में आपको कितनी बार परेशानी होती है?" },
    { en: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?", hi: "जिस काम में बहुत सोचना पड़े, उसे शुरू करने से आप कितनी बार बचते हैं या टालते हैं?" },
    { en: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?", hi: "देर तक बैठना पड़े तो आप कितनी बार हाथ-पैर हिलाते हैं या बेचैन होते हैं?" },
    { en: "How often do you feel overly active and compelled to do things, like you were driven by a motor?", hi: "आपको कितनी बार लगता है कि आप ज़रूरत से ज़्यादा सक्रिय हैं और कुछ न कुछ करने को मजबूर हैं, जैसे अंदर कोई मोटर चल रही हो?" },
  ],
  options: Array.from({ length: 6 }, () => ASRS_OPTIONS),
  // Items 1–3 count when "Sometimes" or more; items 4–6 when "Often" or more.
  scorer: (answers) => answers.filter((a, i) => (i < 3 ? a >= 2 : a >= 3)).length,
  maxScore: 6,
  bands: [
    { min: 0, max: 3, level: "unlikely", label: { en: "ADHD less likely", hi: "ADHD की संभावना कम" }, advice: { en: "Your answers are not typical of adult ADHD. If attention problems still affect your life, a consultation can look at other causes such as anxiety, depression or sleep.", hi: "आपके जवाब वयस्क ADHD जैसे नहीं हैं। फिर भी ध्यान की समस्या ज़िंदगी पर असर डाल रही हो तो परामर्श में घबराहट, डिप्रेशन या नींद जैसी दूसरी वजहें देखी जा सकती हैं।" } },
    { min: 4, max: 6, level: "likely", label: { en: "Consistent with adult ADHD", hi: "वयस्क ADHD जैसे लक्षण" }, advice: { en: "Your answers are consistent with adult ADHD. A full assessment by a psychiatrist is recommended — ADHD is very treatable.", hi: "आपके जवाब वयस्क ADHD से मेल खाते हैं। मनोचिकित्सक से पूरी जाँच की सलाह है — ADHD का अच्छा इलाज संभव है।" } },
  ],
};

const YES_NO: ResponseOption[] = [
  { value: 0, label: { en: "No", hi: "नहीं" } },
  { value: 1, label: { en: "Sometimes", hi: "कभी-कभी" } },
  { value: 2, label: { en: "Yes, often", hi: "हाँ, अक्सर" } },
];

const CHECKLIST_NOTE: L10n = {
  en: "This is Neuro Mind Bloom's own symptom checklist based on standard diagnostic features. It is not a published rating scale and cannot diagnose — it only helps you decide whether to consult.",
  hi: "यह Neuro Mind Bloom की अपनी लक्षण-सूची है, जो मानक निदान लक्षणों पर आधारित है। यह कोई प्रकाशित रेटिंग स्केल नहीं है और इससे निदान नहीं होता — इससे बस परामर्श लेने का निर्णय लेने में मदद मिलती है।",
};

/** Original OCD symptom checklist (clinic-written; not Y-BOCS or any copyrighted scale). */
const OCD: Assessment = {
  id: "ocd",
  checklist: true,
  title: { en: "OCD symptom checklist", hi: "OCD / वहम लक्षण-सूची" },
  about: { en: "8 questions · about 2 minutes", hi: "8 सवाल · लगभग 2 मिनट" },
  stem: { en: "During the past month…", hi: "पिछले एक महीने में…" },
  note: CHECKLIST_NOTE,
  questions: [
    { en: "Have unwanted thoughts, images or doubts kept coming into your mind even though you tried to push them away?", hi: "क्या अनचाहे विचार, तस्वीरें या शक बार-बार मन में आते रहे, जबकि आपने उन्हें हटाने की कोशिश की?" },
    { en: "Have you worried a lot about dirt, germs or contamination?", hi: "क्या गंदगी, कीटाणु या छूत को लेकर बहुत ज़्यादा चिंता रही?" },
    { en: "Have you repeatedly checked things (locks, gas, switches, messages) even when you knew they were fine?", hi: "क्या आप चीज़ें (ताला, गैस, स्विच, मैसेज) बार-बार चेक करते रहे, जबकि पता था कि सब ठीक है?" },
    { en: "Have you washed, cleaned, counted, arranged or repeated actions until it felt 'just right'?", hi: "क्या आप तब तक धोते, साफ़ करते, गिनते, सजाते या कोई काम दोहराते रहे जब तक 'ठीक' न लगे?" },
    { en: "Have you needed to say or do something in your mind (prayers, numbers, words) to cancel a bad thought?", hi: "क्या किसी बुरे विचार को 'काटने' के लिए मन में कुछ बोलना या करना पड़ा (दुआ, गिनती, शब्द)?" },
    { en: "Do these thoughts or habits take more than one hour a day?", hi: "क्या ये विचार या आदतें दिन में एक घंटे से ज़्यादा समय लेती हैं?" },
    { en: "Do you feel very anxious or upset if you cannot do them?", hi: "अगर इन्हें न कर पाएँ तो क्या बहुत बेचैनी या परेशानी होती है?" },
    { en: "Do they affect your studies, work, family or social life?", hi: "क्या इनसे आपकी पढ़ाई, काम, परिवार या सामाजिक जीवन पर असर पड़ता है?" },
  ],
  options: Array.from({ length: 8 }, () => YES_NO),
  maxScore: 16,
  bands: [
    { min: 0, max: 4, level: "minimal", label: { en: "Few OCD-type symptoms", hi: "OCD जैसे लक्षण कम" }, advice: { en: "Few OCD-type symptoms. Everyone has some doubts or habits; consult if they start taking time or causing distress.", hi: "OCD जैसे लक्षण कम हैं। थोड़े-बहुत शक या आदतें सभी में होती हैं; समय लेने लगें या परेशान करें तो परामर्श लें।" } },
    { min: 5, max: 9, level: "moderate", label: { en: "Some OCD-type symptoms", hi: "कुछ OCD जैसे लक्षण" }, advice: { en: "Some symptoms suggestive of OCD. A consultation can clarify this — OCD responds well to ERP therapy and medicines.", hi: "कुछ लक्षण OCD की ओर इशारा करते हैं। परामर्श से स्पष्ट हो सकता है — OCD में ERP थेरेपी और दवाइयाँ अच्छा असर करती हैं।" } },
    { min: 10, max: 16, level: "severe", label: { en: "Many OCD-type symptoms", hi: "कई OCD जैसे लक्षण" }, advice: { en: "Many symptoms suggestive of OCD that seem to affect daily life. Please book a consultation.", hi: "कई लक्षण OCD की ओर इशारा करते हैं और रोज़ की ज़िंदगी पर असर डालते लगते हैं। कृपया परामर्श बुक करें।" } },
  ],
};

/** Original tobacco / gutka dependence checklist (clinic-written). */
const TOBACCO: Assessment = {
  id: "tobacco",
  checklist: true,
  title: { en: "Tobacco / gutka dependence checklist", hi: "तंबाकू / गुटखा लत लक्षण-सूची" },
  about: { en: "7 questions · bidi, cigarette, gutka, khaini", hi: "7 सवाल · बीड़ी, सिगरेट, गुटखा, खैनी" },
  stem: { en: "Think about your tobacco use (any form) in the past 3 months.", hi: "पिछले 3 महीनों में अपने तंबाकू सेवन (किसी भी रूप में) के बारे में सोचें।" },
  note: CHECKLIST_NOTE,
  questions: [
    { en: "Do you use tobacco within 30 minutes of waking up?", hi: "क्या सुबह उठने के 30 मिनट के अंदर तंबाकू लेते हैं?" },
    { en: "Do you use it more than 10 times a day?", hi: "क्या दिन में 10 से ज़्यादा बार लेते हैं?" },
    { en: "Do you get strong cravings if you go without it for a few hours?", hi: "कुछ घंटे न लें तो क्या तेज़ तलब होती है?" },
    { en: "Do you feel irritable, restless or unable to concentrate when you try to stop?", hi: "छोड़ने की कोशिश करें तो क्या चिड़चिड़ापन, बेचैनी या ध्यान न लगना होता है?" },
    { en: "Have you tried to quit or cut down but failed?", hi: "क्या छोड़ने या कम करने की कोशिश की पर नाकाम रहे?" },
    { en: "Do you use it even when you are ill, or have mouth ulcers, cough or breathlessness?", hi: "क्या बीमार होने, मुँह में छाले, खाँसी या साँस फूलने पर भी लेते हैं?" },
    { en: "Do you spend a lot of money or time getting tobacco?", hi: "क्या तंबाकू के लिए बहुत पैसा या समय ख़र्च होता है?" },
  ],
  options: Array.from({ length: 7 }, () => YES_NO),
  maxScore: 14,
  bands: [
    { min: 0, max: 3, level: "low-risk", label: { en: "Low dependence", hi: "कम लत" }, advice: { en: "Low dependence — the easiest time to quit is now. Any tobacco use is harmful.", hi: "लत कम है — छोड़ने का सबसे आसान समय अभी है। तंबाकू किसी भी मात्रा में नुकसानदायक है।" } },
    { min: 4, max: 8, level: "moderate", label: { en: "Moderate dependence", hi: "मध्यम लत" }, advice: { en: "Moderate dependence. Medicines (nicotine replacement and others) plus counselling make quitting much more likely.", hi: "मध्यम लत। दवाइयों (निकोटिन रिप्लेसमेंट आदि) और काउंसलिंग से छोड़ना बहुत आसान हो जाता है।" } },
    { min: 9, max: 14, level: "dependence", label: { en: "High dependence", hi: "ज़्यादा लत" }, advice: { en: "High dependence. Please book a de-addiction consultation for a structured quit plan.", hi: "लत ज़्यादा है। तय योजना से छोड़ने के लिए नशा-मुक्ति परामर्श बुक करें।" } },
  ],
};

const BOTHER3: ResponseOption[] = [
  { value: 0, label: { en: "Not bothered at all", hi: "बिल्कुल परेशान नहीं" } },
  { value: 1, label: { en: "Bothered a little", hi: "थोड़ा परेशान" } },
  { value: 2, label: { en: "Bothered a lot", hi: "बहुत परेशान" } },
];

/** PHQ-15 — somatic symptom severity (Kroenke, Spitzer & Williams, 2002). Public domain (phqscreeners.com). */
const PHQ15: Assessment = {
  id: "phq15",
  title: { en: "Body symptoms check (PHQ-15)", hi: "शारीरिक लक्षण जाँच (PHQ-15)" },
  about: { en: "15 questions · about 3 minutes", hi: "15 सवाल · लगभग 3 मिनट" },
  stem: {
    en: "During the past 4 weeks, how much have you been bothered by any of the following problems?",
    hi: "पिछले 4 हफ़्तों में, नीचे दी गई परेशानियों से आप कितना परेशान रहे?",
  },
  note: {
    en: "Question 4 is for women. Men, please choose \"Not bothered at all\".",
    hi: "सवाल 4 महिलाओं के लिए है। पुरुष \"बिल्कुल परेशान नहीं\" चुनें।",
  },
  questions: [
    { en: "Stomach pain", hi: "पेट में दर्द" },
    { en: "Back pain", hi: "कमर/पीठ में दर्द" },
    { en: "Pain in your arms, legs, or joints (knees, hips, etc.)", hi: "हाथ, पैर या जोड़ों (घुटने, कूल्हे आदि) में दर्द" },
    { en: "Menstrual cramps or other problems with your periods (women only)", hi: "माहवारी में ऐंठन या माहवारी से जुड़ी दूसरी परेशानी (केवल महिलाएँ)" },
    { en: "Headaches", hi: "सिरदर्द" },
    { en: "Chest pain", hi: "सीने में दर्द" },
    { en: "Dizziness", hi: "चक्कर आना" },
    { en: "Fainting spells", hi: "बेहोशी के दौरे" },
    { en: "Feeling your heart pound or race", hi: "दिल की धड़कन तेज़ या ज़ोर से महसूस होना" },
    { en: "Shortness of breath", hi: "साँस फूलना" },
    { en: "Pain or problems during sexual intercourse", hi: "यौन संबंध के दौरान दर्द या परेशानी" },
    { en: "Constipation, loose bowels, or diarrhea", hi: "कब्ज़, पतला मल या दस्त" },
    { en: "Nausea, gas, or indigestion", hi: "जी मिचलाना, गैस या अपच" },
    { en: "Feeling tired or having low energy", hi: "थकान या ऊर्जा की कमी" },
    { en: "Trouble sleeping", hi: "नींद की परेशानी" },
  ],
  options: Array.from({ length: 15 }, () => BOTHER3),
  maxScore: 30,
  bands: [
    { min: 0, max: 4, level: "minimal", label: { en: "Minimal", hi: "बहुत कम" }, advice: { en: "Few bothersome body symptoms.", hi: "परेशान करने वाले शारीरिक लक्षण कम हैं।" } },
    { min: 5, max: 9, level: "mild", label: { en: "Low", hi: "कम" }, advice: { en: "Some body symptoms. If they continue, a check-up with your family doctor is a good first step.", hi: "कुछ शारीरिक लक्षण हैं। बने रहें तो पहले अपने फ़ैमिली डॉक्टर से जाँच कराना अच्छा है।" } },
    { min: 10, max: 14, level: "moderate", label: { en: "Medium", hi: "मध्यम" }, advice: { en: "A medium level of body symptoms. Please make sure physical causes are checked. Stress, anxiety and depression often show up as body symptoms too — a consultation can help.", hi: "शारीरिक लक्षण मध्यम स्तर के हैं। कृपया शारीरिक कारणों की जाँच ज़रूर कराएँ। तनाव, घबराहट और डिप्रेशन भी अक्सर शारीरिक लक्षणों के रूप में दिखते हैं — परामर्श मदद कर सकता है।" } },
    { min: 15, max: 30, level: "severe", label: { en: "High", hi: "ज़्यादा" }, advice: { en: "Many bothersome body symptoms. Please see a doctor for a physical check-up and consider a psychiatric consultation; both together usually work best.", hi: "कई शारीरिक लक्षण परेशान कर रहे हैं। शारीरिक जाँच के लिए डॉक्टर से मिलें और मनोरोग परामर्श पर भी विचार करें; दोनों साथ में सबसे अच्छा काम करते हैं।" } },
  ],
  intro: {
    en: "Many people with stress, anxiety or depression first notice body symptoms — aches, tiredness, palpitations or stomach upset. This questionnaire measures how much such symptoms are bothering you. It does not find their cause: physical illness must always be checked first.",
    hi: "तनाव, घबराहट या डिप्रेशन वाले कई लोगों को पहले शारीरिक लक्षण दिखते हैं — दर्द, थकान, धड़कन या पेट ख़राब। यह प्रश्नावली मापती है कि ऐसे लक्षण आपको कितना परेशान कर रहे हैं। यह कारण नहीं बताती: शारीरिक बीमारी की जाँच हमेशा पहले होनी चाहिए।",
  },
  source: {
    en: "PHQ-15 (Kroenke, Spitzer & Williams, 2002). Public domain — phqscreeners.com states no permission is required to reproduce, translate or display it. Hindi translation by Neuro Mind Bloom.",
    hi: "PHQ-15 (Kroenke, Spitzer व Williams, 2002)। सार्वजनिक उपयोग हेतु — phqscreeners.com के अनुसार इसे दोहराने, अनुवाद करने या दिखाने के लिए अनुमति की ज़रूरत नहीं। हिंदी अनुवाद: Neuro Mind Bloom।",
  },
  conditions: ["somatic-symptom-pain-disorders-india", "health-anxiety-treatment-india", "depression-treatment-india", "generalized-anxiety-disorder-india"],
};

/** Original drug-use checklist (clinic-written). DAST-10 is copyrighted and is NOT used. */
const DRUGS: Assessment = {
  id: "drugs",
  checklist: true,
  title: { en: "Drug & pill use checklist", hi: "नशे / नशीली गोलियों की लक्षण-सूची" },
  about: { en: "8 questions · ganja, afeem, doda, smack, pills, syrup", hi: "8 सवाल · गांजा, अफ़ीम, डोडा, स्मैक, गोलियाँ, सिरप" },
  stem: {
    en: "Think about the past 12 months — any use of ganja/charas/bhang, afeem, doda post, smack/heroin, sleeping or pain pills (without a prescription or more than prescribed), codeine cough syrup or inhalants. Do not count alcohol or tobacco.",
    hi: "पिछले 12 महीनों के बारे में सोचें — गांजा/चरस/भांग, अफ़ीम, डोडा पोस्त, स्मैक/हेरोइन, नींद या दर्द की गोलियाँ (बिना पर्चे या पर्चे से ज़्यादा), कोडीन वाला कफ़ सिरप या सूँघने वाला नशा। शराब और तंबाकू को न गिनें।",
  },
  note: CHECKLIST_NOTE,
  questions: [
    { en: "Have you used any of these more than a few times?", hi: "क्या इनमें से कोई चीज़ कुछ बार से ज़्यादा ली है?" },
    { en: "Do you use more, or for longer, than you meant to?", hi: "क्या आप जितना सोचते हैं उससे ज़्यादा या ज़्यादा समय तक लेते हैं?" },
    { en: "Have you tried to stop or cut down but could not?", hi: "क्या छोड़ने या कम करने की कोशिश की पर नहीं कर पाए?" },
    { en: "Do you get body aches, loose motions, sleeplessness, restlessness or strong craving when you do not take it?", hi: "न लेने पर क्या बदन दर्द, दस्त, नींद न आना, बेचैनी या तेज़ तलब होती है?" },
    { en: "Has it caused problems at work, studies, money or in the family?", hi: "क्या इससे काम, पढ़ाई, पैसे या परिवार में परेशानी हुई है?" },
    { en: "Has anyone in the family or a friend been worried about it?", hi: "क्या परिवार में किसी को या किसी दोस्त को इसकी चिंता हुई है?" },
    { en: "Have you used it alone, in the morning, or to get through the day?", hi: "क्या आप इसे अकेले, सुबह-सुबह या दिन निकालने के लिए लेते हैं?" },
    { en: "Have you injected anything, shared needles, or had a blackout or overdose?", hi: "क्या कभी इंजेक्शन लिया, सुई साझा की, या बेहोशी/ओवरडोज़ हुआ?" },
  ],
  options: Array.from({ length: 8 }, () => YES_NO),
  maxScore: 16,
  bands: [
    { min: 0, max: 2, level: "low-risk", label: { en: "Low risk", hi: "कम जोखिम" }, advice: { en: "Few signs of a drug-use problem. Any use of these substances carries risk — avoiding them is safest.", hi: "नशे की समस्या के लक्षण कम हैं। इन चीज़ों का कोई भी इस्तेमाल जोखिम भरा है — दूर रहना सबसे सुरक्षित है।" } },
    { min: 3, max: 7, level: "harmful", label: { en: "Possible problem use", hi: "समस्या वाला इस्तेमाल हो सकता है" }, advice: { en: "Some signs of problem use. A confidential consultation can help you cut down or stop before it becomes harder.", hi: "समस्या वाले इस्तेमाल के कुछ लक्षण हैं। मुश्किल बढ़ने से पहले गोपनीय परामर्श से कम करने या छोड़ने में मदद मिल सकती है।" } },
    { min: 8, max: 16, level: "dependence", label: { en: "Possible dependence", hi: "लत (निर्भरता) की संभावना" }, advice: { en: "Many signs of dependence. Please book a de-addiction consultation. Do not stop sleeping pills or sedatives suddenly on your own — withdrawal can be dangerous.", hi: "लत के कई लक्षण हैं। कृपया नशा-मुक्ति परामर्श बुक करें। नींद या नशे की गोलियाँ अपने आप अचानक बंद न करें — इससे ख़तरनाक लक्षण हो सकते हैं।" } },
  ],
  intro: {
    en: "A quick, confidential way to think about whether drug or pill use may be becoming a problem. If you answered \"yes\" to injecting or overdose, please seek help soon even if your total score is low.",
    hi: "यह सोचने का आसान और गोपनीय तरीका कि नशा या गोलियों का इस्तेमाल समस्या तो नहीं बन रहा। अगर इंजेक्शन या ओवरडोज़ वाले सवाल का जवाब \"हाँ\" है, तो कुल स्कोर कम होने पर भी जल्द मदद लें।",
  },
  source: {
    en: "Original checklist written by Neuro Mind Bloom. The DAST-10 is copyrighted (Skinner, 1982) and is not reproduced here.",
    hi: "Neuro Mind Bloom द्वारा लिखी गई मूल लक्षण-सूची। DAST-10 कॉपीराइट है (Skinner, 1982) और यहाँ उपयोग नहीं किया गया।",
  },
  conditions: ["substance-use-disorders-treatment-india", "opium-afeem-addiction-india", "smack-addiction-treatment-india", "ganja-addiction-treatment-india", "sedative-sleeping-pill-dependence-india", "prescription-drug-dependence-india"],
};

/** Original sleep checklist (clinic-written). The ISI is licensed (Mapi Research Trust) and is NOT used. */
const SLEEP: Assessment = {
  id: "sleep",
  checklist: true,
  title: { en: "Sleep problems checklist", hi: "नींद की समस्या लक्षण-सूची" },
  about: { en: "8 questions · about 2 minutes", hi: "8 सवाल · लगभग 2 मिनट" },
  stem: { en: "During the past month…", hi: "पिछले एक महीने में…" },
  note: CHECKLIST_NOTE,
  questions: [
    { en: "Has it taken you more than 30 minutes to fall asleep?", hi: "क्या नींद आने में 30 मिनट से ज़्यादा लगे?" },
    { en: "Have you woken up during the night and found it hard to sleep again?", hi: "क्या रात में नींद खुली और दोबारा सोना मुश्किल रहा?" },
    { en: "Have you woken up too early and could not go back to sleep?", hi: "क्या बहुत जल्दी नींद खुल गई और फिर नहीं आई?" },
    { en: "Have you felt unrefreshed, sleepy or low in energy during the day?", hi: "क्या दिन में थकान, नींद या ऊर्जा की कमी रही?" },
    { en: "Has poor sleep affected your mood, concentration, studies or work?", hi: "क्या ख़राब नींद से मूड, ध्यान, पढ़ाई या काम पर असर पड़ा?" },
    { en: "Have you worried a lot about not sleeping?", hi: "क्या नींद न आने को लेकर बहुत चिंता रही?" },
    { en: "Have you needed sleeping pills, alcohol or other substances to sleep?", hi: "क्या सोने के लिए नींद की गोली, शराब या कोई और चीज़ लेनी पड़ी?" },
    { en: "Has anyone noticed loud snoring with pauses in breathing, or have you woken up gasping?", hi: "क्या किसी ने ज़ोर के खर्राटे और साँस रुकने पर ध्यान दिया, या आप हाँफते हुए जागे?" },
  ],
  options: Array.from({ length: 8 }, () => YES_NO),
  maxScore: 16,
  bands: [
    { min: 0, max: 3, level: "minimal", label: { en: "Few sleep problems", hi: "नींद की समस्या कम" }, advice: { en: "Few sleep problems. A regular wake-up time and less screen time at night help keep it that way.", hi: "नींद की समस्या कम है। रोज़ एक तय समय पर उठना और रात में कम स्क्रीन इसे बनाए रखने में मदद करते हैं।" } },
    { min: 4, max: 8, level: "moderate", label: { en: "Some sleep problems", hi: "कुछ नींद की समस्या" }, advice: { en: "Some sleep problems. Sleep habits and CBT for insomnia work well; consult if this lasts more than a few weeks.", hi: "कुछ नींद की समस्या है। नींद की अच्छी आदतें और अनिद्रा के लिए CBT अच्छा असर करते हैं; कुछ हफ़्तों से ज़्यादा रहे तो परामर्श लें।" } },
    { min: 9, max: 16, level: "severe", label: { en: "Significant sleep problems", hi: "नींद की गंभीर समस्या" }, advice: { en: "Significant sleep problems. Please book a consultation. If snoring with breathing pauses was noticed, a check for sleep apnoea is also important.", hi: "नींद की काफ़ी समस्या है। कृपया परामर्श बुक करें। अगर खर्राटों के साथ साँस रुकती दिखी है, तो स्लीप एपनिया की जाँच भी ज़रूरी है।" } },
  ],
  intro: {
    en: "Poor sleep is common with stress, anxiety, depression, pain and substance use — and it can also be a problem on its own (insomnia). This checklist helps you see how much sleep is affecting you.",
    hi: "ख़राब नींद तनाव, घबराहट, डिप्रेशन, दर्द और नशे के साथ आम है — और यह अपने आप में भी समस्या (अनिद्रा) हो सकती है। यह सूची बताती है कि नींद आप पर कितना असर डाल रही है।",
  },
  source: {
    en: "Original checklist written by Neuro Mind Bloom. The Insomnia Severity Index (ISI) is licensed through Mapi Research Trust and is not reproduced here.",
    hi: "Neuro Mind Bloom द्वारा लिखी गई मूल लक्षण-सूची। Insomnia Severity Index (ISI) लाइसेंस वाला है और यहाँ उपयोग नहीं किया गया।",
  },
  conditions: ["insomnia-treatment-india", "sleep-disorders-psychiatrist-india", "sleep-problems-students-india", "depression-treatment-india"],
};

/** Original study-stress checklist for students (clinic-written). */
const STUDY_STRESS: Assessment = {
  id: "study-stress",
  checklist: true,
  title: { en: "Student stress checklist", hi: "छात्र तनाव लक्षण-सूची" },
  about: { en: "8 questions · NEET, JEE, boards, college", hi: "8 सवाल · NEET, JEE, बोर्ड, कॉलेज" },
  stem: { en: "During the past 2 weeks…", hi: "पिछले 2 हफ़्तों में…" },
  note: CHECKLIST_NOTE,
  questions: [
    { en: "Have you felt constantly tense or under pressure about studies or results?", hi: "क्या पढ़ाई या रिज़ल्ट को लेकर लगातार तनाव या दबाव महसूस हुआ?" },
    { en: "Have you found it hard to concentrate, even when you sit to study?", hi: "क्या पढ़ने बैठने पर भी ध्यान लगाना मुश्किल रहा?" },
    { en: "Has your sleep become poor or irregular?", hi: "क्या नींद ख़राब या अनियमित हो गई?" },
    { en: "Have you felt low, hopeless or lost interest in things you used to enjoy?", hi: "क्या उदासी, नाउम्मीदी रही या पसंद की चीज़ों में मन नहीं लगा?" },
    { en: "Have you had panic, palpitations, headaches or stomach upset before tests?", hi: "क्या टेस्ट से पहले घबराहट, तेज़ धड़कन, सिरदर्द या पेट ख़राब हुआ?" },
    { en: "Have you been comparing yourself with others and feeling you are not good enough?", hi: "क्या आप दूसरों से तुलना करके ख़ुद को कम समझते रहे?" },
    { en: "Have you been spending many hours on phone, games or social media to escape?", hi: "क्या बचने के लिए फ़ोन, गेम या सोशल मीडिया पर कई घंटे बिताए?" },
    { en: "Have you withdrawn from friends or family, or felt very alone?", hi: "क्या दोस्तों या परिवार से दूरी बना ली, या बहुत अकेलापन लगा?" },
  ],
  options: Array.from({ length: 8 }, () => YES_NO),
  maxScore: 16,
  bands: [
    { min: 0, max: 4, level: "minimal", label: { en: "Manageable stress", hi: "संभालने लायक तनाव" }, advice: { en: "Your stress seems manageable. Keep regular sleep, breaks, exercise and talking to people you trust.", hi: "आपका तनाव संभालने लायक लगता है। नियमित नींद, ब्रेक, व्यायाम और भरोसेमंद लोगों से बात जारी रखें।" } },
    { min: 5, max: 9, level: "moderate", label: { en: "High stress", hi: "ज़्यादा तनाव" }, advice: { en: "Stress is high and affecting you. A few counselling sessions can teach practical ways to study, sleep and cope better.", hi: "तनाव ज़्यादा है और आप पर असर डाल रहा है। कुछ काउंसलिंग सत्रों से पढ़ने, सोने और संभलने के व्यावहारिक तरीके सीखे जा सकते हैं।" } },
    { min: 10, max: 16, level: "severe", label: { en: "Very high stress", hi: "बहुत ज़्यादा तनाव" }, advice: { en: "Stress is very high. Please talk to a professional soon — this is common, confidential and treatable. If you ever feel like ending your life, call Tele-MANAS 14416 now.", hi: "तनाव बहुत ज़्यादा है। कृपया जल्द किसी विशेषज्ञ से बात करें — यह आम है, गोपनीय है और इसका इलाज संभव है। अगर कभी जीवन ख़त्म करने का विचार आए तो अभी Tele-MANAS 14416 पर कॉल करें।" } },
  ],
  intro: {
    en: "For school, coaching and college students — including NEET, JEE, NEET-PG and MBBS students. It looks at stress, sleep, mood and coping over the last two weeks.",
    hi: "स्कूल, कोचिंग और कॉलेज के छात्रों के लिए — NEET, JEE, NEET-PG और MBBS छात्रों सहित। यह पिछले दो हफ़्तों के तनाव, नींद, मूड और संभलने के तरीकों को देखती है।",
  },
  source: { en: "Original checklist written by Neuro Mind Bloom.", hi: "Neuro Mind Bloom द्वारा लिखी गई मूल लक्षण-सूची।" },
  conditions: ["student-exam-stress-india", "neet-exam-stress-india", "exam-anxiety-students-india", "academic-burnout-students-india"],
};

export const ASSESSMENTS: Record<AssessmentId, Assessment> = {
  phq9: {
    id: "phq9",
    title: { en: "Depression check (PHQ-9)", hi: "डिप्रेशन जाँच (PHQ-9)" },
    about: { en: "9 questions · about 2 minutes", hi: "9 सवाल · लगभग 2 मिनट" },
    stem: {
      en: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
      hi: "पिछले 2 हफ़्तों में, नीचे दी गई परेशानियों ने आपको कितनी बार परेशान किया?",
    },
    questions: [
      { en: "Little interest or pleasure in doing things", hi: "किसी भी काम में मन या खुशी न लगना" },
      { en: "Feeling down, depressed, or hopeless", hi: "उदास, निराश या नाउम्मीद महसूस करना" },
      { en: "Trouble falling or staying asleep, or sleeping too much", hi: "नींद आने या नींद बनाए रखने में दिक्कत, या बहुत ज़्यादा सोना" },
      { en: "Feeling tired or having little energy", hi: "थकान महसूस होना या ऊर्जा कम लगना" },
      { en: "Poor appetite or overeating", hi: "भूख कम लगना या ज़्यादा खाना" },
      {
        en: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
        hi: "अपने बारे में बुरा महसूस करना — या लगना कि आप असफल हैं या आपने ख़ुद को या परिवार को निराश किया है",
      },
      {
        en: "Trouble concentrating on things, such as reading the newspaper or watching television",
        hi: "किसी चीज़ पर ध्यान लगाने में दिक्कत, जैसे अख़बार पढ़ना या टीवी देखना",
      },
      {
        en: "Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving around a lot more than usual",
        hi: "इतना धीरे चलना या बोलना कि दूसरों का ध्यान जाए — या इसका उल्टा, इतनी बेचैनी कि आप सामान्य से बहुत ज़्यादा इधर-उधर घूमते रहे हों",
      },
      {
        en: "Thoughts that you would be better off dead, or of hurting yourself in some way",
        hi: "ऐसे विचार कि मर जाना बेहतर होगा, या ख़ुद को किसी तरह नुकसान पहुँचाने के विचार",
      },
    ],
    bands: [
      { min: 0, max: 4, level: "minimal", label: { en: "Minimal", hi: "बहुत कम" }, advice: { en: "Your answers suggest minimal depressive symptoms. If something still worries you, it is fine to talk to a doctor.", hi: "आपके जवाब बहुत कम डिप्रेशन के लक्षण दिखाते हैं। फिर भी कोई चिंता हो तो डॉक्टर से बात करना ठीक है।" } },
      { min: 5, max: 9, level: "mild", label: { en: "Mild", hi: "हल्का" }, advice: { en: "Mild symptoms. Healthy routine, sleep and activity help; consider a consultation if this lasts more than a few weeks.", hi: "हल्के लक्षण। अच्छी दिनचर्या, नींद और गतिविधि मदद करती है; कुछ हफ़्तों से ज़्यादा रहे तो परामर्श लें।" } },
      { min: 10, max: 14, level: "moderate", label: { en: "Moderate", hi: "मध्यम" }, advice: SEEK_HELP },
      { min: 15, max: 19, level: "moderately-severe", label: { en: "Moderately severe", hi: "मध्यम-गंभीर" }, advice: { en: "These symptoms are significant. Please book a consultation soon — effective treatment is available.", hi: "ये लक्षण काफ़ी ज़्यादा हैं। कृपया जल्द परामर्श लें — असरदार इलाज उपलब्ध है।" } },
      { min: 20, max: 27, level: "severe", label: { en: "Severe", hi: "गंभीर" }, advice: { en: "These symptoms are severe. Please see a psychiatrist as soon as possible.", hi: "ये लक्षण गंभीर हैं। कृपया जितनी जल्दी हो सके मनोचिकित्सक से मिलें।" } },
    ],
    safetyItem: 8,
  },
  gad7: {
    id: "gad7",
    title: { en: "Anxiety check (GAD-7)", hi: "घबराहट / चिंता जाँच (GAD-7)" },
    about: { en: "7 questions · about 2 minutes", hi: "7 सवाल · लगभग 2 मिनट" },
    stem: {
      en: "Over the last 2 weeks, how often have you been bothered by the following problems?",
      hi: "पिछले 2 हफ़्तों में, नीचे दी गई परेशानियों ने आपको कितनी बार परेशान किया?",
    },
    questions: [
      { en: "Feeling nervous, anxious, or on edge", hi: "घबराहट, बेचैनी या तनाव महसूस करना" },
      { en: "Not being able to stop or control worrying", hi: "चिंता को रोक या काबू न कर पाना" },
      { en: "Worrying too much about different things", hi: "अलग-अलग बातों को लेकर बहुत ज़्यादा चिंता करना" },
      { en: "Trouble relaxing", hi: "आराम न कर पाना" },
      { en: "Being so restless that it is hard to sit still", hi: "इतनी बेचैनी कि शांत बैठना मुश्किल हो" },
      { en: "Becoming easily annoyed or irritable", hi: "जल्दी चिढ़ जाना या गुस्सा आना" },
      { en: "Feeling afraid, as if something awful might happen", hi: "डर लगना, जैसे कुछ बहुत बुरा होने वाला है" },
    ],
    bands: [
      { min: 0, max: 4, level: "minimal", label: { en: "Minimal", hi: "बहुत कम" }, advice: { en: "Your answers suggest minimal anxiety.", hi: "आपके जवाब बहुत कम चिंता दिखाते हैं।" } },
      { min: 5, max: 9, level: "mild", label: { en: "Mild", hi: "हल्का" }, advice: { en: "Mild anxiety. Breathing exercises, regular sleep and less caffeine can help; consult if it persists.", hi: "हल्की चिंता। साँस के व्यायाम, नियमित नींद और कम चाय-कॉफ़ी मदद करते हैं; बनी रहे तो परामर्श लें।" } },
      { min: 10, max: 14, level: "moderate", label: { en: "Moderate", hi: "मध्यम" }, advice: SEEK_HELP },
      { min: 15, max: 21, level: "severe", label: { en: "Severe", hi: "गंभीर" }, advice: { en: "Anxiety at this level usually needs treatment. Please book a consultation.", hi: "इस स्तर की चिंता में आमतौर पर इलाज की ज़रूरत होती है। कृपया परामर्श बुक करें।" } },
    ],
  },
  audit: AUDIT,
  asrs: ASRS,
  ocd: OCD,
  tobacco: TOBACCO,
  phq15: PHQ15,
  drugs: DRUGS,
  sleep: SLEEP,
  "study-stress": STUDY_STRESS,
};

/** Intro, licence notice and related pages for the scales defined inline above. */
const META: Partial<Record<AssessmentId, Pick<Assessment, "intro" | "source" | "conditions">>> = {
  phq9: {
    intro: {
      en: "The PHQ-9 is one of the most widely used depression screening questionnaires in the world. It asks about nine common symptoms of depression over the last two weeks.",
      hi: "PHQ-9 दुनिया में डिप्रेशन की सबसे ज़्यादा इस्तेमाल होने वाली स्क्रीनिंग प्रश्नावली में से एक है। यह पिछले दो हफ़्तों के डिप्रेशन के नौ आम लक्षणों के बारे में पूछती है।",
    },
    source: {
      en: "PHQ-9 (Kroenke, Spitzer & Williams, 2001). Public domain — phqscreeners.com states no permission is required to reproduce, translate or display it. Hindi translation by Neuro Mind Bloom.",
      hi: "PHQ-9 (Kroenke, Spitzer व Williams, 2001)। सार्वजनिक उपयोग हेतु — phqscreeners.com के अनुसार अनुमति की ज़रूरत नहीं। हिंदी अनुवाद: Neuro Mind Bloom।",
    },
    conditions: ["depression-treatment-india", "dysthymia-persistent-depressive-disorder-india", "postpartum-depression-india", "late-life-depression-india", "bipolar-disorder-psychiatrist-india"],
  },
  gad7: {
    intro: {
      en: "The GAD-7 measures how much worry and anxiety have bothered you over the last two weeks. It is also useful for panic, social anxiety and stress.",
      hi: "GAD-7 मापता है कि पिछले दो हफ़्तों में चिंता और घबराहट ने आपको कितना परेशान किया। यह पैनिक, सामाजिक घबराहट और तनाव में भी उपयोगी है।",
    },
    source: {
      en: "GAD-7 (Spitzer, Kroenke, Williams & Löwe, 2006). Public domain — phqscreeners.com states no permission is required. Hindi translation by Neuro Mind Bloom.",
      hi: "GAD-7 (Spitzer, Kroenke, Williams व Löwe, 2006)। सार्वजनिक उपयोग हेतु — अनुमति की ज़रूरत नहीं। हिंदी अनुवाद: Neuro Mind Bloom।",
    },
    conditions: ["generalized-anxiety-disorder-india", "panic-disorder-treatment-india", "social-anxiety-treatment-india", "agoraphobia-treatment-india", "health-anxiety-treatment-india"],
  },
  audit: {
    intro: {
      en: "The AUDIT was developed by the World Health Organization to identify risky and harmful drinking and possible dependence. It takes about three minutes.",
      hi: "AUDIT को विश्व स्वास्थ्य संगठन (WHO) ने जोखिम भरे, नुकसानदायक पीने और संभावित लत की पहचान के लिए बनाया है। इसमें लगभग तीन मिनट लगते हैं।",
    },
    source: {
      en: "AUDIT — Alcohol Use Disorders Identification Test (Babor et al., WHO 2001). As a WHO-approved instrument, the AUDIT is in the public domain; it is offered here free of charge and unchanged. Hindi translation by Neuro Mind Bloom.",
      hi: "AUDIT (Babor व अन्य, WHO 2001)। WHO द्वारा स्वीकृत यह प्रश्नावली सार्वजनिक उपयोग में है; यहाँ यह निःशुल्क और बिना बदलाव के दी गई है। हिंदी अनुवाद: Neuro Mind Bloom।",
    },
    conditions: ["alcohol-addiction-treatment-india", "deaddiction-psychiatrist-india", "substance-use-disorders-treatment-india"],
  },
  asrs: {
    intro: {
      en: "The ASRS v1.1 screener (Part A) has six questions about attention and restlessness in adults over the last six months. It is for adults aged 18 and above.",
      hi: "ASRS v1.1 स्क्रीनर (भाग A) में पिछले छह महीनों के ध्यान और बेचैनी से जुड़े छह सवाल हैं। यह 18 वर्ष और उससे बड़ी उम्र के लोगों के लिए है।",
    },
    source: {
      en: "Adult ADHD Self-Report Scale (ASRS v1.1) Screener — Kessler RC et al., Psychological Medicine 2005;35:245–256. Copyright © New York University and President and Fellows of Harvard College. Used without alteration as permitted by the authors (hcp.med.harvard.edu/ncs/asrs.php). Hindi translation by Neuro Mind Bloom.",
      hi: "Adult ADHD Self-Report Scale (ASRS v1.1) Screener — Kessler व अन्य, 2005। कॉपीराइट © New York University और President and Fellows of Harvard College। लेखकों की अनुमति अनुसार बिना बदलाव के उपयोग। हिंदी अनुवाद: Neuro Mind Bloom।",
    },
    conditions: ["adult-adhd-treatment-india", "adhd-psychiatrist-india", "concentration-problems-students-india"],
  },
  ocd: {
    intro: {
      en: "Looks at unwanted repeated thoughts (obsessions) and repeated actions (compulsions) over the last month, and how much time and distress they cause.",
      hi: "पिछले एक महीने के बार-बार आने वाले अनचाहे विचार (ऑब्सेशन) और बार-बार किए जाने वाले काम (कंपल्शन), और उनसे होने वाले समय व परेशानी को देखती है।",
    },
    source: { en: "Original checklist written by Neuro Mind Bloom (not the Y-BOCS).", hi: "Neuro Mind Bloom द्वारा लिखी गई मूल लक्षण-सूची (Y-BOCS नहीं)।" },
    conditions: ["ocd-treatment-india", "body-dysmorphic-disorder-india", "hoarding-disorder-india", "hair-pulling-skin-picking-india", "erp-therapy-ocd-india"],
  },
  tobacco: {
    intro: {
      en: "For bidi, cigarette, gutka, khaini and other tobacco. It shows how strong the dependence is, which helps plan quitting.",
      hi: "बीड़ी, सिगरेट, गुटखा, खैनी और दूसरे तंबाकू के लिए। यह बताती है कि लत कितनी गहरी है, जिससे छोड़ने की योजना बनाने में मदद मिलती है।",
    },
    source: { en: "Original checklist written by Neuro Mind Bloom.", hi: "Neuro Mind Bloom द्वारा लिखी गई मूल लक्षण-सूची।" },
    conditions: ["tobacco-nicotine-addiction-treatment-india", "nicotine-dependence-treatment-india"],
  },
};

for (const [id, meta] of Object.entries(META)) Object.assign(ASSESSMENTS[id as AssessmentId], meta);

/** Display order on /self-assessment. */
export const ASSESSMENT_ORDER: AssessmentId[] = ["phq9", "gad7", "audit", "drugs", "tobacco", "asrs", "ocd", "sleep", "phq15", "study-stress"];

export const SCREENING_DISCLAIMER: L10n = {
  en: "Screening results do not establish a diagnosis. A qualified healthcare professional must perform a clinical assessment.",
  hi: "स्क्रीनिंग के परिणाम से निदान तय नहीं होता। योग्य स्वास्थ्य विशेषज्ञ द्वारा क्लिनिकल जाँच ज़रूरी है।",
};


export function optionsFor(assessment: Assessment, questionIndex: number): ResponseOption[] {
  return assessment.options?.[questionIndex] ?? RESPONSE_OPTIONS;
}

export type AssessmentResult = {
  total: number;
  max: number;
  band: Band;
  safetyFlag: boolean;
};

/** Score a completed questionnaire. Throws if any answer is missing or not an allowed value. */
export function scoreAssessment(id: AssessmentId, answers: (number | null | undefined)[]): AssessmentResult {
  const assessment = ASSESSMENTS[id];
  if (answers.length !== assessment.questions.length) throw new Error("Incomplete answers");
  const values: number[] = answers.map((a, i) => {
    if (typeof a !== "number" || !optionsFor(assessment, i).some((o) => o.value === a)) throw new Error("Invalid answer");
    return a;
  });
  const total = assessment.scorer ? assessment.scorer(values) : values.reduce((sum, v) => sum + v, 0);
  const band = assessment.bands.find((b) => total >= b.min && total <= b.max);
  if (!band) throw new Error("Score out of range");
  const safetyFlag = assessment.safetyItem !== undefined && values[assessment.safetyItem] > 0;
  return { total, max: assessment.maxScore ?? assessment.questions.length * 3, band, safetyFlag };
}
