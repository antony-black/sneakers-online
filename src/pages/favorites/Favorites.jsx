import useGlobalState from "../../hooks/useGlobalState";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import ItemsInfo from "../../components/ItemsInfo/ItemsInfo";
import { FetchService } from "../../services/FetchService";
import { Utils } from "../../utils/Utils";
import styles from "./Favorite.module.scss";

export default function Favorites() {
  const { favorites, favPending, favErrorMsg } = useGlobalState();
  const navigate = useNavigate();

  return (
    <div className={styles.favoritesContainer}>
      {favErrorMsg ? (
        <div className="error-msg">{`${favErrorMsg}!!!`}</div>
      ) : null}

       { favorites.length > 0 && (
            <div className={styles.turnBackContainer}>
              <NavLink to={"/"}>
                <button className={styles.turnBack}>
                  <img src="source/icons/arrow-back-page.svg" alt="turn-back" />
                </button>
              </NavLink>
              <h2 className={styles.turnBackTitle}>Favorites</h2>
            </div>
          )}

       <div className={styles.favorites}>
        {favorites?.length > 0 ? (
          favorites.map((favItem) => (
            <Card key={favItem.id} sneakersPair={favItem} />
          ))
        ) : (
          <ItemsInfo
            className={styles.itemsInfo}
            title="No favorites."
            text="You nothing added yet"
            image="source/cart/fav_sad_emodzy.svg"
            onClick={() => Utils.handleBackHome(navigate)}
          />
        )}
      </div>
    </div>
  );
}
