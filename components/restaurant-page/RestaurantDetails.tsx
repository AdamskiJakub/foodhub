"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Restaurant } from "@/types/restaurant";
import notFound from "@/app/[locale]/not-found";
import { useTranslations } from "next-intl";
import { formatOpeningHours } from "@/lib/formattingHours";
import BreadcrumbComponent from "../breadcrumb/Breadcrumb";

import { useRatings } from "@/hooks/useRatings";
import { useComments } from "@/hooks/useComments";
import { CommentComponent } from "./CommentComponent";
import { RestaurantInfo } from "./RestaurantInfo";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  const t = useTranslations("RestaurantDetails");

  const {
    selectedRating,
    setSelectedRating,
    handleRatingSubmit,
    averageRating,
  } = useRatings(restaurant.ratings ?? [], restaurant.id);

  const { comments, newComment, setNewComment, handleCommentSubmit } =
    useComments(restaurant.comments ?? [], restaurant.id);

  const dayTranslations = {
    Mo: t("Mo"),
    Tu: t("Tu"),
    We: t("We"),
    Th: t("Th"),
    Fr: t("Fr"),
    Sa: t("Sa"),
    Su: t("Su"),
  };

  const formattedHours = formatOpeningHours(
    restaurant.openingHours,
    t,
    dayTranslations
  );

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="max-w-[1169px] mx-auto py-8">
      <BreadcrumbComponent
        customSegments={[
          { label: "home", href: "/", isTranslation: true },
          { label: "restaurant", isTranslation: true },
          { label: restaurant.name, isTranslation: false },
        ]}
      />
      <div className="flex flex-col lg:flex-row gap-8 mt-11">
        <div className="max-w-[745px] w-full">
          <h1 className="text-2xl font-bold mb-4">{restaurant.name}</h1>

          {restaurant.description && (
            <div className="prose prose-neutral text-secondaryText font-normal text-md mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {restaurant.description}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <RestaurantInfo
          restaurant={restaurant}
          formattedHours={formattedHours}
          t={t}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          handleRatingSubmit={handleRatingSubmit}
          averageRating={averageRating}
        />
      </div>

      <CommentComponent
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        t={t}
      />
    </div>
  );
};

export default RestaurantDetails;
