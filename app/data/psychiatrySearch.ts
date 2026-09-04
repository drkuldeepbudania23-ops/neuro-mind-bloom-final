"use client";

export type ComplaintOption = {
  en: string;
  hi: string;
  tags: string[];
};

export type DiagnosisOption = {
  name: string;
  icd10: string;
  icd11: string;
  keywords: string;
  tags: string[];
};

export const complaintOptions: ComplaintOption[] = [
  { en: "Feeling sad / low mood", hi: "मन उदास रहना", tags: ["depression", "mood"] },
  { en: "Loss of interest or pleasure", hi: "किसी काम में मन या खुशी न लगना", tags: ["depression", "mood"] },
  { en: "Crying spells", hi: "बार-बार रोना आना", tags: ["depression", "mood"] },
  { en: "Low energy / tiredness", hi: "थकान या ऊर्जा की कमी", tags: ["depression", "anxiety", "sleep"] },
  { en: "Poor sleep", hi: "नींद कम या खराब आना", tags: ["sleep", "depression", "anxiety"] },
  { en: "Excessive sleep", hi: "बहुत ज्यादा नींद आना", tags: ["sleep", "depression"] },
  { en: "Difficulty falling asleep", hi: "नींद आने में देर लगना", tags: ["sleep"] },
  { en: "Repeated night awakenings", hi: "रात में बार-बार नींद खुलना", tags: ["sleep"] },
  { en: "Early morning awakening", hi: "सुबह बहुत जल्दी नींद खुल जाना", tags: ["sleep", "depression"] },
  { en: "Excessive worry", hi: "बहुत ज्यादा चिंता करना", tags: ["anxiety"] },
  { en: "Restlessness / unable to relax", hi: "बेचैनी या आराम न कर पाना", tags: ["anxiety"] },
  { en: "Palpitations / fast heartbeat", hi: "दिल तेज धड़कना", tags: ["anxiety", "panic"] },
  { en: "Sudden episodes of intense fear", hi: "अचानक बहुत तेज घबराहट या डर", tags: ["panic", "anxiety"] },
  { en: "Fear of dying or losing control", hi: "मरने या नियंत्रण खोने का डर", tags: ["panic"] },
  { en: "Fear of crowded or open places", hi: "भीड़ या खुली जगह से डर", tags: ["anxiety", "phobia"] },
  { en: "Fear of social situations", hi: "लोगों के सामने जाने या बोलने में डर", tags: ["anxiety", "social"] },
  { en: "Repeated unwanted thoughts", hi: "बार-बार अनचाहे विचार आना", tags: ["ocd"] },
  { en: "Repeated checking", hi: "बार-बार चेक करना", tags: ["ocd"] },
  { en: "Repeated washing / cleaning", hi: "बार-बार हाथ धोना या सफाई करना", tags: ["ocd"] },
  { en: "Need for symmetry / order", hi: "हर चीज बराबर या क्रम में रखने की मजबूरी", tags: ["ocd"] },
  { en: "Hearing voices others do not hear", hi: "ऐसी आवाजें सुनाई देना जो दूसरों को न सुनें", tags: ["psychosis"] },
  { en: "Suspiciousness / feeling people are against me", hi: "लोग मेरे खिलाफ हैं ऐसा शक होना", tags: ["psychosis"] },
  { en: "Feeling watched or followed", hi: "कोई देख रहा या पीछा कर रहा है ऐसा लगना", tags: ["psychosis"] },
  { en: "Talking or smiling to self", hi: "खुद से बात या बिना कारण मुस्कुराना", tags: ["psychosis"] },
  { en: "Reduced need for sleep with high energy", hi: "कम नींद में भी बहुत ऊर्जा रहना", tags: ["mania", "bipolar"] },
  { en: "Excessive talking", hi: "बहुत ज्यादा बोलना", tags: ["mania", "bipolar"] },
  { en: "Unusually high or irritable mood", hi: "बहुत ज्यादा उत्साह या चिड़चिड़ापन", tags: ["mania", "bipolar"] },
  { en: "Spending or risky behaviour", hi: "बहुत खर्च करना या जोखिम वाले काम करना", tags: ["mania", "bipolar"] },
  { en: "Poor concentration", hi: "ध्यान लगाने में दिक्कत", tags: ["adhd", "depression", "anxiety"] },
  { en: "Forgetfulness", hi: "बार-बार भूलना", tags: ["cognition"] },
  { en: "Hyperactivity / cannot sit still", hi: "बहुत चंचल रहना या एक जगह न बैठ पाना", tags: ["adhd"] },
  { en: "Impulsivity", hi: "बिना सोचे तुरंत काम कर देना", tags: ["adhd", "impulse"] },
  { en: "Child not responding to name / poor eye contact", hi: "बच्चा नाम पुकारने पर कम प्रतिक्रिया दे या आंख से संपर्क कम करे", tags: ["autism"] },
  { en: "Delayed speech / language", hi: "बोलने में देरी", tags: ["autism", "development"] },
  { en: "Repetitive behaviour / restricted interests", hi: "एक ही तरह की हरकतें या सीमित रुचियां", tags: ["autism"] },
  { en: "Alcohol craving", hi: "शराब की तेज इच्छा या craving", tags: ["alcohol", "addiction"] },
  { en: "Unable to control alcohol use", hi: "शराब की मात्रा नियंत्रित न कर पाना", tags: ["alcohol", "addiction"] },
  { en: "Tremor / sweating after stopping alcohol", hi: "शराब बंद करने पर हाथ कांपना या पसीना", tags: ["alcohol", "withdrawal"] },
  { en: "Opioid / smack / heroin craving", hi: "स्मैक या हेरोइन की craving", tags: ["opioid", "addiction"] },
  { en: "Body ache / loose motions after stopping opioids", hi: "नशा बंद करने पर बदन दर्द या दस्त", tags: ["opioid", "withdrawal"] },
  { en: "Cannabis use causing problems", hi: "गांजा/भांग के कारण दिक्कत", tags: ["cannabis", "addiction"] },
  { en: "Tobacco dependence", hi: "तंबाकू या सिगरेट की लत", tags: ["tobacco", "addiction"] },
  { en: "Repeated thoughts of self-harm", hi: "खुद को नुकसान पहुंचाने के विचार", tags: ["depression", "risk"] },
  { en: "Past self-harm attempt", hi: "पहले खुद को नुकसान पहुंचाने की कोशिश", tags: ["risk"] },
  { en: "Anger outbursts", hi: "बहुत गुस्सा आना या गुस्से के दौरे", tags: ["anger", "mood"] },
  { en: "Irritability", hi: "चिड़चिड़ापन", tags: ["mood", "anxiety"] },
  { en: "Relationship / marital problems", hi: "पति-पत्नी या रिश्ते में समस्या", tags: ["relationship"] },
  { en: "Sexual performance concern", hi: "यौन प्रदर्शन से जुड़ी परेशानी", tags: ["sexual"] },
  { en: "Reduced sexual desire", hi: "यौन इच्छा कम होना", tags: ["sexual"] },
  { en: "Erectile difficulty", hi: "इरेक्शन बनने या बनाए रखने में दिक्कत", tags: ["sexual"] },
  { en: "Early ejaculation", hi: "बहुत जल्दी वीर्यपात होना", tags: ["sexual"] },
  { en: "Stress after a traumatic event", hi: "किसी दर्दनाक घटना के बाद तनाव", tags: ["ptsd", "stress"] },
  { en: "Nightmares / flashbacks", hi: "डरावने सपने या घटना बार-बार याद आना", tags: ["ptsd"] },
];

