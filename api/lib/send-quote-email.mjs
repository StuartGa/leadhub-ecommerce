import { Resend } from "resend";

import { resolveNotificationEmails } from "./notification-emails.mjs";

/**
 * Optional Resend integration for formatted quote-request notifications.
 * Requires RESEND_API_KEY and QUOTE_NOTIFICATION_EMAIL in Vercel env.
 */
export async function sendQuoteRequestEmail({ subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = resolveNotificationEmails(process.env.QUOTE_NOTIFICATION_EMAIL);
  const from =
    process.env.QUOTE_EMAIL_FROM ?? "San Patric Cotizaciones <onboarding@resend.dev>";

  if (!apiKey || to.length === 0) {
    return { sent: false, reason: "email_not_configured" };
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
  }

  return { sent: true, id: data?.id };
}

export async function sendLandingLeadEmail({ subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = resolveNotificationEmails(process.env.LANDING_NOTIFICATION_EMAIL);
  const from =
    process.env.LANDING_EMAIL_FROM ??
    process.env.QUOTE_EMAIL_FROM ??
    "San Patric Leads <onboarding@resend.dev>";

  if (!apiKey || to.length === 0) {
    return { sent: false, reason: "email_not_configured" };
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
  }

  return { sent: true, id: data?.id };
}
