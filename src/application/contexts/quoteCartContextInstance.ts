import { createContext } from "react";

import type { Product } from "../../domain/types/product";
import type { QuoteCartItem } from "../../domain/types/quoteCart";

export interface AddToCartInput {
  product: Product;
  quantity?: number;
  notes?: string;
}

export interface QuoteCartContextValue {
  items: QuoteCartItem[];
  distinctProducts: number;
  totalUnits: number;
  addItem: (input: AddToCartInput) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
}

export const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);
