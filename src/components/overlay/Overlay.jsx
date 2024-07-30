import { useEffect, useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import CartEmpty from "../cartEmpty/CartEmpty";
import Cart from "../cart/Cart";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened, cartItems, total } = useGlobalState();
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(total * 0.05);
  }, [total]);

  return (
    isCartOpened && (
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          {cartItems.length > 0 ? <Cart /> : <CartEmpty />}
        </div>
      </div>
    )
  );
}
