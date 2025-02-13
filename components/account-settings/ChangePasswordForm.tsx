"use client";

import { useChangePassword } from "@/hooks/useChangePassword";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

const ChangePasswordForm = () => {
  const t = useTranslations("UserSettings");
  const { control, handleSubmit, errors, onSubmit } = useChangePassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
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
  );
};

export default ChangePasswordForm;
