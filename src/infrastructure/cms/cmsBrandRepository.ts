import type { Brand } from "../../domain/types/brand";
import { buildSanityImageUrl, getSanityClient } from "./sanityClient";

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

export async function fetchCmsBrands(): Promise<Brand[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const docs = await client.fetch<SanityBrand[]>(BRAND_QUERY);
  return docs.map((doc) => ({
    id: doc.slug?.current ?? doc._id,
    name: doc.name,
    logoUrl: doc.logo ? buildSanityImageUrl(doc.logo) : "/images/logo-placeholder.webp",
    featured: doc.featured ?? false,
  }));
}
