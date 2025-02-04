import type { MetadataRoute } from "next";
import { routing, getPathname } from "@/i18n/routing";

const host = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = [
    getEntry("/", lastModified),
    getEntry("/contact", lastModified),
  ];

  return [...staticEntries];
}

function getEntry(
  href: Parameters<typeof getPathname>[0]["href"],
  lastModified: string
): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)])
      ),
    },
  };
}

function getUrl(
  href: Parameters<typeof getPathname>[0]["href"],
  locale: (typeof routing.locales)[number]
): string {
  const pathname = getPathname({ locale, href });
  return new URL(pathname, host).toString();
}
