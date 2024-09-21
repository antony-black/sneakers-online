import axios from "axios";
import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import useTotal from "../../hooks/useTotal";
import ItemsInfo from "../ItemsInfo/ItemsInfo";
import GreenButton from "../greenButton/GreenButton";
import { HandleCardService } from "../../services/HandleCardService";
import { FetchService } from "../../services/FetchService";
import { API_URLS } from "../../config/config";
import styles from "./Cart.module.scss";

export default function Cart() {
  const {
    handleCartVisibility,
    cartItems,
    setCartItems,
    setAdded,
    isOrderCompleted,
    setOrderCompleted,
    cartPending,
    cartErrorMsg,
  } = useGlobalState();
  const [isOrderProcessing, setOrderProcessing] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [total] = useTotal();

  const calculateTax = () => {
    return (total / 100) * 5;
  };

  const postOrder = async () => {
    const { data } = await axios.post(API_URLS.orders, {
      orderedItems: cartItems,
    });
    setOrderId(data.id);
  };

  const removeFromCart = async (cartItems, url, setItems, setAdded) => {
    HandleCardService.removeFrom(cartItems, url, setItems, setAdded);
  };

  const removeFromCartAfterOrdered = async (cartItems, url, setItems, setAdded) => {
    for (const cartItem of cartItems) {
      HandleCardService.removeFrom(cartItem, url, setItems, setAdded);
    }
  };

  const sendOrder = async () => {
    try {
      setOrderProcessing(true);
      await postOrder();
      await removeFromCartAfterOrdered(cartItems, API_URLS.cart, setCartItems, setAdded);
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
          : cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img width={70} height={70} src={item.image} alt={item.title} />
                <div className={styles.cartItemAbout}>
                  <p>{item.title}</p>
                  <p className={styles.cartItemPrice}>{item.price}$</p>
                </div>
                <div
                  className={styles.cartRemove}
                  onClick={() =>
                    removeFromCart(item, API_URLS.cart, setCartItems, setAdded)
                  }
                >
                  <img src="source/icons/remove-btn.svg" alt="remove" />
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
          ? "source/cart/box.svg"
          : "source/cart/order_is_processed.svg"
      }
      onClick={handleCartVisibility}
    />
  );
}
