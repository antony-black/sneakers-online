import useGlobalState from "../../hooks/useGlobalState";
import Cart from "../cart/Cart";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened } = useGlobalState();

  return (
    !!isCartOpened && (
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          <Cart />
        </div>
      </div>
    )
  );
}
