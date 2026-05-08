export type Temperature = "Seco" | "Refrigerado" | "Congelado";
export type Seasonality = "Todo el Año" | "Temporada";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "EUR" | "MXN";
  imageUrl: string;
  category: string;
  temperature: Temperature;
  seasonality?: Seasonality;
  inStock: boolean;
  tags: readonly string[];
}
