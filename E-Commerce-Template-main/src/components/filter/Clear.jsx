import React from "react";

const FilterClear = ({ onClearFilters }) => {
  return (
    <div className="card mb-3">
      <div className="card-body fw-bold text-uppercase">
        Filter by{" "}
        <button
          type="button"
          className="btn btn-sm btn-light"
          onClick={onClearFilters}
        >
          <span aria-hidden="true">&times;</span> Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterClear;
