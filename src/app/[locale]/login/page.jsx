"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { login } from "../../../_services/auth";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError(t("login.errorInvalid"));
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const data = await login({ username: form.username, password: form.password });
      const must = !!data?.affiliator?.must_change_password;
      const status = data?.affiliator?.status;
      if (status && status !== "active") {
        const msg = status === "pending" ? t("login.errorPending") : t("login.errorDisabled");
        setError(msg);
        setSubmitting(false);
        return;
      }
      toast.success("Welcome back");
      router.push(must ? `/${locale}/dashboard/change-password` : `/${locale}/dashboard`);
    } catch (err) {
      const raw = err?.response?.data?.message;
      const apiStatus = err?.response?.data?.status;
      let msg = raw;
      if (raw && typeof raw === "object") {
        const first = Object.values(raw)[0];
        msg = Array.isArray(first) ? first[0] : String(first);
      }
      if (apiStatus === "pending") setError(t("login.errorPending"));
      else if (apiStatus === "rejected" || apiStatus === "disabled") setError(t("login.errorDisabled"));
      else if (err?.response?.status === 403 && typeof raw === "string") setError(raw);
      else setError(msg || t("login.errorInvalid"));
      setSubmitting(false);
    }
  };

  return (
    <div className="cx-auth-wrap">
      <div className="cx-auth-card">
        <h1 className="cx-auth-card__title">{t("login.title")}</h1>
        <p className="cx-auth-card__subtitle">{t("login.subtitle")}</p>

        {error && <div className="cx-alert cx-alert--err">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="cx-field">
            <label className="cx-field__label">{t("login.username")}</label>
            <input
              className="cx-field__input"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={onChange}
              placeholder="username or email@domain.com"
            />
          </div>
          <div className="cx-field">
            <label className="cx-field__label">{t("login.password")}</label>
            <input
              className="cx-field__input"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
            />
          </div>

          <div className="cx-form__actions">
            <button type="submit" disabled={submitting} className="cx-btn cx-btn--primary cx-btn--block cx-btn--lg">
              {submitting && <span className="cx-spinner" />} {submitting ? t("login.submitting") : t("login.submit")}
            </button>
          </div>
        </form>

        <div className="cx-form__footer">
          {t("login.noAccount")} <Link href={`/${locale}/join`}>{t("login.joinHere")}</Link>
        </div>
      </div>
    </div>
  );
}
