import { useEffect, useState } from "react";

const CardProductList2 = ({ data, review }) => {
  const [product, setProduct] = useState(data);

  useEffect(() => {
    // If you need to fetch additional data for a product from an API
    // you can add the API call here. For now, assume `data` is already
    // passed as a prop.
  }, [data]);

  return (
    <div className="card">
      <img src={product.image_url} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div>
          <span className="fw-bold h5">${product.price.$numberDecimal}</span>
          <span className="ms-2">
            {Array.from({ length: product.star }, (_, idx) => (
              <i className="bi bi-star-fill text-warning me-1" key={idx} />
            ))}
          </span>
        </div>
        {review && (
          <div className="my-3">
            <h6>Review</h6>
            <div>
              <span className="fw-bold">Rating:</span> {review.rating} / 5
            </div>
            <p>{review.comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProductList2;
