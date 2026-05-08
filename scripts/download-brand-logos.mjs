import fs from "node:fs";
import path from "node:path";

const LOGO_DIR = path.resolve("./public/assets/brands/logos");
const BRANDS_CSV = path.resolve("./BRANDS_LOGO_MANIFEST_FINAL.csv");
const BRANDS_TS = path.resolve("./src/infrastructure/data/brands.ts");
const FALLBACK_LOGO = "/images/logo-placeholder.webp";

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCsv(content) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] ?? "").trim();
    });
    return row;
  });
}

function resolveAssetExists(relativePublicPath) {
  const clean = relativePublicPath.replace(/^\/+/, "");
  const abs = path.resolve("./public", clean);
  return fs.existsSync(abs);
}

function toPublicPathFromManifest(value) {
  if (!value) return "";
  return value.replace(/^\/assets\//, "/assets/");
}

function pickLogoPath(row) {
  const slug = slugify(row.brand_name || row.brand_id);

  const generatedPng = `/assets/brands/logos/${slug}.png`;
  if (resolveAssetExists(generatedPng)) {
    return generatedPng;
  }

  const webpFromCsv = toPublicPathFromManifest(row.logo_png_url);
  if (webpFromCsv && resolveAssetExists(webpFromCsv)) {
    return webpFromCsv;
  }

  const svgFromCsv = toPublicPathFromManifest(row.logo_svg_url);
  if (svgFromCsv && resolveAssetExists(svgFromCsv)) {
    return svgFromCsv;
  }

  return FALLBACK_LOGO;
}

function generateBrandsTs(rows) {
  const lines = [];
  lines.push('import type { Brand } from "../../domain/types/brand";');
  lines.push("");
  lines.push("export const brands: Brand[] = [");

  rows.forEach((row, index) => {
    const featured = index < 8 ? "true" : "false";
    const id = row.brand_id || `brand-${String(index + 1).padStart(2, "0")}`;
    const name = row.brand_name || `Marca ${index + 1}`;
    const logoUrl = pickLogoPath(row);

    lines.push(
      `  { id: "${id}", name: "${name}", logoUrl: "${logoUrl}", featured: ${featured} },`,
    );
  });

  lines.push("];\n");
  return lines.join("\n");
}

async function ensureManifestSeedAssets(rows) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });

  for (const row of rows) {
    const slug = slugify(row.brand_name || row.brand_id);
    const pngPath = path.join(LOGO_DIR, `${slug}.png`);
    if (fs.existsSync(pngPath)) {
      continue;
    }

    const domain = row.official_website
      ? new URL(row.official_website).hostname.replace(/^www\./, "")
      : "";

    if (domain) {
      const logoUrl = `https://www.google.com/s2/favicons?sz=512&domain_url=${encodeURIComponent(domain)}`;

      try {
        console.log(`⬇️ Descargando ${row.brand_name} desde ${domain}`);
        const response = await fetch(logoUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const bytes = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(pngPath, bytes);
        console.log(`✅ Logo descargado: ${row.brand_name}`);
      } catch (error) {
        console.warn(`⚠️ No se pudo descargar ${row.brand_name}: ${error.message}`);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(BRANDS_CSV)) {
    throw new Error(`No se encontró el CSV en ${BRANDS_CSV}`);
  }

  const csvRaw = fs.readFileSync(BRANDS_CSV, "utf8");
  const rows = parseCsv(csvRaw);

  const validRows = rows.filter(
    (row) => row.approved?.toLowerCase() === "yes" && row.use_in_site?.toLowerCase() === "yes",
  );

  await ensureManifestSeedAssets(validRows);
  fs.writeFileSync(BRANDS_TS, generateBrandsTs(validRows));

  console.log(`✅ Marcas validadas: ${validRows.length}`);
  console.log(`✅ Archivo actualizado: ${BRANDS_TS}`);
  console.log(`ℹ️ Si deseas descarga automática desde internet, ejecuta en entorno con DNS habilitado y logo provider accesible.`);
}

void main();
