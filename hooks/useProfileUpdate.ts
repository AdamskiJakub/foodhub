"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  ProfileFormData,
  changeProfileSchema,
} from "@/lib/validation/userPanelSchema";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export const useProfileUpdate = (defaultValues: ProfileFormData) => {
  const t = useTranslations("UserSettings");
  const { data: session, update } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(changeProfileSchema(t)),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      console.log("🔹 Przed aktualizacją:", session?.user);
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(t("profileUpdatedSuccess"));
      await update(data);
      console.log("✅ Po aktualizacji:", session?.user);
    } catch (error) {
      toast.error(t("profileUpdateError"));
      console.error("Error updating profile:", error);
    }
  };

  return { control, handleSubmit, errors, onSubmit };
};
