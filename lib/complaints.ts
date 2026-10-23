import { complaintOptions, type ComplaintOption } from "../app/data/psychiatrySearch";

/**
 * Patient-facing complaint search for the booking form.
 *
 * - Reuses the existing clinical complaint list (so the doctor's e-prescription
 *   still recognises these when it pre-fills from an appointment), and adds
 *   extra common patient phrasings.
 * - Searchable in English, Hindi (Devanagari) and Hinglish / Roman Hindi
 *   ("neend", "ghabrahat", "sharab", "dhat") — the way patients actually type.
 * - Labels keep the existing "हिंदी / English" format: the prescription page
 *   takes the English part after " / ".
 */

export type BookingComplaint = ComplaintOption & { roman: string[] };

/** Roman-Hindi keywords for existing complaints, keyed by the English text. */
const ROMAN: Record<string, string[]> = {
  "Feeling sad / low mood": ["udas", "udasi", "dukhi", "man nahi lagta", "depression", "tension", "mood off"],
  "Loss of interest or pleasure": ["man nahi lagta", "kisi kaam me man nahi", "khushi nahi"],
  "Crying spells": ["rona", "rona aana", "baar baar rona"],
  "Low energy / tiredness": ["thakan", "kamzori", "energy nahi", "susti"],
  "Poor sleep": ["neend", "nind", "neend nahi aati", "insomnia", "anidra"],
  "Excessive sleep": ["jyada neend", "zyada neend", "bahut sona"],
  "Difficulty falling asleep": ["neend nahi aati", "der se neend"],
  "Repeated night awakenings": ["raat ko neend khulna", "neend tootna"],
  "Early morning awakening": ["subah jaldi neend khulna"],
  "Excessive worry": ["chinta", "fikar", "tension", "overthinking", "soch"],
  "Restlessness / unable to relax": ["bechaini", "bechain", "ghabrahat", "restless"],
  "Palpitations / fast heartbeat": ["dil ki dhadkan", "dhadkan tez", "dil ghabrana", "ghabrahat"],
  "Sudden episodes of intense fear": ["panic", "achanak dar", "ghabrahat ka daura", "ghabrahat"],
  "Fear of dying or losing control": ["marne ka dar", "maut ka dar", "pagal hone ka dar"],
  "Fear of crowded or open places": ["bheed se dar", "bahar jane me dar"],
  "Fear of social situations": ["logon se dar", "sharm", "stage fear", "bolne me dar"],
  "Repeated unwanted thoughts": ["vaham", "veham", "wahem", "baar baar vichar", "ocd", "faltu vichar"],
  "Repeated checking": ["baar baar check", "tala check", "vaham"],
  "Repeated washing / cleaning": ["baar baar haath dhona", "safai", "ocd"],
  "Need for symmetry / order": ["sab barabar", "perfect"],
  "Hearing voices others do not hear": ["awaz", "aawaz sunai", "kaan me awaz", "awaze"],
  "Suspiciousness / feeling people are against me": ["shak", "shaq", "log mere khilaf", "jaadu tona"],
  "Feeling watched or followed": ["koi peecha", "koi dekh raha"],
  "Talking or smiling to self": ["khud se baat", "akele hasna", "budbudana"],
  "Reduced need for sleep with high energy": ["neend ki zarurat nahi", "bahut energy"],
  "Excessive talking": ["jyada bolna", "bahut bolna"],
  "Unusually high or irritable mood": ["bahut khush", "gussa", "chidchidapan"],
  "Spending or risky behaviour": ["jyada kharcha", "paise udana"],
  "Poor concentration": ["dhyan nahi lagta", "padhai me man nahi", "focus"],
  "Forgetfulness": ["bhoolna", "bhulna", "yaad nahi rehta", "yaaddasht"],
  "Hyperactivity / cannot sit still": ["chanchal", "tik ke nahi baithta", "adhd"],
  "Impulsivity": ["bina soche", "jaldbaazi"],
  "Child not responding to name / poor eye contact": ["autism", "bachcha naam par nahi dekhta", "aankh nahi milata"],
  "Delayed speech / language": ["bolne me der", "bachcha nahi bolta"],
  "Repetitive behaviour / restricted interests": ["ek hi kaam baar baar"],
  "Alcohol craving": ["sharab", "daru", "daaru", "peena", "alcohol", "nasha"],
  "Unable to control alcohol use": ["sharab nahi chhoot rahi", "daru chhodna", "nasha mukti"],
  "Tremor / sweating after stopping alcohol": ["haath kaanpna", "paseena", "sharab chhodne par"],
  "Opioid / smack / heroin craving": ["smack", "smaik", "heroin", "afeem", "afim", "doda", "post", "chura", "nasha"],
  "Body ache / loose motions after stopping opioids": ["badan dard", "dast", "afeem chhodne par", "toot"],
  "Cannabis use causing problems": ["ganja", "charas", "bhang", "hash"],
  "Tobacco dependence": ["tambaku", "tobacco", "gutka", "gutkha", "bidi", "beedi", "cigarette", "khaini", "zarda"],
  "Repeated thoughts of self-harm": ["marne ke vichar", "suicide", "khudkushi", "aatmhatya"],
  "Past self-harm attempt": ["suicide attempt", "pehle koshish"],
  "Anger outbursts": ["gussa", "krodh", "bahut gussa"],
  "Irritability": ["chidchidapan", "chidchida"],
  "Relationship / marital problems": ["pati patni", "shaadi", "jhagda", "rishte"],
  "Sexual performance concern": ["sex problem", "gupt rog", "kamzori", "performance"],
  "Reduced sexual desire": ["ichha nahi", "sex ki ichha kam", "libido"],
  "Erectile difficulty": ["tanav nahi", "erection", "ling", "napunsakta", "kamzori"],
  "Early ejaculation": ["shighrapatan", "jaldi discharge", "jaldi chhut", "pe"],
  "Stress after a traumatic event": ["sadma", "hadsa", "trauma", "accident"],
  "Nightmares / flashbacks": ["bure sapne", "darawne sapne"],
};

