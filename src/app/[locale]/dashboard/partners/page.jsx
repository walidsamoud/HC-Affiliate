"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { getSubAffiliators, createSubAffiliator } from "../../../../_services/dashboard";
import { formatEur, formatDate, apiErrorMessage } from "../../../../lib/format";

export default function PartnersPage() {
  const t = useTranslations("dashboard.partners");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(null);

  const load = () => {
    setLoading(true);
    getSubAffiliators({ period: "all", page })
      .then(setResult)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await createSubAffiliator(form);
      setCreated(data);
      setShowForm(false);
      setForm({ name: "", username: "", email: "", phone: "" });
      toast.success(t("created"));
      load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
        <button type="button" className="cx-btn cx-btn--primary" onClick={() => setShowForm((v) => !v)}>
          {t("create")}
        </button>
      </div>

      {created && (
        <div className="cx-alert cx-alert--ok cx-mb-md">
          <strong>{t("credentials")}</strong>
          <p>{t("username")}: <code>{created.username}</code></p>
          <p>{t("tempPassword")}: <code>{created.temporary_password}</code></p>
          <p>{t("referral")}: <code>{created.referral_code}</code></p>
        </div>
      )}

      {showForm && (
        <form className="cx-card cx-mb-md" onSubmit={onSubmit}>
          <h2 className="cx-card__title">{t("createTitle")}</h2>
          <div className="cx-form-grid">
            <div className="cx-field">
              <label className="cx-field__label">{t("name")}</label>
              <input className="cx-field__input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("username")}</label>
              <input className="cx-field__input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("email")}</label>
              <input className="cx-field__input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("phone")}</label>
              <input className="cx-field__input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="cx-btn cx-btn--primary" disabled={submitting}>
            {submitting ? "…" : t("submit")}
          </button>
        </form>
      )}

      <div className="cx-table-wrap">
        {loading ? (
          <div className="cx-dash-loading"><span className="cx-spinner" /></div>
        ) : result.data.length === 0 ? (
          <p className="cx-text-muted cx-table-empty">{t("empty")}</p>
        ) : (
          <table className="cx-table">
            <thead>
              <tr>
                <th>{t("name")}</th>
                <th>{t("status")}</th>
                <th>{t("players")}</th>
                <th>{t("revenue")}</th>
                <th>{t("commission")}</th>
                <th>{t("joined")}</th>
              </tr>
            </thead>
            <tbody>
              {result.data.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.name}</strong><br /><span className="cx-text-muted" style={{ fontSize: 12 }}>@{row.username}</span></td>
                  <td><span className={`cx-badge cx-badge--${row.status}`}>{row.status}</span></td>
                  <td>{row.players_count}</td>
                  <td>{formatEur(row.their_revenue_eur)}</td>
                  <td><strong>{formatEur(row.my_commission_eur)}</strong></td>
                  <td>{formatDate(row.created_at)}</td>
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
