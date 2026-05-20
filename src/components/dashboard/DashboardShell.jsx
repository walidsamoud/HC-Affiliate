"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import themeConfig from "../../theme.config";
import { logout } from "../../_services/auth";
import { getStoredAffiliator } from "../../lib/api";
import LocaleSwitcher from "../LocaleSwitcher";

const NAV = [
  { href: "", key: "home", icon: "home" },
  { href: "/players", key: "players", icon: "users" },
  { href: "/partners", key: "partners", icon: "network" },
  { href: "/withdrawals", key: "withdrawals", icon: "wallet" },
  { href: "/ideas", key: "ideas", icon: "bulb" },
];

export default function DashboardShell({ children }) {
  const t = useTranslations("dashboard.nav");
  const locale = useLocale();
  const pathname = usePathname() || "";
  const router = useRouter();
  const user = getStoredAffiliator();
  const base = `/${locale}/dashboard`;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (suffix) => {
    if (!suffix) return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(`${base}${suffix}`);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onLogout = async () => {
    closeMenu();
    await logout();
    router.push(`/${locale}/login`);
  };

  return (
    <div className={`cx-dash ${menuOpen ? "cx-dash--menu-open" : ""}`}>
      <button
        type="button"
        className="cx-dash__backdrop"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <aside className="cx-dash__sidebar">
        <Link href={base} className="cx-dash__brand" onClick={closeMenu}>
          <Image src={themeConfig.logo.src} alt={themeConfig.logo.alt} width={120} height={34} />
        </Link>
        <p className="cx-dash__user">
          {user?.name || user?.username || "Partner"}
          <span className="cx-dash__user-meta">@{user?.username}</span>
        </p>
        <nav className="cx-dash__nav">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={`${base}${item.href}`}
              className={isActive(item.href) ? "active" : ""}
              onClick={closeMenu}
            >
              <NavIcon name={item.icon} />
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="cx-dash__sidebar-foot">
          <Link
            href={`${base}/change-password`}
            className={isActive("/change-password") ? "active" : ""}
            onClick={closeMenu}
          >
            {t("settings")}
          </Link>
          <button type="button" onClick={onLogout} className="cx-dash__logout">
            {t("logout")}
          </button>
        </div>
      </aside>

      <div className="cx-dash__body">
        <header className="cx-dash__top">
          <div className="cx-dash__top-left">
            <Link href={base} className="cx-dash__top-logo">
              <Image src={themeConfig.logo.src} alt={themeConfig.logo.alt} width={100} height={28} />
            </Link>
            <span className="cx-dash__top-title">{themeConfig.brandName}</span>
          </div>
          <div className="cx-dash__top-right">
            <LocaleSwitcher />
            <button
              type="button"
              className="cx-dash__menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </header>
        <div className="cx-dash__content">{children}</div>
      </div>
    </div>
  );
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({ name }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "users") return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (name === "network") return <svg {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>;
  if (name === "wallet") return <svg {...p}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>;
  if (name === "bulb") return <svg {...p}><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.88 1.39-2.5A6 6 0 0 0 12 4a6 6 0 0 0-4.48 7.5c.74.62 1.21 1.52 1.39 2.5" /></svg>;
  return <svg {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>;
}
