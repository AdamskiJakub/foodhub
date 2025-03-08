"use client";

import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  restaurantSchema,
  RestaurantFormValues,
} from "@/lib/validation/restaurantSchema";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

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
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      city: "",
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
      wheelchair: "",
      ...initialData,
    },
  });

  const t = useTranslations("AddRestaurant");

  const formValues = watch();
  const prevFormValues = useRef(formValues);

  useEffect(() => {
    if (JSON.stringify(formValues) !== JSON.stringify(prevFormValues.current)) {
      prevFormValues.current = formValues;
    }
  }, [formValues]);

  const onSubmit = (data: RestaurantFormValues) => {
    onNextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col">
            <label className="font-semibold mb-1">{t("restaurantName")}</label>
            <input
              {...field}
              placeholder="e.g. McDonald"
              className="border rounded px-3 py-2 h-[48px]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
      />

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
                onChange={({ text }: { text: string }) => field.onChange(text)}
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

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col">
            <label className="font-semibold mb-1">{t("city")}</label>
            <input
              {...field}
              placeholder="e.g. Białystok"
              className="border rounded px-3 py-2 h-[48px]"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
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
              placeholder="e.g. Jana Kilińskiego"
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
              placeholder="e.g. 7/1"
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
              placeholder="e.g. Italian, Mediterranean"
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
              placeholder="e.g. info@restaurant.com"
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
              placeholder="e.g. +48 570 937 111"
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
              placeholder="e.g. https://www.restaurant.com"
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
              placeholder="e.g. Mo-Th 11:00-22:00; Fr-Sa 11:00-23:00"
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
