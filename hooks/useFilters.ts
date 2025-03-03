import { Filters, FiltersModalProps } from "@/types/filters";
import { useTranslations } from "next-intl";

export const useFilters = ({
  restaurants,
  availableCuisines,
  isOpenNow,
  selectedFilters,
  setSelectedFilters,
  onApplyFilters,
  onResetFilters,
  onClose,
}: FiltersModalProps) => {
  const t = useTranslations("FiltersModal");
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

  const CUISINE_ITEMS = [
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
    { value: "latin_american", label: t("cuisine_latin_american") },
    { value: "lebanese", label: t("cuisine_lebanese") },
    { value: "local", label: t("cuisine_local") },
    { value: "lunch", label: t("cuisine_lunch") },
    { value: "mediterranean", label: t("cuisine_mediterranean") },
    { value: "mexican", label: t("cuisine_mexican") },
    { value: "middle_eastern", label: t("cuisine_middle_eastern") },
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
    { value: "savory_pancakes", label: t("cuisine_savory_pancakes") },
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
  ];

  const DELIVERY_ITEMS = [
    { value: "yes", label: t("deliveryYes") },
    { value: "no", label: t("deliveryNo") },
  ];

  const TAKEOUT_ITEMS = [
    { value: "yes", label: t("takeawayYes") },
    { value: "no", label: t("takeawayNo") },
  ];

  const RESERVATION_ITEMS = [
    { value: "yes", label: t("reservationYes") },
    { value: "no", label: t("reservationNo") },
  ];

  const OPENING_HOURS_ITEMS = [{ value: "open_now", label: t("openNow") }];

  const cuisineItems = CUISINE_ITEMS.filter((item) =>
    availableCuisines.includes(item.value)
  ).map((item) => ({
    ...item,
    count: getFilterCount("cuisine", item.value),
  }));

  const deliveryItems = DELIVERY_ITEMS.map((item) => ({
    ...item,
    count: getFilterCount("delivery", item.value),
  }));

  const takeawayItems = TAKEOUT_ITEMS.map((item) => ({
    ...item,
    count: getFilterCount("takeaway", item.value),
  }));

  const reservationItems = RESERVATION_ITEMS.map((item) => ({
    ...item,
    count: getFilterCount("reservation", item.value),
  }));

  const openingHoursItems = OPENING_HOURS_ITEMS.map((item) => ({
    ...item,
    count: getFilterCount("openingHours", item.value),
  }));

  const selectedFilterCount =
    Object.values(selectedFilters).filter(Boolean).length;

  const handleSelect = (key: keyof Filters, value: string) => {
    setSelectedFilters((prev: Filters) => ({
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

  return {
    cuisineItems,
    deliveryItems,
    takeawayItems,
    reservationItems,
    openingHoursItems,
    selectedFilterCount,
    handleSelect,
    applyFilters,
    resetFilters,
  };
};
