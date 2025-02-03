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
    "/team/[member]": {
      en: "/team/[member]",
      pl: "/zespol/[member]",
    },
    "/contact": {
      en: "/contact",
      pl: "/kontakt",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
