import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function normalizeSku(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function resolveItemSku(item) {
  if (item.sku?.trim()) return item.sku.trim();
  const idMatch = item.productId?.match(/[-_]([\w-]+)$/);
  if (idMatch?.[1] && !idMatch[1].startsWith("local")) return idMatch[1];
  return undefined;
}

let bundledSpecsCache = null;

function getBundledSpecsBySku() {
  if (bundledSpecsCache) return bundledSpecsCache;

  bundledSpecsCache = new Map();
  try {
    const filePath = join(dirname(fileURLToPath(import.meta.url)), "../data/product-specs-by-sku.json");
    const raw = JSON.parse(readFileSync(filePath, "utf8"));
    for (const [sku, doc] of Object.entries(raw)) {
      bundledSpecsCache.set(normalizeSku(sku), doc);
    }
  } catch {
    // Bundled catalog unavailable.
  }

  return bundledSpecsCache;
}

async function fetchSanitySpecsBySku(skus) {
  const projectId = process.env.VITE_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "44oltazw";
  const dataset = process.env.VITE_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION ?? "2026-05-01";
  const normalizedSkus = [...new Set(skus.map(normalizeSku))];

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `*[_type == "product" && defined(sku) && upper(sku) in $skus]{
          sku,
          shortDescription,
          longDescription,
          technicalInfo,
          packaging
        }`,
        params: { skus: normalizedSkus },
      }),
    },
  );

  const map = new Map();
  if (!response.ok) return map;

  const payload = await response.json();
  for (const doc of payload.result ?? []) {
    if (doc.sku) {
      map.set(normalizeSku(doc.sku), doc);
    }
  }

  return map;
}

function pickSpecDoc(sku, sanityMap, bundledMap) {
  const key = normalizeSku(sku);
  return sanityMap.get(key) ?? bundledMap.get(key);
}

function mergeItemSpecs(item, doc) {
  if (!doc) return item;

  const shortDescription = doc.shortDescription ?? "";
  const longDescription = doc.longDescription ?? shortDescription;

  return {
    ...item,
    sku: item.sku ?? doc.sku,
    productDescription: item.productDescription?.trim() || shortDescription || item.productDescription,
    longDescription: item.longDescription?.trim() || longDescription || item.longDescription,
    technicalInfo: item.technicalInfo?.trim() || doc.technicalInfo || item.technicalInfo,
    packaging: item.packaging?.trim() || doc.packaging || item.packaging,
  };
}

/**
 * Fills quote line specs from bundled catalog + Sanity by SKU (case-insensitive).
 */
export async function enrichQuoteItems(items) {
  if (!items?.length) return items ?? [];

  const skus = [...new Set(items.map(resolveItemSku).filter(Boolean))];
  if (skus.length === 0) return items;

  const bundledMap = getBundledSpecsBySku();
  const sanityMap = await fetchSanitySpecsBySku(skus);

  return items.map((item) => {
    const sku = resolveItemSku(item);
    if (!sku) return item;
    return mergeItemSpecs(item, pickSpecDoc(sku, sanityMap, bundledMap));
  });
}
