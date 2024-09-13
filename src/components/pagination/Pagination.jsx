import useGlobalState from "../../hooks/useGlobalState";
import { PaginationService } from "../../services/PaginationService";
import styles from "./Pagination.module.scss";

export default function Pagination() {
  const { page, setPage, totalPageNumber } = useGlobalState();
  const pageNumbers = PaginationService.getPageNumbers(totalPageNumber);
  // TODO: fix rerendering all pages
  // console.log("page >>>>", page);
  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.pages}>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            page === pageNumber
              ? `${styles.page} ${styles.currentPage}`
              : styles.page
          }
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
