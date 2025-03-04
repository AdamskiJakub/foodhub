import { Restaurant } from "@/types/restaurant";

export const usePagination = (
  items: Restaurant[],
  currentPage: number,
  itemsPerPage: number
) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentItems,
    totalPages,
  };
};
