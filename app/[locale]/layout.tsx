import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Locale, routing } from "@/i18n/routing";
import { SEOAttributes } from "@/types/seo";
import { ReactNode } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import Head from "next/head";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import LocaleSwitcher from "@/components/switcher/LocaleSwitcher";

const inter = Inter({ subsets: ["latin"] });

type Params = Promise<{ locale: Locale }>;

interface Props {
  children: ReactNode;
  params: Params;
}

export const generateStaticParams = (): { locale: Locale }[] => {
  return routing.locales.map((locale) => ({ locale }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const messages = (await getMessages({ locale })) as unknown as Record<
    string,
    SEOAttributes
  >;
  const seoMessages = messages.SEO;

  const title = seoMessages?.title || "Default Title";
  const description = seoMessages?.description || "Default Description";

  return {
    metadataBase: new URL("", process.env.NEXT_PUBLIC_BASE_URL!),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `./`,
      images: [
        {
          url: "https://placehold.co/1200x630/png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    return notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  const businessInfo = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FoodHub",
    //add image
    address: {
      "@type": "PostalAddress",
      addressLocality: "Białystok",
      addressRegion: "Podlaskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.075999,
      longitude: 23.095159,
    },
    url: process.env.NEXT_PUBLIC_BASE_URL,
    telephone: "+48 123 456 789",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  if (!messages) {
    return notFound();
  }

  return (
    <html lang={locale}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessInfo, null, 2),
          }}
        />
      </Head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
