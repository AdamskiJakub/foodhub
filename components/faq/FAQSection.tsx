"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const t = useTranslations("FAQPage");

  const questions = [
    "howToAddRestaurant",
    "howToEditReview",
    "howToDeleteAccount",
    "howRatingWorks",
    "howToReportRestaurant",
    "canIChangePassword",
  ];

  return (
    <section className="mx-auto w-full max-w-[900px] px-4 pt-24 pb-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold md:pb-4 pb-0 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600">{t("subtitle")}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((key, index) => (
            <AccordionItem key={key} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-purple-600">
                {t(`questions.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {t(`questions.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          {t("noAnswerText")}{" "}
          <Link
            href="/contact"
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            {t("contactLinkText")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
