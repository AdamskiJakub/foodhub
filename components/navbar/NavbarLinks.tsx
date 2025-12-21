import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

interface NavbarLinksProps {
  onClick?: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ onClick }) => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string) =>
    `inline-block text-base font-medium transition-all duration-200 ${
      isActive(path)
        ? "text-primary font-semibold"
        : "text-primaryText hover:text-primary hover:translate-y-[-2px]"
    }`;

  return (
    <>
      <Link
        href="/blog"
        onClick={onClick}
        className={getLinkClassName("/blog")}
      >
        {t("blog")}
      </Link>
      <Link
        href="/about"
        onClick={onClick}
        className={getLinkClassName("/about")}
      >
        {t("about")}
      </Link>
      <Link href="/faq" onClick={onClick} className={getLinkClassName("/faq")}>
        {t("faq")}
      </Link>
      <Link
        href="/contact"
        onClick={onClick}
        className={getLinkClassName("/contact")}
      >
        {t("contact")}
      </Link>
    </>
  );
};

export default NavbarLinks;
