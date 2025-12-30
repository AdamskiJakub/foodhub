import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import ContactSection from "@/components/contact/ContactSection";
import { getTranslations } from "next-intl/server";
import { truncateDescription } from "@/lib/utils";

type Params = Promise<{ locale: Locale }>;

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const title = `${t("title")} - ${t("subtitle")}`;
  const description = truncateDescription(t("intro"), 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <ContactSection />
    </div>
  );
}
