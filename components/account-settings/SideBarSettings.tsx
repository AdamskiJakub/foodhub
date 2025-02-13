"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SettingsSidebarProps {
  onSectionChange: (
    section: "profile" | "changePassword" | "editProfile"
  ) => void;
}

const SettingsSidebar = ({ onSectionChange }: SettingsSidebarProps) => {
  const t = useTranslations("UserSettings");

  const handleSectionChange = (
    section: "profile" | "changePassword" | "editProfile"
  ) => {
    onSectionChange(section);
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{t("options")}</h2>
      <ul className="space-y-2">
        <li>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => handleSectionChange("profile")}
          >
            {t("profileInfo")}
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => handleSectionChange("editProfile")}
          >
            {t("editProfile")}
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full text-left"
            onClick={() => handleSectionChange("changePassword")}
          >
            {t("changePassword")}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
