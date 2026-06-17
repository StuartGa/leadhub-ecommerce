export type AudienceIconId =
  | "restaurants"
  | "hotels"
  | "cafes"
  | "catering"
  | "hospitals"
  | "schools"
  | "supermarkets"
  | "wholesalers"
  | "industrial"
  | "other";

export interface AudienceShowcaseItem {
  name: string;
  icon: AudienceIconId;
  /** Local optimized stock image (square crop). */
  imageUrl: string;
}

const base = import.meta.env.BASE_URL || "/";
const localImage = (file: string) => `${base}assets/images/audience/${file}`;

export const audienceShowcaseItems: AudienceShowcaseItem[] = [
  {
    name: "Restaurantes",
    icon: "restaurants",
    imageUrl: localImage("restaurantes.webp"),
  },
  {
    name: "Hoteles",
    icon: "hotels",
    imageUrl: localImage("hoteles.webp"),
  },
  {
    name: "Cafeterías",
    icon: "cafes",
    imageUrl: localImage("cafeterias.webp"),
  },
  {
    name: "Servicios de Catering",
    icon: "catering",
    imageUrl: localImage("catering.webp"),
  },
  {
    name: "Hospitales",
    icon: "hospitals",
    imageUrl: localImage("hospitales.webp"),
  },
  {
    name: "Escuelas",
    icon: "schools",
    imageUrl: localImage("escuelas.webp"),
  },
  {
    name: "Supermercados",
    icon: "supermarkets",
    imageUrl: localImage("supermercados.webp"),
  },
  {
    name: "Mayoristas",
    icon: "wholesalers",
    imageUrl: localImage("mayoristas.webp"),
  },
  {
    name: "Comedor Industrial",
    icon: "industrial",
    imageUrl: localImage("comedor-industrial.webp"),
  },
  {
    name: "Otros Negocios",
    icon: "other",
    imageUrl: localImage("otros-negocios.webp"),
  },
];
