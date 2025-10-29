import { useQuery } from "@tanstack/react-query"
import { getMediaDetail } from "../services/getMediaDetail.ts"
import type { MediaType } from "../types/types.ts"
import { useLanguage } from "./useLanguage.ts"

export const useMediaDetail = (mediaType: MediaType, mediaItemId: string) => {
  const { lang } = useLanguage()
  return useQuery({
    queryKey: ["detail", mediaItemId, mediaType, lang],
    queryFn: () => getMediaDetail(mediaType, mediaItemId, lang),
    enabled: !!mediaType && !!mediaItemId,
  })
}
