import React from "react";
import { Link } from "react-router-dom";

const FilterCategory = ({ onCategoryFilterChange }) => {
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("Clothing")}
            className="text-decoration-none stretched-link"
          >
            Clothing
          </button>
        </li>
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("Leather Bag")}
            className="text-decoration-none stretched-link"
          >
            Leather Bag
          </button>
        </li>
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("Trousers")}
            className="text-decoration-none stretched-link"
          >
            Trousers
          </button>
        </li>
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("Sweater & Cardigans")}
            className="text-decoration-none stretched-link"
          >
            Sweater & Cardigans
          </button>
        </li>
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("High Heels")}
            className="text-decoration-none stretched-link"
          >
            High Heels
          </button>
        </li>
        <li className="list-group-item">
          <button
            onClick={() => onCategoryFilterChange("Coats & Jackets")}
            className="text-decoration-none stretched-link"
          >
            Coats & Jackets
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterCategory;
