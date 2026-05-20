"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CopyField({ label, value }) {
  const t = useTranslations("dashboard");
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="cx-copy">
      {label && <span className="cx-copy__label">{label}</span>}
      <div className="cx-copy__row">
        <input className="cx-copy__input" readOnly value={value || ""} />
        <button type="button" className="cx-btn cx-btn--ghost" onClick={onCopy}>
          {copied ? t("copied") : t("copy")}
        </button>
      </div>
    </div>
  );
}
