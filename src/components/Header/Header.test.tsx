import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import ThemeProvider from "../../context/ThemeProvider.tsx"
import LanguageProvider from "../../context/LanguageProvider.tsx"
import Header from "./Header.tsx"
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import type { ReactNode } from "react"

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, "localStorage", { value: localStorageMock })

Object.defineProperty(document.documentElement, "setAttribute", {
  value: vi.fn(),
})

const TrendingListMock = () => <div>Trending Page</div>

afterEach(() => {
  vi.clearAllMocks()
})

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe("<Header>", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "theme") return "dark"
      if (key === "lang") return "en-US"

      return null
    })
  })

  it("should navigate to trending?page=1 when clicking on CineFind logo", async () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <Routes>
              <Route path="/" element={<TrendingListMock />} />
              <Route path="/trending" element={<TrendingListMock />} />
              <Route path="/search" element={<div>Search Page</div>} />
            </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </MemoryRouter>
    )

    expect(screen.getByText("Search Page")).toBeInTheDocument()

    const logoLink = screen.getByRole("link", { name: /cinefind/i })
    await userEvent.click(logoLink)

    await waitFor(() => {
      expect(screen.getByText("Trending Page")).toBeInTheDocument()
    })
  })

  it("should change language when select value changes", async () => {
    render(<Header />, { wrapper: AllProviders })

    const languageSelect = screen.getByRole("combobox")
    await userEvent.selectOptions(languageSelect, "fr-FR")
    await waitFor(() =>
      expect(localStorageMock.setItem).toHaveBeenCalledWith("lang", "fr-FR")
    )

    expect(languageSelect).toHaveValue("fr-FR")
  })

  it("should display sun icon when dark mode and moon icon when light mode", async () => {
    render(<Header />, { wrapper: AllProviders })

    const button = screen.getByRole("button")

    expect(button.innerHTML).toContain("M12 3v2.25m6.364.386")

    await userEvent.click(button)

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light")
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        "data-theme",
        "light"
      )
      expect(button.innerHTML).toContain("M21.752 15.002A9.72")
    })
  })
})
