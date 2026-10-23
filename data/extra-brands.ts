/**
 * Additional brands and generics for the doctor's medicine search.
 *
 * - `EXTRA_BRANDS` adds more well-known Indian brands to generics that already exist in
 *   `data/medicines.ts` (they inherit that generic's strengths and form).
 * - `EXTRA_GENERICS` adds psychiatry-relevant generics that were missing (A–Z), each with
 *   commonly available strengths and, where known, brands.
 *
 * The company is filled only where it is well established; otherwise it is left blank.
 * Brand availability and strengths change — the prescription screen shows
 * "verify pack" for these rows, and the doctor can edit or add brands at any time.
 */
export type ExtraBrand = { generic: string; brand: string; company?: string };
export type ExtraGeneric = { generic: string; category: string; strengths: string[]; form?: string; brands: { name: string; company?: string }[] };

const B = (generic: string, brands: [string, string?][]): ExtraBrand[] => brands.map(([brand, company]) => ({ generic, brand, company }));

export const EXTRA_BRANDS: ExtraBrand[] = [
  ...B("Escitalopram", [["Stalopam", "Lupin"], ["S Citadep", "Cipla"], ["Feliz S", "Torrent"], ["Rexipra", "Intas"]]),
  ...B("Sertraline", [["Serlift", "Sun Pharma"]]),
  ...B("Fluoxetine", [["Fludac", "Zydus"]]),
  ...B("Fluvoxamine", [["Uvox"]]),
  ...B("Paroxetine", [["Paxidep CR"]]),
  ...B("Venlafaxine", [["Venlor XR", "Cipla"]]),
  ...B("Duloxetine", [["Dulane"]]),
  ...B("Amitriptyline", [["Amitone"]]),
  ...B("Nortriptyline", [["Sensival"]]),
  ...B("Clomipramine", [["Clofranil", "Sun Pharma"]]),
  ...B("Agomelatine", [["Valdoxan", "Servier"]]),
  ...B("Olanzapine", [["Olanex", "Sun Pharma"], ["Olimelt"]]),
  ...B("Risperidone", [["Sizodon", "Sun Pharma"], ["Rozidal", "Torrent"], ["Risperdal", "Janssen"]]),
  ...B("Quetiapine", [["Qutipin", "Sun Pharma"], ["Seroquin"]]),
  ...B("Aripiprazole", [["Arip MT", "Torrent"]]),
  ...B("Clozapine", [["Sizopin", "Sun Pharma"], ["Lozapin", "Torrent"]]),
  ...B("Haloperidol", [["Serenace", "RPG Life Sciences"], ["Senorm", "Sun Pharma"]]),
  ...B("Chlorpromazine", [["Largactil"]]),
  ...B("Procyclidine", [["Kemadrin"]]),
  ...B("Lithium Carbonate", [["Licab", "Torrent"], ["Intalith CR", "Intas"]]),
  ...B("Sodium Valproate", [["Valparin", "Sanofi"], ["Encorate", "Sun Pharma"]]),
  ...B("Carbamazepine", [["Tegrital", "Novartis"], ["Zeptol", "Sun Pharma"]]),
  ...B("Lamotrigine", [["Lametec", "Cipla"], ["Lamictal", "GSK"]]),
  ...B("Levetiracetam", [["Levipil", "Sun Pharma"], ["Levera", "Intas"], ["Keppra", "UCB"]]),
  ...B("Gabapentin", [["Gabantin", "Sun Pharma"]]),
  ...B("Pregabalin", [["Lyrica", "Pfizer"]]),
  ...B("Clonazepam", [["Lonazep", "Sun Pharma"], ["Rivotril"]]),
  ...B("Lorazepam", [["Ativan", "Pfizer"], ["Larpose", "Cipla"]]),
  ...B("Diazepam", [["Calmpose", "Sun Pharma"], ["Valium"]]),
  ...B("Chlordiazepoxide", [["Librium"]]),
  ...B("Etizolam", [["Etilaam", "Intas"]]),
  ...B("Zolpidem", [["Zolfresh", "Abbott"], ["Nitrest"]]),
  ...B("Propranolol", [["Ciplar", "Cipla"], ["Inderal", "Abbott"]]),
  ...B("Atomoxetine", [["Attentrol"]]),
  ...B("Methylphenidate", [["Addwize", "Sun Pharma"]]),
  ...B("Donepezil", [["Donep", "Sun Pharma"], ["Aricep"]]),
  ...B("Rivastigmine", [["Rivamer", "Sun Pharma"], ["Exelon", "Novartis"]]),
  ...B("Naltrexone", [["Naltima", "Intas"]]),
  ...B("Baclofen", [["Liofen", "Sun Pharma"], ["Lioresal", "Novartis"]]),
  ...B("Buprenorphine + Naloxone", [["Addnok-N", "Rusan Pharma"]]),
  ...B("Nicotine", [["Nicotex", "Cipla"], ["Nicorette"]]),
];

