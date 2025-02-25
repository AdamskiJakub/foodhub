import { setRequestLocale } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import prisma from "@/lib/prisma";
import { Restaurant } from "@/types/restaurant";
import SearchBar from "@/components/searchbar/SearchBar";
import { Suspense } from "react";

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
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar restaurants={restaurants} />
      </Suspense>
    </div>
  );
}
