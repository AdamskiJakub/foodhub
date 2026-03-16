import type { MetadataRoute } from "next";
import { routing, getPathname } from "@/i18n/routing";
import prisma from "@/lib/prisma";

const host = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date().toISOString();

  try {
    const restaurants = await prisma.restaurant.findMany({
      select: { slug: true },
    });
    const staticEntries: MetadataRoute.Sitemap = [
      getEntry("/", lastModified),
      getEntry("/contact", lastModified),
      getEntry("/about", lastModified),
      getEntry("/blog", lastModified),
      getEntry("/faq", lastModified),
      getEntry("/login", lastModified),
      getEntry("/register", lastModified),
    ];

    const restaurantEntries: MetadataRoute.Sitemap = restaurants
      .filter((restaurant) => restaurant.slug)
      .map((restaurant) =>
        getEntry(
          {
            pathname: "/restaurant/[slug]",
            params: { slug: restaurant.slug },
          },
          lastModified,
        ),
      );

    return [...staticEntries, ...restaurantEntries];
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
}

function getEntry(
  href: Parameters<typeof getPathname>[0]["href"],
  lastModified: string,
): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(
  href: Parameters<typeof getPathname>[0]["href"],
  locale: (typeof routing.locales)[number],
): string {
  const pathname = getPathname({ locale, href });
  return new URL(pathname, host).toString();
}
