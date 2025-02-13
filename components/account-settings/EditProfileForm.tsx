"use client";

import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

interface EditProfileFormProps {
  defaultValues: {
    name: string;
    dateOfBirth: string;
    location: string;
    phoneNumber: string;
    address: string;
  };
}

const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const t = useTranslations("UserSettings");
  const { control, handleSubmit, errors, onSubmit } =
    useProfileUpdate(defaultValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{t("name")}</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" className="w-full" />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("dateOfBirth")}
        </label>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <Input {...field} type="date" className="w-full" />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("location")}
        </label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" className="w-full" />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("phoneNumber")}
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" className="w-full" />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">{t("address")}</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" className="w-full" />
          )}
        />
      </div>
      <Button type="submit" className="w-full">
        {t("saveChanges")}
      </Button>
    </form>
  );
};

export default EditProfileForm;
