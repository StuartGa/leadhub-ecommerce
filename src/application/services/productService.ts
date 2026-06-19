import DOMPurify from "dompurify";

import { toSafeHttpsUrl } from "../utils/safeUrl";

import type { Product } from "../../domain/types/product";
import { fetchCmsProducts } from "../../infrastructure/cms/cmsProductRepository";
import productsData from "../../infrastructure/data/products.json";

const BASE = import.meta.env.BASE_URL;
const PRODUCT_PLACEHOLDER = `${BASE}images/product-placeholder.webp`;

function resolveLocalAsset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE}${normalized}`;
}

let cachedProducts: Product[] | null = null;
let inFlightLoad: Promise<Product[]> | null = null;

function sanitizeProduct(product: Product): Product {
  return {
    ...product,
    name: DOMPurify.sanitize(product.name),
    description: DOMPurify.sanitize(product.description),
    longDescription: product.longDescription ? DOMPurify.sanitize(product.longDescription) : undefined,
    technicalInfo: product.technicalInfo ? DOMPurify.sanitize(product.technicalInfo) : undefined,
    packaging: product.packaging ? DOMPurify.sanitize(product.packaging) : undefined,
    brand: product.brand ? DOMPurify.sanitize(product.brand) : undefined,
    category: DOMPurify.sanitize(product.category),
    tags: product.tags.map((t) => DOMPurify.sanitize(t)),
    specSheetUrl: toSafeHttpsUrl(product.specSheetUrl),
  };
}

function normalizeLocalProduct(product: Record<string, unknown>): Product {
  const rawImageUrl = typeof product.imageUrl === "string" ? product.imageUrl : PRODUCT_PLACEHOLDER;
  const imageUrl = resolveLocalAsset(rawImageUrl);
  const rawGallery = Array.isArray(product.gallery)
    ? product.gallery.filter((entry): entry is string => typeof entry === "string").slice(0, 3)
    : [];
  const gallery = rawGallery.length > 0 ? rawGallery.map(resolveLocalAsset) : [imageUrl];
  const name = typeof product.name === "string" ? product.name : "Producto";
  const id = typeof product.id === "string" ? product.id : crypto.randomUUID();
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id,
    name,
    slug: typeof product.slug === "string" ? product.slug : slug,
    sku: typeof product.sku === "string" ? product.sku : undefined,
    description: typeof product.description === "string" ? product.description : "",
    longDescription: typeof product.longDescription === "string" ? product.longDescription : undefined,
    technicalInfo: typeof product.technicalInfo === "string" ? product.technicalInfo : undefined,
    packaging: typeof product.packaging === "string" ? product.packaging : undefined,
    brand: typeof product.brand === "string" ? product.brand : undefined,
    minOrderQty: typeof product.minOrderQty === "number" ? product.minOrderQty : 1,
    orderStep: typeof product.orderStep === "number" ? product.orderStep : 1,
    inventoryUnit: "unidad",
    imageUrl,
    gallery,
    specSheetUrl: toSafeHttpsUrl(typeof product.specSheetUrl === "string" ? product.specSheetUrl : undefined),
    category: typeof product.category === "string" ? product.category : "Sin categoría",
    temperature:
      product.temperature === "Refrigerado" || product.temperature === "Congelado"
        ? product.temperature
        : "Seco",
    seasonality:
      product.seasonality === "Temporada" || product.seasonality === "Todo el Año"
        ? product.seasonality
        : undefined,
    inStock: typeof product.inStock === "boolean" ? product.inStock : true,
    tags: Array.isArray(product.tags) ? product.tags.filter((t): t is string => typeof t === "string") : [],
    price: typeof product.price === "number" ? product.price : undefined,
  };
}

function getLocalProducts(): Product[] {
  return (productsData as Record<string, unknown>[]).map(normalizeLocalProduct).map(sanitizeProduct);
}

function isPlaceholderImage(url: string): boolean {
  return url.includes("product-placeholder");
}

function normalizeSku(sku: string | undefined): string | undefined {
  if (!sku) return undefined;
  const trimmed = sku.trim().toUpperCase();
  const withoutLeadingZeros = trimmed.replace(/^0+/, "");
  return withoutLeadingZeros || "0";
}

type ProductMedia = Pick<Product, "imageUrl" | "gallery">;

function buildLocalMediaIndex(localProducts: Product[]): Map<string, ProductMedia> {
  const index = new Map<string, ProductMedia>();

  for (const product of localProducts) {
    const media: ProductMedia = {
      imageUrl: product.imageUrl,
      gallery: product.gallery,
    };
    const sku = normalizeSku(product.sku);
    if (sku) index.set(`sku:${sku}`, media);
    index.set(`slug:${product.slug}`, media);
  }

  return index;
}

function findLocalMedia(product: Product, index: Map<string, ProductMedia>): ProductMedia | undefined {
  const sku = normalizeSku(product.sku);
  if (sku && index.has(`sku:${sku}`)) return index.get(`sku:${sku}`);
  if (index.has(`slug:${product.slug}`)) return index.get(`slug:${product.slug}`);
  return undefined;
}

/** When Sanity has no image, use the static catalog assets from products.json. */
function mergeCmsWithLocalMedia(cmsProducts: Product[], localProducts: Product[]): Product[] {
  const localMediaIndex = buildLocalMediaIndex(localProducts);

  return cmsProducts.map((cmsProduct) => {
    const localMedia = findLocalMedia(cmsProduct, localMediaIndex);
    if (!localMedia || isPlaceholderImage(localMedia.imageUrl)) {
      return cmsProduct;
    }
    if (!isPlaceholderImage(cmsProduct.imageUrl)) {
      return cmsProduct;
    }

    return {
      ...cmsProduct,
      imageUrl: localMedia.imageUrl,
      gallery: localMedia.gallery.length > 0 ? localMedia.gallery : [localMedia.imageUrl],
    };
  });
}

async function getAll(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  if (!inFlightLoad) {
    inFlightLoad = (async () => {
      const localProducts = getLocalProducts();

      try {
        const cmsProducts = await fetchCmsProducts();
        if (cmsProducts.length > 0) {
          cachedProducts = mergeCmsWithLocalMedia(cmsProducts, localProducts).map(sanitizeProduct);
          return cachedProducts;
        }
      } catch {
        // Ignore and fallback to local data.
      }

      cachedProducts = localProducts;
      return cachedProducts;
    })().finally(() => {
      inFlightLoad = null;
    });
  }

  return inFlightLoad;
}

async function getById(id: string): Promise<Product | undefined> {
  const products = await getAll();
  return products.find((p) => p.id === id || p.slug === id);
}

async function getByCategory(category: string): Promise<Product[]> {
  const products = await getAll();
  return products.filter((p) => p.category === category);
}

export const productService = {
  getAll,
  getById,
  getByCategory,
};
