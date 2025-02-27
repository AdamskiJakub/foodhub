"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Restaurant } from "@/types/restaurant";
import notFound from "@/app/[locale]/not-found";
import { useTranslations } from "next-intl";
import { formatOpeningHours } from "@/lib/formattingHours";
import BreadcrumbComponent from "../breadcrumb/Breadcrumb";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  const t = useTranslations("RestaurantDetails");

  const dayTranslations = {
    Mo: t("Mo"),
    Tu: t("Tu"),
    We: t("We"),
    Th: t("Th"),
    Fr: t("Fr"),
    Sa: t("Sa"),
    Su: t("Su"),
  };

  const formattedHours = formatOpeningHours(
    restaurant.openingHours,
    t,
    dayTranslations
  );

  if (!restaurant) {
    return notFound();
  }

  const formatCuisine = (cuisine: string | undefined | null) => {
    if (!cuisine) return t("noCuisine");
    return cuisine
      .split(";")
      .map((c) => t(`${c.trim()}`))
      .join(", ");
  };

  return (
    <div className="max-w-[1169px] mx-auto py-8">
      <BreadcrumbComponent
        customSegments={[
          { label: "home", href: "/", isTranslation: true },
          { label: "restaurant", isTranslation: true },
          { label: restaurant.name, isTranslation: false },
        ]}
      />
      <div className="flex flex-col lg:flex-row gap-8 mt-11">
        <div className="max-w-[745px] w-full">
          <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>

          {restaurant.description && (
            <div className="prose prose-neutral text-secondaryText font-normal text-md mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {restaurant.description}
              </ReactMarkdown>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-2">{t("contact")}</h2>

            {restaurant.phone && (
              <p className="text-[#706D91] font-normal text-md">
                {t("phone")}: {restaurant.phone}
              </p>
            )}
            {restaurant.email && (
              <a
                href={`mailto:${restaurant.email}`}
                className="text-[#706D91] font-normal text-md"
              >
                Email: {restaurant.email}
              </a>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[383px] h-auto flex-shrink-0">
          <div className="lg:sticky lg:top-[139px]">
            <div
              className="bg-[#F5F5F5] p-6 rounded-md"
              style={{ boxShadow: "0px 2px 2px 0px rgba(28, 36, 51, 0.1)" }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                  <p className="text-secondaryText font-normal text-md">
                    {t("location")}
                  </p>
                  <p className="text-primaryText font-medium text-[16px] leading-[28px]">
                    {restaurant.city}, {restaurant.country}
                  </p>
                  <p className="text-primaryText font-normal text-md">
                    {restaurant.street} {restaurant.housenumber},{" "}
                    {restaurant.city}
                  </p>
                </div>

                {restaurant.openingHours && (
                  <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                    <p className="text-secondaryText font-normal text-md">
                      {t("openingHours")}
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {formattedHours}
                    </p>
                  </div>
                )}

                {restaurant.cuisine && (
                  <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                    <p className="text-secondaryText font-normal text-md">
                      {t("cuisine")}
                    </p>
                    <p className="text-primaryText font-medium text-[16px] leading-[28px]">
                      {formatCuisine(restaurant.cuisine)}
                    </p>
                  </div>
                )}
                {restaurant.website && (
                  <div className="flex flex-col gap-2 pb-4">
                    <p className="text-secondaryText font-normal text-md">
                      {t("website")}
                    </p>
                    <Link href={restaurant.website} target="blank">
                      <Button
                        rel="noopener noreferrer"
                        className="mt-2 w-full flex gap-[10px] items-center justify-center text-white px-4 py-3 rounded-lg"
                      >
                        <Image
                          src="/images/send.svg"
                          width={20}
                          height={20}
                          alt="send"
                        />
                        {t("website")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
