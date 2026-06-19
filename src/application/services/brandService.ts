import type { Brand } from "../../domain/types/brand";
import { fetchCmsBrands } from "../../infrastructure/cms/cmsBrandRepository";
import { brands } from "../../infrastructure/data/brands";

/** Brands hidden from the public catalog (removed from local data but may still exist in CMS). */
const EXCLUDED_BRAND_NAMES = new Set(["Custom Culinary"]);

function filterVisibleBrands(allBrands: Brand[]): Brand[] {
  return allBrands.filter((brand) => !EXCLUDED_BRAND_NAMES.has(brand.name));
}

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
            cachedBrands = filterVisibleBrands(cmsBrands);
            return cachedBrands;
          }
        } catch {
          // Ignore and fallback to local dataset.
        }

        cachedBrands = filterVisibleBrands(brands);
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
