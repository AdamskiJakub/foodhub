"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { User, Edit, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
  activeSection: "profile" | "changePassword" | "editProfile";
  onSectionChange: (
    section: "profile" | "changePassword" | "editProfile",
  ) => void;
}

const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) => {
  const t = useTranslations("UserSettings");

  const menuItems = [
    {
      id: "profile" as const,
      label: t("profileInfo"),
      icon: User,
    },
    {
      id: "editProfile" as const,
      label: t("editProfile"),
      icon: Edit,
    },
    {
      id: "changePassword" as const,
      label: t("changePassword"),
      icon: Lock,
    },
  ];

  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-4 py-3 h-auto font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default SettingsSidebar;
