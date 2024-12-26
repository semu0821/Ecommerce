import React, { useState } from "react";

const FilterPrice = ({ onChange }) => {
  const [selectedRanges, setSelectedRanges] = useState([]);

  const priceRanges = [
    { label: "$24.00 - $29.00", range: [24, 29], count: 4 },
    { label: "$33.00 - $35.00", range: [33, 35], count: 2 },
    { label: "$70.00 - $99.00", range: [70, 99], count: 5 },
  ];

  const handleCheckboxChange = (range) => {
    const isSelected = selectedRanges.some(
      (selectedRange) => selectedRange[0] === range[0] && selectedRange[1] === range[1]
    );

    const newSelectedRanges = isSelected
      ? selectedRanges.filter(
          (selectedRange) => selectedRange[0] !== range[0] || selectedRange[1] !== range[1]
        )
      : [...selectedRanges, range];

    setSelectedRanges(newSelectedRanges);
    onChange(newSelectedRanges); // Pass the selected ranges to the parent
  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        {priceRanges.map(({ label, range, count }, index) => (
          <li className="list-group-item" key={index}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexCheckDefault${index + 1}`}
                checked={selectedRanges.some(
                  (selectedRange) => selectedRange[0] === range[0] && selectedRange[1] === range[1]
                )}
                onChange={() => handleCheckboxChange(range)}
              />
              <label className="form-check-label" htmlFor={`flexCheckDefault${index + 1}`}>
                {label} <span className="text-muted">({count})</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPrice;
