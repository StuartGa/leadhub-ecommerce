import DOMPurify from "dompurify";

import type { GHLWebhookPayload } from "../../domain/types/ghl";

/** Strips HTML and trims user-supplied plain text. */
export function sanitizeText(value: string): string {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

export function sanitizeGHLPayload(payload: GHLWebhookPayload): GHLWebhookPayload {
  return {
    ...payload,
    contactName: sanitizeText(payload.contactName),
    companyName: sanitizeText(payload.companyName),
    email: sanitizeText(payload.email),
    phone: sanitizeText(payload.phone),
    businessType: sanitizeText(payload.businessType),
    state: sanitizeText(payload.state),
    locality: sanitizeText(payload.locality),
    message: sanitizeText(payload.message),
    categories: payload.categories.map(sanitizeText),
    quoteItems: payload.quoteItems?.map((item) => ({
      ...item,
      productName: sanitizeText(item.productName),
      notes: item.notes ? sanitizeText(item.notes) : undefined,
    })),
  };
}
