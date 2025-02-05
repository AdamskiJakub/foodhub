import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface MobileLinkProps {
  onClose?: () => void;
}

const NavbarMobileLinks: React.FC<MobileLinkProps> = ({ onClose }) => {
  const t = useTranslations("Navbar");

  return (
    <>
      <Link href="/blog" className="text-base font-medium" onClick={onClose}>
        {t("blog")}
      </Link>
      <Link href="/contact" className="text-base font-medium" onClick={onClose}>
        {t("contact")}
      </Link>
      <Link href="/about" className="text-base font-medium" onClick={onClose}>
        {t("about")}
      </Link>
      <Link href="/faq" className="text-base font-medium" onClick={onClose}>
        {t("faq")}
      </Link>
    </>
  );
};

export default NavbarMobileLinks;
