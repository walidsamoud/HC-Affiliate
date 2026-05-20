"use client";

import { useTranslations } from "next-intl";

const IDEA_KEYS = ["tiktok", "stream", "telegram", "casino", "unique"];

export default function IdeasPage() {
  const t = useTranslations("dashboard.ideas");

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <div className="cx-ideas-grid">
        {IDEA_KEYS.map((key) => (
          <article key={key} className="cx-card">
            <h2 className="cx-card__title">{t(`${key}.title`)}</h2>
            <p className="cx-card__desc" style={{ whiteSpace: "pre-line" }}>{t(`${key}.body`)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
