/**
 * Optional Resend integration for formatted quote-request notifications.
 * Requires RESEND_API_KEY and QUOTE_NOTIFICATION_EMAIL in Vercel env.
 */
export async function sendQuoteRequestEmail({ subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  const from =
    process.env.QUOTE_EMAIL_FROM ?? "San Patric Cotizaciones <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { sent: false, reason: "email_not_configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend error (${response.status}): ${detail.slice(0, 300)}`);
  }

  return { sent: true };
}
