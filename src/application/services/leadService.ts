import type { LeadFormValues } from "../../domain/schemas/leadSchema";
import type { GHLWebhookPayload } from "../../domain/types/ghl";

export const LANDING_LEAD_SOURCE = "landing-horeca";

export function mapLeadToGHLPayload(data: LeadFormValues): GHLWebhookPayload {
  return {
    contactName: data.contactName.trim(),
    companyName: data.companyName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    businessType: data.businessType,
    branchCount: 1,
    state: data.state,
    locality: data.state,
    categories: [data.productInterest],
    message: `Lead landing HORECA — Producto de interés: ${data.productInterest}`,
    leadSource: LANDING_LEAD_SOURCE,
  };
}
