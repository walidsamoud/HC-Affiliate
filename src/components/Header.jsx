"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import themeConfig from "../theme.config";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  const isActive = (suffix) => {
    if (suffix === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${suffix}`);
  };

  const switchLocale = (next) => {
    if (typeof window === "undefined") return `/${next}`;
    const parts = pathname.split("/");
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  };

  return (
    <header className="cx-header">
      <div className="cx-container">
        <div className="cx-header__inner">
          <Link href={`/${locale}`} className="cx-logo">
            <Image
              src={themeConfig.logo.src}
              alt={themeConfig.logo.alt}
              width={140}
              height={40}
              priority
            />
          </Link>

          <nav className={`cx-nav ${open ? "cx-nav--open" : ""}`} onClick={() => setOpen(false)}>
            <Link href={`/${locale}`} className={isActive("") ? "active" : ""}>{t("home")}</Link>
            <Link href={`/${locale}/join`} className={isActive("/join") ? "active" : ""}>{t("joinProgram")}</Link>
            <Link href={`/${locale}/faq`} className={isActive("/faq") ? "active" : ""}>{t("faq")}</Link>
            <Link href={`/${locale}/contact`} className={isActive("/contact") ? "active" : ""}>{t("contact")}</Link>
          </nav>

          <div className="cx-nav__cta">
            <LocaleSwitcher />
            <Link href={`/${locale}/login`} className="cx-btn cx-btn--ghost" style={{ padding: "9px 16px", fontSize: 13 }}>
              {t("login")}
            </Link>
            <button
              className="cx-burger"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
