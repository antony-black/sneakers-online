import { useEffect, useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { HandleCardService } from "../../services/HandleCardService";
import { API_URLS } from "../../config/config";
import styles from "./Card.module.scss";

export default function Card({ sneakersPair, showControl = true }) {
  const {
    cartItems,
    setCartItems,
    favorites,
    setFavorites,
    isAdded,
    setAdded,
  } = useGlobalState();
  const [isFavorite, setIsFavorite] = useState({});

  useEffect(() => {
    HandleCardService.updateExistingItems(cartItems, setAdded);
    HandleCardService.updateExistingItems(favorites, setIsFavorite);
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
  //*TODO: rename
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
      {showControl && (
        <button
          className={styles.favorite}
          onClick={() => handleFavorites(sneakersPair)}
        >
          <img
            src={
              isFavorite[sneakersPair.image]
                ? "source/icons/heart-active.svg"
                : "source/icons/heart.svg"
            }
            alt="heart"
          />
        </button>
      )}

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
        {showControl && (
          <button className="plus" onClick={() => handleCart(sneakersPair)}>
            <img
              src={
                isAdded[sneakersPair.image]
                  ? "source/icons/check.svg"
                  : "source/icons/plus.svg"
              }
              alt="plus-button"
            />
          </button>
        )}
      </div>
    </div>
  );
}
