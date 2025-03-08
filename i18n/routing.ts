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
    "/register": {
      en: "/register",
      pl: "/rejestracja",
    },
    "/login": {
      en: "/login",
      pl: "/zaloguj",
    },
    "/member/[slug]/settings": {
      en: "/member/[slug]/settings",
      pl: "/użytkownik/[slug]/ustawienia",
    },
    "/member/[slug]/add-restaurant": {
      en: "/member/[slug]/add-restaurant",
      pl: "/użytkownik/[slug]/dodaj-restaurację",
    },
    "/restaurant/[slug]": {
      en: "/restaurant/[slug]",
      pl: "/restauracja/[slug]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
