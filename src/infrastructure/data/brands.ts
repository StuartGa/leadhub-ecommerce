import type { Brand } from "../../domain/types/brand";

const BASE = import.meta.env.BASE_URL;

export const brands: Brand[] = [
  { id: "brand-accion-alimenticia",  name: "Acción Alimenticia", logoUrl: `${BASE}assets/brands/logos/accion.png`,           featured: true  },
  { id: "brand-lamb-weston",         name: "Lamb Weston",        logoUrl: `${BASE}assets/brands/logos/lamb-weston.png`,         featured: true  },
  { id: "brand-simplot",             name: "Simplot",            logoUrl: `${BASE}assets/brands/logos/simplot.png`,             featured: true  },
  { id: "brand-heinz",               name: "Heinz",              logoUrl: `${BASE}assets/brands/logos/heinz.png`,               featured: true  },
  { id: "brand-pilgrims",            name: "Pilgrim's",          logoUrl: `${BASE}assets/brands/logos/pilgrims.png`,            featured: true  },
  { id: "brand-richs",               name: "Rich's",             logoUrl: `${BASE}assets/brands/logos/richs.png`,               featured: true  },
  { id: "brand-mondelez",            name: "Mondeléz",           logoUrl: `${BASE}assets/brands/logos/mondelez.png`,            featured: true  },
  { id: "brand-nutella",             name: "Nutella",            logoUrl: `${BASE}assets/brands/logos/nutella.png`,             featured: true  },
  { id: "brand-al-minuto",           name: "Al Minuto",          logoUrl: `${BASE}assets/brands/logos/al-minuto.png`,           featured: false },
  { id: "brand-american-beef",       name: "American Beef",      logoUrl: `${BASE}assets/brands/logos/american-beef.png`,       featured: false },
  { id: "brand-bachoco-ryc",         name: "Bachoco / RYC",      logoUrl: `${BASE}assets/brands/logos/bachoco-ryc.png`,         featured: false },
  { id: "brand-bimbo",               name: "Bimbo",              logoUrl: `${BASE}assets/brands/logos/bimbo.png`,               featured: false },
  { id: "brand-cargill",             name: "Cargill",            logoUrl: `${BASE}assets/brands/logos/cargill.png`,             featured: false },
  { id: "brand-covemex",             name: "Covemex",            logoUrl: `${BASE}assets/brands/logos/covemex.png`,             featured: false },
  { id: "brand-custom-culinary",     name: "Custom Culinary",    logoUrl: `${BASE}assets/brands/logos/custom-culinary.png`,     featured: false },
  { id: "brand-lactalis",            name: "Lactalis",           logoUrl: `${BASE}assets/brands/logos/lactalis.png`,            featured: false },
  { id: "brand-marina-azul",         name: "Marina Azul",        logoUrl: `${BASE}assets/brands/logos/marina-azul.png`,         featured: false },
  { id: "brand-martins",             name: "Martin's",           logoUrl: `${BASE}assets/brands/logos/martins.png`,             featured: false },
  { id: "brand-my-sweet-garden",     name: "My Sweet Garden",    logoUrl: `${BASE}assets/brands/logos/my-sweet-garden.png`,     featured: false },
  { id: "brand-ricos",               name: "Ricos",              logoUrl: `${BASE}assets/brands/logos/ricos.png`,               featured: false },
  { id: "brand-san-antonio",         name: "San Antonio",        logoUrl: `${BASE}assets/brands/logos/san-antonio.png`,         featured: false },
  { id: "brand-san-patric",          name: "San Patric",         logoUrl: `${BASE}assets/brands/logos/san-patric.png`,          featured: false },
  { id: "brand-sesajal",             name: "Sesajal",            logoUrl: `${BASE}assets/brands/logos/sesajal.png`,             featured: false },
  { id: "brand-splenda",             name: "Splenda",            logoUrl: `${BASE}assets/brands/logos/splenda.png`,             featured: false },
  { id: "brand-stanislaus",          name: "Stanislaus",         logoUrl: `${BASE}assets/brands/logos/stanislaus.png`,          featured: false },
  { id: "brand-tyson",               name: "Tyson",              logoUrl: `${BASE}assets/brands/logos/tyson.png`,               featured: false },
  { id: "brand-valentina",           name: "Valentina",          logoUrl: `${BASE}assets/brands/logos/valentina.png`,           featured: false },
  { id: "brand-ventura-foods",       name: "Ventura Foods",      logoUrl: `${BASE}assets/brands/logos/ventura-foods.png`,       featured: false },
];
