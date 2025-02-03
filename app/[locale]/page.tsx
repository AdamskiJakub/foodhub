import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import NotFound from "./not-found";
import LocaleSwitcher from "@/components/switcher/LocaleSwitcher";

interface Params {
  locale: Locale;
}

interface Props {
  params: Params;
}

export const generateStaticParams = (): Params[] => {
  return [{ locale: "en" }, { locale: "pl" }];
};

export default function HomePage(props: Props) {
  const { params } = props;
  const { locale } = params;

  setRequestLocale(locale);

  return (
    <div>
      <NotFound />
      <LocaleSwitcher />
    </div>
  );
}
