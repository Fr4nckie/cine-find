import { Link } from "react-router-dom"
import ToggleThemeButton from "../ToggleThemeButton.tsx"
import SelectLanguage from "../SelectLanguage.tsx"

const Header = () => {
  return (
    <header className="py-4 shadow mb-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-lg md:text-2xl font-bold">CineFind</h1>
        </Link>
        <div className="flex items-center gap-4">
          <SelectLanguage />
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  )
}

export default Header
