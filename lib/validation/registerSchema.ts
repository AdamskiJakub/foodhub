import { z } from "zod";

export const createRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z.string().email(t("invalidEmail")),
      password: z
        .string()
        .min(6, { message: t("passwordMin") })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
          {
            message: t("passwordRegex"),
          }
        ),
      name: z.string(),
      confirmPassword: z.string(),
      dateOfBirth: z.string().optional(),
      location: z.string().optional(),
      phoneNumber: z.string().optional(),
      address: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMatch"),
      path: ["confirmPassword"],
    });
};

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
