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
  /** Optimized stock image (square crop, compressed). */
  imageUrl: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=75`;

export const audienceShowcaseItems: AudienceShowcaseItem[] = [
  {
    name: "Restaurantes",
    icon: "restaurants",
    imageUrl: unsplash("photo-1517248135467-4c7edcad34c4"),
  },
  {
    name: "Hoteles",
    icon: "hotels",
    imageUrl: unsplash("photo-1566073771259-6a8506099945"),
  },
  {
    name: "Cafeterías",
    icon: "cafes",
    imageUrl: unsplash("photo-1495474472287-4d71bcdd2085"),
  },
  {
    name: "Servicios de Catering",
    icon: "catering",
    imageUrl: unsplash("photo-1555244162-803834f70033"),
  },
  {
    name: "Hospitales",
    icon: "hospitals",
    imageUrl: unsplash("photo-1519494026892-80bbd2d6fd0d"),
  },
  {
    name: "Escuelas",
    icon: "schools",
    imageUrl: unsplash("photo-1580582932707-520aed937b7b"),
  },
  {
    name: "Supermercados",
    icon: "supermarkets",
    imageUrl: unsplash("photo-1604719312566-8912e9227c6a"),
  },
  {
    name: "Mayoristas",
    icon: "wholesalers",
    imageUrl: unsplash("photo-1586528110311-ad8dd3c8310d"),
  },
  {
    name: "Comedor Industrial",
    icon: "industrial",
    imageUrl: unsplash("photo-1556910103-1c02745aae4d"),
  },
  {
    name: "Otros Negocios",
    icon: "other",
    imageUrl: unsplash("photo-1497366216548-37526070297c"),
  },
];
