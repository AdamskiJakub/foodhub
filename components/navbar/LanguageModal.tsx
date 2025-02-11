"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "../ui/button";
import cn from "classnames";

interface LanguageModalProps {
  onClose: () => void;
  selectedLang: Locale;
  onChangeLocale: (locale: Locale) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  onClose,
  selectedLang,
  onChangeLocale,
}) => {
  const t = useTranslations("LocaleSwitcher");

  const [currentLang, setCurrentLang] = useState<Locale>(selectedLang);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = useCallback((lang: Locale) => {
    setCurrentLang(lang);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  const initCurrentLang = useCallback(() => {
    setCurrentLang(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    initCurrentLang();
  }, [initCurrentLang]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div ref={modalRef} className="w-full max-w-lg bg-white rounded p-8 mx-4">
        <p className="text-sm font-medium text-secondaryText">{t("label")}</p>

        <div className="flex flex-col mt-6">
          {(["pl", "en"] as Locale[]).map((lang, index) => {
            const label = lang === "pl" ? "Polski" : "English";

            return (
              <React.Fragment key={lang}>
                <button
                  onClick={() => handleLanguageSelect(lang)}
                  className={cn("flex items-center justify-between px-4 py-3", {
                    "bg-white": currentLang !== lang,
                  })}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/images/${lang}.svg`}
                      alt={label}
                      width={20}
                      height={20}
                    />
                    <span className="text-base font-medium">{label}</span>
                  </div>
                  {currentLang === lang && (
                    <div>
                      <Image
                        src="/images/radio-button.svg"
                        alt="Selected"
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </button>

                {index < 1 && <div className="h-px bg-[#E4E3E3]"></div>}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button onClick={() => onChangeLocale(currentLang)}>
            {t("save")}
          </Button>
          <Button onClick={onClose}>{t("cancel")}</Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
