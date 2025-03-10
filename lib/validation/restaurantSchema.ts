import { z } from "zod";

export const createRestaurantSchema = (
  t: (key: string, params?: Record<string, string | number>) => string
) =>
  z.object({
    name: z.string().min(1, t("required")),
    description: z.string().min(10, t("minLength", { min: 10 })),
    city: z.string().min(1, t("required")),
    slug: z.string().optional(),
    street: z.string().min(1, t("required")),
    houseNumber: z.string().min(1, t("required")),
    cuisine: z.string().min(1, t("required")),
    email: z.string().email(t("invalidEmail")).or(z.literal("")).optional(),
    phone: z.string().min(6, t("invalidPhone")),
    website: z.string().url(t("invalidUrl")).or(z.literal("")).optional(),
    openingHours: z.string().min(1, t("required")),
    delivery: z.boolean().optional(),
    takeaway: z.boolean().optional(),
    reservation: z.boolean().optional(),
    wheelchair: z.boolean().optional(),
  });

export type RestaurantFormValues = z.infer<
  ReturnType<typeof createRestaurantSchema>
>;
