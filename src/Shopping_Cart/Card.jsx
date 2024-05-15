function Card({ product, addProduct, onAddToCart }) {

  const handleClick = () => {
    onAddToCart(product);
    // console.log("TEST");
    console.log(product)
    const test = addProduct(product);
    console.log(test);
  };

    //bbl drizzy
  return (
    <div className="card">
      <img className="card-image" src={product.image} alt={product.name} />
      <h2 className="card-price">${product.price}</h2>
      <p className="card-name">{product.name}</p>
      <button className="cartButton" type="button" onClick={handleClick}>
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
