export type GlobalLanguage = "en-US" | "fr-FR"

export type LanguageContextType = {
  lang: GlobalLanguage
  setLang: (lang: GlobalLanguage) => void
}
