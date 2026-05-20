"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getWithdrawals } from "../../../../_services/dashboard";
import { formatEur, formatDate } from "../../../../lib/format";

export default function WithdrawalsPage() {
  const t = useTranslations("dashboard.withdrawals");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], summary: {}, last_page: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getWithdrawals({ page })
      .then((data) => {
        if (!cancelled) setResult(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  const s = result.summary || {};

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <div className="cx-kpi-grid cx-kpi-grid--3">
        <div className="cx-kpi"><span className="cx-kpi__label">{t("totalPaid")}</span><span className="cx-kpi__value">{formatEur(s.total_paid_eur)}</span></div>
        <div className="cx-kpi"><span className="cx-kpi__label">{t("totalPending")}</span><span className="cx-kpi__value">{formatEur(s.total_pending_eur)}</span></div>
        <div className="cx-kpi cx-kpi--highlight"><span className="cx-kpi__label">{t("nextPayout")}</span><span className="cx-kpi__value" style={{ fontSize: 18 }}>{formatDate(s.next_payout_date)}</span></div>
      </div>

      <div className="cx-alert cx-alert--info cx-mb-md">{t("paymentNote")}</div>

      <div className="cx-table-wrap">
        {loading ? (
          <div className="cx-dash-loading"><span className="cx-spinner" /></div>
        ) : result.data.length === 0 ? (
          <p className="cx-text-muted cx-table-empty">{t("empty")}</p>
        ) : (
          <table className="cx-table">
            <thead>
              <tr>
                <th>{t("date")}</th>
                <th>{t("period")}</th>
                <th>{t("amount")}</th>
                <th>{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.created_at)}</td>
                  <td>{row.period_month || "—"}</td>
                  <td><strong>{formatEur(row.amount)}</strong></td>
                  <td><span className={`cx-badge cx-badge--${row.status}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {result.last_page > 1 && (
        <div className="cx-pagination">
          <button type="button" className="cx-btn cx-btn--ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>←</button>
          <span>{page} / {result.last_page}</span>
          <button type="button" className="cx-btn cx-btn--ghost" disabled={page >= result.last_page} onClick={() => setPage((p) => p + 1)}>→</button>
        </div>
      )}
    </div>
  );
}
