import useGlobalState from "../../hooks/useGlobalState";
import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import axios from "axios";

export default function Card({ sneakersPair }) {
  const { isAdded, handleAdding, isFavorite, handleFavorites } =
    useGlobalState();

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
            alt="plus-button"
          />
        </button>
      </div>
    </div>
  );
}
