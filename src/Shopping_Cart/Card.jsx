import React, { useState } from "react";

function Card({ product, onAddToCart }) {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    onAddToCart(product);
    setCounter(counter + 1);
  };

  return (
    <div className="card">
      <img className="card-image" src={product.image} alt={product.name} />
      <h2 className="card-price">₱{product.price}</h2>
      <p className="card-price">Stock: {product.qty}</p>
      <p className="card-name">{product.name} </p>
      { product.qty >= 0 && (product.qty - counter) >= 1 ? 
            <button className="cartButton" type="button" onClick={handleClick}>
            Add to Cart
          </button> : <button className="cartButtonNone">Out of Stock</button>
      }

    </div>
  );
}

export default Card;
