import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isAdded, setAdding] = useState([]);
  const [isCartOpened, setCartOpen] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const { data, pending, error } = useFetch(
    "https://669babc5276e45187d3624eb.mockapi.io/items",
    {}
  );

  useEffect(() => {
    if (data) {
      setSneakers(data);
    }
  }, [data]);

  return (
    <GlobalContext.Provider
      value={{
        isCartOpened,
        setCartOpen,
        sneakers,
        setSneakers,
        data,
        pending,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
