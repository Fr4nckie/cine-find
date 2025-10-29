import { useLanguage } from "../hooks/useLanguage.ts"
import { useSearchForm } from "../hooks/useSearchForm.ts"

const Searchbar = () => {
  const { query, handleQueryChange, handleSearchSubmit } = useSearchForm()
  const { lang } = useLanguage()

  const placeholder =
    lang === "en-US" ? "Search a movie..." : "Rechercher un film..."

  return (
    <form className="container mx-auto px-4" onSubmit={handleSearchSubmit}>
      <label className="input w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder={placeholder}
          value={query}
          onChange={handleQueryChange}
        />
      </label>
    </form>
  )
}

export default Searchbar
