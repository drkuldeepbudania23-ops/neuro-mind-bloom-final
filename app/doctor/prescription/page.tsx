"use client";

export default function PrescriptionPage() {
  function printPrescription() {
    window.print();
  }

  return (
    <main style={{padding:30,maxWidth:800,margin:"auto"}}>
      <h1>Neuro Mind Bloom</h1>
      <h2>E-Prescription</h2>
      <p><b>Dr. Kuldeep Budania</b> — MD Psychiatry</p>

      <input style={input} placeholder="Patient name"/>
      <input style={input} placeholder="Age / Sex"/>
      <input style={input} placeholder="Diagnosis"/>
      <textarea style={input} rows={8} placeholder={"Medicines\n1.\n2.\n3."}/>
      <textarea style={input} rows={4} placeholder="Advice"/>
      <input style={input} placeholder="Follow-up after"/>

      <button onClick={printPrescription} style={button}>
        Print / Save PDF
      </button>
    </main>
  );
}

const input={width:"100%",padding:12,marginBottom:12,border:"1px solid #bbb",borderRadius:8,boxSizing:"border-box" as const};
const button={padding:"12px 20px",border:0,borderRadius:8,background:"#126a73",color:"white",cursor:"pointer"};
