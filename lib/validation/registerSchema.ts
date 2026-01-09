import { z } from "zod";

export const createRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: t("emailRequired") })
        .email(t("invalidEmail")),
      password: z
        .string()
        .min(6, { message: t("passwordMin") })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
          {
            message: t("passwordRegex"),
          }
        ),
      name: z.string().min(1, { message: t("nameRequired") }),
      confirmPassword: z.string(),
      dateOfBirth: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true; // optional field
            const date = new Date(val);
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            const dayDiff = today.getDate() - date.getDate();
            const actualAge =
              monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
            return actualAge >= 13 && actualAge <= 120;
          },
          { message: t("dateOfBirthInvalid") }
        )
        .refine(
          (val) => {
            if (!val) return true;
            return new Date(val) < new Date();
          },
          { message: t("dateOfBirthFuture") }
        ),
      location: z.string().optional(),
      phoneNumber: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            if (!/^[+]?[0-9\s-()]+$/.test(val)) return false;
            const digitsOnly = val.replace(/\D/g, "");
            return digitsOnly.length >= 9 && digitsOnly.length <= 15;
          },
          {
            message: t("phoneInvalid"),
          }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMatch"),
      path: ["confirmPassword"],
    });
};

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
