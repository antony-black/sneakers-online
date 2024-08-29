import { useEffect, useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { HandleCardService } from "../../services/HandleCardService";
import { API_URLS } from "../../config/config";
import styles from "./Card.module.scss";

export default function Card({ sneakersPair }) {
  const { cartItems, setCartItems, favorites, setFavorites } = useGlobalState();
  const [isAdded, setAdded] = useState({});
  const [isFavorite, setIsFavorite] = useState({});

  useEffect(() => {
    cartItems.forEach((cartItem) =>
      setAdded((prev) => ({ ...prev, [cartItem.image]: true }))
    );

    favorites.forEach((favItem) =>
      setIsFavorite((prev) => ({ ...prev, [favItem.image]: true }))
    );
  }, [cartItems, favorites]);

  const handleFavorites = (sneakersPair) => {
    HandleCardService.manageItem(
      sneakersPair,
      favorites,
      API_URLS.favorites,
      setFavorites,
      setIsFavorite
    );
  };
  const handleCart = (sneakersPair) => {
    HandleCardService.manageItem(
      sneakersPair,
      cartItems,
      API_URLS.cart,
      setCartItems,
      setAdded
    );
  };

  return (
    <div className={styles.sneakersItem}>
      <button
        className={styles.favorite}
        onClick={() => handleFavorites(sneakersPair)}
      >
        <img
          src={
            !isFavorite[sneakersPair.image]
              ? "source/icons/heart.svg"
              : "source/icons/heart-active.svg"
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
        <button className="plus" onClick={() => handleCart(sneakersPair)}>
          <img
            src={
              !isAdded[sneakersPair.image]
                ? "source/icons/plus.svg"
                : "source/icons/check.svg"
            }
            alt="plus-button"
          />
        </button>
      </div>
    </div>
  );
}
