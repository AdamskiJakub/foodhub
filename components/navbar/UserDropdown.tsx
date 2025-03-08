"use client";

import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  onClose?: () => void;
}

const UserDropdown = ({ onClose }: UserDropdownProps) => {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");
  const router = useRouter();

  if (!session) {
    return null;
  }

  const handleSettingsClick = () => {
    router.push(`/member/${session.user.id}/settings`);
    if (onClose) onClose();
  };

  const handleRestaurantFormClick = () => {
    router.push(`/member/${session.user.id}/add-restaurant`);
    if (onClose) onClose();
  };

  const handleLogoutClick = () => {
    signOut();
    if (onClose) onClose();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleSettingsClick}>
          {t("settings")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogoutClick}>
          {t("logout")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRestaurantFormClick}>
          {t("addRestaurant")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