export const diagnosisOptions: DiagnosisOption[] = [
  {
    name: "Depressive episode",
    icd10: "F32",
    icd11: "6A70",
    keywords: "low mood, loss of interest, low energy, sleep/appetite change, guilt, poor concentration, suicidal ideas",
    tags: ["depression", "mood"],
  },
  {
    name: "Recurrent depressive disorder",
    icd10: "F33",
    icd11: "6A71",
    keywords: "recurrent depressive episodes with recovery or partial recovery between episodes",
    tags: ["depression", "mood"],
  },
  {
    name: "Generalized anxiety disorder",
    icd10: "F41.1",
    icd11: "6B00",
    keywords: "persistent excessive worry, apprehension, muscle tension, restlessness, autonomic symptoms",
    tags: ["anxiety"],
  },
  {
    name: "Panic disorder",
    icd10: "F41.0",
    icd11: "6B01",
    keywords: "recurrent unexpected panic attacks, palpitations, breathlessness, fear of dying or losing control",
    tags: ["panic", "anxiety"],
  },
  {
    name: "Obsessive-compulsive disorder",
    icd10: "F42",
    icd11: "6B20",
    keywords: "obsessions and/or compulsions, intrusive thoughts, checking, washing, rituals",
    tags: ["ocd"],
  },
  {
    name: "Schizophrenia",
    icd10: "F20",
    icd11: "6A20",
    keywords: "delusions, hallucinations, thought disorder, negative symptoms, functional decline",
    tags: ["psychosis"],
  },
  {
    name: "Bipolar type I disorder",
    icd10: "F31",
    icd11: "6A60",
    keywords: "manic episode, elevated or irritable mood, increased activity, reduced need for sleep, pressured speech, grandiosity",
    tags: ["mania", "bipolar", "mood"],
  },
  {
    name: "Post-traumatic stress disorder",
    icd10: "F43.1",
    icd11: "6B40",
    keywords: "re-experiencing, avoidance, persistent sense of threat after traumatic event",
    tags: ["ptsd", "stress"],
  },
  {
    name: "Alcohol dependence",
    icd10: "F10.2",
    icd11: "6C40.2",
    keywords: "impaired control, priority to alcohol, physiological adaptation, craving, withdrawal",
    tags: ["alcohol", "addiction", "withdrawal"],
  },
  {
    name: "Opioid dependence",
    icd10: "F11.2",
    icd11: "6C43.2",
    keywords: "impaired control, opioid craving, priority to use, tolerance or withdrawal",
    tags: ["opioid", "addiction", "withdrawal"],
  },
  {
    name: "Attention deficit hyperactivity disorder",
    icd10: "F90.0",
    icd11: "6A05",
    keywords: "persistent inattention and/or hyperactivity-impulsivity causing impairment across settings",
    tags: ["adhd"],
  },
  {
    name: "Autism spectrum disorder",
    icd10: "F84.0",
    icd11: "6A02",
    keywords: "persistent social communication difficulties with restricted, repetitive or inflexible patterns",
    tags: ["autism", "development"],
  },
  {
    name: "Nonorganic insomnia / Insomnia disorder",
    icd10: "F51.0",
    icd11: "7A00",
    keywords: "difficulty initiating or maintaining sleep, early awakening, daytime impairment",
    tags: ["sleep"],
  },
];

export function complaintLabel(item: ComplaintOption) {
  return `${item.hi} / ${item.en}`;
}

export function diagnosisLabel(item: DiagnosisOption) {
  return `${item.name} | ICD-10 ${item.icd10} | ICD-11 ${item.icd11}`;
}
