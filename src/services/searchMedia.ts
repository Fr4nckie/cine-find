import type { GlobalLanguage } from "../types/context.ts"
import type { MovieResponseType, SearchCategory } from "../types/types.ts"
import { api } from "./api.ts"

export const searchMedia = async (
  searchTerm: string,
  language: GlobalLanguage = "en-US",
  searchCategory: SearchCategory = "multi"
): Promise<MovieResponseType> => {
  const response = await api.get(`/search/${searchCategory}`, {
    params: { query: searchTerm, include_adult: false, language },
  })
  return response.data
}
