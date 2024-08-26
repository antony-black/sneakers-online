import useGlobalState from "../../hooks/useGlobalState";
import Cart from "../cart/Cart";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened } = useGlobalState();
  console.log("isCartOpened >>>>", isCartOpened);

  return (
    <div className={!isCartOpened ? styles.overlay : styles.overlayShow}>
      <div className={!isCartOpened ? styles.drawer : styles.drawerShow}>
        <Cart />
      </div>
    </div>
  );

  // !!isCartOpened && (
  //   <div className={styles.overlay}>
  //     <div className={isCartOpened ? styles.drawer : styles.drawerShow}>
  //       <Cart />
  //     </div>
  //   </div>
  // )
}
