"use client";

import { useState } from "react";
import { api } from "../../lib/client/residentApi";
import { loadRazorpay } from "../../lib/client/razorpayCheckout";
import type { Plan } from "../../lib/residents";
import { formatINR } from "../../lib/site";
import { card, primaryBtn } from "./ui";

type OrderResponse = {
  order: { id: string; amount: number; currency: string };
  keyId: string;
  description: string;
  prefill: Record<string, string>;
};

export default function Plans({ plans, renew, onPaid }: { plans: Plan[]; renew: boolean; onPaid: () => void }) {
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  async function buy(plan: Plan) {
    setMsg("");
    setBusy(plan.id);
    try {
      const { data } = await api<OrderResponse>("/api/residents/order", { body: { planId: plan.id } });
      const Razorpay = await loadRazorpay();
      if (!data.ok || !Razorpay) {
        setMsg(data.error === "not-configured" ? "Online payment is not set up yet." : "Could not start the payment. Please try again.");
        return;
      }
      await new Promise<void>((resolve) => {
        const checkout = new Razorpay({
          key: data.keyId,
          amount: data.order.amount,
          currency: data.order.currency,
          order_id: data.order.id,
          name: "Neuro Mind Bloom",
          description: data.description,
          prefill: data.prefill,
          theme: { color: "#0b746f" },
          handler: async (response: Record<string, string>) => {
            const verify = await api("/api/residents/verify", { body: response });
            if (verify.data.ok) {
              setMsg("Payment received — your access is active.");
              onPaid();
            } else {
              // The webhook still records it; ask them to refresh shortly.
              setMsg("Payment done. Activation is taking a moment — please refresh in a minute.");
            }
            resolve();
          },
          modal: { ondismiss: () => resolve() },
        });
        checkout.on("payment.failed", () => {
          setMsg("Payment failed. No money was taken; please try again.");
          resolve();
        });
        checkout.open();
      });
    } finally {
      setBusy("");
    }
  }

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, color: "#062b31" }}>{renew ? "Renew your access" : "Choose a plan"}</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {plans.map((p) => (
          <div key={p.id} style={{ border: "1px solid #d4ebe8", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 700, color: "#0b746f" }}>{p.label.en}</div>
            <div style={{ fontSize: 28, fontWeight: 700, margin: "4px 0" }}>{formatINR(p.price)}</div>
            <div style={{ color: "#475569", fontSize: 14 }}>{p.days} days of full access</div>
            <button type="button" disabled={Boolean(busy)} onClick={() => buy(p)} style={{ ...primaryBtn, width: "100%", marginTop: 12 }}>
              {busy === p.id ? "Opening…" : `Pay ${formatINR(p.price)}`}
            </button>
          </div>
        ))}
      </div>
      {renew && <p style={{ color: "#475569", fontSize: 14 }}>Renewing early adds the days on top of your remaining access.</p>}
      {msg && <p role="status" style={{ fontWeight: 700 }}>{msg}</p>}
    </div>
  );
}
