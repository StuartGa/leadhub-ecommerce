#!/usr/bin/env node
/**
 * Validates product photo coverage in products.json and public/images/products.
 * Usage: node scripts/validate-product-photos.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const products = JSON.parse(
  readFileSync(join(root, "src/infrastructure/data/products.json"), "utf8"),
);

const placeholder = "product-placeholder";
const withoutPhoto = [];
const missingFiles = [];
const withPhoto = [];

for (const product of products) {
  const imageUrl = product.imageUrl ?? "";
  const gallery = Array.isArray(product.gallery) ? product.gallery : [imageUrl];
  const hasRealPhoto = !imageUrl.includes(placeholder);

  if (!hasRealPhoto) {
    withoutPhoto.push({ sku: product.sku, name: product.name, slug: product.slug });
    continue;
  }

  withPhoto.push(product.sku);

  for (const entry of gallery) {
    const filePath = join(root, "public", entry.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      missingFiles.push({ sku: product.sku, path: entry });
    }
  }
}

console.log("══════════════════════════════════════════");
console.log("Validación de fotos — catálogo local");
console.log("══════════════════════════════════════════");
console.log(`Total productos:     ${products.length}`);
console.log(`Con foto real:       ${withPhoto.length}`);
console.log(`Sin foto (placeholder): ${withoutPhoto.length}`);
console.log(`Archivos faltantes:  ${missingFiles.length}`);

if (withoutPhoto.length > 0) {
  console.log("\nProductos sin foto:");
  for (const item of withoutPhoto) {
    console.log(`  - ${item.sku} | ${item.name}`);
  }
}

if (missingFiles.length > 0) {
  console.log("\nReferencias sin archivo en disco:");
  for (const item of missingFiles.slice(0, 10)) {
    console.log(`  - ${item.sku} → ${item.path}`);
  }
  if (missingFiles.length > 10) {
    console.log(`  ... y ${missingFiles.length - 10} más`);
  }
}

console.log(
  "\nNota: en producción Sanity puede cargar productos sin imagen.",
  "productService fusiona fotos locales por SKU cuando el CMS usa placeholder.",
);
