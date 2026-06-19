import type { InventoryUnit } from "./product";

export interface QuoteCartItem {
  productId: string;
  productSlug: string;
  productName: string;
  sku?: string;
  productDescription?: string;
  packaging?: string;
  technicalInfo?: string;
  imageUrl: string;
  quantity: number;
  inventoryUnit: InventoryUnit;
  minOrderQty: number;
  orderStep: number;
  notes?: string;
}
