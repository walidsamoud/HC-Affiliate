"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const CATEGORY_MAP = {
  general: [1, 2, 13, 14],
  earnings: [3, 4, 15],
  payouts: [5, 6, 7, 8],
  marketing: [9, 10, 12, 16],
  account: [11],
};

export default function FaqPage() {
  const t = useTranslations();
  const [active, setActive] = useState("general");
  const [openIds, setOpenIds] = useState(new Set([1]));

  const categories = useMemo(() => Object.keys(CATEGORY_MAP), []);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="cx-faq-page">
      <div className="cx-container">
        <h1 className="cx-section__title">{t("faq.title")}</h1>
        <p className="cx-section__intro">{t("faq.subtitle")}</p>

        <div className="cx-faq-tabs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`cx-faq-tab ${c === active ? "active" : ""}`}
            >
              {t(`faq.categories.${c}`)}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {CATEGORY_MAP[active].map((id) => {
            const isOpen = openIds.has(id);
            return (
              <div key={id} className={`cx-faq-item ${isOpen ? "cx-faq-item--open" : ""}`}>
                <div className="cx-faq-item__q" onClick={() => toggle(id)} role="button" tabIndex={0}>
                  <span>{t(`faq.q${id}`)}</span>
                  <span className="chev">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {isOpen && <div className="cx-faq-item__a">{t(`faq.a${id}`)}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
