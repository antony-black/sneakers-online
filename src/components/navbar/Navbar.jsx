import useGlobalState from "../../hooks/useGlobalState";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { handleCart } = useGlobalState();
  return (
    <nav>
      <div className={styles.about}>
        <img src="source/logo.svg" alt="logo" />
        <div className={styles.aboutInfo}>
          <h3>REACT SNEAKERS</h3>
          <p>The Best Sneakers Store</p>
        </div>
      </div>
      <ul className={styles.utils}>
        <li className={styles.utilsItem} onClick={handleCart}>
          <img src="source/icons/cart.svg" alt="cart" />
          <span>Total 0$</span>
        </li>
        <li className={styles.utilsItem}>
          <img src="source/icons/heart.svg" alt="favorites" />
          Favorites
        </li>
        <li className={styles.utilsItem}>
          <img src="source/icons/profile.svg" alt="profile" />
          <span>User</span>
        </li>
      </ul>
    </nav>
  );
}
