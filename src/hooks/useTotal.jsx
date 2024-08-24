import { useState, useEffect } from "react";
import useGlobalState from "./useGlobalState";

export default function useTotal() {
  const { cartItems } = useGlobalState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalCart = () => {
      return cartItems?.length > 0
        ? cartItems.reduce((total, item) => total + item.price, 0)
        : 0;
    };
    setTotal(getTotalCart());
  }, [cartItems]);

  return [total, setTotal];
}
