import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Searching.module.scss";

export default function Searching() {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>All sneakers</h1>
      <div className={styles.searchingContainer}>
        <img src="../source/icons/search.svg" alt="search" />
        <input name="serching" placeholder="Searching..." />
      </div>
    </div>
  );
}
