import { useEffect, useState } from "react";
import GreenButton from "../greenButton/GreenButton";
import useGlobalState from "../../hooks/useGlobalState";
import OrderProcessed from "../orderProcessed/OrderProcessed";
import styles from "./Cart.module.scss";
import axios from "axios";

export default function Cart() {
  const {
    setCartOpen,
    cartItems,
    setCartItems,
    removeFromCart,
    total,
    processedOrder,
    setProcessedOrder,
  } = useGlobalState();
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(total * 0.05);
  }, [total]);

  const handleOrder = async () => {
    console.log("handleOrder");
    cartItems.forEach(
      async (item) =>
        await axios.post("http://localhost:3002/orders_processed", item)
    );
    setCartItems([]);
    setProcessedOrder(cartItems);
  };

  return processedOrder.length > 0 ? (
    <OrderProcessed />
  ) : (
    <div className={styles.cart}>
      <div className={styles.cartHeaderContainer}>
        <h2>Cart</h2>
        <img
          src="../../../source/icons/close.svg"
          alt="close"
          onClick={() => setCartOpen(false)}
        />
      </div>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img width={70} height={70} src={item.image} alt={item.title} />
            <div className={styles.cartItemAbout}>
              <p>{item.title}</p>
              <p className={styles.cartItemPrice}>{item.price}$</p>
            </div>
            <div
              className={styles.cartRemove}
              onClick={() => removeFromCart(item)}
            >
              <img src="../../../source/icons/remove-btn.svg" alt="remove" />
            </div>
          </div>
        ))}
      </div>
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
            <b>{tax}$</b>
          </li>
        </ul>
        <GreenButton onClick={handleOrder}>Place an order</GreenButton>
      </div>
    </div>
  );
}
