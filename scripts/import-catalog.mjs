#!/usr/bin/env node
/**
 * Script de importación: Excel → Sanity CMS
 * Importa categorías, marcas y productos del catálogo Abril 2026
 *
 * Uso:
 *   node scripts/import-catalog.mjs
 *
 * Requiere:
 *   VITE_SANITY_PROJECT_ID y SANITY_API_TOKEN en .env
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Leer .env manualmente (sin dotenv) ─────────────────────────────────────
function readEnv() {
  const envPath = path.join(__dirname, "../.env");
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

if (!projectId) {
  console.error("❌  VITE_SANITY_PROJECT_ID no encontrado en .env");
  process.exit(1);
}
if (!token) {
  console.error("❌  SANITY_API_TOKEN no encontrado en .env");
  console.error(
    "    Genera un token en: https://sanity.io/manage/project/" +
      projectId +
      "/api"
  );
  console.error("    Agrega al .env:  SANITY_API_TOKEN=sk...");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-05-01",
  token,
  useCdn: false,
});

// ─── Normalización de categorías ─────────────────────────────────────────────
const CATEGORY_MAP = {
  "Aceites y Manteca": "Aceites y Manteca",
  Acompañantes: "Acompañantes",
  "Acompañantes, quesos": "Acompañantes",
  "Azúcar y Endulcorantes": "Azúcar y Endulzantes",
  "Azúcar y Endulcorantes ": "Azúcar y Endulzantes",
  Estuchados: "Estuchados",
  "Estuchados, Reposteria y Postres": "Repostería y Postres",
  "Estuchados, Salsas y Aderezos": "Salsas y Aderezos",
  "Pan Congelado": "Pan Congelado",
  "Papa Congelada": "Papa Congelada",
  "Papa congelada": "Papa Congelada",
  "papa congelada": "Papa Congelada",
  Proteina: "Proteína",
  Quesos: "Quesos",
  quesos: "Quesos",
  "Reposteria y Postres": "Repostería y Postres",
  "reposteria y Postres": "Repostería y Postres",
  "Salsa y Aderezo": "Salsas y Aderezos",
  "Salsas y Aderezo": "Salsas y Aderezos",
  "Verduras y Leguminosas": "Verduras y Leguminosas",
};

// ─── Normalización de marcas ──────────────────────────────────────────────────
const BRAND_MAP = {
  "Acción Alimenticia": "Acción Alimenticia",
  "Al Minuto": "Al Minuto",
  "American Beef": "American Beef",
  "BACHOCO / RYC": "Bachoco / RYC",
  RYC: "Bachoco / RYC",
  Bimbo: "Bimbo",
  Cargill: "Cargill",
  Covemex: "Covemex",
  HEINZ: "Heinz",
  "LAMB WESTON": "Lamb Weston",
  Lactalis: "Lactalis",
  "MARINA AZUL": "Marina Azul",
  "Martin's": "Martin's",
  Mondeléz: "Mondeléz",
  "My Sweet Garden": "My Sweet Garden",
  NUTELLA: "Nutella",
  "Pilgrim's": "Pilgrim's",
  RICOS: "Ricos",
  "Rich's": "Rich's",
  "SAN ANTONIO": "San Antonio",
  "San Patric": "San Patric",
  Sesajal: "Sesajal",
  Simplot: "Simplot",
  Splenda: "Splenda",
  Stanislaus: "Stanislaus",
  Tyson: "Tyson",
  Valentina: "Valentina",
  "Ventura Foods": "Ventura Foods",
};

// ─── Temperatura por categoría ────────────────────────────────────────────────
function guessTemperature(category) {
  const c = category.toLowerCase();
  if (c.includes("congelad") || c.includes("papa congelada") || c.includes("pan congelado"))
    return "Congelado";
  if (c.includes("proteína") || c.includes("proteina")) return "Congelado";
  if (c.includes("queso") || c.includes("lácteo")) return "Refrigerado";
  return "Seco";
}

// ─── Slug generator ───────────────────────────────────────────────────────────
function toSlug(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Leer Excel via JSON pre-exportado ───────────────────────────────────────
// El JSON es generado por parse-excel.py (ver abajo)
const CATALOG_JSON = path.join(__dirname, "catalog.json");
if (!fs.existsSync(CATALOG_JSON)) {
  console.error("❌  scripts/catalog.json no encontrado.");
  console.error("    Ejecuta primero:  python3 scripts/parse-excel.py");
  process.exit(1);
}

const products = JSON.parse(readFileSync(CATALOG_JSON, "utf-8"));

// ─── Upsert helpers ───────────────────────────────────────────────────────────
async function upsertDoc(doc) {
  return client.createOrReplace(doc);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  Importando catálogo → Sanity project ${projectId}\n`);

  // 1. Categorías únicas normalizadas
  const rawCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const normalizedCategories = [
    ...new Set(rawCategories.map((c) => CATEGORY_MAP[c.trim()] ?? c.trim())),
  ];

  console.log(`📂  Categorías (${normalizedCategories.length}):`);
  const categoryIds = {};
  for (const name of normalizedCategories) {
    const slug = toSlug(name);
    const id = `category-${slug}`;
    await upsertDoc({ _id: id, _type: "category", name, slug: { _type: "slug", current: slug } });
    categoryIds[name] = id;
    console.log(`    ✅  ${name}`);
  }

  // 2. Marcas únicas normalizadas
  const rawBrands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const normalizedBrands = [
    ...new Set(rawBrands.map((b) => BRAND_MAP[b.trim()] ?? b.trim())),
  ];

  console.log(`\n🏷️   Marcas (${normalizedBrands.length}):`);
  const brandIds = {};
  for (const name of normalizedBrands) {
    const slug = toSlug(name);
    const id = `brand-${slug}`;
    await upsertDoc({ _id: id, _type: "brand", name, slug: { _type: "slug", current: slug } });
    brandIds[name] = id;
    console.log(`    ✅  ${name}`);
  }

  // 3. Productos
  console.log(`\n📦  Productos (${products.length}):`);
  let ok = 0;
  let skip = 0;

  for (const p of products) {
    const sku = String(p.sku ?? "").trim();
    const name = String(p.name ?? "").trim();
    if (!sku || !name) { skip++; continue; }

    const rawCat = String(p.category ?? "").trim();
    const rawBrand = String(p.brand ?? "").trim();
    const normCat = CATEGORY_MAP[rawCat] ?? rawCat;
    const normBrand = BRAND_MAP[rawBrand] ?? rawBrand;

    const catId = categoryIds[normCat];
    const brandId = brandIds[normBrand];

    if (!catId || !brandId) {
      console.warn(`    ⚠️   SKU ${sku}: categoría/marca sin mapear (${rawCat} / ${rawBrand})`);
      skip++;
      continue;
    }

    const slug = toSlug(`${sku}-${name}`);
    const shortDesc = String(p.shortDesc ?? "").trim().slice(0, 240);
    const longDesc = String(p.longDesc ?? "").trim().slice(0, 2000);
    const temperature = guessTemperature(normCat);

    const doc = {
      _id: `product-${toSlug(sku)}`,
      _type: "product",
      name,
      slug: { _type: "slug", current: slug },
      sku,
      shortDescription: shortDesc || name,
      longDescription: longDesc || undefined,
      temperature,
      seasonality: "Todo el Año",
      inventoryUnit: "unidad",
      minOrderQty: 1,
      orderStep: 1,
      inStock: true,
      isActive: true,
      editorialStatus: "published",
      category: { _type: "reference", _ref: catId },
      brand: { _type: "reference", _ref: brandId },
      tags: [],
    };

    // Precio como tag si existe
    if (p.price && !isNaN(Number(p.price))) {
      doc.tags = [`precio-${p.price}`];
    }

    await upsertDoc(doc);
    console.log(`    ✅  [${sku}] ${name}`);
    ok++;
  }

  console.log(`\n✅  Importación completa: ${ok} productos importados, ${skip} omitidos.\n`);
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
