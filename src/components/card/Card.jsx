import useGlobalState from "../../hooks/useGlobalState";
import { useState } from "react";
import styles from "./Card.module.scss";
import axios from "axios";

export default function Card({ sneakersPair }) {
  const { addToCart } = useGlobalState();
  const [isAdded, setAdded] = useState(false);

  const onClickPlus = () => {
    setAdded(!isAdded);
  };

  return (
    <div className={styles.sneakersItem}>
      <div className={styles.favorite}>
        <img
          className={styles.heart}
          src="../source/icons/heart.svg"
          alt="heart"
        />
      </div>
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
        <button className="plus" onClick={() => addToCart(sneakersPair)}>
          <img
            src={!isAdded ? "source/icons/plus.svg" : "source/icons/check.svg"}
            // src="source/icons/plus.svg"
            alt="plus-button"
            onClick={onClickPlus}
          />
        </button>
      </div>
    </div>
  );
}
