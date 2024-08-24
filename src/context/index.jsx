import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { HandleCardService } from "../services/HandleCardService";
import { API_URLS } from "../config/config";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [isAdded, setAdded] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isFavorite, setIsFavorite] = useState({});
  const [favorites, setFavorites] = useState([]);
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
      cartItems.forEach((cartItem) =>
        setAdded((prev) => ({ ...prev, [cartItem.image]: true }))
      );
    }

    if (!!favSneakers) {
      setFavorites(favSneakers);
      favorites.forEach((favItem) =>
        setIsFavorite((prev) => ({ ...prev, [favItem.image]: true }))
      );
    }

    if (!!sneakers) {
      setOriginSneakers(sneakers);
    }
  }, [cartSneakers, favSneakers, sneakers]);

  const handleCart = () => {
    setCartOpen(!isCartOpened);
    setOrderCompleted(false);
  };
  const handleAdding = (sneakersPair) => {
    const isCartItemsAdded = !cartItems.some(
      (cartItem) => cartItem.image === sneakersPair.image
    );
    isCartItemsAdded
      ? HandleCardService.addTo(
          sneakersPair,
          API_URLS.cart,
          setCartItems,
          setAdded
        )
      : HandleCardService.removeFrom(
          sneakersPair,
          API_URLS.cart,
          setCartItems,
          setAdded
        );
  };

  const handleFavorites = (sneakersPair) => {
    const isFavoriteAdded = !favorites.some(
      (favItem) => favItem.image === sneakersPair.image
    );
    isFavoriteAdded
      ? HandleCardService.addTo(
          sneakersPair,
          API_URLS.favorites,
          setFavorites,
          setIsFavorite
        )
      : HandleCardService.removeFrom(
          sneakersPair,
          API_URLS.favorites,
          setFavorites,
          setIsFavorite
        );
  };

  useEffect(() => {
    const getTotalCart = () => {
      return cartItems?.length > 0
        ? cartItems.reduce((total, item) => total + item.price, 0)
        : 0;
    };
    setTotal(getTotalCart());
  }, [cartItems]);

  return (
    <GlobalContext.Provider
      value={{
        originSneakers,
        setFilteredSneakers,
        filteredSneakers,
        pendingSneakers,
        errorMsgSneakers,
        isCartOpened,
        setCartItems,
        cartItems,
        handleCart,
        handleAdding,
        isAdded,
        setAdded,
        handleAdding,
        total,
        handleFavorites,
        favorites,
        isFavorite,
        isOrderCompleted,
        setOrderCompleted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
