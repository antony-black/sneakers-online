import styles from "./Card.module.scss";

export default function Card() {
  return (
    <div className={styles.sneakersItem}>
      <div className={styles.favorite}>
        <img
          className={styles.unliked}
          src="../source/icons/heart.svg"
          alt="unliked"
        />
      </div>
      <img
        className={styles.item}
        src="source/sneakers/item-1.jpg"
        alt="sneakers"
      />
      <div className="sneakers-item-info">
        <a>
          <p>Male sneakers</p>
          <p>Nike Blazer Mid Suede</p>
        </a>
      </div>
      <div className={styles.sneakersItemPriceInfo}>
        <div className={styles.sneakersItemPriceDetails}>
          <p className={styles.sneakersItemPriceTitle}>Price:</p>
          <p className={styles.sneakersItemPrice}>270 $</p>
        </div>
        <button className="plus">
          <img src="source/icons/plus.svg" alt="plus-button" />
        </button>
      </div>
    </div>
  );
}
