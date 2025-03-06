import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Rating } from "@/types/restaurant";

export const useRatings = (initialRatings: Rating[], restaurantId: number) => {
  const [ratings, setRatings] = useState(initialRatings);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const t = useTranslations("RestaurantDetails");

  const handleRatingSubmit = async () => {
    if (!selectedRating) return;

    try {
      const response = await fetch("/api/rate-restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId,
          value: selectedRating,
        }),
      });

      if (response.ok) {
        const { newRating } = await response.json();
        console.log("New rating:", newRating);
        setRatings((prevRatings) => [...prevRatings, newRating]);
        setSelectedRating(null);
        toast.success(t("toastRatingSuccess"));
      } else if (response.status === 400) {
        toast.error(t("toastRatingError"));
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error(t("toastRatingError"));
    }
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length
      : 0;

  return {
    ratings,
    selectedRating,
    setSelectedRating,
    handleRatingSubmit,
    averageRating,
  };
};
