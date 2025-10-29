import { useEffect, useState, type ReactNode } from "react"
import { LanguageContext } from "../hooks/useLanguage.ts"
import type { GlobalLanguage } from "../types/context.ts"

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<GlobalLanguage>(() => {
    const saved = localStorage.getItem("lang") as GlobalLanguage | null
    return saved ?? "en-US"
  })

  useEffect(() => {
    localStorage.setItem("lang", lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
