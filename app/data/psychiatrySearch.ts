"use client";

import { PSYCHIATRY_ICD } from "../../data/psychiatry-icd";

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

const CURATED: DiagnosisOption[] = [
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
  { name: "Social anxiety disorder", icd10: "F40.1", icd11: "6B04", keywords: "marked fear of social scrutiny, embarrassment, avoidance", tags: ["anxiety", "social"] },
  { name: "Agoraphobia", icd10: "F40.0", icd11: "6B02", keywords: "fear or avoidance of crowds, public transport, open or enclosed spaces, being outside alone", tags: ["anxiety", "phobia"] },
  { name: "Specific phobia", icd10: "F40.2", icd11: "6B03", keywords: "marked persistent fear of a specific object or situation", tags: ["anxiety", "phobia"] },
  { name: "Adjustment disorder", icd10: "F43.2", icd11: "6B43", keywords: "emotional or behavioural symptoms in response to an identifiable stressor", tags: ["stress", "depression", "anxiety"] },
  { name: "Acute stress reaction / Acute stress disorder", icd10: "F43.0", icd11: "QE84", keywords: "acute stress symptoms after traumatic or exceptionally stressful event", tags: ["ptsd", "stress"] },
  { name: "Schizoaffective disorder", icd10: "F25", icd11: "6A21", keywords: "schizophrenic and prominent mood symptoms within same episode", tags: ["psychosis", "mood"] },
  { name: "Persistent delusional disorder", icd10: "F22", icd11: "6A24", keywords: "persistent delusions without typical schizophrenia syndrome", tags: ["psychosis"] },
  { name: "Acute and transient psychotic disorder", icd10: "F23", icd11: "6A23", keywords: "acute onset psychosis, delusions, hallucinations, disorganization", tags: ["psychosis"] },
  { name: "Cannabis dependence", icd10: "F12.2", icd11: "6C41.2", keywords: "cannabis craving, impaired control, tolerance, withdrawal, functional impairment", tags: ["cannabis", "addiction"] },
  { name: "Sedative or hypnotic dependence", icd10: "F13.2", icd11: "6C44.2", keywords: "benzodiazepine or sedative dependence, tolerance, withdrawal", tags: ["addiction", "withdrawal"] },
  { name: "Stimulant dependence", icd10: "F15.2", icd11: "6C46.2", keywords: "amphetamine or stimulant craving, impaired control, dependence", tags: ["addiction"] },
  { name: "Tobacco dependence", icd10: "F17.2", icd11: "6C4A.2", keywords: "nicotine dependence, tobacco craving, withdrawal", tags: ["tobacco", "addiction"] },
  { name: "Gambling disorder", icd10: "F63.0", icd11: "6C50", keywords: "persistent recurrent gambling causing significant impairment", tags: ["impulse", "addiction"] },
  { name: "Gaming disorder", icd10: "F63.8", icd11: "6C51", keywords: "impaired control over gaming, priority to gaming, continuation despite harm", tags: ["impulse", "addiction"] },
  { name: "Somatization / Bodily distress disorder", icd10: "F45.0", icd11: "6C20", keywords: "persistent distressing bodily symptoms with excessive attention or concern", tags: ["somatic", "anxiety"] },
  { name: "Dissociative disorder", icd10: "F44", icd11: "6B60", keywords: "disruption of memory, identity, sensation, movement or awareness", tags: ["dissociation", "stress"] },
  { name: "Anorexia nervosa", icd10: "F50.0", icd11: "6B80", keywords: "restricted intake, significantly low body weight, fear of weight gain", tags: ["eating"] },
  { name: "Bulimia nervosa", icd10: "F50.2", icd11: "6B81", keywords: "recurrent binge eating with compensatory behaviours and weight concern", tags: ["eating"] },
  { name: "Binge eating disorder", icd10: "F50.8", icd11: "6B82", keywords: "recurrent binge eating without regular compensatory behaviour", tags: ["eating"] },
  { name: "Emotionally unstable personality disorder / Borderline pattern", icd10: "F60.3", icd11: "6D11.5", keywords: "emotional instability, impulsivity, unstable relationships, self-harm, fear of abandonment", tags: ["personality", "risk"] },
  { name: "Antisocial / Dissocial personality disorder", icd10: "F60.2", icd11: "6D11.2", keywords: "persistent disregard for rights of others, irresponsibility, deceitfulness", tags: ["personality"] },
  { name: "Delirium", icd10: "F05", icd11: "6D70", keywords: "acute fluctuating disturbance of attention, awareness and cognition", tags: ["cognition"] },
  { name: "Dementia due to Alzheimer disease", icd10: "F00", icd11: "6D80", keywords: "progressive memory and cognitive decline affecting daily functioning", tags: ["cognition"] },
  { name: "Vascular dementia", icd10: "F01", icd11: "6D81", keywords: "cognitive decline associated with cerebrovascular disease", tags: ["cognition"] },
  { name: "Intellectual developmental disorder", icd10: "F70-F79", icd11: "6A00", keywords: "limitations in intellectual functioning and adaptive behaviour with developmental onset", tags: ["development"] },
  { name: "Oppositional defiant disorder", icd10: "F91.3", icd11: "6C90.2", keywords: "persistent angry irritable mood, argumentative defiant behaviour", tags: ["child", "anger"] },
  { name: "Conduct disorder", icd10: "F91", icd11: "6C91", keywords: "repetitive violation of rules or rights of others, aggression, deceit, serious rule breaking", tags: ["child", "anger"] },
  { name: "Tic disorder / Tourette syndrome", icd10: "F95", icd11: "8A05", keywords: "motor and or vocal tics", tags: ["child", "movement"] },
  { name: "Enuresis", icd10: "F98.0", icd11: "6C00", keywords: "repeated voiding of urine into bed or clothes beyond expected developmental age", tags: ["child"] },
  { name: "Erectile dysfunction", icd10: "F52.2", icd11: "HA01.1", keywords: "difficulty attaining or maintaining erection sufficient for sexual activity", tags: ["sexual"] },
  { name: "Premature ejaculation", icd10: "F52.4", icd11: "HA03.0", keywords: "ejaculation occurring sooner than desired with distress or interpersonal difficulty", tags: ["sexual"] },
];

