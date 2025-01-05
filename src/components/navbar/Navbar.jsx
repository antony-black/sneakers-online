import { useEffect } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import LoginForm from "../loginForm/LoginForm";
import { NavLink } from "react-router-dom";
import useTotal from "../../hooks/useTotal";
import styles from "./Navbar.module.scss";
import { observer } from "mobx-react-lite";

// TODO: 1:31
function Navbar() {
  const { handleCartVisibility, favorites, store } = useGlobalState();
  const [total] = useTotal();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);

  return (
    <nav>
      <div className={styles.logo}>
        <NavLink to={"/"} className={styles.navLink}>
          <img src="source/logo.svg" alt="logo" />
          <div className={styles.logoTitle}>
            <h1>{store.isAuth ? `The user is autorized ${store.user.email}` : 'GET AUTORIZED!'}</h1>
            <h3>SNEAKERS ONLINE</h3>
            <p>The Best Sneakers Store</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.test}>
      <LoginForm/>
      <ul className={styles.utils}>
        <li className={styles.utilsItem} onClick={handleCartVisibility}>
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
      </div>
    </nav>
  );
}

export default observer(Navbar);
