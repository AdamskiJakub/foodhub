"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const FooterLegal = () => {
  const t = useTranslations("Footer");

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between pb-4 gap-2">
      <p className="text-primaryText text-xs leading-6">
        {currentYear}. {t("allRightsReserved")}
      </p>

      <div className="flex items-center text-xs leading-6">
        <span className="text-secondaryText mr-1">{t("realization")}</span>
        <Link
          href="https://www.linkedin.com/in/jakub-adamski96/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline decoration-solid decoration-[#222222]"
        >
          Jakub Adamski
        </Link>
      </div>
    </div>
  );
};

export default FooterLegal;
