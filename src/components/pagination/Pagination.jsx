import useGlobalState from "../../hooks/useGlobalState";
import { PaginationService } from "../../services/PaginationService";
import { API_URLS } from "../../config/config";
import styles from "./Pagination.module.scss";
import { useEffect, useState } from "react";

export default function Pagination() {
  const { limit, page, setPage } = useGlobalState();
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const getNumbers = async () => {
      const total = await PaginationService.getPageTotalNumber(
        API_URLS.items,
        limit
      );
      const numbers = PaginationService.getPageNumbers(totalPageNumber);
      setTotalPageNumber(total);
      setPageNumbers(numbers);
    };

    getNumbers();
  }, []);

  // TODO: fix rerendering all pages
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
