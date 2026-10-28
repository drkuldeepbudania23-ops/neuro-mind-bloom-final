import { CLINIC } from "./site";

/**
 * Email links for the doctor dashboard.
 *
 * `mailto:` only works when the computer has a default mail app set up. On a
 * Windows PC where the clinic uses Gmail in the browser, clicking a mailto link
 * does nothing — so the dashboard opens Gmail's compose window instead and
 * keeps mailto as a secondary "other mail app" option.
 */
export type EmailDraft = { to: string; subject: string; body: string };

export function gmailComposeUrl({ to, subject, body }: EmailDraft): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: to.trim(),
    su: subject,
    body,
    // Opens the clinic Gmail account even if several accounts are signed in.
    authuser: CLINIC.email,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function mailtoUrl({ to, subject, body }: EmailDraft): string {
  return `mailto:${to.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
