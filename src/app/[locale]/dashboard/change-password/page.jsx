"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { changePassword } from "../../../../_services/auth";
import { apiErrorMessage } from "../../../../lib/format";

export default function ChangePasswordPage() {
  const t = useTranslations("dashboard.changePassword");
  const locale = useLocale();
  const router = useRouter();
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.new_password_confirmation) {
      setError(t("mismatch"));
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await changePassword(form);
      toast.success(t("success"));
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(apiErrorMessage(err, t("error")));
      setSubmitting(false);
    }
  };

  return (
    <div className="cx-dash-page">
      <h1>{t("title")}</h1>
      <p className="cx-text-muted cx-mb-md">{t("subtitle")}</p>

      <form className="cx-card" style={{ maxWidth: 480 }} onSubmit={onSubmit}>
        {error && <div className="cx-alert cx-alert--err">{error}</div>}
        <div className="cx-field">
          <label className="cx-field__label">{t("current")}</label>
          <input className="cx-field__input" type="password" value={form.current_password} onChange={(e) => setForm({ ...form, current_password: e.target.value })} required />
        </div>
        <div className="cx-field">
          <label className="cx-field__label">{t("new")}</label>
          <input className="cx-field__input" type="password" value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} required minLength={8} />
        </div>
        <div className="cx-field">
          <label className="cx-field__label">{t("confirm")}</label>
          <input className="cx-field__input" type="password" value={form.new_password_confirmation} onChange={(e) => setForm({ ...form, new_password_confirmation: e.target.value })} required />
        </div>
        <button type="submit" className="cx-btn cx-btn--primary cx-btn--block" disabled={submitting}>
          {submitting ? "…" : t("submit")}
        </button>
      </form>
    </div>
  );
}
