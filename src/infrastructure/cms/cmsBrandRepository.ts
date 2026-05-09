import type { Brand } from "../../domain/types/brand";
import { LOGO_PLACEHOLDER } from "../../application/constants/assets";
import { buildSanityImageUrl, getSanityClient } from "./sanityClient";
import { brands as localBrands } from "../data/brands";

interface SanityBrand {
  _id: string;
  name: string;
  slug?: { current?: string };
  logo?: unknown;
  isActive?: boolean;
  featured?: boolean;
}

const BRAND_QUERY = `*[_type == "brand" && isActive == true] | order(name asc) {
  _id,
  name,
  slug,
  logo,
  isActive,
  featured
}`;

const localLogoMap = new Map(localBrands.map((b) => [b.name, b.logoUrl]));

export async function fetchCmsBrands(): Promise<Brand[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const docs = await client.fetch<SanityBrand[]>(BRAND_QUERY);
  return docs.map((doc) => ({
    id: doc.slug?.current ?? doc._id,
    name: doc.name,
    logoUrl: doc.logo
      ? buildSanityImageUrl(doc.logo)
      : (localLogoMap.get(doc.name) ?? LOGO_PLACEHOLDER),
    featured: doc.featured ?? false,
  }));
}
