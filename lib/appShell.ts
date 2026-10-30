/**
 * The Android/iPhone apps (Capacitor) load the live website and append this
 * marker to their user-agent (see capacitor.config.ts). Residents' learning
 * content is served only inside the app; purchases happen only on the website
 * (/residents/join), so the app never shows prices, buy buttons or payment links.
 */
export const APP_UA_MARKER = "NeuroMindBloomApp";

export function isAppUserAgent(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent && userAgent.includes(APP_UA_MARKER));
}

/** Client-side check: user-agent marker, or the Capacitor bridge (older app builds without the marker). */
export function isInApp(): boolean {
  if (typeof window === "undefined") return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return isAppUserAgent(window.navigator.userAgent) || Boolean(cap?.isNativePlatform?.());
}

/** Where residents pay (website only). Sent to residents by the doctor, e.g. on WhatsApp. */
export const RESIDENT_JOIN_PATH = "/residents/join";
export const RESIDENT_APP_PATH = "/residents/app";
