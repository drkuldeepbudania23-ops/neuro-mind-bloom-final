import "server-only";
import { adminDb, isAdminConfigured } from "./firebaseAdmin";
import { createRxToken, purposeSecret, verifyRxToken } from "../rx/link";
import { buildJaasJwt, jaasRoomUrl, normalisePem, publicJitsiUrl, roomNameFor } from "../video/jaas";
import {
  dailyRoomPayload,
  dailyRoomUrl,
  dailyTokenPayload,
  normaliseMeetUrl,
  pickProvider,
  zoomMeetingPayload,
  type VideoProvider,
} from "../video/providers";
import { DOCTOR, SITE_URL } from "../site";

const LINK_TTL_DAYS = 30;

// ---------------------------------------------------------------- config
function jaas() {
  const appId = process.env.JAAS_APP_ID || "";
  const apiKeyId = process.env.JAAS_API_KEY_ID || "";
  const privateKeyPem = normalisePem(process.env.JAAS_PRIVATE_KEY || "");
  return { appId, apiKeyId, privateKeyPem, configured: Boolean(appId && apiKeyId && privateKeyPem) };
}

function daily() {
  const apiKey = process.env.DAILY_API_KEY || "";
  return { apiKey, configured: Boolean(apiKey) };
}

function zoom() {
  const accountId = process.env.ZOOM_ACCOUNT_ID || "";
  const clientId = process.env.ZOOM_CLIENT_ID || "";
  const clientSecret = process.env.ZOOM_CLIENT_SECRET || "";
  return { accountId, clientId, clientSecret, configured: Boolean(accountId && clientId && clientSecret) };
}

function linkSecret(): string {
  const s = process.env.RX_LINK_SECRET || "";
  return s.length >= 16 ? purposeSecret(s, "video") : "";
}

/** Providers usable right now. Embedded rooms need RX_LINK_SECRET for signed patient links. */
export function configuredProviders(): VideoProvider[] {
  const list: VideoProvider[] = ["meet"]; // no keys needed
  const signed = Boolean(linkSecret());
  if (daily().configured && signed) list.push("daily");
  if (jaas().configured && signed) list.push("jaas");
  if (zoom().configured) list.push("zoom");
  list.push("jitsi");
  return list;
}

export function isValidAppointmentId(id: string): boolean {
  return /^[A-Za-z0-9_-]{6,64}$/.test(id);
}

/** One patient link for every provider (the doctor can switch provider later). */
export function patientVideoLink(appointmentId: string): string {
  const base = (process.env.PUBLIC_BASE_URL || SITE_URL).replace(/\/$/, "");
  const secret = linkSecret();
  if (!secret) return `${base}/video/${appointmentId}`;
  return `${base}/video/${appointmentId}?k=${createRxToken(appointmentId, secret, LINK_TTL_DAYS)}`;
}

export type Room =
  | { provider: VideoProvider; mode: "embed"; roomUrl: string }
  | { provider: "zoom" | "meet"; mode: "external"; roomUrl: string; hostUrl?: string };
export type RoomResult = Room | { error: string };

// ---------------------------------------------------------------- Daily.co
async function dailyApi(path: string, init: { method: string; body?: unknown }) {
  const response = await fetch(`https://api.daily.co/v1${path}`, {
    method: init.method,
    headers: { Authorization: `Bearer ${daily().apiKey}`, "Content-Type": "application/json" },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: response.ok, status: response.status, data };
}

async function dailyRoom(appointmentId: string, user: { name: string; owner: boolean }, ttlSeconds: number): Promise<RoomResult> {
  const name = roomNameFor(appointmentId, linkSecret());
  const now = Math.floor(Date.now() / 1000);
  let room = await dailyApi(`/rooms/${name}`, { method: "GET" });
  if (!room.ok) {
    if (!user.owner) return { error: "not-started" }; // only the doctor creates the room
    room = await dailyApi("/rooms", { method: "POST", body: dailyRoomPayload(name, now) });
    if (!room.ok) return { error: "provider" };
  }
  const token = await dailyApi("/meeting-tokens", {
    method: "POST",
    body: dailyTokenPayload({ room: name, userName: user.name, owner: user.owner, nowSeconds: now, ttlSeconds }),
  });
  if (!token.ok || typeof token.data.token !== "string" || typeof room.data.url !== "string") return { error: "provider" };
  return { provider: "daily", mode: "embed", roomUrl: dailyRoomUrl(room.data.url, token.data.token) };
}

// ---------------------------------------------------------------- Zoom
async function zoomAccessToken(): Promise<string | null> {
  const cfg = zoom();
  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(cfg.accountId)}`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString("base64")}` },
      cache: "no-store",
    }
  );
  if (!response.ok) return null;
  const data = (await response.json().catch(() => ({}))) as { access_token?: string };
  return data.access_token || null;
}

