import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUDGET_DIR = path.join(__dirname, "..", "public", "assets", "brands", "logos");

const BRAND_LOGO_MAP = {
  "Acción Alimenticia": "accion.png",
  "Al Minuto": "al-minuto.png",
  "American Beef": "american-beef.png",
  "Bachoco / RYC": "bachoco-ryc.png",
  Bimbo: "bimbo.png",
  Cargill: "cargill.png",
  Covemex: "covemex.png",
  "Custom Culinary": "custom-culinary.png",
  Heinz: "heinz.png",
  Lactalis: "lactalis.png",
  "Lamb Weston": "lamb-weston.png",
  "Marina Azul": "marina-azul.png",
  "Martin's": "martins.png",
  Mondeléz: "mondelez.png",
  "My Sweet Garden": "my-sweet-garden.png",
  Nutella: "nutella.png",
  "Pilgrim's": "pilgrims.png",
  "Rich's": "richs.png",
  Ricos: "ricos.png",
  "San Antonio": "san-antonio.png",
  "San Patric": "san-patric.png",
  Sesajal: "sesajal.png",
  Simplot: "simplot.png",
  Splenda: "splenda.png",
  Stanislaus: "stanislaus.png",
  Tyson: "tyson.png",
  Valentina: "valentina.png",
  "Ventura Foods": "ventura-foods.png",
};

const client = createClient({
  projectId: "44oltazw",
  dataset: "production",
  apiVersion: "2026-05-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});

async function main() {
  console.log("Fetching brands from Sanity...");
  const brands = await client.fetch(`*[_type == "brand"]{_id, name}`);
  console.log(`Found ${brands.length} brands\n`);

  // Step 1: Upload logos for each brand
  for (const brand of brands) {
    const logoFile = BRAND_LOGO_MAP[brand.name];
    if (!logoFile) {
      console.log(`SKIP ${brand.name} — no logo mapped`);
      continue;
    }

    const logoPath = path.join(BUDGET_DIR, logoFile);
    if (!fs.existsSync(logoPath)) {
      console.log(`SKIP ${brand.name} — file not found: ${logoPath}`);
      continue;
    }

    try {
      // Upload image asset
      const fileBuffer = readFileSync(logoPath);
      const asset = await client.assets.upload("image", fileBuffer, {
        filename: basename(logoPath),
      });
      console.log(`UPLOADED ${brand.name} → ${asset._id}`);

      // Patch brand with logo AND isActive: true
      await client
        .patch(brand._id)
        .set({
          logo: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
          isActive: true,
        })
        .commit();
      console.log(`PATCHED ${brand.name} → logo set + isActive: true\n`);
    } catch (err) {
      console.error(`ERROR ${brand.name}:`, err.message);
    }
  }

  // Step 2: Set isActive on any remaining brands without a logo
  const remaining = await client.fetch(
    `*[_type == "brand" && isActive != true]{_id, name}`
  );
  if (remaining.length > 0) {
    console.log(`\nSetting isActive on ${remaining.length} remaining brands...`);
    for (const brand of remaining) {
      await client.patch(brand._id).set({ isActive: true }).commit();
      console.log(`ACTIVATED ${brand.name}`);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
