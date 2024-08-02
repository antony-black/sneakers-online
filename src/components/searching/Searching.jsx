import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Searching.module.scss";

export default function Searching() {
  const { searchingInput, cleanSearchInput, handleInputChange } =
    useGlobalState();
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>
        {searchingInput !== ""
          ? `Searching request: ${searchingInput}`
          : "All sneakers"}
      </h1>
      <div className={styles.searchingContainer}>
        <img src="../source/icons/search.svg" alt="search" />
        <input
          value={searchingInput}
          onChange={handleInputChange}
          name="serching"
          placeholder="Searching..."
        />
        {searchingInput !== "" && (
          <img
            src="../source/icons/close.svg"
            alt="search"
            onClick={cleanSearchInput}
          />
        )}
      </div>
    </div>
  );
}
