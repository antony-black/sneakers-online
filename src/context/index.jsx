import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);
  const [isAdded, setAdded] = useState({});
  const [total, setTotal] = useState(0);
  const { data, pending, error } = useFetch(
    "https://66a114477053166bcabdec9c.mockapi.io/items",
    {}
  );
  const [searchingInput, setSearchingInput] = useState("");

  useEffect(() => {
    if (data) {
      setSneakers(data);
      setOriginalSneakers(data);
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

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchingInput(value);

    if (value !== "") {
      const filtered = sneakers.filter((item) =>
        item.title.toLowerCase().includes(value)
      );
      setSneakers(filtered);
    } else {
      setSneakers(originalSneakers);
    }
  };

  useEffect(() => {
    const getTotalSum = () => {
      const prices = cartItems.map((item) => item.price);
      const totalPrice = prices.reduce((total, num) => total + num, 0);
      setTotal(totalPrice);
    };

    getTotalSum();
  }, [cartItems, setCartItems]);

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
        searchingInput,
        setSearchingInput,
        handleInputChange,
        total,
        setTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
