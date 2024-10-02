import useGlobalState from "../../../hooks/useGlobalState";
import { HandleCardService } from "../../../services/HandleCardService";
import { API_URLS } from "../../../config/config";
import styles from "./CartCard.module.scss";

export default function CartCard({item}) {
  const {
    setCartItems,
    setAdded,
    isAdded,
    isOrderCompleted,
  } = useGlobalState();

  return (
    <div className={styles.cartItem}>
      <img className={styles.cardImage} src={item.image} alt={item.title} />
      <div className={styles.cartItemAbout}>
        <p>{item.title}</p>
        <p className={styles.cartItemPrice}>{item.price}$</p>
      </div>
      <button
        disabled={isOrderCompleted}
        className={styles.cartRemove}
        onClick={() =>
          HandleCardService.removeItem(
            item,
            API_URLS.cart,
            setCartItems,
            setAdded,
            isAdded
          )
        }
      >
        <img src="source/icons/remove-btn.svg" alt="remove" />
      </button>
    </div>
  );
}
