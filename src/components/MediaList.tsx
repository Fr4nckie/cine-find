import { useSearchParams } from "react-router-dom"
import { useSearchMedia } from "../hooks/useSearchMedia.ts"
import type { Movie, TVShow } from "../types/types.ts"
import ErrorMessage from "./ErrorMessage.tsx"
import MediaCard from "./MediaCard/MediaCard.tsx"

const MediaList = () => {
  const [params] = useSearchParams()
  const query = params.get("query") ?? ""
  const { data, isLoading, isError, error } = useSearchMedia(query)

  let results: Movie[] | TVShow[] = []

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={error.message} />
      </div>
    )
  }

  if (data) {
    results = data?.results.filter(
      (item) => item.media_type === "tv" || item.media_type === "movie"
    )
  }

  if (results?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-center text-gray-400">No results found.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 container mx-auto px-4 my-4 grid grid-cols-2 gap-6 justify-center md:grid-cols-3 lg:grid-cols-5">
      {results.map((item) => (
        <MediaCard key={item.id} mediaItem={item} />
      ))}
    </div>
  )
}

export default MediaList
