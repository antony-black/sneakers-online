import GreenButton from "../greenButton/GreenButton";
import useGlobalState from "../../hooks/useGlobalState";
import styles from "./CartEmpty.module.scss";
import style from "../greenButton/GreenButton.module.scss";

export default function CartEmpty() {
  return (
    <div className={styles.cartEmpty}>
      <div className={styles.content}>
        <img src="../../../source/cart/box.jpg" alt="empty cart" />
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to start shopping!</p>
      </div>
      <GreenButton className={style.arrowBack}>
        Go back
        <img src="../source/icons/arrow-back.svg" alt="arrow" />
      </GreenButton>
    </div>
  );
}
