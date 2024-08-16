import { useEffect, useState } from "react";
import GreenButton from "../greenButton/GreenButton";
import useGlobalState from "../../hooks/useGlobalState";
import OrderProcessed from "../orderProcessed/OrderProcessed";
import Card from "../card/Card";
import styles from "./Cart.module.scss";
import axios from "axios";

export default function Cart() {
  const { handleCart, removeFromCart, cartItems, setCartItems, total } =
    useGlobalState();

  const calculateTax = () => {
    return (total / 100) * 5;
  };

  //* send cartItems to orders/ maybe be better to create a loop
  //* delete cartItems from the cart and backend side
  //* change isAdded indicator
  //* add the pending for order processing in the cart

  const sendOrder = async () => {
    try {
      // cartItems.forEach(async (cartItem) => {
      //   const { id, ...rest } = cartItem;

      //   await axios.post(
      //     "https://66bd909f74dfc195586ce2f4.mockapi.io/orders",
      //     rest
      //   );
      // });
      for (const cartItem of cartItems) {
        const { id, ...rest } = cartItem;
        await axios.delete(
          `https://66a114477053166bcabdec9c.mockapi.io/cart/${id}`
        );
        await axios.post(
          "https://66bd909f74dfc195586ce2f4.mockapi.io/orders",
          rest
        );
      }
      setCartItems([]);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
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
              onClick={() => removeFromCart(item)}
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
        <GreenButton onClick={sendOrder}>Place an order</GreenButton>
      </div>
    </div>
  );
}
