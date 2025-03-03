"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FilterSection from "./FilterSection";
import FilterButton from "./FilterButton";
import { useFilters } from "@/hooks/useFilters";
import { FiltersModalProps } from "@/types/filters";
import { useTranslations } from "next-intl";

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  citySlug,
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

  const {
    cuisineItems,
    deliveryItems,
    takeawayItems,
    reservationItems,
    openingHoursItems,
    selectedFilterCount,
    handleSelect,
    applyFilters,
    resetFilters,
  } = useFilters({
    citySlug,
    isOpen,
    activeFilters,
    restaurants,
    availableCuisines,
    isOpenNow,
    selectedFilters,
    setSelectedFilters,
    onApplyFilters,
    onResetFilters,
    onClose,
  });

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

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
            {citySlug ? (
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
            ) : (
              <div className="px-6 pb-24 flex flex-col gap-4">
                <p className="text-center text-secondaryText">
                  {t("noCitySelected")}
                </p>
              </div>
            )}
            <FilterButton
              resetFilters={resetFilters}
              applyFilters={applyFilters}
              selectedFilterCount={selectedFilterCount}
              t={t}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FiltersModal;
