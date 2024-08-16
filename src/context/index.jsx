import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAdded, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});
  const [favorites, setFavorites] = useState([]);

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

  const removeFromCart = async (id) => {
    try {
      await axios.delete(
        `https://66a114477053166bcabdec9c.mockapi.io/cart/${id}`
      );
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      setCartItems(updatedCartItems);
      // setAdded((prev) => ({ ...prev, [sneakersPair.image]: false }));
      console.log("remove");
    } catch (err) {
      console.log(err.message);
    }
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
        (item) => item.image === sneakersPair.image
      );

      await axios.delete(
        `https://66bd909f74dfc195586ce2f4.mockapi.io/favorites/${favoriteToRemove.id}`
      );
      setFavorites((prev) =>
        prev.filter((item) => item.id !== favoriteToRemove.id)
      );
      setIsFavorite((prev) => ({ ...prev, [sneakersPair.image]: false }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFavorites = (sneakersPair) => {
    const isFavoriteAdded = !favorites.some(
      (item) => item.image === sneakersPair.image
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
        total,
        isAdded,
        handleFavorites,
        addToFavorites,
        favorites,
        isFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
