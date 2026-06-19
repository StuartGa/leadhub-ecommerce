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

async function fetchSanitySpecsBySku(skus) {
  const projectId = process.env.VITE_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "44oltazw";
  const dataset = process.env.VITE_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
  const apiVersion = process.env.VITE_SANITY_API_VERSION ?? "2026-05-01";

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `*[_type == "product" && sku in $skus]{
          sku,
          shortDescription,
          longDescription,
          technicalInfo,
          packaging
        }`,
        params: { skus },
      }),
    },
  );

  if (!response.ok) {
    return new Map();
  }

  const payload = await response.json();
  const map = new Map();

  for (const doc of payload.result ?? []) {
    if (doc.sku) {
      map.set(normalizeSku(doc.sku), doc);
    }
  }

  return map;
}

/**
 * Fills missing quote line specs from Sanity when the cart payload is stale.
 */
export async function enrichQuoteItems(items) {
  if (!items?.length) return items ?? [];

  const needsLookup = items.filter(
    (item) =>
      !item.productDescription?.trim() &&
      !item.longDescription?.trim() &&
      !item.technicalInfo?.trim() &&
      !item.packaging?.trim(),
  );

  if (needsLookup.length === 0) {
    return items;
  }

  const skus = [...new Set(needsLookup.map(resolveItemSku).filter(Boolean))];
  if (skus.length === 0) {
    return items;
  }

  const specsBySku = await fetchSanitySpecsBySku(skus);

  return items.map((item) => {
    if (
      item.productDescription?.trim() ||
      item.longDescription?.trim() ||
      item.technicalInfo?.trim() ||
      item.packaging?.trim()
    ) {
      return item;
    }

    const sku = resolveItemSku(item);
    const doc = sku ? specsBySku.get(normalizeSku(sku)) : undefined;
    if (!doc) return item;

    return {
      ...item,
      sku: item.sku ?? doc.sku,
      productDescription: doc.shortDescription ?? item.productDescription,
      longDescription: doc.longDescription ?? item.longDescription,
      technicalInfo: doc.technicalInfo ?? item.technicalInfo,
      packaging: doc.packaging ?? item.packaging,
    };
  });
}
