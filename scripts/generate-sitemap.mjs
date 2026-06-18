#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from static routes, blog posts, categories and products.
 * Usage: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const CANONICAL_BASE = "https://stuartga.github.io/leadhub-ecommerce";
const TODAY = new Date().toISOString().slice(0, 10);

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function urlEntry(loc, { changefreq = "monthly", priority = "0.5" } = {}) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/quienes-somos", priority: "0.9", changefreq: "monthly" },
  { path: "/productos", priority: "0.9", changefreq: "weekly" },
  { path: "/marcas", priority: "0.8", changefreq: "monthly" },
  { path: "/cobertura", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/trabaja-con-nosotros", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/horeca", priority: "0.9", changefreq: "weekly" },
];

const products = JSON.parse(
  readFileSync(join(root, "src/infrastructure/data/products.json"), "utf8"),
);

const blogSource = readFileSync(join(root, "src/infrastructure/data/blog-posts.ts"), "utf8");
const blogSlugs = [...blogSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

const entries = [];

for (const route of staticRoutes) {
  entries.push(urlEntry(`${CANONICAL_BASE}${route.path}`, route));
}

for (const slug of blogSlugs) {
  entries.push(
    urlEntry(`${CANONICAL_BASE}/blog/${slug}`, { changefreq: "monthly", priority: "0.7" }),
  );
}

for (const category of categories) {
  entries.push(
    urlEntry(`${CANONICAL_BASE}/productos/categoria/${slugify(category)}`, {
      changefreq: "weekly",
      priority: "0.7",
    }),
  );
}

for (const product of products) {
  const slug =
    typeof product.slug === "string" && product.slug.length > 0
      ? product.slug
      : slugify(product.name ?? "producto");
  entries.push(
    urlEntry(`${CANONICAL_BASE}/products/${slug}`, { changefreq: "weekly", priority: "0.6" }),
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const outPath = join(root, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${entries.length} URLs to ${outPath}`);
