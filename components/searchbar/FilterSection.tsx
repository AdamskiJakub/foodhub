import React from "react";

interface FilterSectionProps {
  title: string;
  items: { value: string; label: string }[];
  selectedValue: string | null;
  handleSelect: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedValue,
  handleSelect,
}) => (
  <div>
    <h4 className="font-semibold text-sm mb-4 text-[#121212]">{title}</h4>
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.value}
          className={`flex justify-between text-[#000000] h-[48px] items-center px-4 py-2 bg-white border rounded-md cursor-pointer ${
            selectedValue === item.value
              ? "bg-[#706D91] text-white border border-[#000000]"
              : ""
          }`}
          onClick={() => handleSelect(item.value)}
        >
          <label className="flex items-center space-x-2 w-full">
            <input
              type="radio"
              name={title}
              checked={selectedValue === item.value}
              onChange={() => handleSelect(item.value)}
              className={`cursor-pointer appearance-none rounded-full h-[20px] w-[20px] 
                border-[1.5px] border-[#E5E5E5]
                ${
                  selectedValue === item.value
                    ? "checked:bg-[#000000] checked:border-[#000000] checked:ring-[3px] checked:ring-white checked:ring-inset"
                    : ""
                }`}
            />
            <span className="font-normal text-[#000000] text-md">
              {item.label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default FilterSection;
