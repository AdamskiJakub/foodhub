import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const FooterLogoSection = () => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <Image
        src="/images/logo.svg"
        alt="FoodHub Logo"
        width={180}
        height={40}
        className="h-8 w-auto md:h-10 opacity-90 hover:opacity-100 transition-opacity duration-200"
      />
    </Link>
  );
};

export default FooterLogoSection;
