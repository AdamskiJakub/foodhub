"use client";

import ProfileInfo from "@/components/account-settings/ProfileInfo";
import EditProfileForm from "@/components/account-settings/EditProfileForm";
import ChangePasswordForm from "@/components/account-settings/ChangePasswordForm";
import SettingsSidebar from "@/components/account-settings/SideBarSettings";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserSettingsPage = () => {
  const [activeSection, setActiveSection] = useState<
    "profile" | "changePassword" | "editProfile"
  >("profile");

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!session) return null;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <SettingsSidebar onSectionChange={setActiveSection} />
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
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
                address: session.user.address || "",
              }}
            />
          )}
          {activeSection === "changePassword" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
