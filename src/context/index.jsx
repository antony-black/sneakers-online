import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URLS } from "../config/config";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  //* TO DO: refactor states
  // !check the "Orders"
  const [originSneakers, setOriginSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [isOrderCompleted, setOrderCompleted] = useState(false);

  const {
    data: cartSneakers,
    pending: cartPending,
    errorMsg: cartErrorMsg,
  } = useFetch(API_URLS.cart, {});
  const {
    data: favSneakers,
    pending: favPending,
    errorMsg: favErrorMsg,
  } = useFetch(API_URLS.favorites, {});
  const {
    data: sneakers,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch(API_URLS.items, {});

  useEffect(() => {
    if (!!cartSneakers) {
      setCartItems(cartSneakers);
    }

    if (!!favSneakers) {
      setFavorites(favSneakers);
    }

    if (!!sneakers) {
      setOriginSneakers(sneakers);
    }
  }, [cartSneakers, favSneakers, sneakers]);

  const handleCart = () => {
    setCartOpen(!isCartOpened);
    setOrderCompleted(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        originSneakers,
        pendingSneakers,
        errorMsgSneakers,
        isCartOpened,
        setCartItems,
        cartItems,
        handleCart,
        favorites,
        setFavorites,
        isOrderCompleted,
        setOrderCompleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
