import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs"; // For the cart icon
import { FaStar, FaRegStar } from "react-icons/fa"; // For the rating stars

const ProductDetailView = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // For quantity selector
  const [isZoomed, setIsZoomed] = useState(false); // For image zoom effect
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://modestserver.onrender.com/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false); // Handle missing ID case gracefully
    }
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to the cart.`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!product) {
    return <div className="alert alert-warning text-center" role="alert">Product not found.</div>;
  }

  // Calculate the total price based on quantity
  const totalPrice = (parseFloat(product.price.$numberDecimal) * quantity).toFixed(2);
  const discountedPrice = product.discount > 0
    ? (parseFloat(product.discount.$numberDecimal) * quantity).toFixed(2)
    : null;

  // Handle zoom in/out effect for the product image
  const handleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image with Zoom effect */}
        <div className="col-md-6">
          <div
            className={`product-image ${isZoomed ? "zoomed" : ""}`}
            onMouseEnter={handleZoom}
            onMouseLeave={handleZoom}
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="display-4 text-dark">{product.name}</h1>
            <p className="text-muted">{product.description}</p>

            {/* Rating Section */}
            <div className="product-rating my-3">
              <p className="mb-0">
                {Array(5)
                  .fill()
                  .map((_, index) => {
                    return index < product.star ? (
                      <FaStar key={index} className="text-warning" />
                    ) : (
                      <FaRegStar key={index} className="text-muted" />
                    );
                  })}
              </p>
            </div>

            {/* Price Information */}
            <div className="price-info my-4">
              <p className="h4 text-success">
                Price: ${parseFloat(product.price.$numberDecimal).toFixed(2)}
              </p>
              {product.discount > 0 && (
                <p className="h4 text-danger">
                  <strong>Discounted Price:</strong> ${parseFloat(product.discount.$numberDecimal).toFixed(2)}
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector my-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-3">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Total Price Calculation */}
            <div className="total-price my-3">
              <p className="h5">
                Total Price: ${totalPrice}
                {discountedPrice && (
                  <span className="text-danger ms-2">(${discountedPrice} after discount)</span>
                )}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn btn-lg btn-primary mt-3 shadow"
              style={{ borderRadius: "30px" }}
              onClick={addToCart}
            >
              <BsCartPlus className="me-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;