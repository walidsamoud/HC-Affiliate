/**
 * Brand theme — mirrors front/src/theme.config.js so the look stays consistent.
 */
export const themeConfig = {
  brandName: "CrownX Partners",
  parentBrand: "CrownXBet",
  programName: "CrownX Partners",

  logo: {
    src: "/img/logo/crownX.png",
    width: 200,
    height: 60,
    alt: "CrownX Partners",
  },

  favicon: "/img/logo/crownXfavicon.png",

  seo: {
    ogImage: "/img/main.png",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    themeColor: "#060a12",
    twitterSite: "@CrownXBet",
  },

  colors: {
    primary: "#2563eb",
    secondary: "#8b5cf6",
    accent: "#38bdf8",
    bodyBg: "#060a12",
    headerBg: "#0a0f1c",
    textMuted: "#94a3b8",
    textBody: "#cbd5e1",
    textHeading: "#f0f9ff",
    glassBorder: "rgba(56, 189, 248, 0.22)",
    buttonGradientFrom: "#2563eb",
    buttonGradientMid: "#6366f1",
    buttonGradientTo: "#06b6d4",
  },

  pageBackground: `radial-gradient(ellipse 1400px 900px at 15% -10%, rgba(56, 189, 248, 0.18) 0%, transparent 55%),
    radial-gradient(ellipse 1000px 800px at 95% 5%, rgba(139, 92, 246, 0.16) 0%, transparent 50%),
    radial-gradient(ellipse 800px 600px at 50% 100%, rgba(37, 99, 235, 0.2) 0%, transparent 55%),
    linear-gradient(180deg, #030712 0%, #0b1120 40%, #0f172a 100%)`,

  contact: {
    supportEmail: "partners@crownxbet.com",
    telegram: "https://t.me/CrownXbet_info",
  },

  program: {
    playerCommissionPercent: 10,
    subAffiliatorCommissionPercent: 10,
    baseCurrency: "EUR",
    payoutDayLabel: "End of each month",
  },
}

export default themeConfig
