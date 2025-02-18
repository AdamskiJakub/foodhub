"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowUpDown, Filter } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import FiltersModal from "./FiltersModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

  const suggestionsRef = useRef<HTMLUListElement>(null);

  const filterAndSortRestaurants = useCallback(() => {
    let filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        restaurant.city === location
    );

    if (activeFilters.cuisine) {
      filtered = filtered.filter(
        (restaurant) => restaurant.cuisine === activeFilters.cuisine
      );
    }

    if (activeFilters.delivery) {
      filtered = filtered.filter(
        (restaurant) => String(restaurant.delivery) === activeFilters.delivery
      );
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
    console.log("Sort order clicked:", order);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Wpisz nazwę restauracji..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          {suggestions.length > 0 && (
            <ul
              ref={suggestionsRef}
              className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setIsFiltersModalOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {location}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleLocationChange("Białystok")}>
              Białystok
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSortChange("asc")}>
              A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("desc")}>
              Z-A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
