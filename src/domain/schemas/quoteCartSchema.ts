import { z } from "zod/v4";

import { quoteItemSchema } from "./quoteSchema";

export const quoteCartItemSchema = quoteItemSchema.extend({
  imageUrl: z.string().min(1).max(2048),
  minOrderQty: z.number().int().min(1).max(9999),
  orderStep: z.number().int().min(1).max(9999),
});

export const quoteCartSchema = z.array(quoteCartItemSchema).max(100);
