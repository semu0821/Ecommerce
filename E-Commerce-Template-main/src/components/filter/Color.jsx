import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterColor = ({ onColorFilterChange }) => {
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);

  // Fetch colors from the backend
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(
          `https://modestserver.onrender.com/api/colorsize/colors`
        );
        if (Array.isArray(response.data)) {
          setColors(response.data);
        } else {
          setError("Failed to load colors. Unexpected data format.");
        }
      } catch (err) {
        setError("Failed to load colors. Please try again.");
      }
    };

    fetchColors();
  }, []);

  // Handle checkbox change
  const handleColorChange = (colorName, checked) => {
    const updatedColors = checked
      ? [...selectedColors, colorName]
      : selectedColors.filter((c) => c !== colorName);
    onColorFilterChange(updatedColors);
    setSelectedColors(updatedColors);

  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterColor"
        aria-expanded="true"
        aria-controls="filterColor"
      >
        Color
      </div>
      {error ? (
        <div className="text-danger p-3">{error}</div>
      ) : (
        <ul className="list-group list-group-flush show" id="filterColor">
          {colors.length === 0 && (
            <li className="list-group-item text-muted">No colors available</li>
          )}
          {colors.map(({ name, _id }) => {
            if (!name || typeof name !== "string" || name.trim() === "") {
              return null;
            }

            const sanitizedName = name.toLowerCase().replace(/\s+/g, "-");

            return (
              <li className="list-group-item" key={_id}>
                <div className="row g-0">
                  <div className="form-check col">
                    <input
                      className={`form-check-input bg-${sanitizedName}`}
                      type="checkbox"
                      id={`flexCheckColor-${sanitizedName}`}
                      checked={selectedColors.includes(name)}
                      onChange={(e) =>
                        handleColorChange(name, e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckColor-${sanitizedName}`}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterColor;