/** Additional patient phrasings not in the clinical list. */
const EXTRA: BookingComplaint[] = [
  { en: "Headache / heaviness in head", hi: "सिर दर्द / सिर भारी रहना", tags: ["somatic", "anxiety"], roman: ["sir dard", "sar dard", "sir bhari", "headache"] },
  { en: "Dizziness / feeling faint", hi: "चक्कर आना / बेहोशी जैसा लगना", tags: ["anxiety", "somatic"], roman: ["chakkar", "behoshi"] },
  { en: "Unexplained body pain / burning", hi: "बिना वजह शरीर में दर्द या जलन", tags: ["somatic"], roman: ["badan dard", "sharir me dard", "jalan"] },
  { en: "Fits / seizures", hi: "दौरे / मिर्गी", tags: ["seizure"], roman: ["mirgi", "daura", "daure", "fits", "jhatke"] },
  { en: "Episodes of unconsciousness or possession-like behaviour", hi: "बेहोशी के दौरे या 'देवता/भाव आना' जैसे दौरे", tags: ["dissociation"], roman: ["bhav aana", "devta aana", "hawa", "upri", "bhoot pret", "behoshi ke daure"] },
  { en: "Exam stress / study pressure", hi: "परीक्षा का तनाव / पढ़ाई का दबाव", tags: ["anxiety", "stress", "child"], roman: ["exam", "pariksha", "padhai ka tension", "neet", "jee", "coaching"] },
  { en: "Mobile / social media overuse", hi: "मोबाइल / सोशल मीडिया की लत", tags: ["addiction", "impulse"], roman: ["mobile ki lat", "phone", "reels", "instagram", "social media"] },
  { en: "Gaming addiction", hi: "गेम खेलने की लत", tags: ["addiction", "impulse"], roman: ["game", "gaming", "pubg", "free fire", "bgmi"] },
  { en: "Online betting / gambling", hi: "ऑनलाइन सट्टा / जुआ", tags: ["addiction", "impulse"], roman: ["satta", "juaa", "jua", "betting", "online game paise"] },
  { en: "Pornography overuse", hi: "पोर्न देखने की आदत", tags: ["addiction", "sexual"], roman: ["porn", "blue film", "ganda video"] },
  { en: "Cough syrup / sleeping pill misuse", hi: "कफ सिरप / नींद की गोली का नशा", tags: ["addiction"], roman: ["cough syrup", "corex", "neend ki goli", "alprax", "tablet nasha"] },
  { en: "Dhat syndrome (worry about semen loss)", hi: "धात गिरना / धात रोग की चिंता", tags: ["sexual", "anxiety"], roman: ["dhat", "dhaat", "dhat girna", "virya", "kamzori"] },
  { en: "Night emissions worry", hi: "स्वप्नदोष की चिंता", tags: ["sexual", "anxiety"], roman: ["swapnadosh", "swapn dosh", "night fall", "nightfall"] },
  { en: "Guilt or worry about masturbation", hi: "हस्तमैथुन को लेकर अपराध-बोध या चिंता", tags: ["sexual", "anxiety"], roman: ["hastmaithun", "masturbation", "mut marna"] },
  { en: "Low confidence / inferiority", hi: "आत्मविश्वास की कमी / हीन भावना", tags: ["depression", "anxiety"], roman: ["confidence", "aatmvishwas", "heen bhavna"] },
  { en: "Loneliness", hi: "अकेलापन", tags: ["depression"], roman: ["akelapan", "akela"] },
  { en: "Grief after a loss", hi: "किसी अपने को खोने का दुख", tags: ["depression", "stress"], roman: ["gam", "maut ka dukh", "shok"] },
  { en: "Sadness after childbirth", hi: "डिलीवरी के बाद उदासी", tags: ["depression", "women"], roman: ["delivery ke baad", "prasav", "postpartum"] },
  { en: "Mood changes before periods", hi: "पीरियड्स से पहले मूड बदलना", tags: ["depression", "women"], roman: ["period", "mahwari", "pms"] },
  { en: "Suspecting spouse without reason", hi: "जीवनसाथी पर बेवजह शक", tags: ["psychosis"], roman: ["patni par shak", "pati par shak", "shak"] },
  { en: "Memory loss in elderly", hi: "बुज़ुर्गों में भूलने की बीमारी", tags: ["cognition"], roman: ["budhape me bhoolna", "dementia", "bhoolne ki bimari"] },
  { en: "Bed-wetting in child", hi: "बच्चे का बिस्तर गीला करना", tags: ["child"], roman: ["bistar geela", "peshab"] },
  { en: "Stammering / stuttering", hi: "हकलाना / तुतलाना", tags: ["child", "anxiety"], roman: ["haklana", "hakla", "tutlana"] },
  { en: "Eating too little or too much", hi: "बहुत कम या बहुत ज़्यादा खाना", tags: ["eating", "depression"], roman: ["bhookh nahi", "bhukh", "jyada khana"] },
];

