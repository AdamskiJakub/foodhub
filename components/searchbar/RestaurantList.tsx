"use client";

import React from "react";
import { Restaurant } from "@/types/restaurant";

interface RestaurantListProps {
  filteredRestaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  filteredRestaurants,
}) => {
  return (
    <ul>
      {filteredRestaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>
            {restaurant.city}, {restaurant.street}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
