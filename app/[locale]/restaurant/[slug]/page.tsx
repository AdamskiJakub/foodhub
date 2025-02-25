import RestaurantDetails from "@/components/restaurant-page/RestaurantDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/normalizeSlug";
import { Locale } from "@/i18n/routing";

interface Params {
  locale: Locale;
  slug: string;
}

interface Props {
  params: Params;
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = params;

  const normalizedSlug = normalizeSlug(slug);

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: normalizedSlug },
  });

  if (!restaurant) {
    return notFound();
  }

  return <RestaurantDetails restaurant={restaurant} />;
}
