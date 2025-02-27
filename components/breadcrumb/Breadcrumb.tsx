"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface BreadcrumbSegment {
  label: string;
  href?: string;
  isTranslation?: boolean;
}

interface BreadcrumbComponentProps {
  customSegments?: BreadcrumbSegment[];
}

const BreadcrumbComponent = ({ customSegments }: BreadcrumbComponentProps) => {
  const t = useTranslations("Breadcrumb");

  const segments = customSegments || [];

  if (segments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          const label =
            segment.isTranslation === true ? t(segment.label) : segment.label;
          return (
            <span key={index} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator>{`>`}</BreadcrumbSeparator>}
              <BreadcrumbItem>
                {isLast || !segment.href ? (
                  <BreadcrumbPage className="ml-3 text-gray">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={segment.href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
