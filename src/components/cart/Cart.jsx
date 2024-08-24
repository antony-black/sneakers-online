import axios from "axios";
import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import useTotal from "../../hooks/useTotal";
import ItemsInfo from "../ItemsInfo/ItemsInfo";
import GreenButton from "../greenButton/GreenButton";
import { HandleCardService } from "../../services/HandleCardService";
import { API_URLS } from "../../config/config";
import styles from "./Cart.module.scss";

export default function Cart() {
  const {
    handleCart,
    cartItems,
    setCartItems,
    setAdded,
    isOrderCompleted,
    setOrderCompleted,
  } = useGlobalState();
  const [isOrderProcessing, setOrderProcessing] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [total] = useTotal();

  const calculateTax = () => {
    return (total / 100) * 5;
  };

  const sendOrder = async () => {
    try {
      setOrderProcessing(true);
      const { data } = await axios.post(
        "https://66bd909f74dfc195586ce2f4.mockapi.io/orders",
        {
          orderedItems: cartItems,
        }
      );
      setOrderId(data.id);

      for (const cartItem of cartItems) {
        const { id } = cartItem;
        await axios.delete(
          `https://66a114477053166bcabdec9c.mockapi.io/cart/${id}`
        );
        setCartItems((prev) => prev.filter((item) => item.id !== cartItem.id));
        setAdded((prev) => ({ ...prev, [cartItem.image]: false }));
      }
      setOrderCompleted(true);
    } catch (err) {
      console.error(
        err.message,
        "There is an issue with the processing of your order!"
      );
    } finally {
      setOrderProcessing(false);
    }
  };
  return cartItems.length > 0 ? (
    <div className={styles.cart}>
      <div className={styles.cartHeaderContainer}>
        <h2>Cart</h2>
        <img
          src="../../../source/icons/close.svg"
          alt="close"
          onClick={handleCart}
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
              onClick={() =>
                HandleCardService.removeFrom(
                  item,
                  API_URLS.cart,
                  setCartItems,
                  setAdded
                )
              }
            >
              <img src="../source/icons/remove-btn.svg" alt="remove" />
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
            <b>{calculateTax()}$</b>
          </li>
        </ul>
        <GreenButton disabling={isOrderProcessing} onClick={sendOrder}>
          Place an order
        </GreenButton>
      </div>
    </div>
  ) : (
    <ItemsInfo
      title={
        !isOrderCompleted ? "Your cart is empty" : "Your order is complete."
      }
      text={
        !isOrderCompleted
          ? "Add some items to your cart to start shopping!"
          : `The order number is ${orderId}.It's rushing be passed to the post-service!`
      }
      image={
        !isOrderCompleted
          ? "/source/cart/box.svg"
          : "/source/cart/order_is_processed.svg"
      }
      onClick={handleCart}
    />
  );
}
