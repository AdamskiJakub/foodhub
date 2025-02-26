"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import { RestaurantCardProps } from "./RestaurantCard";

const RestaurantLinks: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const t = useTranslations("RestaurantCard");

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
      {restaurant.phone && typeof restaurant.phone === "string" && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `tel:${restaurant.phone}`;
          }}
          className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText cursor-pointer"
        >
          <FaPhone />
          {t("phone")}
        </span>
      )}
      {restaurant.email && typeof restaurant.email === "string" && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `mailto:${restaurant.email}`;
          }}
          className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText cursor-pointer"
        >
          <FaEnvelope />
          {t("email")}
        </span>
      )}
      {restaurant.website && typeof restaurant.website === "string" && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              restaurant.website ?? "",
              "_blank",
              "noopener noreferrer"
            );
          }}
          className="flex items-center gap-2 text-sm text-secondaryText hover:text-primaryText cursor-pointer"
        >
          <FaGlobe />
          {t("website")}
        </span>
      )}
    </div>
  );
};

export default RestaurantLinks;
