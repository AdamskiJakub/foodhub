"use client";

import React from "react";
import Link from "next/link";
import { socialIcons } from "@/lib/socialIcons";

interface FooterSocialSectionProps {
  title: string;
  items: { type: string; content: string; href: string }[];
}

const FooterSocialSection: React.FC<FooterSocialSectionProps> = ({
  title,
  items,
}) => (
  <div className="flex flex-col items-start text-left gap-2">
    <h4 className="font-semibold text-secondaryText text-sm uppercase tracking-wide">
      {title}
    </h4>
    {items.map((item, idx) => (
      <Link
        key={idx}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primaryText text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
      >
        {socialIcons[item.content]}
        {item.content}
      </Link>
    ))}
  </div>
);

export default FooterSocialSection;
