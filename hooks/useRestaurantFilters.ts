import { useState, useEffect, useCallback } from "react";
import { filterByCuisine, filterByBooleanFlag } from "@/lib/filters";
import { Restaurant } from "@/types/restaurant";
import { Filters } from "@/types/filters";

export const useRestaurantFilters = (
  restaurants: Restaurant[],
  cityName: string | null,
  searchTerm: string,
  sortOrder: string,
  isOpenNow: (
    openingHours: string | null | undefined,
    latitude?: number,
    longitude?: number
  ) => boolean
) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [activeFilters, setActiveFilters] = useState<Filters>({
    cuisine: "",
    delivery: "",
    takeaway: "",
    reservation: "",
    openingHours: "",
  });
  const [selectedFilters, setSelectedFilters] =
    useState<Filters>(activeFilters);

  const filterAndSortRestaurants = useCallback(() => {
    let filtered = restaurants;

    if (cityName) {
      filtered = filtered.filter((restaurant) => restaurant.city === cityName);
    }

    filtered = filtered.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeFilters.cuisine) {
      filtered = filterByCuisine(filtered, activeFilters.cuisine);
    }

    if (activeFilters.delivery) {
      filtered = filterByBooleanFlag(
        filtered,
        activeFilters.delivery,
        "delivery"
      );
    }

    if (activeFilters.takeaway) {
      filtered = filterByBooleanFlag(
        filtered,
        activeFilters.takeaway,
        "takeaway"
      );
    }

    if (activeFilters.openingHours === "open_now") {
      filtered = filtered.filter((restaurant) =>
        isOpenNow(
          restaurant.openingHours ?? undefined,
          restaurant.latitude,
          restaurant.longitude
        )
      );
    }

    if (activeFilters.reservation) {
      filtered = filterByBooleanFlag(
        filtered,
        activeFilters.reservation,
        "reservation"
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, cityName, sortOrder, activeFilters, isOpenNow]);

  useEffect(() => {
    filterAndSortRestaurants();
  }, [filterAndSortRestaurants]);

  const handleApplyFilters = (filters: Filters) => {
    setActiveFilters(filters);
    setSelectedFilters(filters);
  };

  const resetFilters = () => {
    setActiveFilters({
      cuisine: "",
      delivery: "",
      takeaway: "",
      reservation: "",
      openingHours: "",
    });
    setFilteredRestaurants([]);
  };

  return {
    filteredRestaurants,
    activeFilters,
    selectedFilters,
    handleApplyFilters,
    resetFilters,
    setSelectedFilters,
  };
};
