import { Link } from "react-router-dom";

const CardProductList = (props) => {
  const product = props.data;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
      cart.push({
        ...product,
        quantity: 1,
        price: { $numberDecimal: product.price.toString() }, // Ensure price matches expected structure
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingProduct = wishlist.find((item) => item._id === product._id);

    if (!existingProduct) {
      wishlist.push(product); // Add product to wishlist if it's not already there
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist.`);
    }
  };

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.image} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link
                to={{
                  pathname: product.link,
                }}
                state={{ id: product._id }}
              >
                {product.name}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key < product.star)
                    return (
                      <i
                        className="bi bi-star-fill text-warning me-1"
                        key={key}
                      />
                    );
                  else
                    return (
                      <i
                        className="bi bi-star-fill text-secondary me-1"
                        key={key}
                      />
                    );
                })}
            </div>
            {product.description &&
              !product.description.includes("|") && (
                <p className="small mt-2">{product.description}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">
                  ${product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "$" + product.discountPrice}
                </span>
              )}
            </div>
            {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )}

            <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
                onClick={addToCart}
              >
                <i className="bi bi-cart-plus" />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
                onClick={addToWishlist}
              >
                <i className="bi bi-heart-fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
