import { useQuery } from "@tanstack/react-query"
import { getTrendingMedia } from "../services/getTrendingMedia.ts"
import { useLanguage } from "./useLanguage.ts"

export const useTrendingMedia = (page: number = 1) => {
  const { lang } = useLanguage()

  return useQuery({
    queryKey: ["trending", page, lang],
    queryFn: () => getTrendingMedia(page, lang),
    enabled: !!page,
  })
}
