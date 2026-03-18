"use client";

import ProfileInfo from "@/components/account-settings/ProfileInfo";
import EditProfileForm from "@/components/account-settings/EditProfileForm";
import ChangePasswordForm from "@/components/account-settings/ChangePasswordForm";
import SettingsSidebar from "@/components/account-settings/SideBarSettings";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const UserSettingsPage = () => {
  const [activeSection, setActiveSection] = useState<
    "profile" | "changePassword" | "editProfile"
  >("profile");

  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("UserSettings");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push({ pathname: "/login" });
    }
  }, [status, router]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-sm text-gray-600">{t("description")}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              {activeSection === "profile" && <ProfileInfo />}
              {activeSection === "editProfile" && (
                <EditProfileForm
                  defaultValues={{
                    name: session.user.name || "",
                    dateOfBirth: session.user.dateOfBirth
                      ? new Date(session.user.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : "",
                    location: session.user.location || "",
                    phoneNumber: session.user.phoneNumber || "",
                  }}
                />
              )}
              {activeSection === "changePassword" && <ChangePasswordForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
