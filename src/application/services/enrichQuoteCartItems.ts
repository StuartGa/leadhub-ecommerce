import type { Product } from "../../domain/types/product";
import type { QuoteCartItem } from "../../domain/types/quoteCart";
import type { QuoteRequestItem } from "./quoteRequestDocument";
import { productService } from "./productService";

function normalizeSku(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  return value.trim().toUpperCase();
}

function buildProductIndex(products: Product[]): Map<string, Product> {
  const index = new Map<string, Product>();
  for (const product of products) {
    const sku = normalizeSku(product.sku);
    if (sku) index.set(sku, product);
    index.set(`id:${product.id}`, product);
    index.set(`slug:${product.slug}`, product);
  }
  return index;
}

function resolveProduct(item: QuoteCartItem, index: Map<string, Product>): Product | undefined {
  const sku = normalizeSku(item.sku);
  if (sku && index.has(sku)) return index.get(sku);
  if (index.has(`id:${item.productId}`)) return index.get(`id:${item.productId}`);
  if (index.has(`slug:${item.productSlug}`)) return index.get(`slug:${item.productSlug}`);
  return undefined;
}

export function mapQuoteCartItemToRequestItem(item: QuoteCartItem): QuoteRequestItem {
  return {
    productId: item.productId,
    productSlug: item.productSlug,
    productName: item.productName,
    sku: item.sku,
    productDescription: item.productDescription,
    longDescription: item.longDescription,
    packaging: item.packaging,
    technicalInfo: item.technicalInfo,
    inventoryUnit: item.inventoryUnit,
    quantity: item.quantity,
    notes: item.notes,
  };
}

export async function enrichQuoteCartItems(items: QuoteCartItem[]): Promise<QuoteRequestItem[]> {
  if (items.length === 0) return [];

  const products = await productService.getAll();
  const index = buildProductIndex(products);

  return items.map((item) => {
    const base = mapQuoteCartItemToRequestItem(item);
    const product = resolveProduct(item, index);
    if (!product) return base;

    return {
      ...base,
      sku: base.sku ?? product.sku,
      productDescription: base.productDescription?.trim() || product.description,
      longDescription: base.longDescription?.trim() || product.longDescription || product.description,
      packaging: base.packaging?.trim() || product.packaging,
      technicalInfo: base.technicalInfo?.trim() || product.technicalInfo,
    };
  });
}
