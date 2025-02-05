import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LogoSection = () => {
  const t = useTranslations("Navbar");

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/placeholder.svg"
        alt="Logo"
        width={32}
        height={32}
        className="md:w-8 md:h-8 w-6 h-6"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-primaryText leading-tight md:text-base text-xs">
          {t("name")}
        </span>
        <span className="font-semibold text-secondaryText leading-tight md:text-xs text-tiny">
          {t("subname")}
        </span>
      </div>
    </div>
  );
};

export default LogoSection;
