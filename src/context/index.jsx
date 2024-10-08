import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URLS } from "../config/config";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    // TODO: maybe it would be better define this state, "originSneakers" at the Searching component
  const [originSneakers, setOriginSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAdded, setAdded] = useState({});
  const [isCartOpened, setCartOpen] = useState(false);
  const [isOrderCompleted, setOrderCompleted] = useState(false);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  // const [totalPageNumber, setTotalPageNumber] = useState(0);

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
  } = useFetch(API_URLS.items, { limit, page });

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

  // useEffect(() => {
  //   const getTotalPageNumber = async () => {
  //     const totalPagesNumber = await FetchService.fetchTotalPageNumber(API_URLS.items, limit);
  //     setTotalPageNumber(totalPagesNumber);
  //   };

  //   getTotalPageNumber();
  // }, []);

  const handleCartVisibility = () => {
    setCartOpen(!isCartOpened);
    // TODO: create toggle
    setOrderCompleted(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        // totalPageNumber, setTotalPageNumber,
        originSneakers,
        pendingSneakers,
        errorMsgSneakers,
        setLimit,
        limit,
        setPage,
        page,
        isCartOpened,
        isAdded,
        setAdded,
        setCartItems,
        cartItems,
        handleCartVisibility,
        cartPending,
        cartErrorMsg,
        favorites,
        setFavorites,
        favPending,
        favErrorMsg,
        isOrderCompleted,
        setOrderCompleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
