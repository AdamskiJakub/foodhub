"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    onPageChange(page);
  };

  const pages: React.ReactNode[] = [];

  const renderPagination = () => {
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li key={i}>
            <button
              className={`h-[40px] w-[40px] border-[1px] ${
                currentPage === i
                  ? "bg-[#5647FF] text-white"
                  : "border-[#E5E5E5]"
              } rounded-[8px] cursor-pointer`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      pages.push(
        <li key={1}>
          <button
            className={`h-[40px] w-[40px] border-[1px] ${
              currentPage === 1 ? "bg-[#5647FF] text-white" : "border-[#E5E5E5]"
            } rounded-[8px] cursor-pointer`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      );

      if (currentPage > 3) {
        pages.push(
          <li
            key="ellipsis1"
            className="flex items-center justify-center h-[40px] w-[40px] border-[1px] border-[#E5E5E5] rounded-[8px] text-[#706D91]"
          >
            ...
          </li>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i}>
            <button
              className={`h-[40px] w-[40px] border-[1px] ${
                currentPage === i
                  ? "bg-[#5647FF] text-white"
                  : "border-[#E5E5E5]"
              } rounded-[8px] cursor-pointer`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <li
            key="ellipsis2"
            className="flex items-center justify-center h-[40px] w-[40px] border-[1px] border-[#E5E5E5] rounded-[8px] text-[#706D91]"
          >
            ...
          </li>
        );
      }

      pages.push(
        <li key={totalPages}>
          <button
            className={`h-[40px] w-[40px] border-[1px] ${
              currentPage === totalPages
                ? "bg-[#5647FF] text-white"
                : "border-[#E5E5E5]"
            } rounded-[8px] cursor-pointer`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="flex flex-row gap-2 items-center">
      <li>
        <button
          className={`h-[40px] w-[40px] border-[1px] border-[#E5E5E5] rounded-[8px] cursor-pointer ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
      </li>

      {renderPagination()}

      <li>
        <button
          className={`h-[40px] w-[40px] border-[1px] border-[#E5E5E5] rounded-[8px] cursor-pointer ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
