"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchInputProps {
  searchTerm: string;
  suggestions: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  suggestions,
  onSearchChange,
  onSuggestionClick,
  setSuggestions,
}) => {
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const t = useTranslations("SearchInput");

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
  }, [setSuggestions]);

  return (
    <div className="relative flex-1">
      <Input
        type="text"
        placeholder={t("placeholder")}
        value={searchTerm}
        onChange={onSearchChange}
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
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
