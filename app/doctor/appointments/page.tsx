"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import SendPaymentQR from "../../../components/doctor/SendPaymentQR";
import { logAction } from "../../../lib/client/audit";
import {
  addDays,
  apptDate,
  dayLabel,
  filterAppointments,
  groupByDay,
  paymentBadge,
  statusOf,
  type Range,
  type StatusFilter,
} from "../../../lib/appointments";
import { istDate } from "../../../lib/notifications/templates";

type Appointment = {
  id: string;
  name?: string;
  patientName?: string;
  mobile?: string;
  email?: string;
  age?: string | number;
  gender?: string;
  date?: string;
  preferredDate?: string;
  time?: string;
  preferredTime?: string;
  mode?: string;
  service?: string;
  source?: string;
  status?: string;
  concern?: string;
  paymentStatus?: string;
  serviceCode?: string;
  language?: string;
  createdAt?: any;
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");
  const today = istDate();
  const [range, setRange] = useState<Range>("upcoming");
  const [pickedDate, setPickedDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [moving, setMoving] = useState<{ id: string; date: string; time: string } | null>(null);

  useEffect(() => {
    const ref = collection(db, "appointments");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const rows: Appointment[] = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Appointment, "id">),
        }));

        rows.sort((a, b) => {
          const aTime =
            a.createdAt?.toMillis?.() ??
            (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0);

          const bTime =
            b.createdAt?.toMillis?.() ??
            (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0);

          return bTime - aTime;
        });

        setAppointments(rows);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error(err);
        setError("Appointments load nahi ho pa rahe.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const total = appointments.length;

  const pending = useMemo(
    () =>
      appointments.filter((item) => {
        const status = (item.status || "pending").toLowerCase();
        return status === "pending" || status === "new";
      }).length,
    [appointments]
  );

  const visible = useMemo(
    () => filterAppointments(appointments, { range, date: pickedDate, status: statusFilter, query: search, today }),
    [appointments, range, pickedDate, statusFilter, search, today]
  );
  const groups = useMemo(() => groupByDay(visible, range === "all"), [visible, range]);
  const week = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = addDays(today, i);
        const items = appointments.filter((a) => apptDate(a) === d && statusOf(a) !== "cancelled");
        return { d, count: items.length };
      }),
    [appointments, today]
  );
  const todayCount = week[0].count;
  const unpaidConfirmed = appointments.filter(
    (a) => statusOf(a) === "confirmed" && !["Paid", "Discount", "Exempt"].includes(a.paymentStatus || "")
  ).length;

  async function saveReschedule() {
    if (!moving || !/^\d{4}-\d{2}-\d{2}$/.test(moving.date)) {
      alert("Choose a date.");
      return;
    }
    try {
      setUpdating(moving.id);
      await updateDoc(doc(db, "appointments", moving.id), {
        date: moving.date,
        preferredDate: moving.date,
        time: moving.time,
        preferredTime: moving.time,
        rescheduledAt: serverTimestamp(),
      });
      logAction("appointment.rescheduled", { appointmentId: moving.id, date: moving.date, time: moving.time });
      const user = auth.currentUser;
      if (user) {
        fetch("/api/notify/doctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: await user.getIdToken(), appointmentId: moving.id, kind: "rescheduled" }),
        }).catch(() => {});
      }
      setMoving(null);
    } catch (err) {
      console.error(err);
      alert("Date/time update nahi ho paya.");
    } finally {
      setUpdating("");
    }
  }

  async function changeStatus(id: string, status: string) {
    if ((status === "cancelled" || status === "completed") && !window.confirm(`Mark this appointment as ${status}?`)) return;
    try {
      setUpdating(id);
      await updateDoc(doc(db, "appointments", id), { status });
      logAction("appointment.status", { appointmentId: id, status });
      if (status === "confirmed") {
        // Automatic WhatsApp + email "appointment confirmed" (skipped if not configured).
        const user = auth.currentUser;
        if (user) {
          fetch("/api/notify/doctor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: await user.getIdToken(), appointmentId: id, kind: "confirmed" }),
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.error(err);
      alert("Status update nahi ho paya.");
    } finally {
      setUpdating("");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: 24,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={headerCard}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Patient Appointments</h1>
          <p style={{ color: "#555" }}>Neuro Mind Bloom Doctor Dashboard</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={statStyle}>
              <b>Total Appointments</b>
              <div style={numberStyle}>{total}</div>
            </div>

            <button
              type="button"
              onClick={() => { setRange("all"); setStatusFilter("pending"); }}
              style={{ ...statStyle, border: 0, textAlign: "left", cursor: "pointer", font: "inherit" }}
              title="Show all pending requests"
            >
              <b>Pending</b>
              <div style={numberStyle}>{pending}</div>
            </button>

            <div style={statStyle}>
              <b>Today</b>
              <div style={numberStyle}>{todayCount}</div>
            </div>

            <div style={statStyle}>
              <b>Confirmed · unpaid</b>
              <div style={{ ...numberStyle, color: unpaidConfirmed ? "#9a3412" : undefined }}>{unpaidConfirmed}</div>
            </div>
          </div>

          {/* Next 7 days at a glance — tap a day to see it */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 6, marginTop: 18 }}>
            {week.map(({ d, count }) => {
              const active = range === "date" && pickedDate === d;
              const dt = new Date(`${d}T00:00:00Z`);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => { setRange("date"); setPickedDate(d); }}
                  style={{
                    border: active ? "2px solid #0f5c4d" : "1px solid #e2e8f0",
                    background: active ? "#e6f2ef" : d === today ? "#f8fafc" : "white",
                    borderRadius: 10,
                    padding: "8px 4px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#55606b" }}>{dt.toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" })}</div>
                  <div style={{ fontWeight: 800 }}>{dt.getUTCDate()}</div>
                  <div style={{ fontSize: 12, color: count ? "#0f5c4d" : "#94a3b8", fontWeight: 700 }}>{count || "–"}</div>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 14 }}>
            {([
              ["today", "Today"],
              ["tomorrow", "Tomorrow"],
              ["week", "Next 7 days"],
              ["upcoming", "Upcoming"],
              ["all", "All"],
            ] as [Range, string][]).map(([r, label]) => (
              <button key={r} type="button" onClick={() => setRange(r)} style={range === r ? chipActive : chip}>
                {label}
              </button>
            ))}
            <input
              type="date"
              value={pickedDate}
              onChange={(e) => { setPickedDate(e.target.value); setRange("date"); }}
              style={{ ...chip, padding: "6px 10px" }}
              aria-label="Pick a date"
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} style={{ ...chip, padding: "7px 10px" }}>
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, concern"
              style={{ ...chip, padding: "7px 12px", flex: "1 1 200px", minWidth: 180 }}
            />
          </div>
        </div>

        {loading && <div style={messageStyle}>Appointments loading...</div>}
        {error && <div style={{ ...messageStyle, color: "red" }}>{error}</div>}

        {!loading && !error && visible.length === 0 && (
          <div style={messageStyle}>No appointments for this filter.</div>
        )}

        {groups.map((group) => (
        <section key={group.date || "none"} style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, margin: "8px 4px 10px", color: group.date === today ? "#0f5c4d" : "#334155" }}>
            {dayLabel(group.date, today)} <span style={{ color: "#94a3b8", fontWeight: 500 }}>({group.items.length})</span>
          </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {group.items.map((appointment) => {
            const status = appointment.status || "pending";
            const badge = paymentBadge(appointment.paymentStatus);

            return (
              <div key={appointment.id} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ marginTop: 0 }}>
                      {appointment.name || appointment.patientName || "Patient"}
                    </h2>

                    <div><b>Mobile:</b> {appointment.mobile || "-"}</div>
                    <div><b>Email:</b> {appointment.email || "-"}</div>
                    <div>
                      <b>Age/Gender:</b> {appointment.age || "-"} /{" "}
                      {appointment.gender || "-"}
                    </div>

                    {appointment.concern && (
                      <div style={{ marginTop: 10 }}>
                        <b>Concern:</b> {appointment.concern}
                      </div>
                    )}
                  </div>

                  <div>
                    <div><b>Date:</b> {appointment.date || appointment.preferredDate || "-"}</div>
                    <div><b>Time:</b> {appointment.time || appointment.preferredTime || "-"}</div>
                    <div><b>Mode:</b> {appointment.mode || appointment.source || "-"}</div>

                    <div style={{ marginTop: 8 }}>
                      <b>Status:</b>{" "}
                      <span style={{ fontWeight: 800, textTransform: "capitalize" }}>
                        {status}
                      </span>
                    </div>

                    <div style={{ marginTop: 4 }}>
                      <b>Payment:</b>{" "}
                      <span style={{ background: badge.bg, color: badge.color, fontWeight: 700, padding: "2px 10px", borderRadius: 999, fontSize: 13 }}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 16,
                    borderTop: "1px solid #eee",
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {status.toLowerCase() !== "confirmed" && (
                    <button
                      onClick={() => changeStatus(appointment.id, "confirmed")}
                      disabled={updating === appointment.id}
                      style={buttonStyle}
                    >
                      {updating === appointment.id
                        ? "Updating..."
                        : "Confirm Appointment"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setMoving({
                        id: appointment.id,
                        date: apptDate(appointment) || today,
                        time: appointment.time || appointment.preferredTime || "",
                      })
                    }
                    style={{ ...linkButton, border: 0, cursor: "pointer", font: "inherit", fontWeight: 700 }}
                  >
                    Reschedule
                  </button>

                  {statusOf(appointment) === "confirmed" && (
                    <button type="button" onClick={() => changeStatus(appointment.id, "completed")} style={{ ...linkButton, border: 0, cursor: "pointer", font: "inherit", fontWeight: 700 }}>
                      Mark completed
                    </button>
                  )}

                  {statusOf(appointment) !== "cancelled" && statusOf(appointment) !== "completed" && (
                    <button type="button" onClick={() => changeStatus(appointment.id, "cancelled")} style={{ ...linkButton, border: 0, cursor: "pointer", font: "inherit", fontWeight: 700, color: "#b91c1c" }}>
                      Cancel
                    </button>
                  )}

                  <Link
                    href={`/doctor/prescription?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    E-Prescription
                  </Link>

                  <Link
                    href={`/doctor/follow-up?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    Follow-up
                  </Link>

                  <Link
                    href={`/doctor/payment?appointmentId=${appointment.id}`}
                    style={linkButton}
                  >
                    Payment
                  </Link>

                  {appointment.mobile && (
                    <a
                      href={`https://wa.me/91${appointment.mobile
                        .replace(/\D/g, "")
                        .slice(-10)}?text=${encodeURIComponent(
                        `Namaste ${appointment.name || appointment.patientName || "Patient"}, your Neuro Mind Bloom appointment ${status.toLowerCase() === "confirmed" ? "is confirmed" : "request has been received"}${appointment.date || appointment.preferredDate ? ` for ${appointment.date || appointment.preferredDate}` : ""}${appointment.time || appointment.preferredTime ? ` at ${appointment.time || appointment.preferredTime}` : ""}. For assistance, please reply to this WhatsApp message.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      style={whatsappButton}
                    >
                      WhatsApp Patient
                    </a>
                  )}

                  {moving?.id === appointment.id && (
                    <div style={{ width: "100%", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", background: "#f8fafc", padding: 12, borderRadius: 10 }}>
                      <b>New date/time:</b>
                      <input type="date" value={moving.date} min={today} onChange={(e) => setMoving({ ...moving, date: e.target.value })} style={{ padding: 8, borderRadius: 8, border: "1px solid #cbd5e1" }} />
                      <input type="time" value={moving.time} onChange={(e) => setMoving({ ...moving, time: e.target.value })} style={{ padding: 8, borderRadius: 8, border: "1px solid #cbd5e1" }} />
                      <button type="button" onClick={saveReschedule} disabled={updating === appointment.id} style={buttonStyle}>
                        {updating === appointment.id ? "Saving…" : "Save & notify patient"}
                      </button>
                      <button type="button" onClick={() => setMoving(null)} style={{ ...linkButton, border: 0, cursor: "pointer", font: "inherit", fontWeight: 700 }}>Close</button>
                    </div>
                  )}

                  {status.toLowerCase() === "confirmed" &&
                    !["Paid", "Discount", "Exempt"].includes(appointment.paymentStatus || "") && (
                      <SendPaymentQR appointment={appointment} />
                    )}
                </div>
              </div>
            );
          })}
        </div>
        </section>
        ))}
      </div>
    </main>
  );
}

const headerCard = {
  background: "white",
  padding: 24,
  borderRadius: 16,
  marginBottom: 20,
  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
};

const statStyle = {
  background: "#f1f3f5",
  padding: "14px 18px",
  borderRadius: 12,
  minWidth: 170,
};

const numberStyle = {
  fontSize: 26,
  fontWeight: 800,
  marginTop: 5,
};

const messageStyle = {
  background: "white",
  padding: 20,
  borderRadius: 14,
  marginBottom: 16,
};

const cardStyle = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
};

const buttonStyle = {
  border: 0,
  borderRadius: 8,
  padding: "10px 15px",
  cursor: "pointer",
  fontWeight: 700,
  background: "#111827",
  color: "white",
};

const linkButton = {
  textDecoration: "none",
  borderRadius: 8,
  padding: "10px 15px",
  fontWeight: 700,
  background: "#e9eef5",
  color: "#111",
};

const chip = {
  border: "1px solid #cbd5e1",
  background: "white",
  borderRadius: 999,
  padding: "7px 14px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
} as const;

const chipActive = { ...chip, background: "#0f5c4d", color: "white", borderColor: "#0f5c4d" } as const;

const whatsappButton = {
  textDecoration: "none",
  borderRadius: 8,
  padding: "10px 15px",
  fontWeight: 700,
  background: "#128C7E",
  color: "white",
};

