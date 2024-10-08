import { useEffect, useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { FetchService } from "../../services/FetchService";
import { PaginationService } from "../../services/PaginationService";
import { API_URLS } from "../../config/config";
import styles from "./Pagination.module.scss";

export default function Pagination() {
  const {
    limit,
    page,
    setPage,
  } = useGlobalState();

  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);

  //TODO: should be rerendered after change the data length
  useEffect(() => {
    const getTotalPageNumber = async () => {
      const totalPagesNumber = await PaginationService.fetchTotalPageNumber(API_URLS.items, limit);
      setTotalPageNumber(totalPagesNumber);
    };

    getTotalPageNumber();
  }, [limit]);
// TODO: maybe it had be better to create usePagination() hook
useEffect(() => {
  if (totalPageNumber > 1) {
    const pages = PaginationService.getPageNumbers(totalPageNumber);
    setPageNumbers(pages);
  } else {
    setPageNumbers([]);
  }
}, [totalPageNumber]);

  // TODO: fix rerendering all pages
  // console.log("page >>>>", page);
  const handlePagination = (pageNumber) => {
    console.log("handlePagination >>>>");

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