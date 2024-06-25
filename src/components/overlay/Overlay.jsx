export default function Overlay() {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Cart</h2>
        <div className="cart-items">
          <div className="cart-item">
            <img width={70} height={70} src="../source/sneakers/item-1.jpg" />
            <div className="cart-item-about">
              <p>Male sneakers Nike Blazer Mid Suede</p>
              <p className="cart-item-price">270 $</p>
            </div>
            <div className="cart-remove">
              <img src="../source/icons/remove-btn.svg" alt="remove" />
            </div>
          </div>
        </div>
        <div className="cart-total">
          <ul>
            <li className="cart-total-item">
              <span>Total:</span>
              <div className="dash"></div>
              <b>234 $</b>
            </li>
            <li className="cart-total-item">
              <span>Tax 5%:</span>
              <div className="dash"></div>
              <b>11.5 $</b>
            </li>
          </ul>
          <button className="greenButton">
            Checkout
            <img src="../source/icons/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
