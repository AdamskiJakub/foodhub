"use client";

import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Settings, LogOut, PlusCircle } from "lucide-react";

interface MobileUserMenuProps {
  onClose: () => void;
}

const MobileUserMenu = ({ onClose }: MobileUserMenuProps) => {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");
  const router = useRouter();

  if (!session) return null;

  const handleSettingsClick = () => {
    router.push({
      pathname: "/member/[username]/settings",
      params: { username: session.user.username || session.user.id },
    });
    onClose();
  };

  const handleRestaurantFormClick = () => {
    router.push({
      pathname: "/member/[username]/add-restaurant",
      params: { username: session.user.username || session.user.id },
    });
    onClose();
  };

  const handleLogoutClick = () => {
    signOut();
    onClose();
  };

  return (
    <div className="w-full border-t border-gray-100 pt-6 mt-4 flex flex-col gap-4">
      <p className="text-xs text-gray-400 uppercase tracking-widest text-center">
        {session.user.name || session.user.email}
      </p>
      <button
        onClick={handleSettingsClick}
        className="flex items-center justify-center gap-2 text-base font-medium hover:text-primary transition-colors"
      >
        <Settings className="h-4 w-4" />
        {t("settings")}
      </button>
      <button
        onClick={handleRestaurantFormClick}
        className="flex items-center justify-center gap-2 text-base font-medium hover:text-primary transition-colors"
      >
        <PlusCircle className="h-4 w-4" />
        {t("addRestaurant")}
      </button>
      <button
        onClick={handleLogoutClick}
        className="flex items-center justify-center gap-2 text-base font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        {t("logout")}
      </button>
    </div>
  );
};

export default MobileUserMenu;
