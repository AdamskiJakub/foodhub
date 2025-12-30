"use client";

import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import TechStack from "./TechStack";

const ContactSection = () => {
  const t = useTranslations("ContactPage");

  return (
    <section className="mx-auto w-full max-w-[1060px] px-4 py-16 pb-24">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
        <div className="order-1 flex w-full flex-col items-center md:items-start">
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent md:text-left md:pb-4 pb-0">
              {t("title")}
            </h1>
            <p className="mt-2 text-center text-xl md:text-2xl text-gray-700 md:text-left">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center md:items-start">
              <p className="text-sm text-gray-500">{t("authorLabel")}</p>
              <p className="text-lg font-semibold text-gray-800">
                {t("authorName")}
              </p>
            </div>
          </div>

          <div className="mt-8 w-full max-w-[600px]">
            <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-line">
              <span className="italic font-medium">{t("greeting")}</span>
              {"\n\n"}
              {t("intro")}
            </p>

            <p className="mt-6 text-lg leading-relaxed text-gray-700 font-medium">
              {t("contactCTA")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://portfolio-jakubs-projects-f8e02b26.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FaExternalLinkAlt size={20} />
                {t("portfolioButton")}
              </a>
              <a
                href="https://www.linkedin.com/in/jakub-adamski/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FaLinkedin size={20} />
                {t("linkedinButton")}
              </a>
              <a
                href="https://github.com/AdamskiJakub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FaGithub size={20} />
                {t("githubButton")}
              </a>
            </div>
          </div>
        </div>

        <div className="order-2 w-full max-w-[400px] md:sticky md:top-24">
          <TechStack />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
