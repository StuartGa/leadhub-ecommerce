import type { Client } from "../../domain/types/client";

const BASE = import.meta.env.BASE_URL;

export const clients: Client[] = [
  { id: "hotel-marriott", name: "Hotel Marriott", logoUrl: `${BASE}clients/logo-acsp.webp` },
  { id: "grupo-alsea", name: "Restaurante Grupo Alsea", logoUrl: `${BASE}images/logo-placeholder.webp` },
  { id: "hospital-abc", name: "Hospital ABC", logoUrl: `${BASE}images/logo-placeholder.webp` },
  { id: "unam", name: "Universidad UNAM", logoUrl: `${BASE}images/logo-placeholder.webp` },
  { id: "starbucks", name: "Starbucks Coffee", logoUrl: `${BASE}images/logo-placeholder.webp` },
  { id: "walmart", name: "Walmart Supercenter", logoUrl: `${BASE}images/logo-placeholder.webp` },
];
