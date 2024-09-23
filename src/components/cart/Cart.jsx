import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import useTotal from "../../hooks/useTotal";
import ItemsInfo from "../ItemsInfo/ItemsInfo";
import GreenButton from "../greenButton/GreenButton";
import { HandleCardService } from "../../services/HandleCardService";
import { FetchService } from "../../services/FetchService";
import { OrderService } from "../../services/OrderService";
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
  const [orderId, setOrderId] = useState(0);
  const [total] = useTotal();

  const calculateTax = () => {
    return (total / 100) * 5;
  };
// TODO: move to the Utils or add the CartService
  const removeFromCart = async (cartItems, url, setCartItems, setAdded) => {
    HandleCardService.removeFrom(cartItems, url, setCartItems, setAdded);
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
            // TODO: create a separate component
              <div key={item.id} className={styles.cartItem}>
                <img width={70} height={70} src={item.image} alt={item.title} />
                <div className={styles.cartItemAbout}>
                  <p>{item.title}</p>
                  <p className={styles.cartItemPrice}>{item.price}$</p>
                </div>
                <button
                  disabled={isOrderCompleted}
                  className={styles.cartRemove}
                  onClick={() =>
                    removeFromCart(item, API_URLS.cart, setCartItems, setAdded)
                  }
                >
                  <img src="source/icons/remove-btn.svg" alt="remove" />
                </button>
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
            )
          }
        >
          Place an order
        </GreenButton>
      </div>
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