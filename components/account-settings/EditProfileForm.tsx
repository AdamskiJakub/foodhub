"use client";

import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Save } from "lucide-react";

interface EditProfileFormProps {
  defaultValues: {
    name: string;
    dateOfBirth: string;
    location: string;
    phoneNumber: string;
  };
}

const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const t = useTranslations("UserSettings");
  const { control, handleSubmit, errors, onSubmit } =
    useProfileUpdate(defaultValues);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("editProfile")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information and contact details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              {t("name")} <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  className="mt-1.5"
                />
              )}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <Label
              htmlFor="dateOfBirth"
              className="text-sm font-medium text-gray-700"
            >
              {t("dateOfBirth")}
            </Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="dateOfBirth"
                  type="date"
                  className="mt-1.5"
                />
              )}
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              {t("phoneNumber")}
            </Label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phoneNumber"
                  type="text"
                  placeholder="123 456 789"
                  className="mt-1.5"
                />
              )}
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              {t("location")}
            </Label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="location"
                  type="text"
                  placeholder="Warsaw, Poland"
                  className="mt-1.5"
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button type="submit" className="px-6 py-2.5 flex items-center gap-2">
            <Save className="h-4 w-4" />
            {t("saveChanges")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
