import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProductGrid = ({ data, onWishlistToggle, isInWishlistProp }) => {
  const [isInWishlist, setIsInWishlist] = useState(isInWishlistProp);
  const [isInCart, setIsInCart] = useState(false);
  const [remainingDiscountDays, setRemainingDiscountDays] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color as string
  const [selectedSize, setSelectedSize] = useState(""); // Track selected size as string

  useEffect(() => {
    setIsInWishlist(isInWishlistProp);
  }, [isInWishlistProp]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === data._id);
    setIsInCart(!!existingProduct);
  }, [data._id]);

  useEffect(() => {
    if (data.discount_end_date) {
      const now = new Date();
      const discountEndDate = new Date(data.discount_end_date);
      const timeDiff = discountEndDate - now;

      if (timeDiff > 0) {
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setRemainingDiscountDays(daysLeft);
      } else {
        setRemainingDiscountDays(0); // Discount has ended
      }
    }
  }, [data.discount_end_date]);

  const handleWishlistToggle = () => {
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    onWishlistToggle(data._id, newWishlistState); // Notify parent to update wishlist
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === data._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
      cart.push({
        ...data,
        quantity: 1,
        price: { $numberDecimal: data.price.toString() },
        selectedColor: selectedColor,
        selectedSize: selectedSize,
      });
      setIsInCart(true); // Update state to reflect item is in the cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${data.name} added to cart!`);
  };

  const priceFormatted = data.price && !isNaN(data.price)
    ? `$${parseFloat(data.price).toFixed(2)}`
    : "Price unavailable";

  const descriptionPreview = data.description
    ? data.description.slice(0, 100) + "..."
    : "No description available";

  return (
    <div
      className="card shadow-sm rounded mb-4"
      style={{ maxWidth: "18rem", transition: "transform 0.3s ease" }}
    >
      <div className="card-img-container position-relative">
        <img
          src={data.image}
          className="card-img-top"
          alt={data.name}
          style={{
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            transition: "transform 0.3s ease",
          }}
        />

        {data.stock === 0 && (
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2"
            style={{ fontSize: "0.85rem" }}
          >
            Sold Out
          </span>
        )}

        {data.discount > 0 && (
          <span
            className="badge bg-warning text-dark position-absolute top-0 end-0 m-2"
            style={{ fontSize: "0.85rem" }}
          >
            -{data.discount}%
          </span>
        )}

        {remainingDiscountDays !== null && remainingDiscountDays > 0 && (
          <span
            className="badge bg-info text-dark position-absolute bottom-0 start-50 translate-middle-x mb-2"
            style={{ fontSize: "0.85rem" }}
          >
            Ends in {remainingDiscountDays} day{remainingDiscountDays > 1 ? "s" : ""}
          </span>
        )}

        <div className="wishlist-icon position-absolute top-0 end-0 p-2">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</Tooltip>
            }
          >
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleWishlistToggle}
              style={{ backgroundColor: "transparent", border: "none" }}
              disabled={data.soldOut}
            >
              <i
                className={`bi ${isInWishlist ? "bi-heart-fill" : "bi-heart"}`}
                style={{ fontSize: "1.5rem" }}
              />
            </button>
          </OverlayTrigger>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title text-truncate" style={{ fontSize: "1.25rem" }}>
          <Link to={{ pathname: data.link }} state={{ id: data._id }}>
            {data.name}
          </Link>
        </h5>

        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
          {descriptionPreview}
        </p>

        <div>
          <span className="fw-bold h5">{priceFormatted}</span>
          {data.originPrice > 0 && (
            <del className="small text-muted ms-2">${data.originPrice.toFixed(2)}</del>
          )}
        </div>

        {/* Color Options */}
        {data.color && data.color.length > 0 && (
          <div className="mb-2">
            <span className="fw-bold">Colors:</span>
            <div className="d-flex flex-wrap">
              {data.color.map((color, idx) => (
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
              ))}
            </div>
          </div>
        )}

        {/* Size Options */}
        {data.size && data.size.length > 0 && (
          <div className="mb-2">
            <span className="fw-bold">Sizes:</span>
            <div className="d-flex flex-wrap">
              {data.size.map((size, idx) => (
                <label key={idx} className="me-2">
                  <input
                    type="radio"
                    name={`size-${data._id}`}
                    value={size.name}
                    checked={selectedSize === size.name} // Check if size is selected
                    onChange={() => setSelectedSize(size.name)} // Select size
                    className="me-2"
                  />
                  {size.name}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* {isInCart ? (
          <button
            type="button"
            className="btn btn-secondary mt-2"
            disabled
            title="Already in Cart"
          >
            <i className="bi bi-cart-check" /> Already in Cart
          </button>
        ) : ( */}
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={addToCart}
            title="Add to Cart"
            disabled={data.soldOut || !selectedColor || !selectedSize}
          >
            <i className="bi bi-cart-plus" /> Add to Cart
          </button>
        
      </div>
    </div>
  );
};

export default CardProductGrid;
