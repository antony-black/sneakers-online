import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [isAdded, setAdded] = useState({});
  const { data, pending, error } = useFetch(
    "https://66a114477053166bcabdec9c.mockapi.io/items",
    {}
  );

  useEffect(() => {
    if (data) {
      setSneakers(data);
    }
  }, [data]);

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    setAdded((prev) => ({ ...prev, [item.id]: false }));
  };

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setAdded((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleCart = (item) => {
    !cartItems.some((cartItem) => cartItem.id === item.id)
      ? addToCart(item)
      : removeFromCart(item);
  };

  return (
    <GlobalContext.Provider
      value={{
        isCartOpened,
        setCartOpen,
        cartItems,
        setCartItems,
        handleCart,
        removeFromCart,
        sneakers,
        setSneakers,
        isAdded,
        setAdded,
        data,
        pending,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
