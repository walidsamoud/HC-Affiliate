import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LandingPage({ params }) {
  const { locale } = params;
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="cx-hero">
        <div className="cx-container">
          <div className="cx-hero__inner">
            <span className="cx-hero__eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "currentColor", display: "inline-block" }} />
              CrownX Partners — Official Affiliate Program
            </span>
            <h1 className="cx-hero__title">{t("tagline")}</h1>
            <p className="cx-hero__subtitle">{t("subTagline")}</p>
            <p className="cx-text-muted" style={{ maxWidth: 720, margin: "0 auto 32px", fontSize: 15 }}>
              {t("landing.intro")}
            </p>
            <div className="cx-hero__ctas">
              <Link href={`/${locale}/join`} className="cx-btn cx-btn--primary cx-btn--lg">
                {t("landing.ctaJoin")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href={`/${locale}/login`} className="cx-btn cx-btn--ghost cx-btn--lg">
                {t("landing.ctaLogin")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="cx-section">
        <div className="cx-container">
          <h2 className="cx-section__title">{t("landing.howItWorksTitle")}</h2>
          <p className="cx-section__intro">3 simple steps. No technical setup. No upfront cost.</p>

          <div className="cx-grid-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="cx-step">
                <span className="cx-step__number">{n}</span>
                <h3 className="cx-step__title">{t(`landing.howStep${n}Title`)}</h3>
                <p className="cx-step__desc">{t(`landing.howStep${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="cx-section--tight">
        <div className="cx-container">
          <h2 className="cx-section__title">{t("landing.statsTitle")}</h2>
          <p className="cx-section__intro">Transparent, lifetime, with no caps.</p>
          <div className="cx-grid-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="cx-stat">
                <div className="cx-stat__value">{t(`landing.stat${n}`)}</div>
                <div className="cx-stat__label">{t(`landing.stat${n}Label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="cx-section">
        <div className="cx-container">
          <h2 className="cx-section__title">{t("landing.benefitsTitle")}</h2>
          <p className="cx-section__intro">Built for serious partners who want a real income, not a side hustle.</p>

          <div className="cx-grid-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="cx-benefit">
                <div className="cx-benefit__icon">
                  <BenefitIcon index={n} />
                </div>
                <h3 className="cx-benefit__title">{t(`landing.benefit${n}Title`)}</h3>
                <p className="cx-benefit__desc">{t(`landing.benefit${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cx-section">
        <div className="cx-container">
          <div className="cx-cta-banner">
            <h2>{t("landing.ctaFinalTitle")}</h2>
            <p>{t("landing.ctaFinalDesc")}</p>
            <div className="cx-hero__ctas">
              <Link href={`/${locale}/join`} className="cx-btn cx-btn--primary cx-btn--lg">
                {t("landing.ctaJoin")}
              </Link>
              <Link href={`/${locale}/contact`} className="cx-btn cx-btn--ghost cx-btn--lg">
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BenefitIcon({ index }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (index) {
    case 1:
      return <svg {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case 2:
      return <svg {...props}><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path d="M12 7v5l3 2" /></svg>;
    case 3:
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>;
    case 4:
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case 5:
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72a2 2 0 0 1 1.72 2z" /></svg>;
    case 6:
    default:
      return <svg {...props}><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></svg>;
  }
}
