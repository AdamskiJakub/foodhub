"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const FooterLegal = () => {
  const t = useTranslations("Footer");

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-8 pt-8 gap-3 px-4 md:px-10 lg:px-20 -mx-4 md:-mx-10 lg:-mx-20 border-t border-purple-200/50 mt-8">
      <p className="text-secondaryText text-xs">© {currentYear} FoodHub</p>

      <div className="flex items-center text-xs">
        <span className="text-secondaryText mr-1">{t("realization")}</span>
        <Link
          href="https://www.linkedin.com/in/jakub-adamski96/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primaryText hover:text-primary transition-colors duration-200"
        >
          Jakub Adamski
        </Link>
      </div>
    </div>
  );
};

export default FooterLegal;
