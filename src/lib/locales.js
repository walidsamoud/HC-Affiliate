/** Supported locales for the affiliate portal (URL segment = code). */
export const locales = ["en", "tr", "fr", "hi", "ru"];

export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || "en";

/** Short labels for compact UI */
export const localeLabels = {
  en: "EN",
  tr: "TR",
  fr: "FR",
  hi: "HI",
  ru: "RU",
};

/** Full names for language select */
export const localeNames = {
  en: "English",
  tr: "Türkçe",
  fr: "Français",
  hi: "हिन्दी",
  ru: "Русский",
};
