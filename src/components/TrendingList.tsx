import { useTrendingMedia } from "../hooks/useTrendingMedia.ts"
import ErrorMessage from "./ErrorMessage.tsx"
import Loading from "./Loading.tsx"
import { useTrendingPagination } from "../hooks/useTrendingPagination.ts"
import PaginationControls from "./PaginationControls.tsx"
import MediaCard from "./MediaCard/MediaCard.tsx"

const TrendingList = () => {
  const { page, goToPage } = useTrendingPagination()
  const { data, isLoading, isError, error } = useTrendingMedia(page)

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loading />
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

  return (
    <div className="flex-1 container mx-auto px-4 my-4">
      <div className="grid grid-cols-2 gap-6 justify-center md:grid-cols-3 lg:grid-cols-5">
        {data?.results.map((item) => (
          <MediaCard key={item.id} mediaItem={item} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center">
        {data && (
          <PaginationControls
            page={page}
            totalPages={data?.total_pages}
            goToPage={goToPage}
          />
        )}
      </div>
    </div>
  )
}

export default TrendingList
