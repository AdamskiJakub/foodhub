"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import FiltersModal from "./FiltersModal";
import LocationTiles from "./LocationTiles";
import SortDropdown from "./SortDropdown";
import SearchInput from "./SearchInput";
import RestaurantList from "../restaurant-listing/RestaurantList";
import { useTranslations } from "next-intl";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useRestaurantFilters } from "@/hooks/useRestaurantFilters";
import { usePagination } from "@/hooks/usePagination";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import opening_hours from "opening_hours"; // Dodaj to

interface SearchBarProps {
  restaurants: Restaurant[];
}

const cityMapping: Record<string, string> = {
  bialystok: "Białystok",
  warsaw: "Warszawa",
};

const SearchBar: React.FC<SearchBarProps> = ({ restaurants }) => {
  const t = useTranslations("FiltersModal");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const citySlug = searchParams.get("city");
  const cityName = citySlug ? cityMapping[citySlug] : null;
  const sortOrder = searchParams.get("sort") || "asc";

  const pageParam = locale === "pl" ? "strona" : "page";
  const currentPage = parseInt(searchParams.get(pageParam) || "1", 10);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const {
    searchTerm,
    suggestions,
    handleSearchChange,
    handleSuggestionClick,
    setSuggestions,
  } = useSearchSuggestions(restaurants);

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

  const isValidOpeningHours = (
    openingHours: string | null | undefined
  ): boolean => {
    if (!openingHours) return false;

    const timeRangeRegex = /(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/;
    return timeRangeRegex.test(openingHours);
  };

  const isOpenNow = useCallback(
    (
      openingHours: string | null | undefined,
      latitude?: number,
      longitude?: number
    ) => {
      if (!isValidOpeningHours(openingHours)) return false;
      const sanitizedHours = openingHours
        ? sanitizeOpeningHours(openingHours)
        : undefined;
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

  const {
    filteredRestaurants,
    activeFilters,
    selectedFilters,
    handleApplyFilters,
    resetFilters,
    setSelectedFilters,
  } = useRestaurantFilters(
    restaurants,
    cityName,
    searchTerm,
    sortOrder,
    isOpenNow
  );

  const { currentItems, totalPages } = usePagination(
    filteredRestaurants,
    currentPage,
    10
  );

  const handleLocationChange = (newLocation: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("city", newLocation);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", order);
    router.push(`${pathname}?${params.toString()}`);
  };

  const uniqueCuisines = Array.from(
    new Set(
      restaurants
        .filter((restaurant) => restaurant.city === cityName)
        .flatMap((restaurant) => restaurant.cuisine?.split(";") || [])
    )
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
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

      <div className="flex flex-row justify-between gap-2">
        <LocationTiles
          location={citySlug || ""}
          onLocationChange={handleLocationChange}
        />
        <SortDropdown sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>

      <div className="flex flex-row justify-between items-center text-center">
        <div className="flex flex-col sm:flex-row items-center text-left text-secondaryText">
          {t("numberOfRestaurants")}:{" "}
          {citySlug ? filteredRestaurants.length : 0}
        </div>
        <div>
          <Button onClick={() => resetFilters()}>{t("resetFilters")}</Button>
        </div>
      </div>

      {!citySlug ? (
        <div className="text-center text-secondaryText">
          {t("noCitySelected")}
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="text-center text-secondaryText">
          {t("noRestaurantsFound")}
        </div>
      ) : (
        <RestaurantList
          filteredRestaurants={currentItems}
          totalPages={totalPages}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set(pageParam, page.toString());
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      )}

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        onResetFilters={resetFilters}
        activeFilters={activeFilters}
        availableCuisines={uniqueCuisines}
        restaurants={restaurants}
        isOpenNow={isOpenNow}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        citySlug={citySlug}
      />
    </div>
  );
};

export default SearchBar;
