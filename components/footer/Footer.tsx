"use client";

import React from "react";
import { useFooterData } from "@/hooks/useFooterData";
import FooterLogoSection from "./FooterLogoSection";
import FooterLinksSection from "./FooterLinksSection";
import FooterContactSection from "./FooterContentSection";
import FooterLegalSection from "./FooterLegalSection";
import FooterSocialSection from "./FooterSocialSection";
import FooterLegalTwoSection from "./FooterLegalTwoSection";

const Footer = () => {
  const footerData = useFooterData();

  const linksData = footerData[0];
  const contactData = footerData[1];
  const legalData = footerData[2];
  const socialData = footerData[3];

  return (
    <footer className="w-full bg-white pt-6 lg:pt-14">
      <div className="w-full mx-auto flex flex-col gap-6 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row text-left text-base items-start gap-6 pt-10 flex-wrap md:flex-nowrap">
          <div className="mb-4 md:mb-0 md:mr-20">
            <FooterLogoSection />
          </div>

          <div className="flex flex-wrap w-full justify-between gap-x-10 gap-y-6">
            <FooterLinksSection
              title={linksData.title}
              items={linksData.items.map((item) => ({
                ...item,
                href: item.href ?? "#",
              }))}
            />
            <FooterContactSection
              title={contactData.title}
              items={contactData.items}
            />
            <FooterLegalTwoSection
              title={legalData.title}
              items={legalData.items.map((item) => ({
                ...item,
                href: item.href ?? "#",
              }))}
            />
            <FooterSocialSection
              title={socialData.title}
              items={socialData.items.map((item) => ({
                ...item,
                href: item.href ?? "#",
              }))}
            />
          </div>
        </div>

        <div className="w-full h-px bg-[#E4E3E3] lg:mt-10"></div>

        <div className="md:px-10 px-4">
          <FooterLegalSection />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
