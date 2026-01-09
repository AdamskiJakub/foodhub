import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { UnauthorizedError } from "@/lib/errors/api-error";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Login");

  const login = async (data: LoginData) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(t("toastLoginError"));
        throw new UnauthorizedError("Invalid credentials");
      }

      if (result?.ok) {
        toast.success(t("toastLoginSuccess"));
        router.push("/");
        router.refresh();
        return { success: true };
      }

      throw new Error("Unknown error");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { success: false, error: error.message };
      }

      toast.error(t("toastLoginError"));
      console.error("Login error:", error);
      return { success: false, error: "Unknown error" };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
