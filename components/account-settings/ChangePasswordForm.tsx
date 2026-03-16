"use client";

import { useChangePassword } from "@/hooks/useChangePassword";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Lock, Save } from "lucide-react";

const ChangePasswordForm = () => {
  const t = useTranslations("UserSettings");
  const { control, handleSubmit, errors, onSubmit } = useChangePassword();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Lock className="h-6 w-6" />
          {t("changePassword")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700"
            >
              {t("currentPassword")} <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="currentPassword"
                  type="password"
                  className="mt-1.5"
                />
              )}
            />
            {errors.currentPassword && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              {t("newPassword")} <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="newPassword"
                  type="password"
                  className="mt-1.5"
                />
              )}
            />
            {errors.newPassword && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <Label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-gray-700"
            >
              {t("confirmNewPassword")} <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmNewPassword"
                  type="password"
                  className="mt-1.5"
                />
              )}
            />
            {errors.confirmNewPassword && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 mb-2">
            Password requirements:
          </p>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>At least 6 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character (@$!%*?&)</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button type="submit" className="px-6 py-2.5 flex items-center gap-2">
            <Save className="h-4 w-4" />
            {t("changePassword")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
