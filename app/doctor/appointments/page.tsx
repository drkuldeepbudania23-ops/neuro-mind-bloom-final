"use client";

import { useState } from "react";

export default function AppointmentsPage() {
  const [saved,setSaved] = useState(false);

  return (
    <main style={main}>
      <h1>Appointments</h1>

      <form onSubmit={e => {
        e.preventDefault();
        setSaved(true);
      }}>
        <input style={input} placeholder="Patient name" required />
        <input style={input} placeholder="Mobile number" required />
        <input style={input} type="date" required />
        <input style={input} type="time" required />

        <select style={input}>
          <option>Video Consultation</option>
          <option>Clinic Consultation</option>
        </select>

        <textarea style={input} placeholder="Reason for consultation" rows={4}/>

        <button style={button}>Save Appointment</button>
      </form>

      {saved && <p>Appointment saved successfully.</p>}
    </main>
  );
}

const main={padding:30,maxWidth:700,margin:"auto"};
const input={width:"100%",padding:12,marginBottom:12,border:"1px solid #ccc",borderRadius:8,boxSizing:"border-box" as const};
const button={padding:"12px 20px",border:0,borderRadius:8,background:"#126a73",color:"white",cursor:"pointer"};
