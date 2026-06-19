import { z } from "zod/v4";

export const quoteItemSchema = z.object({
  productId: z.string().min(1),
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  sku: z.string().max(80).optional(),
  productDescription: z.string().max(500).optional(),
  longDescription: z.string().max(2000).optional(),
  packaging: z.string().max(300).optional(),
  technicalInfo: z.string().max(2000).optional(),
  inventoryUnit: z.literal("unidad"),
  quantity: z.number().int().min(1),
  notes: z.string().max(300).optional(),
});

export const quoteSummarySchema = z.object({
  distinctProducts: z.number().int().min(1),
  totalUnits: z.number().int().min(1),
  source: z.literal("web-catalog"),
});

export const quotePayloadSchema = z.object({
  quoteItems: z.array(quoteItemSchema).optional(),
  quoteSummary: quoteSummarySchema.optional(),
});
