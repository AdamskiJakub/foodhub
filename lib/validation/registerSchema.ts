import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

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
        .superRefine((val, ctx) => {
          if (!val) return;
          const date = new Date(val);
          const today = new Date();
          const birthDateAtMidnight = new Date(date);
          birthDateAtMidnight.setHours(0, 0, 0, 0);
          const todayAtMidnight = new Date(today);
          todayAtMidnight.setHours(0, 0, 0, 0);

          if (birthDateAtMidnight >= todayAtMidnight) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("dateOfBirthFuture"),
            });
            return;
          }

          const age = today.getFullYear() - date.getFullYear();
          const monthDiff = today.getMonth() - date.getMonth();
          const dayDiff = today.getDate() - date.getDate();
          const actualAge =
            monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

          if (actualAge < 13 || actualAge > 120) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("dateOfBirthInvalid"),
            });
          }
        }),
      location: z.string().optional(),
      phoneNumber: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            return isValidPhoneNumber(val);
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
