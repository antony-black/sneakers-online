import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAdded, setAdded] = useState(false);

  const {
    data: cartSneakers,
    pending: cartPendingSneakers,
    errorMsg: cartErrorMsgSneakers,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/cart", {});
  const {
    data: sneakers,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/items", {});

  useEffect(() => {
    if (!!cartSneakers) {
      setCartItems(cartSneakers);
    }

    if (!!sneakers) {
      setOriginSneakers(sneakers);
    }
  }, [cartSneakers, sneakers]);

  const handleCart = () => {
    setCartOpen(!isCartOpened);
  };

  const addToCart = async (sneakersPair) => {
    try {
      const { data } = await axios.post(
        "https://66a114477053166bcabdec9c.mockapi.io/cart",
        sneakersPair
      );
      setCartItems((prev) => [...prev, data]);
      setAdded((prev) => ({ ...prev, [sneakersPair.image]: true }));
      console.log("add");
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromCart = async (sneakersPair, id) => {
    try {
      await axios.delete(
        `https://66a114477053166bcabdec9c.mockapi.io/cart/${id}`
      );
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      setCartItems(updatedCartItems);
      setAdded((prev) => ({ ...prev, [sneakersPair.image]: false }));
      console.log("remove");
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleAddingToCart = (sneakersPair) => {
  //   !cartItems.some((cartItem) => cartItem.image === sneakersPair.image);
  // };

  return (
    <GlobalContext.Provider
      value={{
        setFilteredSneakers,
        originSneakers,
        filteredSneakers,
        pendingSneakers,
        errorMsgSneakers,
        isCartOpened,
        handleCart,
        cartItems,
        addToCart,
        removeFromCart,
        isAdded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
