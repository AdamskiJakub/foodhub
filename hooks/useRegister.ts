import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { RegisterFormData } from "@/lib/validation/registerSchema";
import { BadRequestError, UnauthorizedError } from "@/lib/errors/api-error";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Register");

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
          location: data.location,
          phoneNumber: data.phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error(t("toastEmailTaken"));
          throw new BadRequestError("Email is already taken");
        }

        toast.error(t("toastRegisterError"));
        throw new BadRequestError(result.message || "Registration failed");
      }

      toast.success(t("toastRegisterSuccess"));
      setTimeout(() => router.push("/login"), 2000);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof BadRequestError) {
        return { success: false, error: error.message };
      }

      toast.error(t("toastRegisterError"));
      console.error("Registration error:", error);
      return { success: false, error: "Unknown error" };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};
