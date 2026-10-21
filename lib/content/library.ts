import type { L10n } from "../i18n";
import { ARTICLES, type Article } from "./articles";
import type { ConditionContent, LibraryGroup, SelfTestId } from "./types";

/**
 * Library organisation: the 18 clinical groups requested for the condition
 * library, followed by neuropsychiatry, women, students, psychotherapy, crisis
 * support and locations. Order here = order on /conditions.
 */
export const LIBRARY_GROUPS: { id: LibraryGroup; label: L10n; blurb: L10n }[] = [
  { id: "mood", label: { en: "Depression and mood disorders", hi: "डिप्रेशन और मूड की बीमारियाँ" }, blurb: { en: "Low mood, loss of interest, grief, mood problems linked to periods or childbirth.", hi: "उदासी, मन न लगना, शोक, माहवारी या डिलीवरी से जुड़ी मूड की समस्याएँ।" } },
  { id: "anxiety", label: { en: "Anxiety and fear disorders", hi: "घबराहट और डर की बीमारियाँ" }, blurb: { en: "Worry, panic attacks, phobias and social fear.", hi: "चिंता, घबराहट के दौरे, फ़ोबिया और लोगों के सामने डर।" } },
  { id: "ocd", label: { en: "OCD and related disorders", hi: "OCD (वहम) और संबंधित बीमारियाँ" }, blurb: { en: "Unwanted repeated thoughts, checking, washing, hair pulling, appearance worries.", hi: "बार-बार अनचाहे विचार, चेक करना, धोना, बाल खींचना, शक्ल-सूरत की चिंता।" } },
  { id: "bipolar", label: { en: "Bipolar disorders", hi: "बाइपोलर डिसऑर्डर" }, blurb: { en: "Episodes of high energy (mania) and depression.", hi: "बहुत ज़्यादा जोश (मेनिया) और डिप्रेशन के दौर।" } },
  { id: "psychosis", label: { en: "Schizophrenia and psychotic disorders", hi: "सिज़ोफ्रेनिया और मनोविकृति" }, blurb: { en: "Hearing voices, suspiciousness, unusual beliefs.", hi: "आवाज़ें सुनना, शक, अजीब विश्वास।" } },
  { id: "sleep", label: { en: "Sleep disorders", hi: "नींद की बीमारियाँ" }, blurb: { en: "Insomnia, disturbed or excessive sleep.", hi: "अनिद्रा, टूटी या बहुत ज़्यादा नींद।" } },
  { id: "child", label: { en: "Child and adolescent psychiatry", hi: "बच्चों और किशोरों की मनोचिकित्सा" }, blurb: { en: "Behaviour, emotions, bedwetting, tics and teenage problems.", hi: "व्यवहार, भावनाएँ, बिस्तर गीला करना, टिक्स और किशोरों की समस्याएँ।" } },
  { id: "adhd-autism", label: { en: "ADHD and autism", hi: "ADHD और ऑटिज़्म" }, blurb: { en: "Attention, hyperactivity and social-communication differences — in children and adults.", hi: "ध्यान, अति-सक्रियता और सामाजिक-संवाद में अंतर — बच्चों और बड़ों में।" } },
  { id: "learning", label: { en: "Learning and developmental disorders", hi: "सीखने और विकास से जुड़ी समस्याएँ" }, blurb: { en: "Reading, writing, maths, speech-language and intellectual development.", hi: "पढ़ना, लिखना, गणित, बोलना-समझना और बौद्धिक विकास।" } },
  { id: "personality", label: { en: "Personality disorders", hi: "पर्सनैलिटी डिसऑर्डर" }, blurb: { en: "Long-standing patterns of emotions and relationships that cause distress.", hi: "भावनाओं और रिश्तों के पुराने पैटर्न जो परेशानी देते हैं।" } },
  { id: "trauma", label: { en: "Trauma and stress disorders", hi: "आघात (ट्रॉमा) और तनाव से जुड़ी बीमारियाँ" }, blurb: { en: "After accidents, violence, loss or major life changes.", hi: "दुर्घटना, हिंसा, किसी अपने को खोने या बड़े बदलाव के बाद।" } },
  { id: "somatic", label: { en: "Somatic symptom and dissociative disorders", hi: "शारीरिक लक्षण और डिसोसिएटिव बीमारियाँ" }, blurb: { en: "Physical symptoms, fits or health worry where stress plays a big role.", hi: "शारीरिक लक्षण, दौरे या सेहत की चिंता जिनमें तनाव की बड़ी भूमिका हो।" } },
  { id: "eating", label: { en: "Eating disorders", hi: "खाने से जुड़ी बीमारियाँ (ईटिंग डिसऑर्डर)" }, blurb: { en: "Restricting food, bingeing or purging.", hi: "खाना बहुत कम करना, बहुत ज़्यादा खाना या उल्टी करना।" } },
  { id: "geriatric", label: { en: "Geriatric psychiatry", hi: "बुज़ुर्गों की मनोचिकित्सा" }, blurb: { en: "Mental health of older adults, confusion and late-life depression.", hi: "बुज़ुर्गों का मानसिक स्वास्थ्य, भ्रम और बुढ़ापे का डिप्रेशन।" } },
  { id: "dementia", label: { en: "Dementia and cognitive disorders", hi: "डिमेंशिया और याददाश्त की बीमारियाँ" }, blurb: { en: "Memory loss, Alzheimer's, vascular dementia and early memory problems.", hi: "याददाश्त कम होना, अल्ज़ाइमर, वैस्कुलर डिमेंशिया और शुरुआती भूलने की समस्या।" } },
  { id: "sexual", label: { en: "Sexual health", hi: "यौन स्वास्थ्य (गुप्त रोग)" }, blurb: { en: "Erection, ejaculation, desire, pain and relationship concerns — treated confidentially.", hi: "इरेक्शन, स्खलन, इच्छा, दर्द और रिश्तों से जुड़ी बातें — पूरी गोपनीयता से।" } },
  { id: "substance", label: { en: "Substance use disorders (nasha)", hi: "नशे की लत" }, blurb: { en: "Alcohol, afeem, doda post, smack, ganja, tobacco, pills.", hi: "शराब, अफ़ीम, डोडा पोस्त, स्मैक, गांजा, तंबाकू, नशे की गोलियाँ।" } },
  { id: "behavioural", label: { en: "Behavioural addictions", hi: "व्यवहारिक लत" }, blurb: { en: "Gaming, gambling and betting, internet and pornography.", hi: "गेमिंग, जुआ-सट्टा, इंटरनेट और पोर्नोग्राफ़ी।" } },
  { id: "neuro", label: { en: "Neuropsychiatry", hi: "न्यूरोसाइकियाट्री" }, blurb: { en: "Mental health in epilepsy, stroke and headache.", hi: "मिर्गी, लकवा और सिरदर्द में मानसिक स्वास्थ्य।" } },
  { id: "women", label: { en: "Women's mental health", hi: "महिलाओं का मानसिक स्वास्थ्य" }, blurb: { en: "Periods, pregnancy, after childbirth and menopause.", hi: "माहवारी, गर्भावस्था, डिलीवरी के बाद और मेनोपॉज़।" } },
  { id: "student", label: { en: "Students and young professionals", hi: "छात्र और युवा प्रोफ़ेशनल" }, blurb: { en: "NEET, JEE, NEET-PG, MBBS, residency and workplace stress.", hi: "NEET, JEE, NEET-PG, MBBS, रेज़िडेंसी और काम का तनाव।" } },
  { id: "therapy", label: { en: "Psychotherapy and counselling", hi: "साइकोथेरेपी और काउंसलिंग" }, blurb: { en: "CBT, REBT, ERP, DBT skills, family and couples therapy.", hi: "CBT, REBT, ERP, DBT स्किल्स, परिवार और दंपति थेरेपी।" } },
  { id: "crisis", label: { en: "Crisis support", hi: "संकट में सहायता" }, blurb: { en: "Suicidal thoughts and emergencies — where to get help now.", hi: "आत्महत्या के विचार और आपात स्थिति — अभी मदद कहाँ मिले।" } },
  { id: "service", label: { en: "Consultation and locations", hi: "परामर्श और शहर" }, blurb: { en: "Ajmer-based practice; online video consultation across Rajasthan and India.", hi: "अजमेर स्थित; पूरे राजस्थान और भारत में ऑनलाइन वीडियो परामर्श।" } },
];

