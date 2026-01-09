"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const t = useTranslations("FAQPage");

  const categories = [
    {
      key: "account",
      questions: ["canIChangePassword", "howToDeleteAccount"],
    },
    {
      key: "restaurants",
      questions: ["howToAddRestaurant", "howToReportRestaurant"],
    },
    {
      key: "reviews",
      questions: ["howToEditReview", "howRatingWorks"],
    },
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
        {categories.map((category, categoryIndex) => (
          <div
            key={category.key}
            className={categoryIndex > 0 ? "pt-8 mt-8" : ""}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t(`categories.${category.key}`)}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((questionKey, index) => (
                <AccordionItem
                  key={questionKey}
                  value={`${category.key}-${index}`}
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-purple-600">
                    {t(`questions.${questionKey}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {t(`questions.${questionKey}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">{t("noAnswerText")}</p>
        <Button asChild size="lg">
          <Link href="/contact">{t("contactLinkText")}</Link>
        </Button>
      </div>
    </section>
  );
};

export default FAQSection;
