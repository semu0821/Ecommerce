import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Pass the search term to the parent component
    }
  };

  return (
    <form onSubmit={handleSearch} className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          className="form-control search-input"
          placeholder="Search products"
          required
        />
        <label className="visually-hidden" htmlFor="search">Search Products</label>
        <button
          className="btn btn-search text-white"
          type="submit"
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
