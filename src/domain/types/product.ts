export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "EUR" | "MXN";
  imageUrl: string;
  category: string;
  inStock: boolean;
  tags: readonly string[];
}
