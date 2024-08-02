import useGlobalState from "../../hooks/useGlobalState";
import Card from "../../components/card/Card";
import styles from "./Favorite.module.scss";

export default function Favorites() {
  const { favorites } = useGlobalState();

  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.favorites}>
        {favorites?.length > 0 ? (
          favorites.map((favItem) => <Card key={favItem.id} item={favItem} />)
        ) : (
          <div className={styles.favoritesPopUp}>
            <p className={styles.favoritesPopUpText}>{`Nothing added yet:)`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
