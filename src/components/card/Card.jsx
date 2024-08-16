import useGlobalState from "../../hooks/useGlobalState";
import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import axios from "axios";

export default function Card({ sneakersPair }) {
  const { addToCart, isAdded, handleAdding, isFavorite, handleFavorites } =
    useGlobalState();
  // const [isAdded, setAdded] = useState(false);

  // const onClickPlus = () => {
  //   setAdded(!isAdded);
  // };

  return (
    <div className={styles.sneakersItem}>
      <button
        className={styles.favorite}
        onClick={() => handleFavorites(sneakersPair)}
      >
        <img
          className={styles.heart}
          src={
            !isFavorite[sneakersPair.image]
              ? "../source/icons/heart.svg"
              : "../source/icons/heart-active.svg"
          }
          alt="heart"
        />
      </button>
      <img className={styles.item} src={sneakersPair.image} alt="sneakers" />
      <div className="sneakers-item-info">
        <a>
          <p>{sneakersPair.title}</p>
        </a>
      </div>
      <div className={styles.sneakersItemPriceInfo}>
        <div className={styles.sneakersItemPriceDetails}>
          <p className={styles.sneakersItemPriceTitle}>Price:</p>
          <p className={styles.sneakersItemPrice}>{sneakersPair.price}</p>
        </div>
        <button className="plus" onClick={() => handleAdding(sneakersPair)}>
          <img
            src={
              !isAdded[sneakersPair.image]
                ? "source/icons/plus.svg"
                : "source/icons/check.svg"
            }
            // src="source/icons/plus.svg"
            alt="plus-button"
            // onClick={onClickPlus}
          />
        </button>
      </div>
    </div>
  );
}

// import useGlobalState from "../../hooks/useGlobalState";
// import { useState, useEffect } from "react";
// import styles from "./Card.module.scss";

// export default function Card({ sneakersPair, added = false }) {
//   const { addToCart, removeFromCart, cartItems } = useGlobalState();
//   const [isAdded, setAdded] = useState(added);

//   useEffect(() => {
//     // Check if the item is already in the cart
//     const isInCart = cartItems.some(
//       (cartItem) => cartItem.image === sneakersPair.image
//     );
//     setAdded(isInCart);
//   }, [cartItems, sneakersPair.image]);

//   const handleButtonClick = async () => {
//     if (isAdded) {
//       // Find the cart item by matching the image
//       const cartItem = cartItems.find(
//         (item) => item.image === sneakersPair.image
//       );
//       if (cartItem) {
//         await removeFromCart(cartItem.id);
//       }
//     } else {
//       await addToCart(sneakersPair);
//     }
//     setAdded(!isAdded);
//   };

//   return (
//     <div className={styles.sneakersItem}>
//       <div className={styles.favorite}>
//         <img
//           className={styles.heart}
//           src="../source/icons/heart.svg"
//           alt="heart"
//         />
//       </div>
//       <img className={styles.item} src={sneakersPair.image} alt="sneakers" />
//       <div className="sneakers-item-info">
//         <a>
//           <p>{sneakersPair.title}</p>
//         </a>
//       </div>
//       <div className={styles.sneakersItemPriceInfo}>
//         <div className={styles.sneakersItemPriceDetails}>
//           <p className={styles.sneakersItemPriceTitle}>Price:</p>
//           <p className={styles.sneakersItemPrice}>{sneakersPair.price}</p>
//         </div>
//         <button className="plus" onClick={handleButtonClick}>
//           <img
//             src={isAdded ? "source/icons/check.svg" : "source/icons/plus.svg"}
//             alt="plus-button"
//           />
//         </button>
//       </div>
//     </div>
//   );
// }
