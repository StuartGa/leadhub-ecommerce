import { z } from "zod/v4";

import { BUSINESS_TYPES, ESTADOS_MEXICO } from "./contactSchema";

const htmlTagRegex = /<\/?[^>]+(>|$)/;

export const LANDING_PRODUCTS = [
  "Tomates Stanislaus",
  "Papas Simplot Megacrunch",
  "Ambos",
  "Otros productos",
] as const;

export const leadSchema = z.object({
  contactName: z
    .string()
    .min(1, "Nombre completo es requerido")
    .max(100, "Nombre debe tener menos de 100 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Nombre contiene etiquetas HTML"),
  companyName: z
    .string()
    .min(1, "Nombre del negocio es requerido")
    .max(150, "Nombre del negocio debe tener menos de 150 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Nombre del negocio contiene etiquetas HTML"),
  email: z
    .string()
    .min(1, "Correo electrónico es requerido")
    .email("Debe ser un correo electrónico válido")
    .max(254, "Correo debe tener menos de 254 caracteres"),
  phone: z
    .string()
    .min(1, "Teléfono es requerido")
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Ingrese un teléfono válido (7-20 dígitos, opcionalmente con +)",
    ),
  businessType: z
    .string()
    .min(1, "Tipo de negocio es requerido")
    .refine(
      (val) => BUSINESS_TYPES.includes(val as (typeof BUSINESS_TYPES)[number]),
      "Seleccione un tipo de negocio válido",
    ),
  productInterest: z
    .string()
    .min(1, "Producto de interés es requerido")
    .refine(
      (val) => LANDING_PRODUCTS.includes(val as (typeof LANDING_PRODUCTS)[number]),
      "Seleccione un producto válido",
    ),
  state: z
    .string()
    .min(1, "Estado es requerido")
    .refine(
      (val) => ESTADOS_MEXICO.includes(val as (typeof ESTADOS_MEXICO)[number]),
      "Seleccione un estado válido",
    ),
  acceptPrivacy: z.literal(true, {
    error: "Debe aceptar el aviso de privacidad para continuar",
  }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
