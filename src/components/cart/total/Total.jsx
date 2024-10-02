import useGlobalState from "../../../hooks/useGlobalState";
import useTotal from "../../../hooks/useTotal";
import GreenButton from "../../greenButton/GreenButton";
import { OrderService } from "../../../services/OrderService";
import { API_URLS } from "../../../config/config";
import styles from "./Total.module.scss";

export default function Total({setOrderId}) {
  const {
    cartItems,
    setCartItems,
    setAdded,
    isAdded,
    isOrderCompleted,
    setOrderCompleted,
  } = useGlobalState();

  const [total] = useTotal();

  const calculateTax = () => {
    return (total / 100) * 5;
  };

  return (
    <div className={styles.cartTotal}>
      <ul>
        <li className={styles.cartTotalItem}>
          <span>Total:</span>
          <div className={styles.dash}></div>
          <b>{total}$</b>
        </li>
        <li className={styles.cartTotalItem}>
          <span>Tax 5%:</span>
          <div className={styles.dash}></div>
          <b>{calculateTax()}$</b>
        </li>
      </ul>
      <GreenButton
        disabling={isOrderCompleted}
        onClick={() =>
          OrderService.placeOrder(
            API_URLS.orders,
            cartItems,
            setOrderId,
            API_URLS.cart,
            setCartItems,
            setAdded,
            setOrderCompleted,
            isAdded
          )
        }
      >
        Place an order
      </GreenButton>
    </div>
  );
}
