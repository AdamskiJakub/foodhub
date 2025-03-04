import { useState } from "react";
import { Restaurant } from "@/types/restaurant";

export const useSearchSuggestions = (restaurants: Restaurant[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  return {
    searchTerm,
    suggestions,
    handleSearchChange,
    handleSuggestionClick,
    setSuggestions,
  };
};
