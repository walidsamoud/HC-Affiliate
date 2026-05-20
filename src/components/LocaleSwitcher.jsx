"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, localeNames } from "../lib/locales";

export default function LocaleSwitcher({ className = "" }) {
  const locale = useLocale();
  const pathname = usePathname() || "";
  const router = useRouter();

  const pathFor = (next) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0 && locales.includes(parts[0])) {
      parts[0] = next;
      return "/" + parts.join("/");
    }
    return `/${next}`;
  };

  const onChange = (e) => {
    const next = e.target.value;
    if (next && next !== locale) {
      router.push(pathFor(next));
    }
  };

  return (
    <select
      className={`cx-lang-select ${className}`.trim()}
      value={locale}
      onChange={onChange}
      aria-label="Language"
    >
      {locales.map((code) => (
        <option key={code} value={code}>
          {localeNames[code] || localeLabels[code] || code.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
