export type Medicine = {
  generic: string;
  category: string;
  strengths: string[];
  brands: string[];
  company?: string;
};

export const medicines: Medicine[] = [

{
 generic:"Escitalopram",
 category:"SSRI",
 strengths:["5 mg","10 mg","20 mg"],
 brands:["Nexito"],
 company:"Sun Pharma"
},

{
 generic:"Escitalopram + Clonazepam",
 category:"Antidepressant + Anxiolytic",
 strengths:[
  "5 mg + 0.5 mg",
  "10 mg + 0.5 mg"
 ],
 brands:["Nexito Plus"],
 company:"Sun Pharma"
},

{
 generic:"Fluoxetine",
 category:"SSRI",
 strengths:["10 mg","20 mg","40 mg","60 mg"],
 brands:["Flunil"],
 company:"Intas"
},

{
 generic:"Paroxetine",
 category:"SSRI",
 strengths:[
  "12.5 mg CR",
  "25 mg CR",
  "37.5 mg CR"
 ],
 brands:["Pexep CR"],
 company:"Intas"
},

{
 generic:"Paroxetine + Clonazepam",
 category:"Antidepressant + Anxiolytic",
 strengths:[
  "12.5 mg + 0.25 mg",
  "12.5 mg + 0.5 mg"
 ],
 brands:["Pexep Plus"],
 company:"Intas"
},

{
 generic:"Venlafaxine",
 category:"SNRI",
 strengths:[
  "37.5 mg",
  "75 mg",
  "150 mg"
 ],
 brands:["Veniz XR"],
 company:"Sun Pharma"
},

{
 generic:"Desvenlafaxine",
 category:"SNRI",
 strengths:[
  "25 mg",
  "50 mg",
  "100 mg"
 ],
 brands:["D-Veniz"],
 company:"Sun Pharma"
},

{
 generic:"Duloxetine",
 category:"SNRI",
 strengths:[
  "20 mg",
  "30 mg",
  "40 mg",
  "60 mg"
 ],
 brands:["Duzela"],
 company:"Sun Pharma"
},

{
 generic:"Bupropion",
 category:"NDRI",
 strengths:[
  "150 mg SR",
  "300 mg XL"
 ],
 brands:["Bupron SR","Bupron XL"],
 company:"Sun Pharma"
},

{
 generic:"Mirtazapine",
 category:"NaSSA",
 strengths:[
  "7.5 mg",
  "15 mg",
  "30 mg",
  "45 mg"
 ],
 brands:["Mirtaz"],
 company:"Sun Pharma"
},

{
 generic:"Clomipramine",
 category:"TCA / OCD",
 strengths:[
  "10 mg",
  "25 mg",
  "50 mg",
  "75 mg SR"
 ],
 brands:["Clonil"],
 company:"Intas"
},

{
 generic:"Olanzapine",
 category:"Atypical Antipsychotic",
 strengths:[
  "2.5 mg",
  "5 mg",
  "7.5 mg",
  "10 mg",
  "15 mg",
  "20 mg"
 ],
 brands:["Oleanz"],
 company:"Intas"
},

{
 generic:"Risperidone",
 category:"Atypical Antipsychotic",
 strengths:[
  "0.5 mg",
  "1 mg",
  "2 mg",
  "3 mg",
  "4 mg"
 ],
 brands:["Risdone"],
 company:"Intas"
},

{
 generic:"Risperidone + Trihexyphenidyl",
 category:"Antipsychotic Combination",
 strengths:[
  "2 mg + 2 mg",
  "3 mg + 2 mg",
  "4 mg + 2 mg"
 ],
 brands:["Risdone Plus"],
 company:"Intas"
},

{
 generic:"Aripiprazole",
 category:"Atypical Antipsychotic",
 strengths:[
  "2 mg",
  "5 mg",
  "10 mg",
  "15 mg",
  "20 mg",
  "30 mg"
 ],
 brands:["Arip"],
 company:"Intas / Torrent"
},

{
 generic:"Quetiapine",
 category:"Atypical Antipsychotic",
 strengths:[
  "25 mg",
  "50 mg",
  "100 mg",
  "200 mg",
  "300 mg",
  "400 mg"
 ],
 brands:["Qutan"],
 company:"Intas"
},

{
 generic:"Amisulpride",
 category:"Atypical Antipsychotic",
 strengths:[
  "50 mg",
  "100 mg",
  "200 mg",
  "300 mg",
  "400 mg"
 ],
 brands:["Sulpitac"],
 company:"Sun Pharma"
},

{
 generic:"Lithium Carbonate",
 category:"Mood Stabilizer",
 strengths:[
  "300 mg",
  "400 mg CR",
  "450 mg CR"
 ],
 brands:["Lithosun SR"],
 company:"Sun Pharma"
},

{
 generic:"Divalproex Sodium",
 category:"Mood Stabilizer",
 strengths:[
  "250 mg",
  "500 mg",
  "750 mg ER"
 ],
 brands:["Dicorate ER"],
 company:"Sun Pharma"
},

{
 generic:"Carbamazepine",
 category:"Mood Stabilizer / Antiepileptic",
 strengths:[
  "100 mg",
  "200 mg",
  "300 mg CR",
  "400 mg CR"
 ],
 brands:["Mazetol"],
 company:"Intas"
},

{
 generic:"Lamotrigine",
 category:"Mood Stabilizer",
 strengths:[
  "25 mg",
  "50 mg",
  "100 mg",
  "200 mg"
 ],
 brands:["Lamitor"],
 company:"Torrent"
},

{
 generic:"Oxcarbazepine",
 category:"Antiepileptic",
 strengths:[
  "150 mg",
  "300 mg",
  "450 mg",
  "600 mg"
 ],
 brands:["Oxetol"],
 company:"Sun Pharma"
},

{
 generic:"Clonazepam",
 category:"Benzodiazepine",
 strengths:[
  "0.25 mg",
  "0.5 mg",
  "1 mg",
  "2 mg"
 ],
 brands:["Clonotril"],
 company:"Torrent"
},

{
 generic:"Diazepam",
 category:"Benzodiazepine",
 strengths:[
  "2 mg",
  "5 mg",
  "10 mg"
 ],
 brands:["Diapam"],
 company:"DD Pharma / Market"
},

{
 generic:"Chlordiazepoxide",
 category:"Benzodiazepine / De-addiction",
 strengths:[
  "5 mg",
  "10 mg",
  "25 mg"
 ],
 brands:["Klorzep 25"],
 company:"Market"
},

{
 generic:"Etizolam",
 category:"Anxiolytic",
 strengths:[
  "0.25 mg",
  "0.5 mg",
  "1 mg"
 ],
 brands:["Etizola"],
 company:"Intas"
},

{
 generic:"Buspirone",
 category:"Anxiolytic",
 strengths:[
  "5 mg",
  "10 mg"
 ],
 brands:["Buspin"],
 company:"Intas"
},

{
 generic:"Pregabalin",
 category:"Anxiety / Neuropathic Pain",
 strengths:[
  "50 mg",
  "75 mg",
  "150 mg"
 ],
 brands:["Pregalin"],
 company:"Torrent"
},

{
 generic:"Pregabalin + Nortriptyline",
 category:"Neuropathic Pain Combination",
 strengths:[
  "75 mg + 10 mg",
  "75 mg + 25 mg"
 ],
 brands:["Pregalin NT"],
 company:"Torrent"
},

{
 generic:"Gabapentin",
 category:"Neuropathic Pain",
 strengths:[
  "100 mg",
  "300 mg",
  "400 mg"
 ],
 brands:["Gabapin"],
 company:"Intas"
},

{
 generic:"Atomoxetine",
 category:"ADHD",
 strengths:[
  "10 mg",
  "18 mg",
  "25 mg",
  "40 mg",
  "60 mg"
 ],
 brands:["Axepta"],
 company:"Intas"
},

{
 generic:"Clonidine",
 category:"ADHD / Withdrawal",
 strengths:[
  "0.1 mg",
  "0.2 mg"
 ],
 brands:["Arkamin"],
 company:"Torrent"
},

{
 generic:"Donepezil",
 category:"Dementia",
 strengths:[
  "5 mg",
  "10 mg"
 ],
 brands:["Donep"],
 company:"Alkem"
},

{
 generic:"Donepezil + Memantine",
 category:"Dementia Combination",
 strengths:[
  "5 mg + 5 mg",
  "5 mg + 10 mg",
  "10 mg + 10 mg"
 ],
 brands:["Donep-M"],
 company:"Alkem"
},

{
 generic:"Memantine",
 category:"Dementia",
 strengths:[
  "5 mg",
  "10 mg",
  "20 mg"
 ],
 brands:["Admenta"],
 company:"Sun Pharma"
},

{
 generic:"Melatonin",
 category:"Sleep",
 strengths:[
  "3 mg",
  "5 mg",
  "10 mg"
 ],
 brands:["Meloset"],
 company:"Sun Pharma"
},

{
 generic:"Naltrexone",
 category:"De-addiction",
 strengths:[
  "25 mg",
  "50 mg"
 ],
 brands:["Nodict"],
 company:"Sun Pharma"
},

{
 generic:"Acamprosate",
 category:"Alcohol Dependence",
 strengths:["333 mg"],
 brands:["Acamptas"],
 company:"Intas"
},

{
 generic:"Baclofen",
 category:"De-addiction / Muscle Relaxant",
 strengths:[
  "5 mg",
  "10 mg",
  "20 mg"
 ],
 brands:["Baclofen"],
 company:"Multiple"
},

{
 generic:"Buprenorphine + Naloxone",
 category:"Opioid Dependence",
 strengths:[
  "2 mg + 0.5 mg",
  "8 mg + 2 mg"
 ],
 brands:["Buprenorphine + Naloxone"],
 company:"Licensed Products"
},

{
 generic:"Varenicline",
 category:"Tobacco Cessation",
 strengths:[
  "0.5 mg",
  "1 mg"
 ],
 brands:["Varenicline"],
 company:"Multiple"
},

{
 generic:"Nicotine",
 category:"Nicotine Replacement",
 strengths:[
  "2 mg Gum",
  "4 mg Gum",
  "7 mg Patch",
  "14 mg Patch",
  "21 mg Patch",
  "Lozenge"
 ],
 brands:["Nicotine NRT"],
 company:"Multiple"
},

{
 generic:"Aripiprazole LAI",
 category:"Long Acting Injectable",
 strengths:[
  "300 mg",
  "400 mg"
 ],
 brands:["Aripiprazole LAI"],
 company:"Multiple"
},

{
 generic:"Paliperidone Palmitate",
 category:"Long Acting Injectable",
 strengths:[
  "50 mg",
  "75 mg",
  "100 mg",
  "150 mg"
 ],
 brands:["Paliperidone LAI"],
 company:"Multiple"
},

{
 generic:"Risperidone LAI",
 category:"Long Acting Injectable",
 strengths:[
  "25 mg",
  "37.5 mg",
  "50 mg"
 ],
 brands:["Risperidone LAI"],
 company:"Multiple"
},

{
 generic:"Haloperidol Decanoate",
 category:"Long Acting Injectable",
 strengths:[
  "50 mg/ml",
  "100 mg/ml"
 ],
 brands:["Haloperidol Decanoate"],
 company:"Multiple"
},

{
 generic:"Lorazepam Injection",
 category:"Benzodiazepine Injection",
 strengths:[
  "2 mg/ml",
  "4 mg/ml"
 ],
 brands:["Lorazepam Injection"],
 company:"Multiple"
},

{
 generic:"Diazepam Injection",
 category:"Benzodiazepine Injection",
 strengths:["5 mg/ml"],
 brands:["Diazepam Injection"],
 company:"Multiple"
}

];
