"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Mail, User, Calendar, MapPin, Phone } from "lucide-react";

const ProfileInfo = () => {
  const { data: session } = useSession();
  const t = useTranslations("UserSettings");

  if (!session) return null;

  const profileFields = [
    {
      icon: User,
      label: t("name"),
      value: session.user.name || t("emptyField"),
    },
    {
      icon: Mail,
      label: t("email"),
      value: session.user.email || t("emptyField"),
    },
    {
      icon: Calendar,
      label: t("dateOfBirth"),
      value:
        session.user.dateOfBirth &&
        !isNaN(new Date(session.user.dateOfBirth).getTime())
          ? new Date(session.user.dateOfBirth).toLocaleDateString()
          : t("emptyField"),
    },
    {
      icon: MapPin,
      label: t("location"),
      value: session.user.location || t("emptyField"),
    },
    {
      icon: Phone,
      label: t("phoneNumber"),
      value: session.user.phoneNumber || t("emptyField"),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("profileInfo")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {t("profileInfoDescription")}
        </p>
      </div>

      <div className="space-y-4">
        {profileFields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">
                  {field.label}
                </p>
                <p className="mt-1 text-base text-gray-900 break-words">
                  {field.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileInfo;
