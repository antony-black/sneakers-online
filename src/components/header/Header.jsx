import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <div className={styles.about}>
        <img src="source/logo.svg" alt="logo" />
        <div className={styles.aboutInfo}>
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className={styles.utils}>
        <li className={styles.utilsItem}>
          <img src="source/icons/cart.svg" alt="cart" />
          <span>1205 $</span>
        </li>
        <li className={styles.utilsItem}>
          <img src="source/icons/profile.svg" alt="profile" />
          <span>User</span>
        </li>
      </ul>
    </header>
  );
}
