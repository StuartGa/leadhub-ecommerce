import { z } from "zod/v4";

const htmlTagRegex = /<\/?[^>]+(>|$)/;

// Estados de México para el campo de localidad
export const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Ciudad de México",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;

// Giros de negocio comunes en foodservice
export const BUSINESS_TYPES = [
  "Restaurante",
  "Hotel",
  "Cafetería",
  "Catering",
  "Hospital",
  "Escuela",
  "Supermercado",
  "Mayorista",
  "Otro",
] as const;

export const contactSchema = z.object({
  businessType: z
    .string()
    .min(1, "Tipo de negocio es requerido")
    .refine(
      (val) => BUSINESS_TYPES.includes(val as typeof BUSINESS_TYPES[number]),
      "Seleccione un tipo de negocio válido",
    ),
  branchCount: z
    .number()
    .int("Número de sucursales debe ser un entero")
    .min(1, "Debe tener al menos 1 sucursal")
    .max(10000, "Número de sucursales debe ser menor a 10,000"),
  location: z
    .string()
    .min(1, "Localidad es requerida")
    .refine(
      (val) => ESTADOS_MEXICO.includes(val as typeof ESTADOS_MEXICO[number]),
      "Seleccione un estado válido",
    ),
  email: z
    .string()
    .min(1, "Email es requerido")
    .email("Debe ser un email válido")
    .max(254, "Email debe tener menos de 254 caracteres"),
  phone: z
    .string()
    .min(1, "Teléfono es requerido")
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Ingrese un teléfono válido (7-20 dígitos, opcionalmente con +)",
    ),
  message: z
    .string()
    .min(10, "Mensaje debe tener al menos 10 caracteres")
    .max(1000, "Mensaje debe tener menos de 1000 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Mensaje contiene etiquetas HTML"),
  productInterestIds: z
    .array(z.string())
    .min(1, "Seleccione al menos un servicio"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
