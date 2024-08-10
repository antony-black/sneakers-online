import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Searching.module.scss";

export default function Searching() {
  const { searchingValue, handleSerchingValue, cleanSearchingField } =
    useGlobalState();

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>All sneakers</h1>
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
