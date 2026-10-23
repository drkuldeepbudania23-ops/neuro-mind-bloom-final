"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { SERVICES, getService, serviceCodeFromText } from "../../../lib/site";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [patient, setPatient] = useState("");
  const [service, setService] = useState<string>("psychiatry-consultation");
  const [status, setStatus] = useState("Paid");
  const [discountType, setDiscountType] = useState("amount");
  const [discount, setDiscount] = useState("0");
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState("UPI");
  const [reference, setReference] = useState("");
  const [alreadyCleared, setAlreadyCleared] = useState(false);
  const [existingStatus, setExistingStatus] = useState("");
  const [legacyNeedsVerification, setLegacyNeedsVerification] = useState(false);
  const [legacyPaymentStatus, setLegacyPaymentStatus] = useState("");
  const [legacyPaymentDetails, setLegacyPaymentDetails] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const walkInPaymentId = useRef("");
  const appointmentId =
    searchParams.get("appointmentId") ||
    (searchParams.get("paymentKey") === "walkin"
      ? ""
      : searchParams.get("paymentKey") || "");
  const [appointmentLoading, setAppointmentLoading] = useState(Boolean(appointmentId));

  const fee = getService(service)?.fee ?? 500;

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

    return Math.max(0, fee - Math.min(d, fee));
  }, [fee, status, discount, discountType]);

  useEffect(() => {
    if (!appointmentId) {
      setAppointmentLoading(false);
      return;
    }

    let active = true;
    setAppointmentLoading(true);
    (async () => {
      try {
        const snapshot = await getDoc(doc(db, "appointments", appointmentId));
        if (!active) return;
        if (!snapshot.exists()) {
          alert("Appointment could not be found.");
          return;
        }
        const appointment = snapshot.data();
        setPatient(String(appointment.patientName || appointment.name || ""));
        setService(
          String(appointment.serviceCode || "") && getService(String(appointment.serviceCode))
            ? String(appointment.serviceCode)
            : serviceCodeFromText(String(appointment.service || ""))
        );
        const savedPayment = await getDoc(doc(db, "payments", appointmentId));
        if (!active) return;
        const storedStatus = String(appointment.paymentStatus || "");
        const clearedStatuses = ["Paid", "Discount", "Exempt"];
        if (savedPayment.exists() || appointment.paymentId) {
          setAlreadyCleared(true);
          setExistingStatus(String(storedStatus || savedPayment.data()?.paymentStatus || "Recorded"));
        } else if (clearedStatuses.includes(storedStatus)) {
          const details = appointment.paymentDetails || {};
          setLegacyNeedsVerification(true);
          setLegacyPaymentStatus(storedStatus);
          setLegacyPaymentDetails(details);
          setStatus(storedStatus);
          if (details.discountType === "percent" || details.discountType === "amount") {
            setDiscountType(details.discountType);
          }
          if (Number.isFinite(Number(details.discount))) setDiscount(String(details.discount));
          if (typeof details.reason === "string") setReason(details.reason);
          if (typeof details.paymentMode === "string" && details.paymentMode) setMode(details.paymentMode);
        }
      } catch {
        if (active) alert("Appointment could not be loaded.");
      } finally {
        if (active) setAppointmentLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [appointmentId]);

  async function savePayment() {
    if (savingRef.current || alreadyCleared || appointmentLoading) return;
    if (!patient.trim()) {
      alert("Patient name required.");
      return;
    }

    const doctor = auth.currentUser;
    if (!doctor) {
      alert("Doctor login is required to confirm payment.");
      return;
    }

    if (
      (status === "Discount" || status === "Exempt") &&
      !reason.trim()
    ) {
      alert("Discount / exemption reason required.");
      return;
    }

    const requestedDiscount = Number(discount);
    if (status === "Discount" && (!Number.isFinite(requestedDiscount) || requestedDiscount <= 0)) {
      alert("Enter a valid discount greater than zero.");
      return;
    }
    if (legacyNeedsVerification && status !== legacyPaymentStatus) {
      alert("Confirm the existing payment status without changing it.");
      return;
    }
    const approvedDiscount = status !== "Discount"
      ? 0
      : discountType === "percent"
        ? Math.min(requestedDiscount, 100)
        : Math.min(requestedDiscount, fee);
    const confirmedAt = new Date().toISOString();
    const paymentId = appointmentId || walkInPaymentId.current || crypto.randomUUID();
    if (!appointmentId) walkInPaymentId.current = paymentId;
    const paymentDetails = {
      originalFee: fee,
      discountType: status === "Discount" ? discountType : "",
      discount: approvedDiscount,
      finalAmount,
      reason: reason.trim(),
      paymentMode: finalAmount === 0 ? "Nil / Exempt" : mode,
      reference: reference.trim(),
      service,
      confirmedBy: doctor.uid,
      confirmedAt: serverTimestamp(),
      ...(legacyNeedsVerification ? { legacyPaymentDetails: legacyPaymentDetails || null } : {}),
    };
    const destination = new URL(
      searchParams.get("next") || "/doctor/prescription",
      window.location.origin
    );
    if (destination.origin !== window.location.origin) {
      alert("Invalid next page.");
      return;
    }
    if (appointmentId) {
      destination.searchParams.set("appointmentId", appointmentId);
    } else {
      destination.searchParams.set("paymentId", paymentId);
    }

    savingRef.current = true;
    setSaving(true);
    try {
      await runTransaction(db, async (transaction) => {
        const paymentRef = doc(db, "payments", paymentId);
        const savedPayment = await transaction.get(paymentRef);
        if (savedPayment.exists()) throw new Error("PAYMENT_ALREADY_RECORDED");

        if (appointmentId) {
          const appointmentRef = doc(db, "appointments", appointmentId);
          const appointment = await transaction.get(appointmentRef);
          if (!appointment.exists()) throw new Error("APPOINTMENT_NOT_FOUND");
          if (appointment.data().paymentId) throw new Error("PAYMENT_ALREADY_RECORDED");
          const previousStatus = String(appointment.data().paymentStatus || "");
          if (legacyNeedsVerification) {
            if (previousStatus !== legacyPaymentStatus || status !== legacyPaymentStatus) {
              throw new Error("LEGACY_STATUS_CHANGED");
            }
          } else if (["Paid", "Discount", "Exempt"].includes(previousStatus)) {
            throw new Error("PAYMENT_ALREADY_RECORDED");
          }
          transaction.update(appointmentRef, {
            paymentId,
            paymentStatus: status,
            paymentDetails,
          });
        }

        transaction.set(paymentRef, {
          paymentId,
          appointmentId: appointmentId || "",
          patientName: patient.trim(),
          paymentStatus: status,
          paymentDetails,
          createdAt: serverTimestamp(),
        });
      });
      setAlreadyCleared(true);
      setExistingStatus(status);
      setLegacyNeedsVerification(false);

      const record = {
        id: paymentId,
        patient: patient.trim(),
        ...paymentDetails,
        confirmedAt,
        status,
      };
      try {
        const old = JSON.parse(localStorage.getItem("nmb_payments") || "[]");
        localStorage.setItem("nmb_payments", JSON.stringify([record, ...old]));
        localStorage.setItem("nmb_rx_patient", patient.trim());
      } catch {
        // The database record is authoritative; local history is only a convenience.
      }

      router.push(`${destination.pathname}${destination.search}${destination.hash}`);
    } catch (error) {
      if (error instanceof Error && error.message === "PAYMENT_ALREADY_RECORDED") {
        setAlreadyCleared(true);
        setExistingStatus("Recorded");
        alert("A payment clearance already exists for this visit. It was not overwritten.");
        return;
      }
      if (error instanceof Error && error.message === "APPOINTMENT_NOT_FOUND") {
        alert("Appointment was not found; payment was not cleared.");
        return;
      }
      if (error instanceof Error && error.message === "LEGACY_STATUS_CHANGED") {
        alert("The existing payment status changed. Reload the appointment before continuing.");
        return;
      }
      alert("Payment record could not be saved. Payment was not cleared.");
    } finally {
      savingRef.current = false;
      setSaving(false);
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
          disabled={Boolean(appointmentId)}
          style={input}
        >
          {SERVICES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label.en} - ₹{item.fee}
            </option>
          ))}
        </select>

        <label>
          <b>Payment Status</b>
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={legacyNeedsVerification || alreadyCleared}
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

        {alreadyCleared && (
          <div role="status" style={{ color: "#166534", fontWeight: 700 }}>
            Payment clearance already recorded: {existingStatus}. Existing history was preserved.
          </div>
        )}

        {legacyNeedsVerification && (
          <div role="alert" style={{ color: "#92400e", fontWeight: 700 }}>
            Existing {legacyPaymentStatus} status needs doctor verification. This adds its history record without collecting another payment.
          </div>
        )}

        <button
          onClick={savePayment}
          disabled={saving || alreadyCleared || appointmentLoading}
          style={{
            border: 0,
            borderRadius: 9,
            padding: 13,
            background: "#176b87",
            color: "white",
            fontWeight: 700,
            cursor: saving || alreadyCleared || appointmentLoading ? "not-allowed" : "pointer",
            opacity: saving || alreadyCleared || appointmentLoading ? 0.65 : 1,
          }}
        >
          {appointmentLoading
            ? "Loading Appointment..."
            : saving
              ? "Saving..."
                : legacyNeedsVerification
                  ? "Verify Existing Clearance"
                  : alreadyCleared
                ? "Payment Already Recorded"
                : "Save & Continue to E-Prescription"}
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
