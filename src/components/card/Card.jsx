import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Card.module.scss";

export default function Card({ item }) {
  return (
    <div className={styles.sneakersItem}>
      <div className={styles.favorite}>
        <img
          className={styles.heart}
          src="../source/icons/heart.svg"
          alt="heart"
        />
      </div>
      <img
        className={styles.item}
        src={"../../../source/sneakers/item-1.jpg"}
        alt="sneakers"
      />
      <div className="sneakers-item-info">
        <a>
          <p>title</p>
        </a>
      </div>
      <div className={styles.sneakersItemPriceInfo}>
        <div className={styles.sneakersItemPriceDetails}>
          <p className={styles.sneakersItemPriceTitle}>Price:</p>
          <p className={styles.sneakersItemPrice}>price</p>
        </div>
        <button className="plus" onClick={() => handleCart(item)}>
          <img src="source/icons/plus.svg" alt="plus-button" />
        </button>
      </div>
    </div>
  );
}
