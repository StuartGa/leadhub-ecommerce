import type { InventoryUnit } from "./product";

export interface QuoteCartItem {
  productId: string;
  productSlug: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  inventoryUnit: InventoryUnit;
  minOrderQty: number;
  orderStep: number;
  notes?: string;
}
