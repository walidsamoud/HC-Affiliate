"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import themeConfig from "../../../theme.config";
import { sendContact } from "../../../_services/auth";

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError(t("validation.required"));
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await sendContact(form);
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <h1 className="cx-auth-card__title">{t("contact.successTitle")}</h1>
          <p className="cx-auth-card__subtitle">{t("contact.successDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cx-auth-wrap">
      <div className="cx-auth-card cx-auth-card--wide">
        <h1 className="cx-auth-card__title">{t("contact.title")}</h1>
        <p className="cx-auth-card__subtitle">{t("contact.subtitle")}</p>

        {error && <div className="cx-alert cx-alert--err">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="cx-form-grid">
            <div className="cx-field">
              <label className="cx-field__label">{t("contact.name")}</label>
              <input className="cx-field__input" name="name" value={form.name} onChange={onChange} />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("contact.email")}</label>
              <input className="cx-field__input" name="email" type="email" value={form.email} onChange={onChange} />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("contact.phone")}</label>
              <input className="cx-field__input" name="phone" value={form.phone} onChange={onChange} />
            </div>
            <div className="cx-field">
              <label className="cx-field__label">{t("contact.subject")}</label>
              <input className="cx-field__input" name="subject" value={form.subject} onChange={onChange} />
            </div>
            <div className="cx-field cx-field--full">
              <label className="cx-field__label">{t("contact.message")}</label>
              <textarea className="cx-field__input" name="message" value={form.message} onChange={onChange} />
            </div>
          </div>

          <div className="cx-form__actions">
            <button type="submit" disabled={submitting} className="cx-btn cx-btn--primary cx-btn--block cx-btn--lg">
              {submitting && <span className="cx-spinner" />} {submitting ? t("contact.submitting") : t("contact.submit")}
            </button>
          </div>
        </form>

        <div className="cx-form__footer" style={{ marginTop: 26 }}>
          {t("contact.telegramCta")} —{" "}
          <a href={themeConfig.contact.telegram} target="_blank" rel="noopener noreferrer">
            t.me/CrownXbet_info ↗
          </a>
        </div>
      </div>
    </div>
  );
}
