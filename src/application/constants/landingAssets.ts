const BASE = import.meta.env.BASE_URL;

/** Food template photos (Pexels) — replace with brand assets when available */
export const LANDING_ASSETS = {
  hero: `${BASE}landing/hero-pasta.jpg`,
  stanislausProducts: `${BASE}landing/stanislaus-products.png`,
  simplotFries: `${BASE}landing/simplot-fries.png`,
  testimonialsBg: `${BASE}landing/testimonials-tomatoes.jpg`,
  coverageMap: `${BASE}landing/coverage-map.png`,
} as const;

export const LANDING_BRAND_LOGOS = {
  stanislaus: `${BASE}assets/brands/logos/stanislaus.png`,
  simplot: `${BASE}assets/brands/logos/simplot.png`,
} as const;
