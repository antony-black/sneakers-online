import { useState } from "react";
import styles from "./Card.module.scss";
import { isElementOfType } from "react-dom/test-utils";

export default function Card({ item, handleCart }) {
  // const { addToCart } = useGlobalState();
  const [localIsAdded, setLocalIsAdded] = useState(false);

  const onAdd = (item) => {
    setLocalIsAdded(!localIsAdded);
    handleCart(item);
  };

  return (
    <div className={styles.sneakersItem}>
      <div className={styles.favorite}>
        <img
          className={styles.unliked}
          src="../source/icons/heart.svg"
          alt="unliked"
        />
      </div>
      <img className={styles.item} src={item.image} alt="sneakers" />
      <div className="sneakers-item-info">
        <a>
          <p>{item.title}</p>
        </a>
      </div>
      <div className={styles.sneakersItemPriceInfo}>
        <div className={styles.sneakersItemPriceDetails}>
          <p className={styles.sneakersItemPriceTitle}>Price:</p>
          <p className={styles.sneakersItemPrice}>{`${item.price}$`}</p>
        </div>
        <button className="plus" onClick={() => onAdd(item)}>
          <img
            src={
              !localIsAdded ? "source/icons/plus.svg" : "source/icons/check.svg"
            }
            alt="plus-button"
          />
        </button>
      </div>
    </div>
  );
}
