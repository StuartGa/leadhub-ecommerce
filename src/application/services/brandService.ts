import type { Brand } from "../../domain/types/brand";
import { fetchCmsBrands } from "../../infrastructure/cms/cmsBrandRepository";
import { brands } from "../../infrastructure/data/brands";

let cachedBrands: Brand[] | null = null;
let inFlightBrands: Promise<Brand[]> | null = null;

export const brandService = {
  async getAll(): Promise<Brand[]> {
    if (cachedBrands) {
      return cachedBrands;
    }

    if (!inFlightBrands) {
      inFlightBrands = (async () => {
        try {
          const cmsBrands = await fetchCmsBrands();
          if (cmsBrands.length > 0) {
            cachedBrands = cmsBrands;
            return cachedBrands;
          }
        } catch {
          // Ignore and fallback to local dataset.
        }

        cachedBrands = brands;
        return cachedBrands;
      })().finally(() => {
        inFlightBrands = null;
      });
    }

    return inFlightBrands;
  },

  async getFeatured(): Promise<Brand[]> {
    const allBrands = await this.getAll();
    return allBrands.filter((brand) => brand.featured);
  },
};
