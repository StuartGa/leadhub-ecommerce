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
  /** Segment filter id for /productos?segment=… (see SEGMENT_OPTIONS). */
  segmentId?: string;
}

const base = import.meta.env.BASE_URL || "/";
const localImage = (file: string) => `${base}assets/images/audience/${file}`;

export const audienceShowcaseItems: AudienceShowcaseItem[] = [
  {
    name: "Restaurantes",
    icon: "restaurants",
    imageUrl: localImage("restaurantes.webp"),
    segmentId: "restaurantes",
  },
  {
    name: "Hoteles",
    icon: "hotels",
    imageUrl: localImage("hoteles.webp"),
    segmentId: "hoteles",
  },
  {
    name: "Cafeterías",
    icon: "cafes",
    imageUrl: localImage("cafeterias.webp"),
    segmentId: "cafeterias",
  },
  {
    name: "Servicios de Catering",
    icon: "catering",
    imageUrl: localImage("catering.webp"),
    segmentId: "delivery",
  },
  {
    name: "Hospitales",
    icon: "hospitals",
    imageUrl: localImage("hospitales.webp"),
    segmentId: "hospitales",
  },
  {
    name: "Escuelas",
    icon: "schools",
    imageUrl: localImage("escuelas.webp"),
    segmentId: "escuelas",
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
    segmentId: "comedor-industrial",
  },
  {
    name: "Otros Negocios",
    icon: "other",
    imageUrl: localImage("otros-negocios.webp"),
  },
];
