"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname, Locale } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const languageOptions: { locale: Locale; label: string }[] = [
  { locale: "pl", label: "Polski" },
  { locale: "en", label: "English" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLocaleChange = useCallback(
    (locale: Locale) => {
      setIsOpen(false);
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      router.push({ pathname, params: params as any }, { locale });
    },
    [router, params, pathname]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const currentLanguage = languageOptions.find(
    (option) => option.locale === locale
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
      >
        <Image
          src={`/${locale}.svg`}
          alt={currentLanguage?.label ?? ""}
          width={20}
          height={20}
        />
        <span className="text-sm font-medium">{currentLanguage?.label}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="min-h-4 min-w-4"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute bg-white rounded z-50 border border-[#0000001A] box-border shadow-[0px_4px_20px_0px_#0000000D] p-2"
        >
          {languageOptions.map(({ locale: langLocale, label }) => (
            <button
              key={langLocale}
              onClick={() => handleLocaleChange(langLocale)}
              className={`flex justify-start w-full items-center gap-2 px-2 py-2 rounded hover:bg-[#F1F1EF] ${
                langLocale === locale ? "font-semibold" : "font-normal"
              }`}
            >
              <Image
                src={`/${langLocale}.svg`}
                alt={label}
                width={20}
                height={20}
              />
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
