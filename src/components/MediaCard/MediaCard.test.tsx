import { vi, describe, beforeEach, it, expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import type { MediaItem } from "../../types/types.ts"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import MediaCard from "./MediaCard.tsx"

const mockUseTheme = vi.fn()
vi.mock("../../hooks/useTheme.ts", () => ({
  useTheme: () => mockUseTheme(),
}))

vi.mock("../../utils/getMediaContent.ts", () => ({
  getMediaPosterUrl: (item: MediaItem) => `https://img.test${item.poster_path}`,
  getMediaTitle: (item: MediaItem) =>
    "title" in item ? item.title : item.name,
  getMediaStartDate: (item: MediaItem) =>
    "release_date" in item ? item.release_date : item.first_air_date,
}))

const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return { ...actual, useNavigate: () => mockNavigate }
})

describe("<MediaCard> component", () => {
  const mockMovie: MediaItem = {
    adult: false,
    backdrop_path: "/en0NbTEjf3qKokHvwGeaq9DBPIP.jpg",
    id: 1571470,
    title: "The Rats: A Witcher Tale",
    original_title: "The Rats: A Witcher Tale",
    overview:
      "To pull off a daring heist, a gang of six misfit outlaws will have to do something they've never done before: trust each other — and a washed-up Witcher.",
    poster_path: "/5Gr4amaB1xxeYAEMOdrVutaWwgz.jpg",
    media_type: "movie",
    original_language: "en",
    genre_ids: [14, 18, 12],
    popularity: 92.8155,
    release_date: "2025-10-29",
    video: false,
    vote_average: 4.766,
    vote_count: 32,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue({ isDark: true })
  })

  it("should renders correctly with media title and date in dark mode", () => {
    render(
      <MemoryRouter>
        <MediaCard mediaItem={mockMovie} />
      </MemoryRouter>
    )

    const startDate = screen.getByText("2025-10-29")
    expect(startDate).toBeInTheDocument()
    expect(startDate).toHaveClass("text-gray-400")

    expect(screen.getByText("The Rats: A Witcher Tale")).toBeInTheDocument()

    const img = screen.getByRole("img") as HTMLImageElement
    expect(img.src).toContain(
      "https://img.test/5Gr4amaB1xxeYAEMOdrVutaWwgz.jpg"
    )
  })

  it("should renders correctly with media title and date in light mode", () => {
    mockUseTheme.mockReturnValue({ isDark: false })
    render(
      <MemoryRouter>
        <MediaCard mediaItem={mockMovie} />
      </MemoryRouter>
    )

    const startDate = screen.getByText("2025-10-29")
    expect(startDate).toBeInTheDocument()
    expect(startDate).toHaveClass("text-gray-800")

    expect(screen.getByText("The Rats: A Witcher Tale")).toBeInTheDocument()

    const img = screen.getByRole("img") as HTMLImageElement
    expect(img.src).toContain(
      "https://img.test/5Gr4amaB1xxeYAEMOdrVutaWwgz.jpg"
    )
  })

  it("should navigates to the correct URL when clicking title", async () => {
    render(
      <MemoryRouter>
        <MediaCard mediaItem={mockMovie} />
      </MemoryRouter>
    )

    await userEvent.click(screen.getByText("The Rats: A Witcher Tale"))
    expect(mockNavigate).toHaveBeenCalledWith("/movie/1571470")
  })

  it("should navigates to the correct URL when clicking image", async () => {
    render(
      <MemoryRouter>
        <MediaCard mediaItem={mockMovie} />
      </MemoryRouter>
    )

    const img = screen.getByRole("img")
    await userEvent.click(img)
    expect(mockNavigate).toHaveBeenCalledWith("/movie/1571470")
  })
})
