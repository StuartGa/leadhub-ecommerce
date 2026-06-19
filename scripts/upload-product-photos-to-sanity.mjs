#!/usr/bin/env node
/**
 * Sube las fotos locales (public/images/products) a Sanity y actualiza mainImage + gallery.
 *
 * Requiere en .env:
 *   VITE_SANITY_PROJECT_ID
 *   VITE_SANITY_DATASET (default: production)
 *   SANITY_API_TOKEN (token con permisos de escritura)
 *
 * Uso:
 *   node scripts/upload-product-photos-to-sanity.mjs
 *   node scripts/upload-product-photos-to-sanity.mjs --dry-run
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const ROOT = process.cwd();
const PRODUCTS_JSON = join(ROOT, "src/infrastructure/data/products.json");
const PUBLIC_DIR = join(ROOT, "public");
const PLACEHOLDER = "product-placeholder";
const MAX_GALLERY = 3;
const dryRun = process.argv.includes("--dry-run");

function readEnvFile() {
  const envPath = join(ROOT, ".env");
  const env = { ...process.env };
  if (!existsSync(envPath)) return env;

  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
  }
  return env;
}

function normalizeSku(value) {
  const trimmed = String(value ?? "").trim().toUpperCase();
  const withoutLeadingZeros = trimmed.replace(/^0+/, "");
  return withoutLeadingZeros || "0";
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".png")) return "image/png";
  return "image/jpeg";
}

async function uploadImage(client, filePath) {
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
    contentType: contentTypeFor(filePath),
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function main() {
  const env = readEnvFile();
  const projectId = env.VITE_SANITY_PROJECT_ID ?? env.SANITY_PROJECT_ID;
  const dataset = env.VITE_SANITY_DATASET ?? env.SANITY_DATASET ?? "production";
  const token = env.SANITY_API_TOKEN;
  const apiVersion = env.VITE_SANITY_API_VERSION ?? "2026-05-01";

  if (!projectId) {
    console.error("❌ Falta VITE_SANITY_PROJECT_ID en .env");
    process.exit(1);
  }
  if (!token) {
    console.error("❌ Falta SANITY_API_TOKEN en .env (token con permisos de escritura)");
    console.error(`   Genera uno en: https://sanity.io/manage/project/${projectId}/api`);
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const localProducts = JSON.parse(readFileSync(PRODUCTS_JSON, "utf8"));
  const sanityProducts = await client.fetch(
    `*[_type == "product" && isActive == true]{ _id, sku, name, slug }`,
  );

  const sanityBySku = new Map();
  for (const product of sanityProducts) {
    if (product.sku) {
      sanityBySku.set(String(product.sku).trim(), product);
      sanityBySku.set(normalizeSku(product.sku), product);
    }
  }

  let updated = 0;
  let skipped = 0;
  let notFound = 0;
  let failed = 0;

  console.log(`📦 Productos locales: ${localProducts.length}`);
  console.log(`📦 Productos Sanity:  ${sanityProducts.length}`);
  if (dryRun) console.log("🔍 Modo dry-run (sin subir ni parchear)\n");

  for (const local of localProducts) {
    const imageUrl = local.imageUrl ?? "";
    if (imageUrl.includes(PLACEHOLDER)) {
      skipped += 1;
      continue;
    }

    const sku = local.sku;
    const sanityProduct =
      sanityBySku.get(String(sku).trim()) ?? sanityBySku.get(normalizeSku(sku));

    if (!sanityProduct) {
      console.warn(`⚠️  SKU ${sku} no encontrado en Sanity`);
      notFound += 1;
      continue;
    }

    const galleryPaths = (Array.isArray(local.gallery) ? local.gallery : [imageUrl])
      .filter((entry) => typeof entry === "string" && !entry.includes(PLACEHOLDER))
      .slice(0, MAX_GALLERY)
      .map((entry) => join(PUBLIC_DIR, entry.replace(/^\//, "")))
      .filter((filePath) => existsSync(filePath));

    if (galleryPaths.length === 0) {
      console.warn(`⚠️  SKU ${sku}: sin archivos locales`);
      skipped += 1;
      continue;
    }

    console.log(`\n→ [${sku}] ${local.name} (${galleryPaths.length} foto(s))`);

    if (dryRun) {
      for (const filePath of galleryPaths) {
        console.log(`   would upload ${filePath.replace(ROOT + "/", "")}`);
      }
      updated += 1;
      continue;
    }

    try {
      const uploaded = [];
      for (const filePath of galleryPaths) {
        console.log(`   ↑ ${basename(filePath)}`);
        uploaded.push(await uploadImage(client, filePath));
        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      await client
        .patch(sanityProduct._id)
        .set({
          mainImage: uploaded[0],
          gallery: uploaded,
        })
        .commit();

      console.log(`   ✅ actualizado en Sanity`);
      updated += 1;
    } catch (error) {
      console.error(`   ❌ error: ${error instanceof Error ? error.message : error}`);
      failed += 1;
    }
  }

  console.log("\n══════════════════════════════════════════");
  console.log(`✅ Actualizados: ${updated}`);
  console.log(`⏭️  Omitidos (sin foto local): ${skipped}`);
  console.log(`⚠️  No encontrados en Sanity: ${notFound}`);
  console.log(`❌ Fallidos: ${failed}`);
}

main().catch((error) => {
  console.error("❌ Error fatal:", error);
  process.exit(1);
});
