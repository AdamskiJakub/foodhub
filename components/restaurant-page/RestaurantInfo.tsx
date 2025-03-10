import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Restaurant } from "@/types/restaurant";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";

interface RestaurantInfoProps {
  restaurant: Restaurant;
  formattedHours: string;
  t: (key: string) => string;
  selectedRating: number | null;
  setSelectedRating: (rating: number) => void;
  handleRatingSubmit: () => void;
  averageRating: number;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  restaurant,
  formattedHours,
  t,
  selectedRating,
  setSelectedRating,
  handleRatingSubmit,
  averageRating,
}) => {
  const { data: session } = useSession();

  const formatCuisine = (cuisine: string | undefined | null) => {
    if (!cuisine) return t("noCuisine");
    return cuisine
      .split(";")
      .map((c) => t(`${c.trim()}`))
      .join(", ");
  };

  return (
    <div className="w-full lg:w-[383px] h-auto flex-shrink-0">
      <div className="lg:sticky lg:top-[139px]">
        <div
          className="bg-[#F5F5F5] p-6 rounded-md"
          style={{ boxShadow: "0px 2px 2px 0px rgba(28, 36, 51, 0.1)" }}
        >
          <div className="flex flex-col gap-4">
            {/* Sekcja kontaktowa */}
            <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
              <h2 className="text-xl font-semibold mb-2">{t("contact")}</h2>
              {restaurant.phone && (
                <p className="text-[#706D91] font-normal text-md">
                  {t("phone")}: {restaurant.phone}
                </p>
              )}
              {restaurant.email && (
                <a
                  href={`mailto:${restaurant.email}`}
                  className="text-[#706D91] font-normal text-md"
                >
                  Email: {restaurant.email}
                </a>
              )}
            </div>

            {/* Sekcja checkboxów */}
            <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
              <h2 className="text-xl font-semibold mb-2">{t("features")}</h2>
              <div className="flex flex-col gap-2">
                {restaurant.delivery && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#706D91] font-normal text-md">
                      {t("delivery")}
                    </span>
                    <span className="text-[#34D399]">✓</span>
                  </div>
                )}
                {restaurant.takeaway && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#706D91] font-normal text-md">
                      {t("takeaway")}
                    </span>
                    <span className="text-[#34D399]">✓</span>
                  </div>
                )}
                {restaurant.reservation && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#706D91] font-normal text-md">
                      {t("reservation")}
                    </span>
                    <span className="text-[#34D399]">✓</span>
                  </div>
                )}
                {restaurant.wheelchair && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#706D91] font-normal text-md">
                      {t("wheelchair")}
                    </span>
                    <span className="text-[#34D399]">✓</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reszta kodu pozostaje bez zmian */}
            {restaurant.openingHours && (
              <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                <p className="text-secondaryText font-normal text-md">
                  {t("openingHours")}
                </p>
                <p className="text-[#121212] font-medium text-[16px] leading-[28px]">
                  {formattedHours}
                </p>
              </div>
            )}

            {restaurant.cuisine && (
              <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                <p className="text-secondaryText font-normal text-md">
                  {t("cuisine")}
                </p>
                <p className="text-primaryText font-medium text-[16px] leading-[28px]">
                  {formatCuisine(restaurant.cuisine)}
                </p>
              </div>
            )}

            {session ? (
              <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
                <p className="text-secondaryText font-normal text-md">
                  {t("rateRestaurant")}
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelectedRating(value)}
                      className={`text-2xl ${
                        selectedRating && value <= selectedRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleRatingSubmit}
                  className="mt-2 w-full"
                  disabled={!selectedRating}
                >
                  {t("submitRating")}
                </Button>
              </div>
            ) : (
              <div className=" border-y border-[#E5E5E5] py-4 text-secondaryText">
                {t("notLoggedToRate")}
              </div>
            )}
            <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4">
              <p className="text-secondaryText font-normal text-md">
                {t("averageRating")}
              </p>
              <p className="text-primaryText font-medium text-[16px] leading-[28px]">
                {averageRating.toFixed(1)}
              </p>
            </div>

            {restaurant.website && (
              <div className="flex flex-col gap-2 pb-6 border-b mb-2 border-[#E5E5E5]">
                <p className="text-secondaryText font-normal text-md">
                  {t("website")}
                </p>
                <Link href={restaurant.website} target="blank">
                  <Button
                    rel="noopener noreferrer"
                    className="mt-2 w-full flex gap-[10px] items-center justify-center text-white px-4 py-3 rounded-lg"
                  >
                    <Image
                      src="/images/send.svg"
                      width={20}
                      height={20}
                      alt="send"
                    />
                    {t("website")}
                  </Button>
                </Link>
              </div>
            )}
            <div className="flex justify-between items-center">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${restaurant.phone}`;
                }}
                className="w-full flex gap-[10px] items-center justify-center bg-[#5647FF] text-white px-4 py-2 rounded-lg cursor-not-allowed"
              >
                <Image
                  src="/images/send.svg"
                  alt="Contact Now"
                  width={20}
                  height={20}
                  priority
                />
                {t("contactNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
