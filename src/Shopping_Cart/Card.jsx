import React from "react";

function Card({ product, onAddToCart }) {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="card">
      <img className="card-image" src={product.image} alt={product.name} />
      <h2 className="card-price">${product.price}</h2>
      <p className="card-price">Stock: {product.qty}</p>
      <p className="card-name">{product.name}</p>
      <button className="cartButton" type="button" onClick={handleClick}>
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
