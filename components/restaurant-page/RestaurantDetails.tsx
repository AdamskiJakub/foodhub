"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Restaurant } from "@/types/restaurant";
import notFound from "@/app/[locale]/not-found";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="max-w-[1169px] mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8 mt-11">
        <div className="max-w-[745px] w-full">
          <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>

          {restaurant.description && (
            <div className="prose prose-neutral text-[#706D91] font-normal text-[16px] leading-[26px] mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {restaurant.description}
              </ReactMarkdown>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
              {restaurant.street} {restaurant.housenumber}, {restaurant.city}
            </p>
            {restaurant.phone && (
              <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                Phone: {restaurant.phone}
              </p>
            )}
            {restaurant.email && (
              <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                Email: {restaurant.email}
              </p>
            )}
            {restaurant.website && (
              <a
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] font-medium text-[16px] leading-[28px] underline"
              >
                Website
              </a>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[383px] h-auto flex-shrink-0">
          <div className="lg:sticky lg:top-[139px]">
            <div
              className="bg-[#F5F5F5] p-6 rounded-md"
              style={{ boxShadow: "0px 2px 2px 0px rgba(28, 36, 51, 0.1)" }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                  <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                    Location
                  </p>
                  <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                    {restaurant.city}, {restaurant.country}
                  </p>
                </div>

                {restaurant.openingHours && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      Opening Hours
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {restaurant.openingHours}
                    </p>
                  </div>
                )}

                {restaurant.cuisine && (
                  <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4">
                    <p className="text-[#706D91] font-normal text-[16px] leading-[26px]">
                      Cuisine
                    </p>
                    <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                      {restaurant.cuisine}
                    </p>
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
