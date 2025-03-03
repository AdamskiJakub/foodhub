"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import FiltersModal from "./FiltersModal";
import LocationTiles from "./LocationTiles";
import SortDropdown from "./SortDropdown";
import SearchInput from "./SearchInput";
import RestaurantList from "../restaurant-listing/RestaurantList";
import { useTranslations } from "next-intl";
import opening_hours from "opening_hours";
import { filterByCuisine, filterByBooleanFlag } from "@/lib/filters";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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

const cityMapping: Record<string, string> = {
  bialystok: "Białystok",
  warsaw: "Warszawa",
};

const SearchBar: React.FC<SearchBarProps> = ({ restaurants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    cuisine: "",
    delivery: "",
    takeaway: "",
    reservation: "",
    openingHours: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];

  const citySlug = searchParams.get("city");
  const cityName = citySlug ? cityMapping[citySlug] : null;
  const sortOrder = searchParams.get("sort") || "asc";

  const pageParam = locale === "pl" ? "strona" : "page";
  const currentPage = parseInt(searchParams.get(pageParam) || "1", 10);

  const [restaurantPerPage] = useState(10);

  const indexOfLastRestaurant = currentPage * restaurantPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const totalPages = Math.ceil(filteredRestaurants.length / restaurantPerPage);

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
    const params = new URLSearchParams(searchParams);
    params.set("city", newLocation);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", order);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("city");
    router.push(`${pathname}?${params.toString()}`);
    setActiveFilters({
      cuisine: "",
      delivery: "",
      openingHours: "",
      takeaway: "",
      reservation: "",
    });
    setFilteredRestaurants([]);
    setSuggestions([]);
  };

  const handleApplyFilters = (filters: Filters) => {
    setActiveFilters(filters);
  };

  useEffect(() => {
    filterAndSortRestaurants();
  }, [
    searchTerm,
    cityName,
    sortOrder,
    activeFilters,
    filterAndSortRestaurants,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

      <div className="flex flex-row justify-between gap-2">
        <LocationTiles
          location={citySlug || ""}
          onLocationChange={handleLocationChange}
        />
        <SortDropdown sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>

      <div className="flex flex-row justify-between items-center text-center">
        <div className="flex flex-col sm:flex-row items-center text-left text-secondaryText">
          {t("numberOfRestaurants")}: {filteredRestaurants.length}
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
          filteredRestaurants={currentRestaurants}
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
      />
    </div>
  );
};

export default SearchBar;
