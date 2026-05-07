import DOMPurify from "dompurify";

import type { Product } from "../../domain/types/product";
import productsData from "../../infrastructure/data/products.json";

function sanitizeProduct(product: Product): Product {
  return {
    ...product,
    name: DOMPurify.sanitize(product.name),
    description: DOMPurify.sanitize(product.description),
    category: DOMPurify.sanitize(product.category),
    tags: product.tags.map((t) => DOMPurify.sanitize(t)),
  };
}

function getAll(): Product[] {
  return (productsData as Product[]).map(sanitizeProduct);
}

function getById(id: string): Product | undefined {
  const found = (productsData as Product[]).find((p) => p.id === id);
  return found ? sanitizeProduct(found) : undefined;
}

function getByCategory(category: string): Product[] {
  return (productsData as Product[])
    .filter((p) => p.category === category)
    .map(sanitizeProduct);
}

export const productService = {
  getAll,
  getById,
  getByCategory,
};
