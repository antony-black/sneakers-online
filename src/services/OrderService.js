import axios from "axios";
import { HandleCardService } from "./HandleCardService";
// TODO: maybe should be reworked as useOrder(){}
export const OrderService = {
  async postOrder(urlOrders, cartItems, setOrderId) {
    try {
      const { data } = await axios.post(urlOrders, {
        orderedItems: cartItems,
      });
      setOrderId(data.id);
    } catch (error) {
      console.error("Error posting the order:", error);
    }
  },

  async removeFromCartAfterOrdered(cartItems, urlCart, setCartItems, setAdded) {
    try {
      for (const cartItem of cartItems) {
        await HandleCardService.removeFrom(
          cartItem,
          urlCart,
          setCartItems,
          setAdded
        );
      }
    } catch (error) {
      console.error("Error removing items from cart:", error);
    }
  },

  async placeOrder(
    urlOrders,
    cartItems,
    setOrderId,
    urlCart,
    setCartItems,
    setAdded,
    setOrderCompleted,
  ) {
    try {
      setOrderCompleted(true);
      await OrderService.postOrder(urlOrders, cartItems, setOrderId);
      await OrderService.removeFromCartAfterOrdered(cartItems, urlCart, setCartItems, setAdded);
    } catch (err) {
      console.error(
        err.message,
        "There is an issue with the processing of your order!"
      );
    }
  },
};
