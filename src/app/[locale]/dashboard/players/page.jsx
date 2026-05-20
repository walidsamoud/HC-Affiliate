"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getPlayers } from "../../../../_services/dashboard";
import { formatEur, formatDate } from "../../../../lib/format";

export default function PlayersPage() {
  const t = useTranslations("dashboard.players");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPlayers({ period: "all", page })
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

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <div className="cx-table-wrap">
        {loading ? (
          <div className="cx-dash-loading"><span className="cx-spinner" /></div>
        ) : result.data.length === 0 ? (
          <p className="cx-text-muted cx-table-empty">{t("empty")}</p>
        ) : (
          <table className="cx-table">
            <thead>
              <tr>
                <th>{t("username")}</th>
                <th>{t("joined")}</th>
                <th>{t("deposits")}</th>
                <th>{t("withdrawals")}</th>
                <th>{t("ggr")}</th>
                <th>{t("commission")}</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.username}</strong><br /><span className="cx-text-muted" style={{ fontSize: 12 }}>{row.currency}</span></td>
                  <td>{formatDate(row.joined_at)}</td>
                  <td>{formatEur(row.deposits_eur)}</td>
                  <td>{formatEur(row.withdrawals_eur)}</td>
                  <td>{row.ggr_player_currency} {row.currency}</td>
                  <td><strong>{formatEur(row.commission_eur)}</strong></td>
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
