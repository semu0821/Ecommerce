import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterSize = ({ onSizeFilterChange }) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeCount, setSizeCount] = useState(0);

  useEffect(() => {
    // Fetch sizes from the backend
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`https://modestserver.onrender.com/api/colorsize/sizes`);
        const fetchedSizes = response.data;
        setSizes(fetchedSizes);

        // Count the number of distinct sizes
        setSizeCount(fetchedSizes.length);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
      }
    };

    fetchSizes();
  }, []);

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
        Size ({sizeCount})
      </div>
      <ul className="list-group list-group-flush show" id="filterSize">
        {sizes.map((size) => (
          <li className="list-group-item" key={size._id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexCheckSize-${size.name}`}
                onChange={() => handleSizeChange(size.name)}
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheckSize-${size.name}`}
              >
                {size.name} <span className="text-muted">({size.count})</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSize;
