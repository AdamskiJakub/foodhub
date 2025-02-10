import { Locale, routing } from "@/i18n/routing";
import LoginForm from "@/components/login-form/LoginForm";

import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}
export const generateStaticParams = (): { locale: Locale }[] => {
  return routing.locales.map((locale) => ({ locale }));
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
