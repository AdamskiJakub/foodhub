"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  createRegisterSchema,
} from "@/lib/validation/registerSchema";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";

const RegisterForm = () => {
  const t = useTranslations("Register");
  const { register: registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      location: "",
      phoneNumber: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl items-center align-middle justify-center mx-auto px-4 my-20"
    >
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <div className="space-y-2">
        <Label htmlFor="email">
          {t("email")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {t("password")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={t("passwordPlaceholder")}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {t("confirmPassword")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          {t("nameAndSurname")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder={t("nameAndSurnamePlaceholder")}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
        <Input
          id="dateOfBirth"
          type="date"
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 13))
              .toISOString()
              .split("T")[0]
          }
          min={
            new Date(new Date().setFullYear(new Date().getFullYear() - 120))
              .toISOString()
              .split("T")[0]
          }
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t("location")}</Label>
        <Input
          id="location"
          type="text"
          placeholder={t("locationPlaceholder")}
          {...register("location")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
        <Input
          id="phoneNumber"
          type="text"
          placeholder={t("phoneNumberPlaceholder")}
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full p-2 text-white rounded">
        {t("submit")}
      </Button>
      <p className="text-center">
        {t("haveAccount")}{" "}
        <Link href="/login" className="text-blue-500">
          {t("loginLink")}
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
