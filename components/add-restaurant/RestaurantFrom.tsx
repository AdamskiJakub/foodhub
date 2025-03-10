import React, { useEffect, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRestaurantSchema,
  RestaurantFormValues,
} from "@/lib/validation/restaurantSchema";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { generateSlug } from "@/lib/generateSlug";
import { Checkbox } from "@/components/ui/checkbox";

const ReactMarkdownEditor = dynamic(
  () => import("react-markdown-editor-lite"),
  {
    ssr: false,
  }
);

interface RestaurantFormProps {
  onNextStep: (data: RestaurantFormValues) => void;
  initialData?: Partial<RestaurantFormValues>;
}

export default function RestaurantForm({
  onNextStep,
  initialData,
}: RestaurantFormProps) {
  const t = useTranslations("AddRestaurant");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(createRestaurantSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      city: "",
      slug: "",
      street: "",
      houseNumber: "",
      cuisine: "",
      email: "",
      phone: "",
      website: "",
      openingHours: "",
      delivery: false,
      takeaway: false,
      reservation: false,
      wheelchair: false,
      ...initialData,
    },
  });

  const formValues = watch();
  const prevFormValues = useRef(formValues);

  const handleSlugGeneration = useCallback(() => {
    const slug = generateSlug(formValues.name);
    setValue("slug", slug);
  }, [formValues.name, setValue]);

  useEffect(() => {
    if (JSON.stringify(formValues) !== JSON.stringify(prevFormValues.current)) {
      prevFormValues.current = formValues;
    }
  }, [formValues]);

  const onSubmit = (data: RestaurantFormValues) => {
    onNextStep(data);
  };

  useEffect(() => {
    handleSlugGeneration();
  }, [formValues.name, handleSlugGeneration]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">
                {t("restaurantName")}
              </label>
              <input
                {...field}
                placeholder={t("restaurantNamePlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("city")}</label>
              <input
                {...field}
                placeholder={t("cityPlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("street")}</label>
              <input
                {...field}
                placeholder={t("streetPlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="houseNumber"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("houseNumber")}</label>
              <input
                {...field}
                placeholder={t("houseNumberPlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.houseNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.houseNumber.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="cuisine"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("cuisine")}</label>
              <input
                {...field}
                placeholder={t("cuisinePlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.cuisine && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cuisine.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("email")}</label>
              <input
                {...field}
                placeholder={t("emailPlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("phone")}</label>
              <input
                {...field}
                placeholder={t("phonePlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("website")}</label>
              <input
                {...field}
                placeholder={t("websitePlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="openingHours"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("openingHours")}</label>
              <input
                {...field}
                placeholder={t("openingHoursPlaceholder")}
                className="border rounded px-3 py-2 h-[48px]"
              />
              {errors.openingHours && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.openingHours.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex flex-col">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label className="font-semibold mb-1">{t("description")}</label>
              <div className="relative border border-gray-300 rounded bg-white px-3 py-2 min-h-[100px]">
                {!field.value && (
                  <p className="absolute inset-0 px-6 py-4 text-gray-400 font-normal text-[16px] leading-[24px] pointer-events-none">
                    {t("describeRestaurant")}
                  </p>
                )}
                <ReactMarkdownEditor
                  value={field.value || ""}
                  style={{ height: "300px" }}
                  onChange={({ text }: { text: string }) =>
                    field.onChange(text)
                  }
                  renderHTML={(text: string) => (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {text}
                    </ReactMarkdown>
                  )}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex flex-row gap-6">
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="delivery"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="delivery" className="font-semibold">
                {t("delivery")}
              </label>
              {errors.delivery && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.delivery.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="takeaway"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="takeaway"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="takeaway" className="font-semibold">
                {t("takeaway")}
              </label>
              {errors.takeaway && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.takeaway.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="reservation"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reservation"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="reservation" className="font-semibold">
                {t("reservation")}
              </label>
              {errors.reservation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reservation.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="wheelchair"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wheelchair"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor="wheelchair" className="font-semibold">
                {t("wheelchair")}
              </label>
              {errors.wheelchair && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.wheelchair.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full border border-t-[#E5E7EB] bg-white py-4 px-6 flex items-start shadow-md z-50">
        <div className="flex flex-row gap-3 max-w-[1169px] mx-auto w-full items-center justify-start">
          <Button
            type="submit"
            className="h-[48px] text-md w-[89px]"
            disabled={!isValid}
          >
            {t("nextButton")}
          </Button>
          {!isValid && (
            <p className="text-md text-black opacity-60 font-normal">
              {t("fillRequiredFields")}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
