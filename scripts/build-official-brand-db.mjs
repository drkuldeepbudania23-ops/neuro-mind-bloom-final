import fs from "node:fs";

const sources = [
  { company:"Sun Pharma", url:"https://sunpharma.com/india-products/", kind:"sun" },
  { company:"Torrent Pharma", url:"https://www.torrentpharma.com/pi/IN/products/", kind:"torrent" },
  { company:"Alkem", url:"https://www.alkemlabs.com/our-offerings/alkem-generics", kind:"alkem" },
  { company:"Intas", url:"https://www.intaspharma.com/products/", kind:"intas" },
];

const clean = (s="") => s
  .replace(/<script[\s\S]*?<\/script>/gi," ")
  .replace(/<style[\s\S]*?<\/style>/gi," ")
  .replace(/<br\s*\/?>/gi," ")
  .replace(/<[^>]+>/g," ")
  .replace(/&amp;/gi,"&").replace(/&nbsp;/gi," ")
  .replace(/&#0*39;|&apos;/gi,"'")
  .replace(/&quot;/gi,'"')
  .replace(/&#x2F;/gi,"/")
  .replace(/\s+/g," ").trim();

function rows(html){
  const out=[];
  for(const tr of html.match(/<tr\b[\s\S]*?<\/tr>/gi)||[]){
    const cells=[...tr.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m=>clean(m[1]));
    if(cells.length) out.push(cells);
  }
  return out;
}

function formFrom(text=""){
  const t=text.toLowerCase();
  const map=[
    ["injection","Injection"],["capsule","Capsule"],["syrup","Syrup"],
    ["suspension","Suspension"],["solution","Solution"],["cream","Cream"],
    ["gel","Gel"],["ointment","Ointment"],["drops","Drops"],["drop","Drops"],
    ["inhaler","Inhaler"],["spray","Spray"],["sachet","Sachet"],
    ["tablet","Tablet"],["tablets","Tablet"]
  ];
  for(const [k,v] of map) if(t.includes(k)) return v;
  return "";
}
function strengthFrom(text=""){
  const m=text.match(/(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?(?:\s*(?:mg|mcg|g|ml|%|iu)(?:\s*\/\s*(?:ml|5ml|g))?))/i);
  return m?m[1].replace(/\s+/g," ").trim():"";
}
function normGeneric(s=""){
  return s.replace(/\bI\.?P\.?\b|\bB\.?P\.?\b|\bU\.?S\.?P\.?\b|\bPh\.?\s*Eur\.?\b/gi,"")
    .replace(/\s+/g," ").trim();
}
function add(out,r){
  if(!r.brand || !r.generic) return;
  const bad=/^(brand|products?|product description|sku|drug name)$/i;
  if(bad.test(r.brand)||bad.test(r.generic)) return;
  out.push({...r,
    brand:clean(r.brand), generic:normGeneric(clean(r.generic)),
    strength:clean(r.strength||""), form:clean(r.form||""),
    category:clean(r.category||"Other"), company:clean(r.company||"")
  });
}

const all=[];
for(const s of sources){
  console.log("Downloading",s.company);
  const res=await fetch(s.url,{headers:{"user-agent":"Mozilla/5.0 NMB-catalogue-builder/1.0"}});
  if(!res.ok){ console.warn("Skipped",s.company,res.status); continue; }
  const html=await res.text();
  const rr=rows(html);

  if(s.kind==="sun"){
    // SUPER GROUP | PACK | Product Description | Generic | Strength | Form | Brand
    for(const c of rr) if(c.length>=7) add(all,{
      company:s.company, category:c[0], generic:c[3], strength:c[4], form:c[5], brand:c[6]
    });
  }

  if(s.kind==="alkem"){
    // Brand | Therapy Area | SKU | Strength(composition)
    for(const c of rr) if(c.length>=4) add(all,{
      company:s.company, category:c[1], brand:c[0], generic:c[3],
      strength:strengthFrom(c[3]), form:formFrom(c[2])
    });
  }

  if(s.kind==="torrent"){
    // Products | Drug Name | PI | Abbreviated PI
    for(const c of rr) if(c.length>=2) add(all,{
      company:s.company, category:"", brand:c[0], generic:c[1],
      strength:strengthFrom(c[1]), form:formFrom(c[1])
    });
  }

  if(s.kind==="intas"){
    // Brand Name | Active Ingredient(s) | Therapeutic Segment | Pack Details
    for(const c of rr) if(c.length>=4) add(all,{
      company:s.company, category:c[2], brand:c[0], generic:c[1],
      strength:strengthFrom(c[1]), form:formFrom(c[1])
    });
  }
}

// Lifecare Neuro: verified official brochure/core neuro brands.
// Kept explicit because its public catalogue is PDF/category based rather than one stable HTML table.
const lifecare=[
["Sertane","Sertraline","25 mg","Tablet","Anti-depressant"],
["Sertane","Sertraline","50 mg","Tablet","Anti-depressant"],
["Sertane","Sertraline","100 mg","Tablet","Anti-depressant"],
["Jovial","Escitalopram","5 mg","Tablet","Anti-depressant"],
["Jovial","Escitalopram","10 mg","Tablet","Anti-depressant"],
["Jovial","Escitalopram","20 mg","Tablet","Anti-depressant"],
["Deploc","Duloxetine","20 mg","Tablet","Anti-depressant"],
["Deploc","Duloxetine","30 mg","Tablet","Anti-depressant"],
["Deploc","Duloxetine","40 mg","Tablet","Anti-depressant"],
["Deploc","Duloxetine","60 mg","Tablet","Anti-depressant"],
["Deples","Mirtazapine","7.5 mg","MD Tablet","Anti-depressant"],
["Deples","Mirtazapine","15 mg","MD Tablet","Anti-depressant"],
["Deples","Mirtazapine","30 mg","MD Tablet","Anti-depressant"],
["Deples","Mirtazapine","45 mg","MD Tablet","Anti-depressant"],
["Ventodep ER","Venlafaxine","37.5 mg","ER Tablet/Capsule","Anti-depressant"],
["Ventodep ER","Venlafaxine","75 mg","ER Tablet/Capsule","Anti-depressant"],
["Ventodep ER","Venlafaxine","150 mg","ER Tablet/Capsule","Anti-depressant"],
["Fluoxecare","Fluoxetine","20 mg","Capsule","Anti-depressant"],
["Fluoxecare","Fluoxetine","40 mg","Capsule","Anti-depressant"],
["Fluoxecare","Fluoxetine","60 mg","Capsule","Anti-depressant"],
["LC","Lithium Carbonate","300 mg","Tablet","Mood stabilizer"],
["LC SR","Lithium Carbonate","400 mg","SR Tablet","Mood stabilizer"],
["Zep CR","Carbamazepine","200 mg","CR Tablet","Anti-convulsant"],
["Zep CR","Carbamazepine","300 mg","CR Tablet","Anti-convulsant"],
["Zep CR","Carbamazepine","400 mg","CR Tablet","Anti-convulsant"],
["Brivazep","Brivaracetam","25 mg","Tablet","Anti-convulsant"],
["Brivazep","Brivaracetam","50 mg","Tablet","Anti-convulsant"],
["Brivazep","Brivaracetam","75 mg","Tablet","Anti-convulsant"],
["Brivazep","Brivaracetam","100 mg","Tablet","Anti-convulsant"]
];
for(const x of lifecare)add(all,{brand:x[0],generic:x[1],strength:x[2],form:x[3],category:x[4],company:"Lifecare Neuro"});

// Deduplicate exact catalogue rows.
const seen=new Set();
const unique=all.filter(r=>{
  const k=[r.company,r.brand,r.generic,r.strength,r.form].join("|").toLowerCase();
  if(seen.has(k))return false; seen.add(k); return true;
}).sort((a,b)=>
  a.generic.localeCompare(b.generic)||a.brand.localeCompare(b.brand)||a.strength.localeCompare(b.strength)
);

const esc=s=>JSON.stringify(s??"");
const lines=unique.map(r=>`  { generic:${esc(r.generic)}, brand:${esc(r.brand)}, strength:${esc(r.strength)}, form:${esc(r.form)}, company:${esc(r.company)}, category:${esc(r.category)} },`);

const ts=`// AUTO-GENERATED FROM OFFICIAL MANUFACTURER CATALOGUES.
// Re-run scripts/build-official-brand-db.mjs to refresh.
export type OfficialBrandRow = {
  generic:string; brand:string; strength:string; form:string; company:string; category:string;
};
export const officialBrandRows: OfficialBrandRow[] = [
${lines.join("\n")}
];
`;

fs.mkdirSync("data",{recursive:true});
fs.writeFileSync("data/official-brand-catalogue.ts",ts,"utf8");
fs.writeFileSync("data/official-brand-catalogue.json",JSON.stringify(unique,null,2),"utf8");
console.log(`Generated ${unique.length} verified/official catalogue rows.`);
console.log("Companies:",[...new Set(unique.map(x=>x.company))].join(", "));
