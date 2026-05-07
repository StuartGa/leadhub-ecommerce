import { z } from "zod/v4";

const htmlTagRegex = /<\/?[^>]+(>|$)/;

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(60, "First name must be under 60 characters")
    .regex(/^[^<>]*$/, "First name contains invalid characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(60, "Last name must be under 60 characters")
    .regex(/^[^<>]*$/, "Last name contains invalid characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .max(254, "Email must be under 254 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Enter a valid phone number (7-20 digits, optionally starting with +)",
    ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters")
    .refine((val) => !htmlTagRegex.test(val), "Message contains HTML tags"),
  productInterest: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
