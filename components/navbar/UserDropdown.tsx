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
import { Link } from "@/i18n/routing";

interface UserDropdownProps {
  onClose?: () => void;
}

const UserDropdown = ({ onClose }: UserDropdownProps) => {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link
          onClick={onClose}
          href={{
            pathname: "/[member]/settings",
            params: { member: session.user.id },
          }}
        >
          <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => signOut()}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
