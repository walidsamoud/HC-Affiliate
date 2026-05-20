"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { getToken, getStoredAffiliator } from "../../lib/api";
import { me } from "../../_services/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = useLocale();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const token = getToken();
      if (!token) {
        router.replace(`/${locale}/login`);
        return;
      }

      try {
        const user = (await me()) || getStoredAffiliator();
        if (cancelled) return;

        const mustChange = !!user?.must_change_password;
        const onChangePage = pathname.includes("/dashboard/change-password");

        if (mustChange && !onChangePage) {
          router.replace(`/${locale}/dashboard/change-password`);
          return;
        }
        if (!mustChange && onChangePage) {
          router.replace(`/${locale}/dashboard`);
          return;
        }

        setReady(true);
      } catch {
        if (!cancelled) router.replace(`/${locale}/login`);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [locale, pathname, router]);

  if (!ready) {
    return (
      <div className="cx-dash-loading">
        <span className="cx-spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
      </div>
    );
  }

  return children;
}
