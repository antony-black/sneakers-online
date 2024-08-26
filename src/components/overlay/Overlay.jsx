import useGlobalState from "../../hooks/useGlobalState";
import Cart from "../cart/Cart";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened } = useGlobalState();

  return (
    <div className={`${styles.overlay} ${isCartOpened ? styles.show : ""}`}>
      <div className={`${styles.drawer} ${isCartOpened ? styles.show : ""}`}>
        <Cart />
      </div>
    </div>
  );
}
