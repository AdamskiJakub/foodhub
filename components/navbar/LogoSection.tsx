import React from "react";
import Image from "next/image";

const LogoSection = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/images/logo.svg"
        alt="FoodHub Logo"
        width={180}
        height={40}
        className="h-8 w-auto md:h-10"
        priority
      />
    </div>
  );
};

export default LogoSection;
