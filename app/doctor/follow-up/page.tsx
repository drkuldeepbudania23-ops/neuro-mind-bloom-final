"use client";

export default function FollowUpPage() {
  return (
    <main style={s.page}>
      <h1>Follow-up</h1>
      <p>Record follow-up details and next visit.</p>

      <div style={s.card}>
        <input style={s.input} placeholder="Patient name / ID" />
        <input style={s.input} type="date" />
        <textarea
          style={{ ...s.input, minHeight: 120 }}
          placeholder="Clinical improvement / symptoms / side effects"
        />
        <textarea
          style={{ ...s.input, minHeight: 100 }}
          placeholder="Plan / medication changes"
        />
        <input style={s.input} type="date" />
        <button style={s.button}>Save Follow-up</button>
      </div>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  page:{maxWidth:850,margin:"0 auto",padding:24,fontFamily:"Arial"},
  card:{display:"grid",gap:12,border:"1px solid #ddd",borderRadius:16,padding:22},
  input:{padding:12,border:"1px solid #ccc",borderRadius:8},
  button:{padding:13,border:0,borderRadius:8,background:"#176b87",color:"#fff",fontWeight:700}
};
