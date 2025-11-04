import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import LanguageProvider from "../../context/LanguageProvider.tsx"
import type { ReactNode } from "react"
import { useLanguage } from "../useLanguage.ts"

describe("useLanguage", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  )

  it("should change the language when a new option is selected", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })

    act(() => result.current.setLang("fr-FR"))
    expect(result.current.lang).toBe("fr-FR")

    act(() => result.current.setLang("en-US"))
    expect(result.current.lang).toBe("en-US")
  })

  it("should throw error when used without provider", () => {
    expect(() => {
      renderHook(() => useLanguage())
    }).toThrow("LanguageContext must be use within LanguageProvider")
  })
})
