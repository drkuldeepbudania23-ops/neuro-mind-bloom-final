import fs from "node:fs";

const pages = [
 ["Anti-Anxiety","https://consernpharma.com/anti-anxiety.html"],
 ["Anti-Depressants","https://consernpharma.com/anti-depressants.html"],
 ["Anti-Psychotics","https://consernpharma.com/anti-psychotics.html"],
 ["Products","https://consernpharma.com/products.html"]
];

const clean=s=>(s||"").replace(/<[^>]*>/g," ").replace(/&amp;/g,"&").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const rows=[];

for (const [category,url] of pages){
  const r=await fetch(url,{headers:{"user-agent":"Mozilla/5.0"}});
  if(!r.ok) throw new Error(`${url} HTTP ${r.status}`);
  const html=await r.text();

  // Product cards on Consern live pages: heading followed by Composition/Comp, Strength and Dosage Form.
  const blocks=html.split(/<h3\b/i).slice(1);
  for(const raw of blocks){
    const head=(raw.match(/^[^>]*>([\s\S]*?)<\/h3>/i)||[])[1];
    const brand=clean(head);
    const text=clean(raw.slice(0,2500));
    const gm=text.match(/(?:Composition|Comp)\s*:\s*(.+?)\s+Strength\s*:/i);
    const sm=text.match(/Strength\s*:\s*(.+?)\s+Dosage Form\s*:/i);
    const fm=text.match(/Dosage Form\s*:\s*(.+?)\s+Pack Size\s*:/i);
    if(brand && gm){
      rows.push({
        brand,
        generic:clean(gm[1]),
        strength:clean(sm?.[1]||""),
        form:clean(fm?.[1]||""),
        company:"Consern Pharma",
        category
      });
    }
  }
}

const seen=new Set();
const unique=rows.filter(x=>{
 const k=[x.brand,x.generic,x.strength,x.form].join("|").toLowerCase();
 if(seen.has(k)) return false; seen.add(k); return true;
});

if(unique.length<20) throw new Error(`Safety stop: only ${unique.length} live Consern products parsed`);

fs.mkdirSync("data",{recursive:true});
const q=x=>JSON.stringify(x??"");
const ts=`// AUTO-GENERATED FROM CONSERN PHARMA LIVE OFFICIAL PRODUCT PAGES
export type ConsernBrandRow={generic:string;brand:string;strength:string;form:string;company:string;category:string};
export const consernBrandRows:ConsernBrandRow[]=[
${unique.map(x=>`  {generic:${q(x.generic)},brand:${q(x.brand)},strength:${q(x.strength)},form:${q(x.form)},company:"Consern Pharma",category:${q(x.category)}}`).join(",\n")}
];
`;
fs.writeFileSync("data/consern-brand-catalogue.ts",ts);
fs.writeFileSync("data/consern-brand-catalogue.json",JSON.stringify(unique,null,2));
console.log(`Parsed ${unique.length} Consern live product records`);
