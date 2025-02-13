import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/lib/validation/userPanelSchema";
import { useTranslations } from "next-intl";

export const useChangePassword = () => {
  const t = useTranslations("UserSettings");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(t("passwordChangedSuccess"));
      reset();
    } catch (error) {
      toast.error(t("passwordChangeError"));
      console.error("Error changing password:", error);
    }
  };

  return { control, handleSubmit, errors, onSubmit };
};