export const BOOKING_COMPLAINTS: BookingComplaint[] = [
  ...complaintOptions.map((item) => ({ ...item, roman: ROMAN[item.en] ?? [] })),
  ...EXTRA,
];

/** Lower-case, strip nukta/chandrabindu variants and punctuation so "ज़्यादा"≈"ज्यादा", "Ghabrahat"≈"ghabrahat". */
export function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/़/g, "") // nukta
    .replace(/ँ/g, "ं") // chandrabindu → anusvara
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Collapse common Roman-Hindi spelling variants: "aa"→"a", "ee"→"i", "oo"→"u", "z"→"j", "w"→"v". */
function roman(text: string): string {
  return normalise(text).replace(/aa/g, "a").replace(/ee/g, "i").replace(/oo/g, "u").replace(/z/g, "j").replace(/w/g, "v");
}

type Indexed = { item: BookingComplaint; hi: string; en: string; rom: string };
const INDEX: Indexed[] = BOOKING_COMPLAINTS.map((item) => ({
  item,
  hi: normalise(item.hi),
  en: normalise(item.en),
  rom: [...item.roman, ...item.tags].map(roman).join(" | "),
}));

/**
 * Search complaints. Every word typed must match somewhere (English, Hindi,
 * Roman Hindi or tag). Results starting with the query rank first.
 */
export function searchComplaints(query: string, limit = 12): BookingComplaint[] {
  const q = normalise(query);
  if (q.length < 2 && !/[ऀ-ॿ]/.test(q)) return [];
  const words = q.split(" ");
  const romanWords = roman(query).split(" ");

  const scored: { item: BookingComplaint; score: number }[] = [];
  for (const entry of INDEX) {
    let score = 0;
    let all = true;
    words.forEach((w, i) => {
      const rw = romanWords[i] ?? w;
      if (entry.en.startsWith(w) || entry.hi.startsWith(w)) score += 4;
      else if (entry.en.includes(` ${w}`) || entry.hi.includes(` ${w}`)) score += 3;
      else if (entry.rom.includes(rw)) score += 2;
      else if (entry.en.includes(w) || entry.hi.includes(w)) score += 1;
      else all = false;
    });
    if (all) scored.push({ item: entry.item, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}

/** Popular complaints shown as quick chips before the patient types anything. */
export const POPULAR_COMPLAINTS: string[] = [
  "Feeling sad / low mood",
  "Excessive worry",
  "Poor sleep",
  "Repeated unwanted thoughts",
  "Alcohol craving",
  "Opioid / smack / heroin craving",
  "Tobacco dependence",
  "Early ejaculation",
  "Erectile difficulty",
  "Dhat syndrome (worry about semen loss)",
  "Anger outbursts",
  "Exam stress / study pressure",
];
