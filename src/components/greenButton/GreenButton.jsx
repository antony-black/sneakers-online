import styles from "./GreenButton.module.scss";

export default function GreenButton({
  children,
  onClick,
  className,
  disabling,
}) {
  return (
    <button
      disabled={disabling}
      className={`${styles.greenButton} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
