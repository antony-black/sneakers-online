import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

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
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/cart", {});
  const {
    data: favSneakers,
    pending: favPending,
    errorMsg: favErrorMsg,
  } = useFetch("https://66bd909f74dfc195586ce2f4.mockapi.io/favorites", {});
  const {
    data: sneakers,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/items", {});

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

  const addToCart = async (sneakersPair) => {
    try {
      const { data } = await axios.post(
        "https://66a114477053166bcabdec9c.mockapi.io/cart",
        sneakersPair
      );
      setCartItems((prev) => [...prev, data]);
      setAdded((prev) => ({ ...prev, [sneakersPair.image]: true }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromCart = async (sneakersPair) => {
    try {
      const { data: cartItemsList } = await axios.get(
        "https://66a114477053166bcabdec9c.mockapi.io/cart"
      );
      const cartItemToRemove = cartItemsList.find(
        (addedItem) => addedItem.image === sneakersPair.image
      );
      await axios.delete(
        `https://66a114477053166bcabdec9c.mockapi.io/cart/${cartItemToRemove.id}`
      );
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
      );
      setCartItems(updatedCartItems);
      setAdded((prev) => ({ ...prev, [sneakersPair.image]: false }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAdding = (sneakersPair) => {
    const isCartItemsAdded = !cartItems.some(
      (cartItem) => cartItem.image === sneakersPair.image
    );
    isCartItemsAdded ? addToCart(sneakersPair) : removeFromCart(sneakersPair);
  };

  const addToFavorites = async (sneakersPair) => {
    try {
      const { data } = await axios.post(
        "https://66bd909f74dfc195586ce2f4.mockapi.io/favorites",
        sneakersPair
      );
      setFavorites((prev) => [...prev, data]);
      setIsFavorite((prev) => ({ ...prev, [sneakersPair.image]: true }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromFavorites = async (sneakersPair) => {
    try {
      const { data: favoritesList } = await axios.get(
        "https://66bd909f74dfc195586ce2f4.mockapi.io/favorites"
      );
      const favoriteToRemove = favoritesList.find(
        (favItem) => favItem.image === sneakersPair.image
      );

      await axios.delete(
        `https://66bd909f74dfc195586ce2f4.mockapi.io/favorites/${favoriteToRemove.id}`
      );
      setFavorites((prev) =>
        prev.filter((favItem) => favItem.id !== favoriteToRemove.id)
      );
      setIsFavorite((prev) => ({ ...prev, [sneakersPair.image]: false }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFavorites = (sneakersPair) => {
    const isFavoriteAdded = !favorites.some(
      (favItem) => favItem.image === sneakersPair.image
    );
    isFavoriteAdded
      ? addToFavorites(sneakersPair)
      : removeFromFavorites(sneakersPair);
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
        removeFromCart,
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
