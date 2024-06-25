export default function Header() {
  return (
    <header>
      <div className="about">
        <img src="source/logo.svg" alt="logo" />
        <div className="aboutInfo">
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="utils">
        <li className="utils-item">
          <img width={18} height={18} src="source/icons/cart.svg" alt="cart" />
          <span>1205 $</span>
        </li>
        <li className="utils-item">
          <img
            width={18}
            height={18}
            src="source/icons/profile.svg"
            alt="profile"
          />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  );
}
