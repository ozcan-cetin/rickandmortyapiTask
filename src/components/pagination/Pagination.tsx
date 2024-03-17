import { PaginationProps } from "../../types/types";
import style from "./Pagination.module.scss";
import { FcNext, FcPrevious } from "react-icons/fc";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setPageNumber,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    onPageChange(pageNumber);
  };

  return (
    <ul className={`${style.pagination}`}>
      <FcPrevious
        className={`${style.icon}`}
        onClick={() =>
          setPageNumber(currentPage > 1 ? currentPage - 1 : totalPages)
        }
      />
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`${
            number === currentPage ? `${style.active}` : undefined
          }`}
        >
          <a href="#" onClick={(e) => handlePageClick(number, e)}>
            {number}
          </a>
        </li>
      ))}
      <FcNext
        className={`${style.icon}`}
        onClick={() =>
          setPageNumber(currentPage < totalPages ? currentPage + 1 : 1)
        }
      />
    </ul>
  );
};
