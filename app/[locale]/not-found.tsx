"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-start justify-start px-4 lg:px-20 bg-beige py-12 lg:py-32">
      <h1 className="text-primaryText font-medium lg:text-6xl tracking-tight text-3xl">
        {t("title")}
      </h1>

      <p className="lg:mt-6 text-primaryText font-normal text-base tracking-tight max-w-notFoundText mt-4">
        {t("description")}
      </p>

      <div className="mt-4 md:mt-6 max-w-40  border border-dark-border rounded-md">
        <Link href="/" className="h-10">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
