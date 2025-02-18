import { setRequestLocale } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { Restaurant } from "@/types/restaurant";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}

export const generateStaticParams = (): { locale: Locale }[] => {
  return routing.locales.map((locale) => ({ locale }));
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const restaurants: Restaurant[] = await prisma.restaurant.findMany();

  return (
    <div>
      <h1>Lista restauracji</h1>
      <ul>
        {restaurants.map((restaurant: Restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>
              {restaurant.city}, {restaurant.street}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
