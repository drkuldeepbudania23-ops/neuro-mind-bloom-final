export type Medicine = {
  generic: string;
  brands: string[];
  category: string;
  strengths?: string[];
};

export const medicines: Medicine[] = [
  // ANTIDEPRESSANTS - SSRIs
  { generic:"Escitalopram", brands:["Nexito","Cipralex","Szetalo"], category:"SSRI", strengths:["5 mg","10 mg","20 mg"] },
  { generic:"Fluoxetine", brands:["Fludac","Prozac","Flunil"], category:"SSRI", strengths:["10 mg","20 mg","40 mg","60 mg"] },
  { generic:"Sertraline", brands:["Serta","Daxid","Zoloft"], category:"SSRI", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Paroxetine", brands:["Paxidep","Seroxat","Pari"], category:"SSRI", strengths:["10 mg","12.5 CR","20 mg","25 CR","37.5 CR"] },
  { generic:"Fluvoxamine", brands:["Fluvoxin","Faverin"], category:"SSRI", strengths:["50 mg","100 mg"] },
  { generic:"Citalopram", brands:["Cipramil"], category:"SSRI", strengths:["10 mg","20 mg","40 mg"] },

  // SNRIs
  { generic:"Venlafaxine", brands:["Veniz XR","Efexor XR","Ventab"], category:"SNRI", strengths:["37.5 mg","75 mg","150 mg"] },
  { generic:"Desvenlafaxine", brands:["D-Veniz","Pristiq","Desven"], category:"SNRI", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Duloxetine", brands:["Duzela","Cymbalta","Dulot"], category:"SNRI", strengths:["20 mg","30 mg","40 mg","60 mg"] },
  { generic:"Milnacipran", brands:["Milnace"], category:"SNRI", strengths:["25 mg","50 mg"] },
  { generic:"Levomilnacipran", brands:["Fetzima"], category:"SNRI", strengths:["20 mg","40 mg","80 mg","120 mg"] },

  // TCAs / TETRACYCLICS
  { generic:"Amitriptyline", brands:["Tryptomer","Amitone"], category:"TCA", strengths:["10 mg","25 mg","50 mg","75 mg"] },
  { generic:"Imipramine", brands:["Tofranil","Depsonil"], category:"TCA", strengths:["10 mg","25 mg","75 mg"] },
  { generic:"Clomipramine", brands:["Anafranil","Clonil"], category:"TCA", strengths:["10 mg","25 mg","50 mg","75 mg SR"] },
  { generic:"Nortriptyline", brands:["Sensival","Nortimer"], category:"TCA", strengths:["10 mg","25 mg","50 mg"] },
  { generic:"Doxepin", brands:["Spectra"], category:"TCA", strengths:["10 mg","25 mg","75 mg"] },
  { generic:"Dosulepin / Dothiepin", brands:["Prothiaden"], category:"TCA", strengths:["25 mg","75 mg"] },
  { generic:"Maprotiline", brands:[], category:"Tetracyclic antidepressant", strengths:["25 mg","50 mg","75 mg"] },

  // OTHER ANTIDEPRESSANTS
  { generic:"Mirtazapine", brands:["Mirtaz","Remeron","Mirnite"], category:"NaSSA", strengths:["7.5 mg","15 mg","30 mg","45 mg"] },
  { generic:"Bupropion", brands:["Bupron","Zupion","Wellbutrin"], category:"NDRI", strengths:["75 mg","100 mg SR","150 mg XL","300 mg XL"] },
  { generic:"Vortioxetine", brands:["Brintellix","Vortidif"], category:"Multimodal antidepressant", strengths:["5 mg","10 mg","20 mg"] },
  { generic:"Agomelatine", brands:["Agoprex","Valdoxan"], category:"Melatonergic antidepressant", strengths:["25 mg"] },
  { generic:"Trazodone", brands:["Trazon","Desyrel"], category:"SARI", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Vilazodone", brands:["Vilano","Viibryd"], category:"Serotonergic antidepressant", strengths:["10 mg","20 mg","40 mg"] },
  { generic:"Reboxetine", brands:["Edronax"], category:"NRI", strengths:["4 mg"] },
  { generic:"Moclobemide", brands:["Aurorix"], category:"RIMA", strengths:["150 mg","300 mg"] },

  // ANTIPSYCHOTICS
  { generic:"Risperidone", brands:["Risperdal","Risperid","Sizodon"], category:"Atypical antipsychotic", strengths:["0.5 mg","1 mg","2 mg","3 mg","4 mg"] },
  { generic:"Olanzapine", brands:["Oleanz","Olanex","Zyprexa"], category:"Atypical antipsychotic", strengths:["2.5 mg","5 mg","7.5 mg","10 mg","15 mg","20 mg"] },
  { generic:"Quetiapine", brands:["Qutan","Seroquel","Quitipin"], category:"Atypical antipsychotic", strengths:["25 mg","50 mg","100 mg","200 mg","300 mg","400 mg XR"] },
  { generic:"Aripiprazole", brands:["Arip MT","Abilify","Aripra"], category:"Atypical antipsychotic", strengths:["2 mg","5 mg","10 mg","15 mg","20 mg","30 mg"] },
  { generic:"Brexpiprazole", brands:["Rexulti"], category:"Atypical antipsychotic", strengths:["0.5 mg","1 mg","2 mg","3 mg","4 mg"] },
  { generic:"Cariprazine", brands:["Vraylar"], category:"Atypical antipsychotic", strengths:["1.5 mg","3 mg","4.5 mg","6 mg"] },
  { generic:"Ziprasidone", brands:["Zipsydon","Geodon"], category:"Atypical antipsychotic", strengths:["20 mg","40 mg","60 mg","80 mg"] },
  { generic:"Amisulpride", brands:["Solian","Sulpitac"], category:"Atypical antipsychotic", strengths:["50 mg","100 mg","200 mg","400 mg"] },
  { generic:"Sulpiride", brands:[], category:"Benzamide antipsychotic", strengths:["50 mg","200 mg"] },
  { generic:"Clozapine", brands:["Clozaril","Sizopin","Clopine"], category:"Atypical antipsychotic", strengths:["12.5 mg","25 mg","50 mg","100 mg"] },
  { generic:"Paliperidone", brands:["Invega","Palido"], category:"Atypical antipsychotic", strengths:["3 mg","6 mg","9 mg"] },
  { generic:"Lurasidone", brands:["Latuda","Luramax"], category:"Atypical antipsychotic", strengths:["20 mg","40 mg","80 mg","120 mg"] },
  { generic:"Asenapine", brands:["Saphris"], category:"Atypical antipsychotic", strengths:["5 mg","10 mg"] },
  { generic:"Iloperidone", brands:["Fanapt"], category:"Atypical antipsychotic", strengths:["1 mg","2 mg","4 mg","6 mg","8 mg","10 mg","12 mg"] },
  { generic:"Haloperidol", brands:["Serenace","Haldol"], category:"Typical antipsychotic", strengths:["0.25 mg","0.5 mg","1.5 mg","5 mg","10 mg"] },
  { generic:"Trifluoperazine", brands:["Stelazine"], category:"Typical antipsychotic", strengths:["1 mg","2 mg","5 mg","10 mg"] },
  { generic:"Chlorpromazine", brands:["Largactil"], category:"Typical antipsychotic", strengths:["10 mg","25 mg","50 mg","100 mg"] },
  { generic:"Fluphenazine", brands:["Prolixin"], category:"Typical antipsychotic", strengths:["1 mg","2.5 mg","5 mg"] },
  { generic:"Flupentixol", brands:["Fluanxol"], category:"Typical antipsychotic", strengths:["0.5 mg","1 mg","3 mg"] },
  { generic:"Zuclopenthixol", brands:["Clopixol"], category:"Typical antipsychotic", strengths:["2 mg","10 mg","25 mg"] },
  { generic:"Pimozide", brands:["Orap"], category:"Typical antipsychotic", strengths:["2 mg","4 mg"] },

  // LONG ACTING INJECTABLES
  { generic:"Haloperidol decanoate", brands:["Haldol Decanoate"], category:"LAI antipsychotic", strengths:["50 mg/mL","100 mg/mL"] },
  { generic:"Fluphenazine decanoate", brands:["Modecate"], category:"LAI antipsychotic", strengths:["25 mg/mL"] },
  { generic:"Flupentixol decanoate", brands:["Fluanxol Depot"], category:"LAI antipsychotic", strengths:["20 mg/mL","40 mg/2mL"] },
  { generic:"Zuclopenthixol decanoate", brands:["Clopixol Depot"], category:"LAI antipsychotic", strengths:["200 mg/mL"] },
  { generic:"Risperidone LAI", brands:["Risperdal Consta"], category:"LAI antipsychotic", strengths:["25 mg","37.5 mg","50 mg"] },
  { generic:"Paliperidone palmitate", brands:["Invega Sustenna","Xeplion","Trinza"], category:"LAI antipsychotic", strengths:["25 mg","50 mg","75 mg","100 mg","150 mg"] },
  { generic:"Aripiprazole LAI", brands:["Abilify Maintena","Aristada"], category:"LAI antipsychotic", strengths:["300 mg","400 mg"] },

  // MOOD STABILIZERS
  { generic:"Lithium carbonate", brands:["Lithosun","Licab","Lithium"], category:"Mood stabilizer", strengths:["300 mg","400 mg SR","450 mg CR"] },
  { generic:"Sodium valproate", brands:["Valparin","Encorate","Depakote"], category:"Mood stabilizer / antiepileptic", strengths:["200 mg","300 mg","500 mg","500 mg CR"] },
  { generic:"Divalproex sodium", brands:["Dicorate ER","Depakote ER"], category:"Mood stabilizer / antiepileptic", strengths:["250 mg","500 mg"] },
  { generic:"Lamotrigine", brands:["Lamitor","Lamictal"], category:"Mood stabilizer / antiepileptic", strengths:["25 mg","50 mg","100 mg","200 mg"] },
  { generic:"Carbamazepine", brands:["Tegretol","Zeptol"], category:"Mood stabilizer / antiepileptic", strengths:["100 mg","200 mg","300 mg CR","400 mg CR"] },
  { generic:"Oxcarbazepine", brands:["Oxetol","Trileptal"], category:"Antiepileptic", strengths:["150 mg","300 mg","450 mg","600 mg"] },

  // BENZODIAZEPINES / ANXIOLYTICS
  { generic:"Clonazepam", brands:["Clonotril","Rivotril","Petril"], category:"Benzodiazepine", strengths:["0.25 mg","0.5 mg","1 mg","2 mg"] },
  { generic:"Lorazepam", brands:["Ativan","Larpose"], category:"Benzodiazepine", strengths:["1 mg","2 mg"] },
  { generic:"Alprazolam", brands:["Alprax","Restyl"], category:"Benzodiazepine", strengths:["0.25 mg","0.5 mg","1 mg"] },
  { generic:"Diazepam", brands:["Valium","Calmpose"], category:"Benzodiazepine", strengths:["2 mg","5 mg","10 mg"] },
  { generic:"Chlordiazepoxide", brands:["Librium"], category:"Benzodiazepine", strengths:["5 mg","10 mg","25 mg"] },
  { generic:"Clobazam", brands:["Frisium","Cloba"], category:"Benzodiazepine / antiepileptic", strengths:["5 mg","10 mg","20 mg"] },
  { generic:"Etizolam", brands:["Etizola"], category:"Thienodiazepine", strengths:["0.25 mg","0.5 mg","1 mg"] },
  { generic:"Buspirone", brands:["Buspin"], category:"Anxiolytic", strengths:["5 mg","10 mg"] },
  { generic:"Hydroxyzine", brands:["Atarax"], category:"Antihistamine / anxiolytic", strengths:["10 mg","25 mg"] },

  // HYPNOTICS
  { generic:"Zolpidem", brands:["Stilnoct","Zolfresh"], category:"Hypnotic", strengths:["5 mg","10 mg","12.5 mg CR"] },
  { generic:"Zopiclone", brands:["Zopicon"], category:"Hypnotic", strengths:["3.75 mg","7.5 mg"] },
  { generic:"Eszopiclone", brands:["Lunesta"], category:"Hypnotic", strengths:["1 mg","2 mg","3 mg"] },
  { generic:"Ramelteon", brands:["Rozerem"], category:"Melatonin receptor agonist", strengths:["8 mg"] },
  { generic:"Melatonin", brands:["Meloset","Circadin"], category:"Sleep agent", strengths:["2 mg","3 mg","5 mg","10 mg"] },
  { generic:"Suvorexant", brands:["Belsomra"], category:"Orexin antagonist", strengths:["5 mg","10 mg","15 mg","20 mg"] },
  { generic:"Daridorexant", brands:["Quviviq"], category:"Orexin antagonist", strengths:["25 mg","50 mg"] },

  // ADHD
  { generic:"Methylphenidate", brands:["Inspiral","Concerta","Ritalin"], category:"ADHD", strengths:["5 mg","10 mg","18 mg ER","20 mg","27 mg ER","36 mg ER","54 mg ER"] },
  { generic:"Atomoxetine", brands:["Attera","Atomoxet"], category:"ADHD", strengths:["10 mg","18 mg","25 mg","40 mg","60 mg"] },
  { generic:"Guanfacine", brands:["Intuniv"], category:"ADHD", strengths:["1 mg","2 mg","3 mg","4 mg"] },
  { generic:"Clonidine", brands:["Arkamin"], category:"ADHD / antihypertensive", strengths:["0.1 mg"] },

  // SUBSTANCE USE / DE-ADDICTION
  { generic:"Naltrexone", brands:["Nodict","Naltima"], category:"Alcohol / opioid use disorder", strengths:["25 mg","50 mg"] },
  { generic:"Acamprosate", brands:["Acamptas","Campral"], category:"Alcohol use disorder", strengths:["333 mg"] },
  { generic:"Disulfiram", brands:["Esperal","Antabuse"], category:"Alcohol use disorder", strengths:["250 mg","500 mg"] },
  { generic:"Baclofen", brands:["Liofen","Baclof"], category:"Muscle relaxant / alcohol craving", strengths:["5 mg","10 mg","20 mg"] },
  { generic:"Topiramate", brands:["Topamac","Topaz"], category:"Antiepileptic / craving", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Buprenorphine", brands:["Subutex","Addnok"], category:"Opioid use disorder", strengths:["0.2 mg","2 mg","8 mg"] },
  { generic:"Buprenorphine + Naloxone", brands:["Suboxone"], category:"Opioid use disorder", strengths:["2/0.5 mg","8/2 mg"] },
  { generic:"Naloxone", brands:["Narcan"], category:"Opioid overdose", strengths:["0.4 mg/mL","1 mg/mL"] },
  { generic:"Bupropion SR", brands:["Zupion SR","Bupron SR"], category:"Tobacco cessation", strengths:["150 mg"] },
  { generic:"Varenicline", brands:["Champix"], category:"Tobacco cessation", strengths:["0.5 mg","1 mg"] },
  { generic:"Nicotine gum", brands:["Nicorette","Nicotex"], category:"Tobacco cessation", strengths:["2 mg","4 mg"] },
  { generic:"Nicotine patch", brands:["Nicoderm"], category:"Tobacco cessation", strengths:["7 mg","14 mg","21 mg"] },

  // EPS / PARKINSONISM
  { generic:"Trihexyphenidyl", brands:["Pacitane","Parkin"], category:"EPS / Parkinsonism", strengths:["1 mg","2 mg","5 mg"] },
  { generic:"Procyclidine", brands:["Kemadrin"], category:"EPS / Parkinsonism", strengths:["5 mg"] },
  { generic:"Benztropine", brands:["Cogentin"], category:"EPS / Parkinsonism", strengths:["0.5 mg","1 mg","2 mg"] },
  { generic:"Amantadine", brands:["Symmetrel","Parkitidin"], category:"Parkinsonism / EPS", strengths:["100 mg"] },
  { generic:"Levodopa + Carbidopa", brands:["Syndopa","Sinemet"], category:"Parkinson disease", strengths:["100/25 mg","250/25 mg","CR"] },
  { generic:"Levodopa + Benserazide", brands:["Madopar"], category:"Parkinson disease", strengths:["100/25 mg","200/50 mg"] },
  { generic:"Pramipexole", brands:["Pramipex","Mirapex"], category:"Parkinson disease", strengths:["0.125 mg","0.25 mg","0.5 mg","1 mg"] },
  { generic:"Ropinirole", brands:["Ropark","Requip"], category:"Parkinson disease", strengths:["0.25 mg","0.5 mg","1 mg","2 mg"] },
  { generic:"Selegiline", brands:["Selgin"], category:"Parkinson disease", strengths:["5 mg"] },
  { generic:"Rasagiline", brands:["Rasalect"], category:"Parkinson disease", strengths:["0.5 mg","1 mg"] },
  { generic:"Entacapone", brands:["Comtan"], category:"Parkinson disease", strengths:["200 mg"] },

  // DEMENTIA
  { generic:"Donepezil", brands:["Donep","Aricept"], category:"Dementia", strengths:["5 mg","10 mg","23 mg"] },
  { generic:"Rivastigmine", brands:["Exelon"], category:"Dementia", strengths:["1.5 mg","3 mg","4.5 mg","6 mg","patch 4.6 mg","patch 9.5 mg"] },
  { generic:"Galantamine", brands:["Reminyl"], category:"Dementia", strengths:["4 mg","8 mg","16 mg","24 mg"] },
  { generic:"Memantine", brands:["Admenta","Namenda"], category:"Dementia", strengths:["5 mg","10 mg","20 mg"] },

  // ANTIEPILEPTICS
  { generic:"Levetiracetam", brands:["Levera","Keppra"], category:"Antiepileptic", strengths:["250 mg","500 mg","750 mg","1000 mg"] },
  { generic:"Phenytoin", brands:["Eptoin","Dilantin"], category:"Antiepileptic", strengths:["50 mg","100 mg"] },
  { generic:"Phenobarbitone", brands:["Gardenal"], category:"Antiepileptic", strengths:["30 mg","60 mg"] },
  { generic:"Lacosamide", brands:["Lacoset","Vimpat"], category:"Antiepileptic", strengths:["50 mg","100 mg","150 mg","200 mg"] },
  { generic:"Gabapentin", brands:["Gabapin","Neurontin"], category:"Neuropathic pain / antiepileptic", strengths:["100 mg","300 mg","400 mg","600 mg"] },
  { generic:"Pregabalin", brands:["Pregaba","Lyrica","Maxgalin"], category:"Neuropathic pain / anxiety", strengths:["25 mg","50 mg","75 mg","100 mg","150 mg"] },
  { generic:"Zonisamide", brands:["Zonegran"], category:"Antiepileptic", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Brivaracetam", brands:["Briviact"], category:"Antiepileptic", strengths:["25 mg","50 mg","75 mg","100 mg"] },
  { generic:"Perampanel", brands:["Fycompa"], category:"Antiepileptic", strengths:["2 mg","4 mg","6 mg","8 mg"] },

  // PAIN
  { generic:"Paracetamol", brands:["Dolo","Crocin","Calpol"], category:"Analgesic / antipyretic", strengths:["325 mg","500 mg","650 mg"] },
  { generic:"Ibuprofen", brands:["Brufen","Ibugesic"], category:"NSAID", strengths:["200 mg","400 mg","600 mg"] },
  { generic:"Diclofenac", brands:["Voveran"], category:"NSAID", strengths:["50 mg","75 mg SR","100 mg SR"] },
  { generic:"Aceclofenac", brands:["Hifenac","Zerodol"], category:"NSAID", strengths:["100 mg","200 mg SR"] },
  { generic:"Naproxen", brands:["Naprosyn"], category:"NSAID", strengths:["250 mg","500 mg"] },
  { generic:"Etoricoxib", brands:["Nucoxia","Etoshine"], category:"COX-2 NSAID", strengths:["60 mg","90 mg","120 mg"] },
  { generic:"Tramadol", brands:["Ultracet","Tramazac"], category:"Analgesic", strengths:["50 mg","100 mg SR"] },

  // ACIDITY / GI
  { generic:"Pantoprazole", brands:["Pantocid","Pan"], category:"PPI", strengths:["20 mg","40 mg"] },
  { generic:"Pantoprazole + Domperidone", brands:["Pan-D","Pantocid DSR"], category:"PPI + prokinetic", strengths:["40/30 mg"] },
  { generic:"Rabeprazole", brands:["Razo","Rabicip"], category:"PPI", strengths:["20 mg"] },
  { generic:"Rabeprazole + Domperidone", brands:["Razo-D"], category:"PPI + prokinetic", strengths:["20/30 mg"] },
  { generic:"Omeprazole", brands:["Omez"], category:"PPI", strengths:["20 mg","40 mg"] },
  { generic:"Esomeprazole", brands:["Nexpro"], category:"PPI", strengths:["20 mg","40 mg"] },
  { generic:"Famotidine", brands:["Famocid"], category:"H2 blocker", strengths:["20 mg","40 mg"] },
  { generic:"Ondansetron", brands:["Emeset","Ondem"], category:"Antiemetic", strengths:["4 mg","8 mg"] },
  { generic:"Domperidone", brands:["Domstal"], category:"Prokinetic / antiemetic", strengths:["10 mg","30 mg SR"] },
  { generic:"Lactulose", brands:["Duphalac"], category:"Laxative", strengths:["10 g/15 mL"] },
  { generic:"Polyethylene glycol", brands:["Peglec","Movicol"], category:"Laxative", strengths:["sachet"] },
  { generic:"Bisacodyl", brands:["Dulcolax"], category:"Laxative", strengths:["5 mg"] },

  // BP / CARDIOVASCULAR
  { generic:"Amlodipine", brands:["Amlong","Amlopres"], category:"Antihypertensive", strengths:["2.5 mg","5 mg","10 mg"] },
  { generic:"Telmisartan", brands:["Telma","Telmikind"], category:"ARB", strengths:["20 mg","40 mg","80 mg"] },
  { generic:"Losartan", brands:["Losar"], category:"ARB", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Olmesartan", brands:["Olmezest"], category:"ARB", strengths:["10 mg","20 mg","40 mg"] },
  { generic:"Ramipril", brands:["Cardace"], category:"ACE inhibitor", strengths:["1.25 mg","2.5 mg","5 mg","10 mg"] },
  { generic:"Enalapril", brands:["Envas"], category:"ACE inhibitor", strengths:["2.5 mg","5 mg","10 mg"] },
  { generic:"Metoprolol", brands:["Metolar","Betaloc"], category:"Beta blocker", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Propranolol", brands:["Inderal","Ciplar"], category:"Beta blocker / performance anxiety", strengths:["10 mg","20 mg","40 mg","80 mg LA"] },
  { generic:"Atenolol", brands:["Aten"], category:"Beta blocker", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Nebivolol", brands:["Nebicard"], category:"Beta blocker", strengths:["2.5 mg","5 mg"] },
  { generic:"Hydrochlorothiazide", brands:[], category:"Diuretic", strengths:["12.5 mg","25 mg"] },
  { generic:"Chlorthalidone", brands:["CTD"], category:"Diuretic", strengths:["6.25 mg","12.5 mg","25 mg"] },
  { generic:"Furosemide", brands:["Lasix"], category:"Loop diuretic", strengths:["20 mg","40 mg"] },
  { generic:"Spironolactone", brands:["Aldactone"], category:"Potassium-sparing diuretic", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Atorvastatin", brands:["Atorva","Lipitor"], category:"Statin", strengths:["10 mg","20 mg","40 mg","80 mg"] },
  { generic:"Rosuvastatin", brands:["Rozavel","Crestor"], category:"Statin", strengths:["5 mg","10 mg","20 mg","40 mg"] },

  // DIABETES
  { generic:"Metformin", brands:["Glycomet","Obimet"], category:"Diabetes", strengths:["500 mg","850 mg","1000 mg","500 mg SR"] },
  { generic:"Glimepiride", brands:["Amaryl"], category:"Diabetes", strengths:["1 mg","2 mg","3 mg","4 mg"] },
  { generic:"Gliclazide", brands:["Diamicron"], category:"Diabetes", strengths:["40 mg","60 mg MR","80 mg"] },
  { generic:"Sitagliptin", brands:["Januvia"], category:"Diabetes", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Vildagliptin", brands:["Galvus"], category:"Diabetes", strengths:["50 mg"] },
  { generic:"Teneligliptin", brands:["Tenepure","Dynaglipt"], category:"Diabetes", strengths:["20 mg"] },
  { generic:"Linagliptin", brands:["Trajenta"], category:"Diabetes", strengths:["5 mg"] },
  { generic:"Empagliflozin", brands:["Jardiance"], category:"Diabetes", strengths:["10 mg","25 mg"] },
  { generic:"Dapagliflozin", brands:["Forxiga"], category:"Diabetes", strengths:["5 mg","10 mg"] },
  { generic:"Pioglitazone", brands:["Pioz"], category:"Diabetes", strengths:["7.5 mg","15 mg","30 mg"] },
  { generic:"Insulin regular", brands:["Actrapid","Huminsulin R"], category:"Insulin", strengths:["100 IU/mL"] },
  { generic:"Insulin glargine", brands:["Lantus","Basalog"], category:"Insulin", strengths:["100 IU/mL"] },

  // THYROID
  { generic:"Levothyroxine", brands:["Thyronorm","Eltroxin"], category:"Thyroid", strengths:["12.5 mcg","25 mcg","50 mcg","75 mcg","100 mcg","125 mcg","150 mcg"] },

  // VITAMINS / MINERALS
  { generic:"Thiamine (Vitamin B1)", brands:["Benerva"], category:"Vitamin", strengths:["100 mg","300 mg"] },
  { generic:"Methylcobalamin", brands:["Nurokind","Methycobal"], category:"Vitamin B12", strengths:["500 mcg","1500 mcg"] },
  { generic:"Folic acid", brands:["Folvite"], category:"Vitamin", strengths:["1 mg","5 mg"] },
  { generic:"Vitamin D3 / Cholecalciferol", brands:["Uprise D3","D-Rise"], category:"Vitamin", strengths:["1000 IU","2000 IU","60000 IU"] },
  { generic:"Calcium carbonate + Vitamin D3", brands:["Shelcal"], category:"Calcium / vitamin", strengths:["500 mg + D3"] },
  { generic:"Multivitamin + multimineral", brands:["Supradyn","Becosules","Zincovit"], category:"Multivitamin", strengths:["tablet/capsule"] },
  { generic:"Iron + Folic acid", brands:["Autrin","Orofer"], category:"Haematinic", strengths:["tablet/capsule"] },
  { generic:"Zinc", brands:["Zincovit","Zinc sulfate"], category:"Mineral", strengths:["20 mg","50 mg"] },

  // ALLERGY / RESPIRATORY BASICS
  { generic:"Cetirizine", brands:["Cetzine"], category:"Antihistamine", strengths:["5 mg","10 mg"] },
  { generic:"Levocetirizine", brands:["Teczine"], category:"Antihistamine", strengths:["5 mg"] },
  { generic:"Fexofenadine", brands:["Allegra"], category:"Antihistamine", strengths:["120 mg","180 mg"] },
  { generic:"Montelukast", brands:["Montair"], category:"Leukotriene antagonist", strengths:["4 mg","5 mg","10 mg"] },
  { generic:"Levocetirizine + Montelukast", brands:["Montair-LC"], category:"Allergy", strengths:["5/10 mg"] },

  // COMMON OPD / ANTIMICROBIALS
  { generic:"Amoxicillin", brands:["Novamox"], category:"Antibiotic", strengths:["250 mg","500 mg"] },
  { generic:"Amoxicillin + Clavulanate", brands:["Augmentin","Clavam"], category:"Antibiotic", strengths:["375 mg","625 mg","1000 mg"] },
  { generic:"Azithromycin", brands:["Azithral","Azee"], category:"Antibiotic", strengths:["250 mg","500 mg"] },
  { generic:"Cefixime", brands:["Taxim-O","Zifi"], category:"Antibiotic", strengths:["100 mg","200 mg","400 mg"] },
  { generic:"Cefuroxime", brands:["Ceftum"], category:"Antibiotic", strengths:["250 mg","500 mg"] },
  { generic:"Doxycycline", brands:["Doxy-1","Vibramycin"], category:"Antibiotic", strengths:["100 mg"] },
  { generic:"Metronidazole", brands:["Flagyl"], category:"Antimicrobial", strengths:["200 mg","400 mg"] },
  { generic:"Fluconazole", brands:["Forcan","Zocon"], category:"Antifungal", strengths:["50 mg","150 mg","200 mg"] },

  // OTHER USEFUL
  { generic:"Sildenafil", brands:["Viagra","Penegra"], category:"PDE5 inhibitor", strengths:["25 mg","50 mg","100 mg"] },
  { generic:"Tadalafil", brands:["Tazzle","Cialis"], category:"PDE5 inhibitor", strengths:["5 mg","10 mg","20 mg"] },
  { generic:"Dapoxetine", brands:["Priligy"], category:"Premature ejaculation", strengths:["30 mg","60 mg"] },
  { generic:"Finasteride", brands:["Finax"], category:"5-alpha reductase inhibitor", strengths:["1 mg","5 mg"] },
  { generic:"Tamsulosin", brands:["Urimax"], category:"Alpha blocker", strengths:["0.4 mg"] }
];

export const medicineCategories =
  Array.from(new Set(medicines.map((m) => m.category))).sort();
