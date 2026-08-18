"use client";

export default function PaymentPage() {
  return (
    <main style={{padding:30,maxWidth:650,margin:"auto"}}>
      <h1>Payment</h1>

      <div style={{
        border:"1px solid #ddd",
        borderRadius:14,
        padding:24
      }}>
        <h2>Consultation Fee</h2>
        <p style={{fontSize:28,fontWeight:700}}>₹500</p>

        <input
          style={input}
          placeholder="Patient name"
        />

        <input
          style={input}
          placeholder="Payment reference / UTR"
        />

        <select style={input}>
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button
          style={button}
          onClick={() => alert("Payment status saved")}
        >
          Save Payment
        </button>
      </div>
    </main>
  );
}

const input={width:"100%",padding:12,marginBottom:12,border:"1px solid #bbb",borderRadius:8,boxSizing:"border-box" as const};
const button={padding:"12px 20px",border:0,borderRadius:8,background:"#126a73",color:"white",cursor:"pointer"};
