"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import LogoSection from "./LogoSection";
import LanguageModal from "./LanguageModal";
import NavbarLinks from "./NavbarLinks";
import Image from "next/image";
import { Locale, usePathname } from "@/i18n/routing";
import LocaleSwitcher from "../switcher/LocaleSwitcher";
import NavbarMobileLinks from "./MobileLinks";
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Locale>("pl");

  const pathname = usePathname();
  const locale = useLocale();
  const { data: session } = useSession();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navbarBackground =
    pathname && ["/specializations", "/downloads"].includes(pathname)
      ? "bg-beige"
      : "bg-white";

  const handleLanguageChange = useCallback((lang: Locale) => {
    setSelectedLang(lang);
  }, []);

  const handleOverflow = useCallback(() => {
    const body = document.body;
    body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    handleOverflow();
    return () => {
      const body = document.body;
      body.style.overflow = "";
    };
  }, [handleOverflow]);

  return (
    <nav className={`w-full ${navbarBackground}`}>
      <div className="w-full h-16 lg:h-20 mx-auto flex items-center justify-between px-4 lg:px-20">
        <Link href="/" aria-label="Homepage">
          <LogoSection />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-10">
            <NavbarLinks />
          </div>
          {/* TODO: both LocaleSwitcher and LanguageModal should have passed the same logic for switching lang */}
          <LocaleSwitcher />

          {session ? (
            <UserDropdown />
          ) : (
            <Link
              href="/login"
              className="bg-primary px-6 py-3 leading-none text-white text-center rounded text-base font-medium hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              {t("login")}
            </Link>
          )}
        </div>

        <button
          className="block lg:hidden z-50"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            {!isOpen ? (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="#222"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                d="M6 6l12 12M6 18L18 6"
                stroke="#222"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </motion.svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center px-5 pt-16 pb-5 z-40"
            >
              <div className="absolute top-0 left-0 w-full h-16 bg-white flex items-center shadow-md z-50 px-5">
                <Link href="/" aria-label="Homepage">
                  <LogoSection />
                </Link>
              </div>

              <div className="flex flex-col items-center w-full gap-10 mt-10 flex-1">
                <NavbarMobileLinks onClose={() => setIsOpen(false)} />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-base font-medium flex items-center gap-2"
                >
                  <Image
                    src={`/images/${locale}.svg`}
                    alt="flag"
                    width={20}
                    height={20}
                  />
                  {t("language")}
                </button>
              </div>
              {session ? (
                <UserDropdown />
              ) : (
                <Link
                  href="/login"
                  className="bg-primary text-white w-full text-center py-3 rounded text-base font-medium hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  {t("login")}
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <LanguageModal
          onClose={() => setIsModalOpen(false)}
          selectedLang={selectedLang}
          onChange={handleLanguageChange}
        />
      )}
    </nav>
  );
};

export default Navbar;
