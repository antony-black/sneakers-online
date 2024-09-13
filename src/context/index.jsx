import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_URLS } from "../config/config";
import { FetchService } from "../services/FetchService";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAdded, setAdded] = useState({});
  const [isCartOpened, setCartOpen] = useState(false);
  const [isOrderCompleted, setOrderCompleted] = useState(false);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  // TODO: maybe should be created usePagination() hook,
  //to separate that functionality from the fetching data
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
    totalPageNumber,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch(API_URLS.items, { limit, page });
  //TODO: separate all components of this useEffect, to avoid rerendering
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
        totalPageNumber,
        setLimit,
        setPage,
        limit,
        page,
        isCartOpened,
        isAdded,
        setAdded,
        setCartItems,
        cartItems,
        handleCart,
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
