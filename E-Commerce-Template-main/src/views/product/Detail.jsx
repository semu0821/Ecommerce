import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductDetailView = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://modestserver.onrender.com/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false);
      setError("Product ID is missing.");
    }
  }, [id]);

  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size before adding to the cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(product)
    const existingItemIndex = cart.findIndex(
      (item) =>
        item._id === product._id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: parseFloat(product.price.$numberDecimal),
        discount: product.discount
          ? parseFloat(product.discount.$numberDecimal)
          : 0,
        image: product.image,
        selectedColor,
        selectedSize,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to the cart.`);
  };

  const totalPrice = (
    parseFloat(product?.price?.$numberDecimal || 0) * quantity
  ).toFixed(2);

  const discountedPrice =
    product?.discount && product.discount.$numberDecimal > 0
      ? (
          parseFloat(product.discount.$numberDecimal) * quantity
        ).toFixed(2)
      : null;

  const handleZoom = () => setIsZoomed(!isZoomed);

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
    return (
      <div className="alert alert-warning text-center" role="alert">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div
            className={`product-image ${isZoomed ? "zoomed" : ""}`}
            onMouseEnter={handleZoom}
            onMouseLeave={handleZoom}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-3"
              style={{ objectFit: "cover", height: "300px", width: "100%" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="display-4 text-dark">{product.name}</h1>
            <p className="text-muted">{product.description}</p>
            <div className="product-rating my-3">
              <p className="mb-0">
                {Array(5)
                  .fill()
                  .map((_, index) =>
                    index < product.star ? (
                      <FaStar key={index} className="text-warning" />
                    ) : (
                      <FaRegStar key={index} className="text-muted" />
                    )
                  )}
              </p>
            </div>
            {product.isSoldOut && (
              <p className="text-danger fw-bold">
                This product is currently sold out.
              </p>
            )}
            <div className="price-info my-4">
              <p className="h4 text-success">
                Price: ${parseFloat(product.price?.$numberDecimal || 0).toFixed(2)}
              </p>
              {product.discount > 0 && (
                <p className="h4 text-danger">
                  Discounted Price: $
                  {parseFloat(product.discount?.$numberDecimal || 0).toFixed(2)}
                </p>
              )}
            </div>
            <div className="my-3">
              <h5>Available Colors:</h5>
              {product.color && product.color.length > 0 ? (
                product.color.map((color, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`color-${idx}`}
                      name="color"
                      value={color.name}
                      checked={selectedColor === color.name}
                      onChange={() => setSelectedColor(color.name)}
                      
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`color-${idx}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: color.name,
                          display: "inline-block",
                          border: "1px solid #ddd",
                        }}
                      ></span>
                      {color.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-muted">No colors available.</p>
              )}
            </div>
            <div className="my-3">
              <h5>Available Sizes:</h5>
              {product.size && product.size.length > 0 ? (
                product.size.map((size, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`size-${idx}`}
                      name="size"
                      value={size.name}
                      checked={selectedSize === size.name}
                      onChange={() => setSelectedSize(size.name)}
                    />
                    <label className="form-check-label" htmlFor={`size-${idx}`}>
                      {size.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-muted">No sizes available.</p>
              )}
            </div>
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
            <div className="total-price my-3">
              <p className="h5">
                Total Price: ${totalPrice}
                {discountedPrice && (
                  <span className="text-danger ms-2">
                    (${discountedPrice} after discount)
                  </span>
                )}
              </p>
            </div>
            <button
              className="btn btn-lg btn-primary mt-3 shadow"
              style={{ borderRadius: "30px" }}
              onClick={addToCart}
              disabled={!selectedColor || !selectedSize}
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
