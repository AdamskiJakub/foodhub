import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import FAQSection from "@/components/faq/FAQSection";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
      locale: locale,
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <FAQSection />
    </div>
  );
}
