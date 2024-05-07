function Card({ product , onAddToCart }) {



    return (
      <div className="card">
        <img className="card-image" src={product.image} alt={product.name} />
        <h2 className="card-price">${product.price}</h2>
        <p className="card-name">{product.name}</p>
        {/* <button className="cartButton" type="button">Add to Cart</button> */}
        <button className="cartButton" type="button" onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    );
  }
  
  export default Card;