"use client";

import React from "react";

import { Restaurant } from "@/types/restaurant";
import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import RestaurantLinks from "./RestaurantLinks";
import { normalizeSlug } from "@/lib/normalizeSlug";

export interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const t = useTranslations("RestaurantCard");

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
    <Link
      href={{
        pathname: "/restaurant/[slug]",
        params: { slug: normalizedSlug },
      }}
    >
      <div className="flex flex-col lg:flex-row border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center  lg:w-52 lg:h-auto lg:rounded-l-lg">
          <span className="text-gray-500 text-sm">{t("imagePlaceholder")}</span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-primaryText">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-sm text-secondaryText">{rating}</span>
            </div>
          </div>

          <p className="text-sm text-secondaryText mt-2">
            <strong>{t("cuisine")}:</strong> {formatCuisine(restaurant.cuisine)}
          </p>

          <p className="text-sm text-secondaryText mt-2">
            <strong>{t("address")}:</strong> {restaurant.street}{" "}
            {restaurant.housenumber}, {restaurant.city}
          </p>

          {restaurant.openingHours && (
            <p className="text-sm text-secondaryText mt-2">
              <strong>{t("openingHours")}:</strong> {restaurant.openingHours}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <RestaurantLinks restaurant={restaurant} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
