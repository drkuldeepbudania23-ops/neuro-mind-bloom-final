import "server-only";
import {
  isEmail,
  renderNotification,
  toWhatsAppNumber,
  type Lang,
  type NotificationData,
  type NotificationKind,
} from "../notifications/templates";

/**
 * Sends notifications through:
 *  - WhatsApp Cloud API (Meta) — WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID
 *  - Email via Resend           — RESEND_API_KEY + EMAIL_FROM
 * If a channel is not configured it is SKIPPED (never throws), so the site keeps
 * working and the doctor can still use the manual "Open WhatsApp" buttons.
 */

export type ChannelResult = { status: "sent" | "skipped" | "failed"; detail?: string };
export type NotifyResult = { whatsapp: ChannelResult; email: ChannelResult };

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v21.0";

export function notifyConfig() {
  return {
    whatsapp: Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
    email: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM),
  };
}

export type EmailAttachment = { filename: string; content: Uint8Array };

async function sendWhatsApp(to: string, rendered: ReturnType<typeof renderNotification>["whatsapp"]): Promise<ChannelResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) return { status: "skipped", detail: "whatsapp-not-configured" };

  const components: unknown[] = [];
  if (rendered.documentLink) {
    components.push({
      type: "header",
      parameters: [{ type: "document", document: { link: rendered.documentLink, filename: rendered.documentName } }],
    });
  }
  components.push({ type: "body", parameters: rendered.params.map((text) => ({ type: "text", text })) });

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: { name: rendered.template, language: { code: rendered.language }, components },
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("whatsapp send failed", response.status, body.slice(0, 300));
      return { status: "failed", detail: `http-${response.status}` };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("whatsapp send error", error);
    return { status: "failed", detail: "network" };
  }
}

export async function sendEmail(
  to: string,
  message: { subject: string; text: string; html: string },
  attachments: EmailAttachment[] = []
): Promise<ChannelResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { status: "skipped", detail: "email-not-configured" };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: process.env.EMAIL_REPLY_TO || undefined,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: attachments.map((a) => ({ filename: a.filename, content: Buffer.from(a.content).toString("base64") })),
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("email send failed", response.status, body.slice(0, 300));
      return { status: "failed", detail: `http-${response.status}` };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("email send error", error);
    return { status: "failed", detail: "network" };
  }
}

/** Render a notification and send it to whichever channels have a valid recipient. */
export async function notify(
  kind: NotificationKind,
  data: NotificationData,
  recipient: { mobile?: string; email?: string },
  lang: Lang = "en",
  attachments: EmailAttachment[] = []
): Promise<NotifyResult> {
  const rendered = renderNotification(kind, data, lang);
  const wa = toWhatsAppNumber(recipient.mobile);
  const [whatsapp, email] = await Promise.all([
    wa ? sendWhatsApp(wa, rendered.whatsapp) : Promise.resolve<ChannelResult>({ status: "skipped", detail: "no-mobile" }),
    isEmail(recipient.email)
      ? sendEmail(String(recipient.email).trim(), rendered.email, attachments)
      : Promise.resolve<ChannelResult>({ status: "skipped", detail: "no-email" }),
  ]);
  return { whatsapp, email };
}

/** Doctor alert recipients (server env; never exposed to the browser). */
export function doctorAlertRecipient() {
  return {
    mobile: process.env.DOCTOR_ALERT_WHATSAPP || "",
    email: process.env.DOCTOR_ALERT_EMAIL || "",
  };
}
