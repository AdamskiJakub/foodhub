import RestaurantDetails from "@/components/restaurant-page/RestaurantDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { normalizeSlug } from "@/lib/normalizeSlug";
import { Locale, routing } from "@/i18n/routing";

type Params = Promise<{ slug: string; locale: Locale }>;

interface Props {
  params: Params;
}

export const generateStaticParams = (): { locale: Locale }[] => {
  return routing.locales.map((locale) => ({ locale }));
};

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;

  const normalizedSlug = normalizeSlug(slug);

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug: normalizedSlug },
    include: { ratings: true },
  });

  if (!restaurant) {
    return notFound();
  }

  return <RestaurantDetails restaurant={restaurant} />;
}
