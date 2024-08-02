import useGlobalState from "../../hooks/useGlobalState";
import styles from "./Header.module.scss";

export default function Header() {
  const { setCartOpen, total } = useGlobalState();
  return (
    <header>
      <div className={styles.about}>
        <img src="source/logo.svg" alt="logo" />
        <div className={styles.aboutInfo}>
          <h3>REACT SNEAKERS</h3>
          <p>The Best Sneakers Store</p>
        </div>
      </div>
      <ul className={styles.utils}>
        <li className={styles.utilsItem} onClick={() => setCartOpen(true)}>
          <img src="source/icons/cart.svg" alt="cart" />
          <span>{total} $</span>
        </li>
        <li className={styles.utilsItem}>
          <img src="source/icons/heart.svg" alt="favorites" />
          <span>Favorites</span>
        </li>
        <li className={styles.utilsItem}>
          <img src="source/icons/profile.svg" alt="profile" />
          <span>User</span>
        </li>
      </ul>
    </header>
  );
}
