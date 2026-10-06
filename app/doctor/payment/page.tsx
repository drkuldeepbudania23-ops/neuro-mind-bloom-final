"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [patient, setPatient] = useState("");
  const [service, setService] = useState("consultation");
  const [status, setStatus] = useState("Paid");
  const [discountType, setDiscountType] = useState("amount");
  const [discount, setDiscount] = useState("0");
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState("UPI");
  const [reference, setReference] = useState("");

  const fee = service === "psychotherapy" ? 2000 : 500;

  const finalAmount = useMemo(() => {
    if (status === "Exempt") return 0;
    if (status === "Paid") return fee;

    const d = Math.max(0, Number(discount) || 0);

    if (discountType === "percent") {
      return Math.max(
        0,
        Math.round(fee - (fee * Math.min(d, 100)) / 100)
      );
    }

    return Math.max(0, fee - d);
  }, [fee, status, discount, discountType]);

  function savePayment() {
    if (!patient.trim()) {
      alert("Patient name required.");
      return;
    }

    if (
      (status === "Discount" || status === "Exempt") &&
      !reason.trim()
    ) {
      alert("Discount / exemption reason required.");
      return;
    }

    const record = {
      id: Date.now().toString(),
      patient: patient.trim(),
      service,
      originalFee: fee,
      status,
      discountType: status === "Discount" ? discountType : "",
      discount:
        status === "Discount" ? Number(discount || 0) : 0,
      finalAmount,
      reason: reason.trim(),
      paymentMode: finalAmount === 0 ? "Nil / Exempt" : mode,
      reference: reference.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const old = JSON.parse(
        localStorage.getItem("nmb_payments") || "[]"
      );

      localStorage.setItem(
        "nmb_payments",
        JSON.stringify([record, ...old])
      );

      localStorage.setItem(
        "nmb_payment_clearance",
        JSON.stringify(record)
      );

      localStorage.setItem("nmb_rx_patient", patient.trim());

      const next =
        searchParams.get("next") || "/doctor/prescription";

      router.push(next);
    } catch (e) {
      console.error(e);
      alert("Payment record save nahi hua.");
    }
  }

  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Payment / Discount / Exemption</h1>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 20,
          display: "grid",
          gap: 12,
        }}
      >
        <label>
          <b>Patient Name</b>
        </label>

        <input
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          style={input}
          placeholder="Patient name"
        />

        <label>
          <b>Service</b>
        </label>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={input}
        >
          <option value="consultation">
            Consultation / Video Consultation - ₹500
          </option>

          <option value="psychotherapy">
            Psychotherapy / Counseling 30-45 min - ₹2000
          </option>
        </select>

        <label>
          <b>Payment Status</b>
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={input}
        >
          <option value="Paid">Paid</option>
          <option value="Discount">Discount</option>
          <option value="Exempt">Exempt</option>
        </select>

        {status === "Discount" && (
          <>
            <label>
              <b>Discount</b>
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <select
                value={discountType}
                onChange={(e) =>
                  setDiscountType(e.target.value)
                }
                style={input}
              >
                <option value="amount">₹ Amount</option>
                <option value="percent">% Percentage</option>
              </select>

              <input
                value={discount}
                onChange={(e) =>
                  setDiscount(
                    e.target.value.replace(/[^\d.]/g, "")
                  )
                }
                style={input}
                inputMode="decimal"
                placeholder="Discount"
              />
            </div>
          </>
        )}

        {(status === "Discount" ||
          status === "Exempt") && (
          <>
            <label>
              <b>Reason</b>
            </label>

            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={input}
              placeholder="Discount / exemption reason"
            />
          </>
        )}

        {finalAmount > 0 && (
          <>
            <label>
              <b>Payment Mode</b>
            </label>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={input}
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Other</option>
            </select>

            <label>
              <b>Transaction / Reference No.</b>
            </label>

            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              style={input}
              placeholder="Optional"
            />
          </>
        )}

        <div
          style={{
            background: "#f1f5f9",
            borderRadius: 10,
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
          }}
        >
          <span>Original ₹{fee}</span>
          <strong>Final ₹{finalAmount}</strong>
        </div>

        <button
          onClick={savePayment}
          style={{
            border: 0,
            borderRadius: 9,
            padding: 13,
            background: "#176b87",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Save & Continue to E-Prescription
        </button>
      </div>
    </main>
  );
}

const input: React.CSSProperties = {
  padding: 11,
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  width: "100%",
  boxSizing: "border-box",
};
