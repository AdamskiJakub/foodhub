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
        className={`text-base font-medium transition-all duration-200 ${
          isActive("/blog")
            ? "text-primary font-semibold"
            : "text-primaryText hover:text-primary hover:translate-y-[-2px]"
        }`}
      >
        {t("blog")}
      </Link>
      <Link
        href="/about"
        onClick={onClick}
        className={`text-base font-medium transition-all duration-200 ${
          isActive("/about")
            ? "text-primary font-semibold"
            : "text-primaryText hover:text-primary hover:translate-y-[-2px]"
        }`}
      >
        {t("about")}
      </Link>
      <Link
        href="/faq"
        onClick={onClick}
        className={`text-base font-medium transition-all duration-200 ${
          isActive("/faq")
            ? "text-primary font-semibold"
            : "text-primaryText hover:text-primary hover:translate-y-[-2px]"
        }`}
      >
        {t("faq")}
      </Link>
      <Link
        href="/contact"
        onClick={onClick}
        className={`text-base font-medium transition-all duration-200 ${
          isActive("/contact")
            ? "text-primary font-semibold"
            : "text-primaryText hover:text-primary hover:translate-y-[-2px]"
        }`}
      >
        {t("contact")}
      </Link>
    </>
  );
};

export default NavbarLinks;
