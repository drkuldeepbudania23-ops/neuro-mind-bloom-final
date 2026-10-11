"use client";

import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function EpinResetButton({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function close() {
    setOpen(false);
    setRecovery(false);
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    setPassword("");
    setMessage("");
  }

  async function resetPin() {
    setMessage("");
    if (!/^\d{8}$/.test(newPin)) {
      setMessage("New E-Sign PIN must be exactly 8 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      setMessage("The new PIN entries do not match.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage("Doctor login is required.");
      return;
    }

    try {
      setBusy(true);
      if (recovery) {
        if (!user.email || !password) {
          setMessage("Enter your doctor account password to recover the PIN.");
          return;
        }
        await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, password)
        );
      }

      const response = await fetch("/api/esign/reset-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: recovery ? "recover" : "change",
          currentPin: recovery ? undefined : currentPin,
          pin: newPin,
          idToken: await user.getIdToken(true),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setMessage(result.error || "Unable to reset E-Sign PIN.");
        return;
      }
      close();
      alert("E-Sign PIN updated successfully.");
    } catch {
      setMessage(
        recovery
          ? "Reauthentication failed. Check your doctor account password."
          : "Unable to reset E-Sign PIN. Verify the current PIN and try again."
      );
    } finally {
      setBusy(false);
    }
  }

  const pinInput: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
  };

  return (
    <>
      <button type="button" style={style || buttonStyle} onClick={() => setOpen(true)}>
        Reset E-PIN
      </button>
      {open && (
        <div style={overlayStyle}>
          <section role="dialog" aria-modal="true" aria-labelledby="epin-reset-title" style={dialogStyle}>
            <h2 id="epin-reset-title" style={{ marginTop: 0 }}>Reset E-PIN</h2>
            {recovery ? (
              <>
                <p>Reauthenticate with your doctor account password to recover your E-Sign PIN.</p>
                <label style={fieldStyle}>
                  Doctor account password
                  <input
                    style={pinInput}
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
              </>
            ) : (
              <label style={fieldStyle}>
                Current 8-digit E-Sign PIN
                <input
                  style={pinInput}
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  value={currentPin}
                  onChange={(event) => setCurrentPin(event.target.value.replace(/\D/g, "").slice(0, 8))}
                />
              </label>
            )}
            <label style={fieldStyle}>
              New 8-digit E-Sign PIN
              <input
                style={pinInput}
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                value={newPin}
                onChange={(event) => setNewPin(event.target.value.replace(/\D/g, "").slice(0, 8))}
              />
            </label>
            <label style={fieldStyle}>
              Confirm new E-Sign PIN
              <input
                style={pinInput}
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                value={confirmPin}
                onChange={(event) => setConfirmPin(event.target.value.replace(/\D/g, "").slice(0, 8))}
              />
            </label>
            {message && <div role="alert" style={{ color: "#b91c1c", marginBottom: 12 }}>{message}</div>}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" style={buttonStyle} onClick={resetPin} disabled={busy}>
                {busy ? "Updating..." : "Update E-PIN"}
              </button>
              <button type="button" style={cancelStyle} onClick={close} disabled={busy}>
                Cancel
              </button>
              <button
                type="button"
                style={textButtonStyle}
                onClick={() => {
                  setRecovery((value) => !value);
                  setMessage("");
                }}
                disabled={busy}
              >
                {recovery ? "I know my current PIN" : "Forgot current PIN?"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

const buttonStyle: React.CSSProperties = {
  border: "1px solid #176b87",
  borderRadius: 8,
  padding: "10px 14px",
  background: "#fff",
  color: "#176b87",
  fontWeight: 700,
  cursor: "pointer",
};

const cancelStyle: React.CSSProperties = {
  ...buttonStyle,
  borderColor: "#cbd5e1",
  color: "#334155",
};

const textButtonStyle: React.CSSProperties = {
  border: 0,
  background: "transparent",
  color: "#176b87",
  fontWeight: 700,
  cursor: "pointer",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "grid",
  placeItems: "center",
  padding: 16,
  background: "rgba(15, 23, 42, 0.45)",
};

const dialogStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 440,
  maxHeight: "90vh",
  overflowY: "auto",
  boxSizing: "border-box",
  padding: 22,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const fieldStyle: React.CSSProperties = {
  display: "grid",
  gap: 6,
  marginBottom: 14,
  fontWeight: 700,
};