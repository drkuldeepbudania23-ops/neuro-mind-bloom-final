/**
 * Video providers for consultations — pure helpers (unit-tested).
 *
 *  meet   — Google Meet: doctor creates the link (meet.google.com/new) and pastes it once;
 *           free personal accounts allow 1-to-1 calls up to 24 h (3+ people: 60 min)
 *  daily  — Daily.co, private room embedded in the website (free: 10,000 participant-minutes/month)
 *  zoom   — Zoom meeting created automatically; opens in the Zoom app (patients know it)
 *  jaas   — 8x8 Jitsi as a Service, embedded (free: 25 monthly users)
 *  jitsi  — free public meet.jit.si, embedded (doctor may have to sign in) — always available
 */

export type VideoProvider = "meet" | "daily" | "zoom" | "jaas" | "jitsi";

export const PROVIDER_LABELS: Record<VideoProvider, string> = {
  meet: "Google Meet",
  daily: "Website video (Daily)",
  zoom: "Zoom",
  jaas: "Website video (JaaS)",
  jitsi: "Jitsi (free backup)",
};

/** Default order: Google Meet (free, familiar), embedded rooms, Zoom, then the always-available backup. */
export const PROVIDER_ORDER: VideoProvider[] = ["meet", "daily", "jaas", "zoom", "jitsi"];

/** Accepts only real Google Meet meeting links, e.g. https://meet.google.com/abc-defg-hij */
export function normaliseMeetUrl(value: unknown): string | null {
  const v = String(value ?? "").trim();
  const m = /^(?:https?:\/\/)?meet\.google\.com\/([a-z]{3}-[a-z]{4}-[a-z]{3})(?:[/?#].*)?$/i.exec(v);
  return m ? `https://meet.google.com/${m[1].toLowerCase()}` : null;
}

export function isProvider(value: unknown): value is VideoProvider {
  return typeof value === "string" && (PROVIDER_ORDER as string[]).includes(value);
}

export function pickProvider(
  requested: unknown,
  saved: unknown,
  configured: VideoProvider[],
  envDefault?: string
): VideoProvider {
  for (const candidate of [requested, saved, envDefault]) {
    if (isProvider(candidate) && configured.includes(candidate)) return candidate;
  }
  return PROVIDER_ORDER.find((p) => configured.includes(p)) ?? "jitsi";
}

/**
 * "2026-10-14" + "10:30" (India time) → "2026-10-14T10:30:00" for Zoom with timezone Asia/Kolkata.
 * Returns null if the appointment has no usable date/time.
 */
export function zoomStartTime(date: string | undefined, time: string | undefined): string | null {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(date || "").trim());
  if (!d) return null;
  const t = /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i.exec(String(time || "").trim());
  let hh = 10;
  let mm = 0;
  if (t) {
    hh = Number(t[1]);
    mm = Number(t[2]);
    const ap = t[3]?.toLowerCase();
    if (ap === "pm" && hh < 12) hh += 12;
    if (ap === "am" && hh === 12) hh = 0;
    if (hh > 23 || mm > 59) return null;
  }
  return `${d[1]}-${d[2]}-${d[3]}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
}

export function zoomMeetingPayload(params: { topic: string; date?: string; time?: string; durationMinutes?: number }) {
  const start = zoomStartTime(params.date, params.time);
  return {
    topic: params.topic.slice(0, 190),
    type: start ? 2 : 1, // 2 = scheduled, 1 = instant
    ...(start ? { start_time: start, timezone: "Asia/Kolkata" } : {}),
    duration: params.durationMinutes ?? 30,
    agenda: "Neuro Mind Bloom consultation",
    settings: {
      waiting_room: true, // doctor admits the patient
      join_before_host: false,
      host_video: true,
      participant_video: true,
      mute_upon_entry: false,
      auto_recording: "none",
      approval_type: 2,
      meeting_authentication: false, // patient does not need a Zoom account
    },
  };
}

/** Daily room settings: private (token required), no recording, pre-join camera check. */
export function dailyRoomPayload(name: string, nowSeconds: number) {
  return {
    name,
    privacy: "private",
    properties: {
      exp: nowSeconds + 14 * 24 * 60 * 60,
      enable_prejoin_ui: true,
      enable_chat: true,
      enable_screenshare: true,
      enable_recording: false,
      start_video_off: false,
      lang: "en",
    },
  };
}

export function dailyTokenPayload(params: { room: string; userName: string; owner: boolean; nowSeconds: number; ttlSeconds: number }) {
  return {
    properties: {
      room_name: params.room,
      user_name: params.userName.slice(0, 60),
      is_owner: params.owner,
      exp: params.nowSeconds + params.ttlSeconds,
      enable_recording: false,
    },
  };
}

export function dailyRoomUrl(roomUrl: string, token: string): string {
  return `${roomUrl}?t=${encodeURIComponent(token)}`;
}
