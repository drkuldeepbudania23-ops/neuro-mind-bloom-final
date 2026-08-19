"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [service, setService] = useState("video");

  const fee = service === "psychotherapy" ? 2000 : 500;

  return (
    <main style={s.page}>
      <h1>Payment</h1>

      <div style={s.card}>
        <label>Service</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={s.input}
        >
          <option value="video">Video Consultation — ₹500</option>
          <option value="psychotherapy">
            Psychotherapy 30–45 min — ₹2000
          </option>
        </select>

        <input style={s.input} placeholder="Patient name" />

        <div style={s.total}>
          <span>Total</span>
          <strong>₹{fee}</strong>
        </div>

        <select style={s.input}>
          <option>UPI</option>
          <option>Cash</option>
          <option>Bank transfer</option>
          <option>Other</option>
        </select>

        <button style={s.button}>Record Payment</button>
      </div>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page:{maxWidth:750,margin:"0 auto",padding:24,fontFamily:"Arial"},
  card:{display:"grid",gap:14,border:"1px solid #ddd",borderRadius:16,padding:22},
  input:{padding:12,border:"1px solid #ccc",borderRadius:8},
  total:{display:"flex",justifyContent:"space-between",fontSize:24,padding:16,background:"#f4f8fa",borderRadius:10},
  button:{padding:13,border:0,borderRadius:8,background:"#176b87",color:"#fff",fontWeight:700}
};
