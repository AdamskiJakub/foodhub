import { z } from "zod";

export const changePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: t("currentPasswordRequired") }),
      newPassword: z
        .string()
        .min(6, { message: t("passwordMin") })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
          { message: t("passwordRegex") }
        ),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("passwordMatch"),
      path: ["confirmNewPassword"],
    });

export type ChangePasswordFormData = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
