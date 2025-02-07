import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().email(t("invalidEmail")),
    password: z.string().min(3, t("invalidPassword")),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
