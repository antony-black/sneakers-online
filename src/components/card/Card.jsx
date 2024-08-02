import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Card.module.scss";

export default function Card({ item }) {
  const { handleCart, isAdded, isFavoriteAdded, handleFavorites } =
    useGlobalState();

  return (
    <div className={styles.sneakersItem}>
      <div className={styles.favorite}>
        <img
          className={styles.heart}
          onClick={() => handleFavorites(item)}
          src={
            !isFavoriteAdded[item.id]
              ? "../source/icons/heart.svg"
              : "../source/icons/heart-active.svg"
          }
          alt="heart"
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
        <button className="plus" onClick={() => handleCart(item)}>
          <img
            src={
              !isAdded[item.id]
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
