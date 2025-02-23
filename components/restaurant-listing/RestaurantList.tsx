"use client";

import React from "react";
import { Restaurant } from "@/types/restaurant";
import RestaurantCard from "./RestaurantCard";
import Pagination from "../ui/pagination/Pagination";

interface RestaurantListProps {
  filteredRestaurants: Restaurant[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  filteredRestaurants,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <div className="w-full flex flex-row justify-center mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default RestaurantList;
