export default function Card() {
  return (
    <div className="sneakers-item">
      <div className="favorite">
        <img
          width={16}
          height={16}
          src="../source/icons/heart.svg"
          alt="unliked"
        />
      </div>
      <img className="item" src="source/sneakers/item-1.jpg" alt="sneakers" />
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
  );
}
