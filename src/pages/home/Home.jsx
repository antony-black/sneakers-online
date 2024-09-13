import { useState, useEffect } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Searching from "../../components/searching/Searching";
import Select from "../../components/select/Select";
import { FetchService } from "../../services/FetchService";
import { PaginationService } from "../../services/PaginationService";
import styles from "./Home.module.scss";

export default function Home() {
  const {
    pendingSneakers,
    errorMsgSneakers,
    totalPageNumber,
    setLimit,
    setPage,
    limit,
    page,
  } = useGlobalState();
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const pageNumbers = PaginationService.getPageNumbers(totalPageNumber);

  // TODO: create useSort() hook or service
  const isString = (sortPoint) => {
    return typeof sortPoint === "string";
  };

  const sortByTitle = (a, b, sortPoint) => {
    return a[sortPoint].localeCompare(b[sortPoint]);
  };

  const sortByPrice = (a, b, sortPoint) => {
    return a[sortPoint] - b[sortPoint];
  };

  const handleSorting = (sortPoint) => {
    return [...filteredSneakers].sort((a, b) => {
      return isString(a[sortPoint]) && isString(b[sortPoint])
        ? sortByTitle(a, b, sortPoint)
        : sortByPrice(a, b, sortPoint);
    });
  };

  const sortSneakers = (sortPoint) => {
    setSelectedSort(sortPoint);
    const sortedSneakers = handleSorting(sortPoint);
    setFilteredSneakers(sortedSneakers);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Searching setFilteredSneakers={setFilteredSneakers} />
      <Select
        value={selectedSort}
        sortSneakers={sortSneakers}
        defaultValue="sorting by:"
        options={[
          { value: "title", name: "name" },
          { value: "price", name: "price" },
        ]}
      />
      <div className={styles.allSneakers}>
        {errorMsgSneakers ? (
          <div className="error-msg">{`${errorMsgSneakers}!!!`}</div>
        ) : null}
        {pendingSneakers ? (
          FetchService.createLoadingShadow()
        ) : filteredSneakers?.length > 0 ? (
          filteredSneakers.map((sneakersPair) => (
            <Card key={sneakersPair.id} sneakersPair={sneakersPair} added />
          ))
        ) : (
          <div className={styles.nothing}>Nothing found.</div>
        )}
      </div>
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
    </>
  );
}