async function zoomDoctorRoom(appointmentId: string, appointment: Record<string, unknown>): Promise<RoomResult> {
  const access = await zoomAccessToken();
  if (!access) return { error: "provider" };
  const headers = { Authorization: `Bearer ${access}`, "Content-Type": "application/json" };
  const saved = appointment.video as { zoomMeetingId?: number | string } | undefined;

  // Reuse the meeting already created for this appointment (fresh host link each time).
  if (saved?.zoomMeetingId) {
    const existing = await fetch(`https://api.zoom.us/v2/meetings/${encodeURIComponent(String(saved.zoomMeetingId))}`, { headers, cache: "no-store" });
    if (existing.ok) {
      const m = (await existing.json()) as { join_url: string; start_url: string };
      return { provider: "zoom", mode: "external", roomUrl: m.join_url, hostUrl: m.start_url };
    }
  }

  const payload = zoomMeetingPayload({
    topic: `Consultation — ${String(appointment.patientName || appointment.name || "Patient").split(" ")[0]} (Neuro Mind Bloom)`,
    date: String(appointment.date || appointment.preferredDate || ""),
    time: String(appointment.time || appointment.preferredTime || ""),
  });
  const created = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!created.ok) {
    console.error("zoom create failed", created.status, (await created.text().catch(() => "")).slice(0, 300));
    return { error: "provider" };
  }
  const m = (await created.json()) as { id: number; join_url: string; start_url: string };
  await adminDb()
    .collection("appointments")
    .doc(appointmentId)
    .set({ video: { zoomMeetingId: m.id, zoomJoinUrl: m.join_url } }, { merge: true });
  return { provider: "zoom", mode: "external", roomUrl: m.join_url, hostUrl: m.start_url };
}

// ---------------------------------------------------------------- JaaS / Jitsi
function jaasRoom(appointmentId: string, user: { id: string; name: string; moderator: boolean }, ttlSeconds: number): RoomResult {
  const cfg = jaas();
  const room = roomNameFor(appointmentId, linkSecret());
  const jwt = buildJaasJwt({ ...cfg, room, user, ttlSeconds });
  return { provider: "jaas", mode: "embed", roomUrl: jaasRoomUrl(cfg.appId, room, jwt) };
}

// ---------------------------------------------------------------- public API
async function loadAppointment(appointmentId: string) {
  const snap = await adminDb().collection("appointments").doc(appointmentId).get();
  return snap.exists ? snap.data() || {} : null;
}

export async function doctorRoom(
  appointmentId: string,
  doctorUid: string,
  requested?: unknown,
  meetUrlInput?: unknown
): Promise<RoomResult & { providers?: VideoProvider[] }> {
  const providers = configuredProviders();
  const appointment = (await loadAppointment(appointmentId)) || {};
  const provider = pickProvider(requested, appointment.videoProvider, providers, process.env.VIDEO_DEFAULT_PROVIDER);

  // Remember an explicit choice so the patient's (same) link opens the same provider.
  // Automatic defaults are not saved, so adding a new provider later takes effect.
  if (requested && provider === requested && provider !== appointment.videoProvider) {
    await adminDb().collection("appointments").doc(appointmentId).set({ videoProvider: provider }, { merge: true });
  }

  let room: RoomResult;
  if (provider === "meet") {
    let meetUrl = normaliseMeetUrl((appointment.video as { meetUrl?: string } | undefined)?.meetUrl);
    if (meetUrlInput !== undefined && meetUrlInput !== "") {
      const fresh = normaliseMeetUrl(meetUrlInput);
      if (!fresh) return { error: "invalid-meet-link", providers };
      meetUrl = fresh;
      await adminDb()
        .collection("appointments")
        .doc(appointmentId)
        .set({ videoProvider: "meet", video: { meetUrl: fresh } }, { merge: true });
    }
    // roomUrl "" = no Meet link yet → dashboard shows "create / paste link".
    return { provider: "meet", mode: "external", roomUrl: meetUrl || "", providers };
  }
  if (provider === "daily") room = await dailyRoom(appointmentId, { name: DOCTOR.name.en, owner: true }, 4 * 3600);
  else if (provider === "zoom") room = await zoomDoctorRoom(appointmentId, appointment);
  else if (provider === "jaas") room = jaasRoom(appointmentId, { id: doctorUid, name: DOCTOR.name.en, moderator: true }, 4 * 3600);
  else room = { provider: "jitsi", mode: "embed", roomUrl: publicJitsiUrl(appointmentId) };
  return { ...room, providers };
}

export async function patientRoom(appointmentId: string, key: string): Promise<RoomResult> {
  const secret = linkSecret();
  const keyOk = Boolean(secret && key && verifyRxToken(key, secret) === appointmentId);
  if (key && secret && !keyOk) return { error: "invalid-link" };

  const providers = configuredProviders();
  const appointment = isAdminConfigured() ? await loadAppointment(appointmentId) : null;
  const saved = appointment?.videoProvider;
  const provider = pickProvider(undefined, saved, providers, process.env.VIDEO_DEFAULT_PROVIDER);

  const status = String(appointment?.status || "").toLowerCase();
  if (["cancelled", "canceled", "rejected"].includes(status)) return { error: "cancelled" };

  if (provider === "meet") {
    if (secret && !keyOk) return { error: "invalid-link" };
    const meetUrl = normaliseMeetUrl((appointment?.video as { meetUrl?: string } | undefined)?.meetUrl);
    if (!meetUrl) return { error: "not-started" };
    return { provider: "meet", mode: "external", roomUrl: meetUrl };
  }

  // Old-style links (no key) keep working only on the free public Jitsi room.
  if (provider === "jitsi") return { provider: "jitsi", mode: "embed", roomUrl: publicJitsiUrl(appointmentId) };
  if (!keyOk || !appointment) return { error: "invalid-link" };
  const name = String(appointment.patientName || appointment.name || "Patient");

  if (provider === "daily") return dailyRoom(appointmentId, { name, owner: false }, 3 * 3600);
  if (provider === "jaas") return jaasRoom(appointmentId, { id: `patient-${appointmentId}`, name, moderator: false }, 3 * 3600);
  // zoom
  const joinUrl = (appointment.video as { zoomJoinUrl?: string } | undefined)?.zoomJoinUrl;
  if (!joinUrl || !/^https:\/\/([a-z0-9-]+\.)?zoom\.us\//.test(joinUrl)) return { error: "not-started" };
  return { provider: "zoom", mode: "external", roomUrl: joinUrl };
}

