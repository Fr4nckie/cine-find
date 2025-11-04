import { createContext, useContext } from "react"
import type { LanguageContextType } from "../types/context.ts"

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("LanguageContext must be use within LanguageProvider")
  }
  return context
}
