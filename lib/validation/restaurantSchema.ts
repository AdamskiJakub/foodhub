import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const openingHoursRegex =
  /^([A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(-[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)?\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}(;\s*[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(-[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)?\s+\d{1,2}:\d{2}-\d{1,2}:\d{2})*)$/;

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
    phone: z
      .string()
      .optional()
      .refine((value) => !value || isValidPhoneNumber(value), {
        message: t("invalidPhone"),
      })
      .refine((value) => !value || value.trim().length > 0, {
        message: t("phoneRequiredIfFilled"),
      }),
    website: z.string().url(t("invalidUrl")).or(z.literal("")).optional(),
    openingHours: z
      .string()
      .min(1, t("required"))
      .refine((value) => openingHoursRegex.test(value), {
        message: t("invalidOpeningHours"),
      }),
    delivery: z.boolean().optional(),
    takeaway: z.boolean().optional(),
    reservation: z.boolean().optional(),
    wheelchair: z.boolean().optional(),
  });

export type RestaurantFormValues = z.infer<
  ReturnType<typeof createRestaurantSchema>
>;
