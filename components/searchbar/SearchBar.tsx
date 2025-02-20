"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import FiltersModal from "./FiltersModal";
import LocationSortDropdowns from "./LocationSortDropdown";
import SearchInput from "./SearchInput";
import RestaurantList from "./RestaurantList";
import { useTranslations } from "next-intl";
import opening_hours from "opening_hours";

interface SearchBarProps {
  restaurants: Restaurant[];
}

export interface Filters {
  cuisine: string;
  delivery: string;
  takeaway: string;
  reservation: string;
  openingHours: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ restaurants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Białystok");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    cuisine: "",
    delivery: "",
    takeaway: "",
    reservation: "",
    openingHours: "",
  });

  const t = useTranslations("FiltersModal");

  const sanitizeOpeningHours = useCallback(
    (openingHours: string | undefined) => {
      if (!openingHours) return undefined;

      return openingHours
        .replace(/PH/g, "")
        .replace(/,,/g, ",")
        .replace(/,$/, "")
        .replace(/,\s*$/, "")
        .replace(/\s*,\s*/g, ";");
    },
    []
  );

  const isOpenNow = useCallback(
    (
      openingHours: string | undefined,
      latitude?: number,
      longitude?: number
    ) => {
      const sanitizedHours = sanitizeOpeningHours(openingHours);
      if (!sanitizedHours) return false;

      try {
        const nominatimObject = {
          lat: latitude ?? 53.1325,
          lon: longitude ?? 23.1688,
          address: {
            country_code: "PL",
            state: "Podlaskie",
            city: "Białystok",
          },
        };

        const oh = new opening_hours(sanitizedHours, nominatimObject);
        return oh.getState();
      } catch (error) {
        console.error("Error with opening_hours:", error);
        return false;
      }
    },
    [sanitizeOpeningHours]
  );

  const filterAndSortRestaurants = useCallback(() => {
    let filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        restaurant.city === location
    );

    if (activeFilters.cuisine) {
      filtered = filtered.filter((restaurant) => {
        if (!restaurant.cuisine) return false;
        const cuisinesArray = restaurant.cuisine
          .split(";")
          .map((c) => c.trim());
        return cuisinesArray.includes(activeFilters.cuisine);
      });
    }

    if (activeFilters.delivery) {
      filtered = filtered.filter((restaurant) => {
        const hasDelivery =
          typeof restaurant.delivery === "string" ||
          restaurant.delivery === true;
        return activeFilters.delivery === "yes" ? hasDelivery : !hasDelivery;
      });
    }

    if (activeFilters.takeaway) {
      filtered = filtered.filter((restaurant) => {
        const hasTakeaway =
          typeof restaurant.takeaway === "string" ||
          restaurant.takeaway === true;
        return activeFilters.takeaway === "yes" ? hasTakeaway : !hasTakeaway;
      });
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
      filtered = filtered.filter((restaurant) => {
        const hasReservation =
          typeof restaurant.reservation === "string" ||
          restaurant.reservation === true;
        return activeFilters.reservation === "yes"
          ? hasReservation
          : !hasReservation;
      });
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, location, sortOrder, activeFilters, isOpenNow]);

  useEffect(() => {
    filterAndSortRestaurants();
  }, [
    searchTerm,
    location,
    sortOrder,
    activeFilters,
    filterAndSortRestaurants,
  ]);

  const updateSuggestions = (term: string) => {
    const matched = restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().startsWith(term.toLowerCase())
      )
      .map((restaurant) => restaurant.name);
    setSuggestions(matched);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateSuggestions(term);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLocation("Białystok");
    setSortOrder("asc");
    setActiveFilters({
      cuisine: "",
      delivery: "",
      openingHours: "",
      takeaway: "",
      reservation: "",
    });
    setFilteredRestaurants(restaurants);
    setSuggestions([]);
  };

  const handleApplyFilters = (filters: Filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto ">
      <h1 className="text-3xl lg:text-5xl justify-center align-middle w-full text-center mt-4 text-primaryText">
        {t("mainTitle")}
      </h1>
      <div className="flex justify-between items-center mt-4">
        <SearchInput
          searchTerm={searchTerm}
          suggestions={suggestions}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSuggestionClick}
          setSuggestions={setSuggestions}
        />
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setIsFiltersModalOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <LocationSortDropdowns
        location={location}
        sortOrder={sortOrder}
        onLocationChange={handleLocationChange}
        onSortChange={handleSortChange}
      />

      <div className="flex flex-row justify-between items-center text-center">
        <div className="flex flex-col sm:flex-row items-center text-left text-secondaryText">
          {t("numberOfRestaurants")}: {filteredRestaurants.length}
        </div>
        <div>
          <Button onClick={() => resetFilters()}>{t("resetFilters")}</Button>
        </div>
      </div>

      <RestaurantList filteredRestaurants={filteredRestaurants} />

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={resetFilters}
        activeFilters={activeFilters}
      />
    </div>
  );
};

export default SearchBar;
