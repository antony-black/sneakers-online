import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <img
      className={styles.loaderShadow}
      src="../../../source/skeleton.jpg"
      alt="loader"
    />
  );
}
