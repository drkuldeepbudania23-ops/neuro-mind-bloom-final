export type Brand = {
  name: string;
  company: string;
  strength?: string;
  form?: string;
};

export type Medicine = {
  generic: string;
  category: string;
  strengths: string[];
  brands: string[];
  brandDetails?: Brand[];
  form?: string[];
  rx?: boolean;
  schedule?: string;
  status?: "active" | "restricted" | "prohibited";
};

function M(
  generic: string,
  category: string,
  strengths: string[],
  brands: Brand[] = [],
  form: string[] = ["Tablet"]
): Medicine {
  return {
    generic,
    category,
    strengths,
    brands: brands.map(b => b.name),
    brandDetails: brands,
    form,
    status: "active"
  };
}

export const medicines: Medicine[] = [

/* =========================================================
   PSYCHIATRY — ANTIDEPRESSANTS
   ========================================================= */

M("Escitalopram","SSRI",
["5 mg","10 mg","20 mg"],
[
{name:"Nexito",company:"Sun Pharma"},
{name:"Newcita",company:"Intas"}
]),

M("Escitalopram + Clonazepam",
"SSRI + Benzodiazepine",
["5 mg + 0.5 mg","10 mg + 0.5 mg"],
[
{name:"Nexito Plus",company:"Sun Pharma"},
{name:"Newcita Plus",company:"Intas"}
]),

M("Sertraline","SSRI",
["25 mg","50 mg","100 mg"],
[
{name:"Daxid",company:"Pfizer"},
{name:"Serta",company:"Market"}
]),

M("Fluoxetine","SSRI",
["10 mg","20 mg","40 mg","60 mg"],
[
{name:"Flunil",company:"Intas"},
{name:"Prodep",company:"Sun Pharma"}
]),

M("Fluvoxamine","SSRI",
["50 mg","100 mg"],
[
{name:"Fluvoxin",company:"Sun Pharma"}
]),

M("Paroxetine","SSRI",
["10 mg","12.5 CR","20 mg","25 CR","37.5 CR"],
[
{name:"Pexep",company:"Intas"},
{name:"Pexep CR",company:"Intas"}
]),

M("Paroxetine + Clonazepam",
"SSRI + Benzodiazepine",
["12.5 mg + 0.25 mg","12.5 mg + 0.5 mg"],
[
{name:"Pexep Plus",company:"Intas"}
]),

M("Venlafaxine","SNRI",
["37.5 mg","75 mg","150 mg"],
[
{name:"Veniz XR",company:"Sun Pharma"}
]),

M("Desvenlafaxine","SNRI",
["25 mg","50 mg","100 mg"],
[
{name:"D-Veniz",company:"Sun Pharma"}
]),

M("Duloxetine","SNRI",
["20 mg","30 mg","40 mg","60 mg"],
[
{name:"Duzela",company:"Sun Pharma"}
]),

M("Vortioxetine","Multimodal Antidepressant",
["5 mg","10 mg","20 mg"]),

M("Bupropion","NDRI",
["150 mg SR","300 mg XL"],
[
{name:"Bupron SR",company:"Sun Pharma"},
{name:"Bupron XL",company:"Sun Pharma"}
]),

M("Mirtazapine","NaSSA",
["7.5 mg","15 mg","30 mg","45 mg"],
[
{name:"Mirtaz",company:"Sun Pharma"}
]),

M("Agomelatine","Antidepressant",
["25 mg"]),

M("Amitriptyline","TCA",
["10 mg","25 mg","50 mg","75 mg"],
[
{name:"Tryptomer",company:"Market"}
]),

M("Nortriptyline","TCA",
["10 mg","25 mg"]),

M("Clomipramine","TCA / OCD",
["10 mg","25 mg","50 mg","75 mg SR"],
[
{name:"Clonil",company:"Intas"}
]),


/* =========================================================
   ANTIPSYCHOTICS
   ========================================================= */

M("Olanzapine","Atypical Antipsychotic",
["2.5 mg","5 mg","7.5 mg","10 mg","15 mg","20 mg"],
[
{name:"Oleanz",company:"Intas"}
]),

M("Risperidone","Atypical Antipsychotic",
["0.5 mg","1 mg","2 mg","3 mg","4 mg"],
[
{name:"Risdone",company:"Intas"}
]),

M("Risperidone + Trihexyphenidyl",
"Antipsychotic Combination",
["2 mg + 2 mg","3 mg + 2 mg","4 mg + 2 mg"],
[
{name:"Risdone Plus",company:"Intas"}
]),

M("Aripiprazole","Atypical Antipsychotic",
["2 mg","5 mg","10 mg","15 mg","20 mg","30 mg"]),

M("Quetiapine","Atypical Antipsychotic",
["25 mg","50 mg","100 mg","200 mg","300 mg","400 mg"],
[
{name:"Qutan",company:"Intas"}
]),

M("Amisulpride","Atypical Antipsychotic",
["50 mg","100 mg","200 mg","300 mg","400 mg"],
[
{name:"Sulpitac",company:"Sun Pharma"}
]),

M("Lurasidone","Atypical Antipsychotic",
["20 mg","40 mg","80 mg"]),

M("Clozapine","Atypical Antipsychotic",
["12.5 mg","25 mg","50 mg","100 mg","200 mg"]),

M("Haloperidol","Typical Antipsychotic",
["0.5 mg","1.5 mg","5 mg","10 mg"]),

M("Chlorpromazine","Typical Antipsychotic",
["25 mg","50 mg","100 mg"]),

M("Brexpiprazole","Atypical Antipsychotic",
["0.25 mg","0.5 mg","1 mg","2 mg","3 mg","4 mg"]),


/* =========================================================
   THP / EPS
   ========================================================= */

M("Trihexyphenidyl","Anticholinergic / EPS",
["1 mg","2 mg","5 mg"],
[
{name:"Pacitane",company:"Market"}
]),

M("Procyclidine","Anticholinergic / EPS",
["5 mg"]),


/* =========================================================
   MOOD STABILIZERS / ANTIEPILEPTICS
   ========================================================= */

M("Lithium Carbonate","Mood Stabilizer",
["300 mg","400 mg CR","450 mg CR"],
[
{name:"Lithosun SR",company:"Sun Pharma"}
]),

M("Sodium Valproate","Mood Stabilizer / Antiepileptic",
["200 mg","300 mg","500 mg","1000 mg"]),

M("Divalproex Sodium","Mood Stabilizer",
["250 mg","500 mg","750 mg ER"],
[
{name:"Dicorate ER",company:"Sun Pharma"}
]),

M("Carbamazepine","Antiepileptic / Mood Stabilizer",
["100 mg","200 mg","300 mg CR","400 mg CR"],
[
{name:"Mazetol",company:"Intas"}
]),

M("Oxcarbazepine","Antiepileptic",
["150 mg","300 mg","450 mg","600 mg"],
[
{name:"Oxetol",company:"Sun Pharma"}
]),

M("Lamotrigine","Mood Stabilizer / Antiepileptic",
["25 mg","50 mg","100 mg","200 mg"],
[
{name:"Lamitor",company:"Torrent"}
]),

M("Levetiracetam","Antiepileptic",
["250 mg","500 mg","750 mg","1000 mg"]),

M("Gabapentin","Antiepileptic / Neuropathic Pain",
["100 mg","300 mg","400 mg"],
[
{name:"Gabapin",company:"Intas"}
]),

M("Pregabalin","Neuropathic Pain / Anxiety",
["25 mg","50 mg","75 mg","100 mg","150 mg"],
[
{name:"Pregalin",company:"Torrent"}
]),

M("Pregabalin + Nortriptyline",
"Neuropathic Pain Combination",
["75 mg + 10 mg","75 mg + 25 mg"],
[
{name:"Pregalin NT",company:"Torrent"}
]),

M("Mirogabalin","Neuropathic Pain",
["2.5 mg","5 mg","10 mg","15 mg"],
[
{name:"Mirogabalin",company:"Torrent"}
]),


/* =========================================================
   ANXIETY / BENZODIAZEPINES
   ========================================================= */

M("Clonazepam","Benzodiazepine",
["0.25 mg","0.5 mg","1 mg","2 mg"],
[
{name:"Clonotril",company:"Torrent"}
]),

M("Lorazepam","Benzodiazepine",
["1 mg","2 mg"]),

M("Diazepam","Benzodiazepine",
["2 mg","5 mg","10 mg"]),

M("Chlordiazepoxide","Benzodiazepine / Alcohol Withdrawal",
["5 mg","10 mg","25 mg"]),

M("Etizolam","Anxiolytic",
["0.25 mg","0.5 mg","1 mg"],
[
{name:"Etizola",company:"Intas"}
]),

M("Buspirone","Anxiolytic",
["5 mg","10 mg"],
[
{name:"Buspin",company:"Intas"}
]),

M("Propranolol","Beta Blocker / Performance Anxiety",
["10 mg","20 mg","40 mg","60 mg LA","80 mg LA"]),


/* =========================================================
   ADHD
   ========================================================= */

M("Atomoxetine","ADHD",
["10 mg","18 mg","25 mg","40 mg","60 mg"],
[
{name:"Axepta",company:"Intas"}
]),

M("Methylphenidate","ADHD",
["5 mg","10 mg","18 mg CR","20 mg SR","36 mg CR"]),

M("Clonidine","ADHD / Withdrawal",
["0.1 mg","0.2 mg"],
[
{name:"Arkamin",company:"Torrent"}
]),


/* =========================================================
   DEMENTIA
   ========================================================= */

M("Donepezil","Dementia",
["5 mg","10 mg"]),

M("Memantine","Dementia",
["5 mg","10 mg","20 mg"],
[
{name:"Admenta",company:"Sun Pharma"}
]),

M("Donepezil + Memantine",
"Dementia Combination",
["5 mg + 5 mg","5 mg + 10 mg","10 mg + 10 mg"]),

M("Rivastigmine","Dementia",
["1.5 mg","3 mg","4.5 mg","6 mg"],
[],
["Capsule","Patch"]),


/* =========================================================
   SLEEP
   ========================================================= */

M("Melatonin","Sleep",
["3 mg","5 mg","10 mg"],
[
{name:"Meloset",company:"Sun Pharma"}
]),

M("Zolpidem","Hypnotic",
["5 mg","10 mg","12.5 mg CR"]),

M("Lemborexant","DORA / Sleep",
["5 mg","10 mg"]),


/* =========================================================
   DE-ADDICTION
   ========================================================= */

M("Naltrexone","Alcohol / Opioid Dependence",
["25 mg","50 mg"],
[
{name:"Nodict",company:"Sun Pharma"}
]),

M("Acamprosate","Alcohol Dependence",
["333 mg"],
[
{name:"Acamptas",company:"Intas"}
]),

M("Baclofen","Muscle Relaxant / Alcohol Use",
["5 mg","10 mg","20 mg"]),

M("Buprenorphine + Naloxone","Opioid Dependence",
["2 mg + 0.5 mg","8 mg + 2 mg"]),

M("Varenicline","Tobacco Cessation",
["0.5 mg","1 mg"]),

M("Nicotine","Nicotine Replacement",
["2 mg","4 mg","7 mg","14 mg","21 mg"],
[],
["Gum","Lozenge","Patch"]),


/* =========================================================
   GI / ACIDITY
   ========================================================= */

M("Pantoprazole","PPI",
["20 mg","40 mg"]),

M("Pantoprazole + Domperidone",
"PPI + Prokinetic",
["40 mg + 10 mg","40 mg + 30 mg SR"]),

M("Rabeprazole","PPI",
["10 mg","20 mg"]),

M("Rabeprazole + Domperidone",
"PPI + Prokinetic",
["20 mg + 30 mg SR"]),

M("Omeprazole","PPI",
["20 mg","40 mg"]),

M("Esomeprazole","PPI",
["20 mg","40 mg"]),

M("Famotidine","H2 Blocker",
["20 mg","40 mg"]),

M("Sucralfate","Ulcer / Gastritis",
["1 g"],
[],
["Tablet","Suspension"]),


/* =========================================================
   NAUSEA / VOMITING
   ========================================================= */

M("Ondansetron","Antiemetic",
["4 mg","8 mg"],
[],
["Tablet","MD Tablet","Injection"]),

M("Domperidone","Prokinetic / Antiemetic",
["10 mg","30 mg SR"]),

M("Metoclopramide","Antiemetic",
["10 mg"],
[],
["Tablet","Injection"]),


/* =========================================================
   CONSTIPATION
   ========================================================= */

M("Lactulose","Constipation",
["10 g/15 ml"],
[],
["Syrup"]),

M("Polyethylene Glycol","Constipation",
["17 g"],
[],
["Powder"]),

M("Bisacodyl","Constipation",
["5 mg","10 mg"],
[],
["Tablet","Suppository"]),

M("Sodium Picosulfate","Constipation",
["5 mg","10 mg"],
[],
["Tablet","Drops"]),

M("Isabgol / Psyllium Husk","Bulk Laxative",
["3.5 g","5 g"],
[],
["Powder"]),


/* =========================================================
   DIARRHOEA
   ========================================================= */

M("ORS","Diarrhoea / Dehydration",
["WHO Formula"],
[],
["Powder"]),

M("Racecadotril","Antidiarrhoeal",
["10 mg","30 mg","100 mg"]),

M("Loperamide","Antidiarrhoeal",
["2 mg"]),

M("Saccharomyces boulardii","Probiotic",
["250 mg"]),

M("Bacillus clausii","Probiotic",
["2 billion spores"],
[],
["Oral Suspension"]),


/* =========================================================
   PAIN / FEVER
   ========================================================= */

M("Paracetamol","Analgesic / Antipyretic",
["125 mg","250 mg","500 mg","650 mg"],
[],
["Tablet","Syrup","Drops"]),

M("Ibuprofen","NSAID",
["200 mg","400 mg"]),

M("Ibuprofen + Paracetamol",
"NSAID Combination",
["400 mg + 325 mg"]),

M("Aceclofenac","NSAID",
["100 mg","200 mg SR"]),

M("Aceclofenac + Paracetamol",
"NSAID Combination",
["100 mg + 325 mg"]),

M("Diclofenac","NSAID",
["25 mg","50 mg","75 mg","100 mg SR"],
[],
["Tablet","Injection","Gel"]),

M("Naproxen","NSAID",
["250 mg","500 mg"]),

M("Etoricoxib","COX-2 NSAID",
["60 mg","90 mg","120 mg"]),

M("Tramadol","Analgesic",
["50 mg","100 mg"],
[],
["Capsule","Tablet","Injection"]),


/* =========================================================
   ALLERGY / RESPIRATORY
   ========================================================= */

M("Cetirizine","Antihistamine",
["5 mg","10 mg"]),

M("Levocetirizine","Antihistamine",
["5 mg"]),

M("Levocetirizine + Montelukast",
"Allergy Combination",
["5 mg + 10 mg"]),

M("Fexofenadine","Antihistamine",
["120 mg","180 mg"]),

M("Montelukast","Leukotriene Antagonist",
["4 mg","5 mg","10 mg"]),

M("Salbutamol","Bronchodilator",
["2 mg","4 mg","100 mcg/puff"],
[],
["Tablet","Syrup","Inhaler","Nebule"]),

M("Budesonide","Inhaled Corticosteroid",
["0.5 mg","1 mg"],
[],
["Nebule","Inhaler"]),

M("Budesonide + Formoterol",
"ICS + LABA",
["100/6 mcg","200/6 mcg","400/12 mcg"],
[],
["Inhaler"]),


/* =========================================================
   BP / CARDIOVASCULAR
   ========================================================= */

M("Amlodipine","Calcium Channel Blocker",
["2.5 mg","5 mg","10 mg"]),

M("Telmisartan","ARB",
["20 mg","40 mg","80 mg"]),

M("Telmisartan + Amlodipine",
"ARB + CCB",
["40 mg + 5 mg","80 mg + 5 mg"]),

M("Telmisartan + Hydrochlorothiazide",
"ARB + Diuretic",
["40 mg + 12.5 mg","80 mg + 12.5 mg"]),

M("Losartan","ARB",
["25 mg","50 mg","100 mg"]),

M("Olmesartan","ARB",
["10 mg","20 mg","40 mg"]),

M("Ramipril","ACE Inhibitor",
["1.25 mg","2.5 mg","5 mg","10 mg"]),

M("Bisoprolol","Beta Blocker",
["2.5 mg","5 mg","10 mg"]),

M("Metoprolol","Beta Blocker",
["25 mg","50 mg","100 mg"]),

M("Nebivolol","Beta Blocker",
["2.5 mg","5 mg"]),

M("Chlorthalidone","Diuretic",
["6.25 mg","12.5 mg","25 mg"]),

M("Hydrochlorothiazide","Diuretic",
["12.5 mg","25 mg"]),

M("Furosemide","Loop Diuretic",
["20 mg","40 mg"],
[],
["Tablet","Injection"]),

M("Spironolactone","Potassium Sparing Diuretic",
["25 mg","50 mg","100 mg"]),


/* =========================================================
   LIPIDS
   ========================================================= */

M("Atorvastatin","Statin",
["10 mg","20 mg","40 mg","80 mg"]),

M("Rosuvastatin","Statin",
["5 mg","10 mg","20 mg","40 mg"]),

M("Rosuvastatin + Fenofibrate",
"Statin Combination",
["10 mg + 160 mg"]),

M("Atorvastatin + Aspirin",
"Cardiovascular Combination",
["10 mg + 75 mg","20 mg + 75 mg"]),


/* =========================================================
   DIABETES
   ========================================================= */

M("Metformin","Biguanide",
["500 mg","850 mg","1000 mg"],
[],
["Tablet","SR Tablet"]),

M("Glimepiride","Sulfonylurea",
["1 mg","2 mg","3 mg","4 mg"]),

M("Glimepiride + Metformin",
"Diabetes Combination",
[
"1 mg + 500 mg",
"2 mg + 500 mg",
"2 mg + 1000 mg"
]),

M("Teneligliptin","DPP-4 Inhibitor",
["20 mg","40 mg"]),

M("Teneligliptin + Metformin",
"DPP-4 + Biguanide",
["20 mg + 500 mg","20 mg + 1000 mg"]),

M("Sitagliptin","DPP-4 Inhibitor",
["25 mg","50 mg","100 mg"]),

M("Sitagliptin + Metformin",
"DPP-4 + Biguanide",
["50 mg + 500 mg","50 mg + 1000 mg"]),

M("Vildagliptin","DPP-4 Inhibitor",
["50 mg"]),

M("Vildagliptin + Metformin",
"DPP-4 + Biguanide",
["50 mg + 500 mg","50 mg + 1000 mg"]),

M("Empagliflozin","SGLT2 Inhibitor",
["10 mg","25 mg"]),

M("Dapagliflozin","SGLT2 Inhibitor",
["5 mg","10 mg"]),

M("Empagliflozin + Metformin",
"SGLT2 + Biguanide",
["5 mg + 500 mg","5 mg + 1000 mg","12.5 mg + 500 mg","12.5 mg + 1000 mg"]),

M("Insulin Regular","Insulin",
["100 IU/ml"],
[],
["Injection"]),

M("Insulin Glargine","Long Acting Insulin",
["100 IU/ml"],
[],
["Injection"]),


/* =========================================================
   THYROID
   ========================================================= */

M("Levothyroxine","Thyroid Hormone",
["12.5 mcg","25 mcg","50 mcg","75 mcg","88 mcg","100 mcg","125 mcg"]),

M("Carbimazole","Antithyroid",
["5 mg","10 mg","20 mg"]),


/* =========================================================
   COMMON ANTIBACTERIALS
   ========================================================= */

M("Amoxicillin","Penicillin Antibiotic",
["250 mg","500 mg"]),

M("Amoxicillin + Clavulanic Acid",
"Penicillin + Beta Lactamase Inhibitor",
["375 mg","625 mg","1000 mg"]),

M("Azithromycin","Macrolide Antibiotic",
["250 mg","500 mg"]),

M("Clarithromycin","Macrolide Antibiotic",
["250 mg","500 mg"]),

M("Doxycycline","Tetracycline Antibiotic",
["100 mg"]),

M("Cefixime","Cephalosporin",
["100 mg","200 mg"]),

M("Cefpodoxime","Cephalosporin",
["100 mg","200 mg"]),

M("Cefuroxime","Cephalosporin",
["250 mg","500 mg"]),

M("Ciprofloxacin","Fluoroquinolone",
["250 mg","500 mg","750 mg"]),

M("Levofloxacin","Fluoroquinolone",
["250 mg","500 mg","750 mg"]),

M("Metronidazole","Nitroimidazole",
["200 mg","400 mg"],
[],
["Tablet","Suspension","Injection"]),

M("Nitrofurantoin","Urinary Antibiotic",
["50 mg","100 mg"]),


/* =========================================================
   ANTIFUNGALS
   ========================================================= */

M("Fluconazole","Antifungal",
["50 mg","150 mg","200 mg"]),

M("Itraconazole","Antifungal",
["100 mg","200 mg"]),

M("Clotrimazole","Antifungal",
["1%"],
[],
["Cream","Lotion"]),


/* =========================================================
   DERMATOLOGY
   ========================================================= */

M("Mupirocin","Topical Antibiotic",
["2%"],
[],
["Ointment"]),

M("Permethrin","Scabies",
["5%"],
[],
["Cream","Lotion"]),

M("Calamine","Skin Protectant",
["8%"],
[],
["Lotion"]),

M("Hydrocortisone","Topical Steroid",
["1%"],
[],
["Cream"]),

M("Clobetasol","Topical Steroid",
["0.05%"],
[],
["Cream","Ointment"]),


/* =========================================================
   VITAMINS / MINERALS
   ========================================================= */

M("Thiamine","Vitamin B1",
["100 mg"],
[],
["Tablet","Injection"]),

M("Folic Acid","Vitamin B9",
["1 mg","5 mg"]),

M("Methylcobalamin","Vitamin B12",
["500 mcg","1500 mcg"],
[],
["Tablet","Injection"]),

M("Vitamin D3","Vitamin",
["1000 IU","2000 IU","60000 IU"],
[],
["Tablet","Capsule","Sachet"]),

M("Calcium + Vitamin D3",
"Supplement Combination",
["500 mg + 250 IU","500 mg + 500 IU"]),

M("Iron + Folic Acid",
"Haematinic",
["100 mg + 500 mcg"]),

M("Multivitamin","Vitamin Supplement",
["Standard formulation"],
[],
["Tablet","Capsule","Syrup"])

];


/* =========================================================
   SEARCH ENGINE
   ========================================================= */

export function searchMedicines(query: string) {

  const q = query
    .trim()
    .toLowerCase();

  if (!q) return medicines;

  return medicines.filter(m => {

    const brandText =
      (m.brandDetails || [])
        .map(b =>
          [
            b.name,
            b.company,
            b.strength,
            b.form
          ]
          .filter(Boolean)
          .join(" ")
        )
        .join(" ");

    const searchable = [
      m.generic,
      m.category,
      ...(m.strengths || []),
      ...(m.brands || []),
      ...(m.form || []),
      brandText
    ]
    .join(" ")
    .toLowerCase();

    return searchable.includes(q);
  });
}


/* =========================================================
   A-Z SORT
   ========================================================= */

export const medicinesAZ =
  [...medicines].sort(
    (a,b) =>
      a.generic.localeCompare(b.generic)
  );


/* =========================================================
   BRAND FLATTENING
   Useful for Brand -> Generic search UI
   ========================================================= */

export const brandIndex =
  medicines.flatMap(m =>
    (m.brandDetails || []).map(b => ({
      brand: b.name,
      company: b.company,
      strength: b.strength || "",
      form: b.form || "",
      generic: m.generic,
      category: m.category
    }))
  );

