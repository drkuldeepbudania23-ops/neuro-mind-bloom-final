"use client";

export default function PaymentPage() {
  return (
    <main style={{
      maxWidth: 650,
      margin: "50px auto",
      padding: 25,
      fontFamily: "Arial",
      textAlign: "center"
    }}>
      <h1>Neuro Mind Bloom</h1>
      <h2>Consultation Payment</h2>

      <div style={{
        border: "1px solid #ddd",
        borderRadius: 14,
        padding: 30,
        marginTop: 25
      }}>
        <h3>Video Consultation</h3>
        <h1>Rs. 500</h1>

        <p>Online payment integration will be enabled here.</p>

        <button
          onClick={() => alert("Payment gateway will be connected in the next step.")}
          style={{ padding: "13px 24px", borderRadius: 8 }}
        >
          Pay Rs. 500
        </button>
      </div>
    </main>
  );
}