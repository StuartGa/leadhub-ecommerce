import type { Brand } from "../../domain/types/brand";
import { brands } from "../../infrastructure/data/brands";

export const brandService = {
  getAll(): Brand[] {
    return brands;
  },

  getFeatured(): Brand[] {
    return brands.filter((brand) => brand.featured);
  },
};
