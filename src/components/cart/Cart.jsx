import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import CartCard from "./cart-card/CartCard";
import Total from "./total/Total";
import ItemsInfo from "../ItemsInfo/ItemsInfo";
import { FetchService } from "../../services/FetchService";
import styles from "./Cart.module.scss";

export default function Cart() {
  const {
    handleCartVisibility,
    cartItems,
    isOrderCompleted,
    cartPending,
    cartErrorMsg,
  } = useGlobalState();
  const [orderId, setOrderId] = useState(0);

  return cartItems.length > 0 ? (
    <div className={styles.cart}>
      <div className={styles.cartHeaderContainer}>
        <h2>Cart</h2>
        <img
          src="source/icons/close.svg"
          alt="close"
          onClick={handleCartVisibility}
        />
      </div>
      <div className={styles.cartItems}>
        {cartErrorMsg ? (
          <div className="error-msg">{`${cartErrorMsg}!!!`}</div>
        ) : null}
        {cartPending
          ? FetchService.createLoadingShadow()
          : cartItems.map((item) => <CartCard key={item.id} item={item} />)}
      </div>
          <Total setOrderId={setOrderId}/>
    </div>
  ) : (
    <ItemsInfo
      title={
        !isOrderCompleted ? "Your cart is empty" : "Your order is completed."
      }
      text={
        !isOrderCompleted
          ? "Add some items to your cart to start shopping!"
          : `The order number is ${orderId}. It's rushing be passed to the post-service!`
      }
      image={
        !isOrderCompleted
          ? "source/cart/box.svg"
          : "source/cart/order_is_processed.svg"
      }
      onClick={handleCartVisibility}
    />
  );
}
