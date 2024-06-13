function App() {
  return (
    <div className="App">
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
            <img
              width={18}
              height={18}
              src="source/icons/cart.svg"
              alt="cart"
            />
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
      <div className="content">
        <h1 className="title">All sneakers</h1>
        <div className="sneakers">
          <div className="sneakers-item">
            <img
              className="item"
              src="source/sneakers/item-1.jpg"
              alt="sneakers"
            />
            <div className="sneakers-item-info">
              <a>
                <p>Male sneakers</p>
                <p>Nike Blazer Mid Suede</p>
              </a>
            </div>
            <div className="sneakers-item-price-info">
              <div className="sneakers-item-price-details">
                <p className="sneakers-item-price-title">Price:</p>
                <p className="sneakers-item-price">270 $</p>
              </div>
              <button className="plus">
                <img src="source/icons/plus.svg" alt="plus-button" />
              </button>
            </div>
          </div>
          <div className="sneakers-item">
            <img
              className="item"
              src="source/sneakers/item-2.jpg"
              alt="sneakers"
            />
            <div className="sneakers-item-info">
              <a>
                <p>Male sneakers</p>
                <p>Nike Blazer Mid Suede</p>
              </a>
            </div>
            <div className="sneakers-item-price-info">
              <div className="sneakers-item-price-details">
                <p className="sneakers-item-price-title">Price:</p>
                <p className="sneakers-item-price">270 $</p>
              </div>
              <button className="plus">
                <img src="source/icons/plus.svg" alt="plus-button" />
              </button>
            </div>
          </div>
          <div className="sneakers-item">
            <img
              className="item"
              src="source/sneakers/item-3.jpg"
              alt="sneakers"
            />
            <div className="sneakers-item-info">
              <a>
                <p>Male sneakers</p>
                <p>Nike Blazer Mid Suede</p>
              </a>
            </div>
            <div className="sneakers-item-price-info">
              <div className="sneakers-item-price-details">
                <p className="sneakers-item-price-title">Price:</p>
                <p className="sneakers-item-price">270 $</p>
              </div>
              <button className="plus">
                <img src="source/icons/plus.svg" alt="plus-button" />
              </button>
            </div>
          </div>
          <div className="sneakers-item">
            <img
              className="item"
              src="source/sneakers/item-4.jpg"
              alt="sneakers"
            />
            <div className="sneakers-item-info">
              <a>
                <p>Male sneakers</p>
                <p>Nike Blazer Mid Suede</p>
              </a>
            </div>
            <div className="sneakers-item-price-info">
              <div className="sneakers-item-price-details">
                <p className="sneakers-item-price-title">Price:</p>
                <p className="sneakers-item-price">270 $</p>
              </div>
              <button className="plus">
                <img src="source/icons/plus.svg" alt="plus-button" />
              </button>
            </div>
          </div>
          <div className="sneakers-item">
            <img
              className="item"
              src="source/sneakers/item-5.jpg"
              alt="sneakers"
            />
            <div className="sneakers-item-info">
              <a>
                <p>Male sneakers</p>
                <p>Nike Blazer Mid Suede</p>
              </a>
            </div>
            <div className="sneakers-item-price-info">
              <div className="sneakers-item-price-details">
                <p className="sneakers-item-price-title">Price:</p>
                <p className="sneakers-item-price">270 $</p>
              </div>
              <button className="plus">
                <img src="source/icons/plus.svg" alt="plus-button" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
