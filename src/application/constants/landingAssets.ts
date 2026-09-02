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
  venturaFoodsMexico: `${BASE}landing/ventura/ventura-foods-mexico.png`,
  richs: `${BASE}assets/brands/logos/richs.png`,
  ricos: `${BASE}assets/brands/logos/ricos.png`,
} as const;

export type LandingFeaturedProduct = {
  id: string;
  name: string;
  image: string;
};

export const LANDING_STANISLAUS_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "saporito",
    name: "Saporito® Filetto di Pomodoro",
    image: `${BASE}landing/stanislaus/saporito.png`,
  },
  {
    id: "full-red",
    name: "Full-Red® Salsa para Pizza",
    image: `${BASE}landing/stanislaus/full-red.png`,
  },
  {
    id: "san-nicola",
    name: "San Nicola®",
    image: `${BASE}landing/stanislaus/san-nicola.png`,
  },
  {
    id: "tomato-magic",
    name: "Tomato Magic® Ground Tomatoes",
    image: `${BASE}landing/stanislaus/tomato-magic.png`,
  },
];

export const LANDING_SIMPLOT_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "futbol-goalz",
    name: "Traditional Futbol Goalz",
    image: `${BASE}landing/simplot/futbol-goalz.png`,
  },
  {
    id: "pulpa-aguacate",
    name: "Pulpa de Aguacate",
    image: `${BASE}landing/simplot/pulpa-aguacate.png`,
  },
];

export const LANDING_VENTURA_PRODUCTS: LandingFeaturedProduct[] = [
  {
    id: "aderezo-italiano",
    name: "Aderezo Italiano",
    image: `${BASE}landing/ventura/aderezo-italiano.png`,
  },
  {
    id: "aderezo-mil-islas",
    name: "Aderezo Mil Islas",
    image: `${BASE}landing/ventura/aderezo-mil-islas.png`,
  },
  {
    id: "mayonesa-wilsey",
    name: "Mayonesa Wilsey Regular",
    image: `${BASE}landing/ventura/mayonesa-wilsey.png`,
  },
  {
    id: "salsa-ajo-parmesano",
    name: "Salsa Garlic Parmesan",
    image: `${BASE}landing/ventura/salsa-ajo-parmesano.png`,
  },
  {
    id: "cayenne-pepper",
    name: "Salsa Cayenne Pepper",
    image: `${BASE}landing/ventura/cayenne-pepper.png`,
  },
  {
    id: "salsa-mango-habanero",
    name: "Salsa Mango Habanero",
    image: `${BASE}landing/ventura/salsa-mango-habanero.png`,
  },
  {
    id: "salsa-bbq-base",
    name: "Salsa BBQ Base",
    image: `${BASE}landing/ventura/salsa-bbq-base.png`,
  },
];

export type LandingStripBrand = {
  id: string;
  name: string;
  logo: string;
};

/** Marcas mostradas en la franja «Marcas líderes» de la landing HORECA. */
export const LANDING_STRIP_BRANDS: LandingStripBrand[] = [
  { id: "stanislaus", name: "Stanislaus", logo: LANDING_BRAND_LOGOS.stanislaus },
  { id: "simplot", name: "Simplot", logo: LANDING_BRAND_LOGOS.simplot },
  {
    id: "ventura-foods",
    name: "Ventura Foods",
    logo: LANDING_BRAND_LOGOS.venturaFoods,
  },
  {
    id: "richs",
    name: "Rich's",
    logo: LANDING_BRAND_LOGOS.richs,
  },
  {
    id: "ricos",
    name: "Ricos",
    logo: LANDING_BRAND_LOGOS.ricos,
  },
];
