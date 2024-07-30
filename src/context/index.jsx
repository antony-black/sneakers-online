import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [allSneakers, setAllSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);
  const [isAdded, setAdded] = useState({});
  const [total, setTotal] = useState(0);
  const {
    data: sneakers,
    pending: sneakersLoading,
    error: sneakersError,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/items", {});
  const {
    data: cartSneakers,
    pending: cartSneakersLoading,
    error: cartSneakersError,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/cart", {});
  const [searchingInput, setSearchingInput] = useState("");

  useEffect(() => {
    if (sneakers) {
      setAllSneakers(sneakers);
      setOriginalSneakers(sneakers);
    }
  }, [sneakers]);

  useEffect(() => {
    if (cartSneakers) {
      setCartItems(cartSneakers);
    }
  }, [cartSneakers]);

  const removeFromCart = async (item) => {
    await axios.delete(
      `https://66a114477053166bcabdec9c.mockapi.io/cart/${item.id}`
    );
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    setAdded((prev) => ({ ...prev, [item.id]: false }));
  };

  const addToCart = async (item) => {
    await axios.post("https://66a114477053166bcabdec9c.mockapi.io/cart", item);
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
      setAllSneakers(filtered);
    } else {
      setAllSneakers(originalSneakers);
    }
  };

  const cleanSearchInput = () => {
    setSearchingInput("");
    setAllSneakers(originalSneakers);
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
        allSneakers,
        setAllSneakers,
        isAdded,
        setAdded,
        sneakers,
        sneakersLoading,
        sneakersError,
        searchingInput,
        setSearchingInput,
        handleInputChange,
        cleanSearchInput,
        total,
        setTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
