import { useEffect, useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import CartEmpty from "../cartEmpty/CartEmpty";
import Cart from "../cart/Cart";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened, cartItems } = useGlobalState();

  return (
    !!isCartOpened && (
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          {cartItems.length > 0 ? <Cart /> : <CartEmpty />}
        </div>
      </div>
    )
  );
}
