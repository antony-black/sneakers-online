import styles from "./GreenButton.module.scss";

export default function GreenButton({ children }) {
  return (
    <button className={styles.greenButton}>
      {children}
      <img src="../source/icons/arrow.svg" alt="arrow" />
    </button>
  );
}
