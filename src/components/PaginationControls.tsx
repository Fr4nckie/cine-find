import { useMediaQuery } from "@uidotdev/usehooks"
import ReactPaginate from "react-paginate"
import { useLanguage } from "../hooks/useLanguage.ts"

type PaginationControlsProps = {
  page: number
  totalPages: number
  goToPage: (newPage: number) => void
}

const PaginationControls = ({
  page,
  goToPage,
  totalPages,
}: PaginationControlsProps) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)")
  const { lang } = useLanguage()

  const NextButton = () => {
    return (
      <button className="join-item btn btn-sm md:btn-md">
        <span className="hidden md:block">
          {lang === "en-US" ? "Next" : "Suivant"}
        </span>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    )
  }

  const PreviousButton = () => {
    return (
      <button className="join-item btn btn-sm md:btn-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <span className="hidden md:block">
          {lang === "en-US" ? "Previous" : "Précédent"}
        </span>
      </button>
    )
  }

  return (
    <ReactPaginate
      forcePage={page - 1}
      onPageChange={(selectedItem) => goToPage(selectedItem.selected + 1)}
      pageCount={totalPages}
      pageRangeDisplayed={isSmallDevice ? 1 : 5}
      marginPagesDisplayed={isSmallDevice ? 1 : 2}
      containerClassName="join"
      pageLinkClassName="join-item btn btn-sm md:btn-md"
      breakLinkClassName="join-item btn btn-sm md:btn-md btn-disabled"
      activeLinkClassName="btn-active"
      nextLabel={<NextButton />}
      previousLabel={<PreviousButton />}
    />
  )
}

export default PaginationControls
