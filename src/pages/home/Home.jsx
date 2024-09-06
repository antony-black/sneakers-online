import { useState, useEffect } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import Searching from "../../components/searching/Searching";
import Select from "../../components/select/Select";
import { FetchService } from "../../services/FetchService";
import styles from "./Home.module.scss";

export default function Home() {
  const { pendingSneakers, errorMsgSneakers } = useGlobalState();
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

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
            <Card key={sneakersPair.image} sneakersPair={sneakersPair} added />
          ))
        ) : (
          <div className={styles.nothing}>Nothing found.</div>
        )}
      </div>
    </>
  );
}
