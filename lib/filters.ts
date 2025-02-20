import { Restaurant } from "@/types/restaurant";

export const filterByCuisine = (
  restaurants: Restaurant[],
  cuisine: string
): Restaurant[] => {
  return restaurants.filter((restaurant) => {
    if (!restaurant.cuisine) return false;
    const cuisinesArray = restaurant.cuisine.split(";").map((c) => c.trim());
    return cuisinesArray.includes(cuisine);
  });
};

export const filterByBooleanFlag = (
  restaurants: Restaurant[],
  flag: string,
  key: keyof Restaurant
): Restaurant[] => {
  return restaurants.filter((restaurant) => {
    const hasFlag =
      typeof restaurant[key] === "string" || restaurant[key] === true;
    return flag === "yes" ? hasFlag : !hasFlag;
  });
};
