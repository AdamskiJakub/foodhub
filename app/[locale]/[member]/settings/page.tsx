"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  ChangePasswordFormData,
  changePasswordSchema,
  changeProfileSchema,
  ProfileFormData,
} from "@/lib/validation/userPanelSchema";

const UserSettingsPage = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("UserSettings");
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<
    "profile" | "changePassword" | "editProfile"
  >("profile");

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(changeProfileSchema(t)),
    defaultValues: {
      name: session?.user.name || "",
      dateOfBirth: session?.user.dateOfBirth
        ? new Date(session?.user.dateOfBirth).toISOString().split("T")[0]
        : "",
      location: session?.user.location || "",
      phoneNumber: session?.user.phoneNumber || "",
      address: session?.user.address || "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema(t)),
    defaultValues: {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!session) {
    return null;
  }

  const handleProfileUpdate: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      if (!data.name) {
        toast.error(t("nameRequired"));
        return;
      }

      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          dateOfBirth: data.dateOfBirth || null,
          location: data.location || null,
          phoneNumber: data.phoneNumber || null,
          address: data.address || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(t("profileUpdatedSuccess"));
      resetProfile();
    } catch (error) {
      toast.error(t("profileUpdateError"));
      console.error("Error updating profile:", error);
    }
  };

  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = async (
    data
  ) => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(t("passwordChangedSuccess"));
      resetPassword();
    } catch (error) {
      toast.error(t("passwordChangeError"));
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">{t("options")}</h2>
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setActiveSection("profile")}
              >
                {t("profileInfo")}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setActiveSection("editProfile")}
              >
                {t("editProfile")}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setActiveSection("changePassword")}
              >
                {t("changePassword")}
              </Button>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
          {activeSection === "profile" ? (
            <>
              <h2 className="text-lg font-semibold mb-4">{t("profileInfo")}</h2>
              <p>
                <strong>{t("name")}:</strong> {session.user.name || "N/A"}
              </p>
              <p>
                <strong>{t("email")}:</strong> {session.user.email}
              </p>
              <p>
                <strong>{t("dateOfBirth")}:</strong>
                {session.user.dateOfBirth &&
                !isNaN(new Date(session.user.dateOfBirth).getTime())
                  ? new Date(session.user.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>{t("location")}:</strong>{" "}
                {session.user.location || "N/A"}
              </p>
              <p>
                <strong>{t("phoneNumber")}:</strong>{" "}
                {session.user.phoneNumber || "N/A"}
              </p>
              <p>
                <strong>{t("address")}:</strong> {session.user.address || "N/A"}
              </p>
            </>
          ) : activeSection === "editProfile" ? (
            <>
              <h2 className="text-lg font-semibold mb-4">{t("editProfile")}</h2>
              <form
                onSubmit={handleProfileSubmit(handleProfileUpdate)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("name")}
                  </label>
                  <Controller
                    name="name"
                    control={profileControl}
                    render={({ field }) => (
                      <Input {...field} type="text" className="w-full" />
                    )}
                  />
                  {profileErrors.name && (
                    <p className="text-red-500 text-sm">
                      {profileErrors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("dateOfBirth")}
                  </label>
                  <Controller
                    name="dateOfBirth"
                    control={profileControl}
                    render={({ field }) => (
                      <Input {...field} type="date" className="w-full" />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("location")}
                  </label>
                  <Controller
                    name="location"
                    control={profileControl}
                    render={({ field }) => (
                      <Input {...field} type="text" className="w-full" />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("phoneNumber")}
                  </label>
                  <Controller
                    name="phoneNumber"
                    control={profileControl}
                    render={({ field }) => (
                      <Input {...field} type="text" className="w-full" />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("address")}
                  </label>
                  <Controller
                    name="address"
                    control={profileControl}
                    render={({ field }) => (
                      <Input {...field} type="text" className="w-full" />
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("saveChanges")}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {t("changePassword")}
              </h2>
              <form
                onSubmit={handlePasswordSubmit(handleChangePassword)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("currentPassword")}
                  </label>
                  <Controller
                    name="currentPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("newPassword")}
                  </label>
                  <Controller
                    name="newPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("confirmNewPassword")}
                  </label>
                  <Controller
                    name="confirmNewPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <Input {...field} type="password" className="w-full" />
                    )}
                  />
                  {passwordErrors.confirmNewPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordErrors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  {t("changePassword")}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
