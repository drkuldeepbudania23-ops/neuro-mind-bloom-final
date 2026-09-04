export type PsychiatryBrand = {
  brand: string;
  generic: string;
  strength: string;
  company: string;
  category: string;
};

export const psychiatryBrands: PsychiatryBrand[] = [
  // Escitalopram
  { brand:"Nexito 5", generic:"Escitalopram", strength:"5 mg", company:"Sun Pharma", category:"Antidepressant" },
  { brand:"Nexito 10", generic:"Escitalopram", strength:"10 mg", company:"Sun Pharma", category:"Antidepressant" },
  { brand:"Nexito 20", generic:"Escitalopram", strength:"20 mg", company:"Sun Pharma", category:"Antidepressant" },
  { brand:"Feliz S 5", generic:"Escitalopram", strength:"5 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Feliz S 10", generic:"Escitalopram", strength:"10 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Feliz S 20", generic:"Escitalopram", strength:"20 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"S-Zetalo 5", generic:"Escitalopram", strength:"5 mg", company:"Abbott", category:"Antidepressant" },
  { brand:"S-Zetalo 10", generic:"Escitalopram", strength:"10 mg", company:"Abbott", category:"Antidepressant" },
  { brand:"S-Zetalo 20", generic:"Escitalopram", strength:"20 mg", company:"Abbott", category:"Antidepressant" },
  { brand:"Rexipra 5", generic:"Escitalopram", strength:"5 mg", company:"Intas", category:"Antidepressant" },
  { brand:"Rexipra 10", generic:"Escitalopram", strength:"10 mg", company:"Intas", category:"Antidepressant" },
  { brand:"Rexipra 20", generic:"Escitalopram", strength:"20 mg", company:"Intas", category:"Antidepressant" },

  // Escitalopram + clonazepam combinations
  { brand:"Nexito LS", generic:"Escitalopram + Clonazepam", strength:"10 mg + 0.25 mg", company:"Sun Pharma", category:"Antidepressant combination" },
  { brand:"Nexito Plus", generic:"Escitalopram + Clonazepam", strength:"5 mg + 0.5 mg", company:"Sun Pharma", category:"Antidepressant combination" },
  { brand:"Nexito Forte", generic:"Escitalopram + Clonazepam", strength:"10 mg + 0.5 mg", company:"Sun Pharma", category:"Antidepressant combination" },
  { brand:"Feliz S Plus 5", generic:"Escitalopram + Clonazepam", strength:"5 mg + 0.5 mg", company:"Torrent", category:"Antidepressant combination" },
  { brand:"Feliz S Plus", generic:"Escitalopram + Clonazepam", strength:"10 mg + 0.5 mg", company:"Torrent", category:"Antidepressant combination" },
  { brand:"Clonotril Plus 20/0.5", generic:"Escitalopram + Clonazepam", strength:"20 mg + 0.5 mg", company:"Torrent", category:"Antidepressant combination" },
  { brand:"S-Zetalo LS", generic:"Escitalopram + Clonazepam", strength:"10 mg + 0.25 mg", company:"Abbott", category:"Antidepressant combination" },
  { brand:"S-Zetalo Plus", generic:"Escitalopram + Clonazepam", strength:"10 mg + 0.5 mg", company:"Abbott", category:"Antidepressant combination" },
  { brand:"Depran", generic:"Escitalopram + Clonazepam", strength:"5 mg + 0.5 mg", company:"Intas", category:"Antidepressant combination" },

  // Other antidepressants
  { brand:"Serenata 50", generic:"Sertraline", strength:"50 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Serenata 100", generic:"Sertraline", strength:"100 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Fluvator 50", generic:"Fluvoxamine", strength:"50 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Fluvator 100", generic:"Fluvoxamine", strength:"100 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Uvox 50", generic:"Fluvoxamine", strength:"50 mg", company:"Abbott", category:"Antidepressant" },
  { brand:"Uvox 100", generic:"Fluvoxamine", strength:"100 mg", company:"Abbott", category:"Antidepressant" },
  { brand:"Venlift OD 37.5", generic:"Venlafaxine ER", strength:"37.5 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Venlift OD 75", generic:"Venlafaxine ER", strength:"75 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Venlift OD 150", generic:"Venlafaxine ER", strength:"150 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Newven OD 50", generic:"Desvenlafaxine", strength:"50 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Newven OD 100", generic:"Desvenlafaxine", strength:"100 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Symbal 20", generic:"Duloxetine", strength:"20 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Symbal 30", generic:"Duloxetine", strength:"30 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Symbal 40", generic:"Duloxetine", strength:"40 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Symbal 60", generic:"Duloxetine", strength:"60 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Paradise XR 12.5", generic:"Paroxetine CR", strength:"12.5 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Paradise XR 25", generic:"Paroxetine CR", strength:"25 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Paradise XR 37.5", generic:"Paroxetine CR", strength:"37.5 mg", company:"Torrent", category:"Antidepressant" },
  { brand:"Mirtaz", generic:"Mirtazapine", strength:"7.5/15/30/45 mg variants", company:"Sun Pharma", category:"Antidepressant" },
  { brand:"Mirnite", generic:"Mirtazapine", strength:"multiple marketed variants", company:"Intas", category:"Antidepressant" },
  { brand:"Mirtadep", generic:"Mirtazapine", strength:"multiple marketed variants", company:"Torrent", category:"Antidepressant" },

  // Antipsychotics
  { brand:"Oleanz 2.5", generic:"Olanzapine", strength:"2.5 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"Oleanz 5", generic:"Olanzapine", strength:"5 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"Oleanz 7.5", generic:"Olanzapine", strength:"7.5 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"Oleanz 10", generic:"Olanzapine", strength:"10 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"Olimelt 2.5", generic:"Olanzapine", strength:"2.5 mg", company:"Intas", category:"Antipsychotic" },
  { brand:"Olimelt 5", generic:"Olanzapine", strength:"5 mg", company:"Intas", category:"Antipsychotic" },
  { brand:"Tolaz", generic:"Olanzapine", strength:"multiple marketed variants", company:"Torrent", category:"Antipsychotic" },
  { brand:"Oleanz Plus", generic:"Fluoxetine + Olanzapine", strength:"20 mg + 5 mg", company:"Sun Pharma", category:"Antidepressant/antipsychotic combination" },
  { brand:"Sizodon MD 0.5", generic:"Risperidone", strength:"0.5 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"Sizodon LS", generic:"Risperidone + Trihexyphenidyl", strength:"2 mg + 2 mg", company:"Sun Pharma", category:"Antipsychotic combination" },
  { brand:"Sizodon Plus", generic:"Risperidone + Trihexyphenidyl", strength:"3 mg + 2 mg", company:"Sun Pharma", category:"Antipsychotic combination" },
  { brand:"Risdone LS", generic:"Risperidone + Trihexyphenidyl", strength:"2 mg + 2 mg", company:"Intas", category:"Antipsychotic combination" },
  { brand:"Risdone Plus", generic:"Risperidone + Trihexyphenidyl", strength:"3 mg + 2 mg", company:"Intas", category:"Antipsychotic combination" },
  { brand:"Qutipin 50", generic:"Quetiapine", strength:"50 mg", company:"Sun Pharma", category:"Antipsychotic" },
  { brand:"QUtan 25", generic:"Quetiapine", strength:"25 mg", company:"Intas", category:"Antipsychotic" },
  { brand:"Arip MT 2", generic:"Aripiprazole", strength:"2 mg", company:"Torrent", category:"Antipsychotic" },
  { brand:"Arip MT 5", generic:"Aripiprazole", strength:"5 mg", company:"Torrent", category:"Antipsychotic" },
  { brand:"Arip MT 10", generic:"Aripiprazole", strength:"10 mg", company:"Torrent", category:"Antipsychotic" },
  { brand:"Arip MT 15", generic:"Aripiprazole", strength:"15 mg", company:"Torrent", category:"Antipsychotic" },
  { brand:"Arip MT 20", generic:"Aripiprazole", strength:"20 mg", company:"Torrent", category:"Antipsychotic" },
  { brand:"Arip MT 30", generic:"Aripiprazole", strength:"30 mg", company:"Torrent", category:"Antipsychotic" },

  // Mood stabilizer / de-addiction / benzodiazepine
  { brand:"Valance 125", generic:"Divalproex Sodium", strength:"125 mg", company:"Abbott", category:"Mood stabilizer" },
  { brand:"Valance 250", generic:"Divalproex Sodium", strength:"250 mg", company:"Abbott", category:"Mood stabilizer" },
  { brand:"Valance 500", generic:"Divalproex Sodium", strength:"500 mg", company:"Abbott", category:"Mood stabilizer" },
  { brand:"Clonotril 0.25", generic:"Clonazepam", strength:"0.25 mg", company:"Torrent", category:"Anxiolytic" },
  { brand:"Clonotril 0.5", generic:"Clonazepam", strength:"0.5 mg", company:"Torrent", category:"Anxiolytic" },
  { brand:"Clonotril 1", generic:"Clonazepam", strength:"1 mg", company:"Torrent", category:"Anxiolytic" },
  { brand:"Clonotril 2", generic:"Clonazepam", strength:"2 mg", company:"Torrent", category:"Anxiolytic" },
  { brand:"Esperal 250", generic:"Disulfiram", strength:"250 mg", company:"Torrent", category:"Alcohol de-addiction" }
];
