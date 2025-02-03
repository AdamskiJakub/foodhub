import { setRequestLocale } from "next-intl/server";
import NotFound from "./not-found";
import LocaleSwitcher from "@/components/switcher/LocaleSwitcher";
import { Locale } from "@/i18n/routing";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}

export const generateStaticParams = (): { locale: Locale }[] => {
  return [{ locale: "en" }, { locale: "pl" }];
};

export default async function HomePage(props: Props) {
  const { params } = props;
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div>
      <NotFound />
      <LocaleSwitcher />
    </div>
  );
}
