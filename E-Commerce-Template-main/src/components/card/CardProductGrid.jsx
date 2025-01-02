// CardProductGrid.js
import React, { useState } from "react";

const CardProductGrid = ({ data, onWishlistToggle }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    onWishlistToggle(data._id, !isInWishlist); // Call parent method to update the wishlist
  };

  return (
    <div className="card">
      <img src={data.image_url} className="card-img-top" alt={data.name} />
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
