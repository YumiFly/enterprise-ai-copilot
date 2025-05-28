"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { defaultLocale, type Locale } from "./config"
import { getDictionary } from "./dictionaries"

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  dictionary: Dictionary
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
  initialDictionary,
}: {
  children: ReactNode
  initialLocale?: Locale
  initialDictionary: Dictionary
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary)

  useEffect(() => {
    if (locale !== initialLocale) {
      // Load the dictionary for the new locale
      getDictionary(locale).then(setDictionary)

      // Store the locale preference
      localStorage.setItem("locale", locale)
    }
  }, [locale, initialLocale])

  // Initialize from localStorage if available
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && savedLocale !== locale && (savedLocale === "en" || savedLocale === "zh")) {
      setLocale(savedLocale)
    }
  }, []) // Remove locale from dependencies

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = key.split(".").reduce((obj, k) => obj?.[k] as any, dictionary as any) as string | undefined

    if (!text) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text!.replace(new RegExp(`{${key}}`, "g"), String(value))
      })
    }

    return text
  }

  return <I18nContext.Provider value={{ locale, setLocale, t, dictionary }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
