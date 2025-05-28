"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
import { locales, localeNames } from "@/lib/i18n/config"

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === "en" || newLocale === "zh") {
      setLocale(newLocale)
      // Force refresh to ensure all components update
      window.location.reload()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("common.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={locale === loc ? "bg-accent text-accent-foreground" : ""}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
