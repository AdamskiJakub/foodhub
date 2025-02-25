// components/breadcrumb/Breadcrumb.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumb");

  const pathSegments = pathname
    .split("/")
    .filter(
      (segment) => segment !== "" && segment !== "pl" && segment !== "en"
    );

  if (pathSegments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <span key={href} className="flex items-center">
              <BreadcrumbSeparator>{`>`}</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="ml-3 text-gray">
                    {t(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{t(segment)}</Link>
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
