import useGlobalState from "../../hooks/useGlobalState";
import { useState, useEffect } from "react";
import styles from "./Searching.module.scss";

export default function Searching({ setFilteredSneakers }) {
  const [searchingValue, setSearchingValue] = useState("");
  const { originSneakers } = useGlobalState();

  const handleSerchingValue = (e) => {
    const value = e.target.value;
    setSearchingValue(value);
  };

  const cleanSearchingField = () => {
    setSearchingValue("");
  };

  useEffect(() => {
    const getFilteredSneakers = () => {
      const updatedSneakers = originSneakers.filter((sneakersItem) => {
        const title = sneakersItem.title.toLowerCase();
        const value = searchingValue.toLowerCase();

        return title.includes(value);
      });

      setFilteredSneakers(updatedSneakers);
    };

    getFilteredSneakers();
  }, [searchingValue, originSneakers]);

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>
        {!!searchingValue
          ? `Searching Request: ${searchingValue}`
          : "All sneakers"}
      </h1>
      <div className={styles.searchingContainer}>
        <img src="../source/icons/search.svg" alt="search" />
        <input
          value={searchingValue}
          onChange={handleSerchingValue}
          name="serching"
          placeholder="Searching..."
        />
        {!!searchingValue && (
          <img
            src="../source/icons/close.svg"
            alt="clean"
            onClick={cleanSearchingField}
          />
        )}
      </div>
    </div>
  );
}
