"use client";

import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-[500px] bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center overflow-hidden">
      <div className="absolute top-10 left-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl will-change-transform"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-gradient-food opacity-10 rounded-full blur-3xl will-change-transform"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-success opacity-5 rounded-full blur-3xl will-change-transform"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primaryText mb-6 leading-tight">
          {t("title")}
        </h1>
        <p className="text-xl md:text-2xl text-secondaryText mb-12 max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
