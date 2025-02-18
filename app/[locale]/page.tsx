import { setRequestLocale } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { Restaurant } from "@/types/restaurant";
import SearchBar from "@/components/searchbar/SearchBar";

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
      <SearchBar restaurants={restaurants} />
    </div>
  );
}
