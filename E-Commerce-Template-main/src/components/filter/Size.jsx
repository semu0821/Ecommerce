import React, { useState } from "react";

const FilterSize = ({ onSizeFilterChange }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updatedSizes);
    onSizeFilterChange(updatedSizes); // Notify parent
  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterSize"
        aria-expanded="true"
        aria-controls="filterSize"
      >
        Size
      </div>
      <ul className="list-group list-group-flush show" id="filterSize">
        {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
          <li className="list-group-item" key={size}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexCheckSize-${size}`}
                onChange={() => handleSizeChange(size)}
              />
              <label className="form-check-label" htmlFor={`flexCheckSize-${size}`}>
                {size} <span className="text-muted">(count)</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSize;
