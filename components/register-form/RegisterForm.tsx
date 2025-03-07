"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  createRegisterSchema,
} from "@/lib/validation/registerSchema";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const t = useTranslations("Register");
  const {
    control,
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
      address: "",
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
          location: data.location,
          phoneNumber: data.phoneNumber,
          address: data.address,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(t("toastRegisterSuccess"));
        setTimeout(() => router.push("/login"), 5000);
      } else {
        if (result.message === "Email is already taken") {
          toast.error(t("toastEmailTaken"));
        } else {
          toast.error(t("toastRegisterError"));
        }
      }
    } catch (error) {
      toast.error(t("toastRegisterError"));
      console.error("Registration error:", error);
    }
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("confirmPassword")}
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="w-full p-2 border rounded"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
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
            <input
              {...field}
              type="date"
              className="w-full p-2 border rounded"
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("nameAndSurname")}
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded"
            />
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
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded"
            />
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
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded"
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("address")}</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded"
            />
          )}
        />
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
