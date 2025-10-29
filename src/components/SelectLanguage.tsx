import { useLanguage } from "../hooks/useLanguage.ts"
import type { GlobalLanguage } from "../types/context.ts"

const SelectLanguage = () => {
  const { lang, setLang } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as GlobalLanguage)
  }

  return (
    <select
      defaultValue={lang}
      className="select select-info"
      onChange={handleChange}
    >
      <option disabled={true}>
        {lang === "en-US" ? "Select a Language" : "Choisir une langue"}
      </option>
      <option value="en-US">{lang === "en-US" ? "English" : "Anglais"}</option>
      <option value="fr-FR">{lang === "en-US" ? "French" : "Français"}</option>
    </select>
  )
}

export default SelectLanguage
