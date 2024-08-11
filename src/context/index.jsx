import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  // const [isAdded, setAdded] = useState({});

  const {
    data: sneakers,
    pending: pendingSneakers,
    errorMsg: errorMsgSneakers,
  } = useFetch("https://66a114477053166bcabdec9c.mockapi.io/items", {});

  useEffect(() => {
    if (!!sneakers) {
      setOriginSneakers(sneakers);
    }
  }, [sneakers]);

  const handleCart = () => {
    setCartOpen(!isCartOpened);
  };

  // const handleAdding = () => {};

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
