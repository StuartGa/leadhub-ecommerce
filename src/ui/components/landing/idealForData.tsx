import type { ReactNode } from "react";

import {
  IconBanquet,
  IconBurger,
  IconCatering,
  IconFastFood,
  IconHotel,
  IconIndustrial,
  IconInstitutional,
  IconPizza,
  IconResort,
  IconRestaurant,
} from "./idealForIcons";

interface IdealForItem {
  label: string;
  icon: ReactNode;
}

export const STANISLAUS_IDEAL_FOR: IdealForItem[] = [
  { label: "Restaurantes", icon: <IconRestaurant /> },
  { label: "Hoteles", icon: <IconHotel /> },
  { label: "Catering", icon: <IconCatering /> },
  { label: "Cocinas Industriales", icon: <IconIndustrial /> },
  { label: "Pizzerías", icon: <IconPizza /> },
  { label: "Comedores Institucionales", icon: <IconInstitutional /> },
];

export const SIMPLOT_IDEAL_FOR: IdealForItem[] = [
  { label: "Restaurantes de servicio rápido", icon: <IconFastFood /> },
  { label: "Cadenas de hamburguesas y alitas", icon: <IconBurger /> },
  { label: "Hoteles y resorts", icon: <IconResort /> },
  { label: "Catering y banquetes", icon: <IconBanquet /> },
];
