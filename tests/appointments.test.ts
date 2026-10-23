import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, apptDate, dayLabel, filterAppointments, groupByDay, paymentBadge, statusOf, timeKey } from "../lib/appointments";

const today = "2026-10-12";
const list = [
  { id: "a", patientName: "Ramesh", mobile: "+91 98765 43210", preferredDate: "2026-10-12", preferredTime: "16:30", status: "confirmed", paymentStatus: "Paid" },
  { id: "b", patientName: "Sita", preferredDate: "2026-10-12", preferredTime: "10:00" },
  { id: "c", patientName: "Mohan", date: "2026-10-13", time: "11:00", status: "cancelled" },
  { id: "d", patientName: "Old", preferredDate: "2026-10-01", status: "completed" },
  { id: "e", patientName: "Nodate", concern: "neend nahi aati" },
  { id: "f", patientName: "Week", preferredDate: "2026-10-18" },
  { id: "g", patientName: "Later", preferredDate: "2026-11-30" },
];

test("date ranges", () => {
  const ids = (range: any, extra = {}) => filterAppointments(list, { range, status: "all", query: "", today, ...extra }).map((a) => a.id).sort().join("");
  assert.equal(ids("today"), "ab");
  assert.equal(ids("tomorrow"), "c");
  assert.equal(ids("week"), "abcf");
  assert.equal(ids("upcoming"), "abcfg");
  assert.equal(ids("all"), "abcdefg");
  assert.equal(ids("date", { date: "2026-10-01" }), "d");
});

test("status and search (name, concern, phone digits)", () => {
  const f = (status: any, query = "") => filterAppointments(list, { range: "all", status, query, today }).map((a) => a.id).join("");
  assert.equal(f("pending"), "befg");
  assert.equal(f("cancelled"), "c");
  assert.equal(f("all", "neend"), "e");
  assert.equal(f("all", "43210"), "a");
  assert.equal(f("all", "ramesh"), "a");
});

test("grouping sorts days and times; helpers", () => {
  const g = groupByDay(list.filter((a) => ["a", "b", "c", "e"].includes(a.id)));
  assert.deepEqual(g.map((x) => x.date), ["2026-10-12", "2026-10-13", ""]);
  assert.deepEqual(g[0].items.map((a) => a.id), ["b", "a"]); // 10:00 before 16:30
  assert.equal(timeKey("4:05 pm"), 16 * 60 + 5);
  assert.equal(timeKey("Evening"), 18 * 60);
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(apptDate({ id: "x", preferredDate: "12/10/2026" }), "");
  assert.equal(statusOf({ id: "x", status: "Rejected" }), "cancelled");
  assert.equal(paymentBadge("Exempt").label, "Exempted");
  assert.equal(paymentBadge(undefined).label, "Unpaid");
  assert.match(dayLabel("2026-10-12", today), /^Today · Mon, 12 Oct,? 2026$/);
  assert.equal(dayLabel("", today), "No date given");
});
