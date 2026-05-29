"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IDEAS } from "./ideas-data";

function MetaPill({ icon, label, value }) {
  return (
    <span className="cx-idea__pill" title={label}>
      <span className="cx-idea__pill-icon" aria-hidden>{icon}</span>
      <span className="cx-idea__pill-text">
        <span className="cx-idea__pill-label">{label}</span>
        <strong>{value}</strong>
      </span>
    </span>
  );
}

function IdeaCard({ idea, t }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`cx-idea ${open ? "cx-idea--open" : ""}`}>
      <header className="cx-idea__head">
        <span className="cx-idea__icon" aria-hidden>{idea.icon}</span>
        <div className="cx-idea__head-text">
          <h2 className="cx-idea__title">{idea.title}</h2>
          <p className="cx-idea__tagline">{idea.tagline}</p>
        </div>
      </header>

      <div className="cx-idea__meta">
        <MetaPill icon="🎚" label={t("meta.difficulty")} value={idea.difficulty} />
        <MetaPill icon="💸" label={t("meta.budget")} value={idea.budget} />
        <MetaPill icon="⏱" label={t("meta.timeToEarn")} value={idea.timeToEarn} />
        <MetaPill icon="📈" label={t("meta.potential")} value={idea.potential} />
      </div>

      <p className="cx-idea__summary">{idea.summary}</p>

      <button
        type="button"
        className="cx-idea__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? t("showLess") : t("showMore")}
        <span className={`cx-idea__chevron ${open ? "is-open" : ""}`} aria-hidden>▾</span>
      </button>

      {open && (
        <div className="cx-idea__details">
          <section className="cx-idea__block">
            <h3 className="cx-idea__block-title">{t("sections.howTo")}</h3>
            <ol className="cx-idea__steps">
              {idea.howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="cx-idea__block">
            <h3 className="cx-idea__block-title">{t("sections.examples")}</h3>
            <ul className="cx-idea__examples">
              {idea.examples.map((ex, i) => (
                <li key={i}>
                  <strong>
                    {ex.href ? (
                      <a href={ex.href} target="_blank" rel="noopener noreferrer">{ex.name}</a>
                    ) : (
                      ex.name
                    )}
                  </strong>
                  {ex.detail ? <> — {ex.detail}</> : null}
                </li>
              ))}
            </ul>
          </section>

          <div className="cx-idea__proscons">
            <section className="cx-idea__block cx-idea__block--pros">
              <h3 className="cx-idea__block-title">{t("sections.pros")}</h3>
              <ul className="cx-idea__list cx-idea__list--pros">
                {idea.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </section>
            <section className="cx-idea__block cx-idea__block--cons">
              <h3 className="cx-idea__block-title">{t("sections.cons")}</h3>
              <ul className="cx-idea__list cx-idea__list--cons">
                {idea.cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          </div>

          <section className="cx-idea__block cx-idea__block--guide">
            <h3 className="cx-idea__block-title">{t("sections.guidance")}</h3>
            <p className="cx-idea__guide-text">{idea.guidance}</p>
          </section>
        </div>
      )}
    </article>
  );
}

export default function IdeasPage() {
  const t = useTranslations("dashboard.ideas");

  return (
    <div className="cx-dash-page">
      <div className="cx-dash-page__head">
        <div>
          <h1>{t("title")}</h1>
          <p className="cx-text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <div className="cx-alert cx-alert--info cx-mb-md">{t("intro")}</div>

      <div className="cx-ideas-grid">
        {IDEAS.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} t={t} />
        ))}
      </div>

      <div className="cx-idea-footnote">{t("footnote")}</div>
    </div>
  );
}
