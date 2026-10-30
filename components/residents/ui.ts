import type { CSSProperties } from "react";

/** Inline styles shared by the residents' app pages (same palette as the website). */
export const page: CSSProperties = { minHeight: "100vh", background: "#faf7f1", padding: "16px", fontFamily: "inherit", color: "#10243b" };
export const card: CSSProperties = { background: "white", border: "1px solid #d4ebe8", borderRadius: 16, padding: 20, boxSizing: "border-box" };
export const label: CSSProperties = { display: "block", fontWeight: 700, marginTop: 14, marginBottom: 4 };
export const field: CSSProperties = { width: "100%", padding: "11px 12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 16, boxSizing: "border-box", background: "white" };
export const primaryBtn: CSSProperties = { padding: "12px 18px", borderRadius: 999, border: "none", background: "#0b746f", color: "white", fontWeight: 700, fontSize: 16, cursor: "pointer" };
export const ghostBtn: CSSProperties = { padding: "10px 16px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" };
export const linkBtn: CSSProperties = { background: "none", border: "none", padding: 0, color: "#0b746f", fontWeight: 700, cursor: "pointer", fontSize: 15 };
export const chip = (active: boolean): CSSProperties => ({
  padding: "8px 14px",
  borderRadius: 999,
  border: `1px solid ${active ? "#0b746f" : "#cbd5e1"}`,
  background: active ? "#0b746f" : "white",
  color: active ? "white" : "#10243b",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
});
