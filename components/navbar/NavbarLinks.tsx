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

  return (
    <>
      <Link
        href="/blog"
        onClick={onClick}
        className={`text-base font-medium ${
          isActive("/blog") ? "underline text-primaryText" : "text-primaryText"
        }`}
      >
        {t("blog")}
      </Link>
      <Link
        href="/about"
        onClick={onClick}
        className={`text-base font-medium ${
          isActive("/about") ? "underline text-primaryText" : "text-primaryText"
        }`}
      >
        {t("about")}
      </Link>
      <Link
        href="/faq"
        onClick={onClick}
        className={`text-base font-medium ${
          isActive("/faq") ? "underline text-primaryText" : "text-primaryText"
        }`}
      >
        {t("faq")}
      </Link>
      <Link
        href="/contact"
        onClick={onClick}
        className={`text-base font-medium ${
          isActive("/contact")
            ? "underline text-primaryText"
            : "text-primaryText"
        }`}
      >
        {t("contact")}
      </Link>
    </>
  );
};

export default NavbarLinks;
