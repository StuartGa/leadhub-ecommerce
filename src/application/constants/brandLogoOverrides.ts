const BASE = import.meta.env.BASE_URL;

/**
 * Local logo overrides for brands whose CMS assets are unsuitable
 * (e.g. white logos on light backgrounds).
 */
const BRAND_LOGO_OVERRIDES: Readonly<Record<string, string>> = {
  "Ventura Foods": `${BASE}assets/brands/logos/ventura-foods.png`,
  "San Patric": `${BASE}logo.svg`,
};

export function resolveBrandLogoUrl(
  brandName: string,
  fallbackUrl: string,
): string {
  return BRAND_LOGO_OVERRIDES[brandName] ?? fallbackUrl;
}
