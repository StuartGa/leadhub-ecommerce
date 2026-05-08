import type { InventoryUnit } from "./product";

export interface GHLQuoteItem {
  productId: string;
  productSlug: string;
  productName: string;
  inventoryUnit: InventoryUnit;
  quantity: number;
  notes?: string;
}

export interface GHLQuoteSummary {
  distinctProducts: number;
  totalUnits: number;
  source: "web-catalog";
}

export interface GHLWebhookPayload {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  branchCount: number;
  state: string;
  locality: string;
  categories: string[];
  message: string;
  quoteItems?: GHLQuoteItem[];
  quoteSummary?: GHLQuoteSummary;
}

export interface GHLWebhookResponse {
  success: boolean;
  message?: string;
}
