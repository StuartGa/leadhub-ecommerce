/**
 * Canonical base URL for the site.
 * Update to "https://sanpatric.mx" when the production domain goes live.
 */
export const CANONICAL_BASE = "https://stuartga.github.io/leadhub-ecommerce";

export const DEFAULT_OG_IMAGE = `${CANONICAL_BASE}/og-image.png`;

/** Resolves a site path or absolute URL to a full canonical URL. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_BASE}${normalized}`;
}
