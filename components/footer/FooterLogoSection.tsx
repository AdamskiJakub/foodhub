import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FooterLogoSection = () => {
  const t = useTranslations("Footer");

  return (
    <div className="flex items-start gap-2">
      <Image
        src="/weight.svg"
        alt="Logo"
        width={32}
        height={32}
        className="md:w-8 md:h-8 w-6 h-6"
      />
      <div className="flex flex-col">
        <span className="text-primaryText text-xs md:text-base font-semibold tracking-[-tightest]">
          {t("name")}
        </span>
        <span className="text-secondaryText text-tiny md:text-xs font-semibold tracking-[-tightest]">
          {t("subname")}
        </span>
      </div>
    </div>
  );
};

export default FooterLogoSection;
