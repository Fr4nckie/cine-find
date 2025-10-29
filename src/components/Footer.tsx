import { useLanguage } from "../hooks/useLanguage.ts"

const Footer = () => {
  const { lang } = useLanguage()

  return (
    <footer className="shadow-xl text-center mt-auto bg-base-200 opacity-60">
      <div className="container mx-auto px-4 py-6">
        {lang === "en-US" ? (
          <p>
            Powered by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB
            </a>
          </p>
        ) : (
          <p>
            Propulsé par{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB
            </a>
          </p>
        )}
      </div>
    </footer>
  )
}

export default Footer
