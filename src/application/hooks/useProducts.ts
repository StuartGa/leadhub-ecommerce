import { useEffect, useState } from "react";

import type { Product } from "../../domain/types/product";
import { productService } from "../services/productService";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getAll();
        if (cancelled) return;
        setProducts(data);
      } catch {
        if (cancelled) return;
        setError("No se pudo cargar el catálogo en este momento.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
