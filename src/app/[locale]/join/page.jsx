"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { register } from "../../../_services/auth";
import CountrySelect from "../../../components/CountrySelect";

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="cx-auth-wrap">
          <div className="cx-dash-loading"><span className="cx-spinner" style={{ width: 28, height: 28, borderWidth: 3 }} /></div>
        </div>
      }
    >
      <JoinForm />
    </Suspense>
  );
}

function JoinForm() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const refFromUrl = (searchParams.get("ref") || searchParams.get("referral_id") || "").trim();
  const [refLocked, setRefLocked] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    password_confirmation: "",
    referred_by_code: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (refFromUrl) {
      setForm((prev) => ({ ...prev, referred_by_code: refFromUrl }));
      setRefLocked(true);
    }
  }, [refFromUrl]);

  const onChange = (e) => {
    if (e.target.name === "referred_by_code" && refLocked) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.email || !form.phone || !form.country || !form.password) {
      setError(t("validation.required"));
      return;
    }
    if (form.password !== form.password_confirmation) {
      setError(t("validation.passwordMismatch"));
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await register({
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        country: form.country,
        password: form.password,
        password_confirmation: form.password_confirmation,
        referred_by_code: form.referred_by_code || undefined,
      });
      setSuccess(true);
    } catch (err) {
      const errs = err?.response?.data?.errors;
      const message = err?.response?.data?.message;
      if (errs && typeof errs === "object") {
        const first = Object.values(errs)[0];
        setError(Array.isArray(first) ? first[0] : String(first));
      } else {
        setError(message || "Something went wrong, please try again.");
      }
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="cx-auth-wrap">
        <div className="cx-auth-card cx-card--center">
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#10b981" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          </div>
          <h1 className="cx-auth-card__title">{t("join.successTitle")}</h1>
          <p className="cx-auth-card__subtitle">{t("join.successDesc")}</p>
          <Link href={`/${locale}`} className="cx-btn cx-btn--ghost cx-mt-md">
            {t("nav.home")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cx-auth-wrap">
      <div className="cx-auth-card cx-auth-card--wide">
        <h1 className="cx-auth-card__title">{t("join.title")}</h1>
        <p className="cx-auth-card__subtitle">{t("join.subtitle")}</p>

        <div className="cx-alert cx-alert--info">
          <strong style={{ minWidth: "fit-content" }}>{t("join.noteImportant")}:</strong>
          <span>{t("join.noteVerify")}</span>
        </div>
        <div className="cx-alert cx-alert--warn">
          <strong style={{ minWidth: "fit-content" }}>⚠</strong>
          <span>{t("join.noteSecurity")}</span>
        </div>

        {error && <div className="cx-alert cx-alert--err">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="cx-form-grid">
            <div className="cx-field cx-field--full">
              <label className="cx-field__label">{t("join.name")}</label>
              <input className="cx-field__input" name="name" value={form.name} onChange={onChange} />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("join.username")}</label>
              <input className="cx-field__input" name="username" value={form.username} onChange={onChange} autoComplete="username" />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("join.email")}</label>
              <input className="cx-field__input" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("join.phone")}</label>
              <input className="cx-field__input" name="phone" value={form.phone} onChange={onChange} placeholder="+1234567890" />
            </div>
            <div className="cx-field">
              <CountrySelect
                label={t("join.country")}
                value={form.country}
                onChange={(code) => setForm((prev) => ({ ...prev, country: code }))}
                placeholder={t("join.countrySearch")}
                required
              />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("join.password")}</label>
              <input className="cx-field__input" name="password" type="password" value={form.password} onChange={onChange} autoComplete="new-password" />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("join.passwordConfirm")}</label>
              <input className="cx-field__input" name="password_confirmation" type="password" value={form.password_confirmation} onChange={onChange} autoComplete="new-password" />
            </div>
            <div className="cx-field cx-field--full">
              <label className="cx-field__label">{t("join.referralCode")}</label>
              <input
                className="cx-field__input"
                name="referred_by_code"
                value={form.referred_by_code}
                onChange={onChange}
                placeholder="ABCD1234"
                readOnly={refLocked}
                disabled={refLocked}
                style={refLocked ? { opacity: 0.85, cursor: "not-allowed" } : undefined}
              />
            </div>
          </div>

          <div className="cx-form__actions">
            <button type="submit" disabled={submitting} className="cx-btn cx-btn--primary cx-btn--block cx-btn--lg">
              {submitting && <span className="cx-spinner" />} {submitting ? t("join.submitting") : t("join.submit")}
            </button>
          </div>
        </form>

        <div className="cx-form__footer">
          {t("join.haveAccount")} <Link href={`/${locale}/login`}>{t("join.loginHere")}</Link>
        </div>
      </div>
    </div>
  );
}

