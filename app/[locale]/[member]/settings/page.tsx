"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UserSettingsPage = () => {
  const { data: session } = useSession();
  const t = useTranslations("UserSettings");
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("options")}</h2>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full text-left">
                  {t("changePassword")}
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full text-left">
                  {t("editProfile")}
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t("profileInfo")}</h2>
            <p>
              <strong>{t("email")}:</strong> {session.user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
