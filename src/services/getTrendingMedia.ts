import type { GlobalLanguage } from "../types/context.ts"
import type {
  MediaListResponse,
  MediaTypeParams,
  TimeWindow,
} from "../types/types.ts"
import { api } from "./api.ts"

export const getTrendingMedia = async (
  page: number,
  language: GlobalLanguage = "en-US",
  mediaType: MediaTypeParams = "all",
  timeWindow: TimeWindow = "week"
): Promise<MediaListResponse> => {
  const response = await api.get(`/trending/${mediaType}/${timeWindow}`, {
    params: { page, language },
  })
  return response.data
}
