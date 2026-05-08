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

// Categorías de productos para el formulario
export const PRODUCT_CATEGORIES = [
  "Acompañantes",
  "Azúcar y Endulzantes",
  "Estuchados",
  "Papas y Botanas",
  "Proteína",
  "Repostería",
  "Salsas y Aderezos",
  "Verduras y Leguminosas",
  "Quesos",
  "Quiero ser proveedor",
] as const;

export const contactSchema = z.object({
  contactName: z
    .string()
    .min(1, "Nombre del contacto es requerido")
    .max(100, "Nombre debe tener menos de 100 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Nombre contiene etiquetas HTML"),
  companyName: z
    .string()
    .min(1, "Nombre de la empresa es requerido")
    .max(150, "Nombre de empresa debe tener menos de 150 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Nombre de empresa contiene etiquetas HTML"),
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
  businessType: z
    .string()
    .min(1, "Giro del negocio es requerido")
    .refine(
      (val) => BUSINESS_TYPES.includes(val as typeof BUSINESS_TYPES[number]),
      "Seleccione un giro de negocio válido",
    ),
  branchCount: z
    .number()
    .int("Número de sucursales debe ser un entero")
    .min(1, "Debe tener al menos 1 sucursal")
    .max(10000, "Número de sucursales debe ser menor a 10,000"),
  state: z
    .string()
    .min(1, "Estado es requerido")
    .refine(
      (val) => ESTADOS_MEXICO.includes(val as typeof ESTADOS_MEXICO[number]),
      "Seleccione un estado válido",
    ),
  locality: z
    .string()
    .min(1, "Localidad o Código Postal es requerido")
    .max(100, "Localidad debe tener menos de 100 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Localidad contiene etiquetas HTML"),
  categories: z
    .array(z.string())
    .min(1, "Seleccione al menos una categoría")
    .refine(
      (arr) => arr.every((val) => PRODUCT_CATEGORIES.includes(val as typeof PRODUCT_CATEGORIES[number])),
      "Una o más categorías no son válidas",
    ),
  message: z
    .string()
    .min(10, "Mensaje debe tener al menos 10 caracteres")
    .max(1000, "Mensaje debe tener menos de 1000 caracteres")
    .refine((val) => !htmlTagRegex.test(val), "Mensaje contiene etiquetas HTML"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