const FALLBACK: Record<ConditionContent["category"], LibraryGroup> = {
  mental: "mood",
  addiction: "substance",
  sexual: "sexual",
  child: "child",
  elderly: "geriatric",
  neuro: "neuro",
  women: "women",
  student: "student",
  therapy: "therapy",
  service: "service",
};

export function groupOf(c: ConditionContent): LibraryGroup {
  return c.group ?? FALLBACK[c.category];
}

export function groupLabel(id: LibraryGroup): L10n {
  return LIBRARY_GROUPS.find((g) => g.id === id)!.label;
}

/** Articles chosen on the page + articles that list this page as related. */
export function articlesFor(c: ConditionContent): Article[] {
  const chosen = new Set(c.articles ?? []);
  return ARTICLES.filter((a) => chosen.has(a.slug) || a.related.includes(c.slug)).slice(0, 4);
}

export function selfTestsFor(c: ConditionContent): SelfTestId[] {
  const list = [...(c.selfTests ?? []), ...(c.selfTest ? [c.selfTest] : [])];
  return [...new Set(list)];
}

/** Pages that are clinical conditions (not services, locations or therapies). */
export function isClinical(c: ConditionContent): boolean {
  const g = groupOf(c);
  return !["service", "therapy", "crisis"].includes(g) && c.category !== "service";
}
