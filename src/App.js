function App() {
  return (
    <div className="App">
      <header>
        <div className="about">
          <img src="source/logo.svg" />
          <div className="aboutInfo">
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="utils">
          <li className="utils-item">
            <img width={18} height={18} src="source/icons/cart.svg" />
            <span>1205 $</span>
          </li>
          <li className="utils-item">
            <img width={18} height={18} src="source/icons/profile.svg" />
            <span>Профиль</span>
          </li>
        </ul>
      </header>
      <div className="content">
        <h1 className="title">All sneakers</h1>
        <div className="sneakers">
          <div className="sneakers-item">
            <img src="source/sneakers/item-1.jpg" />
            <div>
              <p>Male sneakers</p>
              <p>Nike Blazer Mid Suede</p>
            </div>
            <div>
              <p>Price</p>
              <p>270$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
