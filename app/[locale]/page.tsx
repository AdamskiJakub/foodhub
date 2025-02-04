import { setRequestLocale } from "next-intl/server";
import LocaleSwitcher from "@/components/switcher/LocaleSwitcher";
import { Locale } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { Restaurant } from "@/types/restaurant";

type Params = { locale: Locale };

interface Props {
  params: Params;
}

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: Props) {
  const { locale } = params;

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
      <LocaleSwitcher />
    </div>
  );
}
