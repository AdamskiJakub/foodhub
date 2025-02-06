import { Locale, routing } from "@/i18n/routing";
import LoginForm from "@/components/login-form/LoginForm";

import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

export const generateStaticParams = (): { locale: Locale }[] => {
  return routing.locales.map((locale) => ({ locale }));
};

type Props = {
  params: { locale: Locale };
};

const LoginPage = async ({ params }: Props) => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  const { locale } = await params;
  return (
    <div>
      <LoginForm locale={locale} />
    </div>
  );
};

export default LoginPage;
