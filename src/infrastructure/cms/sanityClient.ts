import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2026-05-01";
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== "false";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!projectId || !dataset) {
    return null;
  }

  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: "published",
    });
  }

  return client;
}

export function buildSanityImageUrl(source: unknown): string {
  const sanityClient = getSanityClient();
  if (!sanityClient || !source) {
    return "/images/product-placeholder.webp";
  }

  return imageUrlBuilder(sanityClient).image(source).auto("format").fit("max").url();
}
