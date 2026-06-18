const BASE = import.meta.env.BASE_URL;

/** Food template photos (Pexels) — replace with brand assets when available */
export const LANDING_ASSETS = {
  hero: `${BASE}landing/hero-pasta.jpg`,
  stanislausProducts: `${BASE}landing/stanislaus-products.png`,
  simplotFries: `${BASE}landing/simplot-fries.png`,
  testimonialsBg: `${BASE}landing/testimonials-tomatoes.jpg`,
} as const;

export const LANDING_BRAND_LOGOS = {
  stanislaus: `${BASE}assets/brands/logos/stanislaus.png`,
  simplot: `${BASE}assets/brands/logos/simplot.png`,
  venturaFoods: `${BASE}assets/brands/logos/ventura-foods.png`,
  richs: `${BASE}assets/brands/logos/richs.png`,
  ricos: `${BASE}assets/brands/logos/ricos.png`,
} as const;

export type LandingStripBrand = {
  id: string;
  name: string;
  logo: string;
  href?: string;
  highlight?: string;
};

/** Marcas mostradas en la franja «Marcas líderes» de la landing HORECA. */
export const LANDING_STRIP_BRANDS: LandingStripBrand[] = [
  { id: "stanislaus", name: "Stanislaus", logo: LANDING_BRAND_LOGOS.stanislaus },
  { id: "simplot", name: "Simplot", logo: LANDING_BRAND_LOGOS.simplot },
  {
    id: "ventura-foods",
    name: "Ventura Foods",
    logo: LANDING_BRAND_LOGOS.venturaFoods,
    href: "/productos?marca=ventura-foods",
    highlight: "Aderezos",
  },
  {
    id: "richs",
    name: "Rich's",
    logo: LANDING_BRAND_LOGOS.richs,
    href: "/products/product-23530",
    highlight: "Dedos de Queso",
  },
  {
    id: "ricos",
    name: "Ricos",
    logo: LANDING_BRAND_LOGOS.ricos,
    href: "/productos?marca=ricos",
    highlight: "Queso Cheddar",
  },
];
