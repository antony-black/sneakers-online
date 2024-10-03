import { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Searching from "../../components/searching/Searching";
import Select from "../../components/select/Select";
import Pagination from "../../components/pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import { FetchService } from "../../services/FetchService";
import { SortService } from "../../services/SortService";
import { API_URLS } from "../../config/config";
import styles from "./Home.module.scss";

export default function Home() {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  // const lastElement = useRef();
  // const observer = useRef();
  // console.log('lastElement >>>>', lastElement);

  const {
    data: sneakers,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch(API_URLS.items, { limit, page });

  useEffect(() => {
    if (sneakers) {
      setOriginSneakers(sneakers);
    }
  }, [sneakers]);

  const sortSneakers = (sortPoint) => {
    setSelectedSort(sortPoint);
    const sortedSneakers = SortService.handleSorting(
      filteredSneakers,
      sortPoint
    );
    setFilteredSneakers(sortedSneakers);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
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
    {/* //TODO: the sorting state should be saved during pagination */}
      <Searching
        setFilteredSneakers={setFilteredSneakers}
        originSneakers={originSneakers}
      />

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
        sortSneakers={(value) => handleLimitChange(value)}
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
        ) : 
          filteredSneakers.map((sneakersPair) => (
            <Card key={sneakersPair.id} sneakersPair={sneakersPair} added />
          ))
        }
      </div>
      {/* <div ref={lastElement} style={{ height: 20, background: "red" }}></div> */}

      {limit !== -1 && <Pagination limit={limit} page={page} setPage={setPage}/>}
    </>
  );
}
