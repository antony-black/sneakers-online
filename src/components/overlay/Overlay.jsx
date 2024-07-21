import useGlobalState from "../../hooks/useGlobalState";
import GreenButton from "../greenButton/GreenButton";
import styles from "./Overlay.module.scss";

export default function Overlay() {
  const { isCartOpened, setCartOpen } = useGlobalState();
  return (
    isCartOpened && (
      <div className={styles.overlay}>
        <div className={styles.drawer}>
          <div className={styles.cartHeaderContainer}>
            <h2>Cart</h2>
            <img
              src="../../../source/icons/close.svg"
              alt="close"
              onClick={() => setCartOpen(false)}
            />
          </div>
          <div className={styles.cartItems}>
            <div className={styles.cartItem}>
              <img width={70} height={70} src="../source/sneakers/item-1.jpg" />
              <div className={styles.cartItemAbout}>
                <p>Male sneakers Nike Blazer Mid Suede</p>
                <p className={styles.cartItemPrice}>270 $</p>
              </div>
              <div className={styles.cartRemove}>
                <img src="../source/icons/remove-btn.svg" alt="remove" />
              </div>
            </div>
          </div>
          <div className={styles.cartTotal}>
            <ul>
              <li className={styles.cartTotalItem}>
                <span>Total:</span>
                <div className={styles.dash}></div>
                <b>234 $</b>
              </li>
              <li className={styles.cartTotalItem}>
                <span>Tax 5%:</span>
                <div className={styles.dash}></div>
                <b>11.5 $</b>
              </li>
            </ul>
            <GreenButton>Checkout</GreenButton>
          </div>
        </div>
      </div>
    )
  );
}
