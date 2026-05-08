import type { Product, Seasonality, Temperature } from "../../domain/types/product";
import { buildSanityImageUrl, getSanityClient } from "./sanityClient";

interface SanityProduct {
  _id: string;
  name: string;
  slug?: { current?: string };
  sku?: string;
  shortDescription?: string;
  longDescription?: string;
  technicalInfo?: string;
  packaging?: string;
  category?: { name?: string };
  brand?: { name?: string };
  temperature?: Temperature;
  seasonality?: Seasonality;
  inStock?: boolean;
  isActive?: boolean;
  minOrderQty?: number;
  orderStep?: number;
  inventoryUnit?: "unidad";
  tags?: string[];
  mainImage?: unknown;
  gallery?: unknown[];
  specSheet?: { asset?: { url?: string } };
}

const PRODUCT_QUERY = `*[_type == "product" && isActive == true] | order(name asc) {
  _id,
  name,
  slug,
  sku,
  shortDescription,
  longDescription,
  technicalInfo,
  packaging,
  temperature,
  seasonality,
  inStock,
  isActive,
  minOrderQty,
  orderStep,
  inventoryUnit,
  tags,
  mainImage,
  gallery,
  specSheet{asset->{url}},
  category->{name},
  brand->{name}
}`;

function extractPrice(tags?: string[]): number | undefined {
  if (!tags) return undefined;
  for (const tag of tags) {
    const match = tag.match(/^precio-(\d+)$/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function mapSanityProduct(doc: SanityProduct): Product {
  const fallbackSlug = doc.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const imageUrl = doc.mainImage ? buildSanityImageUrl(doc.mainImage) : "/images/product-placeholder.webp";
  const gallery = (doc.gallery ?? []).map((entry) => buildSanityImageUrl(entry));

  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug?.current ?? fallbackSlug,
    sku: doc.sku,
    description: doc.shortDescription ?? doc.longDescription ?? "",
    longDescription: doc.longDescription,
    technicalInfo: doc.technicalInfo,
    packaging: doc.packaging,
    brand: doc.brand?.name,
    minOrderQty: doc.minOrderQty ?? 1,
    orderStep: doc.orderStep ?? 1,
    inventoryUnit: "unidad",
    imageUrl,
    gallery: gallery.length > 0 ? gallery : [imageUrl],
    specSheetUrl: doc.specSheet?.asset?.url,
    category: doc.category?.name ?? "Sin categoría",
    temperature: doc.temperature ?? "Seco",
    seasonality: doc.seasonality,
    inStock: doc.inStock ?? true,
    tags: doc.tags ?? [],
    price: extractPrice(doc.tags),
  };
}

export async function fetchCmsProducts(): Promise<Product[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  const products = await client.fetch<SanityProduct[]>(PRODUCT_QUERY);
  return products.map(mapSanityProduct);
}
