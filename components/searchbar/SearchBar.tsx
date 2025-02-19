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

interface SearchBarProps {
  restaurants: Restaurant[];
}

export interface Filters {
  cuisine: string;
  delivery: string;
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
    openingHours: "",
  });

  const t = useTranslations("FiltersModal");

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

    if (activeFilters.openingHours) {
      filtered = filtered.filter(
        (restaurant) => restaurant.openingHours === activeFilters.openingHours
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, location, sortOrder, activeFilters]);

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
    });
    setFilteredRestaurants(restaurants);
    setSuggestions([]);
  };

  const handleApplyFilters = (filters: Filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center">
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

      <div className="flex flex-row justify-between">
        <div>{filteredRestaurants.length}</div>
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
