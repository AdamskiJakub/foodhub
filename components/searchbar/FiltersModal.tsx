"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FilterSection from "./FilterSection";
import { Filters } from "./SearchBar";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Restaurant } from "@/types/restaurant";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  onResetFilters: () => void;
  isOpenNow: (
    openingHours: string | null | undefined,
    latitude?: number,
    longitude?: number
  ) => boolean;
  activeFilters: {
    cuisine: string;
    delivery: string;
    openingHours: string;
    takeaway: string;
    reservation: string;
  };
  availableCuisines: string[];
  restaurants: Restaurant[];
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onResetFilters,
  activeFilters,
  availableCuisines,
  restaurants,
  isOpenNow,
}) => {
  const t = useTranslations("FiltersModal");
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  const getFilterCount = (filterKey: string, filterValue: string) => {
    return restaurants.filter((restaurant) => {
      if (filterKey === "cuisine") {
        return restaurant.cuisine?.includes(filterValue);
      } else if (filterKey === "delivery") {
        return restaurant.delivery === (filterValue === "yes");
      } else if (filterKey === "takeaway") {
        return restaurant.takeaway === (filterValue === "yes");
      } else if (filterKey === "reservation") {
        return restaurant.reservation === (filterValue === "yes");
      } else if (filterKey === "openingHours") {
        return isOpenNow(
          restaurant.openingHours,
          restaurant.latitude,
          restaurant.longitude
        );
      }
      return false;
    }).length;
  };

  const cuisineItems = [
    { value: "african", label: t("cuisine_african") },
    { value: "american", label: t("cuisine_american") },
    { value: "arab", label: t("cuisine_arab") },
    { value: "argentinian", label: t("cuisine_argentinian") },
    { value: "armenian", label: t("cuisine_armenian") },
    { value: "asian", label: t("cuisine_asian") },
    { value: "austrian", label: t("cuisine_austrian") },
    { value: "azerbaijani", label: t("cuisine_azerbaijani") },
    { value: "bagel", label: t("cuisine_bagel") },
    { value: "balkan", label: t("cuisine_balkan") },
    { value: "barbecue", label: t("cuisine_barbecue") },
    { value: "basque", label: t("cuisine_basque") },
    { value: "bavarian", label: t("cuisine_bavarian") },
    { value: "breakfast", label: t("cuisine_breakfast") },
    { value: "bubble_tea", label: t("cuisine_bubble_tea") },
    { value: "burger", label: t("cuisine_burger") },
    { value: "buschenschank", label: t("cuisine_buschenschank") },
    { value: "cake", label: t("cuisine_cake") },
    { value: "ceviche", label: t("cuisine_ceviche") },
    { value: "chechen", label: t("cuisine_chechen") },
    { value: "chicken", label: t("cuisine_chicken") },
    { value: "chinese", label: t("cuisine_chinese") },
    { value: "coffee_shop", label: t("cuisine_coffee_shop") },
    { value: "crepe", label: t("cuisine_crepe") },
    { value: "crimean", label: t("cuisine_crimean") },
    { value: "croatian", label: t("cuisine_croatian") },
    { value: "czech", label: t("cuisine_czech") },
    { value: "dessert", label: t("cuisine_dessert") },
    { value: "duck", label: t("cuisine_duck") },
    { value: "dumpling", label: t("cuisine_dumpling") },
    { value: "dumplings", label: t("cuisine_dumplings") },
    { value: "ethiopian", label: t("cuisine_ethiopian") },
    { value: "european", label: t("cuisine_european") },
    { value: "filipino", label: t("cuisine_filipino") },
    { value: "fine_dining", label: t("cuisine_fine_dining") },
    { value: "fish", label: t("cuisine_fish") },
    { value: "french", label: t("cuisine_french") },
    { value: "fried_chicken", label: t("cuisine_fried_chicken") },
    { value: "fusion", label: t("cuisine_fusion") },
    { value: "georgian", label: t("cuisine_georgian") },
    { value: "german", label: t("cuisine_german") },
    { value: "greek", label: t("cuisine_greek") },
    { value: "grill", label: t("cuisine_grill") },
    { value: "hawaiian", label: t("cuisine_hawaiian") },
    { value: "hungarian", label: t("cuisine_hungarian") },
    { value: "ice_cream", label: t("cuisine_ice_cream") },
    { value: "indian", label: t("cuisine_indian") },
    { value: "indo", label: t("cuisine_indo") },
    { value: "indonesian", label: t("cuisine_indonesian") },
    { value: "international", label: t("cuisine_international") },
    { value: "israeli", label: t("cuisine_israeli") },
    { value: "italian", label: t("cuisine_italian") },
    { value: "italian_pizza", label: t("cuisine_italian_pizza") },
    { value: "japanese", label: t("cuisine_japanese") },
    { value: "jewish", label: t("cuisine_jewish") },
    { value: "kebab", label: t("cuisine_kebab") },
    { value: "kimchi", label: t("cuisine_kimchi") },
    { value: "korean", label: t("cuisine_korean") },
    {
      value: "latin_american",
      label: t("cuisine_latin_american"),
    },
    { value: "lebanese", label: t("cuisine_lebanese") },
    { value: "local", label: t("cuisine_local") },
    { value: "lunch", label: t("cuisine_lunch") },
    { value: "mediterranean", label: t("cuisine_mediterranean") },
    { value: "mexican", label: t("cuisine_mexican") },
    {
      value: "middle_eastern",
      label: t("cuisine_middle_eastern"),
    },
    { value: "moroccan", label: t("cuisine_moroccan") },
    { value: "nepalese", label: t("cuisine_nepalese") },
    { value: "noodle", label: t("cuisine_noodle") },
    { value: "onigiri", label: t("cuisine_onigiri") },
    { value: "oriental", label: t("cuisine_oriental") },
    { value: "pancake", label: t("cuisine_pancake") },
    { value: "pasta", label: t("cuisine_pasta") },
    { value: "persian", label: t("cuisine_persian") },
    { value: "pierogi", label: t("cuisine_pierogi") },
    { value: "pizza", label: t("cuisine_pizza") },
    { value: "polish", label: t("cuisine_polish") },
    { value: "ramen", label: t("cuisine_ramen") },
    { value: "regional", label: t("cuisine_regional") },
    { value: "ribs", label: t("cuisine_ribs") },
    { value: "russian", label: t("cuisine_russian") },
    { value: "salad", label: t("cuisine_salad") },
    { value: "sandwich", label: t("cuisine_sandwich") },
    {
      value: "savory_pancakes",
      label: t("cuisine_savory_pancakes"),
    },
    { value: "seafood", label: t("cuisine_seafood") },
    { value: "spanish", label: t("cuisine_spanish") },
    { value: "steak", label: t("cuisine_steak") },
    { value: "steak_house", label: t("cuisine_steak_house") },
    { value: "sushi", label: t("cuisine_sushi") },
    { value: "syrian", label: t("cuisine_syrian") },
    { value: "tajik", label: t("cuisine_tajik") },
    { value: "tapas", label: t("cuisine_tapas") },
    { value: "thai", label: t("cuisine_thai") },
    { value: "turkish", label: t("cuisine_turkish") },
    { value: "udon", label: t("cuisine_udon") },
    { value: "ukrainian", label: t("cuisine_ukrainian") },
    { value: "uzbek", label: t("cuisine_uzbek") },
    { value: "vietnamese", label: t("cuisine_vietnamese") },
    { value: "waffle", label: t("cuisine_waffle") },
  ]
    .filter((item) => availableCuisines.includes(item.value))
    .map((item) => ({
      ...item,
      count: getFilterCount("cuisine", item.value),
    }));

  const deliveryItems = [
    { value: "yes", label: t("deliveryYes") },
    { value: "no", label: t("deliveryNo") },
  ].map((item) => ({
    ...item,
    count: getFilterCount("delivery", item.value),
  }));

  const takeawayItems = [
    { value: "yes", label: t("takeawayYes") },
    { value: "no", label: t("takeawayNo") },
  ].map((item) => ({
    ...item,
    count: getFilterCount("takeaway", item.value),
  }));

  const reservationItems = [
    { value: "yes", label: t("reservationYes") },
    { value: "no", label: t("reservationNo") },
  ].map((item) => ({
    ...item,
    count: getFilterCount("reservation", item.value),
  }));

  const openingHoursItems = [{ value: "open_now", label: t("openNow") }].map(
    (item) => ({
      ...item,
      count: getFilterCount("openingHours", item.value),
    })
  );

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const handleSelect = (key: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  const resetFilters = () => {
    onResetFilters();
    onClose();
  };

  const selectedFilterCount =
    Object.values(selectedFilters).filter(Boolean).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <motion.div
            className="absolute inset-0 bg-[#0905374A]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="z-50 bg-white w-full lg:w-[410px] h-full shadow-lg select-none overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 mt-5 px-6">
              <div className="gap-[5.5px] flex flex-row items-center justify-center">
                <button
                  className="text-black text-[20px] leading-7 font-medium"
                  onClick={onClose}
                >
                  {t("title")}
                </button>
                {selectedFilterCount > 0 && (
                  <div className="flex font-extrabold bg-[#000000] border-[1px] border-white w-[18px] h-[18px] text-white text-xs items-center justify-center rounded-full">
                    {selectedFilterCount}
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-[#000000]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 pb-24 flex flex-col gap-4">
              <FilterSection
                title={t("cuisine")}
                items={cuisineItems}
                selectedValue={selectedFilters.cuisine}
                handleSelect={(value) => handleSelect("cuisine", value)}
              />
              <FilterSection
                title={t("delivery")}
                items={deliveryItems}
                selectedValue={selectedFilters.delivery}
                handleSelect={(value) => handleSelect("delivery", value)}
              />
              <FilterSection
                title={t("takeaway")}
                items={takeawayItems}
                selectedValue={selectedFilters.takeaway}
                handleSelect={(value) => handleSelect("takeaway", value)}
              />
              <FilterSection
                title={t("reservation")}
                items={reservationItems}
                selectedValue={selectedFilters.reservation}
                handleSelect={(value) => handleSelect("reservation", value)}
              />
              <FilterSection
                title={t("openingHours")}
                items={openingHoursItems}
                selectedValue={selectedFilters.openingHours}
                handleSelect={(value) => handleSelect("openingHours", value)}
              />
            </div>
            <div className="flex flex-row px-3 justify-center gap-2 fixed z-50 bottom-0 py-3 rounded-md border-[#E5E7EB] bg-white w-full lg:w-[409px] items-center border">
              <button
                onClick={resetFilters}
                className="h-[48px] border w-full text-sm border-[#000000] bg-white text-[#000000] py-2 rounded-lg"
              >
                {t("resetFilters")}
              </button>
              <Button
                onClick={applyFilters}
                className=" w-full h-[48px] border-[1px] border-white text-sm text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                {t("applyFilters")}
                {selectedFilterCount > 0 && (
                  <div className="ml-2 flex bg-[#FFFFFF] font-extrabold w-[18px] h-[18px] text-[#000000] text-xs items-center justify-center rounded-full">
                    {selectedFilterCount}
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FiltersModal;
