import React, { useState } from "react";

const FilterPrice = ({ onChange }) => {
  const [selectedRanges, setSelectedRanges] = useState([]);

  const priceRanges = [
    { label: "< $100.00", range: [0, 100] },
    { label: "$100.00 - $500.00", range: [101, 500] },
    { label: "$501.00 - $2000.00", range: [501, 2000] },
    { label: ">$2000.00", range: [2000.01, Infinity]},
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
                {label} 
                {/* <span className="text-muted">({count})</span> */}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPrice;
