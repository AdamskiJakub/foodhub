"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FilterSection from "./FilterSection";
import { Filters } from "./SearchBar";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  onResetFilters: () => void;
  activeFilters: {
    cuisine: string;
    delivery: string;
    openingHours: string;
  };
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onResetFilters,
  activeFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

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
                  Filters
                </button>
                {selectedFilterCount > 0 && (
                  <div className="flex font-extrabold bg-[#5647FF] border-[1px] border-white w-[18px] h-[18px] text-white text-xs items-center justify-center rounded-full">
                    {selectedFilterCount}
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-[#000000]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 pb-24">
              <FilterSection
                title="Cuisine"
                items={[
                  { value: "american", label: "American" },
                  { value: "asian", label: "Asian" },
                  { value: "balkan", label: "Balkan" },
                  // Dodaj więcej kuchni
                ]}
                selectedValue={selectedFilters.cuisine}
                handleSelect={(value) => handleSelect("cuisine", value)}
              />
              <FilterSection
                title="Delivery"
                items={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                selectedValue={selectedFilters.delivery}
                handleSelect={(value) => handleSelect("delivery", value)}
              />
            </div>
            <div className="flex flex-row px-3 justify-center gap-2 fixed z-50 bottom-0 py-3 rounded-md border-[#E5E7EB] bg-white w-full lg:w-[409px] items-center border">
              <button
                onClick={resetFilters}
                className="h-[48px] border w-full text-sm border-[#000000] bg-white text-[#000000] py-2 rounded-lg"
              >
                Reset Filters
              </button>
              <button
                onClick={applyFilters}
                className="bg-[#5647FF] w-full h-[48px] border-[1px] border-white text-sm text-white px-4 py-2 rounded-lg flex items-center justify-center"
              >
                Apply Filters
                {selectedFilterCount > 0 && (
                  <div className="ml-2 flex bg-[#FFFFFF] font-extrabold w-[18px] h-[18px] text-[#5647FF] text-xs items-center justify-center rounded-full">
                    {selectedFilterCount}
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FiltersModal;
