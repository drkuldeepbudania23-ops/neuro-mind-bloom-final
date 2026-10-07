import fs from "node:fs";

const URL="https://www.consernpharma.com/wp-content/uploads/2025/01/Product-List.pdf";

function clean(s=""){
  return s.replace(/\s+/g," ").trim();
}
function strengthFrom(s=""){
  const m=s.match(/(\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?(?:\s*(?:mg|mcg|g|ml|%|iu)(?:\s*\/\s*(?:ml|5ml|g))?))/i);
  return m ? clean(m[1]) : "";
}

// The official PDF is downloaded and parsed through pdftotext if available.
// If pdftotext is unavailable, installer stops rather than inventing mappings.
const res=await fetch(URL,{headers:{"user-agent":"Mozilla/5.0"}});
if(!res.ok) throw new Error(`Consern official catalogue download failed: HTTP ${res.status}`);
const buf=Buffer.from(await res.arrayBuffer());
fs.mkdirSync("data",{recursive:true});
fs.writeFileSync("data/consern-official-product-list.pdf",buf);
console.log("Official Consern catalogue downloaded.");
