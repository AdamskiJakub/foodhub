import React from "react";
import { Button } from "../ui/button";

interface FilterButtonProps {
  resetFilters: () => void;
  applyFilters: () => void;
  selectedFilterCount: number;
  t: (key: string) => string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  resetFilters,
  applyFilters,
  selectedFilterCount,
  t,
}) => (
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
);

export default FilterButton;
