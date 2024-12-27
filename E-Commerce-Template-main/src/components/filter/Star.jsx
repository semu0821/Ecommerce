const FilterStar = ({ onRatingFilterChange }) => {
  const handleRatingChange = (rating) => {
    onRatingFilterChange(rating);
  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterStar"
        aria-expanded="true"
        aria-controls="filterStar"
      >
        Customer Review
      </div>
      <div className="card-body show" id="filterStar">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div className="form-check" key={rating}>
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id={`rating-${rating}`}
              onChange={() => handleRatingChange(rating)}
            />
            <label className="form-check-label" htmlFor={`rating-${rating}`}>
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`bi bi-star-fill ${
                    index < rating ? "text-warning" : "text-secondary"
                  } me-1 mb-2`}
                />
              ))}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterStar;