export function complaintLabel(item: ComplaintOption) {
  return `${item.hi} / ${item.en}`;
}

export function diagnosisLabel(item: DiagnosisOption) {
  return [item.name, item.icd10 && `ICD-10 ${item.icd10}`, item.icd11 && `ICD-11 ${item.icd11}`].filter(Boolean).join(" | ");
}

/** Tags used to filter chief-complaint suggestions, derived from the ICD block. */
function tagsFor(icd10: string, icd11: string, name: string): string[] {
  const n = name.toLowerCase();
  const c = icd10.toUpperCase();
  const t: string[] = [];
  const add = (...x: string[]) => t.push(...x);
  if (/^F0|^G30/.test(c) || /dementia|cognitive|delirium|amnes/.test(n)) add("cognition");
  if (/^F1/.test(c)) add("addiction");
  if (/^F10/.test(c)) add("alcohol");
  if (/^F11/.test(c)) add("opioid");
  if (/^F12/.test(c)) add("cannabis");
  if (/^F17/.test(c)) add("tobacco");
  if (/withdrawal/.test(n)) add("withdrawal");
  if (/^F2/.test(c) || /psychot|delusion|schizo/.test(n)) add("psychosis");
  if (/^F3[01]/.test(c) || /bipolar|mania|cyclothym/.test(n)) add("bipolar", "mania", "mood");
  if (/^F3[234]/.test(c) || /depress|dysthym|grief|pmdd|premenstrual/.test(n)) add("depression", "mood");
  if (/^F4[01]/.test(c) || /anxiety|phobi|panic|mutism/.test(n)) add("anxiety");
  if (/panic/.test(n)) add("panic");
  if (/phobi/.test(n)) add("phobia");
  if (/social/.test(n)) add("social");
  if (/^F42/.test(c) || /obsess|dysmorph|hoard|trichotill|skin-picking|olfactory/.test(n)) add("ocd");
  if (/^F43/.test(c) || /stress|adjustment|trauma|burn-out/.test(n)) add("stress");
  if (/post-traumatic|ptsd/.test(n)) add("ptsd");
  if (/^F44|dissociat|trance|depersonal/.test(c + " " + n)) add("dissociation");
  if (/^F45|somat|bodily|hypochond|dhat|neurasth/.test(c + " " + n)) add("somatic");
  if (/^F50|eating|anorexia|bulimia|pica|food intake|rumination/.test(c + " " + n)) add("eating");
  if (/^F51|^G47|^7A|insomnia|sleep|narcolep|restless legs|nightmare/.test(c + " " + icd11 + " " + n)) add("sleep");
  if (/^F52|^N52|^HA|sexual|ejaculat|erectile|vaginismus|dyspareun|orgasm/.test(c + " " + icd11 + " " + n)) add("sexual");
  if (/^F6[0-2]|personality/.test(c + " " + n)) add("personality");
  if (/^F63|gambl|gaming|impulse|explosive|klepto|pyro/.test(c + " " + n)) add("impulse");
  if (/explosive|conduct|oppositional/.test(n)) add("anger");
  if (/^F7|^F8[0-9]|^F9[0-8]/.test(c) || /childhood|infancy/.test(n)) add("child");
  if (/^F7|^F8/.test(c)) add("development");
  if (/^F84|autism|asperger/.test(c + " " + n)) add("autism");
  if (/^F90|adhd|hyperkinetic/.test(c + " " + n)) add("adhd");
  if (/tic|tourette|stereotyped|tremor|dystonia|parkinsonism/.test(n)) add("movement");
  if (/self-harm|suicid/.test(n)) add("risk");
  if (/marital|family|support group/.test(n)) add("relationship");
  return Array.from(new Set(t));
}

