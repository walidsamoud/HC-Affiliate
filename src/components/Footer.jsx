import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import themeConfig from "../theme.config";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const mainSite = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://crownxbet.com";

  return (
    <footer className="cx-footer">
      <div className="cx-container">
        <div className="cx-footer__inner">
          <div className="cx-footer__brand">
            <Image src={themeConfig.logo.src} alt={themeConfig.logo.alt} width={100} height={100} style={{ width: "100px", height: "auto" }} />
            <span>{themeConfig.brandName}</span>
          </div>
          <div className="cx-footer__links">
            <Link href={`/${locale}`}>{t("links.home")}</Link>
            <Link href={`/${locale}/join`}>{t("links.join")}</Link>
            <Link href={`/${locale}/login`}>{t("links.login")}</Link>
            <Link href={`/${locale}/faq`}>{t("links.faq")}</Link>
            <Link href={`/${locale}/contact`}>{t("links.contact")}</Link>
            <a href={mainSite} target="_blank" rel="noopener noreferrer">{t("links.mainSite")} ↗</a>
          </div>
        </div>
        <div className="cx-footer__copy">
          {t("copyright", { year })} &nbsp;·&nbsp; {t("developedBy")}
        </div>
      </div>
    </footer>
  );
}
