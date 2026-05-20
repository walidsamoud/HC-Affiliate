"use client";

import { useTranslations } from "next-intl";

const PERIODS = ["all", "year", "month", "week", "day"];

export default function PeriodFilter({ value, onChange }) {
  const t = useTranslations("dashboard.period");

  return (
    <div className="cx-period">
      {PERIODS.map((p) => (
        <button
          key={p}
          type="button"
          className={`cx-period__btn ${value === p ? "active" : ""}`}
          onClick={() => onChange(p)}
        >
          {t(p)}
        </button>
      ))}
    </div>
  );
}
