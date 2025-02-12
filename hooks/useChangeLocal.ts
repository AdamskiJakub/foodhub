"use client";

import { useRouter, usePathname, Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLocaleChange = useCallback(
    (locale: Locale) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      router.push({ pathname, params: params as any }, { locale });
    },
    [router, params, pathname]
  );

  return { handleLocaleChange };
}
