import useGlobalState from "../../hooks/useGlobalState";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { handleCart, total, favorites } = useGlobalState();
  return (
    <nav>
      <div className={styles.about}>
        <NavLink to={"/"} className={styles.navLink}>
          <img src="source/logo.svg" alt="logo" />
          <div className={styles.aboutInfo}>
            <h3>REACT SNEAKERS</h3>
            <p>The Best Sneakers Store</p>
          </div>
        </NavLink>
      </div>
      <ul className={styles.utils}>
        <li className={styles.utilsItem} onClick={handleCart}>
          <img src="source/icons/cart.svg" alt="cart" />
          <span>{total}$</span>
        </li>
        <li className={styles.utilsItem}>
          <NavLink to={"/favorites"} className={styles.navLink}>
            <img
              src={
                favorites.length > 0
                  ? "source/icons/heart-active.svg"
                  : "source/icons/heart.svg"
              }
              alt="favorites"
            />
            Favorites
          </NavLink>
        </li>
        <li className={styles.utilsItem}>
          <NavLink to={"/orders"} className={styles.navLink}>
            <img src="source/icons/orders.svg" alt="orders" />
            <span>Orders</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
