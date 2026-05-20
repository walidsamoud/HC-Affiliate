import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import AppChrome from "../../components/AppChrome";
import themeConfig from "../../theme.config";
import { locales } from "../../lib/locales";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://affiliate.crownxbet.com").replace(/\/+$/, "");
  const titleBase = "CrownX Partners — Affiliate Program";
  const desc =
    "Earn recurring revenue with the official CrownXBet affiliate program. 10% lifetime commission on player GGR, plus 10% on sub-affiliators. No cap, all countries, all payment methods.";

  return {
    metadataBase: new URL(appUrl),
    title: { default: titleBase, template: "%s · CrownX Partners" },
    description: desc,
    alternates: {
      canonical: `${appUrl}/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${appUrl}/${l}`])),
    },
    icons: { icon: themeConfig.favicon },
    openGraph: {
      type: "website",
      url: `${appUrl}/${locale}`,
      title: titleBase,
      description: desc,
      siteName: themeConfig.brandName,
      images: [
        {
          url: `${appUrl}${themeConfig.seo.ogImage}`,
          width: themeConfig.seo.ogImageWidth,
          height: themeConfig.seo.ogImageHeight,
          alt: themeConfig.brandName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: themeConfig.seo.twitterSite,
      title: titleBase,
      description: desc,
      images: [`${appUrl}${themeConfig.seo.ogImage}`],
    },
    robots: { index: true, follow: true },
    themeColor: themeConfig.seo.themeColor,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppChrome>{children}</AppChrome>
          <ToastContainer position="top-right" theme="dark" autoClose={4000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
