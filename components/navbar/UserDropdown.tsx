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
import { useRouter } from "@/i18n/routing";

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
    router.push({
      pathname: "/member/[username]/settings",
      params: { username: session.user.username || session.user.id },
    });
    if (onClose) onClose();
  };

  const handleRestaurantFormClick = () => {
    router.push({
      pathname: "/member/[username]/add-restaurant",
      params: { username: session.user.username || session.user.id },
    });
    if (onClose) onClose();
  };

  const handleLogoutClick = () => {
    signOut();
    if (onClose) onClose();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus-visible:ring-0"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleSettingsClick}
        >
          {t("settings")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleRestaurantFormClick}
        >
          {t("addRestaurant")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogoutClick}
        >
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