const ICD_OPTIONS: DiagnosisOption[] = PSYCHIATRY_ICD.map(([icd10, icd11, name, keywords]) => ({
  name,
  icd10,
  icd11,
  keywords: keywords ?? "",
  tags: tagsFor(icd10, icd11, name),
}));

/** Curated psychiatry diagnoses first, then the full ICD-10 Chapter V / ICD-11 Chapter 6 list (no duplicates). */
export const diagnosisOptions: DiagnosisOption[] = (() => {
  const seen = new Set(CURATED.map((d) => `${d.icd10}|${d.icd11}`.toLowerCase()));
  const curatedNames = new Set(CURATED.map((d) => d.name.toLowerCase()));
  const extra = ICD_OPTIONS.filter((d) => {
    const key = `${d.icd10}|${d.icd11}`.toLowerCase();
    if (seen.has(key) || curatedNames.has(d.name.toLowerCase())) return false;
    seen.add(key);
    return true;
  });
  return [...CURATED, ...extra];
})();

function norm(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9.\u0900-\u097f]+/g, " ").trim();
}

/**
 * Ranked diagnosis search: every word must match (name, codes, keywords or tags).
 * Exact / prefix code matches rank first, then name starts, then other matches.
 */
const HINGLISH: Record<string, string[]> = {
  neend: ["insomnia", "sleep"], nind: ["insomnia", "sleep"], udasi: ["depress"], udas: ["depress"],
  ghabrahat: ["anxiety", "panic"], chinta: ["anxiety", "worry"], dar: ["phobi", "anxiety"], darr: ["phobi", "anxiety"],
  vaham: ["obsess"], vehem: ["obsess"], shak: ["delusion", "paranoid"], sharab: ["alcohol"], daru: ["alcohol"],
  afeem: ["opioid"], afim: ["opioid"], doda: ["opioid"], smack: ["opioid"], heroin: ["opioid"], ganja: ["cannab"],
  charas: ["cannab"], bhang: ["cannab"], tambaku: ["tobacco"], gutka: ["tobacco"], bidi: ["tobacco"],
  mirgi: ["epilep", "seizure"], daura: ["seizure", "dissociative convulsions"], bhoolna: ["dementia", "memory", "amnes"],
  yaddasht: ["dementia", "memory"], gussa: ["explosive", "anger", "oppositional"], satta: ["gambl"],
  pagal: ["psychos", "schizo"], dhat: ["dhat"], shighrapatan: ["premature"], napunsakta: ["erectile"],
};

/** Rough word stem: "depression" → "depress", "anxiety" → "anxi"; short words unchanged. */
function stem(word: string): string {
  return word.length > 6 ? word.slice(0, word.length - 3) : word;
}

export function searchDiagnoses(query: string, limit = 30): DiagnosisOption[] {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ");
  const alts = words.map((w) => [w, ...(HINGLISH[w] ?? [])]);
  const scored: { d: DiagnosisOption; score: number; i: number; alt: number }[] = [];
  diagnosisOptions.forEach((d, i) => {
    const codes = `${d.icd10} ${d.icd11}`.toLowerCase();
    const name = norm(d.name);
    const hay = `${name} ${codes} ${norm(d.keywords)} ${d.tags.join(" ")}`;
    if (!alts.every((opts) => opts.some((w) => hay.includes(w)))) return;
    const c10 = d.icd10.toLowerCase();
    const c11 = d.icd11.toLowerCase();
    // "depression" should also find "Depressive …", "anxiety" → "Anxious …": compare word stems.
    const stems = alts[0].map(stem);
    let score = 6;
    if (c10 === q || c11 === q) score = 0;
    else if ((c10 && c10.startsWith(q)) || (c11 && c11.startsWith(q))) score = 1;
    else if (name.startsWith(q) || stems.some((st) => name.startsWith(st))) score = 2;
    else if (name.split(" ").some((w) => stems.some((st) => w.startsWith(st)))) score = 3;
    else if (name.includes(q)) score = 4;
    else if (codes.includes(q)) score = 5;
    // Which search word matched (user's word, then Hinglish synonyms in priority order).
    const words2 = name.split(" ");
    const alt = stems.findIndex((st) => words2.some((w) => w.startsWith(st)));
    scored.push({ d, score, i, alt: alt < 0 ? 99 : alt });
  });
  // Same score: main categories (shorter codes, e.g. F32 before F32.1) first, then list order.
  const depth = (d: DiagnosisOption) => (d.icd10 || d.icd11 || "~~~~~~~~").length;
  return scored
    .sort(
      (a, b) =>
        a.score - b.score ||
        (a.score <= 1 ? a.d.icd10.localeCompare(b.d.icd10) : a.alt - b.alt || depth(a.d) - depth(b.d) || a.i - b.i)
    )
    .slice(0, limit)
    .map((x) => x.d);
}