export const EXTRA_GENERICS: ExtraGeneric[] = [
  { generic: "Alprazolam", category: "Benzodiazepine", strengths: ["0.25 mg", "0.5 mg", "1 mg"], brands: [{ name: "Alprax", company: "Torrent" }, { name: "Restyl", company: "Cipla" }] },
  { generic: "Armodafinil", category: "Wakefulness-promoting", strengths: ["50 mg", "150 mg"], brands: [{ name: "Waklert", company: "Sun Pharma" }] },
  { generic: "Asenapine", category: "Atypical Antipsychotic", strengths: ["5 mg", "10 mg"], form: "Sublingual Tablet", brands: [] },
  { generic: "Clobazam", category: "Benzodiazepine / Antiepileptic", strengths: ["5 mg", "10 mg", "20 mg"], brands: [{ name: "Frisium" }] },
  { generic: "Dapoxetine", category: "Premature Ejaculation", strengths: ["30 mg", "60 mg"], brands: [{ name: "Duralast", company: "Sun Pharma" }] },
  { generic: "Disulfiram", category: "Alcohol Dependence", strengths: ["250 mg"], brands: [{ name: "Esperal" }] },
  { generic: "Dosulepin (Dothiepin)", category: "TCA", strengths: ["25 mg", "75 mg"], brands: [{ name: "Prothiaden", company: "Abbott" }] },
  { generic: "Doxepin", category: "TCA", strengths: ["10 mg", "25 mg", "75 mg"], form: "Capsule", brands: [{ name: "Spectra", company: "Sun Pharma" }] },
  { generic: "Eszopiclone", category: "Hypnotic", strengths: ["1 mg", "2 mg", "3 mg"], brands: [] },
  { generic: "Hydroxyzine", category: "Antihistamine / Anxiolytic", strengths: ["10 mg", "25 mg"], brands: [{ name: "Atarax" }] },
  { generic: "Imipramine", category: "TCA", strengths: ["25 mg", "75 mg"], brands: [{ name: "Depsonil" }] },
  { generic: "Modafinil", category: "Wakefulness-promoting", strengths: ["100 mg", "200 mg"], brands: [{ name: "Modalert", company: "Sun Pharma" }] },
  { generic: "Nitrazepam", category: "Benzodiazepine", strengths: ["5 mg", "10 mg"], brands: [{ name: "Nitrosun", company: "Sun Pharma" }] },
  { generic: "Paliperidone", category: "Atypical Antipsychotic", strengths: ["3 mg", "6 mg", "9 mg"], form: "ER Tablet", brands: [{ name: "Invega", company: "Janssen" }] },
  { generic: "Penfluridol", category: "Typical Antipsychotic (weekly)", strengths: ["20 mg"], brands: [] },
  { generic: "Prazosin", category: "Alpha-blocker (nightmares / PTSD)", strengths: ["2.5 mg", "5 mg"], form: "XL Tablet", brands: [{ name: "Minipress XL", company: "Pfizer" }] },
  { generic: "Promethazine", category: "Antihistamine / Sedative", strengths: ["10 mg", "25 mg"], brands: [{ name: "Phenergan", company: "Abbott" }] },
  { generic: "Sildenafil", category: "Erectile Dysfunction (PDE5 inhibitor)", strengths: ["25 mg", "50 mg", "100 mg"], brands: [{ name: "Penegra", company: "Zydus" }, { name: "Suhagra", company: "Cipla" }, { name: "Manforce", company: "Mankind" }] },
  { generic: "Sodium Valproate + Valproic Acid", category: "Mood Stabilizer / Antiepileptic", strengths: ["200 mg", "300 mg", "500 mg"], form: "CR Tablet", brands: [{ name: "Valparin Chrono", company: "Sanofi" }, { name: "Encorate Chrono", company: "Sun Pharma" }] },
  { generic: "Tadalafil", category: "Erectile Dysfunction (PDE5 inhibitor)", strengths: ["2.5 mg", "5 mg", "10 mg", "20 mg"], brands: [{ name: "Tadacip", company: "Cipla" }, { name: "Megalis", company: "Macleods" }] },
  { generic: "Topiramate", category: "Antiepileptic", strengths: ["25 mg", "50 mg", "100 mg"], brands: [{ name: "Topamac", company: "Sun Pharma" }] },
  { generic: "Trazodone", category: "Antidepressant (SARI)", strengths: ["25 mg", "50 mg", "100 mg"], brands: [] },
  { generic: "Trifluoperazine", category: "Typical Antipsychotic", strengths: ["1 mg", "5 mg"], brands: [{ name: "Espazine" }] },
  { generic: "Trifluoperazine + Trihexyphenidyl", category: "Antipsychotic Combination", strengths: ["5 mg + 2 mg"], brands: [{ name: "Trinicalm Plus", company: "Torrent" }] },
  { generic: "Ziprasidone", category: "Atypical Antipsychotic", strengths: ["20 mg", "40 mg", "80 mg"], form: "Capsule", brands: [{ name: "Zipsydon", company: "Sun Pharma" }] },
  { generic: "Zopiclone", category: "Hypnotic", strengths: ["7.5 mg"], brands: [] },
];
