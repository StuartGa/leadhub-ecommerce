import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { QuoteCartItem } from "../../domain/types/quoteCart";
import { QuoteCartContext, type AddToCartInput, type QuoteCartContextValue } from "./quoteCartContextInstance";

function clampToStep(quantity: number, minOrderQty: number, step: number): number {
  if (quantity <= minOrderQty) {
    return minOrderQty;
  }

  const remainder = (quantity - minOrderQty) % step;
  if (remainder === 0) {
    return quantity;
  }

  return quantity + (step - remainder);
}

function getInitialItems(): QuoteCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem("leadhub.quote.cart.v1");
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as QuoteCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    window.localStorage.removeItem("leadhub.quote.cart.v1");
    return [];
  }
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>(() => getInitialItems());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("leadhub.quote.cart.v1", JSON.stringify(items));
  }, [items]);

  const addItem = ({ product, quantity, notes }: AddToCartInput) => {
    if (!product.inStock) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      const minOrderQty = Math.max(1, product.minOrderQty);
      const orderStep = Math.max(1, product.orderStep);
      const incoming = clampToStep(quantity ?? minOrderQty, minOrderQty, orderStep);

      if (existing) {
        const nextQuantity = clampToStep(existing.quantity + incoming, minOrderQty, orderStep);
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: nextQuantity,
                notes: notes ?? item.notes,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          imageUrl: product.imageUrl,
          quantity: incoming,
          inventoryUnit: product.inventoryUnit,
          minOrderQty,
          orderStep,
          notes,
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        return {
          ...item,
          quantity: clampToStep(Math.max(1, quantity), item.minOrderQty, item.orderStep),
        };
      }),
    );
  };

  const updateNotes = (productId: string, notes: string) => {
    setItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, notes } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo<QuoteCartContextValue>(() => {
    const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      items,
      distinctProducts: items.length,
      totalUnits,
      addItem,
      removeItem,
      updateQuantity,
      updateNotes,
      clearCart,
    };
  }, [items]);

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}
