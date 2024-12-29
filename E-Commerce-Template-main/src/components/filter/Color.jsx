import React from "react";

const FilterColor = ({ selectedColors, onColorFilterChange }) => {
  // Handle checkbox change
  const handleColorChange = (color, checked) => {
    const updatedColors = checked
      ? [...selectedColors, color]
      : selectedColors.filter(c => c !== color);
    onColorFilterChange(updatedColors); // Pass the selected colors to the parent component
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
      <ul className="list-group list-group-flush show" id="filterColor">
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input bg-primary"
                type="checkbox"
                id="flexCheckColor1"
                checked={selectedColors.includes('blue')}
                onChange={(e) => handleColorChange('blue', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor1">
                Blue <span className="text-muted">(5)</span>
              </label>
            </div>

            <div className="form-check col">
              <input
                className="form-check-input bg-secondary"
                type="checkbox"
                id="flexCheckColor2"
                checked={selectedColors.includes('gray')}
                onChange={(e) => handleColorChange('gray', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor2">
                Gray <span className="text-muted">(8)</span>
              </label>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input bg-success"
                type="checkbox"
                id="flexCheckColor3"
                checked={selectedColors.includes('green')}
                onChange={(e) => handleColorChange('green', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor3">
                Green <span className="text-muted">(12)</span>
              </label>
            </div>

            <div className="form-check col">
              <input
                className="form-check-input bg-danger"
                type="checkbox"
                id="flexCheckColor4"
                checked={selectedColors.includes('red')}
                onChange={(e) => handleColorChange('red', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor4">
                Red <span className="text-muted">(15)</span>
              </label>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input bg-warning"
                type="checkbox"
                id="flexCheckColor5"
                checked={selectedColors.includes('yellow')}
                onChange={(e) => handleColorChange('yellow', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor5">
                Yellow <span className="text-muted">(6)</span>
              </label>
            </div>
            <div className="form-check col">
              <input
                className="form-check-input bg-info"
                type="checkbox"
                id="flexCheckColor6"
                checked={selectedColors.includes('cyan blue')}
                onChange={(e) => handleColorChange('cyan blue', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor6">
                Cyan Blue <span className="text-muted">(2)</span>
              </label>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input bg-light"
                type="checkbox"
                id="flexCheckColor7"
                checked={selectedColors.includes('light')}
                onChange={(e) => handleColorChange('light', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor7">
                Light <span className="text-muted">(3)</span>
              </label>
            </div>
            <div className="form-check col">
              <input
                className="form-check-input bg-dark"
                type="checkbox"
                id="flexCheckColor8"
                checked={selectedColors.includes('dark')}
                onChange={(e) => handleColorChange('dark', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckColor8">
                Dark <span className="text-muted">(7)</span>
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterColor;
