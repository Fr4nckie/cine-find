import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useTheme } from "../useTheme.ts"
import ThemeProvider from "../../context/ThemeProvider.tsx"
import type { ReactNode } from "react"

describe("useTheme", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  )

  it("should toggle theme correctly", () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe("light")
    expect(result.current.isDark).toBe(false)

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe("dark")
    expect(result.current.isDark).toBe(true)
  })

  it("should throw error when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow("ThemeContext must be used within ThemeProvider")
  })
})
