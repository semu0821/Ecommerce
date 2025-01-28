import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const CardProductList = (props) => {
  const { user } = useContext(AuthContext);
  const product = props.data;

  const [isInCart, setIsInCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [remainingDiscountDays, setRemainingDiscountDays] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);
    setIsInCart(!!existingProduct);
  }, [product._id]);

  useEffect(() => {
    if (product.discount_end_date) {
      const now = new Date();
      const discountEndDate = new Date(product.discount_end_date);
      const timeDiff = discountEndDate - now;

      if (timeDiff > 0) {
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setRemainingDiscountDays(daysLeft);
      } else {
        setRemainingDiscountDays(0);
      }
    }
  }, [product.discount_end_date]);

  const addToCart = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => (item._id === product._id));

    // if (existingProduct) {
    //   existingProduct.quantity += 1;
    // } else {
      cart.push({
        ...product,
        quantity: 1,
        selectedColor,
        selectedSize,
        price: { $numberDecimal: product.price.toString() },
      });
    // }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsInCart(true);
    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = async () => {
    try {
      const response = await axios.get(
        `https://modestserver.onrender.com/api/revwish/wishlist/${user._id}`
      );

      const existingProduct = response.data.find(
        (item) => item.product._id === product._id
      );

      if (existingProduct) {
        alert(`${product.name} is already in your wishlist.`);
        return;
      }

      await axios.post(
        `https://modestserver.onrender.com/api/revwish/wishlist`,
        { user: user._id, product: product._id }
      );

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      alert(`${product.name} added to wishlist!`);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("There was an error adding the product to your wishlist. Please try again.");
    }
  };

  return (
    <div className="card product-card shadow-lg mb-4">
      <div className="row g-0">
        <div className="col-md-5 text-center p-3">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded-3"
            style={{ objectFit: "cover", height: "300px", width: "100%" }}
          />
          {product.stock === 0 && (
            <div className="badge bg-danger position-absolute top-0 start-0 m-3">
              Sold Out
            </div>
          )}
        </div>
        <div className="col-md-7 p-3 d-flex flex-column justify-content-between">
          <div className="card-body">
            <h5 className="card-title mb-2">
              <Link to={{ pathname: product.link }} state={{ id: product._id }}>
                {product.name}
              </Link>
            </h5>

            {product.color && product.color.length > 0 && (
              <div className="mb-3">
                <span className="fw-bold">Colors:</span>
                <div className="d-flex flex-wrap">
                  {product.color.map((color, idx) => (
                    <label key={idx} className="me-3 d-flex align-items-center">
                      {/* Radio button for selecting color */}
                      <input
                        type="radio"
                        name={`color-${product._id}`}
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                        className="me-2"
                      />
                      <div
                        className="color-box"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: color,
                          border: "1px solid #ccc",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </label>
                  ))}
                </div>
              </div>
            )}

{product.size && product.size.length > 0 && (
  <div className="mb-3">
    <span className="fw-bold">Sizes:</span>
    <div className="d-flex flex-wrap">
      {product.size.map((size, idx) => (
        <label key={idx} className="me-3">
          {/* Radio button for selecting size */}
          <input
            type="radio"
            name={`size-${product._id}`}
            value={size.name} // Use size.name for the value
            checked={selectedSize === size.name} // Check against size.name
            onChange={() => setSelectedSize(size.name)} // Update state with size.name
            className="me-2"
          />
          {size.name}
        </label>
      ))}
    </div>
  </div>
)}


            {remainingDiscountDays !== null && remainingDiscountDays > 0 && (
              <p className="badge bg-warning text-dark">
                Discount ends in {remainingDiscountDays} day
                {remainingDiscountDays > 1 ? "s" : ""}
              </p>
            )}
          </div>

          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="price-section">
              <span className="fw-bold h4">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">${product.originPrice}</del>
              )}
              {product.discount > 0 && (
                <span className="badge bg-warning text-dark ms-2 small">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          <div className="btn-group d-flex flex-column" role="group">
            {/* {isInCart ? (
              <button
                type="button"
                className="btn btn-secondary mb-2"
                disabled
              >
                <i className="bi bi-cart-check" /> Already in Cart
              </button>
            ) : ( */}
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={addToCart}
              >
                <i className="bi bi-cart-plus" /> Add to Cart
              </button>
            
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={addToWishlist}
            >
              <i className="bi bi-heart-fill" /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
