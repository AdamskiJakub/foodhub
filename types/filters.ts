import { Restaurant } from "@/types/restaurant";
import { Dispatch, SetStateAction } from "react";

export interface Filters {
  cuisine: string;
  delivery: string;
  takeaway: string;
  reservation: string;
  openingHours: string;
}

export interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  citySlug: string | null;
  onResetFilters: () => void;
  isOpenNow: (
    openingHours: string | null | undefined,
    latitude?: number,
    longitude?: number
  ) => boolean;
  activeFilters: Filters;
  availableCuisines: string[];
  restaurants: Restaurant[];
  selectedFilters: Filters;
  setSelectedFilters: Dispatch<SetStateAction<Filters>>;
}
