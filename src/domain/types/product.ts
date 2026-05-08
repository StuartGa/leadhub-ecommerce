export type Temperature = "Seco" | "Refrigerado" | "Congelado";
export type Seasonality = "Todo el Año" | "Temporada";
export type InventoryUnit = "unidad";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string;
  longDescription?: string;
  technicalInfo?: string;
  packaging?: string;
  brand?: string;
  minOrderQty: number;
  orderStep: number;
  inventoryUnit: InventoryUnit;
  imageUrl: string;
  gallery: readonly string[];
  specSheetUrl?: string;
  category: string;
  temperature: Temperature;
  seasonality?: Seasonality;
  inStock: boolean;
  tags: readonly string[];
  price?: number;
}
