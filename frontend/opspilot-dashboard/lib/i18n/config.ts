export type Locale = "en" | "zh"

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "zh"]

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
}
