"use client";

import React from "react";
import { Restaurant } from "@/types/restaurant";
import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import RestaurantLinks from "./RestaurantLinks";
import { normalizeSlug } from "@/lib/normalizeSlug";
import { formatOpeningHours } from "@/lib/formattingHours";

export interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const t = useTranslations("RestaurantCard");

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

  const formatCuisine = (cuisine: string | undefined | null) => {
    if (!cuisine) return t("noCuisine");
    return cuisine
      .split(";")
      .map((c) => t(`${c.trim()}`))
      .join(", ");
  };

  const rating = restaurant.ratings?.length
    ? (
        restaurant.ratings.reduce(
          (sum: number, rating: { value: number }) => sum + rating.value,
          0
        ) / restaurant.ratings.length
      ).toFixed(1)
    : "0";

  const normalizedSlug = normalizeSlug(restaurant.slug);

  return (
    <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl bg-white shadow-soft hover:shadow-medium hover:border-primary/20 transition-all duration-300 overflow-hidden group">
      <Link
        href={{
          pathname: "/restaurant/[slug]",
          params: { slug: normalizedSlug },
        }}
        className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center lg:w-52 lg:h-auto lg:rounded-l-xl group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300"
      >
        <span className="text-gray-400 text-sm font-medium">
          {t("imagePlaceholder")}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link
          href={{
            pathname: "/restaurant/[slug]",
            params: { slug: normalizedSlug },
          }}
          className="hover:underline"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-primaryText">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-sm text-secondaryText">{rating}</span>
            </div>
          </div>
        </Link>

        <p className="text-sm text-secondaryText mt-2">
          <strong>{t("cuisine")}:</strong> {formatCuisine(restaurant.cuisine)}
        </p>

        <p className="text-sm text-secondaryText mt-2">
          <strong>{t("address")}:</strong> {restaurant.street}{" "}
          {restaurant.housenumber}, {restaurant.city}
        </p>

        {restaurant.openingHours && (
          <p className="text-sm text-secondaryText mt-2">
            <strong>{t("openingHours")}:</strong> {formattedHours}
          </p>
        )}

        <div className="flex gap-4 mt-4">
          <RestaurantLinks restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
