// import { createContext, useEffect, useState } from "react";
// import useFetch from "../hooks/useFetch";

// export const GlobalContext = createContext(null);

// export default function GlobalState({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpened, setCartOpen] = useState(false);
//   const [sneakers, setSneakers] = useState([]);
//   const { data, pending, error } = useFetch(
//     "https://669babc5276e45187d3624eb.mockapi.io/items",
//     {}
//   );
//   const goods = [
//     {
//       id: 1,
//       title: "Male sneakers, Nike Blazer Mid Suede",
//       price: 270,
//       image: "source/sneakers/item-1.jpg",
//     },
//     {
//       id: 2,
//       title: "Male sneakers, Nike Air Max 270",
//       price: 370,
//       image: "source/sneakers/item-2.jpg",
//     },
//   ];

// useEffect(() => {
//   if (data) {
//     setSneakers(data);
//   }
// }, [data]);

//   const addToCart = (item) => {
//     if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
//       return [...prevItems, item];
//     } else {
//       return prevItems;
//     }
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         isCartOpened,
//         setCartOpen,
//         cartItems,
//         setCartItems,
//         addToCart,
//         sneakers,
//         setSneakers,
//         data,
//         pending,
//         error,
//         goods,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }
