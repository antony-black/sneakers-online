import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [searchingValue, setSearchingValue] = useState("");
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

  const handleSerchingValue = (e) => {
    const value = e.target.value;
    setSearchingValue(value);
  };

  return (
    <GlobalContext.Provider
      value={{
        originSneakers,
        pendingSneakers,
        errorMsgSneakers,
        searchingValue,
        handleSerchingValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
