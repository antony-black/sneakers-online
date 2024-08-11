import { useEffect, useState } from "react";
import GreenButton from "../greenButton/GreenButton";
import useGlobalState from "../../hooks/useGlobalState";
import OrderProcessed from "../orderProcessed/OrderProcessed";
import styles from "./Cart.module.scss";
import axios from "axios";

export default function Cart() {
  const { handleCart } = useGlobalState();

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
      <div className={styles.cartItems}></div>
      <div className={styles.cartTotal}>
        <ul>
          <li className={styles.cartTotalItem}>
            <span>Total:</span>
            <div className={styles.dash}></div>
            <b>0$</b>
          </li>
          <li className={styles.cartTotalItem}>
            <span>Tax 5%:</span>
            <div className={styles.dash}></div>
            <b>0$</b>
          </li>
        </ul>
        <GreenButton>Place an order</GreenButton>
      </div>
    </div>
  );
}
