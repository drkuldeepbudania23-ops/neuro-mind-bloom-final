import { createHmac, createSign } from "node:crypto";

/**
 * Jitsi as a Service (8x8 JaaS) helpers — pure, unit-tested.
 * JaaS rooms only open with a JWT signed by OUR private key, so strangers
 * cannot join, the doctor is moderator without any Jitsi login, and the
 * patient joins without an account.
 */

export const JAAS_DOMAIN = "8x8.vc";

function b64url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

/** Unguessable room name derived from the appointment id (the id alone is not enough). */
export function roomNameFor(appointmentId: string, secret: string): string {
  const mac = createHmac("sha256", secret || "nmb-video").update(`room:${appointmentId}`).digest("hex");
  return `nmb-${mac.slice(0, 24)}`;
}

export type JaasUser = { id: string; name: string; email?: string; moderator: boolean };

export function buildJaasJwt(params: {
  appId: string;
  apiKeyId: string;
  privateKeyPem: string;
  room: string;
  user: JaasUser;
  now?: Date;
  ttlSeconds?: number;
}): string {
  const now = Math.floor((params.now ?? new Date()).getTime() / 1000);
  const header = { alg: "RS256", typ: "JWT", kid: `${params.appId}/${params.apiKeyId}` };
  const payload = {
    aud: "jitsi",
    iss: "chat",
    sub: params.appId,
    room: params.room,
    iat: now,
    nbf: now - 10,
    exp: now + (params.ttlSeconds ?? 3 * 60 * 60),
    context: {
      user: {
        id: params.user.id,
        name: params.user.name.slice(0, 60),
        email: params.user.email || "",
        avatar: "",
        moderator: params.user.moderator,
        "hidden-from-recorder": false,
      },
      // Recording, streaming and dial-out stay OFF for patient privacy.
      features: { livestreaming: false, recording: false, transcription: false, "outbound-call": false, "sip-outbound-call": false },
    },
  };
  const input = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const signature = createSign("RSA-SHA256").update(input).sign(params.privateKeyPem);
  return `${input}.${b64url(signature)}`;
}

/** Jitsi URL options: no "download the app" page on phones, ask for camera/mic first. */
export const JITSI_HASH = "#config.disableDeepLinking=true&config.prejoinConfig.enabled=true&interfaceConfig.SHOW_PROMOTIONAL_CLOSE_PAGE=false";

export function jaasRoomUrl(appId: string, room: string, jwt: string): string {
  return `https://${JAAS_DOMAIN}/${appId}/${room}?jwt=${encodeURIComponent(jwt)}${JITSI_HASH}`;
}

/** Old behaviour (free meet.jit.si) — used only until JaaS keys are added. */
export function publicJitsiUrl(appointmentId: string): string {
  const safe = String(appointmentId || "consultation").replace(/[^a-zA-Z0-9_-]/g, "");
  return `https://meet.jit.si/NeuroMindBloom-${safe}${JITSI_HASH}`;
}

/** Accepts the PEM as-is, with literal "\n", or base64-encoded. */
export function normalisePem(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (v.includes("BEGIN")) return v.replace(/\\n/g, "\n").trim();
  try {
    const decoded = Buffer.from(v, "base64").toString("utf8");
    return decoded.includes("BEGIN") ? decoded.trim() : "";
  } catch {
    return "";
  }
}
