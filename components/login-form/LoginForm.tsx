"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoginSchema, LoginFormData } from "@/lib/validation/loginSchema";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n/routing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
  locale: Locale;
}

const LoginForm = ({ locale }: Props) => {
  const t = useTranslations("Login");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Locale in LoginForm:", locale);

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(t("toastLoginError"));
        setEmailError(true);
        setPasswordError(true);
      } else {
        toast.success(t("toastLoginSuccess"));
        setEmailError(false);
        setPasswordError(false);
        router.push(`/${locale}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(t("toastLoginError"));
      setEmailError(true);
      setPasswordError(true);
    }
  };

  const handleFieldChange = (field: string) => {
    if (field === "email") setEmailError(false);
    if (field === "password") setPasswordError(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl items-center align-middle justify-center mx-auto px-4 my-20"
    >
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <div>
        <label className="block text-sm font-medium mb-2">{t("email")}</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className={`w-full p-2 border rounded ${
                errors.email || emailError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e) => {
                field.onChange(e);
                handleFieldChange("email");
              }}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("password")}
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className={`w-full p-2 border rounded ${
                errors.password || passwordError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={(e) => {
                field.onChange(e);
                handleFieldChange("password");
              }}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full p-2 text-white rounded">
        {t("submit")}
      </Button>

      <p className="text-center">
        {t("noAccount")}{" "}
        <Link href={`/${locale}/register`} className="text-blue-500">
          {t("registerLink")}
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
