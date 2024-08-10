import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [originSneakers, setOriginSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
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

  useEffect(() => {
    const getFilteredSneakers = () => {
      const updatedSneakers = originSneakers.filter((sneakersItem) => {
        const title = sneakersItem.title.toLowerCase();
        const value = searchingValue.toLowerCase();

        return title.includes(value);
      });

      setFilteredSneakers(updatedSneakers);
    };

    getFilteredSneakers();
  }, [searchingValue, originSneakers]);

  return (
    <GlobalContext.Provider
      value={{
        originSneakers,
        filteredSneakers,
        pendingSneakers,
        errorMsgSneakers,
        searchingValue,
        setSearchingValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
