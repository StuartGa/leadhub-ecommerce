import { slugify } from "../../application/utils/slugify";
import { PRODUCT_CATEGORIES } from "../../domain/schemas/contactSchema";

export type CategoryName = (typeof PRODUCT_CATEGORIES)[number];

export type CategoryIconId =
  | "accompaniments"
  | "sweeteners"
  | "canned"
  | "snacks"
  | "protein"
  | "bakery"
  | "sauces"
  | "vegetables"
  | "cheese"
  | "supplier";

export interface CategoryShowcaseItem {
  name: CategoryName;
  icon: CategoryIconId;
  /** Optimized stock image (square crop, compressed). */
  imageUrl: string;
  /** Product catalog category when it differs from display name. */
  productCategory?: string;
  href?: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=75`;

export const categoryShowcaseItems: CategoryShowcaseItem[] = [
  {
    name: "Acompañantes",
    icon: "accompaniments",
    imageUrl: unsplash("photo-1509440159596-0249088772ff"),
  },
  {
    name: "Azúcar y Endulzantes",
    icon: "sweeteners",
    imageUrl: unsplash("photo-1581441360822-5c4f7f0c8c0b"),
    productCategory: "Azúcar y Endulcorantes",
  },
  {
    name: "Estuchados",
    icon: "canned",
    imageUrl: unsplash("photo-1587049352846-4a222e784389"),
  },
  {
    name: "Papas y Botanas",
    icon: "snacks",
    imageUrl: unsplash("photo-1573080496219-bb08000c97ec"),
    productCategory: "Papa congelada",
  },
  {
    name: "Proteína",
    icon: "protein",
    imageUrl: unsplash("photo-1568901346375-23c9450c58cd"),
    productCategory: "Proteina",
  },
  {
    name: "Repostería",
    icon: "bakery",
    imageUrl: unsplash("photo-1578985545062-69928b0d8bf3"),
    productCategory: "Reposteria y Postres",
  },
  {
    name: "Salsas y Aderezos",
    icon: "sauces",
    imageUrl: unsplash("photo-1623428057949-0d623b952c76"),
    productCategory: "Salsas y Aderezo",
  },
  {
    name: "Verduras y Leguminosas",
    icon: "vegetables",
    imageUrl: unsplash("photo-1540420773420-3366772f4999"),
  },
  {
    name: "Quesos",
    icon: "cheese",
    imageUrl: unsplash("photo-1452195109886-9be75ec71ee8"),
    productCategory: "Quesos",
  },
  {
    name: "Quiero ser proveedor",
    icon: "supplier",
    imageUrl: unsplash("photo-1586528110311-ad8dd3c8310d"),
    href: "/contacto",
  },
];

export function getCategoryShowcaseHref(item: CategoryShowcaseItem): string {
  if (item.href) return item.href;
  const category = item.productCategory ?? item.name;
  return `/productos/categoria/${slugify(category)}`;
}
