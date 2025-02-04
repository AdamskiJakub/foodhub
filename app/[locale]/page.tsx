import { setRequestLocale } from "next-intl/server";
import LocaleSwitcher from "@/components/switcher/LocaleSwitcher";
import { Locale } from "@/i18n/routing";
import prisma from "@/lib/prisma";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}

export const generateStaticParams = (): { locale: Locale }[] => {
  return [{ locale: "en" }, { locale: "pl" }];
};

export default async function HomePage(props: Props) {
  const { params } = props;
  const { locale } = await params;

  setRequestLocale(locale);

  const restaurants = await prisma.restaurant.findMany();

  return (
    <div>
      <h1>Lista restauracji</h1>
      <ul>
        {restaurants.map((restaurant) => (
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
