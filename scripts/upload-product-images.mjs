#!/usr/bin/env node
/**
 * Script: Subir fotos de productos a Sanity y vincularlas al documento
 *
 * Lógica de matching:
 *   Para cada producto en Sanity (por SKU), busca en public/assets/products/
 *   el archivo cuyo nombre empieza con el SKU normalizado.
 *   Si hay match, sube la imagen como asset y parchea mainImage en el producto.
 *
 * Uso:
 *   node scripts/upload-product-images.mjs
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync, readdirSync, createReadStream } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const IMAGES_DIR = path.join(PROJECT_ROOT, "public/assets/products");

// ─── Leer .env ───────────────────────────────────────────────────────────────
function readEnv() {
  const envPath = path.join(PROJECT_ROOT, ".env");
  const env = {};
  if (fs.existsSync(envPath)) {
    readFileSync(envPath, "utf-8")
      .split("\n")
      .forEach((line) => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) env[match[1].trim()] = match[2].trim();
      });
  }
  return env;
}

const env = readEnv();
const projectId = env["VITE_SANITY_PROJECT_ID"];
const token = env["SANITY_API_TOKEN"];

if (!projectId || !token) {
  console.error("❌  Faltan VITE_SANITY_PROJECT_ID o SANITY_API_TOKEN en .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-05-01",
  token,
  useCdn: false,
});

// ─── Normalizar SKU para comparar con nombre de archivo ──────────────────────
function normalizeForMatch(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");
}

// ─── Obtener tipo MIME ────────────────────────────────────────────────────────
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
  };
  return types[ext] ?? "image/png";
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🖼️   Subiendo fotos de productos a Sanity...\n");

  // 1. Obtener todos los productos de Sanity (solo _id y sku)
  const products = await client.fetch(
    `*[_type == "product" && isActive == true]{ _id, sku, name, mainImage }`
  );
  console.log(`📦  Productos en Sanity: ${products.length}`);

  // 2. Listar archivos locales
  const files = readdirSync(IMAGES_DIR);
  console.log(`🗂️   Archivos locales en public/assets/products: ${files.length}\n`);

  let uploaded = 0;
  let skipped = 0;
  let notFound = 0;

  for (const product of products) {
    const { _id, sku, name } = product;

    // Saltar si ya tiene imagen
    if (product.mainImage) {
      skipped++;
      continue;
    }

    // Buscar archivo local: nombre empieza con SKU normalizado
    const skuNorm = normalizeForMatch(sku);
    const match = files.find((f) => {
      const fileNorm = normalizeForMatch(path.basename(f, path.extname(f)));
      return fileNorm.startsWith(skuNorm);
    });

    if (!match) {
      console.log(`  ⚠️   [${sku}] ${name} — sin imagen local`);
      notFound++;
      continue;
    }

    const filePath = path.join(IMAGES_DIR, match);
    const mimeType = getMimeType(filePath);

    try {
      // Subir imagen a Sanity como asset
      const asset = await client.assets.upload("image", createReadStream(filePath), {
        filename: match,
        contentType: mimeType,
      });

      // Parchear el producto con mainImage y también gallery
      await client
        .patch(_id)
        .set({
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
          gallery: [
            {
              _type: "image",
              _key: asset._id,
              asset: { _type: "reference", _ref: asset._id },
            },
          ],
        })
        .commit();

      console.log(`  ✅  [${sku}] ${name} → ${match}`);
      uploaded++;
    } catch (err) {
      console.error(`  ❌  [${sku}] ${name} — error: ${err.message}`);
      notFound++;
    }
  }

  console.log(`
✅  Subida completa:
    ${uploaded}  productos con imagen nueva
    ${skipped}  ya tenían imagen (omitidos)
    ${notFound}  sin match local
`);
}

main().catch((err) => {
  console.error("❌  Error fatal:", err.message);
  process.exit(1);
});
