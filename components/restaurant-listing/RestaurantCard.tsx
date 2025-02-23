"use client";

import React from "react";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";
import { useTranslations } from "next-intl";
import { FaPhone, FaEnvelope, FaGlobe, FaStar } from "react-icons/fa";

interface RestaurantCardProps {
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

  return (
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
          {restaurant.phone && (
            <Link
              href={`tel:${restaurant.phone}`}
              className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText"
            >
              <FaPhone />
              {t("phone")}
            </Link>
          )}
          {restaurant.email && (
            <Link
              href={`mailto:${restaurant.email}`}
              className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText"
            >
              <FaEnvelope />
              {t("email")}
            </Link>
          )}
          {restaurant.website && (
            <Link
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText"
            >
              <FaGlobe />
              {t("website")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
