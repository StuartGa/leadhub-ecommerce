import { buildQuoteRequestHtml, buildQuoteRequestMeta, resolveQuoteLogoUrl } from "./lib/quote-request-html.mjs";
import { sendQuoteRequestEmail } from "./lib/send-quote-email.mjs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const rateLimit = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object") return null;

  const required = ["contactName", "companyName", "email", "phone", "businessType", "state", "locality", "message"];
  for (const key of required) {
    if (typeof payload[key] !== "string" || payload[key].trim().length === 0) {
      return null;
    }
  }

  if (!Array.isArray(payload.categories)) return null;

  return {
    ...payload,
    contactName: stripHtml(payload.contactName).slice(0, 100),
    companyName: stripHtml(payload.companyName).slice(0, 150),
    email: stripHtml(payload.email).slice(0, 254),
    phone: stripHtml(payload.phone).slice(0, 30),
    businessType: stripHtml(payload.businessType).slice(0, 80),
    state: stripHtml(payload.state).slice(0, 80),
    locality: stripHtml(payload.locality).slice(0, 120),
    message: stripHtml(payload.message).slice(0, 2000),
    categories: payload.categories.map((c) => stripHtml(c).slice(0, 80)).filter(Boolean),
    branchCount: typeof payload.branchCount === "number" ? payload.branchCount : 1,
    leadSource: typeof payload.leadSource === "string" ? stripHtml(payload.leadSource).slice(0, 80) : undefined,
    quoteItems: Array.isArray(payload.quoteItems)
      ? payload.quoteItems.slice(0, 100).map((item) => ({
          productId: stripHtml(item.productId).slice(0, 80),
          productSlug: stripHtml(item.productSlug).slice(0, 120),
          productName: stripHtml(item.productName).slice(0, 200),
          inventoryUnit: item.inventoryUnit === "unidad" ? "unidad" : "unidad",
          quantity: Number.isFinite(item.quantity) ? Math.min(Math.max(1, item.quantity), 9999) : 1,
          notes: item.notes ? stripHtml(item.notes).slice(0, 300) : undefined,
        }))
      : undefined,
    quoteSummary:
      payload.quoteSummary && typeof payload.quoteSummary === "object"
        ? {
            distinctProducts: Number(payload.quoteSummary.distinctProducts) || 0,
            totalUnits: Number(payload.quoteSummary.totalUnits) || 0,
            source: "web-catalog",
          }
        : undefined,
  };
}

function resolveWebhookUrl(source) {
  if (source === "landing-horeca") {
    return process.env.GHL_LANDING_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL;
  }
  return process.env.GHL_WEBHOOK_URL;
}

function setCorsHeaders(res, origin) {
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed && origin === allowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!allowed) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ success: false, message: "Too many requests" });
    return;
  }

  const { source, payload, website } = req.body ?? {};

  if (typeof website === "string" && website.trim().length > 0) {
    res.status(200).json({ success: true });
    return;
  }

  if (source !== "contact" && source !== "landing-horeca") {
    res.status(400).json({ success: false, message: "Invalid source" });
    return;
  }

  const webhookUrl = resolveWebhookUrl(source)?.trim() || "";
  const skipGhl = process.env.LEAD_SKIP_GHL === "true";

  const sanitized = sanitizePayload(payload);
  if (!sanitized) {
    res.status(400).json({ success: false, message: "Invalid payload" });
    return;
  }

  const quoteMeta = buildQuoteRequestMeta();
  const sitePublicUrl = process.env.SITE_PUBLIC_URL ?? "https://stuartga.github.io/leadhub-ecommerce";
  const quoteHtml = buildQuoteRequestHtml({
    applicant: sanitized,
    items: sanitized.quoteItems,
    logoUrl: resolveQuoteLogoUrl(sitePublicUrl),
  });

  const enrichedPayload = {
    ...sanitized,
    quoteNumber: quoteMeta.quoteNumber,
    quoteSubject: quoteMeta.subject,
    quoteDeadline: quoteMeta.deadlineDate,
    quoteRequestUrl: undefined,
  };

  let ghlSent = false;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrichedPayload),
      });

      if (response.ok) {
        ghlSent = true;
      } else if (!skipGhl) {
        res.status(502).json({ success: false, message: "Upstream error" });
        return;
      }
    } catch {
      if (!skipGhl) {
        res.status(502).json({ success: false, message: "Upstream error" });
        return;
      }
    }
  }

  let emailSent = false;
  if (sanitized.quoteItems?.length) {
    try {
      const emailResult = await sendQuoteRequestEmail({
        subject: quoteMeta.subject,
        html: quoteHtml,
        replyTo: sanitized.email,
      });
      emailSent = emailResult.sent;
    } catch {
      if (ghlSent) {
        // Lead already reached GHL; email failure should not block success.
      } else {
        res.status(502).json({ success: false, message: "Email delivery failed" });
        return;
      }
    }
  }

  if (!ghlSent && !emailSent) {
    res.status(503).json({
      success: false,
      message: webhookUrl
        ? "Lead service unavailable"
        : "Configure GHL_WEBHOOK_URL or submit a quote with products in cart",
    });
    return;
  }

  res.status(200).json({
    success: true,
    quoteNumber: quoteMeta.quoteNumber,
    emailSent,
    ghlSent,
  });
}
