import useGlobalState from "../../hooks/useGlobalState";
import { NavLink } from "react-router-dom";
import useTotal from "../../hooks/useTotal";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { handleCart, favorites } = useGlobalState();
  const [total] = useTotal();
  return (
    <nav>
      <div className={styles.logo}>
        <NavLink to={"/"} className={styles.navLink}>
          <img src="source/logo.svg" alt="logo" />
          <div className={styles.logoTitle}>
            <h3>SNEAKERS ONLINE</h3>
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
              className={styles.utilImage}
              src={
                favorites.length > 0
                  ? "source/icons/heart-active.svg"
                  : "source/icons/heart.svg"
              }
              alt="favorites"
            />
            <span>Favorites</span>
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
