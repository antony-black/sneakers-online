import { useState, useRef, useEffect } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Searching from "../../components/searching/Searching";
import Select from "../../components/select/Select";
import { FetchService } from "../../services/FetchService";
import { SortService } from "../../services/SortService";
import Pagination from "../../components/pagination/Pagination";
import styles from "./Home.module.scss";

export default function Home() {
  const { pendingSneakers, errorMsgSneakers, limit, setLimit} = useGlobalState();
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  // const lastElement = useRef();
  // const observer = useRef();
  // console.log('lastElement >>>>', lastElement);

  const sortSneakers = (sortPoint) => {
    setSelectedSort(sortPoint);
    const sortedSneakers = SortService.handleSorting(
      filteredSneakers,
      sortPoint
    );
    setFilteredSneakers(sortedSneakers);
  };

  // useEffect(() => {
  //   if (pendingSneakers) return;
  //   if (observer.current) observer.current.disconnect();
  //   let callback = function (entries, observer) {
  //     if (entries[0].isIntersecting && page < totalPageNumber) {
  //       console.log("THE BLOCK IS VISIBLE");
  //       console.log("page >>>>", page);
  //       console.log("totalPageNumber >>>>", totalPageNumber);
  //       setPage(page + 1);
  //     }
  //   };

  //   observer.current = new IntersectionObserver(callback);
  //   observer.current.observe(lastElement.current);
  // }, [pendingSneakers]);

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
      <Select
        value={limit}
        sortSneakers={value => setLimit(value)}
        defaultValue="amount for viewing"
        options={[
          { value: 4, name: "4" },
          { value: 12, name: "12" },
          { value: 24, name: "24" },
          { value: -1, name: "show all" },
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
      {/* <div ref={lastElement} style={{ height: 20, background: "red" }}></div> */}

      <Pagination />
    </>
  );
}
