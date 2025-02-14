"use client";

import { useTranslations } from "next-intl";

export type FooterItem = {
  type: "text" | "phone" | "email" | "address" | "link" | "social";
  content: string;
  title?: string;
  href?: string;
};

export type FooterSegment = {
  title: string;
  items: FooterItem[];
  rowItems?: FooterItem[];
};
export const useFooterData = (): FooterSegment[] => {
  const t = useTranslations("Footer");

  return [
    {
      title: t("linksTitle"),
      items: [
        { type: "link", content: t("blog"), href: "/blog" },
        { type: "link", content: t("about"), href: "/about" },
        { type: "link", content: t("faq"), href: "/faq" },
        { type: "link", content: t("contact"), href: "/contact" },
      ],
    },
    {
      title: t("contactTitle"),
      items: [
        {
          type: "email",
          content: t("email"),
          href: "mailto:burguntowy@gmail.com",
        },
        { type: "phone", content: t("phoneNumber"), href: "tel:+48123456789" },
        {
          type: "address",
          content: t("addressLine1"),
          href: "https://www.google.com/maps?q=...",
        },
        { type: "address", content: t("addressLine2") },
      ],
    },
    {
      title: t("legalTitle"),
      items: [
        { type: "link", content: t("privacyPolicy"), href: "/privacy-policy" },
        {
          type: "link",
          content: t("termsOfService"),
          href: "/terms-of-service",
        },
      ],
    },
    {
      title: t("socialMediaTitle"),
      items: [
        { type: "social", content: "Facebook", href: "https://facebook.com" },
        { type: "social", content: "Instagram", href: "https://instagram.com" },
        { type: "social", content: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
  ];
};
