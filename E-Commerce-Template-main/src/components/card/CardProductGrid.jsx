import React, { useState, useEffect } from "react";

const CardProductGrid = ({ data, onWishlistToggle, isInWishlistProp }) => {
  const [isInWishlist, setIsInWishlist] = useState(isInWishlistProp);

  useEffect(() => {
    // Update local state if the isInWishlistProp changes
    setIsInWishlist(isInWishlistProp);
  }, [isInWishlistProp]);

  const handleWishlistToggle = () => {
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    onWishlistToggle(data._id, newWishlistState); // Notify parent to update wishlist
  };

  return (
    <div className="card">
      <img src={data.image} className="card-img-top" alt={data.name} />
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">{data.description}</p>
        <div>
          <span className="fw-bold h5">${data.price}</span>
        </div>

        {/* Heart button to toggle wishlist */}
        <div className="btn-group d-flex" role="group">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleWishlistToggle}
          >
            <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
