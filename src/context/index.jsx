import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [processedOrder, setProcessedOrder] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [allSneakers, setAllSneakers] = useState([]);
  const [originalSneakers, setOriginalSneakers] = useState([]);
  const [isAdded, setAdded] = useState({});
  const [searchingInput, setSearchingInput] = useState("");
  const [total, setTotal] = useState(0);
  const [isFavoriteAdded, setFavoriteAdd] = useState({});
  const [favorites, setFavorites] = useState([]);
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
  const {
    data: favoriteSneakers,
    pending: favoriteSneakersLoading,
    error: favoriteSneakersError,
  } = useFetch("http://localhost:3002/favorites", {});

  useEffect(() => {
    if (!!sneakers) {
      setAllSneakers(sneakers);
      setOriginalSneakers(sneakers);
    }
    if (!!cartSneakers) {
      setCartItems(cartSneakers);
    }
    if (!!favoriteSneakers) {
      setFavorites(favoriteSneakers);

      favoriteSneakers.forEach((item) =>
        setFavoriteAdd((prev) => ({ ...prev, [item.id]: true }))
      );
    }
  }, [sneakers, cartSneakers, favoriteSneakers]);

  const removeFromCart = async (item) => {
    try {
      await axios.delete(
        `https://66a114477053166bcabdec9c.mockapi.io/cart/${item.id}`
      );
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(updatedCartItems);
      setAdded((prev) => ({ ...prev, [item.id]: false }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const addToCart = async (item) => {
    try {
      await axios.post(
        "https://66a114477053166bcabdec9c.mockapi.io/cart",
        item
      );

      setCartItems((prev) => [...prev, item]);
      setAdded((prev) => ({ ...prev, [item.id]: true }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCart = (item) => {
    !cartItems.some((cartItem) => cartItem.id === item.id)
      ? addToCart(item)
      : removeFromCart(item);
  };

  const addToFavorites = async (item) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/favorites",
        item
      );
      // console.log(data);

      setFavorites((prev) => [...prev, data]);
      setFavoriteAdd((prev) => ({ ...prev, [data.id]: true }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromFavorites = async (item) => {
    try {
      await axios.delete(`http://localhost:3002/favorites/${item.id}`);
      const updatedFavorites = favorites.filter(
        (favItem) => favItem.id !== item.id
      );
      setFavorites(updatedFavorites);
      setFavoriteAdd((prev) => ({ ...prev, [item.id]: false }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFavorites = (item) => {
    !favorites.some((favItem) => favItem.id === item.id)
      ? addToFavorites(item)
      : removeFromFavorites(item);
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
  }, [cartItems]);

  return (
    <GlobalContext.Provider
      value={{
        processedOrder,
        setProcessedOrder,
        favorites,
        isFavoriteAdded,
        handleFavorites,
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
