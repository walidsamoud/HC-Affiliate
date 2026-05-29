"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";
import PeriodFilter from "../../../components/dashboard/PeriodFilter";
import CopyField from "../../../components/dashboard/CopyField";
import { getStats } from "../../../_services/dashboard";
import { formatEur, formatDate, apiErrorMessage } from "../../../lib/format";
import themeConfig from "../../../theme.config";

export default function DashboardHomePage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [period, setPeriod] = useState("month");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getStats(period, locale)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setStats(null);
          const msg = apiErrorMessage(err);
          setError(msg);
          toast.error(msg);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [period, locale]);

  const parentRate = stats?.commission_percent ?? themeConfig.program.playerCommissionPercent;
  const maxSubAssign = stats?.max_sub_commission_percent ?? parentRate;

  const kpis = stats
    ? [
        { label: t("kpi.signups"), value: stats.signups ?? 0 },
        { label: t("kpi.deposits"), value: formatEur(stats.deposits_eur) },
        { label: t("kpi.withdrawals"), value: formatEur(stats.withdrawals_eur) },
        { label: t("kpi.playersCommission"), value: formatEur(stats.players_commission_eur) },
        { label: t("kpi.subCommission"), value: formatEur(stats.sub_commission_eur) },
        { label: t("kpi.totalCommission"), value: formatEur(stats.total_commission_eur), highlight: true },
        { label: t("kpi.paid"), value: formatEur(stats.paid_eur) },
        { label: t("kpi.pending"), value: formatEur(stats.pending_eur) },
      ]
    : [];

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      {loading ? (
        <div className="cx-dash-loading"><span className="cx-spinner" style={{ width: 28, height: 28, borderWidth: 3 }} /></div>
      ) : error && !stats ? (
        <div className="cx-alert cx-alert--err">{error}</div>
      ) : (
        <>
          <div className="cx-kpi-grid">
            {kpis.map((k) => (
              <div key={k.label} className={`cx-kpi ${k.highlight ? "cx-kpi--highlight" : ""}`}>
                <span className="cx-kpi__label">{k.label}</span>
                <span className="cx-kpi__value">{k.value}</span>
              </div>
            ))}
          </div>

          {stats?.next_payout_date && (
            <div className="cx-alert cx-alert--info cx-mb-md">
              <strong>{t("nextPayout")}:</strong> {formatDate(stats.next_payout_date)}
            </div>
          )}

          <div className="cx-dash-grid-2">
            <section className="cx-card">
              <h2 className="cx-card__title">{t("guide.playersTitle")}</h2>
              <p className="cx-card__desc">{t("guide.playersDesc", { percent: parentRate })}</p>
              <CopyField label={t("referralCode")} value={stats?.referral_code} />
              <CopyField label={t("playerLink")} value={stats?.players_affiliation_url} />
            </section>

            <section className="cx-card">
              <h2 className="cx-card__title">{t("guide.partnersTitle")}</h2>
              <p className="cx-card__desc">
                {t("guide.partnersDesc", { parent: parentRate, max: maxSubAssign })}
              </p>
              <CopyField label={t("referralCode")} value={stats?.referral_code} />
              <CopyField label={t("partnerLink")} value={stats?.partners_affiliation_url} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
