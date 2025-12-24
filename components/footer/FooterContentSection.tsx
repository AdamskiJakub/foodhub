"use client";

import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

interface FooterContactSectionProps {
  title: string;
  items: { type: string; content: string; href?: string }[];
}

const FooterContactSection: React.FC<FooterContactSectionProps> = ({
  title,
  items,
}) => (
  <div className="flex flex-col items-start text-left gap-2">
    <h4 className="font-semibold text-secondaryText text-sm uppercase tracking-wide">
      {title}
    </h4>
    {items.map((item, idx) => (
      <div key={idx}>
        {item.type === "email" ? (
          <a
            href={item.href}
            className="text-primaryText text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
          >
            <MdEmail className="w-4 h-4" />
            {item.content}
          </a>
        ) : item.type === "phone" ? (
          <a
            href={item.href}
            className="text-primaryText text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
          >
            <MdPhone className="w-4 h-4" />
            {item.content}
          </a>
        ) : (
          <p className="text-primaryText text-sm flex items-center gap-2">
            <MdLocationOn className="w-4 h-4 text-secondaryText" />
            {item.content}
          </p>
        )}
      </div>
    ))}
  </div>
);

export default FooterContactSection;
