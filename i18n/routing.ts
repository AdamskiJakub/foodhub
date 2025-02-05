import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "pl",
  localePrefix: "always",
  pathnames: {
    "/": {
      en: "/",
      pl: "/",
    },
    "/blog": {
      en: "/blog",
      pl: "/blog",
    },
    "/about": {
      en: "/about",
      pl: "/o-nas",
    },
    "/faq": {
      en: "/faq",
      pl: "/faq",
    },
    "/contact": {
      en: "/contact",
      pl: "/kontakt",
    },
    "/login": {
      en: "/login",
      pl: "/zaloguj",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
