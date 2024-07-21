import { useState } from "react";
import styles from "./Card.module.scss";

export default function Card(props) {
  const [isAdded, setAdded] = useState(false);

  const onAdd = () => {
    setAdded(!isAdded);
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
      <img className={styles.item} src={props.image} alt="sneakers" />
      <div className="sneakers-item-info">
        <a>
          <p>{props.title}</p>
        </a>
      </div>
      <div className={styles.sneakersItemPriceInfo}>
        <div className={styles.sneakersItemPriceDetails}>
          <p className={styles.sneakersItemPriceTitle}>Price:</p>
          <p className={styles.sneakersItemPrice}>{`${props.price}$`}</p>
        </div>
        <button className="plus" onClick={onAdd}>
          {/* {console.log(isAdded)} */}
          <img
            src={!isAdded ? "source/icons/plus.svg" : "source/icons/check.svg"}
            alt="plus-button"
          />
        </button>
      </div>
    </div>
  );
}
