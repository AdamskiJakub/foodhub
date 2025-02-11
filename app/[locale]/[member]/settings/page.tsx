"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/lib/validation/changePassword";

const UserSettingsPage = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("UserSettings");
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<
    "profile" | "changePassword"
  >("profile");

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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!session) {
    return null;
  }

  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = async (
    data
  ) => {
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

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">{t("options")}</h2>
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setActiveSection("profile")}
              >
                {t("profileInfo")}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setActiveSection("changePassword")}
              >
                {t("changePassword")}
              </Button>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
          {activeSection === "profile" ? (
            <>
              <h2 className="text-lg font-semibold mb-4">{t("profileInfo")}</h2>
              <p>
                <strong>{t("email")}:</strong> {session.user.email}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {t("changePassword")}
              </h2>
              <form
                onSubmit={handleSubmit(handleChangePassword)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("currentPassword")}
                  </label>
                  <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("newPassword")}
                  </label>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("confirmNewPassword")}
                  </label>
                  <Controller
                    name="confirmNewPassword"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {t("changePassword")}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
