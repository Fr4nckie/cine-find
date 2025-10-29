import { useQuery } from "@tanstack/react-query"
import { searchMedia } from "../services/searchMedia.ts"
import { useLanguage } from "./useLanguage.ts"

export const useSearchMedia = (query: string) => {
  const { lang } = useLanguage()

  return useQuery({
    queryKey: ["search", query, lang],
    queryFn: () => searchMedia(query, lang),
    enabled: !!query,
  })
}
