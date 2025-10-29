import type { GlobalLanguage } from "../types/context.ts"
import type { MediaType, MovieDetailType } from "../types/types.ts"
import { api } from "./api.ts"

export const getMediaDetail = async (
  mediaType: MediaType,
  mediaItemId: string,
  language: GlobalLanguage = "en-US"
): Promise<MovieDetailType> => {
  const response = await api.get<MovieDetailType>(
    `/${mediaType}/${mediaItemId}`,
    { params: { language } }
  )
  return response.data
}
