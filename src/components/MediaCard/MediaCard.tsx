import { useNavigate } from "react-router-dom"
import type { MediaItem } from "../../types/types.ts"
import { useTheme } from "../../hooks/useTheme.ts"
import {
  getMediaPosterUrl,
  getMediaStartDate,
  getMediaTitle,
} from "../../utils/getMediaContent.ts"

type MediaCardProps = {
  mediaItem: MediaItem
}

const MediaCard = ({ mediaItem }: MediaCardProps) => {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const title = getMediaTitle(mediaItem)
  const image = getMediaPosterUrl(mediaItem)

  const handleClick = () => navigate(`/${mediaItem.media_type}/${mediaItem.id}`)

  return (
    <div className="relative group w-full p-2 md:p-4 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <div
        className="absolute inset-0 z-0 blur-2xl scale-125 opacity-80 transition-all duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)),
            url(${image})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleClick}
      />

      <figure className="relative z-10 aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
          onClick={handleClick}
        />
      </figure>

      {/* === Titre + Date === */}
      <div className="relative z-10 text-center py-3">
        <h2
          className="text-base md:text-lg font-semibold text-white line-clamp-1 group-hover:underline"
          onClick={handleClick}
        >
          {title}
        </h2>
        <p
          className={`mt-1 text-sm md:text-base ${
            isDark ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {getMediaStartDate(mediaItem)}
        </p>
      </div>
    </div>
  )
}

export default MediaCard
