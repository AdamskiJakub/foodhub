import React from "react";
import { Button } from "@/components/ui/button";
import { RestaurantFormValues } from "@/lib/validation/restaurantSchema";

import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";

interface PreviewStepProps {
  formData: RestaurantFormValues;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export default function PreviewStep({
  formData,
  onPreviousStep,
  onNextStep,
}: PreviewStepProps) {
  const t = useTranslations("AddRestaurant");

  const {
    name,
    slug,
    description,
    city,
    street,
    houseNumber,
    cuisine,
    email,
    phone,
    website,
    openingHours,
    delivery,
    takeaway,
    reservation,
  } = formData;

  const shortUrl = (url: string, maxLength: number = 20) => {
    return url.length <= maxLength ? url : `${url.slice(0, maxLength)}...`;
  };

  return (
    <div className="max-w-[1169px] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        {t("restaurantName")}: {name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 mt-11">
        <div className="max-w-[745px] w-full">
          <h2 className="text-[#121212] font-medium text-[20px] leading-[28px] mb-4">
            {t("fullRestaurantDescription")}:
          </h2>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description || ""}
            </ReactMarkdown>
          </div>
        </div>

        <div className="w-full lg:w-[383px] h-auto flex-shrink-0">
          <div className="lg:sticky lg:top-[139px]">
            <div
              className="bg-[#F5F5F5] p-6 rounded-md"
              style={{ boxShadow: "0px 2px 2px 0px rgba(28, 36, 51, 0.1)" }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    Slug
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {slug}
                  </p>
                </div>

                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    {t("location")}
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {city}, {street} {houseNumber}
                  </p>
                </div>

                {cuisine && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      {t("cuisine")}
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {cuisine}
                    </p>
                  </div>
                )}

                {website && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      {t("website")}
                    </p>
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#121212] font-medium text-[16px] leading-[28px] underline"
                    >
                      {shortUrl(website, 25)}
                    </a>
                  </div>
                )}

                {phone && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      {t("phone")}
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {phone}
                    </p>
                  </div>
                )}

                {email && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      {t("email")}
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {email}
                    </p>
                  </div>
                )}

                {openingHours && (
                  <div className="flex justify-between flex-wrap items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      {t("openingHours")}
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {openingHours}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    {t("delivery")}
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {delivery ? "Tak" : "Nie"}
                  </p>
                </div>

                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    {t("takeaway")}
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {takeaway ? "Tak" : "Nie"}
                  </p>
                </div>

                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    {t("reservation")}
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {reservation ? "Tak" : "Nie"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <Button
                  disabled
                  className="w-full flex gap-[10px] items-center justify-center bg-[#5647FF] text-white px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  <Image
                    src="/send.svg"
                    alt="Contact Now"
                    width={20}
                    height={20}
                    priority
                  />
                  {t("contactNow")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full border border-t-[#E5E7EB] bg-white py-4 px-6 flex items-start shadow-md z-50">
        <div className="flex flex-row gap-3 max-w-[1169px] mx-auto w-full items-center justify-start">
          <Button
            type="button"
            variant="outline"
            className="h-[48px] text-md w-[150px]"
            onClick={onPreviousStep}
          >
            &larr; {t("backToEdit")}
          </Button>

          <Button
            type="button"
            className="h-[48px] text-md px-6"
            onClick={onNextStep}
          >
            {t("submitAndPay")}
          </Button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/checkmark-green.svg"
              alt="Checked"
              width={20}
              height={20}
            />
            <span className="text-[#34D399] text-md font-normal">
              {t("agreeToTerms")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
