"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const ProfileInfo = () => {
  const { data: session } = useSession();
  const t = useTranslations("UserSettings");

  if (!session) return null;

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{t("profileInfo")}</h2>
      <p>
        <strong>{t("name")}:</strong> {session.user.name || t("emptyField")}
      </p>
      <p>
        <strong>{t("email")}:</strong> {session.user.email}
      </p>
      <p>
        <strong>{t("dateOfBirth")}:</strong>
        {session.user.dateOfBirth &&
        !isNaN(new Date(session.user.dateOfBirth).getTime())
          ? new Date(session.user.dateOfBirth).toLocaleDateString()
          : t("emptyField")}
      </p>
      <p>
        <strong>{t("location")}:</strong>{" "}
        {session.user.location || t("emptyField")}
      </p>
      <p>
        <strong>{t("phoneNumber")}:</strong>{" "}
        {session.user.phoneNumber || t("emptyField")}
      </p>
      <p>
        <strong>{t("address")}:</strong>{" "}
        {session.user.address || t("emptyField")}
      </p>
    </>
  );
};

export default ProfileInfo;
