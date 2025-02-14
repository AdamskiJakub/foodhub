"use client";

import React from "react";
import Link from "next/link";

interface FooterLinksSectionProps {
  title: string;
  items: { type: string; content: string; href: string }[];
}

const FooterLinksSection: React.FC<FooterLinksSectionProps> = ({
  title,
  items,
}) => (
  <div className="flex flex-col items-start text-left gap-1">
    <h4 className="font-medium text-secondaryText text-sm">{title}</h4>
    {items.map((item, idx) => (
      <Link
        key={idx}
        href={item.href}
        className="text-primaryText text-sm hover:underline"
      >
        {item.content}
      </Link>
    ))}
  </div>
);

export default FooterLinksSection;
