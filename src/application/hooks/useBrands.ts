import { useEffect, useState } from "react";

import type { Brand } from "../../domain/types/brand";
import { brandService } from "../services/brandService";

interface UseBrandsResult {
  brands: Brand[];
  loading: boolean;
}

export function useBrands(): UseBrandsResult {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadBrands = async () => {
      setLoading(true);
      const data = await brandService.getAll();
      if (cancelled) return;
      setBrands(data);
      setLoading(false);
    };

    void loadBrands();

    return () => {
      cancelled = true;
    };
  }, []);

  return { brands, loading };
}
