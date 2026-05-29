"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { getSubAffiliators, createSubAffiliator, updateSubAffiliator } from "../../../../_services/dashboard";
import { formatEur, formatDate, apiErrorMessage } from "../../../../lib/format";

export default function PartnersPage() {
  const t = useTranslations("dashboard.partners");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0, last_page: 1, parent_commission_percent: 40 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", email: "", phone: "", commission_percent: "10" });
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editRate, setEditRate] = useState("");
  const [savingId, setSavingId] = useState(null);

  const maxRate = Number(result.parent_commission_percent ?? 40);

  const load = () => {
    setLoading(true);
    getSubAffiliators({ period: "all", page })
      .then((res) => {
        setResult(res);
        if (!showForm) {
          setForm((f) => ({
            ...f,
            commission_percent: String(Math.min(Number(f.commission_percent) || 10, res.parent_commission_percent ?? 40)),
          }));
        }
      })
      .catch((err) => toast.error(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await createSubAffiliator({
        ...form,
        commission_percent: Number(form.commission_percent),
      });
      setCreated(data);
      setShowForm(false);
      setForm({ name: "", username: "", email: "", phone: "", commission_percent: "10" });
      toast.success(t("created"));
      load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setEditRate(String(row.commission_percent ?? 0));
  };

  const saveEdit = async (id) => {
    setSavingId(id);
    try {
      await updateSubAffiliator(id, { commission_percent: Number(editRate) });
      toast.success(t("rateUpdated"));
      setEditingId(null);
      load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle", { max: maxRate })}</p>
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
          <p>{t("subRate")}: <code>{created.commission_percent}%</code> ({t("youKeep")}: <span className="cx-amount cx-amount--earn">{created.parent_override_percent}%</span>)</p>
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
            <div className="cx-field">
              <label className="cx-field__label">{t("subRate")} (0–{maxRate}%)</label>
              <input
                className="cx-field__input"
                type="number"
                min={0}
                max={maxRate}
                step={0.01}
                value={form.commission_percent}
                onChange={(e) => setForm({ ...form, commission_percent: e.target.value })}
                required
              />
              <span style={{ fontSize: 12 }}>
                {t("youKeep")}:{" "}
                <span className="cx-amount cx-amount--earn">
                  {Math.max(0, maxRate - Number(form.commission_percent || 0)).toFixed(2)}%
                </span>
              </span>
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
                <th>{t("subRate")}</th>
                <th>{t("youKeep")}</th>
                <th>{t("status")}</th>
                <th>{t("players")}</th>
                <th>{t("subEarned")}</th>
                <th>{t("commission")}</th>
                <th>{t("joined")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {result.data.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.name}</strong><br /><span className="cx-text-muted" style={{ fontSize: 12 }}>@{row.username}</span></td>
                  <td>
                    {editingId === row.id ? (
                      <input
                        className="cx-field__input"
                        type="number"
                        min={0}
                        max={maxRate}
                        step={0.01}
                        value={editRate}
                        onChange={(e) => setEditRate(e.target.value)}
                        style={{ width: 72 }}
                      />
                    ) : (
                      <>{row.commission_percent}%</>
                    )}
                  </td>
                  <td><span className="cx-amount cx-amount--earn">{row.parent_override_percent ?? 0}%</span></td>
                  <td><span className={`cx-badge cx-badge--${row.status}`}>{row.status}</span></td>
                  <td>{row.players_count}</td>
                  <td>{formatEur(row.sub_commission_eur ?? row.their_revenue_eur)}</td>
                  <td><strong className="cx-amount cx-amount--earn">{formatEur(row.my_commission_eur)}</strong></td>
                  <td>{formatDate(row.created_at)}</td>
                  <td>
                    {editingId === row.id ? (
                      <button
                        type="button"
                        className="cx-btn cx-btn--ghost"
                        disabled={savingId === row.id}
                        onClick={() => saveEdit(row.id)}
                      >
                        {savingId === row.id ? "…" : t("save")}
                      </button>
                    ) : (
                      <button type="button" className="cx-btn cx-btn--ghost" onClick={() => startEdit(row)}>
                        {t("editRate")}
                      </button>
                    )}
                  </td>
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
