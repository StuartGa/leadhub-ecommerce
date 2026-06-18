const BASE = import.meta.env.BASE_URL;

/** Food template photos (Pexels) — replace with brand assets when available */
export const LANDING_ASSETS = {
  hero: `${BASE}landing/hero-pasta.jpg`,
  testimonialsBg: `${BASE}landing/testimonials-tomatoes.jpg`,
} as const;

export const LANDING_BRAND_LOGOS = {
  stanislaus: `${BASE}assets/brands/logos/stanislaus.png`,
  simplot: `${BASE}assets/brands/logos/simplot.png`,
  venturaFoods: `${BASE}assets/brands/logos/ventura-foods.png`,
  richs: `${BASE}assets/brands/logos/richs.png`,
  ricos: `${BASE}assets/brands/logos/ricos.png`,
} as const;

export type LandingFeaturedProduct = {
  id: string;
  name: string;
  image: string;
  href: string;
};

export const LANDING_STANISLAUS_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "saporito",
    name: "Saporito® Filetto di Pomodoro",
    image: `${BASE}landing/stanislaus/saporito.png`,
    href: "/products/product-025813",
  },
  {
    id: "full-red",
    name: "Full-Red® Salsa para Pizza",
    image: `${BASE}landing/stanislaus/full-red.png`,
    href: "/products/product-15613",
  },
  {
    id: "san-nicola",
    name: "San Nicola®",
    image: `${BASE}landing/stanislaus/san-nicola.png`,
    href: "/products/product-cpb063313",
  },
  {
    id: "tomato-magic",
    name: "Tomato Magic® Ground Tomatoes",
    image: `${BASE}landing/stanislaus/tomato-magic.png`,
    href: "/products/product-redo046013",
  },
];

export const LANDING_SIMPLOT_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "futbol-goalz",
    name: "Traditional Futbol Goalz",
    image: `${BASE}landing/simplot/futbol-goalz.png`,
    href: "/products/product-9054795",
  },
  {
    id: "pulpa-aguacate",
    name: "Pulpa de Aguacate",
    image: `${BASE}landing/simplot/pulpa-aguacate.png`,
    href: "/products/product-039099",
  },
];

export const LANDING_VENTURA_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "aderezo-italiano",
    name: "Aderezo Italiano",
    image: `${BASE}landing/ventura/aderezo-italiano.png`,
    href: "/products/product-22951clv",
  },
  {
    id: "aderezo-mil-islas",
    name: "Aderezo Mil Islas",
    image: `${BASE}landing/ventura/aderezo-mil-islas.png`,
    href: "/products/product-22933clv",
  },
  {
    id: "mayonesa-wilsey",
    name: "Mayonesa Wilsey Regular",
    image: `${BASE}landing/ventura/mayonesa-wilsey.png`,
    href: "/products/product-24507wlx",
  },
  {
    id: "salsa-ajo-parmesano",
    name: "Salsa Garlic Parmesan",
    image: `${BASE}landing/ventura/salsa-ajo-parmesano.png`,
    href: "/products/product-22774scr",
  },
  {
    id: "cayenne-pepper",
    name: "Salsa Cayenne Pepper",
    image: `${BASE}landing/ventura/cayenne-pepper.png`,
    href: "/products/product-22773scr",
  },
  {
    id: "salsa-mango-habanero",
    name: "Salsa Mango Habanero",
    image: `${BASE}landing/ventura/salsa-mango-habanero.png`,
    href: "/products/product-24170scr",
  },
  {
    id: "salsa-bbq-base",
    name: "Salsa BBQ Base",
    image: `${BASE}landing/ventura/salsa-bbq-base.png`,
    href: "/products/product-23728clv",
  },
];

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
