import styles from "./GreenButton.module.scss";

export default function GreenButton({ children, onClick, className }) {
  return (
    <button className={`${styles.greenButton} ${className}`} onClick={onClick}>
      {children}
      {/* <img src="../source/icons/arrow.svg" alt="arrow" /> */}
    </button>
  );
}
