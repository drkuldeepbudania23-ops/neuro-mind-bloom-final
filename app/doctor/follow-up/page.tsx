"use client";

export default function FollowUpPage() {
  return (
    <main style={{padding:30,maxWidth:700,margin:"auto"}}>
      <h1>Follow-up</h1>

      <input style={input} placeholder="Patient name"/>
      <input style={input} type="date"/>
      <textarea style={input} rows={5} placeholder="Clinical improvement / complaints"/>
      <textarea style={input} rows={5} placeholder="Medication changes"/>
      <input style={input} type="date"/>

      <button
        style={button}
        onClick={() => alert("Follow-up saved")}
      >
        Save Follow-up
      </button>
    </main>
  );
}

const input={width:"100%",padding:12,marginBottom:12,border:"1px solid #bbb",borderRadius:8,boxSizing:"border-box" as const};
const button={padding:"12px 20px",border:0,borderRadius:8,background:"#126a73",color:"white",cursor:"pointer"};
