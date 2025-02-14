"use client";

import React from "react";

interface FooterContactSectionProps {
  title: string;
  items: { type: string; content: string; href?: string }[];
}

const FooterContactSection: React.FC<FooterContactSectionProps> = ({
  title,
  items,
}) => (
  <div className="flex flex-col items-start text-left gap-1">
    <h4 className="font-medium text-secondaryText text-sm">{title}</h4>
    {items.map((item, idx) => (
      <div key={idx}>
        {item.type === "email" ? (
          <a
            href={item.href}
            className="text-primaryText text-sm hover:underline"
          >
            {item.content}
          </a>
        ) : item.type === "phone" ? (
          <a
            href={item.href}
            className="text-primaryText text-sm hover:underline"
          >
            {item.content}
          </a>
        ) : (
          <p className="text-primaryText text-sm">{item.content}</p>
        )}
      </div>
    ))}
  </div>
);

export default FooterContactSection;
